/**
 * Resource-hub article tile.
 */
export interface InsightCardProps {
  /** Sentence-case headline of the article. */
  title: string;
  /** Topic tags, rendered uppercase and dot-separated. */
  topics?: string[];
  image?: string;
  href?: string;
  style?: React.CSSProperties;
}

export function InsightCard(props: InsightCardProps): JSX.Element;
