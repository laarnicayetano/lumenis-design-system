/**
 * Circular radio with a sentence-case inline label.
 */
export interface RadioProps {
  label?: React.ReactNode;
  name?: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  readOnly?: boolean;
  tone?: 'page' | 'inverse';
  style?: React.CSSProperties;
}

export function Radio(props: RadioProps): JSX.Element;
