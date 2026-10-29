/**
 * Content policy: keep personal and confidential information out of this public repo.
 * Modelled on KashmirLivingArchive's scripts/check-content.ts, aimed at a personal site:
 * the site is about Sean, but must never publish where he lives, how to reach him
 * privately, other people's data, or anything confidential from an employer.
 *
 * Blocks, in added lines / commit messages / PR text:
 *   - US street addresses, phone numbers, SSNs
 *   - email addresses, except the allowed ones below
 *   - confidentiality / MNPI markers ("confidential", "internal only", "NDA", ...)
 *   - Sean's own private terms (street, phone, ...), stored only as truncated
 *     SHA-256 hashes so the list itself reveals nothing. Add with `block`.
 * Blocks, in added images: embedded GPS coordinates.
 *
 *   node scripts/check-content.mjs staged          pre-commit: staged files
 *   node scripts/check-content.mjs msg <file>      commit-msg
 *   node scripts/check-content.mjs push            pre-push: git's push refs on stdin
 *   node scripts/check-content.mjs range <a..b>    CI: every commit in a range
 *   node scripts/check-content.mjs text            CI: text on stdin (PR title + body)
 *   node scripts/check-content.mjs tree            audit every tracked file as it is now
 *   node scripts/check-content.mjs block "<term>"  add a private term (word or 2-3 word phrase)
 *   node scripts/check-content.mjs allow <files>   approve files' current content as exceptions
 */
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { pathToFileURL } from "node:url";

const BLOCKLIST = ".github/content-blocklist.txt"; // hashes only
const ALLOWLIST = ".github/content-policy-allowlist.txt"; // "<blob sha> <path>"
const IMAGE = /\.(jpe?g|webp|png|tiff?|heic)$/i;
// Files that legitimately contain the patterns this script looks for.
const SELF = new Set(["scripts/check-content.mjs", "scripts/check-content.test.mjs", BLOCKLIST, ALLOWLIST]);
const SKIP = /(^|\/)(package-lock\.json|node_modules\/)|\.(pdf|woff2?|ttf|ico|mp3|wav|zip)$/i;

const ALLOWED_EMAIL = [
  /@seanfinch\.com$/i, // public site addresses
  /^noreply@/i,
  /@users\.noreply\.github\.com$/i,
  /@example\.(com|org)$/i,
];

const STREET_SUFFIX =
  "St|Street|Ave|Avenue|Rd|Road|Blvd|Boulevard|Dr|Drive|Ln|Lane|Ct|Court|Way|Pl|Place|Ter|Terrace|Pkwy|Parkway|Cir|Circle|Hwy|Highway";
const RULES = [
  { name: "street address", re: new RegExp(`\\b\\d{1,5}\\s+(?:[NSEW]\\.?\\s+)?(?:[A-Z][a-z]+\\s+){1,3}(?:${STREET_SUFFIX})\\b\\.?`) },
  { name: "phone number", re: /(?<![\d.])(?:\+?1[\s.-]?)?\(?[2-9]\d{2}\)?[\s.-]\d{3}[\s.-]\d{4}(?![\d.])/ },
  { name: "SSN", re: /\b(?!000|666|9\d\d)\d{3}-(?!00)\d{2}-(?!0000)\d{4}\b/ },
  {
    name: "confidential marker",
    re: /\b(confidential|internal[\s-]only|internal use only|do not (?:distribute|share)|proprietary|under nda|mnpi|material non-?public|embargoed)\b/i,
  },
];

const hash = (v) => createHash("sha256").update(v).digest("hex").slice(0, 16);
const loadHashes = () =>
  new Set(
    existsSync(BLOCKLIST)
      ? readFileSync(BLOCKLIST, "utf8").split(/\r?\n/).map((l) => l.trim()).filter((l) => /^[0-9a-f]{16}$/.test(l))
      : [],
  );
const PRIVATE = loadHashes();

