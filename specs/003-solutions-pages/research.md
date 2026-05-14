# Phase 0 Research — Zakey Phase 03

**Feature**: Solutions Overview & Solution Detail Pages
**Date**: 2026-05-14
**Status**: All `NEEDS CLARIFICATION` resolved; ready for Phase 1.

The Technical Context in `plan.md` is fully concrete — the constitution and Phase 01/02 fix every toolchain, design-token, and architectural decision Phase 03 would otherwise need to make. The remaining decisions are **solutions-page-specific patterns**: how to encode a solution's category membership (single vs multi), how the overview filter integrates with the Phase 02 filter shape, how the topology diagram is authored, and how the nine-section detail-page template is composed from reused vs new components. Each decision below is independently verifiable in Phase 1.

---

## D-01 — Solution metadata representation

**Decision**: Encode per-card metadata on the card root element as **`data-*` attributes**, identical in shape to Phase 02 product cards but with a category-only filter axis (no tag-based search). Schema:

```html
<article class="solution-card"
         id="smart-villa"
         data-solution
         data-category="residential">
  …all content authored in static HTML…
</article>
```

For solutions whose audience genuinely spans multiple categories (Elderly Care fits both `residential` and `lifestyle`; Smart Compound could fit both `real-estate` and `residential`), the category attribute carries **space-separated tokens**:

```html
<article class="solution-card" id="elderly-care" data-solution data-category="lifestyle residential">
```

The filter matches a card whenever the active category is `all` OR `card.dataset.category.split(' ').includes(activeCat)`. Multi-token cards therefore appear in two tabs — this is the desired behaviour for genuine cross-category solutions, and the visitor never encounters a "where did Elderly Care go?" surprise.

**Rationale**:
- Mirrors the Phase 02 product-card pattern exactly: same `data-product` flag (here `data-solution`), same `data-category` shape, same `.is-hidden` toggle. A contributor who learned Phase 02 already knows Phase 03.
- Constitution II compliance: every card's primary content is static HTML; JS only toggles `.is-hidden`.
- Space-separated tokens avoid the alternative of a `data-categories` JSON blob (which would push toward JS templating).

**Alternatives considered**:
- *Force single category per solution* — rejected; Elderly Care is a real cross-category use case, and forcing a single tag misleads the visitor.
- *Separate `data-primary-category` and `data-secondary-category`* — rejected; doubles the attribute surface for one edge case and the filter logic would still need to OR them.
- *Migrate to Phase 02's `data-tags` substring search* — rejected; the filter axis here is category, not free-text, and a substring search on `"residential lifestyle"` would give unexpected matches.

---

## D-02 — Filter algorithm (port from Phase 02)

**Decision**: A single `applyFilters()` function in `js/solutions.js` that walks every `[data-solution]` element exactly once, toggling `.is-hidden` based on the active-category match. Same shape as the Phase 02 `applyFilters()` in `js/products.js`, simplified by dropping the search-query branch (no search input on the overview page).

```js
function applyFilters() {
  const activeBtn = filterRow.querySelector('[aria-pressed="true"]');
  const activeCat = activeBtn ? activeBtn.dataset.category : 'all';
  let visibleCount = 0;
  for (const card of cards) {
    const cardCats = card.dataset.category.split(/\s+/);
    const visible  = activeCat === 'all' || cardCats.includes(activeCat);
    card.classList.toggle('is-hidden', !visible);
    if (visible) visibleCount++;
  }
  if (visibleCountEl) visibleCountEl.textContent = String(visibleCount);
}
```

