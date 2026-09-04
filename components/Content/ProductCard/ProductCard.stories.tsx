import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { ProductCard } from "./ProductCard";

const meta = {
  title: "Content/ProductCard",
  component: ProductCard,
  parameters: {
    docs: {
      description: {
        component:
          "The product tile used in the OUR PRODUCTS grid — device shot on photography grey, name in caps beneath.\n\nLeave `image` off and the tile shows a labelled placeholder rather than inventing artwork. Portrait 252×391 ratio, matching the site's device shots.",
      },
    },
    layout: "centered",
  },
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
