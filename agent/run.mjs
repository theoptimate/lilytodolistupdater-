#!/usr/bin/env node
/* Venture agent — email in, ranked opportunities and candidate ventures out.

   Run:  node agent/run.mjs --in agent/samples
         node agent/run.mjs --in mail.mbox --seed 2026-08-29 --ventures 3
         cat dump.json | node agent/run.mjs --in -
         node agent/run.mjs feedback "Name of a venture" keep "why it was worth it"

   Stages: ingest → classify → extract → dedupe against the ledger → score for fit →
   draw a wildcard → synthesise → write the digest. Every stage has a deterministic
   path, so the whole thing runs (less well) with no model and no network. */

import { writeFile, readFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { load } from "./lib/email.mjs";
import { extract, stamp, promptFor, SCHEMA as EXTRACT_SCHEMA } from "./lib/extract.mjs";
import { classify } from "./lib/sources.mjs";
import { loadProfile, scoreAll, applyWeights, setMode, DIMENSIONS } from "./lib/fit.mjs";
import { enrich } from "./lib/enrich.mjs";
import { calibrate, loadWeights, MIN_JUDGED } from "./lib/calibrate.mjs";
import { loadDecks, draw } from "./lib/wildcard.mjs";
import { synthesize, loadFeedback } from "./lib/synth.mjs";
import { loadLedger, reconcile, saveLedger, saveRun, appendFeedback } from "./lib/store.mjs";
import { render } from "./lib/report.mjs";
import { ask, available, usage, costUsd } from "./lib/llm.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const P = (...p) => join(HERE, ...p);

const args = process.argv.slice(2);
const flag = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? fallback : args[i + 1];
};
const has = (name) => args.includes(`--${name}`);

/* ---- feedback subcommand ------------------------------------------------ */

if (args[0] === "feedback") {
  const [, name, verdict, note] = args;
  if (!name || !["keep", "drop"].includes(verdict)) {
    console.error('usage: node agent/run.mjs feedback "<venture or opportunity>" keep|drop "<why>"');
    process.exit(1);
  }
  /* `target` is what calibration joins on: an opportunity id, part of a title, or a
     venture name. Whatever you would actually type on a Friday. */
  await appendFeedback(P("state/feedback.jsonl"), { name, target: name, verdict, note: note || "" });
  console.log(`recorded: ${verdict} — ${name}`);
  process.exit(0);
}

/* ---- calibrate subcommand ----------------------------------------------- */

if (args[0] === "calibrate") {
  setMode(flag("mode", "buy"));
  const ledger = await loadLedger(P("state/opportunities.jsonl"));
  const feedback = await loadFeedback(P("state/feedback.jsonl"));
  const result = await calibrate({ ledger, feedback, out: P("state/calibration.json"), mode: flag("mode", "buy") });

  if (!result.enough) {
    console.log(`${result.judged} judged item(s); ${MIN_JUDGED} are needed before the differences mean anything${result.reason ? ` (${result.reason})` : ""}.`);
    console.log(`Record verdicts as you go: node agent/run.mjs feedback "<opportunity or venture>" keep|drop "<why>"`);
    process.exit(0);
  }

  console.log(`${result.judged} judged — ${result.keeps} kept, ${result.drops} dropped\n`);
  console.log("dimension        keep   drop   separation   weight → new");
  for (const d of DIMENSIONS) {
    const r = result.per[d.key];
    const fmt = (n) => (typeof n === "number" ? n.toFixed(2) : "  — ");
    console.log(`${d.key.padEnd(15)} ${fmt(r.keep_mean)}  ${fmt(r.drop_mean)}   ${fmt(r.separation).padStart(8)}     ${d.weight.toFixed(2)} → ${result.weights[d.key].toFixed(3)}`);
  }
  console.log(`\nwritten to ${P("state/calibration.json")} — future runs use these weights.`);
  console.log("A dimension near zero separation is not measuring anything you act on. Consider what it should have asked instead.");
  process.exit(0);
}

/* ---- bridge subcommand --------------------------------------------------

   There are two ways to get the model stages done: an API key, or an assistant
   that is already reading this mailbox (Claude Code with the Gmail connector, say).
   `bridge` writes the exact prompts and inputs to disk so the second route is a
   real, repeatable path rather than someone pasting emails into a chat window.
   The assistant writes records back, and `--records` feeds them into the same
   dedupe, scoring and synthesis the API path uses. */

