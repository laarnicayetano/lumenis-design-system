import React from "react";
const RAY_CLEAR_MASK = {
  // Opaque (rays visible) at the edges, transparent (rays hidden) across the
  // text band it's paired with.
  center:
    "linear-gradient(90deg,#000 0%,#000 8%,transparent 22%,transparent 78%,#000 92%,#000 100%)",
  left: "linear-gradient(90deg,transparent 0%,transparent 52%,#000 66%,#000 100%)",
  right: "linear-gradient(90deg,#000 0%,#000 34%,transparent 48%,transparent 100%)",
};
export function Rays({ tone = "blue", origin = "bottom-left", clear = null, className, style }) {
  const stroke = tone === "light" ? "var(--lum-blue)" : "var(--lum-white)";
  const fill = tone === "light" ? "#dde9ff" : "var(--lum-blue)";
  const maskImage = clear ? RAY_CLEAR_MASK[clear] : void 0;
  const svgStyle = maskImage ? { ...style, WebkitMaskImage: maskImage, maskImage } : (style ?? {});
  if (origin === "right") {
    return React.createElement(
      "svg",
      {
        className,
        style: svgStyle,
        viewBox: "0 0 1200 700",
        preserveAspectRatio: "none",
        "aria-hidden": "true",
      },
      React.createElement("polygon", {
        points: "1320,860 520,-120 800,-120",
        fill,
        opacity: tone === "light" ? 1 : 0.9,
      }),
      React.createElement(
        "g",
        { stroke, strokeWidth: 4, fill: "none" },
        React.createElement("line", { x1: 1320, y1: 860, x2: 240, y2: -120 }),
        React.createElement("line", { x1: 1320, y1: 860, x2: 520, y2: -120 }),
        React.createElement("line", { x1: 1320, y1: 860, x2: 800, y2: -120 }),
        React.createElement("line", { x1: 1320, y1: 860, x2: 1080, y2: -120 }),
      ),
    );
  }
  return React.createElement(
    "svg",
    {
      className,
      style: svgStyle,
      viewBox: "0 0 1200 700",
      preserveAspectRatio: "none",
      "aria-hidden": "true",
    },
    React.createElement("polygon", {
      points: "-120,860 1320,40 1320,250 -120,860",
      fill,
      opacity: tone === "light" ? 1 : 0.9,
    }),
    React.createElement(
      "g",
      { stroke, strokeWidth: 4, fill: "none" },
      React.createElement("line", { x1: -120, y1: 860, x2: 1340, y2: -120 }),
      React.createElement("line", { x1: -120, y1: 860, x2: 1340, y2: 40 }),
      React.createElement("line", { x1: -120, y1: 860, x2: 1340, y2: 250 }),
      React.createElement("line", { x1: -120, y1: 860, x2: 1340, y2: 520 }),
    ),
  );
}
