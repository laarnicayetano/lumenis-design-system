import type { Meta, StoryObj } from "@storybook/react-vite";

import { Switch } from "./Switch";

const meta = {
  title: "Forms/Switch",
  component: Switch,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    tone: { control: "radio", options: ["page","inverse"] },
  },
  args: {
    label: "Enable OPT mode",
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
