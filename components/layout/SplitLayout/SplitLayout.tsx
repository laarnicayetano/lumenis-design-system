import React from "react";

/**
 * The split composition every Lumenis format is built from.
 */
export interface SplitLayoutProps {
  children?: React.ReactNode;
  /** Split the format left/right or top/bottom. */
  direction?: "row" | "column";
  /** CSS grid track sizes, e.g. "1fr 1fr" or "5fr 7fr". */
  ratio?: string;
  reverse?: boolean;
  gap?: number | string;
  minHeight?: number | string;
  style?: React.CSSProperties;
}

export interface SplitPanelProps {
  children?: React.ReactNode;
  /** Background treatment for this half. */
  tone?: "page" | "inverse" | "accent" | "image";
  align?: "flex-start" | "center" | "flex-end" | "space-between";
  pad?: number | string;
  /** Background image URL for a photography half. */
  image?: string;
  style?: React.CSSProperties;
}

export function SplitLayout({
  children,
  direction = "row",
  ratio = "1fr 1fr",
  reverse = false,
  gap = 0,
  minHeight = "620px",
  style,
  ...rest
}: SplitLayoutProps) {
  const tracks = reverse ? ratio.split(" ").reverse().join(" ") : ratio;
  return React.createElement(
    "div",
    {
      style: {
        display: "grid",
        gridTemplateColumns: direction === "row" ? tracks : "1fr",
        gridTemplateRows: direction === "column" ? tracks : "auto",
        gap,
        minHeight,
        ...style,
      },
      ...rest,
    },
    children,
  );
}
const PANEL_TONES = {
  page: { backgroundColor: "var(--surface-page)", color: "var(--text-primary)" },
  inverse: { backgroundColor: "var(--surface-inverse)", color: "var(--text-inverse)" },
  accent: { backgroundColor: "var(--accent)", color: "var(--accent-contrast)" },
  image: { backgroundColor: "var(--surface-image)", color: "var(--text-primary)" },
};
export function SplitPanel({
  children,
  tone = "page",
  align = "flex-end",
  pad = "var(--space-9)",
  image,
  style,
  ...rest
}: SplitPanelProps) {
  return React.createElement(
    "div",
    {
      style: {
        display: "flex",
        flexDirection: "column",
        justifyContent: align,
        gap: "var(--space-5)",
        padding: pad,
        backgroundImage: image ? "url(" + image + ")" : void 0,
        backgroundSize: "cover",
        backgroundPosition: "center",
        ...PANEL_TONES[tone],
        ...style,
      },
      ...rest,
    },
    children,
  );
}
