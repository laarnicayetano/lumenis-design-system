import { SWATCH_CSS } from './_shared';

export const card = {
  group: "Type",
  viewport: [700, 150] as [number, number],
  name: "System & Regional Typefaces",
  subtitle: "Arial when Arizona is unavailable; Noto for Hebrew and Chinese",
  padding: "18px",
};

export default function TypeSystem() {
  return (
    <>
      <style>{SWATCH_CSS}</style>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <div>
          <div className="h">
            --font-system · Arial Regular — email, invoices, letterheads
          </div>
          <div
            style={{
              fontFamily: "var(--font-system)",
              fontSize: "24px",
              textTransform: "uppercase",
            }}
          >
            Express your inner beauty.
          </div>
        </div>
        <div>
          <div className="h">
            --font-hebrew Noto Sans Hebrew · --font-cjk Noto Sans CJK TC — font
            files not supplied
          </div>
          <div style={{ fontSize: "20px" }}>אמט להאמית · 花园明朝体</div>
        </div>
      </div>
    </>
  );
}
