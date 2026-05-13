# UI Contracts — Zakey Phase 01

For a static multi-page site, the "contracts" between pages are the
shared markup shapes (header, footer), the shared component classes,
and the visible state machines of interactive elements (slider, mega-
menu, mobile drawer, forms). These contracts let any future page be
built without re-deriving the patterns.

Each contract file in this directory documents:

1. **Markup shape** — the canonical HTML skeleton, including required
   ids, classes, and ARIA attributes.
2. **State machine** (where applicable) — visible states the element
   transitions through, mapped to `data-state="…"` values on the
   root element.
3. **Keyboard & a11y contract** — required keyboard interactions and
   focus behaviour.
4. **Acceptance probe** — a short manual check a reviewer can perform
   to verify compliance.

| Contract | File |
|---|---|
| Design tokens | [design-tokens.contract.md](./design-tokens.contract.md) |
| Header | [header.contract.md](./header.contract.md) |
| Footer | [footer.contract.md](./footer.contract.md) |
| Mega-menu | [mega-menu.contract.md](./mega-menu.contract.md) |
| Mobile drawer | [mobile-drawer.contract.md](./mobile-drawer.contract.md) |
| Hero / featured slider | [hero-slider.contract.md](./hero-slider.contract.md) |
| Quote form | [quote-form.contract.md](./quote-form.contract.md) |
| Newsletter form | [newsletter-form.contract.md](./newsletter-form.contract.md) |
| Image placeholder | [image-placeholder.contract.md](./image-placeholder.contract.md) |

These contracts are normative — `scripts/check-shell-consistency.sh`
will hash header/footer markup across pages and fail if they diverge.
