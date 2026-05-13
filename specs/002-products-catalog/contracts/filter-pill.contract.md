# Contract — Filter Pill

**Scope**: The `.filter-pill` element. A toolbar of mutually-exclusive toggle buttons that controls which product cards are visible on the catalog page.

## Markup shape

```html
<div class="catalog-toolbar__filters" role="toolbar" aria-label="Product category filters">
  <button type="button" class="filter-pill"
          data-category="all"
          aria-pressed="true">
    All
  </button>
  <button type="button" class="filter-pill"
          data-category="central-control"
          aria-pressed="false"
          id="filter-central-control">
    Central Control
  </button>
  <button type="button" class="filter-pill"
          data-category="security"
          aria-pressed="false"
          id="filter-security">
    Security
  </button>
  …8 more category pills…
</div>
```

## Required attributes per pill

| Attribute | Value | Purpose |
|---|---|---|
| `type="button"` | required | Stops accidental form submission |
| `class="filter-pill"` | required | Hooks into CSS + JS |
| `data-category="<slug>"` | required | One of: `all`, `central-control`, `smart-switches`, `security`, `sensors`, `lighting`, `curtains-shading`, `climate`, `energy`, `entertainment`, `accessories` |
| `aria-pressed` | `"true"` or `"false"` | Exactly one pill at a time has `"true"` |
| `id="filter-<slug>"` | required for non-"all" pills | Allows category-anchor scroll targets and deep links from mega-menu |

## Behaviour

1. **Mutual exclusivity**: At any given moment, exactly one pill has `aria-pressed="true"`. Clicking a pill that is not currently active deactivates the previous pill (sets it to `"false"`) and activates the clicked one.
2. **Clicking the active pill again is a no-op**: The pill stays active. (This is deliberate — a click on the "All" pill to clear filters is the explicit reset path; re-clicking an already-active category should not toggle off.)
3. **Filter call**: After every successful click, the JS calls `applyFilters()`. The pill click handler does not directly write to the DOM beyond toggling `aria-pressed` on itself and the previously active pill.
4. **Deep-link pre-activation**: On page load, if `window.location.hash` matches a known category slug, that pill is programmatically activated before the first user input is possible.

## CSS state

| State | Visual treatment |
|---|---|
| Default (`aria-pressed="false"`) | Transparent background, muted-text colour, 1 px subtle border |
| Hover (`aria-pressed="false"`) | Accent-tinted border + faint accent background, accent text |
| Active (`aria-pressed="true"`) | Solid accent background, ink-on-accent text, no border |
| `:focus-visible` (any state) | 3 px accent-soft outline ring (inherited from Phase 01 base) |

## Accessibility

- The container is `role="toolbar" aria-label="Product category filters"`. Tab moves into the toolbar and through each pill.
- Each pill is a real `<button>`, fully keyboard-activatable (Enter / Space).
- `aria-pressed` is the standard pattern for toggle buttons and is announced as "pressed / not pressed" by screen readers.
- Pills wrap to additional rows on small viewports; horizontal scroll on the toolbar is acceptable on very narrow widths (≤ 360 px).
- `aria-pressed` is NEVER `"mixed"` — the catalog has no indeterminate state.

## Acceptance probe

- [ ] Inspect the toolbar → 11 buttons, exactly one with `aria-pressed="true"`.
- [ ] Click "Security" → previous pill flips to `"false"`, "Security" flips to `"true"`, grid filters.
- [ ] Tab through the toolbar → focus ring visible on each pill in turn; Enter activates.
- [ ] Click the currently-active pill → no change, no flicker.
- [ ] At 360 px → pills wrap to multiple rows or scroll horizontally; no overflow.
- [ ] Visit `pages/products.html#energy` → "Energy" pill is `aria-pressed="true"` on first paint without any user interaction.
