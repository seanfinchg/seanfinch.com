# CLAUDE.md

Guidance for working in this repo (seanfinch.com — Sean Finch's personal portfolio).

## Stack

- **React 19** + **TypeScript** + **Vite 8**
- **Tailwind CSS v4** via the `@tailwindcss/vite` plugin (not the old PostCSS flow; `tailwind.config.js` + `src/index.css`)
- **react-router-dom v7** (client-side routing, `BrowserRouter`)
- Deployed on **Netlify** (`netlify.toml`); auto-deploys from `main`.
- **Node ≥ 22 required** (`package.json` `engines`). Pinned to **Node 24 LTS** via `.nvmrc`; Netlify builds on `NODE_VERSION = "24"`. `@types/node` tracks the Node 24 major. Locally, `fnm`/`nvm` auto-selects from `.nvmrc`.
- No test framework is configured.

## Commands

```bash
npm run dev      # Vite dev server
npm run build    # tsc (typecheck) && vite build  → outputs to dist/
npm run lint     # eslint, zero warnings allowed
npm run preview  # preview the production build
```

Always run `npm run build` before considering a change done — the build typechecks with `tsc` and will fail on type errors. Run `npm run lint` too; it is configured with `--max-warnings 0`.

## Architecture

- **Entry:** `src/main.tsx` → `src/App.tsx`. `App.tsx` defines all routes and wraps everything in `ThemeProvider` + `Layout`.
- **Pages:** `src/pages/*` — one component per route. Routes are listed in `src/App.tsx`.
- **Layout / chrome:** `src/layouts/Layout.tsx`, `src/components/Navbar.tsx`, `src/components/Footer.tsx`.
- **Content is data-driven.** Page content lives in `src/data/`:
  - `experiences.ts` — work history (array of `ExperienceProps`); logos imported from `src/assets/`.
  - `projects.ts` — projects.
  - `photos.ts` — thin re-export of the `virtual:photo-manifest` module (see below).
  - `photo-exif.json` — per-file EXIF (camera, lens, aperture, ISO, shutter, date).
- **Theming:** `src/contexts/themeContext.tsx` provides light/dark; `src/utils/themeUtils.ts` maps theme → class strings. Components call `useTheme()` and pass `theme` into helpers like `getThemeClasses(theme)`.
- **Scroll animations:** `src/hooks/useScrollReveal.ts` (IntersectionObserver → `.scroll-reveal` class).
- **Path aliases** (`vite.config.ts`): `@` → `src/`. `lucide-react` and `sonner` are aliased to **local stubs** in `src/lib/` — do not add the real npm packages; extend the stubs if you need more icons/toasts.
- **Fonts:** `@fontsource/{jost,raleway,roboto-slab}`. Tailwind font families: `font-jost`, `font-raleway`, `font-monospace`.

## Photography pipeline (important + non-obvious)

Photos are **committed WebP files** in `public/photography/` (~66 MB, ~45 files as of this writing). The gallery is generated at build time by a **custom Vite plugin** in `vite.config.ts`:

- `photoManifestPlugin()` scans `public/photography/*.webp`, groups files into **"stacks"**, and exposes them through the virtual module `virtual:photo-manifest` (re-exported by `src/data/photos.ts`).
- **Resized derivatives (performance):** the same plugin's `buildStart` hook uses `sharp` to generate two smaller WebP sizes for every photo into `public/photography/_derived/{thumb,large}/` — `thumb` (~500px, used for grid tiles + filmstrip) and `large` (~2000px, used in the lightbox/compare view). Full-res originals are only fetched on explicit request. `_derived/` is **gitignored** and regenerated on every build (generation is incremental — skips files whose derivative is already up to date). The manifest exports `photoThumb(f)` and `photoLarge(f)` alongside the original `photoSrc(f)`.
- Each stack has a `cover` index → the version shown by default on the tile and when the lightbox opens. **The edited version is the default cover** when a stack contains one. Tiles and the lightbox show an **"Edited" / "Original" badge** (via `isEditedFile`).
- **Hiding photos:** add filenames to `src/data/photo-hidden.json` (a JSON array) to exclude them from the gallery without deleting them. They stay in the repo (and are still deployed) but never appear in the manifest.
- **Gear labels** (hero + footer) come from `CAMERA` / `LENSES` consts at the top of `Photography.tsx`; per-photo lens is read from EXIF. Add lenses to `LENSES` as acquired.
- **Stacking / naming convention** — files are grouped by a "base" name so multiple versions of one shot appear as a single tile:
  - `NAME.webp` — original / primary.
  - `NAME-edit.webp`, `NAME_edited.webp`, `NAME-EDIT.webp` — treated as the **edited** version (sorted last, labeled "Edited"; the primary is labeled "Original" when a stack has exactly 2). A stack of exactly one original + one edited enables the **before/after comparison slider** (`src/components/BeforeAfterSlider.tsx`) via the "Compare" button in the lightbox.
  - `NAME (2).webp` — additional numbered versions.
- Stacks are sorted **newest-first** using `DateTimeOriginal` from `photo-exif.json`, falling back to descending filename.
- The dev server watches `public/photography/` and full-reloads when files are added/removed.

**Adding photos is a manual, local process** via `scripts/` (both hardcode the source folder `C:\Users\seanf\Downloads\Portfolio Pics`):

- `scripts/copy-exif.mjs` — converts source JPGs → WebP (quality 85, `sharp`), applying EXIF orientation and preserving metadata.
- `scripts/extract-exif.mjs` — reads EXIF from the source JPGs → writes `src/data/photo-exif.json`.

`sharp` is a devDependency used only by these scripts. To add photos: drop JPGs in the source folder, run both scripts, verify the new WebP files land in `public/photography/`, then commit.

## Deployment & caching

`netlify.toml` sets long cache headers: `/assets/*` and `/photography/*` are `immutable, max-age=1y`; other media 1 week; HTML never cached. Vite emits content-hashed filenames under `/assets/`, so those are safe to cache forever. `/photography/*` is cached immutably on the assumption filenames never change — **if you ever overwrite a photo under the same name it will be stale in caches;** use a new filename instead.

## Conventions

- Functional components + hooks; `React.FC` is used in most components.
- Tailwind utility classes inline; conditional styling keyed off `theme` and helper functions in `themeUtils.ts`.
- Prettier is present (`prettier` devDep) — match the existing 2-space, double-quote style.
- Keep new page content in `src/data/` where a data file already exists, rather than hardcoding it into JSX.

## Experience "active" logic

Date parsing lives in **one place**: `src/utils/experienceUtils.ts`.
- `isCurrentlyActive(dateRange)` — used by `Experience.tsx` and `ExperienceCard.tsx` for the green "Active" badge.
- `getCurrentExperience()` / `hasActiveExperience()` — used by the Home hero banner, which is **derived from `experiences` + today's date** (no longer hardcoded). If a role is active it reads "Currently at …"; otherwise "Most recently at …". The banner therefore self-corrects as dates pass — just keep `dateRange` values accurate in `src/data/experiences.ts` (format: `"Month YYYY – Month YYYY"` or `"Month YYYY – Present"`).

## Improvement backlog (site-wide review)

Prioritized list from a whole-site review. **P0 is done** (kept here for context).

**P0 — done:**
- SEO/social meta in `index.html` (description, Open Graph, Twitter, canonical, theme-color) + `public/robots.txt`, `public/sitemap.xml`, and a generated `public/og-image.jpg` (regenerate via `node scripts/gen-og-image.mjs`).
- Per-route title + description via `src/hooks/usePageMeta.ts` (used by the content pages).
- Security headers in `netlify.toml` (CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy) — aim for an A+ on securityheaders.com.

**P0 — deferred:** true prerender/SSG for the SPA. Social scrapers already get real OG tags from the static `index.html`, and Google renders JS, so the practical win is mostly captured. Full per-route prerender (`react-snap`/similar) is a heavier, riskier change — do it as a focused follow-up if organic search matters.

**P1 (polish/perf):**
- Route-based code splitting (`React.lazy`) for heavy routes (Photography, cipher tools, diagram iframes) — the JS bundle is one ~440 KB chunk.
- Trim `@fontsource` to latin-only subsets (Cyrillic/Greek/Vietnamese are being shipped unused).
- Accessibility: real `alt` text on gallery/lightbox images; `aria-label`s on lightbox icon buttons; lightbox focus trap; light-mode contrast check.
- `npm audit` — 6 known vulns (1 low / 2 moderate / 3 high) as of the Node-24 bump.

**P2 (content/maturity):**
- Project **case studies** (highest content ROI — see `docs/ROADMAP.md`).
- Privacy-friendly analytics (Cloudflare/Plausible free tier).
- A Vitest smoke test + GitHub Action running `build`/`lint`.
- Blog (deferred; tooling noted in `docs/ROADMAP.md`).

## Crawler policy (robots.txt + AI)

`public/robots.txt` runs **three deliberately different tiers**. Two mechanics
it depends on, both easy to get wrong:

- **Rules are not inherited.** A crawler matching a named `User-agent` group
  ignores `User-agent: *` entirely, so each group must be self-contained.
- **Longest matching path wins**, not first match. That is why `Disallow: /`
  can sit *below* a list of `Allow:` lines and still behave.

| Tier | Who | Access |
| --- | --- | --- |
| 1 | Search engines (`*`) | Everything, but images limited to `_derived/thumb/` |
| 2 | `ChatGPT-User`, `Claude-User`, `Perplexity-User`, `Applebot` | Everything |
| 3 | `GPTBot`, `ClaudeBot`, `PerplexityBot`, `CCBot`, `Google-Extended`, ... | Professional pages only |

Tier 2 is user-triggered fetches (a human asked an assistant to read the site,
often a recruiter) so it gets full access on purpose. Tier 3 is training and
answer-engine indexing: the resume surface is open so AI answers about Sean are
accurate, photography is excluded. `/assets/` is allowed in tier 3 so any
JS-rendering crawler can boot the SPA.

**Verify changes** before shipping — a longest-match checker over the real file
beats reasoning about it. `Disallow: /photography/` (trailing slash) does *not*
match the `/photography` page itself; that asymmetry is load-bearing.

**AI crawlers do not run JavaScript.** GPTBot/ClaudeBot/PerplexityBot fetch HTML
only, and this is a client-side SPA, so they would otherwise see an empty
shell. Two things in `index.html` carry the profile for them, and both must be
kept in sync with `src/data/experiences.ts` when roles change:
- a **JSON-LD `Person` block** (a data block, so `script-src 'self'` does not
  apply to it), and
- a **`<noscript>` fallback** with the experience summary and skills.

Full per-route prerendering is still the deferred P0 and remains the real fix.

## Photo metadata hygiene

`scripts/copy-exif.mjs` calls sharp's `.withMetadata()`, which preserves **every**
source tag. `scripts/strip-exif.mjs` (`npm run photos:sanitize`) removes the
identifying ones via exiftool and **must be run after adding photos**, before
committing. It is idempotent and self-verifying (exits non-zero on any leak).

Stripped: camera/lens serials, vendor **MakerNotes** (Nikon `ShutterCount` and
`PowerUpTime` fingerprint a body as well as a serial), and the whole **XMP**
block (Adobe `RawFileName`, `ImageNumber`, persistent `DocumentID`/`InstanceID`
UUIDs that correlate reposted copies, `CreatorTool` leaking editing OS and
local timezone, plus ~200 Camera Raw sliders).

Kept: `Make`, `Model`, `LensModel`, `FNumber`, `ExposureTime`, `ISO`,
`FocalLength`, `DateTimeOriginal`, plus `Artist`/`Copyright` added for
attribution. No GPS was ever present.

exiftool rewrites only the metadata chunks, so this is **lossless** — verified
by comparing `VP8`/`ICCP` chunk hashes against git. The gallery is unaffected
either way: it reads `src/data/photo-exif.json`, built separately from the
source JPGs. `_derived/*` is already metadata-free (sharp strips by default
when `.withMetadata()` is not called).

## Retired routes

- **`/music`** (retired Sept 2026) — hidden, not deleted. `src/pages/Music.tsx` and
  `public/music/` are still in the repo; the page is simply unrouted, so Vite
  tree-shakes it out of the bundle. To bring it back, re-add the import + the
  `<Route path="/music">` line in `src/App.tsx`, restore the `sitemap.xml`
  entry, and drop the `/music` rules from `_redirects` + `netlify.toml`.
- Hiding is enforced in four places, all of which must agree: the missing route
  in `App.tsx`, a hard `404` rule in `public/_redirects` (kept **above** the SPA
  catch-all — Netlify matches in order), `X-Robots-Tag: noindex` headers on
  `/music` and `/music/*` in `netlify.toml`, and the removed `sitemap.xml` entry.
- **Open follow-up:** `public/robots.txt` has a `# Disallow: /music` line left
  commented out on purpose. `/music` was already indexed, and disallowing it
  would block the crawl that Google needs in order to see the 404/noindex and
  de-index the URL. Uncomment it only after Search Console confirms `/music` and
  `/music/*` have dropped out of the index.

## Known rough edges (candidates for cleanup)

- `npm run lint` currently reports pre-existing `react-hooks` errors in `src/pages/HomelabDiagrams.tsx` and `src/pages/DiagramViewer.tsx` (conditional hook calls / setState-in-effect). These predate the current work; the lint gate won't pass until they're refactored.
- Full-res originals (~66 MB) are still committed to git. Serving performance is solved via `_derived` resized versions, but repo size will keep growing as photos are added; consider moving originals off-repo (e.g. Cloudflare R2) if it becomes a problem.
