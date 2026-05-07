import sharp from "sharp";
import fs from "fs";
import path from "path";

const SRC = "C:\\Users\\seanf\\Downloads\\Portfolio Pics";
const DEST = "C:\\Users\\seanf\\Documents\\websites\\seanfinch.com\\public\\photography";

const srcFiles = fs.readdirSync(SRC);

let converted = 0;
let skipped = 0;
let failed = 0;

for (const file of srcFiles) {
  const ext = path.extname(file).toLowerCase();
  if (ext !== ".jpg" && ext !== ".jpeg") continue;

  const base = path.basename(file, path.extname(file));
  const srcPath = path.join(SRC, file);
  const destPath = path.join(DEST, base + ".webp");

  if (!fs.existsSync(destPath)) {
    console.log(`  SKIP (no matching webp): ${file}`);
    skipped++;
    continue;
  }

  try {
    await sharp(srcPath)
      .rotate()           // Apply EXIF orientation to pixels, then strip orientation tag
      .webp({ quality: 85 })
      .withMetadata()     // Keep all other EXIF (aperture, ISO, shutter, date, etc.)
      .toFile(destPath + ".tmp");

    fs.renameSync(destPath + ".tmp", destPath);
    console.log(`  OK: ${file} → ${base}.webp`);
    converted++;
  } catch (err) {
    console.error(`  FAIL: ${file} — ${err.message}`);
    if (fs.existsSync(destPath + ".tmp")) fs.unlinkSync(destPath + ".tmp");
    failed++;
  }
}

console.log(`\nDone: ${converted} converted, ${skipped} skipped, ${failed} failed`);

// Spot-check: verify EXIF is readable in first output file
console.log("\n--- EXIF spot-check on first output file ---");
import exifr from "exifr";
const first = srcFiles.find(f => f.toLowerCase().endsWith(".jpg") || f.toLowerCase().endsWith(".jpeg"));
if (first) {
  const base = path.basename(first, path.extname(first));
  const check = path.join(DEST, base + ".webp");
  try {
    const data = await exifr.parse(check, {
      pick: ["Make", "Model", "FNumber", "ExposureTime", "ISO", "DateTimeOriginal", "FocalLength"]
    });
    if (data && Object.keys(data).length > 0) {
      console.log("EXIF found:", JSON.stringify(data, null, 2));
    } else {
      console.log("WARNING: No EXIF data found in output WebP — sharp may not be embedding it.");
    }
  } catch (e) {
    console.log("ERROR reading back EXIF:", e.message);
  }
}
