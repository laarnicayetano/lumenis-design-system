---
name: propose-change
description: Publish edits made in this repo (lumenis-design-system) by opening a GitHub PR. Use when the user says "ship this", "publish this change", "release this", "open a PR", or has finished editing tokens/components/guidelines and wants it live. This is a repo-local skill for maintaining lumenis-design-system itself — not something distributed elsewhere.
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

4. **Verify the build still passes.** Run `npm run build` (this also
   typechecks). If it fails because of the change being proposed, stop and
   fix it — or tell the user what's broken — before opening a PR.

5. **Create a branch and commit.**
   ```
   git checkout -b claude/<short-slug>
   git add <changed files>
   git commit -m "<plain-language summary of the change>"
   git push -u origin claude/<short-slug>
   ```

6. **Open the PR.**
   ```
   gh pr create --title "<summary>" --body "<what changed and why>"
   ```

7. **Switch back to master** once the branch is pushed and the PR is open:
   ```
   git checkout master
   ```
   Don't leave the working directory sitting on the just-opened PR branch —
   the next task should start clean, not accidentally stack changes onto a
   branch that's already up for review.

8. **Report back in plain language**, e.g.:
   > Opened a PR: <url>. It's up for review — once someone approves and
   > merges it, the GitHub Pages site rebuilds automatically on push to
   > `master`.

## Notes

- Never invent content changes — only publish what the user actually edited.
- If nothing changed at all, say so rather than opening an empty PR.
- This skill's job ends at opening the PR. Merging and approving are handled
  by a human, not by this skill.
