export const card = {
  group: "Type",
  viewport: [700, 230] as [number, number],
  name: "Body scale",
  subtitle: "Subtitle 28/1.16 · paragraph 18/1.39 · form 16/1.4",
  padding: "18px",
};

export default function TypeBody() {
  return (
    <>
      <style>{`
.sw{display:flex;flex-direction:column;gap:6px}.chip{height:64px;border:1px solid rgba(0,0,0,.1)}
.n{font-size:12px;letter-spacing:.02em;text-transform:uppercase;line-height:1.2}.h{font-size:11px;color:var(--text-muted);opacity:.7;font-variant-numeric:tabular-nums}
.grid{display:grid;gap:10px}
      `}</style>
      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        <div>
          <div className="h">--text-subtitle 28 / 1.16</div>
          <div style={{ fontSize: "22px", lineHeight: "1.16" }}>
            Over 60 years of industry leadership and innovation
          </div>
        </div>
        <div>
          <div className="h">--text-body 18 / 1.39</div>
          <div style={{ fontSize: "16px", lineHeight: "1.39", maxWidth: "60ch" }}>
            Lumenis develops life-changing, minimally invasive solutions for the Aesthetic and
            Vision markets.
          </div>
        </div>
        <div>
          <div className="h">--text-form 16 / 1.4</div>
          <div style={{ fontSize: "15px", lineHeight: "1.4" }}>
            Please fill out our form, and we will get in touch shortly.
          </div>
        </div>
      </div>
    </>
  );
}
