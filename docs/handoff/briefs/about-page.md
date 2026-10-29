# Brief: Tighten and restyle the About page

- **Model:** sonnet 5.5
- **Access:** read-write
- **Branch:** current tree on `main`, do not switch

## Goal

Make `/about` shorter, easier to scan, and visually consistent with the
redesigned `/photography` page, without adding or losing any facts.

## Context

- Read first: `CLAUDE.md`, `src/pages/About.tsx`, `src/pages/Photography.tsx`
  (the design reference), `src/utils/themeUtils.ts`, `src/index.css`,
  `src/hooks/usePageMeta.ts`.
- The Photography page's design language, which this page should adopt: Jost
  extrabold headings with tight tracking; small uppercase `font-monospace`
  kicker labels with wide letter-spacing (`tracking-[0.3em]`/`[0.4em]`); amber
  accent (`amber-400`/`amber-500`) for emphasis; rounded-full chips with an
  `aria-pressed`-style active state; neutral-900/950 surfaces in dark mode with
  light-mode equivalents chosen by `theme === "light"`; generous spacing,
  `max-w-6xl`/`max-w-5xl` containers, `px-4 sm:px-6` gutters.
- Facts on the page (keep every one; do not invent new ones): Orange County;
  B.S. Computer Science + Music Minor at Northeastern, graduating May 2027;
  returning to Palo Alto Networks full-time July 2027; 2026 PANW internship built
  Application Control Posture Check (internal DAST tool, 3 hours → 5-minute scan,
  16 GRC controls, RBAC, risk dashboard for CISO/Board); Neuralink first security
  function (Defender XDR + Sentinel, 500+ endpoints, baselines, buy-in for a
  security team); Audax Group endpoint security + vuln management; CENIC DDoS
  defense for CalREN (20M+ students/educators); homelab (TrueNAS SCALE, Proxmox,
  Kubernetes, 15+ services, 10+ users, Wazuh, OpenVAS); APO President (130+
  members, Alpha Theta Eta chapter); NU Choral Society past President (80+
  members, three ensembles, Choir Cup, events ~2 → 20+ per semester); vocalist,
  street photographer, outdoors; the skills, OS and interests lists.

## Steps

1. Move the page's content (bio paragraphs, skill groups, OS list, interests,
   leadership entries with their roles/periods/links) into a new
   `src/data/about.ts`, typed with interfaces. CLAUDE.md asks for page content to
   live in `src/data/`. `About.tsx` renders from it.
2. Tighten the bio from six paragraphs to three or four short ones: who/where +
   the PANW return; work highlights (PANW internship, Neuralink, Audax, CENIC);
   homelab; leadership/music in one line (details are in the Leadership
   section below, so don't repeat numbers twice). Cut filler and self-praise
   phrasing ("I learn fast because..." can be one sentence or folded in).
   Plain, direct voice. No em-dash chains.
3. Restyle to the Photography design language:
   - Hero: kicker label ("About"), large Jost heading, one-line summary, the two
     status chips and the Resume button. Portrait beside the bio on desktop,
     stacked on mobile, with real `alt` text ("Portrait of Sean Finch").
   - Body copy in the reading font (`font-raleway`), never monospace. Keep
     monospace only for labels and chips. Check that Raleway is actually
     imported (`@fontsource/raleway` in `src/main.tsx` or `src/index.css`). An
     earlier headless screenshot rendered the bio in a monospace face.
   - Skills: keep the three groups as compact chip rows under kicker labels.
     Merge the "sys env" OS strip into a fourth group ("Operating systems")
     so it's no longer a separate floating strip. Interests become one chip row.
   - Leadership: keep the timeline, but use the amber accent instead of the
     blue/purple gradients, and replace the letter-in-a-circle markers with
     simple dots. External links keep `target="_blank" rel="noopener noreferrer"`.
4. Accessibility: one `h1`; `h2` per section in order; decorative elements
   `aria-hidden="true"`; visible `focus-visible` rings on links/buttons; light and
   dark mode both readable.
5. Keep `usePageMeta` with an accurate description.

## Constraints

- Do not commit, push, switch branches, or run `git reset`/`checkout`/`stash`.
- Only touch `src/pages/About.tsx`, new `src/data/about.ts`, and (only if
  Raleway is genuinely not loaded) the font import. Nothing else.
- Do not add npm packages. `lucide-react`/`sonner` are local stubs; use
  `react-icons` like the rest of the site.
- Match the repo style: 2-space indent, double quotes, `React.FC`, explicit
  return types (lint enforces `explicit-function-return-type`).

## Done when

- [ ] `npm run lint` passes (zero warnings)
- [ ] `npm run build` passes
- [ ] `git diff --check` is clean
- [ ] Every fact in the Context list is still on the page
- [ ] Bio is 4 paragraphs or fewer and contains no number that the Leadership
      section repeats

## Report back

Files changed; the new bio text in full (so Sean can review the wording); the
result of each check (paste failures); anything you cut or merged and why; any
content you think is outdated but left in place (e.g. Win XP / Win 7 in the OS
list) as a suggestion, not a change.
