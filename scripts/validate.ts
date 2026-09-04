// Static invariants for the Lumenis design system. No dependencies.
// Run: node scripts/validate.ts
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, relative, dirname, resolve, basename } from "node:path";

const ROOT = process.cwd();
const SKIP = new Set([
  "node_modules",
  "dist",
  "storybook-static",
  "generated", // stories/generated/ — Storybook build output, regenerated fresh each run
  "ds-bundle", // local, gitignored /design-sync build artifact
  ".git",
  "uploads",
  "research",
]);
const GENERATED =
  /(^|\/)(_ds_bundle\.js|_ds_manifest\.json|_adherence\.oxlintrc\.json|support\.js|deck-stage\.js)$/;
const ALLOWED_BARE = new Set(["react"]);
// Generated, gitignored, and legitimately absent from a fresh checkout.
// Cards and kits reference these at runtime; never flag them as missing.
const GENERATED_REF = /(_ds_bundle\.js|_ds_manifest\.json|support\.js|deck-stage\.js|^dist\/)/;

const errors: string[] = [];
const warnings: string[] = [];
const err = (f: string, m: string) => errors.push(`${f}: ${m}`);
const warn = (f: string, m: string) => warnings.push(`${f}: ${m}`);

function walk(dir: string, out: string[] = []): string[] {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (e.name.startsWith(".")) continue;
    const p = join(dir, e.name);
    if (e.isDirectory()) {
      if (!SKIP.has(e.name)) walk(p, out);
    } else out.push(relative(ROOT, p).split("\\").join("/"));
  }
  return out;
}

const files = walk(ROOT).filter((f) => !GENERATED.test(f));
const read = (f: string) => readFileSync(join(ROOT, f), "utf8");
// Real, browser-bundled component/app source (checks D/E/J below reason
// about a single flattened `window.<Global>` namespace and real esbuild
// bundling — both still apply to .tsx since the components repo bundle
// and build-storybook-content.ts's interactive-kit compile both
// follow real imports across this exact file set).
// Excludes .stories.tsx: story modules are Storybook-only dev artifacts,
// never part of the real components bundle (design-sync's converter builds
// that from components/index.js's exports, not from stories) — their CSF
// named exports (`export const Default`) are per-module and never merged
// into a shared namespace, so scanning them here is a false-positive source.
const componentSrc = (f: string) => /\.(jsx?|tsx?)$/.test(f) && !f.endsWith(".stories.tsx");
const inTemplates = (f: string) => f.startsWith("templates/");
const isTooling = (f: string) => f.startsWith("scripts/") || f.startsWith("build/");

// ── A. every package.json script points at a file that exists ─────────────
{
  const pkg = JSON.parse(read("package.json"));
  for (const [name, cmd] of Object.entries(pkg.scripts ?? {})) {
    for (const tok of (cmd as string).split(/\s+/)) {
      if (!/\.(mjs|cjs|js|tsx?)$/.test(tok)) continue;
      if (!existsSync(join(ROOT, tok)))
        err("package.json", `script "${name}" runs ${tok}, which does not exist`);
    }
  }
}

