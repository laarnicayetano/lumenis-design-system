/**
 * Squared checkbox with a sentence-case inline label.
 */
export interface CheckboxProps {
  label?: React.ReactNode;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  readOnly?: boolean;
  tone?: 'page' | 'inverse';
  style?: React.CSSProperties;
}

export function Checkbox(props: CheckboxProps): JSX.Element;
