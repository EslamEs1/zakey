# Contract — Product Detail Gallery Thumbnails

**Scope**: The `.product-hero__thumbs` strip on detail pages. Implements the WAI-ARIA Tabs pattern (single-select) with a tablist of buttons, swapping the source of the main `#product-main-image` on selection. **User Story 4 priority P3** — pages MAY ship with a single-image hero and no thumbnail strip; if they ship a strip, the contract applies in full.

## Markup shape

```html
<div class="product-hero__main">
  <img id="product-main-image"
       src="../assets/images/products/zakey-aura-panel.svg"
       alt="Zakey Aura Panel — front view, illuminated glass surface"
       width="640" height="480"
       fetchpriority="high">
</div>

<div class="product-hero__thumbs"
     role="tablist"
     aria-label="Product views">

  <button type="button" role="tab"
          aria-selected="true"
          tabindex="0"
          data-thumb-src="../assets/images/products/zakey-aura-panel.svg"
          data-thumb-alt="Zakey Aura Panel — front view, illuminated glass surface"
          aria-label="Front view">
    <img src="../assets/images/products/zakey-aura-panel.svg"
         alt="" width="80" height="60" loading="lazy" decoding="async">
  </button>

  <button type="button" role="tab"
          aria-selected="false"
          tabindex="-1"
          data-thumb-src="../assets/images/products/zakey-aura-panel-angle.svg"
          data-thumb-alt="Zakey Aura Panel — angled view showing depth profile"
          aria-label="Angled view">
    <img src="../assets/images/products/zakey-aura-panel-angle.svg"
         alt="" width="80" height="60" loading="lazy" decoding="async">
  </button>

  <button type="button" role="tab"
          aria-selected="false"
          tabindex="-1"
          data-thumb-src="../assets/images/products/zakey-aura-panel-detail.svg"
          data-thumb-alt="Close-up of the capacitive glass surface"
          aria-label="Surface detail">
    <img src="../assets/images/products/zakey-aura-panel-detail.svg"
         alt="" width="80" height="60" loading="lazy" decoding="async">
  </button>
</div>
```

## Required attributes per thumbnail

| Attribute | Value | Purpose |
|---|---|---|
| `role="tab"` | required | Marks the button as a tab in the strip |
| `aria-selected` | `"true"` (one) / `"false"` (others) | Active state announcement |
| `tabindex` | `"0"` (active) / `"-1"` (inactive) | Roving tabindex — only active thumb in tab order |
| `data-thumb-src` | full path | New `src` for `#product-main-image` |
| `data-thumb-alt` | descriptive | New `alt` for `#product-main-image` |
| `aria-label` | short label | Accessible name for the tab (since the inner img has empty alt) |

## Behaviour

1. **Click**: User clicks a thumb → JS sets that thumb's `aria-selected="true"` and `tabindex="0"`; all other thumbs get `aria-selected="false"` and `tabindex="-1"`; `#product-main-image`'s `src` and `alt` are set from the clicked thumb's `data-thumb-src` / `data-thumb-alt`; focus stays on the clicked thumb.
2. **Keyboard activation (Enter / Space)** on a focused thumb: same as click.
3. **ArrowLeft / ArrowRight**: Moves active selection to the previous / next thumb in DOM order; selection wraps at the ends. Behaves as a one-step rotation, not a focus-only move (we use **automatic-activation tabs** per WAI-ARIA's "Tabs with Automatic Activation" pattern, because the panel content is a single image — switching is cheap and intuitive).
4. **Home / End**: Move to first / last thumb.
5. **Tab in / Tab out**: Tab moves focus into the strip onto the currently active thumb; Tab again moves focus to the next focusable element outside the strip (skipping the inactive thumbs).
6. **No JS**: With JS disabled, the initial `<img>` is the only one shown; thumbs are visually present but inactive (no error). Acceptable graceful degradation per Constitution VI.

## JS module entry

`js/product-detail.js` exports `initGallery()`. `js/main.js` invokes it conditionally:

```js
if (document.body.dataset.page === 'product-detail') {
  import('./product-detail.js').then(m => m.initGallery());
}
```

`initGallery()` queries `[role="tablist"][aria-label="Product views"]` once and binds:
- click listener (delegated) on the tablist
- keydown listener on the tablist
- no listeners on individual thumbs

If no tablist is found (e.g., a detail page shipped without a gallery), `initGallery()` returns early without error.

## CSS state

| State | Treatment |
|---|---|
| Inactive thumb | 60 % opacity, no border |
| Hover / focus on inactive thumb | 100 % opacity, accent-soft border |
| Active thumb (`aria-selected="true"`) | 100 % opacity, accent border, slight scale |
| `:focus-visible` | Inherits Phase 01 base focus ring |

The main image transitions via `opacity` (200 ms) when the JS swaps it; users see a faint crossfade rather than a hard flicker.

## Accessibility

- Tablist gets `aria-label="Product views"`.
- Each tab has an explicit `aria-label` (since the inner `<img alt="">` is decorative).
- Roving tabindex keeps only the active thumb in the Tab order; this is the standard ARIA pattern.
- Automatic-activation tabs (selection follows focus): when an arrow key moves focus, the panel content also updates immediately.

## Acceptance probe

- [ ] Inspect any detail page that ships a gallery → tablist with ≥ 2 tabs, exactly one with `aria-selected="true"`.
- [ ] Tab into the gallery → only the active thumb is reached; the next Tab leaves the gallery entirely.
- [ ] Click an inactive thumb → active state moves; main image swaps within 100 ms; focus stays on the clicked thumb.
- [ ] Press ArrowRight on the active thumb → active state moves to the next thumb; image swaps; focus moves with selection.
- [ ] Press ArrowLeft from the first thumb → active state wraps to the last thumb.
- [ ] Disable JS and reload → main image is still the initial visual; thumbs render but do not respond; no console error.
