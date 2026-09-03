import type { Meta, StoryObj } from "@storybook/react-vite";

import { HighlightBox } from "./HighlightBox";

const meta = {
  title: "Components/HighlightBox",
  component: HighlightBox,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    children: "Discover",

  },
} satisfies Meta<typeof HighlightBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
