The corporate site header — wordmark left, all-caps nav right, hairline rule beneath.

```jsx
<SiteHeader
  nav={[{ id: 'aesthetics', label: 'Aesthetics' }, { id: 'vision', label: 'Vision' }]}
  active="aesthetics"
  onNavigate={setPage}
/>
```

Nav labels are always uppercase. Use `tone="inverse"` only when the header sits on a black hero.
