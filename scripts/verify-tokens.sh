#!/usr/bin/env bash
# L0 token manifest verify — CSS semantic tokens must match manifest SSOT.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

MANIFEST="$ROOT/src/styles/tokens/manifest.json"
SEMANTIC_CSS="$ROOT/src/styles/tokens/semantic-ops.css"

if [[ ! -f "$MANIFEST" ]]; then
  echo "FAIL verify:tokens: manifest not found: $MANIFEST"
  exit 1
fi

if [[ ! -f "$SEMANTIC_CSS" ]]; then
  echo "FAIL verify:tokens: semantic CSS not found: $SEMANTIC_CSS"
  exit 1
fi

# Extract semantic token names from manifest (ops.semantic array)
EXPECTED=$(node -e "
const fs = require('fs');
const m = JSON.parse(fs.readFileSync('./src/styles/tokens/manifest.json', 'utf8'));
for (const t of m.ops.semantic) console.log(t);
")

MISSING=0
while IFS= read -r token; do
  [[ -z "$token" ]] && continue
  if ! grep -qE "^[[:space:]]*--${token}:" "$SEMANTIC_CSS"; then
    echo "MISSING in semantic-ops.css: --${token}"
    MISSING=$((MISSING + 1))
  fi
done <<< "$EXPECTED"

if [[ "$MISSING" -gt 0 ]]; then
  echo "FAIL verify:tokens: $MISSING semantic token(s) missing from $SEMANTIC_CSS"
  exit 1
fi

# Primitives file must exist and contain color primitives
PRIM="$ROOT/src/styles/tokens/primitives.css"
PRIM_COUNT=$(grep -cE '^[[:space:]]*--primitive-' "$PRIM" || true)
if [[ "$PRIM_COUNT" -lt 10 ]]; then
  echo "FAIL verify:tokens: expected primitive color tokens in $PRIM"
  exit 1
fi

THEME_CSS="$ROOT/src/styles/tokens/theme.css"
if [[ -f "$THEME_CSS" ]]; then
  CIRCULAR=$(python3 - <<'PY'
import re
from pathlib import Path
text = Path("src/styles/tokens/theme.css").read_text()
bad = []
for m in re.finditer(r"^\s*(--[a-z0-9.\\-]+):\s*var\((--[a-z0-9.\\-]+)\)", text, re.M):
    name, ref = m.group(1), m.group(2)
    if name == ref:
        bad.append(name)
if bad:
    print("\n".join(bad))
PY
)
  if [[ -n "$CIRCULAR" ]]; then
    echo "FAIL verify:tokens: circular @theme self-references in theme.css:"
    echo "$CIRCULAR"
    exit 1
  fi
fi

echo "PASS verify:tokens: $(echo "$EXPECTED" | grep -c .) semantic tokens present; $PRIM_COUNT primitives defined"
