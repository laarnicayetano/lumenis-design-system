# Building a great deck

`README.md` is the index of the 7 slide types. This is how to actually use
them well — pick a density, don't overflow a slide, vary the motif instead of
repeating it, and never fall back to generic type or a stock gradient.

## 1. Pick a density mode before laying out a single slide

**Low density / speaker-led** — for a live talk where a presenter carries the
room. One idea per slide, 1–3 bullets max, large type, generous negative
space. Expect more slides, not more content per slide.

**High density / reading-first** — for a leave-behind or async read. Slides
are self-contained: 4–8 bullets, or 4–6 cards, structured with grids/tables
rather than prose. Still designed, not "a document pasted onto a slide" —
tight spacing is not an excuse to drop hierarchy.

Pick one mode for the whole deck. Don't mix — a dense stats slide next to an
airy title slide reads as unplanned, not intentional contrast.

## 2. No-overflow rule

If content doesn't fit the density mode you picked, split it into another
slide. Never shrink type or tighten leading past the size floor to force a
fit — `04-stats.html`'s body copy is already at the floor for this system
(22px, see below); going smaller isn't an option.

## 3. One motif, varied by role — not repeated identically

Every sub-brand has exactly one signature motif (Shine for Stellar M22,
Rays for OptiLIGHT, Sunburst for OptiLIFT, Triangle for triLIFT 2.0 — see
`guidelines/brand-marks.card.html`). Across a deck, that same motif should
read differently depending on the slide's job — full-bleed and masked behind
a headline on a section divider, small and cornered as a signature touch on
a content slide — rather than pasted at the same size and position on every
slide. Repetition without variation reads as decoration, not a system.

Never invent a second motif or borrow another product's. If a product's own
usage rule says small-and-decorative only (OptiLIFT's sunburst — "the dot of
the i," per its own guideline card), that rule wins over making the deck
look more dramatic.

## 4. Never fall back to generic type or a stock palette

This system already avoids the two most common ways decks end up looking
templated: system fonts (Inter/Roboto/Arial) and a purple-gradient-on-white
background. Don't reintroduce either under time pressure — use the type
stack in `guidelines/type-families.card.html` and the accent set in
`tokens/subbrands.css`. If a slide needs an accent field, it's `--accent` /
`--accent-contrast` from the active sub-brand, not a hand-picked color.

## 5. Content vocabulary

The two slide implementations in this repo use different class names for
the same roles — know the mapping so a slide reads consistently regardless
of which one you're editing:

| Role                               | `ui_kits/slides/*.html` | `templates/slides/deck.css` |
| ---------------------------------- | ----------------------- | --------------------------- |
| Small caps label above a heading   | `.kick`                 | `.eyebrow`                  |
| Large display heading              | `.h` / `.h2`            | `.h-hero` / `.h-lg`         |
| Body / supporting copy             | `.p`                    | `.lead`                     |
| Logo mark                          | `.mark` / `.mark-r`     | `.logo` / `.logo--lg`       |
| Hairline divider                   | `.rule`                 | `.rule-short`               |
| Standout single number             | —                       | `.stat-number`              |
| Attributed or brand-statement line | —                       | `.quote-text`               |

Body text never drops below 22px at this system's slide sizes (1280×720 for
`ui_kits/slides`, 1920×1080 for `templates/slides`); titles run 44–88px at
~90% leading.

## 6. Prefer static markup over script-generated content

A slide's text should live directly in the HTML, not be written in by a
script at load time. `templates/slides/deck-stage.js` is built around this
on purpose — static markup is what lets someone click a heading in an editor
and retype it directly. Keep this system's cards and templates the same way:
authored HTML, not a JS render step, even for content pulled from a product's
brand data.

## 7. Source content, don't invent it

Taglines, positioning lines, technology names, stats — pull them from the
product's own `README.md` or its `guidelines/*.card.html`. Never write a
plausible-sounding testimonial, tagline, or claim that isn't documented
somewhere in the product's real material. If a slide type doesn't have a
real fit for a given product (e.g. a multi-product portfolio grid in a
single-product deck), replace it with something the product does have real
content for — don't fabricate to fill the slot.

## 8. Image use

As a rough visual-weight target — photography, motifs, icons, and logos
combined, weighed against headline/body/caption text — **low density decks
skew ~40–50% visual**, **high density decks skew ~10–20% visual**. This is a
deck-wide average to shoot for, not a per-slide rule: a title or
section-divider slide is fine at 100% visual, a stats or quote slide is fine
at 100% text. Don't force an image onto a slide that doesn't need one just
to hit the number, and don't strip one from a slide that needs it.

If you're unsure how many images the deck should use, ask the user rather
than guessing. Don't reuse the same photo twice within one deck unless the
user specifically asks for it — a repeated _motif_ (see #3) is intentional
system design, a repeated _photo_ just reads as recycled.
