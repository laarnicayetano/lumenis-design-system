import { SWATCH_CSS } from "./_shared";

export const card = {
  group: "Type",
  viewport: [700, 150] as [number, number],
  name: "Captions & Buttons",
  subtitle: "All caps: kickers, specs, nav, CTAs",
  padding: "18px",
};

export default function TypeCaption() {
  return (
    <>
      <style>{SWATCH_CSS}</style>
      <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
        <div>
          <div className="h">--text-caption 14 / 1.14 · uppercase</div>
          <div
            style={{
              fontSize: "13px",
              letterSpacing: ".02em",
              textTransform: "uppercase",
            }}
          >
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
