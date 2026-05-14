# Contract — Solution Detail Page

**Scope**: Every `pages/solution-<slug>.html`. Phase 03 ships six required pages (`solution-smart-villa.html`, `solution-smart-apartment.html`, `solution-smart-hotel.html`, `solution-smart-office.html`, `solution-smart-compound.html`, `solution-gaming-room.html`) and may ship two optional pages (`solution-elderly-care.html`, `solution-smart-retail.html`). The contract applies identically to every detail page.

## Page shape — 9 required sections in order

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Smart Villa — Luxury Whole-Home Automation by Zakey</title>
  <meta name="description" content="…120–160 char summary…">
  …og:, favicon, preload of hero, stylesheet…
</head>
<body data-page="solution-detail">
<a class="skip-link" href="#main">Skip to main content</a>
<!-- header:start --> [byte-identical Phase 01 header] <!-- header:end -->

<main id="main">

  <!-- 1. DETAIL HERO -->
  <section class="detail-hero" aria-labelledby="detail-h1">
    <div class="detail-hero__inner">
      <div class="detail-hero__content">
        <p class="eyebrow">Residential</p>
        <h1 id="detail-h1">Smart Living for the Modern Villa</h1>
        <p class="detail-hero__tagline">A whole-home ecosystem that moves at the pace of luxury living.</p>
        <p class="detail-hero__lead">
          The Zakey Smart Villa is a turnkey deployment of central control, lighting, climate,
          security, and energy intelligence designed for villas, signature residences, and
          architect-led projects where the experience must feel effortless from the first moment.
        </p>
        <div class="detail-hero__ctas">
          <a class="btn btn--primary" href="../index.html#get-quote">Get a Quote</a>
          <a class="btn btn--secondary" href="./products.html">Explore Products</a>
        </div>
      </div>
      <div class="detail-hero__visual">
        <img src="../assets/images/solutions/smart-villa.svg"
             alt="Luxury villa living room with Aura Panel control surface and ambient scene lighting"
             width="640" height="480" fetchpriority="high">
      </div>
    </div>
  </section>

  <!-- 2. PROBLEM -->
  <section class="problem-list u-section" aria-labelledby="problem-h">
    <div class="u-container">
      <p class="eyebrow">The challenge</p>
      <h2 id="problem-h">Why villas need more than a smart speaker</h2>
      <ol class="problem-list__items">
        <li class="problem-list__item">
          <h3>Coordinating climate across many rooms</h3>
          <p>Villas combine multiple HVAC zones, … 1–2 sentences …</p>
        </li>
        … 2–4 more pain points …
      </ol>
    </div>
  </section>

  <!-- 3. ZAKEY SOLUTION -->
  <section class="solution-narrative u-section" aria-labelledby="solution-h">
    <div class="u-container solution-narrative__inner">
      <p class="eyebrow">The Zakey answer</p>
      <h2 id="solution-h">One ecosystem, every room</h2>
      <div class="solution-narrative__body">
        <p>…paragraph 1: how Zakey solves the listed pain points; must name ≥ 3 Zakey subsystems …</p>
        <p>…paragraph 2: the ambient experience and centralised control …</p>
      </div>
    </div>
  </section>

  <!-- 4. INCLUDED SYSTEMS -->
  <section class="subsystem-grid u-section" aria-labelledby="systems-h">
    <div class="u-container">
      <p class="eyebrow">What's inside</p>
      <h2 id="systems-h">Every subsystem, ready out of the box</h2>
      <ul class="subsystem-grid__list">
        <li class="subsystem-card">
          <svg class="subsystem-card__icon" …>…</svg>
          <h3 class="subsystem-card__title">Central Control</h3>
          <p class="subsystem-card__desc">…tailored 1–2 sentences …</p>
        </li>
        … 5–7 more subsystem cards …
      </ul>
    </div>
  </section>

  <!-- 5. AUTOMATION SCENARIOS — reuses Phase 02 .product-scenarios -->
  <section class="product-scenarios u-section" aria-labelledby="scenarios-h">
    <div class="u-container">
      <p class="eyebrow">Day in the life</p>
      <h2 id="scenarios-h">Scenarios that move with you</h2>
      <ul class="product-scenarios__list">
        <li class="product-scenarios__item">
          <p class="product-scenarios__context eyebrow">Welcome home</p>
          <p class="product-scenarios__trigger"><strong>When</strong> the front door unlocks after 17:00 on a weekday</p>
          <p class="product-scenarios__action"><strong>Then</strong> Zakey raises the entryway lights to 70%, fades on the kitchen ambient strip, and pre-cools the master suite</p>
        </li>
        … 2–4 more scenarios …
      </ul>
    </div>
  </section>

  <!-- 6. RECOMMENDED PRODUCTS — reuses Phase 02 .product-related + .card-product -->
  <section class="product-related u-section" aria-labelledby="products-h">
    <div class="u-container">
      <p class="eyebrow">Pairs well with</p>
      <h2 id="products-h">Recommended products</h2>
      <div class="product-related__grid">
        <article class="card-product" …>…</article>
        … 2–3 more product cards …
      </div>
    </div>
  </section>

  <!-- 7. BENEFITS -->
  <section class="benefit-grid u-section" aria-labelledby="benefits-h">
    <div class="u-container">
      <p class="eyebrow">Why Zakey</p>
      <h2 id="benefits-h">The villa experience, elevated</h2>
      <ul class="benefit-grid__list">
        <li class="benefit-card">
          <svg class="benefit-card__icon" …>…</svg>
          <h3 class="benefit-card__title">Comfort</h3>
          <p class="benefit-card__desc">…30–80 chars justification …</p>
        </li>
        … 5 more benefits, 6 total …
      </ul>
    </div>
  </section>

  <!-- 8. HOW IT CONNECTS — inline SVG topology diagram -->
  <section class="topology-diagram u-section" aria-labelledby="topology-h">
    <div class="u-container">
      <p class="eyebrow">How it connects</p>
      <h2 id="topology-h">The Zakey ecosystem at a glance</h2>
      <p class="topology-diagram__lead">Every Zakey deployment is built around a central Mesh Bridge that orchestrates every subsystem and talks to the Zakey Cloud, App, and voice assistants.</p>
      <figure class="topology-diagram__figure">
        <svg viewBox="0 0 600 360" role="img" aria-labelledby="topology-title" class="topology-diagram__svg">
          <title id="topology-title">Zakey Smart Villa topology: a central Mesh Bridge linking the Aura Panel, lighting, climate, security, sensors, energy, curtains, and the Zakey Cloud.</title>
          … paths, circles, lines, labels (each text node is content; lines are decorative with aria-hidden="true") …
        </svg>
        <figcaption class="sr-only">A topology diagram of the Zakey Smart Villa deployment.</figcaption>
      </figure>
    </div>
  </section>

  <!-- 9. FINAL CTA -->
  <section class="solution-final-cta u-section" aria-labelledby="cta-h">
    <div class="u-container">
      <h2 id="cta-h">Plan Your Zakey Smart Project</h2>
      <p>Talk to a Zakey specialist for system sizing, pricing, and timelines.</p>
      <div class="u-btn-row">
        <a class="btn btn--primary" href="../index.html#get-quote">Get a Quote</a>
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

