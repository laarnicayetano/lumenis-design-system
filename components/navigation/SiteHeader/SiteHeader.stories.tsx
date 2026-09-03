import type { Meta, StoryObj } from "@storybook/react-vite";

import { SiteHeader } from "./SiteHeader";

const meta = {
  title: "Components/SiteHeader",
  component: SiteHeader,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    tone: { control: "radio", options: ["page","inverse"] },
  },
  args: {
    nav: [{ id: 'aesthetics', label: 'Aesthetics' }, { id: 'vision', label: 'Vision' }],
    active: "aesthetics",
  },
} satisfies Meta<typeof SiteHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
