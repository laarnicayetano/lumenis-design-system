import React from 'react';

/** All-caps caption, spec line, or section kicker. */
export interface EyebrowProps {
  children?: React.ReactNode;
  tone?: string;
  style?: React.CSSProperties;
}

/* Caption / spec / kicker: all caps, 75-80% of paragraph size (p.24). */
export function Eyebrow({ children, tone = 'inherit', style, ...rest }: EyebrowProps) {
  return (
    <p style={{ margin: 0, fontFamily: 'var(--font-sans)', fontSize: 'var(--text-caption)', lineHeight: 'var(--leading-caption)', letterSpacing: 'var(--tracking-caption)', textTransform: 'var(--case-caption)' as React.CSSProperties['textTransform'], color: tone === 'inherit' ? 'inherit' : tone, ...style }} {...rest}>{children}</p>
  );
}
