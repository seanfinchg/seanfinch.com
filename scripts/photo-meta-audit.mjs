/**
 * List gallery stacks with no entry (or no alt text) in src/data/photo-meta.json.
 * A stack without one still shows, but as "Untitled" with generic alt text.
 *
 * Stack ids use the same base-name rule as photoManifestPlugin() in
 * vite.config.ts: strip ".webp", an "-edit"/"_edited" suffix, and " (n)".
 * Exits 1 when something is missing, so it can gate a task.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const photoDir = path.join(ROOT, "public", "photography");
const readJson = (p) => JSON.parse(fs.readFileSync(path.join(ROOT, p), "utf8"));

const hidden = new Set(readJson("src/data/photo-hidden.json"));
const meta = readJson("src/data/photo-meta.json");
const baseOf = (f) =>
  f.replace(/\.webp$/i, "").replace(/[_-]edit(ed)?$/i, "").replace(/\s*\(\d+\)$/, "").trim();

const ids = new Set(
  fs.readdirSync(photoDir)
    .filter((f) => f.toLowerCase().endsWith(".webp") && !hidden.has(f))
    .map(baseOf),
);

const missing = [...ids].filter((id) => !meta.photos[id]);
const noAlt = [...ids].filter((id) => meta.photos[id] && !meta.photos[id].alt);
const unknownTags = [...ids].flatMap((id) =>
  (meta.photos[id]?.tags ?? []).filter((t) => !(t in meta.tags)).map((t) => `${id}: ${t}`),
);
const orphans = Object.keys(meta.photos).filter((id) => !ids.has(id));

console.log(`photo-meta: ${ids.size} visible stacks, ${Object.keys(meta.photos).length} entries`);
for (const id of missing) console.log(`  MISSING  ${id}`);
for (const id of noAlt) console.log(`  NO ALT   ${id}`);
for (const t of unknownTags) console.log(`  BAD TAG  ${t}`);
for (const id of orphans) console.log(`  ORPHAN   ${id} (no visible photo; hidden or removed)`);

process.exit(missing.length + noAlt.length + unknownTags.length > 0 ? 1 : 0);
