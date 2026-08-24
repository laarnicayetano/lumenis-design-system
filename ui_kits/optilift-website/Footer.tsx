export function Footer() {
  return (
    <footer
      style={{
        padding: 'var(--space-7) var(--page-gutter)', background: 'var(--surface-inverse)', color: 'var(--text-inverse)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        fontFamily: 'var(--font-sans)', fontSize: 'var(--text-caption)', opacity: 0.7,
      }}
    >
      <img src="../../assets/optilift/logo/white.png" style={{ height: 22 }} alt="OptiLIFT" />
      <div>© 2026 Lumenis Be Ltd. OptiLIFT is a trademark of Lumenis.</div>
    </footer>
  );
}
