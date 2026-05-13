#!/usr/bin/env bash
# Gate 3: every href= and src= in every .html resolves to a real file or is external/anchor
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
HTML_FILES=()
while IFS= read -r -d '' f; do
  HTML_FILES+=("$f")
done < <(find "$ROOT" -maxdepth 2 -name "*.html" -not -path "*/node_modules/*" -print0 | sort -z)

if [[ ${#HTML_FILES[@]} -eq 0 ]]; then
  echo "[check-links] No .html files found — skipping (OK)."
  exit 0
fi

FAIL=0
ERRORS=()

for f in "${HTML_FILES[@]}"; do
  rel="${f#"$ROOT/"}"
  dir="$(dirname "$f")"

  # Extract all href and src attribute values
  while IFS= read -r attr_val; do
    # Strip leading/trailing whitespace and quotes
    val="$(echo "$attr_val" | sed 's/^[[:space:]]*//;s/[[:space:]]*$//' | tr -d '"'"'")"

    # Skip empty
    [[ -z "$val" ]] && continue

    # Skip external URLs and non-file URI schemes
    [[ "$val" == http://* || "$val" == https://* ]] && continue
    [[ "$val" == mailto:* || "$val" == tel:* || "$val" == javascript:* ]] && continue

    # Skip pure in-page anchors (#something) — just verify id exists on this page
    if [[ "$val" == \#* ]]; then
      anchor_id="${val:1}"
      [[ -z "$anchor_id" ]] && continue
      if ! grep -q "id=\"${anchor_id}\"" "$f"; then
        ERRORS+=("$rel: anchor '#${anchor_id}' target id not found in same page")
        ((FAIL++)) || true
      fi
      continue
    fi

    # Strip in-page anchor from path-based links (e.g. ./page.html#section)
    path_part="${val%%#*}"
    [[ -z "$path_part" ]] && continue

    # Resolve relative path from file's directory
    resolved="$(cd "$dir" && realpath -m "$path_part" 2>/dev/null || echo "")"

    if [[ -z "$resolved" || ! -e "$resolved" ]]; then
      ERRORS+=("$rel: broken link → $val")
      ((FAIL++)) || true
    fi
  done < <(grep -oP '(?:href|src)=["'"'"'][^"'"'"']*["'"'"']' "$f" \
            | sed 's/^.*=["'"'"']//;s/["'"'"']$//')
done

echo ""
echo "=== Link Integrity Check ==="
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
echo "RESULT: PASS — all links resolve."
exit 0
