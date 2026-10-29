# Contributing

This is a solo repo, so this page is a checklist for future me (and any coding agent
working here). It mirrors the workflow in KashmirLivingArchive, trimmed for one person
and a Netlify-hosted static site.

## Never squash. Never rebase-merge.

**Under no circumstances squash commits**, whether merging a pull request, promoting
`dev` → `stage` → `prod`, or rewriting a branch.

- Merge every pull request with **"Create a merge commit"**. Do not pick "Squash and merge"
  or "Rebase and merge" in the GitHub merge dropdown.
- From the command line: `gh pr merge <number> --merge`. Never `--squash` or `--rebase`.
- Do not squash locally (`git rebase -i` with `squash`/`fixup`, `git merge --squash`, or
  `git reset --soft` to collapse commits) on any branch that has been pushed.

Every commit is kept, so history shows what changed and when, and promotion PRs between
`dev`, `stage` and `prod` stay clean.

## Branches

| Branch  | Purpose                         | How changes get in                         | Netlify                                  |
| ------- | ------------------------------- | ------------------------------------------ | ---------------------------------------- |
| `dev`   | Integration. Base for all work  | PR from a `<type>/<slug>` branch, green CI | Branch deploy, noindex                   |
| `stage` | Pre-release check               | PR from `dev` only, green CI               | Branch deploy, noindex                   |
| `prod`  | What seanfinch.com serves       | PR from `stage` only, green CI             | Production deploy, tagged `YYYY.MM.N`    |

Every PR also gets a Deploy Preview (noindex). Force-pushing and deleting `dev`, `stage`
and `prod` are blocked once the rulesets are on.

Until the cutover described in `docs/plans/branch-workflow.md` is done, `main` is still
the production branch and CI also runs on it. After the cutover `main` no longer exists.

## Making a change

1. `git switch dev && git pull`
2. `git switch -c <type>/<short-slug>`, where `<type>` is `feat`, `fix`, `docs`, `chore`
   or `refactor` (for example `feat/photography-redesign`).
3. Make the change. Run `npm run check` before pushing (the pre-push hook runs it too).
4. `git push -u origin HEAD`, open a PR into `dev` and fill in the template.
5. Check the Deploy Preview at phone width.
6. `gh pr merge <number> --auto --merge` so it merges itself once CI is green. Promotions
   to `stage` and `prod` are merged by hand.

There is no required reviewer: a solo author can't approve their own PR, so the required
status checks are the gate.

## Commands

```bash
npm run check             # lint + build (tsc + vite) + tests; what CI and pre-push run
npm test                  # node:test unit tests in scripts/
npm run security:headers  # fails if netlify.toml loses a security header on /*
```

## Commit messages and PR descriptions: short and bulleted

A `commit-msg` hook (lefthook) and a CI check enforce this.

- **Commit subject:** one line, at most 72 characters, no trailing period.
- **Commit body (optional):** a blank line, then up to 8 `- ` bullets, each under 100
  characters. No paragraphs. GitHub references (`Fixes #12`) and trailers for human
  co-authors are allowed.
- **Attribution: everything is Sean's.** No AI co-author trailers, no "generated with"
  footers, no tool links or robot emoji, in commits, PR titles or PR descriptions. The
  content policy blocks them in the hooks and in CI, and `.claude/settings.json` turns
  Claude Code's own attribution off. Plain mentions (`CLAUDE.md`, AI crawlers in
  `robots.txt`) are fine.
- **PR description:** fill in the template with bullets only. At most 25 lines and 1500
  characters. Headings, bullets, checklists, numbered steps, tables and lone images or links
  are allowed. Paragraphs are not.

```text
Add photo lightbox keyboard nav

- Arrow keys move between photos
- Escape closes the lightbox
Fixes #12
```

## Releases

