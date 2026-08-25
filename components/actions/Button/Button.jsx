import React from "react";
const BUTTON_VARIANTS = {
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
const BUTTON_SIZES = {
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
}) {
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const Tag = href ? "a" : "button";
  return React.createElement(
    Tag,
    {
      href,
      onClick: disabled ? void 0 : onClick,
      disabled: Tag === "button" ? disabled : void 0,
      onMouseEnter: () => setHover(true),
      onMouseLeave: () => {
        setHover(false);
        setPress(false);
      },
      onMouseDown: () => setPress(true),
      onMouseUp: () => setPress(false),
      style: {
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
      },
      ...rest,
    },
    children,
  );
}
