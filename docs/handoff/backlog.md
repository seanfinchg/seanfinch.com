# Backlog

Known work that hasn't started. IDs are stable: reference them in briefs, PR
titles and commits (`SF-3`). When an item ships, delete it here; git history and
the PR keep the record. In-flight work belongs in `CURRENT.md`, not here.

Priority: **P1** visible to recruiters now · **P2** quality/consistency · **P3** nice to have.

## Site fixes (from the Oct 2026 site review)

- **SF-1 (P1) Home hero contradicts itself.** The faint status chip reads "Most
  recently at Palo Alto Networks · Security Engineer Intern" directly above
  "Incoming Security Engineer at Palo Alto Networks · July 2027". The chip is
  also barely legible. `src/pages/Home.tsx:68`, logic in `src/utils/experienceUtils.ts`.
  Also trim the large empty area above the name.
- **SF-2 (P1) Footer link isn't a link.** "❯ seanfinch.com" is a `<span onClick>`
  that opens the current site in a new tab; not keyboard reachable.
  `src/components/Footer.tsx`. Make it a real link to `/` or remove it.
- **SF-3 (P1) "Coming Soon" placeholders.** Homelab "Network Topology (Coming
  Soon)" (`src/pages/HomelabDiagrams.tsx:102`) and Cipher Tools cards
  (`src/pages/CipherTools.tsx:96,121`). Hide until built.
- **SF-4 (P1) Security projects can't be verified.** Port Scanner and Attack
  Surface Mapper (`src/data/projects.ts`) have no repo/demo link, and they're the
  most security-relevant work. **Needs Sean:** repo URLs, or confirm private.
  Storefront and Personal Website use paragraph blobs where every other project uses bullets.

## Design consistency (apply the Photography page's design system)

- **SF-5 (P2) One visual system across pages.** Each page uses its own heading
  font and accent: monospace blue (Experience), green Jost (Projects), white
  monospace (Contact, About). Pick one set of tokens from Photography (Jost
  headings, amber accent, `font-monospace` kicker labels) and apply everywhere.
  **Agree on a Home mockup with Sean before touching every page.**
- **SF-6 (P2) Home undersells the work.** Three role cards duplicate Experience;
  one featured project; no photography or security tools. Consider a featured
  photo strip and featuring the security projects.
- **SF-8 (P2) Contact is two small cards in an empty screen.**

## Performance and accessibility

All of these are planned together in `docs/handoff/briefs/performance.md`.

- **SF-23 (P1) Three images are served far above display size.** `public/pfp.webp`
  1.1 MB at 4160×4160 for a small Home avatar; `public/SeanPortrait.jpg` 558 KB at
  4160×6240 shown ~320 px wide on About; `src/assets/audax-group.jpeg` 554 KB for a
  200×200 logo. Add right-sized `srcset` variants under new filenames.
- **SF-9 (P2) Route-level code splitting.** Single ~457 KB JS chunk; lazy-load
  Photography, cipher tools, diagram pages (`React.lazy` in `src/App.tsx`).
- **SF-10 (P2) `prefers-reduced-motion`.** Not respected by `.scroll-reveal`,
  `animate-pulse-dot`, or hover transforms (`src/index.css`).
- **SF-11 (P3) Trim `@fontsource` to latin subsets.**

## Photo pipeline

- **SF-13 (P2) Retire or fence `copy-exif.mjs`.** New photos now go through
  `scripts/add-photos.mjs <jpg...>` (new files only, refuses to overwrite).
  `scripts/copy-exif.mjs` still re-encodes already-published `.webp` files under
  the same filename, against the immutable-cache rule. Delete it, or make it
  refuse unless given an explicit `--reencode` flag. The camera source of truth is
  `C:\Users\seanf\Pictures\Saved Pictures\D610\{JPEG,Raw}\<card folder>`, with
  Lightroom edits saved beside originals as `NAME_edited.JPG`; the
  `Downloads\Portfolio Pics` folder the scripts hardcode is a copy.
- **SF-20 (P3) Five unpublished edit pairs exist.** `D610\JPEG\128ND610` has
  `DSC_8838`, `DSC_8842`, `DSC_8864`, `DSC_8866` and `DSC_8895` with `_edited`
  versions, none on the site. Add with `add-photos.mjs` if Sean wants them.
  The Fujifilm shots (`DSCF*`) aren't under `D610`, and no unedited original of
  `DSCF0999-EDIT` was found.
- **SF-14 (P2) `extract-exif.mjs` rebuilds `photo-exif.json` from scratch** from the
  Downloads folder, so any photo whose JPG is no longer there loses its EXIF.
  Make it merge into the existing file.
- **SF-15 (P3) Gear list is incomplete.** Four photos are from a Fujifilm X-T4; the
  hero/footer `CAMERA`/`LENSES` consts in `src/pages/Photography.tsx` list only the D610.

## Privacy (needs Sean)

- **SF-21 (P1) `public/resume.pdf` publishes a personal phone number and Gmail.** Re-export
  with `contact@seanfinch.com` and no phone. The old file stays in git history unless
  history is rewritten.
- **SF-22 (P1) Hidden photo `DSC_9001.webp` is still public** at its URL. If it shows
  Sean's home, delete the file rather than hiding it.

## Tooling and process

- **SF-16 (P1) Finish the dev → stage → prod cutover.** Done: branches, CI and
  security gates, rulesets, merge-commit only, auto-merge, auto-delete, Netlify
  production branch `prod` with `dev`/`stage` branch deploys (both live and `noindex`),
  `main` dropped from workflow triggers. Left: rename `main` → `prod`
  (`docs/handoff/ops/rename-main-to-prod.ps1`), Netlify branch subdomains, first
  `stage` → `prod` release (`Release 2026.10.1`), delete 4 merged remote branches.
- **SF-19 (P3) Machine-specific Claude settings are committed.** `.claude/settings.json`
  and `.claude/settings.local.json` are tracked despite the ignore rule. They hold
  permission allowlists with old `Documents\websites\` paths, no secrets.
  `git rm --cached` both; keep a clean shared `settings.json` if wanted.
- **SF-18 (P3) Case studies, analytics, Vitest smoke test, blog.** See the P2 list
  in `CLAUDE.md` and `docs/ROADMAP.md`.
