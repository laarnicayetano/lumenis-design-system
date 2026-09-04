import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  "stories": [
    "../stories/**/*.mdx",
    "../components/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-mcp"
  ],
  "framework": "@storybook/react-vite",
  // Lets the generated guidelines/ui_kit docs pages (stories/generated/, see
  // scripts/build-storybook-content.ts) iframe the real, unmodified
  // .card.html / ui_kits/*.html / products/**/* files straight off disk,
  // same relative-path scheme (`../styles.css`) those files already use
  // today. Served under /foundations rather than at the root so it doesn't
  // collide with Vite's own handling of the `import '../styles.css'`
  // side-effect import below.
  //
  // ui_kits/corporate-website and products/{OptiLIFT,OptiLIGHT}/ui_kit/
  // website are deliberately NOT mapped from their raw source here — only
  // their *compiled* copy (stories/generated/ui-kit-bundles/…, real
  // bundle.js, babel-standalone placeholder swapped out) is. Two staticDirs
  // entries pointing at the same public path was tried first and doesn't
  // work reliably: Storybook's dev server resolves an overlap first-match-
  // wins, but `storybook build`'s static copy is last-copied-wins — no
  // single entry order satisfies both. Excluding the raw folder from
  // staticDirs entirely (rather than mapping the whole ui_kits/ or
  // products/<Name>/ folder wholesale) sidesteps that ambiguity: one
  // unambiguous source per public path, identical in dev and build. Every
  // other file those apps reference at runtime (product-local assets/,
  // shared root assets/, etc.) still resolves via the other mappings below.
  "staticDirs": [
    { from: "../styles.css", to: "/foundations/styles.css" },
    { from: "../tokens", to: "/foundations/tokens" },
    { from: "../assets", to: "/foundations/assets" },
    { from: "../guidelines", to: "/foundations/guidelines" },
    { from: "../ui_kits/social", to: "/foundations/ui_kits/social" },
    { from: "../ui_kits/email", to: "/foundations/ui_kits/email" },
    { from: "../ui_kits/slides", to: "/foundations/ui_kits/slides" },
    { from: "../stories/generated/ui-kit-bundles/ui_kits/corporate-website", to: "/foundations/ui_kits/corporate-website" },
    { from: "../products/OptiLIFT/assets", to: "/foundations/products/OptiLIFT/assets" },
    { from: "../products/OptiLIFT/guidelines", to: "/foundations/products/OptiLIFT/guidelines" },
    { from: "../products/OptiLIFT/templates", to: "/foundations/products/OptiLIFT/templates" },
    { from: "../stories/generated/ui-kit-bundles/products/OptiLIFT/ui_kit/website", to: "/foundations/products/OptiLIFT/ui_kit/website" },
    { from: "../products/OptiLIGHT/assets", to: "/foundations/products/OptiLIGHT/assets" },
    { from: "../products/OptiLIGHT/guidelines", to: "/foundations/products/OptiLIGHT/guidelines" },
    { from: "../products/OptiLIGHT/templates", to: "/foundations/products/OptiLIGHT/templates" },
    { from: "../stories/generated/ui-kit-bundles/products/OptiLIGHT/ui_kit/website", to: "/foundations/products/OptiLIGHT/ui_kit/website" },
    // Destination slugged (real folder names have spaces — "Stellar M22",
    // "triLIFT 2.0") — Storybook's static file serving silently 404s on any
    // served path containing a literal space, confirmed empirically. Must
    // match scripts/build-storybook-content.ts's slug() exactly.
    { from: "../products/Stellar M22", to: "/foundations/products/Stellar-M22" },
    { from: "../products/triLIFT 2.0", to: "/foundations/products/triLIFT-2.0" }
  ]
};
export default config;