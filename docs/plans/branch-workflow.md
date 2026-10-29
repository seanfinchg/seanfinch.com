# Plan: dev → stage → prod branches and PR workflow

Status: **draft for review**. Nothing here has been done yet. After review, each phase is
turned into explicit step lists for Sonnet 5.5 subagents.

Modelled on `KashmirLivingArchive` (KLA): same branch names, merge-commit-only rule, CI
gate layout, PR template and length check, auto-labels, `YYYY.MM.N` releases on merge to
`prod`, Dependabot into `dev`, lefthook git hooks, and repo-local agent skills. Adapted where
a solo, Netlify-hosted static site differs from a team Docker app.

## Target model

| Branch   | Purpose                        | Gets changes from                      | Netlify                                                      |
| -------- | ------------------------------ | -------------------------------------- | ------------------------------------------------------------ |
| `dev`    | Integration, base for all work | PR from a work branch, green CI        | Branch deploy `dev--<site>.netlify.app` (noindex)            |
| `stage`  | Pre-release check              | PR from `dev` only, green CI           | Branch deploy `stage--<site>.netlify.app` (noindex)          |
| `prod`   | What seanfinch.com serves      | PR from `stage` only, green CI         | **Production branch** → seanfinch.com, tagged `YYYY.MM.N`   |
| PRs      | —                              | —                                      | Deploy Previews per PR (noindex)                             |

- `main` is retired by **renaming it to `prod`**. GitHub keeps a redirect, so history stays
  the same and existing links still work. `dev` and `stage` are created from the new `prod`.
- Work branches: `<type>/<short-slug>` (e.g. `feat/photography-redesign`), optionally
  `<type>/<issue#>-<slug>` when a GitHub issue exists. *(KLA uses Linear `kas-<n>` names;
  see open question 1.)*
- Merge commits only. Never squash or rebase-merge, and never force-push `dev`/`stage`/`prod`.
- Feature PRs into `dev` use auto-merge (`gh pr merge <n> --auto --merge`). Promotion PRs
  (`dev` → `stage` → `prod`) are merged by hand.

## Phase 0: land the work currently in the tree (prerequisite)

The worktree holds uncommitted work: the PANW/degree copy update, Home prompt removal,
photography hide plus the Instagram CTA, and the in-progress photography redesign.

- Wait for the photography agent to finish and for `build`/`lint`/`git diff --check` to pass.
- Commit to `main` in two focused commits, the content update and then the photography
  redesign, so production and `prod` start from a clean, green tree.
- **Lint must pass on that commit**, since CI will gate on it from day one. CLAUDE.md
  lists older `react-hooks` errors in `HomelabDiagrams.tsx`/`DiagramViewer.tsx`. Confirm
  they're gone, or fix them in this phase.
- Push only with your explicit go-ahead.

## Phase 1 status: DONE (files only, uncommitted)

All Phase 1 files exist in the working tree: workflows (`ci`, `pr-description`, `label-pr`, `release`),
`.github/{release,dependabot}.yml` and the PR template, `scripts/check-{pr-body,commit-msg,headers}.mjs`,
`release-version.mjs` (+ test), `netlify-noindex.mjs`, `lefthook.yml`, `osv-scanner.toml`, `CONTRIBUTING.md`,
the `netlify.toml` deploy contexts, and the `check`/`test`/`security:headers`/`prepare` npm scripts.
Differences from the list below: `check` is `lint && build && test` (the whitespace check runs in CI),
CI also runs on `main` until cutover, Semgrep is included, and item 11 (agent skills) is not done.

Still pending: commit the files (after Phase 0), Phases 2-3 (GitHub settings, Netlify production
branch, rename `main` to `prod`, create `dev`/`stage`), the 44 OSV findings in `package-lock.json`
(they will block promotion to `stage`/`prod`), the lint errors in CLAUDE.md's rough edges, the agent
skills in item 11, and removing `main` from the workflow triggers after cutover.

## Phase 1: repository files (one PR into `dev`, after Phase 3 creates it)

To bootstrap, these files can land on `main` before the rename instead (see sequencing).

1. **`.github/workflows/ci.yml`**: on PR and push to `dev`/`stage`/`prod`, read-only
   token, actions pinned to full SHAs (as in KLA), `concurrency` cancel-in-progress. Jobs:
   - `check`: `npm ci` then `npm run check` (new script, see item 6).
   - `branch-flow`: only `dev` → `stage` and `stage` → `prod` (copied from KLA verbatim).
   - `secrets`: gitleaks over full history.
   - `security-deps`: `npm audit --audit-level=high` (KLA uses OSV-Scanner; either works).
     Warn-only on `dev` and blocking on `stage`/`prod`, using KLA's `SECURITY_WARN_ONLY`
     pattern. Today's 6 known vulnerabilities would block the first promotion, so fix
     them or accept them before then.
   - `protected-files`: dropped for a solo repo (it only restricts who may edit
     `.github/`). Optional.
   - `content`: see open question 3.
2. **`.github/workflows/pr-description.yml`** + `scripts/check-pr-body.mjs`: the PR body must be
   bullets only, at most 25 lines and 1500 characters (ported from KLA's `.ts` to `.mjs`,
   because this repo runs plain Node scripts).
3. **`.github/workflows/label-pr.yml`** + **`.github/release.yml`**: copied from KLA,
   with path regexes adapted (`package-lock.json` instead of pnpm files; `security` label
   on `netlify.toml`, `public/robots.txt`, `public/_redirects`, and the CSP).
4. **`.github/workflows/release.yml`** + `scripts/release-version.mjs`: on push to `prod`,
   tag `YYYY.MM.N` and run `gh release create --generate-notes`. Port KLA's script and test.
