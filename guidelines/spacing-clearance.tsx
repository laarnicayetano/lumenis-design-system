export const card = {
  group: "Spacing",
  viewport: [700, 230] as [number, number],
  name: "Logo & CTA clear space",
  subtitle: "Wordmark safety = x on all sides · CTA = x vertical, 2x horizontal",
  padding: "18px",
};

export default function SpacingClearance() {
  return (
    <>
      <style>{`
.sw{display:flex;flex-direction:column;gap:6px}.chip{height:64px;border:1px solid rgba(0,0,0,.1)}
.n{font-size:12px;letter-spacing:.02em;text-transform:uppercase;line-height:1.2}.h{font-size:11px;color:var(--text-muted);opacity:.7;font-variant-numeric:tabular-nums}
.grid{display:grid;gap:10px}
      `}</style>
      <div style={{ display: "flex", gap: "26px", alignItems: "center" }}>
        <div>
          <div
            style={{
              border: "1px dashed rgba(0,0,0,.3)",
              padding: "22px",
              display: "inline-block",
            }}
          >
            <img
              src="assets/logo-wordmark-black.svg"
              style={{ width: "150px", display: "block" }}
            />
          </div>
          <div className="h" style={{ marginTop: "8px" }}>
            Safety zone = x · min width 50px
          </div>
        </div>
        <div>
          <div
            style={{
              border: "1px dashed rgba(0,0,0,.3)",
              padding: "16px 32px",
              display: "inline-block",
            }}
          >
            <div
              style={{
                border: "1px solid #000",
                padding: "13px 28px",
                fontSize: "15px",
                textTransform: "uppercase",
              }}
            >
              Discover more
            </div>
          </div>
          <div className="h" style={{ marginTop: "8px" }}>
            x above/below · 2x either side
          </div>
        </div>
      </div>
    </>
  );
}
