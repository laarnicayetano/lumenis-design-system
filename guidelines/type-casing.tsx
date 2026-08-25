import { SWATCH_CSS } from './_shared';

export const card = {
  group: "Type",
  viewport: [700, 180] as [number, number],
  name: "Casing & Alignment",
  subtitle:
    "Never mix caps and sentence case in one block; left or right, not both",
  padding: "18px",
};

export default function TypeCasing() {
  return (
    <>
      <style>{SWATCH_CSS + `
.b{border:1px solid var(--border-subtle);padding:12px;font-size:15px;line-height:1.05;text-transform:uppercase;min-height:78px}
      `}</style>
      <div className="grid" style={{ gridTemplateColumns: "repeat(4,1fr)" }}>
        <div>
          <div className="b">
            Leading
            <br />
            technologies
            <br />
            for your body.
          </div>
          <div className="h" style={{ marginTop: "6px" }}>
            Left aligned
          </div>
        </div>
        <div>
          <div className="b" style={{ textAlign: "right" }}>
            Unveil
            <br />
            the best
            <br />
            in you
          </div>
          <div className="h" style={{ marginTop: "6px" }}>
            Right aligned
          </div>
        </div>
        <div>
          <div
            className="b"
            style={{ outline: "1px solid #ed124a", outlineOffset: "2px" }}
          >
            Open
            <br />
            <span style={{ display: "block", textAlign: "right" }}>
              yourself
            </span>
            discover
          </div>
          <div className="h" style={{ marginTop: "6px", color: "#ed124a" }}>
            Don't mix alignments
          </div>
        </div>
        <div>
          <div
            className="b"
            style={{
              outline: "1px solid #ed124a",
              outlineOffset: "2px",
              textTransform: "none",
            }}
          >
            THAT WOW
            <br />
            moment
          </div>
          <div className="h" style={{ marginTop: "6px", color: "#ed124a" }}>
            Don't mix casing
          </div>
        </div>
      </div>
    </>
  );
}
