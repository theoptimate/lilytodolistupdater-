# SEO for Data to the People

Two parts: what is already built into the site, and what you have to do yourself.

---

## Part 1 — already implemented

Regenerate everything with `node tools/build.mjs`. The metadata lives in one place
(`PAGES` in `tools/build.mjs`) so tags cannot drift between pages.

| Item | Where | Notes |
|---|---|---|
| Unique `<title>` per page, ≤ 60 chars | `tools/build.mjs` | Front-loads the distinctive words |
| Unique meta description, ≤ 155 chars | `tools/build.mjs` | Written to earn the click, not to stuff keywords |
| Canonical URL | every page | Absolute, built from `SITE.origin` |
| Open Graph + Twitter card | every page | With real 1200×630 images in `/assets` |
| JSON-LD structured data | every page | `Organization` + `WebSite` on home; `Article` + `BreadcrumbList` on the graphic; `AboutPage` / `WebPage` elsewhere |
| `sitemap.xml` | generated | Only indexable pages; `lastmod` from page metadata |
| `robots.txt` | generated | Points at the sitemap; explicitly allows `Mediapartners-Google` and `AdsBot-Google` so AdSense can crawl |
| `noindex` on 404 | `tools/build.mjs` | `noindex, follow` |
| Semantic HTML | all pages | One `<h1>`, real `<main>`, `<nav>`, `<footer>`, skip link, `aria-current` on the active nav item |
| Visible byline + date | article page | Matches the `Article` JSON-LD — mismatches are a rich-result failure |
| Breadcrumb trail | article + text pages | Visible and in JSON-LD |
| Mobile-first, no horizontal scroll | verified at 400 px | Chart scrolls inside its own container |
| CLS protection | `assets/site.css` | Ad slots reserve 250 px before the unit loads |
| Fast by construction | — | No framework, no client-side routing, one CSS file, one deferred JS file |

**Font loading is the one performance cost.** Four Google Fonts families load on the
graphic page. If Core Web Vitals suffer, self-host the two you actually need above the
fold (Fraunces, Public Sans) as `woff2` with `font-display:swap` and drop the rest.

---

## Part 2 — what you have to do

### At launch
1. Point the domain, serve over HTTPS, force `www` → apex (or the reverse) with a 301.
2. Set `SITE.origin` in `tools/build.mjs` to the real domain and rebuild. **Nothing works
   until this is right** — every canonical, OG URL and sitemap entry is derived from it.
3. Verify the property in [Google Search Console](https://search.google.com/search-console)
   and [Bing Webmaster Tools](https://www.bing.com/webmasters). Submit `sitemap.xml`.
4. Run the article URL through the
   [Rich Results Test](https://search.google.com/test/rich-results) and
   [PageSpeed Insights](https://pagespeed.web.dev/).
5. Regenerate the social cards on a machine with network access (`node tools/og.mjs`) so
   they use Fraunces rather than the fallback serif.

### Content strategy

The addressable search demand for this site is **specific factual questions about the
public record**, not "data visualization". Nobody searches for a chart; they search for
the number the chart contains.

The existing graphic already targets a real, recurring, high-volume query family:
*why are flags at half-staff today* spikes every single time an order is issued. That is
the model to repeat — pick records that generate recurring news-driven demand:

| Cluster | The query behind it |
|---|---|
| Flag / protocol orders | "why are flags at half staff", "how long half staff for a president" |
| Federal disaster declarations | "has my county been declared a disaster area" |
| FOIA performance | "how long does a FOIA request take" |
| Recalls | "how long before a recall is issued" |
| Federal grant flows | "how much federal money does my district get" |

For each cluster, publish **one deep interactive graphic** plus **two or three short
explainers** that answer the sub-questions in plain text and link to it. The graphic earns
the links; the explainers catch the long tail. Ten pages that each answer one question
beat one page that tries to answer ten.

### E-E-A-T — the part that actually gates a site like this

Google's quality raters look for evidence a real, accountable entity produced the page.
This site is unusually well set up for that, but two gaps are open:

- **No named author.** "Data to the People" is currently an entity with no person behind
  it. Add a real byline with a bio and a way to verify the person exists (a professional
  profile, prior work, an institution). This is the single highest-leverage change.
- **The flagship graphic is a working draft.** Nine unverified entries on the one piece
  the whole site rests on is an accuracy risk, and accuracy is the entire pitch. Verify
  them against the Federal Register before you chase traffic to it.

What you already have right: a public method page, a corrections policy, visible dates,
cited sources, and a licence. Keep the corrections log public — a visible correction
history reads as trustworthy, not as weakness.

### Distribution — where the traffic actually comes from

Search is the long game. For the first year, most traffic will come from people sharing
graphics:

- **Reddit** — r/dataisbeautiful (post the image with an OC flair and the tool used),
  plus the topical subreddit for each piece. Read each sub's rules; self-promotion bans
  are strictly enforced.
- **Hacker News** — works for method and interactive craft, not for the chart alone.
- **Newsletters** — pitch data-journalism roundups; they are always short of material.
- **Wikipedia** — a CC BY chart that illustrates an article is a permanent, high-authority
  link. Do not add it yourself; propose it on the talk page.
- **Educators** — CC BY plus a downloadable dataset makes these pages usable in class,
  which produces `.edu` links, which is the most durable authority you can get.

The licence is a distribution strategy, not just a nice gesture. Every republication with
attribution is a backlink you did not have to ask for.

### Measurement

Watch four things in Search Console, monthly:
1. **Impressions by query** — which questions you are surfacing for at all.
2. **Position 5–20 pages** — the cheapest wins are pages already ranking, one edit away.
3. **Pages indexed vs submitted** — a gap means a crawl or quality problem.
4. **Core Web Vitals** — ads are the usual cause of a regression here; check after
   switching AdSense on.

### Known risks

- **AI Overviews** answer "how many days was the flag at half-staff in 2024" without a
  click. Defend by owning what a summary cannot reproduce: the interactive, the dataset,
  the method. Lead with the thing people come back to, not the single number.
- **Site reputation and helpful-content updates** punish pages that look mass-produced.
  Low page count is fine; thin, templated pages are not.
- **Ad layout is a ranking factor.** Two units per article is deliberate. Adding
  interstitials or above-the-fold blocks will cost you both rankings and AdSense standing.
