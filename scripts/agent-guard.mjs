/**
 * Claude Code PreToolUse hook (see .claude/settings.json), ported from
 * KashmirLivingArchive's scripts/agent-guard.ts. Before an agent runs a command
 * that publishes (git commit/push/tag/merge, gh pr/issue/release/api/gist), the
 * command text goes through the content policy, and skipping git hooks with
 * --no-verify is refused. Exit 2 blocks the command and shows the reason.
 */
import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";

const PUBLISHING =
  /^\s*(?:[A-Za-z_][A-Za-z0-9_]*=\S*\s+)*(?:&\s*)?(?:git(?:\.exe)?(?:\s+-[Cc]\s+\S+|\s+--?[\w-]+(?:=\S+)?)*\s+(?:commit|push|tag|notes|merge|revert|cherry-pick|am)\b|gh(?:\.exe)?\s+(?:pr\s+(?:create|edit|merge|comment|review|close|reopen)|issue\s+(?:create|edit|comment|close|reopen)|release|api|gist)\b)/i;
const SKIPS_HOOKS = /\s--no-verify\b/;

const block = (reason) => {
  process.stderr.write(`${reason}\n`);
  process.exit(2);
};

let command = "";
try {
  const input = JSON.parse(readFileSync(0, "utf8"));
  const c = input?.tool_input?.command;
  command = typeof c === "string" ? c : "";
} catch {
  process.exit(0);
}

const parts = command.split(/&&|\|\||;|\||\r?\n/);
if (!parts.some((part) => PUBLISHING.test(part))) process.exit(0);

if (SKIPS_HOOKS.test(command)) {
  block("Blocked: --no-verify skips the git hooks. CI runs the same checks; fix the cause instead.");
}

const result = spawnSync(process.execPath, ["scripts/check-content.mjs", "text"], { input: command, encoding: "utf8" });
if (result.status !== 0) {
  block(`${result.stderr.trim()}\nBlocked before running: this command would publish text the content policy rejects. Rewrite it.`);
}
