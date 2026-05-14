# Contract: Partners Page (`pages/partners.html`)

## Purpose

Convert B2B audiences (distributors, system integrators, developers, installers, interior designers, hotel operators) into application submissions. Must read as a confident B2B program landing page, not a generic marketing brochure.

## DOM contract

- `<body data-page="partners">` is required.
- Required DOM order inside `<main id="content">`:

  1. `<section class="partner-hero">` with:
     - `<h1>` containing exactly **"Grow with Zakey Smart Living"**.
     - Positioning subtitle (15–30 words) for B2B audiences.
     - Primary CTA `<a class="btn btn--primary" href="become-a-partner.html">` labelled "Become a Partner".
     - Hero visual `assets/images/partners/zakey-partners.svg`.
  2. `<section class="partner-types" aria-labelledby="who-we-work-with">`:
     - `<h2 id="who-we-work-with">Who We Work With</h2>`.
     - One `<article class="partner-type-card">` per `PartnerType` instance in `data-model.md` § 3 (six cards).
     - Each card carries: icon, displayName as `<h3>`, oneSentenceDescription, inlineCTA `<a>` pointing to `pages/become-a-partner.html`.
  3. `<section class="partner-benefits" aria-labelledby="benefits-heading">`:
     - `<h2 id="benefits-heading">Why Partner with Zakey</h2>` (or equivalent positioning).
     - Seven `<article class="benefit-card">` items per `data-model.md` § 4.
     - Grid: three columns on desktop, two on tablet, one on mobile.
  4. `<section class="partner-journey" aria-labelledby="journey-heading">`:
     - `<h2 id="journey-heading">Your Partner Journey</h2>`.
     - `<ol class="journey-step-list">` with six `<li class="journey-step">` items.
     - Each step shows a numeric badge, displayName as `<h3>`, oneLineDescription, optional durationHint.
  5. `<section class="partner-packages" aria-labelledby="packages-heading">`:
     - `<h2 id="packages-heading">Ready-Made Project Packages</h2>`.
     - Four `<article class="package-card">` items per `data-model.md` § 6, each linking to its corresponding Phase 03 Solutions detail page.
  6. `<section class="partner-faq" aria-labelledby="faq-heading">`:
     - `<h2 id="faq-heading">Partner Program Questions</h2>`.
     - The FAQ accordion structure defined in [faq-accordion.contract.md](./faq-accordion.contract.md).
     - At least 6 `FaqItem` instances (`data-model.md` § 7).
  7. `<section class="partner-final-cta">`:
     - Strong final CTA repeating the primary "Become a Partner" link.

## State contract

- The FAQ accordion is the only stateful component on the page; its state contract is defined in `faq-accordion.contract.md`.

## Style contract

- Uses existing tokens.
- The journey timeline uses CSS counter-reset / counter-increment for the numeric badges.
- The partner-type-card and package-card use the same dark-elevated card surface family as the homepage feature cards; the benefit-card uses a tighter padding scale and a small icon-on-top layout.

## Behavior contract

- Every CTA resolves (Gate 3).
- Theme parity: both themes render correctly.
- Keyboard navigation: tab order follows DOM order; focus is always visible.

## Failure modes

- **No JS**: FAQ degrades to all-open static markup (see `faq-accordion.contract.md`); every other section is unaffected.
