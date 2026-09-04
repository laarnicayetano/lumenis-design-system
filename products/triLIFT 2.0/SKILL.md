---
name: trilift-design
description: Design overrides for triLIFT 2.0 — where its visual treatment differs from the company-wide Lumenis design system. Use when creating or reviewing visuals for triLIFT 2.0. These values take precedence over the global `lumenis-design-system` skill for this product only. Do NOT use for other products.
---

# triLIFT 2.0 — design overrides

Only what DIFFERS from the global design system; everything else inherits
from the root [SKILL.md](../../SKILL.md).

## Non-negotiables

- **Accent is TriLIFT 2.0 Rose Gold `#FABCAD`** (`--lum-rose-gold` in
  `tokens/colors.css`; scoped via `[data-subbrand="trilift"]` in
  `tokens/subbrands.css`), with **Rose Gold Light `#FFD1CA`**
  (`--lum-rose-gold-light`) as its lighter companion. Both are confirmed
  against the print brand guidelines (Pantone 691C / 196C) — not sampled
  or inferred.
- **Product name is `triLIFT 2.0`** — lowercase "tri", full-caps "LIFT",
  the version number always included. Sentence-initial/body copy renders
  it `TriLIFT 2.0`; the registered mark is `TriLIFT 2.0™` (superscript,
  first/prominent use only).
- **Primary palette is black + white**, same structural pair as the rest
  of the system; rose gold is a **highlight color only** — not a
  large-fill background outside the triangle motif or festive/black-mode
  layouts (see below).
- **The triangle is the signature graphic system** — an isosceles shape
  with an 80° apex and two 50° base angles, 1–2pt stroke, filled or
  outlined only in Lumenis White, TriLIFT Rose Gold, or Lumenis Black.
  Never connect triangles into new shapes, overlap/nest them, vary their
  stroke weight, change their (upward-pointing) direction, or tile them
  into a repeating pattern — the guidelines are explicit that all of
  these are misuses.
- **Rose gold text/fills are the emphasis mechanism**, same as the root
  system's Arizona-has-no-bold rule — small highlights, never large
  fills at body-copy scale.

## Visual foundations

### Color

Lumenis White/Black carry the structural weight; TriLIFT Rose Gold is
the one brand accent, used sparingly for highlights, CTAs, and the
triangle motif. Product photography backdrop is `#F2F2F2` (light gray)
per the printed guideline.

### The triangle motif

Parallel to OptiLIGHT's "rays" and OptiLIFT's "sunburst" — the single
most load-bearing recurring graphic device, always built from the exact
50°/50°/80° triangle (see Non-negotiables). Used four ways: image fill +
image, background-as-image, image + line + shape, or line-only — always
paired with the `triLIFT 2.0` wordmark and, in most layouts, the Lumenis
logo aligned to the opposite corner or as a "BY LUMENIS" sublockup.

### Imagery

Warm, bright, optimistic portraits (models 30+, diverse skin tones) in
three registers: **facial** close-ups on clean blush/rose backdrops,
**body** shots in minimal blush/black activewear emphasizing contour,
and **treatment** shots showing practitioner/patient interaction in a
soft clinical setting. Product renders are isolated on `#F2F2F2`. A rare
**festive/black mode** (awards, launches, major announcements) inverts
to an all-black background with the rose triangle fading softly into it
— reserved for special occasions, not everyday layouts.

### Layout

Same 40-unit diagonal grid construction already documented for OptiLIGHT
(divide the format diagonally into 40 units → 1 unit = 1x = margin;
inner area split into 6 columns) — inherited from the root system, not a
triLIFT-specific deviation.

## How to use this

- Inherit global tokens; apply only the deltas listed here.
- Full brand voice, content rules, and file inventory: see this product's
  [README.md](README.md).
