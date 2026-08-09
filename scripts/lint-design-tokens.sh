#!/usr/bin/env bash
# Fail non-semantic Tailwind in app UI code — use design/tokens semantic utilities.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

TARGETS=("${@:-src/components}")
FAIL=0

check_dir() {
  local dir="$1"
  [[ -d "$dir" ]] || return 0

  # Arbitrary hex in Tailwind arbitrary values
  if matches=$(grep -RInE 'bg-\[#|text-\[#' "$dir" --include='*.tsx' --include='*.ts' 2>/dev/null || true); then
    if [[ -n "$matches" ]]; then
      echo "FAIL design token lint: arbitrary hex in $dir/"
      echo "$matches"
      FAIL=1
    fi
  fi

  # Primitive palette utilities (use semantic tokens)
  if matches=$(grep -RInE '\b(bg|text|border|ring|fill|stroke)-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-[0-9]{2,3}\b' \
    "$dir" --include='*.tsx' --include='*.ts' 2>/dev/null || true); then
    if [[ -n "$matches" ]]; then
      echo "FAIL design token lint: primitive palette classes in $dir/"
      echo "$matches"
      FAIL=1
    fi
  fi

  # Opacity hacks on semantic color utilities
  if matches=$(grep -RInE '\b(text-foreground|bg-background|bg-muted|border-border|text-muted-foreground)/[0-9]{2}\b' \
    "$dir" --include='*.tsx' --include='*.ts' 2>/dev/null || true); then
    if [[ -n "$matches" ]]; then
      echo "FAIL design token lint: opacity hacks on semantic colors in $dir/ (use *-muted, *-subtle, etc.)"
      echo "$matches"
      FAIL=1
    fi
  fi

  # Non-semantic radius scale (prefer rounded-input, rounded-card, rounded-surface, rounded-modal, rounded-control, rounded-badge)
  if matches=$(grep -RInE '\brounded-(sm|md|lg|xl|2xl)\b' "$dir" --include='*.tsx' --include='*.ts' 2>/dev/null || true); then
    if [[ -n "$matches" ]]; then
      echo "FAIL design token lint: non-semantic radius in $dir/ (use rounded-input|card|surface|modal|control|badge|chip)"
      echo "$matches"
      FAIL=1
    fi
  fi

  # Raw black/white utilities
  if matches=$(grep -RInE '\b(bg|text|border|ring)-(black|white)(/|\b)' "$dir" --include='*.tsx' --include='*.ts' 2>/dev/null || true); then
    if [[ -n "$matches" ]]; then
      echo "FAIL design token lint: raw black/white utilities in $dir/"
      echo "$matches"
      FAIL=1
    fi
  fi
}

for t in "${TARGETS[@]}"; do
  check_dir "$t"
done

if [[ "$FAIL" -ne 0 ]]; then
  echo "Use semantic tokens per docs/project-guidance/design-system/tokens.md"
  exit 1
fi

echo "PASS design token lint: semantic token rules in ${TARGETS[*]}"
