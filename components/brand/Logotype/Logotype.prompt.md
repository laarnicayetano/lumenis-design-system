Renders the supplied Lumenis wordmark or Hero "L" SVG — use it anywhere a logo goes; never redraw the mark.

```jsx
<Logotype tone="black" width={180} />
<Logotype variant="symbol" tone="white" width={40} />
```

- `tone`: `black` on light surfaces, `white` on black or photography.
- `variant="symbol"` is the Hero "L" — 1 row height in social formats, or a corner signature.
- Set `Logotype.assetBase` once if you copied `assets/` somewhere other than `./assets`.
- Minimum wordmark width on screen is 50px; keep clear space of one "x" on all sides.
