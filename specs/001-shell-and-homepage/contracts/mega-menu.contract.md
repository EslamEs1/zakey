# Contract — Mega-Menu (Products / Solutions)

**Scope**: Desktop-only (≥1025px) disclosure menus opened from the
"Products" and "Solutions" header buttons. On mobile, the same items
are flattened into the mobile drawer.

## Markup shape

```html
<li class="has-mega">
  <button type="button"
          class="site-header__megabtn"
          aria-expanded="false"
          aria-controls="mega-products"
          data-mega-trigger="products">
    Products <svg …caret… aria-hidden="true"></svg>
  </button>

  <div id="mega-products"
       class="mega-panel"
       role="region"
       aria-label="Products overview"
       data-mega-panel="products"
       hidden>
    <div class="mega-panel__inner">
      <div class="mega-panel__intro">
        <h3>Hardware that disappears into your home</h3>
        <p>Eight categories engineered to feel like a single ecosystem.</p>
        <a class="btn btn--ghost" href="./pages/products.html">All products →</a>
      </div>
      <ul class="mega-panel__grid">
        <li>
          <a href="./pages/products.html#control-panels">
            <svg …icon… aria-hidden="true"></svg>
            <span class="mega-panel__title">Control Panels</span>
            <span class="mega-panel__sub">Wall-mounted command for every room</span>
          </a>
        </li>
        …seven more product-category links…
      </ul>
    </div>
  </div>
</li>
```

Solutions panel uses the same shape with `data-mega-panel="solutions"`
and six entries (one per `SolutionSpace`).

## State

The state lives on the trigger via `aria-expanded` and on the panel
via `hidden`. CSS uses `[aria-expanded="true"] + .mega-panel` or a
sibling/`data-` selector to drive transitions.

| Event | Result |
|---|---|
| Mouse hover on `.has-mega` (≥1025px) | Open after 80 ms hover delay |
| Mouse leave on `.has-mega` | Close after 200 ms grace period |
| Focus enters trigger button | Open immediately |
| Focus leaves panel | Close |
| `Enter` / `Space` on trigger | Toggle open/closed |
| `Escape` while panel open | Close + return focus to trigger |
| Click outside header | Close all open panels |
| Resize crosses <1025px | Close all open panels |

## Keyboard contract

- Trigger button is always focusable.
- When panel opens, focus does **not** move into the panel
  automatically — user can Tab into it. (Disclosure pattern, not
  modal.)
- Once focus is inside the panel, Tab moves through the links in
  source order; `Shift+Tab` reverses.
- `Escape` closes the panel and returns focus to the trigger button.

## Acceptance probe

1. Hover "Products" — panel opens within 200 ms and stays open while
   pointer is in panel or trigger.
2. Tab to "Products" button, press Enter — panel opens; press Tab —
   focus moves to first link in panel; press Escape — panel closes
   and focus returns to "Products" button.
3. Resize from 1280 px → 480 px — any open mega panel closes; mobile
   drawer takes over.
4. With `prefers-reduced-motion: reduce`, panel opens/closes without
   animation but keyboard/mouse behaviour is unchanged.
