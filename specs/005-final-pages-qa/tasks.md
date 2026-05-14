---
description: "Task list for Zakey Phase 05 — Projects, Blog, About, Contact, Legal Pages, and Final Frontend QA"
---

# Tasks: Zakey Phase 05 — Projects, Blog, About, Contact, Legal Pages & Final QA

**Input**: Design documents from `/specs/005-final-pages-qa/`
**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/`, `quickstart.md`

**Tests**: NOT included. The feature specification does not request unit/integration tests; verification is via the three bash integrity gates (`scripts/check-*.sh`) plus the manual sweeps documented in `quickstart.md`. Browser test framework remains explicitly out of scope (carries forward from Phase 01–04).

**Organization**: Tasks are grouped by user story per the spec's priorities (US1/US2/US3 are P1, US4/US5/US6 are P2). The Foundational phase produces all CSS component families, all SVG image placeholders, all 13 page stubs, and all JS module stubs so that each user story can be filled out and verified independently against passing gates.

## Format: `[ID] [P?] [Story?] Description`

- **[P]**: Can run in parallel (different files, no incomplete dependencies)
- **[Story]**: Maps task to user story (US1 / US2 / US3 / US4 / US5 / US6)
- All file paths are repo-root-relative.

## Path Conventions

Flat static-site layout at the repo root, unchanged from Phase 01–04: `index.html`, `pages/`, `src/`, `css/`, `js/`, `assets/`, `scripts/`. See `plan.md` § Project Structure.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Confirm the Phase 01–04 toolchain still runs against the current tree, scaffold the three new JS module stubs, and create the new asset directories. No HTML content authored yet.

- [X] T001 Verify Phase 01–04 toolchain operates against the current tree: `npm install` exits 0; `npm run build:css` rebuilds `css/styles.css` from `src/input.css` without warnings; `npm run check` exits 0 against the existing 25-page file set. Record the current CSS file size in bytes (baseline for the post-Phase 05 budget delta check in Polish T520).
- [X] T002 [P] Create empty stub `js/projects.js` exporting `export function initProjectsFilter() { /* TODO: Phase 05 segment filter */ }`. ES module, no behavior yet.
- [X] T003 [P] Create empty stub `js/blog.js` exporting `export function initBlogFilter() { /* TODO: Phase 05 category filter */ }`. ES module, no behavior yet.
- [X] T004 [P] Create empty stub `js/contact.js` exporting `export function initContactForm() { /* TODO: Phase 05 quote form state machine */ }`. ES module, no behavior yet.
- [X] T005 [P] Create asset directories `assets/images/projects/`, `assets/images/blog/`, `assets/images/about/`, `assets/images/contact/` and add a `.gitkeep` to each.

**Checkpoint**: Toolchain green; three JS module stubs in place; four new image-asset directories exist.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Author every shared CSS component family, every new image placeholder, every page stub (with the correct shell and `<body data-page>`), and wire the JS loader — in one phase — so that all three gates pass with 38/38 stub pages and every downstream user story can be filled in and verified independently.

**⚠️ CRITICAL**: No user-story work begins until this phase completes and all three gates pass at 38/38 stub pages.

### CSS component families (extend `src/input.css` only, in `@layer components`)

- [X] T010 Append the **project-card + project-grid + filter-chip component family** to `src/input.css` per `contracts/project-card.contract.md`: `.projects-grid`, `.filter-chip`, `.filter-chip[aria-pressed="true"]`, `.project-card`, `.project-card__media`, `.project-card__segment-tag`, `.project-card__body`, `.project-card__title`, `.project-card__location`, `.project-card__highlights` (dt/dd), `.project-card__cta`. Mobile: 1-col grid; tablet: 2-col; desktop: 3-col. No new tokens.
- [X] T011 Append the **project-detail page component family** to `src/input.css`: `.project-hero`, `.project-hero__inner`, `.project-hero__media`, `.project-summary`, `.project-challenge`, `.project-solution`, `.project-devices`, `.project-scenes`, `.project-scenes__grid`, `.project-scene-card`, `.project-results`, `.project-results__grid`, `.project-result-card`, `.project-gallery`, `.project-gallery__grid`, `.project-final-cta`. Reuses Phase 03/04 surface tokens.
- [X] T012 Append the **blog-card + blog-filter component family** to `src/input.css` per `contracts/blog-card.contract.md`: `.blog-hero`, `.blog-filter`, `.blog-grid`, `.blog-grid__empty`, `.blog-card`, `.blog-card[data-article-status="coming-soon"]`, `.blog-card__media`, `.blog-card__category-tag`, `.blog-card__status` (the "Coming Soon" badge), `.blog-card__body`, `.blog-card__meta`, `.blog-card__title`, `.blog-card__excerpt`, `.blog-card__cta`. Add the `.btn--disabled` modifier and `[aria-disabled="true"]` selector for the disabled CTA pattern. `.blog-newsletter` for the newsletter CTA.
- [X] T013 Append the **article-body + article-hero + article-toc + related-articles component family** to `src/input.css` per `contracts/article-body.contract.md`: `.article-hero`, `.article-hero__media`, `.article-hero__inner`, `.article-hero__category`, `.article-hero__title`, `.article-hero__meta`, `.article-toc`, `.article-toc__heading`, `.article-body` (with all nested h2/h3/p/ul/ol/blockquote/figure/figcaption/img/a selectors per the contract — `~62ch` max-width, 1.7 line-height), `.related-articles`, `.related-grid`, `.related-card`, `.article-final-cta`, `.article-final-cta__inner`, `.article-final-cta__actions`.
- [X] T014 Append the **about-page component family** to `src/input.css` per `contracts/about-page.contract.md`: `.about-hero` (+ `__inner`, `__eyebrow`, `__title`, `__subtitle`, `__actions`, `__media`), `.about-story` (+ `__inner`, `__copy`, `__media`), `.about-mission-vision`, `.about-card` (+ `__icon`, `__title`, `__body`), `.about-values` (+ `__grid`, `__card`, `__icon`, `__title`, `__body`), `.about-why` (+ `__grid`, `__item`, `__icon`, `__label`, `__body`), `.about-global` (+ `__inner`, `__copy`, `__map`), `.about-team` (+ `__grid`, `__card`, `__avatar`, `__name`, `__role`, `__bio`), `.about-cta` (+ `__inner`, `__actions`). Responsive collapse rules per the contract.
- [X] T015 Append the **contact-page component family** to `src/input.css` per `contracts/contact-form.contract.md`: `.contact-hero`, `.contact-channels` (+ `__grid`), `.contact-channel-card` (+ `__icon`, `__title`, `__desc`, `__cta`), `.contact-map` (+ `figcaption`), `.quote-form-section`, `.quote-form`, `.quote-form__grid`, `.quote-form__group` (fieldset styling), `.quote-form__consent`, `.quote-form__submit`, `.quote-success`, `.quote-success__card`, `.quote-success__cta`, `.form-field__counter` (the message-textarea counter). Reuse Phase 04 `.form-field`, `.form-field__label`, `.form-field__req`, `.form-field__error`, `.form-error-summary`, `[data-form-state="submitting"]`, `[aria-invalid="true"]` — no duplication.
- [X] T016 Append the **legal-page component family** to `src/input.css` per `contracts/legal-page.contract.md`: `.legal-page` (grid wrapper: TOC + body on `≥1024px`), `.legal-page__hero`, `.legal-page__eyebrow`, `.legal-page__updated`, `.legal-page__lead`, `.legal-page__toc`, `.legal-page__toc-heading`, `.legal-page__body` (reuses `.article-body` typography with tighter spacing), `.legal-page__cta`. Both themes look correct.
- [X] T017 Append the **floating-whatsapp component** to `src/input.css` per `contracts/floating-whatsapp.contract.md`: `.floating-whatsapp` (fixed bottom-right, 56px circle, WhatsApp green #25D366), `.floating-whatsapp__label` (visually-hidden tooltip), hover/focus elevation, `@media (max-width: 640px)` size override, `@media (prefers-reduced-motion: reduce)` transition off. Z-index 50.
- [X] T018 Append the **about-page-hero / contact-hero / blog-hero / projects-hero hero variants + small shared utilities** to `src/input.css`: `.projects-hero`, `.projects-intro` (small intro paragraph below Projects hero), `.blog-hero`, `.contact-hero`. Each is a thin variant on the existing Phase 04 hero pattern — different copy ratios, no new tokens. Add `.section-head` if a small reusable "section-eyebrow + h2 + subtitle" block is needed and not already present in Phase 04.
- [X] T019 Run `npm run build:css`. Record the new minified size of `css/styles.css`. **Target**: ≤ 95 KB (Phase 04 baseline 92.5 KB; Phase 05 may add up to 2.5 KB before T520 dedup pass). If the new size exceeds 95 KB, identify and dedupe redundant declarations (most likely targets: `.benefit-card`/`.partner-type-card` overlap with `.about-card`/`.contact-channel-card`, `.package-card` overlap with `.project-card`, Phase 04 form styles overlap with `.quote-form`) before any user-story work begins. Note the final size at the top of `src/input.css` in a comment.

### Image placeholders (SVG only — see research.md R-10 for the full list)

- [X] T020 [P] Create `assets/images/projects/projects-hero.svg` — Projects-overview hero. 16:9 viewBox, ≤ 30 KB. Premium-dark style consistent with Phase 04 illustrations: stylized villa/hotel/office composite with cyan accents.
- [X] T021 [P] Create `assets/images/projects/luxury-smart-villa.svg` — card thumbnail + detail-page hero. Stylized luxury villa exterior at dusk with lit windows and a subtle cyan glow on the smart-control area.
- [X] T022 [P] Create `assets/images/projects/smart-hotel-room.svg` — card thumbnail + detail-page hero. Stylized hotel guest room with control panel on the wall and a "Welcome" scene active.
- [X] T023 [P] Create `assets/images/projects/smart-office.svg` — card thumbnail + detail-page hero. Stylized open-plan office with energy-monitoring dashboard graphic in the foreground.
- [X] T024 [P] Create `assets/images/projects/smart-apartment-tower.svg` — card thumbnail only. Stylized residential tower with multiple lit units showing different active scenes.
- [X] T025 [P] Create `assets/images/projects/smart-retail-showroom.svg` — card thumbnail only. Stylized retail showroom with adaptive lighting and product spotlights.
- [X] T026 [P] Create `assets/images/projects/smart-gaming-suite.svg` — card thumbnail only. Stylized gaming/media room with immersive lighting scene.
- [X] T027 [P] Create four villa gallery thumbnails: `assets/images/projects/villa-gallery-1.svg` through `villa-gallery-4.svg`. Each shows a different room/scene of the villa case study (entrance, living room, master suite, garden lighting). 4:3 viewBox, ≤ 8 KB each.
- [X] T028 [P] Create four hotel gallery thumbnails: `assets/images/projects/hotel-gallery-1.svg` through `hotel-gallery-4.svg` (lobby, guest room, restaurant zone, bathroom panel). 4:3 viewBox, ≤ 8 KB each.
- [X] T029 [P] Create four office gallery thumbnails: `assets/images/projects/office-gallery-1.svg` through `office-gallery-4.svg` (reception, open floor, meeting room, energy dashboard). 4:3 viewBox, ≤ 8 KB each.
- [X] T030 [P] Create `assets/images/blog/blog-hero.svg` — Blog-overview hero. 16:9 viewBox, ≤ 30 KB. Editorial-feel illustration: stack of articles, magazine pages, or a stylized reading scene.
- [X] T031 [P] Create `assets/images/blog/smart-home-guide.svg` — implemented article thumbnail + detail hero. 16:9 viewBox. Stylized first-time smart-home setup scene.
- [X] T032 [P] Create `assets/images/blog/villa-automation.svg` — implemented article thumbnail + detail hero. 16:9 viewBox. Stylized villa with multiple automation scenes active.
- [X] T033 [P] Create `assets/images/blog/hotel-smart-room.svg` — implemented article thumbnail + detail hero. 16:9 viewBox. Stylized hotel-room guest experience.
- [X] T034 [P] Create six coming-soon article thumbnails: `assets/images/blog/security-camera-setup.svg`, `energy-saving-tips.svg`, `lighting-scenes-guide.svg`, `panel-vs-app.svg`, `partner-program.svg`, `hotel-back-office.svg`. Each is a stylized illustration matching its topic. 4:3 viewBox, ≤ 8 KB each.
- [X] T035 [P] Create two in-article inline figures: `assets/images/blog/article-inline-1.svg` and `article-inline-2.svg`. Reusable across the three implemented articles as in-content figures. 4:3 viewBox, ≤ 10 KB each.
- [X] T036 [P] Create `assets/images/about/zakey-smart-living.svg` — About-page hero + brand-story visual. 16:9 viewBox. Premium living-room scene with subtle Zakey wall panel and ambient lighting.
- [X] T037 [P] Create three about-card icons: `assets/images/about/mission.svg`, `vision.svg`, `values.svg`. 1:1 viewBox, ≤ 4 KB each. Line-art icons in cyan accent.
- [X] T038 [P] Create `assets/images/about/team-expertise.svg` — team / expertise composite illustration showing 4 abstract avatars with distinct expertise iconography (engineering, hospitality, partners, customer success). 4:3 viewBox, ≤ 15 KB.
- [X] T039 [P] Create `assets/images/about/regions-served.svg` — stylized regional map for the Global-Ready / Local-Support section, with cyan pin glows at 4–6 key market locations. Decorative; not a true map.
- [X] T040 [P] Create `assets/images/contact/zakey-contact-hero.svg` — Contact-page hero. 16:9 viewBox. Stylized concierge/sales visualization: phone, email envelope, and chat bubble composed in the Zakey palette.
- [X] T041 [P] Create `assets/images/contact/zakey-office-map.svg` — static "map" visual for the Contact page. Stylized regional outline with a single pin glow at a placeholder office location. 16:9 viewBox, ≤ 15 KB.
- [X] T042 [P] Create `assets/images/contact/zakey-office.svg` — optional office-interior visual. 4:3 viewBox, ≤ 10 KB. Premium office-interior illustration.

### Page stubs (13 files; each carries the global shell, single `<h1>`, `<body data-page>`)

- [X] T050 Create `pages/projects.html` as a minimal stub: complete site `<head>` (charset, viewport, `<title>Zakey Smart Living in Real Spaces — Projects & Case Studies</title>`, meta description, canonical, OG/Twitter tags, theme-color, favicon, anti-flash theme script, `<link rel="stylesheet" href="../css/styles.css">`), `<body data-page="projects">`, exact header and footer from `pages/about.html` reference (byte-identical after path normalization), and `<main id="content">` containing only `<h1>Zakey Smart Living in Real Spaces</h1>` and a single placeholder `<p>` (to be filled in Phase 3 / US1).
- [X] T051 [P] Create `pages/project-luxury-villa.html` as a minimal stub matching T050's pattern. `<title>Luxury Smart Villa — Zakey Smart Living</title>`, `<body data-page="project-luxury-villa">`, `<h1>Luxury Smart Villa</h1>`.
- [X] T052 [P] Create `pages/project-smart-hotel.html` as a minimal stub. `<title>Smart Hotel Guest Room — Zakey Smart Living</title>`, `<body data-page="project-smart-hotel">`, `<h1>Smart Hotel Guest Room</h1>`.
- [X] T053 [P] Create `pages/project-smart-office.html` as a minimal stub. `<title>Smart Office Energy Control — Zakey Smart Living</title>`, `<body data-page="project-smart-office">`, `<h1>Smart Office Energy Control</h1>`.
- [X] T054 [P] Create `pages/blog.html` as a minimal stub. `<title>Zakey Blog — Smart Living Insights</title>`, `<body data-page="blog">`, `<h1>Smart Living Insights</h1>`.
- [X] T055 [P] Create `pages/article-smart-home-guide.html` as a minimal stub. `<title>Smart Home Beginner Guide — Zakey Blog</title>`, `<body data-page="article">`, `<h1>Smart Home Beginner Guide: Your First 7 Days</h1>`.
- [X] T056 [P] Create `pages/article-villa-automation.html` as a minimal stub. `<title>12 Villa Automation Ideas — Zakey Blog</title>`, `<body data-page="article">`, `<h1>12 Villa Automation Ideas That Actually Get Used</h1>`.
- [X] T057 [P] Create `pages/article-hotel-smart-room.html` as a minimal stub. `<title>Inside a Smart Hotel Room — Zakey Blog</title>`, `<body data-page="article">`, `<h1>Inside a Smart Hotel Room: The Guest Experience</h1>`.
- [X] T058 [P] Create or rewrite `pages/about.html` as a minimal stub (replaces any existing about.html). `<title>About Zakey — Designing Smarter Spaces with Zakey</title>`, `<body data-page="about">`, `<h1>Designing Smarter Spaces with Zakey</h1>`.
- [X] T059 [P] Create or rewrite `pages/contact.html` as a minimal stub. `<title>Contact Zakey — Request a Quote</title>`, `<body data-page="contact">`, `<h1>Talk to Zakey</h1>`.
- [X] T060 [P] Create `pages/privacy.html` as a minimal stub. `<title>Privacy Policy — Zakey Smart Living</title>`, `<body data-page="privacy">`, `<h1>Privacy Policy</h1>`.
- [X] T061 [P] Create `pages/terms.html` as a minimal stub. `<title>Terms of Service — Zakey Smart Living</title>`, `<body data-page="terms">`, `<h1>Terms of Service</h1>`.
- [X] T062 [P] Create `pages/404.html` as a minimal stub (optional but in scope). `<title>Page Not Found — Zakey Smart Living</title>`, `<body data-page="404">`, `<h1>Page Not Found</h1>`.

### JS loader wiring

- [X] T070 Edit `js/main.js`: add three conditional imports at the bottom of the `DOMContentLoaded` handler — `if (document.body.dataset.page === 'projects') import('./projects.js').then(m => m.initProjectsFilter());`, `if (document.body.dataset.page === 'blog') import('./blog.js').then(m => m.initBlogFilter());`, `if (document.body.dataset.page === 'contact') import('./contact.js').then(m => m.initContactForm());`. Do not remove or reorder existing imports (Phase 04 FAQ and become-a-partner imports continue to work).

### Foundational checkpoint

- [X] T080 Run `npm run check` and confirm all three gates pass at 38/38 pages (current 25 + 13 new stubs). Run `npm run build:css` and confirm `css/styles.css` is at or below the 95 KB ceiling. Open each of the 13 new stub pages in a browser and confirm they render the global shell correctly under both themes. Confirm no console errors. If any gate fails, fix before any user-story work begins.

**Checkpoint**: All 38 pages exist with the new shell; all three integrity gates pass at 38/38; CSS budget is within ceiling; the 13 new pages have minimal-but-valid bodies. Every downstream user story can now be implemented and verified independently.

---

## Phase 3: User Story 1 — B2B Prospect Validates Zakey via Real Project Case Studies (Priority: P1) 🎯 MVP

**Goal**: Fill out `pages/projects.html` with the 6-card filterable grid, and fill out the three case-study detail pages (`project-luxury-villa.html`, `project-smart-hotel.html`, `project-smart-office.html`) with the full 9-section detail layout.

**Independent Test**: Open `pages/projects.html`. Hero, intro, six filter chips (All, Villas, Hotels, Offices, Real Estate, Commercial), six project cards render. Click each chip — grid filters within one frame; active chip carries `aria-pressed="true"`. Click a card CTA — the matching detail page loads with all 9 sections. Gate 1+2+3 all pass.

### Projects overview page

- [X] T100 [US1] Fill the `pages/projects.html` `<section class="projects-hero">`: H1 "Zakey Smart Living in Real Spaces" + 15–25-word subtitle + primary CTA "Request a Quote" → `contact.html` + secondary CTA "Become a Partner" → `become-a-partner.html` + hero `<img src="../assets/images/projects/projects-hero.svg" alt="..." loading="eager">`.
- [X] T101 [US1] Append `<section class="projects-intro">` after the hero: 1 paragraph (60–90 words) introducing the segments Zakey installs across (villas, hotels, offices, real-estate developments, commercial spaces). Confident, premium tone.
- [X] T102 [US1] Append `<nav class="projects-filter" aria-label="Filter projects by segment">` with six `<button class="filter-chip" type="button" data-filter="all|villa|hotel|office|real-estate|commercial" aria-pressed="...">` chips. "All" chip is initially pressed.
- [X] T103 [US1] Append `<div class="projects-grid" data-active-filter="all">` with six `<article class="project-card">` children per `data-model.md` § 1. Each card carries `data-segment`, `data-project`, an image, segment-tag, title, location label, the three highlight `<dl>` items (Challenge / Solution / Results), and a CTA. The three cards whose detail pages exist link to `project-luxury-villa.html`, `project-smart-hotel.html`, `project-smart-office.html`; the other three link to `contact.html` with CTA label "Request a Quote".
- [X] T104 [US1] Implement `js/projects.js`'s `initProjectsFilter()` per `contracts/project-card.contract.md`: on chip click, update `data-active-filter` on the grid, toggle `hidden` on each card based on `data-segment === activeFilter || activeFilter === 'all'`, update `aria-pressed` on all chips, and announce the result count to a `<p class="projects-grid__status" aria-live="polite">` if implemented. Total module ≤ 2 KB.
- [X] T105 [US1] Append `<section class="projects-final-cta">` at the bottom: H2 + 1–2-sentence body + two CTAs (Become a Partner, Request a Quote). Add a `.floating-whatsapp` element as the final child of `<body>` (per `contracts/floating-whatsapp.contract.md`).

### Luxury Smart Villa detail page

- [X] T110 [US1] Fill `pages/project-luxury-villa.html` `<section class="project-hero">`: large hero image (`luxury-smart-villa.svg`), H1 "Luxury Smart Villa", segment tag, location label, 1-paragraph summary. Add `.floating-whatsapp` as the final child of `<body>`.
- [X] T111 [US1] Append `<section class="project-summary">`, `<section class="project-challenge">` (H2 "The Challenge" + 50–120 word body), `<section class="project-solution">` (H2 "The Zakey Solution" + 50–120 word body) per `data-model.md` § 1 canonical content.
- [X] T112 [US1] Append `<section class="project-devices">`: H2 "Devices Used" + bulleted list of 4–10 devices that reference real Zakey product names where possible (Phase 02 catalog). Append `<section class="project-scenes">`: H2 "Automation Scenes" + grid of 3–6 scene cards, each with scene name, 1-sentence description, small icon.
- [X] T113 [US1] Append `<section class="project-results">`: H2 "Results" + grid of 3–5 result stat cards (each: large number, label, 1-sentence context). Numbers should be plausible (e.g., "23% reduction in lighting energy use"). Append `<section class="project-gallery">`: H2 "Project Gallery" + 4 `<a><img></a>` thumbnails (villa-gallery-1.svg through -4.svg), each opening the full image in a new tab.
- [X] T114 [US1] Append `<section class="project-final-cta">`: H2 + body + 2 CTAs (Become a Partner, Request a Quote).

### Smart Hotel detail page

- [X] T120 [US1] [P] Fill `pages/project-smart-hotel.html` `<section class="project-hero">` with the same pattern as T110, using `smart-hotel-room.svg`. Add `.floating-whatsapp`.
- [X] T121 [US1] [P] Append summary/challenge/solution sections per the canonical hotel-case content in `data-model.md`. Hotel use case emphasizes guest-experience scenes, in-room control panels, and operator visibility.
- [X] T122 [US1] [P] Append devices/scenes sections per the contract. Hotel scenes named: "Welcome", "Sleep", "Wake", "Movie", "Check-Out", "Do Not Disturb".
- [X] T123 [US1] [P] Append results/gallery sections. Gallery uses `hotel-gallery-1.svg` through `-4.svg`.
- [X] T124 [US1] [P] Append final CTA section.

### Smart Office detail page

- [X] T130 [US1] [P] Fill `pages/project-smart-office.html` `<section class="project-hero">` with the same pattern, using `smart-office.svg`. Add `.floating-whatsapp`.
- [X] T131 [US1] [P] Append summary/challenge/solution. Office use case emphasizes energy optimization, occupancy-driven climate, and meeting-room scenes.
- [X] T132 [US1] [P] Append devices/scenes sections. Office scenes named: "Day Mode", "Meeting Mode", "End of Day", "Weekend Saver".
- [X] T133 [US1] [P] Append results/gallery sections. Gallery uses `office-gallery-1.svg` through `-4.svg`.
- [X] T134 [US1] [P] Append final CTA section.

### US1 verification

- [X] T140 [US1] Run `npm run check` and confirm all three gates still pass at 38/38. Open `pages/projects.html`: click each filter chip — confirm grid filters; confirm `aria-pressed` toggles. Click each card CTA — confirm the destination resolves. Open each detail page — confirm all 9 sections render under both themes; confirm gallery thumbnails open the full image in a new tab; confirm `.floating-whatsapp` renders bottom-right with the cyan focus ring on Tab.

**Checkpoint (US1 MVP)**: Projects overview + 3 detail pages are complete and shippable. Phase 05 has reached MVP — the credibility funnel is closed.

---

## Phase 4: User Story 2 — Lead Converts via the Contact / Get-Quote Page (Priority: P1)

**Goal**: Fill out `pages/contact.html` with the full hero + four contact-channel cards + main quote form + map visual + FAQ accordion + floating WhatsApp button. Implement `js/contact.js` with the full form state machine.

**Independent Test**: Open `pages/contact.html`. Hero, four contact-channel cards (Sales, Partners, Support, Projects), the quote form, map visual, FAQ accordion, and floating WhatsApp button all render. Submit empty: error summary appears, first invalid is focused. Fill all required fields validly and submit: transitions through `submitting` to `success`, hash becomes `#quote-received`. Edit & Resubmit roundtrip works. FAQ opens single-mode. All gates pass.

