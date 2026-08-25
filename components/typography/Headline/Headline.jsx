import React from "react";
import { HeroL } from "../../brand/HeroL/HeroL";
const HEADLINE_SIZES = {
  display: { fontSize: "var(--text-display)", lineHeight: "var(--leading-display)" },
  title: { fontSize: "var(--text-title)", lineHeight: "var(--leading-title)" },
  small: { fontSize: "var(--text-title-sm)", lineHeight: "var(--leading-title)" },
};
function childrenToText(children) {
  return React.Children.toArray(children)
    .map((child) => (typeof child === "string" || typeof child === "number" ? String(child) : ""))
    .join("");
}
export function Headline({
  children,
  as: Tag = "h1",
  size = "display",
  align = "left",
  heroL,
  mix,
  tone = "inherit",
  style,
  ...rest
}) {
  const text = childrenToText(children).toUpperCase();
  const target = (heroL || mix || "").toUpperCase();
  let content = children;
  if (text && target && text.indexOf(target) !== -1) {
    const i = text.indexOf(target);
    const emphasised = heroL
      ? target
          .split("L")
          .map((chunk, n) =>
            React.createElement(
              React.Fragment,
              { key: n },
              n > 0 ? React.createElement(HeroL, null) : null,
              chunk,
            ),
          )
      : React.createElement("span", { style: { fontFamily: "var(--font-mix)" } }, target);
    content = [
      text.slice(0, i),
      React.createElement(React.Fragment, { key: "e" }, emphasised),
      text.slice(i + target.length),
    ];
  }
  return React.createElement(
    Tag,
    {
      style: {
        margin: 0,
        fontFamily: "var(--font-sans)",
        fontWeight: "var(--weight-regular)",
        textTransform: "var(--case-title)",
        letterSpacing: "var(--tracking-title)",
        textAlign: align,
        color: tone === "inherit" ? "inherit" : tone,
        textWrap: "balance",
        ...HEADLINE_SIZES[size],
        ...style,
      },
      ...rest,
    },
    content,
  );
}
