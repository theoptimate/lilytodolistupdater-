# Data to the People

An independent data-journalism site. Static HTML, no framework, no build dependencies
beyond Node. Deploy the repository root to any static host.

```
node tools/build.mjs      # regenerate every page, sitemap.xml, robots.txt, ads.txt
node tools/og.mjs         # regenerate the 1200x630 social cards (needs Playwright)
npx http-server . -p 8099 # preview locally

node tools/preview.mjs index.html > preview.html   # one self-contained file
```

## Do these two things first

Both live at the top of `tools/build.mjs`, in `SITE`:

```js
origin:  "https://datatothepeople.org",   // your real domain, no trailing slash
adsense: "",                              // "pub-1234567890123456" once approved
```

`origin` feeds every canonical URL, Open Graph tag and sitemap entry — the SEO is wrong
until it is right. Re-run `node tools/build.mjs` after changing either.

## Layout

```
src/              page bodies (edit these)
tools/build.mjs   the generator: page metadata, <head>, header, footer, sitemap, robots
tools/og.mjs      social card renderer
assets/           site.css, site.js, og-*.png
index.html        ── generated ──
posts/, graphics/, about/, method/, privacy/, 404.html, sitemap.xml, robots.txt, ads.txt
```

Never edit a generated page directly; it is overwritten on the next build. Page titles,
descriptions and structured data live in the `PAGES` array in `tools/build.mjs`.

### Style isolation

Site chrome uses `--s-*` tokens and `s-`-prefixed classes; each graphic keeps its own
self-contained stylesheet scoped under `.gfx`. Neither can reach into the other. Keep it
that way when you add a graphic — it is the reason a graphic can be dropped in without
auditing the whole cascade.

## Turning on AdSense

1. Get approved at [adsense.google.com](https://adsense.google.com). You will need real
   content, a privacy policy, an about page and your own domain — all present here.
2. Put the publisher ID in three places, all of which must match:
   - `AD_CLIENT` in `assets/site.js` (`ca-pub-…`)
   - `SITE.adsense` in `tools/build.mjs` (`pub-…`, no `ca-` prefix) → writes `ads.txt`
   - the commented-out loader `<script>` in the `<head>` block of `tools/build.mjs`
     — uncomment it and set the same ID
3. Create each unit in the AdSense dashboard and paste its numeric slot ID into
   `AD_SLOTS` in `assets/site.js`. The slot names are `home-feed`, `article-mid` and
   `article-end`.
4. Rebuild.

Until step 2 is done every ad position renders as a labelled placeholder at the same
height as the real unit, so the layout does not shift when ads switch on.

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

- `SEO.md` — what the build already does, and the launch checklist and content strategy
  that it cannot do for you.
- `SWOT.md` — strategic read of the project as an ad-funded publication.
