/**
 * Small status/metadata label.
 */
export interface BadgeProps {
  children?: React.ReactNode;
  tone?: keyof typeof BADGE_TONES;
  style?: React.CSSProperties;
}

export function Badge(props: BadgeProps): JSX.Element;
