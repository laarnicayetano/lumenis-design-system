import React from "react";
import { Eyebrow } from "../../typography/Eyebrow/Eyebrow";
export function ProductCard({ name, market, image, href = "#", onClick, style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  return React.createElement(
    "a",
    {
      href,
      onClick,
      onMouseEnter: () => setHover(true),
      onMouseLeave: () => setHover(false),
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-4)",
        textDecoration: "none",
        color: "inherit",
        ...style,
      },
      ...rest,
    },
    React.createElement(
      "div",
      {
        style: {
          position: "relative",
          aspectRatio: "252 / 391",
          background: "var(--surface-image)",
          overflow: "hidden",
          borderRadius: "var(--radius-md)",
          boxShadow: hover ? "var(--shadow-md)" : "var(--shadow-none)",
          transition: "box-shadow var(--dur-base) var(--ease-brand)",
        },
      },
      image
        ? React.createElement("img", {
            src: image,
            alt: name,
            style: {
              width: "100%",
              height: "100%",
              objectFit: "contain",
              transform: hover ? "scale(1.03)" : "none",
              transition: "transform var(--dur-base) var(--ease-brand)",
            },
          })
        : React.createElement(
            "span",
            {
              style: {
                position: "absolute",
                inset: 0,
                display: "grid",
                placeItems: "center",
                fontSize: "var(--text-caption)",
                letterSpacing: "var(--tracking-caption)",
                textTransform: "uppercase",
                color: "var(--text-muted)",
                opacity: 0.5,
              },
            },
            "Device image",
          ),
    ),
    React.createElement(
      "div",
      { style: { display: "flex", flexDirection: "column", gap: "var(--space-1)" } },
      React.createElement(
        "span",
        {
          style: {
            fontSize: "var(--text-subtitle)",
            lineHeight: 1.1,
            textTransform: "uppercase",
            borderBottom: "1px solid " + (hover ? "currentColor" : "transparent"),
            alignSelf: "flex-start",
            transition: "border-color var(--dur-fast) var(--ease-brand)",
          },
        },
        name,
      ),
      market
        ? React.createElement(Eyebrow, { style: { color: "var(--text-muted)" } }, market)
        : null,
    ),
  );
}
