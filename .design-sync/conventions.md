## Building with this design system

No provider or root wrapper is required — components read CSS custom properties directly and need no context. Just load `styles.css` and `_ds_bundle.js` on the page; components are then available at `window.LumenisDesignSystem.*`.

**Styling idiom: tokens, not utility classes.** There is no class vocabulary (no `bg-*`/`text-*` utilities, no BEM). Every component is styled with inline `style` props reading `var(--token-name)` from the compiled stylesheet. When laying out your own glue (containers, grids, spacing between components), use the same tokens rather than hardcoded values:

| Family | Examples |
|---|---|
| Color | `--text-primary`, `--text-inverse`, `--text-muted`, `--surface-page`, `--surface-accent`, `--surface-inverse`, `--border-subtle` |
| Spacing (4px scale) | `--space-0` … `--space-11` (0, 4, 8, 12, 16, 24, 32, 40, 56, 80, 120, 160px) |
| Radius | `--radius-none`, `--radius-sm` (6px, buttons/fields/chips), `--radius-md` (10px, cards), `--radius-lg` (18px, large panels), `--radius-pill` (999px, tags/badges/switches) |
| Shadow | `--shadow-none` … `--shadow-md` |
| Typography | `--font-sans` (workhorse), `--font-mix` (serif, 1–2 word emphasis only), `--text-display`/`--text-title`/`--text-subtitle`/`--text-button`, `--weight-light`/`--weight-regular` |
| Brand | `--lum-black`, `--lum-white`, plus per-sub-brand palette colors (see `tokens/colors.css`) |

**Sub-brand accent scoping.** Wrap any container in `<div data-subbrand="optilight">` (or `corporate`, `stellar-m22`, `trilift`, `legendpro`, `nuera`, etc. — see `tokens/subbrands.css` for the full list) to scope `--accent`/`--accent-contrast`/`--accent-soft` to that product's palette. `Button`'s `accent`/`accent-outline` variants and similar accent-driven props read these scoped tokens — never hardcode a sub-brand color directly. Never show two sub-brand accent scopes at once in the same view, and keep the accent to roughly 20% of the composition.

**Where the truth lives.** Read `styles.css` (it `@import`s tokens, fonts, and `_ds_bundle.css`) and the token files under `tokens/*.css` before styling anything — token names are preserved verbatim from the source repo. Each component's `components/<Group>/<Name>/<Name>.tsx` has the exact prop contract and real usage lives in its `<Name>.stories.tsx`.

**Example — a CTA row using the button component and the token system for its own spacing:**

```jsx
const { Button } = window.LumenisDesignSystem;

function CTARow() {
  return (
    <div style={{ display: "flex", gap: "var(--space-3)", alignItems: "center" }}>
      <Button variant="primary">Discover more</Button>
      <Button variant="secondary">Download kit</Button>
    </div>
  );
}
```

For a sub-brand-accented CTA: wrap in `<div data-subbrand="optilight">` and use `variant="accent"` / `"accent-outline"`.
