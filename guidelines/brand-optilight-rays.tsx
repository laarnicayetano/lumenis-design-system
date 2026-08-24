import { Rays } from "../components";

export const card = {
  group: "Brand",
  viewport: [700, 280] as [number, number],
  name: "OptiLIGHT — Rays of Light",
  subtitle: "The signature graphic system — the brand's biggest missing guideline until now",
};

/* Straight 4px strokes from one shared origin, confined to one side of the
   frame so they never cross live text. The wedge between two adjacent rays
   fills with OptiLIGHT Blue or an image. At least 3 rays; never a UI color
   outside white/blue strokes (see brand-optilight-prism.tsx for the prism
   itself, which is imagery-only). Uses the real Rays component
   (components/brand/Rays/) rather than one-off inline SVG. */
export default function BrandOptilightRays() {
  return (
    <div style={{ position: "relative", width: 700, height: 280, overflow: "hidden", background: "var(--lum-black)" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "url(assets/photography/nature-sky.webp)", backgroundSize: "cover", backgroundPosition: "center" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,.45), transparent 42%)" }} />
      <Rays tone="blue" origin="right" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
      <div style={{ position: "absolute", left: 28, bottom: 20 }}>
        <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-caption)", letterSpacing: "var(--tracking-caption)", textTransform: "uppercase", color: "var(--lum-white)" }}>Rays of light — the signature system</div>
        <div style={{ fontFamily: "var(--font-sans)", fontSize: "var(--text-caption)", color: "rgba(255,255,255,.85)", marginTop: 5, maxWidth: 380, lineHeight: 1.45 }}>
          4px white strokes from one shared origin, anchored to one side of the format so they never cross the text — the wedge between two rays fills with OptiLIGHT Blue or an image.
        </div>
      </div>
    </div>
  );
}
