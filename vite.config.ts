import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "lucide-react": resolve(__dirname, "./src/lib/lucide-react.tsx"),
      sonner: resolve(__dirname, "./src/lib/sonner.ts"),
    },
  },
});
