export const card = {
  group: "Spacing",
  viewport: [700, 260] as [number, number],
  name: "Social grid",
  subtitle: "1080² · 6×6 squares · 56px margins · wordmark = 2 columns",
  padding: "18px",
};

export default function SpacingSocial() {
  return (
    <>
      <style>{`
.sw{display:flex;flex-direction:column;gap:6px}.chip{height:64px;border:1px solid rgba(0,0,0,.1)}
.n{font-size:12px;letter-spacing:.02em;text-transform:uppercase;line-height:1.2}.h{font-size:11px;color:var(--text-muted);opacity:.7;font-variant-numeric:tabular-nums}
.grid{display:grid;gap:10px}
      `}</style>
      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <div
          style={{
            width: "216px",
            height: "216px",
            border: "1px solid var(--border-subtle)",
            padding: "11px",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(6,1fr)",
              gridTemplateRows: "repeat(6,1fr)",
              width: "100%",
              height: "100%",
            }}
          >
            <div style={{ border: ".5px solid rgba(0,0,0,.14)" }}></div>
            <div style={{ border: ".5px solid rgba(0,0,0,.14)" }}></div>
            <div style={{ border: ".5px solid rgba(0,0,0,.14)" }}></div>
            <div style={{ border: ".5px solid rgba(0,0,0,.14)" }}></div>
            <div style={{ border: ".5px solid rgba(0,0,0,.14)" }}></div>
            <div style={{ border: ".5px solid rgba(0,0,0,.14)" }}></div>
            <div style={{ border: ".5px solid rgba(0,0,0,.14)" }}></div>
            <div style={{ border: ".5px solid rgba(0,0,0,.14)" }}></div>
            <div style={{ border: ".5px solid rgba(0,0,0,.14)" }}></div>
            <div style={{ border: ".5px solid rgba(0,0,0,.14)" }}></div>
            <div style={{ border: ".5px solid rgba(0,0,0,.14)" }}></div>
            <div style={{ border: ".5px solid rgba(0,0,0,.14)" }}></div>
            <div style={{ border: ".5px solid rgba(0,0,0,.14)" }}></div>
            <div style={{ border: ".5px solid rgba(0,0,0,.14)" }}></div>
            <div style={{ border: ".5px solid rgba(0,0,0,.14)" }}></div>
            <div style={{ border: ".5px solid rgba(0,0,0,.14)" }}></div>
            <div style={{ border: ".5px solid rgba(0,0,0,.14)" }}></div>
            <div style={{ border: ".5px solid rgba(0,0,0,.14)" }}></div>
            <div style={{ border: ".5px solid rgba(0,0,0,.14)" }}></div>
            <div style={{ border: ".5px solid rgba(0,0,0,.14)" }}></div>
            <div style={{ border: ".5px solid rgba(0,0,0,.14)" }}></div>
            <div style={{ border: ".5px solid rgba(0,0,0,.14)" }}></div>
            <div style={{ border: ".5px solid rgba(0,0,0,.14)" }}></div>
            <div style={{ border: ".5px solid rgba(0,0,0,.14)" }}></div>
            <div style={{ border: ".5px solid rgba(0,0,0,.14)" }}></div>
            <div style={{ border: ".5px solid rgba(0,0,0,.14)" }}></div>
            <div style={{ border: ".5px solid rgba(0,0,0,.14)" }}></div>
            <div style={{ border: ".5px solid rgba(0,0,0,.14)" }}></div>
            <div style={{ border: ".5px solid rgba(0,0,0,.14)" }}></div>
            <div style={{ border: ".5px solid rgba(0,0,0,.14)" }}></div>
            <div style={{ border: ".5px solid rgba(0,0,0,.14)" }}></div>
            <div style={{ border: ".5px solid rgba(0,0,0,.14)" }}></div>
            <div style={{ border: ".5px solid rgba(0,0,0,.14)" }}></div>
            <div style={{ border: ".5px solid rgba(0,0,0,.14)" }}></div>
            <div style={{ border: ".5px solid rgba(0,0,0,.14)" }}></div>
            <div style={{ border: ".5px solid rgba(0,0,0,.14)" }}></div>
          </div>
          <img
            src="assets/logo-wordmark-black.svg"
            style={{ position: "absolute", left: "11px", bottom: "11px", width: "64px" }}
          />
          <img
            src="assets/logo-symbol-black.svg"
            style={{ position: "absolute", right: "11px", top: "11px", height: "32px" }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <div className="n">--social-size 1080px</div>
          <div className="n">--social-margin 56px</div>
          <div className="n">--social-square 161.33px</div>
          <div className="n">--social-logo-width 322.67px</div>
          <div className="h" style={{ maxWidth: "34ch", marginTop: "6px" }}>
            Wordmark is 2 columns wide; the Hero L is 1 row (or ½ row) tall. Both sit in a corner —
            diagonally opposite when used together.
          </div>
        </div>
      </div>
    </>
  );
}
