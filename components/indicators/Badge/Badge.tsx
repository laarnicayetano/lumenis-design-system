import React from 'react';

const BADGE_TONES = {
  neutral: { background: 'transparent', color: 'var(--text-primary)', borderColor: 'var(--border-subtle)' },
  accent: { background: 'var(--accent)', color: 'var(--accent-contrast)', borderColor: 'var(--accent)' },
  inverse: { background: 'transparent', color: 'var(--text-inverse)', borderColor: 'var(--border-hairline-inverse)' },
} as const;

/**
 * Small status/metadata label.
 */
export interface BadgeProps {
  children?: React.ReactNode;
  tone?: keyof typeof BADGE_TONES;
  style?: React.CSSProperties;
}

/* Pill-shaped, hairline-bordered label (tokens/surfaces.css — digital
   surfaces round softly). `accent` fills solid and picks up the surrounding
   [data-subbrand] scope. */
export function Badge({ children, tone = 'neutral', style, ...rest }: BadgeProps) {
  return (
    <span
      style={{
        display: 'inline-flex', alignItems: 'center', padding: '3px 10px',
        fontFamily: 'var(--font-sans)', fontSize: 'var(--text-caption)', letterSpacing: 'var(--tracking-caption)', textTransform: 'uppercase',
        border: 'var(--border-width-hairline) solid', borderRadius: 'var(--radius-pill)',
        ...BADGE_TONES[tone],
        ...style,
      }}
      {...rest}
    >{children}</span>
  );
}
