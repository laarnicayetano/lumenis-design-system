import type { Meta, StoryObj } from "@storybook/react-vite";

import { Select } from "./Select";

const meta = {
  title: "Forms/Select",
  component: Select,
  parameters: {
    docs: {
      description: {
        component:
          'The dropdown counterpart to TextField — same bordered/rounded treatment, caret from the Icon set.\n\n`options` accepts plain strings or `{ label, value }`. Use `tone="inverse"` inside black panels.',
      },
    },
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    tone: { control: "radio", options: ["page", "inverse"] },
  },
  args: {
    label: "Practice type",
    placeholder: "Choose one",
    options: ["Dermatology", "Med spa", "Plastic surgery"],
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
