/* The ledger. Everything the agent has ever seen, once each.

   Deduplication is the difference between a useful weekly digest and a wall of the
   same twelve listings. Marketplaces resend, IFTTT fires twice, newsletters repeat
   last week's idea — so a record is keyed by its fingerprint, and a second sighting
   bumps a counter rather than creating a new row. A thing seen five times is
   interesting on its own, which is why the count is kept. */

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";

export async function readJsonl(path) {
  try {
    const raw = await readFile(path, "utf8");
    return raw.split("\n").filter((l) => l.trim()).map((l) => JSON.parse(l));
  } catch { return []; }
}

async function writeJsonl(path, rows) {
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, rows.map((r) => JSON.stringify(r)).join("\n") + (rows.length ? "\n" : ""));
}

export async function loadLedger(path) {
  const rows = await readJsonl(path);
  return new Map(rows.map((r) => [r.id, r]));
}

/* Returns { fresh, repeats } — fresh ones go to the model, repeats only update the
   ledger. That split is also the cost control: a run over a mailbox you have already
   processed costs nothing. */
export function reconcile(ledger, opportunities, { now = new Date().toISOString() } = {}) {
  const fresh = [];
  const repeats = [];
  for (const o of opportunities) {
    const seen = ledger.get(o.id);
    if (seen) {
      seen.seen_count = (seen.seen_count || 1) + 1;
      seen.last_seen = now;
      seen.provenance_history = [...(seen.provenance_history || []), o.provenance].slice(-10);
      /* A listing that keeps reappearing at a lower price is the seller telling you
         what the market said. Nothing else in a marketplace email is worth as much,
         and it is only visible across runs — which is the point of the ledger. */
      if (typeof o.asking_price_usd === "number") {
        /* Dated by when the email arrived, not by when the run happened — a price
           history stamped with run times says nothing about how fast a seller moved. */
        const at = o.provenance?.received || now;
        const history = seen.price_history || (typeof seen.asking_price_usd === "number"
          ? [{ at: seen.provenance?.received || seen.first_seen, price: seen.asking_price_usd }] : []);
        const last = history.at(-1);
        if (!last || last.price !== o.asking_price_usd) history.push({ at, price: o.asking_price_usd });
        history.sort((a, b) => a.at.localeCompare(b.at));
        seen.price_history = history;
        seen.asking_price_usd = o.asking_price_usd;
        if (history.length > 1) {
          const first = history[0].price;
          seen.price_cut_pct = Math.round(((first - o.asking_price_usd) / first) * 100);
        }
      }
      /* The newest sighting is the current truth about everything except history:
         a ledger row still quoting three-week-old evidence next to today's price is
         how a digest ends up internally contradicting itself. */
      for (const field of ["summary", "url", "evidence", "missing", "why_now", "customer",
                           "problem", "confidence", "revenue_annual_usd", "profit_annual_usd",
                           "revenue_monthly_usd", "profit_monthly_usd", "price_move", "provenance"]) {
        if (o[field] !== undefined && o[field] !== null) seen[field] = o[field];
      }
      repeats.push(seen);
    } else {
      const row = { ...o, seen_count: 1, first_seen: o.first_seen || now, last_seen: now };
      ledger.set(o.id, row);
      fresh.push(row);
    }
  }
  return { fresh, repeats };
}

export async function saveLedger(path, ledger) {
  await writeJsonl(path, [...ledger.values()]);
}

export async function saveRun(dir, run) {
  await mkdir(dir, { recursive: true });
  const path = join(dir, `${run.started.replace(/[:.]/g, "-")}.json`);
  await writeFile(path, JSON.stringify(run, null, 2));
  return path;
}

/* The feedback file is written by hand — one line per verdict — and read back into
   the next synthesis prompt. It is the only mechanism here that makes the agent
   better over time, and it costs nothing but the habit of using it. */
export async function appendFeedback(path, entry) {
  const rows = await readJsonl(path);
  rows.push({ at: new Date().toISOString(), ...entry });
  await writeJsonl(path, rows);
}
