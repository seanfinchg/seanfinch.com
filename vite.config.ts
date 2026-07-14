import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { readdirSync, readFileSync, existsSync, statSync, mkdirSync, renameSync } from "fs";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));

const VIRTUAL_ID = "virtual:photo-manifest";
const RESOLVED_ID = "\0" + VIRTUAL_ID;

// Resized WebP derivatives generated at build time (dev + prod). Grid tiles use
// `thumb`, the lightbox/compare view uses `large`. Full-res originals are only
// downloaded on explicit request. Output lives in public/photography/_derived
// (gitignored) so originals stay the single source of truth and nothing extra
// is committed. Bump SUFFIX-less widths here to trade quality for bytes.
const DERIVATIVES = [
  { dir: "thumb", width: 500, quality: 72 },
  { dir: "large", width: 2000, quality: 80 },
] as const;
const DERIVED_DIR = "_derived";

async function generateDerivatives(photoDir: string): Promise<void> {
  if (!existsSync(photoDir)) return;
  const files = readdirSync(photoDir).filter((f) => f.toLowerCase().endsWith(".webp"));
  for (const cfg of DERIVATIVES) {
    mkdirSync(resolve(photoDir, DERIVED_DIR, cfg.dir), { recursive: true });
  }

  let made = 0;
  for (const f of files) {
    const srcPath = resolve(photoDir, f);
    const srcMtime = statSync(srcPath).mtimeMs;
    for (const cfg of DERIVATIVES) {
      const outPath = resolve(photoDir, DERIVED_DIR, cfg.dir, f);
      // Skip when an up-to-date derivative already exists (fast restarts).
      if (existsSync(outPath) && statSync(outPath).mtimeMs >= srcMtime) continue;
      try {
        await sharp(srcPath)
          .resize({ width: cfg.width, withoutEnlargement: true })
          .webp({ quality: cfg.quality })
          .toFile(outPath + ".tmp");
        renameSync(outPath + ".tmp", outPath);
        made++;
      } catch (e) {
        console.warn(`[photo-manifest] failed to resize ${f} (${cfg.dir}):`, (e as Error).message);
      }
    }
  }
  if (made > 0) console.log(`[photo-manifest] generated ${made} image derivative(s)`);
}

interface Stack {
  files: string[];
  cover: number;
}

function buildManifest(): Stack[] {
  const photoDir = resolve(__dirname, "public/photography");
  const exifPath = resolve(__dirname, "src/data/photo-exif.json");

  if (!existsSync(photoDir)) return [];

  const files = readdirSync(photoDir)
    .filter((f) => f.toLowerCase().endsWith(".webp"))
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

  const stacks = [...groups.values()].map((grp) => {
    const sortedFiles = [...grp].sort((a, b) => sortOrder(a) - sortOrder(b));
    // Default the tile/lightbox to the edited version when one exists.
    const editedIdx = sortedFiles.findIndex(isEdited);
    return { files: sortedFiles, cover: editedIdx >= 0 ? editedIdx : 0 };
  });

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

    load(id) {
      if (id !== RESOLVED_ID) return;
      const stacks = buildManifest();
      return `
export const photoStacks = ${JSON.stringify(stacks)};
export const PHOTOS_PER_PAGE = 20;
export const photoSrc = (f) => '/photography/' + encodeURIComponent(f);
export const photoThumb = (f) => '/photography/${DERIVED_DIR}/thumb/' + encodeURIComponent(f);
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
