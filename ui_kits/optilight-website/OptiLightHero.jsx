import React from "react";
import { Badge, Headline, Prose, Button, Rays, Eyebrow, StatBlock } from "../../components";
export function OptiLightHero({ onBook }) {
  return React.createElement(
    "section",
    {
      id: "top",
      style: { position: "relative", overflow: "hidden", background: "var(--surface-page)" },
    },
    React.createElement(
      "div",
      {
        style: {
          maxWidth: "var(--page-max)",
          margin: "0 auto",
          padding: "var(--space-8) var(--page-gutter) var(--space-9)",
          display: "grid",
          gridTemplateColumns: "1.05fr .95fr",
          gap: "var(--space-8)",
          alignItems: "center",
          minHeight: "calc(100vh - 74px)",
        },
      },
      React.createElement(
        "div",
        null,
        React.createElement(
          Badge,
          { tone: "accent", style: { marginBottom: "var(--space-5)" } },
          "FDA-cleared \xB7 Dry eye disease",
        ),
        React.createElement(
          Headline,
          { mix: "SOLUTION", style: { marginBottom: "var(--space-5)" } },
          "A bright solution for dry eyes",
        ),
        React.createElement(
          Prose,
          {
            size: "subtitle",
            tone: "var(--text-muted)",
            maxWidth: "30ch",
            style: { marginBottom: "var(--space-7)" },
          },
          "OptiLIGHT\u2122 elevates dry-eye management with Lumenis' patented Optimal Pulse Technology \u2014 the safe, precise, elegant procedure you want and the comfortable therapy your patients need.",
        ),
        React.createElement(
          "div",
          {
            style: {
              display: "flex",
              gap: "var(--space-4)",
              flexWrap: "wrap",
              marginBottom: "var(--space-8)",
            },
          },
          React.createElement(Button, { variant: "accent", onClick: onBook }, "Find a provider"),
          React.createElement(
            Button,
            { variant: "accent-outline", onClick: onBook },
            "How it works",
          ),
        ),
        React.createElement(
          "div",
          {
            style: {
              display: "flex",
              gap: "var(--space-6)",
              alignItems: "center",
              flexWrap: "wrap",
            },
          },
          React.createElement(StatBlock, { value: "4\xD7", label: "Treatment sessions" }),
          React.createElement("span", {
            style: { width: 1, height: 34, background: "var(--border-subtle)" },
          }),
          React.createElement(StatBlock, { value: "OPT\u2122", label: "Optimal pulse technology" }),
          React.createElement("span", {
            style: { width: 1, height: 34, background: "var(--border-subtle)" },
          }),
          React.createElement(StatBlock, { value: "~15 min", label: "In-office" }),
        ),
      ),
      React.createElement(
        "div",
        {
          style: {
            position: "relative",
            borderRadius: "var(--radius-lg)",
            overflow: "hidden",
            aspectRatio: "4 / 5",
            boxShadow: "var(--shadow-lg)",
          },
        },
        React.createElement("img", {
          src: "../../assets/photography/people-prism-eye.webp",
          alt: "Patient with prism light over the eye",
          style: { width: "100%", height: "100%", objectFit: "cover" },
        }),
        React.createElement(Rays, {
          tone: "blue",
          origin: "right",
          style: {
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            mixBlendMode: "screen",
            opacity: 0.95,
          },
        }),
        React.createElement(
          "div",
          {
            style: {
              position: "absolute",
              left: 22,
              bottom: 20,
              color: "var(--lum-white)",
              textShadow: "0 1px 10px rgba(0,0,0,.4)",
            },
          },
          React.createElement(Eyebrow, { style: { color: "inherit" } }, "Establishing light as a"),
          React.createElement(
            "div",
            {
              style: {
                fontFamily: "var(--font-mix)",
                fontSize: 30,
                lineHeight: 1.05,
                textTransform: "uppercase",
              },
            },
            "healing energy",
          ),
        ),
      ),
    ),
  );
}
