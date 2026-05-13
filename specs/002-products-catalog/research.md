# Phase 0 Research — Zakey Phase 02

**Feature**: Product Catalog & Product Detail Pages
**Date**: 2026-05-14
**Status**: All `NEEDS CLARIFICATION` resolved; ready for Phase 1.

The Technical Context in `plan.md` is fully concrete — the constitution fixes the stack, and Phase 01 fixed every toolchain and component decision (Tailwind 3.4, native ES modules, BEM-like component class families, three bash integrity gates). Phase 02 inherits all of those. The remaining decisions are **product-catalog-specific patterns**: how to filter cards, how to encode product metadata in HTML without violating "content in HTML, behavior in JS", how to wire detail pages, and how to keep the catalog accessible. Each decision below is independently verifiable in Phase 1.

---

## D-01 — Product metadata representation

**Decision**: Encode per-card metadata directly on the card root element as **`data-*` attributes** read by the filter script. Schema:

```html
<article class="card-product"
         data-product
         data-category="security"
         data-tags="camera outdoor weatherproof">
  …all content authored in static HTML…
</article>
```

The category is a single canonical slug (one of ten); tags are space-separated lowercase tokens that the search reads. The visible text on the card (name, description, displayed tags) is the source of truth for what visitors see; `data-tags` includes extra synonyms that visitors might type ("camera", "weatherproof", "outdoor", "porch") without requiring those words to literally appear in the card body. The visible category label is rendered as the eyebrow text; `data-category` mirrors it as a slug for filter logic.

**Rationale**:
- Keeps Constitution Principle II intact: every product card's primary content is hand-written HTML; JS only toggles a single `.is-hidden` class.
- `data-*` attributes are HTML-standard, copy-paste-friendly when authoring new products, and survive any CSS purge.
- A single per-card object/manifest in JS would force `innerHTML` rendering — exactly what Principle II prohibits.
- Synonym tags in `data-tags` extend search recall without polluting visible copy.

**Alternatives considered**:
- *A `js/product-data.js` module that JS reads and templates into the DOM* — rejected; violates Constitution II.
- *Per-card `<meta>` JSON-LD block inside `<article>`* — rejected; verbose, hard to author, and JSON-LD parsing adds runtime cost for no SEO benefit (product cards are not products in the schema.org sense without prices).
- *CSS-only `:has()` filtering driven by a radio group at the page top* — rejected; `:has()` support is now broad enough but combining it with substring search forces JS anyway, so the dual mechanism is fragile.

---

## D-02 — Filter algorithm

**Decision**: A single `applyFilters()` function reads (a) the active category pill (or `"all"`), (b) the normalised search query, and (c) iterates every `[data-product]` element exactly once, toggling `.is-hidden` based on the AND of both conditions. The filter is invoked from three event sources: a click delegate on the filter-pill row, an `input` listener on the search input (debounced at 80 ms), and the page-load handler (so URL hash like `#security` pre-activates the matching pill).

Pseudo-code:

```js
function applyFilters() {
  const activeCat = filterRow.querySelector('[aria-pressed="true"]').dataset.category;
  const query = (searchInput.value || '').trim().toLowerCase();
  let visibleCount = 0;
  for (const card of cards) {
    const matchesCat = activeCat === 'all' || card.dataset.category === activeCat;
    const matchesQry = !query || cardSearchable(card).includes(query);
    const visible = matchesCat && matchesQry;
    card.classList.toggle('is-hidden', !visible);
    if (visible) visibleCount++;
  }
  updateCount(visibleCount);
  emptyState.hidden = visibleCount > 0;
}
function cardSearchable(card) {
  // Cached on first read; combines name, description, tags into one
  // lowercase string. Re-reading the DOM each keystroke is fine for ≤50 cards.
  return card._searchable ??= [
    card.querySelector('.card-product__name')?.textContent,
    card.querySelector('.card-product__desc')?.textContent,
    card.dataset.tags
  ].join(' ').toLowerCase();
}
```

