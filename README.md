# Lumenis Design System

The brand and design system for **Lumenis** — a global medical-technology company building minimally invasive, energy-based solutions for the **Aesthetics** and **Vision** markets.

[View the published Storybook](https://laarnicayetano.github.io/lumenis-design-system/)

This page is the short, plain-language version: how to use this design system across different Claude apps, how to get set up, and where things live. For the full brand voice, visual foundations, and content rules, see [BRAND_GUIDELINES.md](BRAND_GUIDELINES.md).

## Using this across Claude products

- **Claude Code** — this repo is itself a [Claude Code plugin](https://github.com/laarnicayetano/lumenis-design-system/blob/master/.claude-plugin/plugin.json) with a root `SKILL.md`. Working in this directory (or installing it as a plugin) gives Claude Code the design system as project context automatically — brand rules, tokens, and where to find deeper detail. There's also a [`propose-change skill`](https://github.com/laarnicayetano/lumenis-design-system/blob/master/.claude/skills/propose-change/SKILL.md) for opening a PR once you've made an edit — say "ship this" or "open a PR."
- **Claude Design** — wired up via `/design-sync`, on `.design-sync/config.json`'s `"storybook"` shape: it reads the real `.tsx` component types and Storybook stories directly rather than a built bundle. Re-run `/design-sync` after changing a component's props or story to push the update.
- **Claude Desktop / Claude.ai** — Agent Skills like this one can be uploaded or enabled for a workspace on both of these; the exact steps depend on your organization's admin settings, which I don't have visibility into from inside this repo. Check with whoever manages your Claude workspace if you want this design system available there. (I'd rather point you to check than give you specific menu steps I'm not certain are current.)

## Fonts — where to get them, where they go

ABC Arizona (Sans + Mix) is a **licensed typeface and is not in this repo** — `assets/fonts/`. Ask the marketing team where the licensed `.otf` files are stored; this repo doesn't track that location.

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
