import { Card, Eyebrow, Headline, Quote } from '../../components';

const ITEMS = [
  { img: '../../assets/photography/shutterstock_1549746530.webp', quote: 'My skin looks lifted and refreshed — friends keep asking what I did.', name: 'Patient, age 52' },
  { img: '../../assets/photography/shutterstock_724330396.webp', quote: 'Zero downtime. I was back at work the same afternoon.', name: 'Patient, age 41' },
];

/* Each testimonial is a Card — the image sits in the padding-0 slot, copy in
   a second padded block below it. */
export function Results() {
  return (
    <section id="results" style={{ padding: 'var(--space-9) var(--page-gutter)' }}>
      <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
        <Eyebrow style={{ color: 'var(--text-muted)' }}>Real results</Eyebrow>
        <Headline as="h2" size="small" align="center">Confidence, restored</Headline>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-7)', maxWidth: 960, margin: '0 auto' }}>
        {ITEMS.map((it) => (
          <Card key={it.name} padding="0" style={{ overflow: 'hidden' }}>
            <img src={it.img} style={{ width: '100%', height: 280, objectFit: 'cover', display: 'block' }} alt="" />
            <div style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <Quote>{it.quote}</Quote>
              <Eyebrow style={{ color: 'var(--text-muted)' }}>{it.name}</Eyebrow>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
