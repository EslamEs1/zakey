# Quickstart — Zakey Phase 03

**Feature**: Solutions Overview & Solution Detail Pages
**Branch**: `003-solutions-pages`
**Date**: 2026-05-14

This is the on-ramp for anyone implementing or extending Phase 03. It assumes Phase 01 (`001-shell-and-homepage`) and Phase 02 (`002-products-catalog`) are already complete and the Phase 01 toolchain (`npm install`, Tailwind CLI, the three bash integrity gates) is operational.

---

## 1. Get the repo running

From a working tree on this branch:

```bash
git checkout 003-solutions-pages
npm install            # idempotent; already done in Phase 01
npm run build:css      # rebuilds css/styles.css from src/input.css
```

To author with live CSS rebuild:

```bash
npm run watch:css
```

The site is fully static. Open any `.html` file directly in a browser (`file://…`) or serve the repo root with any static server (`npx http-server .`, `python3 -m http.server`, etc.).

---

## 2. Where Phase 03 work lands

| What | Where |
|---|---|
| Overview page (rewritten) | `pages/solutions.html` |
| Detail pages (new, 6 required) | `pages/solution-smart-villa.html`, `pages/solution-smart-apartment.html`, `pages/solution-smart-hotel.html`, `pages/solution-smart-office.html`, `pages/solution-smart-compound.html`, `pages/solution-gaming-room.html` |
| Optional detail pages | `pages/solution-elderly-care.html`, `pages/solution-smart-retail.html` |
| New CSS components | `src/input.css` — append under `@layer components` |
| New JS module | `js/solutions.js` (filter only) |
| JS loader patch | `js/main.js` — add one conditional `import()` |
| New images (SVG placeholders) | `assets/images/solutions/<slug>.svg` |
| Homepage CTAs patched | `index.html` — four solutions-preview cards point to detail pages |

Files **not** touched in Phase 03 (regression risk):

- Phase 01 pages (`pages/about.html`, `pages/blog.html`, `pages/contact.html`, `pages/partners.html`, `pages/privacy.html`, `pages/projects.html`, `pages/software.html`, `pages/technology.html`, `pages/terms.html`).
- Phase 02 pages (`pages/products.html` and the four `pages/product-zakey-*.html` flagships).
- Header & footer shells — byte-for-byte unchanged (any change must propagate to all pages and pass `scripts/check-shell-consistency.sh`).

---

## 3. Authoring a new solution card

Add an `<article>` inside `#solutions-grid` on `pages/solutions.html`:

```html
<article class="solution-card" id="smart-villa"
         data-solution
         data-category="residential">
  <div class="solution-card__visual">
    <img src="../assets/images/solutions/smart-villa.svg"
         alt="Zakey smart villa: luxury living room with Aura Panel and ambient lighting"
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

Checklist:
- [ ] `id="<slug>"` matches the detail-page filename suffix (`smart-villa` ↔ `solution-smart-villa.html`).
- [ ] `data-category` is one of the 5 canonical category slugs (or 2 space-separated slugs for cross-category solutions).
- [ ] Image file exists under `assets/images/solutions/`.
- [ ] Exactly 4 benefit chips.
- [ ] CTA href points to `./solution-<slug>.html`.
- [ ] No lorem ipsum.

---

## 4. Authoring a new solution detail page

Use one of the six required pages as a template. All nine sections are required and MUST appear in this order:

1. Hero (with `<h1>`, eyebrow, tagline, lead, 2 CTAs, lifestyle image)
2. Problem (3–5 pain points)
3. Zakey Solution (2–3 narrative paragraphs, naming ≥ 3 subsystems)
4. Included Systems (≥ 6 subsystem cards)
5. Automation Scenarios (≥ 3 When/Then cards — reuses Phase 02 `.product-scenarios`)
6. Recommended Products (3–4 cards — reuses Phase 02 `.card-product`)
7. Benefits (6 chip-style cards)
8. How It Connects (one inline SVG topology diagram with `<title>`)
9. Final CTA (h2 "Plan Your Zakey Smart Project", 2 CTAs)

Set `<body data-page="solution-detail">`.

The `<section class="topology-diagram">` MUST contain an inline `<svg>` with a `<title>` element — see `contracts/topology-diagram.contract.md` for the node-and-edge convention.

---

## 5. JS module loading pattern

`js/main.js` already loads Phase 01 and Phase 02 modules. Add the Phase 03 module conditionally:

```js
// After Phase 02's catalog import …

