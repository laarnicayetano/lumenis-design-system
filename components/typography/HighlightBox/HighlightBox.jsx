import React from "react";
export function HighlightBox({ children, tone, filled = false, style, ...rest }) {
  const c = tone || "var(--accent)";
  return React.createElement(
    "span",
    {
      style: {
        display: "inline-block",
        padding: "0.02em 0.16em 0.06em",
        border: "var(--border-width-hairline) solid " + c,
        borderRadius: "var(--radius-none)",
        background: filled ? c : "transparent",
        color: filled ? "var(--accent-contrast)" : "inherit",
        ...style,
      },
      ...rest,
    },
    children,
  );
}
