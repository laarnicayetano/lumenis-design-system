// One-off code mod: converts ui_kits/**/*.tsx (TypeScript + JSX) into plain
// .jsx (JSX compiled to React.createElement calls, all TS syntax stripped),
// matching the format already used for components/**/*.jsx — see
// scripts/convert-components-to-jsx.ts. Real import/export statements are
// kept as-is (App/Hero/Footer/etc. compose each other via real ES imports,
// and this repo's own esbuild build still bundles each kit's App entry).
// No .d.ts is extracted here — unlike components/, ui_kits/ has no existing
// per-file .d.ts convention to preserve. See .claude/skills/code-mods/SKILL.md.
import { promises as fs } from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { findFiles, toJsx } from "../.claude/skills/code-mods/helpers.mjs";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const uiKitsDir = path.join(root, "ui_kits");

async function convertFile(file) {
  const source = await fs.readFile(file, "utf8");
  const jsx = await toJsx(source, file);
  const dir = path.dirname(file);
  const base = path.basename(file, ".tsx");
  await fs.writeFile(path.join(dir, `${base}.jsx`), jsx);
  await fs.unlink(file);
}

async function run() {
  const files = await findFiles(uiKitsDir, ".tsx");
  for (const file of files) {
    await convertFile(file);
    console.log(`  ${path.relative(root, file)}`);
  }
  execSync('npx prettier --write "ui_kits/**/*.jsx" --print-width 100', {
    cwd: root,
    stdio: "inherit",
  });
  console.log(`Converted ${files.length} ui_kit file(s) to .jsx.`);
}

run();
