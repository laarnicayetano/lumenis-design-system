import React from "react";

/**
 * Circular radio with a sentence-case inline label.
 */
export interface RadioProps {
  label?: React.ReactNode;
  name?: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  readOnly?: boolean;
  tone?: 'page' | 'inverse';
  style?: React.CSSProperties;
}

export function Radio({ label, name, checked, onChange, disabled, tone = "page", style, ...rest }: RadioProps) {
  const inverse = tone === "inverse";
  const line = inverse ? "rgba(255,255,255,.45)" : "var(--border-subtle)";
  return React.createElement(
    "label",
    {
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: "var(--space-3)",
        fontFamily: "var(--font-sans)",
        fontSize: "var(--text-form)",
        lineHeight: "var(--leading-form)",
        color: inverse ? "var(--text-inverse)" : "var(--text-primary)",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.4 : 1,
        ...style,
      },
    },
    React.createElement(
      "span",
      { style: { position: "relative", width: 18, height: 18, flexShrink: 0 } },
      React.createElement("input", {
        type: "radio",
        name,
        checked,
        onChange,
        disabled,
        style: { position: "absolute", inset: 0, margin: 0, opacity: 0, cursor: "inherit" },
        ...rest,
      }),
      React.createElement(
        "span",
        {
          "aria-hidden": "true",
          style: {
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            display: "grid",
            placeItems: "center",
            border: "var(--border-width-hairline) solid " + (checked ? "var(--accent)" : line),
            transition: "border-color var(--dur-fast) var(--ease-brand)",
          },
        },
        React.createElement("span", {
          style: {
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "var(--accent)",
            transform: checked ? "scale(1)" : "scale(0)",
            transition: "transform var(--dur-fast) var(--ease-brand)",
          },
        }),
      ),
    ),
    label,
  );
}
