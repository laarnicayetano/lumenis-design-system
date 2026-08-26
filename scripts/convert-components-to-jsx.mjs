import ts from "typescript";
import * as esbuild from "esbuild";
import { promises as fs } from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { findFiles } from "../.claude/skills/code-mods/helpers.ts";
const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const componentsDir = path.join(root, "components");
function isExported(stmt) {
  return !!ts.canHaveModifiers(stmt) && !!ts.getModifiers(stmt)?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword);
}
function extractDts(source, fileName) {
  const sourceFile = ts.createSourceFile(fileName, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const parts = [];
  for (const stmt of sourceFile.statements) {
    if (!isExported(stmt)) continue;
    if (ts.isInterfaceDeclaration(stmt) || ts.isTypeAliasDeclaration(stmt)) {
      parts.push(stmt.getFullText(sourceFile).trim());
    } else if (ts.isFunctionDeclaration(stmt) && stmt.name) {
      const param = stmt.parameters[0];
      const propsType = param?.type ? param.type.getText(sourceFile) : "Record<string, unknown>";
      parts.push(`export function ${stmt.name.text}(props: ${propsType}): JSX.Element;`);
    }
  }
  return parts.join("\n\n") + "\n";
}
async function toJsx(source, fileName) {
  const result = await esbuild.transform(source, {
    loader: "tsx",
    sourcefile: fileName,
    jsx: "transform",
    jsxFactory: "React.createElement",
    jsxFragment: "React.Fragment",
    target: "esnext"
  });
  let code = result.code.replace(/\/\* @__PURE__ \*\/ ?/g, "");
  if (/^import React\b/m.test(code)) return code;
  if (/^import \{([^}]*)\}\s*from ['"]react['"];?/m.test(code)) {
    return code.replace(/^import \{([^}]*)\}\s*from ['"]react['"];?/m, `import React, {$1} from 'react';`);
  }
  return `import React from 'react';
${code}`;
}
async function convertFile(file) {
  const source = await fs.readFile(file, "utf8");
  const dts = extractDts(source, file);
  const jsx = await toJsx(source, file);
  const dir = path.dirname(file);
  const base = path.basename(file, ".tsx");
  await fs.writeFile(path.join(dir, `${base}.jsx`), jsx);
  if (dts.trim()) await fs.writeFile(path.join(dir, `${base}.d.ts`), dts);
  await fs.unlink(file);
}
async function run() {
  const files = (await findFiles(componentsDir, ".tsx")).filter((f) => !f.endsWith(".specimen.tsx"));
  for (const file of files) {
    await convertFile(file);
    console.log(`  ${path.relative(root, file)}`);
  }
  execSync('npx prettier --write "components/**/*.jsx" --print-width 100', { cwd: root, stdio: "inherit" });
  console.log(`Converted ${files.length} component(s) to .jsx + .d.ts.`);
}
await run();