### Hero, contact cards, map

- [X] T200 [US2] Fill `pages/contact.html` `<section class="contact-hero">`: H1 "Talk to Zakey", 20–35-word subtitle, hero image (`zakey-contact-hero.svg`).
- [X] T201 [US2] Append `<section class="contact-channels" aria-labelledby="channels-heading">`: H2 "How to Reach Us" + 2×2 grid of four `<article class="contact-channel-card">` per `data-model.md` § 3: Sales (mailto:sales@zakey.tech), Partners (anchor → `become-a-partner.html`), Support (mailto:support@zakey.tech), Projects (anchor → `#quote-form`). Each card has icon, title, 10–20-word description, primary action.
- [X] T202 [US2] Append `<section class="contact-map-section">` containing `<figure class="contact-map">` with `<img src="../assets/images/contact/zakey-office-map.svg" alt="..." loading="lazy">` + `<figcaption>` with the placeholder office address as static text.

### Main quote form

- [X] T210 [US2] Append `<section id="quote-form" class="quote-form-section">` with the full `<form id="contact-form" class="quote-form" data-form-state="idle" novalidate>` per `contracts/contact-form.contract.md`. Three `<fieldset class="quote-form__group">` blocks: "About You" (role, fullName, company, email, phone), "Location" (country, city), "Your Project" (projectType, projectSize, interestedSolutions, budgetRange, timeline, message). Plus the standalone `.quote-form__consent` block (consent checkbox). Each field is a `.form-field` with label, required indicator (where required), control with `aria-describedby="<id>-error"`, and adjacent `.form-field__error`. Submit button is `<button type="submit" class="btn btn--primary quote-form__submit">Request a Quote</button>`.
  - `role` select options: Distributor, System Integrator, Real Estate Developer, Installer, Interior Designer, Hotel Operator, End User, Other.
  - `country` select: curated list of ~30 markets (Saudi Arabia, UAE, Egypt, Qatar, Kuwait, Bahrain, Oman, Jordan, Lebanon, Iraq, Morocco, Tunisia, Algeria, Turkey, UK, Germany, France, Italy, Spain, USA, Canada, India, Indonesia, Singapore, Malaysia, Vietnam, Thailand, China, Brazil, Mexico, Other).
  - `projectType` select: Smart Villa, Smart Apartment, Smart Hotel, Smart Office, Smart Compound, Gaming Room, Elderly Care, Smart Retail, Other.
  - `projectSize` select: 1 unit, 2–5 units, 6–25 units, 26–100 units, 100+ units, recurring.
  - `interestedSolutions` checkbox group: 8 checkboxes matching the Phase 03 solution slugs.
  - `budgetRange` select (optional): Prefer not to say, $5k–$25k, $25k–$100k, $100k–$500k, $500k+.
  - `timeline` select: Immediate (<1 month), Short (1–3 months), Mid (3–6 months), Long (6–12 months), Not sure.
  - `message` textarea with `maxlength="2000"` + `<p class="form-field__counter" id="message-counter">0 / 2000</p>`.
  - `consent` checkbox with label referencing `privacy.html`.
