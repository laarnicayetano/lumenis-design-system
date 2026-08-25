import React from "react";
export function Tabs({ tabs, active, onChange, tone = "page", style, ...rest }) {
  const inverse = tone === "inverse";
  const items = tabs.map((t) => (typeof t === "string" ? { id: t, label: t } : t));
  return React.createElement(
    "div",
    {
      role: "tablist",
      style: {
        display: "flex",
        gap: "var(--space-6)",
        borderBottom:
          "var(--border-width-hairline) solid " +
          (inverse ? "var(--border-hairline-inverse)" : "var(--border-subtle)"),
        ...style,
      },
      ...rest,
    },
    items.map((t) => {
      const isActive = t.id === active;
      return React.createElement(
        "button",
        {
          key: t.id,
          role: "tab",
          "aria-selected": isActive,
          onClick: () => onChange && onChange(t.id),
          style: {
            background: "none",
            border: 0,
            cursor: "pointer",
            padding: "0 0 var(--space-3) 0",
            marginBottom: -1,
            fontFamily: "var(--font-sans)",
            fontSize: "var(--text-caption)",
            letterSpacing: "var(--tracking-caption)",
            textTransform: "uppercase",
            color: inverse ? "var(--text-inverse)" : "var(--text-primary)",
            opacity: isActive ? 1 : 0.55,
            borderBottom: "2px solid " + (isActive ? "var(--accent)" : "transparent"),
            transition:
              "opacity var(--dur-fast) var(--ease-brand), border-color var(--dur-fast) var(--ease-brand)",
          },
        },
        t.label,
      );
    }),
  );
}
