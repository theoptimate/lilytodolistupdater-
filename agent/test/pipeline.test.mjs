/* Zero-dependency tests over the deterministic half of the pipeline: everything
   that must hold whether or not a model is reachable. Run: node --test agent/test/ */

import { test } from "node:test";
import assert from "node:assert/strict";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { parseEml, parseMbox, htmlToText, decodeWords, load } from "../lib/email.mjs";
import { classify, itemHint } from "../lib/sources.mjs";
import { extract, heuristicExtract } from "../lib/extract.mjs";
import { kills, signals, heuristicScore, total, scoreAll, setMode, RUBRICS, DIMENSIONS } from "../lib/fit.mjs";
import { rng, sample } from "../lib/rng.mjs";
import { draw } from "../lib/wildcard.mjs";
import { reconcile } from "../lib/store.mjs";
import { render } from "../lib/report.mjs";
import { offlineBrief, promptFor } from "../lib/synth.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const SAMPLES = join(HERE, "..", "samples");

const PROFILE = {
  operator: {
    name: "Operator",
    strengths: ["logistics operations", "records administration"],
    assets: ["a mailing list of paralegals"],
    constraints: { capital_usd: 200000, leverage: 1, hours_per_week: 10 },
  },
  agent: { capabilities: ["structured extraction", "software"] },
  ecosystem: { name: "Mae", assets: ["paralegal training content"], audiences: ["paralegals"], distribution: ["weekly newsletter"], gaps: ["recurring revenue"] },
  thesis: ["boring services with recurring contracts"],
  kill_criteria: [{ label: "Inventory-heavy retail", match: ["inventory"] }],
  _placeholders: [],
};

test("eml headers, encoded subjects and quoted-printable bodies decode", async () => {
  const [idea] = await load(join(SAMPLES, "idea-browser.eml"));
  assert.match(idea.subject, /Permit expediting for solar installers/);
  assert.equal(idea.fromEmail, "daily@ideabrowser.com");
  assert.match(idea.text, /3,000\+\s+jurisdictions/);

  const [listings] = await load(join(SAMPLES, "bizbuysell-digest.eml"));
  assert.match(listings.text, /Asking Price: \$485,000/);
  assert.match(listings.text, /bizbuysell\.com\/listing\/2214887/, "links survive html-to-text");
  assert.doesNotMatch(listings.text, /<div>/, "tags are stripped");
});

test("RFC 2047 words and html entities decode", () => {
  assert.equal(decodeWords("=?utf-8?B?SGVsbG8=?="), "Hello");
  assert.equal(htmlToText("<p>a &amp; b</p>"), "a & b");
});

test("an mbox splits into its messages", () => {
  const mbox = ["From a@b Mon", "Subject: One", "", "body one", "From c@d Tue", "Subject: Two", "", "body two"].join("\n");
  const msgs = parseMbox(mbox);
  assert.equal(msgs.length, 2);
  assert.equal(msgs[1].subject, "Two");
});

test("sources are classified by sender, then subject, then body", async () => {
  const files = await load(SAMPLES);
  const byId = Object.fromEntries(files.map((m) => [classify(m).id, m]));
  assert.ok(byId["idea-browser"] && byId["business-for-sale"] && byId["ifttt-alert"]);

  const bare = parseEml("From: someone@nowhere.example\nSubject: New listing for sale\n\nAsking price: $1,000");
  assert.equal(classify(bare).id, "business-for-sale", "subject rules catch unknown senders");

  const digest = files.find((m) => classify(m).id === "business-for-sale");
  assert.equal(itemHint(digest, classify(digest)), 3, "a three-listing digest is announced as three");
});

test("heuristic extraction reads money without inventing it", async () => {
  const [listings] = await load(join(SAMPLES, "bizbuysell-digest.eml"));
  const { opportunities } = heuristicExtract(listings, classify(listings));
  assert.equal(opportunities[0].asking_price_usd, 485000);
  assert.equal(opportunities[0].revenue_annual_usd, 1120000);
  assert.equal(opportunities[0].confidence, 0.2);
});

test("extraction stamps provenance on every record", async () => {
  const [idea] = await load(join(SAMPLES, "idea-browser.eml"));
  const { opportunities } = await extract(idea, { useLlm: false });
  for (const o of opportunities) {
    assert.equal(o.provenance.message_id, idea.id);
    assert.equal(o.source, "idea-browser");
    assert.ok(o.id.length === 16);
  }
});