- [X] T211 [US2] Append `<section class="quote-success" data-form-success hidden aria-live="polite">` after the form section per the contract. Includes H2 "Quote Request Received" + 2-sentence next-steps + three CTAs: Back to Home (`../index.html`), Browse Projects (`projects.html`), Edit & Resubmit (`<button data-edit-application>`).

### FAQ accordion

- [X] T220 [US2] Append `<section class="contact-faq" aria-labelledby="contact-faq-heading">` before the success section: H2 "Quick Answers" + `<div class="faq" data-faq data-faq-mode="single">` containing 4–6 `<details class="faq-item">` items reusing the Phase 04 FAQ component. Topics: response time SLA, languages supported, project sizes served, on-site survey availability, after-sales support, partner program. Each `<summary class="faq-item__trigger" aria-expanded="false">` carries the chevron SVG.

### Form state machine

- [X] T230 [US2] Implement `js/contact.js`'s `initContactForm()` per `contracts/contact-form.contract.md`. Pattern: near-clone of `js/become-a-partner.js`. Behaviors:
  - `WeakSet` of touched controls; blur listener on each control re-runs validator if touched.
  - Per-field validator chain matching the table in the contract.
  - `interestedSolutions` validated as checkbox-group-min-1 via change listener on each checkbox.
  - `consent` validated as required-checked on submit and on change.
  - Message textarea: `input` listener updates `#message-counter` to "<N> / 2000"; clamps `value` to 2000 chars.
  - Submit: prevent default, run all validators, count failures; if > 0, populate `.form-error-summary` ("Found N error(s). Please fix to continue."), unhide it, scroll into view, focus first invalid; if 0, transition `data-form-state="submitting"`, wait 400 ms (100 ms under reduced-motion), transition to `success`, hide form section, unhide `[data-form-success]`, set `window.location.hash = 'quote-received'`, focus success H2.
  - Edit & Resubmit (`[data-edit-application]` click): reverse the transition, clear hash via `history.replaceState({}, '', window.location.pathname)`, focus submit button.
  - Total module ≤ 6 KB.

