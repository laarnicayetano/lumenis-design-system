import type { Meta, StoryObj } from "@storybook/react-vite";

import { Switch } from "./Switch";

const meta = {
  title: "Forms/Switch",
  component: Switch,
  parameters: {
    docs: {
      description: {
        component:
          'On/off toggle — the pill track is a functional exception to the squared brand language, not decoration.\n\nUse `tone="inverse"` inside black panels. On-state fills with `--accent`, so it recolors inside a `[data-subbrand]` scope.',
      },
    },
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    tone: { control: "radio", options: ["page", "inverse"] },
  },
  args: {
    label: "Enable OPT mode",
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
