# Venture agent

Reads business email — curated idea newsletters, automated new-company alerts,
business-for-sale listings — pulls the concrete opportunities out of it, ranks them
against who is actually doing the work, and combines the survivors with a drawn
constraint into candidate ventures.

It is a separate subsystem from the site in this repo: its own `package.json`, its own
tests, its own dependency. `npm run check` at the root does not cover it.

```
  email (.eml / .mbox / JSON)
        │
   [1] ingest      decode MIME, quoted-printable, HTML → text
   [2] classify    which feed is this, and how much is its arithmetic worth
   [3] extract     one record per listing/idea, every number quotable  ← model
   [4] audit       every figure traced back to its email, or the run fails
   [5] dedupe      fingerprint against the ledger; price history across weeks
   [6] score       fit against you + Claude + Mae, under the mode's rubric ← model
   [7] verify      the listing, the competitors, the contradictions     ← model + web
   [8] wildcard    seeded draw: constraints, plus a forced collision
   [9] synthesise  candidate ventures, each with a first customer       ← model
        │
  digest.md + ledger.jsonl + run.json
```

## Quick start

```bash
npm --prefix agent install          # the Anthropic SDK, and nothing else
cp agent/config/profile.example.json agent/config/profile.json
$EDITOR agent/config/profile.json   # this is the part that matters — see below
export ANTHROPIC_API_KEY=sk-ant-…   # or: ant auth login

node agent/run.mjs --in agent/samples
node agent/run.mjs --in ~/mail/ventures --seed 2026-08-29 --ventures 3
cat gmail-dump.json | node agent/run.mjs --in -
node --test agent/test/*.test.mjs
```

Every stage has a deterministic fallback, so the pipeline runs with no key and no
network — it just gets much worse, and says so at the top of the digest.

| Flag | Default | |
|---|---|---|
| `--in` | `agent/samples` | file, directory, or `-` for JSON on stdin |
| `--profile` | `config/profile.json` | falls back to the example, loudly |
| `--seed` | today's date | same seed, same wildcard draw |
| `--shortlist` | 12 | how many opportunities reach synthesis |
| `--ventures` | 3 | how many candidates to propose |
| `--limit` | all | stop after N emails (cheap first run) |
| `--mode` | from the profile | `build` or `buy` — see below |
| `--enrich [n]` | off | check the top n against the web before ranking them |
| `--records` / `--scores` / `--ventures-in` | — | stages an assistant already did (see the bridge) |
| `--no-llm` | off | force the heuristic path |
| `--out` | `agent/out` | where the digest lands |

`AGENT_MODEL` (default `claude-opus-5`) and `AGENT_EFFORT` (default `high`) override
the model and how hard it thinks.

## Getting the email in

Deliberately not this program's job — mail credentials are the one part of this worth
keeping outside a script that also writes files. Any of these work:

1. **Gmail via an MCP-connected assistant.** Ask it to search and dump, e.g.
   `from:(ideabrowser.com OR bizbuysell.com OR ifttt.com) newer_than:7d`, writing
   `[{ "id", "from", "subject", "date", "body" }, …]` to a file. That shape is what
   `--in file.json` expects; `html` is accepted instead of `body`. The same assistant
   can do the model stages too — see the bridge below.
2. **A Gmail filter → label → export.** Anything that leaves `.eml` files in a folder.
3. **A forwarding rule** into a mailbox you `mbox`-export weekly.
4. **IMAP,** if you want it live — write the fetch, hand this the JSON.

Filter aggressively upstream. Cost and quality both scale with what you let in.

## Two modes, two questions

```bash
node agent/run.mjs --in <mail> --mode build     # what should we make?
node agent/run.mjs --in <mail> --mode buy       # what is worth taking over?
```

**buy** asks whether an existing business is worth operating: can you afford it, can
you run it, is the moat real. Its rubric weighs capital fit and ecosystem leverage.

**build** asks something else entirely, and the difference is not cosmetic:

