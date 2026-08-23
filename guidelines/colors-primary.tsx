export const card = {
  group: "Colors",
  viewport: [700, 150] as [number, number],
  name: "Primary palette",
  subtitle: "Black and white carry every Lumenis surface",
  padding: "18px",
};

export default function ColorsPrimary() {
  return (
    <>
      <style>{`
.sw{display:flex;flex-direction:column;gap:6px}.chip{height:64px;border:1px solid rgba(0,0,0,.1)}
.n{font-size:12px;letter-spacing:.02em;text-transform:uppercase;line-height:1.2}.h{font-size:11px;color:var(--text-muted);opacity:.7;font-variant-numeric:tabular-nums}
.grid{display:grid;gap:10px}
      `}</style>
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
