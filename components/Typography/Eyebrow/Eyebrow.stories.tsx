import type { Meta, StoryObj } from "@storybook/react-vite";

import { Eyebrow } from "./Eyebrow";

const meta = {
  title: "Typography/Eyebrow",
  component: Eyebrow,
  parameters: {
    docs: {
      description: {
        component:
          "Small all-caps line used for captions, specs, and section kickers above a headline.",
      },
    },
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    children: "New age of dry eyes solution",
  },
} satisfies Meta<typeof Eyebrow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
