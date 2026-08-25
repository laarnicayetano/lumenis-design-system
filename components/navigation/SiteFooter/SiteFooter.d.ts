/**
 * Corporate footer: black field, link columns, legal row.
 */
export interface SiteFooterColumn {
  title: string;
  links: string[];
}

export interface SiteFooterProps {
  columns?: SiteFooterColumn[];
  /** Phosphor icon names for social links, e.g. ['facebook-logo','instagram-logo']. */
  social?: string[];
  legal?: string;
  policies?: string[];
  style?: React.CSSProperties;
}

export function SiteFooter(props: SiteFooterProps): JSX.Element;
