---
name: propose-change
description: Publish edits made in this repo (lumenis-design-system) by opening a GitHub PR with a version-bump label, and bumping .claude-plugin/plugin.json's version as part of the same PR. Use when the user says "ship this", "publish this change", "release this", "open a PR", or has finished editing tokens/components/guidelines and wants it live. This is a repo-local skill for maintaining lumenis-design-system itself — not something distributed elsewhere.
---

# Propose a design system change

The person invoking this is often not a developer (e.g. a designer or
marketer tweaking a token, guideline, or piece of copy). Do the git work for
them — don't ask them to run commands themselves unless something is
genuinely ambiguous. This skill opens a PR for human review; it never pushes
straight to `master`.

## Steps

1. **Start from an up-to-date master before doing anything else**, so a new
   branch never forks off stale code or an old feature branch the user
   happens to be sitting on:
   ```
   git checkout master
   git pull origin master
   ```
   If there are uncommitted changes in the working tree that aren't related
   to what the user wants to publish, stop and ask rather than switching
   branches out from under them — don't discard or carry over unrelated work
   silently.

2. **See what changed.** Run `git status` and `git diff` (or `git diff --staged`
   if things are already staged) to see which files changed.

3. **Check for sensitive content.** This repo is public — read the actual
   diff content (not just filenames) and look for:
   - API keys, tokens, passwords, or credentials (e.g. `sk-`, `AKIA`, `-----BEGIN
     PRIVATE KEY-----`, bearer tokens, `.env`-style `KEY=value` secrets)
   - Real customer/personal data (names + emails, phone numbers, addresses,
     account IDs) rather than placeholder/example data
   - Internal-only material that reads as confidential (unreleased pricing,
     unannounced product names, internal strategy docs, financial figures,
     unpublished brand-guideline pages beyond what `research/` already excludes)
   - Licensed font files or anything else `.gitignore` already excludes —
     double-check nothing under `assets/fonts/`, `research/`, or `uploads/`
     snuck into the diff via `git add -f` or similar

   If you find any of this, **stop — do not commit, push, or open a PR.**
   Tell the user plainly what you found and where, and let them decide
   whether to remove it or confirm it's safe to publish. Don't guess or
   silently redact; a false positive costs one clarifying question, a false
   negative publishes a leak.

4. **Verify the build still passes.** Run `npm run build`. If it fails
   because of the change being proposed, stop and fix it — or tell the user
   what's broken — before opening a PR.

5. **Pick a bump level for the PR.** Default to **patch**. Use your judgment
   on the diff, and don't ask unless it's genuinely unclear:
   - **none** — docs, workflow, or repo tooling only; no design-system
     content changed
   - **patch** — wording tweaks, corrections, small examples, token/guideline
     fixes, bug fixes
   - **minor** — a new component, guideline, or ui_kit added; a meaningfully
     expanded capability
   - **major** — a component/skill removed or renamed in a way that breaks
     existing references, restructured layout
   If the level isn't `none`, run `node scripts/bump-version.mjs <level>` —
   this bumps `.claude-plugin/plugin.json`'s version (and mirrors it into
   `package.json`) and stages those file changes to go out in the same PR,
   so a reviewer sees the version bump in the diff rather than as an
   invisible follow-up commit. Don't run it at all for `none`.

6. **Create a branch and commit.**
   ```
   git checkout -b claude/<short-slug>
   git add <changed files>
   git commit -m "<plain-language summary of the change>"
   git push -u origin claude/<short-slug>
   ```
   Include the version-bump files from step 5 (if any) in this commit.

7. **Open the PR** with the bump label attached:
   ```
   gh pr create --title "<summary>" --body "<what changed and why>" \
     --label "bump:<level>"
   ```

8. **Switch back to master** once the branch is pushed and the PR is open:
   ```
   git checkout master
   ```
   Don't leave the working directory sitting on the just-opened PR branch —
   the next task should start clean, not accidentally stack changes onto a
   branch that's already up for review.

9. **Report back in plain language**, e.g.:
   > Opened a PR: <url>, labeled `bump:patch` and bumping to v0.0.2. It's up
   > for review — once someone approves and merges it, the GitHub Pages site
   > rebuilds automatically on push to `master`, and a `v0.0.2` git tag gets
   > created for the merge commit.

## Notes

- Never invent content changes — only publish what the user actually edited.
- If nothing changed at all, say so rather than opening an empty PR.
- This skill's job ends at opening the PR. Merging and approving are handled
  by a human, not by this skill. Tagging the merged version happens
  automatically via `.github/workflows/version-bump.yml`.