`initFilter()` (the module's only export) is invoked from `js/main.js` conditionally on `document.getElementById('solutions-grid')`. The function:
1. Queries the filter toolbar, the `[data-solution]` cards, and the count spans.
2. Binds a click delegate on the toolbar that updates `aria-pressed` and calls `applyFilters()`.
3. On load, reads `window.location.hash` and pre-activates the matching tab. Two hash shapes are supported:
   - **Category hash** (`#hospitality`) — directly matches a `data-category` slug.
   - **Solution hash** (`#smart-hotel`) — does not match any `data-category` slug, so a small `solutionToCategory` mapping resolves it to the solution's *primary* category and pre-activates that tab. Browser anchor behaviour still scrolls the matching `id="smart-hotel"` card into view.

**Rationale**:
- O(N) per filter at N ≤ 10 cards is trivial; no virtualisation or memoisation needed.
- Mirroring Phase 02 means one mental model across both pages.
- Solution-hash → category-hash promotion makes the Phase 01 mega-menu deep-links (`#smart-villa` etc.) immediately useful without HTML changes.

**Alternatives considered**:
- *CSS-only `:has()` filter driven by radio inputs* — rejected; even though `:has()` is now baseline, combining it with hash pre-activation still requires JS to set the radio's `checked` state, so the dual mechanism gains nothing.
- *History API `pushState` on tab clicks* — rejected; same logic as Phase 02 D-04 (introduces back-button surprise; filter state is ephemeral by design).
- *Drop hash pre-activation and rely on browser anchor scroll only* — rejected; visitors arriving from the mega-menu would land on a full grid scrolled to the card, not a focused filtered view — a worse first impression.

---

## D-03 — URL hash deep-link behaviour

**Decision**: On `pages/solutions.html` load, the script reads `window.location.hash` and applies this resolution order:

1. **Category match** (`#residential`, `#hospitality`, `#commercial`, `#real-estate`, `#lifestyle`, `#all`): the corresponding tab gets `aria-pressed="true"`. `applyFilters()` runs.
2. **Solution match** (`#smart-villa`, `#smart-apartment`, `#smart-hotel`, `#smart-office`, `#smart-compound`, `#gaming-room`, `#elderly-care`, `#smart-retail`): a `solutionToCategory` lookup table resolves to the solution's primary category and that tab gets `aria-pressed="true"`. `applyFilters()` runs. The browser then scrolls to the matching `id` anchor (standard hash behaviour, no custom JS).
3. **Unknown hash** (`#xyz`): the "All" tab stays active; `applyFilters()` runs; the browser performs its default fallback (scrolling to top if `#xyz` matches nothing).

**Rationale**:
- The Phase 01 mega-menu currently links to `pages/solutions.html#smart-villa` etc. (6 cells) — those slugs must keep working without forcing a refactor of `index.html` or every per-page header copy.
- Mirrors Phase 02 D-04 which used the same hash-alias trick for products.

**Alternatives considered**:
- *Force Phase 01 mega-menu to link to category slugs (`#residential` etc.)* — rejected; the mega-menu uses solution-specific cell text ("Smart Villa"), so the hash should match. Also requires modifying the header on every page (12+ pages) and would re-trigger the shell-consistency gate work.
- *Drop hash support entirely* — rejected; FR-008 requires deep-link pre-activation.

---

## D-04 — Solution detail page structure & section reuse

**Decision**: Each detail page renders exactly **nine sections** in a fixed order. Each section is implemented with reused components where possible and a small number of new component families where the use case is solutions-specific:

| # | Section | Class family | Reuse origin |
|---|---|---|---|
| 1 | Hero | `.solution-hero` (NEW, inspired by Phase 02 `.product-hero`) | new, ~50% smaller than product hero |
| 2 | Problem | `.problem-list` (NEW) | new |
| 3 | Zakey Solution | `.solution-narrative` (NEW, just a typographic block) | new |
| 4 | Included Systems | `.subsystem-grid` / `.subsystem-card` (NEW, ports `.product-features__card`) | port of Phase 02 features grid |
| 5 | Automation Scenarios | `.product-scenarios` (REUSE Phase 02 exactly) | Phase 02 |
| 6 | Recommended Products | `.product-related__grid` + `.card-product` (REUSE Phase 02 exactly) | Phase 02 |
| 7 | Benefits | `.benefit-grid` / `.benefit-card` (NEW, simpler than features grid) | new |
| 8 | How It Connects | `.topology-diagram` (NEW; wraps an inline SVG) | new |
| 9 | Final CTA | `.solution-final-cta` (NEW, identical structure to Phase 02 `.product-final-cta`) | port |

**Rationale**:
- Reuse is the principal saving: scenarios and recommended-products are byte-identical to Phase 02 implementations, which keeps both visual consistency and CSS budget healthy.
- New components are introduced only where the solution-page intent diverges from a product-page intent: problem-pain-points are not a product concept; topology diagrams have no analogue in Phase 02; benefit chips need a softer typographic treatment than feature cards.

**Alternatives considered**:
- *Reuse `.product-features` for both Included Systems AND Benefits* — rejected; the two grids have different copy density and different visual weight (Included Systems is product-icon-heavy, Benefits is a typographic chip grid). Forcing one component would compromise both.
- *Combine Problem + Zakey Solution into one section* — rejected; the rhetorical impact of "here is the problem" followed by "here is our answer" is the storytelling spine of every detail page. Merging them collapses the narrative.
- *Drop the topology diagram (US3) from MVP* — rejected; the spec marks US3 as P2 (still in-scope for MVP) and FR-028 makes the diagram a required section.

---

## D-05 — Topology diagram authoring (inline SVG, per-page)

**Decision**: The "How It Connects" diagram on every detail page is an **inline `<svg>`** embedded directly in the HTML, sized 600 × 360 viewBox, with:
- A central circular node labelled "Zakey Mesh Bridge".
- 5–8 outer nodes positioned in a fan or ring around the hub, each labelled with a subsystem name (Aura Panel / Lighting / Climate / Security / Sensors / Energy / Curtains / Voice & App).
- A separate cloud node above the hub labelled "Zakey Cloud + App + Voice".
- Connecting lines (paths or `<line>` elements) between hub and each outer node, and between hub and cloud.
- A `<title>` element as the SVG's first child describing the topology in one sentence (e.g., "Zakey Smart Villa topology: a central Mesh Bridge connecting seven subsystems and the Zakey Cloud").
- `aria-labelledby` on the `<svg>` referencing the `<title>` `id`.
- `aria-hidden="true"` on decorative paths (the connecting lines).
- Stroke and fill colours sourced from `:root` channel tokens (`var(--color-accent)`, `var(--color-border)`, etc.) — no hardcoded hex.

The diagram is **authored per page**, not shared. Each page omits subsystem nodes irrelevant to that solution (e.g., Gaming Room drops curtains; Elderly Care drops gaming entertainment). Each diagram weighs ≈ 1–1.5 KB inlined.

**Rationale**:
- Constitution II compliance: the diagram is content, not behaviour, so it lives in HTML.
- Constitution III compliance: the diagram is a meaningful visual that pays off the "premium credibility" promise for technical buyers.
- Per-page authoring (rather than CSS-toggled nodes) means each page's topology accurately reflects what that solution actually includes.

**Alternatives considered**:
- *External SVG file per solution (`assets/icons/topology-<slug>.svg`)* — rejected; adds an HTTP request and breaks the "content in HTML" invariant (the diagram's labels are content).
- *Canvas-rendered diagram with JS* — rejected; violates Principle II and adds inertia for screen readers.
- *PNG/JPG of a static diagram* — rejected; not scalable, not accessible, breaks the SVG-everywhere convention.

---

## D-06 — Component reuse from Phase 02

**Decision**: Phase 03 reuses these Phase 02 components byte-identically (no class-name changes, no markup tweaks):
- `.btn`, `.btn--primary`, `.btn--secondary`, `.btn--ghost` (Phase 01 button family).
- `.filter-pill` and its `[aria-pressed="true"]` state (Phase 02 catalog filter — Phase 03 reuses the same look on the solutions toolbar).
- `.card-product` (Phase 02 product card — used in Recommended Products section on detail pages).
- `.product-scenarios`, `.product-scenarios__item`, `.product-scenarios__context`, `.product-scenarios__trigger`, `.product-scenarios__action` (Phase 02 — used in Automation Scenarios section).
- `.product-features__grid`, `.product-features__card`, `.product-features__icon`, `.product-features__title`, `.product-features__desc` (Phase 02 — **borrowed as base styles for the new `.subsystem-card` family**; the subsystem cards extend rather than restyle).
- `.product-final-cta` (Phase 02 — borrowed as base for `.solution-final-cta`).
- `u-section`, `u-container`, `u-btn-row`, `eyebrow`, `sr-only`, `skip-link` (Phase 01 utilities).
- `.is-hidden` (Phase 02 filter utility).
- `:root` channel-token system + `--color-*`, `--space-*`, `--font-*`, `--radius-*`, `--shadow-*`, `--tracking-*`, `--leading-*` variables (Phase 01 design system).

**Rationale**:
- Each reused component reduces both the CSS budget hit and the visual-consistency risk.
- A contributor familiar with Phase 02 needs zero retraining to author a Phase 03 page.

**Alternatives considered**:
- *Wrap Phase 02 components in Phase 03 wrappers* — rejected; doubles the class surface for no visual gain.
- *Inline-style every solution page* — rejected; violates Principle III (reusable design system).

---

## D-07 — CTA target resolution

**Decision**: All Phase 03 CTAs resolve as follows:

| CTA label | Target |
|---|---|
| "Get a Quote" (hero, recommended-products card, final CTA) | `../index.html#get-quote` |
| "Talk to a Specialist" (final CTA) | `./contact.html` |
| "Explore Products" (hero secondary) | `./products.html` |
| "Discover this solution" (overview card) | `./solution-<slug>.html` |
| Recommended-product "View Details" | `./product-zakey-<slug>.html` for flagships (4); `./products.html#product-zakey-<slug>` for non-flagships |
| "Plan Your Project" (overview hero primary) | `../index.html#get-quote` |

**Rationale**:
- One quote-form URL across all pages (no duplication, easy analytics later).
- Recommended-products inherit the Phase 02 FR-062 fallback for non-flagship products.

**Alternatives considered**:
- *Per-solution quote form deep-link* — rejected; not in scope for Phase 03 (no per-solution form variant exists yet).
- *Modal-based quote form launched from CTAs* — rejected; out of scope (no modal infrastructure in Phase 01/02).

---

## D-08 — Image asset strategy

**Decision**: Every solution card and every detail-page hero needs a unique image. Phase 03 ships **eight new SVG placeholders** under `assets/images/solutions/`:
- `smart-villa.svg`, `smart-apartment.svg`, `smart-hotel.svg`, `smart-office.svg`, `smart-compound.svg`, `gaming-room.svg`, `elderly-care.svg` (optional), `smart-retail.svg` (optional).

Each follows the Phase 02 placeholder convention:
- 1200 × 900 viewBox for hero/lifestyle visuals (overview cards crop to 4:3 via CSS `object-fit`).
- Brand gradient background + a minimal scene silhouette + the solution slug text label.
- File size ≤ 6 KB each (slightly larger than Phase 02's 4 KB product SVGs to accommodate richer scene art).

The Phase 02 lifestyle visuals (`zakey-aura-living.svg`, `zakey-secure-entrance.svg`, `zakey-switch-bedroom.svg`, `zakey-climate-office.svg`) MAY be reused for the **Zakey Solution narrative section** of the appropriate detail page (e.g., `zakey-aura-living.svg` for Smart Villa's solution narrative), but each page MUST have a distinct hero.

**Rationale**:
- Same convention as Phase 02 — contributors authoring Phase 03 already know the placeholder shape.
- SVG keeps per-page weight low (8 × 6 KB = 48 KB total assets across all eight solutions, well under the 1.5 MB page budget).

**Alternatives considered**:
- *Use Phase 02 product images as solution heroes* — rejected; violates FR-051 (unique image per page) and FR-052 (3+ visuals per detail page).
- *Stock photography* — rejected; out of scope and licensing-risky.

---

## D-09 — CSS scoping for new components

**Decision**: All new Phase-03 component classes live in `src/input.css` under `@layer components`, namespaced by their conceptual family:
- `.solution-hero` — overview-page hero
- `.solution-grid` — overview-page card grid container
- `.solution-card` — overview-page card
- `.solution-card__visual` — card image wrapper
- `.solution-card__body` — card text region
- `.solution-card__eyebrow` — category eyebrow on card
- `.solution-card__title` — card h3
- `.solution-card__desc` — one-sentence positioning copy
- `.solution-card__for` — "For:" target-user line
- `.solution-card__benefits` — 4-benefit chip list
- `.solution-card__benefit` — individual benefit chip
- `.solution-card__cta` — card CTA button
- `.detail-hero` — detail-page hero (smaller than Phase 02 product-hero)
- `.detail-hero__inner` — two-column grid (content + lifestyle image)
- `.detail-hero__content` — text column
- `.detail-hero__visual` — image column
- `.problem-list` — Problem-section list
- `.problem-list__item` — one pain point
- `.solution-narrative` — Zakey Solution prose block
- `.subsystem-grid` — Included Systems grid
- `.subsystem-card` — one subsystem card (extends `.product-features__card` look)
- `.benefit-grid` — Benefits grid
- `.benefit-card` — one benefit (lighter than subsystem-card)
- `.topology-diagram` — How It Connects wrapper
- `.topology-diagram__svg` — the inline SVG
- `.topology-diagram__legend` — optional caption strip
- `.solution-final-cta` — Final CTA band (same shape as `.product-final-cta`)
- `.solution-final-cta__heading` — band h2

All names follow the BEM-lite convention of Phase 01/02. No new utility classes outside this list.

**Rationale**:
- Predictable for contributors who learned Phase 02.
- Component names match conceptual sections (`problem-list`, `topology-diagram`), making CSS audits trivial.

**Alternatives considered**:
- *Inline Tailwind utility composition in each HTML page* — rejected; the components are reused across 1 overview + 8 detail pages, so a component class avoids the repetition.

---

## D-10 — Browser feature baseline (no changes from Phase 02)

**Decision**: Same baseline as Phase 02: ES Modules, `IntersectionObserver`, `URLSearchParams`, optional chaining (`?.`), nullish coalescing (`??`), `??=`, `Element.toggleAttribute`, `Element.classList.toggle(name, force)`, `String.prototype.split`. All available in every browser the `.browserslistrc` (added in Phase 02) targets. No transpilation, no polyfills.

**Rationale**: Same baseline. Phase 03 adds no new browser-API requirements.

---

## D-11 — Accessibility patterns for the category filter (port from Phase 02)

**Decision**: The category filter is implemented as a **toolbar of mutually-exclusive toggle buttons** using `role="toolbar"`, `aria-label="Solution category filters"`, and `aria-pressed` on each button — identical to the Phase 02 catalog filter pattern:

```html
<div class="catalog-toolbar__filters" role="toolbar" aria-label="Solution category filters">
  <button type="button" class="filter-pill" data-category="all" aria-pressed="true">All</button>
  <button type="button" class="filter-pill" data-category="residential" aria-pressed="false">Residential</button>
  <button type="button" class="filter-pill" data-category="hospitality" aria-pressed="false">Hospitality</button>
  <button type="button" class="filter-pill" data-category="commercial" aria-pressed="false">Commercial</button>
  <button type="button" class="filter-pill" data-category="real-estate" aria-pressed="false">Real Estate</button>
  <button type="button" class="filter-pill" data-category="lifestyle" aria-pressed="false">Lifestyle</button>
</div>
```

`Tab` traverses the toolbar (no arrow-key trap), matching Phase 02. The visible-count line uses `aria-live="polite"`.

**Rationale**:
- A contributor who learned the Phase 02 pattern knows the Phase 03 pattern.
- `aria-pressed` is the canonical pattern for toggle buttons.

**Alternatives considered**:
- *`role="tablist"` with `role="tabpanel"` for each category* — rejected; the underlying view is one grid, not multiple panels. Same reasoning as Phase 02 D-11.

---

## D-12 — Performance budget for solution pages

**Decision**: Same envelope as Phase 02, with two adjustments:
- **HTML budget per detail page** ≤ 80 KB (each page is content-dense; nine sections × ~9 KB ≈ 80 KB).
- **CSS budget total** ≤ 64 KB (relaxed from Phase 02's 60 KB — see plan.md Complexity Tracking and justification in D-09).
- **JS total** across all modules ≤ 30 KB (Phase 02 ended at 6,458 bytes; Phase 03 adds ~3 KB for `solutions.js`, well under cap).
- **Hero image** ≤ 8 KB per solution-page SVG, lazy-loaded for the included-systems icons (inline SVG so no HTTP cost) and recommended-products images (Phase 02 product SVGs, already capped at ~4 KB each).
- **LCP target**: < 2.5 s on 3G-fast.

**Rationale**: Same envelope, larger per-page HTML budget to accommodate the long-form storytelling format.

**Alternatives considered**:
- *Render only first-fold sections, lazy-mount the rest via JS* — rejected; violates Principle II (JS-injected content).
- *Split detail pages into a hero page + a deep-dive sub-page* — rejected; doubles the page count for no narrative benefit and complicates the funnel.

---

## D-13 — Section ordering and heading hierarchy

**Decision**: Each detail page uses this section order with one `<h1>` (solution title in the hero), `<h2>` for each of the eight remaining sections, and `<h3>` for items inside (problem pain points, subsystem cards, scenario context labels, benefit headings). The `<main>` landmark wraps everything below `<!-- header:end -->`.

| Order | Section | Element | Heading |
|---|---|---|---|
| 1 | Hero | `<section class="detail-hero">` | `<h1>` |
| 2 | Problem | `<section class="problem-list" aria-labelledby="problem-h">` | `<h2 id="problem-h">` |
| 3 | Zakey Solution | `<section class="solution-narrative" aria-labelledby="solution-h">` | `<h2 id="solution-h">` |
| 4 | Included Systems | `<section class="subsystem-grid" aria-labelledby="systems-h">` | `<h2 id="systems-h">` |
| 5 | Automation Scenarios | `<section class="product-scenarios" aria-labelledby="scenarios-h">` | `<h2 id="scenarios-h">` |
| 6 | Recommended Products | `<section class="product-related" aria-labelledby="products-h">` | `<h2 id="products-h">` |
| 7 | Benefits | `<section class="benefit-grid" aria-labelledby="benefits-h">` | `<h2 id="benefits-h">` |
| 8 | How It Connects | `<section class="topology-diagram" aria-labelledby="topology-h">` | `<h2 id="topology-h">` |
| 9 | Final CTA | `<section class="solution-final-cta" aria-labelledby="cta-h">` | `<h2 id="cta-h">` |

**Rationale**: Predictable for screen readers (every section is a labelled landmark). One `<h1>` per page enforced by the Content Rules gate.

---

## D-14 — Naming, slugging, file conventions

**Decision**:
- Solution slugs are lowercase, hyphenated, prefixed with `solution-` for the file name: `pages/solution-smart-villa.html`, `pages/solution-smart-apartment.html`, etc. The `data-category` slug uses bare category names (`residential`, `hospitality`, …).
- Solution IDs on the overview page: each card has `id="<solution-slug>"` (e.g., `id="smart-villa"`), so deep links like `pages/solutions.html#smart-villa` scroll to that card AND pre-activate the matching category tab.
- Image filenames: `assets/images/solutions/<solution-slug>.svg` (e.g., `smart-villa.svg`).
- Detail page CTAs to overview anchors: `pages/solutions.html#<solution-slug>` (matches the mega-menu hash shape).

**Rationale**: Consistent slug → file mapping. Phase 01 mega-menu already uses these slugs, so the deep links work without any header changes.

---

## D-15 — Category taxonomy (canonical)

**Decision**: Five canonical category slugs, exhaustive:

| Slug | Display name | Solutions in this category |
|---|---|---|
| `residential` | Residential | Smart Villa, Smart Apartment |
| `hospitality` | Hospitality | Smart Hotel |
| `commercial` | Commercial | Smart Office, Smart Retail (optional) |
| `real-estate` | Real Estate | Smart Compound |
| `lifestyle` | Lifestyle | Gaming Room, Elderly Care (optional, dual-tagged with `residential`) |

A solution may carry multiple slugs (space-separated) per D-01 if it spans categories. The "All" tab is the default and always present.

**Rationale**: This taxonomy maps cleanly to buyer-persona segments (homeowners → Residential; hotel groups → Hospitality; office managers → Commercial; developers → Real Estate; specialised use cases → Lifestyle).

**Alternatives considered**:
- *Drop "Lifestyle" and put Gaming Room under "Residential"* — rejected; Gaming Room is a use-case category (around an activity), not a building-type category, and pairing it with Smart Villa under "Residential" confuses both audiences.
- *Add a "Wellness" category for Elderly Care* — rejected; "Lifestyle" already covers it with less category-page sprawl. Phase 04 may revisit if a wellness sub-line ships.

---

## Summary

| ID | Decision | Resolves |
|---|---|---|
| D-01 | `data-category` with space-separated tokens for multi-category cards | content-in-HTML, multi-category support |
| D-02 | Single `applyFilters()` function ported from Phase 02 | filter algorithm |
| D-03 | Hash supports both category and solution slugs (with solution → category promotion) | mega-menu deep-link reuse |
| D-04 | Nine-section detail-page template; reuse Phase 02 components where possible | page structure |
| D-05 | Inline SVG topology diagram, per-page authored | How-It-Connects rendering |
| D-06 | Reuse Phase 02 components byte-identically for filter pills, card-product, scenarios, products grid | CSS budget |
| D-07 | All quote CTAs → `../index.html#get-quote`; specialist → `./contact.html` | CTA target |
| D-08 | SVG placeholders for solution heroes under `assets/images/solutions/` | asset strategy |
| D-09 | New component classes under `@layer components` with BEM-like naming | CSS scoping |
| D-10 | No new browser-feature baseline | feature support |
| D-11 | `role="toolbar"` + `aria-pressed` filter (port from Phase 02) | filter a11y |
| D-12 | Same Phase 02 perf budget; CSS cap relaxed to 64 KB | performance |
| D-13 | 9 sections per detail page, h2 per section, `aria-labelledby` | detail-page structure |
| D-14 | `solution-<slug>` filename convention; `id="<solution-slug>"` anchor convention | naming |
| D-15 | 5 canonical category slugs (residential, hospitality, commercial, real-estate, lifestyle) | taxonomy |

All decisions are implementation-ready. No outstanding `NEEDS CLARIFICATION`.
