# Data to the People

An independent data-journalism site. Static HTML, no framework, no build dependencies
beyond Node. Deploy the repository root to any static host.

```
npm run build     # write the whole site into dist/
npm run serve     # preview dist/ at http://localhost:8080
npm run preview   # collapse the homepage into one self-contained file
npm run og        # regenerate the 1200x630 social cards (needs Playwright)
```

No dependencies. `npm install` is not required to build.

## Do this first

Set your domain. Either edit `SITE.origin` in `tools/build.mjs`, or set `SITE_ORIGIN`
in your host's environment — env vars win over the literals in the file.

```
SITE_ORIGIN=https://yourdomain.com npm run build
```

It feeds every canonical URL, Open Graph tag and sitemap entry. The SEO is wrong until
it is right.

Deployment, and the Cloudflare Pages vs Vercel question, are in **`DEPLOY.md`**.

## Layout

```
src/              page bodies — edit these
public/           copied verbatim to the site root
  assets/           site.css, site.js, og-*.png
  _headers          Cloudflare Pages headers
  _redirects        Cloudflare Pages redirects
tools/build.mjs   the generator: page metadata, <head>, header, footer, sitemap, robots
tools/og.mjs      social card renderer
tools/preview.mjs single-file preview builder
vercel.json       the same headers and redirects, for Vercel
dist/             ── generated, gitignored, the only thing deployed ──
```

`src/` and `tools/` are never published: the build writes into `dist/` and the host is
pointed there. Page titles, descriptions and structured data live in the `PAGES` array in
`tools/build.mjs` — one place, so tags cannot drift between pages.

### Style isolation

Site chrome uses `--s-*` tokens and `s-`-prefixed classes; each graphic keeps its own
self-contained stylesheet scoped under `.gfx`. Neither can reach into the other. Keep it
that way when you add a graphic — it is the reason a graphic can be dropped in without
auditing the whole cascade.

## Turning on AdSense

1. Get approved at [adsense.google.com](https://adsense.google.com). You will need real
   content, a privacy policy, an about page and your own domain — all present here.
2. Set four environment variables and redeploy:

   ```
   ADSENSE_PUB_ID=pub-1234567890123456
   AD_SLOT_HOME_FEED=…
   AD_SLOT_ARTICLE_MID=…
   AD_SLOT_ARTICLE_END=…
   ```

That is the whole switch. The build emits the loader `<script>` in every `<head>`, writes
the publisher ID into the shipped `site.js`, and generates `ads.txt` — no code change and
no commit. To hard-code it instead, see the comment at the top of `public/assets/site.js`.

Until then every ad position renders as a labelled placeholder at the same height as the
real unit, so nothing shifts when ads switch on.

Placement is deliberately conservative — one unit on the homepage, two on an article,
none on the privacy page, all labelled and none adjacent to navigation or chart controls.
Adding more is the fastest way to lose both search rankings and AdSense standing.

## The first post

`src/statement-of-purpose.html` — the founding editorial, at `/posts/statement-of-purpose/`.
It states the three rules a graphic has to meet, what the site refuses to publish, that
advertising pays for it, and that the launch graphic ships with nine unverified entries.

**Sign it.** There is a comment in the source at the sign-off. A statement of purpose with
no name on it is the weakest version of itself — replace the placeholder byline with a real
one and a link to verifiable prior work. This is the highest-leverage edit in the repo.

## The graphic

`src/half-staff.html` — *Seven Years at Half-Staff*, counting the days the US flag flew at
half-staff nationwide, 2019–2025.

Its dataset is inline in the page, in the `<script type="application/json" id="episodes">`
block. Every number on the page — year totals, category shares, rankings, hero stats — is
computed from that block at render time, so correcting an entry updates the whole graphic.

```json
{"y":2021,"s":"2021-03-23","e":"2021-03-27","c":"shooting",
 "t":"Boulder, Colorado supermarket shooting","ev":"boulder","approx":true}
```

| Field | Meaning |
|---|---|
| `y` | Calendar year (a period spanning New Year is split in two) |
| `s` / `e` | First and last day at half-staff, inclusive |
| `c` | `figure`, `shooting`, `pandemic`, `attack`, or `annual` |
| `t` | Label shown on hover |
| `ev` | Groups split entries into one event for the "longest orders" ranking |
| `approx` | End date inferred, not confirmed against a proclamation |

**Counting rules.** A calendar day counts once however many orders cover it; an event
category beats a standing observance on the same day; standing observances are the five in
4 U.S.C. §7; governors' state-level orders are excluded.

**Open correction.** Nine entries carry `"approx": true`. They were compiled without access
to the Federal Register and should be checked against it — see `/method/`.

## Also in here

- `DEPLOY.md` — Cloudflare Pages vs Vercel for this project, and a step-by-step guide
  for each.
- `SEO.md` — what the build already does, and the launch checklist and content strategy
  that it cannot do for you.
- `SWOT.md` — strategic read of the project as an ad-funded publication.
