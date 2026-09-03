import type { Meta, StoryObj } from "@storybook/react-vite";

import { StatBlock } from "./StatBlock";

const meta = {
  title: "Components/StatBlock",
  component: StatBlock,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    value: "90k+",
    label: "Devices",
    detail: "Installed worldwide",
  },
} satisfies Meta<typeof StatBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
