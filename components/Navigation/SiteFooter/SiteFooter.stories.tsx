import type { Meta, StoryObj } from "@storybook/react-vite";

import { SiteFooter } from "./SiteFooter";

const meta = {
  title: "Navigation/SiteFooter",
  component: SiteFooter,
  parameters: {
    docs: {
      description: {
        component:
          "The black corporate footer with link columns, legal line, and social glyphs.\n\nColumn headings are all caps; the links under them stay in sentence case.",
      },
    },
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    columns: [{ title: "Aesthetics", links: ["Hair Removal", "Body", "Skin"] }],
    social: ["facebook-logo", "instagram-logo", "linkedin-logo"],
    policies: ["Privacy Statement", "Terms of Use"],
  },
} satisfies Meta<typeof SiteFooter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
