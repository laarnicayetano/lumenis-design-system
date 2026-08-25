import { SWATCH_CSS } from './_shared';

export const card = {
  group: "Colors",
  viewport: [700, 150] as [number, number],
  name: "Neutrals",
  subtitle: "Shine grey, photography ground, organic tone",
  padding: "18px",
};

export default function ColorsNeutral() {
  return (
    <>
      <style>{SWATCH_CSS}</style>
      <div className="grid" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
        <div className="sw">
          <div className="chip" style={{ background: "#404040" }}></div>
          <div className="n">Shine Grey</div>
          <div className="h">#404040 · Pantone Cool</div>
        </div>
        <div className="sw">
          <div className="chip" style={{ background: "#f2f2f2" }}></div>
          <div className="n">Light Grey</div>
          <div className="h">#F2F2F2 · Imagery only</div>
        </div>
        <div className="sw">
          <div className="chip" style={{ background: "#f9f0e8" }}></div>
          <div className="n">Organic Tone</div>
          <div className="h">#F9F0E8 · FoLix</div>
        </div>
      </div>
    </>
  );
}
