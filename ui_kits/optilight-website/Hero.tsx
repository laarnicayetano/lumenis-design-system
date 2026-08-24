import { Badge, Headline, Prose, Button, Rays, Eyebrow, StatBlock } from '../../components';

export function Hero({ onBook }: { onBook: () => void }) {
  return (
    <section id="top" style={{ position: 'relative', overflow: 'hidden', background: 'var(--surface-page)' }}>
      <div style={{ maxWidth: 'var(--page-max)', margin: '0 auto', padding: 'var(--space-8) var(--page-gutter) var(--space-9)', display: 'grid', gridTemplateColumns: '1.05fr .95fr', gap: 'var(--space-8)', alignItems: 'center', minHeight: 'calc(100vh - 74px)' }}>
        <div>
          <Badge tone="accent" style={{ marginBottom: 'var(--space-5)' }}>FDA-cleared · Dry eye disease</Badge>
          <Headline mix="SOLUTION" style={{ marginBottom: 'var(--space-5)' }}>A bright solution for dry eyes</Headline>
          <Prose size="subtitle" tone="var(--text-muted)" maxWidth="30ch" style={{ marginBottom: 'var(--space-7)' }}>
            OptiLIGHT™ elevates dry-eye management with Lumenis' patented Optimal Pulse Technology — the safe, precise, elegant procedure you want and the comfortable therapy your patients need.
          </Prose>
          <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap', marginBottom: 'var(--space-8)' }}>
            <Button variant="accent" onClick={onBook}>Find a provider</Button>
            <Button variant="accent-outline" onClick={onBook}>How it works</Button>
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-6)', alignItems: 'center', flexWrap: 'wrap' }}>
            <StatBlock value="4×" label="Treatment sessions" />
            <span style={{ width: 1, height: 34, background: 'var(--border-subtle)' }} />
            <StatBlock value="OPT™" label="Optimal pulse technology" />
            <span style={{ width: 1, height: 34, background: 'var(--border-subtle)' }} />
            <StatBlock value="~15 min" label="In-office" />
          </div>
        </div>

        <div style={{ position: 'relative', borderRadius: 'var(--radius-lg)', overflow: 'hidden', aspectRatio: '4 / 5', boxShadow: 'var(--shadow-lg)' }}>
          <img src="../../assets/photography/people-prism-eye.webp" alt="Patient with prism light over the eye" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <Rays tone="blue" origin="right" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', mixBlendMode: 'screen', opacity: 0.95 }} />
          <div style={{ position: 'absolute', left: 22, bottom: 20, color: 'var(--lum-white)', textShadow: '0 1px 10px rgba(0,0,0,.4)' }}>
            <Eyebrow style={{ color: 'inherit' }}>Establishing light as a</Eyebrow>
            <div style={{ fontFamily: 'var(--font-mix)', fontSize: 30, lineHeight: 1.05, textTransform: 'uppercase' }}>healing energy</div>
          </div>
        </div>
      </div>
    </section>
  );
}
