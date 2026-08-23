import React from 'react';
import { HeroL } from '../../brand/HeroL/HeroL';

const HEADLINE_SIZES = {
  display: { fontSize: 'var(--text-display)', lineHeight: 'var(--leading-display)' },
  title: { fontSize: 'var(--text-title)', lineHeight: 'var(--leading-title)' },
  small: { fontSize: 'var(--text-title-sm)', lineHeight: 'var(--leading-title)' },
} as const;

/**
 * All-caps Lumenis headline with one optional emphasis treatment.
 */
export interface HeadlineProps {
  children?: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
  /** display 80px · title 56px · small 40px. */
  size?: keyof typeof HEADLINE_SIZES;
  align?: 'left' | 'right' | 'center';
  /** Word whose "L" becomes the Hero "L". Mutually exclusive with `mix`. */
  heroL?: string;
  /** Word to set in Arizona Mix. Mutually exclusive with `heroL`. */
  mix?: string;
  tone?: string;
  style?: React.CSSProperties;
}

/* Uppercase title with exactly ONE emphasis treatment:
   heroL — swap the L of the chosen word for the Hero "L", or
   mix   — set the chosen word in Arizona Mix.
   Never both (p.28). */
export function Headline({ children, as: Tag = 'h1', size = 'display', align = 'left', heroL, mix, tone = 'inherit', style, ...rest }: HeadlineProps) {
  const text = typeof children === 'string' ? children.toUpperCase() : '';
  const target = (heroL || mix || '').toUpperCase();
  let content: React.ReactNode = children;

  if (text && target && text.indexOf(target) !== -1) {
    const i = text.indexOf(target);
    const emphasised = heroL
      ? target.split('L').map((chunk, n) => (
          <React.Fragment key={n}>{n > 0 ? <HeroL /> : null}{chunk}</React.Fragment>
        ))
      : <span style={{ fontFamily: 'var(--font-mix)' }}>{target}</span>;
    content = [text.slice(0, i), <React.Fragment key="e">{emphasised}</React.Fragment>, text.slice(i + target.length)];
  }

  return (
    <Tag
      style={{ margin: 0, fontFamily: 'var(--font-sans)', fontWeight: 'var(--weight-regular)', textTransform: 'var(--case-title)' as React.CSSProperties['textTransform'], letterSpacing: 'var(--tracking-title)', textAlign: align, color: tone === 'inherit' ? 'inherit' : tone, textWrap: 'balance' as React.CSSProperties['textWrap'], ...HEADLINE_SIZES[size], ...style }}
      {...rest}
    >{content}</Tag>
  );
}
