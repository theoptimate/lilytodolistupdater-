/* Static site generator for Data to the People.
   Run: node tools/build.mjs
   Writes every page, sitemap.xml, robots.txt and ads.txt from the metadata below,
   so the SEO tags can never drift apart between pages. */

import { readFile, writeFile, mkdir, cp, rm } from "node:fs/promises";
import { dirname, join } from "node:path";

/* Everything is written into dist/. Nothing outside dist/ is ever deployed, which
   is what keeps src/ and tools/ off the public site. */
const OUT = "dist";
const out = (p) => join(OUT, p);

/* --------------------------------------------------------------------------
   The two deploy-specific values. Set them here, or override them per
   environment from the host dashboard — env vars win over the literals below,
   so you can point a preview build at a staging domain without a commit.

     SITE_ORIGIN     https://datatothepeople.org
     ADSENSE_PUB_ID  pub-1234567890123456     (no "ca-" prefix)

   Setting ADSENSE_PUB_ID also emits the real AdSense loader and writes the
   publisher ID into the bundled site.js and ads.txt. Ad unit IDs come from
   AD_SLOT_HOME_FEED / AD_SLOT_ARTICLE_MID / AD_SLOT_ARTICLE_END.
   -------------------------------------------------------------------------- */
const SITE = {
  origin:  process.env.SITE_ORIGIN    || "https://datatothepeople.org",
  adsense: process.env.ADSENSE_PUB_ID || "",

  name: "Data to the People",
  tagline: "Charts from the public record",
  blurb: "Independent data journalism. Every graphic is built from public records, " +
         "shows its working, and is free to read and reuse.",
  author: "Data to the People",
  email: "hello@datatothepeople.org",
  locale: "en_US",
  twitter: "",                              // e.g. "@datatothepeople" — omit if none
};

const AD_SLOT_ENV = {
  "home-feed":   "AD_SLOT_HOME_FEED",
  "article-mid": "AD_SLOT_ARTICLE_MID",
  "article-end": "AD_SLOT_ARTICLE_END",
};

const FONTS_BASE = [
  "Fraunces:opsz,wght@9..144,700..900",
  "IBM+Plex+Mono:wght@400;500",
  "Public+Sans:ital,wght@0,400;0,500;0,600;0,800;1,400",
];

/* -------------------------------------------------------------------------- */

