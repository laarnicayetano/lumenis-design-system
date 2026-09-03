import type { Meta, StoryObj } from "@storybook/react-vite";

import { Radio } from "./Radio";

const meta = {
  title: "Components/Radio",
  component: Radio,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    tone: { control: "radio", options: ["page","inverse"] },
  },
  args: {
    name: "skinType",
    label: "Type III",
  },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
