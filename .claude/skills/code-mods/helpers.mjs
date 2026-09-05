import { promises as fs } from "node:fs";
import { execSync } from "node:child_process";
import path from "node:path";
import { pathToFileURL } from "node:url";
import * as esbuild from "esbuild";
import ts from "typescript";

// Repo root via git rather than counting `path.dirname()` calls off
// `import.meta.url` — immune to a mod script moving between scripts/ and
// scripts/migrations/ (which broke that arithmetic for older mods still
// kept around for reference).
export function getRepoRoot() {
  return execSync("git rev-parse --show-toplevel").toString().trim();
}

// Git-tracked files matching a pathspec/glob, relative to repo root.
// e.g. gitLsFiles("components/*/*/*.prompt.md")
export function gitLsFiles(pattern, { cwd = getRepoRoot() } = {}) {
  return execSync(`git ls-files '${pattern}'`, { cwd })
    .toString()
    .trim()
    .split("\n")
    .filter(Boolean);
}

// Files whose content matches an extended regex, via `git grep` (fast,
// respects .gitignore). `excludePathspecs` are pathspec exclusions, e.g.
// ["node_modules", "package-lock.json"].
export function gitGrepFiles(
  pattern,
  { cwd = getRepoRoot(), excludePathspecs = [] } = {},
) {
  const excludes = excludePathspecs.map((p) => `':!${p}'`).join(" ");
  try {
    return execSync(`git grep -lIE "${pattern}" -- . ${excludes}`, { cwd })
      .toString()
      .trim()
      .split("\n")
      .filter(Boolean);
  } catch (e) {
    if (e.status === 1) return []; // grep found no matches
    throw e;
  }
}

// Run prettier over a glob the same way the build-time scripts do, so a
// mod's output matches the repo's formatting instead of needing a
// hand-tuned diff.
export function prettierWrite(root, glob, { printWidth = 100 } = {}) {
  execSync(`npx prettier --write "${glob}" --print-width ${printWidth}`, {
    cwd: root,
    stdio: "inherit",
  });
}

// The `<!-- @dsCard ... -->` marker line shared by every guideline/ui_kit/
// component card — see CLAUDE.md and check-cards.mjs for the convention.
// `card` is `{ group, name, subtitle, viewport: [w, h] }`.
export function dsCardComment(card) {
  const [w, h] = card.viewport;
  return `<!-- @dsCard group="${escapeAttr(card.group)}" viewport="${w}x${h}" name="${escapeAttr(card.name)}" subtitle="${escapeAttr(card.subtitle)}" -->`;
}

// Reads a TS object literal AST node into a plain JS object, for pulling
// small hardcoded metadata (a `card = {...}` block, config-like literals)
// out of source without bundling/executing it. Only handles literal
// values (strings, numbers, arrays of either) — anything else (spreads,
// computed keys, expressions) is silently skipped, so check the result
// has the keys you expect.
export function evalObjectLiteral(node) {
  const out = {};
  for (const prop of node.properties) {
    if (!ts.isPropertyAssignment(prop) || !prop.name) continue;
    const key = prop.name.getText();
    let expr = prop.initializer;
    if (ts.isAsExpression(expr)) expr = expr.expression;
    if (ts.isStringLiteral(expr)) out[key] = expr.text;
    else if (ts.isNumericLiteral(expr)) out[key] = Number(expr.text);
    else if (ts.isArrayLiteralExpression(expr))
      out[key] = expr.elements.map((e) =>
        ts.isStringLiteral(e) ? e.text : Number(e.getText()),
      );
  }
  return out;
}

// Inserts a new line as the first entry inside an object literal, found by
// scanning for `marker` (e.g. "parameters: {") and brace-depth-matching to
// its close — safer than a single-line regex when the literal may already
// span multiple lines. Returns null if `marker` isn't found. `propertyLine`
// should NOT include its own leading newline/indentation (added here).
export function insertIntoObjectLiteral(source, marker, propertyLine) {
  const markerIdx = source.indexOf(marker);
  if (markerIdx === -1) return null;
  const braceStart = source.indexOf("{", markerIdx);
  let depth = 0;
  let i = braceStart;
  for (; i < source.length; i++) {
    if (source[i] === "{") depth++;
    else if (source[i] === "}") {
      depth--;
      if (depth === 0) break;
    }
  }
  const inner = source.slice(braceStart + 1, i);
  const newInner = `\n${propertyLine}${inner}`;
  return source.slice(0, braceStart + 1) + newInner + source.slice(i);
}

