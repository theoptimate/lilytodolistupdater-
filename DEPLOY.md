# Deploying Data to the People

This is a static site: HTML, one stylesheet, one script, no framework, no runtime,
no dependencies. `node tools/build.mjs` writes everything into `dist/`. Any host
that can run Node and serve a folder will do.

> **Decided: Cloudflare Pages.** The comparison below is kept as the reasoning
> behind it. The Cloudflare account already hosts `hattenindustries.com`, so the
> DNS half of the custom-domain step is a dropdown rather than a records chase.
>
> **Verify the plan terms yourself.** The comparison below was written without
> network access to cloudflare.com or vercel.com, so the pricing and licence
> details are from general knowledge and may have moved. The one that decides the
> recommendation — whether Vercel's free tier permits a site running ads — is
> worth thirty seconds on their pricing page before you commit.

---

## Cloudflare Pages or Vercel?

**Recommendation: Cloudflare Pages.** Not because it is better in general, but
because every reason to choose Vercel is a reason that does not apply to this
project.

### What Vercel is good at, and why none of it lands here

Vercel's value is Next.js: server rendering, incremental static regeneration,
serverless and edge functions, `next/image`, middleware. This site has none of
those things and needs none of them. It is seven HTML files. Choosing Vercel here
means adopting a platform for capabilities you are not using.

### The one that actually decides it

Vercel's free **Hobby** tier is licensed for non-commercial use. A site running
AdSense is commercial by any reading. That puts this project on **Pro, around $20
a month**, from the day ads switch on.

Cloudflare Pages' free tier carries no such restriction, and includes unlimited
bandwidth and requests, with 500 builds a month.

So the honest comparison is not "free vs free". It is roughly **$0 vs $240 a
year** for a site with, at present, no revenue — against a model the SWOT already
describes as thin.

### What is *not* a good reason to pick Cloudflare

Bandwidth. It gets cited constantly and it does not matter at this scale. A page
here is roughly 60 KB. The 100,000-view Reddit spike the SWOT anticipates is about
6 GB — comfortably inside Vercel's 100 GB free allowance. Unlimited bandwidth is
nice insurance, not a deciding factor.

### The two genuine secondary points

- **Cloudflare Web Analytics is free and cookieless.** Your privacy policy
  currently says you run no analytics, and your audience is exactly the audience
  that blocks trackers. A cookieless product gives you numbers without adding a
  consent obligation or a new vendor row to the privacy page. Vercel's analytics
  is a paid add-on beyond a small free allowance.
- **Cloudflare's docs are messier.** Pages is being folded into Workers, so search
  results often describe a flow that no longer matches the dashboard. Vercel's
  onboarding is smoother. This is a real cost, paid once.

### If you disagree

Switching is a host change, not a code change. `vercel.json` and
`public/_headers` both ship in this repo and each host ignores the other's file.
The only thing that would genuinely favour Vercel is a decision to rebuild this as
a Next.js app — and that decision should be driven by needing server rendering,
which nothing here does.

---

## Before either deploy

1. **Merge to `main`.** Everything is currently on
   `claude/us-flag-half-mast-graphic-ibevfl`. Both hosts deploy a production
   branch; make it `main` and treat other branches as previews.
2. **Have your domain ready.** `SITE_ORIGIN` must be the real one or every
   canonical URL, `og:url` and sitemap entry points somewhere that does not exist.
   If the domain is already in this Cloudflare account, there is nothing to set up
   in advance — Pages will offer the zone and write the DNS record for you. If it
   is a new domain, add it to Cloudflare (or register it through Cloudflare
   Registrar) before step 5, so the same shortcut applies.

There is nothing else. No secrets, no database, no API keys.

---

## GitHub → Cloudflare Pages

1. **Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git.**
   Authorise GitHub and pick `theoptimate/lilytodolistupdater-`.

2. **Build settings:**

   | Field | Value |
   |---|---|
   | Framework preset | **None** |
   | Build command | `node tools/build.mjs` |
   | Build output directory | `dist` |
   | Root directory | `/` |
   | Production branch | `main` |

