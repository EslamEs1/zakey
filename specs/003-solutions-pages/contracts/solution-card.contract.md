# Contract — Solution Card

**Scope**: One `<article>` inside `#solutions-grid` on `pages/solutions.html`. Each Phase 03 solution renders exactly one card here. Each card is also the click target for header mega-menu deep links (`pages/solutions.html#<slug>`).

## Markup shape

```html
<article class="solution-card" id="smart-villa"
         data-solution
         data-category="residential">
  <div class="solution-card__visual">
    <img src="../assets/images/solutions/smart-villa.svg"
         alt="Zakey smart villa: open-plan living room with Aura Panel, motorised curtains, and ambient lighting"
         width="480" height="360"
         loading="lazy" decoding="async">
  </div>
  <div class="solution-card__body">
    <p class="solution-card__eyebrow eyebrow">Residential</p>
    <h3 class="solution-card__title">Smart Villa</h3>
    <p class="solution-card__desc">Luxury whole-home automation engineered for villas and signature residences.</p>
    <p class="solution-card__for"><strong>For:</strong> villa owners, premium homebuilders, interior designers</p>
    <ul class="solution-card__benefits" aria-label="Headline benefits">
      <li class="solution-card__benefit">Whole-home scenes</li>
      <li class="solution-card__benefit">Centralised control</li>
      <li class="solution-card__benefit">Energy intelligence</li>
      <li class="solution-card__benefit">Premium finishes</li>
    </ul>
    <a class="solution-card__cta btn btn--ghost"
       href="./solution-smart-villa.html">Discover this solution &rarr;</a>
  </div>
</article>
```

## Field constraints

| Field | Constraint |
|---|---|
| `id="<slug>"` | matches the detail-page filename suffix (`smart-villa` ↔ `solution-smart-villa.html`) |
| `data-solution` | flag attribute (no value); used by filter JS for `querySelectorAll('[data-solution]')` |
| `data-category="<slug>[ <slug>]"` | one or two space-separated canonical category slugs |
| `<img loading="lazy" decoding="async">` | every card except the first 4 cards on the page (first 4 paint eagerly with `fetchpriority` not set) |
| `<img alt>` | descriptive (50–140 chars), never empty |
| `.solution-card__eyebrow` | matches the primary category display name |
| `.solution-card__title` | the canonical solution title |
| `.solution-card__desc` | one sentence, 40–100 chars |
| `.solution-card__for` | "For:" prefix + comma-separated audience descriptors |
| `.solution-card__benefits` | exactly 4 `<li>` items |
| `.solution-card__cta` | text "Discover this solution →"; href `./solution-<slug>.html` |

## CSS contract (in `src/input.css` under `@layer components`)

```css
.solution-card {
  display: flex;
  flex-direction: column;
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
}

.solution-card:hover {
  transform: translateY(-4px);
  border-color: rgb(var(--color-accent-ch) / 0.4);
  box-shadow: var(--shadow-elevated), 0 0 0 1px rgb(var(--color-accent-ch) / 0.2);
}

.solution-card__visual {
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: var(--color-bg-deep);
}

.solution-card__visual img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.solution-card:hover .solution-card__visual img {
  transform: scale(1.04);
}

.solution-card__body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  padding: var(--space-6);
}

.solution-card__title { font-size: 1.25rem; font-weight: 700; color: var(--color-text-primary); }
.solution-card__desc  { font-size: var(--font-caption); color: var(--color-text-muted); line-height: var(--leading-body); }
.solution-card__for   { font-size: 0.8125rem; color: var(--color-text-muted); }

.solution-card__benefits {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  list-style: none;
  padding: 0;
  margin: 0;
}

.solution-card__benefit {
  display: inline-block;
  padding: 0.25rem 0.625rem;
  border-radius: var(--radius-sm);
  background: rgb(var(--color-accent-ch) / 0.1);
  color: var(--color-accent);
  font-size: 0.6875rem;
  font-weight: 500;
}

.solution-card__cta { margin-top: auto; align-self: flex-start; }

.solution-card.is-hidden { display: none !important; }
```

## Acceptance probe

- [ ] Every card has `id="<slug>"`, `data-solution`, `data-category="<slug>[ <slug>]"`.
- [ ] Every card has an image with a non-empty descriptive `alt`.
- [ ] Every card has exactly one eyebrow, one h3 title, one description, one "For:" line, exactly 4 benefit chips, and one CTA.
- [ ] Hover on desktop lifts the card by ~4 px and applies an accent border + elevated shadow.
- [ ] The CTA `href` resolves to a real `pages/solution-<slug>.html` file (link gate verifies).
