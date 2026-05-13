# Contract — Product Search (catalog page)

**Scope**: The `.catalog-search` input + the live-count status line + the `.catalog-empty` empty-state block. Implements case-insensitive substring search across the catalog.

## Markup shape

```html
<label class="catalog-search">
  <span class="sr-only">Search products</span>
  <svg class="catalog-search__icon" aria-hidden="true">…</svg>
  <input type="search"
         name="product-search"
         placeholder="Search products, categories, features…"
         autocomplete="off"
         data-product-search>
</label>

<p class="catalog-status" aria-live="polite">
  Showing <span data-visible-count>32</span> of <span data-total-count>32</span> products.
</p>

<div class="catalog-empty" hidden>
  <svg class="catalog-empty__icon" aria-hidden="true">…</svg>
  <h3 class="catalog-empty__title">No products match your filters</h3>
  <p class="catalog-empty__desc">
    Try a different category, or clear your search to see everything.
  </p>
  <button type="button" class="btn btn--ghost" data-clear-search>
    Clear search
  </button>
</div>
```

## Required attributes

| Element | Attribute | Purpose |
|---|---|---|
| `<input>` | `type="search"` | Native clear-control on supporting browsers |
| `<input>` | `data-product-search` | Identifies the field to `js/products.js` |
| `<input>` | `autocomplete="off"` | Prevents browser history dropdown |
| `<input>` | `placeholder` | Hints at what's searchable |
| status `<p>` | `aria-live="polite"` | Screen-reader announcement of count changes |
| count spans | `data-visible-count`, `data-total-count` | Targets for JS updates |
| empty `<div>` | `hidden` | Initial state; toggled by JS |
| reset `<button>` | `data-clear-search` | Identifies the clear-search action |

## Search algorithm

1. **Normalisation**: Read the input value, `.trim()`, `.toLowerCase()`. Empty string → search is inactive (matches everything).
2. **Searchable text per card**: Computed lazily once per card and cached on a non-DOM property (`card._searchable`). Combines:
   - `.card-product__name` text
   - `.card-product__desc` text
   - `data-tags` attribute value
   joined with spaces and lowercased.
3. **Match**: `card._searchable.includes(query)`. Pure substring; no regex, no fuzzy, no stemming.
4. **Combination with category filter**: A card is visible iff `matchesCategory AND matchesQuery`.
5. **Debounce**: The `input` event handler is debounced at 80 ms to avoid mid-keystroke thrash on slow devices.
6. **Empty-state visibility**: When `visibleCount === 0`, the `.catalog-empty` block has `hidden = false`. Otherwise it has `hidden = true`.
7. **Live count update**: After every `applyFilters()`, `[data-visible-count]` text is set to the new count. `[data-total-count]` is set once at init from the number of `[data-product]` cards.

## Clear-search behaviour

- Click on `[data-clear-search]` (the empty-state button) → input value is cleared, search becomes inactive, `applyFilters()` re-runs.
- The category filter is **not** affected — clearing search keeps the active category. The visitor still sees an empty-state if the category itself has no products, but that should not be possible (every category has ≥ 2 products per the data model).
- Native `<input type="search">` clear control (the small × on the right): same behaviour as `[data-clear-search]` — the browser fires `input` events, which the debounced handler picks up.

## CSS behaviour

- Input has a focus ring matching Phase 01's `:focus-visible` rule.
- Input wraps to full width on narrow viewports.
- Status line typography is muted; visible-count number uses the accent colour.
- Empty-state card spans the full grid width (`grid-column: 1 / -1`).

## Accessibility

- `<label class="catalog-search">` wraps the input. The `<span class="sr-only">` provides the accessible name "Search products" (not a placeholder, which doesn't substitute for a label).
- `aria-live="polite"` on the status line announces "Showing 6 of 32 products" without interrupting reading flow.
- Empty-state heading is `<h3>` (one level below the page's `<h2>` for the grid section).
- "Clear search" button is keyboard-reachable when the empty-state is visible.

## Acceptance probe

- [ ] Type "panel" → only cards whose name/desc/tags contain "panel" remain visible; count updates; live region announces.
- [ ] Type a query with no matches ("xyz999") → empty-state appears, "Clear search" button is focusable, count shows "0 of 32".
- [ ] Click "Clear search" → input clears, full grid returns (within the active category).
- [ ] Activate Security pill, then type "lock" → only Security cards mentioning lock are visible.
- [ ] Use the native × on the search input → behaves the same as Clear search.
- [ ] Tab into search input → focus ring visible; Tab again → next interactive element.
- [ ] Inspect the DOM → status `<p>` has `aria-live="polite"`.
