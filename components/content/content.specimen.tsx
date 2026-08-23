import { ProductCard, InsightCard, Quote, StatBlock } from "../index";

export const card = {
  group: "Components",
  viewport: [700, 330] as [number, number],
  name: "Product, insight, quote & stat",
  subtitle: "Content blocks from the corporate site",
  padding: "20px",
};

export default function ContentSpecimen() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "150px 190px 1fr",
        gap: 22,
        alignItems: "start",
      }}
    >
      <ProductCard name="Stellar M22™" market="Aesthetics · IPL" />
      <InsightCard
        title="FoLix Named Best Laser Treatment for Hair Loss Two Years Running"
        topics={["FoLix", "News"]}
      />
      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        <Quote
          attribution="Evie Rose"
          role="Aesthetic Clinic, London"
          style={{ maxWidth: "32ch" }}
        >
          Lumenis products have been such a success in my clinic, achieving
          amazing results with my clients.
        </Quote>
        <div style={{ display: "flex", gap: 26 }}>
          <StatBlock value="88+" label="Countries" detail="Worldwide" />
          <StatBlock value="90k+" label="Devices" detail="Installed" />
          <StatBlock value="60+" label="Years" detail="Of leadership" />
        </div>
      </div>
    </div>
  );
}
