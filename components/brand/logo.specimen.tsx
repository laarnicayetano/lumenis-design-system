import { Logotype, HeroL } from "../index";

export const card = {
  group: "Components",
  viewport: [700, 210] as [number, number],
  name: "Logotype & Hero L",
  subtitle: "Wordmark and symbol, positive and negative",
  padding: "20px",
};

export default function LogoSpecimen() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: 12,
        alignItems: "stretch",
      }}
    >
      <style>{`
                .tile{display:grid;place-items:center;padding:22px;gap:14px}
      `}</style>
      <div className="tile" style={{ border: "1px solid var(--border-subtle)" }}>
        <Logotype width={170} />
        <Logotype variant="symbol" width={34} />
      </div>
      <div className="tile" style={{ background: "var(--lum-black)" }}>
        <Logotype tone="white" width={170} />
        <Logotype tone="white" variant="symbol" width={34} />
      </div>
      <div
        className="tile"
        style={{
          border: "1px solid var(--border-subtle)",
          fontSize: 34,
          lineHeight: 0.95,
          textTransform: "uppercase",
        }}
      >
        <span>
          UNVEI
          <HeroL />
          <br />
          THE BEST
        </span>
      </div>
    </div>
  );
}