export async function findFiles(dir, matchExt) {
  const out = [];
  async function walk(d) {
    for (const entry of await fs.readdir(d, { withFileTypes: true })) {
      const p = path.join(d, entry.name);
      if (entry.isDirectory()) await walk(p);
      else if (p.endsWith(matchExt)) out.push(p);
    }
  }
  await walk(dir);
  return out.sort();
}
export async function bundleAndImportModule(root, file) {
  const result = await esbuild.build({
    entryPoints: [file],
    bundle: true,
    write: false,
    format: "esm",
    platform: "node",
    jsx: "automatic",
    external: ["react", "react/jsx-runtime", "react-dom", "react-dom/server"],
    logLevel: "silent",
  });
  const tmpDir = path.join(root, ".build-tmp");
  await fs.mkdir(tmpDir, { recursive: true });
  const tmpFile = path.join(
    tmpDir,
    `code-mod-${process.pid}-${Math.random().toString(36).slice(2)}.mjs`,
  );
  await fs.writeFile(tmpFile, result.outputFiles[0].text);
  try {
    return await import(pathToFileURL(tmpFile).href);
  } finally {
    await fs.unlink(tmpFile);
  }
}
export function parseCssRules(css) {
  const map = new Map();
  for (const m of css.matchAll(/\.([a-zA-Z0-9_-]+)\{([^}]*)\}/g)) {
    const [, name, decl] = m;
    const cleaned = decl.replace(/;$/, "").trim();
    map.set(name, map.has(name) ? `${map.get(name)};${cleaned}` : cleaned);
  }
  return map;
}
export function inlineClassesToStyle(html, classCss) {
  html = html.replace(/<style>[\s\S]*?<\/style>/g, "");
  return html.replace(
    /<([a-zA-Z][a-zA-Z0-9]*)((?:\s+[a-zA-Z0-9-:]+(?:="[^"]*")?)*)(\s*\/?)>/g,
    (full, tag, attrs, selfClose) => {
      const classMatch = attrs.match(/\sclass="([^"]*)"/);
      if (!classMatch) return full;
      const classNames = classMatch[1].split(/\s+/).filter(Boolean);
      const classStyles = classNames
        .map((c) => classCss.get(c))
        .filter(Boolean)
        .join(";");
      if (!classStyles) return full;
      const styleMatch = attrs.match(/\sstyle="([^"]*)"/);
      const existingStyle = styleMatch ? styleMatch[1].replace(/;$/, "") : "";
      const mergedStyle = existingStyle
        ? `${classStyles};${existingStyle}`
        : classStyles;
      let newAttrs = attrs.replace(/\sclass="[^"]*"/, "");
      newAttrs = styleMatch
        ? newAttrs.replace(/\sstyle="[^"]*"/, ` style="${mergedStyle}"`)
        : `${newAttrs} style="${mergedStyle}"`;
      return `<${tag}${newAttrs}${selfClose}>`;
    },
  );
}
export function escapeAttr(s) {
  return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}
// AST-based React.createElement(...) call-tree -> real JSX converter.
// Shared by any mod that needs to turn createElement-authored source into
// plain JSX tags (first used to convert the interactive ui_kit apps, then
// the remaining components/**/*.tsx files still written this way).
function isIdent(node, text) {
  return ts.isIdentifier(node) && node.text === text;
}

function isReactCreateElementCall(node) {
  if (!ts.isCallExpression(node)) return false;
  const expr = node.expression;
  return (
    ts.isPropertyAccessExpression(expr) &&
    isIdent(expr.expression, "React") &&
    isIdent(expr.name, "createElement")
  );
}

function isReactFragmentRef(node) {
  return (
    ts.isPropertyAccessExpression(node) &&
    isIdent(node.expression, "React") &&
    isIdent(node.name, "Fragment")
  );
}

// The `type` argument -> a JSX tag name expression.
function tagNameFromType(typeArg) {
  if (ts.isStringLiteral(typeArg)) return ts.factory.createIdentifier(typeArg.text);
  if (isReactFragmentRef(typeArg))
    return ts.factory.createPropertyAccessExpression(
      ts.factory.createIdentifier("React"),
      "Fragment",
    );
  if (ts.isIdentifier(typeArg)) return ts.factory.createIdentifier(typeArg.text);
  throw new Error("Unsupported createElement type argument: " + typeArg.getText());
}

const JSX_UNSAFE_CHARS = /[<>{}]/;

