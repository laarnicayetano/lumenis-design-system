/**
 * The Lumenis wordmark or Hero "L" symbol, as a supplied SVG asset.
 */
export interface LogotypeProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** Positive (black) or negative (white) version. */
  tone?: 'black' | 'white';
  /** Full wordmark, or the Hero "L" symbol alone. */
  variant?: 'wordmark' | 'symbol';
  /** Rendered width in px. Wordmark must never go below 50px on screen. */
  width?: number;
  /** Reserve the guideline safety zone as padding. */
  safety?: boolean;
  /** Path to the copied `assets/` directory, relative to the consuming page. Defaults to `Logotype.assetBase`. */
  assetBase?: string;
  alt?: string;
  style?: React.CSSProperties;
}

export function Logotype(props: LogotypeProps): JSX.Element;
export namespace Logotype {
  /* Consumers point this at wherever they copied assets/ to. */
  let assetBase: string;
}
