import { SWATCH_CSS } from './_shared';

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
      <style>{SWATCH_CSS}</style>
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
