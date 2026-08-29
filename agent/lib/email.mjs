/* Turns raw mail into the one message shape the rest of the pipeline reads.
   Accepts .eml, mbox, and JSON — the JSON shape is what a Gmail/MCP dump writes,
   so pulling mail is somebody else's job and this file never needs credentials.

   A message is: { id, from, fromEmail, subject, date, text, url, raw } */

import { readFile, readdir, stat } from "node:fs/promises";
import { join, extname, basename } from "node:path";
import { createHash } from "node:crypto";

const sha1 = (s) => createHash("sha1").update(s).digest("hex");

/* ---- header decoding ---------------------------------------------------- */

/* RFC 2047 encoded words: =?utf-8?B?...?= and =?utf-8?Q?...?= */
export function decodeWords(s = "") {
  return s.replace(/=\?([^?]+)\?([BbQq])\?([^?]*)\?=/g, (_, charset, enc, body) => {
    try {
      const bytes = enc.toUpperCase() === "B"
        ? Buffer.from(body, "base64")
        : Buffer.from(body.replace(/_/g, " ").replace(/=([0-9A-Fa-f]{2})/g, (_m, h) =>
            String.fromCharCode(parseInt(h, 16))), "binary");
      return new TextDecoder(charset.toLowerCase()).decode(bytes);
    } catch { return body; }
  }).replace(/\?=\s+=\?/g, "");
}

export function decodeQuotedPrintable(s = "") {
  return s
    .replace(/=\r?\n/g, "")
    .replace(/=([0-9A-Fa-f]{2})/g, (_m, h) => String.fromCharCode(parseInt(h, 16)));
}

/* Headers are unfolded (a continuation line starts with whitespace) and lowercased. */
export function splitHeaders(raw) {
  const end = raw.search(/\r?\n\r?\n/);
  const head = end === -1 ? raw : raw.slice(0, end);
  const body = end === -1 ? "" : raw.slice(end).replace(/^\r?\n\r?\n/, "");
  const headers = {};
  const unfolded = head.replace(/\r?\n[ \t]+/g, " ").split(/\r?\n/);
  for (const line of unfolded) {
    const i = line.indexOf(":");
    if (i < 1) continue;
    const key = line.slice(0, i).trim().toLowerCase();
    const val = line.slice(i + 1).trim();
    headers[key] = headers[key] ? `${headers[key]}, ${val}` : val;
  }
  return { headers, body };
}

function decodeBody(body, headers) {
  const enc = (headers["content-transfer-encoding"] || "").toLowerCase();
  const charset = (/charset="?([\w-]+)"?/i.exec(headers["content-type"] || "") || [, "utf-8"])[1];
  let bytes;
  if (enc.includes("base64")) bytes = Buffer.from(body.replace(/\s+/g, ""), "base64");
  else if (enc.includes("quoted-printable")) bytes = Buffer.from(decodeQuotedPrintable(body), "binary");
  else return body;
  try { return new TextDecoder(charset.toLowerCase()).decode(bytes); }
  catch { return bytes.toString("utf8"); }
}

/* Walks multipart bodies and returns the best text it can find. text/plain wins;
   text/html is converted only when there is no plain part, which is the usual
   case for the newsletters this agent reads. */
function bestText(body, headers) {
  const ctype = headers["content-type"] || "text/plain";
  const boundary = (/boundary="?([^";]+)"?/i.exec(ctype) || [])[1];

  if (/^multipart\//i.test(ctype) && boundary) {
    const parts = body.split(new RegExp(`--${boundary.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(--)?\\r?\\n?`))
      .filter((p) => p && p.trim() && p !== "--");
    const decoded = parts.map((p) => {
      const sub = splitHeaders(p);
      return { type: (sub.headers["content-type"] || "text/plain").toLowerCase(), text: bestText(sub.body, sub.headers) };
    });
    const plain = decoded.find((d) => d.type.startsWith("text/plain") && d.text.trim());
    if (plain) return plain.text;
    const html = decoded.find((d) => d.type.startsWith("text/html") && d.text.trim());
    if (html) return html.text;
    const nested = decoded.find((d) => d.text && d.text.trim());
    return nested ? nested.text : "";
  }

  const decoded = decodeBody(body, headers);
  return /^text\/html/i.test(ctype) ? htmlToText(decoded) : decoded;
}

