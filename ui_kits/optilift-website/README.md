# OptiLIFT website UI kit

OptiLIFT's patient-facing homepage, built entirely from this system's real components (`Button`, `Badge`, `Card`, `Headline`, `Prose`, `Tag`, `Tabs`, `TextField`, `Select`, `Checkbox`, `Quote`, `Eyebrow`) instead of a one-off implementation.

Migrated from the standalone `OptiLIFT Design System/ui_kits/marketing-site/` export — that version used its own bespoke `Card`/`Input` components and referenced a global `window.OptiLIFTDesignSystem_803627` bundle namespace. This version drops both: `Input` → `TextField`, and every component is a normal ES module import. `Results.tsx`'s testimonial tiles now use this system's own ported `Card` component directly (see `components/content/Card/`).

**Screens** — single scrolling page: sticky `Header`, `Hero`, dark `Technology` band with a treatment-area picker, `Results` testimonials, `FAQ` tabs, `ProviderForm` lead form, `Footer`.

**Sub-brand scoping** — the whole page sits inside `<div data-subbrand="optilift">` (`App.tsx`), so `--accent`/`--accent-contrast` resolve to the OptiLIFT violet everywhere `variant="accent"` is used, per `tokens/subbrands.css`.

**Photography/renders** are real OptiLIFT assets (`assets/optilift/...`), not placeholder grey plates — unlike `corporate-website`, real files were available for this brand.

**Interactions** — the technology area tags, FAQ tabs, and provider-match form (submits to an inline thank-you state) are all live.
