/* Renders the 1200x630 social cards into /assets.
   Run: node tools/og.mjs
   Uses Fraunces from Google Fonts when the network allows it and falls back to a
   system serif otherwise — regenerate on a connected machine for an exact match. */

import { chromium } from "/opt/node22/lib/node_modules/playwright/index.mjs";
import { writeFile } from "node:fs/promises";

const BARS = [[2019,32],[2020,23],[2021,61],[2022,54],[2023,45],[2024,19],[2025,47]];
const MAX = Math.max(...BARS.map(b => b[1]));

const shell = (inner) => `<!doctype html><html><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,900&family=IBM+Plex+Mono:wght@500&display=swap">
<style>
  *{box-sizing:border-box;margin:0}
  body{width:1200px;height:630px;background:#F6F5F1;color:#141412;overflow:hidden;
       font-family:"IBM Plex Mono","DejaVu Sans Mono",monospace}
  .card{width:1200px;height:630px;padding:64px 72px;display:flex;flex-direction:column;
        justify-content:space-between;border-bottom:14px solid #1B3FBF}
  .top{display:flex;align-items:center;gap:13px;font-size:16px;letter-spacing:.22em;
       text-transform:uppercase;color:#4C4C46}
  .mk{display:flex;align-items:flex-end;gap:4px;height:26px}
  .mk i{width:6px;background:#141412;display:block}
  .mk i:nth-child(1){height:12px}.mk i:nth-child(2){height:19px}
  .mk i:nth-child(3){height:26px;background:#1B3FBF}
  h1{font-family:Fraunces,"Bitstream Charter",Charter,Georgia,serif;font-weight:900;
     letter-spacing:-.028em;line-height:.98;text-wrap:balance}
  .sub{font-size:21px;letter-spacing:.02em;color:#4C4C46;line-height:1.45;max-width:26ch}
  .hi{background:rgba(240,220,60,.62);padding:.02em .1em}
  .foot{display:flex;justify-content:space-between;align-items:flex-end;gap:40px}
  .rows{display:grid;gap:7px;width:430px}
  .row{display:grid;grid-template-columns:52px 1fr 34px;align-items:center;gap:11px;
       font-size:14px;color:#79786E}
  .tr{height:15px;background:#E4E1D8}
  .tr i{display:block;height:100%;background:#141412;border-radius:0 3px 3px 0}
  .row.pk .tr i{background:#1B3FBF}
  .row .n{text-align:right;color:#4C4C46}
  .row.pk .n{color:#1B3FBF;font-weight:500}
  .stamp{font-size:15px;letter-spacing:.16em;text-transform:uppercase;color:#79786E}
</style></head><body>${inner}</body></html>`;

const brand = `<div class="top"><span class="mk"><i></i><i></i><i></i></span>Data to the People</div>`;

const CARDS = {
  "og-default.png": shell(`<div class="card">
    ${brand}
    <h1 style="font-size:96px">Public records,<br><span class="hi">made public.</span></h1>
    <div class="foot">
      <p class="sub">Independent data journalism. Open method, sourced numbers, free to reuse.</p>
      <span class="stamp">datatothepeople.org</span>
    </div>
  </div>`),

  "og-half-staff.png": shell(`<div class="card">
    ${brand}
    <h1 style="font-size:82px;max-width:15ch">Seven Years at Half-Staff</h1>
    <div class="foot">
      <p class="sub"><strong style="color:#141412">281 days</strong> the US flag came down,
      2019&ndash;2025 &mdash; eleven percent of all days.</p>
      <div class="rows">
        ${BARS.map(([y, n]) => `<div class="row${n === MAX ? " pk" : ""}">
          <span>${y}</span><span class="tr"><i style="width:${Math.round(n / MAX * 100)}%"></i></span>
          <span class="n">${n}</span></div>`).join("")}
      </div>
    </div>
  </div>`),
};

const b = await chromium.launch();
const ctx = await b.newContext({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
for (const [name, html] of Object.entries(CARDS)) {
  await page.setContent(html, { waitUntil: "load" });
  await page.waitForTimeout(700);
  await page.screenshot({ path: "assets/" + name });
  console.log("wrote assets/" + name);
}
await b.close();
