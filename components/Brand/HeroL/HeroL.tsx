import React from "react";

/** The Hero "L" glyph for use inside headline text. */
export interface HeroLProps {
  style?: React.CSSProperties;
}

export function HeroL({ style, ...rest }: HeroLProps) {
  return (
    <span
      style={{
        fontFamily: "var(--font-mix)",
        fontStyle: "italic",
        fontWeight: "var(--weight-regular)",
        letterSpacing: "0.01em",
        ...style,
      }}
      {...rest}
    >
      L
    </span>
  );
}
