import React from "react";
export function TextLink({
  children,
  href = "#",
  tone = "inherit",
  caps = false,
  size = "body",
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return React.createElement(
    "a",
    {
      href,
      onMouseEnter: () => setHover(true),
      onMouseLeave: () => setHover(false),
      style: {
        fontFamily: "var(--font-sans)",
        fontSize:
          size === "caption"
            ? "var(--text-caption)"
            : size === "small"
              ? "var(--text-form)"
              : "var(--text-body)",
        textTransform: caps ? "uppercase" : "none",
        letterSpacing: caps ? "var(--tracking-caption)" : 0,
        color: tone === "inherit" ? "inherit" : tone,
        textDecoration: "none",
        borderBottom: "1px solid " + (hover ? "currentColor" : "transparent"),
        paddingBottom: 2,
        transition: "border-color var(--dur-fast) var(--ease-brand)",
        ...style,
      },
      ...rest,
    },
    children,
  );
}
