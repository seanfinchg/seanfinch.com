/**
 * Write right-sized copies of the oversized site images (not the gallery).
 *
 *   node scripts/optimize-images.mjs
 *
 * public/pfp.webp (4160 px) and public/SeanPortrait.jpg (4160x6240) are shown
 * as an 88 px avatar and a ~320 px portrait. This writes small WebP versions
 * beside them for <img srcset>. It never overwrites an existing file: public
 * files are long-cached, so a new size gets a new name. The originals stay
 * (they may be linked externally, e.g. the JSON-LD image in index.html).
 *
 * src/assets/audax-group.jpeg is a 200x200 CMYK logo carrying a ~550 KB ICC
 * profile. It is re-encoded in place as sRGB (converted through that profile,
 * so colours match what browsers rendered before). Vite content-hashes files
 * under src/assets/, so replacing it is cache-safe. Pass --force-logo to redo it.
 */
import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const pub = (f) => path.join(ROOT, "public", f);

// Widths cover 1x/2x/3x of the largest rendered size.
const JOBS = [
  { src: pub("pfp.webp"), name: "pfp", widths: [88, 176, 264], quality: 82 },
  { src: pub("SeanPortrait.jpg"), name: "SeanPortrait", widths: [480, 960, 1440], quality: 80 },
];

let wrote = 0;
for (const job of JOBS) {
  for (const w of job.widths) {
    const out = pub(`${job.name}-${w}.webp`);
    if (fs.existsSync(out)) {
      console.log(`skip  ${path.relative(ROOT, out)} (exists)`);
      continue;
    }
    // sharp drops metadata by default; only the colour conversion to sRGB happens.
    await sharp(job.src).resize({ width: w, withoutEnlargement: true }).webp({ quality: job.quality }).toFile(out);
    console.log(`wrote ${path.relative(ROOT, out)} (${Math.round(fs.statSync(out).size / 1024)} KB)`);
    wrote++;
  }
}

const logo = path.join(ROOT, "src", "assets", "audax-group.jpeg");
// Read into memory first: on Windows sharp keeps the input file open, which
// blocks writing back to the same path.
const logoBuf = fs.readFileSync(logo);
const meta = await sharp(logoBuf).metadata();
if (meta.space === "cmyk" || process.argv.includes("--force-logo")) {
  const buf = await sharp(logoBuf).toColourspace("srgb").jpeg({ quality: 90, mozjpeg: true }).toBuffer();
  fs.writeFileSync(logo, buf);
  console.log(`wrote src/assets/audax-group.jpeg (${Math.round(buf.length / 1024)} KB, sRGB)`);
  wrote++;
} else {
  console.log("skip  src/assets/audax-group.jpeg (already sRGB)");
}
console.log(`${wrote} file(s) written`);
