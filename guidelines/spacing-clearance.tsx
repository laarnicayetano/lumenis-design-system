import { SWATCH_CSS } from "./_shared";

export const card = {
  group: "Spacing",
  viewport: [700, 230] as [number, number],
  name: "Logo & CTA Space",
  subtitle:
    "Wordmark safety = x on all sides · CTA = x vertical, 2x horizontal",
  padding: "18px",
};

export default function SpacingClearance() {
  return (
    <>
      <style>{SWATCH_CSS}</style>
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
              src="assets/logo/wordmark-black.svg"
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
