A softly-rounded, hairline checkbox — no fill until checked.

```jsx
<Checkbox label="Send me clinical updates" checked={subscribed} onChange={e => setSubscribed(e.target.checked)} />
```

Use `tone="inverse"` inside black panels. Checked state fills with `--accent`, so it recolors inside a `[data-subbrand]` scope.
