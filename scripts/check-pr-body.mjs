// CI check: keeps pull request descriptions short and bulleted.
//   Allowed lines: "## " headings, "- " / "* " bullets, "- [ ]" checklist items,
//   numbered steps, table rows, images/links on their own line, and HTML comments.
//   At most 25 non-empty lines and 1500 characters; each line at most 120 characters.
// Reads the description from the PR_BODY environment variable.
const MAX_LINES = 25;
const MAX_CHARS = 1500;
const MAX_LINE = 120;

// Template guidance lives in <!-- comments --> and does not count.
const body = (process.env.PR_BODY ?? "").replace(/<!--[\s\S]*?-->/g, "").trim();
const lines = body
  .split(/\r?\n/)
  .map((line) => line.trimEnd())
  .filter((line) => line.trim() !== "");

const allowed = [
  /^#{1,4} /, // headings
  /^\s*[-*]( |$)/, // bullets (including empty template bullets) and checklist items
  /^\s*\d+\. /, // numbered steps
  /^\|/, // table rows
  /^!?\[.*\]\(.*\)$/, // a lone image or link
];

const problems = [];
if (lines.length === 0) problems.push("The description is empty. Fill in the template.");
if (lines.length > MAX_LINES) problems.push(`${lines.length} lines; keep it to ${MAX_LINES}.`);
if (body.length > MAX_CHARS) problems.push(`${body.length} characters; keep it to ${MAX_CHARS}.`);

const paragraph = lines.find((line) => !allowed.some((pattern) => pattern.test(line)));
if (paragraph) {
  problems.push(`Use bullets, not paragraphs. Offending line: "${paragraph.slice(0, 80)}"`);
}
const long = lines.find((line) => line.length > MAX_LINE);
if (long) problems.push(`Keep lines under ${MAX_LINE} characters: "${long.slice(0, 60)}..."`);

if (problems.length > 0) {
  process.stderr.write(`PR description needs trimming:\n  ${problems.join("\n  ")}\n`);
  process.exit(1);
}
process.stdout.write("PR description is short and bulleted\n");
