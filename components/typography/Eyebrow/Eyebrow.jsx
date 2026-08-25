import React from "react";
export function Eyebrow({ children, tone = "inherit", style, ...rest }) {
  return React.createElement(
    "p",
    {
      style: {
        margin: 0,
        fontFamily: "var(--font-sans)",
        fontSize: "var(--text-caption)",
        lineHeight: "var(--leading-caption)",
        letterSpacing: "var(--tracking-caption)",
        textTransform: "var(--case-caption)",
        color: tone === "inherit" ? "inherit" : tone,
        ...style,
      },
      ...rest,
    },
    children,
  );
}
