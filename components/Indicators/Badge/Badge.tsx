import React from "react";

const BADGE_TONES: Record<NonNullable<BadgeProps["tone"]>, React.CSSProperties> = {
  neutral: {
    background: "transparent",
    color: "var(--text-primary)",
    borderColor: "var(--border-subtle)",
  },
  accent: {
    background: "var(--accent)",
    color: "var(--accent-contrast)",
    borderColor: "var(--accent)",
  },
  inverse: {
    background: "transparent",
    color: "var(--text-inverse)",
    borderColor: "var(--border-hairline-inverse)",
  },
};

/** Small status/metadata label. */
export interface BadgeProps {
  children?: React.ReactNode;
  tone?: "neutral" | "accent" | "inverse";
  style?: React.CSSProperties;
}

export function Badge({ children, tone = "neutral", style, ...rest }: BadgeProps) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "3px 10px",
        fontFamily: "var(--font-sans)",
        fontSize: "var(--text-caption)",
        letterSpacing: "var(--tracking-caption)",
        textTransform: "uppercase",
        border: "var(--border-width-hairline) solid",
        borderRadius: "var(--radius-pill)",
        ...BADGE_TONES[tone],
        ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
}
