# Feature Specification: Zakey Phase 03 — Solutions Overview & Solution Detail Pages

**Feature Branch**: `003-solutions-pages`
**Created**: 2026-05-14
**Status**: Draft
**Input**: User description: "Phase 03 — Solutions Overview and Solution Detail Pages. Build pages/solutions.html plus six required and two optional solution detail pages (Smart Villa, Smart Apartment, Smart Hotel, Smart Office, Smart Compound, Gaming Room; optional Elderly Care and Smart Retail). Each detail page must include hero, problem, Zakey solution, included systems, automation scenarios, recommended products, benefits, visual diagram, and final CTA. Use existing Phase 01 shell and Phase 02 products catalog. HTML + locally-compiled Tailwind + vanilla JS only. No CDN, no frameworks."

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Visitor browses every Zakey solution by space and use case (Priority: P1) 🎯 MVP

A potential client — a homeowner planning a villa, a hotel general manager, an office IT director, or a real-estate developer — lands on `pages/solutions.html` from the homepage CTA or the mega-menu. The hero immediately communicates that Zakey delivers a tailored smart-living solution for every kind of space. Below the hero, the visitor scans a grid of solution cards that visually telegraph residential, hospitality, commercial, and real-estate use cases. Each card shows a hero lifestyle image, the solution name, a one-sentence positioning line, the intended audience, four headline benefits, and a clear path into the detail page. The visitor can narrow the grid by category tab (Residential / Hospitality / Commercial / Real Estate / Lifestyle) to find the solution that matches their project.

**Why this priority**: The solutions overview is the single page that converts a generic "smart home is interesting" curiosity into a specific "Zakey can build this for me" lead. Without it, visitors who arrived for a use-case story (rather than a hardware spec) bounce. This page is the funnel mouth for every detail page in this phase.

**Independent Test**: Open `pages/solutions.html` directly in a browser. The hero shows above the fold with the headline "Smart Solutions for Every Space" and a CTA to "Plan Your Project". Below it, at least eight solution cards render in a responsive grid, each with image + title + positioning copy + target user + four benefits + a "Discover this solution" link. Click each of the five category tabs (Residential, Hospitality, Commercial, Real Estate, Lifestyle) in turn — the grid filters to only the solutions matching that audience. Click "All" — every card returns. Click any card's CTA — it navigates to the corresponding solution detail page. Three integrity gates exit 0.

**Acceptance Scenarios**:

1. **Given** the visitor lands on `pages/solutions.html`, **When** the page first paints, **Then** the hero, a positioning paragraph, and a fully-populated grid of ≥ 8 solution cards are all visible without JS executing.
2. **Given** the visitor clicks the "Hospitality" tab, **When** the filter applies, **Then** only Smart Hotel (and any other hospitality-tagged solution like Smart Retail if included) remains visible; the tab gets `aria-pressed="true"`; the visible-count line updates.
3. **Given** the visitor clicks the "All" tab, **When** the filter clears, **Then** every solution card returns; "All" gets `aria-pressed="true"`.
4. **Given** the visitor clicks Smart Villa's "Discover this solution" CTA, **When** the link is followed, **Then** the browser navigates to `pages/solution-smart-villa.html` with no console errors.
5. **Given** JavaScript is disabled, **When** the page renders, **Then** all eight solution cards still appear with all content and CTAs working; only the category-filter tabs become inert (no JS error, no broken layout).

---

### User Story 2 — Visitor opens a solution detail page and follows the funnel to a quote (Priority: P1)

A villa owner who clicked "Smart Villa" on the overview lands on `pages/solution-smart-villa.html`. The page is a long-form, emotional, client-focused story — the opposite of a hardware spec sheet. The hero shows a luxury villa interior and the headline "Smart Living for the Modern Villa". A "Problem" section names the pain points (managing many rooms, fragmented systems, energy waste at scale). A "Zakey Solution" section answers them with a clear narrative of how the Zakey ecosystem solves these problems through the central hub, scenes, automations, and ambient sensors. A grid of "Included Systems" shows the eight Zakey subsystems that ship in a villa deployment (Central Control, Lighting, Curtains, Climate, Security, Sensors, Energy, App/Voice). A "Automation Scenarios" section paints three to five day-in-the-life vignettes (Welcome Home Scene, Goodnight Scene, Movie Night, Energy-saver Mode). A "Recommended Products" strip surfaces four flagship products with deep links to their Phase 02 detail pages. A "Benefits" panel summarises six client-facing outcomes (Comfort, Security, Energy Efficiency, Premium UX, Centralized Management, Scalability). A "How It Connects" visual diagram shows the topology of devices, hub, and cloud. Finally, a "Plan Your Zakey Smart Project" CTA band closes the page with a primary "Get a Quote" and a secondary "Talk to a Specialist" CTA.

