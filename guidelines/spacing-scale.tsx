import { SWATCH_CSS } from "./_shared";

export const card = {
  group: "Spacing",
  viewport: [700, 180] as [number, number],
  name: "Spacing Scale",
  subtitle: "4 → 160, with 56 as the social-format margin",
  padding: "18px",
};

export default function SpacingScale() {
  return (
    <>
      <style>{SWATCH_CSS}</style>
      <div style={{ display: "flex", alignItems: "flex-end", gap: "10px" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              width: "4px",
              height: "4px",
              background: "var(--lum-black)",
            }}
          ></div>
          <div className="h">4</div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              background: "var(--lum-black)",
            }}
          ></div>
          <div className="h">8</div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              width: "12px",
              height: "12px",
              background: "var(--lum-black)",
            }}
          ></div>
          <div className="h">12</div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              width: "16px",
              height: "16px",
              background: "var(--lum-black)",
            }}
          ></div>
          <div className="h">16</div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              width: "24px",
              height: "24px",
              background: "var(--lum-black)",
            }}
          ></div>
          <div className="h">24</div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              width: "32px",
              height: "32px",
              background: "var(--lum-black)",
            }}
          ></div>
          <div className="h">32</div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              background: "var(--lum-black)",
            }}
          ></div>
          <div className="h">40</div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              background: "var(--lum-black)",
            }}
          ></div>
          <div className="h">56</div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "80px",
              background: "var(--lum-black)",
            }}
          ></div>
          <div className="h">80</div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "110px",
              background: "var(--lum-black)",
            }}
          ></div>
          <div className="h">120</div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            alignItems: "flex-start",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "110px",
              background: "var(--lum-black)",
            }}
          ></div>
          <div className="h">160</div>
        </div>
      </div>
    </>
  );
}
