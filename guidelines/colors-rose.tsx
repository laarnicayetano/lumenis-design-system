import { SWATCH_CSS } from "./_shared";

export const card = {
  group: "Colors",
  viewport: [700, 160] as [number, number],
  name: "Aesthetics · Rose",
  subtitle: "Stellar M22, triLift, LegendPro, NuEra",
  padding: "18px",
};

export default function ColorsRose() {
  return (
    <>
      <style>{SWATCH_CSS}</style>
      <div className="grid" style={{ gridTemplateColumns: "repeat(5,1fr)" }}>
        <div className="sw">
          <div className="chip" style={{ background: "#ba6d81" }}></div>
          <div className="n">Silken Rose</div>
          <div className="h">#BA6D81 · 695 CP</div>
        </div>
        <div className="sw">
          <div className="chip" style={{ background: "#deaa9b" }}></div>
          <div className="n">Peach Beige</div>
          <div className="h">#DEAA9B · 7612 CP</div>
        </div>
        <div className="sw">
          <div className="chip" style={{ background: "#cf9684" }}></div>
          <div className="n">Rose Beige</div>
          <div className="h">#CF9684 · 7613 CP</div>
        </div>
        <div className="sw">
          <div className="chip" style={{ background: "#fabcad" }}></div>
          <div className="n">Rose Gold</div>
          <div className="h">#FABCAD · 691 CP</div>
        </div>
        <div className="sw">
          <div className="chip" style={{ background: "#ffd1ca" }}></div>
          <div className="n">Rose Gold Light</div>
          <div className="h">#FFD1CA · 7612 CP</div>
        </div>
      </div>
    </>
  );
}