if (document.getElementById('solutions-grid')) {
  import('./solutions.js').then(m => m.initFilter());
}
```

This keeps `js/solutions.js` out of every other page's network waterfall. Detail pages do not need their own JS module in Phase 03 (no galleries, no filters).

---

## 6. Integrity gates (Phase 01 — still apply, now include Phase 03 files)

All three must exit 0 before a Phase 03 task is considered done:

```bash
npm run check         # runs all three in sequence
# or individually:
bash scripts/check-shell-consistency.sh   # Gate 1: header/footer identical across all pages
bash scripts/check-content-rules.sh       # Gate 2: forbidden strings, single <h1>, valid title+meta
bash scripts/check-links.sh               # Gate 3: every href/src resolves
```

Phase 03 adds **7–9 new pages** to the gate sweep (1 overview rewrite + 6 required + 2 optional detail pages). Gate 1 will fail if your new pages' header/footer drift from Phase 01's reference (`index.html`). To keep them aligned: copy the exact `<!-- header:start -->` … `<!-- header:end -->` block from `pages/about.html` (any Phase 01 page works) and paste it into the new file.

---

## 7. Manual interaction probes

Run these mental tests at desktop and at 360 / 480 / 768 / 1024 / 1280 / 1440 px:

### On `pages/solutions.html`

- [ ] ≥ 6 solution cards visible by default; full grid scrolls smoothly.
- [ ] Click each of the 5 category pills in turn → grid filters; pill gets `aria-pressed="true"`; live count updates; no console error.
- [ ] Click "All" → full grid returns.
- [ ] Visit `pages/solutions.html#hospitality` (fresh load) → Hospitality pill active on first paint.
- [ ] Visit `pages/solutions.html#smart-hotel` (fresh load) → Hospitality pill active AND the Smart Hotel card scrolls into view.
- [ ] Visit `pages/solutions.html#unknown` → All pill stays active; no console error.
- [ ] Tab through the toolbar → focus ring on each pill; Enter activates.
- [ ] Click any card's "Discover this solution" → navigates correctly.

### On every detail page

- [ ] Hero shows above the fold on desktop; lifestyle image is sharp.
- [ ] Nine sections appear in order with no empty cards / placeholders / TBDs.
- [ ] Single `<h1>` (the solution title); 8 `<h2>` elements for the subsequent sections.
- [ ] Problem section has 3–5 pain points; each pain point is space-specific.
- [ ] Included Systems grid has ≥ 6 cards; each card's description is tailored.
- [ ] Automation Scenarios has ≥ 3 cards; copy is distinct from other detail pages.
- [ ] Recommended Products has 3–4 cards; every `View Details` link resolves.
- [ ] Benefits has 6 cards.
- [ ] How It Connects section: SVG renders inline; `<title>` reads naturally on a screen reader.
- [ ] Final CTA: "Get a Quote" → `../index.html#get-quote`; "Talk to a Specialist" → `./contact.html`.
- [ ] No console errors during the full pass.

### Cross-page

- [ ] From the homepage's "Solutions" preview, clicking each preview card navigates to the matching `pages/solution-<slug>.html`.
- [ ] Header mega-menu's "Solutions" cells (Smart Villa / Smart Apartment / Smart Hotel / Smart Office / Smart Compound / Gaming Room) navigate to `pages/solutions.html#<slug>` and pre-activate the matching tab.

---

## 8. Definition of done for Phase 03

Before declaring Phase 03 complete:

- [ ] `npm run build:css` exits 0; `css/styles.css` ≤ 64 KB; committed.
- [ ] `npm run check` exits 0 (all three gates green).
- [ ] `pages/solutions.html` renders ≥ 6 solution cards as static HTML, no JS injection, no empty cards.
- [ ] All 5 category filter pills work; "All" works; empty-state never appears for the canonical set (every category has ≥ 1 card).
- [ ] All 6 required detail pages ship with all 9 sections populated.
- [ ] `pages/solutions.html#<category-slug>` pre-activates the matching pill on load.
- [ ] `pages/solutions.html#<solution-slug>` pre-activates the matching category pill on load AND scrolls to the card.
- [ ] Every "Get a Quote" CTA on Phase 03 pages routes to `index.html#get-quote`; every "Talk to a Specialist" CTA routes to `contact.html`.
- [ ] Every "Explore Products" CTA routes to `products.html`.
- [ ] Skip link works on every Phase 03 page.
- [ ] No console errors during the full interaction pass.
- [ ] No regression on Phase 01 or Phase 02: every previously-passing page still passes all three gates.
- [ ] Visual pass complete at 360 / 480 / 768 / 1024 / 1280 / 1440 px.
- [ ] Constitution v1.0.0 — all seven principles still verified.
- [ ] Optional pages (Elderly Care, Smart Retail): if shipped, fully populated and added to the overview grid; if not shipped, no card / link references them anywhere.
