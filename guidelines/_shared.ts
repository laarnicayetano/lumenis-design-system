// Shared CSS for the swatch pattern (chip + name + hex/spec caption, in a
// grid) used across most guideline cards. Not a .tsx file on purpose — the
// build's guideline scanner (scripts/build.ts buildGuidelineSpecimens) walks
// every *.tsx under guidelines/ expecting a card + default export, so this
// stays a plain .ts module to avoid being picked up as a specimen itself.
export const SWATCH_CSS = `
.sw{display:flex;flex-direction:column;gap:6px}.chip{height:64px;border:1px solid rgba(0,0,0,.1)}
.n{font-size:12px;letter-spacing:.02em;text-transform:uppercase;line-height:1.2}.h{font-size:11px;color:var(--text-muted);opacity:.7;font-variant-numeric:tabular-nums}
.grid{display:grid;gap:10px}
`;
