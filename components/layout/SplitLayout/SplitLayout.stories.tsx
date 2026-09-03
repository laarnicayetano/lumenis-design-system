import type { Meta, StoryObj } from "@storybook/react-vite";

import { SplitLayout } from "./SplitLayout";

const meta = {
  title: "Components/SplitLayout",
  component: SplitLayout,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    direction: { control: "radio", options: ["row","column"] },
  },
  args: {
    ratio: "5fr 7fr",
  },
} satisfies Meta<typeof SplitLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
