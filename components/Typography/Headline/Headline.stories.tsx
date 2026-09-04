import type { Meta, StoryObj } from "@storybook/react-vite";

import { Headline } from "./Headline";

const meta = {
  title: "Typography/Headline",
  component: Headline,
  parameters: {
    docs: {
      description: {
        component:
          "The brand's all-caps display headline — use for every page and section title.\n\n- Pass `heroL` OR `mix`, never both, and only for 1–2 words.\n- Titles are always uppercase, always left or right aligned (centre only for a short standalone line).\n- Leading is 88–92% of the font size; tracking is 0.",
      },
    },
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: { control: "radio", options: ["display", "title", "small"] },
    align: { control: "radio", options: ["left", "right", "center"] },
  },
  args: {
    children: "Unveil the best in you",
    heroL: "UNVEIL",
  },
} satisfies Meta<typeof Headline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
