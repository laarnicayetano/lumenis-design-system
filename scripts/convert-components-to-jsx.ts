#!/usr/bin/env node
// One-off code mod: converts components/**/ComponentName.tsx (TypeScript +
// JSX) into a ComponentName.jsx (plain JS, JSX compiled to
// React.createElement calls) + ComponentName.d.ts (the extracted prop
// types) pair, matching the format Claude Design originally provided (see
// input/forms/*.jsx, *.d.ts). Real import/export statements are kept as-is
// — several components compose others (Headline -> HeroL, SiteHeader ->
// Logotype + TextLink, every ui_kit -> 10+ components), so dropping imports
// would break composition and this repo's own esbuild build. Output is
// prettier-formatted, never minified. See .claude/skills/code-mods/SKILL.md.
import ts from 'typescript';
import * as esbuild from 'esbuild';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { findFiles } from '../.claude/skills/code-mods/helpers.ts';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const componentsDir = path.join(root, 'components');

function isExported(stmt: ts.Statement): boolean {
  return !!ts.canHaveModifiers(stmt) && !!ts.getModifiers(stmt)?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword);
}

/** Pulls every exported interface/type-alias (verbatim, comments included)
 * and every exported component function's signature out of a .tsx file, to
 * write as ComponentName.d.ts. */
function extractDts(source: string, fileName: string): string {
  const sourceFile = ts.createSourceFile(fileName, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const parts: string[] = [];
  for (const stmt of sourceFile.statements) {
    if (!isExported(stmt)) continue;
    if (ts.isInterfaceDeclaration(stmt) || ts.isTypeAliasDeclaration(stmt)) {
      parts.push(stmt.getFullText(sourceFile).trim());
    } else if (ts.isFunctionDeclaration(stmt) && stmt.name) {
      const param = stmt.parameters[0];
      const propsType = param?.type ? param.type.getText(sourceFile) : 'Record<string, unknown>';
      parts.push(`export function ${stmt.name.text}(props: ${propsType}): JSX.Element;`);
    }
  }
  return parts.join('\n\n') + '\n';
}

/** Strips TypeScript syntax and compiles JSX to React.createElement calls,
 * keeping import/export statements untouched (single-file transform, not a
 * bundle — esbuild doesn't rewrite module specifiers here). */
async function toJsx(source: string, fileName: string): Promise<string> {
  const result = await esbuild.transform(source, {
    loader: 'tsx',
    sourcefile: fileName,
    jsx: 'transform',
    jsxFactory: 'React.createElement',
    jsxFragment: 'React.Fragment',
    target: 'esnext',
  });
  // Leaving `format` unset keeps esbuild from rewriting `export function X`
  // into `function X` + a trailing `export { X }` — matches the inline
  // `export function` style the reference examples use. Tree-shaking hints
  // like this are meaningless for hand-authored source, so drop them too.
  let code = result.code.replace(/\/\* @__PURE__ \*\/ ?/g, '');
  // React.createElement calls need React in scope even for files that only
  // ever used the automatic JSX runtime (no explicit React import before).
  if (/^import React\b/m.test(code)) return code;
  if (/^import \{([^}]*)\}\s*from ['"]react['"];?/m.test(code)) {
    return code.replace(/^import \{([^}]*)\}\s*from ['"]react['"];?/m, `import React, {$1} from 'react';`);
  }
  return `import React from 'react';\n${code}`;
}

async function convertFile(file: string) {
  const source = await fs.readFile(file, 'utf8');
  const dts = extractDts(source, file);
  const jsx = await toJsx(source, file);

  const dir = path.dirname(file);
  const base = path.basename(file, '.tsx');
  await fs.writeFile(path.join(dir, `${base}.jsx`), jsx);
  if (dts.trim()) await fs.writeFile(path.join(dir, `${base}.d.ts`), dts);
  await fs.unlink(file);
}

async function run() {
  const files = (await findFiles(componentsDir, '.tsx')).filter((f) => !f.endsWith('.specimen.tsx'));
  for (const file of files) {
    await convertFile(file);
    console.log(`  ${path.relative(root, file)}`);
  }
  execSync('npx prettier --write "components/**/*.jsx" --print-width 100', { cwd: root, stdio: 'inherit' });
  console.log(`Converted ${files.length} component(s) to .jsx + .d.ts.`);
}

await run();