**Why this priority**: The detail pages do the heavy emotional lifting that the hardware catalog cannot. They are also the canonical pages real estate developers, hotel groups, and interior designers will share internally as proposals. Six of the eight detail pages are required at MVP.

**Independent Test**: Open each of the six required detail pages (Smart Villa, Smart Apartment, Smart Hotel, Smart Office, Smart Compound, Gaming Room) directly in a browser. Every page renders the same nine sections in the same order, with content tailored to that space. No section is empty. Every "Recommended Products" card links to a real product page in Phase 02. Every "Get a Quote" CTA lands at `../index.html#get-quote`. Every "Talk to a Specialist" CTA lands at `./contact.html`. No console errors. Three integrity gates exit 0.

**Acceptance Scenarios**:

1. **Given** the visitor lands on `pages/solution-smart-villa.html`, **When** the page first paints, **Then** the hero shows above the fold, and below it the nine required sections render in this order: Hero → Problem → Zakey Solution → Included Systems → Automation Scenarios → Recommended Products → Benefits → How It Connects → Final CTA.
2. **Given** the visitor clicks any Recommended Products card on any detail page, **When** the link resolves, **Then** the browser navigates to that product's Phase 02 detail page or anchored catalog card (no broken link).
3. **Given** the visitor clicks "Get a Quote" on any detail page, **When** the link resolves, **Then** the browser navigates to `../index.html#get-quote` and scrolls to the Phase 01 quote form.
4. **Given** the visitor clicks "Explore Products" (the secondary hero CTA), **When** the link resolves, **Then** the browser navigates to `pages/products.html`.
5. **Given** the visitor reads the "Problem" and "Zakey Solution" sections on Smart Villa vs. Smart Hotel vs. Smart Office, **When** comparing the copy, **Then** the language, pain points, and outcomes are distinct per space — no copy-paste between pages.
6. **Given** the visitor inspects the "Included Systems" grid on any detail page, **When** counting the cards, **Then** at least six subsystem cards are visible with an icon, a title, and a one-line description tailored to that space.

---

### User Story 3 — Visitor uses the visual diagram to understand the ecosystem topology (Priority: P2)

A more technical buyer (a system integrator evaluating Zakey for a real-estate developer client, or a hotel IT manager) wants to see how the pieces fit together before requesting a quote. The "How It Connects" section on every detail page renders an inline SVG diagram showing the hub-and-spoke topology: the Zakey Mesh Bridge at the centre, lines branching out to the subsystems present in that solution (lighting, climate, security, etc.), and a single line connecting up to "Zakey Cloud + App + Voice". The diagram is decorative-but-meaningful — it's not interactive, but it answers the "is this a serious platform?" question at a glance. Captions next to the diagram name each subsystem and link to its product anchor.

**Why this priority**: Technical buyers don't trust marketing pages without infrastructure visibility. This is the section that turns a "looks pretty" detail page into a credible technical proposal artefact.

**Independent Test**: On any of the six detail pages, the "How It Connects" section renders an SVG diagram inline (no external image, no JS injection). The diagram visually distinguishes the central hub, the subsystem nodes, and the cloud connection. Captions or labels name each subsystem present in that solution.

**Acceptance Scenarios**:

1. **Given** the visitor reaches the "How It Connects" section on Smart Villa, **When** the SVG renders, **Then** at least seven distinct subsystem nodes are visible around the central hub, with one node labelled "Zakey Cloud".
2. **Given** the visitor reaches the "How It Connects" section on Gaming Room, **When** the SVG renders, **Then** the diagram emphasises entertainment / lighting / climate nodes and de-emphasises subsystems irrelevant to that space (e.g., curtains may be omitted, perimeter cameras may be omitted) — the diagram is tailored, not copy-pasted.
3. **Given** the visitor uses a screen reader on the diagram, **When** the SVG is reached, **Then** the SVG has a `<title>` element describing the topology in one sentence, and decorative paths are `aria-hidden="true"`.

