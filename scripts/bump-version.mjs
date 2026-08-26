// Bumps this repo's single .claude-plugin/plugin.json (and package.json, to
// keep them in sync) by one semver level. Run via `node scripts/bump-version.mjs
// <patch|minor|major>` — called by the propose-change skill as part of
// opening a PR (see .claude/skills/propose-change/SKILL.md), so the version
// bump is committed and reviewable in the PR diff itself, not a separate
// post-merge bot commit. .github/workflows/version-bump.yml only tags the
// merge commit afterward; it doesn't run this script. Plain JSON parsing +
// hand-rolled increment: versions here are always plain X.Y.Z, no
// pre-release tags, so a real semver dependency would be more than this needs.
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const pluginFile = path.join(root, ".claude-plugin/plugin.json");
const packageFile = path.join(root, "package.json");

const level = process.argv[2];
if (!["patch", "minor", "major"].includes(level)) {
  console.error(`Usage: node scripts/bump-version.mjs <patch|minor|major>`);
  process.exit(1);
}

function bump(version, level) {
  const [major, minor, patch] = version.split(".").map(Number);
  if (level === "major") return `${major + 1}.0.0`;
  if (level === "minor") return `${major}.${minor + 1}.0`;
  return `${major}.${minor}.${patch + 1}`;
}

async function readJson(file) {
  return JSON.parse(await fs.readFile(file, "utf8"));
}

async function writeJson(file, data) {
  await fs.writeFile(file, JSON.stringify(data, null, 2) + "\n");
}

async function run() {
  const plugin = await readJson(pluginFile);
  const oldVersion = plugin.version;
  const newVersion = bump(oldVersion, level);

  plugin.version = newVersion;
  // description leads with "vX.Y.Z — ..." — keep that prefix in sync too.
  plugin.description = plugin.description.replace(
    /^v[\d.]+ — /,
    `v${newVersion} — `,
  );
  await writeJson(pluginFile, plugin);

  const pkg = await readJson(packageFile);
  pkg.version = newVersion;
  await writeJson(packageFile, pkg);

  console.log(`Bumped ${oldVersion} -> ${newVersion} (${level})`);
}

await run();
