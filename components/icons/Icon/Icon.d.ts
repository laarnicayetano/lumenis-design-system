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

export function Icon(props: IconProps): JSX.Element;
