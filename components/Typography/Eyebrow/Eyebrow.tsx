import React from "react";
/** All-caps caption, spec line, or section kicker. */
export interface EyebrowProps {
  children?: React.ReactNode;
  tone?: string;
  style?: React.CSSProperties;
}
export function Eyebrow({ children, tone = "inherit", style, ...rest }: EyebrowProps) {
  return (
    <p
      style={{
        margin: 0,
        fontFamily: "var(--font-sans)",
        fontSize: "var(--text-caption)",
        lineHeight: "var(--leading-caption)",
        letterSpacing: "var(--tracking-caption)",
        textTransform: "var(--case-caption)",
        color: tone === "inherit" ? "inherit" : tone,
        ...style,
      }}
      {...rest}
    >
      {children}
    </p>
  );
}
