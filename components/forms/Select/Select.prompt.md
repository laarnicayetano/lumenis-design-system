The dropdown counterpart to TextField — same bordered/rounded treatment, caret from the Icon set.

```jsx
<Select label="Practice type" placeholder="Choose one" options={['Dermatology', 'Med spa', 'Plastic surgery']} value={type} onChange={e => setType(e.target.value)} />
```

`options` accepts plain strings or `{ label, value }`. Use `tone="inverse"` inside black panels.
