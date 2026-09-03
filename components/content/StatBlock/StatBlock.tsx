import React from "react";
import { Eyebrow } from "../../typography/Eyebrow/Eyebrow";

/** Proof-point figure: big numeral over an all-caps label. */
export interface StatBlockProps {
  /** The figure, e.g. "88+" or "90k+". */
  value: string;
  /** All-caps label, e.g. "Countries worldwide". */
  label: string;
  /** Optional sentence-case qualifier. */
  detail?: string;
  tone?: string;
  style?: React.CSSProperties;
}

export function StatBlock({
  value,
  label,
  detail,
  tone = "inherit",
  style,
  ...rest
}: StatBlockProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-3)",
        color: tone === "inherit" ? "inherit" : tone,
        ...style,
      }}
      {...rest}
    >
      <span
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "var(--text-title-sm)",
          lineHeight: "var(--leading-title)",
        }}
      >
        {value}
      </span>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-1)" }}>
        <Eyebrow>{label}</Eyebrow>
        {detail ? (
          <span style={{ fontSize: "var(--text-form)", lineHeight: "var(--leading-form)", opacity: 0.7 }}>
            {detail}
          </span>
        ) : null}
      </div>
    </div>
  );
}
