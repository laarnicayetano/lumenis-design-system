import React from "react";
import {
  SplitLayout,
  SplitPanel,
  Eyebrow,
  Headline,
  Prose,
  Button,
  StatBlock,
  ProductCard,
  Icon,
  Quote,
  InsightCard,
  NewsletterSignup,
} from "../../components";
import { Section, SectionHead, ImagePlate, PRODUCTS, INSIGHTS } from "./shared";
export function Home({ onOpenProduct, onNavigate }) {
  return React.createElement(
    "div",
    null,
    React.createElement(
      SplitLayout,
      { ratio: "6fr 6fr", minHeight: "560px" },
      React.createElement(
        SplitPanel,
        { align: "space-between", pad: "var(--space-9) var(--page-gutter)" },
        React.createElement(
          Eyebrow,
          { style: { color: "var(--text-muted)" } },
          "60 years pushing boundaries",
        ),
        React.createElement(
          "div",
          { style: { display: "flex", flexDirection: "column", gap: "var(--space-6)" } },
          React.createElement(Headline, { heroL: "EMPOWERING" }, "Empowering you, your way"),
          React.createElement(
            Prose,
            { size: "subtitle", style: { maxWidth: "30ch" } },
            "Minimally invasive, energy-based solutions for the Aesthetic and Vision markets.",
          ),
          React.createElement(
            "div",
            { style: { display: "flex", gap: "var(--space-4)", marginTop: "var(--space-4)" } },
            React.createElement(
              Button,
              { onClick: () => onOpenProduct("stellar-m22") },
              "Discover more",
            ),
            React.createElement(
              Button,
              { variant: "secondary", onClick: () => onNavigate("contact") },
              "Talk to us",
            ),
          ),
        ),
      ),
      React.createElement(
        SplitPanel,
        { tone: "image", pad: "0" },
        React.createElement(ImagePlate, {
          label: "Hero photography \u2014 practitioner",
          ratio: "auto",
          style: { height: "100%" },
        }),
      ),
    ),
    React.createElement(
      Section,
      { tone: "inverse", pad: "var(--space-9) var(--page-gutter)" },
      React.createElement(
        "div",
        {
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr) 1.4fr",
            gap: "var(--space-8)",
            alignItems: "start",
          },
        },
        React.createElement(StatBlock, { value: "88+", label: "Countries", detail: "Worldwide" }),
        React.createElement(StatBlock, {
          value: "90k+",
          label: "Devices",
          detail: "Installed worldwide",
        }),
        React.createElement(StatBlock, {
          value: "60+",
          label: "Years",
          detail: "Of industry leadership",
        }),
        React.createElement(StatBlock, {
          value: "500+",
          label: "Clinical",
          detail: "Publications",
        }),
        React.createElement(
          Prose,
          { size: "small", style: { opacity: 0.8 } },
          "Lumenis develops life-changing, minimally invasive solutions for the Aesthetic and Vision markets. We are BeautyTech pioneers, empowering people by broadening the horizons of health.",
        ),
      ),
    ),
    React.createElement(
      Section,
      null,
      React.createElement(SectionHead, { action: "View all products" }, "Our products"),
      React.createElement(
        "div",
        {
          style: { display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "var(--space-6)" },
        },
        PRODUCTS.map((p) =>
          React.createElement(ProductCard, {
            key: p.name,
            name: p.name,
            market: p.market,
            onClick: (e) => {
              e.preventDefault();
              onOpenProduct(p.sub);
            },
          }),
        ),
      ),
    ),
    React.createElement(
      "div",
      { "data-subbrand": "optilight" },
      React.createElement(
        SplitLayout,
        { ratio: "6fr 6fr", minHeight: "420px" },
        React.createElement(
          SplitPanel,
          { tone: "accent", align: "space-between", pad: "var(--space-9) var(--page-gutter)" },
          React.createElement(Icon, {
            name: "eye",
            scale: "large",
            size: 72,
            tone: "var(--accent-contrast)",
          }),
          React.createElement(
            "div",
            { style: { display: "flex", flexDirection: "column", gap: "var(--space-5)" } },
            React.createElement(
              Headline,
              { size: "title", mix: "BRIGHT", tone: "var(--accent-contrast)" },
              "A bright solution for dry eyes",
            ),
            React.createElement(Button, { variant: "inverse", size: "sm" }, "Learn more"),
          ),
        ),
        React.createElement(
          SplitPanel,
          { tone: "page", align: "space-between", pad: "var(--space-9) var(--page-gutter)" },
          React.createElement(
            Quote,
            { attribution: "Evie Rose", role: "Aesthetic Clinic, London" },
            "Lumenis products have been such a success in my clinic, achieving amazing results with my clients and are extremely cost effective.",
          ),
          React.createElement(
            "div",
            {
              style: {
                display: "flex",
                gap: "var(--space-8)",
                paddingTop: "var(--space-6)",
                borderTop: "var(--border-width-hairline) solid var(--border-subtle)",
              },
            },
            [
              ["first-aid-kit", "Clinic"],
              ["user-circle", "Customer"],
              ["sparkle", "Treatment"],
              ["hand-heart", "After-care"],
            ].map(([n, l]) =>
              React.createElement(
                "div",
                {
                  key: l,
                  style: { display: "flex", flexDirection: "column", gap: "var(--space-3)" },
                },
                React.createElement(Icon, { name: n, size: 28 }),
                React.createElement(Eyebrow, { style: { color: "var(--text-muted)" } }, l),
              ),
            ),
          ),
        ),
      ),
    ),
    React.createElement(
      Section,
      null,
      React.createElement(SectionHead, { action: "Visit the hub" }, "Resources"),
      React.createElement(
        "div",
        {
          style: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "var(--space-7)" },
        },
        INSIGHTS.map((i) =>
          React.createElement(InsightCard, { key: i.title, title: i.title, topics: i.topics }),
        ),
      ),
    ),
    React.createElement(NewsletterSignup, {
      style: { padding: "var(--space-9) var(--page-gutter)" },
    }),
  );
}
