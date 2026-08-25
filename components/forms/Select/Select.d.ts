export interface SelectOption {
  label: string;
  value: string;
}

/**
 * Bordered, softly-rounded select — the dropdown counterpart to TextField.
 */
export interface SelectProps {
  /** All-caps field label. */
  label: string;
  options: Array<SelectOption | string>;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  tone?: 'page' | 'inverse';
  style?: React.CSSProperties;
}

export function Select(props: SelectProps): JSX.Element;
