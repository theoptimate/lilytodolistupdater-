/* Produces a single self-contained copy of a built page, with the stylesheet and
   script inlined, for previewing without a server.
   Run: node tools/preview.mjs index.html > preview.html
   Cross-page links still point at site paths and only resolve once deployed. */

import { readFile } from "node:fs/promises";

const target = process.argv[2] || "index.html";
const page = await readFile(target, "utf8");
const css = await readFile("assets/site.css", "utf8");
const js = await readFile("assets/site.js", "utf8");

const pick = (re) => (page.match(re) || [, ""])[1];

const title = pick(/<title>([\s\S]*?)<\/title>/);
const fonts = pick(/(<link rel="stylesheet" href="https:\/\/fonts\.googleapis[^>]*>)/);
const body  = pick(/<body>([\s\S]*?)<\/body>/)
  .replace(/<script src="\/assets\/site\.js"[^>]*><\/script>/, "");

process.stdout.write(`<title>${title}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
${fonts}
<style>
${css}
</style>
${body.trim()}
<script>
${js}
</script>
`);