- **Numbering:** only `prod` is numbered, as `YYYY.MM.N` (`N` counts releases within the
  month, New York time): `2026.11.1`, `2026.11.2`, then `2026.12.1`. `dev` and `stage` are
  not numbered; refer to their builds by commit SHA.
- **Automatic:** merging a PR into `prod` tags the commit and publishes a GitHub Release with
  notes listing the PRs since the last release (`.github/workflows/release.yml`).
- **Promoting:** open a `dev` → `stage` PR, check the `stage--` deploy, then open a
  `stage` → `prod` PR. Merge both by hand with a merge commit.
- **Labels:** every PR gets a type label automatically (`feat`, `fix`, `docs`, `chore`,
  `dependencies`, `release`, plus `security`), and release notes are grouped by them. A label
  set by hand is kept.

## CI and security gates

CI (`.github/workflows/ci.yml`) runs on every PR and on pushes to `dev`, `stage` and `prod`:

| Job             | What it does                                                        | Blocks?                  |
| --------------- | ------------------------------------------------------------------- | ------------------------ |
| `check`         | `npm ci`, `npm run check`, `npm run security:headers`, `git diff --check` | Always             |
| `branch-flow`   | Only `dev` → `stage` and `stage` → `prod`                            | Always                   |
| `secrets`       | gitleaks over the full history                                      | Always                   |
| `security-code` | Semgrep over `src`, `scripts`, `vite.config.ts`                     | `stage`/`prod`, not `dev` |
| `security-deps` | OSV-Scanner over `package-lock.json`                                | `stage`/`prod`, not `dev` |
| `description`   | PR body is short and bulleted (separate workflow)                   | Always                   |

On `dev` the two security scans only warn, so findings don't block day-to-day work. They
must pass before a promotion to `stage` or `prod`. Accepted, unreachable vulnerabilities
go in `osv-scanner.toml` with a reason and an expiry date.

Every third-party action is pinned to a full commit SHA with a version comment, and
container images are pinned by digest. Dependabot (weekly, into `dev`) keeps the actions
current; bump container image pins by hand.

## Content policy: nothing personal or confidential

This is a public site about Sean, not a place for his private details or anyone
else's. `scripts/check-content.mjs` blocks, in every commit, push, commit message
and PR title/description:

- street addresses, phone numbers, SSNs, and email addresses other than
  `@seanfinch.com` / `noreply` ones
- confidentiality and MNPI markers ("confidential", "internal only", "NDA",
  "material non-public", ...). Never publish employer-internal or non-public
  information, even paraphrased.
- private terms (a street name, a phone number) that Sean adds with
  `node scripts/check-content.mjs block "<term>"`. They are stored only as
  truncated hashes in `.github/content-blocklist.txt`, so the list leaks nothing.
- GPS coordinates embedded in photos

It runs in the pre-commit, commit-msg and pre-push hooks, in the `content` CI job,
on PR text, and (for coding agents) as a Claude Code hook that refuses publishing
commands with flagged text or `--no-verify`. Flagged text is never echoed, so CI
logs don't leak it. If a file is genuinely fine, approve its exact content with
`node scripts/check-content.mjs allow <file>`; any later edit needs re-approval.
`node scripts/check-content.mjs tree` audits the whole working tree.

Pattern checks can't read inside PDFs or see what a photo shows. Review those by
hand: `public/resume.pdf`, and photos that could identify a home or a stranger.

## Git hooks

`npm install` installs lefthook hooks (the `prepare` script):

- **pre-commit:** eslint on staged files, and gitleaks on staged changes if it is installed.
- **commit-msg:** the format rules above.
- **pre-push:** `npm run check`.

CI runs the same checks, so `--no-verify` only delays the failure.

## Netlify

Production builds are untouched. Deploy Previews and branch deploys run
`scripts/netlify-noindex.mjs` after the build, which adds `X-Robots-Tag: noindex, nofollow`
and a `Disallow: /` robots.txt so `dev--`/`stage--`/preview URLs stay out of search. The
script exits 1 on the production context.
