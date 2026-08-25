import React from "react";
export function SplitLayout({
  children,
  direction = "row",
  ratio = "1fr 1fr",
  reverse = false,
  gap = 0,
  minHeight = "620px",
  style,
  ...rest
}) {
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
  page: { background: "var(--surface-page)", color: "var(--text-primary)" },
  inverse: { background: "var(--surface-inverse)", color: "var(--text-inverse)" },
  accent: { background: "var(--accent)", color: "var(--accent-contrast)" },
  image: { background: "var(--surface-image)", color: "var(--text-primary)" },
};
export function SplitPanel({
  children,
  tone = "page",
  align = "flex-end",
  pad = "var(--space-9)",
  image,
  style,
  ...rest
}) {
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
