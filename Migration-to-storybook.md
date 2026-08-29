# Migration to Storybook

Status: **proposed, not started.** Nothing in this repo has changed yet. This
is the plan to get from where we are today — plain `.jsx` components, no
Storybook, `/design-sync` running in `"package"` shape — to a `.tsx` +
`.stories.tsx` world where Storybook is the source of truth for how a
component looks and behaves, and `/design-sync` runs in `"storybook"` shape
against it.

## Why

- Today, three files are maintained by hand per component:
  `<Name>.jsx`, `<Name>.card.html` (a hand-authored preview, read by both
  `scripts/build.mjs` for this repo's own public site and by `check:cards`),
  and `<Name>.prompt.md` (hand-authored usage docs, inlined into the public
  site and uploaded to Claude Design). `/design-sync`'s `.d.ts` is currently
  synthesized from `cfg.dtsPropsFor` fallbacks or best-effort extraction,
  since there's no real TypeScript to read.
- The end state: `<Name>.tsx` + `<Name>.stories.tsx` are the only
  hand-maintained files. `.d.ts` extracts for real from TS types.
  `.prompt.md` and the preview card both generate from the story module. This
  is a real reduction in hand-maintained surface, not just a reshuffle — see
  [How design-sync's generated files map back to source](#how-design-syncs-generated-files-map-back-to-source)
  below.
- Storybook's own compare-and-grade loop (screenshot the real Storybook
  render vs. the generated preview, side by side) is a strictly stronger
  fidelity guarantee than the current absolute-rubric grading `"package"`
  shape uses with no ground truth to check against.
- Storybook itself is also a better **human** browsing tool for components
  than the hand-rolled iframe card viewer `scripts/build.mjs` currently
  builds — real interactive controls, an args table, a docs addon. See
  [Phase 6](#phase-6-repoint-the-public-sites-components-section-at-storybook).

## What does *not* change

- **`guidelines/`, `ui_kits/`, `templates/` are entirely unaffected.**
  `scripts/build.mjs`'s `buildGuidelineCards()` / `buildUiKitHtmls()` /
  `copyStaticAssets()` read these directly off disk via each file's
  `@dsCard` marker or by verbatim copy — none of that goes through
  `components/`, `design-system.js`, or `/design-sync` today, and nothing in
  this migration touches that path. They keep working exactly as they do
  now, regardless of what shape `components/` syncs under.
- **How guidelines/ui_kits/templates reach Claude Design doesn't change
  either.** We already confirmed `/design-sync`'s `guidelinesGlob` mechanism
  is hard-restricted to `.md`/`.mdx` (our content is `.html`, so it's
  skipped either way) and that `ui_kits`/`templates` have zero mentions
  anywhere in the converter, Storybook shape included. The only path in for
  them is a separate, manual `DesignSync(write_files)` upload keyed off the
  `@dsCard` marker they already carry — unrelated to this migration, and not
  scheduled as part of it. Tracked as its own follow-up.
- **Nothing here is scheduled or automatic.** `/design-sync` still runs when
  someone runs it. See [Open questions](#open-questions) for the
  scheduling idea raised separately.

## Current state (verified, not assumed)

Worth recording plainly, because some of it is surprising:

- `package.json` has a `typecheck: tsc --noEmit` script, and `typescript` +
  `@types/react` as devDependencies — **but there is no `tsconfig.json` in
  the repo.** This script almost certainly doesn't do anything useful today.
  Leftover from the earlier TypeScript attempt that was rolled back.
- `.github/workflows/deploy-pages.yml` has a comment reading
  *"Builds the component library... (npm run build, see scripts/build.ts)"*
  — the file is actually `scripts/build.mjs`. Another small leftover from
  the same rollback.
- No `.storybook/` directory exists.
- `.design-sync/config.json` is already set up for `"shape": "package"`,
  with no `projectId` pinned yet (see the still-open target-project decision
  below).
- A **populated, non-empty "Lumenis Design System" project already exists**
  on claude.ai/design, from the earlier TypeScript attempt, never reconciled
  after the rollback. This migration will eventually need to decide whether
  to re-adopt it or start fresh — see open questions.

None of this blocks starting the migration, but Phase 0 should clean up the
first two rather than build TypeScript adoption on top of stale, misleading
tooling.

## How design-sync's generated files map back to source

Confirmed from the bundled skill's own code, not assumed:

| File | Today (`"package"` shape, `.jsx`) | After (`"storybook"` shape, `.tsx` + `.stories.tsx`) |
|---|---|---|
| `<Name>.d.ts` | `cfg.dtsPropsFor` hand-written fallback, since there's no TS to extract from | Auto-extracted for real via `ts-morph` from your actual prop types |
| `<Name>.prompt.md` | Auto-generated from JSDoc + synthesized usage examples | Auto-generated from JSDoc + the real story's composition |
| `<Name>.html` (preview card) | Auto-generated from a synthesized usage example | Auto-generated by compiling the real `.stories.tsx` module (hooks, fixtures, everything) |

In both shapes these three files are *generated output*, not something meant
to be hand-edited in the common case — the difference storybook shape buys
is that the generation has a real, typed, tested source to draw from instead
of a best-effort synthesis. The escape hatches (`dtsPropsFor` for types that
can't auto-extract, an owned `.design-sync/previews/<Name>.tsx` override for
a story that renders wrong) stay available either way, for the genuine edge
cases.

## Phased plan

Each phase should land as its own PR, verified working before the next
starts. Nothing here commits to a timeline.

### Phase 0 — Clean up TS residue, decide strictness

- Add a real `tsconfig.json` (`strict` mode is the recommended default;
  confirm with whoever hit the prior TS pain before assuming it — see
  [Open questions](#open-questions)).
- Confirm `npm run typecheck` actually does something once the config
  exists, against an empty/near-empty tree.
- Fix the stale `scripts/build.ts` comment in `deploy-pages.yml` while
  editing that file anyway (Phase 7 touches it regardless).
- **Do not touch any component source in this phase.** This is pure
  tooling setup, independently revertible if it goes wrong the way the
  last attempt did.

### Phase 1 — Storybook installed, zero components migrated

- `npx storybook@latest init` (or manual `.storybook/main.js` +
  `.storybook/preview.js` if the initializer assumes a framework we don't
  have — this repo's plain-esbuild setup isn't a standard CRA/Vite/Next
  target, so the initializer may need overriding rather than trusted as-is).
- Add a `storybook` script to `package.json` (`storybook dev -p 6006`) —
  **this is the "test it locally" checkpoint.** Before migrating a single
  component, confirm Storybook boots at all: an empty stories glob, the
  dev server running, `styles.css`'s token chain loading so the Storybook
  UI itself previews on-brand once something exists.
- Nothing uploads to Claude Design in this phase. `.design-sync/config.json`
  still says `"shape": "package"`.

### Phase 2 — Convert components, `.jsx` → `.tsx`

Component by component, not all at once — see
[Codemods](#codemods) for what can be automated. Order matters: start with
the same "diverse but simple" set the storybook sub-skill itself recommends
for grading (one simple component, then one compound/overlay, one
icon-heavy, one theme-sensitive, one text-heavy) so the conversion process
and any type-extraction problems surface early, on a small set, rather than
on all 28 components at once.

Each component's conversion is done when:
- `<Name>.tsx` replaces `<Name>.jsx`, with real prop types (no `any`
  escape hatches without a recorded reason).
- `npm run typecheck` passes.
- `npm run build` still produces a working `design-system.js` bundle (this
  repo's site and the design-sync bundle both still need to load this).

### Phase 3 — Author `.stories.tsx` per migrated component

- One `.stories.tsx` per component, alongside its `.tsx`.
- Start with a `Default` story per component; expand to cover the variants
  that `<Name>.card.html` / `<Name>.prompt.md` currently document by hand —
  those files are the authoritative record of "what states does this
  component need to show" until they're retired in Phase 4.
- Verify each new story renders correctly in the local Storybook dev server
  from Phase 1 before moving to the next component.

### Phase 4 — Retire hand-authored `.card.html` / `.prompt.md`

**Only after Phase 6 gives `scripts/build.mjs`'s public site a replacement
for what these files currently feed it.** Deleting them earlier breaks the
"Components" section of this repo's own site with no fallback.

- Confirm the Storybook story's rendered output is an equal-or-better
  substitute for each retired `.card.html` before deleting it — not a
  rubber-stamp, a real side-by-side look.
- `check:cards` (`scripts/check-cards.mjs`) presumably validates
  `.card.html` files today — decide whether it's retired alongside them or
  repointed at story coverage instead.

### Phase 5 — Switch `/design-sync` to `"storybook"` shape

- Update `.design-sync/config.json`: `"shape": "storybook"`,
  `storybookConfigDir`, `storybookStatic`.
- This is a **first-time treatment** in `/design-sync`'s own terms (no
  `projectId` pinned yet) — the target-project decision (fresh vs.
  re-adopt the existing populated "Lumenis Design System" project) still
  needs an explicit answer before this runs. Not decided by this document.
- Expect the full solo-phase → fan-out → grading loop described in the
  storybook sub-skill; budget real time for it, same as any first sync.

### Phase 6 — Repoint the public site's "Components" section at Storybook

- Add a step that builds Storybook's static output — `storybook build -o
  dist/storybook` — alongside `scripts/build.mjs`'s existing `dist/` output.
- Change `buildHomePage()`'s "Components" nav entries in `scripts/build.mjs`
  from in-page iframes (currently backed by `<Name>.card.html`) to links out
  to the deployed Storybook build. Guidelines/UI kits/templates keep
  rendering in-page exactly as they do today — only the Components section's
  presentation changes.
- Test locally: `npm run build` should produce both `dist/` (existing site)
  and `dist/storybook/` (new), servable together by `npm run dev`'s existing
  static server.

### Phase 7 — Update `deploy-pages.yml`

Concretely, based on the current workflow:

```yaml
- run: npm ci
- run: npm run build
- run: npx storybook build -o dist/storybook   # new
- uses: actions/upload-pages-artifact@v5
  with:
    path: dist
```

- `dist/storybook` needs to land inside the same `dist/` tree that already
  gets uploaded as the Pages artifact — no separate deploy job needed as
  long as it's nested there before the upload step.
- Confirm CI installs whatever Storybook needs (it may need
  `npx playwright install chromium` too, if any Storybook addon or the
  build itself needs a browser — verify empirically rather than assume).
- Fix the stale `build.ts` comment at the top of this file while touching
  it (carried over from Phase 0 if not already done).

## Codemods

What's realistically automatable vs. what needs a human pass, so this
doesn't get oversold:

- **`.jsx` → `.tsx` rename**: mechanical, but only the easy 10% of the work.
  A rename script (`git mv` per file, or a small `jscodeshift`/`ts-morph`
  pass) is trivial; it does *not* produce correct types.
- **Scaffolding a starter `interface <Name>Props`**: semi-automatable *if*
  components already use `PropTypes` or consistent JSDoc `@param` comments
  to scrape from — **needs verification first**: do any of the 28
  components use `PropTypes` today? Not confirmed in this document; check
  before assuming a codemod has something to read. If they don't, this step
  is closer to 100% manual per component.
- **Scaffolding a starter `.stories.tsx`**: semi-automatable — a script
  could generate a baseline `Default` story per component by reading its
  existing `<Name>.card.html`'s rendered example and/or `<Name>.prompt.md`'s
  documented usage, since those already encode "here's how this component
  is meant to be used" today. This still needs a human pass per component to
  confirm the generated story is a faithful, sensible variant set — treat it
  as boilerplate removal, not a finished story.
- **Not safe to codemod**: real type correctness, meaningful story variant
  coverage, anything touching `.design-sync/previews/` overrides. These are
  judgment calls per component, not mechanical transforms.

## Testing locally before touching CI

Order of verification, cheapest/safest first:

1. `npm run storybook` boots with zero components migrated (Phase 1).
2. Each component's story renders correctly in that local dev server as
   it's migrated (Phase 2/3) — before it ever touches `/design-sync` or the
   public site.
3. `npm run build` produces a working `dist/storybook/` locally (Phase 6)
   — open it from the local static server the same way `npm run dev`
   already serves the rest of the site.
4. Only once all of the above work locally does `/design-sync` get pointed
   at real stories (Phase 5), and only after that does `deploy-pages.yml`
   change (Phase 7). CI is the last thing touched, not the first.

## Risks / rollback

- Migrate component-by-component, not big-bang — `.jsx` and `.tsx`
  components can coexist in `components/` for the duration, since neither
  `scripts/build.mjs` nor the design-system bundle cares which extension a
  component's source file has.
- Keep each retired `.card.html`/`.prompt.md` recoverable via git history
  until its replacement is confirmed working — don't delete and replace in
  the same commit.
- If Phase 0/2 hits the same wall the original TypeScript attempt did, stop
  and diagnose rather than pushing through blind — see the first open
  question below. Repeating an unexamined failure is worse than not
  migrating.

## Open questions

- **What exactly went wrong in the original TypeScript attempt?** Nothing
  in this repo documents the actual failure mode — only that it happened
  and was rolled back, plus a stale remote Claude Design project and a
  dangling `typescript` devDependency as evidence it existed. Worth a real
  retro before Phase 0, so this attempt doesn't walk into the same issue.
- **Fresh Claude Design project, or re-adopt the existing populated one?**
  Still unresolved from before this document. Phase 5 can't proceed without
  an answer — re-adoption carries an explicit overwrite/delete warning per
  `/design-sync`'s own rules.
- **Should `dtsPropsFor`/`componentSrcMap` overrides in
  `.design-sync/config.json` be treated as permanent fallbacks or purely
  transitional?** Once real `.tsx` types exist for every component, do we
  keep the hand-written fallbacks around for the rare extraction failure,
  or expect zero to remain?
- **Story coverage: `Default` only, or every documented variant?** Directly
  affects how much grading the first storybook-shape sync costs — more
  stories per component means more images to judge before anything ships.
- **Should guidelines/ui_kits/templates ever get mirrored into Storybook
  itself, as MDX docs-only pages, purely as an additional human-browsing
  surface?** Confirmed technically safe to do without it leaking into
  design-sync's component pipeline (`source-storybook.mjs` explicitly skips
  `type === 'docs'` entries during story discovery) — but not something this
  plan currently calls for, since `scripts/build.mjs`'s existing site
  already covers that need. Worth deciding explicitly rather than doing by
  default.
- **Does `npm run storybook`'s dev server stay a separate local process
  from `npm run dev`, or should they eventually merge into one?** No
  proposal here — flagging that today's plan leaves two independent dev
  servers running side by side.
- **Auto-running `/design-sync` on a schedule** — raised separately, not
  part of this migration, but relevant once storybook shape is live: the
  re-sync driver (`resync.mjs`) is cheap and idempotent on a quiet repo, but
  a diff that finds new/changed components still needs a graded pass before
  anything uploads — genuinely unattended scheduling only works for the
  "nothing changed" case. Needs its own design before committing to a
  cadence.
- **CI's actual Storybook build requirements** — does `storybook build` in
  GitHub Actions need Chromium installed, or does the plain static build
  not require a browser at all? Not verified in this document; check
  empirically in Phase 7 rather than assuming either way.