### Floating WhatsApp on Contact

- [X] T240 [US2] Add the `.floating-whatsapp` element as the final child of `<body>` in `pages/contact.html` per the contract. Include the HTML comment immediately above noting to replace the placeholder phone number.

### US2 verification

- [X] T250 [US2] Run `npm run check` and confirm 38/38 PASS. Open `pages/contact.html`: confirm hero, all four contact cards, the form, map figure, FAQ, and floating WhatsApp render under both themes. Submit empty — confirm error summary + first-invalid focus. Fill validly — confirm `submitting → success` transition, hash becomes `quote-received`, focus moves to success H2. Click Edit & Resubmit — confirm form returns, hash clears. Keyboard-only walkthrough on every field works. Reduced-motion: form submitting delay is 100 ms.

**Checkpoint (US2 complete)**: Contact page is fully functional. The conversion surface is shippable.

---

## Phase 5: User Story 3 — Brand Researcher Evaluates Zakey via About Page (Priority: P1)

**Goal**: Fill out `pages/about.html` with all 8 sections per `contracts/about-page.contract.md`.

**Independent Test**: Open `pages/about.html`. Hero, brand story, mission/vision cards, values cards, why-zakey, global/local, team/expertise, final CTA all render under both themes. No Lorem ipsum. All gates pass.

