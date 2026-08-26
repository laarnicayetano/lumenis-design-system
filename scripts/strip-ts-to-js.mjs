// One-off code mod: strips TypeScript syntax from plain (non-JSX) .ts files
// and writes the result under a new extension — .mjs for files invoked
// directly via `node <file>` (build scripts, one-off code mods), .js for
// files that are only ever esbuild entries/modules (never run by node
// directly). Removing TypeScript project-wide so nothing in this repo can
// ever again be swept and killed by a naive `.ts`/`.tsx`-extension-based
// external compiler (see the Claude Design shebang/unresolvable-import bug).
import * as esbuild from "esbuild";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

const FILES = [
  ["scripts/build.ts", "mjs"],
  ["scripts/dev.ts", "mjs"],
  ["scripts/convert-components-to-jsx.ts", "mjs"],
  ["scripts/convert-guidelines-to-html.ts", "mjs"],
  ["scripts/convert-specimens-to-card-html.ts", "mjs"],
  [".claude/skills/code-mods/helpers.ts", "mjs"],
  ["build/design-system-entry.ts", "js"],
  ["build/react-global-shim.ts", "js"],
  ["build/react-dom-global-shim.ts", "js"],
  ["components/index.ts", "js"],
];

async function toJs(source, fileName) {
  const result = await esbuild.transform(source, {
    loader: "ts",
    sourcefile: fileName,
    target: "esnext",
  });
  return result.code.replace(/\/\* @__PURE__ \*\/ ?/g, "");
}

async function run() {
  for (const [rel, ext] of FILES) {
    const file = path.join(root, rel);
    const source = await fs.readFile(file, "utf8");
    const js = await toJs(source, file);
    const outFile = file.replace(/\.ts$/, `.${ext}`);
    await fs.writeFile(outFile, js);
    await fs.unlink(file);
    console.log(`  ${rel} -> ${path.relative(root, outFile)}`);
  }
  console.log(`Converted ${FILES.length} file(s).`);
}

run();
