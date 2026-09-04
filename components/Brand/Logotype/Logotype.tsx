import React from "react";

/** The Lumenis wordmark or Hero "L" symbol, as a supplied SVG asset. */
export interface LogotypeProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** Positive (black) or negative (white) version. */
  tone?: "black" | "white";
  /** Full wordmark, or the Hero "L" symbol alone. */
  variant?: "wordmark" | "symbol";
  /** Rendered width in px. Wordmark must never go below 50px on screen. */
  width?: number;
  /** Reserve the guideline safety zone as padding. */
  safety?: boolean;
  /** Full path/URL to the SVG asset. Defaults to `assets/logo/<variant>-<tone>.svg`, resolved relative to the consuming page — pass the exact path when that default doesn't resolve (e.g. Storybook's `/foundations/assets`, or a component that composes `Logotype` from a different page depth, like `SiteHeader`/`SiteFooter`). */
  src?: string;
  alt?: string;
  style?: React.CSSProperties;
}

export function Logotype({
  tone = "black",
  variant = "wordmark",
  width,
  safety = false,
  src,
  alt = "Lumenis",
  style,
  ...rest
}: LogotypeProps) {
  const base = variant === "symbol" ? "symbol" : "wordmark";
  const resolvedSrc = src ?? `assets/logo/${base}-${tone}.svg`;
  const w = width || (variant === "symbol" ? 48 : 180);
  return (
    <img
      src={resolvedSrc}
      alt={alt}
      style={{
        display: "block",
        width: w,
        height: "auto",
        padding: safety ? "calc(var(--logo-safety) * 0.5)" : 0,
        ...style,
      }}
      {...rest}
    />
  );
}
