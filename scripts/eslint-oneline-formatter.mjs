// Custom ESLint formatter: one line per problem, newlines collapsed.
//
// Why this exists: some rules (e.g. react-hooks) emit multi-line messages.
// VS Code's built-in $eslint-stylish problem matcher mistakes those
// continuation lines for file paths, so it fails to populate the Problems
// panel correctly. Emitting a single, flat line per problem makes the
// matcher in .vscode/tasks.json bulletproof.
//
// Output format (one per line):
//   <absoluteFilePath>:<line>:<col>: <error|warning>: <message> [<ruleId>]

export default function oneLineFormatter(results) {
  const lines = [];
  for (const result of results) {
    for (const m of result.messages) {
      const severity = m.severity === 2 ? "error" : "warning";
      const message = (m.message || "").replace(/\s+/g, " ").trim();
      const rule = m.ruleId || "syntax";
      const line = m.line || 1;
      const column = m.column || 1;
      lines.push(
        `${result.filePath}:${line}:${column}: ${severity}: ${message} [${rule}]`,
      );
    }
  }
  return lines.length ? lines.join("\n") + "\n" : "";
}
