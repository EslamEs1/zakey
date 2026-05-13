# Contract — Mobile Drawer

**Scope**: Mobile-only (≤640px). Slides in from the right (or full
screen) when the header hamburger is activated. Lists all ten top
nav links flattened, plus mega-menu groups as accordion sections,
plus the "Get a Quote" CTA.

## Markup shape

```html
<aside id="mobile-drawer"
       class="mobile-drawer"
       data-state="closed"
       aria-hidden="true"
       aria-label="Site navigation">
  <div class="mobile-drawer__scrim" data-drawer-dismiss="true"></div>
  <div class="mobile-drawer__panel" role="dialog" aria-modal="true" aria-label="Site navigation">
    <div class="mobile-drawer__head">
      <a class="mobile-drawer__brand" href="./index.html">
        <img src="./assets/icons/zakey-wordmark.svg" alt="Zakey home" width="100" height="24">
      </a>
      <button type="button"
              class="mobile-drawer__close"
              data-drawer-dismiss="true"
              aria-label="Close menu">
        <svg …close-icon… aria-hidden="true"></svg>
      </button>
    </div>

    <nav class="mobile-drawer__nav" aria-label="Primary mobile">
      <ul>
        <li><a href="./index.html">Home</a></li>

        <li class="mobile-drawer__accordion" data-state="closed">
          <button type="button"
                  class="mobile-drawer__accordion-trigger"
                  aria-expanded="false"
                  aria-controls="mobile-products">
            Products
            <svg …caret-icon… aria-hidden="true"></svg>
          </button>
          <div id="mobile-products" class="mobile-drawer__accordion-panel" hidden>
            <ul>
              <li><a href="./pages/products.html#control-panels">Control Panels</a></li>
              …7 more…
            </ul>
          </div>
        </li>

        <li class="mobile-drawer__accordion" data-state="closed">
          <button type="button"
                  class="mobile-drawer__accordion-trigger"
                  aria-expanded="false"
                  aria-controls="mobile-solutions">
            Solutions
            <svg …caret-icon… aria-hidden="true"></svg>
          </button>
          <div id="mobile-solutions" class="mobile-drawer__accordion-panel" hidden>
            <ul>
              <li><a href="./pages/solutions.html#smart-villa">Smart Villa</a></li>
              …5 more…
            </ul>
          </div>
        </li>

        <li><a href="./pages/technology.html">Technology</a></li>
        <li><a href="./pages/software.html">Software</a></li>
        <li><a href="./pages/partners.html">Partners</a></li>
        <li><a href="./pages/projects.html">Projects</a></li>
        <li><a href="./pages/blog.html">Blog</a></li>
        <li><a href="./pages/about.html">About</a></li>
        <li><a href="./pages/contact.html">Contact</a></li>
      </ul>
    </nav>

    <a class="btn btn--primary mobile-drawer__cta" href="./index.html#get-quote">
      Get a Quote
    </a>
  </div>
</aside>
```

## State

| `data-state` on `.mobile-drawer` | Visibility | `aria-hidden` |
|---|---|---|
| `"closed"` | hidden, off-canvas | `"true"` |
| `"opening"` | sliding in | `"false"` |
| `"open"` | visible | `"false"` |
| `"closing"` | sliding out | `"true"` |

CSS transitions handle opening/closing visuals; JS toggles
`data-state` and `aria-hidden`.

## Open / close triggers

| Event | Result |
|---|---|
| Click `.site-header__hamburger` | open |
| Click `.mobile-drawer__close` | close |
| Click `.mobile-drawer__scrim` | close |
| `Escape` while open | close + return focus to hamburger |
| Window resize crosses 1025px | force close + restore desktop nav |
| Click any link inside drawer | close + follow link |

## Focus management

- On open: focus moves to `.mobile-drawer__close` after the open
  transition completes (~250 ms).
- While open: Tab is trapped inside `.mobile-drawer__panel` (focus
  cycles back to first focusable element after the last).
- On close: focus returns to the hamburger button that opened it.

## Accordion behaviour

- Products and Solutions accordions are mutually exclusive: opening
  one collapses the other.
- `aria-expanded` on trigger reflects state.
- `hidden` attribute is removed when expanded.

## Body scroll lock

When the drawer is open, `<body>` receives `data-drawer-open="true"`
and CSS sets `overflow: hidden` on `html, body` to lock background
scroll. Restored on close.

## Acceptance probe

1. At 480 px, tap hamburger — drawer slides in from the right; focus
   moves to the close button; body cannot scroll.
2. Tab through drawer — focus cycles within the drawer; cannot reach
   underlying page content.
3. Tap Products accordion trigger — panel expands, caret rotates,
   Solutions accordion collapses if it was open.
4. Press Escape — drawer closes; focus returns to hamburger; body
   scroll is restored.
5. Resize from 480 px → 1280 px while drawer is open — drawer force-
   closes; desktop nav becomes visible without visual jank.
