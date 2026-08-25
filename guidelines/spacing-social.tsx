import { SWATCH_CSS } from "./_shared";

export const card = {
  group: "Spacing",
  viewport: [700, 260] as [number, number],
  name: "Social Grid",
  subtitle: "1080² · 6×6 squares · 56px margins · wordmark = 2 columns",
  padding: "18px",
};

export default function SpacingSocial() {
  return (
    <>
      <style>{SWATCH_CSS}</style>
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
            src="assets/logo/wordmark-black.svg"
            style={{
              position: "absolute",
              left: "11px",
              bottom: "11px",
              width: "64px",
            }}
          />
          <img
            src="assets/logo/symbol-black.svg"
            style={{
              position: "absolute",
              right: "11px",
              top: "11px",
              height: "32px",
            }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <div className="n">--social-size 1080px</div>
          <div className="n">--social-margin 56px</div>
          <div className="n">--social-square 161.33px</div>
          <div className="n">--social-logo-width 322.67px</div>
          <div className="h" style={{ maxWidth: "34ch", marginTop: "6px" }}>
            Wordmark is 2 columns wide; the Hero L is 1 row (or ½ row) tall.
            Both sit in a corner — diagonally opposite when used together.
          </div>
        </div>
      </div>
    </>
  );
}
