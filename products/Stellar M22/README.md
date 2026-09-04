# Stellar M22

Lumenis' flagship multi-application aesthetic platform — one device combining four energy-based technologies (XPL™ broad-spectrum IPL, ResurFX® non-ablative fractional resurfacing, Multi-Spot™ Nd:YAG, and Q-Switched Nd:YAG) to deliver 30+ FDA-cleared/unique treatments without disposables. Tagline: **"The Expert Tool to Elevate Your Practice."** Positioned for dermatologic surgeons and aesthetic practices wanting broad, integrated treatment capability backed by three decades of Lumenis' IPL heritage.

Read this file for what's specific to Stellar M22. Everything not overridden here inherits from the root [SKILL.md](../../SKILL.md) / [BRAND_GUIDELINES.md](../../BRAND_GUIDELINES.md) — casing rules, the split-layout system, motion, build/publish mechanics.

## Non-negotiables

- **Accent is Stellar Silken Rose `#BA6D81`** (`--lum-silken-rose` in `tokens/colors.css`; scoped via `[data-subbrand="stellar-m22"]` in `tokens/subbrands.css`), with **Peach Beige `#DEAA9B`** (`--lum-peach-beige`) as `--accent-soft`. Both are confirmed against the print brand guidelines (Pantone 695CP / 7612CP) — not sampled or inferred. A third confirmed tone, **Rose Beige `#CF9684`** (`--lum-rose-beige`, Pantone 7613CP), is documented alongside them but isn't wired as an accent.
- **Product name is `Stellar M22`** (with a trademark: `Stellar M22™`) — matches the casing already used throughout this repo's `ui_kits`.
- **Primary palette is black + white**, same structural pair as the rest of the system; rose is a highlight/accent color, not a large-fill background outside the shine motif or campaign-specific gradients.
- **The "shine" is the signature graphic system** — a four-pointed, concave-sided star ("The power of shine brightly"). It must always cross the full format edge-to-edge, keep its overlapped center visible, and use one consistent stroke weight (digital 4–7px, print 1–4pt). Never combine shapes into new forms, let fill areas mismatch, or tile them into a repeating pattern.
- **Handpieces carry their own single-letter-coded names** — XPL (IPL), NdY (Multi-Spot Nd:YAG), QSW (Q-Switched Nd:YAG), RFX — rendered as `LUMENIS <CODE>` with the code in Stellar rose (Pantone 10155 C on physical devices) and the wordmark's "L" always using the Hero L glyph.

## Content fundamentals

- **Voice**: expert, confident, relationship-driven rather than transactional — emphasizes clinical validation (170+ peer-reviewed studies), broad treatment scope, and dedicated practice support. Headlines lean short and declarative ("Handle anything with expert tools"); body copy stays plain and outcome-focused.
- **Person**: addresses the practitioner/practice directly ("elevate your practice," "handle anything") more often than the patient; patient-facing copy (e.g. "Reveal your best skin") is softer and second-person.
- **Audience**: dermatologic surgeons, cosmetic dermatology practitioners, and medspas evaluating a versatile, integrated platform — not a single-indication buyer.

## Visual foundations

### Color

Lumenis White/Black carry the structural weight; the rose scale (see `guidelines/brand-color.card.html`) is used for highlights, CTAs, and the shine motif. Product photography backdrop is `#F2F2F2` (light gray) per the printed guideline, same convention as the other device lines in this system.

### The shine motif

Parallel to OptiLIGHT's "rays," OptiLIFT's "sunburst," and triLIFT 2.0's triangle — the single most load-bearing recurring graphic device (see `guidelines/brand-shine.card.html`). Appears as an outlined stroke in most layouts; filled solid only as a large-scale key background element (e.g. dark campaign layouts, sub-brand backdrops).

### Imagery

Powerful, confident portraits of models aged 30–55 with diverse skin tones (Fitzpatrick IV–VI, matched to the technology's actual capability), direct eye contact, bright light backgrounds. Device/treatment photography emphasizes proper handpiece grip and positioning, with the Lumenis logo and handpiece name clearly visible; parameters/screen must be visible when shown in use.

### Typography

Same family already in this system — ABC Arizona Sans (primary) and ABC Arizona Mix (display serif, 1–2 word highlights only) — plus the Hero L treatment for headlines, all inherited from the root type system with no Stellar-specific deviation.

### Layout

Same 40-unit diagonal grid construction already documented for OptiLIGHT and triLIFT 2.0 (divide the format diagonally into 40 units → 1 unit = 1x = margin; inner area split into 6 columns) — inherited from the root system.

## In this repo

- `products/Stellar M22/guidelines/brand-color.card.html` — the rose scale (100/300/500 confirmed print colors, 600/700 UI derivations).
- `products/Stellar M22/guidelines/brand-shine.card.html` — the shine base shape, outlined and filled.
- `products/Stellar M22/guidelines/brand-logo.card.html` — the wordmark in its three delivered single-ink forms (rose, black, white); see Caveats.
- `products/Stellar M22/assets/logo/` — the three logo SVGs referenced above, copied as-delivered.
- `products/Stellar M22/assets/product/` — two device renders (`stellar-m22-front.webp`, `stellar-m22-angle.webp`) converted from a larger supplied set; see Caveats.
- The three brand rose tones are also already documented at the shared-palette level in `guidelines/colors-rose.card.html`.

## Caveats

1. **The print guidelines are internally inconsistent about "Soft Rose Beige.​"** Its primary-palette page labels `#FABCAD` (Pantone 691CP) "Stellar Soft Rose Beige (TriLift)" — the same value as triLIFT 2.0's Rose Gold — while its own sub-brand summary pages (RFX/XPL/QSW/NdY/SmoothGLO/PhotoFABULOUS) label `#DEAA9B` "Stellar Soft Rose Beige" with no TriLift note. This repo's `--lum-peach-beige` (`#DEAA9B`) matches the latter, already-wired value; the `#FABCAD` swatch was left alone rather than guessed at.
2. Only the 3 vector logo files and 2 device renders were pulled in from a much larger supplied asset set (25+ device/handpiece renders across multiple wavelengths, a full campaign photoshoot, and stock model imagery); the rest remain in a local, gitignored `input/` drop folder.
