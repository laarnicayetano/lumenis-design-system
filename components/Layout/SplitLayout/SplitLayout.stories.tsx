import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { SplitLayout, SplitPanel } from "./SplitLayout";

const meta = {
  title: "Layout/SplitLayout",
  component: SplitLayout,
  parameters: {
    docs: {
      description: {
        component:
          'The brand\'s core composition: split the format in two — type on one side, photography or a single accent on the other.\n\nUse `direction="column"` for the horizontal split. Type panels sit on white, black, or one accent colour — never over a busy photograph.',
      },
    },
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    direction: { control: "radio", options: ["row", "column"] },
  },
  args: {
    ratio: "5fr 7fr",
    minHeight: "320px",
    style: { width: "560px" },
    children: (
      <>
        <SplitPanel tone="page">
          <span>Left panel</span>
        </SplitPanel>
        <SplitPanel tone="inverse">
          <span>Right panel</span>
        </SplitPanel>
      </>
    ),
  },
} satisfies Meta<typeof SplitLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
