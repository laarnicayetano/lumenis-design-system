Selectable filter chip — squared and hairline-bordered.

```jsx
<Tag selected={filter === 'aesthetics'} onClick={() => setFilter('aesthetics')}>Aesthetics</Tag>
```

Selected state fills with ink/paper (not `--accent`) so it reads as a pressed toggle, matching how other selected states in the system work. Use `tone="inverse"` over black/photography.
