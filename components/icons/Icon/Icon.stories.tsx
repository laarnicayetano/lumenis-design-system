import type { Meta, StoryObj } from "@storybook/react-vite";

import { Icon } from "./Icon";

const meta = {
  title: "Components/Icon",
  component: Icon,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    scale: { control: "radio", options: ["small", "large"] },
  },
  args: {
    name: "sparkle",
    scale: "small",
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Large: Story = {
  args: { name: "sparkle", scale: "large", tone: "var(--accent)" },
};
