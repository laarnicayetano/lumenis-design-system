# OptiLIGHT website UI kit

OptiLIGHT's patient/professional-facing homepage, built entirely from this system's real components (`Button`, `Badge`, `Card`, `Headline`, `Prose`, `Tabs`, `TextField`, `Quote`, `Eyebrow`, `Icon`, `Logotype`) plus the newly-ported `Rays` component (`components/Brand/Rays/`) — OptiLIGHT's signature graphic system, promoted to a first-class shared component rather than duplicated inline SVG, since it's reused across five different sections here plus `guidelines/brand-optilight-rays.card.html`.

Migrated from the standalone `OptiLight Lumenis Design System/ui_kits/optilight-website/` export — that version used its own bespoke icon set (a documented Lucide-style substitution) and referenced Lumenis logo files that turned out to be byte-identical duplicates of this repo's own corporate logo assets (already deleted during the asset migration). This version reuses this repo's existing Phosphor-based `Icon` component instead of adding a second icon library, and `Logotype` instead of a raw `<img>` reference.

**Screens** — single scrolling page: frost-on-scroll `Nav`, rays `Hero`, `ValueProps` (four icon cards), full-bleed prism `PrismBand` quote, `ProductShowcase` with a Professionals/Patients tab switch, `HowItWorks` (three numbered steps), a blue rays `Testimonial` band, an `FAQ` accordion, a dark rays `ProviderCTA`, `Footer`, and a `BookModal` "find a provider" dialog with a form → success state.

**Sub-brand scoping** — the whole page sits inside `<div data-subbrand="optilight">` (`OptiLightApp.tsx`), so `--accent`/`--accent-contrast` resolve to OptiLIGHT Blue everywhere `variant="accent"` is used, per `tokens/subbrands.css`.

**Kit-local, not promoted to shared components**: the FAQ accordion (`Sectionsb.tsx`) and the booking modal (`OptiLightFooter.tsx`) are one-off implementations local to this kit, not new design-system components — this repo doesn't have a generic `Accordion` or `Modal` yet. If a second use case needs either, that's the trigger to promote them, following the same reasoning that got `Rays` promoted.

**Photography/renders** are real OptiLIGHT assets (`assets/photography/`, `assets/optilight/product/`), not placeholder grey plates.

**Interactions** — the product-showcase tabs, FAQ accordion, and "find a provider" modal (nav / hero / CTA all open it; submitting shows a success state) are all live.

**Content note carried over from the source**: copy avoids fabricated clinical efficacy figures — stats shown are procedural (session count, duration) and qualitative. Verify all medical claims before any real use; this is a design mock, not approved marketing.
