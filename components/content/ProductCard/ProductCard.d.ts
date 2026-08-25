/**
 * Device tile for the OUR PRODUCTS grid.
 */
export interface ProductCardProps {
  /** Product name, rendered uppercase — include the trademark symbol. */
  name: string;
  /** Optional market or category line, e.g. "Aesthetics · Hair loss". */
  market?: string;
  /** Device photograph on transparent or #F2F2F2 ground. */
  image?: string;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
}

export function ProductCard(props: ProductCardProps): JSX.Element;