if (args[0] === "bridge") {
  const input = flag("in", P("samples"));
  const dir = P("state/bridge", new Date().toISOString().slice(0, 10));
  const messages = await load(input);
  await mkdir(dir, { recursive: true });

  const jobs = messages.map((m) => {
    const { source, user } = promptFor(m);
    return { message_id: m.id, source: source.id, subject: m.subject, prompt: user };
  });

  await writeFile(join(dir, "emails.json"), JSON.stringify(jobs, null, 2));
  await writeFile(join(dir, "extract-prompt.md"), [
    "# Extraction job", "",
    "Produce `records.json`: an array of `{ message_id, opportunities: [...], notes }`,",
    "one entry per email in `emails.json`. Then run:", "",
    "```", `node agent/run.mjs --in ${input} --records ${join(dir, "records.json")}`, "```", "",
    "## System prompt", "", (await import("./lib/extract.mjs")).SYSTEM, "",
    "## Record schema", "", "```json", JSON.stringify(EXTRACT_SCHEMA, null, 2), "```", "",
    "## Per-email prompts", "",
    ...jobs.map((j) => `### ${j.message_id} — ${j.subject}\n\n\`\`\`\n${j.prompt}\n\`\`\`\n`),
  ].join("\n"));

  console.log(`${messages.length} email(s) written to ${dir}`);
  console.log(`next: produce ${join(dir, "records.json")}, then re-run with --records`);
  process.exit(0);
}

/* ---- options ------------------------------------------------------------ */

const input      = flag("in", P("samples"));
/* config/profile.json is yours and gitignored; the example is the committed
   fallback so a fresh clone still runs, loudly, with nothing filled in. */
const profilePath = flag("profile",
  existsSync(P("config/profile.json")) ? P("config/profile.json") : P("config/profile.example.json"));
const seed       = flag("seed", new Date().toISOString().slice(0, 10));
const outDir     = flag("out", P("out"));
const useLlm     = !has("no-llm");
/* Stages an assistant (or an earlier run) already did. Each one skips a model
   call without skipping the checks that go with it. */
const recordsIn  = flag("records", "");
const scoresIn   = flag("scores", "");
const venturesIn = flag("ventures-in", "");   // note: --ventures is the count
const readJson   = async (p) => JSON.parse(await readFile(p, "utf8"));
const limit      = Number(flag("limit", 0)) || 0;
const enrichTop  = has("enrich") ? Number(flag("enrich", 6)) || 6 : 0;

const profile = await loadProfile(profilePath);
const run = profile.run || {};
const mode = flag("mode", run.mode || "buy");
setMode(mode);
const shortlistSize = Number(flag("shortlist", run.shortlist || 12));
const ventureCount  = Number(flag("ventures", run.ventures || 3));

const warnings = [];
const started = new Date().toISOString();

const calibrated = applyWeights(await loadWeights(P("state/calibration.json"), mode));
if (calibrated) console.log("using calibrated weights from state/calibration.json");

/* ---- ingest ------------------------------------------------------------- */

let messages = await load(input);
if (limit) messages = messages.slice(0, limit);
if (!messages.length) {
  console.error(`no email found at ${input}`);
  process.exit(1);
}
console.log(`read ${messages.length} email(s) from ${input} — ${mode === "build" ? "BUILD mode: listings are evidence, not purchases" : "BUY mode"}`);

const modelReady = useLlm && await available();
if (!modelReady && !recordsIn) {
  warnings.push("Ran without a model — extraction and scoring used the fallback heuristics, which are much weaker. Install `agent/` dependencies and set ANTHROPIC_API_KEY (or run `ant auth login`) for a real pass.");
  console.log("no model available — heuristic mode");
}

/* ---- extract ------------------------------------------------------------ */

const extracted = [];
if (recordsIn) {
  const supplied = await readJson(recordsIn);
  const byId = new Map(messages.map((m) => [m.id, m]));
  let orphans = 0;
  for (const entry of supplied) {
    const message = byId.get(entry.message_id);
    if (!message) { orphans++; continue; }
    extracted.push(...stamp(entry.opportunities, message, classify(message)));
  }
  /* An unmatched record has no email behind it, which is exactly the case where a
     number could have come from nowhere. Dropped, and said out loud. */
  if (orphans) warnings.push(`${orphans} supplied record(s) named an email that is not in this batch, and were dropped.`);
  console.log(`adopted ${extracted.length} supplied record(s) from ${recordsIn}`);
} else {
  for (const [i, message] of messages.entries()) {
    process.stdout.write(`  [${i + 1}/${messages.length}] ${message.subject.slice(0, 64) || "(no subject)"}\n`);
    const result = await extract(message, { useLlm: modelReady });
    if (result.truncated) warnings.push(`"${message.subject}" was longer than the extractor's window and was read only in part.`);
    extracted.push(...result.opportunities);
  }
}
console.log(`extracted ${extracted.length} opportunit${extracted.length === 1 ? "y" : "ies"}`);

