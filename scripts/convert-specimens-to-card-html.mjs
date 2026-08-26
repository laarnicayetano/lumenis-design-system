import ts from "typescript";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { findFiles, escapeAttr } from "../.claude/skills/code-mods/helpers.ts";
const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const componentsDir = path.join(root, "components");
const REACT = "18.3.1";
const PHOSPHOR = "2.1.1";
function evalObjectLiteral(node) {
  const out = {};
  for (const prop of node.properties) {
    if (!ts.isPropertyAssignment(prop) || !prop.name) continue;
    const key = prop.name.getText();
    let expr = prop.initializer;
    if (ts.isAsExpression(expr)) expr = expr.expression;
    if (ts.isStringLiteral(expr)) out[key] = expr.text;
    else if (ts.isArrayLiteralExpression(expr)) out[key] = expr.elements.map((e) => Number(e.getText()));
  }
  return out;
}
async function convertFile(file) {
  const source = await fs.readFile(file, "utf8");
  const sourceFile = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  let componentNames = [];
  let card;
  const preamble = [];
  let demoBody = "";
  for (const stmt of sourceFile.statements) {
    if (ts.isImportDeclaration(stmt)) {
      const clause = stmt.importClause;
      if (clause?.namedBindings && ts.isNamedImports(clause.namedBindings)) {
        componentNames = clause.namedBindings.elements.map((e) => e.name.text);
      }
    } else if (ts.isVariableStatement(stmt) && stmt.declarationList.declarations[0]?.name.getText() === "card") {
      const init = stmt.declarationList.declarations[0].initializer;
      if (init && ts.isObjectLiteralExpression(init)) card = evalObjectLiteral(init);
    } else if (ts.isFunctionDeclaration(stmt) && stmt.name?.text.endsWith("Specimen")) {
      const body = stmt.body.getText(sourceFile);
      demoBody = `function Demo() ${body}`;
    } else {
      preamble.push(stmt.getText(sourceFile));
    }
  }
  if (!card) throw new Error(`${file}: no \`card\` metadata found`);
  const [w, h] = card.viewport;
  const comment = `<!-- @dsCard group="${escapeAttr(card.group)}" viewport="${w}x${h}" name="${escapeAttr(card.name)}" subtitle="${escapeAttr(card.subtitle)}" -->`;
  const padding = card.padding ?? "20px";
  const destructure = `const { ${componentNames.join(", ")} } = window[Object.keys(window).find(function (k) { return k.indexOf('LumenisDesignSystem') === 0; })];`;
  const html = `${comment}
<link rel="stylesheet" href="../../styles.css">
<link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@${PHOSPHOR}/src/light/style.css">
<link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@${PHOSPHOR}/src/thin/style.css">
<script src="https://unpkg.com/react@${REACT}/umd/react.development.js" crossorigin><\/script>
<script src="https://unpkg.com/react-dom@${REACT}/umd/react-dom.development.js" crossorigin><\/script>
<script src="https://unpkg.com/@babel/standalone@7.29.0/babel.min.js" crossorigin><\/script>
<script src="../../_ds_bundle.js"><\/script>
<div id="root" style="padding:${padding};background:var(--surface-page)"></div>
<script type="text/babel">
${destructure}
${preamble.join("\n")}
${demoBody}
ReactDOM.createRoot(document.getElementById('root')).render(<Demo/>);
<\/script>
`;
  const dir = path.dirname(file);
  const base = path.basename(file, ".specimen.tsx");
  await fs.writeFile(path.join(dir, `${base}.card.html`), html);
  await fs.unlink(file);
}
async function run() {
  const files = await findFiles(componentsDir, ".specimen.tsx");
  for (const file of files) {
    await convertFile(file);
    console.log(`  ${path.relative(root, file)}`);
  }
  console.log(`Converted ${files.length} specimen(s) to .card.html.`);
}
await run();
