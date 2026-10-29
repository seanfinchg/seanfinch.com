# Performance report: `perf/overnight` (2026-10-29)

Local only. Nothing pushed. Ten commits on `perf/overnight` on top of `dev`, plus
this report. `npm run check`, `npm run security:headers` and
`node scripts/check-content.mjs tree` all pass on the final commit.

## Results

### Mobile, real throttling (the numbers to trust)

Lighthouse 13, `--throttling-method=devtools` (Slow 4G and 4x CPU are actually
applied), median of 3, against `vite preview`. "Before" is `src/` at the
baseline commit `4d4baa4`.

| Page | Score | FCP | LCP | TBT | CLS | Transfer |
| --- | --- | --- | --- | --- | --- | --- |
| `/` | 86 → **90** | 2.91 → 2.53 s | 3.49 → 3.11 s | 23 → 0 ms | 0.005 → 0.005 | 2090 → **372 KB** |
| `/about` | 70 → **92** | 2.83 → 2.47 s | 8.47 → **2.85 s** | 0 → 0 ms | 0 → 0 | 1461 → **406 KB** |
| `/projects` | 88 → **90** | 2.65 → 2.48 s | 3.23 → 3.09 s | 0 → 0 ms | 0.056 → 0.056 | 903 → **362 KB** |
| `/experience` | 85 → **91** | 2.65 → 2.47 s | 3.72 → 3.01 s | 0 → 0 ms | 0.015 → 0.015 | 1563 → **405 KB** |
| `/photography` | 77 → 77 | 2.71 → 2.21 s | 5.11 → 4.87 s | 0 → 168 ms | 0.018 → 0.018 | 1062 → 959 KB |

### Desktop, Lighthouse default (simulated) throttling

| Page | Score | LCP | TBT | Transfer |
| --- | --- | --- | --- | --- |
| `/` | 100 → 100 | 0.25 → 0.20 s | 54 → 0 ms | 1579 → 370 KB |
| `/about` | 100 → 100 | 0.24 → 0.20 s | 69 → 0 ms | 950 → 378 KB |
| `/projects` | 100 → 100 | 0.24 → 0.21 s | 0 → 0 ms | 391 → 362 KB |
| `/experience` | 100 → 100 | 0.25 → 0.20 s | 0 → 0 ms | 1052 → 405 KB |
| `/photography` | 98 → 98 | 1.12 → 1.11 s | 0 → 0 ms | 1062 → 1055 KB |

### Why mobile uses real throttling

The brief's default (simulated) mobile run scored the baseline 95–100. That
number was misleading. The baseline's huge avatar decode meant Chrome reported
the ☰ menu button as LCP. Once the image was fixed, Chrome correctly reported the
hero text as LCP instead. Lighthouse's simulator models a text LCP as waiting on
every earlier request, so simulated mobile LCP *rose* from 0.9 s to about 3.5 s.
Meanwhile the observed LCP *fell* (514 → 488 ms) and FCP fell (514 → 405 ms). The
real-throttling run above measures what a phone actually experiences.

Targets from the brief: `/about` is 92 (≥90 met), but its LCP is 2.85 s
(target <2.5 s, not met). `/` is 90 (met), with LCP 3.11 s (target not met).
What's left is mostly the main JS (React DOM is 200 KB of the 344 KB chunk) and the
render-blocking CSS. True prerendering, the deferred P0, is the real fix for
both.

## Commits

1. `4d4baa4` Commits last session's handoff docs.
2. `82cdbca` **Right-sized images.** New `scripts/optimize-images.mjs` writes
   `pfp-{88,176,264}.webp` and `SeanPortrait-{480,960,1440}.webp` (new names; the
   originals stay, and `index.html` JSON-LD still points at `SeanPortrait.jpg`).
   Home and About use `srcset`/`sizes`/`width`/`height`. `audax-group.jpeg`: a CMYK
   JPEG with a 557 KB ICC profile became sRGB, **554 KB → 6 KB**, same pixels
   (mean diff 1.4/255).
3. `76fa06d` **Route code splitting (SF-9).** One `<Suspense>` in `Layout`,
   *outside* the keyed `animate-page-in` wrapper, so the page-in animation still
   plays on the real page. The landing route's chunk starts loading before first
   render.
