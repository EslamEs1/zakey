# Quickstart — Zakey Phase 02

**Feature**: Product Catalog & Product Detail Pages
**Branch**: `002-products-catalog`
**Date**: 2026-05-14

This is the on-ramp for anyone implementing or extending Phase 02. It assumes Phase 01 (`001-shell-and-homepage`) is already complete and the Phase 01 toolchain (`npm install`, Tailwind CLI, the three bash integrity gates) is operational.

---

## 1. Get the repo running

From a freshly cloned working tree on this branch:

```bash
git checkout 002-products-catalog
npm install            # idempotent; already done in Phase 01
npm run build:css      # rebuilds css/styles.css from src/input.css
```

To author with live CSS rebuild:

```bash
npm run watch:css
```

The site is fully static. Open any `.html` file directly in a browser (`file://…`) or serve the repo root with any static server (`npx http-server .`, `python3 -m http.server`, etc.).

---

## 2. Where Phase 02 work lands

| What | Where |
|---|---|
| Catalog page (rewritten) | `pages/products.html` |
| Detail pages (new) | `pages/product-zakey-aura-panel.html`, `pages/product-zakey-secure-kit.html`, `pages/product-zakey-smart-switch.html`, `pages/product-zakey-climate-hub.html` |
| New CSS components | `src/input.css` — append under `@layer components` |
| New JS modules | `js/products.js` (catalog), `js/product-detail.js` (detail) |
| Wired-up loader | `js/main.js` — add a conditional `import()` per page |
| New images (SVG placeholders) | `assets/images/products/zakey-<slug>.svg`, plus optional `…-angle.svg` / `…-detail.svg` for gallery thumbs and `assets/images/lifestyle/zakey-<slug>-living.svg` for overview visuals |

Files **not** touched in Phase 02 (regression risk):

- `index.html` — the Phase 01 homepage. Only its "Featured Products" `View Details` links may be updated where the destination is a real Phase-02 detail page.
- `pages/about.html`, `pages/blog.html`, `pages/contact.html`, `pages/partners.html`, `pages/privacy.html`, `pages/projects.html`, `pages/software.html`, `pages/solutions.html`, `pages/technology.html`, `pages/terms.html` — left as-is; future-phase territory.
- Header & footer shells — byte-for-byte unchanged (any change must propagate to all 12+ pages and pass `scripts/check-shell-consistency.sh`).

---

## 3. Authoring a new product card

Add an `<article>` inside `#product-grid` on `pages/products.html`:

```html
<article class="card-product" id="product-zakey-smart-plug"
         data-product
         data-category="energy"
         data-tags="plug socket energy monitoring metering">
  <div class="card-product__visual">
    <img src="../assets/images/products/zakey-smart-plug.svg"
         alt="Zakey Smart Plug — wall socket with built-in energy metering"
         width="400" height="300"
         loading="lazy" decoding="async">
  </div>
  <div class="card-product__body">
    <p class="card-product__category eyebrow">Energy</p>
    <h3 class="card-product__name">Zakey Smart Plug</h3>
    <p class="card-product__desc">…60–140 char description…</p>
    <ul class="card-product__tags" aria-label="Key features">
      <li class="card-product__tag">Energy metering</li>
      <li class="card-product__tag">Schedules</li>
      <li class="card-product__tag">Voice ready</li>
    </ul>
    <div class="card-product__ctas">
      <a class="card-product__cta--details btn btn--ghost"
         href="#product-zakey-smart-plug">View Details &rarr;</a>
      <a class="card-product__cta--quote btn btn--primary"
         href="../index.html#get-quote">Request Quote</a>
    </div>
  </div>
</article>
```

Checklist:
- [ ] `id` is `product-<slug>` (used by deep-link anchors).
- [ ] `data-category` matches one of the 10 closed-set category slugs.
- [ ] `data-tags` is space-separated lowercase synonyms (extras encouraged for search recall).
- [ ] Image file exists under `assets/images/products/`.
- [ ] Exactly 3 visible tags.
- [ ] If the product has its own detail page, `View Details` points to `./product-zakey-<slug>.html`; otherwise it points to `#product-<slug>`.
- [ ] Description is real, complete sentences — no lorem ipsum.

---

## 4. Authoring a new flagship detail page

Use one of the four flagship pages (`pages/product-zakey-aura-panel.html` etc.) as the template. All eight sections are required and must appear in this order:

1. Product Hero (with `<h1>`, gallery thumbs optional)
2. Overview
3. Key Features (≥ 4)
4. Smart Scenarios (≥ 3)
5. Technical Specifications (`<dl>` with exactly 7 rows)
6. Compatibility (exactly 5 chips, in canonical order)
7. Related Products (3 or 4 cards, reusing `.card-product`)
8. Final CTA

