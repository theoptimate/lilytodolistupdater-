/* The combination step: shortlisted opportunities + who you are + the Mae ecosystem
   + a drawn constraint, in, candidate ventures out.

   Two things keep this from producing pleasant nonsense. First, every venture has to
   name the specific asset it borrows from the profile and the specific opportunity
   it came from — "why us" that could be said by anyone is a rejected answer. Second,
   every venture carries a falsifiable first test and the signal that would kill it,
   so the output is a week of work rather than a paragraph of enthusiasm. */

import { readFile } from "node:fs/promises";

const VENTURE = {
  type: "object",
  additionalProperties: false,
  required: ["name", "one_liner", "thesis", "who_pays", "why_us", "borrowed_from",
             "demand_evidence", "first_dollar_path", "week_one", "falsifiable_test",
             "kill_signal", "wildcard_used", "novelty", "confidence"],
  properties: {
    name: { type: "string" },
    one_liner: { type: "string", description: "One sentence a nine-year-old could repeat." },
    thesis: { type: "string", description: "Why this works, in three sentences." },
    who_pays: { type: "string", description: "The specific first customer, not a segment." },
    why_us: { type: "string", description: "Name the operator strength, agent capability or ecosystem asset by name. Generic answers are wrong." },
    borrowed_from: { type: "array", items: { type: "string" }, description: "Opportunity ids this was built from." },
    demand_evidence: { type: ["string", "null"], description: "Which record in the batch proves someone already pays for this, and what it proves. Null, explicitly, if nothing does." },
    first_dollar_path: { type: "string", description: "How the first payment happens, concretely." },
    week_one: { type: "array", items: { type: "string" }, description: "Three things to do this week. Each doable in a day." },
    falsifiable_test: { type: "string", description: "The cheapest experiment whose failure would end this." },
    kill_signal: { type: "string", description: "What you would have to see to stop." },
    wildcard_used: { type: "string", description: "How the drawn constraint changed the idea. If it did not, say so." },
    novelty: { type: "string", description: "What makes this different from the source opportunities on their own." },
    confidence: { type: "number", description: "0-1, honest." },
  },
};

const SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: ["ventures", "discarded"],
  properties: {
    ventures: { type: "array", items: VENTURE },
    discarded: { type: "array", items: { type: "string" }, description: "Combinations you tried and rejected, one line each with the reason. This is useful output — do not leave it empty." },
  },
};

const BUILD_FRAME = `THIS RUN IS A BUILD RUN. Nothing in the shortlist is going to be
purchased, and a proposal to buy one is a wasted slot. A business for sale is the most
useful thing in the batch for a different reason: a broker has published what a customer
pays, what the work earns, and what the market thinks the whole thing is worth. Treat
every listing as an answer to "what do people already pay for, and how much?", then
propose the version this operator could build and run without buying anything.

Where a venture is built on that kind of evidence, say which listing proved the demand
and what it proved. A venture with no demand evidence anywhere in the batch is allowed,
but it must say so plainly rather than implying somebody validated it.`;

const SYSTEM = `You combine business opportunities harvested from email with the people and
assets available to build them, and propose new ventures.

You are not summarising the opportunities. Each proposal must be something that is not
in any single source email: a recombination, an unbundling, a supplier-to-the-gold-rush
play, or the same idea aimed at a customer the source never mentioned.

Rules:
- "Why us" must name a specific strength, capability or ecosystem asset from the profile.
  If the answer would be true for any competent stranger, the venture is not for this
  operator — discard it and say so.
- Respect the kill criteria absolutely. They are decisions already made.
- Use the drawn constraint. It is there to remove the obvious answer. If it makes an
  idea impossible, that is a result: say which idea it killed.
- Do not invent facts about the source opportunities. Their records are all you know,
  and gaps in them stay gaps.
- Prefer one venture with a real first customer over three with a market size.
- Boring is allowed. Nothing has to be novel to be good, but say plainly when a thing
  is a well-worn playbook rather than an insight.`;

