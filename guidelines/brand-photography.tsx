export const card = {
  group: "Brand",
  viewport: [700, 300] as [number, number],
  name: "Photography",
  subtitle:
    "Warm clinical portraits and product shots vs. bright prism/nature imagery",
};

const ROW_LABEL: React.CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: "var(--text-caption)",
  letterSpacing: "var(--tracking-caption)",
  textTransform: "uppercase",
  color: "var(--text-muted)",
  marginBottom: "var(--space-2)",
};

/* Photography: Squared, no radius (this is print/photography material, not a
   UI surface — see tokens/surfaces.css for where rounding now applies). */
export default function BrandPhotography() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "var(--space-5)",
      }}
    >
      <div>
        <div style={ROW_LABEL}>
          OptiLIFT — warm greige portraits + clean product shots
        </div>
        <div style={{ display: "flex", gap: 8, height: 130 }}>
          <img
            src="assets/photography/shutterstock_1549746530.webp"
            style={{ flex: 1, objectFit: "cover" }}
            alt="Patient portrait"
          />
          <img
            src="assets/optilift/product/grey-bg/lumenis_02.764.webp"
            style={{ flex: 1, objectFit: "cover" }}
            alt="Product on grey"
          />
          <img
            src="assets/optilift/product/black-bg/lumenis_02.747.webp"
            style={{
              flex: 1,
              objectFit: "cover",
              background: "var(--lum-black)",
            }}
            alt="Product on black"
          />
        </div>
      </div>
      <div>
        <div style={ROW_LABEL}>
          OptiLIGHT — prism-on-eye, nature light rays, product on grey
        </div>
        <div style={{ display: "flex", gap: 8, height: 130 }}>
          <img
            src="assets/photography/people-prism-eye.webp"
            style={{ flex: 1, objectFit: "cover" }}
            alt="Prism on the eye"
          />
          <img
            src="assets/photography/nature-forest-rainbow.webp"
            style={{ flex: 1, objectFit: "cover" }}
            alt="Nature — natural light rays"
          />
          <img
            src="assets/optilight/product/optilight-device-tabletop.webp"
            style={{
              flex: 1,
              objectFit: "contain",
              background: "var(--lum-image-grey)",
            }}
            alt="Product on product gray"
          />
        </div>
      </div>
    </div>
  );
}
