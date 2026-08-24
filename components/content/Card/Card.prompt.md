Generic bordered, softly-rounded content surface — the one filled/shadowed container in the system.

```jsx
<Card>
  <StatBlock value="88+" label="Countries" detail="Worldwide" />
</Card>
<Card elevation="md">Elevated / hover state</Card>
<Card elevation="none">Flat bordered block, no shadow</Card>
```

Use `tone="inverse"` inside black panels. Prefer the purpose-built content components (`ProductCard`, `InsightCard`) when the content fits their shape — reach for `Card` for one-off grouped content that doesn't match an existing pattern.
