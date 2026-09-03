import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Rays } from "./Rays";

const meta = {
  title: "Components/Rays",
  component: Rays,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
  argTypes: {
    tone: { control: "radio", options: ["blue", "light"] },
    origin: { control: "radio", options: ["bottom-left", "right"] },
    clear: { control: "select", options: [null, "center", "left", "right"] },
  },
  args: {
    tone: "blue",
    origin: "bottom-left",
  },
  render: (args) => (
    <div style={{ position: "relative", width: "100%", height: 400, background: "#000" }}>
      <Rays {...args} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
    </div>
  ),
} satisfies Meta<typeof Rays>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ClearedCenter: Story = {
  args: { clear: "center" },
};

export const FromRight: Story = {
  args: { origin: "right" },
};
