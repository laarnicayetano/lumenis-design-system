export const card = {
  group: "Colors",
  viewport: [700, 160] as [number, number],
  name: "Aesthetics · Skin Tones",
  subtitle: "LightSheer and SPLENDOR X hair-removal family",
  padding: "18px",
};

export default function ColorsSkin() {
  return (
    <>
      <style>{`
.sw{display:flex;flex-direction:column;gap:6px}.chip{height:64px;border:1px solid rgba(0,0,0,.1)}
.n{font-size:12px;letter-spacing:.02em;text-transform:uppercase;line-height:1.2}.h{font-size:11px;color:var(--text-muted);opacity:.7;font-variant-numeric:tabular-nums}
.grid{display:grid;gap:10px}
      `}</style>
      <div className="grid" style={{ gridTemplateColumns: "repeat(5,1fr)" }}>
        <div className="sw">
          <div className="chip" style={{ background: "#834436" }}></div>
          <div className="n">Dark Brown</div>
          <div className="h">#834436 · PANTONE 498 C</div>
        </div>
        <div className="sw">
          <div className="chip" style={{ background: "#a27369" }}></div>
          <div className="n">Light Brown</div>
          <div className="h">#A27369 · 4093 C</div>
        </div>
        <div className="sw">
          <div className="chip" style={{ background: "#c69275" }}></div>
          <div className="n">Brown</div>
          <div className="h">#C69275 · 480 C</div>
        </div>
        <div className="sw">
          <div className="chip" style={{ background: "#e5c9a8" }}></div>
          <div className="n">Soft Brown</div>
          <div className="h">#E5C9A8 · 4685 C</div>
        </div>
        <div className="sw">
          <div className="chip" style={{ background: "#f2e3d4" }}></div>
          <div className="n">Pastel Brown</div>
          <div className="h">#F2E3D4</div>
        </div>
      </div>
    </>
  );
}
