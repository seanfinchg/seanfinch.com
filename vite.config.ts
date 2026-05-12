import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { readdirSync, readFileSync, existsSync } from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));

const VIRTUAL_ID = "virtual:photo-manifest";
const RESOLVED_ID = "\0" + VIRTUAL_ID;

function buildManifest() {
  const photoDir = resolve(__dirname, "public/photography");
  const exifPath = resolve(__dirname, "src/data/photo-exif.json");

  if (!existsSync(photoDir)) return [];

  const files = readdirSync(photoDir)
    .filter((f) => f.toLowerCase().endsWith(".webp"))
    .sort();

  const exifDb: Record<string, { DateTimeOriginal?: string }> = existsSync(exifPath)
    ? JSON.parse(readFileSync(exifPath, "utf8"))
    : {};

  const getBase = (f: string) =>
    f.replace(/\.webp$/i, "").replace(/[_-]edit(ed)?$/i, "").replace(/\s*\(\d+\)$/, "").trim();

  const sortOrder = (f: string) => {
    const name = f.replace(/\.webp$/i, "");
    if (/[_-]edit(ed)?$/i.test(name)) return 100;
    const m = name.match(/\s*\((\d+)\)$/);
    return m ? parseInt(m[1]) : 0;
  };

  const groups = new Map<string, string[]>();
  for (const f of files) {
    const base = getBase(f);
    if (!groups.has(base)) groups.set(base, []);
    groups.get(base)!.push(f);
  }

  const stacks = [...groups.values()].map((grp) => ({
    files: [...grp].sort((a, b) => sortOrder(a) - sortOrder(b)),
  }));

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
export const photos = photoStacks.map(s => s.files[0]);
`;
    },

    configureServer(server) {
      const photoDir = resolve(__dirname, "public/photography");
      server.watcher.add(photoDir);

      const invalidate = (filePath: string) => {
        if (!filePath.toLowerCase().endsWith(".webp")) return;
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
