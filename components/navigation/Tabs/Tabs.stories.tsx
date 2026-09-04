import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Tabs } from "./Tabs";

const meta = {
  title: "Navigation/Tabs",
  component: Tabs,
  parameters: { layout: "padded" },
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
