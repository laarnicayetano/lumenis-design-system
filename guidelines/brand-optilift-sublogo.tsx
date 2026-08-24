export const card = {
  group: "Brand",
  viewport: [700, 200] as [number, number],
  name: "OptiLIFT — Lumenis Endorsement Lockup",
  subtitle: "by Lumenis parent endorsement",
};

export default function BrandOptiliftSublogo() {
  return (
    <div style={{ display: "flex", height: 200, fontFamily: "var(--font-sans)" }}>
      <div style={{ flex: 1, background: "var(--lum-image-grey)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img src="assets/optilift/logo/ByLUMENIS_fullcolor.png" style={{ width: "65%" }} />
      </div>
      <div style={{ flex: 1, background: "var(--lum-black)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img src="assets/optilift/logo/ByLUMENIS_white.png" style={{ width: "65%" }} />
      </div>
    </div>
  );
}
