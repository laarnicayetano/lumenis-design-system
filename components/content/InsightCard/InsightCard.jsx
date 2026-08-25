import React from "react";
import { Eyebrow } from "../../typography/Eyebrow/Eyebrow";
import { TextLink } from "../../actions/TextLink/TextLink";
export function InsightCard({ title, topics = [], image, href = "#", style, ...rest }) {
  return React.createElement(
    "article",
    {
      style: { display: "flex", flexDirection: "column", gap: "var(--space-4)", ...style },
      ...rest,
    },
    React.createElement(
      "div",
      {
        style: {
          position: "relative",
          aspectRatio: "16 / 9",
          background: "var(--surface-image)",
          overflow: "hidden",
          borderRadius: "var(--radius-md)",
        },
      },
      image
        ? React.createElement("img", {
            src: image,
            alt: "",
            style: { width: "100%", height: "100%", objectFit: "cover" },
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
            "Article image",
          ),
    ),
    topics.length
      ? React.createElement(
          Eyebrow,
          { style: { color: "var(--text-muted)" } },
          topics.join(" \xB7 "),
        )
      : null,
    React.createElement(
      "h3",
      {
        style: {
          margin: 0,
          fontFamily: "var(--font-sans)",
          fontWeight: "var(--weight-regular)",
          fontSize: "var(--text-body)",
          lineHeight: "var(--leading-subtitle)",
          textWrap: "pretty",
        },
      },
      title,
    ),
    React.createElement(TextLink, { href, caps: true, size: "caption" }, "Read more"),
  );
}
