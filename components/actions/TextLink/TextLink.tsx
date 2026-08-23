import React from 'react';

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

/* Text link with the brand's underline-on-hover behaviour. Used for nav,
   inline links, and the "READ MORE" style links in resource cards. */
export function TextLink({ children, href = '#', tone = 'inherit', caps = false, size = 'body', style, ...rest }: TextLinkProps) {
  const [hover, setHover] = React.useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        fontFamily: 'var(--font-sans)',
        fontSize: size === 'caption' ? 'var(--text-caption)' : size === 'small' ? 'var(--text-form)' : 'var(--text-body)',
        textTransform: caps ? 'uppercase' : 'none',
        letterSpacing: caps ? 'var(--tracking-caption)' : 0,
        color: tone === 'inherit' ? 'inherit' : tone,
        textDecoration: 'none',
        borderBottom: '1px solid ' + (hover ? 'currentColor' : 'transparent'),
        paddingBottom: 2,
        transition: 'border-color var(--dur-fast) var(--ease-brand)',
        ...style,
      }}
      {...rest}
    >{children}</a>
  );
}
