import React from "react";
/**
 * Squared checkbox with a sentence-case inline label.
 */
export interface CheckboxProps {
  label?: React.ReactNode;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  readOnly?: boolean;
  tone?: "page" | "inverse";
  style?: React.CSSProperties;
}
export function Checkbox({
  label,
  checked,
  onChange,
  disabled,
  tone = "page",
  style,
  ...rest
}: CheckboxProps) {
  const inverse = tone === "inverse";
  const line = inverse ? "rgba(255,255,255,.45)" : "var(--border-subtle)";
  return (
    <label
      style={{
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
      }}
    >
      <span style={{ position: "relative", width: 18, height: 18, flexShrink: 0 }}>
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          style={{ position: "absolute", inset: 0, margin: 0, opacity: 0, cursor: "inherit" }}
          {...rest}
        />
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            display: "grid",
            placeItems: "center",
            borderRadius: "4px",
            border: "var(--border-width-hairline) solid " + (checked ? "var(--accent)" : line),
            background: checked ? "var(--accent)" : "transparent",
            transition:
              "background var(--dur-fast) var(--ease-brand), border-color var(--dur-fast) var(--ease-brand)",
          }}
        >
          {checked ? (
            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
              <path
                d="M1 4L3.6 6.5L9 1"
                stroke="var(--accent-contrast)"
                strokeWidth="1.5"
                strokeLinecap="square"
              />
            </svg>
          ) : null}
        </span>
      </span>
      {label}
    </label>
  );
}
