# Brief: <short title>

<!-- Copy to docs/handoff/briefs/<slug>.md. The subagent sees only this file and
the repo, so everything it needs must be written here. Delete these comments. -->

- **Model:** <e.g. sonnet 5.5>
- **Access:** read-write | read-only
- **Branch:** <work branch, or "current tree, do not switch">

## Goal

<One or two sentences: the outcome, not the steps.>

## Context

- Read first: `CLAUDE.md`, <the specific files that matter>
- Background: <only what isn't in those files>

## Steps

1. <Concrete action, with exact file paths>
2. <...>

## Constraints

- Do not commit, push, switch branches, or run `git reset`/`checkout`/`stash`.
- Do not touch files outside: <list>
- <Repo rules that apply: no real lucide-react/sonner, never rename files in public/photography/, etc.>

## Done when

- [ ] `npm run lint` passes (zero warnings)
- [ ] `npm run build` passes
- [ ] `git diff --check` is clean
- [ ] <task-specific checks>

## Report back

Files changed, the exact result of each check above (paste failures), anything
skipped and why, and anything a human should look at in a browser.
