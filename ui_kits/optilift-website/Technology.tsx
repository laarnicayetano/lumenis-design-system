import React from 'react';
import { Eyebrow, Headline, Prose, Tag } from '../../components';

const AREAS = ['Face', 'Neck', 'Jawline'];

export function Technology() {
  const [area, setArea] = React.useState('Face');
  return (
    <section id="technology" style={{ padding: 'var(--space-9) var(--page-gutter)', background: 'var(--surface-inverse)', color: 'var(--text-inverse)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: 'var(--space-9)', alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)', alignItems: 'flex-start' }}>
          <Eyebrow style={{ opacity: 0.6 }}>The technology</Eyebrow>
          <Headline as="h2" size="small">Optical energy, precisely delivered</Headline>
          <Prose tone="rgba(255,255,255,.75)" maxWidth="34ch">
            Two handpieces work in tandem to stimulate collagen remodeling beneath the skin's surface — treating the face and neck in a single session.
          </Prose>
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            {AREAS.map((a) => (
              <Tag key={a} tone="inverse" selected={area === a} onClick={() => setArea(a)}>{a}</Tag>
            ))}
          </div>
        </div>
        <img src="assets/optilift/product/black-bg/lumenis_02.756.webp" style={{ width: '100%' }} alt="OptiLIFT console detail" />
      </div>
    </section>
  );
}
