import React from "react";
import { Eyebrow, Headline, Prose, Tag } from "../../components";
const AREAS = ["Face", "Neck", "Jawline"];
export function Technology() {
  const [area, setArea] = React.useState("Face");
  return React.createElement(
    "section",
    {
      id: "technology",
      style: {
        padding: "var(--space-9) var(--page-gutter)",
        background: "var(--surface-inverse)",
        color: "var(--text-inverse)",
      },
    },
    React.createElement(
      "div",
      {
        style: {
          display: "grid",
          gridTemplateColumns: "0.9fr 1.1fr",
          gap: "var(--space-9)",
          alignItems: "center",
        },
      },
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            flexDirection: "column",
            gap: "var(--space-5)",
            alignItems: "flex-start",
          },
        },
        React.createElement(Eyebrow, { style: { opacity: 0.6 } }, "The technology"),
        React.createElement(
          Headline,
          { as: "h2", size: "small" },
          "Optical energy, precisely delivered",
        ),
        React.createElement(
          Prose,
          { tone: "rgba(255,255,255,.75)", maxWidth: "34ch" },
          "Two handpieces work in tandem to stimulate collagen remodeling beneath the skin's surface \u2014 treating the face and neck in a single session.",
        ),
        React.createElement(
          "div",
          { style: { display: "flex", gap: "var(--space-3)" } },
          AREAS.map((a) =>
            React.createElement(
              Tag,
              { key: a, tone: "inverse", selected: area === a, onClick: () => setArea(a) },
              a,
            ),
          ),
        ),
      ),
      React.createElement("img", {
        src: "../../assets/optilift/product/black-bg/lumenis_02.756.webp",
        style: { width: "100%" },
        alt: "OptiLIFT console detail",
      }),
    ),
  );
}
