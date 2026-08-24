The only input treatment in the system: caps label, bordered box with a soft radius and an accent focus glow.

```jsx
<TextField label="Work email" type="email" required value={email} onChange={e => setEmail(e.target.value)} />
<TextField label="How can we help?" multiline rows={4} />
```

Use `tone="inverse"` inside black panels and footers.
