import type { Meta, StoryObj } from "@storybook/react-vite";

import { TextLink } from "./TextLink";

const meta = {
  title: "Actions/TextLink",
  component: TextLink,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    size: { control: "radio", options: ["body", "small", "caption"] },
  },
  args: {
    children: "Read more",
    href: "/post",
  },
} satisfies Meta<typeof TextLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const NavCaps: Story = {
  args: { children: "About", href: "/about", caps: true, size: "caption" },
};
