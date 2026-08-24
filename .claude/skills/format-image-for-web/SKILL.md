---
name: format-image-for-web
description: Resize and convert oversized photography/product-render masters (raw JPG/PNG, often 5-16MB straight off a camera or shoot) into small WebP derivatives sized for how this repo actually displays them — guideline cards and ui_kit sections rendering at a few hundred to ~1200px wide. Use when adding new images to assets/, or when asked to resize/optimize/compress/convert/format images for the web. This repo has already hit hard size limits (DesignSync's 12MB-per-file cap) from skipping this step.
---

# Format images for the web

Raw photography and product-render masters are the wrong kind of asset to commit as-is: a 16MB JPEG straight off a shoot is never what a browser should load for a guideline card rendering at 700px wide. This repo already drew this line for `uploads/`/`research/` (`.gitignore`: "Raw source material — not system material... keep the originals in Drive, not in a public repo") — this skill applies the same principle to photography/product images.

The mechanical work (resize + encode + delete original) is a script, `format-image-for-web.sh`, so you don't need to hand-run `cwebp` yourself. Your job is the judgment call it can't make: **what width to target**, based on how the image is actually used.

## When to use this

- Before committing any new photography, product render, or other large image into `assets/`.
- When asked to "resize," "optimize," "compress," "convert to webp," or "format" images.
- If a sync/upload step complains about file size (this has already happened once with DesignSync's 12MB cap).

## Steps

1. **Find how the image is (or will be) used** — grep for its filename across `guidelines/*.tsx` and `ui_kits/**/*.tsx` before doing anything. An image referenced nowhere is dead weight; delete it instead of converting it.

2. **Pick a target width from actual usage, not a fixed default:**
   - Full-bleed hero/section images (ui_kit heroes, prism bands): **1600px**.
   - Grid/tile images (`ProductCard`, `InsightCard`, testimonial tiles): **800px**.
   - Avatar-scale crops (tiny circles, icons): **400px**.
   - Small guideline specimen swatches (viewport widths of 700-900px): **1200px** (covers retina without excess).
   - Unsure, or multiple uses at different sizes? Use the largest that applies.

3. **Run the script** (installs `cwebp` itself if missing, or tells you to `brew install webp`):
   ```
   .claude/skills/format-image-for-web/format-image-for-web.sh <width> <file> [file...]
   ```
   It resizes, encodes at quality 82 (visually lossless at these sizes), deletes the original, and prints the before/after byte counts. Batch multiple files from the same usage tier in one call.

4. **Check the result actually got small.** A resized/compressed photo should land well under 500KB. If it's still multi-megabyte, the source had unusual detail (film grain, high ISO noise) — re-run at a smaller width or edit the script's `-q 82` down to ~75 before accepting a larger file.

5. **Update every code reference** from the old extension to `.webp` — the script only touches the file, not callers:
   ```
   grep -rln "old-filename\.\(jpg\|jpeg\|png\)" guidelines ui_kits
   ```

6. **Rebuild and confirm nothing 404s** (`npm run build`); if you can preview the actual page (only when asked — Playwright is expensive, see project conventions), confirm the image still renders at the sizes it's actually shown.

## Why WebP specifically

Smaller than JPEG/PNG at equivalent visual quality, universally supported in every browser this design system's guidelines/ui_kits need to render in.