**Rationale**:
- O(N) per filter is trivial at N ≤ 50 cards; no virtualisation needed.
- Combining category and search via a single function avoids subtle state-divergence bugs (e.g., toggling category while a search is active and incorrectly clearing the search).
- Debouncing keeps mid-keystroke `applyFilters` from spamming `classList.toggle` at high typing speeds.
- Cached `_searchable` string per card avoids re-collecting `textContent` on every keystroke.

**Alternatives considered**:
- *Two independent passes (category first, then search)* — rejected; correctness is harder to prove and produces twice the DOM writes.
- *Fuzzy search (Levenshtein / Fuse.js)* — rejected; adds a dependency and is overkill for a 50-card catalog. Substring is what users actually type.
- *Hide via inline `style="display:none"`* — rejected; CSS class is cleaner, animatable, and inspectable.

---

## D-03 — Empty-state and live count

**Decision**: A single `<div class="catalog-empty" hidden>` block lives as the last child of the product grid in HTML. When `applyFilters()` finds zero matches it sets `emptyState.hidden = false` and the grid CSS still allows the empty state to take a span-full row. The block contains a small icon, headline ("No products match your filters"), short copy, and a "Clear search" button (`data-clear-search`).

A live count appears just above the grid: `<p class="catalog-status" aria-live="polite">Showing <span data-visible-count>24</span> of <span data-total-count>32</span> products.</p>`. Both numbers update from `applyFilters()`.

**Rationale**:
- Visitors get immediate feedback that their filter is doing something — critical when the result drops to a small number.
- `aria-live="polite"` announces the count change to screen readers without interrupting.
- The empty-state is part of the static HTML (Principle II) rather than dynamically injected; only its `hidden` attribute toggles.

**Alternatives considered**:
- *Show only the count, no empty-state element* — rejected; visitors are left staring at a blank grid wondering if it's broken.
- *Disable the search field on empty result* — rejected; the visitor needs to keep typing or to clear, not be locked out.

---

## D-04 — URL hash deep-link behaviour

**Decision**: On `pages/products.html` load, the script reads `window.location.hash`. If the hash matches a known category slug (the same slug used in `data-category`), the corresponding filter pill is activated programmatically before the first paint of the filter row. If the hash does not match (e.g., from an old bookmark or a product anchor), the "All" pill stays active and the browser's default anchor scrolling falls back to whatever anchor matches.

