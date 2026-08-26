import React from "react";
import { Button } from "../../components";
export function Header() {
  return React.createElement(
    "header",
    {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "var(--space-5) var(--page-gutter)",
        position: "sticky",
        top: 0,
        zIndex: 10,
        background: "rgba(255,255,255,.9)",
        backdropFilter: "var(--blur-glass)",
        borderBottom: "var(--border-width-hairline) solid var(--border-subtle)",
      },
    },
    React.createElement("img", {
      src: "../../assets/optilift/logo/ByLUMENIS_black.png",
      style: { height: 32 },
      alt: "OptiLIFT by Lumenis",
    }),
    React.createElement(
      "nav",
      {
        style: {
          display: "flex",
          alignItems: "center",
          gap: "var(--space-7)",
          fontFamily: "var(--font-sans)",
          fontSize: "var(--text-form)",
        },
      },
      React.createElement(
        "a",
        { href: "#technology", style: { color: "inherit", textDecoration: "none" } },
        "Technology",
      ),
      React.createElement(
        "a",
        { href: "#results", style: { color: "inherit", textDecoration: "none" } },
        "Results",
      ),
      React.createElement(
        "a",
        { href: "#faq", style: { color: "inherit", textDecoration: "none" } },
        "FAQs",
      ),
    ),
    React.createElement(
      Button,
      {
        variant: "accent",
        size: "sm",
        onClick: () =>
          document.getElementById("provider-form")?.scrollIntoView({ behavior: "smooth" }),
      },
      "Find a provider",
    ),
  );
}