---

### User Story 4 — Mega-menu deep-links and homepage solution slides route to the correct detail page (Priority: P2)

The Phase 01 header mega-menu has six "Solutions" cells (Smart Villa, Smart Apartment, Smart Hotel, Smart Office, Smart Compound, Gaming Room) that currently link to anchors like `pages/solutions.html#smart-villa`. The Phase 01 homepage also has a "Solutions" preview section with four solution cards. Phase 03 makes those deep links functional: clicking any mega-menu cell deep-links to the overview page with the corresponding category tab pre-activated (e.g., `#smart-villa` → "Residential" tab activates and the Smart Villa card is the first visible). Clicking any homepage solution card navigates directly to that solution's detail page.

**Why this priority**: Phase 01 wired the mega-menu links but they currently land on a placeholder solutions page with no working filter. Phase 03 completes that promised navigation. This is functional plumbing, not net-new UX, so it slots after the MVP page work.

**Independent Test**: On the homepage, hover the "Solutions" mega-menu trigger; click each of the six cells; verify each one lands on `pages/solutions.html` with the right category tab active or scroll-anchored to the right card. On the homepage's "Solutions" preview section, click each preview card and verify it navigates to the matching detail page.

**Acceptance Scenarios**:

1. **Given** the visitor clicks the "Smart Hotel" cell in the header mega-menu, **When** the link resolves, **Then** the browser opens `pages/solutions.html#smart-hotel` and the "Hospitality" tab is pre-activated; the Smart Hotel card is the first or only visible card.
2. **Given** the visitor clicks the homepage's "Smart Villa" solution-preview card, **When** the link resolves, **Then** the browser navigates directly to `pages/solution-smart-villa.html`.
3. **Given** the visitor's browser blocks JavaScript, **When** they click any mega-menu solution cell, **Then** the page still loads `pages/solutions.html` and the full unfiltered card grid is visible (no JS errors, no broken filter state).

---

### User Story 5 — Optional pages extend the catalog with Elderly Care and Smart Retail (Priority: P3)

If scope and time allow, Phase 03 also ships `pages/solution-elderly-care.html` and `pages/solution-smart-retail.html`. These follow the same nine-section template but target a more specialised audience — Elderly Care speaks to multi-generational households and care-home operators, with a stronger emphasis on safety, fall-detection, and emergency support; Smart Retail speaks to boutique-shop and showroom owners, with emphasis on customer-flow lighting, climate comfort, and after-hours security.

**Why this priority**: These two pages broaden the addressable market but are not the primary funnel for the launch cohort (homeowners, hoteliers, developers, gamers). They can ship in a Phase 03 polish pass after the six required pages are validated.

**Independent Test**: If shipped, each optional page renders with all nine sections, distinct content and visuals, and passes all three integrity gates. The overview page includes their cards in the grid and they appear under the correct category tab (Elderly Care under "Lifestyle"; Smart Retail under "Commercial").

**Acceptance Scenarios**:

1. **Given** Phase 03 ships the optional pages, **When** the visitor visits `pages/solution-elderly-care.html`, **Then** the page renders with all nine sections, the hero communicates safety and dignity (not childishness), and the Recommended Products strip surfaces sensor-, lock-, and panel-class products.
2. **Given** Phase 03 ships the optional pages, **When** the visitor filters the overview page by "Lifestyle", **Then** Elderly Care (and Gaming Room) appear in the result; under "Commercial", Smart Retail appears.

---

### Edge Cases

