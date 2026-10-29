/**
 * Add NEW photos to the gallery: convert source JPGs to WebP in public/photography/.
 *
 *   node scripts/add-photos.mjs <file.jpg> [more.jpg ...]
 *   node scripts/add-photos.mjs --dry-run <file.jpg> ...
 *
 * Unlike scripts/copy-exif.mjs (which re-encodes photos that are already
 * published), this refuses to touch an existing .webp. /photography/* is cached
 * immutably for a year, so a published filename must never change content.
 *
 * Encoding matches copy-exif.mjs: EXIF orientation applied to pixels, WebP
 * quality 85, metadata kept so `npm run photos:sanitize` can strip the
 * identifying tags and stamp attribution. Run that next, then add a
 * src/data/photo-meta.json entry and an EXIF entry (scripts/extract-exif.mjs,
 * or by hand) for each new stack. `node scripts/photo-meta-audit.mjs` checks.
 *
 * Naming follows the gallery's stacking rule: "NAME.JPG" is the original,
 * "NAME_edited.JPG" / "NAME-edit.JPG" the edit, so both land in one stack.
 */
import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const DEST = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "public", "photography");

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const sources = args.filter((a) => a !== "--dry-run");

if (sources.length === 0) {
  console.error("usage: node scripts/add-photos.mjs [--dry-run] <file.jpg> [more.jpg ...]");
  process.exit(2);
}

let added = 0;
let refused = 0;
for (const src of sources) {
  const ext = path.extname(src).toLowerCase();
  if (ext !== ".jpg" && ext !== ".jpeg") {
    console.error(`  SKIP (not a JPG): ${src}`);
    refused++;
    continue;
  }
  if (!fs.existsSync(src)) {
    console.error(`  MISSING: ${src}`);
    refused++;
    continue;
  }
  const out = path.join(DEST, path.basename(src, path.extname(src)) + ".webp");
  if (fs.existsSync(out)) {
    console.error(`  REFUSED (already published, use a new filename): ${path.basename(out)}`);
    refused++;
    continue;
  }
  if (dryRun) {
    console.log(`  WOULD ADD: ${src} → ${path.basename(out)}`);
    continue;
  }
  await sharp(src).rotate().webp({ quality: 85 }).withMetadata().toFile(out + ".tmp");
  fs.renameSync(out + ".tmp", out);
  console.log(`  ADDED: ${path.basename(out)}`);
  added++;
}

console.log(`\n${added} added, ${refused} refused${dryRun ? " (dry run)" : ""}`);
if (added > 0) console.log("NEXT: npm run photos:sanitize, then node scripts/photo-meta-audit.mjs");
process.exit(refused > 0 ? 1 : 0);