/* Deliberately crude: these are marketing emails, not documents. Links are kept
   inline as "text (url)" because the URL is often the only durable identifier a
   listing has, and because a bare <url> would be eaten by the tag stripper below. */
export function htmlToText(html = "") {
  return html
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, " ")
    .replace(/<a\b[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, (_m, href, label) => {
      const text = label.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
      return href.startsWith("http") ? `${text} (${href})` : text;
    })
    .replace(/<\/(p|div|tr|li|h[1-6]|table|section)>/gi, "\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'")
    .replace(/&#(\d+);/g, (_m, d) => String.fromCharCode(Number(d)))
    .replace(/[ \t]+/g, " ")
    .replace(/\n\s*\n\s*\n+/g, "\n\n")
    .trim();
}

const addressOf = (from = "") =>
  ((/<([^>]+)>/.exec(from) || [, from])[1] || "").trim().toLowerCase();

export function parseEml(raw, fallbackId = "") {
  const { headers, body } = splitHeaders(raw);
  const from = decodeWords(headers.from || "");
  const text = bestText(body, headers);
  return normalize({
    id: (headers["message-id"] || fallbackId || sha1(raw)).replace(/[<>]/g, ""),
    from,
    fromEmail: addressOf(from),
    subject: decodeWords(headers.subject || ""),
    date: headers.date || "",
    text,
    raw,
  });
}

/* An mbox is messages separated by a line beginning "From " at column 0. */
export function parseMbox(raw) {
  return raw
    .split(/\r?\n(?=From )/)
    .map((chunk) => chunk.replace(/^From [^\n]*\n/, ""))
    .filter((c) => c.trim())
    .map((c, i) => parseEml(c, `mbox-${i}`));
}

/* The handoff shape. Anything with a body and a subject is accepted, so a Gmail
   MCP dump, an IMAP script or a hand-written fixture all land here unchanged. */
export function normalize(m) {
  const text = (m.text || (m.html ? htmlToText(m.html) : "") || m.body || m.snippet || "").toString();
  const from = m.from || m.sender || "";
  const iso = (() => {
    const d = new Date(m.date || m.internalDate || Date.now());
    return Number.isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString();
  })();
  return {
    id: (m.id || m.messageId || sha1(`${from}${m.subject}${text.slice(0, 400)}`)).toString(),
    from,
    fromEmail: m.fromEmail || addressOf(from),
    subject: (m.subject || "").toString(),
    date: iso,
    text: text.replace(/\r\n/g, "\n").trim(),
    url: m.url || (/https?:\/\/\S+/.exec(text) || [])[0] || "",
    raw: m.raw || "",
  };
}

/* ---- loading ------------------------------------------------------------ */

export async function loadFile(path) {
  const raw = await readFile(path, "utf8");
  const ext = extname(path).toLowerCase();
  if (ext === ".json") {
    const data = JSON.parse(raw);
    const list = Array.isArray(data) ? data : (data.messages || [data]);
    return list.map(normalize);
  }
  if (ext === ".mbox") return parseMbox(raw);
  return [parseEml(raw, basename(path))];
}

export async function loadStdin() {
  const chunks = [];
  for await (const c of process.stdin) chunks.push(c);
  const raw = Buffer.concat(chunks).toString("utf8").trim();
  if (!raw) return [];
  if (raw.startsWith("{") || raw.startsWith("[")) {
    const data = JSON.parse(raw);
    const list = Array.isArray(data) ? data : (data.messages || [data]);
    return list.map(normalize);
  }
  return raw.includes("\nFrom ") ? parseMbox(raw) : [parseEml(raw, "stdin")];
}

export async function load(input) {
  if (input === "-") return loadStdin();
  const info = await stat(input);
  if (!info.isDirectory()) return loadFile(input);
  const names = (await readdir(input)).filter((n) => /\.(eml|mbox|json|txt)$/i.test(n)).sort();
  const out = [];
  for (const n of names) out.push(...await loadFile(join(input, n)));
  return out;
}