5. **`.github/pull_request_template.md`**: sections "What changed", "How I tested it"
   (`npm run check`, plus a check on the Deploy Preview at phone width), and
   "Breaking changes". There is no Linear section; it becomes an optional "Issue" line.
6. **`package.json` scripts**: `"check": "npm run lint && npm run build && git diff --check"`.
   Optionally add `prettier --check` if the codebase is formatted first, which would be a
   separate formatting-only PR.
7. **Git hooks via lefthook** (`lefthook` as a devDependency, installed by `npm install`'s
   `prepare`). KLA's set, minus mise:
   - pre-commit: eslint on staged files, gitleaks on staged files.
   - commit-msg: `scripts/check-commit-msg.mjs`. Subject at most 72 characters with no
     trailing period; body is only `- ` bullets (up to 8); trailers allowed.
   - pre-push: `npm run check`.
8. **`.github/dependabot.yml`**: npm + github-actions, weekly, `target-branch: dev`,
   3-day cooldown, ignore `@types/node` majors (Node 24 pin), and groups for
   `react`/`react-dom`/`@types/react*`, the vite family, dev-tools minor/patch, and
   production minor/patch.
9. **Netlify noindex for non-production deploys**: `[context.production]` keeps today's
   build. For other contexts, a small build step (`scripts/netlify-noindex.mjs`, run when
   `CONTEXT != production`) writes `X-Robots-Tag: noindex` into `dist/_headers` and a
   `Disallow: /` robots.txt. This keeps `dev--`/`stage--`/preview URLs out of Google.
   Verify on the first branch deploy with `curl -I`.
10. **Docs**: `CONTRIBUTING.md` (KLA's structure: never-squash rule, branch table, making
    a change, releases) and a "Branches & PRs" section in `CLAUDE.md` pointing to it.
    Update CLAUDE.md's stale line "auto-deploys from `main`".
11. **Agent skills** in `.claude/skills/` (ported from KLA's `kas-*`, renamed `sf-*`):
    - `sf-start <slug>`: clean tree check, `git switch dev && git pull`, create the branch.
    - `sf-gate`: `npm run check`, plus `npm audit` reported.
    - `sf-pr`: gate, push, fill the template, check the body, `gh pr create --base dev`, then
      `gh pr merge --auto --merge`. Only when asked.
    - `sf-release stage|prod`: the promotion PR listing merged PRs. Prod title is
      `Release <version>`. No auto-merge.
    - `.claude/settings.json`: allow read-only git/gh and `npm run check|lint|build`.

## Phase 2: GitHub settings (via `gh api`, needs your go-ahead; outward-facing)

- Repo: `allow_squash_merge=false`, `allow_rebase_merge=false`, `allow_merge_commit=true`,
  `allow_auto_merge=true`. Leave `delete_branch_on_merge` off, as KLA does; protected
  branches can't be deleted either way.
- One **ruleset** covering `dev`, `stage`, `prod`: require a PR, require status checks
  (`check`, `branch-flow`, `secrets`, `description`), block force-push and deletion, and
  allow merge-commit only. **0 required approvals**, because a solo author can't approve
  their own PR (KLA requires 1). Optionally let your admin role bypass rules for
  emergencies.
- Set the default branch to `dev`, so new PRs and Dependabot target it.

## Phase 3: branch cutover (ordered; small window where deploys pause)

1. Land the Phase 1 files on `main` directly (bootstrap commit), CI green.
2. **Netlify UI**: Site config → Build & deploy → Branches: set the production branch to
   `prod`, branch deploys to "Let me add individual branches" (`dev`, `stage`), and
   Deploy Previews on. *Manual step for you; the Netlify CLI isn't set up here.*
3. `gh api -X POST repos/seanfinchg/seanfinch.com/branches/main/rename -f new_name=prod`.
4. Create `stage` and `dev` from `prod`; push both.
5. Apply the Phase 2 settings and ruleset, then set the default branch to `dev`.
6. Verify: seanfinch.com still serves (production redeploys from `prod`), the
   `dev--`/`stage--` deploys exist and send `noindex`, and a throwaway docs PR into `dev`
   runs every check and auto-merges.
7. Locally: `git fetch -p && git branch -m main prod && git branch -u origin/prod prod`.

Rollback: rename `prod` → `main` and reset the Netlify production branch. Nothing is
deleted at any step.

## Open questions for you

1. **Issue tracking.** Plain `<type>/<slug>` branches, or GitHub Issues with `<type>/<n>-slug`
   so PRs close issues? (Linear like KLA is possible, but its connector isn't authorized in
   this session.)
2. **Stage URL.** Is `stage--<site>.netlify.app` fine, or do you want `stage.seanfinch.com`?
   A custom subdomain needs a DNS record.
3. **Content policy / attribution.** KLA bans AI attribution lines. This repo currently
   gets `Co-Authored-By: Claude` trailers. Keep them, or port KLA's rule and turn
   attribution off in `.claude/settings.json`?
4. **Self-review.** Accept 0 required approvals, or require 1 and merge with admin bypass?
5. **Formatting gate.** Add `prettier --check` to `check` (needs a one-time
   format-everything PR first) or leave it out?
6. **Release cadence.** Does every `stage` → `prod` promotion produce a release, as in KLA,
   or should small content edits skip stage? Skipping would need a documented hotfix path,
   which KLA doesn't allow.

## How this becomes subagent work

After you sign off: one step list per phase, each self-contained (files to create with
exact contents or KLA sources to port, commands to run, acceptance checks, hard
"do not push/merge" limits). Phases 0–1 are file-only and safe to delegate. Phases 2–3
change GitHub and Netlify state, so I'll run them myself with your explicit go-ahead,
not a subagent.
