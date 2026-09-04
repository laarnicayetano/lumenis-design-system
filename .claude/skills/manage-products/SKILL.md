---
name: manage-products
description: Add a new product/sub-brand to this design system, or update an existing one's brand guidelines, from whatever input is given (pasted text, an uploaded brand-guidelines doc, logo/photography files). Use when the user wants to onboard a new product, add a sub-brand, scaffold products/<Name>/, or update a product's positioning/voice/visual rules/accent color. This is a repo-local skill for maintaining lumenis-design-system itself.
---

# Manage products

Everything specific to one product lives under `products/<Name>/` —
`README.md` (brand overrides), `assets/`, `guidelines/` (its own specimen
cards), `ui_kit/` (its marketing site, if it has one).
`scripts/build-storybook-content.ts` already discovers any
`products/*/guidelines/*.card.html` automatically, so this skill's job is
just getting the right files into that folder — it never touches
`storybook-static/`, `scripts/`, or git. The one exception: if the new
product has an interactive JSX `ui_kit/website` (not just static
guidelines), that needs a matching entry added to
`compileInteractiveKit()`'s calls in that script's `main()` before it'll
show up in Storybook — flag that rather than assuming it's automatic.

This skill only edits files. When the user is ready to publish, run the
`propose-change` skill separately — don't open a PR from here.

## Before either flow: survey what already exists

Many sub-brands already have an accent color wired into `tokens/colors.css`

- `tokens/subbrands.css` (check the full `[data-subbrand="…"]` list in
  `tokens/subbrands.css`) with no `products/` folder yet — e.g. `folix`,
  `legendpro`, `trilift`, `stellar-m22`, `nuera`, `ultrapulse`, `acupulse`,
  `femtouch`, `splendorx`, `lightsheer`, `optiplus`, `digital-duet`,
  `digital-trio`. Also check `guidelines/*.card.html` for any shared card
  that already mentions the product, and `ui_kits/` for an existing kit.
  **Reuse whatever's already there — never create a second accent or a
  second guideline card for the same product.**

If the folder `products/<Name>/` already exists, this is Flow B, not Flow A.

## Flow A — Add a new product

