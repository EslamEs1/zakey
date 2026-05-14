---
description: "Task list for Zakey Phase 03 — Solutions Overview & Solution Detail Pages"
---

# Tasks: Zakey Phase 03 — Solutions Overview & Solution Detail Pages

**Input**: Design documents from `/specs/003-solutions-pages/`
**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/`, `quickstart.md`

**Tests**: NOT included. The feature specification does not request unit/integration tests; verification is via the three bash integrity gates (`scripts/check-*.sh`) plus manual viewport passes documented in `quickstart.md` § 7. Browser test framework is explicitly out of scope (carried forward from Phase 01 / Phase 02).

**Organization**: Tasks are grouped by user story per the spec's priorities (US1/US2 are P1, US3/US4 are P2, US5 is P3 / optional). Setup and Foundational phases produce the shared scaffold every user story consumes.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no incomplete dependencies)
- **[Story]**: Maps task to user story (US1/US2/US3/US4/US5)
- All file paths are repo-root-relative.

## Path Conventions

Flat static-site layout at the repo root, extended (not restructured) from Phase 01/02: `index.html`, `pages/`, `src/`, `css/`, `js/`, `assets/`, `scripts/`. See `plan.md` § Project Structure.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Verify the Phase 01/02 toolchain still works against Phase 03 files, scaffold the new JS module stub, and confirm the new asset directory is ready. No HTML content authored yet.

- [x] T001 Verify Phase 01 + Phase 02 toolchain still operates: `npm install` exits 0; `npm run build:css` rebuilds `css/styles.css` from `src/input.css` without warnings; `npm run check` exits 0 against the existing 16-page file set.
- [x] T002 [P] Create empty stub `js/solutions.js` exporting `export function initFilter() { /* TODO Phase 3 */ }`. File must be ES-module-shaped; no other code yet.
- [x] T003 [P] Confirm `assets/images/solutions/` directory exists (it does from Phase 01); list current solution SVG inventory and note which of the eight Phase 03 slugs already have assets vs. which need new placeholders in Foundational (Phase 01 ships `smart-villa.svg`; the other 7 are new).
- [x] T004 [P] Confirm `assets/images/lifestyle/` directory exists; identify which Phase 02 lifestyle visuals (`zakey-aura-living.svg`, `zakey-secure-entrance.svg`, `zakey-switch-bedroom.svg`, `zakey-climate-office.svg`) can be reused for the Phase 03 Zakey-Solution narrative sections.

**Checkpoint**: Toolchain green, JS module stub in place, asset inventory complete.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Author every shared CSS component, every new image placeholder, and the JS loader wiring before any user-story-specific page work begins. Every user story downstream depends on this.

**⚠️ CRITICAL**: No user-story work begins until this phase completes.

### Design system extensions (CSS)

- [x] T010 Append the **solution-hero + solution-grid + solution-card component family** to `src/input.css` under `@layer components` per `contracts/solutions-overview-page.contract.md` and `contracts/solution-card.contract.md`: `.solution-hero`, `.solution-hero__inner`, `.solution-hero__content`, `.solution-hero__sub`, `.solution-hero__ctas`, `.solution-hero__visual`, `.solution-grid`, `.solution-grid-section`, `.solution-card`, `.solution-card__visual`, `.solution-card__body`, `.solution-card__eyebrow`, `.solution-card__title`, `.solution-card__desc`, `.solution-card__for`, `.solution-card__benefits`, `.solution-card__benefit`, `.solution-card__cta`, `.solution-card:hover` states. Use only existing `:root` channel tokens — no new colors, no new spacing.
- [x] T011 Append the **detail-hero + problem-list + solution-narrative components** to `src/input.css` per `contracts/solution-detail-page.contract.md`: `.detail-hero`, `.detail-hero__inner`, `.detail-hero__content`, `.detail-hero__tagline`, `.detail-hero__lead`, `.detail-hero__ctas`, `.detail-hero__visual`, `.problem-list`, `.problem-list__items`, `.problem-list__item`, `.solution-narrative`, `.solution-narrative__inner`, `.solution-narrative__body`. Use Phase 01 spacing tokens (`--space-*`) and the Phase 02 `u-section` / `u-container` envelopes.
- [x] T012 Append the **subsystem-grid + subsystem-card components** to `src/input.css` per `contracts/solution-detail-page.contract.md` § 4: `.subsystem-grid`, `.subsystem-grid__list`, `.subsystem-card`, `.subsystem-card__icon`, `.subsystem-card__title`, `.subsystem-card__desc`. Base styles mirror Phase 02 `.product-features__card` exactly (same paddings, icon size, hover ramp) — copy the relevant block, rename, and trim duplicated declarations.
- [x] T013 Append the **benefit-grid + benefit-card components** to `src/input.css`: `.benefit-grid`, `.benefit-grid__list`, `.benefit-card`, `.benefit-card__icon`, `.benefit-card__title`, `.benefit-card__desc`. Lighter visual weight than subsystem-card (smaller icon, smaller text). Reuses the channel-token accent for the icon stroke.
- [x] T014 Append the **topology-diagram component family** to `src/input.css` per `contracts/topology-diagram.contract.md`: `.topology-diagram`, `.topology-diagram__figure`, `.topology-diagram__lead`, `.topology-diagram__svg` (with `width:100%; height:auto`), `.topology-node text` (with `user-select:none; pointer-events:none`). The actual SVG node styling is inline per page; this component family only sizes the wrapper.
- [x] T015 Append the **solution-final-cta component** to `src/input.css`: `.solution-final-cta`, `.solution-final-cta__heading`, `.solution-final-cta__lead`. Same shape as Phase 02 `.product-final-cta` — copy the block, rename, trim duplicates.
- [x] T016 Run `npm run build:css` and confirm `css/styles.css` is regenerated, file size stays ≤ 64 KB (Phase 03's relaxed cap per plan.md Complexity Tracking), and no Tailwind compilation warnings appear. If the file exceeds 64 KB, consolidate component blocks (merge shared declarations into combined selectors).
- [x] T017 Audit the appended CSS for hard-coded literals: `grep -nE "#[0-9a-fA-F]{3,8}" src/input.css | grep -v -- "--color-"` MUST return zero results outside the `:root` block; same for `rgb(`/`rgba(` literals outside `:root`. Promote any leaked colour into the existing `:root` channel-token system.

### Image placeholders (SVG)

- [x] T020 [P] Verify `assets/images/solutions/smart-villa.svg` exists (shipped in Phase 01). If absent, create it: 1200×900 viewBox, brand gradient + abstract luxury-villa scene silhouette + Zakey wordmark, file size ≤ 6 KB.
- [x] T021 [P] Create `assets/images/solutions/smart-apartment.svg`: 1200×900 viewBox; brand gradient + minimal apartment scene silhouette (compact living room with smart panel cue). File size ≤ 6 KB.
- [x] T022 [P] Create `assets/images/solutions/smart-hotel.svg`: 1200×900 viewBox; brand gradient + boutique-hotel suite scene (bed, window, ambient lighting). File size ≤ 6 KB.
- [x] T023 [P] Create `assets/images/solutions/smart-office.svg`: 1200×900 viewBox; brand gradient + modern office scene (desk, meeting-room cue, scene-control surface). File size ≤ 6 KB.
- [x] T024 [P] Create `assets/images/solutions/smart-compound.svg`: 1200×900 viewBox; brand gradient + multi-unit residential / gated-community scene (multiple building silhouettes with shared infrastructure cue). File size ≤ 6 KB.
- [x] T025 [P] Create `assets/images/solutions/gaming-room.svg`: 1200×900 viewBox; brand gradient + immersive gaming-room scene (ambient strip lighting, large display, scene-control). File size ≤ 6 KB.

### JS loader wiring

- [x] T030 Update `js/main.js` to conditionally import `./solutions.js`: after the existing Phase 02 imports, add the conditional `import().then(...)` block per `contracts/category-filter.contract.md` § JS module entry. Use `document.getElementById('solutions-grid')` as the gating selector.

**Checkpoint**: CSS rebuilt (≤ 64 KB); all 6 required solution placeholders exist; JS loader knows about the new module (but the module itself is still a stub). At this point user-story phases can start.

---

## Phase 3: User Story 1 — Visitor browses every Zakey solution by space and use case (Priority: P1) 🎯 MVP

**Goal**: Deliver the overview page (`pages/solutions.html`) with hero, category filter pills, ≥ 6 solution cards as static HTML, working category filtering, live count, hash deep-link pre-activation, and footer CTA band. This is the MVP cut for Phase 03.

**Independent Test**: Open `pages/solutions.html` directly in a browser. ≥ 6 solution cards visible by default. Click each of the 5 category pills in turn — grid filters; `aria-pressed="true"` moves; live count updates. Click "All" — full grid returns. Visit `pages/solutions.html#hospitality` — Hospitality pill active on first paint. Visit `pages/solutions.html#smart-villa` — Residential pill active AND Smart Villa card scrolls into view. All three integrity gates exit 0.

### Implementation for User Story 1

- [x] T040 [US1] **Rewrite** `pages/solutions.html` with the four-section page structure from `contracts/solutions-overview-page.contract.md`: `<head>` with title / meta description / OG tags / favicon / preload of `smart-villa.svg` / stylesheet; `<body data-page="solutions">`; skip-link; the **Phase 01 header shell pasted byte-identical** (copy from `pages/about.html` to guarantee path consistency); `<main id="main">` containing (1) `.solution-hero` with `<h1>Smart Solutions for Every Space</h1>`, positioning copy, two CTAs ("Plan Your Project" → `../index.html#get-quote`; "Browse Solutions" → `#solutions-grid`), and the hero visual; (2) `.catalog-toolbar` with the 6-pill toolbar (All + 5 categories) and `.catalog-status` line with `aria-live="polite"`; (3) `.solution-grid-section` with `#solutions-grid` (empty for now — cards land in T041); (4) `.solution-final-cta` band with two CTAs; the **Phase 01 footer shell pasted byte-identical**; the `<script type="module" src="../js/main.js" defer>` tag. Page must exist with ZERO solution cards yet and still pass the content-rules gate (single `<h1>`, non-empty `<title>`, non-empty meta description, no forbidden strings).
- [x] T041 [US1] Author all **6 required solution cards** as static HTML inside `#solutions-grid` per `contracts/solution-card.contract.md` and the Solution Roster in `data-model.md`. Each card MUST have: `id="<slug>"`, `data-solution`, `data-category="<slug>"`, the `<img>` with descriptive `alt` and `loading="lazy" decoding="async"` (except the first 4 cards which omit `loading="lazy"` so they paint eagerly), category eyebrow matching the primary category display name, `<h3>` title, one-sentence description (40–100 chars), `"For:" target-user line`, exactly 4 benefit chips, and a "Discover this solution →" CTA pointing to `./solution-<slug>.html`. Six cards in order: smart-villa (residential), smart-apartment (residential), smart-hotel (hospitality), smart-office (commercial), smart-compound (real-estate), gaming-room (lifestyle). All copy MUST be unique per card — no copy-paste between cards.
- [x] T042 [US1] Implement `js/solutions.js` `initFilter()` per `contracts/category-filter.contract.md` § Behaviour and `research.md` § D-02. Function MUST: (a) query `.catalog-toolbar__filters`, every `[data-solution]` card, both count spans; (b) bind a click delegate on the toolbar that updates `aria-pressed` on the clicked pill (and clears it on the previously-active one) then calls `applyFilters()`; (c) on load, read `window.location.hash` and resolve via the `solutionToCategory` promotion table (mapping each of the 6 solution slugs to its primary category slug), then pre-activate the matching pill; (d) define `applyFilters()` that walks every `[data-solution]`, splits `card.dataset.category` on whitespace, toggles `.is-hidden` based on `activeCat === 'all' || cardCats.includes(activeCat)`, updates `[data-visible-count]`, sets `[data-total-count]` once from `cards.length` on init.
- [x] T043 [US1] Verify the **homepage mega-menu Solutions section** (Phase 01) already deep-links to `pages/solutions.html#<slug>` for all 6 required solutions; manually load `pages/solutions.html#smart-villa`, `#smart-apartment`, `#smart-hotel`, `#smart-office`, `#smart-compound`, `#gaming-room` and confirm each pre-activates the correct category pill. No HTML change expected here; the task is to **manually verify** the round-trip works.
- [x] T044 [US1] Run `scripts/check-shell-consistency.sh`: confirm `pages/solutions.html`'s header and footer hash identically to the Phase 01 reference (`index.html`). Fix any path-prefix drift by copying header/footer blocks from a known-good `pages/*.html`.
- [x] T045 [US1] Run `scripts/check-content-rules.sh` and `scripts/check-links.sh`: zero forbidden strings, exactly one `<h1>`, non-empty title + meta description, every `href` / `src` resolves. Note: the 6 "Discover this solution" CTAs will fail Gate 3 until US2 ships the 6 detail pages — this is expected; defer the final Gate 3 confirmation until after T058.
- [x] T046 [US1] Manual interaction QA per `quickstart.md` § 7 "On `pages/solutions.html`": full grid loads, each pill filters, "All" returns, hash deep-link works for both category and solution slugs, no console errors at desktop and at 360 px.

**Checkpoint**: Overview page renders 6 solution cards as static HTML, all 5 category pills work, hash deep-link works (both `#hospitality` and `#smart-hotel` shapes). MVP page can ship — visitors can browse the full Zakey solution range. US2 detail pages are still TODO and will satisfy Gate 3.

---

## Phase 4: User Story 2 — Visitor opens a solution detail page and follows the funnel to a quote (Priority: P1)

**Goal**: Ship six required solution detail pages (Smart Villa, Smart Apartment, Smart Hotel, Smart Office, Smart Compound, Gaming Room) with all 9 required sections fully populated. Every "Get a Quote" CTA routes to `../index.html#get-quote`; every "Talk to a Specialist" CTA routes to `./contact.html`; every "Explore Products" CTA routes to `./products.html`; every Recommended-Products `View Details` resolves to a real Phase 02 page or catalog anchor.

**Independent Test**: From `pages/solutions.html`, click "Discover this solution" on each of the 6 solution cards. Each lands on its detail page. Every page shows the 9 sections in order (Hero → Problem → Zakey Solution → Included Systems → Automation Scenarios → Recommended Products → Benefits → How It Connects → Final CTA) with no empty cards, no TBDs. Click "Get a Quote" — lands at `../index.html#get-quote`. Click "Explore Products" — lands at `./products.html`. No console errors. Three integrity gates exit 0.

### Implementation for User Story 2

- [x] T050 [US2] Create `pages/solution-smart-villa.html` per `contracts/solution-detail-page.contract.md`. `<head>` with product-specific `<title>` ("Smart Villa — Luxury Whole-Home Automation by Zakey"), meta description, OG tags, favicon, preload of `smart-villa.svg`, stylesheet. `<body data-page="solution-detail">`. Skip link. Phase 01 header shell (byte-identical). `<main id="main">` containing all 9 sections per the contract. Tailored content: villa-specific pain points (managing many rooms, fragmented systems, energy waste at scale, security at scale, premium-finish constraints), villa-specific solution narrative naming Aura Panel + Mesh Bridge + Sense Engine, 8 subsystem cards (the full ecosystem), 3 scenarios (Welcome Home, Goodnight, Movie Night), 3 recommended products (Aura Panel, Climate Hub, Secure Kit — all 4 flagships if space allows), 6 benefits, topology diagram with all 8 nodes (the "showcase" deployment) per `contracts/topology-diagram.contract.md` § Per-solution topology guidance, final CTA. Phase 01 footer shell. Closing `<script type="module" src="../js/main.js" defer>`.
- [x] T051 [US2] Create `pages/solution-smart-apartment.html` with the same 9-section structure as T050, content tailored to compact-living: pain points (single-tenant budget constraints, retrofit installation, renter-flexible options, energy bills, security in shared buildings), solution narrative referencing the Mini Hub + Edge Switch + Smart Plug subsystems, 6 subsystem cards (omit Curtains, emphasise Energy), 3 scenarios (Morning Routine, Movie Night, Energy-saver), 3 recommended products (Mini Hub, Edge Switch, Smart Plug or equivalent non-flagship slugs from Phase 02), 6 benefits with "Cost Reduction" substituting for one canonical benefit, topology diagram with 6 nodes (smaller-scale deployment).
- [x] T052 [US2] Create `pages/solution-smart-hotel.html`. Tailored content: pain points (guest comfort vs ops cost, energy waste in empty rooms, check-in friction, brand consistency across rooms, security perimeters), solution narrative referencing the Aura Panel + Climate Hub + Smart Door Lock + Sense Engine, 7 subsystem cards (omit Energy or de-emphasise it; emphasise Lighting/Climate/Security), 3 scenarios (Check-in Scene, Do-Not-Disturb Mode, Energy-saver on Vacancy), 3 recommended products (Aura Panel, Climate Hub, Smart Door Lock), 6 benefits with "Guest Experience" substituting for one canonical benefit, topology diagram with 7 nodes (emphasise hospitality subsystems).
- [x] T053 [US2] Create `pages/solution-smart-office.html`. Tailored content: pain points (energy waste in empty meeting rooms, air-quality in open-plan, after-hours security, meeting-room booking friction, lighting that fatigues), solution narrative referencing the Climate Hub + Sense Engine + Aura Panel + Smart Plug, 7 subsystem cards (omit Curtains; emphasise Climate, Sensors, Energy), 3 scenarios (Meeting Mode, After-Hours Lockdown, Air-Quality Auto-Vent), 3 recommended products (Climate Hub, Smart Thermostat, Sense Engine or motion-sensor + smart-plug), 6 benefits with "Cost Reduction" + "Centralized Management" emphasised, topology diagram with 7 nodes (emphasise commercial subsystems).
- [x] T054 [US2] Create `pages/solution-smart-compound.html`. Tailored content: pain points (multi-unit consistency, scalable rollout, shared-amenity control, energy reporting per unit, developer brand differentiation), solution narrative referencing the Mesh Bridge + Aura Panel + Energy Meter + Sense Engine + multi-unit topology, 8 subsystem cards (all + a "Multi-unit orchestration" angle), 3 scenarios (Resident Move-in, Shared-Amenity Booking, Compound-wide Energy Report), 3 recommended products (Aura Panel, Mesh Bridge, Energy Meter), 6 benefits with "Scalability" + "Brand Polish" emphasised, topology diagram with 8 nodes + a "Multi-unit" annotation.
- [x] T055 [US2] Create `pages/solution-gaming-room.html`. Tailored content: pain points (scene transitions that break immersion, GPU heat / climate, audio + lighting sync, fragmented control during play, late-night noise / ambience), solution narrative referencing the Ambient Strip Controller + Climate Hub + Scene Remote + Aura Panel, 5 subsystem cards (Lighting + Climate + Sensors + App & Voice + Central Control; omit Curtains / Security / Energy / Curtains-Shading), 3 scenarios (Cinema Mode, Tournament Mode, Late-Night Mode), 3 recommended products (Ambient Strip Controller, Scene Remote, Smart Thermostat or Climate Hub), 6 benefits with "Premium UX" + "Comfort" emphasised, topology diagram with 5 nodes (immersive setup).
- [x] T056 [US2] Update the **homepage** `index.html` — find the four "Solutions" preview cards (in the homepage Solutions preview section) whose solutions now have detail pages and update their CTA `href` from the placeholder (`./pages/solutions.html#<slug>`) to the real detail-page path (`./pages/solution-<slug>.html`). DO NOT modify any other Phase 01 markup. Spec reference: FR-042. Affected slugs: smart-villa, smart-apartment, smart-hotel, smart-office (the four most commonly-previewed) — update only the slugs that have detail pages.
- [x] T057 [US2] Run `scripts/check-shell-consistency.sh`: confirm all six new detail pages' header + footer blocks hash identically to the Phase 01 reference. Fix any divergence by copying blocks from a Phase 01 page.
- [x] T058 [US2] Run `scripts/check-content-rules.sh`: each detail page MUST have exactly one `<h1>` (the solution title), a non-empty `<title>` (solution-specific), a non-empty meta description (solution-specific), and zero forbidden strings.
- [x] T059 [US2] Run `scripts/check-links.sh`: every `href` and `src` on all six new pages resolves to a real file. Particular focus: every "Get a Quote" → `../index.html#get-quote`; every "Explore Products" → `./products.html`; every "Talk to a Specialist" → `./contact.html`; every Recommended Products `View Details` → existing detail page or catalog anchor. Confirm the 6 "Discover this solution" CTAs on the overview page now all resolve (the failing condition from T045).
- [x] T05A [US2] Manual interaction QA per `quickstart.md` § 7 "On every detail page": each page renders in correct order; hero shows above the fold; 9 sections all populated; Recommended Products cards link correctly; CTAs route correctly; no console errors at desktop and at 360 px.

**Checkpoint**: Six detail pages render fully, all CTAs resolve, all three gates exit 0. Overview → Detail → Quote conversion path is end-to-end working for the MVP cohort.

---

## Phase 5: User Story 3 — Visitor uses the visual diagram to understand the ecosystem topology (Priority: P2)

**Goal**: The "How It Connects" inline SVG topology diagram on every detail page renders correctly, is accessible to screen readers, and is solution-specific (each page's topology reflects only the subsystems present in that solution).

**Independent Test**: On every of the six detail pages, the "How It Connects" section renders an SVG diagram inline (no external image, no JS injection). The diagram visually distinguishes the central hub, the cloud node, and the subsystem nodes. The `<title>` element describes the topology in one sentence. Decorative lines are `aria-hidden="true"`. Screen-reader pass: VoiceOver / NVDA announces the title and node labels.

> **NOTE**: Topology-diagram markup was already authored inline as Section 8 of each detail page in T050–T055. This phase is the **QA + per-solution tailoring + accessibility audit** of those diagrams. Each task here is a focused review-and-fix pass on one detail page, ensuring its diagram meets the contract.

### Implementation for User Story 3

- [x] T060 [P] [US3] Audit and tailor the topology diagram in `pages/solution-smart-villa.html` per `contracts/topology-diagram.contract.md`: 8 subsystem nodes (all canonical subsystems), `<title id="topology-title">` reads "Zakey Smart Villa topology: a central Mesh Bridge linking the Aura Panel, lighting, climate, security, sensors, energy, curtains, and the Zakey Cloud.", every decorative line carries `aria-hidden="true"`, every fill/stroke references a `:root` token (no hex literals), SVG markup ≤ 1.5 KB.
- [x] T061 [P] [US3] Audit and tailor the topology diagram in `pages/solution-smart-apartment.html`: 6 nodes (omit Curtains, emphasise Energy via accent stroke), tailored `<title>`, accessibility attributes, ≤ 1.5 KB SVG.
- [x] T062 [P] [US3] Audit and tailor the topology diagram in `pages/solution-smart-hotel.html`: 7 nodes (omit Energy or de-emphasise), tailored `<title>`, accessibility attributes, ≤ 1.5 KB.
- [x] T063 [P] [US3] Audit and tailor the topology diagram in `pages/solution-smart-office.html`: 7 nodes (omit Curtains, emphasise Climate / Sensors / Energy), tailored `<title>`, accessibility attributes, ≤ 1.5 KB.
- [x] T064 [P] [US3] Audit and tailor the topology diagram in `pages/solution-smart-compound.html`: 8 nodes + a "Multi-unit" annotation, tailored `<title>` reflecting the multi-unit story, accessibility attributes, ≤ 1.8 KB (slightly larger budget for the annotation).
- [x] T065 [P] [US3] Audit and tailor the topology diagram in `pages/solution-gaming-room.html`: 5 nodes (Lighting + Climate + Sensors + App & Voice + Central Control; emphasise Lighting via accent stroke), tailored `<title>`, accessibility attributes, ≤ 1.3 KB.
- [ ] T066 [US3] Run `scripts/check-content-rules.sh` against the six detail pages to confirm no forbidden strings were introduced by the topology updates.
- [ ] T067 [US3] Manual a11y QA: on each of the six detail pages, focus the topology diagram with keyboard, confirm the `<title>` is the first announced content, and confirm decorative `<line>` elements are NOT announced.

**Checkpoint**: Every detail page's topology diagram is solution-specific, accessible, and weighs within budget. The "credibility-making artefact" for technical buyers is in place.

---

## Phase 6: User Story 4 — Mega-menu deep-links and homepage solution slides route to the correct detail page (Priority: P2)

**Goal**: Cross-page navigation plumbing — the Phase 01 mega-menu's Solutions cells reliably deep-link to the matching category tab on the overview page; the Phase 01 homepage's Solutions-preview cards navigate directly to the detail page.

**Independent Test**: From the homepage, hover the "Solutions" mega-menu trigger; click each of the 6 cells in turn — each lands on `pages/solutions.html` with the right category tab pre-activated (cf. US1 hash logic in T042). On the homepage's "Solutions" preview section, click each of the 4 preview cards and verify navigation to the matching detail page (cf. T056 homepage patches).

> **NOTE**: Most of US4 is satisfied implicitly by US1 (T042 hash logic) + US2 (T056 homepage patches). This phase is the **end-to-end cross-page verification** and any residual fixes.

### Implementation for User Story 4

- [x] T070 [US4] End-to-end verification: from `index.html` (the homepage), open the header mega-menu and click each of the 6 Solutions cells (Smart Villa / Smart Apartment / Smart Hotel / Smart Office / Smart Compound / Gaming Room) in turn. Confirm each lands on `pages/solutions.html` with the correct category tab active on first paint, and the matching card is the first or only visible card in the grid.
- [x] T071 [US4] End-to-end verification: from `index.html`, click each of the 4 Solutions-preview cards. Confirm each navigates directly to its `pages/solution-<slug>.html` detail page (no detour through the overview page).
- [x] T072 [US4] If any mega-menu or preview href is broken (e.g., the homepage preview points to an older anchor or a missing slug), patch `index.html` only. Do NOT modify the header/footer shells (regression risk on shell-consistency gate). Spec reference: FR-041, FR-042.
- [x] T073 [US4] Run `scripts/check-links.sh` after any T072 fixes to confirm all homepage CTAs resolve.

**Checkpoint**: Cross-page navigation is fully functional. The Phase 01 mega-menu and homepage no longer have dangling Solutions promises.

---

## Phase 7: User Story 5 — Optional pages extend the catalog with Elderly Care and Smart Retail (Priority: P3)

**Goal**: If scope and time permit, ship two additional detail pages targeting more specialised audiences. These pages follow the same 9-section template, with content distinct to Elderly Care (safety, dignity, monitoring) and Smart Retail (customer-flow lighting, ambient climate, after-hours security).

**Independent Test**: If shipped, each optional page renders with all 9 sections, distinct content and visuals, and passes all three integrity gates. The overview page includes their cards in the grid under the correct category tabs.

> **NOTE**: This phase is **optional and non-blocking for MVP**. If the optional pages are not shipped this phase, the optional-page cards MUST NOT be added to the overview-page grid (no dead-link risk). Skip the entire phase if not shipping.

### Implementation for User Story 5

- [x] T080 [P] [US5] Create `assets/images/solutions/elderly-care.svg`: 1200×900 viewBox; brand gradient + dignified, calm scene silhouette (e.g., living room with soft lighting and an emergency-call cue). File size ≤ 6 KB.
- [x] T081 [P] [US5] Create `assets/images/solutions/smart-retail.svg`: 1200×900 viewBox; brand gradient + boutique-shop / showroom scene (mannequin or display shelf with ambient lighting). File size ≤ 6 KB.
- [x] T082 [US5] Create `pages/solution-elderly-care.html` per the detail-page contract. Tailored content: pain points (fall risk, medication-routine breakage, isolation, fragmented caregiver visibility, dignity vs surveillance balance), solution narrative emphasising Sensors + Smart Door Lock + App & Voice + a gentle automation philosophy, 6 subsystem cards (emphasise Sensors, Security, App & Voice, Lighting; de-emphasise Energy, Curtains), 3 scenarios (Morning Wellness Check, Fall Detection Response, Family Peace-of-Mind Snapshot), 3 recommended products (Motion Sensor, Smart Door Lock, Water Leak Sensor or equivalent), 6 benefits with "Safety" and "Dignity" substituting for canonical entries, topology diagram with 6 nodes (emphasise Sensors and Security via accent stroke).
- [x] T083 [US5] Create `pages/solution-smart-retail.html`. Tailored content: pain points (lighting that does not flatter merchandise, climate comfort for browsing customers, after-hours security, brand consistency across multiple locations, energy bills), solution narrative emphasising Lighting Control + Climate + Sensors + after-hours automation, 6 subsystem cards (Lighting, Climate, Security, Sensors, Energy, App & Voice — omit Curtains), 3 scenarios (Open-Doors Mode, Slow-Hour Energy-saver, After-Hours Lockdown), 3 recommended products (Lighting Controller, Climate Hub, Outdoor Camera or motion sensor), 6 benefits with "Brand Polish" + "Cost Reduction" substituting for canonical entries, topology diagram with 6 nodes (emphasise Lighting via accent stroke).
- [x] T084 [US5] Add the **two optional solution cards** to `pages/solutions.html`'s `#solutions-grid` per the solution-card contract. `id="elderly-care"`, `data-category="lifestyle residential"` (dual-tagged per data-model.md); `id="smart-retail"`, `data-category="commercial"`. Update `[data-total-count]` from 6 to 8 in the toolbar paragraph (the JS in T042 sets it on init from `cards.length`, so the static HTML can also display 8 directly).
- [x] T085 [US5] Update the `solutionToCategory` table in `js/solutions.js` (added in T042) to include the two optional slugs: `'elderly-care': 'lifestyle'` and `'smart-retail': 'commercial'`. Test that visiting `pages/solutions.html#elderly-care` activates the Lifestyle pill AND scrolls to the Elderly Care card; similarly for `#smart-retail` → Commercial.
- [x] T086 [US5] Run all three integrity gates against the updated file set: `scripts/check-shell-consistency.sh`, `scripts/check-content-rules.sh`, `scripts/check-links.sh` — all exit 0. Particular focus: the new Recommended-Products `View Details` hrefs on Elderly Care and Smart Retail resolve correctly to existing product detail pages or catalog anchors.
- [x] T087 [US5] Manual interaction QA per `quickstart.md` § 7: filter by "Lifestyle" → Gaming Room + Elderly Care appear (Elderly Care under dual-tag); filter by "Residential" → Smart Villa + Smart Apartment + Elderly Care appear; filter by "Commercial" → Smart Office + Smart Retail appear.

**Checkpoint**: Optional pages shipped (or explicitly skipped). If shipped, the overview grid has 8 cards across 5 categories; multi-category Elderly Care appears under both Residential and Lifestyle tabs.

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Performance audit, accessibility audit, constitution sweep, final visual sweep. No new features.

- [x] T090 [P] Performance audit on `pages/solutions.html`: measure HTML / CSS / JS / first-paint image weight; confirm total ≤ 1.5 MB per spec SC-008 and `plan.md` § Performance Goals. Confirm the first 4 solution cards omit `loading="lazy"` (eager) and cards 5+ include it. Confirm the hero image has `fetchpriority="high"`. Confirm `js/solutions.js` is loaded only on the overview page via the conditional import in `main.js`. If page weight exceeds budget, reduce SVG inline detail.
- [x] T091 [P] Performance audit on one detail page (`pages/solution-smart-villa.html`): same checklist. Hero image preloaded with `fetchpriority="high"`; lifestyle visuals (subsystem icons, recommended-products images) lazy-loaded; topology SVG inline (no external request). Detail pages must not import any JS module.
- [x] T092 Accessibility audit on `pages/solutions.html`: keyboard traversal works (skip link → header → filter toolbar → cards → footer); focus rings visible everywhere; `aria-pressed` toggles correctly across filter clicks; `aria-live="polite"` on the status line announces; colour contrast: filter pill active (accent bg, ink text) ≥ 4.5:1, status line muted text ≥ 4.5:1; every card image has non-empty descriptive `alt`.
- [x] T093 Accessibility audit on one detail page: keyboard traversal (skip link → header → hero CTAs → all 9 sections → footer); single `<h1>` is the solution title (verified); 8 `<h2>` for the subsequent sections; topology SVG has `<title>` + `aria-labelledby` + decorative paths `aria-hidden="true"`; every card image has non-empty `alt`.
- [x] T094 Run `npm run check`; all three gates exit 0 against the full file set (Phase 01 + Phase 02 + Phase 03). Verify Phase 01 and Phase 02 pages still pass (no regression).
- [x] T095 Constitution-compliance sweep against the full Phase-03 file set:
  - Principle I: no framework / CDN in `package.json` or any HTML page; only `tailwindcss@^3.4`, plugins, and PostCSS in `devDependencies`.
  - Principle II: `grep -rn "innerHTML\s*=" js/` shows zero primary-content injection (only the Phase 02 gallery `src`/`alt` swap and the Phase 02/03 `.is-hidden` class toggles).
  - Principle III: every solution card and every detail-page section has a visual; visual language consistent across Phase 01 + Phase 02 + Phase 03; no parallel design system introduced.
  - Principle IV: zero "lifesmart" / "ilifesmart" / "CoSS" / "AI Builder" / "Fusion Link" in any file across the repo.
  - Principle V: zero "lorem ipsum" anywhere; every solution card has all required fields populated; every detail page has every section populated.
  - Principle VI: `npm run check` green; no console errors during the interaction QA passes; mobile / tablet / desktop visual passes complete.
  - Principle VII: 6 solution cards in the overview (8 if optional pages shipped); 6 detail pages fully populated; optional pages either fully populated or not present at all (no half-finished optional pages).
- [x] T096 Final visual sweep at desktop (1440 px), tablet (768 px), and mobile (375 px) across `pages/solutions.html` + the six (or eight) detail pages; verify the `quickstart.md` § 8 "Definition of done for Phase 03" checklist.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1, T001–T004)**: No dependencies — starts immediately on this branch.
- **Foundational (Phase 2, T010–T030)**: Depends on Setup. **Blocks all user-story phases.**
- **US1 (Phase 3, T040–T046)**: Depends on Foundational. Delivers the MVP overview page.
- **US2 (Phase 4, T050–T05A)**: Depends on Foundational. Can proceed in parallel with US1 IF the overview HTML scaffold is committed; otherwise sequentially. The six detail-page tasks (T050–T055) each touch a separate file and ARE parallelisable.
- **US3 (Phase 5, T060–T067)**: Depends on US2 (extends each detail page's Section 8). The six audit tasks (T060–T065) each touch a separate file and ARE parallelisable.
- **US4 (Phase 6, T070–T073)**: Depends on US1 + US2 (cross-page verification only).
- **US5 (Phase 7, T080–T087)**: Optional. Depends on US1 + US2 (adds 2 cards to overview + 2 detail pages). Non-blocking for MVP.
- **Polish (Phase N, T090–T096)**: Depends on US1 + US2 + US3 + US4 (+ US5 if shipped). Final acceptance pass.

### User Story Dependencies

- US1 (P1) — overview-page MVP. Can ship alone as Phase 03 v0.5.
- US2 (P1) — six detail pages. Depends on Foundational + the overview cards (T041) being authored so Recommended-Products references resolve, and the homepage solutions-preview hrefs (T056) need updating once detail pages exist. Can integrate with US1 but is independently testable: navigating to a detail page directly via URL works without the overview being open.
- US3 (P2) — topology diagram polish. Depends on US2 (the diagrams are authored inline during T050–T055, then audited/tailored here).
- US4 (P2) — cross-page navigation verification. Depends on US1 + US2.
- US5 (P3) — optional pages. Depends on US1 + US2 + foundation pages and components.

### Within Each User Story

- Models / content (HTML data) before behavior (JS).
- Card scaffolding (T040 page skeleton) before card population (T041) before filter wiring (T042).
- HTML before integrity gates.
- Integrity gates before manual QA.

### Parallel Opportunities

- **Setup**: T002, T003, T004 all marked `[P]` — different files / different read-only inventory tasks, no dependencies.
- **Foundational image generation**: T020–T025 all marked `[P]` — different image files.
- **Foundational CSS**: T010 → T011 → T012 → T013 → T014 → T015 → T016 → T017 are sequential (all touch `src/input.css` or its build output). They cannot run in parallel.
- **US2 detail pages**: T050–T055 each touch a separate `pages/solution-<slug>.html` file — could run in parallel by different contributors after Foundational, though the markup is copy-paste-similar so a single author typically writes them in sequence to keep tone consistent.
- **US3 topology audits**: T060–T065 each touch a separate detail-page file — can run in parallel.
- **Polish performance audits**: T090 and T091 can run in parallel.

---

## Parallel Example: Phase 2 Foundational

```bash
# After T010–T017 complete (sequential, all on src/input.css), launch all image-generation
# tasks in parallel — they touch different file groups:
Task: T020 — Verify or create assets/images/solutions/smart-villa.svg
Task: T021 — Create assets/images/solutions/smart-apartment.svg
Task: T022 — Create assets/images/solutions/smart-hotel.svg
Task: T023 — Create assets/images/solutions/smart-office.svg
Task: T024 — Create assets/images/solutions/smart-compound.svg
Task: T025 — Create assets/images/solutions/gaming-room.svg
```

## Parallel Example: User Story 2 (detail pages)

```bash
# After Foundational + US1 overview committed, launch detail-page authoring tasks
# in parallel — each touches its own file:
Task: T050 — pages/solution-smart-villa.html
Task: T051 — pages/solution-smart-apartment.html
Task: T052 — pages/solution-smart-hotel.html
Task: T053 — pages/solution-smart-office.html
Task: T054 — pages/solution-smart-compound.html
Task: T055 — pages/solution-gaming-room.html
```

## Parallel Example: User Story 3 (topology audits)

```bash
# After US2 ships, launch all six topology audits in parallel — each touches its own file:
Task: T060 — Audit smart-villa topology
Task: T061 — Audit smart-apartment topology
Task: T062 — Audit smart-hotel topology
Task: T063 — Audit smart-office topology
Task: T064 — Audit smart-compound topology
Task: T065 — Audit gaming-room topology
```

---

## Implementation Strategy

### MVP First (User Story 1 + User Story 2)

1. Complete Phase 1 Setup (T001–T004).
2. Complete Phase 2 Foundational (T010–T030).
3. Complete Phase 3 US1 (T040–T046).
4. **STOP and VALIDATE**: visitor can browse the 6-solution overview, filter by 5 categories, deep-link via hash. Overview MVP can ship as Phase 03 v0.5.
5. Complete Phase 4 US2 (T050–T05A).
6. **STOP and VALIDATE**: visitor can navigate from overview → detail page → quote form. Full MVP can ship as Phase 03 v0.7.

### Incremental delivery

1. Setup + Foundational → infra ready.
2. US1 (overview + filter) → ship v0.5.
3. US2 (6 detail pages) → ship v0.7 — every solution gets full storytelling.
4. US3 (topology audit) → ship v0.8 — every detail page has a credibility-making diagram.
5. US4 (cross-page nav verification) → ship v0.9 — mega-menu deep-links and homepage previews all work.
6. US5 (optional pages) → ship v0.95 — Elderly Care and Smart Retail extend the catalog.
7. Polish (Phase N) → ship v1.0 — final acceptance, performance budget, a11y audit, constitution sweep.

### Parallel team strategy

With multiple contributors:

1. One contributor completes Setup + Foundational (T001–T030).
2. After Foundational, parallel work:
   - Contributor A: US1 (overview + filter logic) → US3 audits / Polish.
   - Contributor B: US2 detail pages (parallel within US2 too) → US3 audits.
   - Contributor C (optional): US5 optional pages once US2 lands.
3. Cross-page verification (US4) is a single-author end-to-end pass at the end.
4. Polish (T090–T096) is a single-author final acceptance pass.

---

## Notes

- `[P]` tasks = different files, no incomplete dependencies.
- Every Phase-03 page MUST keep the Phase 01 header and footer shells byte-identical (gate 1 enforces).
- The six required detail pages MUST ship before US3 audits or US4 verification can begin.
- Optional pages (T080–T087) are non-blocking; if they are not shipped this phase, do NOT add their cards to the overview grid.
- All "Get a Quote" CTAs route to `../index.html#get-quote` (Phase 01 form); all "Talk to a Specialist" CTAs route to `./contact.html`; all "Explore Products" CTAs route to `./products.html`.
- **File-shared task warning**: tasks editing `src/input.css` (T010–T017) are serial with each other. Tasks editing `pages/solutions.html` (T040, T041, T084) are serial. Tasks editing `js/solutions.js` (T042, T085) are serial. Detail-page tasks T050–T055, T082–T083, and topology audits T060–T065 each touch a different file so they ARE parallelisable.
- CSS budget for Phase 03 is **64 KB** (relaxed from Phase 02's 60 KB; justified in `plan.md` Complexity Tracking).
- Constitution v1.0.0 — all seven principles must still pass at end of Phase 03. The polish phase (T095) is the formal sweep.
