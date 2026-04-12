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
        entry: resolve(__dirname, "src/lib/index.ts"),
        name: "ShopFlowUI",
        formats: ["es", "cjs"],
        fileName: (format) => `index.${format}.js`,
      },
      rollupOptions: {
        external: [
          "@builder.io/qwik",
          "@builder.io/qwik-city",
          "@builder.io/qwik-react",
          "react",
          "react-dom",
        ],
        output: {
          globals: {
            "@builder.io/qwik": "qwik",
            "react": "React",
          },
        },
      },
    },
    plugins: [
      tailwindcss(), 
      qwikVite({
        // Ensuring the library build is isolated
        srcDir: resolve(__dirname, "src"),
      }), 
      tsconfigPaths()
    ],
  };
});
