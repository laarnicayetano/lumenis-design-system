/**
 * Bordered, softly-rounded text or textarea field.
 */
export interface TextFieldProps {
  /** All-caps field label. */
  label: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  /** Render a textarea instead of an input. */
  multiline?: boolean;
  rows?: number;
  tone?: 'page' | 'inverse';
  style?: React.CSSProperties;
}

export function TextField(props: TextFieldProps): JSX.Element;
