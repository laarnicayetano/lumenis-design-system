/**
 * All-caps Lumenis headline with one optional emphasis treatment.
 */
export interface HeadlineProps {
  children?: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
  /** display 80px · title 56px · small 40px. */
  size?: "display" | "title" | "small";
  align?: "left" | "right" | "center";
  /** Word whose "L" becomes the Hero "L". Mutually exclusive with `mix`. */
  heroL?: string;
  /** Word to set in Arizona Mix. Mutually exclusive with `heroL`. */
  mix?: string;
  tone?: string;
  style?: React.CSSProperties;
}

export function Headline(props: HeadlineProps): JSX.Element;
