---
description: "Task list for Zakey Phase 01 — Design System, App Shell, Navigation & Homepage"
---

# Tasks: Zakey Phase 01 — Design System, App Shell, Navigation & Homepage

**Input**: Design documents from `/specs/001-shell-and-homepage/`
**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/`, `quickstart.md`

**Tests**: NOT included. The feature specification does not request unit/integration tests; verification is via the three bash integrity gates (`scripts/check-*.sh`) plus manual viewport passes documented in `quickstart.md`. Browser test framework is explicitly out of scope for Phase 01.

**Organization**: Tasks are grouped by user story per the spec's priorities (US1/US2 are P1, US3 is P2, US4 is P3). Setup and Foundational phases produce the shared scaffold every user story consumes.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no incomplete dependencies)
- **[Story]**: Maps task to user story (US1/US2/US3/US4)
- All file paths are repo-root-relative.

## Path Conventions

Flat static-site layout at the repo root: `index.html`, `pages/`, `src/`, `css/`, `js/`, `assets/`, `scripts/`. See `plan.md` § Project Structure.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Initialise the Node toolchain, directory tree, and the three bash integrity gates. No HTML/CSS authored yet.

- [x] T001 Initialise `package.json` at repo root with `devDependencies` (`tailwindcss@^3.4`, `@tailwindcss/forms`, `@tailwindcss/typography`, `postcss`, `autoprefixer`) and `scripts` (`build:css`, `watch:css`, `check`, `check:shell`, `check:content`, `check:links`)
- [x] T002 Create `tailwind.config.js` with `content` globs covering `./index.html`, `./pages/**/*.html`, `./js/**/*.js`; `theme.extend.colors` / `fontFamily` / `fontSize` / `spacing` / `borderRadius` / `boxShadow` / `backdropBlur` mapped to the CSS custom properties listed in `contracts/design-tokens.contract.md`; include the two Tailwind plugins
- [x] T003 Create `postcss.config.js` exporting `tailwindcss` and `autoprefixer` plugins
- [x] T004 Scaffold the directory tree: `pages/`, `src/`, `css/`, `js/`, `scripts/`, `assets/icons/`, and `assets/images/{hero,products,solutions,technology,projects,blog,lifestyle}/` — committed via `.gitkeep` files where empty
- [x] T005 Create `.gitignore` at repo root excluding `node_modules/`, `.DS_Store`, editor cache files; do **not** ignore `css/styles.css` (compiled CSS is committed)
- [x] T006 [P] Create `scripts/check-shell-consistency.sh` per `quickstart.md` § Gate 1: extract markup between `<!-- header:start -->`/`<!-- header:end -->` and `<!-- footer:start -->`/`<!-- footer:end -->` from every `.html` file, normalise path prefixes (`./` ↔ `../`), hash each block, fail on divergence; make executable
- [x] T007 [P] Create `scripts/check-content-rules.sh` per `quickstart.md` § Gate 2: grep every `.html` for forbidden strings (`lorem ipsum`, `lifesmart`, `ilifesmart`, case-insensitive); verify single `<h1>`, non-empty `<title>` and `<meta name="description">`; reject `alert(`/`confirm(`/`prompt(` in inline JS; make executable
- [x] T008 [P] Create `scripts/check-links.sh` per `quickstart.md` § Gate 3: extract every `href=` and `src=` from every `.html`, skip `http(s)://` and `#…` (anchor-existence-checked separately), resolve relative paths and ensure target file exists; make executable
- [x] T009 Run `npm install` so `node_modules/` is populated; verify `npx tailwindcss --help` succeeds (Setup gate)

**Checkpoint**: Toolchain and gates installed. `npm run check` runs without scaffolding errors (will report empty content as zero violations).

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Author the design system (`src/input.css` tokens + components + utilities), the brand SVG assets, the placeholder image assets, and the eleven placeholder pages so every nav destination resolves. Every user story downstream depends on this.

**⚠️ CRITICAL**: No user-story work begins until this phase completes.

- [x] T010 [P] Author `src/input.css` `@layer base` block: `@import "tailwindcss/base"` / `components` / `utilities` directives, `:root { … }` with every token from `contracts/design-tokens.contract.md` (colours, typography clamps, spacing, radii, shadows, traits like `--tracking-hero`), body defaults (font, antialiasing, background, text colour), focus-ring base, and the `@media (prefers-reduced-motion: reduce)` global block per `research.md` D-10
- [x] T011 [P] Create the brand and UI SVG icons under `assets/icons/`: `zakey-wordmark.svg`, `zakey-wordmark-light.svg`, `caret.svg`, `menu.svg`, `close.svg`, `check.svg`, `alert.svg`, `linkedin.svg`, `instagram.svg`, `youtube.svg`, `x-social.svg` — each `currentColor`-driven for re-tinting
- [x] T012 [P] Generate the Phase-01 placeholder image set under `assets/images/`: `hero/zakey-smart-home-hero.svg`; `products/{zakey-aura-panel,zakey-secure-kit,zakey-smart-switch-series,zakey-climate-hub,zakey-motion-sensor,zakey-door-shield,zakey-lighting-controller,zakey-curtain-driver}.svg`; `solutions/{zakey-smart-villa,zakey-smart-apartment,zakey-smart-hotel,zakey-smart-office,zakey-smart-compound,zakey-gaming-room}.svg`; `technology/{zakey-mesh-bridge,zakey-sense-engine,zakey-hybrid-fabric}.svg`; `projects/{zakey-villa-case,zakey-hotel-case,zakey-office-case}.svg`; `blog/{zakey-article-01,zakey-article-02,zakey-article-03}.svg` — each a gradient-with-name SVG per `contracts/image-placeholder.contract.md`
- [x] T013 Extend `src/input.css` `@layer components`: button family (`.btn`, `.btn--primary`, `.btn--secondary`, `.btn--ghost`, `.btn--dark`, `.btn--lg`), card families (`.card-product`, `.card-solution`, `.card-feature`, `.card-technology`, `.card-blog`), form fields (`.field`, `.field--select`, `.field--textarea`, `.field--radio-group`, `.field--checkbox-group`, `.field--consent`, `.field--inline`, error state via `[data-error="true"]`), eyebrow (`.eyebrow`), section header (`.section-head`), image figure (`.zk-image`, `.zk-image__img`), and hero block (`.hero`, `.hero__floating-card`, `.hero__stat`); depends on T010
- [x] T014 Extend `src/input.css` `@layer components` with shell pieces: `.site-header` + sub-elements (`__brand`, `__wordmark`, `__nav`, `__list`, `__megabtn`, `__cta`, `__hamburger`, `[data-scrolled="true"]` glass state) per `contracts/header.contract.md`; `.mega-panel` + sub-elements (`__inner`, `__intro`, `__grid`, `__title`, `__sub`, open/close transitions) per `contracts/mega-menu.contract.md`; `.mobile-drawer` + sub-elements (`__scrim`, `__panel`, `__head`, `__close`, `__nav`, `__cta`, `__accordion`, `__accordion-trigger`, `__accordion-panel`, `[data-state]` transitions) per `contracts/mobile-drawer.contract.md`; `.site-footer` + sub-elements (`__inner`, `__brand`, `__summary`, `__contact`, `__col`, `__heading`, `__connect`, `__social`, `__base`, `__copy`, `__legal`) per `contracts/footer.contract.md`; depends on T013
- [x] T015 Extend `src/input.css` `@layer components` with section-specific styles: `.featured-slider` + sub-elements (`__viewport`, `__track`, `__controls`, `__prev`, `__next`, `__dots`, `.featured-slide`, `.featured-slide__visual`, `.featured-slide__body`, slide-snap layout, `[data-state]` pause-on-interact) per `contracts/hero-slider.contract.md`; `.quote-form` + result cards (`.quote-form__row`, `__submit`, `__privacy`, `.quote-form__result[data-result="success"|"error"]`, all five form `[data-state]` visual transitions) per `contracts/quote-form.contract.md`; `.newsletter-form` per `contracts/newsletter-form.contract.md`; depends on T014
- [x] T016 Extend `src/input.css` `@layer utilities` with project utilities: glass surface utility (`.u-glass`, `.u-glass-strong`), section spacing utility (`.u-section`, `.u-section--tight`), screen-reader-only (`.sr-only`), text balance, custom scrollbar treatment, fluid container (`.u-container`); depends on T015
- [x] T017 Run `npm run build:css` to produce `css/styles.css`; commit the compiled output; verify file size < 80 KB
- [x] T018 [P] Create `pages/products.html` with: HTML5 doctype; `<title>Products — Zakey</title>`; meta description (≤160 chars, brand-realistic); OG tags (`og:title`, `og:description`, `og:image`, `og:url`, `og:type`); `<link rel="stylesheet" href="../css/styles.css">`; `<script type="module" src="../js/main.js" defer></script>`; full shared `<!-- header:start -->`/`<!-- header:end -->` block per `contracts/header.contract.md` (page-relative paths); single `<h1>Products</h1>` inside a hero-lite section; a "Coming in Phase 02" content block with brand-realistic copy and a CTA back to `../index.html#get-quote`; full shared `<!-- footer:start -->`/`<!-- footer:end -->` block per `contracts/footer.contract.md`
- [x] T019 [P] Create `pages/solutions.html` matching T018 pattern; `<h1>Solutions</h1>`; "Coming in Phase 02" content tailored to spaces (villa/hotel/office/compound)
- [x] T020 [P] Create `pages/technology.html` matching T018 pattern; `<h1>Technology</h1>`; "Coming in Phase 02" content referencing the three Zakey-original pillars
- [x] T021 [P] Create `pages/software.html` matching T018 pattern; `<h1>Zakey Software</h1>`; "Coming in Phase 02" content for app and dashboard
- [x] T022 [P] Create `pages/partners.html` matching T018 pattern; `<h1>Partner with Zakey</h1>`; "Coming in Phase 02" content for distributors/integrators/developers/installers; link to the homepage quote anchor
- [x] T023 [P] Create `pages/projects.html` matching T018 pattern; `<h1>Projects</h1>`; "Coming in Phase 02" content for villa/hotel/office case studies
- [x] T024 [P] Create `pages/blog.html` matching T018 pattern; `<h1>Insights</h1>`; "Coming in Phase 02" content for editorial program
- [x] T025 [P] Create `pages/about.html` matching T018 pattern; `<h1>About Zakey</h1>`; "Coming in Phase 02" content for brand story
- [x] T026 [P] Create `pages/contact.html` matching T018 pattern; `<h1>Contact</h1>`; "Coming in Phase 02" content with email/phone/support hours
- [x] T027 [P] Create `pages/privacy.html` matching T018 pattern; `<h1>Privacy</h1>`; minimal but realistic privacy summary (data we collect via the quote form, retention, contact for removal)
- [x] T028 [P] Create `pages/terms.html` matching T018 pattern; `<h1>Terms of Use</h1>`; minimal but realistic terms summary

**Checkpoint**: Toolchain installed, design system compiled into `css/styles.css`, all icons and placeholder images in place, all eleven nav destinations exist with shared shell. User-story phases can now proceed.

---

## Phase 3: User Story 1 — First-time visitor builds brand confidence in seconds (Priority: P1) 🎯 MVP

**Goal**: Author `index.html` so a visitor at desktop width sees a premium homepage with all eleven sections rendered, every nav link resolving, hero CTAs working, and zero forbidden strings. JavaScript is limited to a minimal boot module (year stamp, no interactive features yet); the slider degrades to its first slide statically, the form submits via native HTML validation only — both acceptable per Constitution Principle II for this slice.

**Independent Test**: Open `index.html` at 1280px. Confirm: hero + 11 sections render with content and visuals; both hero CTAs resolve (`#get-quote` jumps in-page, "Explore Products" navigates to `pages/products.html`); every header & footer link goes to a real file; no console errors; `scripts/check-content-rules.sh` and `scripts/check-links.sh` both exit 0.

### Implementation for User Story 1

- [x] T029 [US1] Create `index.html` scaffold at repo root: HTML5 doctype, `<html lang="en">`, full `<head>` (unique `<title>Zakey — Premium Smart Living for Homes, Villas, Hotels & Offices</title>`, meta description ≤160 chars, Open Graph minimum tags incl. `og:image="./assets/images/og/zakey-og-cover.jpg"`, favicon link, font preconnect/preload for Manrope display + Inter body, `<link rel="stylesheet" href="./css/styles.css">`, `<script type="module" src="./js/main.js" defer></script>`); `<body>` with shared `<!-- header:start -->`/`<!-- header:end -->` block per `contracts/header.contract.md` (mega-panels rendered as static markup with `hidden`, interactive open/close added in US2); `<main id="main">` placeholder; shared `<!-- footer:start -->`/`<!-- footer:end -->` block per `contracts/footer.contract.md`
- [x] T030 [US1] Author the Hero section inside `index.html` `<main>` per `data-model.md` E-03 + `contracts/quote-form.contract.md` anchor target: `<section class="hero" id="hero">` with eyebrow ("Smart living, refined"), single `<h1>` ("A signature smart-home layer for every room you love"), subheadline covering homes/villas/hotels/offices/security/automation, two CTAs (`<a class="btn btn--primary" href="#get-quote">Get a Quote</a>` and `<a class="btn btn--secondary" href="./pages/products.html">Explore Products</a>`), hero visual `<figure class="zk-image">` referencing `./assets/images/hero/zakey-smart-home-hero.svg` with descriptive alt, two `.hero__floating-card` blocks (device-mockup card + automation-stat card), three `.hero__stat` blocks
- [x] T031 [US1] Author the Featured Product Slider section inside `index.html`: `<section class="featured-slider" id="featured" data-state="idle" data-active-index="0" aria-roledescription="carousel" aria-label="Featured Zakey products">` per `contracts/hero-slider.contract.md`; four `<li class="featured-slide">` items for Zakey Aura Panel, Zakey Secure Kit, Zakey Smart Switch Series, Zakey Climate Hub — each with image, eyebrow category, `<h3>`, tagline, ≤30-word description, primary CTA to `pages/products.html#<slug>`; prev/next buttons and pagination dots emitted as static HTML (wiring deferred to US2)
- [x] T032 [US1] Author the Why Zakey section inside `index.html`: `<section id="why-zakey" class="u-section">` with section-head eyebrow ("Why Zakey") and `<h2>`, six `<article class="card-feature">` cards per `data-model.md` E-05 (Full Smart Ecosystem, Elegant Product Design, Secure Automation, Works with Voice Assistants, Energy Monitoring, Partner-Ready Business Support) — each card holds an SVG icon block, `<h3>`, and ≤140-char description
- [x] T033 [US1] Author the Smart Living Ecosystem section inside `index.html`: `<section id="ecosystem" class="u-section">` with section-head, then a connected-card diagram of the ten `EcosystemNode` entities per `data-model.md` E-06 (hardware, app, cloud-local, scenes, sensors, security, lighting, climate, curtains, analytics) arranged as a hex grid or central-hub ring; each node has icon + label
- [x] T034 [US1] Author the Solutions by Space section inside `index.html`: `<section id="solutions" class="u-section">` with section-head, six `<article class="card-solution">` cards per `data-model.md` E-07 (Smart Villa, Smart Apartment, Smart Hotel, Smart Office, Smart Compound, Gaming Room) — each carrying image (`./assets/images/solutions/zakey-<slug>.svg`), `<h3>`, 2–3 benefit lines as a `<ul>`, CTA to `pages/solutions.html#<slug>`
- [x] T035 [US1] Author the Technology Preview section inside `index.html`: `<section id="technology" class="u-section">` with section-head, three `<article class="card-technology">` cards using the Zakey-original names from `data-model.md` E-08 — **Zakey Mesh Bridge** (multi-protocol integration), **Zakey Sense Engine** (AI scene automation), **Zakey Hybrid Fabric** (hybrid wired & wireless architecture); each card has icon, name, subtitle, ≤220-char description, abstract visual; verify zero occurrences of "CoSS"/"AI Builder"/"Fusion Link"
- [x] T036 [US1] Author the Featured Products Grid section inside `index.html`: `<section id="featured-products" class="u-section">` with section-head, eight `<article class="card-product">` cards per `data-model.md` E-09 spanning at least four categories (Control Panels, Smart Switches, Sensors, Security, Lighting, Climate, Curtains, Energy); each card has category label, image, name, ≤120-char description, CTA
- [x] T037 [US1] Author the Partner CTA section inside `index.html`: `<section id="partners" class="u-section u-glass">` with a B2B headline addressing distributors/system integrators/real-estate developers/installers, supporting paragraph, two-up layout with a visual on one side and the CTA on the other (`<a class="btn btn--primary btn--lg" href="./pages/partners.html">Become a Zakey Partner</a>`); supporting visual references `./assets/images/lifestyle/zakey-partner.svg` (add to T012 set if not already)
- [x] T038 [US1] Author the Case Studies section inside `index.html`: `<section id="projects" class="u-section">` with section-head, three `<article class="card-feature">` (or dedicated case-card variant) per `data-model.md` E-10 — luxury villa automation, smart hotel guest experience, smart office energy optimization — each with image, `<h3>`, one-line outcome with a metric, tag list, CTA to `pages/projects.html`
- [x] T039 [US1] Author the Blog/News preview section inside `index.html`: `<section id="blog" class="u-section">` with section-head, three `<article class="card-blog">` per `data-model.md` E-11 — each with image, date, category tag, `<h3>` realistic title, ≤140-char excerpt, CTA to `pages/blog.html`
- [x] T040 [US1] Author the Get-a-Quote section inside `index.html`: `<section id="get-quote" class="u-section quote-section">` with section-head, full form markup per `contracts/quote-form.contract.md` (all 11 fields, all required `data-error-for` error spans authored statically, privacy note, submit button with idle/submitting span pair, both result cards `<div class="quote-form__result" data-result="success" hidden>` and `[data-result="error"]` authored statically and hidden by default); the form has `novalidate` and `data-state="idle"` — JS wiring deferred to US3, but native browser validation still works on `required` attributes
- [x] T041 [US1] Create `js/main.js` as an ES module: import nothing yet; on `DOMContentLoaded`, set the footer copyright year (`document.querySelector('[data-copyright-year]').textContent = new Date().getFullYear()`); export a placeholder `boot()` invoked at module top so future modules attach to it without a refactor
- [x] T042 [US1] Update `pages/*.html` and `index.html` copyright lines: footer copyright `<span>` carries `data-copyright-year` attribute so T041 hydrates it on every page
- [x] T043 [US1] Add `assets/images/og/zakey-og-cover.jpg` (or `.svg`) placeholder per `contracts/image-placeholder.contract.md`; verify all eleven placeholder pages from Phase 2 reference the same OG image URL
- [x] T044 [US1] Run `scripts/check-content-rules.sh`; fix any "lorem ipsum" / "lifesmart" / "ilifesmart" / missing-meta / multi-H1 failures introduced by the homepage authoring
- [x] T045 [US1] Run `scripts/check-links.sh`; verify every homepage `href` (header nav, hero CTAs, slider CTAs, section CTAs, footer columns) resolves to a real file or in-page anchor
- [x] T046 [US1] Run `scripts/check-shell-consistency.sh`; verify `index.html` header and footer blocks hash-match the placeholder pages

**Checkpoint US1**: Homepage is demoable at desktop width (≥1280 px). All eleven sections render with realistic content and visuals, no broken links, no forbidden strings, no console errors. The slider shows its first slide statically; the form blocks invalid submissions via native validation. This is the MVP slice.

---

## Phase 4: User Story 2 — Visitor uses the site on any device (Priority: P1)

**Goal**: Add the interactive header (mega-menu on hover/focus at ≥1025 px, mobile drawer hamburger at ≤640 px), the sticky-header scroll state, and the working slider auto-advance / prev/next / dots. Verify responsive behavior at all seven design widths.

**Independent Test**: Resize browser through 360 → 640 → 1024 → 1280 → 1440 px and verify per `spec.md` US2 acceptance scenarios: hamburger appears ≤640 px and opens a focus-trapped drawer; mega-menu opens on hover and keyboard focus at ≥1025 px; resizing across breakpoints does not leave broken intermediate states; every interactive control has a visible focus ring.

### Implementation for User Story 2

- [x] T047 [US2] Create `js/navigation.js` as an ES module exporting `initNavigation()`: implement the mega-menu disclosure state machine per `contracts/mega-menu.contract.md` — query all `.has-mega` triggers, bind `pointerenter`/`pointerleave` with 80 ms open delay and 200 ms close grace; bind `focusin`/`focusout` (open on focus, close on blur outside trigger+panel); bind `click`/`keydown(Enter/Space)` on `.site-header__megabtn` for toggle; `keydown(Escape)` while panel open closes and returns focus; click outside `<header>` closes all open panels; resize crossing 1025 px closes all panels; sync `aria-expanded` and `hidden` attribute on the panel
- [x] T048 [US2] Extend `js/navigation.js` with `initMobileDrawer()`: implement the mobile drawer state machine per `contracts/mobile-drawer.contract.md` — bind `.site-header__hamburger` click to open; bind `.mobile-drawer__close` and `.mobile-drawer__scrim` to close; bind `keydown(Escape)` while open to close + return focus to hamburger; resize crossing 1025 px force-closes; on open set `document.body.dataset.drawerOpen="true"` (CSS handles overflow lock), move focus to close button after transition end; trap Tab inside `.mobile-drawer__panel`; on close clear data-attr and aria-hidden; wire the two accordion triggers (Products / Solutions) — clicking one expands its panel and collapses the other; sync `aria-expanded` and `hidden`
- [x] T049 [US2] Extend `js/main.js` to import + initialise the navigation module: `import { initNavigation, initMobileDrawer } from './navigation.js'`; call both on DOMContentLoaded; implement sticky-header scroll state — if `index.html` (homepage), observe the hero element via `IntersectionObserver` and toggle `document.querySelector('.site-header').dataset.scrolled` based on hero visibility; else (non-home pages) toggle on `window.scrollY > 80` with a passive scroll listener; respect `window.matchMedia('(prefers-reduced-motion: reduce)').matches` by disabling any animation-bearing transitions on the header element
- [x] T050 [US2] Create `js/homepage.js` as an ES module exporting `initFeaturedSlider()`: implement the featured-slider behaviour per `contracts/hero-slider.contract.md` — bind prev/next/dot buttons to update `data-active-index` and call `viewport.scrollTo({ left: slide.offsetLeft, behavior: 'smooth' })`; sync `aria-selected` on dots; bind keyboard arrows + Home/End when focus is on a dot/control; bind `pointerenter`/`focusin` on viewport to set `data-state="interacting"`, revert to `"idle"` 4 s after last interaction; auto-advance every 6 s while in `idle` state; skip auto-advance if `prefers-reduced-motion: reduce`; on scroll-snap-driven slide change (touch swipe), update `data-active-index` via IntersectionObserver on slides
- [x] T051 [US2] Update `js/main.js` to conditionally import + initialise homepage module only on `index.html`: detect via `document.querySelector('.featured-slider')`; if present, dynamic `import('./homepage.js').then(m => m.initFeaturedSlider())`
- [x] T052 [P] [US2] Add Products mega-panel content to `index.html` and to every `pages/*.html`: inside `<li class="has-mega">` for "Products", populate `<div id="mega-products" class="mega-panel" role="region" hidden>` per `contracts/mega-menu.contract.md` markup — intro block (heading, paragraph, "All products →" ghost button) + 8-entry `<ul class="mega-panel__grid">` for Control Panels, Smart Switches, Sensors, Security, Lighting Control, Climate, Curtains & Shading, Energy; each entry has icon, title, sub-label, link to `pages/products.html#<slug>`. **CRITICAL**: the markup must be byte-identical (modulo path-prefix normalisation) across all 12 pages so the shell-consistency gate passes
- [x] T053 [P] [US2] Add Solutions mega-panel content to `index.html` and to every `pages/*.html`: same shape as T052 with 6 entries — Smart Villa, Smart Apartment, Smart Hotel, Smart Office, Smart Compound, Gaming Room — each linking to `pages/solutions.html#<slug>`
- [x] T054 [US2] Run `scripts/check-shell-consistency.sh`; verify the now-fuller header (with mega-panel content) hash-matches across all 12 pages; fix any divergence
- [x] T055 [US2] Run `scripts/check-content-rules.sh` and `scripts/check-links.sh`; fix any new failures introduced by mega-panel link additions
- [x] T056 [US2] Manual viewport QA: open `index.html` and perform the full responsive pass per `quickstart.md` § 6 at 360, 480, 640, 768, 1024, 1280, 1440 px. Verify at each width: no horizontal scroll, no overlapping elements, header behaviour correct (hamburger ≤640 / full nav ≥1025), mega-menu on hover + keyboard focus, drawer focus trap + Escape + scrim + resize-force-close, slider prev/next/dots + auto-advance + pause-on-hover, no console errors

**Checkpoint US2**: Full responsive shell working across all viewports. Mega-menus, mobile drawer, sticky header, and slider all interactive. The site is now usable on phone/tablet/desktop.

---

## Phase 5: User Story 3 — Prospect submits a lead via the quote form (Priority: P2)

**Goal**: Wire the quote-form state machine and the newsletter-form state machine. Both run entirely in front-end JS — no backend.

**Independent Test**: Per `spec.md` US3 acceptance scenarios — empty submit reveals all required errors; invalid email shows inline error on blur; valid happy-path submission shows "Submitting…" then success card within 1.5 s; "Submit another request" resets to idle; `?force=error` flips to error path with retry; newsletter form shows success message within 1 s and auto-resets after 5 s.

### Implementation for User Story 3

- [x] T057 [US3] Create `js/forms.js` as an ES module exporting `initQuoteForm()` and `initNewsletterForm()`. Implement the quote-form state machine per `contracts/quote-form.contract.md` and validation rules per `data-model.md` E-12: per-field validators (radio `iAmA` non-empty; `name` ≥ 2 chars; conditional `company` required unless `iAmA="end-user"`; `email` matches `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`; `phone` ≥ 6 digits after stripping spaces/dashes; `country`/`projectType`/`projectSize` non-empty select; `interestedIn` ≥ 1 checked; `message` ≥ 20 chars; `consent` checked); bind `blur` on text inputs and `change` on selects/radios/checkboxes for inline validation, toggle `data-error="true"` on the offending `.field` (or `<fieldset>`) — never inject error text; bind `submit` on the form: prevent default, run full validation, on failure set first-error focus and set `data-state="idle"` (revealing errors); on success set `data-state="submitting"`, disable all inputs, swap submit button label via `[data-when]` spans, after `600 + Math.random()*900` ms set `data-state="success"` (or `"error"` if `?force=error`); reveal the matching `.quote-form__result[data-result="…"]` (toggle `hidden`); on `[data-form-reset]` click, clear all fields + set `data-state="idle"`; on `[data-form-retry]` click, set `data-state="idle"` without clearing fields
- [x] T058 [US3] Extend `js/forms.js` with `initNewsletterForm()` per `contracts/newsletter-form.contract.md`: same email regex; bind `submit`, prevent default, validate, set `data-state="submitting"`, disable input, after 600–1000 ms set `data-state="success"` (or `"error"` if `?force=newsletter-error`), reveal the matching `[data-status]` paragraph; on success auto-clear field + auto-reset to `data-state="idle"` after 5 s; on error re-enable input immediately
- [x] T059 [US3] Update `js/main.js` to import + initialise the forms module: `import { initQuoteForm, initNewsletterForm } from './forms.js'`; call `initQuoteForm()` only if `document.getElementById('quote-form')` exists; call `initNewsletterForm()` only if a `.newsletter-form` exists on the page (footer makes it present on every page)
- [x] T060 [US3] Update `index.html` quote section result cards: ensure `<button type="button" class="btn btn--ghost" data-form-reset>` exists inside the success result, `<button type="button" class="btn btn--primary" data-form-retry>` exists inside the error result; both buttons have visible labels and are keyboard-reachable
- [x] T061 [US3] Add the newsletter form markup inside every footer's Connect column: `<form class="newsletter-form" data-state="idle" novalidate>` per `contracts/newsletter-form.contract.md` (email field with `data-error-for`, submit with idle/submitting span pair, both status paragraphs `<p class="newsletter-form__status" data-status="success" hidden>` and `[data-status="error"]`, privacy note). Since the footer is duplicated, this markup must land identically in `index.html` and every `pages/*.html`
- [x] T062 [US3] Run `scripts/check-shell-consistency.sh`; verify the newsletter-form additions did not break footer-block consistency (every page must carry the same form markup)
- [x] T063 [US3] Manual form-interaction QA: at desktop and at 480 px, exercise both forms per `contracts/quote-form.contract.md` § Acceptance probe and `contracts/newsletter-form.contract.md` § Acceptance probe — empty submit, invalid email on blur, valid happy path, `?force=error` retry path, reset, newsletter happy path, newsletter error path; verify no console errors; verify the submit button is disabled during `submitting` state (no double-submit)

**Checkpoint US3**: Lead capture works end-to-end in the browser. The quote form transitions cleanly through every state in `data-model.md` E-12; the newsletter form does the same.

---

## Phase 6: User Story 4 — Future-page author reuses the design system (Priority: P3)

**Goal**: Validate (and where needed harden) the design-system reusability promise. This is an audit pass, not new feature work.

**Independent Test**: Per `spec.md` US4 acceptance scenarios — a contributor opens `css/styles.css` (compiled) and `src/input.css` (source); confirms all colour, typography, and spacing literals live in the `:root` token block; the four `pages/*.html` chosen at random show no hard-coded styling beyond Tailwind utility classes and the documented component classes.

### Implementation for User Story 4

- [x] T064 [US4] Audit `src/input.css` for hard-coded literals: `grep -nE "#[0-9a-fA-F]{3,8}" src/input.css | grep -v -- "--color-"` MUST return zero results outside the `:root` block; same for `rgb(`/`rgba(` literals outside `:root`; same for `px` font sizes outside the typography token block. Fix any leaks by promoting them into the `:root` token layer
- [x] T065 [US4] Audit `index.html` and `pages/*.html` markup: `grep -nE 'style="' index.html pages/*.html` MUST return zero results (no inline styles); `grep -nE 'class="[^"]*\[#[0-9a-f]' index.html pages/*.html` MUST return zero results (no Tailwind arbitrary-value colours); fix any leaks by adding a token or a component class
- [x] T066 [US4] Add a documentation comment header at the top of `src/input.css` listing: the colour token names + intended use; the typography scale token names; the spacing scale steps; the radii names; the shadow names; the component class families (`.btn--*`, `.card-*`, `.field`, `.zk-image`, `.site-header__*`, `.site-footer__*`, `.mega-panel__*`, `.mobile-drawer__*`, `.featured-slider__*`, `.quote-form__*`, `.newsletter-form__*`) — serves as the contract a Phase-02 contributor reads before authoring a new page
- [x] T067 [US4] Smoke-test the design system: temporarily edit `:root { --color-accent: #ff7a59; }` in `src/input.css`, run `npm run build:css`, open `index.html` + 3 random placeholder pages, confirm every primary CTA, focus ring, accent surface, and accent text reflects the new hue; revert the edit and rebuild

**Checkpoint US4**: Design system foundation validated. Phase 02 contributors can reuse tokens and component classes without re-deriving them.

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Final integration improvements before the Phase 01 deliverable is declared complete.

- [x] T068 [P] Replace the SVG OG-image placeholder at `assets/images/og/zakey-og-cover.jpg` with a properly sized 1200×630 px brand-coloured cover; update OG `og:image` references everywhere if the path or extension changes
- [x] T069 [P] Add a `favicon.svg` + `apple-touch-icon.png` at repo root; add `<link rel="icon" type="image/svg+xml" href="./favicon.svg">` + `<link rel="apple-touch-icon" href="./apple-touch-icon.png">` to every page's `<head>` (must remain shell-consistent — update `<head>` blocks together or document the intentional `<head>` divergence)
- [x] T070 Performance audit on `index.html`: measure FCP, LCP, total page weight per `plan.md` § Performance Goals — FCP < 1.5 s, LCP < 2.5 s, total < 1.5 MB. Reduce image sizes, defer non-critical resources, and preload the hero image if LCP misses the budget
- [x] T071 Accessibility audit: keyboard-traverse every interactive element on `index.html` and confirm visible focus rings, audible-on-blur error messages reach screen readers, mega-menu and drawer ARIA states (`aria-expanded`, `aria-hidden`, `aria-controls`) reflect actual state; spot-check colour contrast on body text + accent-on-dark with a contrast checker for WCAG 2.1 AA
- [x] T072 Run `npm run check`; all three gates exit 0 (`check-shell-consistency.sh`, `check-content-rules.sh`, `check-links.sh`)
- [x] T073 Run the constitution-compliance sweep: confirm Principle I (no framework/CDN in `package.json` or any HTML), Principle II (`grep -rn "innerHTML\s*=" js/` shows no primary-content injection), Principle III (every section has a visual; visual language consistent across pages), Principle IV (zero "lifesmart"/"ilifesmart" in repo, zero "CoSS"/"AI Builder"/"Fusion Link"), Principle V (zero "lorem ipsum"), Principle VI (`npm run check` green; no console errors during interaction pass), Principle VII (no half-finished sections; placeholder pages clearly marked)
- [x] T074 Final visual sweep across `index.html` + 4 representative placeholder pages at desktop (1440 px) and mobile (375 px); verify constitution compliance and the `quickstart.md` § Definition of done checklist

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately.
- **Foundational (Phase 2)**: Depends on Setup completion. **BLOCKS** all user-story phases. The design system and placeholder pages must be in place before any user story is implementable.
- **User Story 1 (Phase 3, P1)**: Depends on Foundational. Independent of US2/US3/US4 — produces a demoable desktop homepage.
- **User Story 2 (Phase 4, P1)**: Depends on Foundational + US1 (consumes `index.html` produced in US1 to attach interactive behaviour; consumes the mega-panel container markup added to placeholder pages).
- **User Story 3 (Phase 5, P2)**: Depends on Foundational + US1 (consumes the quote-form markup in `index.html` and the newsletter form needs to exist in the shared footer). Independent of US2 — the form works without mega-menus.
- **User Story 4 (Phase 6, P3)**: Depends on US1 + US2 + US3 (an audit is only meaningful after the design system is consumed by real markup and behaviour). Independent of itself — no new feature shipped.
- **Polish (Phase N)**: Depends on all user-story phases being complete.

### Within Each User Story

- US1: T029 (scaffold) MUST run before T030–T040 (section authoring). T030–T040 are sequential because they all edit `index.html`. T041 (main.js boot) can run any time after T029. T044–T046 (gates) run last.
- US2: T047/T048 author `js/navigation.js`; T049 wires it into `js/main.js`. T050/T051 are slider work. T052/T053 are mega-panel content additions — these touch all 12 HTML files but are [P]-marked because they edit a different region of each file from the slider/JS tasks; in practice, run them sequentially per page to avoid merge conflicts on the same lines.
- US3: T057 then T058 (same file `js/forms.js`); T059 wires forms into main. T061 adds newsletter form markup across all 12 pages.
- US4: T064 → T065 → T066 → T067 sequentially.

### Parallel Opportunities

- All of T006/T007/T008 (gate scripts) within Setup.
- T010/T011/T012 within Foundational — three independent file sets (CSS source, icons, images).
- T018–T028 within Foundational — eleven independent placeholder pages.
- T052/T053 within US2 — Products vs Solutions mega-panel content (different files in practice if working page-by-page; merge with care if multiple devs touch the same page).
- T068/T069 within Polish — OG image vs favicon are separate concerns.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Phase 1 Setup.
2. Phase 2 Foundational (design system + placeholders).
3. Phase 3 US1 (homepage at desktop width with all 11 sections).
4. **STOP**: validate against the US1 Independent Test in this file.
5. Demo to stakeholder — this is the brand-direction approval gate.

### Incremental Delivery After MVP

6. Phase 4 US2 — responsive shell with interactive mega-menus, drawer, and slider.
7. Phase 5 US3 — quote-form and newsletter-form state machines.
8. Phase 6 US4 — design-system reusability audit.
9. Phase N — polish, OG image, favicon, performance, a11y, final compliance sweep.

Each phase ends with a checkpoint that is independently demoable. If a stakeholder pulls the plug at any checkpoint, the work shipped to that point is still presentable.

### Parallel Team Strategy

With two contributors:

- **Phase 1+2**: split — one runs the toolchain setup (T001–T009), one authors the design system tokens & components (T010–T017). Image/icon assets (T011/T012) and placeholder pages (T018–T028) can fan out further.
- **Phase 3**: serial on `index.html` (T030–T040 all touch the same file). Pair-program or rotate sections.
- **Phase 4**: split — one on `js/navigation.js` + mega panels, one on `js/homepage.js` slider.
- **Phase 5**: serial on `js/forms.js`; one person.
- **Phase 6**: solo audit pass.
- **Phase N**: split — one on perf + a11y, one on assets.

---

## Notes

- **No tests in this phase**: the spec explicitly relies on manual viewport passes + three bash gates. A browser test harness (Playwright/Cypress) is a Phase 02+ consideration.
- **File-shared task warning**: any task editing `src/input.css` (T010, T013, T014, T015, T016, T064, T066) or `index.html` (T029–T040, T042, T046, T060, T061) is serial with every other task on the same file. Treat the `[P]` marker as "different files" — the planner cannot mark two same-file tasks parallel.
- **The three bash gates are the safety net**: re-run `npm run check` at every checkpoint. Any failure is a stop-the-line event.
- **Constitution v1.0.0 is binding**: every task above implicitly inherits the seven principles. If a task seems to violate one (e.g., "use a slider library"), stop and reconcile against `.specify/memory/constitution.md` before proceeding.
