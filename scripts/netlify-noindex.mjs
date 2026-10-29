// Run after the build on non-production Netlify deploys (deploy previews and branch
// deploys). Keeps them out of search indexes: adds `X-Robots-Tag: noindex, nofollow`
// for every path to dist/_headers and replaces dist/robots.txt with a blanket Disallow.
// Refuses to run on the production context so it can never de-index the live site.
import { appendFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

if (process.env.CONTEXT === "production") {
  process.stderr.write("netlify-noindex: refusing to run on the production context\n");
  process.exit(1);
}

const dist = "dist";
mkdirSync(dist, { recursive: true });

const headersFile = join(dist, "_headers");
const rule = "/*\n  X-Robots-Tag: noindex, nofollow\n";
if (existsSync(headersFile)) {
  const existing = readFileSync(headersFile, "utf8");
  const separator = existing === "" || existing.endsWith("\n\n") ? "" : existing.endsWith("\n") ? "\n" : "\n\n";
  appendFileSync(headersFile, separator + rule);
} else {
  writeFileSync(headersFile, rule);
}

writeFileSync(join(dist, "robots.txt"), "User-agent: *\nDisallow: /\n");
process.stdout.write(`netlify-noindex: noindex applied (CONTEXT=${process.env.CONTEXT ?? "unset"})\n`);
