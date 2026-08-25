import { SWATCH_CSS } from "./_shared";

export const card = {
  group: "Colors",
  viewport: [700, 160] as [number, number],
  name: "Vision Accents",
  subtitle: "OptiLIGHT, OptiPLUS, OptiLIFT, Digital Duet / Trio",
  padding: "18px",
};

export default function ColorsVision() {
  return (
    <>
      <style>{SWATCH_CSS}</style>
      <div className="grid" style={{ gridTemplateColumns: "repeat(5,1fr)" }}>
        <div className="sw">
          <div className="chip" style={{ background: "#578fff" }}></div>
          <div className="n">Blue</div>
          <div className="h">#578FFF · 2727 C</div>
        </div>
        <div className="sw">
          <div className="chip" style={{ background: "#d23460" }}></div>
          <div className="n">Magenta</div>
          <div className="h">#D23460 · 7635 C</div>
        </div>
        <div className="sw">
          <div className="chip" style={{ background: "#6f20d2" }}></div>
          <div className="n">Violet</div>
          <div className="h">#6F20D2 · Violet C</div>
        </div>
        <div className="sw">
          <div className="chip" style={{ background: "#3dd47a" }}></div>
          <div className="n">Light Green</div>
          <div className="h">#3DD47A · 7479 C</div>
        </div>
        <div className="sw">
          <div className="chip" style={{ background: "#00a37b" }}></div>
          <div className="n">Green</div>
          <div className="h">#00A37B · 2243 C</div>
        </div>
      </div>
    </>
  );
}
