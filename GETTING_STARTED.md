# Getting started

`README.md` is the detailed reference (sourcing, build internals, content rules) — it's dense and written as much for an AI assistant reading the repo as for a person. This page is the short, plain-language version: how to get set up, where things live, and how to use this design system across different Claude apps.

## Fonts — where to get them, where they go

ABC Arizona (Sans + Mix) is a **licensed typeface and is not in this repo** — `assets/fonts/` is gitignored, nothing under it is ever committed. Ask your brand/design team where the licensed `.otf` files are stored internally (this repo doesn't know that location — there's a placeholder in `README.md`'s sources table waiting to be filled in with the real link).

Once you have them, you have two options:

1. **Drop them in the repo** at these exact paths — the build picks them up automatically wherever raw source is served (not through `dist/`, see note below):
   ```
   assets/fonts/ABCArizonaSans-Regular.otf
   assets/fonts/ABCArizonaSans-Light.otf
   assets/fonts/ABCArizonaMix-Regular.otf
   assets/fonts/ABCArizonaMix-RegularItalic.otf
   assets/fonts/Arial.ttf
   ```
2. **Install them as system fonts** (double-click each `.otf`/`.ttf` → Font Book on Mac, or your OS's font install). `tokens/fonts.css` tries `local("ABC Arizona Sans Regular")` etc. *before* the file path — an installed system font is picked up even when previewing through `npm run dev`.

**Important:** `npm run dev` / `npm run build` serve `dist/`, and the build deliberately never copies `assets/fonts/` into `dist/` — even for local preview — so that a real font file can never accidentally end up published (GitHub Pages, a shared build, etc.). That means **option 1 alone won't render real fonts in your local preview** — only option 2 (system-installed) will. Either way, nothing breaks without the fonts: everything falls back cleanly to Arial/Georgia.

## Running it locally

```
npm install
npm run dev
```

Opens a local server (default `http://localhost:4173`) that rebuilds automatically when you edit anything under `components/`, `guidelines/`, `tokens/`, `ui_kits/`, etc. The homepage lists every UI kit, guideline, and component with a live preview.

## Using this across Claude products

- **Claude Code** — this repo is itself a Claude Code plugin (`.claude-plugin/plugin.json`) with a root `SKILL.md`. Working in this directory (or installing it as a plugin) gives Claude Code the design system as project context automatically — brand rules, tokens, and where to find deeper detail. There's also a `propose-change` skill (`.claude/skills/propose-change/`) for opening a PR once you've made an edit — say "ship this" or "open a PR."
- **Claude Design** — this repo is synced with a Claude Design project (same brand/tokens, edited live in the canvas). If you have access, your team lead can share the project link — it's not published in this repo since it's a personal/workspace-scoped URL, not a public one.
- **Claude Desktop / Claude.ai** — Agent Skills like this one can be uploaded or enabled for a workspace on both of these; the exact steps depend on your organization's admin settings, which I don't have visibility into from inside this repo. Check with whoever manages your Claude workspace if you want this design system available there. (I'd rather point you to check than give you specific menu steps I'm not certain are current.)

## Publishing changes

Once merged to `master`, `.github/workflows/deploy-pages.yml` rebuilds and publishes `dist/` to GitHub Pages automatically — nothing to do manually. To get a change merged, use the `propose-change` skill in Claude Code, or open a PR the normal way.

## Safeguards against publishing sensitive info

- `.gitignore` blocks `assets/fonts/` (licensed fonts), `uploads/` and `research/` (raw source material — brand guideline extracts, internal docs), and `*.pdf` outright.
- The `propose-change` skill reads the actual diff content (not just filenames) before opening a PR and stops if it finds anything that looks like a credential, real personal data, or unreleased internal material.
- The build itself never copies `assets/fonts/` into `dist/`, so even if a font file ended up committed by mistake, it still wouldn't get published to the live GitHub Pages site through the normal build path.

What's *not* in place: there's no automated secret-scanning in CI (e.g. gitleaks) and no pre-commit hook — the `.gitignore` rules and the `propose-change` skill's manual review are the current safeguards. If you want a CI-level backstop too, that's a small addition worth doing before this repo goes properly public.
