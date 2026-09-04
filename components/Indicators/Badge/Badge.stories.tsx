import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Badge } from "./Badge";

const meta = {
  title: "Indicators/Badge",
  component: Badge,
  parameters: {
    docs: {
      description: {
        component:
          "Small status/metadata label — squared and hairline-bordered, not a filled pill.\n\nUse sparingly next to a product name, spec line, or list item — not as a large fill. `accent` tone picks up `--accent` from the surrounding `[data-subbrand]` scope.",
      },
    },
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    tone: { control: "select", options: ["neutral", "accent", "inverse"] },
  },
  args: {
    children: "New",
    tone: "neutral",
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Accent: Story = {
  args: { tone: "accent", children: "FDA cleared" },
};

export const Inverse: Story = {
  args: { tone: "inverse", children: "New" },
  decorators: [
    (Story) => (
      <div style={{ background: "var(--surface-inverse)", padding: 24 }}>
        <Story />
      </div>
    ),
  ],
};