- [X] T300 [US3] Fill `pages/about.html` `<section class="about-hero">` per the contract: H1 "Designing Smarter Spaces with Zakey", eyebrow, 20–30-word subtitle, two CTAs (Talk to Us → `contact.html`, See Our Projects → `projects.html`), hero image. Add `.floating-whatsapp` as the final child of `<body>`.
- [X] T301 [US3] Append `<section class="about-story">`: H2 "Our Story" + 2–4 paragraphs (400–700 words total) of authentic Zakey brand-story copy describing founding, market focus, geographic ambition, and partner-network philosophy. Side visual: brand-story image.
- [X] T302 [US3] Append `<section class="about-mission-vision">`: two `.about-card` blocks. Mission card: H2 "Mission" + 30–60-word body + small icon. Vision card: H2 "Vision" + 30–60-word body + small icon.
- [X] T303 [US3] Append `<section class="about-values">`: H2 "Our Values" + grid of 4–5 value cards. Each card: icon, H3 value name (e.g., "Premium First", "Integrator-Friendly", "Privacy by Design", "Always Reliable", "Built to Scale"), 15–25-word body.
- [X] T304 [US3] Append `<section class="about-why">`: H2 "Why Zakey" + grid of 4–6 differentiator bullets. Each: icon, 3–6-word label, 15–25-word body.
- [X] T305 [US3] Append `<section class="about-global">`: H2 "Global-Ready, Locally Supported" + 2–3 paragraphs explaining Zakey's market footprint and partner-network philosophy + `regions-served.svg` visual.
- [X] T306 [US3] Append `<section class="about-team">`: H2 "The People & Expertise Behind Zakey" + 4-card grid. Each card: avatar/icon SVG, H3 with expertise area or named role (Smart-Home Engineering, Hospitality Solutions, Partner Operations, Customer Success), 1-sentence 20–35-word bio/expertise statement.
- [X] T307 [US3] Append `<section class="about-cta">`: H2 "Let's Design Smarter Spaces Together" + 1-sentence body + two CTAs (Request a Quote → `contact.html`, Become a Partner → `become-a-partner.html`).

