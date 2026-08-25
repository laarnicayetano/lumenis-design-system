import { SWATCH_CSS } from './_shared';

export const card = {
  group: "Type",
  viewport: [700, 230] as [number, number],
  name: "Emphasis",
  subtitle: "Hero L or Arizona Mix, never both, never repeated",
  padding: "18px",
};

export default function TypeEmphasis() {
  return (
    <>
      <style>{SWATCH_CSS + `
.ex{font-size:26px;line-height:.95;text-transform:uppercase}.ml{font-family:var(--font-mix)}.hl{font-family:var(--font-mix);font-style:italic}
      `}</style>
      <div className="grid" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
        <div>
          <div className="ex">
            Unvei<span className="hl">L</span>
            <br />
            the best
            <br />
            in you
          </div>
          <div className="cap h" style={{ marginTop: "8px" }}>
            Do · Hero L in one word
          </div>
        </div>
        <div>
          <div className="ex">
            Express your
            <br />
            <span className="ml">inner beauty</span>.
          </div>
          <div className="cap h" style={{ marginTop: "8px" }}>
            Do · Mix on 1–2 words
          </div>
        </div>
        <div style={{ outline: "1px solid #ed124a", outlineOffset: "6px" }}>
          <div className="ex">
            Unvei<span className="hl">L</span>
            <br />
            the <span className="ml">best</span>
            <br />
            in you
          </div>
          <div className="cap h" style={{ marginTop: "8px", color: "#ed124a" }}>
            Don't · mix both devices
          </div>
        </div>
      </div>
    </>
  );
}
