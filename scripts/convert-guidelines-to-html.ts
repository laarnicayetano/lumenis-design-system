#!/usr/bin/env node
// One-off code mod: converts guidelines/*.tsx (React + esbuild + SSR) back
// to plain static .card.html — no TypeScript, no JSX, no build step. Format
// matches input/*.card.html: an @dsCard comment, a relative stylesheet link,
// then a bare HTML fragment with every style inlined (no classes, no <style>
// blocks). See .claude/skills/code-mods/SKILL.md for the shared helpers used
// here. Disposable — rerun only if more guidelines are added in .tsx form
// before this mod, which shouldn't happen once guidelines/ is HTML-only.
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ReactDOMServer from 'react-dom/server';
import { bundleAndImportModule, findFiles, parseCssRules, inlineClassesToStyle, escapeAttr } from '../.claude/skills/code-mods/helpers.ts';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const guidelinesDir = path.join(root, 'guidelines');

interface Card {
  group: string;
  viewport: [number, number];
  name: string;
  subtitle: string;
}

async function convertFile(file: string): Promise<string> {
  const mod = await bundleAndImportModule(root, file);
  const card = mod.card as Card;
  const Component = mod.default as () => unknown;

  let html = ReactDOMServer.renderToStaticMarkup(Component() as never);

  // Collect every <style>{...}</style> block's rules (e.g. the shared
  // SWATCH_CSS import, plus any file-specific extra rules concatenated onto
  // it) into a class -> declaration map, then inline them and drop the tags.
  const styleText = [...html.matchAll(/<style>([\s\S]*?)<\/style>/g)].map((m) => m[1]).join('\n');
  const classCss = parseCssRules(styleText);
  html = inlineClassesToStyle(html, classCss);

  // guidelines/*.card.html sits one directory below root, same depth as the
  // .tsx source did when read via <base href="../">. Without a <base> tag in
  // this plain-HTML format, root-relative asset paths need the ../ spelled
  // out — in both src="..." attributes and inline url(...) backgrounds.
  html = html.replace(/(["(])assets\//g, '$1../assets/');

  const [w, h] = card.viewport;
  const comment = `<!-- @dsCard group="${escapeAttr(card.group)}" viewport="${w}x${h}" name="${escapeAttr(card.name)}" subtitle="${escapeAttr(card.subtitle)}" -->`;
  return `${comment}\n<link rel="stylesheet" href="../styles.css">\n${html}\n`;
}

async function run() {
  const files = await findFiles(guidelinesDir, '.tsx');
  for (const file of files) {
    const out = await convertFile(file);
    const slug = path.basename(file, '.tsx');
    const outFile = path.join(guidelinesDir, `${slug}.card.html`);
    await fs.writeFile(outFile, out);
    await fs.unlink(file);
    console.log(`  ${slug}.tsx  →  ${slug}.card.html`);
  }

  // _shared.ts (the extracted SWATCH_CSS string) has no .tsx importer left.
  const sharedFile = path.join(guidelinesDir, '_shared.ts');
  await fs.unlink(sharedFile).then(
    () => console.log('  removed guidelines/_shared.ts (no longer used)'),
    () => {}
  );

  await fs.rm(path.join(root, '.build-tmp'), { recursive: true, force: true });
  console.log(`Converted ${files.length} guideline(s) to static HTML.`);
}

await run();
