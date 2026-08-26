/**
 * The Lumenis web CTA button.
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<
  HTMLButtonElement | HTMLAnchorElement
> {
  children?: React.ReactNode;
  /** primary/secondary on white · inverse pair on black or photography · accent pair inside a sub-brand scope. */
  variant?:
    | "primary"
    | "secondary"
    | "inverse"
    | "inverse-outline"
    | "accent"
    | "accent-outline";
  size?: "md" | "sm";
  /** Renders an anchor instead of a button. */
  href?: string;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
}

export function Button(props: ButtonProps): JSX.Element;