### US3 verification

- [X] T310 [US3] Run `npm run check` and confirm 38/38 PASS. Open `pages/about.html`: confirm all 8 sections render under both themes; all values cards / team cards / differentiator bullets are filled with real copy (no Lorem ipsum, no LifeSmart); imagery loads on every section; CTAs at the bottom resolve.

**Checkpoint (US3 complete)**: Projects + Contact + About — all three P1 conversion surfaces are complete.

---

## Phase 6: User Story 4 — Visitor Discovers Zakey Through Blog Content (Priority: P2)

**Goal**: Fill out `pages/blog.html` with the 9-card filterable grid + newsletter CTA, and fill out the three implemented article detail pages.

**Independent Test**: Open `pages/blog.html`. Hero, 7 filter chips (All + 6 categories), 9 cards (3 implemented + 6 coming-soon), newsletter CTA all render. Click each filter chip — grid filters. Click each implemented card — article detail loads with hero, title, reading time, category, TOC, structured headings, in-content images, related-articles section, "Get a Quote" CTA. Coming-soon cards are non-clickable. All gates pass.

### Blog overview page

- [X] T400 [US4] Fill `pages/blog.html` `<section class="blog-hero">`: H1 "Smart Living Insights", 20–30-word subtitle, hero image (`blog-hero.svg`).
- [X] T401 [US4] Append `<nav class="blog-filter" aria-label="Filter articles by category">`: 7 `<button class="filter-chip" type="button" data-filter="all|smart-home|security|energy-saving|hotels|product-guides|partner-insights" aria-pressed="...">` chips.
- [X] T402 [US4] Append `<div class="blog-grid" data-active-filter="all">` with 9 `<article class="blog-card">` children per `data-model.md` § 2. Three cards are `data-article-status="implemented"` linking to article detail pages; six are `data-article-status="coming-soon"` with disabled CTAs and "Coming Soon" badges. Include the hidden `<p class="blog-grid__empty" hidden>No articles match the selected category.</p>` empty-state element.
- [X] T403 [US4] Implement `js/blog.js`'s `initBlogFilter()` per the contract: same pattern as `projects.js`. On chip click, update `data-active-filter` on the grid, toggle `hidden` on each card based on `data-category === activeFilter || activeFilter === 'all'`, update `aria-pressed` on chips, unhide the empty-state element if no cards match. Total module ≤ 2 KB.
- [X] T404 [US4] Append `<section class="blog-newsletter">` after the grid: reuse the Phase 01 newsletter form pattern (no new module needed). Add `.floating-whatsapp` as the final child of `<body>`.

### Article: Smart Home Beginner Guide

- [X] T410 [US4] Fill `pages/article-smart-home-guide.html` `<section class="article-hero">`: figure with `smart-home-guide.svg`, category "Smart Home", H1 "Smart Home Beginner Guide: Your First 7 Days", meta (publish date + reading time). Add `.floating-whatsapp` as the final child of `<body>`.
- [X] T411 [US4] Append `<nav class="article-toc" aria-label="Table of contents">` with 4–6 H2-anchor entries. Append `<article class="article-body">` with the full article copy: 600–1200 words across 4–6 H2 sections (e.g., "Start with a single room", "Choose your hub", "Pick scenes that match your life", "Build trust before you scale"), each H2 carrying `id="section-N"`, with paragraphs, at least one `<figure>` referencing `article-inline-1.svg` or `-2.svg`, and at least one `<ul>` or `<blockquote>`. Real Zakey-toned content; no Lorem ipsum.
- [X] T412 [US4] Append `<section class="related-articles">`: H2 "Related Articles" + 2 `<article class="related-card">` linking to `article-villa-automation.html` and `article-hotel-smart-room.html` + fallback "Browse all articles" link to `blog.html`. Append `<section class="article-final-cta">`: H2 + body + 2 CTAs (Request a Quote, Become a Partner).

### Article: Villa Automation Ideas

- [X] T420 [US4] [P] Fill `pages/article-villa-automation.html` `<section class="article-hero">` with `villa-automation.svg`, category "Smart Home", H1 "12 Villa Automation Ideas That Actually Get Used".
- [X] T421 [US4] [P] Append TOC + article-body with 4–6 H2 sections (e.g., "Welcome Home That Welcomes Back", "Lighting That Follows the Sun", "Climate That Knows Who's Home", "Security That Stays Out of the Way", "Outdoor Scenes Worth Showing Off"). Real content, 600–1200 words.
- [X] T422 [US4] [P] Append related-articles section (link to `article-smart-home-guide.html` and `article-hotel-smart-room.html`) + final CTA.

### Article: Hotel Smart Room Experience

- [X] T430 [US4] [P] Fill `pages/article-hotel-smart-room.html` `<section class="article-hero">` with `hotel-smart-room.svg`, category "Hotels", H1 "Inside a Smart Hotel Room: The Guest Experience".
- [X] T431 [US4] [P] Append TOC + article-body with 4–6 H2 sections (e.g., "The Welcome Scene Sets the Tone", "Lighting and Climate as Storytelling", "The Tablet vs. the Wall Panel", "Privacy, DND, and the Quiet Room", "Check-Out Without Awkwardness"). Real content, 600–1200 words.
- [X] T432 [US4] [P] Append related-articles section (link to `article-villa-automation.html` and `article-smart-home-guide.html`) + final CTA.