const PAGES = [
  {
    src: "home.html",
    out: "index.html",
    url: "/",
    title: `${SITE.name} — charts from the public record`,
    description:
      "Independent data journalism built from public records. Open method, sourced " +
      "numbers, free to read. Start with seven years of the US flag at half-staff.",
    og: "og-default.png",
    priority: "1.0",
    changefreq: "weekly",
    jsonld: () => [
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: SITE.name,
        url: SITE.origin + "/",
        email: SITE.email,
        description: SITE.blurb,
        logo: SITE.origin + "/assets/og-default.png",
      },
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: SITE.name,
        url: SITE.origin + "/",
        inLanguage: "en-US",
        publisher: { "@type": "Organization", name: SITE.name },
      },
    ],
  },
  {
    src: "statement-of-purpose.html",
    out: "posts/statement-of-purpose/index.html",
    url: "/posts/statement-of-purpose/",
    title: "A statement of purpose — Data to the People",
    description:
      "What this site is for, what it refuses to publish, who pays for it, and what is " +
      "already wrong with its first graphic. The founding post.",
    og: "og-default.png",
    section: "Posts",
    published: "2026-08-29",
    modified: "2026-08-29",
    priority: "0.8",
    changefreq: "yearly",
    jsonld: (p) => [
      {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "A statement of purpose",
        description: p.description,
        image: [SITE.origin + "/assets/" + p.og],
        datePublished: p.published,
        dateModified: p.modified,
        author: { "@type": "Organization", name: SITE.author, url: SITE.origin + "/about/" },
        publisher: {
          "@type": "Organization",
          name: SITE.name,
          logo: { "@type": "ImageObject", url: SITE.origin + "/assets/og-default.png" },
        },
        mainEntityOfPage: { "@type": "WebPage", "@id": SITE.origin + p.url },
        articleSection: "Editorial",
        isAccessibleForFree: true,
        license: "https://creativecommons.org/licenses/by/4.0/",
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE.origin + "/" },
          { "@type": "ListItem", position: 2, name: "A statement of purpose" },
        ],
      },
    ],
  },
  {
    src: "half-staff.html",
    out: "graphics/half-staff/index.html",
    url: "/graphics/half-staff/",
    title: "Seven Years at Half-Staff — every day the US flag came down",
    description:
      "The US flag flew at half-staff on 281 days between 2019 and 2025 — 11% of all " +
      "days. Every order, charted day by day, with the data and method in full.",
    og: "og-half-staff.png",
    fonts: ["Anton"],
    section: "Graphics",
    published: "2026-08-29",
    modified: "2026-08-29",
    priority: "0.9",
    changefreq: "monthly",
    jsonld: (p) => [
      {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Seven Years at Half-Staff",
        alternativeHeadline: "Every day the US flag came down, 2019–2025",
        description: p.description,
        image: [SITE.origin + "/assets/" + p.og],
        datePublished: p.published,
        dateModified: p.modified,
        author: { "@type": "Organization", name: SITE.author, url: SITE.origin + "/about/" },
        publisher: {
          "@type": "Organization",
          name: SITE.name,
          logo: { "@type": "ImageObject", url: SITE.origin + "/assets/og-default.png" },
        },
        mainEntityOfPage: { "@type": "WebPage", "@id": SITE.origin + p.url },
        articleSection: "Government",
        keywords:
          "half-staff, half-mast, US flag, presidential proclamations, flag code, data journalism",
        isAccessibleForFree: true,
        license: "https://creativecommons.org/licenses/by/4.0/",
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE.origin + "/" },
          { "@type": "ListItem", position: 2, name: "Seven Years at Half-Staff" },
        ],
      },
    ],
  },
  {
    src: "about.html",
    out: "about/index.html",
    url: "/about/",
    title: "About — Data to the People",
    description:
      "Who makes Data to the People, how it is funded, and the standards every " +
      "graphic on the site has to meet before it is published.",
    og: "og-default.png",
    priority: "0.6",
    changefreq: "yearly",
    jsonld: (p) => [{
      "@context": "https://schema.org", "@type": "AboutPage",
      name: p.title, url: SITE.origin + p.url, description: p.description,
      publisher: { "@type": "Organization", name: SITE.name },
    }],
  },
  {
    src: "method.html",
    out: "method/index.html",
    url: "/method/",
    title: "Method and corrections — Data to the People",
    description:
      "How numbers are sourced, counted, checked and corrected, and how to tell us " +
      "when a graphic on this site is wrong.",
    og: "og-default.png",
    priority: "0.6",
    changefreq: "yearly",
    jsonld: (p) => [{
      "@context": "https://schema.org", "@type": "WebPage",
      name: p.title, url: SITE.origin + p.url, description: p.description,
    }],
  },
  {
    src: "privacy.html",
    out: "privacy/index.html",
    url: "/privacy/",
    title: "Privacy and cookies — Data to the People",
    description:
      "What this site collects, the advertising and analytics cookies it sets, and " +
      "how to control them.",
    og: "og-default.png",
    priority: "0.3",
    changefreq: "yearly",
    noAds: true,
    jsonld: (p) => [{
      "@context": "https://schema.org", "@type": "WebPage",
      name: p.title, url: SITE.origin + p.url, description: p.description,
    }],
  },
  {
    src: "404.html",
    out: "404.html",
    url: "/404.html",
    title: "Page not found — Data to the People",
    description: "That page does not exist.",
    og: "og-default.png",
    noindex: true,
    noAds: true,
    sitemap: false,
  },
];

const NAV = [
  ["/graphics/half-staff/", "Graphics"],
  ["/method/", "Method"],
  ["/about/", "About"],
];

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;")
  .replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function fontHref(extra = []) {
  const families = [...FONTS_BASE, ...extra].sort((a, b) => a.localeCompare(b));
  return "https://fonts.googleapis.com/css2?" +
    families.map((f) => "family=" + f).join("&") + "&display=swap";
}

const MARK = `<svg class="s-mark" viewBox="0 0 20 20" aria-hidden="true">
<rect x="0" y="11" width="4" height="9" fill="currentColor"/>
<rect x="6" y="6" width="4" height="14" fill="currentColor"/>
<rect x="12" y="0" width="4" height="20" fill="var(--s-blue)"/>
</svg>`;

function head(p) {
  const canonical = SITE.origin + p.url;
  const ogUrl = SITE.origin + "/assets/" + p.og;
  const ld = p.jsonld ? p.jsonld(p) : [];
  return `<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(p.title)}</title>
<meta name="description" content="${esc(p.description)}">
<link rel="canonical" href="${canonical}">
${p.noindex ? '<meta name="robots" content="noindex, follow">\n' : ""}<meta name="theme-color" content="#F6F5F1" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#0E0E0D" media="(prefers-color-scheme: dark)">

<meta property="og:type" content="${p.published ? "article" : "website"}">
<meta property="og:site_name" content="${esc(SITE.name)}">
<meta property="og:locale" content="${SITE.locale}">
<meta property="og:title" content="${esc(p.title)}">
<meta property="og:description" content="${esc(p.description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${ogUrl}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(SITE.name)} — ${esc(SITE.tagline)}">
${p.published ? `<meta property="article:published_time" content="${p.published}">
<meta property="article:modified_time" content="${p.modified}">\n` : ""}<meta name="twitter:card" content="summary_large_image">
${SITE.twitter ? `<meta name="twitter:site" content="${SITE.twitter}">\n` : ""}<meta name="twitter:title" content="${esc(p.title)}">
<meta name="twitter:description" content="${esc(p.description)}">
<meta name="twitter:image" content="${ogUrl}">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="${fontHref(p.fonts)}">
<link rel="stylesheet" href="/assets/site.css">
<link rel="alternate" type="application/rss+xml" title="${esc(SITE.name)}" href="${SITE.origin}/feed.xml">

${SITE.adsense
  ? `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-${SITE.adsense}" crossorigin="anonymous"></script>`
  : `<!-- AdSense loader appears here once ADSENSE_PUB_ID is set (see tools/build.mjs). -->`}

