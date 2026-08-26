// One-off code mod: converts ui_kits/**/*.tsx (TypeScript + JSX) into plain
// .jsx (JSX compiled to React.createElement calls, all TS syntax stripped),
// matching the format already used for components/**/*.jsx — see
// scripts/convert-components-to-jsx.ts. Real import/export statements are
// kept as-is (App/Hero/Footer/etc. compose each other via real ES imports,
// and this repo's own esbuild build still bundles each kit's App entry).
// No .d.ts is extracted here — unlike components/, ui_kits/ has no existing
// per-file .d.ts convention to preserve. See .claude/skills/code-mods/SKILL.md.
import * as esbuild from 'esbuild';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const uiKitsDir = path.join(root, 'ui_kits');

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

/** Strips TypeScript syntax and compiles JSX to React.createElement calls,
 * keeping import/export statements untouched (single-file transform, not a
 * bundle — esbuild doesn't rewrite module specifiers here). */
async function toJsx(source, fileName) {
  const result = await esbuild.transform(source, {
    loader: 'tsx',
    sourcefile: fileName,
    jsx: 'transform',
    jsxFactory: 'React.createElement',
    jsxFragment: 'React.Fragment',
    target: 'esnext',
  });
  let code = result.code.replace(/\/\* @__PURE__ \*\/ ?/g, '');
  if (/^import React\b/m.test(code)) return code;
  if (/^import \{([^}]*)\}\s*from ['"]react['"];?/m.test(code)) {
    return code.replace(/^import \{([^}]*)\}\s*from ['"]react['"];?/m, `import React, {$1} from 'react';`);
  }
  return `import React from 'react';\n${code}`;
}

async function convertFile(file) {
  const source = await fs.readFile(file, 'utf8');
  const jsx = await toJsx(source, file);
  const dir = path.dirname(file);
  const base = path.basename(file, '.tsx');
  await fs.writeFile(path.join(dir, `${base}.jsx`), jsx);
  await fs.unlink(file);
}

async function run() {
  const files = await findFiles(uiKitsDir, '.tsx');
  for (const file of files) {
    await convertFile(file);
    console.log(`  ${path.relative(root, file)}`);
  }
  execSync('npx prettier --write "ui_kits/**/*.jsx" --print-width 100', { cwd: root, stdio: 'inherit' });
  console.log(`Converted ${files.length} ui_kit file(s) to .jsx.`);
}

await run();
