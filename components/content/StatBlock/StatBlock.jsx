import React from "react";
import { Eyebrow } from "../../typography/Eyebrow/Eyebrow";
export function StatBlock({ value, label, detail, tone = "inherit", style, ...rest }) {
  return React.createElement(
    "div",
    {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-3)",
        color: tone === "inherit" ? "inherit" : tone,
        ...style,
      },
      ...rest,
    },
    React.createElement(
      "span",
      {
        style: {
          fontFamily: "var(--font-sans)",
          fontSize: "var(--text-title-sm)",
          lineHeight: "var(--leading-title)",
        },
      },
      value,
    ),
    React.createElement(
      "div",
      { style: { display: "flex", flexDirection: "column", gap: "var(--space-1)" } },
      React.createElement(Eyebrow, null, label),
      detail
        ? React.createElement(
            "span",
            {
              style: {
                fontSize: "var(--text-form)",
                lineHeight: "var(--leading-form)",
                opacity: 0.7,
              },
            },
            detail,
          )
        : null,
    ),
  );
}
