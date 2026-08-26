import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ReactDOMServer from "react-dom/server";
import {
  bundleAndImportModule,
  findFiles,
  parseCssRules,
  inlineClassesToStyle,
  escapeAttr,
} from "../.claude/skills/code-mods/helpers.mjs";
const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const guidelinesDir = path.join(root, "guidelines");
async function convertFile(file) {
  const mod = await bundleAndImportModule(root, file);
  const card = mod.card;
  const Component = mod.default;
  let html = ReactDOMServer.renderToStaticMarkup(Component());
  const styleText = [...html.matchAll(/<style>([\s\S]*?)<\/style>/g)]
    .map((m) => m[1])
    .join("\n");
  const classCss = parseCssRules(styleText);
  html = inlineClassesToStyle(html, classCss);
  html = html.replace(/(["(])assets\//g, "$1../assets/");
  const [w, h] = card.viewport;
  const comment = `<!-- @dsCard group="${escapeAttr(card.group)}" viewport="${w}x${h}" name="${escapeAttr(card.name)}" subtitle="${escapeAttr(card.subtitle)}" -->`;
  return `${comment}
<link rel="stylesheet" href="../styles.css">
${html}
`;
}
async function run() {
  const files = await findFiles(guidelinesDir, ".tsx");
  for (const file of files) {
    const out = await convertFile(file);
    const slug = path.basename(file, ".tsx");
    const outFile = path.join(guidelinesDir, `${slug}.card.html`);
    await fs.writeFile(outFile, out);
    await fs.unlink(file);
    console.log(`  ${slug}.tsx  \u2192  ${slug}.card.html`);
  }
  const sharedFile = path.join(guidelinesDir, "_shared.ts");
  await fs.unlink(sharedFile).then(
    () => console.log("  removed guidelines/_shared.ts (no longer used)"),
    () => {},
  );
  await fs.rm(path.join(root, ".build-tmp"), { recursive: true, force: true });
  console.log(`Converted ${files.length} guideline(s) to static HTML.`);
}

run();
