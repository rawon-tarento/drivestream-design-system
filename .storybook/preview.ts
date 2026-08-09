import type { Preview } from "@storybook/react-vite";
import "../src/styles/index.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: "padded",
    backgrounds: {
      options: {
        "ops-surface": { name: "ops-surface", value: "var(--background)" },
        "ops-raised": { name: "ops-raised", value: "var(--surface)" },
        "ops-alt": { name: "ops-alt", value: "var(--surface-alt)" },
      },
    },
    a11y: {
      test: "todo",
    },
  },
  initialGlobals: {
    backgrounds: {
      value: "ops-surface",
    },
  },
};

export default preview;
