import React from "react";
export function Tag({ children, selected = false, onClick, tone = "page", style, ...rest }) {
  const inverse = tone === "inverse";
  const line = inverse ? "var(--border-hairline-inverse)" : "var(--border-subtle)";
  const fg = inverse ? "var(--text-inverse)" : "var(--text-primary)";
  const selectedBg = inverse ? "var(--lum-white)" : "var(--lum-black)";
  const selectedFg = inverse ? "var(--lum-black)" : "var(--lum-white)";
  return React.createElement(
    "span",
    {
      onClick,
      style: {
        display: "inline-flex",
        alignItems: "center",
        padding: "8px 16px",
        fontFamily: "var(--font-sans)",
        fontSize: "var(--text-caption)",
        letterSpacing: "var(--tracking-caption)",
        border: "var(--border-width-hairline) solid " + (selected ? selectedBg : line),
        borderRadius: "var(--radius-pill)",
        cursor: onClick ? "pointer" : "default",
        background: selected ? selectedBg : "transparent",
        color: selected ? selectedFg : fg,
        transition:
          "background var(--dur-fast) var(--ease-brand), color var(--dur-fast) var(--ease-brand), border-color var(--dur-fast) var(--ease-brand)",
        ...style,
      },
      ...rest,
    },
    children,
  );
}
