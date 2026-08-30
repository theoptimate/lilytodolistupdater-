/* Scoring: is this opportunity worth *your* time, given who is doing the work.

   The rubric is deliberately about fit rather than quality. A good business you
   have no edge in and no way to reach customers for is a bad opportunity, and a
   dull one your ecosystem already has distribution for is a good one. Kill criteria
   run first and are absolute — they are the things you have decided in advance you
   will not do, and the point of writing them down is that they still apply at 1am
   when a listing looks exciting. */

import { readFile } from "node:fs/promises";

/* Two rubrics, because the question is not the same one.

   Note what is deliberately NOT a scored dimension in build mode: whether an agent
   can run the work. Self-hosted agents are a commodity — anyone can have one by
   Friday — so scoring for automatability rewards a property every competitor shares,
   and it double-counts, since the same fact already shows up in time-to-first-dollar
   and in cost. "Can one person plus a schedule run this?" is a gate, and gates belong
   in kill criteria, where failing one removes the thing instead of docking it a
   fraction of a point.

   BUY asks whether an existing business is worth taking over: can you afford it,
   can you operate it, is the moat real. BUILD asks whether you should make the
   thing yourself, and there the price of somebody else's company is irrelevant —
   what matters is whether anything in the mail proves people already pay for it,
   and whether Mae can run the delivery without a payroll.

   Listings do not stop mattering in build mode. They stop being purchases and
   become the best evidence in the batch: a broker's page is somebody publishing
   what a customer pays, every month, with a multiple attached. */

export const RUBRICS = {
  buy: [
    { key: "edge",         weight: 0.25, label: "Unfair advantage",     ask: "What do you already know or own that a random buyer does not?" },
    { key: "distribution", weight: 0.25, label: "Distribution",         ask: "Can you reach the first 100 customers through a channel you already control?" },
    { key: "speed",        weight: 0.15, label: "Time to first dollar", ask: "Weeks, not quarters, before someone pays." },
    { key: "capital",      weight: 0.15, label: "Capital fit",          ask: "Does it fit the cash and hours actually available?" },
    { key: "durability",   weight: 0.10, label: "Why now / durability", ask: "Is there a reason this is possible now, and a reason it stays possible?" },
    { key: "ecosystem",    weight: 0.10, label: "Ecosystem leverage",   ask: "Does it make the rest of the portfolio stronger, or just busier?" },
  ],
  build: [
    { key: "edge",         weight: 0.25, label: "Unfair advantage",  ask: "What can you do that a competent stranger with the same idea, the same open-source tools and the same weekend cannot? Owning an agent is not an answer — everyone can rent one. Knowledge, access, an existing channel and an existing asset are answers." },
    { key: "demand",       weight: 0.25, label: "Proven demand",     ask: "Does something in this batch prove people already pay for this, and how much? A broker listing with monthly profit is proof; a newsletter's enthusiasm is not." },
    { key: "distribution", weight: 0.25, label: "Route to first ten", ask: "Can you reach the first ten paying customers through a channel you can actually get to this month?" },
    { key: "speed",        weight: 0.15, label: "Time to first dollar", ask: "Weeks, not quarters, before someone pays." },
    { key: "durability",   weight: 0.10, label: "Why now / durability", ask: "Is there a reason this is possible now, and something left over once the obvious version is commoditised?" },
  ],
};

/* The live rubric. Mutated in place by setMode so every importer sees one rubric,
   and the weights calibration writes back land on the right one. */
export const DIMENSIONS = [...RUBRICS.buy];
export let MODE = "buy";

export function setMode(mode) {
  const rubric = RUBRICS[mode];
  if (!rubric) throw new Error(`unknown mode "${mode}" — expected buy or build`);
  DIMENSIONS.length = 0;
  DIMENSIONS.push(...rubric.map((d) => ({ ...d })));
  MODE = mode;
  return DIMENSIONS;
}

export async function loadProfile(path) {
  const profile = JSON.parse(await readFile(path, "utf8"));
  const placeholders = findPlaceholders(profile);
  return { ...profile, _placeholders: placeholders };
}

/* Anything still reading FILL_ME is reported once, loudly, at the end of a run.
   A profile nobody has filled in scores everything the same, which looks like it
   is working. */
function findPlaceholders(node, path = "") {
  const out = [];
  if (typeof node === "string") {
    if (/FILL_ME|TODO/.test(node)) out.push(path);
  } else if (Array.isArray(node)) {
    node.forEach((v, i) => out.push(...findPlaceholders(v, `${path}[${i}]`)));
  } else if (node && typeof node === "object") {
    for (const [k, v] of Object.entries(node)) out.push(...findPlaceholders(v, path ? `${path}.${k}` : k));
  }
  return out;
}

