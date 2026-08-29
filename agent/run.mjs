#!/usr/bin/env node
/* Venture agent — email in, ranked opportunities and candidate ventures out.

   Run:  node agent/run.mjs --in agent/samples
         node agent/run.mjs --in mail.mbox --seed 2026-08-29 --ventures 3
         cat dump.json | node agent/run.mjs --in -
         node agent/run.mjs feedback "Name of a venture" keep "why it was worth it"

   Stages: ingest → classify → extract → dedupe against the ledger → score for fit →
   draw a wildcard → synthesise → write the digest. Every stage has a deterministic
   path, so the whole thing runs (less well) with no model and no network. */

import { writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { load } from "./lib/email.mjs";
import { extract } from "./lib/extract.mjs";
import { loadProfile, scoreAll } from "./lib/fit.mjs";
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
    console.error('usage: node agent/run.mjs feedback "<venture name>" keep|drop "<why>"');
    process.exit(1);
  }
  await appendFeedback(P("state/feedback.jsonl"), { name, verdict, note: note || "" });
  console.log(`recorded: ${verdict} — ${name}`);
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
const limit      = Number(flag("limit", 0)) || 0;

const profile = await loadProfile(profilePath);
const run = profile.run || {};
const shortlistSize = Number(flag("shortlist", run.shortlist || 12));
const ventureCount  = Number(flag("ventures", run.ventures || 3));

const warnings = [];
const started = new Date().toISOString();

/* ---- ingest ------------------------------------------------------------- */

let messages = await load(input);
if (limit) messages = messages.slice(0, limit);
if (!messages.length) {
  console.error(`no email found at ${input}`);
  process.exit(1);
}
console.log(`read ${messages.length} email(s) from ${input}`);

const modelReady = useLlm && await available();
if (!modelReady) {
  warnings.push("Ran without a model — extraction and scoring used the fallback heuristics, which are much weaker. Install `agent/` dependencies and set ANTHROPIC_API_KEY (or run `ant auth login`) for a real pass.");
  console.log("no model available — heuristic mode");
}

/* ---- extract ------------------------------------------------------------ */

const extracted = [];
for (const [i, message] of messages.entries()) {
  process.stdout.write(`  [${i + 1}/${messages.length}] ${message.subject.slice(0, 64) || "(no subject)"}\n`);
  const result = await extract(message, { useLlm: modelReady });
  if (result.truncated) warnings.push(`"${message.subject}" was longer than the extractor's window and was read only in part.`);
  extracted.push(...result.opportunities);
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

const scored = await scoreAll(pool, profile, { useLlm: modelReady, ask });
const live = scored.filter((o) => !o.killed.length);
const shortlist = live.slice(0, shortlistSize);
console.log(`scored ${scored.length}; ${scored.length - live.length} rejected by kill criteria`);

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
const { ventures = [], discarded = [] } = await synthesize({
  profile, shortlist, wildcards, feedback, count: ventureCount, ask, useLlm: modelReady,
});

/* ---- write -------------------------------------------------------------- */

if (modelReady && usage.degraded) {
  warnings.push("The model stopped answering partway through this run — everything after that point fell back to heuristics. Re-run once it is reachable.");
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
  model: modelReady ? usage.model : "none",
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
