import exifr from "exifr";
import fs from "fs";
import path from "path";

const SRC = "C:\\Users\\seanf\\Downloads\\Portfolio Pics";
const OUT = "C:\\Users\\seanf\\Documents\\websites\\seanfinch.com\\src\\data\\photo-exif.json";

const srcFiles = fs.readdirSync(SRC);
const result = {};

for (const file of srcFiles) {
  const ext = path.extname(file).toLowerCase();
  if (ext !== ".jpg" && ext !== ".jpeg") continue;

  const base = path.basename(file, path.extname(file));
  const webpKey = base + ".webp";
  const srcPath = path.join(SRC, file);

  try {
    const data = await exifr.parse(srcPath, {
      pick: ["Make", "Model", "LensModel", "FocalLength", "FNumber",
             "ExposureTime", "ISO", "DateTimeOriginal"],
    });

    if (data && Object.keys(data).length > 0) {
      // Serialize DateTimeOriginal as ISO string
      if (data.DateTimeOriginal instanceof Date) {
        data.DateTimeOriginal = data.DateTimeOriginal.toISOString();
      }
      result[webpKey] = data;
      console.log(`  OK: ${file} — f/${data.FNumber} ${data.ExposureTime ? `1/${Math.round(1/data.ExposureTime)}s` : ""} ISO${data.ISO}`);
    } else {
      result[webpKey] = {};
      console.log(`  EMPTY: ${file} — no EXIF found`);
    }
  } catch (e) {
    result[webpKey] = {};
    console.log(`  FAIL: ${file} — ${e.message}`);
  }
}

fs.writeFileSync(OUT, JSON.stringify(result, null, 2));
console.log(`\nWrote ${Object.keys(result).length} entries to ${OUT}`);
