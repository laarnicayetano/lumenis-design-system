import React from "react";
import wordmarkBlack from "../../../assets/logo/wordmark-black.svg";
import wordmarkWhite from "../../../assets/logo/wordmark-white.svg";
import symbolBlack from "../../../assets/logo/symbol-black.svg";
import symbolWhite from "../../../assets/logo/symbol-white.svg";

/** The Lumenis wordmark or Hero "L" symbol — real SVG assets, bundled in. */
export interface LogotypeProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src"> {
  /** Positive (black) or negative (white) version. */
  tone?: "black" | "white";
  /** Full wordmark, or the Hero "L" symbol alone. */
  variant?: "wordmark" | "symbol";
  /** Rendered width in px. Wordmark must never go below 50px on screen. */
  width?: number;
  /** Reserve the guideline safety zone as padding. */
  safety?: boolean;
  alt?: string;
  style?: React.CSSProperties;
}

const MARKS: Record<"wordmark" | "symbol", Record<"black" | "white", string>> = {
  wordmark: { black: wordmarkBlack, white: wordmarkWhite },
  symbol: { black: symbolBlack, white: symbolWhite },
};

export function Logotype({
  tone = "black",
  variant = "wordmark",
  width,
  safety = false,
  alt = "Lumenis",
  style,
  ...rest
}: LogotypeProps) {
  const w = width || (variant === "symbol" ? 48 : 180);
  return (
    <img
      src={MARKS[variant][tone]}
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
