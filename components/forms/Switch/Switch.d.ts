/**
 * On/off toggle with a sentence-case inline label.
 */
export interface SwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: React.ReactNode;
  disabled?: boolean;
  tone?: 'page' | 'inverse';
  style?: React.CSSProperties;
}

export function Switch(props: SwitchProps): JSX.Element;
