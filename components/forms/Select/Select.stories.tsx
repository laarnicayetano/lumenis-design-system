import type { Meta, StoryObj } from "@storybook/react-vite";

import { Select } from "./Select";

const meta = {
  title: "Components/Select",
  component: Select,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    tone: { control: "radio", options: ["page","inverse"] },
  },
  args: {
    label: "Practice type",
    placeholder: "Choose one",
    options: ['Dermatology', 'Med spa', 'Plastic surgery'],
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
