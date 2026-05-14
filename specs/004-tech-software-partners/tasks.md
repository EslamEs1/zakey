---
description: "Task list for Zakey Phase 04 — Technology, Software, Partners & Become-a-Partner Pages"
---

# Tasks: Zakey Phase 04 — Technology, Software, Partners & Become-a-Partner Pages

**Input**: Design documents from `/specs/004-tech-software-partners/`
**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/`, `quickstart.md`

**Tests**: NOT included. The feature specification does not request unit/integration tests; verification is via the three bash integrity gates (`scripts/check-*.sh`) plus the manual viewport / keyboard / forbidden-string passes documented in `quickstart.md`. Browser test framework remains explicitly out of scope (carried forward from Phase 01–03).

**Organization**: Tasks are grouped by user story per the spec's priorities (US1/US2/US3 are P1, US4 is P2). The Foundational phase deliberately produces minimal page stubs for **all four** new pages plus the site-wide nav mass-update so that each P1 user story can be filled out and verified independently against passing gates.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no incomplete dependencies)
- **[Story]**: Maps task to user story (US1 / US2 / US3 / US4)
- All file paths are repo-root-relative.

## Path Conventions

Flat static-site layout at the repo root, extended (not restructured) from Phase 01–03: `index.html`, `pages/`, `src/`, `assets/css/`, `assets/images/`, `assets/icons/`, `js/`, `scripts/`. See `plan.md` § Project Structure.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Verify the Phase 01–03 toolchain still works against Phase 04 file expectations, scaffold the three new JS module stubs, and confirm new asset directories are in place. No HTML content authored yet.

- [x] T001 Verify Phase 01–03 toolchain operates against the current tree: `npm install` exits 0; `npm run build:css` rebuilds `assets/css/site.css` from `src/input.css` without warnings; `npm run check` exits 0 against the existing 24-page file set. Record the current CSS file size in bytes (baseline for the 72 KB budget gate in Polish). **Baseline: 74 KB (75,355 bytes). All three gates PASS 24/24. ⚠️ CSS already 3 KB over 72 KB cap — T017 MUST trim before adding Phase 04 CSS.**
- [x] T002 [P] Create empty stub `js/faq.js` exporting `export function initFaq() { /* TODO: Phase 04 single-open accordion */ }`. File must be a valid ES module; no behavior yet.
- [x] T003 [P] Create empty stub `js/become-a-partner.js` exporting `export function initApplicationForm() { /* TODO: Phase 04 application form */ }`. ES module, no behavior yet.
- [x] T004 [P] Create empty stub `js/scroll-spy.js` exporting `export function initScrollSpy() { /* TODO: Phase 04 optional anchor-nav highlight */ }`. ES module, no behavior yet.
- [x] T005 [P] Create new asset directories `assets/images/software/` and `assets/images/partners/`. The directory `assets/images/technology/` already exists from Phase 01 (carries Phase 02/03 SVGs). Add a `.gitkeep` to each new directory.

**Checkpoint**: Toolchain green; three JS module stubs in place; `assets/images/software/` and `assets/images/partners/` exist as empty namespaced folders.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Author every shared CSS component family, every new image placeholder, the four minimal page stubs, the site-wide header/footer nav-expansion mass-update, the JS loader wiring, and the integrity-gate file-count bump — in one phase — so that all three gates pass with 28/28 stub pages and every downstream user story can be filled in and verified independently.

**⚠️ CRITICAL**: No user-story work begins until this phase completes and all three gates pass on 28/28 minimal pages.

### CSS component families (extend `src/input.css` only)

- [x] T010 Append the **pillar-card component family** to `src/input.css` inside `@layer components`, per `contracts/pillar-card.contract.md`: `.pillar` (section wrapper), `.pillar-grid` (page-level grid), `.pillar-card`, `.pillar-card__visual`, `.pillar-card__body`, `.pillar-card__eyebrow`, `.pillar-card__title`, `.pillar-card__positioning`, `.pillar-card__copy`, `.pillar-card__bullets`, `.pillar-card__cta`, plus an `:nth-child(even) .pillar-card` (or `[data-flip="true"]`) flip rule for Software-page alternation. Use only existing `:root` channel tokens. Mobile: `.pillar-card__visual` stacks above `.pillar-card__body` at < 768 px.
- [x] T011 Append the **diagram-frame component** to `src/input.css`: `.diagram-frame` (premium-dark surface treatment with subtle inner border and corner glow), `.diagram-frame--full` (full-bleed variant escaping the container for the Technology ecosystem diagram), `.diagram-frame__caption`. Reuses Phase 02 surface tokens; adds no new colors.
- [x] T012 Append the **partner-type-card + benefit-card + journey-step component families** to `src/input.css` per `contracts/partners-page.contract.md`: `.partner-types`, `.partner-type-card`, `.partner-type-card__icon`, `.partner-type-card__cta`, `.partner-benefits`, `.benefit-grid`, `.benefit-card`, `.benefit-card__icon`, `.benefit-card__title`, `.benefit-card__desc`, `.partner-journey`, `.journey-step-list` (uses `counter-reset: journey`), `.journey-step` (uses `counter-increment: journey`), `.journey-step::before` (numeric badge via `content: counter(journey)`), `.journey-step__title`, `.journey-step__desc`, `.journey-step__duration`. Mobile: journey collapses to a vertical timeline with the badge on the left and the content on the right.
- [x] T013 Append the **package-card + partner-final-cta components** to `src/input.css`: `.partner-packages`, `.package-card`, `.package-card__visual`, `.package-card__title`, `.package-card__summary`, `.package-card__cta`, `.partner-final-cta`. Mirrors the Phase 03 `.solution-card` proportions but on a darker elevated surface.
- [x] T014 Append the **faq-item component family** to `src/input.css` per `contracts/faq-accordion.contract.md`: `.faq`, `.faq-item` (styles applied to `<details>`), `.faq-item__trigger` (styles for `<summary>`, including focus-visible ring), `.faq-item__question`, `.faq-item__chevron` (rotates 180° when `[open]`), `.faq-item__panel`, `[data-faq-mode="single"]` selector hook. Use `interpolate-size: allow-keywords` for the open/close height transition; wrap the entire transition block in `@media (prefers-reduced-motion: no-preference)` so reduced-motion users get an instant snap.
- [x] T015 Append the **form-field + app-form component families** to `src/input.css` per `contracts/partner-application-form.contract.md`: `.app-form`, `.app-form__grid` (1-col mobile / 2-col tablet / 3-fieldset desktop), `.app-form__group` (fieldset styling with `<legend>`), `.form-field`, `.form-field__label`, `.form-field__req` (the asterisk), `.form-field__error` (red text, hidden by default), `.form-field--consent` (checkbox layout), `.form-error-summary`, `.app-form input[aria-invalid="true"]`, `.app-form select[aria-invalid="true"]`, `.app-form textarea[aria-invalid="true"]`, `.form-field[data-field-state="valid"]` (success affordance), `[data-form-state="submitting"]` (disabled visual on the form), `.app-success` (styled success card), `.app-success__cta`. Both themes must look correct.
- [x] T016 Append the **tech-intro + tech-hero + sw-hero + partner-hero + app-hero hero variants** to `src/input.css`: shared `.tech-hero`, `.sw-hero`, `.partner-hero`, `.app-hero` (each is a thin variant on the existing hero pattern from Phase 03 — different copy ratios, no new tokens), plus `.tech-intro` (the 2–4-paragraph intro section just below the Technology hero) and `.pillar-nav` (the optional anchor-nav with `aria-current="true"` highlighting).
- [x] T017 Run `npm run build:css` and confirm the rebuilt `assets/css/site.css` is ≤ 72 KB. If it exceeds the budget, identify and remove redundant declarations (e.g., copy-paste duplication from Phase 02 `.product-features__card` into the new Phase 04 cards) before any user-story work begins. Record the new size in a comment at the top of `src/input.css`.

### Image placeholders (SVG only — see research.md R-10 for the full list)

- [x] T020 [P] Create `assets/images/technology/zakey-intelligence-hero.svg` — Technology page hero. Premium-dark SVG of a connected-home network / device ecosystem with subtle cyan accents. ≤ 30 KB. Phase 03 visual style.
- [x] T021 [P] Create `assets/images/technology/zakey-link-architecture.svg` — Pillar 1 diagram showing hybrid wired+wireless fabric. Use only Zakey-original labels (no reference-site protocol names).
- [x] T022 [P] Create `assets/images/technology/scene-intelligence.svg` — Pillar 2 visual showing scene rules / AI-assisted automation. Five scene chips labelled: Wake Up, Away, Good Night, Guest, Meeting.
- [x] T023 [P] Create `assets/images/technology/multi-protocol.svg` — Pillar 3 visual showing six protocols radiating from a central hub: Wi-Fi, Zigbee 3.0, BLE, Matter-ready, IR, wired. No certification badges.
- [x] T024 [P] Create `assets/images/technology/secure-smart-living.svg` — Pillar 4 visual: shield, key, role-token icons over a dark gradient. Encryption-ready / privacy-first iconography.
- [x] T025 [P] Create `assets/images/technology/energy-intelligence.svg` — Pillar 5 visual: lighting, climate, plug, meter icons with energy-arc indicators.
- [x] T026 [P] Create `assets/images/technology/scalable-deployment.svg` — Pillar 6 visual: room-template grid + repeatable-scene chain + central-monitoring dashboard.
- [x] T027 [P] Create `assets/images/software/zakey-platform-hero.svg` — Software page hero, composite mockup (phone + panel + dashboard).
- [x] T028 [P] Create `assets/images/software/zakey-app-mockup.svg` — phone screen mockup showing the Zakey mobile app home screen.
- [x] T029 [P] Create `assets/images/software/zakey-control-panels.svg` — wall-mounted control panel mockup with scene tiles.
- [x] T030 [P] Create `assets/images/software/zakey-scenes.svg` — scene-builder visualization (chain of conditions → actions).
- [x] T031 [P] Create `assets/images/software/zakey-voice.svg` — voice-assistant integration visual. Text labels only — NO third-party brand glyphs.
- [x] T032 [P] Create `assets/images/software/zakey-dashboard.svg` — business/project dashboard mockup with KPI tiles and a building schematic.
- [x] T033 [P] Create `assets/images/software/zakey-insights.svg` — energy & device insights chart visualization.
- [x] T034 [P] Create `assets/images/software/zakey-guest-experience.svg` — hotel room control panel showing a welcome message + scene tiles.
- [x] T035 [P] Create `assets/images/partners/zakey-partners.svg` — Partners page hero, B2B handshake / building-meets-home imagery.
- [x] T036 [P] Create six `assets/images/partners/<id>.svg` partner-type icons: `distributor.svg`, `system-integrator.svg`, `developer.svg`, `installer.svg`, `interior-designer.svg`, `hotel-operator.svg`. Each is a small (≤ 4 KB) iconographic SVG, consistent visual language.
- [x] T037 [P] Create four `assets/images/partners/package-<id>.svg` use-case package visuals: `package-smart-villa.svg`, `package-smart-apartment.svg`, `package-hotel-room.svg`, `package-office-automation.svg`. Each shows the target space at a glance.

### Four minimal page stubs (with correct shell, single `<h1>`, `<body data-page>`)

- [x] T040 Create or REWRITE `pages/technology.html` as a minimal stub: complete site `<head>` (charset, viewport, `<title>The Intelligence Behind Zakey — Zakey Smart Living</title>`, meta description, canonical, OG/Twitter tags, theme-color, favicon, anti-flash theme script, `<link rel="stylesheet" href="../assets/css/site.css">`), `<body data-page="technology">`, full site `<header>` and `<footer>` (will be byte-identical to all other pages after T050), and a `<main id="content">` containing only `<h1>The Intelligence Behind Zakey Smart Living</h1>` and a single placeholder `<p>` (will be filled out in Phase 3 / US1).
- [x] T041 Create or REWRITE `pages/software.html` as a minimal stub matching T040's pattern. `<title>Zakey Software Platform — Zakey Smart Living</title>`, `<body data-page="software">`, `<h1>Control Every Space from One Intelligent Experience</h1>` placeholder.
- [x] T042 Create or REWRITE `pages/partners.html` as a minimal stub matching T040's pattern. `<title>Partner with Zakey — Zakey Smart Living</title>`, `<body data-page="partners">`, `<h1>Grow with Zakey Smart Living</h1>` placeholder.
- [x] T043 Create NEW `pages/become-a-partner.html` as a minimal stub matching T040's pattern. `<title>Become a Partner — Zakey Smart Living</title>`, `<body data-page="become-a-partner">`, `<h1>Apply to Partner with Zakey</h1>` placeholder.

### Site-wide header/footer mass-update (nav-expansion contract)

- [x] T050 Atomic mass-update of the **primary header nav** across **all 28 final HTML files** (the existing 24 + the four stubs from T040–T043) per `contracts/nav-expansion.contract.md`: replace the existing nav `<ul>` with the new 10-item set (Home, Products, Solutions, **Technology**, **Software**, **Partners**, Projects, Blog, About, Contact) in the exact order specified. Use the same per-page relative-prefix pattern as Phase 03 (`./` on `index.html`, `../` on `pages/*.html`). The script must be byte-identical-producing across all 28 pages after path normalization. Apply the same change to the **mobile drawer** `<ul>` on every page.
- [x] T051 Atomic mass-update of the **footer** across all 28 pages: add `<a href="<prefix>become-a-partner.html">Become a Partner</a>` to the appropriate footer link column (e.g., "Company" or "Partners"). The footer markup must remain byte-identical (after path normalization) across all 28 pages.
- [x] T052 Run `scripts/check-shell-consistency.sh` against the current 28-page set and confirm it reports `PASS` — i.e., header and footer hash identically across all pages after path normalization. The gate's hard-coded expected-file-count is still 24 at this point and will fail loudly; that's the cue to advance to T053.
- [x] T053 Bump the hard-coded expected-file-count from `24` to `28` in `scripts/check-shell-consistency.sh`. This is a single-line change (look for the `EXPECTED_FILES=24` or equivalent constant). Run the script again and confirm `PASS — 28/28 files`.
- [x] T054 Bump the hard-coded expected-file-count from `24` to `28` in `scripts/check-content-rules.sh`. Single-line change. Run and confirm `PASS — 28/28 files`.
- [x] T055 Bump the hard-coded expected-file-count from `24` to `28` in `scripts/check-links.sh`. Single-line change. Run and confirm `PASS — 28/28 files, 0 failures`.

### JS loader wiring

- [x] T060 Edit `js/main.js`: add the conditional imports for the three new modules at the bottom of the `DOMContentLoaded` handler — `if (document.querySelector('[data-faq]')) import('./faq.js').then(m => m.initFaq());`, `if (document.body.dataset.page === 'become-a-partner') import('./become-a-partner.js').then(m => m.initApplicationForm());`, and `if (document.body.dataset.page === 'technology' && document.querySelector('.pillar-nav')) import('./scroll-spy.js').then(m => m.initScrollSpy());`. Do not remove or reorder existing imports.

### Foundational checkpoint

- [x] T070 Run `npm run check` and confirm all three gates pass `28/28 files`. Run `npm run build:css` and confirm `assets/css/site.css` is ≤ 72 KB. Open each of the four stub pages in a browser and confirm they render the global shell correctly under both themes. Confirm no console errors.

**Checkpoint**: All 28 pages exist with the new shell; all three integrity gates pass at 28/28; CSS budget is within 72 KB; the four new pages have minimal-but-valid bodies. Every downstream user story can now be implemented and verified independently.

---

## Phase 3: User Story 1 — Architect Validates Zakey's Technology Credibility (Priority: P1) 🎯 MVP

**Goal**: Fill out `pages/technology.html` with the full six-pillar story, ecosystem diagram, and final CTA so that a B2B prospect can validate Zakey's technical credibility within 2 minutes of scanning.

**Independent Test**: Open `pages/technology.html` directly in a browser. Hero shows the exact title from FR-010, intro paragraphs explain the combined hardware/automation/connectivity/deployment story, all six pillars (Link Architecture, Scene Intelligence, Multi-Protocol, Secure Smart Living, Energy Intelligence, Scalable Deployment) appear with named subsystems, dedicated diagrams, and 4–6 capability bullets, the ecosystem diagram renders inline, and the final CTA section links to Partners and Contact. Gate 1+2+3 all pass.

### Hero, intro, and anchor nav

- [x] T100 [US1] Fill the `pages/technology.html` `<section class="tech-hero">`: `<h1>The Intelligence Behind Zakey Smart Living</h1>` + 12–25-word subtitle + primary CTA `<a class="btn btn--primary" href="partners.html">Become a Partner</a>` + secondary CTA `<a class="btn btn--ghost" href="contact.html">Get a Quote</a>` + `<img src="../assets/images/technology/zakey-intelligence-hero.svg" alt="Connected smart-home network with cyan signal pathways linking rooms, devices, and a central Zakey hub" loading="lazy">`. Use the existing hero markup pattern from Phase 03 detail pages.
- [x] T101 [US1] Append `<section class="tech-intro">` after the hero: 3 short paragraphs (60–90 words each) explaining that Zakey combines elegant hardware, smart automation, secure connectivity, and scalable project deployment. Tone is confident, premium, non-jargon. Original Zakey copy only; no reference-site phrasing.
- [x] T102 [US1] Append `<nav class="pillar-nav" aria-label="Technology pillars">` after the intro: six `<a href="#<pillar-id>">` anchors in DOM order matching `data-model.md` § 1 (Link Architecture, Scene Intelligence, Multi-Protocol, Secure Smart Living, Energy Intelligence, Scalable Deployment). Anchors carry their display names.

### Six pillar sections (each a `<section class="pillar">` per the pillar-card contract)

- [x] T110 [US1] Append `<section class="pillar" id="link-architecture" data-pillar="link-architecture">` with the full pillar-card structure: H2 "Zakey Link Architecture", positioning sentence, 75–200-word body, 4–6 capability bullets, visual `<img>` from T021, outgoing CTA to `pages/partners.html`. Body must describe the hybrid wired+wireless fabric and its suitability for villas, apartments, hotels, offices, and compounds. No reference-site protocol names. See `contracts/pillar-card.contract.md`.
- [x] T111 [US1] Append `<section class="pillar" id="scene-intelligence">` per the pillar-card contract: H2 "Zakey Scene Intelligence", positioning sentence, body covering automation rules + AI-assisted scenes, 4–6 capability bullets that explicitly name the five example scenes (Wake Up, Away, Good Night, Guest, Meeting), visual from T022, outgoing CTA to a relevant Solutions detail page (e.g., `pages/solution-smart-villa.html`).
- [x] T112 [US1] Append `<section class="pillar" id="multi-protocol">` per the pillar-card contract: H2 "Multi-Protocol Compatibility", positioning sentence, body that lists exactly six protocols (Wi-Fi, Zigbee 3.0, Bluetooth LE, Matter-ready, IR, wired control). Body MUST avoid words "certified", "official", and any specific certification tier name (research.md R-05). 4–6 capability bullets. Visual from T023. CTA to `pages/partners.html`.
- [x] T113 [US1] Append `<section class="pillar" id="secure-smart-living">` per the pillar-card contract: H2 "Secure Smart Living", positioning sentence, body covering encryption-ready messaging, privacy-first design, secure device pairing, and role-based project control. 4–6 capability bullets. Visual from T024. CTA to `pages/partners.html`.
- [x] T114 [US1] Append `<section class="pillar" id="energy-intelligence">` per the pillar-card contract: H2 "Energy Intelligence", positioning sentence, body covering lighting optimization, climate efficiency, smart-plug/meter integration, and usage insights. 4–6 capability bullets. Visual from T025. CTA to `pages/solutions.html` (links into the Solutions overview).
- [x] T115 [US1] Append `<section class="pillar" id="scalable-deployment">` per the pillar-card contract: H2 "Scalable Project Deployment", positioning sentence, body covering room templates, repeatable scenes, and central monitoring for developers/hotels/integrators. 4–6 capability bullets. Visual from T026. CTA to `pages/partners.html`.

### Ecosystem diagram + final CTA

- [x] T120 [US1] Append `<section class="ecosystem-diagram">` after the six pillars: `<h2>The Zakey Ecosystem</h2>` + 20–50-word caption paragraph + inline `<svg viewBox="..." aria-label="..." class="diagram-frame diagram-frame--full">` of ≤ 25 KB minified. Diagram depicts: central Zakey hub node, four protocol-layer rings (Wi-Fi, Zigbee, BLE, Matter-ready), eight categorized device clusters (lighting, climate, security, sensors, blinds, voice, panels, app), and three outgoing integrations (mobile app, business dashboard, voice assistants). All text in the SVG uses `<text>` elements (not paths). Use existing `var(--color-*)` tokens via CSS custom properties so the diagram theme-shifts. See `research.md` R-06.
- [x] T121 [US1] Append `<section class="tech-final-cta">` at the bottom of `<main>`: heading "Ready to Build with Zakey?", short 1–2-sentence body, and two CTAs — primary `<a class="btn btn--primary" href="partners.html">Become a Partner</a>` and secondary `<a class="btn btn--ghost" href="contact.html">Get a Quote</a>`.

### Optional anchor-nav scroll-spy (progressive enhancement)

- [x] T130 [US1] Implement `js/scroll-spy.js`'s `initScrollSpy()` per `research.md` R-02: use `IntersectionObserver` to track each `<section class="pillar">`; when one is at least 30% visible, set `aria-current="true"` on the matching `<a href="#...">` inside `.pillar-nav` and remove it from all other anchors. Skip activation entirely when `prefers-reduced-motion: reduce` is true (anchors still work; only the highlight is suppressed). Total module ≤ 1.5 KB.

### US1 verification

- [x] T140 [US1] Run `npm run check` and confirm all three gates still pass `28/28`. Open `pages/technology.html` in a browser; confirm the hero, intro, all six pillars, ecosystem diagram, and final CTA render correctly under both themes. Confirm every CTA resolves to a real file. Confirm no console errors. Confirm the anchor nav (T102) jumps to each pillar; if scroll-spy was added, confirm `aria-current="true"` follows the visible pillar on scroll.

**Checkpoint (US1 MVP)**: Technology page is complete and shippable independently. Phase 04 has reached MVP: a returning visitor can land on Technology and proceed to Partners.

---

## Phase 4: User Story 2 — Operator Explores Zakey's Software Ecosystem (Priority: P1)

**Goal**: Fill out `pages/software.html` with the full seven-pillar platform tour and the demo/quote CTAs so that a hotel ops director or property developer can evaluate Zakey's software experience.

**Independent Test**: Open `pages/software.html`. Hero shows the exact title from FR-020, all seven pillars (Mobile App, Control Panels, Scenes, Voice, Dashboard, Insights, Guest Experience) appear with mockups and 3–5 capability bullets, the Voice pillar uses "works with" wording only, and the final CTA links resolve. Gate 1+2+3 all pass at 28/28.

### Hero

- [x] T200 [US2] Fill the `pages/software.html` `<section class="sw-hero">`: `<h1>Control Every Space from One Intelligent Experience</h1>` + 12–25-word subtitle + primary CTA `<a class="btn btn--primary" href="contact.html">Request a Demo</a>` + secondary CTA `<a class="btn btn--ghost" href="become-a-partner.html">Become a Partner</a>` + `<img src="../assets/images/software/zakey-platform-hero.svg" alt="Zakey software platform — phone, wall panel, and operator dashboard shown in unified visual language">`.

### Seven pillar sections (each per pillar-card contract; alternate visual side)

- [x] T210 [US2] Append `<section class="pillar" id="mobile-app" data-pillar="mobile-app" data-audience="resident">`: H2 "Zakey Mobile App", positioning sentence, 75–150-word body, 3–5 capability bullets, mockup from T028, CTA to `pages/contact.html`.
- [x] T211 [US2] Append `<section class="pillar" id="control-panels" data-flip="true" data-audience="resident">`: H2 "Zakey Control Panels", same shape, mockup from T029. Flip layout so visual is on the right.
- [x] T212 [US2] Append `<section class="pillar" id="scenes" data-audience="resident">`: H2 "Smart Scenes & Automation", body covering scene-builder UX, 3–5 bullets, visual from T030.
- [x] T213 [US2] Append `<section class="pillar" id="voice" data-flip="true" data-audience="resident">`: H2 "Voice Assistant Integration", body that mentions Alexa, Google Assistant, and Siri Shortcuts using **"works with"** / **"compatible with"** language ONLY. NO certification claims, NO third-party brand glyphs in the markup. 3–5 bullets. Visual from T031. See `research.md` R-04.
- [x] T214 [US2] Append `<section class="pillar" id="dashboard" data-audience="operator">`: H2 "Business / Project Dashboard", body targeted at hotel operators / facility managers / system integrators (multi-property, role-based), 3–5 bullets, mockup from T032, CTA to `pages/become-a-partner.html`.
- [x] T215 [US2] Append `<section class="pillar" id="insights" data-flip="true" data-audience="operator">`: H2 "Energy & Device Insights", body covering analytics, anomaly detection, scheduled reports, 3–5 bullets, visual from T033.
- [x] T216 [US2] Append `<section class="pillar" id="guest-experience" data-audience="guest">`: H2 "Guest / Hotel Room Experience", body covering welcome screens, in-room controls, check-out flow, 3–5 bullets, visual from T034, CTA to `pages/solution-smart-hotel.html`.

### Final CTA

- [x] T220 [US2] Append `<section class="sw-final-cta">`: heading "See Zakey Software in Action", short body, two CTAs — primary "Request a Demo" → `pages/contact.html`, secondary "Become a Partner" → `pages/become-a-partner.html`.

### US2 verification

- [x] T230 [US2] Run `npm run check` and confirm `28/28` PASS on all three gates. Open `pages/software.html` in a browser; confirm the hero, all seven pillars (with alternating visual side), and final CTA render correctly under both themes. Confirm the Voice pillar contains NO occurrences of "certified", "official", or any third-party brand glyph (grep the file). Confirm every CTA resolves.

**Checkpoint (US2 complete)**: Technology + Software pages are complete and shippable independently.

---

## Phase 5: User Story 3 — Prospective Partner Self-Qualifies and Applies (Priority: P1)

**Goal**: Fill out `pages/partners.html` (program landing) and `pages/become-a-partner.html` (application form) — these ship together because the Partners CTAs all point to the form. After this phase, a qualified B2B lead can complete the funnel in one session.

**Independent Test**: Open `pages/partners.html`. All six partner-type cards, seven benefits, six journey steps, four use-case packages, and six+ FAQ items render. Click any partner-type CTA — it goes to `pages/become-a-partner.html`. On the form, submit empty: error summary appears, first invalid field is focused. Fill all 13 fields with valid content, submit: form transitions through `submitting` to `success`, URL hash becomes `#application-received`. Click "Edit & resubmit": form returns. Keyboard-only walkthrough works. Both themes work. Gate 1+2+3 all pass at 28/28.

### Partners page — hero, who-we-work-with, benefits, journey, packages, final CTA

- [x] T300 [US3] Fill the `pages/partners.html` `<section class="partner-hero">`: `<h1>Grow with Zakey Smart Living</h1>` + 15–30-word B2B positioning subtitle + primary CTA `<a class="btn btn--primary" href="become-a-partner.html">Become a Partner</a>` + `<img src="../assets/images/partners/zakey-partners.svg" alt="...">` from T035.
- [x] T301 [US3] Append `<section class="partner-types" aria-labelledby="who-we-work-with">`: `<h2 id="who-we-work-with">Who We Work With</h2>` + a grid of six `<article class="partner-type-card">` elements per `data-model.md` § 3. Each card: icon from T036, displayName as `<h3>`, 12–25-word description, inline CTA `<a class="partner-type-card__cta" href="become-a-partner.html">Apply as a <Type></a>`. Order: Distributor, System Integrator, Real Estate Developer, Installer, Interior Design Office, Hotel & Hospitality Operator.
- [x] T302 [US3] Append `<section class="partner-benefits" aria-labelledby="benefits-heading">`: `<h2 id="benefits-heading">Why Partner with Zakey</h2>` + a 3-col-desktop / 2-col-tablet / 1-col-mobile grid of seven `<article class="benefit-card">` items per `data-model.md` § 4 (Premium Product Portfolio, Project-Ready Smart Ecosystem, Sales & Marketing Support, Technical Documentation, Training & Onboarding, Demo & Showroom Support, Scalable Solutions for Large Projects). Each card: inline SVG icon, displayName as `<h3>`, 10–20-word description.
- [x] T303 [US3] Append `<section class="partner-journey" aria-labelledby="journey-heading">`: `<h2 id="journey-heading">Your Partner Journey</h2>` + `<ol class="journey-step-list">` with six `<li class="journey-step">` items per `data-model.md` § 5. Each step: displayName as `<h3>`, 10–20-word description, optional `<span class="journey-step__duration">` durationHint. Order: Apply → Consultation → Product Training → Demo Setup → First Project → Ongoing Support. CSS counter-reset/counter-increment renders the numeric badges.
- [x] T304 [US3] Append `<section class="partner-packages" aria-labelledby="packages-heading">`: `<h2 id="packages-heading">Ready-Made Project Packages</h2>` + a grid of four `<article class="package-card">` items per `data-model.md` § 6. Each card: visual from T037, displayName as `<h3>`, 12–20-word summary, CTA `<a class="package-card__cta" href="<linkedSolutionPage>">View Solution Detail →</a>`. Packages link to existing Phase 03 detail pages: Smart Villa → `pages/solution-smart-villa.html`, Smart Apartment → `pages/solution-smart-apartment.html`, Hotel Room → `pages/solution-smart-hotel.html`, Office Automation → `pages/solution-smart-office.html`.
- [x] T305 [US3] Append `<section class="partner-final-cta">`: heading "Ready to Grow with Zakey?", short body, primary CTA `<a class="btn btn--primary" href="become-a-partner.html">Become a Partner</a>`.

### Partners page — FAQ accordion HTML + JS

- [x] T310 [US3] Append `<section class="partner-faq" aria-labelledby="faq-heading">` before the final CTA: `<h2 id="faq-heading">Partner Program Questions</h2>` + `<div class="faq" data-faq data-faq-mode="single">` containing exactly six `<details class="faq-item" id="faq-<id>">` elements per `data-model.md` § 7. Each `<details>`: `<summary class="faq-item__trigger" aria-expanded="false">` with the question text and a chevron SVG, followed by `<div class="faq-item__panel">` with 30–150-word answer (may contain `<p>`, `<strong>`, `<em>`, `<a>`, `<ul>`, `<li>`). Topics (binding): territory exclusivity, minimum order/project, training availability, lead time/stock, marketing co-op, project pricing. See `contracts/faq-accordion.contract.md`.
- [x] T311 [US3] Implement `js/faq.js`'s `initFaq()` per `contracts/faq-accordion.contract.md`: select every `[data-faq]` container, find its child `<details>` elements, on each `<details>`'s `toggle` event update the matching `<summary>`'s `aria-expanded` attribute; if the container has `data-faq-mode="single"` and a `<details>` opened, set every sibling's `open` to `false`. Total module ≤ 3 KB. Respect `prefers-reduced-motion` (no JS animation; rely on CSS `@media`).

### Become a Partner page — hero, form, success state

- [x] T320 [US3] Fill the `pages/become-a-partner.html` `<section class="app-hero">`: `<h1>Apply to Partner with Zakey</h1>` + 2–3 short paragraphs explaining what happens after submission (response SLA "within 3 business days", contact channel "via the email or phone you provide", next-step preview "a 30-minute discovery call"). No CTA buttons in the hero — the form is the action.
- [x] T321 [US3] Append `<section class="app-form-section">` containing the full `<form id="partner-application" class="app-form" data-form-state="idle" novalidate>` per `contracts/partner-application-form.contract.md`. Inside the form, in order:
  - `<div class="form-error-summary" role="alert" aria-live="polite" hidden></div>`
  - `<div class="app-form__grid">` containing three `<fieldset class="app-form__group">` blocks: Contact (fields 1–8: partnerType, fullName, company, country, city, email, phone, website), Business (fields 9–11: businessType, projectVolume, interestedSolutions), Project (fields 12–13: message, consent).
  - Each `.form-field` carries its label, required marker, control element with `aria-describedby="<id>-error"` and `aria-required` where required, and an adjacent `<p class="form-field__error" id="<id>-error" role="alert" hidden></p>`.
  - The `partnerType` `<select>` lists the six PartnerType IDs from `data-model.md` § 3.
  - The `businessType` is a `<select>` with options: Retail Store, Smart Home Reseller, AV/CI Integrator, Construction & Real Estate, Hospitality Group, Other.
  - The `projectVolume` is a `<select>` with options matching `data-model.md` § 8: `1-5`, `6-25`, `26-100`, `100+`, `recurring`.
  - The `interestedSolutions` is a `<fieldset>` of eight `<input type="checkbox">` matching the eight existing Solutions slugs (Smart Villa, Smart Apartment, Smart Hotel, Smart Office, Smart Compound, Gaming Room, Elderly Care, Smart Retail).
  - The `consent` is a single `<input type="checkbox" required>` with label "I agree to be contacted by Zakey about my application and acknowledge the <a href='privacy.html'>Privacy notice</a>."
  - A single `<button type="submit" class="btn btn--primary">Submit Application</button>` after the grid.
- [x] T322 [US3] Append `<section class="app-success" data-form-success hidden aria-live="polite">` after the form section: `<h2>Application Received</h2>` + 1–2 short paragraphs describing next steps and SLA + a `.app-success__cta` block with `<a href="partners.html" class="btn btn--ghost">← Back to Partners</a>` and `<button type="button" class="btn btn--ghost" data-edit-application>Edit & resubmit</button>`.
- [x] T323 [US3] Implement `js/become-a-partner.js`'s `initApplicationForm()` per `contracts/partner-application-form.contract.md`:
  - On import, attach a `submit` listener on `#partner-application` that prevents default, runs per-field validators, and routes through the `idle → validating → submitting → success` state machine.
  - Each field has a validator: required-empty, format (email, phone after stripping non-digits, URL starting with `http://`/`https://`), at-least-one-checkbox (for `interestedSolutions`), must-be-checked (for `consent`).
  - On each control's `blur` event, IF the control has been `focus`-ed before (track via a `WeakSet` of touched fields), re-run that field's validator and set `data-field-state="valid|invalid"` on the wrapping `.form-field`, toggle `aria-invalid` on the control, and show/hide the matching `.form-field__error` with the per-field error message.
  - On failed submit: populate `.form-error-summary` with "Found N error(s). Please fix to continue.", unhide it, move focus to the first invalid control, scroll the summary into view if not already visible.
  - On valid submit: set `data-form-state="submitting"`, wait 400 ms (or 100 ms under `prefers-reduced-motion`), then set `data-form-state="success"`, set the `hidden` attribute on the `<form>`'s parent section, remove `hidden` from `[data-form-success]`, set `window.location.hash = 'application-received'`, scroll the success section into view, and focus its `<h2>` (with `tabindex="-1"`).
  - On `[data-edit-application]` click: hide the success section, unhide the form section, clear the URL hash via `history.replaceState({}, '', window.location.pathname)`, and return focus to the form's submit button.
  - The `message` textarea enforces a soft 2000-char cap via `input` event handler; a live counter updates a sibling `<span class="form-field__counter">X / 2000</span>`.
  - Total module ≤ 5 KB.

### US3 verification

- [x] T330 [US3] Run `npm run check` and confirm `28/28 PASS` on all three gates. Open `pages/partners.html`: confirm all six partner-type cards, seven benefits, six journey steps, four packages, six+ FAQ items render under both themes. Open the FAQ and confirm single-open mode (opening one closes others). Click each partner-type CTA → confirms it lands on the Become a Partner page.
- [x] T331 [US3] Manual keyboard-only walkthrough of `pages/become-a-partner.html`: Tab through every field; submit empty → confirms error summary, first-field focus; fill every field invalidly → confirms per-field error messages on blur; fill every field validly → confirms `submitting` then `success` state, `#application-received` hash, Edit & resubmit roundtrip. Both themes verified.

**Checkpoint (US3 complete)**: Technology + Software + Partners + Become-a-Partner pages are all complete. The B2B credibility funnel is fully shippable.

---

## Phase 6: User Story 4 — Cross-Page Consistency (Priority: P2)

**Goal**: Confirm the global navigation, theme persistence, mobile drawer, footer, and link integrity are byte-identical across all 28 pages (including the four new Phase 04 pages). This phase is **mostly validation** — Phase 2 already did the mass-update; this phase is the explicit confirm-and-fix pass.

**Independent Test**: Run `npm run check` and confirm all three gates pass at 28/28. Manually navigate via the header from each Phase 04 page to every other top-level nav target and back; every link resolves; the active-nav indicator follows; the theme toggle persists across navigation.

- [x] T400 [US4] Verify `<body data-page="...">` is set on all four Phase 04 pages with the correct slug (`technology`, `software`, `partners`, `become-a-partner`). Verify the existing `js/navigation.js` active-nav-mapping handles these four `data-page` values. If the navigation module's mapping table needs to be extended for `become-a-partner` → highlights the `Partners` nav item, patch it.
- [x] T401 [US4] Manual navigation walkthrough: from each Phase 04 page, click each top-level nav anchor and confirm the destination loads. Confirm the active-nav indicator is correctly applied. Confirm the mobile drawer mirrors the 10-item primary nav and closes-on-link-click.
- [x] T402 [US4] Manual theme-persistence walkthrough: on each Phase 04 page, toggle the theme, navigate to another Phase 04 page, confirm theme persisted (`localStorage.zakey-theme` reused from the existing theme-toggle bug-fix pass). Navigate to a Phase 01–03 page and confirm theme still persists.
- [x] T403 [US4] Final integrity-gate run: `npm run check` → expects `28/28 PASS` on all three gates. If any gate fails, debug per `quickstart.md` § Verifying.

**Checkpoint (US4 complete)**: Cross-page consistency confirmed. The site is internally coherent at the navigation, theme, and integrity layers.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Final quality bar — forbidden-string sweep, multi-viewport sweep, CSS budget verification, console-error sweep, screenshot capture (optional).

- [x] T500 Forbidden-string sweep: `grep -rEi 'lifesmart|ilifesmart|lorem ipsum|CoSS|AI Builder|Fusion Link' pages/technology.html pages/software.html pages/partners.html pages/become-a-partner.html` MUST return zero matches. Also search for `certified` on `pages/software.html` and confirm any occurrence is in a context other than voice-assistant compatibility (or rewrite to "works with" / "compatible with").
- [x] T501 [P] CSS budget verification: rebuild via `npm run build:css` and confirm `assets/css/site.css` ≤ 72 KB. If over budget, dedupe redundant declarations introduced in Phase 04 (most likely targets: form-field state declarations, package-card vs. solution-card overlap). Re-run gates after any change.
- [x] T502 [P] Multi-viewport sweep for `pages/technology.html`: 360 / 414 / 768 / 1024 / 1280 / 1920 px. No horizontal scroll. Hero stacks on mobile. Pillar visuals stack above bodies on mobile. Ecosystem diagram remains legible at 360 px (may scroll horizontally within its frame — that's acceptable for diagrams). Anchor nav collapses to a horizontal-scroll strip or hides on mobile (implementer choice).
- [x] T503 [P] Multi-viewport sweep for `pages/software.html`: same breakpoints. Alternating pillar-visual sides flatten to "visual above body" on mobile. No content overflow.
- [x] T504 [P] Multi-viewport sweep for `pages/partners.html`: same breakpoints. Benefits grid collapses 3 → 2 → 1 col. Journey-step list flips to vertical on mobile with numeric badge to the left. Packages grid collapses 4 → 2 → 1 col. FAQ items full-width on mobile.
- [x] T505 [P] Multi-viewport sweep for `pages/become-a-partner.html`: same breakpoints. Form is single-column on mobile (≤ 640 px), 2-column for short fields on tablet (641–1023 px), and fieldset-grouped on desktop (≥ 1024 px). Consent checkbox and submit button always full-width.
- [x] T510 Console-error sweep: load each Phase 04 page in a desktop browser with DevTools open. Confirm zero errors and zero unhandled promise rejections on initial load. Click every interactive element (FAQ items, theme toggle, mobile-drawer toggle, every CTA). Confirm zero console output other than expected info logs.
- [x] T511 Reduced-motion verification: in the browser, force `prefers-reduced-motion: reduce` (DevTools → Rendering panel). Confirm the FAQ chevron and panel transitions are instantaneous, the form's submitting delay is reduced to 100 ms, scroll-spy on Technology page still functions but without animated scrolling, and the reveal-on-scroll opt-ins from the homepage bug-fix pass continue to respect the preference on Phase 04 pages.
- [x] T512 Final `npm run check` run: confirm `28/28 PASS` on all three gates. If any gate fails, do not declare Phase 04 done.
- [x] T513 Update `MEMORY.md` (auto-memory at `/home/mekky/.claude/projects/-media-mekky-work-backend-zakey/memory/MEMORY.md`) if appropriate to note that Phase 04 is complete; no action if there is nothing new and reusable that wasn't already captured.

**Checkpoint (Polish complete)**: Phase 04 is shippable. Constitution gates V (realistic content), VI (working UI), and VII (phased discipline) are all green for the four new pages.

---

## Dependencies & Story Completion Order

```
Setup (Phase 1)
  ↓
Foundational (Phase 2)  ← creates all 4 stub pages, runs nav mass-update, bumps gate counts
  ↓
  ├─→ US1 — Technology page (Phase 3, P1)  ← MVP unlocks here
  ├─→ US2 — Software page (Phase 4, P1)    (independent of US1 — can run in parallel)
  └─→ US3 — Partners + Become-a-Partner    (independent of US1 + US2 — can run in parallel)
        (Phase 5, P1)
  ↓
US4 — Cross-page consistency (Phase 6, P2)  ← validates the mass-update; can also run earlier
  ↓
Polish (Phase 7)
```

**Key parallelism**:
- US1, US2, and US3 are entirely independent at the file level (each touches a different HTML file). After Foundational completes, the three P1 stories can be implemented by three different contributors in parallel.
- Inside Foundational, image-placeholder tasks T020–T037 are all `[P]` parallelizable (different files), as are the CSS-component-family tasks T010–T016 (though they all touch `src/input.css` — sequence them if a single contributor is writing them; parallelize across distinct branches/contributors otherwise).
- Inside Polish, T501–T505 are all `[P]` (different pages / different gates).

**MVP scope**: Complete Setup + Foundational + US1 (Phase 3). Phase 04 reaches MVP after T140. The site is shippable at this point with Technology as the new B2B credibility surface.

**Full scope**: Complete all four user stories + Polish. The full B2B credibility funnel is live with Technology → Software → Partners → Become a Partner.

## Implementation Strategy

1. **Single contributor**: walk the phases in order — Setup → Foundational → US1 → US2 → US3 → US4 → Polish. Each P1 story is a self-contained ~10–18-task batch with a clear verification step.
2. **Parallel contributors (3+)**: after Foundational completes and all three gates pass at 28/28 with stub pages, three contributors can take US1, US2, and US3 in parallel. They share `src/input.css` (already settled in Foundational) and `js/main.js` (already wired in T060) — no further merges on those files are needed.
3. **Tight-time MVP**: complete only Setup + Foundational + US1 + Polish (skip US2, US3, US4). The Technology page becomes the new B2B surface; Software, Partners, and Become a Partner remain as stubs but the site is shippable. Defer US2 + US3 to a follow-up phase. (Note: this leaves the Become-a-Partner CTAs on Technology dangling unless they're rewritten to point to `pages/contact.html` — a one-line edit during MVP.)
