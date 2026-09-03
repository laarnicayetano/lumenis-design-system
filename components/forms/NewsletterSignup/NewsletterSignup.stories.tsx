import type { Meta, StoryObj } from "@storybook/react-vite";

import { NewsletterSignup } from "./NewsletterSignup";

const meta = {
  title: "Components/NewsletterSignup",
  component: NewsletterSignup,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    tone: { control: "radio", options: ["page","inverse"] },
  },
  args: {

  },
} satisfies Meta<typeof NewsletterSignup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
