# Contract — Product Detail Page

**Scope**: Every `pages/product-zakey-<slug>.html`. Phase 02 ships four: `aura-panel`, `secure-kit`, `smart-switch`, `climate-hub`. The contract applies identically to every flagship detail page.

## Page shape (eight required sections, in order)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Zakey Aura Panel — Premium Wall-Mounted Control Panel</title>
  <meta name="description" content="The Aura Panel — Zakey's central touch surface for scenes, lighting, climate, and security.">
  …og:, favicon, stylesheet…
</head>
<body data-page="product-detail">
<a class="skip-link" href="#main">Skip to main content</a>
<!-- header:start --> … <!-- header:end -->

<main id="main">

  <!-- 1. PRODUCT HERO (gallery + name + tagline + 2 CTAs) -->
  <section class="product-hero" aria-labelledby="product-h1">
    <div class="product-hero__inner">
      <div class="product-hero__gallery">
        <div class="product-hero__main">
          <img id="product-main-image"
               src="../assets/images/products/zakey-aura-panel.svg"
               alt="Zakey Aura Panel — front view, illuminated glass surface"
               width="640" height="480" fetchpriority="high">
        </div>
        <div class="product-hero__thumbs" role="tablist" aria-label="Product views">
          <button type="button" role="tab" aria-selected="true"
                  data-thumb-src="../assets/images/products/zakey-aura-panel.svg"
                  data-thumb-alt="Zakey Aura Panel — front view, illuminated glass surface">
            <img src="../assets/images/products/zakey-aura-panel.svg" alt="" width="80" height="60">
          </button>
          <button type="button" role="tab" aria-selected="false"
                  data-thumb-src="../assets/images/products/zakey-aura-panel-angle.svg"
                  data-thumb-alt="Zakey Aura Panel — angled view showing depth profile">…</button>
          <button type="button" role="tab" aria-selected="false"
                  data-thumb-src="../assets/images/products/zakey-aura-panel-detail.svg"
                  data-thumb-alt="Close-up of the capacitive glass surface">…</button>
        </div>
      </div>
      <div class="product-hero__content">
        <p class="product-hero__category eyebrow">Central Control</p>
        <h1 id="product-h1" class="product-hero__name">Zakey Aura Panel</h1>
        <p class="product-hero__tagline">Your home's central command, in a glass surface.</p>
        <p class="product-hero__lead">…2–3 sentences…</p>
        <div class="product-hero__ctas">
          <a class="btn btn--primary" href="../index.html#get-quote">Request a Quote</a>
          <a class="btn btn--secondary" href="#tech-specs">Download Specs</a>
        </div>
      </div>
    </div>
  </section>

  <!-- 2. OVERVIEW (what it does + where it's used) -->
  <section class="product-overview u-section" aria-labelledby="overview-h">
    <div class="u-container">
      <h2 id="overview-h">What the Aura Panel is</h2>
      <div class="product-overview__grid">
        <div class="product-overview__copy">
          <p>…what it does, 1–2 paragraphs…</p>
          <p>…where it's used: villas, hotel suites, executive offices…</p>
        </div>
        <div class="product-overview__visual">
          <img src="../assets/images/lifestyle/zakey-aura-living-room.svg"
               alt="Aura Panel installed in a luxury living room next to a recessed wall light"
               width="640" height="480" loading="lazy" decoding="async">
        </div>
      </div>
    </div>
  </section>

  <!-- 3. KEY FEATURES (≥4 icon cards) -->
  <section class="product-features u-section" aria-labelledby="features-h">
    <div class="u-container">
      <h2 id="features-h">Built for premium spaces</h2>
      <ul class="product-features__grid">
        <li class="product-features__card">
          <svg class="product-features__icon" aria-hidden="true">…</svg>
          <h3 class="product-features__title">Capacitive glass</h3>
          <p class="product-features__desc">…40–120 chars…</p>
        </li>
        <li class="product-features__card">…</li>
        <li class="product-features__card">…</li>
        <li class="product-features__card">…</li>
      </ul>
    </div>
  </section>

  <!-- 4. SMART SCENARIOS (≥3) -->
  <section class="product-scenarios u-section" aria-labelledby="scenarios-h">
    <div class="u-container">
      <h2 id="scenarios-h">Scenarios it powers</h2>
      <ul class="product-scenarios__list">
        <li class="product-scenarios__item">
          <p class="product-scenarios__context eyebrow">After midnight</p>
          <p class="product-scenarios__trigger"><strong>When</strong> motion is detected in the hallway after 00:00</p>
          <p class="product-scenarios__action"><strong>Then</strong> Aura Panel fades the hallway lights up to 25% warm white</p>
        </li>
        <li class="product-scenarios__item">…</li>
        <li class="product-scenarios__item">…</li>
      </ul>
    </div>
  </section>

  <!-- 5. TECHNICAL SPECIFICATIONS (full <dl>) -->
  <section class="product-specs u-section" id="tech-specs" aria-labelledby="specs-h">
    <div class="u-container">
      <h2 id="specs-h">Technical specifications</h2>
      <dl class="product-specs__list">
        <div class="product-specs__row"><dt>Power</dt><dd>AC 100–240 V, 50/60 Hz, 8 W max</dd></div>
        <div class="product-specs__row"><dt>Connectivity</dt><dd>Wi-Fi 5 (2.4 GHz), Zigbee 3.0, Bluetooth LE 5.0, Matter-ready</dd></div>
        <div class="product-specs__row"><dt>Compatibility</dt><dd>Zakey Mesh Bridge, Zakey Sense Engine, third-party Matter hubs</dd></div>
        <div class="product-specs__row"><dt>Installation</dt><dd>In-wall, US/EU back box; PoE optional</dd></div>
        <div class="product-specs__row"><dt>Material</dt><dd>Aluminium frame with capacitive glass face</dd></div>
        <div class="product-specs__row"><dt>Dimensions</dt><dd>120 × 86 × 9 mm</dd></div>
        <div class="product-specs__row"><dt>Supported spaces</dt><dd>Villas, hotels, offices, gaming rooms</dd></div>
      </dl>
    </div>
  </section>

  <!-- 6. COMPATIBILITY (exactly 5 chips) -->
  <section class="product-compat u-section" aria-labelledby="compat-h">
    <div class="u-container">
      <h2 id="compat-h">Works with the rest of Zakey</h2>
      <ul class="product-compat__grid">
        <li class="product-compat__chip">
          <p class="product-compat__label">Mobile App</p>
          <p class="product-compat__context">Zakey App for iOS, Android, and web</p>
        </li>
        <li class="product-compat__chip">
          <p class="product-compat__label">Voice Assistants</p>
          <p class="product-compat__context">Alexa, Google Assistant, Siri Shortcuts</p>
        </li>
        <li class="product-compat__chip">
          <p class="product-compat__label">Scenes</p>
          <p class="product-compat__context">200+ pre-built scenes + custom routines</p>
        </li>
        <li class="product-compat__chip">
          <p class="product-compat__label">Sensors</p>
          <p class="product-compat__context">All Zakey sensors + Matter-certified devices</p>
        </li>
        <li class="product-compat__chip">
          <p class="product-compat__label">Central Hub</p>
          <p class="product-compat__context">Mesh Bridge required for whole-home reach</p>
        </li>
      </ul>
    </div>
  </section>

  <!-- 7. RELATED PRODUCTS (3–4 cards, .card-product reused) -->
  <section class="product-related u-section" aria-labelledby="related-h">
    <div class="u-container">
      <h2 id="related-h">Pairs well with</h2>
      <div class="product-related__grid">
        <article class="card-product" id="related-product-zakey-smart-switch-series" …>…</article>
        <article class="card-product" id="related-product-zakey-climate-hub" …>…</article>
        <article class="card-product" id="related-product-zakey-secure-kit" …>…</article>
      </div>
    </div>
  </section>

  <!-- 8. FINAL CTA (Request quote + Talk to specialist) -->
  <section class="product-final-cta u-section" aria-labelledby="cta-h">
    <div class="u-container">
      <h2 id="cta-h">Ready to build with Aura Panel?</h2>
      <p>Talk to a Zakey specialist for system sizing, pricing, and timelines.</p>
      <div class="u-btn-row">
        <a class="btn btn--primary" href="../index.html#get-quote">Request a Quote</a>
        <a class="btn btn--secondary" href="./contact.html">Talk to a Zakey Specialist</a>
      </div>
    </div>
  </section>

</main>

<!-- footer:start --> … <!-- footer:end -->
<script type="module" src="../js/main.js" defer></script>
</body>
</html>
```

## Required content per page

| Section | Minimum | Notes |
|---|---|---|
| Hero | 1 image (or gallery of ≥ 2), name (`<h1>`), category, tagline, 2 CTAs | Image preloaded via `fetchpriority="high"` |
| Overview | 1–2 paragraphs + 1 lifestyle visual | Lifestyle visual is `loading="lazy"` |
| Key Features | ≥ 4 cards | Each has icon, title, description |
| Smart Scenarios | ≥ 3 items | Each has When/Then structure |
| Technical Specifications | exactly 7 `<dt>/<dd>` pairs | All populated, no placeholders |
| Compatibility | exactly 5 chips | In the canonical order: App, Voice, Scenes, Sensors, Hub |
| Related Products | 3 or 4 `.card-product` blocks | Each must reference a real Phase-02 catalog product |
| Final CTA | 2 CTAs | "Request a Quote" + "Talk to a Specialist" |

## Behaviour

1. **No JS required for content**: Every section above is rendered in static HTML on first paint.
2. **Gallery thumbnail switching** (US4, P3): If the hero contains `<div class="product-hero__thumbs">`, `js/product-detail.js` initialises tablist behaviour per the `gallery-thumbnails.contract.md`.
3. **No filter / no search / no card hide-show on detail pages** — the catalog-only behaviours do not run here. Detail-page JS is scoped to the gallery alone.
4. **`#tech-specs` anchor** is the canonical "Download Specs" target. The CTA scrolls smoothly (browser default with `scroll-behavior: smooth` on `<html>` from Phase 01).
5. The Related Products section's `.card-product` blocks use the same markup as the catalog cards; clicking "Request Quote" on a related card still goes to `../index.html#get-quote`; "View Details" goes to that related product's detail page (or anchor on catalog for products without their own page).

## Accessibility

- Exactly one `<h1>` per page (the product name in the hero) — Gate 2 enforces this.
- Every `<section>` has either an `aria-labelledby` pointing to its `<h2>` or `aria-label` set inline.
- `<dl>` for tech specs is semantically a description list — screen readers announce "term: definition" pairs.
- All images have descriptive `alt`. Decorative angle/detail thumbnails on the gallery have `alt=""` (they live inside a button whose accessible name comes from `data-thumb-alt` and aria-label on the tablist).
- Skip link points to `#main`.

## Acceptance probe (per detail page)

- [ ] Open the page directly in a browser. Hero shows above the fold on desktop; image is sharp; both CTAs visible.
- [ ] Scroll → all 8 sections are present and ordered correctly.
- [ ] Click "Request a Quote" → lands at `index.html#get-quote` (quote form visible/focused via fragment scroll).
- [ ] Click "Download Specs" → scrolls to the Tech Specifications section.
- [ ] Click any "Pairs well with" card's CTA → behaves like the catalog card.
- [ ] Click each thumbnail in the gallery → main image swaps; `aria-selected` follows.
- [ ] Tab through every interactive element → focus ring visible on every one; logical tab order; no focus trap.
- [ ] `scripts/check-shell-consistency.sh` → footer matches Phase 01 (any new "skip-link" lives before `<!-- header:start -->`).
- [ ] `scripts/check-content-rules.sh` → exactly one `<h1>`; no forbidden strings.
- [ ] `scripts/check-links.sh` → every `href`/`src` resolves.
