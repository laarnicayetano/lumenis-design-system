// Shared helpers for one-off code mods. A code mod itself is a disposable
// script in scripts/ (e.g. scripts/convert-guidelines-to-html.ts) — this file
// holds the parts that are genuinely reusable across mods, so each new mod
// only has to write the transform that's actually specific to it.
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import * as esbuild from 'esbuild';

/** Recursively list every file under `dir` whose path ends with `matchExt`. */
export async function findFiles(dir: string, matchExt: string): Promise<string[]> {
  const out: string[] = [];
  async function walk(d: string) {
    for (const entry of await fs.readdir(d, { withFileTypes: true })) {
      const p = path.join(d, entry.name);
      if (entry.isDirectory()) await walk(p);
      else if (p.endsWith(matchExt)) out.push(p);
    }
  }
  await walk(dir);
  return out.sort();
}

/**
 * Bundle a single .ts/.tsx file standalone with esbuild and import it, so a
 * mod can read a module's exports (metadata, a default-exported component,
 * etc.) without a full project build. Same approach scripts/build.ts and the
 * generate-cards skill already use: esbuild bundles to a temp .mjs written
 * inside the repo (not os.tmpdir()) so bare `import 'react'` resolves against
 * this project's node_modules, then it's imported and deleted.
 */
export async function bundleAndImportModule(root: string, file: string): Promise<Record<string, unknown>> {
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
  const tmpDir = path.join(root, '.build-tmp');
  await fs.mkdir(tmpDir, { recursive: true });
  const tmpFile = path.join(tmpDir, `code-mod-${process.pid}-${Math.random().toString(36).slice(2)}.mjs`);
  await fs.writeFile(tmpFile, result.outputFiles[0].text);
  try {
    return (await import(pathToFileURL(tmpFile).href)) as Record<string, unknown>;
  } finally {
    await fs.unlink(tmpFile);
  }
}

/**
 * Parse a flat CSS text of simple single-level rules (`.name{decl;decl}`, no
 * nesting, no media queries) into a map of class name -> declaration text.
 * Good enough for the small hand-written utility stylesheets used in this
 * repo's guideline/component specimens — not a general CSS parser.
 */
export function parseCssRules(css: string): Map<string, string> {
  const map = new Map<string, string>();
  for (const m of css.matchAll(/\.([a-zA-Z0-9_-]+)\{([^}]*)\}/g)) {
    const [, name, decl] = m;
    const cleaned = decl.replace(/;$/, '').trim();
    map.set(name, map.has(name) ? `${map.get(name)};${cleaned}` : cleaned);
  }
  return map;
}

/**
 * Given HTML that references classes from `classCss` (as produced by
 * parseCssRules), strip every <style> block and rewrite each element that
 * uses one of those classes to carry the equivalent inline `style="..."`
 * instead, merging with any style attribute already on that element (class
 * rules first, so an existing inline style still wins on overlapping
 * properties — the same precedence a real stylesheet would give it).
 * Elements whose class isn't in `classCss` are left alone.
 */
export function inlineClassesToStyle(html: string, classCss: Map<string, string>): string {
  html = html.replace(/<style>[\s\S]*?<\/style>/g, '');
  return html.replace(/<([a-zA-Z][a-zA-Z0-9]*)((?:\s+[a-zA-Z0-9-:]+(?:="[^"]*")?)*)(\s*\/?)>/g, (full, tag, attrs, selfClose) => {
    const classMatch = attrs.match(/\sclass="([^"]*)"/);
    if (!classMatch) return full;
    const classNames = classMatch[1].split(/\s+/).filter(Boolean);
    const classStyles = classNames.map((c: string) => classCss.get(c)).filter(Boolean).join(';');
    if (!classStyles) return full;
    const styleMatch = attrs.match(/\sstyle="([^"]*)"/);
    const existingStyle = styleMatch ? styleMatch[1].replace(/;$/, '') : '';
    const mergedStyle = existingStyle ? `${classStyles};${existingStyle}` : classStyles;
    let newAttrs = attrs.replace(/\sclass="[^"]*"/, '');
    newAttrs = styleMatch ? newAttrs.replace(/\sstyle="[^"]*"/, ` style="${mergedStyle}"`) : `${newAttrs} style="${mergedStyle}"`;
    return `<${tag}${newAttrs}${selfClose}>`;
  });
}

/** Escape a string for safe use inside a double-quoted HTML attribute. */
export function escapeAttr(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
}
