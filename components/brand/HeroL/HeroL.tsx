import React from 'react';

/** The Hero "L" glyph for use inside headline text. */
export interface HeroLProps {
  style?: React.CSSProperties;
}

/* The Hero "L" as a type character: the wordmark's slanted serif L, set in
   Arizona Mix italic. Drop it in place of an L inside a headline —
   1-2 words per message, never repeated throughout (p.27-29). */
export function HeroL({ style, ...rest }: HeroLProps) {
  return (
    <span
      style={{ fontFamily: 'var(--font-mix)', fontStyle: 'italic', fontWeight: 'var(--weight-regular)', letterSpacing: '0.01em', ...style }}
      {...rest}
    >L</span>
  );
}
