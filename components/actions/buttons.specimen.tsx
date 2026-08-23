import { Button, TextLink } from "../index";

export const card = {
  group: "Components",
  viewport: [700, 230] as [number, number],
  name: "Buttons & links",
  subtitle: "CTA variants, sizes, states, and the text link",
  padding: "20px",
};

export default function ButtonsSpecimen() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <style>{`
                .row{display:flex;align-items:center;gap:16px;flex-wrap:wrap}
        .dark{background:var(--lum-black);padding:16px;margin-top:4px}
      `}</style>
      <div className="row">
        <Button>Discover more</Button>
        <Button variant="secondary">Download kit</Button>
        <Button size="sm">Read more</Button>
        <Button size="sm" variant="secondary" disabled>
          Unavailable
        </Button>
      </div>
      <div className="row dark">
        <Button variant="inverse">Discover more</Button>
        <Button variant="inverse-outline">Learn more</Button>
      </div>
      <div className="row" data-subbrand="optilight">
        <Button variant="accent">Book a demo</Button>
        <Button variant="accent-outline">Clinical studies</Button>
        <TextLink href="#" caps size="caption">
          Find a provider
        </TextLink>
      </div>
    </div>
  );
}
