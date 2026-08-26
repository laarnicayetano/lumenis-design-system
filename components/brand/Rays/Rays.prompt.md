OptiLIGHT's signature graphic system — straight strokes from one shared origin, never crossing live text.

```jsx
<div style={{ position: "relative" }}>
  <img
    src="assets/photography/people-prism-eye.webp"
    style={{ width: "100%" }}
  />
  <Rays
    tone="blue"
    origin="right"
    style={{
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      mixBlendMode: "screen",
    }}
  />
</div>;

{
  /* Center-aligned headline over a full-bleed blue Rays band */
}
<Rays
  tone="blue"
  clear="center"
  style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
/>;
```

`origin` picks which corner the fan converges from — choose whichever leaves your text column clear. For center-aligned text, which the fan always crosses regardless of origin, use `clear` to mask the rays out of that band instead of dimming them with opacity (opacity alone still competes with the text). Only meaningful inside OptiLIGHT contexts — pair with `data-subbrand="optilight"`.
