import { Card, StatBlock } from "../index";

export const card = {
  group: "Components",
  viewport: [700, 200] as [number, number],
  name: "Card",
  subtitle: "Bordered, softly-rounded content surface",
  padding: "20px",
};

export default function CardSpecimen() {
  return (
    <div style={{ display: "flex", gap: 22 }}>
      <Card style={{ flex: 1 }}>
        <StatBlock value="88+" label="Countries" detail="Worldwide" />
      </Card>
      <Card elevation="md" style={{ flex: 1 }}>Elevated / hover state</Card>
      <Card elevation="none" style={{ flex: 1 }}>Flat, no shadow</Card>
    </div>
  );
}
