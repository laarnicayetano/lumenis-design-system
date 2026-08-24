import React from 'react';
import { Eyebrow } from '../../typography/Eyebrow/Eyebrow';

/**
 * Device tile for the OUR PRODUCTS grid.
 */
export interface ProductCardProps {
  /** Product name, rendered uppercase — include the trademark symbol. */
  name: string;
  /** Optional market or category line, e.g. "Aesthetics · Hair loss". */
  market?: string;
  /** Device photograph on transparent or #F2F2F2 ground. */
  image?: string;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
}

/* Product tile from the OUR PRODUCTS grid: device shot on the photography
   grey, name beneath in caps. Image tile rounds softly and lifts on hover
   (tokens/surfaces.css); no fill on the tile itself. */
export function ProductCard({ name, market, image, href = '#', onClick, style, ...rest }: ProductCardProps) {
  const [hover, setHover] = React.useState(false);
  return (
    <a
      href={href}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', textDecoration: 'none', color: 'inherit', ...style }}
      {...rest}
    >
      <div style={{ position: 'relative', aspectRatio: '252 / 391', background: 'var(--surface-image)', overflow: 'hidden', borderRadius: 'var(--radius-md)', boxShadow: hover ? 'var(--shadow-md)' : 'var(--shadow-none)', transition: 'box-shadow var(--dur-base) var(--ease-brand)' }}>
        {image
          ? <img src={image} alt={name} style={{ width: '100%', height: '100%', objectFit: 'contain', transform: hover ? 'scale(1.03)' : 'none', transition: 'transform var(--dur-base) var(--ease-brand)' }} />
          : <span style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', fontSize: 'var(--text-caption)', letterSpacing: 'var(--tracking-caption)', textTransform: 'uppercase', color: 'var(--text-muted)', opacity: 0.5 }}>Device image</span>}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
        <span style={{ fontSize: 'var(--text-subtitle)', lineHeight: 1.1, textTransform: 'uppercase', borderBottom: '1px solid ' + (hover ? 'currentColor' : 'transparent'), alignSelf: 'flex-start', transition: 'border-color var(--dur-fast) var(--ease-brand)' }}>{name}</span>
        {market ? <Eyebrow style={{ color: 'var(--text-muted)' }}>{market}</Eyebrow> : null}
      </div>
    </a>
  );
}
