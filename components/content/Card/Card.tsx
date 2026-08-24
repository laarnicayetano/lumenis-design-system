import React from 'react';

const CARD_ELEVATIONS = {
  none: { boxShadow: 'var(--shadow-none)' },
  sm: { boxShadow: 'var(--shadow-sm)' },
  md: { boxShadow: 'var(--shadow-md)' },
} as const;

/**
 * Generic bordered, softly-rounded surface for grouping content.
 */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  padding?: string;
  /** Shadow depth — `none` for a flat bordered block, `sm` for the default resting state, `md` for a lifted/hover state. */
  elevation?: keyof typeof CARD_ELEVATIONS;
  tone?: 'page' | 'inverse';
  style?: React.CSSProperties;
}

/* The one filled/shadowed surface in the system — previously skipped
   because it conflicted with the print brand's squared/unshadowed rule.
   Digital surfaces now round softly (tokens/surfaces.css); this is that
   surface's generic container. Not for print/photography specimens, which
   stay squared. */
export function Card({ children, padding = 'var(--space-6)', elevation = 'sm', tone = 'page', style, ...rest }: CardProps) {
  const inverse = tone === 'inverse';
  return (
    <div
      style={{
        background: inverse ? 'var(--surface-inverse)' : 'var(--surface-page)',
        color: inverse ? 'var(--text-inverse)' : 'var(--text-primary)',
        border: 'var(--border-width-hairline) solid ' + (inverse ? 'rgba(255,255,255,.16)' : 'var(--border-subtle)'),
        borderRadius: 'var(--radius-md)',
        padding,
        ...CARD_ELEVATIONS[elevation],
        ...style,
      }}
      {...rest}
    >{children}</div>
  );
}
