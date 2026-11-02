#!/usr/bin/env node
/**
 * Check the Clark County Detention Center public in-custody roster.
 *
 * Reads CCDC_LAST_NAME and optional CCDC_FIRST_NAME from the environment.
 * Writes a name-free status file and prints one line:
 *   listed=yes|no custody=active|not_listed changed=yes|no
 * Exit 0 when nothing changed, 2 when the listed/custody result changed,
 * 1 on a network or page error (state is left untouched).
 * Exit 0 with configured=no when CCDC_LAST_NAME is not set.
 */

import { readFileSync } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SEARCH = "https://redrock.clarkcountynv.gov/ccdcincustody/inCustodySearch.aspx";
const STATUS = "https://redrock.clarkcountynv.gov/ccdcincustody/inCustodyReference.aspx";
const STATE_PATH = resolve(process.env.CCDC_STATE_PATH || `${ROOT}/.ccdc-watch-state.json`);
const UA = "Mozilla/5.0 (compatible; roster-check/1.0)";

function loadLocalEnv() {
  try {
    const text = readFileSync(resolve(ROOT, "tools/.ccdc-watch.env"), "utf8");
    for (const line of text.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq < 1) continue;
      const key = trimmed.slice(0, eq).trim();
      const value = trimmed.slice(eq + 1).trim();
      if (!process.env[key]) process.env[key] = value;
    }
  } catch {
    /* no local env file */
  }
}

loadLocalEnv();

const lastName = (process.env.CCDC_LAST_NAME || "").trim();
const firstName = (process.env.CCDC_FIRST_NAME || "").trim();

if (!lastName) {
  console.log("configured=no");
  process.exit(0);
}

const jar = new Map();

function storeCookies(res) {
  const list = typeof res.headers.getSetCookie === "function"
    ? res.headers.getSetCookie()
    : [res.headers.get("set-cookie")].filter(Boolean);
  for (const raw of list) {
    const pair = raw.split(";")[0];
    const eq = pair.indexOf("=");
    if (eq > 0) jar.set(pair.slice(0, eq), pair.slice(eq + 1));
  }
}

function cookieHeader() {
  return [...jar.entries()].map(([k, v]) => `${k}=${v}`).join("; ");
}

async function request(url, { method = "GET", body, referer } = {}) {
  const headers = { "user-agent": UA, accept: "text/html" };
  const cookie = cookieHeader();
  if (cookie) headers.cookie = cookie;
  if (body) {
    headers["content-type"] = "application/x-www-form-urlencoded";
    if (referer) headers.referer = referer;
  }
  const res = await fetch(url, { method, headers, body, redirect: "follow" });
  storeCookies(res);
  if (!res.ok) throw new Error(`roster request failed (${res.status})`);
  return res.text();
}

function hiddenFields(html) {
  const fields = {};
  for (const tag of html.match(/<input[^>]*>/gi) || []) {
    const name = (tag.match(/name="([^"]*)"/i) || [])[1];
    if (!name || !name.startsWith("__")) continue;
    fields[name] = (tag.match(/value="([^"]*)"/i) || [])[1] || "";
  }
  return fields;
}

function recordsFound(html) {
  const m = html.match(/Records Found:\s*(\d+)/i);
  return m ? Number(m[1]) : 0;
}

function rosterRows(html) {
  const rows = [];
  const re = /<td>(\d{5,})<\/td><td>([^<]+)<\/td><td[^>]*>([^<]*)<\/td><td><input[^>]*><\/td><td>([^<]*)<\/td>/gi;
  let m;
  while ((m = re.exec(html))) {
    rows.push({ id: m[1], name: decode(m[2]), arrest: decode(m[3]).trim(), caseNo: decode(m[4]).trim() });
  }
  return rows;
}

function decode(s) {
  return s.replace(/&nbsp;?/g, " ").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();
}

function firstMatches(rosterName, want) {
  const given = (rosterName.split(",")[1] || "").trim().split(/\s+/)[0].toUpperCase();
  const needle = want.toUpperCase().replace(/[^A-Z]/g, "");
  if (!given || !needle) return false;
  const n = Math.min(4, given.length, needle.length);
  return given.slice(0, n) === needle.slice(0, n);
}

function formBody(fields) {
  return new URLSearchParams(fields).toString();
}

async function lookup() {
  const searchPage = await request(SEARCH);
  const searchBody = {
    ...hiddenFields(searchPage),
    TxtID: "",
    TxtCaseNo: "",
    txtName: lastName,
    SearchName: "  Submit  ",
  };
  const listHtml = await request(SEARCH, { method: "POST", body: formBody(searchBody), referer: SEARCH });
  const rows = rosterRows(listHtml).filter((row) => !firstName || firstMatches(row.name, firstName));
  if (!rows.length || recordsFound(listHtml) === 0) {
    return { listed: false, custody: "not_listed" };
  }

  const idButton = (listHtml.match(/name="(DataGrid1:_ctl\d+:_ctl0)"/) || [])[1];
  if (!idButton) return { listed: true, custody: "listed" };

  const statusBody = { ...hiddenFields(listHtml), [idButton]: "Find w/ ID" };
  const statusHtml = await request(STATUS, {
    method: "POST",
    body: formBody(statusBody),
    referer: SEARCH,
  });
  const active = />\s*Active\s*</i.test(statusHtml);
  return { listed: true, custody: active ? "active" : "listed" };
}

async function readState() {
  try {
    const data = JSON.parse(await readFile(STATE_PATH, "utf8"));
    if (typeof data.listed === "boolean" && typeof data.custody === "string") return data;
  } catch {
    /* first run, or an unreadable file */
  }
  return null;
}

try {
  const now = new Date().toISOString();
  const current = await lookup();
  const previous = await readState();
  const changed = previous !== null && (
    previous.listed !== current.listed || previous.custody !== current.custody
  );
  await writeFile(STATE_PATH, JSON.stringify({ ...current, checkedAt: now }, null, 2) + "\n");
  console.log(
    `listed=${current.listed ? "yes" : "no"} custody=${current.custody} changed=${changed ? "yes" : "no"}`,
  );
  process.exit(changed ? 2 : 0);
} catch (err) {
  console.error("roster check failed");
  process.exit(1);
}
