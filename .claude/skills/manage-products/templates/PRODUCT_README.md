<!--
Fill-in-the-blanks skeleton for products/<Name>/README.md, based on the
section structure shared by products/OptiLIFT/README.md and
products/OptiLIGHT/README.md. Copy this file to products/<Name>/README.md,
replace every <bracketed> placeholder, delete every instruction comment
(including this one), and delete any optional section that has nothing
real to say. Never invent a fact this template asks for — if the input
doesn't cover it, leave it out and note it under Caveats instead.
-->

# <Name>

<!-- 1-3 sentences: what the product is, who it's for (practitioners,
patients, both), and the one brand idea it hangs on, if there is one
(e.g. OptiLIGHT's "Establishing light as a healing energy"). -->

Read this file for what's specific to <Name>. Everything not overridden
here inherits from the root [SKILL.md](../../SKILL.md) /
[README.md](../../README.md) — casing rules, the split-layout system,
motion, build/publish mechanics.

## Non-negotiables

<!-- The handful of rules that would visibly break the brand if missed.
Always include the accent color + its token var + its tokens/subbrands.css
scope, e.g.:
- **Accent is <color name> `#HEXVAL`** (`--lum-<name>` in
  `tokens/colors.css`; scoped via `[data-subbrand="<slug>"]` in
  `tokens/subbrands.css`).
Add contrast-ratio notes, casing rules for the product name itself, and
any other must-never-break constraint. -->

## Content fundamentals

<!-- Voice (adjectives + what it's NOT), person (who's addressed and how),
vibe/positioning relative to sibling products. -->

## Visual foundations

<!-- Color, type, photography treatment. Give this its own `###`
subsection only if the product has a genuinely distinct graphic system
worth naming (OptiLIGHT's "rays of light" is the model) — most products
won't need one. -->

## Iconography

<!-- Only include this section if the product needs bespoke icon rules
(a documented substitution, a logo-native mark that must never be reused
as a UI glyph, etc.). Delete the whole section if there's nothing beyond
the root system's default icon set. -->

## In this repo

<!-- File pointers, using real products/<Name>/... paths — don't guess,
check what actually exists after scaffolding:
- `products/<Name>/guidelines/*.card.html` — which cards, one line each.
- `products/<Name>/assets/` — what's in there (logo variants, product
  renders, photography), and whether anything is still borrowed from a
  shared location (e.g. `assets/photography/`).
- `products/<Name>/ui_kit/` — only if one exists; what it covers.
-->

## Caveats

<!-- Be honest about what's unconfirmed or inferred rather than silent
about it — e.g. "accent sampled from a rendered logo, not a printed
swatch" or "no pre-existing digital product existed, so any ui_kit here is
an original construction, not a recreation of a real screen." An empty
Caveats section is fine and better than a padded one. -->
