import React from "react";
export function Icon({ name, scale = "small", size, tone = "currentColor", style, ...rest }) {
  const weight = scale === "large" ? "ph-thin" : "ph-light";
  const px = size || (scale === "large" ? 96 : 24);
  return React.createElement("i", {
    className: weight + " ph-" + name,
    "aria-hidden": "true",
    style: { fontSize: px, lineHeight: 1, color: tone, display: "inline-block", ...style },
    ...rest,
  });
}
