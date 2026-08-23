export const card = {
  group: "Colors",
  viewport: [700, 160] as [number, number],
  name: "Aesthetics · roses",
  subtitle: "Stellar M22, triLift, LegendPro, NuEra",
  padding: "18px",
};

export default function ColorsRose() {
  return (
    <>
      <style>{`
.sw{display:flex;flex-direction:column;gap:6px}.chip{height:64px;border:1px solid rgba(0,0,0,.1)}
.n{font-size:12px;letter-spacing:.02em;text-transform:uppercase;line-height:1.2}.h{font-size:11px;color:var(--text-muted);opacity:.7;font-variant-numeric:tabular-nums}
.grid{display:grid;gap:10px}
      `}</style>
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
