export const card = {
  group: "Brand",
  viewport: [700, 200] as [number, number],
  name: "States & motion",
  subtitle: "Hover fades to 60%, press to 40% — no scale, no colour shift (inferred)",
  padding: "18px",
};

export default function BrandMotion() {
  return (
    <>
      <style>{`
.sw{display:flex;flex-direction:column;gap:6px}.chip{height:64px;border:1px solid rgba(0,0,0,.1)}
.n{font-size:12px;letter-spacing:.02em;text-transform:uppercase;line-height:1.2}.h{font-size:11px;color:var(--text-muted);opacity:.7;font-variant-numeric:tabular-nums}
.grid{display:grid;gap:10px}.btn{border:1px solid #000;padding:12px 24px;font-size:14px;text-transform:uppercase;display:inline-block}
      `}</style>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
          <div className="btn" style={{ background: "#000", color: "#fff" }}>
            Rest
          </div>
          <div className="btn" style={{ background: "#000", color: "#fff", opacity: ".6" }}>
            Hover 60%
          </div>
          <div className="btn" style={{ background: "#000", color: "#fff", opacity: ".4" }}>
            Press 40%
          </div>
          <div className="btn" style={{ opacity: ".35" }}>
            Disabled 35%
          </div>
        </div>
        <div className="h" style={{ maxWidth: "60ch" }}>
          --dur-fast 160ms state changes · --dur-base 320ms entrances · --dur-slow 600ms reveals ·
          --ease-brand cubic-bezier(.22,1,.36,1). Fades and slow reveals only: no bounce, no spring,
          no scale on press. Links reveal a 1px underline rather than changing colour. Motion is not
          specified in the 2026 guidelines — these values are proposed and need brand sign-off.
        </div>
      </div>
    </>
  );
}
