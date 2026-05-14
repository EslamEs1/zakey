# Contract — Category Filter (overview-page toolbar + JS)

**Scope**: The category filter toolbar on `pages/solutions.html` and the `js/solutions.js` module that wires it.

## Markup contract

The toolbar reuses the Phase 02 `.filter-pill` component family. It is identical in structure to the Phase 02 catalog filter, with six buttons total (the five categories + "All"):

```html
<div class="catalog-toolbar__filters" role="toolbar" aria-label="Solution category filters">
  <button type="button" class="filter-pill" data-category="all"          aria-pressed="true">All</button>
  <button type="button" class="filter-pill" data-category="residential"  aria-pressed="false">Residential</button>
  <button type="button" class="filter-pill" data-category="hospitality"  aria-pressed="false">Hospitality</button>
  <button type="button" class="filter-pill" data-category="commercial"   aria-pressed="false">Commercial</button>
  <button type="button" class="filter-pill" data-category="real-estate"  aria-pressed="false">Real Estate</button>
  <button type="button" class="filter-pill" data-category="lifestyle"    aria-pressed="false">Lifestyle</button>
</div>
```

## JS module entry

`js/main.js` is patched once:

```js
if (document.getElementById('solutions-grid')) {
  import('./solutions.js').then(m => m.initFilter());
}
```

`js/solutions.js` exports one function:

```js
export function initFilter() { … }
```

## Behaviour contract

`initFilter()` MUST:

1. **Query** the filter toolbar (`.catalog-toolbar__filters`), every `[data-solution]` card, and both count spans (`[data-visible-count]`, `[data-total-count]`).
2. **Return early** if the toolbar or the cards collection is empty.
3. **Define** `applyFilters()` that walks every `[data-solution]`, splits `card.dataset.category` on whitespace, toggles `.is-hidden` on cards that don't match the active category (or always-visible when the active category is `all`), and updates the visible-count span.
4. **Bind** a click delegate on the toolbar:
   ```js
   filterRow.addEventListener('click', (e) => {
     const pill = e.target.closest('[data-category]');
     if (!pill) return;
     filterRow.querySelectorAll('.filter-pill').forEach(btn =>
       btn.setAttribute('aria-pressed', String(btn === pill)));
     applyFilters();
   });
   ```
5. **On load**, read `window.location.hash`. Resolve order:
   - If hash is a known category slug (`residential`, `hospitality`, `commercial`, `real-estate`, `lifestyle`, `all`) → activate the matching pill.
   - Otherwise, if hash is a known solution slug (one of the eight solution slugs) → resolve to that solution's primary category via the `solutionToCategory` table → activate the matching pill.
   - Otherwise, leave "All" active.
6. **Initialise** the total-count span from `cards.length` (once) and the visible-count span on first `applyFilters()` call.
7. **Set initial state** by calling `applyFilters()` after hash resolution.

## solutionToCategory promotion table

```js
const solutionToCategory = {
  'smart-villa':       'residential',
  'smart-apartment':   'residential',
  'smart-hotel':       'hospitality',
  'smart-office':      'commercial',
  'smart-compound':    'real-estate',
  'gaming-room':       'lifestyle',
  'elderly-care':      'lifestyle',     // primary; also tagged residential
  'smart-retail':      'commercial',
};
```

## Implementation reference

```js
export function initFilter() {
  const filterRow      = document.querySelector('.catalog-toolbar__filters');
  const cards          = Array.from(document.querySelectorAll('[data-solution]'));
  const visibleCountEl = document.querySelector('[data-visible-count]');
  const totalCountEl   = document.querySelector('[data-total-count]');

  if (!filterRow || !cards.length) return;

  const solutionToCategory = {
    'smart-villa': 'residential',
    'smart-apartment': 'residential',
    'smart-hotel': 'hospitality',
    'smart-office': 'commercial',
    'smart-compound': 'real-estate',
    'gaming-room': 'lifestyle',
    'elderly-care': 'lifestyle',
    'smart-retail': 'commercial',
  };

  function applyFilters() {
    const activeBtn = filterRow.querySelector('[aria-pressed="true"]');
    const activeCat = activeBtn ? activeBtn.dataset.category : 'all';

    let visibleCount = 0;
    for (const card of cards) {
      const cardCats = (card.dataset.category || '').split(/\s+/).filter(Boolean);
      const visible  = activeCat === 'all' || cardCats.includes(activeCat);
      card.classList.toggle('is-hidden', !visible);
      if (visible) visibleCount++;
    }

    if (visibleCountEl) visibleCountEl.textContent = String(visibleCount);
  }

  if (totalCountEl) totalCountEl.textContent = String(cards.length);

  filterRow.addEventListener('click', (e) => {
    const pill = e.target.closest('[data-category]');
    if (!pill) return;
    filterRow.querySelectorAll('.filter-pill').forEach((btn) => {
      btn.setAttribute('aria-pressed', String(btn === pill));
    });
    applyFilters();
  });

  const rawHash = window.location.hash.slice(1);
  if (rawHash) {
    const slug = solutionToCategory[rawHash] ?? rawHash;
    const pill = filterRow.querySelector(`[data-category="${CSS.escape(slug)}"]`);
    if (pill) {
      filterRow.querySelectorAll('.filter-pill').forEach((btn) => {
        btn.setAttribute('aria-pressed', String(btn === pill));
      });
    }
  }

  applyFilters();
}
```

## Accessibility

- `role="toolbar"` on the filter container.
- `aria-label="Solution category filters"` on the toolbar.
- `aria-pressed` on each button.
- Tab traverses the toolbar (no arrow-key trap).
- The `.catalog-status` paragraph above the grid carries `aria-live="polite"` so screen readers announce visible-count changes.

## Acceptance probe

- [ ] Click each of the six pills in turn — the grid filters; the clicked pill gets `aria-pressed="true"`; the previously-active pill goes to `false`; the count line updates.
- [ ] Click "All" — every card returns; "All" gets `aria-pressed="true"`.
- [ ] Visit `pages/solutions.html#hospitality` — Hospitality pill is active on first paint.
- [ ] Visit `pages/solutions.html#smart-hotel` — Hospitality pill is active; the Smart Hotel card scrolls into view.
- [ ] Visit `pages/solutions.html#xyz` — All pill stays active; no JS console error.
- [ ] Disable JS — every card stays visible; clicking pills does nothing; no JS error.
- [ ] JS module bundle (`js/solutions.js`) weighs ≤ 4 KB minified.
