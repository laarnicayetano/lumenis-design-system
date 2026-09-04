import React from "react";
import { Button } from "../../../../components";
export function Header() {
  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "var(--space-5) var(--page-gutter)",
        position: "sticky",
        top: 0,
        zIndex: 10,
        background: "rgba(255,255,255,.9)",
        backdropFilter: "var(--blur-glass)",
        borderBottom: "var(--border-width-hairline) solid var(--border-subtle)",
      }}
    >
      <img
        src="../../assets/logo/ByLUMENIS_black.png"
        style={{ height: 32 }}
        alt="OptiLIFT by Lumenis"
      />
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          gap: "var(--space-7)",
          fontFamily: "var(--font-sans)",
          fontSize: "var(--text-form)",
        }}
      >
        <a href="#technology" style={{ color: "inherit", textDecoration: "none" }}>
          Technology
        </a>
        <a href="#results" style={{ color: "inherit", textDecoration: "none" }}>
          Results
        </a>
        <a href="#faq" style={{ color: "inherit", textDecoration: "none" }}>
          FAQs
        </a>
      </nav>
      <Button
        variant="accent"
        size="sm"
        onClick={() =>
          document.getElementById("provider-form")?.scrollIntoView({ behavior: "smooth" })
        }
      >
        Find a provider
      </Button>
    </header>
  );
}
