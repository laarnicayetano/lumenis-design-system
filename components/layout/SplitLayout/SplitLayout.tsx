import React from 'react';

/**
 * The split composition every Lumenis format is built from.
 */
export interface SplitLayoutProps {
  children?: React.ReactNode;
  /** Split the format left/right or top/bottom. */
  direction?: 'row' | 'column';
  /** CSS grid track sizes, e.g. "1fr 1fr" or "5fr 7fr". */
  ratio?: string;
  reverse?: boolean;
  gap?: number | string;
  minHeight?: number | string;
  style?: React.CSSProperties;
}

/* The base Lumenis composition (p.63-64): the format splits horizontally or
   vertically; one half carries type on white, black or a single accent, the
   other carries photography. */
export function SplitLayout({ children, direction = 'row', ratio = '1fr 1fr', reverse = false, gap = 0, minHeight = '620px', style, ...rest }: SplitLayoutProps) {
  const tracks = reverse ? ratio.split(' ').reverse().join(' ') : ratio;
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: direction === 'row' ? tracks : '1fr',
        gridTemplateRows: direction === 'column' ? tracks : 'auto',
        gap, minHeight, ...style,
      }}
      {...rest}
    >{children}</div>
  );
}

const PANEL_TONES = {
  page: { background: 'var(--surface-page)', color: 'var(--text-primary)' },
  inverse: { background: 'var(--surface-inverse)', color: 'var(--text-inverse)' },
  accent: { background: 'var(--accent)', color: 'var(--accent-contrast)' },
  image: { background: 'var(--surface-image)', color: 'var(--text-primary)' },
} as const;

export interface SplitPanelProps {
  children?: React.ReactNode;
  /** Background treatment for this half. */
  tone?: keyof typeof PANEL_TONES;
  align?: 'flex-start' | 'center' | 'flex-end' | 'space-between';
  pad?: number | string;
  /** Background image URL for a photography half. */
  image?: string;
  style?: React.CSSProperties;
}

export function SplitPanel({ children, tone = 'page', align = 'flex-end', pad = 'var(--space-9)', image, style, ...rest }: SplitPanelProps) {
  return (
    <div
      style={{
        display: 'flex', flexDirection: 'column', justifyContent: align, gap: 'var(--space-5)', padding: pad,
        backgroundImage: image ? 'url(' + image + ')' : undefined, backgroundSize: 'cover', backgroundPosition: 'center',
        ...PANEL_TONES[tone], ...style,
      }}
      {...rest}
    >{children}</div>
  );
}