## Field constraints

| Section | Required cardinality | Required content shape |
|---|---|---|
| Hero | 1 | eyebrow + h1 + tagline + 2–3 sentence lead + 2 CTAs + unique image |
| Problem | 3–5 items | each: h3 + 1–2 sentence detail |
| Zakey Solution | 2–3 paragraphs | must name ≥ 3 Zakey subsystems |
| Included Systems | 6–8 cards | each: icon + title + tailored 1–2 sentence description |
| Automation Scenarios | 3–5 items | When/Then format, tailored per solution |
| Recommended Products | 3–4 cards | reuse Phase 02 `.card-product`, slugs must exist in Phase 02 |
| Benefits | 6 items | each: icon + heading + 30–80 char justification |
| How It Connects | 1 inline SVG | with `<title>`, accessible labels, 5–8 subsystem nodes + 1 cloud node |
| Final CTA | 1 | h2 ("Plan Your Zakey Smart Project") + 2 CTAs |

## Required `<body>` attribute

```html
<body data-page="solution-detail">
```

Future scripts may key off this attribute. Phase 03 itself does not require any per-page JS module.

## CTA target table

| CTA label | href |
|---|---|
| Hero "Get a Quote" | `../index.html#get-quote` |
| Hero "Explore Products" | `./products.html` |
| Recommended-product `View Details` (flagship) | `./product-zakey-<slug>.html` |
| Recommended-product `View Details` (non-flagship) | `./products.html#product-zakey-<slug>` |
| Recommended-product `Request Quote` | `../index.html#get-quote` |
| Final CTA "Get a Quote" | `../index.html#get-quote` |
| Final CTA "Talk to a Specialist" | `./contact.html` |

## Acceptance probe

- [ ] Open the detail page in a browser. Hero shows above the fold.
- [ ] Eight subsequent sections render in order (Problem → Zakey Solution → Included Systems → Automation Scenarios → Recommended Products → Benefits → How It Connects → Final CTA).
- [ ] Single `<h1>` (the solution title) and exactly 8 `<h2>` elements.
- [ ] Every section's content is unique to this solution — no copy-paste from another detail page.
- [ ] Every CTA `href` resolves (link gate verifies).
- [ ] Click "Get a Quote" → lands at `../index.html#get-quote`.
- [ ] Click any Recommended Products `View Details` → lands at the matching product page or catalog anchor.
- [ ] No console errors at desktop and at 360 px.
- [ ] `scripts/check-shell-consistency.sh`, `scripts/check-content-rules.sh`, `scripts/check-links.sh` all exit 0.
