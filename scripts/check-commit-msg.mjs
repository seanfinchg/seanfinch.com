// commit-msg hook: keeps commit messages short and bulleted.
//   Subject: one line, at most 72 characters, no trailing period.
//   Body (optional): a blank line, then at most 8 "- " bullets of at most 100 characters.
//   Allowed extra lines: trailers ("Co-Authored-By: ...", "Refs: ...") and GitHub
//   issue references ("Fixes #12").
// Usage: node scripts/check-commit-msg.mjs <path to message file>
import { readFileSync } from "node:fs";

const MAX_SUBJECT = 72;
const MAX_BULLETS = 8;
const MAX_LINE = 100;

const file = process.argv[2];
if (!file) {
  process.stderr.write("usage: check-commit-msg.mjs <message file>\n");
  process.exit(2);
}

// Drop comment lines and everything below git's scissors line (git commit -v).
const raw = readFileSync(file, "utf8").split("# ------------------------ >8")[0] ?? "";
const lines = raw
  .split(/\r?\n/)
  .filter((line) => !line.startsWith("#"))
  .map((line) => line.trimEnd());
while (lines.length > 0 && lines.at(-1) === "") lines.pop();

const [subject = "", separator, ...body] = lines;

// Git writes merge and revert messages itself; leave them as they are.
if (/^(Merge|Revert) /.test(subject)) process.exit(0);

const problems = [];

if (subject.trim() === "") problems.push("The subject line is empty.");
if (subject.length > MAX_SUBJECT) {
  problems.push(`The subject is ${subject.length} characters; keep it to ${MAX_SUBJECT}.`);
}
if (subject.endsWith(".")) problems.push("Drop the period at the end of the subject.");
if (separator !== undefined && separator !== "") {
  problems.push("Leave a blank line between the subject and the bullets.");
}

const isTrailer = (line) =>
  /^[A-Za-z][A-Za-z-]*: \S/.test(line) ||
  /^(Fixes|Fixed|Closes|Closed|Resolves|Resolved|Refs|Part of) #\d+/.test(line);
const isBullet = (line) => line.startsWith("- ");

const content = body.filter((line) => line !== "");
const bullets = content.filter(isBullet);
const other = content.filter((line) => !isBullet(line) && !isTrailer(line));

if (other.length > 0) {
  problems.push(`Write the body as "- " bullets, not paragraphs. Offending line: "${other[0]}"`);
}
if (bullets.length > MAX_BULLETS) {
  problems.push(`${bullets.length} bullets; keep it to ${MAX_BULLETS} or fewer.`);
}
const long = content.find((line) => line.length > MAX_LINE);
if (long) problems.push(`Keep lines under ${MAX_LINE} characters: "${long.slice(0, 60)}..."`);

if (problems.length > 0) {
  process.stderr.write(
    `Commit message rejected:\n  ${problems.join("\n  ")}\n\n` +
      "Format:\n  Short summary of the change\n\n  - What changed\n  - Why, if not obvious\n",
  );
  process.exit(1);
}
