import { SplitLayout, SplitPanel, Headline, Button } from "../index";

export const card = {
  group: "Components",
  viewport: [700, 300] as [number, number],
  name: "Split layout",
  subtitle: "The base composition: type half, image half",
  padding: "0px",
};

export default function SplitSpecimen() {
  return (
    <>
      <SplitLayout ratio="5fr 6fr" minHeight="300px">
        <SplitPanel pad="26px" align="space-between">
          <Headline size="small" style={{ fontSize: "30px" }} heroL="LEADING">
            Leading technologies for your body.
          </Headline>
          <Button size="sm">Discover more</Button>
        </SplitPanel>
        <SplitPanel tone="image" pad="0" style={{ display: "grid", placeItems: "center" }}>
          <span
            style={{
              fontSize: "var(--text-caption)",
              letterSpacing: "var(--tracking-caption)",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              opacity: 0.55,
            }}
          >
            Photography
          </span>
        </SplitPanel>
      </SplitLayout>
    </>
  );
}
