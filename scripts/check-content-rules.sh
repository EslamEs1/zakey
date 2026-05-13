#!/usr/bin/env bash
# Gate 2: content integrity checks on every .html file
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
HTML_FILES=()
while IFS= read -r -d '' f; do
  HTML_FILES+=("$f")
done < <(find "$ROOT" -maxdepth 2 -name "*.html" -not -path "*/node_modules/*" -print0 | sort -z)

if [[ ${#HTML_FILES[@]} -eq 0 ]]; then
  echo "[check-content] No .html files found — skipping (OK)."
  exit 0
fi

FAIL=0
ERRORS=()

for f in "${HTML_FILES[@]}"; do
  rel="${f#"$ROOT/"}"

  # Forbidden strings (case-insensitive)
  if grep -qi "lorem ipsum" "$f"; then
    ERRORS+=("$rel: contains 'lorem ipsum'")
    ((FAIL++)) || true
  fi
  if grep -qi "lifesmart" "$f"; then
    ERRORS+=("$rel: contains 'lifesmart'")
    ((FAIL++)) || true
  fi
  if grep -qi "ilifesmart" "$f"; then
    ERRORS+=("$rel: contains 'ilifesmart'")
    ((FAIL++)) || true
  fi

  # Exactly one <h1>
  H1_COUNT=$(grep -ci "<h1" "$f" || true)
  if [[ "$H1_COUNT" -ne 1 ]]; then
    ERRORS+=("$rel: expected 1 <h1>, found $H1_COUNT")
    ((FAIL++)) || true
  fi

  # Non-empty <title>
  TITLE=$(grep -oi "<title>[^<]*</title>" "$f" | sed 's/<[^>]*>//g' | tr -d '[:space:]' || true)
  if [[ -z "$TITLE" ]]; then
    ERRORS+=("$rel: missing or empty <title>")
    ((FAIL++)) || true
  fi

  # <meta name="description" content="..."> with non-empty content
  META_DESC=$(grep -oi 'meta name="description"[^>]*content="[^"]*"' "$f" \
    | grep -oi 'content="[^"]*"' \
    | sed 's/content="//;s/"//' \
    | tr -d '[:space:]' || true)
  if [[ -z "$META_DESC" ]]; then
    ERRORS+=("$rel: missing or empty <meta name=\"description\">")
    ((FAIL++)) || true
  fi

  # No alert(/confirm(/prompt( in inline JS
  if grep -qP '(?:alert|confirm|prompt)\s*\(' "$f" 2>/dev/null || \
     grep -q 'alert\s*(' "$f" || grep -q 'confirm\s*(' "$f" || grep -q 'prompt\s*(' "$f"; then
    ERRORS+=("$rel: contains alert(/confirm(/prompt( in inline JS")
    ((FAIL++)) || true
  fi
done

echo ""
echo "=== Content Rules Check ==="
echo "  Files checked : ${#HTML_FILES[@]}"
echo "  Failures      : $FAIL"

if [[ $FAIL -gt 0 ]]; then
  echo ""
  echo "FAILURES:"
  for err in "${ERRORS[@]}"; do
    echo "  ✗ $err"
  done
  echo ""
  echo "RESULT: FAIL"
  exit 1
fi

echo ""
echo "RESULT: PASS — all content rules satisfied."
exit 0
