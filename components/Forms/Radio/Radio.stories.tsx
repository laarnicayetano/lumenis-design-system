import type { Meta, StoryObj } from "@storybook/react-vite";

import { Radio } from "./Radio";

const meta = {
  title: "Forms/Radio",
  component: Radio,
  parameters: {
    docs: {
      description: {
        component:
          "Circular is the one exception to the squared brand language — it's a radio's universal affordance, not decoration.\n\nGroup radios by a shared `name`. Use `tone=\"inverse\"` inside black panels.",
      },
    },
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    tone: { control: "radio", options: ["page", "inverse"] },
  },
  args: {
    name: "skinType",
    label: "Type III",
  },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
