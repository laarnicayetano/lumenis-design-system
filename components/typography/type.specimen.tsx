import { Headline, Prose, Eyebrow, HighlightBox } from "../index";

export const card = {
  group: "Components",
  viewport: [700, 320] as [number, number],
  name: "Headline, prose & highlight",
  subtitle: "Hero L and Arizona Mix emphasis, body sizes, box highlight",
  padding: "20px",
};

export default function TypeSpecimen() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <Eyebrow style={{ color: "var(--text-muted)" }}>
        New age of dry eyes solution
      </Eyebrow>
      <Headline size="small" heroL="UNVEIL">
        Unveil the best in you
      </Headline>
      <Headline size="small" mix="BEAUTY">
        Express your inner beauty.
      </Headline>
      <Headline as="h3" size="small" style={{ fontSize: "28px" }}>
        Open yourself. <HighlightBox>Discover</HighlightBox> a new you.
      </Headline>
      <Prose size="small">
        Lumenis is a global leader in the field of minimally-invasive clinical
        solutions for Ophthalmology and Aesthetic markets.
      </Prose>
    </div>
  );
}
