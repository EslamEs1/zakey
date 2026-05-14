# UI Contract: Article Detail Page Body Layout

**Feature**: `005-final-pages-qa` | **Phase**: 1 (Design)

## Article Detail Page (`pages/article-<slug>.html` — three instances)

### Required sections in DOM order

1. `<section class="article-hero">` — hero image + category badge + h1 title + meta (date, reading time, author optional).
2. `<nav class="article-toc" aria-label="Table of contents">` — **conditional**: rendered ONLY when the article has ≥ 4 H2 sections; omitted otherwise.
3. `<article class="article-body">` — the full body content.
4. `<section class="related-articles">` — H2 "Related Articles" + 2–3 `<article class="related-card">` blocks + a fallback "Browse all articles" CTA to `pages/blog.html`.
5. `<section class="article-final-cta">` — H2 "Bring This to Your Space" + body + 2 CTAs (Request a Quote, Become a Partner).

### Article hero

```html
<section class="article-hero">
  <figure class="article-hero__media">
    <img src="assets/images/blog/<slug>.svg" alt="<descriptive alt>">
  </figure>
  <div class="article-hero__inner">
    <p class="article-hero__category"><Category label></p>
    <h1 class="article-hero__title"><Title></h1>
    <p class="article-hero__meta">
      <time datetime="<publishDate ISO>"><Display date></time>
      <span aria-hidden="true">•</span>
      <span><readingTime> min read</span>
    </p>
  </div>
</section>
```

### Table of contents

```html
<nav class="article-toc" aria-label="Table of contents">
  <h2 class="article-toc__heading">In this article</h2>
  <ol>
    <li><a href="#section-1"><H2 text></a></li>
    <li><a href="#section-2"><H2 text></a></li>
    ...
  </ol>
</nav>
```

Each `<h2>` inside the article body carries the matching `id="section-N"`. Native browser hash-scrolling drives the jump — no JS scroll-spy in Phase 05.

### Article body component

```html
<article class="article-body">
  <h2 id="section-1"><Heading></h2>
  <p>...</p>
  <h3>...</h3>
  <p>...</p>
  <figure>
    <img src="assets/images/blog/article-inline-N.svg" alt="<descriptive alt>">
    <figcaption><Optional caption></figcaption>
  </figure>
  <ul>
    <li>...</li>
  </ul>
  <blockquote>...</blockquote>
  ...
</article>
```

### CSS for `.article-body`

- Max-width ~62ch on desktop (so the column is reading-comfortable).
- Line-height 1.7.
- H2: top-margin `--space-9`, font-size `clamp(1.5rem, 2.5vw, 2rem)`, weight 600.
- H3: top-margin `--space-7`, font-size `clamp(1.15rem, 2vw, 1.4rem)`, weight 600.
- P: margin-block `--space-4`.
- Img: max-width 100%, border-radius `--radius-lg`, soft shadow.
- Figcaption: font-size `0.875rem`, opacity 0.7, margin-top `--space-2`.
- Blockquote: left-border 3px cyan accent, padding-left `--space-5`, italic.
- A: cyan accent color with underline; underline thickens on hover.
- Lists: padding-left `--space-6`.

### Related articles

```html
<section class="related-articles" aria-labelledby="related-heading">
  <h2 id="related-heading">Related Articles</h2>
  <div class="related-grid">
    <article class="related-card">
      <a href="article-<related-slug>.html">
        <img src="assets/images/blog/<related-slug>.svg" alt="<alt>" loading="lazy">
        <h3><Related title></h3>
        <p><Related excerpt 15–25 words></p>
      </a>
    </article>
    ...
  </div>
</section>
```

If a thematically-relevant article is unbuilt, link to `pages/blog.html` as the fallback (or `pages/blog.html#<category>` if blog supports hash-filter deep links).

### Final CTA

```html
<section class="article-final-cta">
  <div class="article-final-cta__inner">
    <h2>Bring This to Your Space</h2>
    <p><Short pitch tying the article topic to a concrete Zakey solution.></p>
    <div class="article-final-cta__actions">
      <a class="btn btn--primary" href="contact.html">Request a Quote</a>
      <a class="btn btn--ghost" href="become-a-partner.html">Become a Partner</a>
    </div>
  </div>
</section>
```

### Word counts

Per implemented article:
- Body: 600–1200 words.
- Excerpt: 15–30 words.
- Each H2 section: 80–200 words.
- Each related-card excerpt: 15–25 words.