Each category section also gets a static anchor (`<h2 id="category-security">`-style or via the filter pill's `id`), so deep links like `pages/products.html#security` both (a) activate the filter and (b) scroll the filter row into view.

**Rationale**:
- The mega-menu already deep-links to `pages/products.html#security` etc. (Phase 01, FR-060/061). Honouring those hashes is mandatory.
- Pre-activating the filter avoids the user landing on the catalog with "All" active and needing to click their own category.

**Alternatives considered**:
- *Use URL search params (`?category=security`)* — rejected; the hash is what the mega-menu already uses and what bookmarks contain.
- *History API with `pushState` on every filter click* — rejected; introduces back-button surprise (the user clicked a filter, not navigated). Filter state is intentionally ephemeral.

---

## D-05 — Detail-page gallery thumbnail switching

**Decision**: A small `js/product-detail.js` module owns gallery behaviour. The hero markup is:

```html
<div class="product-hero__gallery">
  <div class="product-hero__main">
    <img id="product-main-image" src="…hero.svg" alt="Aura Panel front view" width="640" height="480" fetchpriority="high">
  </div>
  <div class="product-hero__thumbs" role="tablist" aria-label="Product views">
    <button type="button" role="tab" aria-selected="true"  data-thumb-src="…hero.svg"   data-thumb-alt="front view">…</button>
    <button type="button" role="tab" aria-selected="false" data-thumb-src="…angle.svg"  data-thumb-alt="angled view">…</button>
    <button type="button" role="tab" aria-selected="false" data-thumb-src="…detail.svg" data-thumb-alt="surface detail">…</button>
  </div>
</div>
```

Click or arrow-key navigation on the thumb strip swaps `#product-main-image`'s `src` and `alt` to the new thumb's `data-thumb-src` / `data-thumb-alt`, sets the new thumb's `aria-selected="true"`, and clears it on the others. Roving tabindex is applied so only the active thumb is in the tab order; arrow keys move active.

**Rationale**:
- Roving-tabindex + `role="tablist"` matches WAI-ARIA Tabs APG and is keyboard accessible by default.
- The main image is part of static HTML (Principle II) — JS only swaps its `src`. The initial visual is what visitors with JS disabled still see.
- `fetchpriority="high"` keeps the initial LCP candidate prioritised.

**Alternatives considered**:
- *Stack all images in DOM, toggle `display`* — rejected; downloads multiple images on first paint without need; the JS-swap is one decode at click time.
- *CSS `:target` driven gallery (anchor-based)* — rejected; changes the URL hash on every click, which conflicts with D-04's hash semantics.
- *Skip gallery (single-image hero only)* — rejected; the User Story 4 (P3) acceptance criterion requires ≥ 2 thumbs.

---

## D-06 — Product data scope and detail-page coverage

**Decision**: Phase 02 ships **~32 products in the catalog** distributed across 10 categories per the brief, with **4 fully built detail pages** (Aura Panel, Secure Kit, Smart Switch Series, Climate Hub). Products lacking a dedicated detail page get a `View Details` CTA that links to `pages/products.html#<product-slug>` (anchor on the catalog card) rather than a missing detail page. This is documented in FR-062 of the spec.

**Rationale**:
- The brief requires "at least 24" cards; landing at 32 gives breathing room and avoids visible-category-imbalance.
- Building 32 dedicated detail pages would balloon Phase 02 scope and trigger Constitution VII (no half-finished pages).
- Anchor links to the catalog give visitors a visible card and a "Request Quote" path — no dead links.

**Alternatives considered**:
- *Build all 32 detail pages, even thin ones* — rejected; thin pages violate Principle V (realistic, production-ready content) and Principle VII (no half-finished sections).
- *Ship only 24 products at MVP* — rejected; 24 makes a few categories thin (Entertainment, Accessories). 32 gives every category ≥ 2 cards.

---

## D-07 — Quote-CTA target resolution

**Decision**: Every "Request a Quote" / "Request Quote" CTA across catalog cards, detail pages, and the final-CTA section links to **`../index.html#get-quote`** (relative path from any `pages/*.html` to the homepage's quote-form anchor built in Phase 01). The "Talk to a Specialist" CTA on the final-CTA section links to `./contact.html` (or `./contact.html#form` once Phase 03 fleshes out a contact form).

**Rationale**:
- Reuses the Phase 01 quote form rather than duplicating it on every detail page.
- A single source of truth for lead capture; analytics and validation already wired.

**Alternatives considered**:
- *Embed a mini quote form on each detail page* — rejected; duplicates the Phase 01 form, risks divergence, and re-runs Constitution VI gate on every detail page.
- *Modal-based quote form launched from the detail page* — rejected; out of scope for Phase 02 and would require new modal infrastructure.

---

## D-08 — Image asset strategy

**Decision**: Every product card and every detail-page hero needs an image. Where a real product visual is not yet produced, ship an **SVG placeholder** under `assets/images/products/<product-slug>.svg` following the same gradient + label + iconography convention established in Phase 01. The HTML references the `.svg` filename. If a future phase produces a real `.jpg` / `.png`, the HTML reference is updated then; the placeholder filenames stay realistic (no "placeholder-1.svg"). For lifestyle visuals on detail pages, reuse Phase 01's `assets/images/lifestyle/` set or commit additional SVG placeholders in the same folder.

**Rationale**:
- SVG is byte-tiny (≤ 4 KB each), scales perfectly, and the placeholder convention has worked through Phase 01 already.
- Per Constitution V, placeholder filenames must stay realistic; SVG with brand-appropriate gradient does that.
- Avoids commissioning 32 product photographs as a blocker.

**Alternatives considered**:
- *Solid colour div placeholders* — rejected; Constitution III mandates a meaningful visual in every section.
- *Stock photography* — rejected; licensing complexity and brand-mismatch risk; out of scope.

---

## D-09 — CSS scoping for new components

**Decision**: All new Phase-02 component classes live in `src/input.css` under `@layer components`, namespaced by their conceptual family:
- `.catalog-hero` — products page hero
- `.catalog-toolbar` — filter pill row + search row
- `.filter-pill` — single pill, with `[aria-pressed="true"]` active state
- `.catalog-search` — search input wrapper
- `.catalog-status` — live count line
- `.catalog-empty` — empty-state card
- `.is-hidden` — utility for filter-hidden cards (`display: none`)
- `.product-hero` — detail page hero
- `.product-hero__gallery`, `.product-hero__main`, `.product-hero__thumbs`
- `.product-overview` — section
- `.product-features` — icon-card grid
- `.product-scenarios` — scenario list
- `.product-specs` — definition list / table
- `.product-compat` — chip grid
- `.product-related` — related-product card grid (reuses `.card-product`)
- `.product-final-cta` — closing CTA band

All names mirror the BEM-lite convention of Phase 01 (`.site-header__brand` etc.). No new utility classes outside this list.

**Rationale**:
- Predictable for future contributors who already know the Phase 01 naming pattern.
- Keeps the CSS audit gate (Phase 01's T064 / T065) trivially extendable.

**Alternatives considered**:
- *Inline Tailwind utility composition in each HTML page* — rejected; the components are reused across 4+ pages, so a component class avoids repetition and keeps the design system enforceable.

---

## D-10 — Browser feature baseline (no changes from Phase 01)

**Decision**: ES Modules, `IntersectionObserver`, `URLSearchParams`, optional chaining (`?.`), nullish coalescing (`??`), `Element.toggleAttribute`, `Element.classList.toggle(name, force)`, `<dialog>` not required (no modals in Phase 02). All available in every evergreen browser since 2022. No transpilation, no polyfills.

**Rationale**: Same baseline as Phase 01. Adding Phase 02 does not require new APIs.

---

## D-11 — Accessibility patterns for catalog filter

**Decision**: The filter pill row is implemented as a **toolbar** of mutually-exclusive toggle buttons (not a `role="tablist"`, because the underlying view is one grid, not multiple panels). Markup:

```html
<div class="catalog-toolbar__filters" role="toolbar" aria-label="Product category filters">
  <button type="button" class="filter-pill" data-category="all" aria-pressed="true">All</button>
  <button type="button" class="filter-pill" data-category="central-control" aria-pressed="false">Central Control</button>
  …
</div>
```

`aria-pressed` toggles per click. Focus stays on the clicked pill. Arrow keys are NOT trapped (the toolbar is short enough that Tab is fine).

**Rationale**:
- `aria-pressed` is the standard pattern for a toggle button.
- `role="tablist"` would mislead AT users into expecting separate panels.
- Keeping `Tab` for traversal (rather than arrow keys) matches what users on this site already know from Phase 01 nav.

**Alternatives considered**:
- *Radio group inside `role="radiogroup"`* — rejected; radios cannot also be search-combinable, and they communicate a strict mutually-exclusive selection where "All" is awkward to model.

---

## D-12 — Performance budget for the catalog page

**Decision**: The catalog page targets a slightly relaxed but still-tight performance budget:
- **HTML** ≤ 200 KB (≈ 32 cards × ~5 KB each in HTML)
- **CSS** (shared) ≤ 60 KB (Phase 01 CSS is already 50 KB; new classes add ~6–8 KB pre-minify)
- **JS** total ≤ 30 KB across all modules (products.js will be ~3 KB)
- **Images** total on first paint: only the above-the-fold hero + first 6 cards eagerly load; remaining cards use `loading="lazy" decoding="async"` per Phase 01 convention. Each product SVG is ≤ 4 KB; first-paint image bytes ~30 KB.
- **LCP target**: < 2.5 s on a 3G-fast simulated network.

**Rationale**: Same envelope as Phase 01, with allowance for more cards. Lazy-loading from card 7 onwards keeps the initial render fast.

**Alternatives considered**:
- *Render only first 8 cards then "Load more" via JS* — rejected; violates Principle II (JS-injected content), and the byte savings are tiny for SVG-only product art.

---

## D-13 — Detail-page sectioning, headings, and landmarks

**Decision**: Each product detail page uses this section order with one `<h1>` (product name in the hero), `<h2>` for each top-level section, `<h3>` for items inside (key features, smart scenarios). The `<main>` landmark wraps everything below `<!-- header:end -->`. Sections:

| Order | Section | Element | Heading |
|---|---|---|---|
| 1 | Hero | `<section class="product-hero">` | `<h1>` |
| 2 | Overview | `<section class="product-overview" aria-labelledby="overview-h">` | `<h2 id="overview-h">` |
| 3 | Key Features | `<section class="product-features" aria-labelledby="features-h">` | `<h2 id="features-h">` |
| 4 | Smart Scenarios | `<section class="product-scenarios" aria-labelledby="scenarios-h">` | `<h2 id="scenarios-h">` |
| 5 | Tech Specs | `<section class="product-specs" id="tech-specs" aria-labelledby="specs-h">` | `<h2 id="specs-h">` |
| 6 | Compatibility | `<section class="product-compat" aria-labelledby="compat-h">` | `<h2 id="compat-h">` |
| 7 | Related Products | `<section class="product-related" aria-labelledby="related-h">` | `<h2 id="related-h">` |
| 8 | Final CTA | `<section class="product-final-cta" aria-labelledby="cta-h">` | `<h2 id="cta-h">` |

The `id="tech-specs"` on section 5 is the "Download Specs" CTA's anchor target (FR-032).

**Rationale**: Predictable for screen readers (every section is a labelled landmark), and a single `<h1>` per page enforced by Gate 2.

---

## D-14 — Naming, slugging, file conventions

**Decision**:
- Product slugs are lowercase, hyphenated, prefixed with `zakey-` for the file name only: `pages/product-zakey-aura-panel.html`. The `data-category` slug is bare (`central-control`, `security`).
- Image filenames: `assets/images/products/zakey-<slug>.svg`.
- IDs on the catalog page: each product card has `id="product-<slug>"` so deep links like `pages/products.html#product-zakey-aura-panel` scroll to that specific card.
- The four detail pages re-use exactly the product slug they share with their card.

**Rationale**: Consistent slug → file mapping makes future contributors' link-authoring mechanical, and the link-check gate catches typos immediately.

---

## Summary

| ID | Decision | Resolves |
|---|---|---|
| D-01 | `data-category` + `data-tags` attributes on each card | content-in-HTML, filter input |
| D-02 | Single `applyFilters()` function, debounced, cached searchable text | filter algorithm |
| D-03 | Static empty-state + live count with `aria-live="polite"` | UX feedback for no-results |
| D-04 | `window.location.hash` pre-activates category pill | mega-menu deep link |
| D-05 | `role="tablist"` thumbnails with roving tabindex; JS swaps src | gallery accessibility |
| D-06 | 32 catalog cards + 4 fully built detail pages | scope |
| D-07 | All quote CTAs → `../index.html#get-quote` | CTA target |
| D-08 | SVG placeholders for unproduced visuals | asset strategy |
| D-09 | Component class families under `@layer components` | CSS scoping |
| D-10 | No new browser-feature baseline | feature support |
| D-11 | `role="toolbar"` + `aria-pressed` for filter pills | filter a11y |
| D-12 | Same Phase-01 perf budget extended; lazy-load cards 7+ | performance |
| D-13 | 8 sections per detail page, h2 per section, `aria-labelledby` | detail-page structure |
| D-14 | `zakey-<slug>` filename convention; `product-<slug>` anchor convention | naming |

All decisions are implementation-ready. No outstanding `NEEDS CLARIFICATION`.
