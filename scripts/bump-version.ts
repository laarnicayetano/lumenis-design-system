// Bumps this repo's single .claude-plugin/plugin.json (and package.json, to
// keep them in sync) by one semver level. Run via `node scripts/bump-version.ts
// <patch|minor|major>` — called by .github/workflows/version-bump.yml after
// a PR merges, based on its bump:* label. Deliberately not run by the
// propose-change skill itself: a label can be attached to a PR by hand
// without the skill ever running, so CI has to be the thing that actually
// performs the bump, or that path would merge without ever bumping the
// version. Plain JSON parsing + hand-rolled increment: versions here are
// always plain X.Y.Z, no pre-release tags, so a real semver dependency would
// be more than this needs.
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

type BumpLevel = "patch" | "minor" | "major";

interface PluginManifest {
  version: string;
  description: string;
  [key: string]: unknown;
}

interface PackageManifest {
  version: string;
  [key: string]: unknown;
}

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const pluginFile = path.join(root, ".claude-plugin/plugin.json");
const packageFile = path.join(root, "package.json");

const levelArg = process.argv[2];
if (!isBumpLevel(levelArg)) {
  console.error(`Usage: node scripts/bump-version.ts <patch|minor|major>`);
  process.exit(1);
}
const level: BumpLevel = levelArg;

function isBumpLevel(v: string | undefined): v is BumpLevel {
  return v === "patch" || v === "minor" || v === "major";
}

function bump(version: string, level: BumpLevel): string {
  const [major, minor, patch] = version.split(".").map(Number);
  if (level === "major") return `${major + 1}.0.0`;
  if (level === "minor") return `${major}.${minor + 1}.0`;
  return `${major}.${minor}.${patch + 1}`;
}

async function readJson<T>(file: string): Promise<T> {
  return JSON.parse(await fs.readFile(file, "utf8"));
}

async function writeJson(file: string, data: unknown): Promise<void> {
  await fs.writeFile(file, JSON.stringify(data, null, 2) + "\n");
}

async function run() {
  const plugin = await readJson<PluginManifest>(pluginFile);
  const oldVersion = plugin.version;
  const newVersion = bump(oldVersion, level);

  plugin.version = newVersion;
  // description leads with "vX.Y.Z — ..." — keep that prefix in sync too.
  plugin.description = plugin.description.replace(
    /^v[\d.]+ — /,
    `v${newVersion} — `,
  );
  await writeJson(pluginFile, plugin);

  const pkg = await readJson<PackageManifest>(packageFile);
  pkg.version = newVersion;
  await writeJson(packageFile, pkg);

  console.log(`Bumped ${oldVersion} -> ${newVersion} (${level})`);
}

run();
