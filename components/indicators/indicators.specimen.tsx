import { Badge, Tag } from "../index";

export const card = {
  group: "Components",
  viewport: [700, 160] as [number, number],
  name: "Badge & tag",
  subtitle: "Status labels and selectable filter chips",
  padding: "20px",
};

export default function IndicatorsSpecimen() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <Badge>New</Badge>
        <Badge tone="accent">FDA cleared</Badge>
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <Tag selected>Aesthetics</Tag>
        <Tag>Vision</Tag>
      </div>
    </div>
  );
}
