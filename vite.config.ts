import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { readdirSync, readFileSync, writeFileSync, existsSync, statSync, mkdirSync, renameSync } from "fs";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));

const VIRTUAL_ID = "virtual:photo-manifest";
const RESOLVED_ID = "\0" + VIRTUAL_ID;

// Resized WebP derivatives generated at build time (dev + prod). Grid tiles use
// `thumb`; the lightbox picks `medium` or `large` via srcset (phones and 1x
// screens get `medium`), and the hero/compare view use `large`. Full-res originals are only
// downloaded on explicit request. Output lives in public/photography/_derived
// (gitignored) so originals stay the single source of truth and nothing extra
// is committed. Bump SUFFIX-less widths here to trade quality for bytes.
const DERIVATIVES = [
  { dir: "thumb", width: 500, quality: 72 },
  { dir: "medium", width: 1200, quality: 78 },
  { dir: "large", width: 2000, quality: 80 },
] as const;
const DERIVED_DIR = "_derived";

// Attribution embedded in every derivative. These are the files visitors
// actually see and save, so they carry the same Artist/Copyright as the
// originals (scripts/strip-exif.mjs) plus the IPTC fields Google Images shows
// as "Creator" / "Copyright notice" / "Credit". Nothing identifying (serials,
// MakerNotes, editing history) is ever written here.
const ARTIST = "Sean Finch";
const COPYRIGHT = "(c) Sean Finch. All rights reserved.";
const WEB_STATEMENT = "https://seanfinch.com/photography";
const DERIVED_EXIF = { IFD0: { Artist: ARTIST, Copyright: COPYRIGHT } };
const DERIVED_XMP = `<?xpacket begin="" id="W5M0MpCehiHzreSzNTczkc9d"?>
<x:xmpmeta xmlns:x="adobe:ns:meta/">
 <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
  <rdf:Description rdf:about=""
    xmlns:dc="http://purl.org/dc/elements/1.1/"
    xmlns:photoshop="http://ns.adobe.com/photoshop/1.0/"
    xmlns:xmpRights="http://ns.adobe.com/xap/1.0/rights/">
   <dc:creator><rdf:Seq><rdf:li>${ARTIST}</rdf:li></rdf:Seq></dc:creator>
   <dc:rights><rdf:Alt><rdf:li xml:lang="x-default">${COPYRIGHT}</rdf:li></rdf:Alt></dc:rights>
   <photoshop:Credit>${ARTIST}</photoshop:Credit>
   <xmpRights:Marked>True</xmpRights:Marked>
   <xmpRights:WebStatement>${WEB_STATEMENT}</xmpRights:WebStatement>
  </rdf:Description>
 </rdf:RDF>
</x:xmpmeta>
<?xpacket end="w"?>`;
// Bump when derivative settings or embedded metadata change, so existing
// derivatives are regenerated instead of skipped as "up to date".
const DERIVED_VERSION = "4-medium";

async function generateDerivatives(photoDir: string): Promise<void> {
  if (!existsSync(photoDir)) return;
  const files = readdirSync(photoDir).filter((f) => f.toLowerCase().endsWith(".webp"));
  for (const cfg of DERIVATIVES) {
    mkdirSync(resolve(photoDir, DERIVED_DIR, cfg.dir), { recursive: true });
  }
  const stampPath = resolve(photoDir, DERIVED_DIR, ".version");
  const stale = !existsSync(stampPath) || readFileSync(stampPath, "utf8").trim() !== DERIVED_VERSION;

  let made = 0;
  for (const f of files) {
    const srcPath = resolve(photoDir, f);
    const srcMtime = statSync(srcPath).mtimeMs;
    for (const cfg of DERIVATIVES) {
      const outPath = resolve(photoDir, DERIVED_DIR, cfg.dir, f);
      // Skip when an up-to-date derivative already exists (fast restarts).
      if (!stale && existsSync(outPath) && statSync(outPath).mtimeMs >= srcMtime) continue;
      try {
        // Decode to raw pixels first so nothing from the source (notably its
        // ~9 KB embedded EXIF preview) is carried into the output; only the
        // attribution below is written. Still a single lossy encode.
        const { data, info } = await sharp(srcPath)
          .resize({ width: cfg.width, withoutEnlargement: true })
          .raw()
          .toBuffer({ resolveWithObject: true });
        await sharp(data, { raw: { width: info.width, height: info.height, channels: info.channels } })
          .webp({ quality: cfg.quality })
          .withExif(DERIVED_EXIF)
          .withXmp(DERIVED_XMP)
          .toFile(outPath + ".tmp");
        renameSync(outPath + ".tmp", outPath);
        made++;
      } catch (e) {
        console.warn(`[photo-manifest] failed to resize ${f} (${cfg.dir}):`, (e as Error).message);
      }
    }
  }
  writeFileSync(stampPath, DERIVED_VERSION);
  if (made > 0) console.log(`[photo-manifest] generated ${made} image derivative(s)`);
}

