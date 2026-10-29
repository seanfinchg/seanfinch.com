# Brief: CI, security checks and dev → stage → prod repo files (Phase 1)

- **Model:** sonnet 5.5
- **Access:** read-write
- **Branch:** current tree on `main`, do not switch

## Goal

Add every *file* needed for the dev → stage → prod workflow, CI jobs and
security checks, modelled on `C:\Users\seanf\Documents\src\KashmirLivingArchive`
(KLA). This is Phase 1 of `docs/plans/branch-workflow.md`. Nothing on GitHub or
Netlify changes in this task. Branch creation, rulesets and the Netlify
production-branch switch (Phases 2–3) happen later, by hand, with Sean's go-ahead.

## Context

- Read first: `CLAUDE.md`, `docs/plans/branch-workflow.md`, `package.json`,
  `netlify.toml`, `.nvmrc` (Node 24), `.gitignore`.
- KLA sources to port (read them, then adapt; don't copy blindly):
  - `.github/workflows/ci.yml`, `pr-description.yml`, `label-pr.yml`, `release.yml`
  - `.github/release.yml`, `.github/dependabot.yml`, `.github/pull_request_template.md`
  - `scripts/check-pr-body.ts`, `scripts/check-commit-msg.ts`, `scripts/release-version.ts`
  - `lefthook.yml`, `osv-scanner.toml`, `CONTRIBUTING.md`
- Differences that matter here: npm (not pnpm), Node via `.nvmrc` (not mise),
  no Docker image, no database/migrations, no Linear, one person (so no reviewer
  rotation and no "tech lead only" protected-files job), hosting on Netlify.
- Decisions already taken for this task (open questions in the plan; reversible):
  no content-policy job and no attribution rule (commit trailers such as
  `Co-Authored-By:` are allowed); no Prettier gate; branch names `<type>/<slug>`.

## Steps

1. **Scripts** (plain Node ESM `.mjs`, matching `scripts/*.mjs` in this repo):
   - `scripts/check-pr-body.mjs`: port of KLA's (bullets only, ≤25 lines,
     ≤1500 chars, ≤120 chars/line, reads `PR_BODY`).
   - `scripts/check-commit-msg.mjs`: port of KLA's (subject ≤72 chars with no
     trailing period, body of `- ` bullets ≤8, trailers allowed; skip
     Merge/Revert). Drop the Linear `KAS-` magic-word pattern; allow `#123`
     GitHub refs (`Fixes #12`).
   - `scripts/release-version.mjs`: port (YYYY.MM.N from git tags, time zone
     `America/New_York`), exporting `monthPrefix`/`nextVersion`, runnable directly.
   - `scripts/release-version.test.mjs` using the built-in `node:test` runner
     (no new dependency). Cover: first release of a month, increment, month
     rollover, ignoring non-release tags.
   - `scripts/check-headers.mjs`: fail unless `netlify.toml` still sets, on
     `/*`: `Content-Security-Policy` (containing `default-src 'self'`,
     `object-src 'none'`, `frame-ancestors`), `Strict-Transport-Security`,
     `X-Content-Type-Options = "nosniff"`, `X-Frame-Options`, `Referrer-Policy`,
     `Permissions-Policy`. This is a site-specific security regression check.
   - `scripts/netlify-noindex.mjs`: run after the build on non-production
     Netlify deploys. Append a `/*` + `X-Robots-Tag: noindex, nofollow` rule to
     `dist/_headers` (create it if missing) and replace `dist/robots.txt` with
     `User-agent: *\nDisallow: /`. Refuse to run (exit 1) if `CONTEXT` is
     `production`.
2. **package.json** scripts: `"check": "npm run lint && npm run build && npm test"`,
   `"test": "node --test scripts/"`, `"security:headers": "node scripts/check-headers.mjs"`,
   `"prepare": "lefthook install"`. Add `lefthook` as a devDependency (`npm i -D lefthook`),
   which updates `package-lock.json`. Keep existing scripts.
