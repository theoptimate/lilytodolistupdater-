/* Preflight for a built site. Run: node tools/check.mjs  (npm run check)
   Reads dist/ only — it checks what would actually be deployed, not the source.
   Exits 1 on an error, 0 on warnings alone. */

import { readFile, readdir, stat } from "node:fs/promises";
import { join, dirname, resolve } from "node:path";

const OUT = "dist";
const PLACEHOLDER = "datatothepeople.org";
const errors = [];
const warnings = [];
const err  = (m) => errors.push(m);
const warn = (m) => warnings.push(m);

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...await walk(p));
    else out.push(p);
  }
  return out;
}
const exists = (p) => stat(p).then(() => true, () => false);
const grab = (html, re) => (html.match(re) || [, null])[1];
const all = (html, re) => [...html.matchAll(re)].map((m) => m[1]);

const files = await walk(OUT);
const pages = files.filter((f) => f.endsWith(".html")).sort();
if (!pages.length) err(`no HTML in ${OUT}/ — run the build first`);

/* Origin comes from the homepage's own canonical, so this checks the built
   artefact rather than trusting the environment it was built in. */
const home = await readFile(join(OUT, "index.html"), "utf8").catch(() => "");
const origin = (grab(home, /<link rel="canonical" href="([^"]+)"/) || "").replace(/\/$/, "");
if (!origin) err("no canonical URL on the homepage");
console.log(`origin: ${origin || "(none)"}`);

if (origin.includes(PLACEHOLDER)) {
  warn(`origin is still the placeholder ${PLACEHOLDER}. Set SITE_ORIGIN to your real
    domain and rebuild, or every canonical, og:url and sitemap entry points at a
    site you do not own.`);
}

for (const f of pages) {
  const html = await readFile(f, "utf8");
  const rel = f.slice(OUT.length);
  const noindex = /<meta name="robots" content="noindex/.test(html);

  const title = grab(html, /<title>([^<]*)<\/title>/);
  if (!title) err(`${rel}: no <title>`);
  else if (title.length > 60) warn(`${rel}: title is ${title.length} chars (Google truncates near 60)`);

  const desc = grab(html, /<meta name="description" content="([^"]*)"/);
  if (!desc) err(`${rel}: no meta description`);
  else if (desc.length > 155) warn(`${rel}: description is ${desc.length} chars (truncates near 155)`);

  const h1s = (html.match(/<h1[\s>]/g) || []).length;
  if (h1s !== 1) err(`${rel}: ${h1s} <h1> elements, expected exactly 1`);

  const canonical = grab(html, /<link rel="canonical" href="([^"]+)"/);
  if (!canonical && !noindex) err(`${rel}: no canonical URL`);
  if (canonical && origin && !canonical.startsWith(origin)) {
    err(`${rel}: canonical ${canonical} does not match origin ${origin}`);
  }

  const ogUrl = grab(html, /<meta property="og:url" content="([^"]+)"/);
  if (canonical && ogUrl && ogUrl !== canonical) {
    err(`${rel}: og:url ${ogUrl} disagrees with canonical ${canonical}`);
  }

  if (origin && !origin.includes(PLACEHOLDER) && html.includes(PLACEHOLDER)) {
    err(`${rel}: still mentions ${PLACEHOLDER} — a leftover hard-coded URL`);
  }

  /* Internal links and assets must resolve to something in dist/. */
  const refs = [
    ...all(html, /href="(\/[^"#?]*)"/g),
    ...all(html, /src="(\/[^"#?]*)"/g),
  ];
  for (const ref of new Set(refs)) {
    const base = join(OUT, ref);
    const ok = ref.endsWith("/")
      ? await exists(join(base, "index.html"))
      : (await exists(base)) || (await exists(base + "/index.html")) || (await exists(base + ".html"));
    if (!ok) err(`${rel}: link ${ref} resolves to nothing in ${OUT}/`);
  }

  const ogImage = grab(html, /<meta property="og:image" content="([^"]+)"/);
  if (ogImage && origin) {
    const p = join(OUT, ogImage.replace(origin, ""));
    if (!await exists(p)) err(`${rel}: og:image ${ogImage} is missing from ${OUT}/`);
  }
}

/* Sitemap, robots, ads.txt */
const sitemap = await readFile(join(OUT, "sitemap.xml"), "utf8").catch(() => null);
if (!sitemap) err("no sitemap.xml");
else {
  const locs = all(sitemap, /<loc>([^<]+)<\/loc>/g);
  if (!locs.length) err("sitemap.xml lists no URLs");
  for (const loc of locs) {
    if (origin && !loc.startsWith(origin)) err(`sitemap: ${loc} does not match origin ${origin}`);
    const path = loc.replace(origin, "");
    const target = path.endsWith("/") ? join(OUT, path, "index.html") : join(OUT, path);
    if (!await exists(target)) err(`sitemap: ${loc} has no page behind it`);
  }
  for (const f of pages) {
    const url = origin + f.slice(OUT.length).replace(/index\.html$/, "");
    const html = await readFile(f, "utf8");
    const noindex = /<meta name="robots" content="noindex/.test(html);
    if (!noindex && !locs.includes(url)) warn(`${url} is indexable but missing from the sitemap`);
  }
}

const robots = await readFile(join(OUT, "robots.txt"), "utf8").catch(() => null);
if (!robots) err("no robots.txt");
else if (origin && !robots.includes(origin)) err("robots.txt does not point at this origin's sitemap");

const ads = await readFile(join(OUT, "ads.txt"), "utf8").catch(() => null);
if (!ads) err("no ads.txt");
else if (ads.includes("pub-XXXX")) warn("ads.txt still has the placeholder publisher ID — fine until AdSense is approved, required before ads serve");

/* Report */
console.log(`checked ${pages.length} pages\n`);
for (const w of warnings) console.log(`  WARN   ${w}`);
for (const e of errors)   console.log(`  ERROR  ${e}`);
console.log(
  errors.length ? `\n${errors.length} error(s), ${warnings.length} warning(s) — not ready to deploy`
                : `\npassed with ${warnings.length} warning(s)`
);
process.exit(errors.length ? 1 : 0);
