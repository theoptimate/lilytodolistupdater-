/* Does the rubric predict anything?

   Every run scores opportunities on six dimensions and then nobody ever checks
   whether those scores were right. This closes that: it joins the verdicts you
   recorded against the scores the run gave, and reports which dimensions actually
   separated the things you kept from the things you dropped.

   A dimension that scores keeps and drops identically is not measuring anything,
   and its weight is a decoration. One that separates them is doing the work and
   should carry more. The adjustment is deliberately small and bounded — this is a
   nudge from evidence, not a model fit on twelve data points. */

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname } from "node:path";
import { DIMENSIONS } from "./fit.mjs";

export const MIN_JUDGED = 8;      // below this, the differences are noise
export const MAX_SHIFT = 0.05;    // no weight moves more than this per calibration

const mean = (xs) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : null);

/* A verdict names either an opportunity id or something close to its title, because
   what you actually type at the end of a week is the name, not the hash. */
export function join(ledger, feedback) {
  const rows = [];
  for (const entry of feedback) {
    const needle = String(entry.target || entry.name || "").toLowerCase().trim();
    if (!needle) continue;
    const match = ledger.get(needle)
      || [...ledger.values()].find((o) => o.id === needle)
      || [...ledger.values()].find((o) => (o.title || "").toLowerCase().includes(needle))
      || [...ledger.values()].find((o) => needle.includes((o.title || "").toLowerCase()));
    if (match?.scores) rows.push({ verdict: entry.verdict, scores: match.scores, title: match.title });
  }
  return rows;
}

export function analyse(rows) {
  const keeps = rows.filter((r) => r.verdict === "keep");
  const drops = rows.filter((r) => r.verdict === "drop");
  const per = {};
  for (const d of DIMENSIONS) {
    const k = mean(keeps.map((r) => r.scores[d.key]).filter((n) => typeof n === "number"));
    const p = mean(drops.map((r) => r.scores[d.key]).filter((n) => typeof n === "number"));
    per[d.key] = {
      keep_mean: k, drop_mean: p,
      separation: k !== null && p !== null ? Number((k - p).toFixed(2)) : null,
      weight: d.weight,
    };
  }
  return { keeps: keeps.length, drops: drops.length, per };
}

/* Weights move toward the dimensions that separated, away from those that did not,
   then are renormalised so they still sum to one. */
export function reweight(per) {
  const seps = DIMENSIONS.map((d) => per[d.key]?.separation).filter((s) => typeof s === "number");
  if (!seps.length) return null;
  const spread = Math.max(...seps.map(Math.abs)) || 1;

  const proposed = {};
  for (const d of DIMENSIONS) {
    const sep = per[d.key]?.separation;
    const shift = typeof sep === "number" ? (sep / spread) * MAX_SHIFT : 0;
    proposed[d.key] = Math.max(0.02, d.weight + shift);
  }
  const total = Object.values(proposed).reduce((a, b) => a + b, 0);
  for (const key of Object.keys(proposed)) proposed[key] = Number((proposed[key] / total).toFixed(3));
  return proposed;
}

export async function calibrate({ ledger, feedback, out }) {
  const rows = join(ledger, feedback);
  if (rows.length < MIN_JUDGED) {
    return { enough: false, judged: rows.length, need: MIN_JUDGED };
  }
  const { keeps, drops, per } = analyse(rows);
  if (!keeps || !drops) {
    /* All keeps or all drops says nothing about which dimension mattered. */
    return { enough: false, judged: rows.length, need: MIN_JUDGED, reason: "verdicts are all one way" };
  }
  const weights = reweight(per);
  const record = { generated: new Date().toISOString(), judged: rows.length, keeps, drops, per, weights };
  await mkdir(dirname(out), { recursive: true });
  await writeFile(out, JSON.stringify(record, null, 2));
  return { enough: true, ...record };
}

export async function loadWeights(path) {
  try {
    const { weights } = JSON.parse(await readFile(path, "utf8"));
    return weights || null;
  } catch { return null; }
}
