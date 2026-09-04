---
name: stellar-m22-design
description: Design overrides for Stellar M22 — where its visual treatment differs from the company-wide Lumenis design system. Use when creating or reviewing visuals for Stellar M22. These values take precedence over the global `lumenis-design-system` skill for this product only. Do NOT use for other products.
---

# Stellar M22 — design overrides

Only what DIFFERS from the global design system; everything else inherits
from the root [SKILL.md](../../SKILL.md).

## Non-negotiables

- **Accent is Stellar Silken Rose `#BA6D81`** (`--lum-silken-rose` in
  `tokens/colors.css`; scoped via `[data-subbrand="stellar-m22"]` in
  `tokens/subbrands.css`), with **Peach Beige `#DEAA9B`**
  (`--lum-peach-beige`) as `--accent-soft`. Both are confirmed against the
  print brand guidelines (Pantone 695CP / 7612CP) — not sampled or
  inferred. A third confirmed tone, **Rose Beige `#CF9684`**
  (`--lum-rose-beige`, Pantone 7613CP), is documented alongside them but
  isn't wired as an accent.
- **Product name is `Stellar M22`** (with a trademark: `Stellar M22™`) —
  matches the casing already used throughout this repo's `ui_kits`.
- **Primary palette is black + white**, same structural pair as the rest
  of the system; rose is a highlight/accent color, not a large-fill
  background outside the shine motif or campaign-specific gradients.
- **The "shine" is the signature graphic system** — a four-pointed,
  concave-sided star ("The power of shine brightly"). It must always
  cross the full format edge-to-edge, keep its overlapped center visible,
  and use one consistent stroke weight (digital 4–7px, print 1–4pt).
  Never combine shapes into new forms, let fill areas mismatch, or tile
  them into a repeating pattern.
- **Handpieces carry their own single-letter-coded names** — XPL (IPL),
  NdY (Multi-Spot Nd:YAG), QSW (Q-Switched Nd:YAG), RFX — rendered as
  `LUMENIS <CODE>` with the code in Stellar rose (Pantone 10155 C on
  physical devices) and the wordmark's "L" always using the Hero L glyph.

## Visual foundations

### Color

Lumenis White/Black carry the structural weight; the rose scale (see
`guidelines/brand-color.card.html`) is used for highlights, CTAs, and the
shine motif. Product photography backdrop is `#F2F2F2` (light gray) per
the printed guideline, same convention as the other device lines in this
system.

### The shine motif

Parallel to OptiLIGHT's "rays," OptiLIFT's "sunburst," and triLIFT 2.0's
triangle — the single most load-bearing recurring graphic device (see
`guidelines/brand-shine.card.html`). Appears as an outlined stroke in
most layouts; filled solid only as a large-scale key background element
(e.g. dark campaign layouts, sub-brand backdrops).

### Imagery

Powerful, confident portraits of models aged 30–55 with diverse skin
tones (Fitzpatrick IV–VI, matched to the technology's actual capability),
direct eye contact, bright light backgrounds. Device/treatment
photography emphasizes proper handpiece grip and positioning, with the
Lumenis logo and handpiece name clearly visible; parameters/screen must
be visible when shown in use.

### Typography

Same family already in this system — ABC Arizona Sans (primary) and ABC
Arizona Mix (display serif, 1–2 word highlights only) — plus the Hero L
treatment for headlines, all inherited from the root type system with no
Stellar-specific deviation.

### Layout

Same 40-unit diagonal grid construction already documented for OptiLIGHT
and triLIFT 2.0 (divide the format diagonally into 40 units → 1 unit =
1x = margin; inner area split into 6 columns) — inherited from the root
system.

## How to use this

- Inherit global tokens; apply only the deltas listed here.
- Full brand voice, content rules, and file inventory: see this product's
  [README.md](README.md).
