# UI Contract: Blog Card & Blog Overview Filter

**Feature**: `005-final-pages-qa` | **Phase**: 1 (Design)

## Blog Card (rendered on `pages/blog.html`)

### DOM shape — implemented article

```html
<article class="blog-card" data-category="<category>" data-article="<slug>" data-article-status="implemented">
  <a class="blog-card__media" href="<articleFile>" aria-label="<title>">
    <img src="assets/images/blog/<slug>.svg" alt="<descriptive alt>" loading="lazy">
    <span class="blog-card__category-tag"><Category label></span>
  </a>
  <div class="blog-card__body">
    <p class="blog-card__meta">
      <time datetime="<publishDate ISO>"><Display date></time>
      <span aria-hidden="true">•</span>
      <span><readingTime> min read</span>
    </p>
    <h3 class="blog-card__title"><Title></h3>
    <p class="blog-card__excerpt"><Excerpt 15–30 words></p>
    <a class="blog-card__cta btn btn--ghost" href="<articleFile>">
      Read Article →
    </a>
  </div>
</article>
```

### DOM shape — coming-soon article

```html
<article class="blog-card" data-category="<category>" data-article="<slug>" data-article-status="coming-soon">
  <div class="blog-card__media">
    <img src="assets/images/blog/<slug>.svg" alt="<descriptive alt>" loading="lazy">
    <span class="blog-card__category-tag"><Category label></span>
    <span class="blog-card__status">Coming Soon</span>
  </div>
  <div class="blog-card__body">
    <p class="blog-card__meta">
      <span><Category label></span>
      <span aria-hidden="true">•</span>
      <span>Coming Soon</span>
    </p>
    <h3 class="blog-card__title"><Title></h3>
    <p class="blog-card__excerpt"><Excerpt 15–30 words></p>
    <span class="blog-card__cta btn btn--ghost btn--disabled" aria-disabled="true">
      Coming Soon
    </span>
  </div>
</article>
```

### Required attributes

- `data-category` — drives filter; one of the six category slugs.
- `data-article` — slug.
- `data-article-status` — either `implemented` or `coming-soon`.
- Implemented cards: `href` on `.blog-card__media` and `.blog-card__cta` MUST match.
- Coming-soon cards: NO `href` anywhere; the `<a>` element on `.blog-card__media` is replaced by a `<div>`; the CTA is a `<span>`, not an `<a>`, and carries `aria-disabled="true"`.

### Filter behavior

Same pattern as the Projects filter (see project-card.contract.md). Grid container: `<div class="blog-grid" data-active-filter="all">`. Six category filter chips plus "All".

### CSS state for `.btn--disabled`

```css
.btn--disabled,
.btn[aria-disabled="true"] {
  opacity: 0.55;
  cursor: not-allowed;
  pointer-events: none;
}
```

The pointer-events:none ensures the disabled "CTA" cannot be clicked even if a screen reader's user-agent ignores `aria-disabled`.

## Blog Overview Page (`pages/blog.html`)

### Required sections in DOM order

1. `<section class="blog-hero">` — hero image + h1 + 1-sentence intro.
2. `<nav class="blog-filter" aria-label="Filter articles by category">` — 7 chips: All, Smart Home, Security, Energy Saving, Hotels, Product Guides, Partner Insights.
3. `<section class="blog-grid-section">` containing `<div class="blog-grid">` with 9+ `<article class="blog-card">` children.
4. `<section class="blog-newsletter">` — newsletter CTA (reuse Phase 01 newsletter form).
5. Standard global footer.

### Empty-state handling

If a filter has zero matches (which should not happen given the canonical card list, but as a safety net), the grid renders an `<p class="blog-grid__empty" hidden>No articles match the selected category.</p>` element that the filter JS unhides when needed.
