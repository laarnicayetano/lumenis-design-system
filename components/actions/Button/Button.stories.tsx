import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "./Button";

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "inverse",
        "inverse-outline",
        "accent",
        "accent-outline",
      ],
    },
    size: {
      control: "radio",
      options: ["md", "sm"],
    },
    disabled: { control: "boolean" },
  },
  args: {
    children: "Discover more",
    variant: "primary",
    size: "md",
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Secondary: Story = {
  args: { variant: "secondary", children: "Download kit" },
};

export const Accent: Story = {
  args: { variant: "accent", children: "Book a demo" },
};

export const Disabled: Story = {
  args: { disabled: true },
};
