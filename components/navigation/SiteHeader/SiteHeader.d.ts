/**
 * Corporate site header: wordmark, all-caps nav, locale.
 */
export interface SiteHeaderNavItem {
  id: string;
  label: string;
  href?: string;
}

export interface SiteHeaderProps {
  nav?: SiteHeaderNavItem[];
  /** id of the current nav item. */
  active?: string;
  locale?: string;
  onNavigate?: (id: string) => void;
  /** `inverse` for the black header used over dark hero sections. */
  tone?: 'page' | 'inverse';
  style?: React.CSSProperties;
}

export function SiteHeader(props: SiteHeaderProps): JSX.Element;
