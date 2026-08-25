import { SWATCH_CSS } from './_shared';

export const card = {
  group: "Colors",
  viewport: [700, 150] as [number, number],
  name: "Primary Palette",
  subtitle: "Black and white carry every Lumenis surface",
  padding: "18px",
};

export default function ColorsPrimary() {
  return (
    <>
      <style>{SWATCH_CSS}</style>
      <div className="grid" style={{ gridTemplateColumns: "repeat(2,1fr)" }}>
        <div className="sw">
          <div className="chip" style={{ background: "#000000" }}></div>
          <div className="n">Lumenis Black</div>
          <div className="h">#000000 · Pantone Black C</div>
        </div>
        <div className="sw">
          <div className="chip" style={{ background: "#ffffff" }}></div>
          <div className="n">Lumenis White</div>
          <div className="h">#FFFFFF · RAL 9003</div>
        </div>
      </div>
    </>
  );
}
