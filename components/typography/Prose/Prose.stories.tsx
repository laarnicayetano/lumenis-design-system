import type { Meta, StoryObj } from "@storybook/react-vite";

import { Prose } from "./Prose";

const meta = {
  title: "Components/Prose",
  component: Prose,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  argTypes: {
    size: { control: "radio", options: ["subtitle", "body", "small"] },
  },
  args: {
    children: "Lumenis develops life-changing, minimally invasive solutions for medical aesthetics, surgical, and ophthalmic applications.",
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
