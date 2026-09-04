import type { Meta, StoryObj } from "@storybook/react-vite";

import { Icon } from "./Icon";

const meta = {
  title: "Icons/Icon",
  component: Icon,
  parameters: {
    docs: {
      description: {
        component:
          "Line icon in the brand's clean, even-stroke style. Two scales only: small (beside type) and large (expressive, inside the composition).\n\n**Substitution:** Lumenis' own icon illustrations were not included in the supplied assets. This wraps Phosphor Icons Thin/Light from CDN as the nearest match to the 1pt/2pt line style in the guidelines. Load the Phosphor stylesheets in the host page. Never hand-draw a substitute icon, and never use emoji.",
      },
    },
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    scale: { control: "radio", options: ["small", "large"] },
  },
  args: {
    name: "sparkle",
    scale: "small",
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Large: Story = {
  args: { name: "sparkle", scale: "large", tone: "var(--accent)" },
};