4. `d0058ee` **1200 px `medium` photo derivative.** The lightbox and its neighbour
   preloads use `srcset` medium/large, so phones get 1200 px. Zooming in switches
   to the 2000 px file, and "HQ" still loads the original. `DERIVED_VERSION` →
   `4-medium`. Attribution EXIF/XMP was verified with exiftool on a medium
   derivative.
5. `fecbb7c` **Fonts (SF-11).** `latin-400.css` only: 14 woff2 files → 3, FCP
   about 0.15 s faster. I scanned every character in `src/`; all are in the Latin
   range or use a system font either way (arrows, emoji).
6. `45a807e` **`canPrefetch()`.** Background warm-ups are skipped on Save-Data or
   2g/3g, and the Navbar hover preload uses the same guard.
7. `e6ca79b` **`prefers-reduced-motion` (SF-10).** Animations and transitions
   finish instantly, scroll-reveal content just shows, and hover zoom/lift is off.
   Nothing changes for other visitors.
8. `8799ec8` **Logos downscaled to 256 px.** Palo Alto Networks 1122 px, Neuralink
   955 px, CENIC 591 px: 85 KB → 18 KB. Compared side by side at 192 px.
9. `1f912d4` **Preload the Photography hero** at startup, so it downloads in
   parallel with the lazy Photography chunk.
10. `a42324d` **Warm-ups wait for `load` + 3 s, then idle.** Fix for my own commit 3:
    `requestIdleCallback` fired while fonts were still downloading, so 13 chunks
    and 24 thumbs competed with first paint (26 requests vs 10).
11. `4d6527a` **Small pages back in the main bundle.** About/Projects/Experience/
    Contact/NotFound are 5–9 KB each. Lazy-loading them cost about 0.3 s of LCP on
    direct landings (an extra round trip). Lazy pages are now Photography (89 KB,
    with `react-zoom-pan-pinch`), the cipher tools and the homelab diagrams. Main
    chunk: 468 → 344 KB.

## Visual check

Screenshots (1440 and 390 wide) of every page, before and after, live in
`%TEMP%\seanfinch-perf\`: `before\`, `after2\` (final), and side-by-side
`cmp2-<page>-<desk|mob>.png`. Pixel diffs: ≤0.6% on every page; most of that is
the animated cursor glow and the blinking cursor. Photography differed only
where grid thumbnails hadn't finished loading when the shot fired. A re-shoot
matched the baseline at 0.00%. The phone-width lightbox
(`after2\lightbox-mob.png`) renders sharply from the 1200 px derivative.

## Not done, and why

- **Photography hero srcset.** The hero is `object-cover` in a 72vh box, so on
  phones it renders about 900 CSS px wide (×DPR). Anything below 2000 px would
  visibly soften it on modern phones. Left at `large`.
- **Compare slider** still uses `large`: it's quality-sensitive and mostly
  desktop.
- **Grid thumbnails** (500 px) are flagged as "larger than displayed" on
  phones, but they are right for 2–3× screens. Not changed.
- **Critical-CSS inlining** (Lighthouse estimates 300 ms of render-blocking on
  mobile). It needs a build tool (e.g. `beasties`) plus CSP review for the
  inline style. Better done together with the prerender work.
- **Photography TBT** went 0 → 168 ms. That is the lazy chunk executing during
  load on the throttled CPU; LCP and FCP still improved.
- The stale `vite preview` on port 4173 from an earlier session was left
  running (not mine). I used port 4180.

## Options that would change the look (not made)

- A smaller or blurred hero on phones, or a 1500 px hero derivative: saves about
  100 KB on Photography at a slight sharpness cost on 3× phones.
- Dropping the full-screen cursor glow and CRT scanline layers on touch devices
  (they cost paint time and are invisible without a mouse, but they are part of
  the look).

## Reviewing in the morning

```bash
git switch perf/overnight
git log --oneline dev..perf/overnight
npm run dev                        # http://localhost:5173
npm run build && npx vite preview --port 4180  # production build; 4173 is held by an old preview
explorer "%TEMP%\seanfinch-perf"   # before\, after2\, cmp2-*.png side-by-sides
```

When happy: remove the `git push`/`gh`/`netlify` denies from
`.claude/settings.local.json`, push the branch, and open the PR into `dev`.