function jsxAttributesFromProps(propsArg) {
  if (!propsArg || propsArg.kind === ts.SyntaxKind.NullKeyword) {
    return ts.factory.createJsxAttributes([]);
  }
  if (!ts.isObjectLiteralExpression(propsArg)) {
    // Non-literal props (none observed in these files, but stay correct):
    // spread the whole expression onto the element.
    return ts.factory.createJsxAttributes([
      ts.factory.createJsxSpreadAttribute(propsArg),
    ]);
  }
  const attrs = propsArg.properties.map((prop) => {
    if (ts.isSpreadAssignment(prop)) {
      return ts.factory.createJsxSpreadAttribute(prop.expression);
    }
    if (ts.isShorthandPropertyAssignment(prop)) {
      return ts.factory.createJsxAttribute(
        ts.factory.createIdentifier(prop.name.text),
        ts.factory.createJsxExpression(undefined, ts.factory.createIdentifier(prop.name.text)),
      );
    }
    if (!ts.isPropertyAssignment(prop)) {
      throw new Error("Unsupported prop kind: " + ts.SyntaxKind[prop.kind]);
    }
    const name = ts.isStringLiteral(prop.name) ? prop.name.text : prop.name.getText();
    const value = prop.initializer;
    if (value.kind === ts.SyntaxKind.TrueKeyword) {
      return ts.factory.createJsxAttribute(ts.factory.createIdentifier(name), undefined);
    }
    if (ts.isStringLiteral(value)) {
      return ts.factory.createJsxAttribute(
        ts.factory.createIdentifier(name),
        ts.factory.createStringLiteral(value.text),
      );
    }
    return ts.factory.createJsxAttribute(
      ts.factory.createIdentifier(name),
      ts.factory.createJsxExpression(undefined, value),
    );
  });
  return ts.factory.createJsxAttributes(attrs);
}

function isJsxNode(node) {
  return ts.isJsxElement(node) || ts.isJsxSelfClosingElement(node) || ts.isJsxFragment(node);
}

function jsxChildFromArg(arg) {
  if (isJsxNode(arg)) return arg;
  if (ts.isStringLiteral(arg) && !JSX_UNSAFE_CHARS.test(arg.text)) {
    return ts.factory.createJsxText(arg.text, false);
  }
  return ts.factory.createJsxExpression(undefined, arg);
}

function createElementCallToJsx(call) {
  const [typeArg, propsArg, ...childArgs] = call.arguments;
  const tagName = tagNameFromType(typeArg);
  const isFragment = ts.isPropertyAccessExpression(tagName) && tagName.name.text === "Fragment";
  const attributes = jsxAttributesFromProps(propsArg);
  const children = childArgs.map(jsxChildFromArg);

  if (isFragment && attributes.properties.length === 0) {
    return ts.factory.createJsxFragment(
      ts.factory.createJsxOpeningFragment(),
      children,
      ts.factory.createJsxClosingFragment(),
    );
  }
  if (children.length === 0) {
    return ts.factory.createJsxSelfClosingElement(tagName, undefined, attributes);
  }
  return ts.factory.createJsxElement(
    ts.factory.createJsxOpeningElement(tagName, undefined, attributes),
    children,
    ts.factory.createJsxClosingElement(tagName),
  );
}

function makeCreateElementToJsxTransformer(context) {
  const visit = (node) => {
    const visited = ts.visitEachChild(node, visit, context);
    if (isReactCreateElementCall(visited)) {
      return createElementCallToJsx(visited);
    }
    return visited;
  };
  return (sourceFile) => ts.visitNode(sourceFile, visit);
}

// Parses `source` as TSX, rewrites every React.createElement(...) call tree
// into real JSX, and returns the printed result. Pure - no file I/O, so
// callers decide whether to write in place or to a renamed/new path.
export function createElementToJsx(source, fileName) {
  const sourceFile = ts.createSourceFile(
    fileName,
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );
  const result = ts.transform(sourceFile, [makeCreateElementToJsxTransformer]);
  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
  const printed = printer.printFile(result.transformed[0]);
  result.dispose();
  return printed;
}

export async function toJsx(source, fileName) {
  const result = await esbuild.transform(source, {
    loader: "tsx",
    sourcefile: fileName,
    jsx: "transform",
    jsxFactory: "React.createElement",
    jsxFragment: "React.Fragment",
    target: "esnext",
  });
  let code = result.code.replace(/\/\* @__PURE__ \*\/ ?/g, "");
  if (/^import React\b/m.test(code)) return code;
  if (/^import \{([^}]*)\}\s*from ['"]react['"];?/m.test(code)) {
    return code.replace(
      /^import \{([^}]*)\}\s*from ['"]react['"];?/m,
      `import React, {$1} from 'react';`,
    );
  }
  return `import React from 'react';\n${code}`;
}
