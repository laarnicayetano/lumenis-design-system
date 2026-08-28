import React from "react";
import { Eyebrow, Headline, Prose, Card, Icon, Tabs, Badge, Rays } from "../../../../components";
const VALUE_PROPS = [
  {
    icon: "eye",
    t: "Targeted relief",
    d: "Light applied at the source addresses the root inflammation behind dry-eye disease.",
  },
  {
    icon: "pulse",
    t: "Optimal Pulse Technology",
    d: "Patented OPT\u2122 delivers precise, uniform pulses for a controlled, repeatable treatment.",
  },
  {
    icon: "drop",
    t: "Restores the tear film",
    d: "Stimulates the meibomian glands to improve tear quality and lasting comfort.",
  },
  {
    icon: "clock",
    t: "Quick & in-office",
    d: "A gentle ~15-minute procedure with no downtime \u2014 patients return to their day.",
  },
];
export function ValueProps() {
  return React.createElement(
    "section",
    { id: "treatment", style: { padding: "var(--space-10) var(--page-gutter)" } },
    React.createElement(
      "div",
      { style: { maxWidth: "var(--page-max)", margin: "0 auto" } },
      React.createElement(
        "div",
        { style: { maxWidth: 640, marginBottom: "var(--space-8)" } },
        React.createElement(
          Eyebrow,
          { style: { color: "var(--lum-blue)", marginBottom: "var(--space-4)" } },
          "Why OptiLIGHT",
        ),
        React.createElement(
          Headline,
          { as: "h2", size: "small", mix: "LIGHT" },
          "A new age of dry-eye care, built on light.",
        ),
      ),
      React.createElement(
        "div",
        {
          style: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "var(--space-5)" },
        },
        VALUE_PROPS.map((it) =>
          React.createElement(
            Card,
            { key: it.t },
            React.createElement(
              "div",
              {
                style: {
                  width: 46,
                  height: 46,
                  borderRadius: "var(--radius-md)",
                  background: "#eef4ff",
                  color: "var(--lum-blue)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "var(--space-4)",
                },
              },
              React.createElement(Icon, { name: it.icon, size: 24 }),
            ),
            React.createElement(
              "h3",
              { style: { fontFamily: "var(--font-sans)", fontSize: 18, margin: "0 0 9px" } },
              it.t,
            ),
            React.createElement(
              "p",
              {
                style: {
                  fontFamily: "var(--font-sans)",
                  fontSize: 14.5,
                  lineHeight: 1.55,
                  color: "var(--text-muted)",
                  margin: 0,
                },
              },
              it.d,
            ),
          ),
        ),
      ),
    ),
  );
}
export function PrismBand() {
  return React.createElement(
    "section",
    {
      style: {
        position: "relative",
        overflow: "hidden",
        minHeight: 520,
        display: "flex",
        alignItems: "center",
      },
    },
    React.createElement("img", {
      src: "../../../../assets/photography/people-rainbow-face.webp",
      alt: "",
      style: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" },
    }),
    React.createElement("div", {
      style: {
        position: "absolute",
        inset: 0,
        background:
          "linear-gradient(90deg, rgba(10,12,16,.55) 0%, rgba(10,12,16,.15) 55%, transparent 100%)",
      },
    }),
    React.createElement(
      "div",
      {
        style: {
          position: "relative",
          maxWidth: "var(--page-max)",
          margin: "0 auto",
          padding: "0 var(--page-gutter)",
          width: "100%",
        },
      },
      React.createElement(
        "div",
        { style: { maxWidth: 560, color: "var(--lum-white)" } },
        React.createElement(
          Eyebrow,
          { style: { color: "inherit", marginBottom: "var(--space-5)" } },
          "Unveil the best in you",
        ),
        React.createElement(
          "div",
          {
            style: {
              fontFamily: "var(--font-mix)",
              fontSize: "clamp(34px,4.4vw,56px)",
              lineHeight: 1.08,
              marginBottom: "var(--space-5)",
            },
          },
          '"Light, used with intention, becomes a healing energy."',
        ),
        React.createElement(
          Prose,
          { tone: "rgba(255,255,255,.86)", maxWidth: "28ch" },
          "The signature prism falls across the eye \u2014 a reminder that relief can feel as gentle and bright as morning light.",
        ),
      ),
    ),
  );
}
const SHOWCASE_DATA = {
  pro: {
    eyebrow: "For eye-care professionals",
    title: "Engineered for precision and trust",
    body: "User-centered console design, validated parameters, and the consistency of OPT\u2122 \u2014 so every session is safe, efficient, and repeatable.",
    specs: [
      "IPL \xB7 500\u2013600nm",
      "Skin types I\u2013IV",
      "Contact cooling",
      "Optimal Pulse Technology",
    ],
  },
  pt: {
    eyebrow: "For patients",
    title: "A calm, comfortable experience",
    body: "A short in-office visit with no downtime. A cool applicator and gentle pulses of light \u2014 most patients describe it as a warm, painless flicker.",
    specs: ["~15-minute visit", "No downtime", "Typically 4 sessions", "Gentle & non-invasive"],
  },
};
export function ProductShowcase() {
  const [tab, setTab] = React.useState("pro");
  const d = SHOWCASE_DATA[tab];
  return React.createElement(
    "section",
    {
      id: "technology",
      style: { padding: "var(--space-10) var(--page-gutter)", background: "#f7f8fa" },
    },
    React.createElement(
      "div",
      {
        style: {
          maxWidth: "var(--page-max)",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "var(--space-8)",
          alignItems: "center",
        },
      },
      React.createElement(
        "div",
        {
          style: {
            position: "relative",
            borderRadius: "var(--radius-lg)",
            overflow: "hidden",
            background: "var(--lum-image-grey)",
            aspectRatio: "1 / 1",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
        },
        React.createElement(Rays, {
          tone: "light",
          style: { position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.5 },
        }),
        React.createElement("img", {
          src: "../../assets/product/optilight-device-tabletop.webp",
          alt: "OptiLIGHT device",
          style: {
            position: "relative",
            width: "86%",
            filter: "drop-shadow(0 30px 50px rgba(16,24,40,.18))",
          },
        }),
      ),
      React.createElement(
        "div",
        null,
        React.createElement(Tabs, {
          tabs: [
            { id: "pro", label: "Professionals" },
            { id: "pt", label: "Patients" },
          ],
          active: tab,
          onChange: (id) => setTab(id),
          style: { marginBottom: "var(--space-6)", display: "inline-flex" },
        }),
        React.createElement(
          Eyebrow,
          { style: { color: "var(--lum-blue)", marginBottom: "var(--space-3)" } },
          d.eyebrow,
        ),
        React.createElement(
          Headline,
          { as: "h2", size: "small", style: { marginBottom: "var(--space-5)" } },
          d.title,
        ),
        React.createElement(
          Prose,
          { size: "subtitle", style: { marginBottom: "var(--space-6)" } },
          d.body,
        ),
        React.createElement(
          "div",
          { style: { display: "flex", flexWrap: "wrap", gap: "var(--space-3)" } },
          d.specs.map((s) => React.createElement(Badge, { key: s }, s)),
        ),
      ),
    ),
  );
}
