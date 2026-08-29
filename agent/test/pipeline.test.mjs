/* Zero-dependency tests over the deterministic half of the pipeline: everything
   that must hold whether or not a model is reachable. Run: node --test agent/test/ */

import { test } from "node:test";
import assert from "node:assert/strict";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { parseEml, parseMbox, htmlToText, decodeWords, load } from "../lib/email.mjs";
import { classify, itemHint } from "../lib/sources.mjs";
import { extract, heuristicExtract } from "../lib/extract.mjs";
import { kills, signals, heuristicScore, total, scoreAll, DIMENSIONS } from "../lib/fit.mjs";
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
  assert.equal(DIMENSIONS.reduce((n, d) => n + d.weight, 0).toFixed(2), "1.00");
  const perfect = Object.fromEntries(DIMENSIONS.map((d) => [d.key, 5]));
  assert.equal(total(perfect), 5);
  assert.equal(total(Object.fromEntries(DIMENSIONS.map((d) => [d.key, 0]))), 0);
});

test("scoring sorts by fit and zeroes anything killed", async () => {
  const pool = [
    { id: "a", title: "Pet food store", summary: "Inventory included", industry_tags: [], missing: [] },
    { id: "b", title: "Records retrieval for paralegals", summary: "records administration, retainers", industry_tags: ["records"], missing: [] },
  ];
  const scored = await scoreAll(pool, PROFILE, { useLlm: false });
  assert.equal(scored[0].id, "b");
  assert.equal(scored.at(-1).score, 0);
  assert.ok(scored.at(-1).killed.length);
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
