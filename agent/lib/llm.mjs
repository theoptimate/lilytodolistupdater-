/* The one place that talks to Claude.

   Everything else in the pipeline is deterministic, so this file is optional at
   runtime: with no credentials it reports `available: false` and callers fall back
   to their heuristic path. That is what lets the tests — and a plane ride — run.

   Structured output is used everywhere (output_config.format), so callers get
   parsed objects and never have to scrape prose for JSON. */

import { existsSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

const MODEL = process.env.AGENT_MODEL || "claude-opus-5";
const EFFORT = process.env.AGENT_EFFORT || "high";

/* Claude API list prices, $ per million tokens. Only used to print what a run
   cost, so a stale row here is a cosmetic problem, not a correctness one. */
const PRICES = {
  "claude-opus-5":   { in: 5,  out: 25 },
  "claude-fable-5":  { in: 10, out: 50 },
  "claude-sonnet-5": { in: 2,  out: 10 },
  "claude-haiku-4-5": { in: 1, out: 5 },
};

let client = null;
let attempted = false;

/* The SDK constructs happily without credentials and only fails at request time,
   which would mean one doomed call per email. So the credential check happens
   here: an env key, or an `ant auth login` profile on disk. */
function hasCredentials() {
  if (process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_AUTH_TOKEN) return true;
  return existsSync(join(homedir(), ".config", "anthropic"));
}

async function getClient() {
  if (attempted) return client;
  attempted = true;
  if (!hasCredentials()) return (client = null);
  try {
    const { default: Anthropic } = await import("@anthropic-ai/sdk");
    client = new Anthropic();
  } catch {
    client = null;
  }
  return client;
}

export const usage = { calls: 0, input: 0, output: 0, cacheRead: 0, cacheWrite: 0, model: MODEL, failures: 0, degraded: false };

/* Two consecutive failures — a bad key, an outage, a rate limit that is not
   clearing — and the run stops trying. Forty emails should not become forty
   doomed calls, and the digest says plainly that it fell back. */
const GIVE_UP_AFTER = 2;

export function costUsd() {
  const p = PRICES[usage.model] || PRICES["claude-opus-5"];
  return ((usage.input + usage.cacheRead * 0.1 + usage.cacheWrite * 1.25) * p.in
        + usage.output * p.out) / 1e6;
}

export async function available() {
  return Boolean(await getClient());
}

/* system: [stable, volatile] — the stable half carries the cache breakpoint, so a
   run over 40 emails pays for the profile and the rubric once. */
export async function ask({ stable, volatile = "", user, schema, maxTokens = 16000 }) {
  const anthropic = await getClient();
  if (!anthropic || usage.degraded) return null;

  const system = [{ type: "text", text: stable, cache_control: { type: "ephemeral" } }];
  if (volatile) system.push({ type: "text", text: volatile });

  const request = {
    model: MODEL,
    max_tokens: maxTokens,
    system,
    messages: [{ role: "user", content: user }],
    thinking: { type: "adaptive" },
    output_config: { effort: EFFORT },
  };
  if (schema) request.output_config.format = { type: "json_schema", schema };

  let response;
  try {
    response = await anthropic.messages.create(request);
  } catch (err) {
    usage.failures++;
    process.stderr.write(`  ! model call failed: ${err.message}\n`);
    if (usage.failures >= GIVE_UP_AFTER) {
      usage.degraded = true;
      process.stderr.write(`  ! giving up on the model after ${usage.failures} failures — finishing on heuristics\n`);
    }
    return null;
  }

  usage.failures = 0;

  usage.calls++;
  usage.model = response.model || MODEL;
  usage.input += response.usage?.input_tokens || 0;
  usage.output += response.usage?.output_tokens || 0;
  usage.cacheRead += response.usage?.cache_read_input_tokens || 0;
  usage.cacheWrite += response.usage?.cache_creation_input_tokens || 0;

  if (response.stop_reason === "refusal") {
    process.stderr.write(`  ! model declined (${response.stop_details?.category || "unspecified"})\n`);
    return null;
  }

  const text = response.content.filter((b) => b.type === "text").map((b) => b.text).join("").trim();
  if (!schema) return text;
  try {
    return JSON.parse(text);
  } catch {
    /* Structured output makes this near-impossible, but a truncated response at
       max_tokens would land here and must not take the run down. */
    const brace = text.indexOf("{");
    try { return JSON.parse(text.slice(brace)); } catch { return null; }
  }
}
