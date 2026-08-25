import React from "react";
import { Logotype } from "../../brand/Logotype/Logotype";
import { TextLink } from "../../actions/TextLink/TextLink";
import { Eyebrow } from "../../typography/Eyebrow/Eyebrow";
export function SiteFooter({
  columns = [],
  social = [],
  legal = "Copyright \xA9 2010- Lumenis Be Ltd. All Rights Reserved",
  policies = [],
  style,
  ...rest
}) {
  return React.createElement(
    "footer",
    {
      style: {
        background: "var(--surface-inverse)",
        color: "var(--text-inverse)",
        padding: "var(--space-9) var(--page-gutter) var(--space-6)",
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-9)",
        ...style,
      },
      ...rest,
    },
    React.createElement(
      "div",
      {
        style: {
          display: "grid",
          gridTemplateColumns: "220px repeat(" + Math.max(columns.length, 1) + ", 1fr)",
          gap: "var(--space-8)",
        },
      },
      React.createElement(Logotype, { tone: "white", width: 168 }),
      columns.map((col) =>
        React.createElement(
          "div",
          {
            key: col.title,
            style: { display: "flex", flexDirection: "column", gap: "var(--space-4)" },
          },
          React.createElement(Eyebrow, { style: { opacity: 0.55 } }, col.title),
          React.createElement(
            "div",
            { style: { display: "flex", flexDirection: "column", gap: "var(--space-3)" } },
            col.links.map((l) =>
              React.createElement(
                TextLink,
                { key: l, href: "#", size: "small", style: { opacity: 0.85 } },
                l,
              ),
            ),
          ),
        ),
      ),
    ),
    React.createElement(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "center",
          gap: "var(--space-6)",
          paddingTop: "var(--space-5)",
          borderTop: "var(--border-width-hairline) solid rgba(255,255,255,.25)",
        },
      },
      React.createElement(Eyebrow, { style: { opacity: 0.55 } }, legal),
      React.createElement(
        "div",
        { style: { display: "flex", gap: "var(--space-5)", marginLeft: "auto" } },
        policies.map((p) =>
          React.createElement(
            TextLink,
            { key: p, href: "#", size: "caption", caps: true, style: { opacity: 0.7 } },
            p,
          ),
        ),
      ),
      React.createElement(
        "div",
        { style: { display: "flex", gap: "var(--space-4)" } },
        social.map((s) =>
          React.createElement("i", {
            key: s,
            className: "ph-light ph-" + s,
            style: { fontSize: 20, opacity: 0.8 },
            "aria-hidden": "true",
          }),
        ),
      ),
    ),
  );
}
