import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Logotype } from "./Logotype";

const meta = {
  title: "Brand/Logotype",
  component: Logotype,
  parameters: {
    docs: {
      description: {
        component:
          'Renders the supplied Lumenis wordmark or Hero "L" SVG — use it anywhere a logo goes; never redraw the mark.\n\n- `tone`: `black` on light surfaces, `white` on black or photography.\n- `variant="symbol"` is the Hero "L" — 1 row height in social formats, or a corner signature.\n- Pass `src` with the exact path to the SVG if the default `assets/logo/<variant>-<tone>.svg` (relative to the consuming page) doesn\'t resolve.\n- Minimum wordmark width on screen is 50px; keep clear space of one "x" on all sides.',
      },
    },
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    tone: { control: "radio", options: ["black", "white"] },
    variant: { control: "radio", options: ["wordmark", "symbol"] },
  },
  args: {
    // Storybook serves assets/ under /foundations/assets, see .storybook/main.ts staticDirs.
    src: "/foundations/assets/logo/wordmark-black.svg",
    tone: "black",
    variant: "wordmark",
    width: 180,
  },
} satisfies Meta<typeof Logotype>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Wordmark: Story = {};

export const Symbol: Story = {
  args: { variant: "symbol", width: 48, src: "/foundations/assets/logo/symbol-black.svg" },
};

export const WhiteOnBlack: Story = {
  args: { tone: "white", src: "/foundations/assets/logo/wordmark-white.svg" },
  decorators: [
    (Story) => (
      <div style={{ background: "var(--surface-inverse)", padding: 24 }}>
        <Story />
      </div>
    ),
  ],
};