/** Returns the reason a line is blocked, or null. */
export const lineProblem = (line, privateHashes = PRIVATE) => {
  for (const { name, re } of RULES) if (re.test(line)) return name;
  for (const m of line.matchAll(/[\w.+-]+@[\w-]+(?:\.[\w-]+)*\.[a-z]{2,}/gi)) {
    if (!ALLOWED_EMAIL.some((ok) => ok.test(m[0]))) return "email address";
  }
  const words = line.toLowerCase().match(/[a-z0-9]+/g) ?? [];
  for (let i = 0; i < words.length; i++) {
    if (privateHashes.has(hash(words[i]))) return "private term";
    if (i > 0 && privateHashes.has(hash(`${words[i - 1]} ${words[i]}`))) return "private term";
    if (i > 1 && privateHashes.has(hash(`${words[i - 2]} ${words[i - 1]} ${words[i]}`))) return "private term";
  }
  return null;
};

const problems = [];
const scanText = (where, text) => {
  text.split(/\r?\n/).forEach((line, i) => {
    const why = lineProblem(line);
    // The offending text is not echoed, so a CI log can't leak it either.
    if (why) problems.push(`${where}, line ${i + 1}: ${why}`);
  });
};

const git = (args, { allowFailure = false, buffer = false } = {}) => {
  const r = spawnSync("git", args, { encoding: buffer ? "buffer" : "utf8", maxBuffer: 256 * 1024 * 1024 });
  if (r.status !== 0) {
    if (allowFailure) return buffer ? Buffer.alloc(0) : "";
    process.stderr.write(String(r.stderr));
    process.exit(2);
  }
  return r.stdout;
};
const lines = (t) => t.split(/\r?\n/).filter((l) => l !== "");
const addedLines = (diff) =>
  lines(diff).filter((l) => l.startsWith("+") && !l.startsWith("+++")).map((l) => l.slice(1)).join("\n");

const parseAllowlist = (text) =>
  new Map(
    lines(text)
      .filter((l) => !l.startsWith("#"))
      .map((l) => {
        const [blob = "", ...p] = l.trim().split(" ");
        return [p.join(" "), blob];
      }),
  );

let exifr = null;
const imageHasGps = async (buf) => {
  if (buf.length === 0) return false;
  exifr ??= (await import("exifr")).default;
  try {
    const gps = await exifr.gps(buf);
    return gps != null && (gps.latitude != null || gps.longitude != null);
  } catch {
    return false;
  }
};

const scanFiles = async (where, files, { blobOf, diffOf, bytesOf, allowed }) => {
  for (const path of files) {
    if (SELF.has(path) || SKIP.test(path)) continue;
    const pinned = allowed.get(path);
    if (pinned !== undefined) {
      const blob = blobOf(path);
      if (blob === "" || blob === pinned) continue;
      problems.push(`${where}: ${path} is an approved exception but its content changed; re-approve with \`allow\``);
      continue;
    }
    const why = lineProblem(path);
    if (why) problems.push(`${where}: file name ${path}: ${why}`);
    if (IMAGE.test(path)) {
      if (await imageHasGps(bytesOf(path))) problems.push(`${where}: ${path}: image contains GPS coordinates`);
      continue;
    }
    scanText(`${where} ${path}`, addedLines(diffOf(path)));
  }
};

const scanCommit = async (sha) => {
  const short = sha.slice(0, 7);
  const allowed = parseAllowlist(git(["show", `${sha}:${ALLOWLIST}`], { allowFailure: true }));
  // The message only: author/committer emails are the GitHub identity and stay out of scope.
  scanText(`commit ${short} message`, git(["log", "-1", "--format=%B", sha]));
  const files = lines(git(["diff-tree", "--no-commit-id", "--name-only", "--diff-filter=ACMR", "-r", "--root", "-m", "--first-parent", sha]));
  await scanFiles(`commit ${short}`, files, {
    blobOf: (p) => git(["rev-parse", "--verify", "--quiet", `${sha}:${p}`], { allowFailure: true }).trim(),
    diffOf: (p) => git(["show", "--format=", "--no-color", "-U0", "-m", "--first-parent", sha, "--", p]),
    bytesOf: (p) => git(["show", `${sha}:${p}`], { allowFailure: true, buffer: true }),
    allowed,
  });
};

const [mode, ...args] = process.argv.slice(2);
const ZERO = /^0+$/;
const isMain = process.argv[1] !== undefined && import.meta.url === pathToFileURL(process.argv[1]).href;

