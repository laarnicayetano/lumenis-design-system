import * as React from "react";
import { Logotype } from "lumenis-design-system";

// The story overrides assetBase to "/foundations/assets" — a path Storybook's
// own staticDirs mapping serves (.storybook/main.ts), but that path doesn't
// exist relative to a shipped design-system project. There, Logotype's own
// default (assetBase="assets", a RELATIVE path) resolves relative to the
// consuming page's own URL — which for this card is components/Brand/Logotype/
// Logotype.html, three levels below the project root where assets/logo/*.svg
// actually lives. Set the static default to the correct relative depth so the
// preview (and every other design that composes this component from this
// card's known nesting) resolves images the same way a real design does.
Logotype.assetBase = "../../../assets";

export const Wordmark = () => <Logotype tone="black" variant="wordmark" width={180} />;

export const Symbol = () => <Logotype tone="black" variant="symbol" width={48} />;

export const WhiteOnBlack = () => (
  <div style={{ background: "var(--surface-inverse)", padding: 24 }}>
    <Logotype tone="white" variant="wordmark" width={180} />
  </div>
);
