export const card = {
  group: "Brand",
  viewport: [700, 190] as [number, number],
  name: "Marks",
  subtitle: "Wordmark and Hero L, positive and negative",
  padding: "18px",
};

export default function BrandMarks() {
  return (
    <>
      <style>{`
.sw{display:flex;flex-direction:column;gap:6px}.chip{height:64px;border:1px solid rgba(0,0,0,.1)}
.n{font-size:12px;letter-spacing:.02em;text-transform:uppercase;line-height:1.2}.h{font-size:11px;color:var(--text-muted);opacity:.7;font-variant-numeric:tabular-nums}
.grid{display:grid;gap:10px}
      `}</style>
      <div className="grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
        <div
          style={{
            border: "1px solid var(--border-subtle)",
            padding: "26px",
            display: "flex",
            alignItems: "center",
            gap: "22px",
          }}
        >
          <img src="assets/logo/wordmark-black.svg" style={{ width: "170px" }} />
          <img src="assets/logo/symbol-black.svg" style={{ height: "40px" }} />
        </div>
        <div
          style={{
            background: "var(--lum-black)",
            padding: "26px",
            display: "flex",
            alignItems: "center",
            gap: "22px",
          }}
        >
          <img src="assets/logo/wordmark-white.svg" style={{ width: "170px" }} />
          <img src="assets/logo/symbol-white.svg" style={{ height: "40px" }} />
        </div>
      </div>
    </>
  );
}
