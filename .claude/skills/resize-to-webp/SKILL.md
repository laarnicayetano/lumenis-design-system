---
name: resize-to-webp
description: Resize and convert oversized photography/product-render masters (raw JPG/PNG, often 5-16MB straight off a camera or shoot) into small WebP derivatives sized for how this repo actually displays them — guideline cards and ui_kit sections rendering at a few hundred to ~1200px wide. Use when adding new images to assets/, or when asked to resize/optimize/compress/convert images. This repo has already hit hard size limits (DesignSync's 12MB-per-file cap) from skipping this step.
---

# Resize images to WebP

Raw photography and product-render masters are the wrong kind of asset to commit as-is: a 16MB JPEG straight off a shoot is never what a browser should load for a guideline card rendering at 700px wide. This repo already drew this line for `uploads/`/`research/` (`.gitignore`: "Raw source material — not system material... keep the originals in Drive, not in a public repo") — this skill applies the same principle to photography/product images, and produces the actual small derivatives that belong in `assets/`.

## When to use this

- Before committing any new photography, product render, or other large image into `assets/`.
- When asked to "resize," "optimize," "compress," or "convert to webp" images.
- If a sync/upload step complains about file size (this has already happened once with DesignSync's 12MB cap).

## Steps

1. **Confirm `cwebp` is available** (installs via Homebrew's `webp` package):
   ```
   which cwebp || brew install webp
   ```
   `cwebp` is preferred over ImageMagick here — it's the purpose-built WebP encoder and its `-resize` flag does both jobs (resize + encode) in one pass.

2. **Pick a target width based on actual usage, not a fixed default.** Check where the image is actually referenced (guideline `viewport`, a ui_kit's layout) rather than guessing:
   - Full-bleed hero/section images (ui_kit heroes, prism bands): **1600px** wide — these can span most of a 1440px page.
   - Grid/tile images (`ProductCard`, `InsightCard`, testimonial tiles, avatar circles): **800px** wide is generous.
   - Small guideline specimen swatches (viewport widths of 700-900px shown at a fraction of that): **1200px** wide covers retina without excess.
   When unsure, 1200px wide is a reasonable default — re-run at a larger width later if something looks soft at full-bleed size.

3. **Resize + convert, preserving aspect ratio** (height `0` means "auto, keep ratio"):
   ```
   cwebp -q 82 -resize <width> 0 path/to/original.jpg -o path/to/original.webp
   ```
   Quality 80-85 is the sweet spot for photography — visually lossless at this size, meaningfully smaller than 90+.

4. **Check the result actually got small.** A resized/compressed photo should land well under 500KB — if it's still multi-megabyte, the source had unusual detail (film grain, high ISO noise) and dropping quality to ~75 or width further is reasonable before accepting a larger file.

5. **Delete the original raw master** once the `.webp` is confirmed good — don't keep both. The whole point is not carrying the heavy original in this repo.

6. **Update every code reference** from the old extension to `.webp`. Grep for the old filename across `guidelines/*.tsx` and `ui_kits/**/*.tsx` — a resize that leaves a stale `.jpg`/`.png` reference silently breaks the image:
   ```
   grep -rln "old-filename\.\(jpg\|jpeg\|png\)" guidelines ui_kits
   ```

7. **Rebuild and confirm nothing 404s** (`npm run build`); if you can preview the actual page (only when asked — Playwright is expensive, see project conventions), confirm the image still renders at the sizes it's actually shown.

## Why WebP specifically

Smaller than JPEG/PNG at equivalent visual quality, universally supported in every browser this design system's guidelines/ui_kits need to render in, and `cwebp` makes resize+encode a single command rather than a multi-tool pipeline.
