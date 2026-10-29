# Handoffs

How work moves between sessions, agents and people on this repo. Use it whenever
work stops before it's finished: at the end of a session, before switching
tools, or before giving a piece of work to a subagent.

## Files

| File | What it holds | Who writes it |
| --- | --- | --- |
| `CURRENT.md` | The live handoff: where things stand, what's next, what's waiting on Sean | Whoever stops working |
| `CURRENT.md` snapshot block | Branch, HEAD, uncommitted files, gate results | `npm run handoff` only |
| `backlog.md` | Known work not started yet, with IDs (`SF-12`) | Anyone who finds something |
| `briefs/<slug>.md` | A self-contained task for a subagent (from `BRIEF_TEMPLATE.md`) | The agent delegating |

`CLAUDE.md` imports `CURRENT.md`, so every new Claude Code session starts with
it loaded. Other tools: read `CURRENT.md` first.

## Handing off (`/plz-handoff`)

1. `npm run handoff -- --gates` refreshes the snapshot and records whether lint,
   build and `git diff --check` pass.
2. Rewrite the prose sections of `CURRENT.md`. Replace them; don't append a
   diary. Old state lives in git history.
   - **In flight**: what's half done, and the exact next action.
   - **Waiting on Sean**: decisions only Sean can make, with the options.
   - **Gotchas**: anything that cost time and will cost the next person time.
3. Move finished items out. Durable facts about the code go to `CLAUDE.md`;
   work not started goes to `backlog.md`.
4. Keep `CURRENT.md` under ~120 lines. It loads into every session.

## Picking up (`/plz-resume`)

1. Read `CURRENT.md`, then `npm run handoff` to see if the snapshot drifted
   (someone committed, or files changed since the handoff was written).
2. If the prose and the snapshot disagree, trust the snapshot and git, and say so.
3. Confirm the next action with Sean before starting anything under "Waiting on Sean".

## Briefing a subagent

Copy `BRIEF_TEMPLATE.md` to `briefs/<slug>.md` and fill it in. A brief has to
stand alone: the subagent starts with no conversation history, so name the
files, the constraints, the exact commands, and what "done" looks like. Delete
the brief once its work has merged. The PR is the record after that.

## Harness

`harness run seanfinch.com:handoff` runs the same snapshot refresh with the
gates, then writes `CURRENT.md` through the harness's finalize checkpoint.
