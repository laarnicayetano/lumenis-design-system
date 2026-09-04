import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "./Button";

const meta = {
  title: "Actions/Button",
  component: Button,
  parameters: {
    docs: {
      description: {
        component:
          "The brand CTA — all caps, squared, hairline border. Use for every call to action.\n\n- Copy is short and imperative: DISCOVER MORE, LEARN MORE, DOWNLOAD KIT, READ MORE.\n- Leave clear space of one x-height above/below and 2x either side; keep at least one button-height between a headline and its CTA.\n- `accent` variants pick up `--accent` from the surrounding `[data-subbrand]` scope.",
      },
    },
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "inverse", "inverse-outline", "accent", "accent-outline"],
    },
    size: {
      control: "radio",
      options: ["md", "sm"],
    },
    disabled: { control: "boolean" },
  },
  args: {
    children: "Discover more",
    variant: "primary",
    size: "md",
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Secondary: Story = {
  args: { variant: "secondary", children: "Download kit" },
};

export const Accent: Story = {
  args: { variant: "accent", children: "Book a demo" },
};

export const Disabled: Story = {
  args: { disabled: true },
};
