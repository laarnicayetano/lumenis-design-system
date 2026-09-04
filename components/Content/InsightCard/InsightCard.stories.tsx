import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { InsightCard } from "./InsightCard";

const meta = {
  title: "Content/InsightCard",
  component: InsightCard,
  parameters: {
    docs: {
      description: {
        component:
          "Article tile for the Aesthetics / Vision resource hubs.\n\nArticle titles keep their real headline casing; topic tags are uppercased by the component.",
      },
    },
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    title: "FoLix Named Best Laser Treatment for Hair Loss Two Years Running",
    topics: ["FoLix", "Hair Loss", "News"],
  },
} satisfies Meta<typeof InsightCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div style={{ width: 320 }}>
      <InsightCard {...args} />
    </div>
  ),
};
