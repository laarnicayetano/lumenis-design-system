import React from "react";

/** A single line icon. Substituted glyph set — see prompt notes. */
export interface IconProps extends React.HTMLAttributes<HTMLElement> {
  /** Phosphor icon name, e.g. "eye", "sparkle", "user-circle". */
  name: string;
  /** small = 1pt stroke beside type · large = 2pt expressive scale. */
  scale?: "small" | "large";
  size?: number;
  tone?: string;
  style?: React.CSSProperties;
}

export function Icon({
  name,
  scale = "small",
  size,
  tone = "currentColor",
  style,
  ...rest
}: IconProps) {
  const weight = scale === "large" ? "ph-thin" : "ph-light";
  const px = size || (scale === "large" ? 96 : 24);
  return (
    <i
      className={weight + " ph-" + name}
      aria-hidden="true"
      style={{ fontSize: px, lineHeight: 1, color: tone, display: "inline-block", ...style }}
      {...rest}
    />
  );
}
