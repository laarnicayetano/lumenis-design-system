---
name: code-mods
description: Write and run one-off codemod scripts against this repo's source (e.g. bulk-converting or restructuring guidelines/components/tokens). Use when a change needs to be applied mechanically across many files rather than hand-edited one at a time. Reusable helpers (bundling a .tsx to read its exports, CSS parsing, etc.) live in this skill; each mod's actual transform is a disposable script in scripts/.
---

# Code mods

Some changes are mechanical enough that Claude writing a script to apply them
is more reliable than hand-editing dozens of files: less chance of missing
one, and the script itself is a reviewable record of exactly what changed and
why, separate from the diff it produced.

## Division of labor

- **This skill (`.claude/skills/code-mods/`)** holds helpers that are
  reusable across more than one mod — bundling a `.ts`/`.tsx` file with
  esbuild to read its exports, walking a directory for files by extension,
  parsing a small CSS text into a class → declaration map, that kind of
  thing. Add to `helpers.ts` only once a second mod actually needs the same
  logic — don't pre-build helpers for hypothetical future mods.
- **`scripts/`** holds the one-off mod itself — e.g.
  `scripts/convert-guidelines-to-html.ts`. It imports from this skill's
  `helpers.ts`, does the specific transform, and is meant to be run once (or
  re-run if the input changes before it's applied) — not wired into
  `npm run build` or CI like `scripts/build.ts` is.

## Workflow

1. Confirm the exact target format/shape before writing anything — read
   whatever reference material defines it (an `input/`-style folder of
   examples, an existing file in the target format, etc.). Don't guess at a
   format from a written description alone when real examples exist.
2. Write the mod as a script in `scripts/`, pulling shared logic from
   `helpers.ts` rather than re-deriving it (check `scripts/build.ts` too —
   several of these helpers were first extracted from there).
3. Run it, then verify: `npm run build` (or whatever the affected area's
   equivalent check is) to catch regressions the mod introduced.
4. If the mod touches how `scripts/build.ts` reads a directory (e.g.
   changing what file extension a folder's source lives in), that's a
   separate decision from the mod itself — flag it rather than silently
   patching `build.ts` as a side effect of an unrelated request.
5. A mod script is disposable once it's run and its result is committed —
   it doesn't need to run again unless the same transform is needed again
   later (e.g. the input format reference gets more examples added).

## Notes

- Mods that touch how Claude Design's scanner sees this repo (file
  conventions under `guidelines/`/`components/`, the `_ds_manifest.json`
  schema) fall under this repo's `CLAUDE.md` guidance: ask before assuming
  how the scanner will react, rather than inferring it from source alone.
