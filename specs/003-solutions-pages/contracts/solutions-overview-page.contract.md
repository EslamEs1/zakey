# Contract — Solutions Overview Page

**Scope**: The overview page at `pages/solutions.html`. Replaces the Phase 01 placeholder. Reuses the Phase 01 header and footer shells (byte-identical) and the Phase 02 `.filter-pill` component.

## Page shape

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Smart Solutions for Every Space — Zakey</title>
  <meta name="description" content="Premium smart-living solutions tailored to villas, apartments, hotels, offices, gated compounds, gaming rooms, and more. Explore Zakey's solution catalog.">
  <meta property="og:type" content="website">
  <meta property="og:title" content="Smart Solutions for Every Space — Zakey">
  <meta property="og:description" content="…">
  <meta property="og:image" content="../assets/images/og/zakey-og-cover.svg">
  <link rel="icon" type="image/svg+xml" href="../favicon.svg">
  <link rel="apple-touch-icon" href="../apple-touch-icon.png">
  <link rel="preload" as="image" href="../assets/images/solutions/smart-villa.svg" type="image/svg+xml">
  <link rel="stylesheet" href="../css/styles.css">
</head>
<body data-page="solutions">
<a class="skip-link" href="#main">Skip to main content</a>

<!-- header:start --> [byte-identical Phase 01 header] <!-- header:end -->

<main id="main">

  <!-- 1. SOLUTION HERO -->
  <section class="solution-hero" aria-labelledby="solutions-hero-headline">
    <div class="solution-hero__inner">
      <div class="solution-hero__content">
        <p class="eyebrow">Tailored solutions</p>
        <h1 id="solutions-hero-headline">Smart Solutions for Every Space</h1>
        <p class="solution-hero__sub">
          Zakey delivers tailored smart-living ecosystems for residential, hospitality, commercial, and real-estate projects — one platform, every space.
        </p>
        <div class="solution-hero__ctas">
          <a class="btn btn--primary" href="../index.html#get-quote">Plan Your Project</a>
          <a class="btn btn--secondary" href="#solutions-grid">Browse Solutions</a>
        </div>
      </div>
      <div class="solution-hero__visual">
        <img src="../assets/images/solutions/smart-villa.svg"
             alt="Composed visual: Zakey smart-living deployments across a villa, hotel suite, and office"
             width="720" height="540" fetchpriority="high">
      </div>
    </div>
  </section>

  <!-- 2. TOOLBAR (category filter + count) -->
  <section class="catalog-toolbar" aria-label="Filter solutions by category">
    <div class="catalog-toolbar__inner">
      <div class="catalog-toolbar__filters" role="toolbar" aria-label="Solution category filters">
        <button type="button" class="filter-pill" data-category="all"          aria-pressed="true">All</button>
        <button type="button" class="filter-pill" data-category="residential"  aria-pressed="false">Residential</button>
        <button type="button" class="filter-pill" data-category="hospitality"  aria-pressed="false">Hospitality</button>
        <button type="button" class="filter-pill" data-category="commercial"   aria-pressed="false">Commercial</button>
        <button type="button" class="filter-pill" data-category="real-estate"  aria-pressed="false">Real Estate</button>
        <button type="button" class="filter-pill" data-category="lifestyle"    aria-pressed="false">Lifestyle</button>
      </div>
    </div>
    <p class="catalog-status" aria-live="polite">
      Showing <span data-visible-count>6</span> of <span data-total-count>6</span> solutions.
    </p>
  </section>

  <!-- 3. SOLUTION GRID (≥ 6 cards as static HTML) -->
  <section class="solution-grid-section" aria-labelledby="grid-h">
    <h2 id="grid-h" class="sr-only">Solutions grid</h2>
    <div class="solution-grid" id="solutions-grid">
      <article class="solution-card" id="smart-villa"
               data-solution data-category="residential">…</article>
      <article class="solution-card" id="smart-apartment"
               data-solution data-category="residential">…</article>
      … other solution cards …
    </div>
  </section>

  <!-- 4. FINAL CTA BAND -->
  <section class="solution-final-cta u-section">
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

<!-- footer:start --> [byte-identical Phase 01 footer] <!-- footer:end -->

<script type="module" src="../js/main.js" defer></script>
</body>
</html>
```

## Behaviour

1. On page load, `js/main.js` detects `document.getElementById('solutions-grid')` and dynamically imports `./solutions.js`, then calls `initFilter()`.
2. `initFilter()` reads `window.location.hash`. If the hash matches a category slug, the corresponding pill receives `aria-pressed="true"`. If the hash matches a known solution slug, the `solutionToCategory` lookup table resolves it to the solution's primary category and that tab is pre-activated.
3. Click on any pill: deactivates current pill, activates clicked pill, calls `applyFilters()`.
4. `applyFilters()` walks every `[data-solution]`, splits its `data-category` on whitespace, toggles `.is-hidden` based on category match, updates `[data-visible-count]`.
5. The page works without JavaScript: every card and CTA is fully rendered and clickable; only the filter pills become inert.

## Acceptance probe

- [ ] Load `pages/solutions.html` directly in a browser. ≥ 6 solution cards visible by default; hero shows above the fold.
- [ ] Click "Hospitality" pill → only Smart Hotel remains; "All" deactivates; "Hospitality" gets `aria-pressed="true"`; count drops.
- [ ] Click "Residential" → Smart Villa + Smart Apartment (+ Elderly Care if shipped) remain visible.
- [ ] Click "All" → every card returns.
- [ ] Visit `pages/solutions.html#smart-hotel` → Hospitality pill is active on first paint AND the Smart Hotel card scrolls into view.
- [ ] Visit `pages/solutions.html#real-estate` → Real Estate pill is active on first paint and Smart Compound is the only visible card.
- [ ] Disable JavaScript and reload → every card is still rendered and links work; filter pills do nothing (no JS error).
- [ ] `scripts/check-shell-consistency.sh`, `scripts/check-content-rules.sh`, `scripts/check-links.sh` all exit 0.
