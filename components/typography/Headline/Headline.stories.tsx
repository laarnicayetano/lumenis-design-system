import type { Meta, StoryObj } from "@storybook/react-vite";

import { Headline } from "./Headline";

const meta = {
  title: "Typography/Headline",
  component: Headline,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    size: { control: "radio", options: ["display","title","small"] },
    align: { control: "radio", options: ["left","right","center"] },
  },
  args: {
    children: "Unveil the best in you",
    heroL: "UNVEIL",
  },
} satisfies Meta<typeof Headline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
