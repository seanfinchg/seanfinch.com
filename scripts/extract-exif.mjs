import exifr from "exifr";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const SRC = "C:\\Users\\seanf\\Downloads\\Portfolio Pics";
// Resolved from this script so it keeps working if the repo moves.
const OUT = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "src",
  "data",
  "photo-exif.json",
);

const srcFiles = fs.readdirSync(SRC);
/**
 * @param {unknown} v
 * @returns {v is Record<string, unknown>}
 */
const isRecord = (v) => typeof v === "object" && v !== null && !Array.isArray(v);

/** @type {Record<string, Record<string, unknown>>} */
const result = {};

for (const file of srcFiles) {
  const ext = path.extname(file).toLowerCase();
  if (ext !== ".jpg" && ext !== ".jpeg") continue;

  const base = path.basename(file, path.extname(file));
  const webpKey = base + ".webp";
  const srcPath = path.join(SRC, file);

  try {
    /** @type {unknown} */
    const raw = await exifr.parse(srcPath, {
      pick: [
        "Make",
        "Model",
        "LensModel",
        "FocalLength",
        "FNumber",
        "ExposureTime",
        "ISO",
        "DateTimeOriginal",
      ],
    });

    const data = isRecord(raw) ? raw : {};
    if (Object.keys(data).length > 0) {
      // Serialize DateTimeOriginal as ISO string
      if (data.DateTimeOriginal instanceof Date) {
        data.DateTimeOriginal = data.DateTimeOriginal.toISOString();
      }
      result[webpKey] = data;
      const { FNumber, ExposureTime, ISO } = data;
      const shutter = typeof ExposureTime === "number" ? `1/${Math.round(1 / ExposureTime)}s` : "";
      console.log(`  OK: ${file} — f/${String(FNumber)} ${shutter} ISO${String(ISO)}`);
    } else {
      result[webpKey] = {};
      console.log(`  EMPTY: ${file} — no EXIF found`);
    }
  } catch (e) {
    result[webpKey] = {};
    console.log(`  FAIL: ${file} — ${e instanceof Error ? e.message : String(e)}`);
  }
}

fs.writeFileSync(OUT, JSON.stringify(result, null, 2));
console.log(`\nWrote ${Object.keys(result).length} entries to ${OUT}`);
