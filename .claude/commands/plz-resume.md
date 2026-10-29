---
description: Pick up where the last session or agent left off, from docs/handoff/CURRENT.md. Checks the handoff against the real repo state before doing anything.
argument-hint: "[what to focus on]"
---

Resume work on this repo, following `docs/handoff/README.md`.

1. Read `docs/handoff/CURRENT.md`. Note when it was last refreshed.
2. Run `npm run handoff -- --stdout` and compare its snapshot with the one in
   the file, without writing it. Also check `git status` and `git log -5`.
3. If the prose and the repo disagree (files committed since, branch changed,
   listed work missing), trust git and say exactly what drifted.
4. Report in a few lines: what's in flight, the stated next action, and what's
   waiting on Sean. If `$ARGUMENTS` names a focus, relate it to that, and to
   any matching `SF-<n>` item in `docs/handoff/backlog.md`.
5. Don't start anything listed under "Waiting on Sean", and don't commit or
   push, until the user confirms.
