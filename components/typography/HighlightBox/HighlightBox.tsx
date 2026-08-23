import React from 'react';

/** Squared box highlight around 1–2 words of a headline. */
export interface HighlightBoxProps {
  children?: React.ReactNode;
  tone?: string;
  filled?: boolean;
  style?: React.CSSProperties;
}

/* The "box" highlight treatment (p.23): a squared rule around 1-2 words of a
   headline. Social and digital advertising only, in small amounts. */
export function HighlightBox({ children, tone, filled = false, style, ...rest }: HighlightBoxProps) {
  const c = tone || 'var(--accent)';
  return (
    <span style={{ display: 'inline-block', padding: '0.02em 0.16em 0.06em', border: 'var(--border-width-hairline) solid ' + c, borderRadius: 'var(--radius-none)', background: filled ? c : 'transparent', color: filled ? 'var(--accent-contrast)' : 'inherit', ...style }} {...rest}>{children}</span>
  );
}