test("kill criteria reject on keywords and on price", () => {
  const pet = { title: "Pet food store", summary: "Inventory of $40,000 included", industry_tags: [], asking_price_usd: 145000 };
  assert.equal(kills(pet, PROFILE).length, 1);

  const dear = { title: "Big co", summary: "clean", industry_tags: [], asking_price_usd: 900000 };
  assert.match(kills(dear, PROFILE)[0], /beyond the capital available/);

  const fine = { title: "Records retrieval", summary: "law firm clients on retainer", industry_tags: [], asking_price_usd: 150000 };
  assert.deepEqual(kills(fine, PROFILE), []);
});

test("signals find the overlap between an opportunity and the profile", () => {
  const o = { title: "Records retrieval service", summary: "records administration for paralegals", industry_tags: ["records"] };
  const s = signals(o, PROFILE);
  assert.ok(s.edge_terms.includes("records"));
  assert.ok(s.distribution_terms.includes("paralegals"));
});

test("weights sum to one and the total respects them", () => {
  setMode("buy");
  assert.equal(DIMENSIONS.reduce((n, d) => n + d.weight, 0).toFixed(2), "1.00");
  const perfect = Object.fromEntries(DIMENSIONS.map((d) => [d.key, 5]));
  assert.equal(total(perfect), 5);
  assert.equal(total(Object.fromEntries(DIMENSIONS.map((d) => [d.key, 0]))), 0);
});

test("scoring sorts by fit and zeroes anything killed", async () => {
  const pool = [
    { id: "a", kind: "for_sale", title: "Pet food store", summary: "Inventory included", industry_tags: [], missing: [] },
    { id: "b", kind: "for_sale", title: "Records retrieval for paralegals", summary: "records administration, retainers", industry_tags: ["records"], missing: [] },
  ];
  const scored = await scoreAll(pool, PROFILE, { useLlm: false, mode: "buy" });
  assert.equal(scored[0].id, "b");
  assert.equal(scored.at(-1).score, 0);
  assert.ok(scored.at(-1).killed.length);
});

test("in build mode a listing is evidence, not a rejected purchase", async () => {
  setMode("build");
  const pool = [
    { id: "listing", kind: "for_sale", title: "Pet food store", summary: "Inventory included", industry_tags: [], missing: [] },
    { id: "idea", kind: "idea", title: "Dropship pet food", summary: "Inventory and shipping", industry_tags: [], missing: [] },
  ];
  const scored = await scoreAll(pool, PROFILE, { useLlm: false, mode: "build" });
  const listing = scored.find((o) => o.id === "listing");
  const idea = scored.find((o) => o.id === "idea");

  assert.deepEqual(listing.killed, [], "a listing is not rejected — it is evidence about a market");
  assert.ok(listing.kill_notes.length, "the criteria it would have tripped are still recorded");
  assert.ok(listing.score > 0);

  assert.ok(idea.killed.length, "a proposal to build the same thing is rejected");
  assert.equal(idea.score, 0);
  setMode("buy");
});

test("the two rubrics ask different questions and both sum to one", () => {
  for (const mode of ["buy", "build"]) {
    const dims = setMode(mode);
    assert.equal(dims.reduce((n, d) => n + d.weight, 0).toFixed(2), "1.00", mode);
  }
  setMode("build");
  assert.ok(DIMENSIONS.some((d) => d.key === "operability"), "build asks whether Mae can run it");
  assert.ok(DIMENSIONS.some((d) => d.key === "demand"), "build asks who already pays");
  assert.ok(!DIMENSIONS.some((d) => d.key === "capital"), "build does not ask what it costs to buy");
  setMode("buy");
  assert.ok(DIMENSIONS.some((d) => d.key === "capital"), "buy does");
  assert.throws(() => setMode("acquihire"), /unknown mode/);
});

test("the same seed draws the same cards, a different seed does not", async () => {
  const decks = { constraint: ["a", "b", "c", "d"], channel: ["e", "f", "g", "h"] };
  const pool = [{ id: "1", title: "one" }, { id: "2", title: "two" }, { id: "3", title: "three" }];
  const one = draw(decks, { seed: "2026-08-29", collisionsFrom: pool });
  const two = draw(decks, { seed: "2026-08-29", collisionsFrom: pool });
  const other = draw(decks, { seed: "2026-08-30", collisionsFrom: pool });
  assert.deepEqual(one, two);
  assert.notDeepEqual(one.cards, other.cards);
  assert.equal(one.collision.length, 2);
  assert.notEqual(one.collision[0].id, one.collision[1].id, "a collision never pairs a thing with itself");
});

