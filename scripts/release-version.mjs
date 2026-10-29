// Release numbers for prod: YYYY.MM.N, where N counts releases within that month
// (2026.11.1, 2026.11.2, then 2026.12.1). Only prod is numbered; dev and stage are not.
// Usage: node scripts/release-version.mjs   prints the next version, from the repo's git tags
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const TIME_ZONE = "America/New_York";

// "2026.11" for the month the release happens in, in the site owner's time zone.
export const monthPrefix = (date) => {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: TIME_ZONE,
    year: "numeric",
    month: "2-digit",
  }).formatToParts(date);
  const part = (type) => parts.find((p) => p.type === type)?.value ?? "";
  return `${part("year")}.${part("month")}`;
};

// The next version given the existing tags. Tags that aren't releases of this month are ignored.
export const nextVersion = (date, tags) => {
  const prefix = monthPrefix(date);
  const pattern = new RegExp(`^${prefix.replace(".", "\.")}\.([1-9][0-9]*)$`);
  const highest = tags.reduce((max, tag) => {
    const n = Number(pattern.exec(tag.trim())?.[1] ?? 0);
    return n > max ? n : max;
  }, 0);
  return `${prefix}.${highest + 1}`;
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const result = spawnSync("git", ["tag", "--list"], { encoding: "utf8" });
  if (result.status !== 0) {
    process.stderr.write(result.stderr);
    process.exit(2);
  }
  process.stdout.write(`${nextVersion(new Date(), result.stdout.split(/\r?\n/))}\n`);
}
