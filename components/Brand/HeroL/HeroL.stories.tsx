import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { HeroL } from "./HeroL";

const meta = {
  title: "Brand/HeroL",
  component: HeroL,
  parameters: {
    docs: {
      description: {
        component:
          'The slanted serif "L" from the wordmark, usable inline inside a headline.\n\nUse in 1–2 words of a message only. Never combine the Hero "L" treatment with an Arizona Mix highlight in the same headline.',
      },
    },
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof HeroL>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const InHeadline: Story = {
  render: () => (
    <h1 style={{ fontFamily: "var(--font-sans)", fontSize: 40, margin: 0 }}>
      UNVEI
      <HeroL />
      THE BEST IN YOU
    </h1>
  ),
};
