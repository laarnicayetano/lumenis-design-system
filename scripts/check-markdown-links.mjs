// Find dead relative links in skill markdown files (SKILL.md and their
// bundled docs). Checks markdown [text](path) links whose target is not
// http(s):// — these are relative paths into the repo and rot silently when
// a skill is renamed or moved.
//
// Run: node scripts/check-markdown-links.mjs
// Exits non-zero if any dead links are found.
//
// Same shape rule as validate.mjs: this file is swept into _ds_bundle.js, so
// no shebang, no top-level await, no top-level static imports. See that file.
async function main() {
  const { readFileSync, readdirSync, existsSync } = await import("node:fs");
  const { join, dirname, resolve, relative } = await import("node:path");

  const ROOT = process.cwd();
  const SEARCH_DIRS = ["plugins", ".claude/skills"];
  const LINK_RE = /\[[^\]]*\]\(([^)\s]+)\)/g;

  function walk(dir, out = []) {
    if (!existsSync(dir)) return out;
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const p = join(dir, entry.name);
      // templates/ files are fill-in-the-blanks skeletons copied elsewhere
      // before use (see .claude/skills/manage-products/templates/) — their
      // relative links are authored for that future location, not this one,
      // so checking them in place produces false positives.
      if (entry.isDirectory()) {
        if (entry.name !== "templates") walk(p, out);
      } else if (entry.name.endsWith(".md")) out.push(p);
    }
    return out;
  }

  function resolveTarget(mdFile, target) {
    // Strip an anchor fragment; drop links Claude Code treats as skill names.
    target = target.split("#", 1)[0];
    if (!target || /^(https?:|mailto:)/.test(target)) return null;
    return resolve(dirname(mdFile), target);
  }

  function stripFencedCode(text) {
    // Fenced code blocks are literal example text, not real links, even
    // when they contain [text](path) syntax — e.g. SKILL.md instructing an
    // agent what line to write. Blank out their contents (keeping line
    // count intact) so matches never land inside one.
    return text.replace(/^[ \t]*```.*$[\s\S]*?^[ \t]*```$/gm, (block) =>
      block.replace(/[^\n]/g, " "),
    );
  }

  function checkFile(mdFile) {
    const dead = [];
    const text = readFileSync(mdFile, "utf8");
    const scannable = stripFencedCode(text);
    for (const match of scannable.matchAll(LINK_RE)) {
      const target = resolveTarget(mdFile, match[1]);
      if (target !== null && !existsSync(target)) {
        const line = scannable.slice(0, match.index).split("\n").length;
        dead.push([line, match[1]]);
      }
    }
    return dead;
  }

  const mdFiles = SEARCH_DIRS.flatMap((dir) => walk(join(ROOT, dir))).sort();
  const failures = [];
  for (const mdFile of mdFiles) {
    for (const [line, target] of checkFile(mdFile)) {
      failures.push(`${relative(ROOT, mdFile)}:${line}: dead link -> ${target}`);
    }
  }

  if (failures.length) {
    console.log("Dead links found:\n");
    console.log(failures.join("\n"));
    process.exitCode = 1;
    return;
  }
  console.log("No dead links found.");
}

if (
  typeof window === "undefined" &&
  typeof process !== "undefined" &&
  process.versions?.node
)
  main();
