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
          'Renders the real Lumenis wordmark or Hero "L" SVG, bundled in — use it anywhere a logo goes; never redraw the mark.\n\n- `tone`: `black` on light surfaces, `white` on black or photography.\n- `variant="symbol"` is the Hero "L" — 1 row height in social formats, or a corner signature.\n- Minimum wordmark width on screen is 50px; keep clear space of one "x" on all sides.',
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
    tone: "black",
    variant: "wordmark",
    width: 180,
  },
} satisfies Meta<typeof Logotype>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Wordmark: Story = {};

export const Symbol: Story = {
  args: { variant: "symbol", width: 48 },
};

export const WhiteOnBlack: Story = {
  args: { tone: "white" },
  decorators: [
    (Story) => (
      <div style={{ background: "var(--surface-inverse)", padding: 24 }}>
        <Story />
      </div>
    ),
  ],
};
