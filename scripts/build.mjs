import * as esbuild from "esbuild";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const dist = path.join(root, "dist");
async function clean() {
  await fs.rm(dist, { recursive: true, force: true });
  await fs.mkdir(dist, { recursive: true });
}
async function copyFile(from, to) {
  await fs.mkdir(path.dirname(to), { recursive: true });
  await fs.copyFile(from, to);
}
async function copyDirFiltered(fromDir, toDir, predicate) {
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
async function minifyCssFile(from, to) {
  const src = await fs.readFile(from, "utf8");
  const result = await esbuild.transform(src, { loader: "css", minify: true });
  await fs.mkdir(path.dirname(to), { recursive: true });
  await fs.writeFile(to, result.code);
}
async function findFiles(dir, matchExt) {
  const out = [];
  async function walk(d) {
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
function titleCase(slug) {
  return slug.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}
async function dirExists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}
// dir is each kit's real source location — corporate-website (and the
// static-only social/email/slides kits handled elsewhere) still live under
// ui_kits/, but OptiLIFT/OptiLIGHT moved under products/<Name>/ui_kit/ so
// everything about a product lives in one folder. dist output always
// mirrors dir's path relative to root (see buildBundles/buildUiKitHtml),
// so this is the only place a kit's source location needs to be named.
const INTERACTIVE_UI_KITS = {
  "corporate-website": {
    dir: path.join(root, "ui_kits", "corporate-website"),
    entry: "CorporateApp.jsx",
  },
  "optilift-website": {
    dir: path.join(root, "products", "OptiLIFT", "ui_kit", "website"),
    entry: "OptiLiftApp.jsx",
  },
  "optilight-website": {
    dir: path.join(root, "products", "OptiLIGHT", "ui_kit", "website"),
    entry: "OptiLightApp.jsx",
  },
};
async function buildBundles() {
  const common = {
    bundle: true,
    minify: true,
    jsx: "automatic",
    logLevel: "info",
    // Every consuming page (components/*.card.html, ui_kits/*/index.html)
    // loads React from a CDN <script> tag before any of these bundles —
    // alias instead of bundling a private copy, or components' hooks get a
    // different dispatcher than whatever actually renders them. ReactDOM is
    // read off globalThis directly in source (see design-system-entry.js
    // and each ui_kit's App entry) rather than imported from
    // "react-dom/client", since that subpath import isn't resolvable by
    // Claude Design's canvas (it only knows "react"/"react-dom" as CDN
    // globals, not npm subpath exports) — no alias needed for something
    // nothing imports anymore, but it does mean the CDN react-dom <script>
    // tag on each ui_kit page must stay (see buildUiKitHtml below).
    alias: {
      react: path.join(root, "build/react-global-shim.js"),
    },
  };
  await esbuild.build({
    ...common,
    entryPoints: [path.join(root, "build/design-system-entry.js")],
    outfile: path.join(dist, "design-system.js"),
    format: "iife",
    globalName: "LumenisDesignSystem",
  });
  for (const { dir, entry } of Object.values(INTERACTIVE_UI_KITS)) {
    await esbuild.build({
      ...common,
      entryPoints: [path.join(dir, entry)],
      outfile: path.join(dist, path.relative(root, dir), "bundle.js"),
      format: "iife",
    });
  }
}
async function copyStaticAssets() {
  const tokenFiles = await findFiles(path.join(root, "tokens"), ".css");
  for (const f of tokenFiles) {
    await minifyCssFile(f, path.join(dist, path.relative(root, f)));
  }
  await minifyCssFile(
    path.join(root, "styles.css"),
    path.join(dist, "styles.css"),
  );
  await copyDirFiltered(
    path.join(root, "assets"),
    path.join(dist, "assets"),
    (p) => !p.includes(`${path.sep}fonts${path.sep}`),
  );
  for (const product of await productDirs()) {
    const from = path.join(root, "products", product, "assets");
    if (await dirExists(from)) {
      await copyDirFiltered(
        from,
        path.join(dist, "products", product, "assets"),
        () => true,
      );
    }
  }
}
async function productDirs() {
  const entries = await fs
    .readdir(path.join(root, "products"), { withFileTypes: true })
    .catch(() => []);
  return entries.filter((e) => e.isDirectory()).map((e) => e.name);
}
const GUIDELINE_PADDING = 20;
async function buildGuidelineCards() {
  // Shared cards live flat under guidelines/; product-specific ones (moved
  // out of guidelines/ so everything about a product lives in one place)
  // live nested under products/<Name>/guidelines/ — findFiles over
  // products/ picks up exactly those, nothing else there ends in
  // .card.html. Output mirrors each file's real relative-path depth (same
  // approach as buildComponentCards below), so a card's own "../styles.css"
  // etc. stays correct for wherever it actually sits — including for these
  // deeper product cards, hence the depth-agnostic regex below.
  const files = [
    ...(await findFiles(path.join(root, "guidelines"), ".card.html")),
    ...(await findFiles(path.join(root, "products"), ".card.html")),
  ];
  const cards = [];
  for (const file of files) {
    const card = await readDsCard(file);
    if (!card) continue;
    const relKey = path.relative(root, file).split(path.sep).join("/");
    const outFile = path.join(dist, relKey);
    const src = await fs.readFile(file, "utf8");
    const padded = src.replace(
      /<link[^>]*href="[^"]*styles\.css"[^>]*>/,
      `$&
<style>body{margin:0;padding:${GUIDELINE_PADDING}px;box-sizing:border-box}</style>`,
    );
    await fs.mkdir(path.dirname(outFile), { recursive: true });
    await fs.writeFile(outFile, padded);
    const productMatch = relKey.match(/^products\/([^/]+)\//);
    cards.push({
      group: card.group,
      category: card.group,
      name: card.name,
      subtitle: card.subtitle,
      w: card.w + GUIDELINE_PADDING * 2,
      h: card.h + GUIDELINE_PADDING * 2,
      href: relKey,
      key: relKey.replace(/\.card\.html$/, ""),
      padding: "0px",
      product: productMatch ? productMatch[1] : null,
    });
  }
  return cards;
}
async function buildComponentPromptMap() {
  const indexSrc = await fs.readFile(
    path.join(root, "components/index.js"),
    "utf8",
  );
  const map = new Map();
  const exportRe = /^export \{([^}]*)\} from '(\.[^']+)';$/gm;
  let m;
  while ((m = exportRe.exec(indexSrc))) {
    const names = m[1]
      .split(",")
      .map((n) => n.trim())
      .filter(Boolean);
    const modulePath = path.join(root, "components", m[2] + ".prompt.md");
    for (const name of names) map.set(name, modulePath);
  }
  return map;
}
function escapeHtml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function inlineMarkdown(text) {
  return escapeHtml(text).replace(/`([^`]+)`/g, "<code>$1</code>");
}
function renderPromptMarkdown(md) {
  const blocks = md.trim().split(/\n\s*\n/);
  return blocks
    .map((block) => {
      if (block.startsWith("```")) {
        const code = block.replace(/^```\w*\n?/, "").replace(/```$/, "");
        return `<pre><code>${escapeHtml(code.trim())}</code></pre>`;
      }
      const lines = block.split("\n").filter(Boolean);
      if (lines.length && lines.every((l) => l.trim().startsWith("- "))) {
        return `<ul>${lines.map((l) => `<li>${inlineMarkdown(l.trim().slice(2))}</li>`).join("")}</ul>`;
      }
      return `<p>${inlineMarkdown(block.trim())}</p>`;
    })
    .join("");
}
async function buildComponentCards() {
  const files = await findFiles(path.join(root, "components"), ".card.html");
  const promptMap = await buildComponentPromptMap();
  const promptCache = new Map();
  const cards = [];
  for (const file of files) {
    const card = await readDsCard(file);
    if (!card) continue;
    // Preserve the file's path exactly as it sits under components/ — some
    // cards live directly in their group folder (components/actions/buttons.card.html,
    // one card covering several components), others one level deeper in
    // their own component folder (components/actions/Button/Button.card.html,
    // one card per component). Flattening either into a fixed depth would
    // both collide different cards' output paths and break every relative
    // path (../../styles.css etc.) baked into the source at its real depth.
    const relPath = path.relative(path.join(root, "components"), file);
    const category = relPath.split(path.sep)[0];
    const outFile = path.join(dist, "components", relPath);
    const src = await fs.readFile(file, "utf8");
    // Swap just the filename, whatever depth of ../ precedes it — a literal
    // "../../_ds_bundle.js" match only worked for cards at the shallower
    // depth and silently no-op'd for the deeper per-component cards.
    const patched = src.replace(/_ds_bundle\.js"/, 'design-system.js"');
    await fs.mkdir(path.dirname(outFile), { recursive: true });
    await fs.writeFile(outFile, patched);
    const destructureMatch = src.match(/const \{([^}]*)\}\s*=\s*window\[/);
    const importedNames = destructureMatch
      ? destructureMatch[1]
          .split(",")
          .map((n) => n.trim())
          .filter(Boolean)
      : [];
    const seenPromptFiles = new Set();
    const prompts = [];
    for (const name of importedNames) {
      const promptFile = promptMap.get(name);
      if (!promptFile || seenPromptFiles.has(promptFile)) continue;
      seenPromptFiles.add(promptFile);
      let raw = promptCache.get(promptFile);
      if (raw === void 0) {
        raw = await fs.readFile(promptFile, "utf8").catch(() => "");
        promptCache.set(promptFile, raw);
      }
      if (raw)
        prompts.push({
          name: path.basename(promptFile, ".prompt.md"),
          html: renderPromptMarkdown(raw),
        });
    }
    const relKey = relPath
      .replace(/\.card\.html$/, "")
      .split(path.sep)
      .join("/");
    cards.push({
      group: card.group,
      category: titleCase(category),
      name: card.name,
      subtitle: card.subtitle,
      w: card.w,
      h: card.h,
      href: `components/${relKey}.card.html`,
      key: `components/${relKey}`,
      padding: "0px",
      prompts,
    });
  }
  return cards;
}
async function copyUiKitStatics() {
  for (const sub of ["social", "email", "slides"]) {
    const from = path.join(root, "ui_kits", sub);
    await copyDirFiltered(from, path.join(dist, "ui_kits", sub), (p) =>
      p.endsWith(".html"),
    );
  }
}
async function buildUiKitHtml(kit) {
  const { dir } = INTERACTIVE_UI_KITS[kit];
  const from = path.join(dir, "index.html");
  let html = await fs.readFile(from, "utf8");
  // The CDN React/ReactDOM <script> tags stay — bundle.js reads ReactDOM off
  // globalThis at runtime (see buildBundles' alias comment above), so they
  // aren't dead weight even though nothing on the page runs JSX through
  // them anymore. Only the Babel-standalone scripts (no longer needed —
  // JSX is pre-compiled into bundle.js) and the placeholder they wrapped
  // get removed/replaced.
  html = html
    .replace(
      /<script[^>]*src="https:\/\/unpkg\.com\/@babel\/standalone[^"]*"[\s\S]*?><\/script>\n?/,
      "",
    )
    .replace(/<script type="text\/babel" src="[^"]*"><\/script>\n?/g, "")
    .replace(
      /<script type="text\/babel"[^>]*>[\s\S]*?<\/script>/,
      '<script src="./bundle.js"><\/script>',
    );
  const to = path.join(dist, path.relative(root, dir), "index.html");
  await fs.mkdir(path.dirname(to), { recursive: true });
  await fs.writeFile(to, html);
}
async function buildUiKitHtmls() {
  for (const kit of Object.keys(INTERACTIVE_UI_KITS)) await buildUiKitHtml(kit);
}
async function buildLandingPage() {
  await copyFile(
    path.join(root, "thumbnail.html"),
    path.join(dist, "thumbnail.html"),
  );
}
const DS_CARD_RE =
  /<!--\s*@dsCard\s+group="([^"]*)"\s+viewport="([^"]*)"\s+name="([^"]*)"\s+subtitle="([^"]*)"\s*-->/;
async function readDsCard(file) {
  const head = await fs.readFile(file, "utf8");
  const m = head.match(DS_CARD_RE);
  if (!m) return null;
  const [, group, viewport, name, subtitle] = m;
  const [w, h] = viewport.split("x").map(Number);
  return {
    group,
    name,
    subtitle,
    w,
    h,
    href: path.relative(root, file).split(path.sep).join("/"),
  };
}
async function collectDsCards(dir, ext) {
  const files = await findFiles(dir, ext);
  const cards = [];
  for (const f of files) {
    const card = await readDsCard(f);
    if (card) {
      const key = path
        .relative(root, f)
        .split(path.sep)
        .join("/")
        .replace(/\.[^.]+$/, "");
      cards.push({
        ...card,
        category: titleCase(path.basename(path.dirname(f))),
        key,
        padding: "0px",
      });
    }
  }
  return cards;
}
function groupBy(items, key) {
  const map = new Map();
  for (const item of items) {
    const k = key(item);
    if (!map.has(k)) map.set(k, []);
    map.get(k).push(item);
  }
  return map;
}
function slugifyName(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
async function buildHomePage(guidelineCards, componentCards) {
  const productUiCards = [];
  for (const product of await productDirs()) {
    const uiKitDir = path.join(root, "products", product, "ui_kit");
    if (await dirExists(uiKitDir)) {
      productUiCards.push(
        ...(await collectDsCards(uiKitDir, ".html")).map((c) => ({
          ...c,
          product,
        })),
      );
    }
  }
  const uiCards = [
    ...(await collectDsCards(path.join(root, "ui_kits"), ".html")),
    ...productUiCards,
  ];
  const kits = uiCards.filter((c) => c.group !== "Slides" && !c.product);
  const slides = uiCards
    .filter((c) => c.group === "Slides")
    .sort((a, b) => a.href.localeCompare(b.href));
  const productGuidelines = guidelineCards.filter((c) => c.product);
  const sharedGuidelines = guidelineCards.filter((c) => !c.product);
  // Everything specific to one product (its guideline cards and its
  // marketing-site ui kit) gets one combined nav section named after the
  // product, instead of the kit landing in the generic "UI Kits" list and
  // its guidelines landing wherever their @dsCard group happens to match.
  const productNames = [
    ...new Set([
      ...productUiCards.map((c) => c.product),
      ...productGuidelines.map((c) => c.product),
    ]),
  ].sort();
  const nav = [
    {
      title: "UI Kits",
      items: kits.map((c) => ({
        name: c.name,
        subtitle: c.subtitle,
        kind: "page",
        key: `ui-kits/${slugifyName(c.name)}`,
        href: c.href,
        w: c.w,
        h: c.h,
      })),
    },
    slides.length
      ? {
          title: "UI Kits",
          items: [
            {
              name: "Slide Deck",
              subtitle: `${slides.length} slides, keyboard nav`,
              kind: "deck",
              key: "ui-kits/slide-deck",
              slides,
            },
          ],
        }
      : null,
    ...productNames.map((product) => ({
      title: product,
      items: [
        ...productUiCards
          .filter((c) => c.product === product)
          .map((c) => ({
            name: c.name,
            subtitle: c.subtitle,
            kind: "page",
            key: `ui-kits/${slugifyName(c.name)}`,
            href: c.href,
            w: c.w,
            h: c.h,
          })),
        ...productGuidelines
          .filter((c) => c.product === product)
          .map((c) => ({
            name: c.name,
            subtitle: c.subtitle,
            kind: "page",
            key: c.key,
            href: c.href,
            w: c.w,
            h: c.h,
          })),
      ],
    })),
    ...[...groupBy(sharedGuidelines, (c) => c.category)].map(
      ([title, items]) => ({
        title,
        items: items.map((c) => ({
          name: c.name,
          subtitle: c.subtitle,
          kind: "page",
          key: c.key,
          href: c.href,
          w: c.w,
          h: c.h,
        })),
      }),
    ),
    {
      title: "Components",
      items: componentCards
        .map((c) => ({
          name: c.name,
          subtitle: c.subtitle,
          kind: "page",
          key: c.key,
          href: c.href,
          w: c.w,
          h: c.h,
          prompts: c.prompts,
        }))
        .sort((a, b) => a.name.localeCompare(b.name)),
    },
  ];
  const merged = [];
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
.nav-group h2{font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:var(--ink-dim);margin:0 var(--space-5) var(--space-2);font-weight:var(--weight-regular);cursor:pointer;user-select:none;display:flex;align-items:center;justify-content:space-between;gap:var(--space-2)}
.nav-group h2:hover{color:var(--ink)}
.nav-group h2::after{content:"";width:5px;height:5px;flex-shrink:0;border-style:solid;border-width:0 1.5px 1.5px 0;border-color:currentColor;transform:rotate(45deg);transition:transform var(--dur-fast) var(--ease-brand)}
.nav-group.collapsed h2::after{transform:rotate(-45deg)}
.nav-group.collapsed .nav-item{display:none}
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
      <a class="gh-link" href="https://github.com/laarnicayetano/lumenis-design-system" target="_blank" rel="noopener">View on GitHub \u2197</a>
    </div>
    <div id="content" class="content"></div>
  </main>
</div>
<script id="ds-data" type="application/json">${data}<\/script>
<script>
const groups = JSON.parse(document.getElementById('ds-data').textContent);
const navEl = document.getElementById('nav-groups');
const contentEl = document.getElementById('content');

const COLLAPSE_KEY = 'ds-collapsed-groups';
let collapsedGroups;
try { collapsedGroups = new Set(JSON.parse(localStorage.getItem(COLLAPSE_KEY) || '[]')); }
catch { collapsedGroups = new Set(); }
function saveCollapsed() {
  try { localStorage.setItem(COLLAPSE_KEY, JSON.stringify([...collapsedGroups])); } catch {}
}
function setGroupCollapsed(title, collapsed) {
  const groupEl = [...navEl.querySelectorAll('.nav-group')].find((g) => g.dataset.group === title);
  if (!groupEl) return;
  groupEl.classList.toggle('collapsed', collapsed);
  if (collapsed) collapsedGroups.add(title); else collapsedGroups.delete(title);
}

navEl.innerHTML = groups.map((g) => \`
  <div class="nav-group\${collapsedGroups.has(g.title) ? ' collapsed' : ''}" data-group="\${g.title}">
    <h2>\${g.title}</h2>
    \${g.items.map((it) => \`<button class="nav-item" data-key="\${it.key}">\${it.name}</button>\`).join('')}
  </div>\`).join('');

navEl.addEventListener('click', (e) => {
  const header = e.target.closest('.nav-group > h2');
  if (!header) return;
  const groupEl = header.parentElement;
  setGroupCollapsed(groupEl.dataset.group, !groupEl.classList.contains('collapsed'));
  saveCollapsed();
});

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
  const openLink = item.href ? \`<a href="\${item.href}" target="_blank" rel="noopener">Open standalone \u2197</a>\` : '';
  contentEl.innerHTML = \`
    <div class="head">
      <div><h1>\${item.name}</h1><p>\${item.subtitle}</p></div>
      \${openLink}
    </div>
    <div class="canvas"><div></div></div>
    \${renderPrompts(item.prompts)}\`;
  const wrap = contentEl.querySelector('.canvas > div');

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
}

function renderDeck(item) {
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
  const groupTitle = findGroupTitle(key);
  if (collapsedGroups.has(groupTitle)) { setGroupCollapsed(groupTitle, false); saveCollapsed(); }
  document.querySelectorAll('.nav-item').forEach((b) => b.classList.toggle('active', b.dataset.key === key));
  crumbEl.innerHTML = 'Design System / ' + groupTitle + ' / <b>' + item.name + '</b>';
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
<\/script>
</body></html>`;
  await fs.mkdir(dist, { recursive: true });
  await fs.writeFile(path.join(dist, "index.html"), html);
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
    buildComponentCards(),
  ]);
  await buildHomePage(guidelineCards, componentCards);
  await fs.writeFile(path.join(dist, ".nojekyll"), "");
  await fs.rm(path.join(root, ".build-tmp"), { recursive: true, force: true });
  console.log("Built to dist/");
}
if (path.resolve(process.argv[1] ?? "") === fileURLToPath(import.meta.url)) {
  await build();
}
