import type { Meta, StoryObj } from "@storybook/react-vite";

import { TextField } from "./TextField";

const meta = {
  title: "Forms/TextField",
  component: TextField,
  parameters: {
    docs: {
      description: {
        component:
          'The only input treatment in the system: caps label, bordered box with a soft radius and an accent focus glow.\n\nUse `tone="inverse"` inside black panels and footers.',
      },
    },
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    tone: { control: "radio", options: ["page", "inverse"] },
  },
  args: {
    label: "Work email",
    type: "email",
    required: true,
  },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
