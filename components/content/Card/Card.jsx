import React from "react";
const CARD_ELEVATIONS = {
  none: { boxShadow: "var(--shadow-none)" },
  sm: { boxShadow: "var(--shadow-sm)" },
  md: { boxShadow: "var(--shadow-md)" },
};
export function Card({
  children,
  padding = "var(--space-6)",
  elevation = "sm",
  tone = "page",
  style,
  ...rest
}) {
  const inverse = tone === "inverse";
  return React.createElement(
    "div",
    {
      style: {
        background: inverse ? "var(--surface-inverse)" : "var(--surface-page)",
        color: inverse ? "var(--text-inverse)" : "var(--text-primary)",
        border:
          "var(--border-width-hairline) solid " +
          (inverse ? "rgba(255,255,255,.16)" : "var(--border-subtle)"),
        borderRadius: "var(--radius-md)",
        padding,
        ...CARD_ELEVATIONS[elevation],
        ...style,
      },
      ...rest,
    },
    children,
  );
}
