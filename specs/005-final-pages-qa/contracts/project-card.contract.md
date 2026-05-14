# UI Contract: Project Card & Project Detail Page

**Feature**: `005-final-pages-qa` | **Phase**: 1 (Design)

## Project Card (rendered on `pages/projects.html`)

### DOM shape

```html
<article class="project-card" data-segment="<segment>" data-project="<slug>">
  <a class="project-card__media" href="<ctaTarget>" aria-label="<title>">
    <img src="assets/images/projects/<slug>.svg" alt="<descriptive alt>" loading="lazy">
    <span class="project-card__segment-tag"><Segment label></span>
  </a>
  <div class="project-card__body">
    <h3 class="project-card__title"><Title></h3>
    <p class="project-card__location"><LocationLabel></p>
    <dl class="project-card__highlights">
      <dt>Challenge</dt><dd><Challenge summary, 18–35 words></dd>
      <dt>Solution</dt><dd><Solution summary, 18–35 words></dd>
      <dt>Results</dt><dd><Top result, 8–15 words></dd>
    </dl>
    <a class="project-card__cta btn btn--ghost" href="<ctaTarget>">
      <ctaLabel> →
    </a>
  </div>
</article>
```

### Required attributes

- `data-segment` — drives the filter behavior; one of `villa`, `hotel`, `office`, `real-estate`, `commercial`.
- `data-project` — slug used for analytics / future deep-links.
- `href` on `.project-card__media` and `.project-card__cta` — MUST be the same target.
- `alt` on `<img>` — descriptive (e.g., "Luxury villa interior with Zakey wall panel and ambient lighting"), never empty, never "image".

### Filter behavior

- The grid container is `<div class="projects-grid" data-active-filter="all">`.
- The filter chips are `<button class="filter-chip" data-filter="all|villa|hotel|office|real-estate|commercial">`.
- On chip click: update `data-active-filter` on the grid; iterate cards; toggle `hidden` on each card based on `data-segment === activeFilter || activeFilter === 'all'`.
- The clicked chip carries `aria-pressed="true"`; all other chips carry `aria-pressed="false"`.
- Filter state is **not** persisted across navigation in Phase 05 (the spec does not require it).

## Project Detail Page (rendered on `pages/project-<slug>.html` — three instances)

### Required sections in DOM order

1. `<section class="project-hero">` — large hero image + title + segment tag + location label + 1-paragraph summary.
2. `<section class="project-summary">` — 60–120 word overview of the project.
3. `<section class="project-challenge">` — H2 "The Challenge" + body.
4. `<section class="project-solution">` — H2 "The Zakey Solution" + body.
5. `<section class="project-devices">` — H2 "Devices Used" + bulleted list (4–10 items).
6. `<section class="project-scenes">` — H2 "Automation Scenes" + 3–6 scene cards (each: scene name + 1-sentence description + small icon).
7. `<section class="project-results">` — H2 "Results" + 3–5 result stat cards (each: large number + label + 1-sentence context).
8. `<section class="project-gallery">` — H2 "Project Gallery" + grid of 4+ `<a><img></a>` thumbnails opening in new tab.
9. `<section class="project-final-cta">` — H2 "Ready for Your Own Project?" + body + 2 CTAs (Become a Partner, Request a Quote).

### Theme compatibility

Both themes (`[data-theme="dark"]` and `[data-theme="light"]`) MUST render the entire page correctly. Test by toggling the theme on the rendered page.

### Accessibility

- One `<h1>` per page (in `.project-hero`).
- Heading hierarchy strict: H1 → H2 → (optional H3) → never skip a level.
- All gallery `<img>` tags carry descriptive alt text — even thumbnails.
- Focus-visible rings on every CTA, every gallery thumbnail link.
- Keyboard-reachable: every interactive element via Tab.

### Performance

- Each gallery image ≤ 30 KB SVG (or ≤ 200 KB JPG when swapped).
- Lazy-load all images below the hero (`loading="lazy"` on every `<img>` except the hero).
