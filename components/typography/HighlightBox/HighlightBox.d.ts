/** Squared box highlight around 1–2 words of a headline. */
export interface HighlightBoxProps {
  children?: React.ReactNode;
  tone?: string;
  filled?: boolean;
  style?: React.CSSProperties;
}

export function HighlightBox(props: HighlightBoxProps): JSX.Element;
