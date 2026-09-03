import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { ProductCard } from "./ProductCard";

const meta = {
  title: "Components/ProductCard",
  component: ProductCard,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    name: "Stellar M22™",
    market: "Aesthetics · IPL platform",
  },
} satisfies Meta<typeof ProductCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Placeholder: Story = {
  render: (args) => (
    <div style={{ width: 220 }}>
      <ProductCard {...args} />
    </div>
  ),
};
