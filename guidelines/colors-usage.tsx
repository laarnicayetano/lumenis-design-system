import { SWATCH_CSS } from './_shared';

export const card = {
  group: "Colors",
  viewport: [700, 230] as [number, number],
  name: "The 20% rule",
  subtitle: "One accent at a time, never more than a fifth of the format",
  padding: "18px",
};

export default function ColorsUsage() {
  return (
    <>
      <style>{SWATCH_CSS + `
.fmt{aspect-ratio:4/3;border:1px solid var(--border-subtle);position:relative;display:flex;flex-direction:column;justify-content:flex-end;padding:10px}.cap{font-size:11px;text-transform:uppercase;letter-spacing:.02em;color:var(--text-muted);margin-top:6px}.ttl{font-size:15px;line-height:.95;text-transform:uppercase}.bad{outline:1px solid #ed124a;outline-offset:2px}
      `}</style>
      <div className="grid" style={{ gridTemplateColumns: "repeat(4,1fr)" }}>
        <div>
          <div className="fmt">
            <div
              style={{
                position: "absolute",
                inset: "0 0 auto 0",
                height: "22%",
                background: "#578fff",
              }}
            ></div>
            <div className="ttl">
              Discover
              <br />
              your inner
              <br />
              world.
            </div>
          </div>
          <div className="cap">Do · one accent, 20%</div>
        </div>
        <div>
          <div className="fmt">
            <div className="ttl">
              Discover
              <br />
              your inner
              <br />
              world.
            </div>
            <div
              style={{
                position: "absolute",
                right: "10px",
                top: "10px",
                width: "34%",
                height: "34%",
                border: "1px solid #6c62f9",
              }}
            ></div>
          </div>
          <div className="cap">Do · accent in a stroke</div>
        </div>
        <div>
          <div className="fmt" style={{ background: "#00c0af" }}>
            <div className="ttl" style={{ color: "#fff" }}>
              Boost your
              <br />
              inner shine
            </div>
          </div>
          <div className="cap">Do · full field, single colour</div>
        </div>
        <div>
          <div className="fmt bad">
            <div style={{ position: "absolute", inset: "0 50% 0 0", background: "#578fff" }}></div>
            <div style={{ position: "absolute", inset: "0 0 0 50%", background: "#ed124a" }}></div>
          </div>
          <div className="cap" style={{ color: "#ed124a" }}>
            Don't · two accents
          </div>
        </div>
      </div>
    </>
  );
}
