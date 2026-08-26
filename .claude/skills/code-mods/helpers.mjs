import { promises as fs } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import * as esbuild from "esbuild";

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
