import type { Preview } from "@storybook/react-vite";

// The design system's real token chain, so components preview on-brand
// instead of unstyled — same file scripts/build.mjs's site loads.
import "../styles.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      test: "todo",
    },
  },
};

export default preview;
