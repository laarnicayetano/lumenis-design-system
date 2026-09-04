import React from "react";

/** Generic bordered, softly-rounded surface for grouping content. */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  padding?: string;
  /** Shadow depth — `none` for a flat bordered block, `sm` for the default resting state, `md` for a lifted/hover state. */
  elevation?: "none" | "sm" | "md";
  tone?: "page" | "inverse";
  style?: React.CSSProperties;
}

const CARD_ELEVATIONS: Record<NonNullable<CardProps["elevation"]>, React.CSSProperties> = {
  none: { boxShadow: "var(--shadow-none)" },
  sm: { boxShadow: "var(--shadow-sm)" },
  md: { boxShadow: "var(--shadow-md)" },
};

export function Card({
  children,
  padding = "var(--space-6)",
  elevation = "sm",
  tone = "page",
  style,
  ...rest
}: CardProps) {
  const inverse = tone === "inverse";
  return (
    <div
      style={{
        background: inverse ? "var(--surface-inverse)" : "var(--surface-page)",
        color: inverse ? "var(--text-inverse)" : "var(--text-primary)",
        border:
          "var(--border-width-hairline) solid " +
          (inverse ? "rgba(255,255,255,.16)" : "var(--border-subtle)"),
        borderRadius: "var(--radius-md)",
        padding,
        ...CARD_ELEVATIONS[elevation],
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
