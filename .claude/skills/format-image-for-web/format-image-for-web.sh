#!/usr/bin/env bash
# format-image-for-web.sh — resize + convert an image to WebP, replacing the
# original. The mechanical half of the format-image-for-web skill: picking
# the target width is a judgment call (see SKILL.md), this script just does
# the resize/encode/cleanup once that call is made.
#
# Usage: format-image-for-web.sh <width> <file> [file...]
#   width  — target pixel width; height is automatic (aspect preserved).
#            Use 0 to keep the original width and only compress.
set -euo pipefail

if [ "$#" -lt 2 ]; then
  echo "Usage: $0 <width> <file> [file...]" >&2
  exit 1
fi

width="$1"; shift

if ! command -v cwebp >/dev/null 2>&1; then
  echo "cwebp not found. Install with: brew install webp" >&2
  exit 1
fi

file_size() {
  stat -f%z "$1" 2>/dev/null || stat -c%s "$1" 2>/dev/null
}

for src in "$@"; do
  if [ ! -f "$src" ]; then
    echo "skip (not found): $src" >&2
    continue
  fi
  case "$src" in
    *.webp) echo "skip (already webp): $src" >&2; continue ;;
  esac

  dst="${src%.*}.webp"
  orig_size=$(file_size "$src")
  cwebp -quiet -q 82 -resize "$width" 0 "$src" -o "$dst"
  new_size=$(file_size "$dst")
  rm "$src"
  printf '%s (%s bytes) -> %s (%s bytes)\n' "$src" "$orig_size" "$dst" "$new_size"
done
