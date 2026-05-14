# UI Contract: Floating WhatsApp Button

**Feature**: `005-final-pages-qa` | **Phase**: 1 (Design)

## Where it appears

Rendered inline at the bottom of `<body>` on:

| Page | Render? |
|---|---|
| `pages/contact.html` | YES (mandatory per FR-024) |
| `pages/become-a-partner.html` | YES (polish enhancement) |
| `pages/projects.html` | YES |
| `pages/project-luxury-villa.html` | YES |
| `pages/project-smart-hotel.html` | YES |
| `pages/project-smart-office.html` | YES |
| `pages/blog.html` | YES |
| `pages/article-smart-home-guide.html` | YES |
| `pages/article-villa-automation.html` | YES |
| `pages/article-hotel-smart-room.html` | YES |
| `pages/about.html` | YES |
| `pages/privacy.html` | NO (legal page — no marketing CTAs) |
| `pages/terms.html` | NO (legal page — no marketing CTAs) |
| `pages/404.html` | NO (error page) |
| `index.html` | NO (homepage has primary CTAs) |
| `pages/products.html`, `pages/product-*.html` | NO |
| `pages/solutions.html`, `pages/solution-*.html` | NO |
| `pages/technology.html` | NO |
| `pages/software.html` | NO |
| `pages/partners.html` | NO |

## DOM shape

```html
<!-- PLACEHOLDER: replace 0000000000 with the real Zakey WhatsApp number before client handoff -->
<a class="floating-whatsapp"
   href="https://wa.me/0000000000"
   target="_blank"
   rel="noopener"
   aria-label="Chat with Zakey on WhatsApp">
  <svg aria-hidden="true" focusable="false" width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
    <!-- WhatsApp phosphor-style chat-bubble glyph -->
  </svg>
  <span class="floating-whatsapp__label">WhatsApp</span>
</a>
```

The `<span class="floating-whatsapp__label">` is visually hidden by default but appears as a tooltip on hover/focus on desktop.

## CSS contract

```css
.floating-whatsapp {
  position: fixed;
  bottom: max(1.25rem, env(safe-area-inset-bottom));
  right: 1.25rem;
  z-index: 50;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 9999px;
  background-color: #25D366;          /* WhatsApp brand green */
  color: #ffffff;
  box-shadow: 0 8px 20px rgba(37, 211, 102, 0.35), 0 2px 4px rgba(0, 0, 0, 0.15);
  transition: transform 200ms ease, box-shadow 200ms ease;
}

.floating-whatsapp:hover,
.floating-whatsapp:focus-visible {
  transform: translateY(-2px);
  box-shadow: 0 12px 28px rgba(37, 211, 102, 0.45), 0 3px 6px rgba(0, 0, 0, 0.2);
}

.floating-whatsapp:focus-visible {
  outline: 3px solid var(--color-accent);
  outline-offset: 4px;
}

.floating-whatsapp__label {
  /* visually-hidden by default; surfaces as tooltip on >=lg viewports */
  position: absolute;
  white-space: nowrap;
  right: calc(100% + 0.5rem);
  background: var(--color-surface-elevated);
  color: var(--color-text);
  padding: 0.4rem 0.75rem;
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  opacity: 0;
  pointer-events: none;
  transition: opacity 150ms ease;
}

.floating-whatsapp:hover .floating-whatsapp__label,
.floating-whatsapp:focus-visible .floating-whatsapp__label {
  opacity: 1;
}

@media (max-width: 640px) {
  .floating-whatsapp { width: 52px; height: 52px; right: 1rem; bottom: max(1rem, env(safe-area-inset-bottom)); }
  .floating-whatsapp__label { display: none; }
}

@media (prefers-reduced-motion: reduce) {
  .floating-whatsapp,
  .floating-whatsapp:hover,
  .floating-whatsapp:focus-visible { transition: none; transform: none; }
}
```

## Theme behavior

The button uses WhatsApp's brand green (#25D366) on both themes — the brand recognition is the whole point. The tooltip uses theme tokens, so it reads correctly under both themes.

## Z-index coordination

`z-index: 50` is below the mobile-drawer overlay (Phase 01 uses ~100) and below the theme-toggle dropdown if any. The button stays interactive on top of page content but does not obscure UI chrome.

## Per-page footer ordering

The `<a class="floating-whatsapp">` element is the FINAL child of `<body>` — after the global footer, after all scripts. This guarantees it is on the top of the painted stack regardless of stacking-context quirks in other elements.

## No JavaScript module

The floating WhatsApp button is pure HTML + CSS. No `js/floating-whatsapp.js` module exists. There is no entrance animation, no scroll-trigger, no dismissal — the button is rendered with the page and is always visible on applicable pages.
