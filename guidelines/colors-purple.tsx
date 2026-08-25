export const card = {
  group: "Colors",
  viewport: [700, 160] as [number, number],
  name: "Aesthetics · Purple & Reds",
  subtitle: "ULTRApulse, AcuPulse, FemTouch, LegendPro, NuEra, FoLix",
  padding: "18px",
};

export default function ColorsPurple() {
  return (
    <>
      <style>{`
.sw{display:flex;flex-direction:column;gap:6px}.chip{height:64px;border:1px solid rgba(0,0,0,.1)}
.n{font-size:12px;letter-spacing:.02em;text-transform:uppercase;line-height:1.2}.h{font-size:11px;color:var(--text-muted);opacity:.7;font-variant-numeric:tabular-nums}
.grid{display:grid;gap:10px}
      `}</style>
      <div className="grid" style={{ gridTemplateColumns: "repeat(7,1fr)" }}>
        <div className="sw">
          <div className="chip" style={{ background: "#bc9aff" }}></div>
          <div className="n">Light Purple</div>
          <div className="h">#BC9AFF · 270 C</div>
        </div>
        <div className="sw">
          <div className="chip" style={{ background: "#d690ff" }}></div>
          <div className="n">Orchid Purple</div>
          <div className="h">#D690FF · 2577 C</div>
        </div>
        <div className="sw">
          <div className="chip" style={{ background: "#6c62f9" }}></div>
          <div className="n">Purple</div>
          <div className="h">#6C62F9 · 2125 C</div>
        </div>
        <div className="sw">
          <div className="chip" style={{ background: "#ed124a" }}></div>
          <div className="n">Red</div>
          <div className="h">#ED124A · 192 C</div>
        </div>
        <div className="sw">
          <div className="chip" style={{ background: "#ff5532" }}></div>
          <div className="n">Peach Red</div>
          <div className="h">#FF5532 · 171 C</div>
        </div>
        <div className="sw">
          <div className="chip" style={{ background: "#ffbc6e" }}></div>
          <div className="n">Gradient Yellow</div>
          <div className="h">#FFBC6E · 156 C</div>
        </div>
        <div className="sw">
          <div className="chip" style={{ background: "#00c0af" }}></div>
          <div className="n">Turquoise</div>
          <div className="h">#00C0AF · 2398 C</div>
        </div>
      </div>
    </>
  );
}
