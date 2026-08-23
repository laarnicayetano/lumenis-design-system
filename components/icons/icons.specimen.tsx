import { Icon, Eyebrow } from "../index";

export const card = {
  group: "Components",
  viewport: [700, 200] as [number, number],
  name: "Icons",
  subtitle: "Substituted line set — small 1pt and large 2pt scale",
  padding: "20px",
};

const NAMES = [
  "eye",
  "sparkle",
  "user-circle",
  "heartbeat",
  "calendar-blank",
  "first-aid-kit",
  "hand-heart",
  "waveform",
];
const LARGE_NAMES = ["eye", "sparkle", "hand-heart", "waveform"];

export default function IconsSpecimen() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      <div style={{ display: "flex", gap: 22, alignItems: "center" }}>
        {NAMES.map((n) => (
          <Icon key={n} name={n} />
        ))}
      </div>
      <div style={{ display: "flex", gap: 26, alignItems: "center" }}>
        {LARGE_NAMES.map((n) => (
          <Icon key={n} name={n} scale="large" size={64} />
        ))}
      </div>
      <Eyebrow style={{ color: "var(--text-muted)" }}>
        Phosphor Light / Thin — substitute for the unsupplied Lumenis icon set
      </Eyebrow>
    </div>
  );
}
