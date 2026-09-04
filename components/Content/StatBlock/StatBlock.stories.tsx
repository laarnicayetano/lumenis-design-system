import type { Meta, StoryObj } from "@storybook/react-vite";

import { StatBlock } from "./StatBlock";

const meta = {
  title: "Content/StatBlock",
  component: StatBlock,
  parameters: {
    docs: {
      description: {
        component:
          "Proof-point figure used in the WHY LUMENIS band.\n\nOnly use figures the brand publishes: 88+ countries, 90k+ devices, 60+ years, 500+ clinical publications.",
      },
    },
    layout: "centered",
  },
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
