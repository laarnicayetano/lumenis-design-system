# Getting started

This page is the short, plain-language version: how to use this design system across different Claude apps, how to get set up, and where things live.

[Lumenis Design System](https://laarnicayetano.github.io/lumenis-design-system/)

## Using this across Claude products

- **Claude Code** — this repo is itself a [Claude Code plugin](https://github.com/laarnicayetano/lumenis-design-system/blob/master/.claude-plugin/plugin.json) with a root `SKILL.md`. Working in this directory (or installing it as a plugin) gives Claude Code the design system as project context automatically — brand rules, tokens, and where to find deeper detail. There's also a [`propose-change skill`](https://github.com/laarnicayetano/lumenis-design-system/blob/master/.claude/skills/propose-change/SKILL.md) for opening a PR once you've made an edit — say "ship this" or "open a PR."
- **Claude Design** — not yet wired up. `/design-sync` is the real mechanism that pushes a repo's shipped components into a Claude Design project, and this repo doesn't have the `.design-sync/config.json` or per-component type info that pipeline needs — that setup hasn't been done.
- **Claude Desktop / Claude.ai** — Agent Skills like this one can be uploaded or enabled for a workspace on both of these; the exact steps depend on your organization's admin settings, which I don't have visibility into from inside this repo. Check with whoever manages your Claude workspace if you want this design system available there. (I'd rather point you to check than give you specific menu steps I'm not certain are current.)

## Fonts — where to get them, where they go

ABC Arizona (Sans + Mix) is a **licensed typeface and is not in this repo** — `assets/fonts/`. Ask the marketing team where the licensed `.otf` files are stored (this repo doesn't know that location — there's a placeholder in `README.md`'s sources table waiting to be filled in with the real link).

Once you have them, you have two options:

1. **Drop them in the repo** at these exact paths — the build picks them up automatically wherever raw source is served:
   ```
   assets/fonts/ABCArizonaSans-Regular.otf
   assets/fonts/ABCArizonaSans-Light.otf
   assets/fonts/ABCArizonaMix-Regular.otf
   assets/fonts/ABCArizonaMix-RegularItalic.otf
   assets/fonts/Arial.ttf
   ```
2. **Install them as system fonts** (double-click each `.otf`/`.ttf` → Font Book on Mac, or your OS's font install). `tokens/fonts.css` tries `local("ABC Arizona Sans Regular")` etc. _before_ the file path — an installed system font is picked up even when previewing through `npm run storybook`.

## Publishing changes

When changes are approved the repo rebuilds the [Lumenis Design System](https://laarnicayetano.github.io/lumenis-design-system/) automatically. You can use Claude to propose a change and send it to GitHub.

## Running it locally

```
npm install
npm run storybook
```

This opens a local server that lists every UI kit, guideline, and component with a live preview.
