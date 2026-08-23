export const card = {
  group: "Type",
  viewport: [700, 230] as [number, number],
  name: "Display scale",
  subtitle: "Titles all caps, leading 88–92%, tracking 0",
  padding: "18px",
};

export default function TypeDisplay() {
  return (
    <>
      <style>{`
.sw{display:flex;flex-direction:column;gap:6px}.chip{height:64px;border:1px solid rgba(0,0,0,.1)}
.n{font-size:12px;letter-spacing:.02em;text-transform:uppercase;line-height:1.2}.h{font-size:11px;color:var(--text-muted);opacity:.7;font-variant-numeric:tabular-nums}
.grid{display:grid;gap:10px}
      `}</style>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          textTransform: "uppercase",
        }}
      >
        <div>
          <div className="h">--text-display 80 / 0.9</div>
          <div style={{ fontSize: "56px", lineHeight: ".9" }}>Unveil the best</div>
        </div>
        <div>
          <div className="h">--text-title 56 / 0.92</div>
          <div style={{ fontSize: "38px", lineHeight: ".92" }}>Leading technologies</div>
        </div>
        <div>
          <div className="h">--text-title-sm 40 / 0.92</div>
          <div style={{ fontSize: "28px", lineHeight: ".92" }}>Empowering you, your way</div>
        </div>
      </div>
    </>
  );
}