3. **Git hooks**, `lefthook.yml`: pre-commit runs eslint on staged ts/tsx/js/mjs
   files, plus gitleaks on staged changes *if gitleaks is installed* (skip with
   a message otherwise; don't fail). commit-msg runs `scripts/check-commit-msg.mjs`.
   pre-push runs `npm run check`.
4. **`.github/workflows/ci.yml`**, triggered on `pull_request` and `push` to
   `dev`, `stage`, `prod` **and `main`** (comment: remove `main` after the
   cutover). `permissions: contents: read`, concurrency cancel-in-progress,
   `SECURITY_WARN_ONLY` env exactly like KLA (warn on dev, block on stage/prod;
   on `main` treat as blocking). Jobs:
   - `check`: checkout, `actions/setup-node` with `node-version-file: .nvmrc` and
     npm cache, `npm ci`, `npm run check`, `npm run security:headers`, then on
     PRs `git diff --check origin/<base>...HEAD` (fetch-depth 0).
   - `branch-flow`: KLA's job verbatim (only dev → stage, only stage → prod).
   - `secrets`: gitleaks over full history (fetch-depth 0), always blocking.
   - `security-code`: Semgrep in Docker like KLA, configs `p/typescript p/react
     p/javascript p/owasp-top-ten p/secrets`, scanning `src scripts vite.config.ts`,
     warn-only on dev.
   - `security-deps`: OSV-Scanner on `package-lock.json`, warn-only on dev. Add
     an `osv-scanner.toml` with KLA's header comment and no entries.
   Pin every third-party action to a full commit SHA with a `# vX.Y.Z` comment,
   as KLA does. Reuse KLA's pins for actions it already uses (`actions/checkout`).
   Resolve new ones (`actions/setup-node`, a gitleaks/OSV install method) with
   `gh api repos/<owner>/<repo>/git/ref/tags/<tag>` (dereference annotated tags).
   Pin container images by digest where you can resolve one; otherwise pin an
   exact version tag and say so in a comment.
5. **`pr-description.yml`**: KLA's, minus the content-policy step, running
   `scripts/check-pr-body.mjs`; skip for `dependabot[bot]`.
6. **`label-pr.yml` + `.github/release.yml`**: port. Paths: `package.json` /
   `package-lock.json` for `dependencies`; `security` label when the title
   matches KLA's regex or files touch `netlify.toml`, `public/_redirects`,
   `public/robots.txt`, `scripts/check-headers.mjs`, `osv-scanner.toml`.
7. **`release.yml`**: on push to `prod`, tag `YYYY.MM.N` via
   `scripts/release-version.mjs` and `gh release create --generate-notes` (KLA logic).
8. **`.github/dependabot.yml`**: npm + github-actions, weekly Monday,
   `target-branch: dev`, 3-day cooldown, ignore `@types/node` majors, groups:
   `react` (react, react-dom, @types/react*), `vite` (vite, @vitejs/*,
   @tailwindcss/vite, tailwindcss), dev-tools minor/patch, production minor/patch.
   Note: until `dev` exists, Dependabot will error on `target-branch`; add a
   top-of-file comment saying so.
9. **`.github/pull_request_template.md`**: sections "What changed", "How I
   tested it" (`- [ ] npm run check passes`, `- [ ] Checked the Deploy Preview
   at phone width`), "Breaking changes" (`- None`), optional "Issue" line.
10. **`netlify.toml`**: keep `[build]` as is. Add `[context.deploy-preview]` and
    `[context.branch-deploy]` with `command = "npm run build && node scripts/netlify-noindex.mjs"`.
    Do not change headers, redirects or caching.
11. **Docs**: `CONTRIBUTING.md` in KLA's structure (never squash; branch table;
    making a change; releases; how CI and security gates behave), adapted to a
    solo repo. In `CLAUDE.md`, fix "auto-deploys from `main`" to describe the
    target model and add a short "Branches & PRs" section pointing to
    `CONTRIBUTING.md`. In `docs/plans/branch-workflow.md`, mark Phase 1 as done
    (files only) and list what's still pending.

## Constraints

- Do not commit, push, create branches, open PRs, or call any GitHub API that
  writes. Read-only `gh api` calls to resolve action SHAs are fine.
- Do not run `git reset`/`checkout`/`stash`. The tree has a lot of uncommitted
  work from other tasks. Don't touch `src/`, `public/photography/`,
  `src/data/`, `vite.config.ts`, `docs/handoff/`, or `.harness/`.
- Don't add attribution/AI-naming rules or a content policy.
- Match repo style: 2-space indent, double quotes.

## Done when

- [ ] `npm run check` passes locally (lint, build, `node --test` tests)
- [ ] `npm run security:headers` passes; temporarily breaking the CSP line makes it fail (then restore)
- [ ] `git diff --check` is clean
- [ ] Every workflow and `dependabot.yml` parses as YAML
      (`C:\Users\seanf\Documents\src\harness\.venv\Scripts\python.exe -c "import yaml,sys; [yaml.safe_load(open(f)) for f in sys.argv[1:]]" <files>`),
      and `actionlint` passes if you can run it
- [ ] `check-pr-body.mjs` accepts the filled template and rejects a paragraph;
      `check-commit-msg.mjs` accepts `Add CI\n\n- a\n\nCo-Authored-By: X <x@y>` and rejects a subject ending in `.`
- [ ] `CONTEXT=deploy-preview node scripts/netlify-noindex.mjs` after a build adds
      the header and robots rule to `dist/`; `CONTEXT=production` exits 1
- [ ] `npx lefthook install` works

## Report back

Files added/changed; each check's result (paste failures); every action pin
(name, SHA, version) and container image pin; anything you couldn't verify
locally that only GitHub can (e.g. Semgrep/OSV job behaviour); and an exact,
ordered checklist of the Phase 2–3 GitHub/Netlify steps still left for Sean.
