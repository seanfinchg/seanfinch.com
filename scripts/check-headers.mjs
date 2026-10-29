// Security regression check: netlify.toml must keep the security headers on `/*`.
// Fails (exit 1) if one is missing or its value lost a required directive.
// Usage: node scripts/check-headers.mjs [path to netlify.toml]
import { readFileSync } from "node:fs";

const file = process.argv[2] ?? "netlify.toml";
const toml = readFileSync(file, "utf8");

// Find the [[headers]] block whose `for` is "/*" and collect its `Key = "value"` lines.
const blocks = toml.split(/^\[\[headers\]\]\s*$/m).slice(1);
const block = blocks.find((b) => /^\s*for\s*=\s*"\/\*"\s*$/m.test(b));
const headers = {};
if (block) {
  const values = block.split(/^\s*\[headers\.values\]\s*$/m)[1] ?? "";
  for (const line of values.split(/\r?\n/)) {
    if (/^\s*\[/.test(line)) break; // the next table starts
    const match = /^\s*([A-Za-z-]+)\s*=\s*"(.*)"\s*$/.exec(line);
    if (match) headers[match[1]] = match[2];
  }
}

// header name -> substrings its value must contain (empty list: it just has to be set).
const required = {
  "Content-Security-Policy": ["default-src 'self'", "object-src 'none'", "frame-ancestors"],
  "Strict-Transport-Security": [],
  "X-Content-Type-Options": ["nosniff"],
  "X-Frame-Options": [],
  "Referrer-Policy": [],
  "Permissions-Policy": [],
};

const problems = [];
if (!block) problems.push(`${file} has no [[headers]] block for "/*".`);
for (const [name, parts] of Object.entries(required)) {
  const value = headers[name];
  if (value === undefined || value.trim() === "") {
    problems.push(`Missing header on /*: ${name}`);
    continue;
  }
  for (const part of parts) {
    if (!value.includes(part)) problems.push(`${name} must contain: ${part}`);
  }
}

if (problems.length > 0) {
  process.stderr.write(`Security headers check failed:\n  ${problems.join("\n  ")}\n`);
  process.exit(1);
}
process.stdout.write(`Security headers present on /* (${Object.keys(required).length} checked)\n`);
