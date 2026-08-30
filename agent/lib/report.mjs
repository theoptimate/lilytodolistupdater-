/* The digest. Markdown, because it reads the same in a terminal, an email and a
   commit. Every figure is followed by where it came from and how much the source is
   worth trusting — an unsourced number in a digest becomes a fact by Thursday. */

import { DIMENSIONS } from "./fit.mjs";

const money = (n) => (typeof n === "number" ? `$${Math.round(n).toLocaleString()}` : "—");
/* An annual figure when the email gave one; otherwise the monthly figure, labelled
   as monthly. Never the monthly figure multiplied by twelve. */
const earnings = (o) => (typeof o.profit_annual_usd === "number"
  ? `${money(o.profit_annual_usd)}/yr`
  : typeof o.profit_monthly_usd === "number" ? `${money(o.profit_monthly_usd)}/mo` : "—");
const pct = (n) => `${Math.round((n / 5) * 100)}%`;

const bar = (score) => {
  const filled = Math.round((score / 5) * 5);
  return "█".repeat(filled) + "·".repeat(5 - filled);
};

export function render(run) {
  const { started, counts, opportunities, ventures, discarded, wildcards, profile, warnings, cost, mode } = run;
  const build = mode === "build";
  const top = opportunities.filter((o) => !o.killed.length);
  /* In build mode a priced listing is evidence about a market, and mixing it into the
     same ranked table as an idea invites reading it as a shopping list. */
  const buildable = build ? top.filter((o) => ["idea", "trend", "other"].includes(o.kind)) : top;
  const proof = build ? top.filter((o) => o.kind === "for_sale") : [];
  /* Launch announcements are neither. They are who you will meet. */
  const sightings = build ? top.filter((o) => o.kind === "company") : [];
  const killed = opportunities.filter((o) => o.killed.length);
  const L = [];

  L.push(`# Venture digest — ${started.slice(0, 10)}`);
  L.push("");
  L.push(`${counts.messages} email${counts.messages === 1 ? "" : "s"} · ${counts.extracted} opportunit${counts.extracted === 1 ? "y" : "ies"} extracted · ${counts.fresh} new · ${counts.repeats} seen before · ${killed.length} auto-rejected`);
  L.push("");
  if (build) {
    L.push("**Build run.** Nothing here is a shopping list. The listings are evidence of what people already pay for; the ventures are what to make.");
    L.push("");
  }
  L.push(`Seed \`${wildcards.seed}\` — rerun with \`--seed ${wildcards.seed}\` to reproduce this exact draw.`);
  L.push("");

  if (warnings.length) {
    L.push("## Read this first");
    L.push("");
    for (const w of warnings) L.push(`- ${w}`);
    L.push("");
  }

  L.push("## Ventures worth a week");
  L.push("");
  if (!ventures.length) L.push("_Nothing cleared the bar this run._");
  for (const v of ventures) {
    L.push(`### ${v.name}`);
    L.push("");
    L.push(`**${v.one_liner || ""}**`);
    L.push("");
    if (v.thesis) L.push(v.thesis);
    L.push("");
    if (v.who_pays) L.push(`- **Who pays** — ${v.who_pays}`);
    if (v.demand_evidence) L.push(`- **Someone already pays for this** — ${v.demand_evidence}`);
    if (v.why_us) L.push(`- **Why us** — ${v.why_us}`);
    if (v.first_dollar_path) L.push(`- **First dollar** — ${v.first_dollar_path}`);
    if (v.falsifiable_test) L.push(`- **Test that would kill it** — ${v.falsifiable_test}`);
    if (v.kill_signal) L.push(`- **Stop if** — ${v.kill_signal}`);
    if (v.wildcard_used) L.push(`- **Constraint** — ${v.wildcard_used}`);
    if (v.novelty) L.push(`- **What's actually new** — ${v.novelty}`);
    if (typeof v.confidence === "number") L.push(`- **Confidence** — ${Math.round(v.confidence * 100)}%`);
    if (v.borrowed_from?.length) {
      const titles = v.borrowed_from.map((id) => opportunities.find((o) => o.id === id)?.title || id);
      L.push(`- **Built from** — ${titles.join(" · ")}`);
    }
    L.push("");
    if (v.week_one?.length) {
      L.push("Week one:");
      L.push("");
      for (const step of v.week_one) L.push(`1. ${step}`);
      L.push("");
    }
  }

  if (discarded?.length) {
    L.push("<details><summary>Combinations tried and rejected</summary>");
    L.push("");
    for (const d of discarded) L.push(`- ${d}`);
    L.push("");
    L.push("</details>");
    L.push("");
  }

  if (build && proof.length) {
    L.push("## What people are already paying for");
    L.push("");
    L.push("_Listings from this batch, read as market evidence. The price column is what a broker thinks the whole thing is worth — useful as a ceiling, not as a plan._");
    L.push("");
    L.push("| What it does | Earns | Priced at | Who pays | What it proves |");
    L.push("|---|---|---|---|---|");
    for (const o of proof.slice(0, 15)) {
      const title = o.url ? `[${o.title}](${o.url})` : o.title;
      L.push(`| ${title} | ${earnings(o)} | ${money(o.asking_price_usd)} | ${(o.customer || "—").replace(/\|/g, "/")} | ${(o.rationale?.demand || o.the_catch || "—").replace(/\|/g, "/")} |`);
    }
    L.push("");
  }

  L.push(build ? "## Buildable, ranked" : "## Shortlist");
  L.push("");
  L.push("| Fit | Opportunity | Source | Asking | Earnings | The catch |");
  L.push("|---|---|---|---|---|---|");
  for (const o of buildable.slice(0, 15)) {
    const title = o.url ? `[${o.title}](${o.url})` : o.title;
    const cut = o.price_cut_pct > 0 ? ` ↓${o.price_cut_pct}%` : (o.price_move ? ` ↓${o.price_move.pct}%` : "");
    L.push(`| ${bar(o.score)} ${o.score.toFixed(1)} | ${title} | ${o.source_label} | ${money(o.asking_price_usd)}${cut} | ${earnings(o)} | ${(o.the_catch || "—").replace(/\|/g, "/")} |`);
  }
  L.push("");

  const detailed = (build ? buildable : top).slice(0, 5);
  if (detailed.length) {
    L.push("## Why those scored the way they did");
    L.push("");
    for (const o of detailed) {
      L.push(`**${o.title}** — ${o.score.toFixed(2)}/5 · ${o.source_label} · financials ${o.financial_trust}${o.seen_count > 1 ? ` · seen ${o.seen_count}×` : ""}`);
      L.push("");
      for (const d of DIMENSIONS) {
        const s = o.scores?.[d.key];
        if (typeof s !== "number") continue;
        L.push(`- ${d.label} ${pct(s)} — ${o.rationale?.[d.key] || "(heuristic score, no rationale)"}`);
      }
      if (o.first_check) L.push(`- **Cheapest check** — ${o.first_check}`);
      if (o.price_history?.length > 1) {
        L.push(`- **Price history** — ${o.price_history.map((h) => `${money(h.price)} (${h.at.slice(0, 10)})`).join(" → ")}`);
      } else if (o.price_move) {
        L.push(`- **Price cut** — ${money(o.price_move.from)} → ${money(o.price_move.to)}, down ${o.price_move.pct}%`);
      }
      if (o.verification) {
        const v = o.verification;
        L.push(`- **Checked against the web** — ${v.found === false ? "could not find this listing online" : `still listed: ${v.still_listed || "unknown"}`}${v.competitors?.length ? `; already done by ${v.competitors.map((c) => c.name).join(", ")}` : ""}`);
        for (const c of v.contradictions || []) L.push(`  - **Contradiction** — the email says "${c.claim}"; ${c.evidence} (${c.url})`);
        if (v.regulatory) L.push(`  - **Regulatory** — ${v.regulatory}`);
      }
      if (o.missing?.length) L.push(`- **Still unknown** — ${o.missing.join("; ")}`);
      if (o.evidence?.length) L.push(`- **Quoted from the email** — ${o.evidence.map((e) => `"${e}"`).join(" ")}`);
      L.push(`- **Provenance** — ${o.provenance.subject} (${o.provenance.from}, ${o.provenance.received.slice(0, 10)})`);
      L.push("");
    }
  }

  if (sightings.length) {
    L.push("## Who else is moving");
    L.push("");
    L.push("_Launch announcements, not opportunities. Recorded because they tell you which windows are being entered right now._");
    L.push("");
    for (const o of sightings) L.push(`- **${o.title}** — ${o.summary} ${o.rationale?.demand || ""}`);
    L.push("");
  }

  if (killed.length) {
    L.push("<details><summary>Auto-rejected against your kill criteria</summary>");
    L.push("");
    for (const o of killed) L.push(`- **${o.title}** — ${o.killed.join("; ")}`);
    L.push("");
    L.push("</details>");
    L.push("");
  }

  L.push("---");
  L.push("");
  L.push(`Profile: \`${profile}\`${run.calibrated ? " · weights calibrated from your past verdicts" : ""}${cost ? ` · model spend this run: $${cost.toFixed(3)}` : ""}`);
  L.push("");
  L.push("Rate anything here with `node agent/run.mjs feedback \"<name>\" keep|drop \"<why>\"` — verdicts feed the next run's synthesis.");
  return L.join("\n");
}
