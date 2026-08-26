/**
 * Generic bordered, softly-rounded surface for grouping content.
 */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  padding?: string;
  /** Shadow depth — `none` for a flat bordered block, `sm` for the default resting state, `md` for a lifted/hover state. */
  elevation?: "none" | "sm" | "md";
  tone?: "page" | "inverse";
  style?: React.CSSProperties;
}

export function Card(props: CardProps): JSX.Element;
