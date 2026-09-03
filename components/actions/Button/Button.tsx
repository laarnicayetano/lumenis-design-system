import React from "react";

/** The Lumenis web CTA button. */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement | HTMLAnchorElement> {
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

const BUTTON_VARIANTS: Record<
  NonNullable<ButtonProps["variant"]>,
  React.CSSProperties
> = {
  primary: {
    background: "var(--surface-accent)",
    color: "var(--text-inverse)",
    borderColor: "var(--surface-accent)",
    boxShadow: "var(--shadow-sm)",
  },
  secondary: {
    background: "transparent",
    color: "var(--text-primary)",
    borderColor: "var(--text-primary)",
  },
  inverse: {
    background: "var(--surface-page)",
    color: "var(--text-primary)",
    borderColor: "var(--surface-page)",
    boxShadow: "var(--shadow-sm)",
  },
  "inverse-outline": {
    background: "transparent",
    color: "var(--text-inverse)",
    borderColor: "var(--text-inverse)",
  },
  accent: {
    background: "var(--accent)",
    color: "var(--accent-contrast)",
    borderColor: "var(--accent)",
    boxShadow: "var(--shadow-accent)",
  },
  "accent-outline": {
    background: "transparent",
    color: "var(--accent)",
    borderColor: "var(--accent)",
  },
};

const BUTTON_SIZES: Record<NonNullable<ButtonProps["size"]>, React.CSSProperties> = {
  md: { fontSize: "var(--text-button)", padding: "18px 40px" },
  sm: { fontSize: "var(--text-form)", padding: "13px 28px" },
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  disabled,
  onClick,
  style,
  ...rest
}: ButtonProps) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  // Polymorphic anchor/button tag — ElementType is the standard way to type
  // this without narrowing props on either branch away.
  const Tag = (href ? "a" : "button") as React.ElementType;
  return (
    <Tag
      href={href}
      onClick={disabled ? undefined : onClick}
      disabled={Tag === "button" ? disabled : undefined}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false);
        setPress(false);
      }}
      onMouseDown={() => setPress(true)}
      onMouseUp={() => setPress(false)}
      style={
        {
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "var(--space-3)",
          fontFamily: "var(--font-sans)",
          fontWeight: "var(--weight-regular)",
          lineHeight: "var(--leading-button)",
          textTransform: "uppercase",
          letterSpacing: 0,
          textDecoration: "none",
          cursor: disabled ? "not-allowed" : "pointer",
          borderStyle: "solid",
          borderWidth: "var(--border-width-hairline)",
          borderRadius: "var(--radius-sm)",
          opacity: disabled
            ? 0.35
            : press
              ? "var(--press-opacity)"
              : hover
                ? "var(--hover-opacity)"
                : 1,
          transition: "opacity var(--dur-fast) var(--ease-brand)",
          ...BUTTON_VARIANTS[variant],
          ...BUTTON_SIZES[size],
          ...style,
        } as React.CSSProperties
      }
      {...rest}
    >
      {children}
    </Tag>
  );
}