// ── B. no unresolvable bare imports in real-bundled source ────────────────
// components/, ui_kits/, gamma/, and products/<Name>/ui_kit/ all end up in
// a real bundle (the components repo bundle design-sync builds, or
// build-storybook-content.ts's esbuild compile of each interactive
// kit) — a bare import that isn't `react` can't resolve there.
for (const f of files) {
  if (!componentSrc(f) || inTemplates(f)) continue;
  if (!/^(components|ui_kits|gamma|products\/[^/]+\/ui_kit)\//.test(f)) continue;
  for (const m of read(f).matchAll(/(?:from|import)\s*\(?\s*["']([^."'/][^"']*)["']/g))
    if (!ALLOWED_BARE.has(m[1]))
      err(f, `bare import "${m[1]}" cannot resolve in the browser bundler`);
}

// ── C. capitalized exports must be globally unique (one window namespace) ─
{
  const owners = new Map<string, string[]>();
  for (const f of files) {
    if (!componentSrc(f) || inTemplates(f) || isTooling(f)) continue;
    const t = read(f);
    const names = new Set<string>();
    for (const m of t.matchAll(/export\s+(?:async\s+)?function\s+([A-Z]\w*)/g)) names.add(m[1]);
    for (const m of t.matchAll(/export\s+(?:const|let|class)\s+([A-Z]\w*)/g)) names.add(m[1]);
    // `export { X }` DEFINES X here; `export { X } from "…"` merely re-exports
    // it, so a barrel file like components/index.js is not a second owner.
    for (const m of t.matchAll(/export\s*\{([^}]*)\}\s*(from\s*["'][^"']+["'])?/g)) {
      if (m[2]) continue;
      for (const part of m[1].split(","))
        if (/^[A-Z]/.test(part.trim()))
          names.add(
            part
              .trim()
              .split(/\s+as\s+/)
              .pop()!
              .trim(),
          );
    }
    for (const n of names) {
      if (!owners.has(n)) owners.set(n, []);
      owners.get(n)!.push(f);
    }
  }
  for (const [name, where] of owners)
    if (where.length > 1)
      err(where.join(" + "), `"${name}" is exported by ${where.length} files — they collide`);
}

// ── D. every *.card.html declares @dsCard on line 1 ────────────────────────
for (const f of files) {
  if (!f.endsWith(".card.html")) continue;
  const first = read(f).split("\n", 1)[0];
  if (!first.startsWith("<!-- @dsCard")) err(f, "line 1 is not an <!-- @dsCard --> comment");
  else if (!/viewport="\d+x\d+"/.test(first)) warn(f, '@dsCard has no viewport="WxH"');
}

// ── E. every referenced local file exists ──────────────────────────────────
for (const f of files) {
  if (!/\.(html|jsx?|tsx?|mjs)$/.test(f) || inTemplates(f) || isTooling(f)) continue;
  const t = read(f);
  const refs = new Set<string>();
  for (const m of t.matchAll(/(?:src|href)=["']([^"']+)["']/g)) refs.add(m[1]);
  for (const m of t.matchAll(/url\(["']?([^)"']+)["']?\)/g)) refs.add(m[1]);
  for (const m of t.matchAll(/["'](assets\/[^"']+)["']/g)) refs.add(m[1]);
  for (const r of refs) {
    if (/^(https?:|data:|mailto:|#|\/\/)/.test(r)) continue;
    if (GENERATED_REF.test(r)) continue;
    // assembled at runtime from a variable, e.g. "url(" + image + ")"
    if (/[+`]|\$\{/.test(r) || r !== r.trim()) continue;
    const clean = r.split(/[?#]/)[0];
    if (!clean) continue;
    const rel = resolve(dirname(join(ROOT, f)), clean);
    const rooted = resolve(ROOT, clean.replace(/^\//, ""));
    if (!existsSync(rel) && !existsSync(rooted)) err(f, `references missing file "${r}"`);
  }
}

// ── F. no orphaned or unmounted kit components ─────────────────────────────
const kits = readdirSync(join(ROOT, "ui_kits"), { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => `ui_kits/${d.name}`);
// OptiLIFT/OptiLIGHT moved to products/<Name>/ui_kit so everything about a
// product lives in one folder — still a "kit" for this check's purposes.
for (const dir of readdirSync(join(ROOT, "products"), { withFileTypes: true })) {
  if (!dir.isDirectory()) continue;
  const kitDir = `products/${dir.name}/ui_kit/website`;
  if (existsSync(join(ROOT, kitDir))) kits.push(kitDir);
}
for (const kit of kits) {
  const index = `${kit}/index.html`;
  if (!existsSync(join(ROOT, index))) continue;
  const html = read(index);
  const entries = files.filter((f) => f.startsWith(kit + "/") && f.endsWith(".jsx"));
  for (const e of entries) {
    const name = basename(e);
    const stem = name.replace(/\.jsx$/, "");
    const usedBySibling = entries.some((o) => o !== e && read(o).includes(stem));
    if (!html.includes(name) && !usedBySibling)
      err(e, `not referenced by ${index} or any sibling — dead code in the bundle`);
  }
  const body = html.split("<body")[1] ?? "";
  if (entries.length && !/<script[^>]*\s(?:src|type)=/.test(body))
    err(index, "body loads no script — the kit renders blank");
}

// ── G. CSS shorthand spread after longhands (the SplitPanel bug class) ─────
const FAMILIES: Record<string, RegExp> = {
  background: /background(Image|Color|Size|Position|Repeat|Attachment|Clip|Origin)/,
  border: /border(Color|Width|Style|Top|Right|Bottom|Left)(?!Radius)/,
  font: /(fontSize|fontWeight|fontFamily|fontStyle|lineHeight|letterSpacing)/,
  padding: /padding(Top|Right|Bottom|Left|Inline|Block)/,
  margin: /margin(Top|Right|Bottom|Left|Inline|Block)/,
  flex: /flex(Grow|Shrink|Basis)/,
};
for (const f of files) {
  if (!componentSrc(f) || inTemplates(f) || isTooling(f)) continue;
  const t = read(f);
  const risky = new Map<string, string>();
  for (const m of t.matchAll(/(?:const|let)\s+(\w+)\s*=\s*\{([\s\S]*?)\n\};/g))
    for (const fam of Object.keys(FAMILIES))
      if (new RegExp(`\\b${fam}\\s*:`).test(m[2])) risky.set(m[1], fam);
  for (const m of t.matchAll(/\.\.\.(\w+)\s*[[.]/g)) {
    const fam = risky.get(m[1]);
    if (!fam) continue;
    if (FAMILIES[fam].test(t.slice(Math.max(0, m.index! - 700), m.index)))
      err(
        f,
        `"...${m[1]}" spreads a "${fam}" shorthand after ${fam} longhand keys — ` +
          "the shorthand silently resets them; use longhands in the map",
      );
  }
}

for (const w of warnings) console.warn(`warn  ${w}`);
for (const e of errors) console.error(`ERROR ${e}`);
console.log(
  `\n${files.length} files checked — ${errors.length} error(s), ${warnings.length} warning(s)`,
);
if (errors.length) process.exitCode = 1;
