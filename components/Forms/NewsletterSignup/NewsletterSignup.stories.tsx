import type { Meta, StoryObj } from "@storybook/react-vite";

import { NewsletterSignup } from "./NewsletterSignup";

const meta = {
  title: "Forms/NewsletterSignup",
  component: NewsletterSignup,
  parameters: {
    docs: {
      description: {
        component:
          "Email capture block used at the foot of corporate and resource pages.\n\nKeeps its own submitted state for prototypes. The consent line is required copy — don't drop it.",
      },
    },
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    tone: { control: "radio", options: ["page", "inverse"] },
  },
  args: {},
} satisfies Meta<typeof NewsletterSignup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
