export const card = {
  group: "Type",
  viewport: [700, 200] as [number, number],
  name: "Families",
  subtitle: "Arizona Sans is the workhorse; Arizona Mix highlights 1–2 words",
  padding: "18px",
};

export default function TypeFamilies() {
  return (
    <>
      <style>{`
.sw{display:flex;flex-direction:column;gap:6px}.chip{height:64px;border:1px solid rgba(0,0,0,.1)}
.n{font-size:12px;letter-spacing:.02em;text-transform:uppercase;line-height:1.2}.h{font-size:11px;color:var(--text-muted);opacity:.7;font-variant-numeric:tabular-nums}
.grid{display:grid;gap:10px}
      `}</style>
      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        <div>
          <div className="h">ABC Arizona Sans Regular · --font-sans</div>
          <div style={{ fontSize: "26px", lineHeight: "1.1" }}>
            AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQq
          </div>
        </div>
        <div>
          <div className="h">ABC Arizona Sans Light 300</div>
          <div style={{ fontSize: "26px", lineHeight: "1.1", fontWeight: "300" }}>
            AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQq
          </div>
        </div>
        <div>
          <div className="h">ABC Arizona Mix Regular · --font-mix</div>
          <div style={{ fontFamily: "var(--font-mix)", fontSize: "26px", lineHeight: "1.1" }}>
            AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQq
          </div>
        </div>
      </div>
    </>
  );
}
