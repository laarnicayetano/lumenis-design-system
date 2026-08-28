import React from "react";
import { Badge, Headline, Prose, Button } from "../../../../components";
export function OptiLiftHero() {
  return React.createElement(
    "section",
    {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        alignItems: "center",
        gap: "var(--space-8)",
        padding: "var(--space-9) var(--page-gutter)",
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
      React.createElement(Badge, { tone: "accent" }, "By Lumenis"),
      React.createElement(Headline, { heroL: "LIFT" }, "Restore your natural lift"),
      React.createElement(
        Prose,
        { size: "subtitle", tone: "var(--text-muted)", maxWidth: "30ch" },
        "OptiLIFT delivers non-invasive facial contouring through advanced optical energy \u2014 no downtime, no surgery, visible results.",
      ),
      React.createElement(
        "div",
        { style: { display: "flex", gap: "var(--space-4)", marginTop: "var(--space-3)" } },
        React.createElement(Button, { variant: "accent" }, "See how it works"),
        React.createElement(Button, { variant: "secondary" }, "Watch the demo"),
      ),
    ),
    React.createElement("img", {
      src: "../../assets/product/grey-bg/lumenis_02.764.webp",
      style: { width: "100%" },
      alt: "OptiLIFT device",
    }),
  );
}
