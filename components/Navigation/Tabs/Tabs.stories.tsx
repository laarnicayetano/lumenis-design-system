import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Tabs } from "./Tabs";

const meta = {
  title: "Navigation/Tabs",
  component: Tabs,
  parameters: {
    docs: {
      description: {
        component:
          'Underline tab bar — same caps/underline treatment as the SiteHeader nav.\n\n`tabs` accepts plain strings or `{ id, label }`. The active tab\'s underline is `--accent`, so it recolors inside a `[data-subbrand]` scope. Use `tone="inverse"` over black/photography.',
      },
    },
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    tone: { control: "radio", options: ["page", "inverse"] },
  },
  args: {
    tabs: ["Overview", "Clinical results", "Specs"],
    active: "Overview",
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [active, setActive] = useState(args.active);
    return <Tabs {...args} active={active} onChange={setActive} />;
  },
};

export const Inverse: Story = {
  args: { tone: "inverse" },
  render: (args) => {
    const [active, setActive] = useState(args.active);
    return (
      <div style={{ background: "var(--surface-inverse)", padding: 24 }}>
        <Tabs {...args} active={active} onChange={setActive} />
      </div>
    );
  },
};
