#!/usr/bin/env node
// Builds the component library and every specimen/demo page into dist/ for
// GitHub Pages. dist/ is gitignored — nothing here is version controlled,
// only rebuilt on each run. templates/*.dc.html are intentionally excluded:
// they're Claude Design's own canvas-editor format (support.js/ds-base.js),
// not something this build produces or should touch.
import * as esbuild from 'esbuild';
import ReactDOMServer from 'react-dom/server';
import type { ReactNode } from 'react';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const dist = path.join(root, 'dist');

interface SpecimenCard {
  group: string;
  viewport: [number, number];
  name: string;
  subtitle: string;
  padding?: string;
}

interface SpecimenModule {
  default: () => ReactNode;
  card: SpecimenCard;
}

interface PromptEntry {
  name: string;
  html: string;
}

interface CardEntry {
  group: string;
  category: string;
  name: string;
  subtitle: string;
  w: number;
  h: number;
  href: string;
  key: string;
  padding: string;
  prompts?: PromptEntry[];
}

interface NavItem {
  name: string;
  subtitle: string;
  kind: 'page' | 'deck';
  key: string;
  href?: string;
  w?: number;
  h?: number;
  useIframe?: boolean;
  prompts?: PromptEntry[];
  slides?: CardEntry[];
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

async function clean() {
  await fs.rm(dist, { recursive: true, force: true });
  await fs.mkdir(dist, { recursive: true });
}

async function copyFile(from: string, to: string) {
  await fs.mkdir(path.dirname(to), { recursive: true });
  await fs.copyFile(from, to);
}

async function copyDirFiltered(fromDir: string, toDir: string, predicate: (p: string) => boolean) {
  const entries = await fs.readdir(fromDir, { withFileTypes: true });
  for (const entry of entries) {
    const fromPath = path.join(fromDir, entry.name);
    const toPath = path.join(toDir, entry.name);
    if (entry.isDirectory()) {
      await copyDirFiltered(fromPath, toPath, predicate);
    } else if (predicate(fromPath)) {
      await copyFile(fromPath, toPath);
    }
  }
}

async function minifyCssFile(from: string, to: string) {
  const src = await fs.readFile(from, 'utf8');
  const result = await esbuild.transform(src, { loader: 'css', minify: true });
  await fs.mkdir(path.dirname(to), { recursive: true });
  await fs.writeFile(to, result.code);
}

async function findFiles(dir: string, matchExt: string): Promise<string[]> {
  const out: string[] = [];
  async function walk(d: string) {
    const entries = await fs.readdir(d, { withFileTypes: true });
    for (const entry of entries) {
      const p = path.join(d, entry.name);
      if (entry.isDirectory()) await walk(p);
      else if (p.endsWith(matchExt)) out.push(p);
    }
  }
  await walk(dir);
  return out;
}

function titleCase(slug: string): string {
  return slug.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

// Interactive ui_kits — each has an App.tsx entry precompiled to bundle.js
// and an index.html following the same CDN-script convention (see
// buildUiKitHtml below). Static-only kits (social/email/slides) don't need
// an entry here — see copyUiKitStatics.
const INTERACTIVE_UI_KITS = ['corporate-website', 'optilift-website', 'optilight-website'];

async function buildBundles() {
  const common = {
    bundle: true,
    minify: true,
    jsx: 'automatic' as const,
    logLevel: 'info' as const,
  };

  await esbuild.build({
    ...common,
    entryPoints: [path.join(root, 'build/design-system-entry.ts')],
    outfile: path.join(dist, 'design-system.js'),
    format: 'iife',
    globalName: 'LumenisDesignSystem',
  });

  for (const kit of INTERACTIVE_UI_KITS) {
    await esbuild.build({
      ...common,
      entryPoints: [path.join(root, 'ui_kits', kit, 'App.tsx')],
      outfile: path.join(dist, 'ui_kits', kit, 'bundle.js'),
      format: 'iife',
    });
  }
}

async function copyStaticAssets() {
  // tokens/*.css, styles.css — minified
  const tokenFiles = await findFiles(path.join(root, 'tokens'), '.css');
  for (const f of tokenFiles) {
    await minifyCssFile(f, path.join(dist, path.relative(root, f)));
  }
  await minifyCssFile(path.join(root, 'styles.css'), path.join(dist, 'styles.css'));

  // assets/ — logos only, never fonts (licensed, gitignored, not built either)
  await copyDirFiltered(
    path.join(root, 'assets'),
    path.join(dist, 'assets'),
    (p) => !p.includes(`${path.sep}fonts${path.sep}`)
  );
}

// guidelines/*.tsx and components/**/*.specimen.tsx are real React source —
// rendered to static HTML at build time (SSR), never hand-authored as HTML.
// Each exports `card` (the @dsCard metadata) and a default component.
async function importSpecimenModule(file: string): Promise<SpecimenModule> {
  const result = await esbuild.build({
    entryPoints: [file],
    bundle: true,
    write: false,
    format: 'esm',
    platform: 'node',
    jsx: 'automatic',
    external: ['react', 'react/jsx-runtime', 'react-dom', 'react-dom/server'],
    logLevel: 'silent',
  });
  // Written inside the repo (not os.tmpdir()) so bare `import 'react'` resolves
  // against this project's node_modules.
  const tmpDir = path.join(root, '.build-tmp');
  await fs.mkdir(tmpDir, { recursive: true });
  const tmpFile = path.join(tmpDir, `ds-specimen-${process.pid}-${Math.random().toString(36).slice(2)}.mjs`);
  await fs.writeFile(tmpFile, result.outputFiles[0].text);
  try {
    return (await import(pathToFileURL(tmpFile).href)) as SpecimenModule;
  } finally {
    await fs.unlink(tmpFile);
  }
}

async function renderSpecimen(file: string): Promise<{ html: string; card: SpecimenCard }> {
  const mod = await importSpecimenModule(file);
  const html = ReactDOMServer.renderToStaticMarkup(mod.default());
  return { html, card: mod.card };
}

function dsCardComment(card: SpecimenCard, w: number, h: number): string {
  return `<!-- @dsCard group="${card.group}" viewport="${w}x${h}" name="${card.name}" subtitle="${card.subtitle}" -->`;
}

function standalonePage(card: SpecimenCard, w: number, h: number, baseHref: string, extraHead: string, html: string): string {
  const padding = card.padding ?? '18px';
  // <base> lets specimen source use the same root-relative paths (e.g.
  // "assets/x.svg") whether SSR'd here at some nested depth or live-mounted
  // at dist/index.html by the specimens client bundle.
  return `${dsCardComment(card, w, h)}
<!doctype html><html><head><meta charset="utf-8"><base href="${baseHref}"><link rel="stylesheet" href="styles.css">${extraHead}</head><body style="margin:0;padding:${padding};background:var(--surface-page);overflow:hidden;font-family:var(--font-sans)">${html}</body></html>`;
}

// guidelines/*.card.html are hand-authored static fragments (no React, no
// build step) — see .claude/skills/code-mods/SKILL.md's convert-guidelines-to-html
// mod. Each already starts with its own @dsCard comment and a working
// <link rel="stylesheet" href="../styles.css">, so building one is just a
// copy; only its metadata needs parsing out for the homepage nav.
async function buildGuidelineCards(): Promise<CardEntry[]> {
  const files = await findFiles(path.join(root, 'guidelines'), '.card.html');
  const cards: CardEntry[] = [];
  for (const file of files) {
    const card = await readDsCard(file);
    if (!card) continue;
    const slug = path.basename(file, '.card.html');
    const outFile = path.join(dist, 'guidelines', `${slug}.card.html`);
    await copyFile(file, outFile);
    cards.push({
      group: card.group,
      category: card.group,
      name: card.name,
      subtitle: card.subtitle,
      w: card.w,
      h: card.h,
      href: `guidelines/${slug}.card.html`,
      key: `guidelines/${slug}`,
      padding: '0px',
    });
  }
  return cards;
}

// components/index.ts re-exports every component from its own module — used
// to map an imported name (e.g. "SplitPanel") back to the `.prompt.md` that
// documents it (SplitPanel and SplitLayout share SplitLayout.prompt.md).
async function buildComponentPromptMap(): Promise<Map<string, string>> {
  const indexSrc = await fs.readFile(path.join(root, 'components/index.ts'), 'utf8');
  const map = new Map<string, string>();
  const exportRe = /^export \{([^}]*)\} from '(\.[^']+)';$/gm;
  let m: RegExpExecArray | null;
  while ((m = exportRe.exec(indexSrc))) {
    const names = m[1]
      .split(',')
      .map((n) => n.trim())
      .filter(Boolean);
    const modulePath = path.join(root, 'components', m[2] + '.prompt.md');
    for (const name of names) map.set(name, modulePath);
  }
  return map;
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function inlineMarkdown(text: string): string {
  return escapeHtml(text).replace(/`([^`]+)`/g, '<code>$1</code>');
}

function renderPromptMarkdown(md: string): string {
  const blocks = md.trim().split(/\n\s*\n/);
  return blocks
    .map((block) => {
      if (block.startsWith('```')) {
        const code = block.replace(/^```\w*\n?/, '').replace(/```$/, '');
        return `<pre><code>${escapeHtml(code.trim())}</code></pre>`;
      }
      const lines = block.split('\n').filter(Boolean);
      if (lines.length && lines.every((l) => l.trim().startsWith('- '))) {
        return `<ul>${lines.map((l) => `<li>${inlineMarkdown(l.trim().slice(2))}</li>`).join('')}</ul>`;
      }
      return `<p>${inlineMarkdown(block.trim())}</p>`;
    })
    .join('');
}

