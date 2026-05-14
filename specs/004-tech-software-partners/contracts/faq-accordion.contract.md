# Contract: FAQ Accordion (Partners page)

## Purpose

Collapsible Q&A list on the Partners page. Single-open mode by default (one item open at a time). Keyboard-accessible, screen-reader-accessible, reduced-motion-aware, and JS-fallback-safe.

## DOM contract

```html
<div class="faq" data-faq data-faq-mode="single">
  <details class="faq-item" id="faq-<id>">
    <summary class="faq-item__trigger" aria-expanded="false" aria-controls="faq-<id>-panel">
      <span class="faq-item__question">Question text</span>
      <svg class="faq-item__chevron" aria-hidden="true">...</svg>
    </summary>
    <div class="faq-item__panel" id="faq-<id>-panel" role="region" aria-labelledby="faq-<id>-trigger">
      <p>Answer paragraph 1.</p>
      <p>Answer paragraph 2 (optional).</p>
    </div>
  </details>
  <!-- 5+ more <details> items -->
</div>
```

**Why `<details>` + `<summary>`**: native browser support gives us free JS-fallback (when JS is disabled, every `<details>` is independently togglable via the native disclosure widget). The JS layer enhances this by enforcing single-open mode and adding smooth height animation.

## State contract

- Each `<details>` has the `open` attribute toggled by the user.
- `aria-expanded` on `<summary>` reflects the `open` state and is updated by JS.
- In single-open mode (`data-faq-mode="single"`), opening one item programmatically calls `.open = false` on every sibling. The JS module wires this via the `toggle` event on each `<details>`.

## Style contract

- The chevron SVG rotates 180° when `[open]` is set (`transform: rotate(180deg)` on `.faq-item__chevron`).
- The panel height transitions from 0 → auto via the `height` + `interpolate-size: allow-keywords` modern CSS pattern OR a small inline-style animation in JS. Both are acceptable.
- Under `@media (prefers-reduced-motion: reduce)`, all transitions are removed (`transition: none`).
- The focus ring on `<summary>:focus-visible` uses the site's existing focus-ring token.

## Behavior contract

- **Mouse**: clicking the `<summary>` toggles open/closed. In single-open mode, opening one closes others.
- **Keyboard**:
  - `Tab` moves focus to the next `<summary>`.
  - `Enter` or `Space` on a focused `<summary>` toggles the item (native `<details>` behavior).
  - `Shift+Tab` reverses focus.
- **Screen reader**: announces "Question text, collapsed" or "Question text, expanded" via `aria-expanded`. Answer panel is read after the question when expanded.
- **Reduced motion**: chevron rotation and height transition are skipped; the panel snaps open/closed instantly.

## Failure modes

- **No JS**: the native `<details>` disclosure widget still works. Every item is independently togglable (single-open mode is lost, but functionality is preserved).
- **JS module fails to import**: same as no-JS — graceful degradation.
- **`aria-expanded` desynchronizes from `open`**: a `toggle` event listener re-syncs on every state change.
