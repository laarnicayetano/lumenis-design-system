import React from "react";
const PROSE_SIZES = {
  subtitle: { fontSize: "var(--text-subtitle)", lineHeight: "var(--leading-subtitle)" },
  body: { fontSize: "var(--text-body)", lineHeight: "var(--leading-body)" },
  small: { fontSize: "var(--text-form)", lineHeight: "var(--leading-form)" },
};
export function Prose({
  children,
  size = "body",
  tone = "inherit",
  maxWidth = "58ch",
  style,
  ...rest
}) {
  return React.createElement(
    "p",
    {
      style: {
        margin: 0,
        fontFamily: "var(--font-sans)",
        fontWeight: "var(--weight-regular)",
        color: tone === "inherit" ? "inherit" : tone,
        maxWidth,
        textWrap: "pretty",
        ...PROSE_SIZES[size],
        ...style,
      },
      ...rest,
    },
    children,
  );
}
