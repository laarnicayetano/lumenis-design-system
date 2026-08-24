Underline tab bar — same caps/underline treatment as the SiteHeader nav.

```jsx
<Tabs tabs={['Overview', 'Clinical results', 'Specs']} active={tab} onChange={setTab} />
```

`tabs` accepts plain strings or `{ id, label }`. The active tab's underline is `--accent`, so it recolors inside a `[data-subbrand]` scope. Use `tone="inverse"` over black/photography.
