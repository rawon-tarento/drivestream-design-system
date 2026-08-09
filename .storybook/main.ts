import type { StorybookConfig } from "@storybook/react-vite";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { mergeConfig } from "vite";
import react from "@vitejs/plugin-react";

const dirname = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../src/components/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: ["@storybook/addon-a11y", "@storybook/addon-docs"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      plugins: [react({ jsxRuntime: "automatic" })],
      resolve: {
        alias: {
          "@drivestream/ui": path.resolve(dirname, "../src/index.ts"),
        },
      },
      define: {
        "process.env": {},
      },
      esbuild: {
        jsx: "automatic",
      },
      optimizeDeps: {
        include: ["react", "react-dom", "react/jsx-runtime"],
      },
    });
  },
};

export default config;