Set `<body data-page="product-detail">` so `main.js` knows to import `product-detail.js`.

The `<section id="tech-specs">` MUST exist — it is the "Download Specs" CTA's anchor target.

---

## 5. JS module loading pattern

`js/main.js` already loads the Phase 01 modules. Add Phase 02 modules conditionally:

```js
// After Phase 01's imports/wiring …

if (document.getElementById('product-grid')) {
  import('./products.js').then(m => m.initCatalog());
}

if (document.body.dataset.page === 'product-detail') {
  import('./product-detail.js').then(m => m.initGallery());
}
```

This keeps the catalog/detail JS out of every other page's network waterfall.

---

## 6. Integrity gates (Phase 01 — still apply, will now include Phase 02 files)

All three must exit 0 before a Phase 02 task is considered done:

```bash
npm run check         # runs all three in sequence
# or individually:
bash scripts/check-shell-consistency.sh   # Gate 1: header/footer identical across all 16+ pages
bash scripts/check-content-rules.sh       # Gate 2: forbidden strings, single <h1>, valid title+meta
bash scripts/check-links.sh               # Gate 3: every href/src resolves
```

Phase 02 adds **5 new pages** to the gate sweep (1 catalog rewrite + 4 detail pages). Gate 1 will fail if your new pages' header/footer drift from Phase 01's reference (`index.html`). To keep them aligned: copy the exact `<!-- header:start -->` … `<!-- header:end -->` block from `pages/about.html` (any Phase 01 page works) and paste it into the new file — the Gate 1 script normalises path prefixes automatically.

---

## 7. Manual interaction probes

Run these mental tests at desktop and at 360 / 480 / 768 / 1024 / 1280 / 1440 px:

### On `pages/products.html`

- [ ] ≥ 24 product cards visible by default; full grid scrolls smoothly.
- [ ] Click each of the 10 category pills in turn → grid filters; pill gets `aria-pressed="true"`; live count updates; no console error.
- [ ] Click "All" → full grid returns.
- [ ] Type a substring in the search → cards filter; live count updates; empty-state appears at zero matches with a working "Clear search" button.
- [ ] Activate Security pill, then type "lock" → only matching Security cards remain.
- [ ] Visit `pages/products.html#security` (fresh load) → Security pill active on first paint.
- [ ] Tab through the toolbar → focus ring on each pill; Enter activates.
- [ ] Click any card's "View Details" → navigates correctly.
- [ ] Click any card's "Request Quote" → lands at `../index.html#get-quote`.

### On every flagship detail page

- [ ] Hero shows above the fold on desktop; main image is sharp.
- [ ] Eight sections appear in order with no empty cards / placeholders / TBDs.
- [ ] Specifications table has all 7 rows populated.
- [ ] Compatibility section has exactly 5 chips.
- [ ] "Download Specs" scrolls to the Tech Specs section.
- [ ] "Request a Quote" navigates to `../index.html#get-quote`.
- [ ] If gallery present: clicking each thumb swaps the main image; arrow keys move active state; `aria-selected` follows.
- [ ] No console errors during the full pass.

### Cross-page

- [ ] From the homepage's "Featured Products" preview, "View Details" on Aura Panel / Secure Kit / Smart Switch / Climate Hub navigates to the corresponding Phase-02 detail page.
- [ ] Header mega-menu's "Products" anchors (`#central-control` etc.) navigate to `pages/products.html` and pre-activate the matching pill.

---

## 8. Definition of done for Phase 02

Before declaring Phase 02 complete:

- [ ] `npm run build:css` exits 0; `css/styles.css` is committed.
- [ ] `npm run check` exits 0 (all three gates green).
- [ ] `pages/products.html` renders ≥ 24 product cards as static HTML, no JS injection, no empty cards.
- [ ] All 10 category filter pills work; "All" works; search works; empty-state works; live count updates.
- [ ] Four flagship detail pages ship with all 8 sections populated.
- [ ] `pages/products.html#<category-slug>` pre-activates the matching pill on load.
- [ ] Every "Request a Quote" CTA on Phase 02 pages routes to `index.html#get-quote`; every "Talk to a Specialist" CTA routes to `contact.html`.
- [ ] Skip link works on every Phase 02 page (focus reveals at top-left, anchors `#main`).
- [ ] No console errors during the full interaction pass.
- [ ] No regression on Phase 01: homepage and the other 10 pages still pass all three gates.
- [ ] Visual pass complete at 360 / 480 / 768 / 1024 / 1280 / 1440 px.
- [ ] Constitution v1.0.0 — all seven principles still verified.
