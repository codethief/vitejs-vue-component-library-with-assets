import { fileURLToPath, URL } from "node:url";
import path from "node:path";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { emitSVGsImportedWithUrlParam } from "./plugins/emit-svgs";

// https://vite.dev/config/
export default defineConfig({
  plugins: [emitSVGsImportedWithUrlParam(), vue()],
  build: {
    outDir: "dist",
    emptyOutDir: true,
    lib: {
      entry: {
        index: path.resolve(__dirname, "src/index.ts"),
        MyComponent: path.resolve(__dirname, "src/MyComponent.vue"),
      },
      formats: ["es"],
    },
    rollupOptions: {
      external: ["vue"], // Don't bundle Vue, see https://vite.dev/guide/build.html#library-mode
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
