import React from "react";
import { Logotype, Icon, Button } from "../../../../components";
Logotype.assetBase = "../../../../assets";
const NAV_LINKS = ["The Treatment", "Technology", "For Professionals", "Results"];
export function Nav({ onBook }) {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return React.createElement(
    "header",
    {
      style: {
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: scrolled ? "var(--overlay-glass)" : "transparent",
        backdropFilter: scrolled ? "var(--blur-glass)" : "none",
        borderBottom:
          "var(--border-width-hairline) solid " +
          (scrolled ? "var(--border-subtle)" : "transparent"),
        transition:
          "background var(--dur-base) var(--ease-brand), border-color var(--dur-base) var(--ease-brand)",
      },
    },
    React.createElement(
      "div",
      {
        style: {
          maxWidth: "var(--page-max)",
          margin: "0 auto",
          padding: "0 var(--page-gutter)",
          height: 74,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        },
      },
      React.createElement(
        "a",
        {
          href: "#top",
          style: { display: "flex", alignItems: "center", gap: 11, textDecoration: "none" },
        },
        React.createElement(
          "span",
          {
            style: {
              fontFamily: "var(--font-mix)",
              fontSize: 23,
              color: "var(--text-primary)",
              lineHeight: 1,
            },
          },
          "Opti",
          React.createElement(
            "span",
            { style: { fontFamily: "var(--font-sans)", fontWeight: 700, letterSpacing: ".04em" } },
            "LIGHT",
          ),
          React.createElement(
            "sup",
            { style: { fontSize: 9, fontFamily: "var(--font-sans)", fontWeight: 600 } },
            "\u2122",
          ),
        ),
        React.createElement(Icon, { name: "sun", size: 18, tone: "var(--lum-blue)" }),
        React.createElement("span", {
          style: { width: 1, height: 20, background: "var(--border-subtle)" },
        }),
        React.createElement(Logotype, { variant: "wordmark", tone: "black", width: 90 }),
      ),
      React.createElement(
        "nav",
        { style: { display: "flex", alignItems: "center", gap: "var(--space-6)" } },
        NAV_LINKS.map((l) =>
          React.createElement(
            "a",
            {
              key: l,
              href: "#",
              onClick: (e) => e.preventDefault(),
              style: {
                fontFamily: "var(--font-sans)",
                fontSize: 14.5,
                fontWeight: 500,
                color: "var(--text-muted)",
                textDecoration: "none",
                whiteSpace: "nowrap",
              },
            },
            l,
          ),
        ),
      ),
      React.createElement(
        Button,
        { variant: "accent", size: "sm", onClick: onBook },
        "Find a provider",
      ),
    ),
  );
}
