/* Data to the People — site behaviour.
   ---------------------------------------------------------------------------
   ONE PLACE TO CONFIGURE ADSENSE.

   The build can fill all of this in for you. Set ADSENSE_PUB_ID (and the
   AD_SLOT_* variables) in your host's environment and `node tools/build.mjs`
   writes the publisher ID here, emits the loader <script> in every <head>, and
   writes ads.txt. See DEPLOY.md.

   To hard-code it instead:
   1. Get approved at https://adsense.google.com and copy your publisher ID
      (it looks like `ca-pub-1234567890123456`).
   2. Put it in AD_CLIENT below, and the numeric unit IDs in AD_SLOTS.
   3. Put the same ID, minus the "ca-" prefix, in SITE.adsense in
      tools/build.mjs — that emits the loader tag and writes ads.txt.

   Until step 1 is done, every ad position renders as a labelled placeholder so
   the layout is identical before and after approval (no cumulative layout shift
   when the real units switch on).
   --------------------------------------------------------------------------- */

const AD_CLIENT = "";                 // e.g. "ca-pub-1234567890123456"
const AD_SLOTS = {
  "home-feed":      "",               // in-feed unit, homepage
  "article-mid":    "",               // mid-article
  "article-end":    "",               // below the article
};

(function () {
  "use strict";

  /* ---- ad units ------------------------------------------------------- */
  const configured = /^ca-pub-\d{10,}$/.test(AD_CLIENT);

  document.querySelectorAll(".s-ad").forEach(function (box) {
    const name = box.dataset.slot || "";
    const slot = AD_SLOTS[name] || "";

    if (!configured || !slot) {
      const holder = document.createElement("div");
      holder.className = "s-ad-holder";
      holder.textContent = "Ad unit · " + (name || "unnamed");
      box.appendChild(holder);
      return;
    }

    const ins = document.createElement("ins");
    ins.className = "adsbygoogle";
    ins.style.display = "block";
    ins.setAttribute("data-ad-client", AD_CLIENT);
    ins.setAttribute("data-ad-slot", slot);
    ins.setAttribute("data-ad-format", "auto");
    ins.setAttribute("data-full-width-responsive", "true");
    box.appendChild(ins);

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      /* loader blocked or not yet present — the reserved space stays empty */
    }
  });

  /* ---- current section in the nav ------------------------------------- */
  const here = location.pathname.replace(/index\.html$/, "");
  document.querySelectorAll(".s-nav a").forEach(function (a) {
    const target = a.getAttribute("href");
    if (target && target !== "/" && here.indexOf(target) === 0) {
      a.setAttribute("aria-current", "page");
    } else if (target === "/" && (here === "/" || here === "")) {
      a.setAttribute("aria-current", "page");
    }
  });

  /* ---- homepage teaser bars ------------------------------------------- */
  const bars = document.getElementById("s-bars");
  if (bars) {
    const rows = JSON.parse(bars.dataset.rows);
    const max = Math.max.apply(null, rows.map(function (r) { return r[1]; }));
    bars.innerHTML = rows.map(function (r, i) {
      const pct = Math.round(r[1] / max * 100);
      return '<div class="s-bar' + (r[1] === max ? " peak" : "") + '" style="--i:' + i + '">' +
        '<span class="yr">' + r[0] + '</span>' +
        '<span class="tr"><i style="width:' + pct + '%"></i></span>' +
        '<span class="n">' + r[1] + '</span></div>';
    }).join("");
  }
})();