3. **Environment variables** (Settings → Environment variables), production:

   | Name | Value | When |
   |---|---|---|
   | `SITE_ORIGIN` | `https://yourdomain.com` | now |
   | `NODE_VERSION` | `20` | if the build picks an older Node |
   | `ADSENSE_PUB_ID` | `pub-…` | after AdSense approval |
   | `AD_SLOT_HOME_FEED` | numeric unit ID | after approval |
   | `AD_SLOT_ARTICLE_MID` | numeric unit ID | after approval |
   | `AD_SLOT_ARTICLE_END` | numeric unit ID | after approval |

   Setting `ADSENSE_PUB_ID` is the whole switch: the build emits the loader
   script in every `<head>`, writes the ID into `assets/site.js`, and generates
   `ads.txt`. No code change, no commit. Leave it unset and every ad position
   renders as a labelled placeholder at the same height, so nothing shifts when
   you turn it on.

4. **Save and Deploy.** First build takes about a minute.

5. **Custom domain** (Custom domains → Set up a domain). Because the zone is
   already in this account, Cloudflare creates the CNAME itself and issues the
   certificate — no records to copy, usually live within a minute or two.

   Add both the apex and `www` and let Cloudflare redirect one to the other. Pick
   whichever form you put in `SITE_ORIGIN` as the target and do not change your
   mind later: every canonical tag, sitemap entry and inbound link is built on
   that choice.

   Using a subdomain of an existing site works the same way — pick it in the same
   dropdown. Note that a Pages project can only own a hostname, not a path, so a
   subfolder like `hattenindustries.com/data/` would need a Worker in front to
   route it. Doable, but not step one.

6. **Redeploy** once the domain is attached, so `SITE_ORIGIN` is baked into the
   canonical tags.

## GitHub → Vercel

1. **vercel.com → Add New → Project → Import Git Repository.**

2. **Framework Preset: Other.** `vercel.json` already sets the build command
   (`node tools/build.mjs`), the output directory (`dist`), `trailingSlash: true`
   and the cache and security headers, so leave the fields alone.

3. **Environment variables:** the same table as above, minus `NODE_VERSION`
   (set the Node version in Project Settings → General instead).

4. **Deploy**, then add the domain under Settings → Domains, then redeploy.

5. **Check your plan.** If the project is on Hobby and ads are live, upgrade —
   see the note at the top.

---

## After the first deploy, on either host

Check these by hand. They are the things that silently break.

- `https://yourdomain.com/robots.txt` — resolves, names the right sitemap host.
- `/sitemap.xml` — every `<loc>` is your real domain, not `datatothepeople.org`.
- `/ads.txt` — present. Google checks it before serving ads.
- View source on the homepage: `<link rel="canonical">` matches the URL you are on.
- `/about` (no trailing slash) — note whether you land on `/about` or `/about/`.
  Every canonical, sitemap entry and internal link in this repo uses the trailing
  slash. If your host settles on the other form, change the `url:` values in the
  `PAGES` array in `tools/build.mjs` to match. They are all in one place.
- `/graphics` — should redirect to the half-staff graphic.
- `/nonsense` — should serve the 404 page.
- Response headers on `/assets/site.css` — `Cache-Control` present.
- [Rich Results Test](https://search.google.com/test/rich-results) on the article
  and the statement of purpose.
- [PageSpeed Insights](https://pagespeed.web.dev/) on the homepage.
- Submit the sitemap in [Search Console](https://search.google.com/search-console).

---

## What this project does *not* need

Worth stating, because generic deployment advice will tell you otherwise:

- **No framework audit.** There is no Next.js here, no React, no bundler, no
  `next.config.js`, no App Router. Advice about server components, ISR or
  `next/image` does not apply to anything in this repo.
- **No dependency cleanup.** `package.json` has zero dependencies, by design. The
  only third-party code that reaches a reader is Google Fonts and, later, the
  AdSense loader.
- **No build warnings to chase.** There is no compiler. The build either writes
  ten files or throws.
- **No platform-specific code to remove.** Nothing in `src/` or `tools/` assumes a
  host. That is why both config files can sit in the repo at once.

The real deployment risks here are the boring ones the checklist above covers:
a wrong `SITE_ORIGIN`, a trailing-slash mismatch, and shipping before `ads.txt`
is reachable.
