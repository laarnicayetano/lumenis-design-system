export const card = {
  group: "Type",
  viewport: [700, 150] as [number, number],
  name: "System & regional typefaces",
  subtitle: "Arial when Arizona is unavailable; Noto for Hebrew and Chinese",
  padding: "18px",
};

export default function TypeSystem() {
  return (
    <>
      <style>{`
.sw{display:flex;flex-direction:column;gap:6px}.chip{height:64px;border:1px solid rgba(0,0,0,.1)}
.n{font-size:12px;letter-spacing:.02em;text-transform:uppercase;line-height:1.2}.h{font-size:11px;color:var(--text-muted);opacity:.7;font-variant-numeric:tabular-nums}
.grid{display:grid;gap:10px}
      `}</style>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <div>
          <div className="h">--font-system · Arial Regular — email, invoices, letterheads</div>
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
            --font-hebrew Noto Sans Hebrew · --font-cjk Noto Sans CJK TC — font files not supplied
          </div>
          <div style={{ fontSize: "20px" }}>אמט להאמית · 花园明朝体</div>
        </div>
      </div>
    </>
  );
}