export function promptFor({ profile, shortlist, wildcards, feedback, mode = "buy", evidence = [] }) {
  /* In build mode the listings that did not make the shortlist are still the batch's
     best proof of what people pay for, so they go in as evidence rather than being
     dropped for scoring low as acquisitions. */
  const proof = mode === "build"
    ? evidence.filter((o) => o.kind === "for_sale"
        && (typeof o.profit_monthly_usd === "number" || typeof o.profit_annual_usd === "number"))
      .slice(0, 20)
      .map((o) => ({
        id: o.id, what: o.title, earns: o.profit_monthly_usd ? `$${o.profit_monthly_usd}/mo`
          : `$${o.profit_annual_usd}/yr`, price: o.asking_price_usd, customer: o.customer,
      }))
    : [];

  const parts = [
    mode === "build" ? BUILD_FRAME : "",
    `WHO IS BUILDING\n${JSON.stringify({ operator: profile.operator, agent: profile.agent, ecosystem: profile.ecosystem }, null, 2)}`,
    profile.thesis?.length ? `WHAT THEY BELIEVE\n${profile.thesis.map((t) => `- ${t}`).join("\n")}` : "",
    profile.kill_criteria?.length ? `WHAT THEY WILL NOT DO\n${profile.kill_criteria.map((k) => `- ${k.label}`).join("\n")}` : "",
    `\nSHORTLISTED OPPORTUNITIES (from this week's email)\n${JSON.stringify(shortlist.map((o) => ({
      id: o.id, title: o.title, kind: o.kind, summary: o.summary, source: o.source_label,
      asking_price_usd: o.asking_price_usd, revenue_annual_usd: o.revenue_annual_usd,
      profit_annual_usd: o.profit_annual_usd, tags: o.industry_tags, customer: o.customer,
      problem: o.problem, why_now: o.why_now, fit_score: o.score, the_catch: o.the_catch,
      unknowns: o.missing,
    })), null, 2)}`,
    proof.length ? `\nWHAT THE MARKET IS ALREADY PAYING FOR (from listings in this same batch — evidence, not purchases)\n${JSON.stringify(proof, null, 2)}` : "",
    `\nDRAWN CONSTRAINTS (seed ${wildcards.seed})\n${wildcards.cards.map((c) => `- [${c.deck}] ${c.card}`).join("\n")}`,
    wildcards.collision.length >= 2
      ? `\nFORCED COLLISION — build at least one venture that uses both of these together:\n${wildcards.collision.map((o) => `- ${o.id}: ${o.title}`).join("\n")}`
      : "",
    feedback?.length
      ? `\nPAST VERDICTS FROM THE OPERATOR — do more of what they kept, less of what they rejected:\n${feedback.slice(-25).map((f) => `- [${f.verdict}] ${f.name}: ${f.note || ""}`).join("\n")}`
      : "",
  ];
  return parts.filter(Boolean).join("\n\n");
}

/* No model, no ventures — but the run should still hand back something usable, so
   the brief states the inputs plainly and makes no claims of its own. */
export function offlineBrief({ shortlist, wildcards }) {
  const pair = wildcards.collision.length >= 2 ? wildcards.collision : shortlist.slice(0, 2);
  return {
    ventures: [{
      name: "Unsynthesised combination brief",
      one_liner: `Combine ${pair.map((o) => o.title).join(" with ")} under the drawn constraints.`,
      thesis: "Generated without a model. The inputs below are assembled, not evaluated.",
      who_pays: null,
      why_us: null,
      borrowed_from: pair.map((o) => o.id),
      first_dollar_path: null,
      week_one: ["Read the two source emails in full", "Decide whether the pairing is worth an hour", "Re-run with a model available"],
      falsifiable_test: null,
      kill_signal: null,
      wildcard_used: wildcards.cards.map((c) => c.card).join(" / "),
      novelty: null,
      confidence: 0,
      offline: true,
    }],
    discarded: [],
  };
}

export async function loadFeedback(path) {
  try {
    const raw = await readFile(path, "utf8");
    return raw.split("\n").filter(Boolean).map((l) => JSON.parse(l));
  } catch { return []; }
}

export async function synthesize({ profile, shortlist, wildcards, feedback, count = 3, ask, useLlm = true, mode = "buy", evidence = [] }) {
  if (!useLlm || !ask || !shortlist.length) return offlineBrief({ shortlist, wildcards });
  const user = `${promptFor({ profile, shortlist, wildcards, feedback, mode, evidence })}\n\nPropose ${count} ventures, plus the combinations you rejected.`;
  const result = await ask({ stable: SYSTEM, volatile: "", user, schema: SCHEMA, maxTokens: 16000 });
  return result || offlineBrief({ shortlist, wildcards });
}
