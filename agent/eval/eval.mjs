#!/usr/bin/env node
/* Two checks, because "the extractor got better" is otherwise an opinion.

   1. AUDIT (deterministic, no model, runs on any batch):
      every number in every record must be findable in the email it came from.
      This turns the one rule the whole pipeline rests on — no invented figures —
      into something a machine can fail you for.

        node agent/eval/eval.mjs --in <mail> --records <records.json>

   2. FIXTURES (needs a model): run extraction over labelled emails and report how
      many known opportunities were found, missed, or invented.

        node agent/eval/eval.mjs --fixtures

   Exits 1 when a number cannot be traced or recall drops below the floor. */

import { readFile, readdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import { load } from "../lib/email.mjs";
import { extract } from "../lib/extract.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const flag = (n, d) => { const i = args.indexOf(`--${n}`); return i === -1 ? d : args[i + 1]; };

const NUMERIC = ["asking_price_usd", "revenue_annual_usd", "profit_annual_usd",
                 "revenue_monthly_usd", "profit_monthly_usd"];

/* The same figure is written a dozen ways in a marketing email. A number counts as
   supported if any of these forms appears in the body. Deliberately generous —
   the point is to catch numbers that came from nowhere, not to police formatting. */
export function forms(n) {
  const out = new Set();
  const whole = Math.round(n);
  const push = (s) => { if (s) out.add(String(s).toLowerCase()); };

  push(whole);
  push(whole.toLocaleString("en-US"));
  if (!Number.isInteger(n)) {
    push(n);
    push(n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
  }
  for (const [unit, div] of [["k", 1e3], ["m", 1e6], ["b", 1e9]]) {
    const v = n / div;
    if (v >= 1 && v < 1000) {
      push(`${Math.round(v)}${unit}`);
      if (Math.abs(v - Math.round(v)) > 0.01) push(`${v.toFixed(1)}${unit}`);
      /* "over $4M" for 4,000,000 and "€385k+" for 385,000 both land here. */
    }
  }
  return [...out];
}

export function auditRecord(record, text) {
  const hay = text.toLowerCase().replace(/ /g, " ");
  const unsupported = [];
  for (const field of NUMERIC) {
    const value = record[field];
    if (typeof value !== "number") continue;
    if (!forms(value).some((f) => hay.includes(f))) unsupported.push({ field, value });
  }
  /* Evidence quotes are the other half of the promise: a quote that is not in the
     email is a fabricated citation, which is worse than a missing one. */
  const badQuotes = (record.evidence || []).filter((q) => {
    const needle = String(q).toLowerCase().replace(/\s+/g, " ").slice(0, 60);
    return needle.length > 12 && !hay.replace(/\s+/g, " ").includes(needle);
  });
  return { unsupported, badQuotes };
}

async function audit() {
  const input = flag("in", "");
  const recordsPath = flag("records", "");
  if (!input || !recordsPath) {
    console.error("usage: node agent/eval/eval.mjs --in <mail> --records <records.json>");
    process.exit(2);
  }
  const messages = new Map((await load(input)).map((m) => [m.id, m]));
  const batches = JSON.parse(await readFile(recordsPath, "utf8"));

  let records = 0, numbers = 0, bad = 0, quotes = 0;
  for (const batch of batches) {
    const message = messages.get(batch.message_id);
    if (!message) {
      console.log(`  ORPHAN  ${batch.message_id} — no such email in this batch`);
      bad++;
      continue;
    }
    for (const record of batch.opportunities || []) {
      records++;
      numbers += NUMERIC.filter((f) => typeof record[f] === "number").length;
      const { unsupported, badQuotes } = auditRecord(record, message.text);
      for (const u of unsupported) {
        bad++;
        console.log(`  UNTRACED  ${record.title.slice(0, 50)} — ${u.field} = ${u.value} does not appear in "${message.subject.slice(0, 40)}"`);
      }
      for (const q of badQuotes) {
        quotes++;
        console.log(`  MISQUOTE  ${record.title.slice(0, 50)} — "${String(q).slice(0, 60)}"`);
      }
    }
  }

  console.log(`\n${records} records · ${numbers} figures checked · ${bad} untraced · ${quotes} misquoted`);
  if (bad || quotes) {
    console.log("\nEvery figure and every quote must come from the email. Anything listed above did not.");
    process.exit(1);
  }
  console.log("every figure and quote traced back to its email");
}

async function fixtures() {
  const dir = join(HERE, "fixtures");
  const names = (await readdir(dir)).filter((n) => n.endsWith(".json"));
  let expected = 0, found = 0, invented = 0;

  for (const name of names) {
    const fixture = JSON.parse(await readFile(join(dir, name), "utf8"));
    const [message] = await load(join(dir, fixture.email));
    const { opportunities } = await extract(message, { useLlm: true });
    const titles = opportunities.map((o) => `${o.title} ${o.summary}`.toLowerCase());

    for (const want of fixture.expect) {
      expected++;
      const hit = titles.findIndex((t) => want.title_contains.every((w) => t.includes(w.toLowerCase())));
      if (hit === -1) console.log(`  MISSED  ${name}: ${want.title_contains.join(" + ")}`);
      else {
        found++;
        const record = opportunities[hit];
        for (const [field, value] of Object.entries(want.fields || {})) {
          if (record[field] !== value) {
            console.log(`  FIELD   ${name}: ${want.title_contains[0]} ${field} = ${record[field]}, expected ${value}`);
          }
        }
      }
    }
    const extra = opportunities.length - fixture.expect.length;
    if (extra > (fixture.allow_extra || 0)) {
      invented += extra;
      console.log(`  EXTRA   ${name}: ${extra} record(s) beyond the ${fixture.expect.length} labelled`);
    }
  }

  const recall = expected ? found / expected : 0;
  console.log(`\nrecall ${found}/${expected} (${Math.round(recall * 100)}%) · ${invented} unlabelled extra`);
  if (recall < 0.8) { console.log("recall below the 80% floor"); process.exit(1); }
}

/* Only run when invoked directly — the tests import `forms` and `auditRecord`. */
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await (args.includes("--fixtures") ? fixtures() : audit());
}
