import React from "react";
import { Eyebrow } from "../../typography/Eyebrow/Eyebrow";
export function Quote({ children, attribution, role, tone = "page", style, ...rest }) {
  const inverse = tone === "inverse";
  return React.createElement(
    "blockquote",
    {
      style: {
        margin: 0,
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-5)",
        color: inverse ? "var(--text-inverse)" : "var(--text-primary)",
        maxWidth: "46ch",
        ...style,
      },
      ...rest,
    },
    React.createElement(
      "p",
      {
        style: {
          margin: 0,
          fontFamily: "var(--font-sans)",
          fontSize: "var(--text-subtitle)",
          lineHeight: "var(--leading-subtitle)",
          textWrap: "pretty",
        },
      },
      children,
    ),
    React.createElement(
      "div",
      { style: { display: "flex", flexDirection: "column", gap: "var(--space-2)" } },
      React.createElement("span", {
        style: { width: 48, height: 1, background: "currentColor", opacity: 0.4 },
      }),
      React.createElement(Eyebrow, null, attribution, role ? " \u2014 " + role : ""),
    ),
  );
}
