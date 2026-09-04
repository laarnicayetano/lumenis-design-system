import type { Meta, StoryObj } from "@storybook/react-vite";

import { Quote } from "./Quote";

const meta = {
  title: "Content/Quote",
  component: Quote,
  parameters: {
    docs: {
      description: {
        component:
          "Practitioner testimonial — the brand's only pull-quote treatment.\n\nQuote text stays sentence case at subtitle size. No decorative quote marks, no portrait.",
      },
    },
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    tone: { control: "radio", options: ["page", "inverse"] },
  },
  args: {
    attribution: "Evie Rose",
    role: "Aesthetic Clinic, London",
    children:
      "Lumenis products have been such a success in my clinic, achieving amazing results with my clients and are extremely cost effective.",
  },
} satisfies Meta<typeof Quote>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
