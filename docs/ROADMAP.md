# Portfolio Roadmap & Ideas

Notes for future work on seanfinch.com. Nothing here is built yet — it's a
menu to pull from, prioritized for the **new-grad cybersecurity job hunt**
(graduating May 2027).

---

## 1. Blog / Writing (deferred — noted per request)

A blog is worth adding **later**. It shows communication skill and depth, which
matters a lot for security roles. When ready, the lowest-friction setup for this
stack (React 19 + Vite + Tailwind, deployed on Netlify):

**Recommended approach — MDX files in the repo (no CMS, no backend, free):**

Install:
```bash
npm i @mdx-js/rollup @mdx-js/react remark-gfm rehype-slug rehype-autolink-headings
npm i -D reading-time gray-matter
```
- `@mdx-js/rollup` — lets you author posts as `.mdx` (Markdown + React components) and import them like modules. Add it to `plugins` in `vite.config.ts`.
- `remark-gfm` — GitHub-flavored Markdown (tables, task lists, strikethrough).
- `rehype-slug` + `rehype-autolink-headings` — auto-anchored headings.
- `gray-matter` — parse post frontmatter (title, date, tags, summary).
- `reading-time` — "5 min read" estimates.
- Use Vite's `import.meta.glob("./posts/*.mdx")` to build the post index automatically (mirrors how `virtual:photo-manifest` already works here).

**Optional niceties later:**
- `shiki` or `rehype-pretty-code` — syntax-highlighted code blocks (great for security/homelab write-ups).
- An RSS feed (`feed` package) generated at build.

**Alternative if you'd rather not manage files:** a headless CMS with a free
tier (e.g. **Contentlayer**, or a hosted option) — but MDX-in-repo is the
cheapest and fits the "everything free" constraint best.

---

## 2. Project Case Studies (recommended — high ROI)

Yes — this is the single highest-signal addition for a new-grad hunt. A list of
project titles tells a recruiter *what*; a case study shows *how you think*,
which is what actually gets interviews.

Turn 2–3 flagship projects (homelab, a security tool, CyberPatriot) into a
detail page each, structured as:
1. **Problem / context** — what and why, in one paragraph.
2. **Approach** — architecture, decisions, trade-offs (diagrams welcome — you
   already have `HomelabDiagrams`/`DiagramViewer` components to reuse).
3. **What I built** — concrete work, tech used.
4. **Outcome / impact** — metrics where possible ("reduced X by 40%").
5. **What I'd do differently** — shows reflection/maturity.

Implementation is cheap: add a `longDescription`/`caseStudy` field to
`src/data/projects.ts` and a `/projects/:slug` route that renders it. (Once the
blog's MDX pipeline exists, case studies can just be MDX too.)

---

## 3. Other ideas (pick as time allows)

- **Homelab live status panel** — uptime/services snapshot, styled like the
  existing Vista terminal on the home page. Distinctive for a systems/security
  candidate. Can be a static JSON you update, or a small serverless fetch.
- **SEO + social preview** — per-page `<title>`/meta descriptions (partly done
  via `document.title`), Open Graph + Twitter card tags, a generated OG image,
  `sitemap.xml`, and `robots.txt`. Makes the site look sharp when shared and
  findable when a recruiter Googles you.
- **Analytics** — lightweight, privacy-friendly (Cloudflare Web Analytics or
  Plausible free tier) so you can see what recruiters view.
- **Accessibility pass** — alt text, focus states, color contrast in light mode.
- **Resume**: keep `/resume.pdf` current (you mentioned updating it soon). The
  home page already links it; consider a "last updated" note.

---

## 4. Performance follow-ups (photography)

Done: build-time `thumb`/`large` WebP derivatives (grid no longer loads full-res).
Possible next steps if the gallery grows:
- Move full-res originals off-repo (Cloudflare R2 free tier) to stop git bloat.
- Add a third `medium` size + real `srcset`/`sizes` on grid `<img>` for finer
  responsive selection.
- `blurhash`/LQIP placeholders instead of the current pulse skeleton.