- **JS-disabled visitors**: All page content (heros, problem/solution copy, system cards, scenarios, products, benefits, diagrams, CTAs) is rendered as static HTML. Only the overview-page category filter becomes inert. No card or CTA breaks without JS.
- **Deep-link to an unknown category**: `pages/solutions.html#unknown-category` falls back to the "All" tab; no JS error.
- **Deep-link to an anchor on the overview page that matches a card ID**: `pages/solutions.html#smart-villa` activates the matching category tab AND scrolls the card into view (browser anchor behaviour, not custom JS).
- **Visitor lands directly on a solution detail page** without going through the overview: every detail page is self-contained, with its own hero, all nine sections populated, and CTAs that route to the homepage quote anchor without requiring overview-page context.
- **Recommended Products card on a detail page references a product that has no flagship detail page**: the "View Details" CTA on the related-product card resolves to `pages/products.html#product-zakey-<slug>` (the catalog anchor), matching the Phase 02 fallback for non-flagship products (Phase 02 FR-062).
- **Mobile viewport at 360 px**: every section (including the visual-diagram SVG) stays readable, the included-systems grid collapses to a single column, the recommended-products row scrolls horizontally or stacks. No copy is truncated and no buttons clip.
- **Right-to-left language fallback**: out of scope for Phase 03 (English-only). The HTML uses `<html lang="en">` and `dir="ltr"`; future i18n is non-blocking.
- **Image asset missing for an optional page**: if Elderly Care or Smart Retail SVGs are not ready, those pages are not shipped this phase; the overview-page grid does not link to dead files.

## Requirements *(mandatory)*

### Functional Requirements

**Overview page (`pages/solutions.html`)**:

- **FR-001**: The page MUST render a hero section with the headline "Smart Solutions for Every Space", a positioning paragraph (40–80 words), and two CTAs: a primary "Plan Your Project" / "Get a Quote" CTA and a secondary "Explore Products" CTA.
- **FR-002**: The hero MUST include a meaningful lifestyle visual (image or composed SVG) above the fold on desktop.
- **FR-003**: The page MUST render a category filter toolbar with at least six buttons: "All", "Residential", "Hospitality", "Commercial", "Real Estate", "Lifestyle".
- **FR-004**: The page MUST render a grid of at least eight solution cards. Each card MUST contain: a hero image, a category eyebrow (e.g., "Residential"), a solution title (h3), a one-sentence positioning line, an explicit "For:" line naming the target user (e.g., "For: villa owners, premium homebuilders"), exactly four benefit chips, and a primary CTA "Discover this solution".
- **FR-005**: Each solution card MUST carry a `data-solution` flag and a `data-category` attribute matching one of the canonical category slugs (`residential`, `hospitality`, `commercial`, `real-estate`, `lifestyle`).
- **FR-006**: Solutions whose audience spans multiple categories MAY carry `data-category` with multiple space-separated slugs (e.g., `residential lifestyle`); the filter MUST treat such cards as matching any of those categories.
- **FR-007**: When a category tab is clicked, the page MUST update `aria-pressed` on the clicked tab, clear it on the previously-active tab, and toggle a `.is-hidden` class on every card whose `data-category` does not include the active slug.
- **FR-008**: When the page loads with a URL hash matching a category slug (e.g., `#hospitality`) or a solution slug (e.g., `#smart-hotel`), the page MUST pre-activate the matching tab; if the hash is a solution slug, the page MUST activate the tab covering that solution's primary category.
- **FR-009**: A live visible-count line above the grid MUST update with the number of visible cards as the filter changes; the count MUST be wrapped in `aria-live="polite"` for screen-reader announcement.
- **FR-010**: Every solution card's "Discover this solution" CTA MUST link to its detail page using the path `./solution-<slug>.html` (e.g., `./solution-smart-villa.html`). The slug MUST match the detail-page filename.
- **FR-011**: The overview page MUST include a final CTA band ("Build with Zakey" / "Plan Your Project") with a primary "Get a Quote" link to `../index.html#get-quote` and a secondary "Talk to a Specialist" link to `./contact.html`.

**Solution detail pages (`pages/solution-<slug>.html`)**:

