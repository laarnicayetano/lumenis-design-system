import React from "react";
import { Headline, Prose, Eyebrow, Quote, Icon, Rays } from "../../components";
const STEPS = [
  {
    n: "01",
    t: "Consult",
    d: "An eye-care professional confirms OptiLIGHT is right for your dry-eye disease.",
  },
  {
    n: "02",
    t: "Treat",
    d: "Gentle pulses of light are applied around the eye in a short in-office session.",
  },
  {
    n: "03",
    t: "Relief",
    d: "Across a series of sessions, tear quality and day-to-day comfort improve.",
  },
];
export function HowItWorks() {
  return React.createElement(
    "section",
    { id: "results", style: { padding: "var(--space-10) var(--page-gutter)" } },
    React.createElement(
      "div",
      { style: { maxWidth: "var(--page-max)", margin: "0 auto" } },
      React.createElement(
        "div",
        {
          style: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: "var(--space-5)",
            marginBottom: "var(--space-8)",
          },
        },
        React.createElement(
          Headline,
          { as: "h2", size: "small", mix: "TREATMENT", style: { maxWidth: 520 } },
          "How a course of treatment works",
        ),
        React.createElement(
          Prose,
          { size: "small", tone: "var(--text-muted)", maxWidth: "26ch" },
          "A typical plan is four sessions, spaced a few weeks apart, tailored by your provider.",
        ),
      ),
      React.createElement(
        "div",
        {
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 0,
            borderTop: "var(--border-width-hairline) solid var(--border-subtle)",
          },
        },
        STEPS.map((s, i) =>
          React.createElement(
            "div",
            {
              key: s.n,
              style: {
                padding: "34px 28px 34px " + (i > 0 ? "28px" : "0"),
                borderRight:
                  i < 2 ? "var(--border-width-hairline) solid var(--border-subtle)" : "none",
              },
            },
            React.createElement(
              "div",
              {
                style: {
                  fontFamily: "var(--font-mix)",
                  fontSize: 40,
                  color: "var(--lum-blue)",
                  marginBottom: "var(--space-5)",
                },
              },
              s.n,
            ),
            React.createElement(
              "h3",
              { style: { fontFamily: "var(--font-sans)", fontSize: 21, margin: "0 0 10px" } },
              s.t,
            ),
            React.createElement(
              "p",
              {
                style: {
                  fontFamily: "var(--font-sans)",
                  fontSize: 15,
                  lineHeight: 1.6,
                  color: "var(--text-muted)",
                  margin: 0,
                  maxWidth: 280,
                },
              },
              s.d,
            ),
          ),
        ),
      ),
    ),
  );
}
export function Testimonial() {
  return React.createElement(
    "section",
    { style: { background: "var(--lum-blue)", position: "relative", overflow: "hidden" } },
    React.createElement(Rays, {
      tone: "blue",
      style: { position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.5 },
    }),
    React.createElement(
      "div",
      {
        style: {
          position: "relative",
          maxWidth: "var(--page-max)",
          margin: "0 auto",
          padding: "var(--space-10) var(--page-gutter)",
        },
      },
      React.createElement(
        "div",
        { style: { maxWidth: 820 } },
        React.createElement(
          "div",
          {
            style: {
              display: "flex",
              gap: 4,
              marginBottom: "var(--space-5)",
              color: "var(--lum-white)",
            },
          },
          [0, 1, 2, 3, 4].map((i) => React.createElement(Icon, { key: i, name: "star", size: 20 })),
        ),
        React.createElement(
          Quote,
          { tone: "inverse", style: { maxWidth: "46ch", marginBottom: 0 } },
          '"For the first time my patients describe their eyes as comfortable again. OptiLIGHT made light-based therapy feel precise, calm and genuinely elegant."',
        ),
        React.createElement(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "center",
              gap: "var(--space-4)",
              color: "var(--lum-white)",
              marginTop: "var(--space-6)",
            },
          },
          React.createElement(
            "div",
            {
              style: {
                width: 46,
                height: 46,
                borderRadius: "50%",
                overflow: "hidden",
                background: "rgba(255,255,255,.2)",
              },
            },
            React.createElement("img", {
              src: "../../assets/photography/people-warm-closeup.webp",
              alt: "",
              style: { width: "100%", height: "100%", objectFit: "cover" },
            }),
          ),
          React.createElement(
            "div",
            null,
            React.createElement(
              "div",
              { style: { fontFamily: "var(--font-sans)", fontWeight: 600 } },
              "Dr. A. Moreau",
            ),
            React.createElement(
              "div",
              {
                style: {
                  fontFamily: "var(--font-sans)",
                  fontSize: 13,
                  color: "rgba(255,255,255,.8)",
                },
              },
              "Ophthalmologist \xB7 Dry-Eye Clinic",
            ),
          ),
        ),
      ),
    ),
  );
}
const FAQS = [
  {
    q: "What is OptiLIGHT used for?",
    a: "OptiLIGHT is an Intense Pulsed Light device cleared for the management of dry eye disease. It is delivered by a trained eye-care professional.",
  },
  {
    q: "Does the treatment hurt?",
    a: "Most patients describe a gentle, warm flicker of light. A cooling applicator keeps the experience comfortable, and there is no downtime afterward.",
  },
  {
    q: "How many sessions will I need?",
    a: "A typical course is four sessions spaced a few weeks apart, though your provider will tailor the plan to your needs.",
  },
  {
    q: "Who can be treated?",
    a: "OptiLIGHT is intended for appropriate skin types and is determined by your provider during consultation. It is for professional use only.",
  },
];
function FAQItem({ q, a, open, onClick }) {
  return React.createElement(
    "div",
    { style: { borderBottom: "var(--border-width-hairline) solid var(--border-subtle)" } },
    React.createElement(
      "button",
      {
        onClick,
        style: {
          width: "100%",
          background: "none",
          border: "none",
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "var(--space-5)",
          padding: "24px 0",
          textAlign: "left",
        },
      },
      React.createElement(
        "span",
        {
          style: {
            fontFamily: "var(--font-sans)",
            fontSize: 18,
            fontWeight: 600,
            color: "var(--text-primary)",
          },
        },
        q,
      ),
      React.createElement(
        "span",
        {
          style: {
            color: "var(--lum-blue)",
            flexShrink: 0,
            transition: "transform var(--dur-fast) var(--ease-brand)",
            transform: open ? "rotate(45deg)" : "none",
          },
        },
        React.createElement(Icon, { name: "plus", size: 22 }),
      ),
    ),
    React.createElement(
      "div",
      {
        style: {
          maxHeight: open ? 260 : 0,
          overflow: "hidden",
          transition: "max-height var(--dur-base) var(--ease-brand)",
        },
      },
      React.createElement(
        "p",
        {
          style: {
            fontFamily: "var(--font-sans)",
            fontSize: 15.5,
            lineHeight: 1.65,
            color: "var(--text-muted)",
            margin: 0,
            paddingBottom: "var(--space-5)",
            maxWidth: 680,
          },
        },
        a,
      ),
    ),
  );
}
export function OptiLightFAQ() {
  const [open, setOpen] = React.useState(0);
  return React.createElement(
    "section",
    { style: { padding: "var(--space-10) var(--page-gutter)", background: "#f7f8fa" } },
    React.createElement(
      "div",
      {
        style: {
          maxWidth: "var(--page-max)",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "0.8fr 1.2fr",
          gap: "var(--space-8)",
        },
      },
      React.createElement(
        "div",
        null,
        React.createElement(
          Eyebrow,
          { style: { color: "var(--lum-blue)", marginBottom: "var(--space-4)" } },
          "Questions",
        ),
        React.createElement(
          Headline,
          { as: "h2", size: "small", style: { maxWidth: 300 } },
          "Good to know",
        ),
      ),
      React.createElement(
        "div",
        null,
        FAQS.map((f, i) =>
          React.createElement(FAQItem, {
            key: f.q,
            ...f,
            open: open === i,
            onClick: () => setOpen(open === i ? -1 : i),
          }),
        ),
      ),
    ),
  );
}