### US4 verification

- [X] T440 [US4] Run `npm run check` and confirm 38/38 PASS. Open `pages/blog.html`: confirm hero, all 7 chips, all 9 cards (3 implemented + 6 coming-soon with "Coming Soon" badges and disabled CTAs), newsletter CTA all render. Click each filter chip — confirm grid filters. Click a coming-soon CTA — confirm no navigation occurs. Click each implemented article card — confirm article detail loads with TOC anchors that jump to the matching H2.

**Checkpoint (US4 complete)**: Blog overview + 3 articles complete. Content marketing surface live.

---

## Phase 7: User Story 5 — Visitor Encounters Required Legal & Error Pages (Priority: P2)

**Goal**: Fill out `pages/privacy.html` and `pages/terms.html` with the full legal-page layout. Optionally fill `pages/404.html`.

**Independent Test**: Open `pages/privacy.html` and `pages/terms.html`. Each has hero with title + "Last updated" date, anchor TOC at top, 6+ H2-numbered sections with plain-language content, bottom CTA to Contact. The optional `pages/404.html` renders the shell with "Page Not Found" + 3 navigation CTAs. All gates pass.

### Privacy page

- [X] T500 [US5] Fill `pages/privacy.html` `<section class="legal-page__hero">`: eyebrow "Legal", H1 "Privacy Policy", "Last updated: 14 May 2026", 25–40-word lead paragraph explaining what the policy covers.
- [X] T501 [US5] Append `<aside class="legal-page__toc">`: H2 "In this policy" + `<ol>` with 6 anchor links to `#section-1` through `#section-6`.
- [X] T502 [US5] Append `<article class="legal-page__body">` with 6 numbered `<section id="section-N">` blocks per `contracts/legal-page.contract.md`: (1) What we collect, (2) How we use it, (3) Cookies and tracking, (4) Sharing with third parties, (5) Your rights & choices, (6) Contact us about privacy. Plain language. Each section: 80–200 words.
- [X] T503 [US5] Append `<section class="legal-page__cta">`: H2 "Questions about this policy?" + 1-sentence body + primary CTA to `contact.html`. Include the small footnote: "This page is provided for general information and does not constitute legal advice. For specific questions, please contact us or consult a qualified attorney."

### Terms page

- [X] T510 [US5] [P] Fill `pages/terms.html` `<section class="legal-page__hero">`: eyebrow "Legal", H1 "Terms of Service", "Last updated: 14 May 2026", 25–40-word lead.
- [X] T511 [US5] [P] Append `<aside class="legal-page__toc">`: H2 "In these terms" + `<ol>` with 6–7 anchor links.
- [X] T512 [US5] [P] Append `<article class="legal-page__body">` with 6+ numbered `<section id="section-N">` blocks: (1) Acceptance of terms, (2) Acceptable use, (3) Intellectual property, (4) Limitations of liability, (5) Governing law and dispute resolution, (6) Changes to these terms, (7) Contacting us. Plain language. Each section: 80–200 words.
- [X] T513 [US5] [P] Append the same `<section class="legal-page__cta">` pattern + footnote.

### Optional 404 page

- [X] T520 [US5] Fill `pages/404.html` `<main id="content">`: H1 "Page Not Found", 1-paragraph friendly message, 3 CTAs (Home, Projects, Contact) as a button group. No floating WhatsApp (excluded per the contract). Use the global header/footer shell as on every other page.

### US5 verification

- [X] T530 [US5] Run `npm run check` and confirm 38/38 (or 38/38 + 404) PASS. Open `pages/privacy.html` and `pages/terms.html`: confirm hero, TOC, 6+ sections each, bottom CTA + footnote. Click each TOC anchor — confirm page jumps to matching section. Forbidden-string grep: `grep -rEi 'lorem ipsum' pages/privacy.html pages/terms.html pages/404.html` returns zero matches. If 404 implemented, confirm it renders the shell.

**Checkpoint (US5 complete)**: Legal coverage complete. Site is legally presentable.

---

## Phase 8: User Story 6 — Final Frontend QA Confirms Client-Ready Polish (Priority: P2)

**Goal**: Execute the 10-item QA checklist from `research.md` R-13 across the entire site.

**Independent Test**: All 10 checklist items pass. Site is client-ready.

### Automated sweeps

- [X] T600 [US6] Run `npm run check` against the final 38-page set (39 with 404). Confirm `PASS` on all three gates. If any failure, debug per `quickstart.md`.
- [X] T601 [US6] Forbidden-string sweep: `grep -rEi 'lorem ipsum|lifesmart|ilifesmart|fusion link|ai builder|coss' index.html pages/` MUST return zero matches. Also check `pages/software.html` for any "certified" not in a Voice-context appropriate phrasing (carryover from Phase 04).
- [X] T602 [US6] Image-alt-text sweep: `grep -rE '<img[^>]*alt=""' index.html pages/` MUST return zero matches outside intentionally decorative images. Where decorative is intended, confirm the `<img>` also carries `aria-hidden="true"`.
- [X] T603 [US6] Heading-hierarchy sweep: confirm every page has exactly one `<h1>`. Run `grep -c '<h1[ >]' index.html pages/*.html` and confirm every file returns 1.
- [X] T604 [US6] CSS-budget delta check: rebuild `css/styles.css`; record minified size. Compare against the T001 baseline. Document the delta in MEMORY.md (or `tasks.md` final notes). If size exceeded 95 KB, run dedup pass.

### Manual browser sweeps

- [X] T610 [US6] [P] Console-error sweep: open every Phase 05 page in Chrome DevTools (initial load + key interactions: filter clicks on projects/blog, FAQ open on partners/contact, form submit on become-a-partner/contact, theme toggle, mobile-drawer toggle, gallery thumb click). Confirm zero errors, zero unhandled promise rejections, zero unexpected warnings.
- [X] T611 [US6] [P] Multi-viewport sweep at 360 / 414 / 768 / 1024 / 1280 / 1920 px on every Phase 05 page (`projects.html`, `project-luxury-villa.html`, `project-smart-hotel.html`, `project-smart-office.html`, `blog.html`, `article-smart-home-guide.html`, `article-villa-automation.html`, `article-hotel-smart-room.html`, `about.html`, `contact.html`, `privacy.html`, `terms.html`, `404.html`). Confirm no horizontal scroll, all imagery loads, global shell intact.
- [X] T612 [US6] [P] Theme-persistence sweep: on every Phase 05 page, toggle the theme, navigate to another Phase 05 page, confirm theme persists. Also verify cross-phase persistence (Phase 05 → Phase 01/02/03/04 pages).
- [X] T613 [US6] [P] Keyboard-only walkthrough on every Phase 05 page: Tab through every interactive element, confirm visible focus rings, confirm every filter chip / FAQ trigger / form control / CTA / floating WhatsApp / mobile drawer is reachable and operable.
- [X] T614 [US6] [P] Reduced-motion sweep: in DevTools force `prefers-reduced-motion: reduce`; verify on every Phase 05 page that filter clicks snap, FAQ open/close is instant, form submitting delay is 100 ms, floating WhatsApp hover has no transform, hero parallax (if any) is disabled.
- [X] T615 [US6] Navigation-graph audit: starting from `index.html`, walk to each of the 13 new Phase 05 pages. Confirm each is reachable from `index.html` in ≤ 2 clicks (typically via header nav, footer, or in-content CTA from a related page).

