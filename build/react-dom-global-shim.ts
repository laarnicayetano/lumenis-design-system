// Aliased in place of 'react-dom/client' for the same reason as
// react-global-shim.ts — share the CDN-loaded ReactDOM instance rather than
// bundling a second copy.
export default (window as unknown as { ReactDOM: unknown }).ReactDOM;
