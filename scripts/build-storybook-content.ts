// Builds Storybook doc pages from the design system's real files, so
// guidelines/, products/*/guidelines/, and ui_kits/ are browsable inside
// Storybook without copying their content anywhere — each page just
// iframes the real file. Output goes to stories/generated/ (gitignored),
// rebuilt every time by the `storybook`/`build-storybook` npm scripts.
//
// Three ui_kits (corporate-website, OptiLIFT/OptiLIGHT websites) are raw
// JSX apps, not plain HTML, so they need compiling to a bundle.js with
// esbuild before a browser can run them — see compileInteractiveKit()
// below for that step and why the compiled copy has to replace the raw
// source in Storybook's static file map rather than sit alongside it.
import * as esbuild from "esbuild";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const outDir = path.join(root, "stories", "generated");
const bundlesDir = path.join(outDir, "ui-kit-bundles");

interface DsCard {
  group: string;
  name: string;
  subtitle: string;
  w: number;
  h: number;
}

// Mirrors (deliberately not imports from) scripts/build.mjs's old DS_CARD_RE
// / readDsCard — kept as a tiny standalone copy rather than a shared module.
// Keep the regex in sync if the marker format ever changes.
const DS_CARD_RE =
  /^<!--\s*@dsCard\s+group="([^"]*)"\s+viewport="([^"]*)"\s+name="([^"]*)"\s+subtitle="([^"]*)"\s*-->/;

async function readDsCard(file: string): Promise<DsCard | null> {
  const src = await fs.readFile(file, "utf8");
  const m = src.match(DS_CARD_RE);
  if (!m) return null;
  const [, group, viewport, name, subtitle] = m;
  const [w, h] = viewport.split("x").map(Number);
  return { group, name, subtitle, w, h };
}

async function findFiles(dir: string, matchExt: string): Promise<string[]> {
  const out: string[] = [];
  async function walk(d: string) {
    const entries = await fs
      .readdir(d, { withFileTypes: true })
      .catch(() => []);
    for (const entry of entries) {
      const p = path.join(d, entry.name);
      if (entry.isDirectory()) await walk(p);
      else if (p.endsWith(matchExt)) out.push(p);
    }
  }
  await walk(dir);
  return out;
}

async function dirExists(p: string): Promise<boolean> {
  return fs
    .stat(p)
    .then((s) => s.isDirectory())
    .catch(() => false);
}

// Storybook's static file serving silently 404s on any public path
// containing a literal space (confirmed empirically against "Stellar M22"
// and "triLIFT 2.0") — used only for the *served* URL, never for real
// filesystem paths, which keep their real names untouched.
function slug(s: string): string {
  return s.replace(/[^a-zA-Z0-9.]+/g, "-").replace(/(^-|-$)/g, "");
}

function escapeAttr(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

function iframeBlock(src: string, w: number, h: number, label: string): string {
  return `<iframe
  src="${escapeAttr(src)}"
  title="${escapeAttr(label)}"
  style={{
    width: "100%",
    maxWidth: ${w},
    height: ${h},
    border: "1px solid var(--sb-border, #e0e0e0)",
    borderRadius: 8,
  }}
/>`;
}

async function writeGenerated(
  relOutPath: string,
  content: string,
): Promise<void> {
  const outFile = path.join(outDir, relOutPath);
  await fs.mkdir(path.dirname(outFile), { recursive: true });
  await fs.writeFile(outFile, content);
}

async function generateGuidelines(): Promise<number> {
  const files = await findFiles(path.join(root, "guidelines"), ".card.html");
  let count = 0;
  for (const file of files) {
    const card = await readDsCard(file);
    if (!card) continue;
    const key = path.basename(file, ".card.html");
    const relSrc = path.relative(root, file).split(path.sep).join("/");
    const title = `Foundations/Guidelines/${card.group}/${card.name}`;
    await writeGenerated(
      `guidelines/${key}.mdx`,
      guidelineMdx(title, card, relSrc, `/foundations/${relSrc}`),
    );
    count++;
  }
  return count;
}

// products/<Name>/guidelines/*.card.html — same @dsCard mechanism as the
// shared guidelines/, grouped into their own "Products" sidebar
// section (separate from the shared "Foundations/Guidelines") and nested
// one level deeper under each product's name so e.g. OptiLIFT and
// OptiLIGHT's identically-named "brand-color.card.html" don't collide in
// the sidebar or on disk. The *served* path uses a slug() of the product
// name (see staticDirs in .storybook/main.ts, which maps each product's
// real, space-containing folder name to the same slug) — the real
// filesystem path (used for display text and the actual file location)
// keeps the product's real name.
async function generateProductGuidelines(): Promise<number> {
  const productsDir = path.join(root, "products");
  const productNames = await fs
    .readdir(productsDir, { withFileTypes: true })
    .then((entries) =>
      entries.filter((e) => e.isDirectory()).map((e) => e.name),
    )
    .catch(() => []);
  let count = 0;
  for (const product of productNames) {
    const files = await findFiles(
      path.join(productsDir, product, "guidelines"),
      ".card.html",
    );
    for (const file of files) {
      const card = await readDsCard(file);
      if (!card) continue;
      const key = path.basename(file, ".card.html");
      const relSrc = path.relative(root, file).split(path.sep).join("/");
      const publicSrc = `/foundations/products/${slug(product)}/guidelines/${path.basename(file)}`;
      const title = `Products/${product}/${card.name}`;
      await writeGenerated(
        `product-guidelines/${product}/${key}.mdx`,
        guidelineMdx(title, card, relSrc, publicSrc),
      );
      count++;
    }
  }
  return count;
}

function guidelineMdx(
  title: string,
  card: DsCard,
  relSrc: string,
  publicSrc: string,
): string {
  return `import { Meta } from "@storybook/addon-docs/blocks";

<Meta title="${title.replace(/"/g, '\\"')}" />

# ${card.name}

${card.subtitle}

Generated from \`${relSrc}\` — do not edit this file directly, edit the
source instead. Built by \`scripts/build-storybook-content.ts\`.

${iframeBlock(publicSrc, card.w + 40, card.h + 40, card.name)}
`;
}

async function generateStaticUiKit(kit: string): Promise<number> {
  const file = path.join(root, "ui_kits", kit, "index.html");
  const card = await readDsCard(file).catch(() => null);
  if (!card) return 0;
  const title = `Foundations/UI Kits/${card.name}`;
  const mdx = `import { Meta } from "@storybook/addon-docs/blocks";

<Meta title="${title.replace(/"/g, '\\"')}" />

# ${card.name}

${card.subtitle}

Auto-generated from \`ui_kits/${kit}/index.html\` — do not edit this file
directly. Regenerated by \`scripts/build-storybook-content.ts\`.

${iframeBlock(`/foundations/ui_kits/${kit}/index.html`, card.w, card.h, card.name)}
`;
  await writeGenerated(`ui-kits/${kit}.mdx`, mdx);
  return 1;
}

async function generateSlidesDeck(): Promise<number> {
  const dir = path.join(root, "ui_kits", "slides");
  const files = (await findFiles(dir, ".html")).sort();
  const cards: { file: string; card: DsCard }[] = [];
  for (const file of files) {
    const card = await readDsCard(file);
    if (card) cards.push({ file, card });
  }
  if (!cards.length) return 0;
  const title = "Foundations/UI Kits/Slides";
  const body = cards
    .map(({ file, card }) => {
      const name = path.basename(file);
      return `### ${card.name}

${card.subtitle}

${iframeBlock(`/foundations/ui_kits/slides/${name}`, card.w, card.h, card.name)}
`;
    })
    .join("\n");
  const mdx = `import { Meta } from "@storybook/addon-docs/blocks";

<Meta title="${title}" />

# Slides

Auto-generated from \`ui_kits/slides/*.html\` (${cards.length} slides) — do
not edit this file directly. Regenerated by
\`scripts/build-storybook-content.ts\`. Combined into one page,
mirroring how the old scripts/build.mjs site treated \`group="Slides"\` as a
single deck rather than separate nav entries.

${body}`;
  await writeGenerated("ui-kits/slides.mdx", mdx);
  return 1;
}

// Compiles an interactive kit's JSX entry to a bundle.js (esbuild
// classic transform + CDN-global React alias, since every kit page
// loads React from a <script> tag, not a  bundled copy) and writes
// a modified copy of its index.html (babel- standalone placeholder
// swapped for `<script src="./bundle.js">`) into stories/generated/ui-kit-bundles/,
// mirroring the source's full relative path from repo root so every
// relative asset reference inside the app's JSX (product-local assets/,
// shared root assets/, etc.) keeps resolving once staticDirs serves
// this generated copy over the raw source at the same public path.
interface InteractiveKitSpec {
  dir: string;
  entry: string;
  kitTitle: string;
  kitSubtitle: string;
}

async function compileInteractiveKit({
  dir,
  entry,
  kitTitle,
  kitSubtitle,
}: InteractiveKitSpec): Promise<number> {
  if (!(await dirExists(dir))) return 0;
  const relDir = path.relative(root, dir).split(path.sep).join("/");
  const outDirForKit = path.join(bundlesDir, relDir);

  await esbuild.build({
    bundle: true,
    minify: true,
    jsx: "transform",
    jsxFactory: "React.createElement",
    jsxFragment: "React.Fragment",
    logLevel: "silent",
    // React/ReactDOM bundle in from node_modules (each kit is a fully
    // isolated standalone page, so there's no shared-instance concern the
    // way there is for the .dc.html canvas runtime) — define NODE_ENV since
    // react's own package.js branches on it and nothing else polyfills
    // `process` for a browser bundle.
    define: { "process.env.NODE_ENV": '"production"' },
    entryPoints: [path.join(dir, entry)],
    outfile: path.join(outDirForKit, "bundle.js"),
    format: "iife",
  });

  const rawHtml = await fs.readFile(path.join(dir, "index.html"), "utf8");
  const html = rawHtml
    .replace(
      /<script[^>]*src="https:\/\/unpkg\.com\/@babel\/standalone[^"]*"[\s\S]*?><\/script>\n?/,
      "",
    )
    .replace(/<script type="text\/babel" src="[^"]*"><\/script>\n?/g, "")
    .replace(
      /<script type="text\/babel"[^>]*>[\s\S]*?<\/script>/,
      '<script src="./bundle.js"></script>',
    );
  await fs.mkdir(outDirForKit, { recursive: true });
  await fs.writeFile(path.join(outDirForKit, "index.html"), html);

  const publicSrc = `/foundations/${relDir}/index.html`;
  const title = `Foundations/UI Kits/${kitTitle}`;
  const mdx = `import { Meta } from "@storybook/addon-docs/blocks";

<Meta title="${title.replace(/"/g, '\\"')}" />

# ${kitTitle}

${kitSubtitle}

Auto-generated from \`${relDir}\` — the app's JSX itself is untouched;
\`bundle.js\` is compiled fresh each run by
\`scripts/build-storybook-content.ts\` (same esbuild step the old
scripts/build.mjs used) and served over the raw source at this same path.

${iframeBlock(publicSrc, 1440, 900, kitTitle)}
`;
  const slug = kitTitle
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  await writeGenerated(`ui-kits/${slug}.mdx`, mdx);
  return 1;
}

async function main() {
  await fs.rm(outDir, { recursive: true, force: true });
  const guidelineCount =
    (await generateGuidelines()) + (await generateProductGuidelines());
  const kitCount =
    (await generateStaticUiKit("social")) +
    (await generateStaticUiKit("email")) +
    (await generateSlidesDeck()) +
    (await compileInteractiveKit({
      dir: path.join(root, "ui_kits/corporate-website"),
      entry: "CorporateApp.tsx",
      kitTitle: "Corporate Website",
      kitSubtitle: "Home, product detail and contact — click-through",
    })) +
    (await compileInteractiveKit({
      dir: path.join(root, "products/OptiLIFT/ui_kit/website"),
      entry: "OptiLiftApp.tsx",
      kitTitle: "OptiLIFT Website",
      kitSubtitle: "Patient-facing marketing site, by Lumenis",
    })) +
    (await compileInteractiveKit({
      dir: path.join(root, "products/OptiLIGHT/ui_kit/website"),
      entry: "OptiLightApp.tsx",
      kitTitle: "OptiLIGHT Website",
      kitSubtitle: "Rays, prism, tabs, accordion, modal — full marketing site",
    }));
  console.log(
    `[build-storybook-content] wrote ${guidelineCount} guideline page(s), ${kitCount} ui-kit page(s) to stories/generated/`,
  );
}

if (path.resolve(process.argv[1] ?? "") === fileURLToPath(import.meta.url)) {
  await main();
}