${ld.map((o) => `<script type="application/ld+json">\n${JSON.stringify(o, null, 2)}\n</script>`).join("\n")}`;
}

function chrome(p, body) {
  const nav = NAV.map(([href, label]) =>
    `<a href="${href}">${label}</a>`).join("\n        ");
  const year = new Date().getFullYear();
  return `<a class="s-skip" href="#main">Skip to content</a>

<header class="s-header">
  <div class="s-header-in">
    <a class="s-wordmark" href="/">${MARK}${esc(SITE.name)}</a>
    <nav class="s-nav" aria-label="Sections">
        ${nav}
    </nav>
  </div>
</header>

<main id="main">
${body}
</main>

<footer class="s-footer">
  <div class="s-wrap">
    <div class="s-footer-in">
      <div>
        <a class="s-wordmark" href="/">${MARK}${esc(SITE.name)}</a>
        <p class="s-colophon">${esc(SITE.blurb)}</p>
      </div>
      <div>
        <h4>Read</h4>
        <ul>
          <li><a href="/posts/statement-of-purpose/">A statement of purpose</a></li>
          <li><a href="/graphics/half-staff/">Seven Years at Half-Staff</a></li>
          <li><a href="/method/">Method and corrections</a></li>
        </ul>
      </div>
      <div>
        <h4>Site</h4>
        <ul>
          <li><a href="/about/">About</a></li>
          <li><a href="/privacy/">Privacy and cookies</a></li>
          <li><a href="mailto:${SITE.email}">Contact</a></li>
        </ul>
      </div>
    </div>
    <div class="s-legal">
      <span>&copy; ${year} ${esc(SITE.name)}</span>
      <span>Graphics licensed CC BY 4.0 — reuse with credit</span>
      <span>Underlying records are US federal public domain</span>
    </div>
  </div>
</footer>

<script src="/assets/site.js" defer></script>`;
}

/* --------------------------------------------------------------------------- */

async function build() {
  await rm(OUT, { recursive: true, force: true });
  await cp("public", OUT, { recursive: true });
  console.log("copied public/ ->", OUT + "/");

  /* Fold the publisher ID and ad unit IDs into the shipped script, so turning
     ads on is an environment change rather than a code change. */
  if (SITE.adsense) {
    const jsPath = out("assets/site.js");
    let js = await readFile(jsPath, "utf8");
    js = js.replace('const AD_CLIENT = "";', `const AD_CLIENT = "ca-${SITE.adsense}";`);
    for (const [slot, envName] of Object.entries(AD_SLOT_ENV)) {
      const id = process.env[envName];
      if (id) js = js.replace(new RegExp(`("${slot}":\\s*)""`), `$1"${id}"`);
    }
    await writeFile(jsPath, js);
    console.log("adsense: injected", SITE.adsense, "into", jsPath);
  }

  for (const p of PAGES) {
    const body = await readFile(join("src", p.src), "utf8");
    const html = `<!doctype html>
<html lang="en">
<head>
${head(p)}
</head>
<body>
${chrome(p, body.trimEnd())}
</body>
</html>
`;
    await mkdir(dirname(out(p.out)) || OUT, { recursive: true });
    await writeFile(out(p.out), html);
    console.log("wrote", out(p.out));
  }

  const urls = PAGES.filter((p) => p.sitemap !== false && !p.noindex);
  const today = new Date().toISOString().slice(0, 10);
  await writeFile(out("sitemap.xml"),
`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((p) => `  <url>
    <loc>${SITE.origin}${p.url}</loc>
    <lastmod>${p.modified || today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join("\n")}
</urlset>
`);
  console.log("wrote", out("sitemap.xml"));

  await writeFile(out("robots.txt"),
`# ${SITE.name}
User-agent: *
Allow: /
Disallow: /404.html

# Ad crawlers need access for AdSense to serve relevant ads.
User-agent: Mediapartners-Google
Allow: /

User-agent: AdsBot-Google
Allow: /

Sitemap: ${SITE.origin}/sitemap.xml
`);
  console.log("wrote", out("robots.txt"));

  await writeFile(out("ads.txt"), SITE.adsense
    ? `google.com, ${SITE.adsense}, DIRECT, f08c47fec0942fa0\n`
    : `# Replace the publisher ID below with your own, then remove this comment.
# It must match AD_CLIENT in /assets/site.js (minus the "ca-" prefix) and the
# loader <script> in each page's <head>. Google checks this file before serving.
google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
`);
  console.log("wrote", out("ads.txt"));
}

build();