1. **Confirm the name/casing** if it's at all ambiguous — the folder name
   is the display name (`OptiLIFT`, not `Optilift` or `optilift`). The
   token slug is lowercase; hyphenate only if that matches the product's
   own multi-word shape (existing examples go both ways — `stellar-m22`
   and `digital-duet` are hyphenated, `splendorx` and `legendpro` aren't).
   If a `tokens/subbrands.css` entry already exists for this product, its
   slug is the slug — don't pick a new one.

2. **Write `products/<Name>/README.md`** from
   `.claude/skills/manage-products/templates/PRODUCT_README.md`. Fill in
   only what the input actually supports; delete optional sections
   (Iconography, Shipping to HubSpot, `###` visual-system subsections)
   that have nothing real to say. Never invent a brand fact the template
   asks for — leave it out and note it under Caveats instead. Read
   `products/OptiLIFT/README.md` and `products/OptiLIGHT/README.md` first
   if you haven't already this session — they're the two reference
   examples the template was extracted from.

2b. **Write `products/<Name>/SKILL.md`** from
   `.claude/skills/manage-products/templates/PRODUCT_SKILL.md`, derived
   from the README you just wrote — copy its Non-negotiables and Visual
   foundations sections almost verbatim; never author a fact here that
   isn't already in the README. This is what makes the product's design
   rules auto-load as a real skill (root `SKILL.md` already promises
   "that product's design skill" exists) rather than only a README a
   Claude has to go looking for.

3. **Create only the subfolders that get real content right now** —
   `products/<Name>/assets/`, `guidelines/`, `ui_kit/`, `templates/` are not scaffolded
   empty. Drop any provided files under `assets/`. If a photography or
   product-render master looks like an oversized raw JPG/PNG, run the
   `format-image-for-web` skill on it before it lands in the repo — don't
   commit an unoptimized master.

4. **Wire the accent color**, only if a real one is known and no
   `tokens/subbrands.css` entry exists yet for this product:
   - Add `--lum-<name>: #hexval; /* <Product> */` to `tokens/colors.css`
     under the correct Aesthetics or Vision secondary-palette comment
     block — but first check whether an existing `--lum-*` value is
     already the same color (several products intentionally share one,
     e.g. AcuPulse and FemTouch both use `--lum-purple`); reuse it instead
     of adding a near-duplicate.
   - Add a matching block to `tokens/subbrands.css`:
     ```css
     [data-subbrand="<slug>"] {
       --accent: var(--lum-<name>);
       --accent-contrast: var(
         --lum-black or --lum-white,
         whichever passes contrast
       );
       --accent-soft: var(--lum-image-grey, or a lighter tint if one exists);
     }
     ```

   If the accent truly isn't known yet, don't guess — say so and leave it
   for later rather than inventing a color.

5. **Add a color-ramp card whenever an accent color exists** — from step 4,
   or already present in `tokens/subbrands.css`. This is not optional: don't
   skip it for lack of an official swatch book. Create
   `products/<Name>/guidelines/brand-color.card.html`, copying the shape of
   `products/OptiLIFT/guidelines/brand-color.card.html` — generate a
   tint/shade scale from the accent hex (roughly 300–800) plus a neutral
   scale, and if it isn't confirmed against an official brand guideline, say
   so in the caption the same way that card does ("Unconfirmed against the
   real print brand guideline — sampled from …"). Only skip this card if
   step 4 genuinely left the accent color open — there's nothing to ramp yet.

   **Other cards** (logo lockup, a genuinely distinctive motif, etc.) stay
   optional — add one only if there's real material worth showing. Copy the
   shape of an existing one, e.g.
   `products/OptiLIFT/guidelines/brand-logo.card.html` for a logo lockup
   card, rather than inventing new markup. Skip a card entirely if there's
   nothing concrete yet; a README with a Caveats note is a perfectly fine
   stopping point for these.

6. **No `ui_kit/` by default.** Building a marketing site is a separate,
   much bigger task — mention it as a natural follow-up if relevant, don't
   generate one here.

7. **Add the product to root `SKILL.md`'s "Product-specific overrides"
   list.** This is the file that's loaded as context automatically —
   `products/<Name>/README.md` isn't, so a product missing from this list
   is invisible to an agent unless it happens to go looking. Append one
   line matching the existing format:
   ```
   - [<Name>](products/<Name>/README.md) ([design skill](products/<Name>/SKILL.md)) — <Name> (one-line description): <accent-name> accent, <motif> motif.
   ```
   Condense the description from the README's opening paragraph. Name the
   accent by its plain color name (not the hex or CSS variable). Only
   mention a motif if step 5 produced a genuinely distinctive one — drop
   that clause if there isn't one yet.

8. **Verify**: `npm run build` (must succeed) and
   `node scripts/validate.ts` (must report 0 errors).

9. **Report** what was created (including whether the color-ramp card is
   confirmed or sampled/unconfirmed) and what was deliberately left open (no
   accent color yet, no logo/motif card yet, etc.), and that
   `propose-change` is the next step when the user wants to publish.

## Flow B — Update an existing product

1. **Read `products/<Name>/README.md` and `products/<Name>/SKILL.md` in
   full first.** Don't overwrite either — merge the new input into the
   existing structure, and only touch the sections the new input actually
   speaks to. Leave everything else exactly as it is.

2. **New or changed asset files** get the same treatment as Flow A step 3
   (drop into `assets/`, hand oversized masters to `format-image-for-web`).

3. **A new or changed accent color** updates that product's _existing_
   `[data-subbrand="…"]` entry in place — this never creates a second one.
   If genuinely no entry exists yet for a product that otherwise has a
   `products/` folder, follow Flow A step 4. Either way, if the product
   doesn't already have a `guidelines/brand-color.card.html`, add one per
   Flow A step 5 — or if the accent hex itself changed, regenerate the
   existing card's ramp to match.

3b. **If Non-negotiables or Visual foundations changed** in the README,
   update `products/<Name>/SKILL.md` to match in the same pass — it's a
   derived copy of exactly those two sections, and it's easy to fix the
   README and forget the skill has the old wording.

4. **If the accent color or the one-line positioning changed**, update
   that product's existing line in root `SKILL.md`'s "Product-specific
   overrides" list to match (Flow A step 7) — don't add a second line.

5. **Verify** (build + validate) and hand off to `propose-change`, same as
   Flow A.

## Flow C — Generate a per-product slide deck

Moved to the `slides` skill (`.claude/skills/slides/SKILL.md`) — it's
medium-output work, not product onboarding. Use it once the product's
accent is wired (Flow A step 4); never generate a deck proactively as part
of Flow A/B here.

## Notes

- This skill is intentionally scoped to files, not publishing — it mirrors
  how `code-mods` and `format-image-for-web` work today. `propose-change`
  is the only skill in this repo that touches git.
- `tokens/colors.css` and `tokens/subbrands.css` are the single source of
  truth for accent colors. `products/<Name>/README.md` documents and
  references them (by variable name) — it never restates a hex value that
  could drift out of sync with the token file.
- Root `SKILL.md`'s product list is the other thing that must stay in
  sync — it's easy to scaffold a product folder and forget it, since
  nothing else in the build fails if that line is missing.
- `products/<Name>/SKILL.md` must stay in sync with its README's
  Non-negotiables/Visual foundations — regenerate its body whenever those
  sections change (Flow B step 3b). It's a derived artifact: the README
  is the one place a brand fact is authored, the skill just repackages it
  for auto-loading.
- Don't scaffold anything "just in case." An empty `guidelines/` folder or
  a `ui_kit/` nobody asked for is clutter, not groundwork. The one standing
  exception is the color-ramp card (Flow A step 5) — that one's mandatory
  whenever an accent color exists, not optional scaffolding.
