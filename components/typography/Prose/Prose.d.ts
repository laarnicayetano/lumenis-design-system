/** Sentence-case body copy: subtitle, paragraph, or small. */
export interface ProseProps {
  children?: React.ReactNode;
  /** subtitle 28px · body 18px · small 16px. */
  size?: keyof typeof PROSE_SIZES;
  tone?: string;
  maxWidth?: number | string;
  style?: React.CSSProperties;
}

export function Prose(props: ProseProps): JSX.Element;
