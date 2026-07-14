// Generates public/og-image.jpg (1200x630) — the social preview card.
// Run: node scripts/gen-og-image.mjs   (regenerate if you change the text/branding)
import sharp from "sharp";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const out = resolve(__dirname, "../public/og-image.jpg");

const svg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0a0f2c"/>
      <stop offset="1" stop-color="#0b0b0f"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#38bdf8"/>
      <stop offset="0.5" stop-color="#3b82f6"/>
      <stop offset="1" stop-color="#6366f1"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect x="0" y="0" width="1200" height="10" fill="url(#accent)"/>
  <text x="80" y="290" font-family="Segoe UI, Arial, sans-serif" font-size="112" font-weight="800" fill="url(#accent)">Sean Finch</text>
  <text x="86" y="360" font-family="Consolas, 'Courier New', monospace" font-size="36" fill="#a8c8f0">Cybersecurity &#183; Northeastern '27</text>
  <text x="86" y="415" font-family="Consolas, 'Courier New', monospace" font-size="27" fill="#8892b0">Security Engineering &#183; Homelab &#183; Photography</text>
  <text x="86" y="560" font-family="Consolas, 'Courier New', monospace" font-size="24" fill="#6b7280">seanfinch.com</text>
</svg>`;

await sharp(Buffer.from(svg)).jpeg({ quality: 88 }).toFile(out);
console.log("Wrote", out);
