/**
 * Sanitize EXIF on the published full-res photos.
 *
 * Why this exists: scripts/copy-exif.mjs calls sharp's .withMetadata(), which
 * preserves EVERY EXIF tag from the source JPG -- including the camera body
 * and lens serial numbers. Those are a persistent fingerprint linking every
 * photo to one physical camera across any site they get reposted to.
 *
 * What it does (losslessly -- exiftool rewrites only the EXIF/XMP chunks and
 * never touches the VP8 image data, verified by chunk hash):
 *   - removes  SerialNumber, LensSerialNumber, InternalSerialNumber,
 *              BodySerialNumber, Software
 *   - sets     Artist + Copyright, so scraped copies carry attribution
 *   - keeps    Make, Model, LensModel, FNumber, ExposureTime, ISO,
 *              FocalLength, DateTimeOriginal (the shooting data the gallery
 *              displays)
 *
 * Only the top-level originals are touched. public/photography/_derived/* is
 * already metadata-free: vite.config.ts resizes with sharp and never calls
 * .withMetadata(), so sharp strips metadata by default there.
 *
 * Idempotent -- safe to re-run. Run it after scripts/copy-exif.mjs whenever
 * you add photos, then commit the result.
 *
 * Requires exiftool on PATH: https://exiftool.org/
 */
import { execFileSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const PHOTO_DIR = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "public",
  "photography",
);

const ARTIST = "Sean Finch";
const COPYRIGHT = "(c) Sean Finch. All rights reserved.";

// Tags to blank out. Trailing "=" is exiftool's "delete this tag".
const STRIP = [
  "SerialNumber",
  "LensSerialNumber",
  "InternalSerialNumber",
  "BodySerialNumber",
  "CameraSerialNumber",
  "Software",
  "OwnerName",
  "CameraOwnerName",
  // Vendor MakerNotes carry ShutterCount and PowerUpTime, which fingerprint a
  // specific camera body just as well as a serial (and let anyone order your
  // shots chronologically). The gallery reads src/data/photo-exif.json, built
  // separately from the source JPGs, so dropping MakerNotes costs the site
  // nothing -- standard EXIF (Make/Model/LensModel/FNumber/ISO/FocalLength/
  // DateTimeOriginal) is still preserved for anyone who downloads a full-res.
  "MakerNotes:all",
  // The Adobe Camera Raw XMP block is the biggest leak of the three. Besides
  // ~200 develop-setting sliders (your editing recipe) it carries RawFileName
  // (DSC_8865.NEF), XMP-aux ImageNumber (another shutter counter), persistent
  // DocumentID/InstanceID UUIDs that correlate copies of a photo anywhere it
  // gets reposted, and CreatorTool/HistoryWhen revealing editing OS and local
  // timezone. None of it is used by the site. Attribution is re-added below.
  "XMP:all",
];

// Re-added after the wipe so scraped copies still carry attribution.
const ATTRIBUTION = [
  `-Artist=${ARTIST}`,
  `-Copyright=${COPYRIGHT}`,
  `-XMP-dc:Creator=${ARTIST}`,
  `-XMP-dc:Rights=${COPYRIGHT}`,
];

function exiftoolVersion() {
  try {
    return execFileSync("exiftool", ["-ver"], { encoding: "utf8" }).trim();
  } catch {
    return null;
  }
}

const version = exiftoolVersion();
if (!version) {
  console.error(
    "ERROR: exiftool not found on PATH.\n" +
      "Install it from https://exiftool.org/ and re-run.\n" +
      "Nothing was modified.",
  );
  process.exit(1);
}

const originals = fs
  .readdirSync(PHOTO_DIR, { withFileTypes: true })
  .filter((e) => e.isFile() && e.name.toLowerCase().endsWith(".webp"))
  .map((e) => e.name);

if (originals.length === 0) {
  console.log("No .webp originals found in public/photography -- nothing to do.");
  process.exit(0);
}

console.log(`exiftool ${version}`);
console.log(`Sanitizing ${originals.length} originals in public/photography\n`);

const args = [
  "-overwrite_original",
  "-q",
  // Deletions must precede assignments on the command line.
  ...STRIP.map((t) => `-${t}=`),
  ...ATTRIBUTION,
  "-ext",
  "webp",
  PHOTO_DIR, // no -r, so _derived/ is left alone
];

try {
  execFileSync("exiftool", args, { encoding: "utf8", stdio: "inherit" });
} catch (err) {
  console.error("exiftool failed:", err.message);
  process.exit(1);
}

// Verify: re-read every file and fail loudly if any stripped tag survived.
let leaks = 0;
for (const name of originals) {
  const out = execFileSync(
    "exiftool",
    ["-a", "-G1", "-s", path.join(PHOTO_DIR, name)],
    { encoding: "utf8" },
  );
  const bad = out
    .split("\n")
    .filter((line) => {
      // Match on VALUES, not tag names: exiftool prints blanked tags as
      // "[Nikon] SerialNumber :" and those are already clean.
      const m = /^\[[^\]]+\]\s+(\S+)\s*:\s*(.*)$/.exec(line.trim());
      if (!m) return false;
      const [, tag, value] = m;
      if (!value.trim()) return false;
      return /serial|owner ?name|software(agent)?|shuttercount|poweruptime|imagenumber|documentid|instanceid|rawfilename|creatortool|historywhen/i.test(
        tag,
      );
    })
    .map((l) => l.trim());
  if (bad.length) {
    leaks++;
    console.error(`  LEAK in ${name}:`);
    bad.forEach((b) => console.error(`    ${b}`));
  }
}

if (leaks > 0) {
  console.error(`\nFAILED: ${leaks} file(s) still carry identifying metadata.`);
  process.exit(1);
}

console.log(`\nDone. ${originals.length} files sanitized, 0 leaks.`);
console.log("Image data untouched (exiftool rewrites metadata chunks only).");
console.log("Remember to commit the modified .webp files.");
