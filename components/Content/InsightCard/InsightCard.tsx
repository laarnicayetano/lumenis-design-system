import React from "react";
import { Eyebrow } from "../../Typography/Eyebrow/Eyebrow";
import { TextLink } from "../../Actions/TextLink/TextLink";

/** Resource-hub article tile. */
export interface InsightCardProps {
  /** Sentence-case headline of the article. */
  title: string;
  /** Topic tags, rendered uppercase and dot-separated. */
  topics?: string[];
  image?: string;
  href?: string;
  style?: React.CSSProperties;
}

export function InsightCard({
  title,
  topics = [],
  image,
  href = "#",
  style,
  ...rest
}: InsightCardProps) {
  return (
    <article style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)", ...style }} {...rest}>
      <div
        style={{
          position: "relative",
          aspectRatio: "16 / 9",
          background: "var(--surface-image)",
          overflow: "hidden",
          borderRadius: "var(--radius-md)",
        }}
      >
        {image ? (
          <img src={image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <span
            style={{
              position: "absolute",
              inset: 0,
              display: "grid",
              placeItems: "center",
              fontSize: "var(--text-caption)",
              letterSpacing: "var(--tracking-caption)",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              opacity: 0.5,
            }}
          >
            Article image
          </span>
        )}
      </div>
      {topics.length ? (
        <Eyebrow style={{ color: "var(--text-muted)" }}>{topics.join(" \xB7 ")}</Eyebrow>
      ) : null}
      <h3
        style={{
          margin: 0,
          fontFamily: "var(--font-sans)",
          fontWeight: "var(--weight-regular)",
          fontSize: "var(--text-body)",
          lineHeight: "var(--leading-subtitle)",
          textWrap: "pretty",
        }}
      >
        {title}
      </h3>
      <TextLink href={href} caps size="caption">
        Read more
      </TextLink>
    </article>
  );
}