const haystack = (o) => [
  o.title, o.summary, o.problem, o.customer, o.why_now, o.location,
  ...(o.industry_tags || []),
].filter(Boolean).join(" ").toLowerCase();

/* ---- hard filters ------------------------------------------------------- */

export function kills(opportunity, profile) {
  const text = haystack(opportunity);
  const reasons = [];
  for (const rule of profile.kill_criteria || []) {
    if ((rule.match || []).some((k) => text.includes(k.toLowerCase()))) {
      reasons.push(rule.label || `matched ${rule.match.join("/")}`);
    }
  }
  /* Only a stated budget can reject on price. An unset or zero capital figure means
     "not decided yet", and rejecting every priced listing on that basis would empty
     the digest for the least defensible reason there is. */
  const cash = profile.operator?.constraints?.capital_usd;
  const price = opportunity.asking_price_usd;
  if (typeof cash === "number" && cash > 0 && typeof price === "number" && price > cash * (profile.operator?.constraints?.leverage || 1)) {
    reasons.push(`asking $${price.toLocaleString()} is beyond the capital available`);
  }
  return reasons;
}

/* ---- deterministic signal ---------------------------------------------- */

const bag = (...lists) => new Set(lists.flat().filter(Boolean)
  .flatMap((s) => String(s).toLowerCase().split(/[^a-z0-9+]+/))
  .filter((w) => w.length > 3));

export function signals(opportunity, profile) {
  const text = haystack(opportunity);
  const words = new Set(text.split(/[^a-z0-9+]+/).filter((w) => w.length > 3));
  const overlap = (set) => [...set].filter((w) => words.has(w));

  const edgeWords = bag(profile.operator?.strengths, profile.operator?.assets, profile.you?.strengths);
  const distWords = bag(profile.ecosystem?.audiences, profile.ecosystem?.distribution);
  const ecoWords  = bag(profile.ecosystem?.assets, profile.ecosystem?.gaps, [profile.ecosystem?.name]);
  const agentWords = bag(profile.agent?.capabilities);

  return {
    edge_terms: overlap(edgeWords),
    distribution_terms: overlap(distWords),
    ecosystem_terms: overlap(ecoWords),
    automatable_terms: overlap(agentWords),
    thesis_hits: (profile.thesis || []).filter((t) => bag([t]).size && [...bag([t])].some((w) => words.has(w))),
  };
}

/* Fallback rubric when no model is available. Crude on purpose — it ranks by
   evidence of overlap and by how completely the email described the thing. */
export function heuristicScore(opportunity, profile) {
  const s = signals(opportunity, profile);
  const cap = (n) => Math.max(0, Math.min(5, n));
  const guess = {
    edge: cap(1 + s.edge_terms.length),
    distribution: cap(1 + s.distribution_terms.length * 1.5),
    speed: cap(opportunity.kind === "for_sale" ? 3 : 2),
    capital: cap(opportunity.asking_price_usd ? 2 : 3),
    durability: cap(opportunity.why_now ? 3 : 2),
    ecosystem: cap(1 + s.ecosystem_terms.length * 1.5),
    /* Build-mode proxy: a stated monthly profit means somebody is paying. */
    demand: cap((typeof opportunity.profit_monthly_usd === "number"
      || typeof opportunity.profit_annual_usd === "number") ? 4 : 1),
  };
  const scores = Object.fromEntries(DIMENSIONS.map((d) => [d.key, guess[d.key] ?? 2]));
  return { scores, rationale: {}, heuristic: true, signals: s };
}

/* Calibration (see calibrate.mjs) can replace the starting weights with ones
   derived from what you actually kept. Applied here so every caller gets them. */
export function applyWeights(weights) {
  if (!weights) return false;
  for (const d of DIMENSIONS) if (typeof weights[d.key] === "number") d.weight = weights[d.key];
  return true;
}

export function total(scores) {
  return Number(DIMENSIONS.reduce((sum, d) => sum + d.weight * (scores[d.key] || 0), 0).toFixed(2));
}

/* ---- model scoring ------------------------------------------------------ */

