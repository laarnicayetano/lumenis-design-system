import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Logotype } from "./Logotype";

const meta = {
  title: "Brand/Logotype",
  component: Logotype,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    tone: { control: "radio", options: ["black", "white"] },
    variant: { control: "radio", options: ["wordmark", "symbol"] },
  },
  args: {
    // Storybook serves assets/ under /foundations/assets, see .storybook/main.ts staticDirs.
    assetBase: "/foundations/assets",
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
