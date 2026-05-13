---
description: "Task list for Zakey Phase 02 — Product Catalog & Product Detail Pages"
---

# Tasks: Zakey Phase 02 — Product Catalog & Product Detail Pages

**Input**: Design documents from `/specs/002-products-catalog/`
**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/`, `quickstart.md`

**Tests**: NOT included. The feature specification does not request unit/integration tests; verification is via the three bash integrity gates (`scripts/check-*.sh`) plus manual viewport passes documented in `quickstart.md` § 7. Browser test framework is explicitly out of scope (carried forward from Phase 01).

**Organization**: Tasks are grouped by user story per the spec's priorities (US1/US2 are P1, US3 is P2, US4 is P3). Setup and Foundational phases produce the shared scaffold every user story consumes.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no incomplete dependencies)
- **[Story]**: Maps task to user story (US1/US2/US3/US4)
- All file paths are repo-root-relative.

## Path Conventions

Flat static-site layout at the repo root, extended (not restructured) from Phase 01: `index.html`, `pages/`, `src/`, `css/`, `js/`, `assets/`, `scripts/`. See `plan.md` § Project Structure.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Verify the Phase 01 toolchain still works against Phase 02 files, scaffold the new JS module stubs, and confirm asset directories exist. No HTML content authored yet.

- [x] T001 Verify Phase 01 toolchain still operates: `npm install` exits 0; `npm run build:css` rebuilds `css/styles.css` from `src/input.css` without warnings; `npm run check` exits 0 against the existing Phase 01 file set.
- [x] T002 [P] Create empty stub `js/products.js` exporting `export function initCatalog() { /* TODO Phase 3 */ }`. File must be ES-module-shaped; no other code yet.
- [x] T003 [P] Create empty stub `js/product-detail.js` exporting `export function initGallery() { /* TODO Phase 6 */ }`.
- [x] T004 [P] Confirm `assets/images/products/` directory exists (it does from Phase 01); list current product SVG inventory and note which slugs already have assets vs. which need new placeholders in Foundational.
- [x] T005 [P] Confirm `assets/images/lifestyle/` directory exists; list current lifestyle SVG inventory and note which detail-page overview visuals need new placeholders.

**Checkpoint**: Toolchain green, JS module stubs in place, asset inventory complete.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Author every shared CSS component, every new image placeholder, and the JS loader wiring before any user-story-specific page work begins. Every user story downstream depends on this.

**⚠️ CRITICAL**: No user-story work begins until this phase completes.

### Design system extensions (CSS)

- [x] T010 Append the **catalog-page component family** to `src/input.css` under `@layer components` per `contracts/catalog-page.contract.md`: `.catalog-hero`, `.catalog-hero__inner`, `.catalog-hero__content`, `.catalog-hero__visual`, `.catalog-hero__ctas`, `.catalog-toolbar`, `.catalog-toolbar__inner`, `.catalog-toolbar__filters`, `.catalog-status`, `.product-grid-section`, `.product-grid`, `.product-grid-section h2.sr-only`. Use existing Phase-01 design tokens (no new colours, no new spacing values).
- [x] T011 Append the **filter-pill component** to `src/input.css` per `contracts/filter-pill.contract.md`: `.filter-pill` with default / hover / `[aria-pressed="true"]` / `:focus-visible` states; uses `var(--color-accent)`, `var(--color-bg-elevated)`, `var(--color-text-muted)` tokens.
- [x] T012 Append the **search and empty-state components** to `src/input.css` per `contracts/product-search.contract.md`: `.catalog-search`, `.catalog-search__icon`, `.catalog-search input[type="search"]`, `.catalog-empty`, `.catalog-empty__icon`, `.catalog-empty__title`, `.catalog-empty__desc`. Also add the utility `.is-hidden { display: none !important; }` under `@layer utilities`.
- [x] T013 Append the **card-product extension hooks** to `src/input.css`: confirm `.card-product`, `.card-product__visual`, `.card-product__body`, `.card-product__category`, `.card-product__name`, `.card-product__desc`, `.card-product__tags`, `.card-product__tag`, `.card-product__ctas`, `.card-product__cta--details`, `.card-product__cta--quote` either already exist (from Phase 01) or are added here. Add missing pieces only. The hover state (`translateY(-4px)` + accent border + elevated shadow) must be CSS-only.
- [x] T014 Append the **product-detail component family** to `src/input.css` per `contracts/product-detail-page.contract.md` and `contracts/gallery-thumbnails.contract.md`: `.product-hero`, `.product-hero__inner`, `.product-hero__gallery`, `.product-hero__main`, `.product-hero__thumbs`, `.product-hero__thumbs [role="tab"]` (with default / hover / `[aria-selected="true"]` / `:focus-visible` states), `.product-hero__content`, `.product-hero__category`, `.product-hero__name`, `.product-hero__tagline`, `.product-hero__lead`, `.product-hero__ctas`.
- [x] T015 Append the **product-detail section components** to `src/input.css`: `.product-overview`, `.product-overview__grid`, `.product-overview__copy`, `.product-overview__visual`, `.product-features`, `.product-features__grid`, `.product-features__card`, `.product-features__icon`, `.product-features__title`, `.product-features__desc`, `.product-scenarios`, `.product-scenarios__list`, `.product-scenarios__item`, `.product-scenarios__context`, `.product-scenarios__trigger`, `.product-scenarios__action`, `.product-specs`, `.product-specs__list`, `.product-specs__row`, `.product-specs__row dt`, `.product-specs__row dd`, `.product-compat`, `.product-compat__grid`, `.product-compat__chip`, `.product-compat__label`, `.product-compat__context`, `.product-related`, `.product-related__grid`, `.product-final-cta`.
- [x] T016 Run `npm run build:css` and confirm `css/styles.css` is regenerated, file size stays ≤ 60 KB, and no Tailwind compilation warnings appear.
- [x] T017 Audit the appended CSS for hard-coded literals: `grep -nE "#[0-9a-fA-F]{3,8}" src/input.css | grep -v -- "--color-"` MUST return zero results outside the `:root` block; same for `rgb(`/`rgba(` literals outside `:root`. Promote any leaked colour into the existing `:root` channel-token system from Phase 01.

### Image placeholders (SVG)

- [x] T020 [P] Create `assets/images/products/zakey-catalog-hero.svg` — composed catalog hero visual (1200×900 viewBox; brand gradient + abstract device arrangement; same convention as Phase 01 placeholders).
- [x] T021 [P] Create the missing product SVG placeholders under `assets/images/products/` for every product in `data-model.md` that lacks an asset (Phase 01 already ships eight: aura-panel, secure-kit, smart-switch-series, climate-hub, motion-sensor, door-shield, lighting-controller, curtain-driver). Phase 02 adds at least: `zakey-aura-panel-pro.svg`, `zakey-core-hub.svg`, `zakey-mini-hub.svg`, `zakey-edge-switch.svg`, `zakey-touch-switch-pro.svg`, `zakey-dimmer-switch.svg`, `zakey-scene-button.svg`, `zakey-smart-door-lock.svg`, `zakey-indoor-camera.svg`, `zakey-outdoor-camera.svg`, `zakey-door-window-sensor.svg`, `zakey-smoke-detector.svg`, `zakey-water-leak-sensor.svg`, `zakey-led-dimmer.svg`, `zakey-ambient-strip-controller.svg`, `zakey-blind-controller.svg`, `zakey-silent-track.svg`, `zakey-smart-thermostat.svg`, `zakey-ac-gateway.svg`, `zakey-smart-plug.svg`, `zakey-energy-meter.svg`, `zakey-power-module.svg`, `zakey-ir-remote-hub.svg`, `zakey-scene-remote.svg`, `zakey-mount-kit.svg`, `zakey-bracket-set.svg`. Each is 480×360 viewBox, brand gradient + minimal device silhouette, file size ≤ 4 KB. Aim for 32 total products.
- [x] T022 [P] Create flagship-page gallery secondary visuals under `assets/images/products/`: `zakey-aura-panel-angle.svg`, `zakey-aura-panel-detail.svg`, `zakey-secure-kit-angle.svg`, `zakey-secure-kit-detail.svg`, `zakey-smart-switch-series-angle.svg`, `zakey-smart-switch-series-detail.svg`, `zakey-climate-hub-angle.svg`, `zakey-climate-hub-detail.svg`. Each shows a distinct angle / detail-crop of the parent product visual.
- [x] T023 [P] Create flagship-page lifestyle/overview visuals under `assets/images/lifestyle/`: `zakey-aura-living.svg`, `zakey-secure-entrance.svg`, `zakey-switch-bedroom.svg`, `zakey-climate-office.svg`. Each 1200×900 viewBox; depicts the product in context.

### JS loader wiring

- [x] T030 Update `js/main.js` to conditionally import `./products.js` and `./product-detail.js`: after the existing Phase 01 imports/wiring, add the two conditional `import().then(...)` blocks per `contracts/catalog-page.contract.md` § Behaviour step 1 and `contracts/gallery-thumbnails.contract.md` § JS module entry. Use `document.getElementById('product-grid')` for the catalog and `document.body.dataset.page === 'product-detail'` for the detail pages.

**Checkpoint**: CSS rebuilt; all required image placeholders exist; JS loader knows about both new modules (but the modules themselves are still stubs). At this point a user-story phase can start.

---

## Phase 3: User Story 1 — Visitor scans the full Zakey range by category (Priority: P1) 🎯 MVP

**Goal**: Deliver the catalog page (`pages/products.html`) with hero, category filter pills, ≥ 24 product cards as static HTML, working category filtering, live count, deep-link hash pre-activation, and footer CTA band. This is the MVP cut for Phase 02.

**Independent Test**: Open `pages/products.html` directly in a browser. ≥ 24 product cards visible by default. Click each of the 10 category pills in turn — grid filters; `aria-pressed="true"` moves; live count updates. Click "All" — full grid returns. Visit `pages/products.html#security` — Security pill is active on first paint. No console errors. All three integrity gates exit 0.

### Implementation for User Story 1

- [x] T040 [US1] **Rewrite** `pages/products.html` with the eight-step page structure from `contracts/catalog-page.contract.md`: `<head>` with title / meta description / OG tags / favicon / preload / stylesheet; `<body data-page="products">`; skip-link; the **Phase 01 header shell pasted byte-identical** (copy from `pages/about.html` to guarantee path consistency); `<main id="main">` containing (1) `.catalog-hero` with `<h1>Zakey Smart Products</h1>`, positioning copy, two CTAs, and the `zakey-catalog-hero.svg` visual; (2) `.catalog-toolbar` with the 11-pill toolbar, search input wrapper, and `.catalog-status` line; (3) `.product-grid-section` with `#product-grid` (empty for now — cards land in T041); (4) `.catalog-final-cta` band with two CTAs; the **Phase 01 footer shell pasted byte-identical**; the `<script type="module" src="../js/main.js" defer>` tag. Page must exist with ZERO product cards yet and still pass the content-rules gate (single `<h1>`, non-empty `<title>`, non-empty meta description, no forbidden strings).
- [x] T041 [US1] Author all **product cards** as static HTML inside `#product-grid` per `contracts/product-card.contract.md`. At least 32 cards (every product slug listed in T021 + the eight Phase 01 products). Each card MUST have: `id="product-<slug>"`, `data-product`, `data-category="<slug>"`, `data-tags="…"`, the `<img>` with descriptive `alt` and `loading="lazy" decoding="async"` (except the first 6 cards which omit `loading="lazy"` so they paint eagerly), category eyebrow, `<h3>` name, 60–140 char description, exactly 3 visible tag chips, and both CTAs. The `View Details` link points to `./product-zakey-<slug>.html` for the four flagships (Aura Panel, Secure Kit, Smart Switch Series, Climate Hub) and to `#product-<slug>` for every other product per spec FR-062. The `Request Quote` link always points to `../index.html#get-quote`.
- [x] T042 [US1] Author the **empty-state block** as the last child of `#product-grid` per `contracts/product-search.contract.md` § Markup shape: `<div class="catalog-empty" hidden>` with icon, `<h3>`, copy, and the `<button data-clear-search>` (button is keyboard-reachable when revealed; remains in DOM with `hidden` attribute).
- [x] T043 [US1] Implement `js/products.js` `initCatalog()` per `contracts/catalog-page.contract.md` § Behaviour and `research.md` § D-02. Function MUST: (a) query the filter toolbar, the search input, the `[data-product]` cards, the empty-state, the count spans; (b) bind a click delegate on the filter toolbar that updates `aria-pressed` on the clicked pill (and clears it on the previously active one) then calls `applyFilters()`; (c) on load, read `window.location.hash` and pre-activate the matching pill if the hash matches a known category slug; (d) define `applyFilters()` that walks every `[data-product]`, toggles `.is-hidden` based on active-category match, updates `[data-visible-count]`, and toggles the empty-state `hidden` attribute. Search wiring lands in US3 — leave the search-related branch as a no-op for now (or skip it if search input is absent).
- [x] T044 [US1] Update the **homepage mega-menu Products section** (`index.html` only — pages/*.html headers are byte-identical) is already pointing to `pages/products.html#<category>` from Phase 01; verify on load that visiting `pages/products.html#security` (etc.) activates the matching pill via T043's hash logic. No HTML change expected here; the task is to **manually verify** the round-trip works for all 10 category slugs.
- [x] T045 [US1] Run `scripts/check-shell-consistency.sh`: confirm `pages/products.html`'s header and footer hash identically to the Phase 01 reference (`index.html`). Fix any path-prefix drift by copying header/footer blocks from a known-good `pages/*.html`.
- [x] T046 [US1] Run `scripts/check-content-rules.sh` and `scripts/check-links.sh`: zero forbidden strings, exactly one `<h1>`, non-empty title + meta description, every `href` / `src` resolves.
- [x] T047 [US1] Manual interaction QA per `quickstart.md` § 7 "On `pages/products.html`" (steps 1–6 only — steps 7–8 belong to US3 search): full grid loads, each pill filters, "All" returns, hash deep-link works, no console errors at desktop and at 360 px.

**Checkpoint**: Catalog page renders 32 product cards as static HTML, all 10 category pills work, hash deep-link works. MVP can ship — visitors can browse the full Zakey product range. US3 search and US2 detail pages are still TODO.

---

## Phase 4: User Story 2 — Visitor opens a product detail page and requests a quote (Priority: P1)

**Goal**: Ship four flagship product detail pages (Aura Panel, Secure Kit, Smart Switch Series, Climate Hub) with all 8 required sections fully populated. Every "Request a Quote" CTA routes to the Phase 01 quote form; every "Talk to a Specialist" CTA routes to `pages/contact.html`.

**Independent Test**: From `pages/products.html`, click "View Details" on each of the four flagship cards. Each lands on its detail page. Every page shows the eight sections in order (Hero → Overview → Key Features → Smart Scenarios → Tech Specs → Compatibility → Related Products → Final CTA) with no empty cards, no TBDs. Click "Request a Quote" — lands at `../index.html#get-quote`. Click "Download Specs" — scrolls to the Tech Specs section. No console errors.

### Implementation for User Story 2

- [x] T050 [US2] Create `pages/product-zakey-aura-panel.html` per `contracts/product-detail-page.contract.md`. `<head>` with product-specific `<title>` ("Zakey Aura Panel — Premium Wall-Mounted Control Panel"), meta description, OG tags, favicon, preload of the hero image, stylesheet. `<body data-page="product-detail">`. Skip link. Phase 01 header shell (byte-identical). `<main id="main">` containing all 8 sections per the contract. The hero gallery thumbs land in US4 (T080); for now the hero has only `#product-main-image` (no thumb strip). The 7 spec rows MUST be populated with realistic values from `data-model.md` § Specification example (AC 100-240 V, Wi-Fi 5 + Zigbee 3.0 + BLE 5.0 + Matter-ready, etc.). 5 Compatibility chips in canonical order. 3 Related Products cards: Smart Switch Series, Climate Hub, Secure Kit (reused `.card-product` markup with `id="related-product-<slug>"`). Final CTA band with both CTAs. Phase 01 footer shell. Closing `<script type="module" src="../js/main.js" defer>`.
- [x] T051 [US2] Create `pages/product-zakey-secure-kit.html` with the same eight-section structure as T050, content tailored to the Secure Kit: indoor/outdoor camera bundle + door sensor + motion sensor + central panel. Spec rows reflect security-specific values (Power: 12 V DC adapter or PoE; Connectivity: Wi-Fi 5 + Zigbee 3.0 + Bluetooth LE; Compatibility: Zakey Mesh Bridge, Sense Engine; Installation: surface-mount + wall-mount; Material: aluminium + tempered glass; Dimensions kit total; Supported spaces: villas, hotels, offices, gated compounds). 4 key features (e.g., 24/7 perimeter watch, encrypted local recording, presence-aware arming, IFTTT-style scene triggers). 3 smart scenarios. 5 compat chips. 3 Related: Smart Door Lock, Outdoor Camera, Aura Panel.
- [x] T052 [US2] Create `pages/product-zakey-smart-switch.html` (file name `product-zakey-smart-switch.html` matches the spec brief; the slug for the data-model is `smart-switch-series` and used in IDs / detail page filenames; pick the simpler filename to match the user-provided spec). Tailored content for the Smart Switch Series: backlit capacitive switch line. Spec rows reflect switch-specific values (in-wall, AC 110/220 V, gang-options 1/2/3, dimming yes, scene triggers on multi-tap). 4 key features. 3 smart scenarios. 5 compat chips. 3 Related: Aura Panel, Dimmer Switch, Scene Button.
- [x] T053 [US2] Create `pages/product-zakey-climate-hub.html`. Tailored content for the Climate Hub: HVAC controller + air-quality sensor + humidity + thermostat-bridge. Spec rows (Power 24 V AC from HVAC transformer; Connectivity Wi-Fi + Zigbee + Modbus RTU + KNX; Compatibility: Aura Panel, Sense Engine, Daikin/Mitsubishi/Samsung HVAC; Installation: wall-mount or in-cabinet; Material: aluminium + polycarbonate; Dimensions; Supported spaces: villas, hotels, offices, gaming rooms). 4 features. 3 scenarios. 5 compat. 3 Related: Aura Panel, Smart Thermostat, AC Gateway.
- [x] T054 [US2] Update the **homepage** `index.html` — find the four "Featured Products" preview cards / signature-product slider cards whose products now have flagship detail pages and update their `View Details` `href` from the placeholder (`#` or anchor) to the real detail page path (`./pages/product-zakey-<slug>.html`). DO NOT modify any other Phase 01 markup. Spec reference: spec.md FR-062.
- [x] T055 [US2] Run `scripts/check-shell-consistency.sh`: confirm all four new detail pages' header + footer blocks hash identically to the Phase 01 reference. Fix any divergence by copying blocks from a Phase 01 page.
- [x] T056 [US2] Run `scripts/check-content-rules.sh`: each detail page MUST have exactly one `<h1>` (the product name), a non-empty `<title>` (product-specific), a non-empty meta description (product-specific), and zero forbidden strings.
- [x] T057 [US2] Run `scripts/check-links.sh`: every `href` and `src` on all four detail pages resolves to a real file. Particular focus: every "Request a Quote" → `../index.html#get-quote`; every "Download Specs" → `#tech-specs`; every "Talk to a Specialist" → `./contact.html`; every Related Products `View Details` → existing page or catalog anchor.
- [x] T058 [US2] Manual interaction QA per `quickstart.md` § 7 "On every flagship detail page": each page renders in correct order; hero shows above fold; specifications populated; compatibility chips in canonical order; CTAs route correctly; no console errors at desktop and at 360 px.

**Checkpoint**: Four flagship detail pages render fully, all CTAs resolve, all three gates exit 0. Catalog → Detail → Quote conversion path is end-to-end working.

---

## Phase 5: User Story 3 — Visitor narrows products with a search keyword (Priority: P2)

**Goal**: Wire the catalog search input + live count + empty-state. Search filters cards case-insensitively across name, description, and tags. Combines with the category filter via intersection.

**Independent Test**: Type "camera" in the search input on `pages/products.html`. Only Security cards mentioning camera remain visible (Indoor Camera, Outdoor Camera). Clear the input — full grid returns. Type a random string ("xyz999") — empty-state appears. Click "Clear search" — full grid returns within the active category. Activate Security pill, type "lock" — only matching Security cards remain.

### Implementation for User Story 3

- [x] T060 [US3] Extend `js/products.js` `initCatalog()` to wire the search input. Add an `input` listener on `[data-product-search]` with **80 ms debounce** per `research.md` § D-02. The listener stores the normalised lowercase query (or empty string) and calls `applyFilters()`.
- [x] T061 [US3] Extend `applyFilters()` in `js/products.js` to compute `matchesQuery = !query || cardSearchable(card).includes(query)` and combine with `matchesCategory` via logical AND per `research.md` § D-02. Implement `cardSearchable(card)` that caches the joined lowercase `name + desc + tags` string on `card._searchable` (per data-model.md "Filtering & Search State" and research D-02).
- [x] T062 [US3] Implement empty-state visibility in `applyFilters()`: track `visibleCount` during the iteration; set `emptyState.hidden = visibleCount > 0`; update `[data-visible-count]` text and `[data-total-count]` text (the latter is set once at init from `cards.length`).
- [x] T063 [US3] Implement the **Clear search** action in `js/products.js`: bind a click listener on `[data-clear-search]` inside the empty-state that sets `searchInput.value = ''` and calls `applyFilters()`. The category filter is NOT cleared by this action per `contracts/product-search.contract.md` § Clear-search behaviour.
- [x] T064 [US3] Verify `aria-live="polite"` is on the `.catalog-status` paragraph in `pages/products.html` (added in T040) and confirm screen-reader announcement on visible-count changes. (Spot check by toggling the filter and the search.)
- [x] T065 [US3] Run all three integrity gates again: `scripts/check-shell-consistency.sh`, `scripts/check-content-rules.sh`, `scripts/check-links.sh` — all exit 0. No regressions from the JS-only changes (the JS file changes don't affect HTML shell/content gates, but re-run as a safety pass).
- [x] T066 [US3] Manual interaction QA per `quickstart.md` § 7 "On `pages/products.html`" steps 4–8: empty search-string state, multi-character substring, intersection with category, force-empty-state, native `<input type="search">` × clear control behaviour, "Clear search" button.

**Checkpoint**: Search complements the category filter; empty-state appears at zero matches; clear-search works. The catalog now meets all FR-007 through FR-011 acceptance criteria.

---

## Phase 6: User Story 4 — Visitor switches detail-page gallery thumbnails (Priority: P3)

**Goal**: Polish — add the gallery thumb strip to the four flagship detail-page heroes and wire the WAI-ARIA Tabs pattern (single-select, automatic-activation, roving tabindex) so clicking or arrow-key navigation swaps the main image.

**Independent Test**: On `pages/product-zakey-aura-panel.html`, click each thumb in turn — the main image swaps to the corresponding visual; `aria-selected="true"` follows the click; the previously active thumb becomes `aria-selected="false"` and `tabindex="-1"`. Press ArrowRight on the active thumb — active selection moves to the next thumb. Press ArrowLeft from the first thumb — wraps to the last. Tab into the strip — focus lands only on the active thumb; Tab again — focus leaves the strip. Disable JS — initial image still renders; thumbs are visually present but inert.

### Implementation for User Story 4

- [x] T070 [US4] Update `pages/product-zakey-aura-panel.html`'s hero to add the `.product-hero__thumbs` markup per `contracts/gallery-thumbnails.contract.md`. Three thumb buttons (`role="tab"`, `aria-selected`, `tabindex`, `data-thumb-src`, `data-thumb-alt`, `aria-label`), each containing a `<img alt="" loading="lazy" decoding="async">` referencing the respective `assets/images/products/zakey-aura-panel*.svg` files (front from T021/Phase 01, plus `-angle` and `-detail` from T022). Initial thumb (`aria-selected="true"`, `tabindex="0"`) matches `#product-main-image`'s initial `src`.
- [x] T071 [US4] Update `pages/product-zakey-secure-kit.html`'s hero with the same thumb strip pattern, using `zakey-secure-kit.svg`, `zakey-secure-kit-angle.svg`, `zakey-secure-kit-detail.svg`.
- [x] T072 [US4] Update `pages/product-zakey-smart-switch.html`'s hero with the thumb strip using `zakey-smart-switch-series.svg`, `zakey-smart-switch-series-angle.svg`, `zakey-smart-switch-series-detail.svg`.
- [x] T073 [US4] Update `pages/product-zakey-climate-hub.html`'s hero with the thumb strip using `zakey-climate-hub.svg`, `zakey-climate-hub-angle.svg`, `zakey-climate-hub-detail.svg`.
- [x] T074 [US4] Implement `js/product-detail.js` `initGallery()` per `contracts/gallery-thumbnails.contract.md` § JS module entry: query `[role="tablist"][aria-label="Product views"]`; return early if not found; bind a click delegate on the tablist that calls `activateThumb(clickedThumb)`; bind a `keydown` listener for `ArrowLeft` / `ArrowRight` / `Home` / `End` that moves active selection (with wrap) and calls `activateThumb(newThumb)`.
- [x] T075 [US4] Implement `activateThumb(thumb)` in `js/product-detail.js`: set the clicked thumb's `aria-selected="true"` and `tabindex="0"`; for every other thumb in the tablist, set `aria-selected="false"` and `tabindex="-1"`; read the clicked thumb's `data-thumb-src` and `data-thumb-alt` and assign them to `#product-main-image.src` and `.alt` respectively; move focus to the clicked thumb (so keyboard activation flow keeps focus visible).
- [x] T076 [US4] Run `scripts/check-shell-consistency.sh`, `scripts/check-content-rules.sh`, `scripts/check-links.sh` against the four updated detail pages — all exit 0. The new thumbnail markup must not break shell-consistency (the gallery lives inside `<main>`, far from the header/footer-marker regions).
- [x] T077 [US4] Manual interaction QA per `quickstart.md` § 7 "if gallery present" probes: click each thumb, arrow keys move active, Home/End jump to extremes, Tab leaves the strip, disabled-JS fallback works (initial image stays visible).

**Checkpoint**: All four flagship detail pages have working gallery thumbs. User Story 4 (P3 polish) complete.

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Performance audit, accessibility audit, constitution sweep, final visual sweep. No new features.

- [x] T080 [P] Performance audit on `pages/products.html`: measure HTML / CSS / JS / first-paint image weight; confirm total ≤ 1.5 MB per spec SC-001/SC-002 and `plan.md` § Performance Goals. Confirm the first 6 product cards omit `loading="lazy"` (eager) and cards 7+ include it. Confirm the hero image has `fetchpriority="high"`. Confirm `js/products.js` is loaded only on the catalog page via the conditional import in `main.js`. If page weight exceeds budget, reduce SVG inline detail or drop the catalog-hero visual to a slim version.
- [x] T081 [P] Performance audit on one flagship detail page (`pages/product-zakey-aura-panel.html`): same checklist. Hero image preloaded with `fetchpriority="high"`; lifestyle image lazy-loaded; thumbnail images lazy-loaded; `js/product-detail.js` loaded only when `body[data-page="product-detail"]`.
- [x] T082 Accessibility audit on `pages/products.html`: keyboard traversal works (skip link → header → filter toolbar → search → cards → footer); focus rings visible everywhere; `aria-pressed` toggles correctly across filter clicks; `aria-live="polite"` on the status line announces; empty-state heading is `<h3>`; "Clear search" button reachable when revealed; colour contrast: filter pill active (accent bg, ink text) ≥ 4.5:1, status line muted text ≥ 4.5:1.
- [x] T083 Accessibility audit on one flagship detail page: keyboard traversal (skip link → header → hero CTAs → gallery thumb (active only) → overview link if any → … → final CTA → footer); only the active thumb is in the Tab order; ArrowLeft / ArrowRight cycles with wrap; `aria-selected` on the active thumb is true; the main `<h1>` is the product name (only one per page).
- [x] T084 Run `npm run check`; all three gates exit 0 against the full file set (Phase 01 + Phase 02). Verify Phase 01 pages still pass (no regression).
- [x] T085 Constitution-compliance sweep against the full Phase-02 file set:
  - Principle I: no framework / CDN in `package.json` or any HTML page; only `tailwindcss@^3.4`, plugins, and PostCSS in `devDependencies`.
  - Principle II: `grep -rn "innerHTML\s*=" js/` shows zero primary-content injection (only the gallery `src`/`alt` swap and the `.is-hidden` class toggle).
  - Principle III: every product card and every detail-page section has a visual; visual language consistent across Phase 01 + Phase 02; no parallel design system introduced.
  - Principle IV: zero "lifesmart" / "ilifesmart" / "CoSS" / "AI Builder" / "Fusion Link" in any file across the repo.
  - Principle V: zero "lorem ipsum" anywhere; every product card has all required fields populated; every detail page has every spec row populated.
  - Principle VI: `npm run check` green; no console errors during the interaction QA passes; mobile / tablet / desktop visual passes complete.
  - Principle VII: 32 product cards in the catalog (no half-finished sections); 4 flagship detail pages fully populated; products without their own detail page link to catalog anchors (not to dead detail-page stubs).
- [x] T086 Final visual sweep at desktop (1440 px) and mobile (375 px) across `pages/products.html` + the four flagship detail pages; verify the `quickstart.md` § 8 "Definition of done for Phase 02" checklist.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1, T001–T005)**: No dependencies — starts immediately on this branch.
- **Foundational (Phase 2, T010–T030)**: Depends on Setup. **Blocks all user-story phases.**
- **US1 (Phase 3, T040–T047)**: Depends on Foundational. Delivers the MVP catalog page.
- **US2 (Phase 4, T050–T058)**: Depends on Foundational. Can proceed in parallel with US1 IF the catalog HTML scaffold is committed; otherwise sequentially.
- **US3 (Phase 5, T060–T066)**: Depends on US1 (extends `pages/products.html` and `js/products.js`).
- **US4 (Phase 6, T070–T077)**: Depends on US2 (extends the four flagship detail pages and adds `js/product-detail.js` logic). The four T07x detail-page updates each touch a separate file, so they can run in parallel (`[P]`).
- **Polish (Phase N, T080–T086)**: Depends on US1 + US2 + US3 + US4. Final acceptance pass.

### User Story Dependencies

- US1 (P1) — catalog filter MVP. Can ship alone as Phase 02 v0.5.
- US2 (P1) — detail pages. Depends on Foundational + the catalog cards (T041) being authored so Related Products references resolve. Can integrate with US1 but is independently testable: navigating to a detail page directly via URL works without the catalog being open.
- US3 (P2) — search. Depends on US1 (extends the same page and JS module).
- US4 (P3) — gallery polish. Depends on US2 (extends the four detail pages and the same JS module entry).

### Within Each User Story

- Models / content (HTML data) before behavior (JS).
- Card scaffolding (T040 page skeleton) before card population (T041).
- HTML before integrity gates.
- Integrity gates before manual QA.

### Parallel Opportunities

- **Setup**: T002, T003, T004, T005 all marked `[P]` — different files, no dependencies.
- **Foundational image generation**: T020, T021, T022, T023 all marked `[P]` — different image files.
- **Foundational CSS**: T010 → T011 → T012 → T013 → T014 → T015 → T016 → T017 are sequential (all touch `src/input.css` or its build output). They cannot run in parallel.
- **US2 detail pages**: T050, T051, T052, T053 each touch a separate `pages/product-zakey-<slug>.html` file — could run in parallel by different contributors after Foundational, though the markup is copy-paste-similar so a single author typically writes them in sequence to keep tone consistent.
- **US4 detail-page gallery markup**: T070, T071, T072, T073 each touch a separate detail page file — can run in parallel.
- **Polish performance audits**: T080 and T081 can run in parallel.

---

## Parallel Example: Phase 2 Foundational

```bash
# After T010–T017 complete (sequential, all on src/input.css), launch all four
# image-generation tasks in parallel — they touch different file groups:
Task: T020 — Catalog hero composed visual at assets/images/products/zakey-catalog-hero.svg
Task: T021 — 24+ new product SVG placeholders under assets/images/products/
Task: T022 — 8 flagship gallery secondary visuals (angle + detail) under assets/images/products/
Task: T023 — 4 flagship lifestyle visuals under assets/images/lifestyle/
```

## Parallel Example: User Story 2 (detail pages)

```bash
# After Foundational + US1 cards committed, launch detail-page authoring tasks
# in parallel — each touches its own file:
Task: T050 — pages/product-zakey-aura-panel.html
Task: T051 — pages/product-zakey-secure-kit.html
Task: T052 — pages/product-zakey-smart-switch.html
Task: T053 — pages/product-zakey-climate-hub.html
```

---

## Implementation Strategy

### MVP First (User Story 1 only)

1. Complete Phase 1 Setup (T001–T005).
2. Complete Phase 2 Foundational (T010–T030).
3. Complete Phase 3 US1 (T040–T047).
4. **STOP and VALIDATE**: visitor can browse the 32-product catalog, filter by 10 categories, deep-link via hash, navigate to non-flagship products via catalog anchor.
5. Phase 02 v0.5 ships — Phase 01 quote-form anchor still receives traffic from catalog "Request Quote" CTAs.

### Incremental delivery

1. Setup + Foundational → infra ready.
2. US1 (catalog with filter) → ship v0.5.
3. US2 (4 detail pages) → ship v0.6 — flagship products gain full storytelling.
4. US3 (search) → ship v0.7 — power users get search.
5. US4 (gallery polish) → ship v1.0 — every flagship has multi-view gallery.
6. Polish (Phase N) → final acceptance, performance budget, a11y audit, constitution sweep.

### Parallel team strategy

With multiple contributors:

1. One contributor completes Setup + Foundational (T001–T030).
2. After Foundational, parallel work:
   - Contributor A: US1 (catalog + filter logic).
   - Contributor B: US2 (four detail pages, in parallel within US2 too).
3. Once US1 ships, the same contributor can pick up US3 (small, ~6 tasks).
4. Once US2 ships, anyone can pick up US4 (gallery polish, ~8 tasks).
5. Polish (T080–T086) is a single-author final acceptance pass.

---

## Notes

- `[P]` tasks = different files, no incomplete dependencies.
- Every Phase-02 page MUST keep the Phase 01 header and footer shells byte-identical (gate 1 enforces).
- The eight Phase-01 product slugs that already have SVG placeholders (aura-panel, secure-kit, smart-switch-series, climate-hub, motion-sensor, door-shield, lighting-controller, curtain-driver) MUST be reused — do not recreate them.
- Every Request-Quote CTA in Phase 02 routes to `../index.html#get-quote`; every Talk-to-Specialist CTA routes to `./contact.html`. No new quote form is built.
- The "Download Specs" CTA on detail pages is an in-page anchor (`#tech-specs`); producing real PDFs is out of scope.
- **File-shared task warning**: tasks editing `src/input.css` (T010–T017) are serial with each other. Tasks editing `pages/products.html` (T040–T042) are serial. Tasks editing `js/products.js` (T043, T060–T063) are serial. Detail-page tasks T050–T053 and T070–T073 each touch a different file so they ARE parallelisable.
- Constitution v1.0.0 — all seven principles must still pass at end of Phase 02. The polish phase (T085) is the formal sweep.
