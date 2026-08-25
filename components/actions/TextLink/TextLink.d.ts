/** Text link; underline appears on hover. */
export interface TextLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children?: React.ReactNode;
  href?: string;
  tone?: string;
  /** All caps — used for nav items and READ MORE links. */
  caps?: boolean;
  size?: 'body' | 'small' | 'caption';
  style?: React.CSSProperties;
}

export function TextLink(props: TextLinkProps): JSX.Element;
