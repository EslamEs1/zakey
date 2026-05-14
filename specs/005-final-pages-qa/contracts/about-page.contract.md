# UI Contract: About Page

**Feature**: `005-final-pages-qa` | **Phase**: 1 (Design)

## Page-level requirements

- `<body data-page="about">`.
- `<title>About Zakey — Designing Smarter Spaces with Zakey</title>`.
- One `<h1>` (in `.about-hero`).
- All section headings are H2; subsection headings (e.g., Values cards) are H3.
- Every section ships with at least one visual (image, icon, or composed visual card).

## Required sections in DOM order

### 1. `<section class="about-hero">`

```html
<section class="about-hero">
  <div class="about-hero__inner">
    <p class="about-hero__eyebrow">About Zakey</p>
    <h1 class="about-hero__title">Designing Smarter Spaces with Zakey</h1>
    <p class="about-hero__subtitle">Zakey crafts premium smart-living systems for villas, hotels, offices, and developments — combining elegant hardware, intuitive software, and reliable, project-ready support.</p>
    <div class="about-hero__actions">
      <a class="btn btn--primary" href="contact.html">Talk to Us</a>
      <a class="btn btn--ghost" href="projects.html">See Our Projects</a>
    </div>
  </div>
  <figure class="about-hero__media">
    <img src="../assets/images/about/zakey-smart-living.svg" alt="Modern living room with elegant Zakey smart-home control panel and ambient lighting" loading="eager">
  </figure>
</section>
```

### 2. `<section class="about-story">`

H2 "Our Story" + 2–4 paragraphs (400–700 words total) of authentic brand-story copy. Paragraphs describe Zakey's founding, market focus, geographic ambition, and partner-network philosophy. Lifestyle/founders-style visual on the side.

### 3. `<section class="about-mission-vision">`

A 2-column grid of two cards:
- **Mission card** (`.about-card[data-card="mission"]`): H2 "Mission" + 30–60 word body + small icon SVG.
- **Vision card** (`.about-card[data-card="vision"]`): H2 "Vision" + 30–60 word body + small icon SVG.

### 4. `<section class="about-values">`

H2 "Our Values" + a grid of 4–5 value cards. Each card carries:
- An icon SVG (24×24 line-art).
- An H3 value name (e.g., "Premium First", "Integrator-Friendly", "Privacy by Design", "Always Reliable", "Built to Scale").
- A 15–25 word body explaining the value in practice.

### 5. `<section class="about-why">`

H2 "Why Zakey" + a grid of 4–6 differentiator bullets. Each carries:
- An icon SVG.
- A short label (3–6 words, e.g., "Project-Ready Out of the Box").
- A 1-sentence body (15–25 words).

### 6. `<section class="about-global">`

H2 "Global-Ready, Locally Supported" + 2–3 paragraphs explaining Zakey's market footprint and partner-network philosophy. Accompanying visual: a stylized regional map SVG with cyan-pin highlights on key markets.

### 7. `<section class="about-team">`

H2 "The People & Expertise Behind Zakey" + a 4-card grid. Each card carries:
- Avatar/portrait SVG (250×250).
- H3 with either a name and role OR an expertise-area label (e.g., "Smart-Home Engineering", "Hospitality Solutions", "Partner Operations", "Customer Success").
- A 1-sentence bio or expertise-statement (20–35 words).

Generic expertise-area cards are acceptable in lieu of specific named team members — the goal is to convey depth across multiple disciplines without inventing fake identities.

### 8. `<section class="about-cta">`

H2 "Let's Design Smarter Spaces Together" + 1-sentence body + 2 CTAs:
- Primary: `<a class="btn btn--primary" href="contact.html">Request a Quote</a>`
- Secondary: `<a class="btn btn--ghost" href="become-a-partner.html">Become a Partner</a>`

## CSS component family

All new sections introduce CSS under `@layer components`. Class names (all prefixed with `.about-`):

- `.about-hero`, `.about-hero__inner`, `.about-hero__eyebrow`, `.about-hero__title`, `.about-hero__subtitle`, `.about-hero__actions`, `.about-hero__media`
- `.about-story`, `.about-story__inner`, `.about-story__copy`, `.about-story__media`
- `.about-mission-vision`, `.about-card`, `.about-card__icon`, `.about-card__title`, `.about-card__body`
- `.about-values`, `.about-values__grid`, `.about-values__card` (or `.about-card` reuse), `.about-values__icon`, `.about-values__title`, `.about-values__body`
- `.about-why`, `.about-why__grid`, `.about-why__item`, `.about-why__icon`, `.about-why__label`, `.about-why__body`
- `.about-global`, `.about-global__inner`, `.about-global__copy`, `.about-global__map`
- `.about-team`, `.about-team__grid`, `.about-team__card`, `.about-team__avatar`, `.about-team__name`, `.about-team__role`, `.about-team__bio`
- `.about-cta`, `.about-cta__inner`, `.about-cta__actions`

## Responsive behavior

- Hero: 2-col on `≥ 768 px`, stacked on `< 768 px` (visual above copy on mobile, visual on right at desktop).
- Story: 2-col on `≥ 1024 px`, stacked on `< 1024 px`.
- Mission/Vision: 2-col on `≥ 768 px`, stacked on mobile.
- Values: 4 or 5 cols on `≥ 1280 px`, 2 cols on `768–1279 px`, 1 col on `< 768 px`.
- Why: 3 cols on `≥ 1024 px`, 2 cols on `640–1023 px`, 1 col below.
- Team: 4 cols on `≥ 1024 px`, 2 cols on `640–1023 px`, 1 col below.
- All section paddings come from existing `--space-*` tokens.
