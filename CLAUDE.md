# Data to the People — working notes

Static data-journalism site. No framework, no dependencies. `node tools/build.mjs`
writes everything into `dist/`; the host is pointed there.

## Commands

```
npm run check     # build, then fail on anything that would break a launch
npm run build     # write the site into dist/
npm run serve     # preview dist/ at localhost:8080
npm run og        # regenerate social cards (needs Playwright installed ad hoc)
```

Run `npm run check` before any commit that touches `src/`, `public/` or
`tools/build.mjs`. It is the only test this project has.

## Rules that are easy to break

- **Never edit anything in `dist/`.** It is generated and gitignored. Page bodies
  live in `src/`, chrome and metadata in `tools/build.mjs`.
- **Never paste a literal domain or email into a fragment.** Use `{{ORIGIN}}`,
  `{{EMAIL}}`, `{{SITE_NAME}}`. The domain must stay a single value; the preflight
  fails on leftovers.
- **Keep the two stylesheets apart.** Site chrome uses `--s-*` tokens and
  `s-`-prefixed classes. Each graphic keeps its own stylesheet scoped under
  `.gfx`. This is what lets a graphic be dropped in without auditing the cascade —
  do not introduce bare element selectors in `site.css`, or unscoped ones in a
  graphic.
- **Every figure is computed from data in the page.** Totals, shares and rankings
  derive from the inline JSON at render time. Never hard-code a number that the
  dataset already implies — the site's whole claim rests on this.
- **Ad placement is deliberate.** One unit on the homepage, two on an article,
  none on privacy, all labelled, none adjacent to navigation or chart controls.
  Adding more costs search rankings and AdSense standing.

## Branches

Develop on `claude/us-flag-half-mast-graphic-ibevfl`. `main` is the production
branch Cloudflare Pages deploys.

**Standing instruction from the owner: keep `main` in sync automatically.**
Fast-forward only, and only when `npm run check` passes. Never a merge commit,
never a force-push, never a rewrite of published history.

## Open items

- The launch graphic carries nine entries with inferred end dates
  (`"approx": true`). Verify against the Federal Register — see `/method/`.
- `/posts/statement-of-purpose/` is unsigned. It needs a real byline.
- `SITE_ORIGIN` is still the placeholder `datatothepeople.org`.

## `agent/` is not the site

`agent/` is a separate subsystem: an email → venture-opportunity pipeline with its own
`package.json` (one dependency, the Anthropic SDK), its own tests
(`npm run agent:test`) and its own README. `npm run check` does not cover it, and it
writes nothing into `dist/`. Its `state/` and `config/profile.json` are gitignored —
they are personal data, not project files.

## Where things are documented

`README.md` build and data model · `DEPLOY.md` hosting · `SEO.md` search ·
`SWOT.md` strategy · `agent/README.md` the venture agent.
