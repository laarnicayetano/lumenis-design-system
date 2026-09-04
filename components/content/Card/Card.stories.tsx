import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Card } from "./Card";
import { StatBlock } from "../StatBlock/StatBlock";

const meta = {
  title: "Content/Card",
  component: Card,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    elevation: { control: "radio", options: ["none", "sm", "md"] },
    tone: { control: "radio", options: ["page", "inverse"] },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <StatBlock value="88+" label="Countries" detail="Worldwide" />,
  },
};

export const Elevated: Story = {
  args: { elevation: "md", children: "Elevated / hover state" },
};

export const Flat: Story = {
  args: { elevation: "none", children: "Flat bordered block, no shadow" },
};