- **FR-020**: Each detail page MUST render exactly nine sections in the following order: (1) Hero, (2) Problem, (3) Zakey Solution, (4) Included Systems, (5) Automation Scenarios, (6) Recommended Products, (7) Benefits, (8) How It Connects (visual diagram), (9) Final CTA.
- **FR-021**: The Hero section MUST include: a category eyebrow, an h1 with the solution title, a one-sentence subtitle (40–120 chars), a 2–3 sentence positioning paragraph, two CTAs ("Get a Quote" → `../index.html#get-quote`; "Explore Products" → `./products.html`), and a lifestyle image with descriptive alt text. The lifestyle image MUST be unique per solution.
- **FR-022**: The Problem section MUST name 3 to 5 specific pain points for that space — each as a short statement (a leading h3 or bold lead followed by 1–2 sentences). Pain points MUST be specific to the space, not generic smart-home grievances.
- **FR-023**: The Zakey Solution section MUST narrate how Zakey solves the listed pain points using its hardware ecosystem and software. It MUST reference (by name) at least three Zakey subsystems (e.g., Aura Panel, Mesh Bridge, Sense Engine, Climate Hub).
- **FR-024**: The Included Systems section MUST render at least six subsystem cards. Each card MUST have an icon (inline SVG), a title (e.g., "Lighting Control"), and a 1–2 sentence description tailored to that solution.
- **FR-025**: The Automation Scenarios section MUST render at least three scenario cards. Each scenario MUST follow the When/Then format established in Phase 02 (`<strong>When</strong> [trigger]` / `<strong>Then</strong> [action]`) and MUST be tailored to that space (no copy-paste between detail pages).
- **FR-026**: The Recommended Products section MUST render at least three product cards using the Phase 02 `.card-product` component, with images, names, descriptions, three tag chips, and CTAs (`View Details` → flagship detail page if applicable, else `pages/products.html#product-zakey-<slug>`; `Request Quote` → `../index.html#get-quote`).
- **FR-027**: The Benefits section MUST list at least six client-facing benefits from this canonical set: Comfort, Security, Energy Efficiency, Premium UX, Centralized Management, Scalability (or solution-specific equivalents like "Safety", "Guest Experience", "Brand Polish", "Cost Reduction"). Each benefit MUST have a short headline and a 1-line justification.
- **FR-028**: The How It Connects section MUST render an inline SVG topology diagram showing the central Zakey hub, at least five subsystem nodes branching from it, and a Zakey Cloud connection. The diagram MUST have a `<title>` element describing the topology in one sentence and `aria-hidden="true"` on decorative paths.
- **FR-029**: The Final CTA section MUST include the heading "Plan Your Zakey Smart Project", a 1-sentence reassurance line, and two CTAs ("Get a Quote" → `../index.html#get-quote`; "Talk to a Specialist" → `./contact.html`).
- **FR-030**: Each detail page MUST use `<body data-page="solution-detail">` so future scripts can identify it.

**Shell consistency and cross-page wiring**:

- **FR-040**: Every Phase 03 page MUST reuse the Phase 01 header and footer shells byte-identically. The shell-consistency gate MUST pass after every Phase 03 page is added.
- **FR-041**: The Phase 01 header mega-menu's six "Solutions" cells already deep-link to `pages/solutions.html#<slug>`. Phase 03 MUST ensure those slugs resolve to working category-tab pre-activations on the overview page. No changes to header HTML are required.
- **FR-042**: The Phase 01 homepage's "Solutions" preview section currently links to placeholder anchors. Phase 03 MUST update each of those CTAs to point to the corresponding solution detail page (`./pages/solution-<slug>.html`).
- **FR-043**: Every "Get a Quote" CTA across Phase 03 pages MUST resolve to `../index.html#get-quote` (the Phase 01 form anchor).
- **FR-044**: Every "Talk to a Specialist" CTA across Phase 03 pages MUST resolve to `./contact.html` (no new contact-page work in Phase 03).

**Visuals and content quality**:

- **FR-050**: Every solution card and every detail-page hero MUST reference an image file under `assets/images/solutions/<slug>.svg` (or `.jpg` if real photography is available); the filename MUST stay realistic (no `placeholder-1.svg`).
- **FR-051**: Solution-specific lifestyle images MUST be unique per page — no shared hero image between two solution pages.
- **FR-052**: Detail pages MUST include at least three meaningful visuals in addition to the hero: the included-systems icons, the recommended-products images, and the How It Connects diagram.
- **FR-053**: No Lorem ipsum, no forbidden brand strings ("lifesmart", "ilifesmart", "CoSS", "AI Builder", "Fusion Link"), no empty cards or TBDs. Every required field on every page MUST be populated.
- **FR-054**: Every page MUST have a non-empty `<title>` and `<meta name="description">`. The title MUST be solution-specific (e.g., "Smart Villa — Luxury Whole-Home Automation by Zakey").

**Accessibility and progressive enhancement**:

