import React from "react";
export function Logotype({
  tone = "black",
  variant = "wordmark",
  width,
  safety = false,
  assetBase = Logotype.assetBase,
  alt = "Lumenis",
  style,
  ...rest
}) {
  const base = variant === "symbol" ? "symbol" : "wordmark";
  const src = assetBase + "/logo/" + base + "-" + tone + ".svg";
  const w = width || (variant === "symbol" ? 48 : 180);
  return React.createElement("img", {
    src,
    alt,
    style: {
      display: "block",
      width: w,
      height: "auto",
      padding: safety ? "calc(var(--logo-safety) * 0.5)" : 0,
      ...style,
    },
    ...rest,
  });
}
Logotype.assetBase = "assets";
