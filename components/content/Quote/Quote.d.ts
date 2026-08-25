/** Practitioner testimonial with caps attribution. */
export interface QuoteProps {
  children?: React.ReactNode;
  /** Name, e.g. "Evie Rose". */
  attribution?: string;
  /** Practice or role, e.g. "Aesthetic Clinic, London". */
  role?: string;
  tone?: 'page' | 'inverse';
  style?: React.CSSProperties;
}

export function Quote(props: QuoteProps): JSX.Element;