const SCORE_SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: ["scored"],
  properties: {
    scored: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["id", "scores", "rationale", "the_catch", "first_check"],
        properties: {
          id: { type: "string" },
          scores: {
            type: "object",
            additionalProperties: false,
            required: DIMENSIONS.map((d) => d.key),
            properties: Object.fromEntries(DIMENSIONS.map((d) => [d.key, { type: "number", description: `0-5. ${d.ask}` }])),
          },
          rationale: {
            type: "object",
            additionalProperties: false,
            required: DIMENSIONS.map((d) => d.key),
            properties: Object.fromEntries(DIMENSIONS.map((d) => [d.key, { type: "string", description: "One sentence, naming the specific asset or gap." }])),
          },
          the_catch: { type: "string", description: "The strongest reason to walk away." },
          first_check: { type: "string", description: "The cheapest thing that would falsify this in a week." },
        },
      },
    },
  },
};

const rubricText = (profile) => `You score business opportunities for one specific operator, not in the abstract.

THE QUESTION THIS RUN IS ASKING: ${MODE === "build"
  ? `what should this operator BUILD? Nothing here is going to be purchased. A business for sale is evidence — somebody is publishing what a customer pays and what the work earns — and it is scored on whether it points at something worth building, never on whether it is worth buying.`
  : `what is worth acquiring and operating?`}

WHO IS DOING THE WORK
${JSON.stringify({ operator: profile.operator, agent: profile.agent, ecosystem: profile.ecosystem }, null, 2)}

WHAT THEY BELIEVE
${(profile.thesis || []).map((t) => `- ${t}`).join("\n") || "- (none recorded)"}

WHAT THEY WILL NOT DO
${(profile.kill_criteria || []).map((k) => `- ${k.label}`).join("\n") || "- (none recorded)"}

SCORING, 0-5 each:
${DIMENSIONS.map((d) => `- ${d.key} (${d.label}, weight ${d.weight}): ${d.ask}`).join("\n")}

Rules:
- Score fit, not general attractiveness. A great business with no edge here scores low.
- 3 is "plausible with work". Reserve 5 for something the operator or the ecosystem
  can do that a stranger with the same money cannot.
- Cite the specific asset, audience or capability by name in the rationale. If you
  cannot name one, the score is 2 or below.
- Never invent facts about the opportunity that are absent from its record.`;

export async function scoreAll(opportunities, profile, { useLlm = true, ask, chunk = 10, precomputed = null, mode = MODE } = {}) {
  const out = new Map((precomputed || []).map((row) => [row.id, row]));

  if (useLlm && ask) {
    const pending = opportunities.filter((o) => !out.has(o.id));
    for (let i = 0; i < pending.length; i += chunk) {
      const batch = pending.slice(i, i + chunk);
      const user = `Score these ${batch.length} opportunities.\n\n${JSON.stringify(
        batch.map((o) => ({
          id: o.id, title: o.title, kind: o.kind, summary: o.summary, source: o.source_label,
          asking_price_usd: o.asking_price_usd, revenue_annual_usd: o.revenue_annual_usd,
          profit_annual_usd: o.profit_annual_usd, location: o.location, tags: o.industry_tags,
          customer: o.customer, problem: o.problem, why_now: o.why_now, missing: o.missing,
          financial_trust: o.financial_trust,
        })), null, 2)}`;
      const result = await ask({ stable: rubricText(profile), user, schema: SCORE_SCHEMA });
      for (const row of result?.scored || []) out.set(row.id, row);
    }
  }

  return opportunities.map((o) => {
    const scored = out.get(o.id) || heuristicScore(o, profile);
    /* Kill criteria are about what you will not build. In build mode a listing is
       evidence about a market, not a proposal, so rejecting it would delete the
       proof rather than the plan — the criteria are recorded against it and not
       applied. */
    /* Kill criteria say what you will not build or buy. They belong on proposals
       only: in build mode that is ideas and trends, since a listing is evidence and
       a launch announcement is a competitor sighting — neither is something you are
       proposing to do, and rejecting them deletes information rather than a plan. */
    const proposal = mode === "build"
      ? ["idea", "trend", "other"].includes(o.kind)
      : ["for_sale", "company", "other"].includes(o.kind);
    const evidenceOnly = !proposal;
    const killed = evidenceOnly ? [] : kills(o, profile);
    return {
      ...o,
      scores: scored.scores,
      rationale: scored.rationale || {},
      the_catch: scored.the_catch || null,
      first_check: scored.first_check || null,
      signals: signals(o, profile),
      heuristic_score: Boolean(scored.heuristic),
      killed,
      kill_notes: evidenceOnly ? kills(o, profile) : [],
      score: killed.length ? 0 : total(scored.scores),
    };
  }).sort((a, b) => b.score - a.score);
}
