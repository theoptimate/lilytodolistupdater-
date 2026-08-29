/* Verification. The email is a seller talking, and until this stage runs, nothing
   in the pipeline has checked a single claim against the outside world.

   Deliberately narrow: it asks whether the listing is real and still live, who
   already does this, and whether anything on the open web contradicts the email.
   It does not re-value the business and it does not replace diligence — it exists
   to catch the two failures that waste a week, which are a listing that sold three
   weeks ago and a market with four funded incumbents nobody mentioned. */

import { search } from "./llm.mjs";

const SYSTEM = `You verify business listings and business ideas against the open web.

For each item you are given, use web search to establish, in this order:
1. Does this specific listing or company exist, and is it still available? Quote the
   page you found it on. If you cannot find it, say so plainly — absence is a finding.
2. Who already does this? Name up to three, with what they charge if it is public.
3. Does anything on the web contradict a claim in the record? Quote both sides.
4. Is there a licence, regulation or platform policy that governs this work?

Rules:
- Cite a URL for every claim. A statement you cannot cite does not go in.
- "Not found" and "could not verify" are correct answers and must be used.
- Do not re-estimate revenue, value the business, or give an opinion on price.
- Contradictions matter more than confirmations. Lead with them.`;

const OUT = `Return JSON only, no prose:
{"verified":[{"id":"...","found":true|false,"still_listed":"yes|no|unknown",
"competitors":[{"name":"...","note":"...","url":"..."}],
"contradictions":[{"claim":"...","evidence":"...","url":"..."}],
"regulatory":"... or null","sources":["url"],"confidence":0.0}]}`;

export async function enrich(opportunities, { limit = 6 } = {}) {
  const batch = opportunities.slice(0, limit);
  if (!batch.length) return new Map();

  const user = [
    "Verify these opportunities.",
    JSON.stringify(batch.map((o) => ({
      id: o.id, title: o.title, url: o.url, source: o.source_label, summary: o.summary,
      asking_price_usd: o.asking_price_usd, claims: o.evidence,
    })), null, 2),
    "",
    OUT,
  ].join("\n");

  const result = await search({ stable: SYSTEM, user, maxTokens: 16000 });
  if (!result?.verified) return new Map();
  return new Map(result.verified.map((v) => [v.id, v]));
}
