---
description: Write the handoff for this repo before stopping, or brief a subagent. Updates docs/handoff/CURRENT.md (and backlog.md), or writes docs/handoff/briefs/<slug>.md when given "brief <slug>".
argument-hint: "[brief <slug>] [notes]"
---

Hand off work on this repo, following `docs/handoff/README.md`.

If `$ARGUMENTS` starts with `brief <slug>`, write a subagent brief instead:
copy `docs/handoff/BRIEF_TEMPLATE.md` to `docs/handoff/briefs/<slug>.md` and
fill every section from the current conversation and the repo. It must stand
alone: a model with no history reads only that file and the repo. Name exact
files, commands and constraints, and keep the "do not commit/push" limits unless
the user said otherwise. Show the user the brief path and stop.

Otherwise:

1. Run `npm run handoff -- --gates`. Note any gate that fails.
2. Read `docs/handoff/CURRENT.md` and `git status`. Rewrite the prose sections
   to match reality now. Replace them; don't append history:
   - **In flight**: what is done but uncommitted, what is half done, and the
     single next action. Say plainly what is not committed or not pushed.
   - **Waiting on Sean**: only decisions he has to make, each with its options.
   - **Gotchas**: things that cost time this session and will cost the next
     person time. Drop gotchas that no longer apply.
3. Move anything finished out of `CURRENT.md`. Durable facts about how the code
   works go in `CLAUDE.md`. Newly found work that hasn't started goes in
   `docs/handoff/backlog.md` with the next free `SF-<n>` ID. Delete backlog items
   that shipped.
4. Keep `CURRENT.md` under ~120 lines.
5. Do not commit unless the user asks. Report what you changed and any failing gate.

Extra notes from the user to fold in: $ARGUMENTS
