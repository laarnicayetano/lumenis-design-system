import React from "react";
export function TextField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
  multiline,
  rows = 3,
  tone = "page",
  style,
  ...rest
}) {
  const inverse = tone === "inverse";
  const line = inverse ? "rgba(255,255,255,.3)" : "var(--border-subtle)";
  const shared = {
    width: "100%",
    fontFamily: "var(--font-sans)",
    fontSize: "var(--text-form)",
    lineHeight: "var(--leading-form)",
    color: "inherit",
    background: inverse ? "rgba(255,255,255,.06)" : "var(--surface-page)",
    border: "var(--border-width-hairline) solid " + line,
    borderRadius: "var(--radius-sm)",
    padding: "10px 14px",
    outline: "none",
    boxShadow: "none",
    transition:
      "border-color var(--dur-fast) var(--ease-brand), box-shadow var(--dur-fast) var(--ease-brand)",
  };
  const Tag = multiline ? "textarea" : "input";
  return React.createElement(
    "label",
    {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-2)",
        color: inverse ? "var(--text-inverse)" : "var(--text-primary)",
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
    React.createElement(Tag, {
      type: multiline ? void 0 : type,
      rows: multiline ? rows : void 0,
      value,
      placeholder,
      onChange,
      onFocus: (e) => {
        e.target.style.borderColor = "var(--accent)";
        e.target.style.boxShadow = "var(--shadow-accent)";
      },
      onBlur: (e) => {
        e.target.style.borderColor = line;
        e.target.style.boxShadow = "none";
      },
      style: { ...shared, resize: multiline ? "vertical" : void 0 },
      ...rest,
    }),
  );
}