async function buildComponentSpecimens(): Promise<CardEntry[]> {
  const files = await findFiles(path.join(root, 'components'), '.specimen.tsx');
  const promptMap = await buildComponentPromptMap();
  const promptCache = new Map<string, string>();
  const phosphor = `
<link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/light/style.css">
<link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.1.1/src/thin/style.css">`;
  const cards: CardEntry[] = [];
  for (const file of files) {
    const category = path.basename(path.dirname(file));
    const slug = path.basename(file, '.specimen.tsx');
    const { html, card } = await renderSpecimen(file);
    const [w, h] = card.viewport;
    const page = standalonePage(card, w, h, '../../', phosphor, html);
    const outFile = path.join(dist, 'components', category, `${slug}.card.html`);
    await fs.mkdir(path.dirname(outFile), { recursive: true });
    await fs.writeFile(outFile, page);

    // Which real components does this specimen demo? Surface their usage
    // notes (same .prompt.md files Claude Design shows in its own preview).
    const src = await fs.readFile(file, 'utf8');
    const importMatch = src.match(/import \{([^}]*)\} from ['"]\.\.\/index['"]/);
    const importedNames = importMatch
      ? importMatch[1]
          .split(',')
          .map((n) => n.trim())
          .filter(Boolean)
      : [];
    const seenPromptFiles = new Set<string>();
    const prompts: PromptEntry[] = [];
    for (const name of importedNames) {
      const promptFile = promptMap.get(name);
      if (!promptFile || seenPromptFiles.has(promptFile)) continue;
      seenPromptFiles.add(promptFile);
      let raw = promptCache.get(promptFile);
      if (raw === undefined) {
        raw = await fs.readFile(promptFile, 'utf8').catch(() => '');
        promptCache.set(promptFile, raw);
      }
      if (raw) prompts.push({ name: path.basename(promptFile, '.prompt.md'), html: renderPromptMarkdown(raw) });
    }

    cards.push({
      group: card.group,
      category: titleCase(category),
      name: card.name,
      subtitle: card.subtitle,
      w,
      h,
      href: `components/${category}/${slug}.card.html`,
      key: `components/${category}/${slug}`,
      padding: card.padding ?? '20px',
      prompts,
    });
  }
  return cards;
}

// Client bundle mounting the same guideline/component specimens as real,
// live React — used by the homepage instead of an iframe. UI kits (full
// standalone pages, different layout contexts) still use iframes.
async function buildSpecimensClientBundle(cards: CardEntry[]) {
  const tmpDir = path.join(root, '.build-tmp');
  await fs.mkdir(tmpDir, { recursive: true });
  const entryFile = path.join(tmpDir, 'specimens-entry.tsx');

  const imports = cards.map((c, i) => `import * as mod${i} from ${JSON.stringify(sourcePathFor(c))};`).join('\n');
  const registryEntries = cards.map((c, i) => `  ${JSON.stringify(c.key)}: mod${i},`).join('\n');

  const entrySrc = `import { createRoot } from 'react-dom/client';
import { createElement } from 'react';
${imports}

const registry: Record<string, { default: () => unknown }> = {
${registryEntries}
};

const roots = new Map<Element, ReturnType<typeof createRoot>>();

function mount(key: string, el: Element) {
  const mod = registry[key];
  if (!mod) return;
  const root = createRoot(el);
  roots.set(el, root);
  root.render(createElement(mod.default as any));
}

function unmount(el: Element) {
  roots.get(el)?.unmount();
  roots.delete(el);
}

(window as any).LumenisSpecimens = { mount, unmount };
`;
  await fs.writeFile(entryFile, entrySrc);

  try {
    await esbuild.build({
      entryPoints: [entryFile],
      bundle: true,
      minify: true,
      jsx: 'automatic',
      format: 'iife',
      outfile: path.join(dist, 'specimens.js'),
      logLevel: 'info',
    });
  } finally {
    await fs.unlink(entryFile);
  }
}

function sourcePathFor(card: CardEntry): string {
  // key mirrors the source layout: components/<cat>/<slug>. Guidelines are
  // static HTML now (see buildGuidelineCards) and never reach this — only
  // components/*/*.specimen.tsx still gets live-mounted via specimens.js.
  const parts = card.key.split('/');
  return path.join(root, 'components', parts[1], `${parts[2]}.specimen.tsx`);
}

async function copyUiKitStatics() {
  // ui_kits/{social,email,slides} — static specimen pages, no bundle dependency.
  for (const sub of ['social', 'email', 'slides']) {
    const from = path.join(root, 'ui_kits', sub);
    await copyDirFiltered(from, path.join(dist, 'ui_kits', sub), (p) => p.endsWith('.html'));
  }
}

async function buildUiKitHtml(kit: string) {
  const from = path.join(root, 'ui_kits', kit, 'index.html');
  let html = await fs.readFile(from, 'utf8');
  // Strip the old CDN React/ReactDOM/Babel scripts and any per-file inline
  // babel scripts — App.tsx is now precompiled into bundle.js. Generic
  // (not per-filename) so this works for any kit following the convention.
  html = html
    .replace(/<script src="https:\/\/unpkg\.com\/react@[^"]*"[^>]*><\/script>\n?/, '')
    .replace(/<script src="https:\/\/unpkg\.com\/react-dom@[^"]*"[^>]*><\/script>\n?/, '')
    .replace(/<script src="https:\/\/unpkg\.com\/@babel\/standalone[^"]*"[^>]*><\/script>\n?/, '')
    .replace(/<script type="text\/babel" src="[^"]*"><\/script>\n?/g, '')
    .replace(/<script type="text\/babel"[^>]*>[\s\S]*?<\/script>/, '<script src="./bundle.js"></script>');
  const to = path.join(dist, 'ui_kits', kit, 'index.html');
  await fs.mkdir(path.dirname(to), { recursive: true });
  await fs.writeFile(to, html);
}

async function buildUiKitHtmls() {
  for (const kit of INTERACTIVE_UI_KITS) await buildUiKitHtml(kit);
}

async function buildLandingPage() {
  // thumbnail.html is Claude Design's homepage tile, not a page for people —
  // keep it available at its own path instead of serving it as the index.
  await copyFile(path.join(root, 'thumbnail.html'), path.join(dist, 'thumbnail.html'));
}

const DS_CARD_RE = /<!--\s*@dsCard\s+group="([^"]*)"\s+viewport="([^"]*)"\s+name="([^"]*)"\s+subtitle="([^"]*)"\s*-->/;

async function readDsCard(file: string): Promise<Omit<CardEntry, 'category' | 'key' | 'padding' | 'prompts'> | null> {
  const head = await fs.readFile(file, 'utf8');
  const m = head.match(DS_CARD_RE);
  if (!m) return null;
  const [, group, viewport, name, subtitle] = m;
  const [w, h] = viewport.split('x').map(Number);
  return { group, name, subtitle, w, h, href: path.relative(root, file).split(path.sep).join('/') };
}

async function collectDsCards(dir: string, ext: string): Promise<CardEntry[]> {
  const files = await findFiles(dir, ext);
  const cards: CardEntry[] = [];
  for (const f of files) {
    const card = await readDsCard(f);
    if (card) {
      const key = path.relative(root, f).split(path.sep).join('/').replace(/\.[^.]+$/, '');
      cards.push({ ...card, category: titleCase(path.basename(path.dirname(f))), key, padding: '0px' });
    }
  }
  return cards;
}

function groupBy<T>(items: T[], key: (item: T) => string): Map<string, T[]> {
  const map = new Map<string, T[]>();
  for (const item of items) {
    const k = key(item);
    if (!map.has(k)) map.set(k, []);
    map.get(k)!.push(item);
  }
  return map;
}

function slugifyName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

async function buildHomePage(guidelineCards: CardEntry[], componentCards: CardEntry[]) {
  const uiCards = await collectDsCards(path.join(root, 'ui_kits'), '.html');
  const kits = uiCards.filter((c) => c.group !== 'Slides');
  const slides = uiCards.filter((c) => c.group === 'Slides').sort((a, b) => a.href.localeCompare(b.href));

  const nav: (NavGroup | null)[] = [
    {
      title: 'UI Kits',
      items: kits.map((c) => ({ name: c.name, subtitle: c.subtitle, kind: 'page', key: `ui-kits/${slugifyName(c.name)}`, href: c.href, w: c.w, h: c.h, useIframe: true })),
    },
    slides.length
      ? {
          title: 'UI Kits',
          items: [{ name: 'Slide deck', subtitle: `${slides.length} slides, keyboard nav`, kind: 'deck', key: 'ui-kits/slide-deck', slides }],
        }
      : null,
    ...[...groupBy(guidelineCards, (c) => c.category)].map(([title, items]) => ({
      title,
      items: items.map((c) => ({ name: c.name, subtitle: c.subtitle, kind: 'page' as const, key: c.key, href: c.href, w: c.w, h: c.h, useIframe: true })),
    })),
    {
      title: 'Components',
      items: componentCards
        .map((c) => ({ name: c.name, subtitle: c.subtitle, kind: 'page' as const, key: c.key, href: c.href, w: c.w, h: c.h, useIframe: false, prompts: c.prompts }))
        .sort((a, b) => a.name.localeCompare(b.name)),
    },
  ];

  // Merge the two "UI Kits" groups (kits + the deck entry) into one section.
  const merged: NavGroup[] = [];
  for (const section of nav) {
    if (!section) continue;
    const existing = merged.find((s) => s.title === section.title);
    if (existing) existing.items.push(...section.items);
    else merged.push({ title: section.title, items: [...section.items] });
  }

  const data = JSON.stringify(merged);

  const html = `<!doctype html>
<html><head><meta charset="utf-8"><title>Lumenis Design System</title>
<link rel="stylesheet" href="styles.css">
<style>
:root{--bg:#0b0b0c;--panel:#141415;--panel-2:#1c1c1f;--panel-3:#242427;--ink:#f0f0f0;--ink-dim:#8f8f95;--line:rgba(255,255,255,.08);--line-strong:rgba(255,255,255,.16);--accent-ui:#ff6a3d}
*{box-sizing:border-box}
html,body{margin:0;height:100%;background:var(--bg);color:var(--ink);font-family:var(--font-sans);-webkit-font-smoothing:antialiased}
#app{display:grid;grid-template-columns:272px 1fr;height:100vh}
.sidebar{background:var(--panel);border-right:1px solid var(--line);overflow-y:auto;padding:var(--space-5) 0;display:flex;flex-direction:column;gap:var(--space-2)}
.brand-pill{margin:0 var(--space-5) var(--space-5);padding:var(--space-2) var(--space-4);background:var(--panel-3);border:1px solid var(--line-strong);border-radius:999px;font-size:var(--text-caption);font-weight:var(--weight-regular);letter-spacing:.02em;display:inline-flex;align-items:center;gap:var(--space-2);width:fit-content}
.brand-pill::before{content:"";width:6px;height:6px;border-radius:50%;background:var(--accent-ui)}
.nav-group{margin-bottom:var(--space-5)}
.nav-group h2{font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:var(--ink-dim);margin:0 var(--space-5) var(--space-2);font-weight:var(--weight-regular)}
.nav-item{display:block;width:calc(100% - 20px);text-align:left;background:none;border:none;color:var(--ink-dim);font-family:inherit;font-size:var(--text-form);line-height:1.3;padding:7px 12px;margin:0 10px 1px;cursor:pointer;border-radius:var(--radius-sm);transition:background var(--dur-fast) var(--ease-brand),color var(--dur-fast) var(--ease-brand)}
.nav-item:hover{background:var(--panel-2);color:var(--ink)}
.nav-item.active{background:color-mix(in srgb, var(--accent-ui) 16%, var(--panel-2));color:#fff}
main{overflow-y:auto;background:var(--bg)}
.topbar{position:sticky;top:0;z-index:2;display:flex;align-items:center;justify-content:space-between;gap:var(--space-6);padding:14px var(--space-9);background:color-mix(in srgb, var(--bg) 85%, transparent);backdrop-filter:blur(6px);border-bottom:1px solid var(--line)}
.crumb{font-size:12px;color:var(--ink-dim);letter-spacing:.02em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.crumb b{color:var(--ink);font-weight:var(--weight-regular)}
.gh-link{color:var(--ink-dim);font-size:var(--text-caption);text-decoration:none;border:1px solid var(--line-strong);padding:6px var(--space-4);border-radius:999px;white-space:nowrap;transition:color var(--dur-fast) var(--ease-brand),border-color var(--dur-fast) var(--ease-brand)}
.gh-link:hover{color:var(--ink);border-color:var(--ink-dim)}
.content{padding:var(--space-8) var(--space-9);max-width:1400px}
.empty{padding:var(--space-11) var(--space-9);color:var(--ink-dim)}
.empty h1{color:var(--ink);font-weight:var(--weight-regular)}
.head{display:flex;align-items:flex-start;justify-content:space-between;gap:var(--space-6);margin-bottom:var(--space-6)}
.head h1{font-size:var(--text-title-sm);margin:0 0 var(--space-2);font-weight:var(--weight-regular);letter-spacing:-.01em}
.head p{margin:0;color:var(--ink-dim);font-size:var(--text-form)}
.head a{display:inline-flex;align-items:center;gap:6px;color:var(--ink-dim);font-size:var(--text-caption);text-decoration:none;border:1px solid var(--line-strong);padding:var(--space-2) var(--space-4);border-radius:999px;white-space:nowrap;transition:color var(--dur-fast) var(--ease-brand),border-color var(--dur-fast) var(--ease-brand),background var(--dur-fast) var(--ease-brand)}
.head a:hover{color:#fff;border-color:var(--ink-dim);background:var(--panel-2)}
.canvas{background:#000;border:1px solid var(--line);border-radius:var(--radius-lg);display:flex;align-items:flex-start;justify-content:center;padding:var(--space-6);overflow:auto}
.canvas iframe{border:none;background:#fff;flex-shrink:0;border-radius:var(--radius-md)}
.canvas .mount{background:#fff;color:var(--text-primary);flex-shrink:0;border-radius:var(--radius-md);overflow:hidden}
.deck{display:grid;grid-template-columns:200px 1fr;gap:var(--space-5)}
.deck-rail{display:flex;flex-direction:column;gap:var(--space-3);max-height:70vh;overflow-y:auto}
.deck-thumb{border:1px solid var(--line);border-radius:var(--radius-sm);cursor:pointer;overflow:hidden;background:#000;position:relative;aspect-ratio:16/9}
.deck-thumb.active{border-color:var(--accent-ui)}
.deck-thumb iframe{pointer-events:none;border:none}
.deck-thumb .num{position:absolute;top:4px;left:6px;font-size:10px;color:var(--ink-dim);z-index:1}
.deck-main iframe{border:none;background:#fff;border-radius:var(--radius-md)}
.prompts{margin-top:var(--space-8);display:flex;flex-direction:column;gap:var(--space-6)}
.prompt{border-top:1px solid var(--line);padding-top:var(--space-4)}
.prompt h3{font-size:var(--text-caption);text-transform:uppercase;letter-spacing:.04em;color:var(--ink-dim);margin:0 0 var(--space-3);font-weight:var(--weight-regular)}
.prompt p{margin:0 0 var(--space-3);font-size:var(--text-form);color:var(--ink)}
.prompt ul{margin:0 0 var(--space-3);padding-left:1.2em;font-size:var(--text-form);color:var(--ink)}
.prompt pre{background:var(--panel-2);border:1px solid var(--line);padding:var(--space-4);overflow-x:auto;margin:0 0 var(--space-3);border-radius:var(--radius-sm)}
.prompt code{font-family:ui-monospace,monospace;font-size:13px}
.prompt p code{background:var(--panel-2);padding:1px 5px;border-radius:3px}
</style></head><body>
<div id="app">
  <nav class="sidebar">
    <span class="brand-pill">Design System</span>
    <div id="nav-groups"></div>
  </nav>
  <main>
    <div class="topbar">
      <div class="crumb" id="crumb"></div>
      <a class="gh-link" href="https://github.com/laarnicayetano/lumenis-design-system" target="_blank" rel="noopener">View on GitHub ↗</a>
    </div>
    <div id="content" class="content"></div>
  </main>
</div>
<script id="ds-data" type="application/json">${data}</script>
<script src="specimens.js"></script>
<script>
const groups = JSON.parse(document.getElementById('ds-data').textContent);
const navEl = document.getElementById('nav-groups');
const contentEl = document.getElementById('content');
let mountedEl = null;

navEl.innerHTML = groups.map((g) => \`
  <div class="nav-group">
    <h2>\${g.title}</h2>
    \${g.items.map((it) => \`<button class="nav-item" data-key="\${it.key}">\${it.name}</button>\`).join('')}
  </div>\`).join('');

function fitFrame(el, w, h, maxWidth) {
  const scale = Math.min(1, maxWidth / w);
  el.style.width = w + 'px';
  el.style.height = h + 'px';
  el.style.transform = 'scale(' + scale + ')';
  el.style.transformOrigin = 'top left';
  const wrap = el.parentElement;
  wrap.style.width = (w * scale) + 'px';
  wrap.style.height = (h * scale) + 'px';
}

function renderPrompts(prompts) {
  if (!prompts || !prompts.length) return '';
  return \`<div class="prompts">\${prompts.map((p) => \`<div class="prompt"><h3>\${p.name}</h3>\${p.html}</div>\`).join('')}</div>\`;
}

function renderPage(item) {
  if (mountedEl) { window.LumenisSpecimens.unmount(mountedEl); mountedEl = null; }
  const openLink = item.href ? \`<a href="\${item.href}" target="_blank" rel="noopener">Open standalone ↗</a>\` : '';
  contentEl.innerHTML = \`
    <div class="head">
      <div><h1>\${item.name}</h1><p>\${item.subtitle}</p></div>
      \${openLink}
    </div>
    <div class="canvas"><div></div></div>
    \${renderPrompts(item.prompts)}\`;
  const wrap = contentEl.querySelector('.canvas > div');

  if (item.useIframe) {
    wrap.innerHTML = '<iframe src="' + item.href + '"></iframe>';
    const iframe = wrap.querySelector('iframe');
    let h = item.h;
    const resize = () => fitFrame(iframe, item.w, h, contentEl.clientWidth - 2 * 56 - 2);
    resize();
    iframe.addEventListener('load', () => {
      try { h = Math.max(item.h, iframe.contentDocument.body.scrollHeight); } catch {}
      resize();
    });
    window.onresize = resize;
    return;
  }

  const mount = document.createElement('div');
  mount.className = 'mount';
  // Fix the width to the design width *before* mounting/measuring — the
  // specimen's flex-wrap layout depends on it, so measuring at some other
  // (unconstrained) width would give the wrong scrollHeight.
  mount.style.width = item.w + 'px';
  wrap.appendChild(mount);
  window.LumenisSpecimens.mount(item.key, mount);
  mountedEl = mount;
  const resize = () => {
    const realH = Math.max(item.h, mount.scrollHeight);
    fitFrame(mount, item.w, realH, contentEl.clientWidth - 2 * 56 - 2);
  };
  requestAnimationFrame(resize);
  window.onresize = resize;
}

function renderDeck(item) {
  if (mountedEl) { window.LumenisSpecimens.unmount(mountedEl); mountedEl = null; }
  contentEl.innerHTML = \`
    <div class="head">
      <div><h1>\${item.name}</h1><p>\${item.subtitle}</p></div>
    </div>
    <div class="deck">
      <div class="deck-rail">\${item.slides.map((s, i) => \`
        <div class="deck-thumb" data-i="\${i}"><span class="num">\${i + 1}</span><div><iframe src="\${s.href}"></iframe></div></div>\`).join('')}</div>
      <div class="deck-main"><div><iframe src=""></iframe></div></div>
    </div>\`;
  const thumbs = [...contentEl.querySelectorAll('.deck-thumb')];
  const mainIframe = contentEl.querySelector('.deck-main iframe');
  thumbs.forEach((t) => fitFrame(t.querySelector('iframe'), item.slides[0].w, item.slides[0].h, 200));
  function select(i) {
    thumbs.forEach((t) => t.classList.toggle('active', Number(t.dataset.i) === i));
    mainIframe.src = item.slides[i].href;
    const resize = () => fitFrame(mainIframe, item.slides[i].w, item.slides[i].h, contentEl.clientWidth - 200 - 20 - 2 * 56 - 2);
    resize();
    window.onresize = resize;
  }
  thumbs.forEach((t) => t.addEventListener('click', () => select(Number(t.dataset.i))));
  select(0);
}

function findItem(key) {
  for (const g of groups) for (const it of g.items) if (it.key === key) return it;
  return null;
}

function findGroupTitle(key) {
  for (const g of groups) for (const it of g.items) if (it.key === key) return g.title;
  return '';
}

const crumbEl = document.getElementById('crumb');
crumbEl.textContent = 'Design System';

function open(key, push) {
  const item = findItem(key);
  if (!item) return;
  document.querySelectorAll('.nav-item').forEach((b) => b.classList.toggle('active', b.dataset.key === key));
  crumbEl.innerHTML = 'Design System / ' + findGroupTitle(key) + ' / <b>' + item.name + '</b>';
  if (item.kind === 'deck') renderDeck(item);
  else renderPage(item);
  if (push) location.hash = key;
}

navEl.addEventListener('click', (e) => {
  const btn = e.target.closest('.nav-item');
  if (!btn) return;
  open(btn.dataset.key, true);
});

function openFromHash() {
  const key = decodeURIComponent(location.hash.slice(1));
  if (key && findItem(key)) { open(key, false); return true; }
  return false;
}
window.addEventListener('hashchange', openFromHash);
if (!openFromHash()) {
  contentEl.innerHTML = '<div class="empty"><h1>Lumenis Design System</h1><p>Select a UI kit, guideline, or component from the sidebar.</p></div>';
}
</script>
</body></html>`;

  await fs.mkdir(dist, { recursive: true });
  await fs.writeFile(path.join(dist, 'index.html'), html);
}

export async function build() {
  await clean();
  const [, , , , , guidelineCards, componentCards] = await Promise.all([
    buildBundles(),
    copyStaticAssets(),
    copyUiKitStatics(),
    buildUiKitHtmls(),
    buildLandingPage(),
    buildGuidelineCards(),
    buildComponentSpecimens(),
  ]);
  await buildSpecimensClientBundle(componentCards);
  await buildHomePage(guidelineCards, componentCards);
  await fs.writeFile(path.join(dist, '.nojekyll'), '');
  await fs.rm(path.join(root, '.build-tmp'), { recursive: true, force: true });
  console.log('Built to dist/');
}

// Only run when invoked directly (`node scripts/build.ts`), not when imported by dev.ts.
if (path.resolve(process.argv[1] ?? '') === fileURLToPath(import.meta.url)) {
  await build();
}
