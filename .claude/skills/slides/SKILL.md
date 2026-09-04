---
name: slides
description: Generate a branded slide deck for a Lumenis product, built on this system's real components and the shared deck-stage runtime. Use when the user asks for a deck, a slide template, or "a presentation for <Product>". This is a repo-local skill for maintaining lumenis-design-system itself.
---

# Slides

Only when the user asks for it (a deck, a slide template, "a presentation for
`<Product>`") — never generate this proactively while onboarding a product.

**Prerequisite**: the product needs an accent already wired in
`tokens/subbrands.css` (`manage-products` Flow A step 4). If it's not there
yet, do that first — don't invent a color to unblock a deck.

Four worked examples already exist and are the reference to copy the *shape*
of, not the literal content: `products/Stellar M22/templates/Slides.dc.html`,
`products/triLIFT 2.0/templates/Slides.dc.html`,
`products/OptiLIFT/templates/Slides.dc.html`,
`products/OptiLIGHT/templates/Slides.dc.html`. Read at least one in full
before starting — it shows every pattern below in context.

1. **Scaffold `products/<Name>/templates/`** with two files:
   - `Slides.dc.html` — copy the structure of `templates/slides/Slides.dc.html`
     (7 sections inside one `x-import component-from-global-scope="deck-stage"`).
     Reference the *shared* runtime directly by relative path rather than
     copying it — `from="../../../templates/slides/deck-stage.js"`,
     `<script src="../../../templates/slides/support.js">`,
     `<link rel="stylesheet" href="../../../templates/slides/deck.css">`.
     Those files have no per-product content in them; there's nothing to
     fork. Set `<body data-subbrand="<slug>">` — this alone resolves
     `--accent`/`--accent-contrast`/`--accent-soft` for the whole deck via
     `tokens/subbrands.css`.
   - `ds-base.js` — a **local copy** of `templates/slides/ds-base.js` with
     its `base` constant changed from `'../..'` to `'../../..'` (one level
     deeper: `products/<Name>/templates/` vs `templates/slides/`). This file
     resolves its stylesheet/bundle path relative to the *page* that loads
     it, not its own location, so it can't be shared by reference the way
     deck-stage.js/support.js/deck.css can — copy
     `products/Stellar M22/templates/ds-base.js` verbatim, don't rewrite it
     from scratch.

2. **Motif — read the product's own usage rule before drawing anything.**
   Pull the real SVG geometry from `products/<Name>/guidelines/brand-*.card.html`
   (never invent geometry; if no card exists yet, e.g. no vector asset was
   ever supplied, author one first following an existing card's shape, as
   `products/triLIFT 2.0/guidelines/brand-triangle.card.html` did from the
   README's stated angles). Two real patterns, pick per that product's own
   documented rule:
   - **Full-bleed system** (shine/rays/triangle-style — crosses the whole
     format): a `.motif` div (from `deck.css`) containing the SVG, `fill`/
     `stroke="var(--accent)"`. Add `.motif--clear-h` so it doesn't paint
     behind the headline (mirrors `components/Brand/Rays/Rays.jsx`'s own
     "never place rays over live text" masking rule — generalized to every
     motif here, not just Rays). If the shape has a full-width edge (a
     triangle's base, unlike a shape that tapers to a point), also add
     `.motif--above-footer` so that edge doesn't collide with the footer
     row — check this visually, don't assume either mask is enough on its
     own.
   - **Small decorative accent** (OptiLIFT's sunburst-style — the product's
     README says it's small/decorative, not a full-bleed system): don't
     blow it up to fill the slide. Place it modestly sized (a few hundred
     px) in one corner via a plain `position:absolute` div, same as
     `products/OptiLIFT/templates/Slides.dc.html`'s section-divider slide.
     Forcing a small motif to full-bleed just because the mechanism exists
     is the one mistake to avoid here.

   Motifs are static inline SVG copied from the guideline card's geometry —
   **not** a live `dc-import`/`x-import` of a `components/Brand/*.jsx`
   component. No `.dc.html` in this repo does that today (it would route
   through an untested Babel-from-CDN path), and `deck-stage.js`'s own
   authoring guidance prefers static, directly-editable slide markup anyway.

3. **Photography and copy — every line must trace to something real.**
   Split-content slide: a real photo from `products/<Name>/assets/product/`
   (`object-fit:cover` inside `.split-media`, same as the generic deck).
   Never invent a customer testimonial for the quote slide — use the
   product's own real tagline/positioning line from its README instead (an
   unattributed brand statement, not a fabricated person). The product-grid
   slide doesn't make sense for a single product — replace it with a
   benefits grid (`.stats`) of 3–4 real claims: named sub-technologies where
   they exist (Stellar M22's four modalities, triLIFT 2.0's three), or real
   differentiator claims from the README's own wording for a single-
   technology product (OptiLIFT, OptiLIGHT). If a product has no confirmed
   tagline yet (this happened with OptiLIGHT), don't invent one — use its
   real, attributed positioning sentence instead and say so if asked.

4. **Verify visually** — this is layout-sensitive content (motif placement,
   text-over-motif contrast, footer overflow on long tag text), not just a
   build check. Serve the repo root with a static file server and check
   every slide in a browser. `npm run build` alone will not catch a motif
   painting behind unreadable text.

5. **Report** which slides got a real motif treatment vs. a plain
   black/white fallback (a product's own rules may genuinely not sanction a
   large motif, e.g. OptiLIFT), and flag any copy gaps (missing tagline,
   missing logo asset) rather than papering over them.

## Notes

- This skill is intentionally scoped to files, not publishing — it mirrors
  how `code-mods` and `format-image-for-web` work today. `propose-change`
  is the only skill in this repo that touches git.
- The generic, non-product `ui_kits/slides/*.html` reference cards are a
  separate, simpler artifact (static standalone slide types, not a deck) —
  their own authoring rules live in `ui_kits/slides/GUIDE.md`; this skill
  doesn't cover editing those.
- Future medium-output skills (a landing-page skill, a flyer skill) should
  follow this same shape — `.claude/skills/<medium>/SKILL.md` — once there's
  real template content in the repo to point at. Don't scaffold one ahead
  of that content existing.