- A listing stops being a purchase and becomes **evidence**. A broker page is
  somebody publishing what a customer pays, what the work earns, and what the market
  thinks the whole thing is worth. That is the most reliable demand data in the
  batch, and it is free.
- The rubric changes: capital fit disappears (you are not buying), and two dimensions
  take its place — **proven demand** ("does something in this batch show people
  already paying for this, and how much?") and **agent-operable** ("can Mae run the
  delivery on a loop, or does it need hands and a payroll?").
- **Kill criteria only apply to proposals.** Rejecting a listing for mentioning
  inventory would delete the evidence rather than the plan, so in build mode the
  criteria are recorded against listings and applied only to ideas. Launch
  announcements are neither, and get their own section: who else is moving.
- Synthesis is told, in the prompt, that a proposal to buy something is a wasted
  slot, and every venture must name the record that proves demand — or say plainly
  that nothing does.

The digest reflects the split: *What people are already paying for* (evidence),
*Buildable, ranked* (proposals), *Who else is moving* (competitors).

## The bridge: running the model stages without an API key

An assistant that already reads the mailbox can do the extraction, scoring and
synthesis itself. `bridge` writes the exact prompts and inputs to disk so that is a
repeatable path rather than pasting emails into a chat window:

```bash
node agent/run.mjs bridge --in agent/state/inbox/2026-08-29.json
# → state/bridge/<date>/emails.json and extract-prompt.md
# the assistant writes records.json (and optionally scores.json, ventures.json)

node agent/eval/eval.mjs --in <mail> --records <records.json>    # audit first
node agent/run.mjs --in <mail> --records <records.json> --scores <scores.json>
```

Supplied records get their ids and provenance stamped here, not by whoever produced
them, so they carry the same guarantees as the API path — and a record naming an
email that is not in the batch is dropped and reported.

## The audit: the no-invented-numbers rule, enforced

```bash
node agent/eval/eval.mjs --in <mail> --records <records.json>
```

Every numeric field must appear in the email it came from, in some form
(`485000`, `485,000`, `$485K` all count), and every evidence quote must actually be
in the body. Anything else fails the run. It needs no model and no network, which is
what lets `weekly.sh` gate on it. On this project's first real batch it caught two
misquotes and both were capture defects, not extraction defects — which is the kind
of bug that is otherwise invisible.

`node agent/eval/eval.mjs --fixtures` is the other half: labelled emails in
`eval/fixtures/`, reporting recall against known opportunities. It needs a model.

## Verification

`--enrich` sends the top of the shortlist through Claude with web search and fetch,
asking four narrow questions: is this listing real and still live, who already does
this, does anything on the web contradict a claim in the email, and what regulation
governs it. Contradictions are surfaced at the top of the digest, not buried.

It does not re-value anything. It exists to catch the two failures that waste a
week: a listing that sold three weeks ago, and a market with four funded incumbents
nobody mentioned.

## Calibration

```bash
node agent/run.mjs feedback "Klixer" drop "physical product, no leverage"
node agent/run.mjs calibrate
```

Calibration joins your verdicts to the scores those items were given and reports
which of the six dimensions actually separated what you kept from what you dropped.
Dimensions that separated gain weight, ones that did not lose it, bounded at ±0.05
per run and renormalised. It refuses to run below eight judged items, because with
fewer than that the differences are noise.

A dimension that never separates anything is not measuring something you act on —
that is a signal to change the question it asks, not just its weight.

## The profile is the product

`config/profile.json` holds the three parties the ranking is about — you, Claude, and
Mae — plus the thesis and the kill criteria. Scoring asks "can *this group* win this",
not "is this a good business", so an unfilled profile produces confident, useless
output. The run warns when fields still read `FILL_ME`.

Be precise about what the ecosystem actually is. Mae is an OpenClaw agent on a Mac
mini: always-on execution, scheduled loops, persistent local memory, and a gateway
onto the chat channels customers already use. That is *labour and reach*, not an
audience — and the scoring is very different for the two. Its gaps are worth writing
down as honestly as its assets: one machine, a residential connection, no brand, and
nothing it does can be accountable without a human owning the outcome.

The kill criteria are the highest-value part of the file: things decided in advance
that you will not do. They run before scoring, they are absolute, and they are what
stops a plausible listing eating a weekend at 1am.

## The random variable

Recombination without a constraint reliably produces the same three ideas. So each run
draws cards — a constraint, a channel, a business model by default — and forces one
venture to use two shortlisted opportunities that would not otherwise meet. The draw is
seeded (`--seed`), so a run is reproducible and a bad idea is traceable to a card rather
than blamed on the model. Decks live in `config/wildcards.json`; delete cards that keep
producing nothing.

## Feedback

```bash
node agent/run.mjs feedback "Records retrieval, unbundled" drop "no way to reach the buyer"
```

Verdicts append to `state/feedback.jsonl` and are read into the next synthesis prompt.
It is the only thing here that makes the agent better over time, and it costs a habit.

## What it will not do

- **Invent a number.** Every figure has to be quotable from the email; unknowns stay
  null and are listed as unknowns. A seller's claimed cash flow is recorded as
  *seller-claimed* and never silently becomes a fact.
- **Value a business.** No multiples, no DCF, no "worth $X". It ranks fit and hands you
  the cheapest check that would falsify each one.
- **Contact anybody.** No outreach, no broker replies, no NDAs. Read-only by design.
- **Decide.** The digest is a week of work, ranked. The commitment is yours.

## Known gaps

1. **Verification is shallow.** `--enrich` checks the top of the shortlist and takes
   the web at its word. It does not read a broker's data room, pull Companies House
   filings, or check whether a domain's traffic claim survives contact with reality.
2. **Recall is measured on three fixtures.** Enough to catch a regression, not enough
   to compare two prompts with confidence. Add a fixture each time extraction gets
   something wrong — that is the cheapest possible dataset.
3. **Calibration needs verdicts you have not recorded yet.** It cannot help until
   roughly ten opportunities have been judged, and it only ever nudges weights: it
   will not discover a dimension the rubric is missing.
4. **Single mailbox, single operator.** No multi-user profiles, no shared ledger.
5. **Nothing ages out.** The ledger notices a price falling but not a listing being
   sold or withdrawn — a row goes stale silently.
6. **The wildcard decks are mine, not yours.** They were written blind. The cards
   that keep producing nothing should be deleted, and that only happens by hand.
7. **Build mode infers demand from adjacent markets.** "This mechanism earns $13k a
   month over there" is not proof it earns anything in the category you would point
   it at, and the digest says so per venture — but the pipeline cannot check it.
   That is what the falsifiable test in each venture is for.

## Files

```
run.mjs               the pipeline, top to bottom
lib/email.mjs         MIME, quoted-printable, multipart, HTML → text
lib/sources.mjs       which feed, and how much to trust its numbers
lib/extract.mjs       email → opportunity records (schema + prompt + fallback)
lib/fit.mjs           kill criteria, six-dimension rubric, scoring
lib/wildcard.mjs      the seeded draw
lib/synth.mjs         opportunities + profile + constraint → ventures
lib/store.mjs         ledger, dedupe, run history, feedback
lib/enrich.mjs        web verification of the shortlist
lib/calibrate.mjs     do the scores predict what you keep?
lib/report.mjs        the markdown digest
lib/llm.mjs           the only file that talks to Claude
lib/rng.mjs           seeded randomness
eval/eval.mjs         the audit and the fixture run
eval/fixtures/        labelled emails with known correct extractions
schedule/weekly.sh    the whole thing as one command, gated on the audit
config/profile.json   you, the agent, Mae, the thesis, the kill criteria
config/wildcards.json the decks
state/                ledger, runs, feedback (gitignored — it is your data)
```