test("rng is uniform enough to be worth seeding", () => {
  const next = rng("x");
  const draws = Array.from({ length: 2000 }, next);
  const mean = draws.reduce((a, b) => a + b) / draws.length;
  assert.ok(mean > 0.45 && mean < 0.55, `mean ${mean}`);
  assert.equal(new Set(sample(rng("y"), [1, 2, 3, 4, 5], 5)).size, 5, "sampling does not repeat");
});

test("the ledger counts a second sighting instead of duplicating it", () => {
  const ledger = new Map();
  const o = { id: "x1", title: "Thing", provenance: { message_id: "m1" } };
  assert.equal(reconcile(ledger, [o]).fresh.length, 1);
  const again = reconcile(ledger, [{ ...o, provenance: { message_id: "m2" } }]);
  assert.equal(again.fresh.length, 0);
  assert.equal(again.repeats.length, 1);
  assert.equal(ledger.get("x1").seen_count, 2);
  assert.equal(ledger.size, 1);
});

test("the digest shows provenance, warnings and the seed", () => {
  const o = {
    id: "x1", title: "Records retrieval", url: "https://example.com/1", source_label: "Business for sale",
    financial_trust: "seller-claimed", asking_price_usd: 310000, profit_annual_usd: 132000,
    scores: heuristicScore({ title: "Records retrieval", summary: "", industry_tags: [] }, PROFILE).scores,
    rationale: {}, killed: [], score: 3.1, seen_count: 2, missing: ["client concentration"],
    evidence: ["Cash Flow: $132,000"], the_catch: "two contractors carry the work",
    provenance: { subject: "3 new businesses", from: "alerts@bizbuysell.com", received: "2026-08-27T06:15:00.000Z" },
  };
  const md = render({
    started: "2026-08-29T00:00:00.000Z",
    counts: { messages: 3, extracted: 5, fresh: 4, repeats: 1 },
    opportunities: [o], ventures: [], discarded: [],
    wildcards: { seed: "2026-08-29", cards: [{ deck: "constraint", card: "No new software." }], collision: [] },
    profile: "agent/config/profile.json", warnings: ["profile is unfilled"], cost: 0.12,
  });
  assert.match(md, /--seed 2026-08-29/);
  assert.match(md, /profile is unfilled/);
  assert.match(md, /alerts@bizbuysell\.com/);
  assert.match(md, /Cash Flow: \$132,000/);
  assert.match(md, /\$310,000/);
});

test("the offline brief makes no claims it cannot support", () => {
  const shortlist = [{ id: "a", title: "One" }, { id: "b", title: "Two" }];
  const { ventures } = offlineBrief({ shortlist, wildcards: { seed: "s", cards: [{ deck: "constraint", card: "c" }], collision: shortlist } });
  assert.equal(ventures[0].why_us, null);
  assert.equal(ventures[0].confidence, 0);
  assert.ok(ventures[0].offline);
});

test("the synthesis prompt carries the profile, the constraint and past verdicts", () => {
  const prompt = promptFor({
    profile: PROFILE,
    shortlist: [{ id: "a", title: "Records retrieval", missing: [] }],
    wildcards: { seed: "s", cards: [{ deck: "constraint", card: "No new software may be written." }], collision: [] },
    feedback: [{ verdict: "drop", name: "Old idea", note: "no distribution" }],
  });
  assert.match(prompt, /Mae/);
  assert.match(prompt, /No new software may be written/);
  assert.match(prompt, /\[drop\] Old idea/);
  assert.match(prompt, /Inventory-heavy retail/);
});

/* ---- the stages added after the first batch ----------------------------- */

import { forms, auditRecord } from "../eval/eval.mjs";
import { join as joinVerdicts, analyse, reweight, MIN_JUDGED } from "../lib/calibrate.mjs";

test("the audit recognises the ways an email writes a number", () => {
  assert.ok(forms(485000).includes("485,000"));
  assert.ok(forms(485000).includes("485k"));
  assert.ok(forms(2617908).includes("2,617,908"));
  assert.ok(forms(12699.68).includes("12,699.68"));
  assert.ok(forms(4000000).includes("4m"));
});

