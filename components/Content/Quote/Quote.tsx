import React from "react";
import { Eyebrow } from "../../Typography/Eyebrow/Eyebrow";

/** Practitioner testimonial with caps attribution. */
export interface QuoteProps {
  children?: React.ReactNode;
  /** Name, e.g. "Evie Rose". */
  attribution?: string;
  /** Practice or role, e.g. "Aesthetic Clinic, London". */
  role?: string;
  tone?: "page" | "inverse";
  style?: React.CSSProperties;
}

export function Quote({ children, attribution, role, tone = "page", style, ...rest }: QuoteProps) {
  const inverse = tone === "inverse";
  return (
    <blockquote
      style={{
        margin: 0,
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-5)",
        color: inverse ? "var(--text-inverse)" : "var(--text-primary)",
        maxWidth: "46ch",
        ...style,
      }}
      {...rest}
    >
      <p
        style={{
          margin: 0,
          fontFamily: "var(--font-sans)",
          fontSize: "var(--text-subtitle)",
          lineHeight: "var(--leading-subtitle)",
          textWrap: "pretty",
        }}
      >
        {children}
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
        <span style={{ width: 48, height: 1, background: "currentColor", opacity: 0.4 }} />
        <Eyebrow>
          {attribution}
          {role ? " — " + role : ""}
        </Eyebrow>
      </div>
    </blockquote>
  );
}
