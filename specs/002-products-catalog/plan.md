# Implementation Plan: Zakey Phase 02 — Product Catalog & Product Detail Pages

**Branch**: `002-products-catalog` | **Date**: 2026-05-14 | **Spec**: [./spec.md](./spec.md)
**Input**: Feature specification from `/specs/002-products-catalog/spec.md`

## Summary

Phase 02 builds the **product catalog page** (`pages/products.html`) and **four flagship product detail pages** on top of the Phase 01 shell and design system. The catalog lists ≥ 24 realistic Zakey devices across 10 categories with vanilla-JS category-pill filtering, case-insensitive substring search, live result count, and an empty-state. Each detail page reuses the same shell and design tokens and delivers the eight required sections (Hero → Overview → Key Features → Smart Scenarios → Tech Specs → Compatibility → Related Products → Final CTA). All product content lives in static HTML; JS is restricted to UI interactions (filter pills, search input, gallery thumbnail switching). Every CTA routes to a real file — quote CTAs hit the existing Phase 01 quote form anchor (`index.html#get-quote`); specialist CTAs hit `pages/contact.html`.

## Technical Context

**Language/Version**: HTML5, CSS3 (Tailwind CSS 3.4 compiled via PostCSS), Vanilla JavaScript (ES Modules, ES2020+)
**Primary Dependencies**: `tailwindcss@^3.4`, `@tailwindcss/forms`, `@tailwindcss/typography`, `postcss`, `autoprefixer` — same toolchain as Phase 01; no new dependencies.
**Storage**: N/A — all product data is authored as static HTML. `data-*` attributes on each card encode `data-category` and `data-tags` for the JS filter to read; the JS does NOT own a product database.
**Testing**: Three bash integrity gates (`scripts/check-shell-consistency.sh`, `scripts/check-content-rules.sh`, `scripts/check-links.sh`) plus manual viewport passes at 360 / 480 / 768 / 1024 / 1280 / 1440 px. No browser test framework — kept out of scope per Phase 01 decision.
**Target Platform**: All modern evergreen browsers (Chrome, Firefox, Safari, Edge) on desktop, tablet, mobile. ES modules and `IntersectionObserver` baseline already established in Phase 01.
**Project Type**: Static multi-page marketing site (frontend-only).
**Performance Goals**: First Contentful Paint < 1.5 s, Largest Contentful Paint < 2.5 s on a 3G-fast connection; filter/search response < 200 ms perceived; total page weight per page ≤ 1.5 MB. Same budgets as Phase 01.
**Constraints**:
- Tailwind CDN PROHIBITED (Constitution I).
- JS MUST NOT inject primary content (Constitution II).
- No new framework dependencies (Constitution I).
- Header/footer shell MUST stay byte-consistent with Phase 01 reference (`scripts/check-shell-consistency.sh`).
- ZERO console errors on load or during normal interaction (Constitution VI).
**Scale/Scope**: 1 catalog page + 4 fully built detail pages (Aura Panel, Secure Kit, Smart Switch Series, Climate Hub) + ~28 additional product cards (catalog-only, no dedicated detail page yet — linked to catalog anchors); ~32 products total. Catalog filter handles ≤ ~50 cards client-side (well within DOM manipulation budget). Adds ≈ 2 new JS modules (`js/products.js`, `js/product-detail.js`) and ≈ 8 KB of new CSS to `src/input.css`.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Constitution v1.0.0 — all seven principles:

| Principle | How Phase 02 complies | Status |
|---|---|---|
| **I. Static-First, Framework-Free Stack** | No new dependencies. Uses the existing `tailwindcss` + `postcss` build. No CDN. No React/Vue/etc. New JS lives in plain ES modules. | ✅ |
| **II. Content Lives in HTML, Behavior Lives in JS** | Every product card, every detail-page section, every spec row, every scenario sentence is hand-authored static HTML. `js/products.js` only adds/removes a CSS class on cards (`.is-hidden`) to filter; it never `innerHTML` writes product content. `js/product-detail.js` only swaps an `<img src>` and `aria-selected` state for gallery thumbnails. | ✅ |
| **III. Premium Visual Language (NON-NEGOTIABLE)** | Reuses `.card-product`, `.btn--*`, design tokens, focus-ring rules from Phase 01. New filter-pill component and detail-page section components extend (not parallel-invent) the existing scale: same radii, same shadows, same spacing scale. Every section gets a visual: product image on every card, hero image + lifestyle image + related-product images on every detail page. | ✅ |
| **IV. Independent Zakey Brand Identity** | All product names, copy, taglines, and specifications are original Zakey content. Existing forbidden-string gate (`scripts/check-content-rules.sh`) will catch any "lifesmart" / "ilifesmart" / "CoSS" / "AI Builder" / "Fusion Link" regression. | ✅ |
| **V. Realistic, Production-Ready Content** | ≥ 24 product cards each with image, category, name, description, tags, two CTAs. Detail pages have populated tech specs (real wattages, real protocols), populated scenarios, populated compatibility chips. No lorem ipsum (gate catches it). No empty cards (FR-005, FR-021). | ✅ |
| **VI. Working UI Quality Bar** | Three integrity gates already wired. Filter, search, gallery switching all keyboard-accessible (`aria-pressed`, `aria-selected`, arrow-key navigation). Detail-page CTAs anchor to real files. Mobile drawer / mega-menu inherited from Phase 01 and not touched. | ✅ |
| **VII. Phased Implementation Discipline** | Phase 02 ships 4 fully built detail pages — not 4 stubs. Products in the catalog without a detail page link to their anchor on the catalog page (FR-062), not to a half-built "coming soon" page. No regressions on Phase 01 — every Phase 01 page remains untouched except for shell propagation if any. | ✅ |

