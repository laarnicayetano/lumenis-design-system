export const card = {
  group: "Type",
  viewport: [700, 150] as [number, number],
  name: "Captions & buttons",
  subtitle: "All caps: kickers, specs, nav, CTAs",
  padding: "18px",
};

export default function TypeCaption() {
  return (
    <>
      <style>{`
.sw{display:flex;flex-direction:column;gap:6px}.chip{height:64px;border:1px solid rgba(0,0,0,.1)}
.n{font-size:12px;letter-spacing:.02em;text-transform:uppercase;line-height:1.2}.h{font-size:11px;color:var(--text-muted);opacity:.7;font-variant-numeric:tabular-nums}
.grid{display:grid;gap:10px}
      `}</style>
      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        <div>
          <div className="h">--text-caption 14 / 1.14 · uppercase</div>
          <div style={{ fontSize: "13px", letterSpacing: ".02em", textTransform: "uppercase" }}>
            New age of dry eyes solution
          </div>
        </div>
        <div>
          <div className="h">--text-button 18 / 1.0 · uppercase</div>
          <div
            style={{
              display: "inline-block",
              border: "1px solid #000",
              padding: "13px 28px",
              fontSize: "16px",
              textTransform: "uppercase",
            }}
          >
            Discover more
          </div>
        </div>
      </div>
    </>
  );
}