- **FR-060**: Every Phase 03 page MUST include the Phase 01 skip-link (`<a class="skip-link" href="#main">Skip to main content</a>`) as the first focusable element.
- **FR-061**: Every Phase 03 page MUST have exactly one `<h1>` (the page title in the hero); subsequent sections use `<h2>` with `aria-labelledby`-style associations.
- **FR-062**: The overview-page filter tabs MUST use `role="toolbar"` with `aria-label` and `aria-pressed` on each button (matching the Phase 02 catalog-filter pattern).
- **FR-063**: All page content (hero, problem, solution, systems, scenarios, products, benefits, diagram, CTAs) MUST exist as static HTML. JavaScript MUST NOT inject primary content. JavaScript MAY toggle visibility classes, swap image attributes, or move `aria-pressed`.

**Integrity gates and toolchain**:

- **FR-070**: After Phase 03 is complete, `scripts/check-shell-consistency.sh`, `scripts/check-content-rules.sh`, and `scripts/check-links.sh` MUST all exit 0 against the full file set (Phase 01 + Phase 02 + Phase 03).
- **FR-071**: The CSS file `css/styles.css` MUST stay ≤ 64 KB after Phase 03 component classes are added (a relaxed +4 KB allowance over Phase 02's 60 KB cap to accommodate new solution-page components — see Assumptions).
- **FR-072**: No new JavaScript file is required beyond a thin `js/solutions.js` (≤ 4 KB) that wires the overview-page filter and URL-hash pre-activation. Total JS across all modules MUST stay ≤ 30 KB.

### Key Entities

- **Solution**: A use-case-and-space combination Zakey serves (e.g., Smart Villa, Smart Hotel). Attributes: slug, title, category slug(s), audience description, four headline benefits, hero image path, positioning line, list of 3–5 pain points, list of ≥ 3 scenarios, list of ≥ 6 included subsystems, list of ≥ 3 recommended products, list of ≥ 6 benefits, How-It-Connects topology graph. Relationships: each Solution links to ≥ 3 Products via the Recommended Products section, and is tagged into ≥ 1 Category.
- **Category**: A grouping of solutions by buyer/audience profile. Five canonical slugs: `residential`, `hospitality`, `commercial`, `real-estate`, `lifestyle`. Relationships: each Solution belongs to one or more Categories.
- **Subsystem**: A Zakey hardware/software domain that a solution includes. Eight canonical subsystems: Central Control, Lighting, Curtains & Shading, Climate / HVAC, Security, Sensors, Energy, App & Voice. Used as the eight cells in the Included Systems grid on each detail page (some solutions may show only six or seven if a subsystem is irrelevant to that space, e.g., Curtains is omitted from Gaming Room).
- **Scenario**: A When/Then automation vignette tailored to a solution. Attributes: context label (e.g., "Morning routine"), trigger sentence, action sentence. At least three per detail page.
- **Filter State**: The overview page's filter state. Attributes: active category slug, visible solution count. Persisted in DOM via `aria-pressed` on tabs and `.is-hidden` on cards.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A first-time visitor can navigate from the homepage hero to a solution detail page that matches their use case in ≤ 2 clicks (homepage → solutions overview → detail page) and ≤ 30 seconds elapsed reading time, on a desktop or mobile browser.
- **SC-002**: A visitor who lands on `pages/solutions.html#smart-hotel` (deep link from the mega-menu) sees the Hospitality tab pre-activated and the Smart Hotel card as the first or only visible card within 1 second of page load.
- **SC-003**: 100% of "Discover this solution" CTAs on the overview page resolve to the correct detail page file with no broken links (validated by the link-integrity gate).
- **SC-004**: 100% of "Get a Quote" CTAs on Phase 03 pages resolve to `index.html#get-quote` (validated by the link-integrity gate).
- **SC-005**: 100% of "Recommended Products" cards on detail pages link to a real product detail page or catalog anchor — no broken links to non-existent product slugs.
- **SC-006**: Every detail page can be read end-to-end in under 5 minutes by a non-technical buyer (≤ 2,500 words total per page including hero copy through final CTA).
- **SC-007**: Visual sweep at 360 px / 768 px / 1024 px / 1440 px shows no layout breaks: every section stays readable, no horizontal scroll on body, every image scales, every CTA stays tappable (≥ 44 × 44 px touch target).
- **SC-008**: Each detail page weighs ≤ 200 KB (HTML) and the page-load image bytes (hero + first 4 system icons) total ≤ 60 KB on first paint; total page load ≤ 1.5 MB on a 3G-fast simulated network.
- **SC-009**: At least 6 of the 8 listed solutions ship with a complete detail page in Phase 03 MVP. Optional pages (Elderly Care, Smart Retail) are non-blocking.
- **SC-010**: Constitution v1.0.0 — all seven principles still pass at end of Phase 03 (no framework / no CDN; content in HTML; visual in every section; independent brand; realistic content; working UI; no half-finished sections).

## Assumptions

- **CSS budget relaxation**: Phase 02 ended at 60,015 / 61,440 bytes. Phase 03 adds new component families (solution-hero, solution-card, problem-list, scenario-card, subsystem-card, benefit-grid, topology-diagram, final-cta band). A relaxed cap of 64 KB (≈ +4 KB) is assumed to accommodate these without dropping component clarity. If the cap proves too tight, the topology-diagram styles can be inlined per page rather than shared.
- **Image assets**: Real photography is not available; all hero and lifestyle images ship as composed SVG placeholders under `assets/images/solutions/`, following the Phase 02 placeholder convention (brand gradient + minimal scene silhouette). Filenames are realistic (`smart-villa.svg`, `smart-hotel.svg`, etc.) so a future photo drop swaps the file extension without touching markup.
- **Header/footer shells**: Phase 03 reuses the Phase 01 header (with mega-menu and mobile drawer) and footer byte-identically. No header or footer changes are required for Phase 03. The shell-consistency gate enforces this.
- **Solution categories**: Five categories — `residential`, `hospitality`, `commercial`, `real-estate`, `lifestyle` — cover the eight solutions: Smart Villa & Smart Apartment → Residential; Smart Hotel → Hospitality; Smart Office & Smart Retail (optional) → Commercial; Smart Compound → Real Estate; Gaming Room & Elderly Care (optional) → Lifestyle. A solution may belong to more than one category (e.g., Elderly Care could carry both `lifestyle residential`).
- **Optional pages scope**: Elderly Care and Smart Retail pages are non-blocking for Phase 03 MVP. If shipped, they follow the same nine-section template; if not shipped, their cards are NOT added to the overview-page grid (no dead-link risk).
- **Quote form reuse**: All "Get a Quote" CTAs land on the Phase 01 homepage quote form (`index.html#get-quote`). No new form work in Phase 03.
- **Contact page**: All "Talk to a Specialist" CTAs land on `pages/contact.html` (the Phase 01 placeholder page). Contact-page completeness is a Phase 04 / Phase 05 concern, not blocking for Phase 03.
- **Visual-diagram format**: The "How It Connects" diagram is an inline SVG, not an external image. This keeps content in HTML, makes it scalable and accessible (with `<title>`), and avoids an additional image-loading roundtrip per detail page.
- **No new JS module loader logic**: `js/main.js` adds one conditional import — `js/solutions.js` when `document.getElementById('solutions-grid')` is present. Detail pages do not need their own JS module in Phase 03 (no galleries, no filters); they remain pure static HTML.
- **Tab pattern reuse**: The overview-page category filter reuses the Phase 02 `.filter-pill` component family and the `role="toolbar"` + `aria-pressed` pattern from `js/products.js`. Where possible, the same `applyFilters()` shape from `products.js` is adapted for `solutions.js` (single function, AND-of-conditions, `.is-hidden` toggle).
- **Mobile-first**: All layouts are designed to collapse gracefully to single-column at ≤ 480 px. The overview-page card grid uses CSS Grid with `auto-fill` `minmax(280px, 1fr)`. Detail-page sections use the same Phase 02 utilities (`u-section`, `u-container`).
- **Phase 02 dependencies**: Phase 03 detail pages reuse the Phase 02 `.card-product` component class for the Recommended Products strip, the Phase 02 `.product-features` pattern for the Included Systems grid, the Phase 02 `.product-scenarios` pattern for the Automation Scenarios section, and the Phase 02 button family (`.btn`, `.btn--primary`, `.btn--secondary`). No re-styling of those components.
- **No backend**: All pages are static HTML. No CMS, no server-side rendering, no API calls.
- **English-only**: All copy is English. RTL/i18n is out of scope for Phase 03.
