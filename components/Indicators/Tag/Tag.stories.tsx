import type { Meta, StoryObj } from "@storybook/react-vite";

import { Tag } from "./Tag";

const meta = {
  title: "Indicators/Tag",
  component: Tag,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          'Selectable filter chip — squared and hairline-bordered. Selected state fills with ink/paper (not `--accent`) so it reads as a pressed toggle, matching how other selected states in the system work. Use `tone="inverse"` over black/photography.',
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    tone: { control: "radio", options: ["page", "inverse"] },
  },
  args: {
    children: "Aesthetics",
  },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
