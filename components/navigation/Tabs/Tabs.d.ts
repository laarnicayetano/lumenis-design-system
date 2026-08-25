export interface TabItem {
  id: string;
  label: string;
}

/**
 * Underline tab bar for switching between panels.
 */
export interface TabsProps {
  tabs: Array<TabItem | string>;
  active?: string;
  onChange?: (id: string) => void;
  tone?: 'page' | 'inverse';
  style?: React.CSSProperties;
}

export function Tabs(props: TabsProps): JSX.Element;
