import React from 'react';
import { Headline, TextLink, Logotype } from '../../components';

Logotype.assetBase = '../../assets';

export const NAV = [
  { id: 'aesthetics', label: 'Aesthetics' },
  { id: 'vision', label: 'Vision' },
  { id: 'resources', label: 'Resources' },
  { id: 'about', label: 'About' },
  { id: 'support', label: 'Support' },
  { id: 'contact', label: 'Contact' },
];

export const FOOTER_COLUMNS = [
  { title: 'Company', links: ['About Lumenis', 'Lumenis Leadership', 'Careers', 'Lumenis App', 'Partner Zone'] },
  { title: 'Aesthetics', links: ['Facial Muscle Stimulation', 'Hair Removal', 'Body', 'Hair Loss', 'Skin', 'Women’s Health'] },
  { title: 'Vision', links: ['Dry Eye', 'Glaucoma', 'Retina'] },
  { title: 'Patients', links: ['triLift', 'TreatMyDryEye', 'Aesthetipedia', 'SmoothGlo'] },
];

export const PRODUCTS = [
  { name: 'FoLix™', market: 'Aesthetics · Hair loss', sub: 'folix' },
  { name: 'triLift', market: 'Aesthetics · Facial stimulation', sub: 'trilift' },
  { name: 'Stellar M22™', market: 'Aesthetics · IPL platform', sub: 'stellar-m22' },
  { name: 'SPLENDOR X', market: 'Aesthetics · Hair removal', sub: 'splendorx' },
  { name: 'OptiLIGHT', market: 'Vision · Dry eye', sub: 'optilight' },
  { name: 'Digital Duet', market: 'Vision · SLT + YAG', sub: 'digital-duet' },
];

export const INSIGHTS = [
  { title: 'FoLix Named Best Laser Treatment for Hair Loss Two Years Running', topics: ['FoLix', 'Hair Loss', 'News'] },
  { title: 'Lumenis OptiLIFT Receives Health Canada Approval for Evaporative Dry Eye Disease', topics: ['Dry Eye', 'News'] },
  { title: 'Redefining Dry Eye Care: A Boutique Practice Case Study', topics: ['Blog', 'Dry Eye'] },
];

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  tone?: 'page' | 'inverse' | 'image' | 'accent';
  pad?: string;
  style?: React.CSSProperties;
}

export function Section({ children, tone = 'page', pad = 'var(--space-10) var(--page-gutter)', style, ...rest }: SectionProps) {
  const tones = {
    page: { background: 'var(--surface-page)', color: 'var(--text-primary)' },
    inverse: { background: 'var(--surface-inverse)', color: 'var(--text-inverse)' },
    image: { background: 'var(--surface-image)', color: 'var(--text-primary)' },
    accent: { background: 'var(--accent)', color: 'var(--accent-contrast)' },
  } as const;
  return <section style={{ padding: pad, ...tones[tone], ...style }} {...rest}>{children}</section>;
}

interface SectionHeadProps {
  children?: React.ReactNode;
  action?: string;
  tone?: string;
}

export function SectionHead({ children, action, tone }: SectionHeadProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 'var(--space-6)', paddingBottom: 'var(--space-6)', marginBottom: 'var(--space-8)', borderBottom: 'var(--border-width-hairline) solid ' + (tone === 'inverse' ? 'rgba(255,255,255,.25)' : 'var(--border-subtle)') }}>
      <Headline as="h2" size="small">{children}</Headline>
      {action ? <TextLink href="#" caps size="caption">{action}</TextLink> : null}
    </div>
  );
}

interface ImagePlateProps {
  label?: string;
  ratio?: string;
  tone?: 'image' | 'dark';
  style?: React.CSSProperties;
}

export function ImagePlate({ label = 'Photography', ratio = '4 / 3', tone = 'image', style }: ImagePlateProps) {
  return (
    <div style={{ aspectRatio: ratio, background: tone === 'dark' ? 'var(--lum-shine-grey)' : 'var(--surface-image)', display: 'grid', placeItems: 'center', ...style }}>
      <span style={{ fontSize: 'var(--text-caption)', letterSpacing: 'var(--tracking-caption)', textTransform: 'uppercase', color: tone === 'dark' ? 'rgba(255,255,255,.6)' : 'var(--text-muted)', opacity: 0.7 }}>{label}</span>
    </div>
  );
}
