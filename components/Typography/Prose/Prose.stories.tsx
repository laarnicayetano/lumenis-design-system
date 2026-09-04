import type { Meta, StoryObj } from "@storybook/react-vite";

import { Prose } from "./Prose";

const meta = {
  title: "Typography/Prose",
  component: Prose,
  parameters: {
    docs: {
      description: {
        component:
          "Sentence-case running copy. Subtitles sit at 20–40% of the title size; paragraphs at 50–65% of the subtitle.\n\nNever set body copy in all caps, and never in Arizona Mix.",
      },
    },
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    size: { control: "radio", options: ["subtitle", "body", "small"] },
  },
  args: {
    children:
      "Lumenis develops life-changing, minimally invasive solutions for medical aesthetics, surgical, and ophthalmic applications.",
    size: "body",
  },
} satisfies Meta<typeof Prose>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Subtitle: Story = {
  args: {
    size: "subtitle",
    children: "Over 60 years of industry leadership and innovation",
  },
};

export const Small: Story = {
  args: { size: "small" },
};
