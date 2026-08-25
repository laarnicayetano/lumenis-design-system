import React from "react";
import { Logotype } from "../../brand/Logotype/Logotype";
import { TextLink } from "../../actions/TextLink/TextLink";
export function SiteHeader({
  nav = [],
  active,
  locale = "Global, English",
  onNavigate,
  tone = "page",
  style,
  ...rest
}) {
  const inverse = tone === "inverse";
  return React.createElement(
    "header",
    {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "var(--space-9)",
        padding: "0 var(--page-gutter)",
        height: 88,
        background: inverse ? "var(--surface-inverse)" : "var(--surface-page)",
        color: inverse ? "var(--text-inverse)" : "var(--text-primary)",
        borderBottom:
          "var(--border-width-hairline) solid " +
          (inverse ? "var(--border-hairline-inverse)" : "var(--border-subtle)"),
        ...style,
      },
      ...rest,
    },
    React.createElement(
      "a",
      {
        href: "#",
        onClick: (e) => {
          e.preventDefault();
          onNavigate && onNavigate(nav[0] && nav[0].id);
        },
        style: { display: "block", flex: "0 0 auto" },
      },
      React.createElement(Logotype, { tone: inverse ? "white" : "black", width: 132 }),
    ),
    React.createElement(
      "nav",
      {
        style: { display: "flex", alignItems: "center", gap: "var(--space-6)", marginLeft: "auto" },
      },
      nav.map((item) =>
        React.createElement(
          TextLink,
          {
            key: item.id,
            href: item.href || "#",
            caps: true,
            size: "caption",
            onClick: (e) => {
              if (onNavigate) {
                e.preventDefault();
                onNavigate(item.id);
              }
            },
            style: {
              borderBottomColor: active === item.id ? "currentColor" : "transparent",
              opacity: active && active !== item.id ? 0.55 : 1,
            },
          },
          item.label,
        ),
      ),
    ),
    React.createElement(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "center",
          gap: "var(--space-5)",
          paddingLeft: "var(--space-6)",
          borderLeft:
            "var(--border-width-hairline) solid " +
            (inverse ? "rgba(255,255,255,.3)" : "var(--border-subtle)"),
        },
      },
      React.createElement(TextLink, { href: "#", caps: true, size: "caption" }, "Patients"),
      React.createElement(
        "span",
        {
          style: {
            fontSize: "var(--text-caption)",
            letterSpacing: "var(--tracking-caption)",
            textTransform: "uppercase",
            opacity: 0.55,
          },
        },
        locale,
      ),
    ),
  );
}
