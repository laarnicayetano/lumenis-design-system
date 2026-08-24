import React from 'react';
import { Eyebrow, Headline, Prose, Card, Icon, Tabs, Badge, Rays } from '../../components';

const VALUE_PROPS = [
  { icon: 'eye', t: 'Targeted relief', d: 'Light applied at the source addresses the root inflammation behind dry-eye disease.' },
  { icon: 'pulse', t: 'Optimal Pulse Technology', d: 'Patented OPT™ delivers precise, uniform pulses for a controlled, repeatable treatment.' },
  { icon: 'drop', t: 'Restores the tear film', d: 'Stimulates the meibomian glands to improve tear quality and lasting comfort.' },
  { icon: 'clock', t: 'Quick & in-office', d: 'A gentle ~15-minute procedure with no downtime — patients return to their day.' },
];

export function ValueProps() {
  return (
    <section id="treatment" style={{ padding: 'var(--space-10) var(--page-gutter)' }}>
      <div style={{ maxWidth: 'var(--page-max)', margin: '0 auto' }}>
        <div style={{ maxWidth: 640, marginBottom: 'var(--space-8)' }}>
          <Eyebrow style={{ color: 'var(--lum-blue)', marginBottom: 'var(--space-4)' }}>Why OptiLIGHT</Eyebrow>
          <Headline as="h2" size="small" mix="LIGHT">A new age of dry-eye care, built on light.</Headline>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-5)' }}>
          {VALUE_PROPS.map((it) => (
            <Card key={it.t}>
              <div style={{ width: 46, height: 46, borderRadius: 'var(--radius-md)', background: '#eef4ff', color: 'var(--lum-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 'var(--space-4)' }}>
                <Icon name={it.icon} size={24} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-sans)', fontSize: 18, margin: '0 0 9px' }}>{it.t}</h3>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14.5, lineHeight: 1.55, color: 'var(--text-muted)', margin: 0 }}>{it.d}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PrismBand() {
  return (
    <section style={{ position: 'relative', overflow: 'hidden', minHeight: 520, display: 'flex', alignItems: 'center' }}>
      <img src="assets/photography/people-rainbow-face.webp" alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(10,12,16,.55) 0%, rgba(10,12,16,.15) 55%, transparent 100%)' }} />
      <div style={{ position: 'relative', maxWidth: 'var(--page-max)', margin: '0 auto', padding: '0 var(--page-gutter)', width: '100%' }}>
        <div style={{ maxWidth: 560, color: 'var(--lum-white)' }}>
          <Eyebrow style={{ color: 'inherit', marginBottom: 'var(--space-5)' }}>Unveil the best in you</Eyebrow>
          <div style={{ fontFamily: 'var(--font-mix)', fontSize: 'clamp(34px,4.4vw,56px)', lineHeight: 1.08, marginBottom: 'var(--space-5)' }}>
            "Light, used with intention, becomes a healing energy."
          </div>
          <Prose tone="rgba(255,255,255,.86)" maxWidth="28ch">
            The signature prism falls across the eye — a reminder that relief can feel as gentle and bright as morning light.
          </Prose>
        </div>
      </div>
    </section>
  );
}

const SHOWCASE_DATA = {
  pro: {
    eyebrow: 'For eye-care professionals',
    title: 'Engineered for precision and trust',
    body: 'User-centered console design, validated parameters, and the consistency of OPT™ — so every session is safe, efficient, and repeatable.',
    specs: ['IPL · 500–600nm', 'Skin types I–IV', 'Contact cooling', 'Optimal Pulse Technology'],
  },
  pt: {
    eyebrow: 'For patients',
    title: 'A calm, comfortable experience',
    body: 'A short in-office visit with no downtime. A cool applicator and gentle pulses of light — most patients describe it as a warm, painless flicker.',
    specs: ['~15-minute visit', 'No downtime', 'Typically 4 sessions', 'Gentle & non-invasive'],
  },
} as const;

export function ProductShowcase() {
  const [tab, setTab] = React.useState<keyof typeof SHOWCASE_DATA>('pro');
  const d = SHOWCASE_DATA[tab];
  return (
    <section id="technology" style={{ padding: 'var(--space-10) var(--page-gutter)', background: '#f7f8fa' }}>
      <div style={{ maxWidth: 'var(--page-max)', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-8)', alignItems: 'center' }}>
        <div style={{ position: 'relative', borderRadius: 'var(--radius-lg)', overflow: 'hidden', background: 'var(--lum-image-grey)', aspectRatio: '1 / 1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Rays tone="light" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.5 }} />
          <img src="assets/optilight/product/optilight-device-tabletop.webp" alt="OptiLIGHT device" style={{ position: 'relative', width: '86%', filter: 'drop-shadow(0 30px 50px rgba(16,24,40,.18))' }} />
        </div>
        <div>
          <Tabs tabs={[{ id: 'pro', label: 'Professionals' }, { id: 'pt', label: 'Patients' }]} active={tab} onChange={(id) => setTab(id as keyof typeof SHOWCASE_DATA)} style={{ marginBottom: 'var(--space-6)', display: 'inline-flex' }} />
          <Eyebrow style={{ color: 'var(--lum-blue)', marginBottom: 'var(--space-3)' }}>{d.eyebrow}</Eyebrow>
          <Headline as="h2" size="small" style={{ marginBottom: 'var(--space-5)' }}>{d.title}</Headline>
          <Prose size="subtitle" style={{ marginBottom: 'var(--space-6)' }}>{d.body}</Prose>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
            {d.specs.map((s) => <Badge key={s}>{s}</Badge>)}
          </div>
        </div>
      </div>
    </section>
  );
}
