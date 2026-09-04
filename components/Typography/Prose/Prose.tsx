import React from "react";

const PROSE_SIZES: Record<NonNullable<ProseProps["size"]>, React.CSSProperties> = {
  subtitle: { fontSize: "var(--text-subtitle)", lineHeight: "var(--leading-subtitle)" },
  body: { fontSize: "var(--text-body)", lineHeight: "var(--leading-body)" },
  small: { fontSize: "var(--text-form)", lineHeight: "var(--leading-form)" },
};

/** Sentence-case body copy: subtitle, paragraph, or small. */
export interface ProseProps {
  children?: React.ReactNode;
  /** subtitle 28px · body 18px · small 16px. */
  size?: "subtitle" | "body" | "small";
  tone?: string;
  maxWidth?: number | string;
  style?: React.CSSProperties;
}

export function Prose({
  children,
  size = "body",
  tone = "inherit",
  maxWidth = "58ch",
  style,
  ...rest
}: ProseProps) {
  return (
    <p
      style={{
        margin: 0,
        fontFamily: "var(--font-sans)",
        fontWeight: "var(--weight-regular)",
        color: tone === "inherit" ? "inherit" : tone,
        maxWidth,
        textWrap: "pretty",
        ...PROSE_SIZES[size],
        ...style,
      }}
      {...rest}
    >
      {children}
    </p>
  );
}