if (isMain) {
  switch (mode) {
    case "staged": {
      const allowed = parseAllowlist(git(["show", `:${ALLOWLIST}`], { allowFailure: true }));
      await scanFiles("staged", lines(git(["diff", "--cached", "--name-only", "--diff-filter=ACMR"])), {
        blobOf: (p) => git(["rev-parse", "--verify", "--quiet", `:${p}`], { allowFailure: true }).trim(),
        diffOf: (p) => git(["diff", "--cached", "--no-color", "-U0", "--", p]),
        bytesOf: (p) => git(["show", `:${p}`], { allowFailure: true, buffer: true }),
        allowed,
      });
      break;
    }
    case "tree": {
      const allowed = parseAllowlist(existsSync(ALLOWLIST) ? readFileSync(ALLOWLIST, "utf8") : "");
      const files = lines(git(["ls-files", "--cached", "--others", "--exclude-standard"])).filter((p) => existsSync(p));
      await scanFiles("tree", files, {
        blobOf: (p) => git(["hash-object", "--", p]).trim(),
        diffOf: (p) => readFileSync(p, "utf8").split(/\r?\n/).map((l) => `+${l}`).join("\n"),
        bytesOf: (p) => readFileSync(p),
        allowed,
      });
      break;
    }
    case "msg":
      if (!args[0]) process.exit(2);
      scanText("commit message", lines(readFileSync(args[0], "utf8")).filter((l) => !l.startsWith("#")).join("\n"));
      break;
    case "push":
      for (const ref of lines(readFileSync(0, "utf8"))) {
        const [, localSha = "", , remoteSha = ""] = ref.split(" ");
        if (ZERO.test(localSha)) continue;
        const range = ZERO.test(remoteSha) ? [localSha, "--not", "--remotes"] : [`${remoteSha}..${localSha}`];
        for (const sha of lines(git(["rev-list", ...range]))) await scanCommit(sha);
      }
      break;
    case "range":
      if (!args[0]) process.exit(2);
      for (const sha of lines(git(["rev-list", args[0]]))) await scanCommit(sha);
      break;
    case "text":
      scanText("text", readFileSync(0, "utf8"));
      break;
    case "block": {
      const term = args.join(" ").toLowerCase().match(/[a-z0-9]+/g) ?? [];
      if (term.length < 1 || term.length > 3) {
        process.stderr.write("block takes a word or a 2-3 word phrase\n");
        process.exit(2);
      }
      const hashes = loadHashes();
      hashes.add(hash(term.join(" ")));
      writeFileSync(BLOCKLIST, `# Private terms the content policy blocks, as truncated SHA-256 hashes.\n# Add with: node scripts/check-content.mjs block "<term>"\n${[...hashes].sort().join("\n")}\n`);
      process.stdout.write(`Added 1 term (${hashes.size} total) to ${BLOCKLIST}\n`);
      break;
    }
    case "allow": {
      const allowed = parseAllowlist(existsSync(ALLOWLIST) ? readFileSync(ALLOWLIST, "utf8") : "");
      for (const p of args) allowed.set(p.replaceAll("\\", "/"), git(["hash-object", "--", p]).trim());
      const body = [...allowed].sort(([a], [b]) => a.localeCompare(b)).map(([p, b]) => `${b} ${p}`).join("\n");
      writeFileSync(ALLOWLIST, `# Approved exceptions to the content policy. Edit only with \`check-content.mjs allow\`.\n${body}\n`);
      process.stdout.write(`Approved ${args.length} file(s) in ${ALLOWLIST}\n`);
      break;
    }
    default:
      process.stderr.write("usage: check-content.mjs staged | msg <file> | push | range <a..b> | text | tree | block <term> | allow <files...>\n");
      process.exit(2);
  }

  if (problems.length > 0) {
    process.stderr.write(
      `Blocked by the content policy (personal or confidential information):\n  ${problems.slice(0, 30).join("\n  ")}\n` +
        "Remove it, or if it's genuinely fine, approve the file with `node scripts/check-content.mjs allow <file>`.\n",
    );
    process.exit(1);
  }
}
