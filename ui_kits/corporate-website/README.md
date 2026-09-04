# Corporate website UI kit

A click-through recreation of lumenis.com's corporate surface, built entirely from this system's components.

**Screens**
- `Home.tsx` — hero split, WHY LUMENIS proof band (black), OUR PRODUCTS grid, sub-brand accent band with practitioner quote and the four icon themes, RESOURCES tiles, email sign-up.
- `ProductDetail.tsx` — sub-brand-scoped product page. Four products carry real copy: Stellar M22, OptiLIGHT, triLift, FoLix. The whole page sits inside `[data-subbrand]`, so `--accent` rebinds and every accent CTA, kicker and claim band follows the sub-brand.
- `Contact.tsx` — split contact form on black, with submitted state.
- `shared.tsx` — nav/footer/product data plus three kit-local helpers: `Section`, `SectionHead`, `ImagePlate`.

**Interactions** — nav switches pages, product tiles open the matching product page, "← All products" returns home, the contact form submits to a thank-you state, the newsletter block confirms inline.

**Photography** is deliberately left as labelled grey plates (`ImagePlate`). No approved image assets were supplied; drop real files in and remove the plates.
