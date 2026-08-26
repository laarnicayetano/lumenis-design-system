import React from "react";
import { Card, Eyebrow, Headline, Quote } from "../../components";
const ITEMS = [
  {
    img: "../../assets/photography/shutterstock_1549746530.webp",
    quote: "My skin looks lifted and refreshed \u2014 friends keep asking what I did.",
    name: "Patient, age 52",
  },
  {
    img: "../../assets/photography/shutterstock_724330396.webp",
    quote: "Zero downtime. I was back at work the same afternoon.",
    name: "Patient, age 41",
  },
];
export function Results() {
  return React.createElement(
    "section",
    { id: "results", style: { padding: "var(--space-9) var(--page-gutter)" } },
    React.createElement(
      "div",
      { style: { textAlign: "center", marginBottom: "var(--space-8)" } },
      React.createElement(Eyebrow, { style: { color: "var(--text-muted)" } }, "Real results"),
      React.createElement(
        Headline,
        { as: "h2", size: "small", align: "center" },
        "Confidence, restored",
      ),
    ),
    React.createElement(
      "div",
      {
        style: {
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "var(--space-7)",
          maxWidth: 960,
          margin: "0 auto",
        },
      },
      ITEMS.map((it) =>
        React.createElement(
          Card,
          { key: it.name, padding: "0", style: { overflow: "hidden" } },
          React.createElement("img", {
            src: it.img,
            style: { width: "100%", height: 280, objectFit: "cover", display: "block" },
            alt: "",
          }),
          React.createElement(
            "div",
            {
              style: {
                padding: "var(--space-6)",
                display: "flex",
                flexDirection: "column",
                gap: "var(--space-3)",
              },
            },
            React.createElement(Quote, null, it.quote),
            React.createElement(Eyebrow, { style: { color: "var(--text-muted)" } }, it.name),
          ),
        ),
      ),
    ),
  );
}
