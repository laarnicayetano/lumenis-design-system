export const card = {
  group: "Brand",
  viewport: [700, 170] as [number, number],
  name: "OptiLIGHT — The Prism",
  subtitle: "Imagery effect only — never a UI color",
};

export default function BrandOptilightPrism() {
  return (
    <div style={{ padding: "var(--space-5)" }}>
      <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-caption)", letterSpacing: "var(--tracking-caption)", textTransform: "uppercase", color: "var(--lum-blue)", marginBottom: "var(--space-4)" }}>
        The prism · imagery effect only
      </div>
      <div style={{ height: 84, background: "linear-gradient(90deg,#ff5d5d 0%,#ffb24d 18%,#ffe24d 36%,#5fd17a 54%,#4fa8ff 72%,#7b6cff 88%,#c45cff 100%)" }} />
      <p style={{ marginTop: "var(--space-4)", fontFamily: "var(--font-sans)", fontSize: "var(--text-form)", color: "var(--text-muted)", lineHeight: 1.5 }}>
        The rainbow prism glare is the signature <strong>photographic</strong> treatment — placed over an eye or through a scene in Screen blend mode.
      </p>
      <div style={{ display: "inline-block", marginTop: "var(--space-3)", fontFamily: "var(--font-sans)", fontSize: "var(--text-caption)", fontWeight: 600, letterSpacing: "var(--tracking-caption)", textTransform: "uppercase", color: "#b23", background: "#fdecec", padding: "5px 10px" }}>
        Never use as a UI fill, button, or text color
      </div>
    </div>
  );
}
