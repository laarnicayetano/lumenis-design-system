import type { Meta, StoryObj } from "@storybook/react-vite";

import { HighlightBox } from "./HighlightBox";

const meta = {
  title: "Typography/HighlightBox",
  component: HighlightBox,
  parameters: {
    docs: {
      description: {
        component:
          "Boxes 1–2 words of a headline when type-weight contrast alone isn't enough.\n\nSocial media and digital advertising only, and sparingly. Outline by default; `filled` inverts it to the accent colour.",
      },
    },
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    children: "Discover",
  },
} satisfies Meta<typeof HighlightBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
