/**
 * The split composition every Lumenis format is built from.
 */
export interface SplitLayoutProps {
  children?: React.ReactNode;
  /** Split the format left/right or top/bottom. */
  direction?: 'row' | 'column';
  /** CSS grid track sizes, e.g. "1fr 1fr" or "5fr 7fr". */
  ratio?: string;
  reverse?: boolean;
  gap?: number | string;
  minHeight?: number | string;
  style?: React.CSSProperties;
}

export function SplitLayout(props: SplitLayoutProps): JSX.Element;

export interface SplitPanelProps {
  children?: React.ReactNode;
  /** Background treatment for this half. */
  tone?: keyof typeof PANEL_TONES;
  align?: 'flex-start' | 'center' | 'flex-end' | 'space-between';
  pad?: number | string;
  /** Background image URL for a photography half. */
  image?: string;
  style?: React.CSSProperties;
}

export function SplitPanel(props: SplitPanelProps): JSX.Element;
