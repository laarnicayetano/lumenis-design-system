/**
 * Selectable filter chip.
 */
export interface TagProps {
  children?: React.ReactNode;
  selected?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  tone?: 'page' | 'inverse';
  style?: React.CSSProperties;
}

export function Tag(props: TagProps): JSX.Element;
