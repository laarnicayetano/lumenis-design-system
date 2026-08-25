/** Proof-point figure: big numeral over an all-caps label. */
export interface StatBlockProps {
  /** The figure, e.g. "88+" or "90k+". */
  value: string;
  /** All-caps label, e.g. "Countries worldwide". */
  label: string;
  /** Optional sentence-case qualifier. */
  detail?: string;
  tone?: string;
  style?: React.CSSProperties;
}

export function StatBlock(props: StatBlockProps): JSX.Element;
