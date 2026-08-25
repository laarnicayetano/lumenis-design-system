import React from "react";
import { Icon } from "../../icons/Icon/Icon";
export function Select({
  label,
  options,
  value,
  onChange,
  placeholder,
  required,
  disabled,
  tone = "page",
  style,
  ...rest
}) {
  const inverse = tone === "inverse";
  const line = inverse ? "rgba(255,255,255,.3)" : "var(--border-subtle)";
  const items = options.map((o) => (typeof o === "string" ? { label: o, value: o } : o));
  return React.createElement(
    "label",
    {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-2)",
        color: inverse ? "var(--text-inverse)" : "var(--text-primary)",
        opacity: disabled ? 0.4 : 1,
        ...style,
      },
    },
    React.createElement(
      "span",
      {
        style: {
          fontSize: "var(--text-caption)",
          letterSpacing: "var(--tracking-caption)",
          textTransform: "uppercase",
          opacity: 0.6,
        },
      },
      label,
      required ? " *" : "",
    ),
    React.createElement(
      "span",
      { style: { position: "relative", display: "flex", alignItems: "center" } },
      React.createElement(
        "select",
        {
          value,
          onChange,
          required,
          disabled,
          style: {
            width: "100%",
            appearance: "none",
            fontFamily: "var(--font-sans)",
            fontSize: "var(--text-form)",
            lineHeight: "var(--leading-form)",
            color: "inherit",
            background: inverse ? "rgba(255,255,255,.06)" : "var(--surface-page)",
            border: "var(--border-width-hairline) solid " + line,
            borderRadius: "var(--radius-sm)",
            padding: "10px 32px 10px 14px",
            outline: "none",
            boxShadow: "none",
            cursor: disabled ? "not-allowed" : "pointer",
            transition:
              "border-color var(--dur-fast) var(--ease-brand), box-shadow var(--dur-fast) var(--ease-brand)",
          },
          onFocus: (e) => {
            e.currentTarget.style.borderColor = "var(--accent)";
            e.currentTarget.style.boxShadow = "var(--shadow-accent)";
          },
          onBlur: (e) => {
            e.currentTarget.style.borderColor = line;
            e.currentTarget.style.boxShadow = "none";
          },
          ...rest,
        },
        placeholder
          ? React.createElement("option", { value: "", disabled: true, hidden: true }, placeholder)
          : null,
        items.map((o) => React.createElement("option", { key: o.value, value: o.value }, o.label)),
      ),
      React.createElement(Icon, {
        name: "caret-down",
        size: 14,
        style: { position: "absolute", right: 14, pointerEvents: "none" },
      }),
    ),
  );
}
