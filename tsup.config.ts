import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    chrome: "src/chrome/index.jsx",
  },
  format: ["esm"],
  dts: {
    entry: "src/index.ts",
  },
  sourcemap: true,
  clean: true,
  splitting: false,
  treeshake: true,
  // Next App Router: package is client UI; keep directive on the bundle entry.
  banner: {
    js: '"use client";',
  },
  external: [
    "react",
    "react-dom",
    "react/jsx-runtime",
    /^@radix-ui\//,
    "lucide-react",
    "class-variance-authority",
    "clsx",
    "tailwind-merge",
    "@drivestream/ui",
  ],
  esbuildOptions(options) {
    options.jsx = "automatic";
  },
});
