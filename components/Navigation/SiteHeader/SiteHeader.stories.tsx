import type { Meta, StoryObj } from "@storybook/react-vite";

import { SiteHeader } from "./SiteHeader";

const meta = {
  title: "Navigation/SiteHeader",
  component: SiteHeader,
  parameters: {
    docs: {
      description: {
        component:
          'The corporate site header — wordmark left, all-caps nav right, hairline rule beneath.\n\nNav labels are always uppercase. Use `tone="inverse"` only when the header sits on a black hero.',
      },
    },
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    tone: { control: "radio", options: ["page", "inverse"] },
  },
  args: {
    nav: [
      { id: "aesthetics", label: "Aesthetics" },
      { id: "vision", label: "Vision" },
    ],
    active: "aesthetics",
  },
} satisfies Meta<typeof SiteHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
