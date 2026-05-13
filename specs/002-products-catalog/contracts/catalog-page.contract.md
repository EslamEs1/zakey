# Contract — Product Catalog Page

**Scope**: The catalog page at `pages/products.html`. Replaces the Phase 01 placeholder. Reuses the Phase 01 header and footer shells (byte-identical after path normalisation).

## Page shape

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Zakey Smart Products — Premium Smart Home & AIoT Catalog</title>
  <meta name="description" content="…">
  <meta property="og:type" content="website">
  …og: tags…
  <link rel="icon" type="image/svg+xml" href="../favicon.svg">
  <link rel="apple-touch-icon" href="../apple-touch-icon.png">
  <link rel="stylesheet" href="../css/styles.css">
</head>
<body data-page="products">
<a class="skip-link" href="#main">Skip to main content</a>

<!-- header:start --> … <!-- header:end -->

<main id="main">

  <!-- 1. CATALOG HERO -->
  <section class="catalog-hero" aria-labelledby="catalog-hero-headline">
    <div class="catalog-hero__inner">
      <div class="catalog-hero__content">
        <p class="eyebrow">Hardware family</p>
        <h1 id="catalog-hero-headline">Zakey Smart Products</h1>
        <p class="catalog-hero__sub">
          Premium smart devices engineered for homes, villas, hotels,
          offices, and real-estate projects — one ecosystem, every space.
        </p>
        <div class="catalog-hero__ctas">
          <a class="btn btn--primary" href="../index.html#get-quote">Get a Quote</a>
          <a class="btn btn--secondary" href="#product-grid">Browse the catalog</a>
        </div>
      </div>
      <div class="catalog-hero__visual">
        <img src="../assets/images/products/zakey-catalog-hero.svg"
             alt="Composed image of Zakey smart devices: panels, sensors, locks, and switches"
             width="720" height="540" fetchpriority="high">
      </div>
    </div>
  </section>

  <!-- 2. TOOLBAR (filters + search + count) -->
  <section class="catalog-toolbar" aria-label="Filter and search products">
    <div class="catalog-toolbar__inner">
      <div class="catalog-toolbar__filters" role="toolbar" aria-label="Product category filters">
        <button type="button" class="filter-pill" data-category="all"             aria-pressed="true">All</button>
        <button type="button" class="filter-pill" data-category="central-control" aria-pressed="false">Central Control</button>
        <button type="button" class="filter-pill" data-category="smart-switches"  aria-pressed="false">Smart Switches</button>
        <button type="button" class="filter-pill" data-category="security"        aria-pressed="false">Security</button>
        <button type="button" class="filter-pill" data-category="sensors"         aria-pressed="false">Sensors</button>
        <button type="button" class="filter-pill" data-category="lighting"        aria-pressed="false">Lighting</button>
        <button type="button" class="filter-pill" data-category="curtains-shading" aria-pressed="false">Curtains &amp; Shading</button>
        <button type="button" class="filter-pill" data-category="climate"         aria-pressed="false">Climate</button>
        <button type="button" class="filter-pill" data-category="energy"          aria-pressed="false">Energy</button>
        <button type="button" class="filter-pill" data-category="entertainment"   aria-pressed="false">Entertainment</button>
        <button type="button" class="filter-pill" data-category="accessories"     aria-pressed="false">Accessories</button>
      </div>
      <label class="catalog-search">
        <span class="sr-only">Search products</span>
        <svg …search-icon… aria-hidden="true"></svg>
        <input type="search" name="product-search"
               placeholder="Search products, categories, features…"
               autocomplete="off" data-product-search>
      </label>
    </div>
    <p class="catalog-status" aria-live="polite">
      Showing <span data-visible-count>32</span> of <span data-total-count>32</span> products.
    </p>
  </section>

  <!-- 3. PRODUCT GRID (≥ 24 cards as static HTML) -->
  <section class="product-grid-section" aria-labelledby="grid-h">
    <h2 id="grid-h" class="sr-only">Product grid</h2>
    <div class="product-grid" id="product-grid">
      <article class="card-product" id="product-zakey-aura-panel"
               data-product
               data-category="central-control"
               data-tags="panel touch wall hub aura"> … </article>
      <article class="card-product" id="product-zakey-aura-panel-pro"
               data-product data-category="central-control"
               data-tags="panel touch wall hub aura pro larger"> … </article>
      … 30+ more cards …
      <div class="catalog-empty" hidden>
        <svg …icon… aria-hidden="true"></svg>
        <h3>No products match your filters</h3>
        <p>Try a different category, or clear your search to see everything.</p>
        <button type="button" class="btn btn--ghost" data-clear-search>Clear search</button>
      </div>
    </div>
  </section>

  <!-- 4. FOOTER CTA BAND -->
  <section class="catalog-final-cta u-section">
    <div class="u-container">
      <h2>Build with Zakey</h2>
      <p>Talk to a specialist for system sizing, pricing, and timelines.</p>
      <div class="u-btn-row">
        <a class="btn btn--primary" href="../index.html#get-quote">Request a Quote</a>
        <a class="btn btn--secondary" href="./contact.html">Talk to a Specialist</a>
      </div>
    </div>
  </section>

</main>

<!-- footer:start --> … <!-- footer:end -->

<script type="module" src="../js/main.js" defer></script>
</body>
</html>
```

## Behaviour

1. On page load, `js/main.js` detects `document.body.dataset.page === 'products'` (or the presence of `#product-grid`) and dynamically imports `./products.js`, then calls `initCatalog()`.
2. `initCatalog()` reads `window.location.hash`. If the hash matches a known category slug, the corresponding pill receives `aria-pressed="true"` and the catalog state is set to that category; otherwise "All" stays active.
3. Click on any pill: deactivates current pill, activates clicked pill, calls `applyFilters()`.
4. Typing in the search input: debounced at 80 ms, calls `applyFilters()`.
5. `applyFilters()` walks every `[data-product]`, toggles `.is-hidden`, updates `[data-visible-count]`, and reveals/hides the `.catalog-empty` block.
6. Click on `[data-clear-search]`: clears the search input and re-applies filters (category stays).
7. The page works without JavaScript: every card and CTA is fully rendered and clickable; only the filter pills become inert.

## Acceptance probe

- [ ] Load `pages/products.html` directly in a browser. ≥ 24 product cards visible, hero shows above the fold.
- [ ] Click "Security" pill → only Security cards remain visible; "All" deactivates; "Security" gets `aria-pressed="true"`; count drops.
- [ ] Click "All" → every card returns.
- [ ] Type "camera" in the search → only camera cards remain.
- [ ] Type "xyz999" → empty-state appears; click "Clear search" → all cards return.
- [ ] Visit `pages/products.html#security` → Security pill is active on first paint.
- [ ] Disable JavaScript and reload → every card is still rendered and links work; filter pills do nothing (no JS error).
- [ ] `scripts/check-shell-consistency.sh`, `scripts/check-content-rules.sh`, `scripts/check-links.sh` all exit 0.
