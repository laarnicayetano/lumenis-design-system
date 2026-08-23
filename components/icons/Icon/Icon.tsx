import React from 'react';

/**
 * A single line icon. Substituted glyph set — see prompt notes.
 */
export interface IconProps {
  /** Phosphor icon name, e.g. "eye", "sparkle", "user-circle". */
  name: string;
  /** small = 1pt stroke beside type · large = 2pt expressive scale. */
  scale?: 'small' | 'large';
  size?: number;
  tone?: string;
  style?: React.CSSProperties;
}

/* Line-icon wrapper. Lumenis' own icon illustrations were NOT supplied with
   this system, so glyphs come from Phosphor Icons (Thin/Light) — the closest
   match to the brand's 1pt/2pt even-stroke geometric line style.
   Host pages must load the CDN stylesheets once:
   https://unpkg.com/@phosphor-icons/web@2.1.1/src/light/style.css
   https://unpkg.com/@phosphor-icons/web@2.1.1/src/thin/style.css */
export function Icon({ name, scale = 'small', size, tone = 'currentColor', style, ...rest }: IconProps) {
  const weight = scale === 'large' ? 'ph-thin' : 'ph-light';
  const px = size || (scale === 'large' ? 96 : 24);
  return (
    <i
      className={weight + ' ph-' + name}
      aria-hidden="true"
      style={{ fontSize: px, lineHeight: 1, color: tone, display: 'inline-block', ...style }}
      {...rest}
    />
  );
}
