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
   [4] dedupe      fingerprint against the ledger; a repeat is a signal, not a row
   [5] score       fit against you + the agent + the Mae ecosystem      ← model
   [6] wildcard    seeded draw: constraints, plus a forced collision
   [7] synthesise  candidate ventures, each with a first customer       ← model
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
   `--in file.json` expects; `html` is accepted instead of `body`.
2. **A Gmail filter → label → export.** Anything that leaves `.eml` files in a folder.
3. **A forwarding rule** into a mailbox you `mbox`-export weekly.
4. **IMAP,** if you want it live — write the fetch, hand this the JSON.

Filter aggressively upstream. Cost and quality both scale with what you let in.

## The profile is the product

`config/profile.json` holds the three parties the ranking is about — you, the agent,
and the Mae ecosystem — plus the thesis and the kill criteria. Scoring asks "can *this
group* win this", not "is this a good business", so an unfilled profile produces
confident, useless output. The run warns when fields still read `FILL_ME`.

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

Ordered by what would improve output most, not by effort:

1. **No enrichment.** Nothing verifies a listing, checks whether a domain resolves,
   reads a for-sale page, or looks up whether the idea already has four funded
   competitors. Everything is judged on what the email said.
2. **Recall is unmeasured.** There is no fixture set of emails with known correct
   extractions, so a prompt change cannot be shown to be an improvement.
3. **No calibration.** Fit scores are never checked against what actually happened.
   The feedback file is the raw material for that and nothing consumes it yet beyond
   the prompt.
4. **Single mailbox, single operator.** No multi-user profiles, no shared ledger.
5. **No scheduler.** It is a command; cron, a GitHub Action, or an assistant routine
   has to run it weekly.
6. **The ledger only grows.** Nothing ages an opportunity out or notices that a
   listing has sold.

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
lib/report.mjs        the markdown digest
lib/llm.mjs           the only file that talks to Claude
lib/rng.mjs           seeded randomness
config/profile.json   you, the agent, Mae, the thesis, the kill criteria
config/wildcards.json the decks
state/                ledger, runs, feedback (gitignored — it is your data)
```
