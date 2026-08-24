export const card = {
  group: "Brand",
  viewport: [700, 200] as [number, number],
  name: "OptiLIFT — Logo Lockups",
  subtitle: "Full-color, black, white",
};

export default function BrandOptiliftLogo() {
  return (
    <div style={{ display: "flex", height: 200, fontFamily: "var(--font-sans)" }}>
      <div style={{ flex: 1, background: "var(--lum-image-grey)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img src="assets/optilift/logo/fullcolor.png" style={{ width: "70%" }} />
      </div>
      <div style={{ flex: 1, background: "var(--lum-image-grey)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img src="assets/optilift/logo/black_white.png" style={{ width: "70%" }} />
      </div>
      <div style={{ flex: 1, background: "var(--lum-black)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img src="assets/optilift/logo/white.png" style={{ width: "70%" }} />
      </div>
    </div>
  );
}