/* ---- dedupe ------------------------------------------------------------- */

const ledgerPath = P("state/opportunities.jsonl");
const ledger = await loadLedger(ledgerPath);
const { fresh, repeats } = reconcile(ledger, extracted);
console.log(`${fresh.length} new, ${repeats.length} seen before`);

/* Repeats are still ranked — a listing that keeps reappearing is a signal, and it
   costs nothing to score since it is already in the ledger. */
const pool = [...fresh, ...repeats];

/* ---- score -------------------------------------------------------------- */

const precomputed = scoresIn ? (await readJson(scoresIn)).scored : null;
const scored = await scoreAll(pool, profile, { useLlm: modelReady, ask, precomputed, mode });
const live = scored.filter((o) => !o.killed.length);
const shortlist = live.slice(0, shortlistSize);
console.log(`scored ${scored.length}; ${scored.length - live.length} rejected by kill criteria`);

/* ---- verification ------------------------------------------------------- */

if (enrichTop && modelReady) {
  console.log(`verifying the top ${Math.min(enrichTop, live.length)} against the web…`);
  const verified = await enrich(live, { limit: enrichTop });
  for (const o of scored) if (verified.has(o.id)) o.verification = verified.get(o.id);
  const contradicted = scored.filter((o) => o.verification?.contradictions?.length);
  for (const o of contradicted) {
    warnings.push(`"${o.title}" has ${o.verification.contradictions.length} claim(s) the web contradicts — see its entry below.`);
  }
} else if (enrichTop) {
  warnings.push("Verification was requested but no model was available, so nothing in this digest has been checked against anything outside the email.");
}

/* ---- wildcard + synthesis ---------------------------------------------- */

const decks = await loadDecks(P("config/wildcards.json"));
const wildcards = draw(decks, {
  seed,
  deckNames: run.decks_per_run,
  collisionsFrom: shortlist,
  collisionSize: run.collision_size || 2,
});
console.log(`wildcards (seed ${seed}): ${wildcards.cards.map((c) => c.card).join(" | ")}`);

const feedback = await loadFeedback(P("state/feedback.jsonl"));
const { ventures = [], discarded = [] } = venturesIn
  ? await readJson(venturesIn)
  : await synthesize({ profile, shortlist, wildcards, feedback, count: ventureCount, ask, useLlm: modelReady });

/* ---- write -------------------------------------------------------------- */

if (!modelReady && !recordsIn) {
  /* already warned above */
} 
if (modelReady && usage.degraded) {
  warnings.push("The model stopped answering partway through this run — everything after that point fell back to heuristics. Re-run once it is reachable.");
}

if (!(profile.kill_criteria || []).length) {
  /* An empty kill list is not a neutral default: it means every listing in the batch
     survived because nothing was ever rejected, which reads like endorsement. */
  warnings.push("No kill criteria are recorded, so nothing was auto-rejected this run. Writing down two or three things you will not do is the cheapest quality improvement available to this pipeline.");
}

if (profile._placeholders.length) {
  warnings.push(`The profile still has ${profile._placeholders.length} unfilled field(s) (${profile._placeholders.slice(0, 4).join(", ")}${profile._placeholders.length > 4 ? ", …" : ""}). Fit scores are close to meaningless until those are real.`);
}

const record = {
  started,
  finished: new Date().toISOString(),
  input,
  profile: profilePath,
  seed,
  mode,
  calibrated,
  model: modelReady ? usage.model : (recordsIn ? "assistant-supplied (bridge)" : "none"),
  supplied: { records: recordsIn || null, scores: scoresIn || null, ventures: venturesIn || null },
  counts: { messages: messages.length, extracted: extracted.length, fresh: fresh.length, repeats: repeats.length },
  wildcards,
  opportunities: scored,
  ventures,
  discarded,
  warnings,
  cost: modelReady ? costUsd() : 0,
  usage: { ...usage },
};

await saveLedger(ledgerPath, ledger);
const runPath = await saveRun(P("state/runs"), record);

await mkdir(outDir, { recursive: true });
const digestPath = join(outDir, `digest-${started.slice(0, 10)}.md`);
await writeFile(digestPath, render(record) + "\n");
await writeFile(join(outDir, "latest.json"), JSON.stringify(record, null, 2));

console.log(`\ndigest  ${digestPath}`);
console.log(`run     ${runPath}`);
console.log(`ledger  ${ledgerPath} (${ledger.size} records)`);
if (modelReady) console.log(`spend   $${costUsd().toFixed(3)} over ${usage.calls} call(s)`);
for (const w of warnings) console.log(`WARN    ${w}`);
