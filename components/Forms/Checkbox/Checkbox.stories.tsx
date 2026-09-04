import type { Meta, StoryObj } from "@storybook/react-vite";

import { Checkbox } from "./Checkbox";

const meta = {
  title: "Forms/Checkbox",
  component: Checkbox,
  parameters: {
    docs: {
      description: {
        component:
          'A softly-rounded, hairline checkbox — no fill until checked.\n\nUse `tone="inverse"` inside black panels. Checked state fills with `--accent`, so it recolors inside a `[data-subbrand]` scope.',
      },
    },
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    tone: { control: "radio", options: ["page", "inverse"] },
  },
  args: {
    label: "Send me clinical updates",
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
