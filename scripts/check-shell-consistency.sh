#!/usr/bin/env bash
# Gate 1: every .html file must have byte-identical header and footer blocks
# (after normalising path prefix differences between ./ and ../)
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
HTML_FILES=()
while IFS= read -r -d '' f; do
  HTML_FILES+=("$f")
done < <(find "$ROOT" -maxdepth 2 -name "*.html" -not -path "*/node_modules/*" -print0 | sort -z)

if [[ ${#HTML_FILES[@]} -eq 0 ]]; then
  echo "[check-shell] No .html files found — skipping (OK)."
  exit 0
fi

PASS=0
FAIL=0
ERRORS=()

extract_and_hash() {
  local file="$1" marker_start="$2" marker_end="$3"
  # Normalise path-depth differences:
  #   remove ./ and ../ prefixes, then strip the 'pages/' directory segment
  #   so that './pages/products.html' (from root) and './products.html' (from pages/)
  #   both hash as 'products.html'
  awk "/<!-- ${marker_start} -->/,/<!-- ${marker_end} -->/" "$file" \
    | sed 's|\.\./||g; s|\./||g; s|pages/||g' \
    | md5sum \
    | cut -d' ' -f1
}

REFERENCE="${HTML_FILES[0]}"
REF_HEADER_HASH=$(extract_and_hash "$REFERENCE" "header:start" "header:end")
REF_FOOTER_HASH=$(extract_and_hash "$REFERENCE" "footer:start" "footer:end")

if [[ -z "$REF_HEADER_HASH" || "$REF_HEADER_HASH" == "$(echo -n | md5sum | cut -d' ' -f1)" ]]; then
  echo "[check-shell] WARNING: Reference file has no header markers: $REFERENCE"
fi

for f in "${HTML_FILES[@]}"; do
  HEADER_HASH=$(extract_and_hash "$f" "header:start" "header:end")
  FOOTER_HASH=$(extract_and_hash "$f" "footer:start" "footer:end")

  if [[ "$HEADER_HASH" != "$REF_HEADER_HASH" ]]; then
    ERRORS+=("HEADER mismatch: $f")
    ((FAIL++)) || true
  fi
  if [[ "$FOOTER_HASH" != "$REF_FOOTER_HASH" ]]; then
    ERRORS+=("FOOTER mismatch: $f")
    ((FAIL++)) || true
  fi
  if [[ "$HEADER_HASH" == "$REF_HEADER_HASH" && "$FOOTER_HASH" == "$REF_FOOTER_HASH" ]]; then
    ((PASS++)) || true
  fi
done

echo ""
echo "=== Shell Consistency Check ==="
echo "  Reference : ${REFERENCE#"$ROOT/"}"
echo "  Pages checked : ${#HTML_FILES[@]}"
echo "  Passed : $PASS"
echo "  Failed : $FAIL"

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
echo "RESULT: PASS — all header/footer blocks are consistent."
exit 0
