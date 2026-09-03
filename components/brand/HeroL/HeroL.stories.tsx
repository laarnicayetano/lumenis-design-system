import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { HeroL } from "./HeroL";

const meta = {
  title: "Components/HeroL",
  component: HeroL,
  parameters: { layout: "centered" },
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
