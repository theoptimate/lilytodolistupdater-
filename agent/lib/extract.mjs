/* Email in, opportunity records out.

   The hard rule, enforced in the prompt and checked afterwards: every number and
   every claim has to appear in the email. If the email does not say what the thing
   earns, the field is null and the gap is recorded in `missing`. An invented
   revenue figure is worse than no figure — it survives into the ranking and quietly
   decides what gets worked on. */

import { classify, itemHint } from "./sources.mjs";
import { ask } from "./llm.mjs";
import { createHash } from "node:crypto";

export const MAX_BODY_CHARS = 24000;

const OPPORTUNITY = {
  type: "object",
  additionalProperties: false,
  required: ["title", "kind", "summary", "url", "asking_price_usd", "revenue_annual_usd",
             "profit_annual_usd", "location", "industry_tags", "customer", "problem",
             "why_now", "evidence", "confidence", "missing"],
  properties: {
    title: { type: "string", description: "The listing, company or idea name as written in the email." },
    kind: { type: "string", enum: ["idea", "company", "for_sale", "trend", "other"] },
    summary: { type: "string", description: "Two sentences, plain language, no adjectives the email did not use." },
    url: { type: ["string", "null"], description: "The link to this specific item, if the email carries one." },
    asking_price_usd: { type: ["number", "null"] },
    revenue_annual_usd: { type: ["number", "null"] },
    profit_annual_usd: { type: ["number", "null"], description: "SDE, net profit or EBITDA as stated. Null unless stated." },
    location: { type: ["string", "null"] },
    industry_tags: { type: "array", items: { type: "string" }, description: "3-6 lowercase tags." },
    customer: { type: ["string", "null"], description: "Who pays, per the email." },
    problem: { type: ["string", "null"] },
    why_now: { type: ["string", "null"], description: "Only if the email gives a reason this is timely." },
    evidence: {
      type: "array",
      items: { type: "string" },
      description: "Verbatim quotes from the email supporting the numbers and claims above.",
    },
    confidence: { type: "number", description: "0-1. How completely the email describes this opportunity." },
    missing: { type: "array", items: { type: "string" }, description: "What a buyer or builder would still need to find out." },
  },
};

const SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: ["opportunities", "notes"],
  properties: {
    opportunities: { type: "array", items: OPPORTUNITY },
    notes: { type: "string", description: "Anything odd about the email: a paywall, a truncation, nothing extractable." },
  },
};

const SYSTEM = `You read business email — curated idea newsletters, automated new-company
alerts, and business-for-sale listings — and pull out the concrete opportunities in them.

Rules, in order of importance:

1. Extract only what the email states. Never infer a revenue, price, multiple, market
   size or growth rate that is not written down. Unknown means null, and the unknown
   goes in "missing".
2. Every financial figure must be quotable. Put the quote in "evidence".
3. A digest email contains many opportunities. Return one record per distinct listing,
   company or idea. Do not merge them, and do not return an item for the newsletter
   itself, for sponsor slots, or for unsubscribe/footer content.
4. Marketing language is not evidence. "Turnkey", "explosive growth" and "highly
   profitable" are the seller talking; summarise what the business does instead.
5. If the email carries no opportunity at all, return an empty list and say why in
   "notes". That is a normal outcome, not a failure.
6. Prices are in USD. If the email quotes another currency, convert nothing — record
   the number and put the currency in "location" or "missing".`;

const money = (s) => {
  const m = /\$\s?([\d,]+(?:\.\d+)?)\s*([kmb])?/i.exec(s || "");
  if (!m) return null;
  const n = Number(m[1].replace(/,/g, ""));
  const mult = { k: 1e3, m: 1e6, b: 1e9 }[(m[2] || "").toLowerCase()] || 1;
  return Number.isFinite(n) ? n * mult : null;
};

/* Used when there is no model available. It is honest rather than clever: one
   low-confidence record per email, carrying whatever the regexes can prove. */
export function heuristicExtract(message, source) {
  const text = message.text || "";
  const asking = money((/asking(?:\s+price)?\s*:?\s*\$[\d,.]+\s*[kmb]?/i.exec(text) || [])[0]);
  const revenue = money((/(?:revenue|gross sales|turnover)\s*:?\s*\$[\d,.]+\s*[kmb]?/i.exec(text) || [])[0]);
  const profit = money((/(?:cash flow|sde|net profit|ebitda|profit)\s*:?\s*\$[\d,.]+\s*[kmb]?/i.exec(text) || [])[0]);
  return {
    opportunities: [{
      title: message.subject || "(untitled email)",
      kind: source.kind,
      summary: text.replace(/\s+/g, " ").slice(0, 300),
      url: message.url || null,
      asking_price_usd: asking,
      revenue_annual_usd: revenue,
      profit_annual_usd: profit,
      location: null,
      industry_tags: [],
      customer: null,
      problem: null,
      why_now: null,
      evidence: [],
      confidence: 0.2,
      missing: ["extracted without a model — everything here needs a human read"],
    }],
    notes: "heuristic extraction (no model available)",
  };
}

const fingerprint = (o, source) => createHash("sha1")
  .update([
    (o.url || "").replace(/[?#].*$/, "").toLowerCase(),
    (o.title || "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim(),
    source.id,
  ].join("|"))
  .digest("hex")
  .slice(0, 16);

export async function extract(message, { useLlm = true } = {}) {
  const source = classify(message);
  const body = (message.text || "").slice(0, MAX_BODY_CHARS);
  const truncated = (message.text || "").length > MAX_BODY_CHARS;

  const user = [
    `Source: ${source.label} (${source.id}). Financials from this source are ${source.trust.financials}.`,
    `Expect roughly ${itemHint(message, source)} opportunit${itemHint(message, source) === 1 ? "y" : "ies"} in this email.`,
    `From: ${message.from}`,
    `Subject: ${message.subject}`,
    `Date: ${message.date}`,
    truncated ? `\n[The body below is the first ${MAX_BODY_CHARS} characters of a longer email.]` : "",
    "\n---\n",
    body,
  ].filter(Boolean).join("\n");

  const result = (useLlm && await ask({ stable: SYSTEM, user, schema: SCHEMA }))
    || heuristicExtract(message, source);

  const stamped = (result.opportunities || []).map((o) => ({
    ...o,
    id: fingerprint(o, source),
    source: source.id,
    source_label: source.label,
    financial_trust: source.trust.financials,
    /* Provenance travels with the record forever. Without it a six-week-old idea in
       the ledger is unfalsifiable. */
    provenance: {
      message_id: message.id,
      from: message.from,
      subject: message.subject,
      received: message.date,
      truncated,
    },
    first_seen: new Date().toISOString(),
  }));

  return { opportunities: stamped, notes: result.notes || "", source: source.id, truncated };
}
