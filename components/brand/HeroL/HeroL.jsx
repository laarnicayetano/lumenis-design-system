import React from "react";
export function HeroL({ style, ...rest }) {
  return React.createElement(
    "span",
    {
      style: {
        fontFamily: "var(--font-mix)",
        fontStyle: "italic",
        fontWeight: "var(--weight-regular)",
        letterSpacing: "0.01em",
        ...style,
      },
      ...rest,
    },
    "L",
  );
}
