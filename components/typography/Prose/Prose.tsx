import React from 'react';

/* Body copy. Paragraph 18/25, form 16/22.4, subtitle 28/32.5 (p.24). */
const PROSE_SIZES = {
  subtitle: { fontSize: 'var(--text-subtitle)', lineHeight: 'var(--leading-subtitle)' },
  body: { fontSize: 'var(--text-body)', lineHeight: 'var(--leading-body)' },
  small: { fontSize: 'var(--text-form)', lineHeight: 'var(--leading-form)' },
} as const;

/** Sentence-case body copy: subtitle, paragraph, or small. */
export interface ProseProps {
  children?: React.ReactNode;
  /** subtitle 28px · body 18px · small 16px. */
  size?: keyof typeof PROSE_SIZES;
  tone?: string;
  maxWidth?: number | string;
  style?: React.CSSProperties;
}

export function Prose({ children, size = 'body', tone = 'inherit', maxWidth = '58ch', style, ...rest }: ProseProps) {
  return (
    <p style={{ margin: 0, fontFamily: 'var(--font-sans)', fontWeight: 'var(--weight-regular)', color: tone === 'inherit' ? 'inherit' : tone, maxWidth, textWrap: 'pretty' as React.CSSProperties['textWrap'], ...PROSE_SIZES[size], ...style }} {...rest}>{children}</p>
  );
}