**Result**: No violations. Plan may proceed to Phase 0 research.

## Project Structure

### Documentation (this feature)

```text
specs/002-products-catalog/
├── plan.md              # This file (/speckit-plan command output)
├── research.md          # Phase 0 output (/speckit-plan command)
├── data-model.md        # Phase 1 output (/speckit-plan command)
├── quickstart.md        # Phase 1 output (/speckit-plan command)
├── contracts/           # Phase 1 output (/speckit-plan command)
│   ├── catalog-page.contract.md
│   ├── product-card.contract.md
│   ├── product-detail-page.contract.md
│   ├── filter-pill.contract.md
│   ├── product-search.contract.md
│   └── gallery-thumbnails.contract.md
└── tasks.md             # Phase 2 output (/speckit-tasks command - NOT created by /speckit-plan)
```

### Source Code (repository root)

Flat static-site layout — the structure already established by Phase 01 is extended (not restructured) for Phase 02:

```text
index.html                          # (unchanged from Phase 01)
pages/
├── about.html                      # (unchanged)
├── blog.html                       # (unchanged)
├── contact.html                    # (unchanged — receives "Talk to a Specialist" link target)
├── partners.html                   # (unchanged)
├── privacy.html                    # (unchanged)
├── products.html                   # ⮕ REWRITTEN in Phase 02 — catalog page
├── product-zakey-aura-panel.html   # ⮕ NEW (Phase 02)
├── product-zakey-secure-kit.html   # ⮕ NEW (Phase 02)
├── product-zakey-smart-switch.html # ⮕ NEW (Phase 02)
├── product-zakey-climate-hub.html  # ⮕ NEW (Phase 02)
├── projects.html                   # (unchanged)
├── software.html                   # (unchanged)
├── solutions.html                  # (unchanged)
├── technology.html                 # (unchanged)
└── terms.html                      # (unchanged)
src/
└── input.css                       # ⮕ APPENDED in Phase 02 — new catalog/detail components
css/
└── styles.css                      # ⮕ rebuilt from src/input.css
js/
├── main.js                         # ⮕ APPENDED — wires products.js / product-detail.js per page
├── navigation.js                   # (unchanged)
├── forms.js                        # (unchanged)
├── homepage.js                     # (unchanged)
├── products.js                     # ⮕ NEW — catalog filter/search/empty-state
└── product-detail.js               # ⮕ NEW — gallery thumbnail switching
assets/
└── images/
    └── products/                   # ⮕ APPENDED — new product SVG placeholders for any
                                    #   product without an asset (covers all 32 products);
                                    #   uses same gradient+label visual convention as Phase 01.
scripts/
├── check-shell-consistency.sh      # (unchanged — re-runs against new pages)
├── check-content-rules.sh          # (unchanged — re-runs against new pages)
└── check-links.sh                  # (unchanged — re-runs against new pages)
```

**Structure Decision**: Phase 02 extends the flat layout. **Six existing files** receive append-only edits (`src/input.css`, `js/main.js`, `pages/products.html` — full rewrite of the existing placeholder, plus the four pages reachable via the homepage "Featured Products" preview which have their "View Details" links updated where the destination now exists). **Six new files** ship: 4 detail pages + 2 JS modules. No file gets restructured; no new directory tree. The new JS modules follow the same `export function init…()` pattern as `navigation.js` and `forms.js`, loaded conditionally from `main.js` based on `document.getElementById('product-grid')` / `document.body.dataset.page === 'product-detail'`.

## Complexity Tracking

No constitution-check violations. No complexity-tracking entries required.