test("the audit fails a figure that is not in the email, and passes one that is", () => {
  const email = "Asking Price: $485,000\nCash Flow: $210,000\nEstablished 1998.";
  const good = { title: "x", asking_price_usd: 485000, profit_annual_usd: 210000, evidence: ["Asking Price: $485,000"] };
  assert.deepEqual(auditRecord(good, email).unsupported, []);
  assert.deepEqual(auditRecord(good, email).badQuotes, []);

  const invented = { title: "x", asking_price_usd: 485000, revenue_annual_usd: 1400000, evidence: [] };
  assert.equal(auditRecord(invented, email).unsupported.length, 1);
  assert.equal(auditRecord(invented, email).unsupported[0].field, "revenue_annual_usd");

  const misquoted = { title: "x", evidence: ["Highly profitable turnkey operation with strong margins"] };
  assert.equal(auditRecord(misquoted, email).badQuotes.length, 1);
});

test("a repeat sighting at a lower price becomes a price history", () => {
  const ledger = new Map();
  const listing = (price, at) => ({
    id: "p1", title: "Channel", asking_price_usd: price,
    provenance: { message_id: `m-${at}`, received: `${at}T00:00:00.000Z` },
  });
  reconcile(ledger, [listing(49000, "2026-08-07")]);
  reconcile(ledger, [listing(48000, "2026-08-17")]);
  reconcile(ledger, [listing(47000, "2026-08-25")]);

  const row = ledger.get("p1");
  assert.equal(row.seen_count, 3);
  assert.equal(row.asking_price_usd, 47000, "the row carries the current price");
  assert.deepEqual(row.price_history.map((h) => h.price), [49000, 48000, 47000]);
  assert.deepEqual(row.price_history.map((h) => h.at.slice(0, 10)), ["2026-08-07", "2026-08-17", "2026-08-25"]);
  assert.equal(row.price_cut_pct, 4);

  reconcile(ledger, [listing(47000, "2026-08-29")]);
  assert.equal(ledger.get("p1").price_history.length, 3, "an unchanged price does not add a point");
});

test("calibration refuses to run on too little evidence", async () => {
  const rows = joinVerdicts(new Map(), [{ target: "nothing", verdict: "keep" }]);
  assert.equal(rows.length, 0);
  assert.ok(MIN_JUDGED >= 8, "the floor exists so noise is not mistaken for signal");
});

test("calibration finds the dimension that separated keeps from drops", () => {
  const scores = (edge, dist) => ({ edge, distribution: dist, speed: 3, capital: 3, durability: 3, ecosystem: 3 });
  const rows = [
    { verdict: "keep", scores: scores(5, 3) }, { verdict: "keep", scores: scores(5, 3) },
    { verdict: "keep", scores: scores(4, 3) }, { verdict: "keep", scores: scores(5, 3) },
    { verdict: "drop", scores: scores(1, 3) }, { verdict: "drop", scores: scores(2, 3) },
    { verdict: "drop", scores: scores(1, 3) }, { verdict: "drop", scores: scores(1, 3) },
  ];
  const { per, keeps, drops } = analyse(rows);
  assert.equal(keeps, 4);
  assert.equal(drops, 4);
  assert.ok(per.edge.separation > 3, "edge separated them");
  assert.equal(per.distribution.separation, 0, "distribution did not");
  assert.equal(per.speed.separation, 0);

  const weights = reweight(per);
  const sum = Object.values(weights).reduce((a, b) => a + b, 0);
  assert.ok(Math.abs(sum - 1) < 0.01, `weights still sum to 1, got ${sum}`);
  assert.ok(weights.edge > 0.25, "the dimension that predicted gains weight");
  assert.ok(weights.distribution < 0.25, "the one that did not, loses it");
});

test("a verdict joins to a ledger row by id or by part of its title", () => {
  const ledger = new Map([["a1", { id: "a1", title: "Empire Flippers #94153 - Amazon reimbursements", scores: { edge: 4 } }]]);
  assert.equal(joinVerdicts(ledger, [{ target: "a1", verdict: "keep" }]).length, 1);
  assert.equal(joinVerdicts(ledger, [{ target: "amazon reimbursements", verdict: "drop" }]).length, 1);
  assert.equal(joinVerdicts(ledger, [{ target: "something else entirely", verdict: "drop" }]).length, 0);
});
