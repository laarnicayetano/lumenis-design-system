export interface RaysProps {
  /** `blue` = white rays on an OptiLIGHT Blue wedge (for dark/blue backgrounds). `light` = blue rays on a pale wedge (for light backgrounds). */
  tone?: 'blue' | 'light';
  /** Which corner the rays converge from. Pick whichever leaves the layout's text column clear. */
  origin?: 'bottom-left' | 'right';
  /** Masks the rays out of a band so overlaid text stays legible, instead of relying on opacity alone. */
  clear?: 'center' | 'left' | 'right' | null;
  className?: string;
  style?: React.CSSProperties;
}

export function Rays(props: RaysProps): JSX.Element;
