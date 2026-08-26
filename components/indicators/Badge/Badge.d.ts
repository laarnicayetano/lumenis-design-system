/**
 * Small status/metadata label.
 */
export interface BadgeProps {
  children?: React.ReactNode;
  tone?: "neutral" | "accent" | "tone";
  style?: React.CSSProperties;
}

export function Badge(props: BadgeProps): JSX.Element;
