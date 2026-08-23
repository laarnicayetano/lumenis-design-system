import React from 'react';
import { Logotype } from '../../brand/Logotype/Logotype';
import { TextLink } from '../../actions/TextLink/TextLink';
import { Eyebrow } from '../../typography/Eyebrow/Eyebrow';

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

/* Corporate footer (p.58, lumenis.com): black field, white wordmark, columns
   of all-caps headings over sentence-case links, legal row on a hairline. */
export function SiteFooter({ columns = [], social = [], legal = 'Copyright © 2010- Lumenis Be Ltd. All Rights Reserved', policies = [], style, ...rest }: SiteFooterProps) {
  return (
    <footer
      style={{
        background: 'var(--surface-inverse)', color: 'var(--text-inverse)',
        padding: 'var(--space-9) var(--page-gutter) var(--space-6)',
        display: 'flex', flexDirection: 'column', gap: 'var(--space-9)', ...style,
      }}
      {...rest}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '220px repeat(' + Math.max(columns.length, 1) + ', 1fr)', gap: 'var(--space-8)' }}>
        <Logotype tone="white" width={168} />
        {columns.map((col) => (
          <div key={col.title} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <Eyebrow style={{ opacity: 0.55 }}>{col.title}</Eyebrow>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {col.links.map((l) => (
                <TextLink key={l} href="#" size="small" style={{ opacity: 0.85 }}>{l}</TextLink>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-6)', paddingTop: 'var(--space-5)', borderTop: 'var(--border-width-hairline) solid rgba(255,255,255,.25)' }}>
        <Eyebrow style={{ opacity: 0.55 }}>{legal}</Eyebrow>
        <div style={{ display: 'flex', gap: 'var(--space-5)', marginLeft: 'auto' }}>
          {policies.map((p) => (<TextLink key={p} href="#" size="caption" caps style={{ opacity: 0.7 }}>{p}</TextLink>))}
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
          {social.map((s) => (<i key={s} className={'ph-light ph-' + s} style={{ fontSize: 20, opacity: 0.8 }} aria-hidden="true" />))}
        </div>
      </div>
    </footer>
  );
}