interface Stack {
  /** Shared base filename (e.g. "DSC_8875") — stable key for URLs + photo-meta.json. */
  id: string;
  files: string[];
  cover: number;
  /** Pixel dimensions of the cover file, so the grid can lay out before load. */
  w: number;
  h: number;
}

async function buildManifest(): Promise<Stack[]> {
  const photoDir = resolve(__dirname, "public/photography");
  const exifPath = resolve(__dirname, "src/data/photo-exif.json");
  const hiddenPath = resolve(__dirname, "src/data/photo-hidden.json");

  if (!existsSync(photoDir)) return [];

  // Filenames listed in src/data/photo-hidden.json are kept in the repo but
  // excluded from the gallery.
  const hidden = new Set<string>(
    existsSync(hiddenPath)
      ? (JSON.parse(readFileSync(hiddenPath, "utf8")) as string[])
      : [],
  );

  const files = readdirSync(photoDir)
    .filter((f) => f.toLowerCase().endsWith(".webp") && !hidden.has(f))
    .sort();

  type ExifEntry = { DateTimeOriginal?: string } | undefined;
  const exifDb: Record<string, ExifEntry> = existsSync(exifPath)
    ? (JSON.parse(readFileSync(exifPath, "utf8")) as Record<string, ExifEntry>)
    : {};

  const getBase = (f: string): string =>
    f.replace(/\.webp$/i, "").replace(/[_-]edit(ed)?$/i, "").replace(/\s*\(\d+\)$/, "").trim();

  const sortOrder = (f: string): number => {
    const name = f.replace(/\.webp$/i, "");
    if (/[_-]edit(ed)?$/i.test(name)) return 100;
    const m = /\s*\((\d+)\)$/.exec(name);
    return m?.[1] != null ? parseInt(m[1], 10) : 0;
  };

  const isEdited = (f: string): boolean =>
    /[_-]edit(ed)?$/i.test(f.replace(/\.webp$/i, ""));

  const groups = new Map<string, string[]>();
  for (const f of files) {
    const base = getBase(f);
    const grp = groups.get(base);
    if (grp) grp.push(f);
    else groups.set(base, [f]);
  }

  const stacks = await Promise.all(
    [...groups.entries()].map(async ([id, grp]): Promise<Stack> => {
      const sortedFiles = [...grp].sort((a, b) => sortOrder(a) - sortOrder(b));
      // Default the tile/lightbox to the edited version when one exists.
      const editedIdx = sortedFiles.findIndex(isEdited);
      const cover = editedIdx >= 0 ? editedIdx : 0;
      // Header-only read; originals are already orientation-corrected by copy-exif.
      const meta = await sharp(resolve(photoDir, sortedFiles[cover])).metadata();
      return { id, files: sortedFiles, cover, w: meta.width, h: meta.height };
    }),
  );

  // Sort stacks newest-first by EXIF date, fall back to filename descending
  stacks.sort((a, b) => {
    const da = exifDb[a.files[0]]?.DateTimeOriginal ?? "";
    const db = exifDb[b.files[0]]?.DateTimeOriginal ?? "";
    if (da && db) return db.localeCompare(da);
    if (da) return -1;
    if (db) return 1;
    return b.files[0].localeCompare(a.files[0]);
  });

  return stacks;
}

function photoManifestPlugin(): Plugin {
  return {
    name: "photo-manifest",

    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED_ID;
    },

    async load(id) {
      if (id !== RESOLVED_ID) return;
      const stacks = await buildManifest();
      return `
export const photoStacks = ${JSON.stringify(stacks)};
export const PHOTOS_PER_PAGE = 24;
export const photoSrc = (f) => '/photography/' + encodeURIComponent(f);
export const photoThumb = (f) => '/photography/${DERIVED_DIR}/thumb/' + encodeURIComponent(f);
export const photoMedium = (f) => '/photography/${DERIVED_DIR}/medium/' + encodeURIComponent(f);
export const photoLarge = (f) => '/photography/${DERIVED_DIR}/large/' + encodeURIComponent(f);
export const photos = photoStacks.map(s => s.files[s.cover]);
`;
    },

    async buildStart() {
      await generateDerivatives(resolve(__dirname, "public/photography"));
    },

    configureServer(server) {
      const photoDir = resolve(__dirname, "public/photography");
      server.watcher.add(photoDir);

      const invalidate = (filePath: string): void => {
        if (!filePath.toLowerCase().endsWith(".webp")) return;
        // Ignore our own generated derivatives to avoid a reload loop.
        if (filePath.includes(DERIVED_DIR)) return;
        const mod = server.moduleGraph.getModuleById(RESOLVED_ID);
        if (mod) server.moduleGraph.invalidateModule(mod);
        server.ws.send({ type: "full-reload" });
      };

      server.watcher.on("add", invalidate);
      server.watcher.on("unlink", invalidate);
    },
  };
}

export default defineConfig({
  plugins: [photoManifestPlugin(), react(), tailwindcss()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "lucide-react": resolve(__dirname, "./src/lib/lucide-react.tsx"),
      sonner: resolve(__dirname, "./src/lib/sonner.ts"),
    },
  },
});
