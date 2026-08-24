export const card = {
  group: "Brand",
  viewport: [700, 260] as [number, number],
  name: "OptiLIFT — Color Ramps",
  subtitle: "Purple accent scale and warm neutral scale (unconfirmed — see note)",
};

const PURPLE = [
  ["300", "#b583ed"], ["400", "#9a5ce4"], ["500", "#8138db"],
  ["600 · base", "#6f20d2"], ["700", "#5b18ac"], ["800", "#451286"],
] as const;

const NEUTRAL = [
  ["50", "#faf9f8"], ["100", "#f2f0ef"], ["200", "#e5e2e0"], ["300", "#cfcbc9"],
  ["500", "#847d7b"], ["700", "#433e3d"], ["900", "#161413"],
] as const;

const SWATCH_LABEL: React.CSSProperties = {
  fontFamily: "var(--font-sans)", fontSize: 12, display: "flex",
  alignItems: "flex-end", padding: 8, height: "100%",
};

/* Hardcoded hex, not tokens — this ramp is intentionally NOT added to
   tokens/colors.css. It's OptiLIFT's own generated scale (10-step purple +
   warm-neutral), sampled from a logo PNG rather than the real print
   guideline (30MB, unreadable at generation time) — see OptiLIFT.md
   Caveats and plan.md "Flagged deviations." The single confirmed value,
   `--lum-violet` #6F20D2, is already in tokens/colors.css and
   guidelines/colors-vision.tsx; everything below it is documentation of
   OptiLIFT's own material, not a system-wide token proposal. */
export default function BrandOptiliftColor() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
      <div>
        <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-caption)", letterSpacing: "var(--tracking-caption)", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "var(--space-2)" }}>
          Purple ray-mark accent scale
        </div>
        <div style={{ display: "flex", height: 100 }}>
          {PURPLE.map(([label, hex]) => (
            <div key={label} style={{ flex: 1, background: hex, color: label === "300" ? "#000" : "#fff" }}>
              <span style={SWATCH_LABEL}>{label}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-caption)", letterSpacing: "var(--tracking-caption)", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "var(--space-2)" }}>
          Warm greige neutral scale
        </div>
        <div style={{ display: "flex", height: 100 }}>
          {NEUTRAL.map(([label, hex], i) => (
            <div key={label} style={{ flex: 1, background: hex, color: i >= 4 ? "#fff" : "#000", border: i === 0 ? "1px solid var(--border-subtle)" : undefined }}>
              <span style={SWATCH_LABEL}>{label}</span>
            </div>
          ))}
        </div>
      </div>
      <p style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-caption)", color: "var(--text-muted)", margin: 0 }}>
        Unconfirmed against the real print brand guideline — sampled from a logo PNG. Not added to tokens/colors.css.
      </p>
    </div>
  );
}
