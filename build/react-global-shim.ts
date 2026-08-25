// Aliased in place of 'react' (see scripts/build.ts's design-system.js
// build) so the compiled library bundle shares the *same* React instance a
// consuming page already loaded via CDN <script> tag — components/*.card.html
// and ui_kits/*/index.html both load React globally before this bundle.
// Bundling a second, private copy of react here would give components' hooks
// a different dispatcher than whatever actually calls ReactDOM.render/
// createRoot, which fails hard ("Cannot read properties of null").
export default (window as unknown as { React: unknown }).React;
