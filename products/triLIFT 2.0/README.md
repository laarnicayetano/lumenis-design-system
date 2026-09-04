# triLIFT 2.0

Non-invasive, in-office triple-modality RF platform for facial muscle, skin, and volume — combining triFX™ (RF microneedling), TriPollar® RF, and DMSt (Dynamic Muscle Stimulation) in one device to produce a face-lift-like effect without injections or surgery. Positioned as a natural alternative to injectables, including for patients addressing post-weight-loss skin laxity. One of Lumenis' Aesthetics device lines.

Read this file for what's specific to triLIFT 2.0. Everything not overridden here inherits from the root [SKILL.md](../../SKILL.md) / [BRAND_GUIDELINES.md](../../BRAND_GUIDELINES.md) — casing rules, the split-layout system, motion, build/publish mechanics.

## Non-negotiables

- **Accent is TriLIFT 2.0 Rose Gold `#FABCAD`** (`--lum-rose-gold` in `tokens/colors.css`; scoped via `[data-subbrand="trilift"]` in `tokens/subbrands.css`), with **Rose Gold Light `#FFD1CA`** (`--lum-rose-gold-light`) as its lighter companion. Both are confirmed against the print brand guidelines (Pantone 691C / 196C) — not sampled or inferred.
- **Product name is `triLIFT 2.0`** — lowercase "tri", full-caps "LIFT", the version number always included. Sentence-initial/body copy renders it `TriLIFT 2.0`; the registered mark is `TriLIFT 2.0™` (superscript, first/prominent use only). See Caveats — this differs from how the product is referred to elsewhere in this repo today.
- **Primary palette is black + white**, same structural pair as the rest of the system; rose gold is a **highlight color only** — not a large-fill background outside the triangle motif or festive/black-mode layouts (see below).
- **The triangle is the signature graphic system** — an isosceles shape with an 80° apex and two 50° base angles, 1–2pt stroke, filled or outlined only in Lumenis White, TriLIFT Rose Gold, or Lumenis Black. Never connect triangles into new shapes, overlap/nest them, vary their stroke weight, change their (upward-pointing) direction, or tile them into a repeating pattern — the guidelines are explicit that all of these are misuses.
- **Rose gold text/fills are the emphasis mechanism**, same as the root system's Arizona-has-no-bold rule — small highlights, never large fills at body-copy scale.

## Content fundamentals

- **Voice**: confident, warm, quietly premium — "natural alternative to injectables," never fear-based or overly clinical. Leans on plain outcome language ("no downtime," "visible results," "back to yourself, naturally") over superlatives.
- **Person**: addresses the patient directly in headlines ("your," "you" — e.g. "Unveil the best in you"), more descriptive third-person for provider/practice copy.
- **Audience**: dual — consumers considering injectable alternatives (including GLP-1 patients with post-weight-loss skin laxity), and dermatologists/plastic surgeons/medspas evaluating practice differentiation.

## Visual foundations

### Color

Lumenis White/Black carry the structural weight; TriLIFT Rose Gold is the one brand accent, used sparingly for highlights, CTAs, and the triangle motif. Product photography backdrop is `#F2F2F2` (light gray) per the printed guideline.

### The triangle motif

Parallel to OptiLIGHT's "rays" and OptiLIFT's "sunburst" — the single most load-bearing recurring graphic device, always built from the exact 50°/50°/80° triangle (see Non-negotiables). Used four ways: image fill + image, background-as-image, image + line + shape, or line-only — always paired with the `triLIFT 2.0` wordmark and, in most layouts, the Lumenis logo aligned to the opposite corner or as a "BY LUMENIS" sublockup.

### Imagery

Warm, bright, optimistic portraits (models 30+, diverse skin tones) in three registers: **facial** close-ups on clean blush/rose backdrops, **body** shots in minimal blush/black activewear emphasizing contour, and **treatment** shots showing practitioner/patient interaction in a soft clinical setting. Product renders are isolated on `#F2F2F2`. A rare **festive/black mode** (awards, launches, major announcements) inverts to an all-black background with the rose triangle fading softly into it — reserved for special occasions, not everyday layouts.

### Layout

Same 40-unit diagonal grid construction already documented for OptiLIGHT (divide the format diagonally into 40 units → 1 unit = 1x = margin; inner area split into 6 columns) — inherited from the root system, not a triLIFT-specific deviation.

## In this repo

- `products/triLIFT 2.0/guidelines/brand-color.card.html` — the rose gold tint/shade ramp (new; see Caveats on which stops are confirmed vs. derived). The two brand colors are also already documented at the shared-palette level in `guidelines/colors-rose.card.html`.
- `products/triLIFT 2.0/assets/product/` — two product renders (`trilift-full-front.webp`, `trilift-detail-handpieces.webp`) converted from a larger supplied set; see Caveats.
- No logo lockup card yet — see Caveats.

## Caveats

1. **No vector/SVG logo asset was supplied** — only rasterized pages from the print brand-guidelines PDF. No `brand-logo.card.html` was added; build one once real logo files (wordmark + triangle mark, not a PDF screenshot) are available, following the shape of `products/OptiLIFT/guidelines/brand-logo.card.html`.
2. **This repo elsewhere still calls the product `triLift`**, with no version number (`ui_kits/corporate-website`, the linked marketing skill). This README and the new guideline card use `triLIFT 2.0` per the print guidelines supplied for this update; the marketing-site copy was not changed as part of this pass — flag for whoever owns that content.
3. **The color-ramp card's 300/600/700 stops are UI-only derivations** — only 100 (Rose Gold Light) and 500 (Rose Gold) are confirmed print colors; the rest were generated for hover/press states and aren't in the printed swatch book.
4. Only 2 of 25 supplied 3D product renders were converted and committed; the rest remain in a local, gitignored `input/` drop folder and were not added to this repo.
