import React from "react";

export interface RaysProps {
  /** `blue` = white rays on an OptiLIGHT Blue wedge (for dark/blue backgrounds). `light` = blue rays on a pale wedge (for light backgrounds). */
  tone?: "blue" | "light";
  /** Which corner the rays converge from. Pick whichever leaves the layout's text column clear. */
  origin?: "bottom-left" | "right";
  /** Masks the rays out of a band so overlaid text stays legible, instead of relying on opacity alone. */
  clear?: "center" | "left" | "right" | null;
  className?: string;
  style?: React.CSSProperties;
}

const RAY_CLEAR_MASK: Record<NonNullable<RaysProps["clear"]>, string> = {
  // Opaque (rays visible) at the edges, transparent (rays hidden) across the
  // text band it's paired with.
  center:
    "linear-gradient(90deg,#000 0%,#000 8%,transparent 22%,transparent 78%,#000 92%,#000 100%)",
  left: "linear-gradient(90deg,transparent 0%,transparent 52%,#000 66%,#000 100%)",
  right: "linear-gradient(90deg,#000 0%,#000 34%,transparent 48%,transparent 100%)",
};

export function Rays({
  tone = "blue",
  origin = "bottom-left",
  clear = null,
  className,
  style,
}: RaysProps) {
  const stroke = tone === "light" ? "var(--lum-blue)" : "var(--lum-white)";
  const fill = tone === "light" ? "#dde9ff" : "var(--lum-blue)";
  const maskImage = clear ? RAY_CLEAR_MASK[clear] : undefined;
  const svgStyle: React.CSSProperties = maskImage
    ? { ...style, WebkitMaskImage: maskImage, maskImage }
    : (style ?? {});

  if (origin === "right") {
    return (
      <svg
        className={className}
        style={svgStyle}
        viewBox="0 0 1200 700"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <polygon
          points="1320,860 520,-120 800,-120"
          fill={fill}
          opacity={tone === "light" ? 1 : 0.9}
        />
        <g stroke={stroke} strokeWidth={4} fill="none">
          <line x1={1320} y1={860} x2={240} y2={-120} />
          <line x1={1320} y1={860} x2={520} y2={-120} />
          <line x1={1320} y1={860} x2={800} y2={-120} />
          <line x1={1320} y1={860} x2={1080} y2={-120} />
        </g>
      </svg>
    );
  }
  return (
    <svg
      className={className}
      style={svgStyle}
      viewBox="0 0 1200 700"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <polygon
        points="-120,860 1320,40 1320,250 -120,860"
        fill={fill}
        opacity={tone === "light" ? 1 : 0.9}
      />
      <g stroke={stroke} strokeWidth={4} fill="none">
        <line x1={-120} y1={860} x2={1340} y2={-120} />
        <line x1={-120} y1={860} x2={1340} y2={40} />
        <line x1={-120} y1={860} x2={1340} y2={250} />
        <line x1={-120} y1={860} x2={1340} y2={520} />
      </g>
    </svg>
  );
}