### Cross-cutting polish

- [X] T620 [US6] CSS dedup pass (deferred from T019 if budget over): scan `src/input.css` for duplicate declarations between Phase 04 component families (`.benefit-card`, `.partner-type-card`, `.package-card`) and Phase 05 families (`.about-card`, `.contact-channel-card`, `.project-card`, `.blog-card`). Where the visual treatment is identical, consolidate via either a shared base class or `@apply` patterns. Rebuild and confirm CSS is at or below the new target. If a meaningful reduction is not possible, document the deviation as a known issue in MEMORY.md (carryover treatment).
- [X] T621 [US6] Footer audit: confirm every Phase 05 page's footer is byte-identical (after path normalization) to the reference. The shell-consistency gate covers this, but spot-check the footer "Become a Partner", "Privacy Policy", "Terms of Service" links resolve correctly.
- [X] T622 [US6] Floating WhatsApp page-coverage audit: confirm `.floating-whatsapp` is rendered on every page in the contract's "YES" list (contact, become-a-partner, projects, project-*, blog, article-*, about) and is absent from every "NO" list page (index, products, product-*, solutions, solution-*, technology, software, partners, privacy, terms, 404). Use grep: `grep -l 'class="floating-whatsapp"' pages/*.html`.

### Final gate run

- [X] T630 [US6] Final `npm run check` run. Confirm 38/38 (or 39/39 with 404) PASS on all three gates. If any failure surfaces from earlier cross-cutting work, fix before declaring Phase 05 done.
- [X] T631 [US6] Update `MEMORY.md` and `project-zakey.md` auto-memory entries to reflect Phase 05 completion. Note final page count, final CSS size, any documented known-issues (CSS budget, WhatsApp placeholder phone number), and that the Zakey static frontend is now a complete deliverable.

**Checkpoint (US6 complete)**: Phase 05 is shippable. The Zakey website is complete as a static frontend deliverable. Constitution gates V/VI/VII green across all 38+ pages.

---

## Dependencies & Story Completion Order

```
Setup (Phase 1)
  ↓
Foundational (Phase 2)  ← creates all 13 stub pages, all CSS components, all SVGs, JS loader wiring
  ↓
  ├─→ US1 — Projects + 3 case studies (Phase 3, P1)   ← MVP unlocks here
  ├─→ US2 — Contact + quote form (Phase 4, P1)        (independent of US1 — can run in parallel)
  └─→ US3 — About page (Phase 5, P1)                  (independent of US1 + US2 — can run in parallel)
  ↓
  ├─→ US4 — Blog + 3 articles (Phase 6, P2)           (independent of US1/US2/US3)
  └─→ US5 — Legal + 404 (Phase 7, P2)                 (independent of every other story)
  ↓
US6 — Final QA pass (Phase 8, P2)                     ← validates the full site; runs last
```

**Key parallelism**:

- US1, US2, US3 are all entirely independent at the file level (each touches a different HTML file). After Foundational completes, three contributors can implement them in parallel.
- US4 (Blog + 3 articles) and US5 (Legal pages) are also independent of US1/US2/US3 once Foundational is done; a 5-contributor team could parallelize all five P1+P2 content stories.
- Inside Foundational, image-placeholder tasks T020–T042 are all `[P]` parallelizable (different files). CSS component tasks T010–T018 touch `src/input.css` so they should be sequenced by a single author or merged carefully.
- Inside US1, the three case-study detail pages (T120–T134) are all `[P]` parallelizable — three different files.
- Inside US4, the three article detail pages (T420–T432) are all `[P]` parallelizable.
- Inside US5, Privacy (T500–T503) and Terms (T510–T513) are parallelizable (different files).
- Inside US6, T610–T614 are all `[P]` parallelizable manual sweeps across the same set of pages — each contributor takes one sweep type.

**MVP scope**: Complete Setup + Foundational + US1 (Projects). Phase 05 reaches MVP after T140 — the credibility-funnel close is shippable. Add US2 (Contact) to enable conversion. Add US3 (About) for trust. The remaining US4/US5/US6 round out the deliverable.

**Full scope**: Complete all six user stories. The Zakey static frontend is then complete.

## Implementation Strategy

1. **Single contributor**: walk the phases in order — Setup → Foundational → US1 → US2 → US3 → US4 → US5 → US6. Each P1 story is a ~6–15-task batch with a clear verification step; the P2 stories are smaller batches.
2. **Parallel contributors (3–5)**: after Foundational completes and all three gates pass at 38/38 with stubs, contributors can take US1, US2, US3 in parallel. Add a fourth and fifth on US4 + US5 once those three start landing.
3. **Tight-time MVP**: complete only Setup + Foundational + US1 + US2 + US6 (skip US3, US4, US5). The Projects + Contact + final-QA stories deliver the credibility + conversion + polish core. The site is shippable; About/Blog/Legal can be a follow-up. (Note: Privacy/Terms are footer-linked from every page since Phase 04; skipping US5 means those links remain broken — fix them before shipping. The truly minimal "ship without US5" path requires footer-link removal.)

## Total Task Counts

| Phase | Tasks | Story | Priority |
|---|---|---|---|
| 1 — Setup | 5 (T001–T005) | – | – |
| 2 — Foundational | 48 (T010–T080) | – | – |
| 3 — US1 Projects + 3 case studies | 22 (T100–T140) | US1 | P1 |
| 4 — US2 Contact | 9 (T200–T250) | US2 | P1 |
| 5 — US3 About | 9 (T300–T310) | US3 | P1 |
| 6 — US4 Blog + 3 articles | 16 (T400–T440) | US4 | P2 |
| 7 — US5 Legal + 404 | 10 (T500–T530) | US5 | P2 |
| 8 — US6 Final QA | 16 (T600–T631) | US6 | P2 |
| **Total** | **~135 tasks** | | |
