import React from 'react';
import { Logotype } from '../../brand/Logotype/Logotype';
import { TextLink } from '../../actions/TextLink/TextLink';

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

/* Corporate header (guidelines p.58, lumenis.com): hairline rule under a
   single row — wordmark left, all-caps nav right, locale and Patients split
   off to the far right. No fills, no shadows. */
export function SiteHeader({ nav = [], active, locale = 'Global, English', onNavigate, tone = 'page', style, ...rest }: SiteHeaderProps) {
  const inverse = tone === 'inverse';
  return (
    <header
      style={{
        display: 'flex', alignItems: 'center', gap: 'var(--space-9)',
        padding: '0 var(--page-gutter)', height: 88,
        background: inverse ? 'var(--surface-inverse)' : 'var(--surface-page)',
        color: inverse ? 'var(--text-inverse)' : 'var(--text-primary)',
        borderBottom: 'var(--border-width-hairline) solid ' + (inverse ? 'var(--border-hairline-inverse)' : 'var(--border-subtle)'),
        ...style,
      }}
      {...rest}
    >
      <a href="#" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate(nav[0] && nav[0].id); }} style={{ display: 'block', flex: '0 0 auto' }}>
        <Logotype tone={inverse ? 'white' : 'black'} width={132} />
      </a>
      <nav style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-6)', marginLeft: 'auto' }}>
        {nav.map((item) => (
          <TextLink
            key={item.id}
            href={item.href || '#'}
            caps
            size="caption"
            onClick={(e) => { if (onNavigate) { e.preventDefault(); onNavigate(item.id); } }}
            style={{ borderBottomColor: active === item.id ? 'currentColor' : 'transparent', opacity: active && active !== item.id ? 0.55 : 1 }}
          >{item.label}</TextLink>
        ))}
      </nav>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-5)', paddingLeft: 'var(--space-6)', borderLeft: 'var(--border-width-hairline) solid ' + (inverse ? 'rgba(255,255,255,.3)' : 'var(--border-subtle)') }}>
        <TextLink href="#" caps size="caption">Patients</TextLink>
        <span style={{ fontSize: 'var(--text-caption)', letterSpacing: 'var(--tracking-caption)', textTransform: 'uppercase', opacity: 0.55 }}>{locale}</span>
      </div>
    </header>
  );
}
