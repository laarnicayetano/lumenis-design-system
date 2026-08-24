import React from 'react';

/**
 * The Lumenis wordmark or Hero "L" symbol, as a supplied SVG asset.
 */
export interface LogotypeProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** Positive (black) or negative (white) version. */
  tone?: 'black' | 'white';
  /** Full wordmark, or the Hero "L" symbol alone. */
  variant?: 'wordmark' | 'symbol';
  /** Rendered width in px. Wordmark must never go below 50px on screen. */
  width?: number;
  /** Reserve the guideline safety zone as padding. */
  safety?: boolean;
  /** Path to the copied `assets/` directory, relative to the consuming page. Defaults to `Logotype.assetBase`. */
  assetBase?: string;
  alt?: string;
  style?: React.CSSProperties;
}

/* The Lumenis wordmark. Never recoloured, never restyled — only positive
   (black) or negative (white). Safety zone on all four sides = x (p.12).
   `assetBase` is a prop (not just the static default below) so pages that
   mount Logotype at more than one relative depth aren't stuck sharing a
   single global path. */
export function Logotype({ tone = 'black', variant = 'wordmark', width, safety = false, assetBase = Logotype.assetBase, alt = 'Lumenis', style, ...rest }: LogotypeProps) {
  const base = variant === 'symbol' ? 'symbol' : 'wordmark';
  const src = assetBase + '/logo/' + base + '-' + tone + '.svg';
  const w = width || (variant === 'symbol' ? 48 : 180);
  return (
    <img
      src={src}
      alt={alt}
      style={{ display: 'block', width: w, height: 'auto', padding: safety ? 'calc(var(--logo-safety) * 0.5)' : 0, ...style }}
      {...rest}
    />
  );
}

/* Consumers point this at wherever they copied assets/ to. */
Logotype.assetBase = 'assets';
