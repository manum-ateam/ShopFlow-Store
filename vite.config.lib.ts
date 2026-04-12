import { defineConfig } from "vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

export default defineConfig(() => {
  return {
    build: {
      outDir: "pkg",
      target: "es2022",
      lib: {
        entry: {
          index: resolve(__dirname, "src/lib/index.ts"),
          react: resolve(__dirname, "src/lib/react-wrappers.tsx"),
        },
        formats: ["es", "cjs"],
        fileName: (format, entryName) => `${entryName}.${format === 'es' ? 'mjs' : 'cjs'}`,
      },
      rollupOptions: {
        external: [
          "@builder.io/qwik",
          "@builder.io/qwik-city",
          "@builder.io/qwik-react",
          "react",
          "react-dom",
        ],
      },
    },
    plugins: [
      qwikVite({
        vendorRoots: [resolve(__dirname, 'src/components')],
      }),
      tailwindcss(),
      tsconfigPaths()
    ],
  };
});
