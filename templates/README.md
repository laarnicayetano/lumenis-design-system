# Templates

Starting points a consuming project copies wholesale.

- **corporate-page** — `CorporatePage.dc.html`: header, split hero, black proof band, product grid, sub-brand accent band with practitioner quote, footer. Tweakable accent colour (4 curated sub-brand swatches) and product list.
- **slide-deck** — `SlideDeck.dc.html`: seven 1920×1080 slides (title, section divider, split content, proof points, quote, product grid, closing) on the deck stage, so arrow keys, the thumbnail rail and PDF export all work out of the box.

Both load the system through the sibling `ds-base.js`. In a consuming project, edit the one `base` line in that file to point at the bound `_ds/<folder>` tree; nothing else changes.
