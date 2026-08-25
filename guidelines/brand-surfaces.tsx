import { SWATCH_CSS } from './_shared';

export const card = {
  group: "Brand",
  viewport: [700, 220] as [number, number],
  name: "Surfaces & protection",
  subtitle: "Squared, flat, hairline rules — scrim over photography, never a blur capsule",
  padding: "18px",
};

export default function BrandSurfaces() {
  return (
    <>
      <style>{SWATCH_CSS}</style>
      <div className="grid" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
        <div>
          <div
            style={{
              border: "1px solid var(--border-subtle)",
              height: "96px",
              display: "grid",
              placeItems: "center",
              fontSize: "12px",
              textTransform: "uppercase",
              color: "var(--text-muted)",
            }}
          >
            Hairline block
          </div>
          <div className="h" style={{ marginTop: "6px" }}>
            radius 0 · 1px · no shadow
          </div>
        </div>
        <div>
          <div
            style={{
              background: "var(--surface-image)",
              height: "96px",
              display: "grid",
              placeItems: "center",
              fontSize: "12px",
              textTransform: "uppercase",
              color: "var(--text-muted)",
            }}
          >
            Photography ground
          </div>
          <div className="h" style={{ marginTop: "6px" }}>
            #F2F2F2 · products & people only
          </div>
        </div>
        <div>
          <div
            style={{
              height: "96px",
              background:
                "linear-gradient(180deg,rgba(0,0,0,.55),rgba(0,0,0,0) 60%),var(--lum-shine-grey)",
              display: "flex",
              alignItems: "flex-start",
              padding: "10px",
              color: "#fff",
              fontSize: "12px",
              textTransform: "uppercase",
            }}
          >
            Type on image
          </div>
          <div className="h" style={{ marginTop: "6px" }}>
            --scrim-image · plain black scrim
          </div>
        </div>
      </div>
    </>
  );
}
