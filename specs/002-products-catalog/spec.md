# Feature Specification: Zakey Phase 02 — Product Catalog & Product Detail Pages

**Feature Branch**: `002-products-catalog`
**Created**: 2026-05-14
**Status**: Draft
**Input**: User description: "Phase 02 — premium product catalog page with filter/search and at least four product detail pages, built on the Phase 01 shell and design system. HTML + Tailwind (locally compiled) + vanilla JS only. No frameworks, no CDN, no JS-injected primary content."

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Visitor scans the full Zakey range by category (Priority: P1) 🎯 MVP

A prospective buyer (homeowner, hotel operator, real-estate developer, or installer) lands on the products page, sees a hero with positioning copy, then scans a grid of every Zakey device organised into clear categories (Central Control, Smart Switches, Security, Sensors, Lighting, Curtains & Shading, Climate / HVAC, Energy Management, Entertainment, Accessories). They can quickly narrow the grid to one category by clicking a filter pill, and recover the full list by clicking "All".

**Why this priority**: The catalog is the centre of the Phase 02 work. Without it, prospects cannot perceive Zakey's breadth and the rest of the funnel collapses. Category filtering is the single highest-impact discovery mechanism for a 24+ product line.

**Independent Test**: Open `pages/products.html`, count ≥ 24 product cards visible by default, click each category pill in turn and confirm the visible grid changes to only that category's cards (with a non-empty result for every shipped category), click "All" to restore the full set. Verify no console errors and that filtering responds without a network round-trip.

**Acceptance Scenarios**:

1. **Given** the products page is open, **When** the visitor first loads it, **Then** they see a hero, a positioning paragraph, a large catalog visual, a row of category filter pills with "All" pre-selected, a search input, and a grid of ≥ 24 product cards.
2. **Given** the visitor clicks the "Security" pill, **When** the filter applies, **Then** only Security cards remain visible, the "Security" pill is visually selected (with `aria-pressed="true"`), the others are deselected, and a live count ("Showing N of 24+") updates.
3. **Given** a category has been selected, **When** the visitor clicks "All" (or the same pill again), **Then** every card returns to the grid.

---

### User Story 2 — Visitor opens a product detail page and requests a quote (Priority: P1)

From any product card on the catalog (or from internal links elsewhere on the site), the visitor clicks "View Details" and lands on a premium product detail page. They see the product hero with image, name, category, tagline, and two CTAs (Request Quote / Download Specs). They scroll through Overview, Key Features (icon cards), Smart Scenarios, Technical Specifications (table), Compatibility (mobile app / voice assistants / scenes / sensors / central hub), and Related Products. They click "Request a Quote" and arrive at the existing quote form on the homepage anchor.

**Why this priority**: A catalog without working detail pages is theatre. Detail pages are where conversion happens — the Request-Quote CTA from a detail page is the single most valuable click on the site.

**Independent Test**: From `pages/products.html`, click the View Details link on the Aura Panel card, land on `pages/product-zakey-aura-panel.html`, verify every required section is present and visually populated, click "Request a Quote", and confirm landing on `../index.html#get-quote` (the existing Phase 01 quote form). Repeat for at least four detail pages (Aura Panel, Secure Kit, Smart Switch Series, Climate Hub).

**Acceptance Scenarios**:

1. **Given** the visitor is on a product card, **When** they click "View Details", **Then** they navigate to the corresponding detail page where they see a hero with image, name, category, tagline, and both CTAs above the fold on desktop.
2. **Given** the visitor is on a detail page, **When** they scroll, **Then** all eight sections appear in order: Hero → Overview → Key Features → Smart Scenarios → Technical Specifications → Compatibility → Related Products → Final CTA.
3. **Given** the visitor clicks "Request a Quote" on a detail page, **When** the page loads, **Then** they arrive at the existing Phase 01 quote form anchor and the form is ready to accept input.

---

### User Story 3 — Visitor narrows products with a search keyword (Priority: P2)

The visitor uses the search input on the catalog to filter products by typing part of a product name, category, or feature tag (e.g., "thermostat", "outdoor", "energy"). The grid updates as they type. An empty-state appears if no products match.

**Why this priority**: Search complements category browsing and is critical for visitors who already know what they want. Lower than P1 because the category filter alone delivers the MVP.

**Independent Test**: Type "camera" into the search input on `pages/products.html`. Confirm only Security cards mentioning camera remain visible (Indoor Camera, Outdoor Camera). Clear the input — full grid returns. Type a random string ("xyz123") — an empty-state card appears with copy explaining no products match and a "Clear search" reset.

**Acceptance Scenarios**:

1. **Given** the visitor types a substring, **When** their input matches a product name, description, or tag (case-insensitive), **Then** that product remains visible; non-matching products are hidden.
2. **Given** a category filter is also active, **When** the visitor types in the search box, **Then** the result is the intersection (category AND search).
3. **Given** no products match the query, **When** the grid would be empty, **Then** an empty-state card appears with a "Clear search" button that restores results.

---

### User Story 4 — Visitor switches detail-page gallery thumbnails (Priority: P3)

On product detail pages with multiple visual angles, the visitor clicks one of three small thumbnails below (or beside) the main image to swap which visual is displayed in the hero. The main image updates, the selected thumbnail is visually highlighted, and the change is announced to assistive tech.

**Why this priority**: Polish — it elevates the detail page to feel "real-product-page" tier, but the page is fully usable with just the primary image. P3 because it can be omitted without breaking conversion.

**Independent Test**: Open `pages/product-zakey-aura-panel.html`, click the second thumbnail, confirm the main hero image updates to a different visual, the second thumbnail gets an "active" treatment, the first loses it, and that focus and `aria-selected` track the active thumbnail.

**Acceptance Scenarios**:

1. **Given** a detail page has ≥ 2 thumbnails, **When** the visitor clicks one, **Then** the main image updates to that thumbnail's source within 100 ms and the active state moves with the click.
2. **Given** a thumbnail is active, **When** the visitor presses arrow keys, **Then** active state moves to the next/previous thumbnail and the main image follows.

---

### Edge Cases

- **Empty filter result for one specific category combined with a search** — the empty-state card must appear and the "Clear search" button must restore.
- **Search input contains diacritics or punctuation** — the matcher normalises (case-insensitive, raw substring) and does not throw.
- **A product is referenced by `?id=…` from an external campaign link** but Phase 02 detail pages are static — out of scope; campaign links should target the static page URLs directly.
- **JavaScript fails to load** — every product card still renders, "View Details" links still navigate (basic functionality preserved per Constitution Principle II), but the filter pills become non-interactive (acceptable graceful degradation; cards remain visible and navigable).
- **Visitor opens the catalog on a 360 px phone** — the filter pills must wrap or scroll horizontally without overflowing the viewport; cards collapse to a single column.
- **A detail page CTA's anchor target is removed** — the link resolves to `../index.html` (homepage) so the visitor lands in a usable state rather than seeing a 404.

## Requirements *(mandatory)*

### Functional Requirements — Catalog Page

- **FR-001**: The site MUST provide a `pages/products.html` route that renders without JavaScript executing first; every product card and the hero copy MUST exist as static HTML.
- **FR-002**: The catalog page MUST include a hero section titled "Zakey Smart Products" with positioning copy referencing homes, villas, hotels, offices, and real-estate projects, plus a large catalog visual or banner.
- **FR-003**: The catalog MUST present ≥ 10 category filter controls covering: Central Control, Smart Switches, Security, Sensors, Lighting, Curtains & Shading, Climate / HVAC, Energy Management, Entertainment, Accessories. An "All" pill MUST exist and start active.
- **FR-004**: The catalog MUST present ≥ 24 product cards distributed across categories with no category empty.
- **FR-005**: Every product card MUST contain: an image, a category label, a product name, a short description (≤ 140 characters), exactly 3 feature tags, a "View Details" link to that product's detail page, and a "Request Quote" link to the homepage quote anchor.
- **FR-006**: Product cards MUST have a visibly premium hover state (elevation / accent border / sub-shift); hover state MUST NOT rely on JavaScript.
- **FR-007**: Clicking a category filter MUST visually hide non-matching cards and update an `aria-pressed` state on the active pill; this MUST happen without a network round-trip.
- **FR-008**: The catalog MUST expose a search input that filters product cards by case-insensitive substring match across the card's name, description, and tag set.
- **FR-009**: When category filter and search are both active, the visible result MUST be the intersection.
- **FR-010**: When no cards match the current category × search combination, an empty-state element MUST appear inside the grid with a "Clear search" button that resets the search input (the category filter remains active).
- **FR-011**: A live count of visible products MUST update in response to filter or search changes.
- **FR-012**: All category links and product links MUST resolve to real files in this repository — confirmed by the existing `scripts/check-links.sh` gate.

### Functional Requirements — Product Detail Pages

- **FR-020**: The site MUST ship ≥ 4 product detail pages: `pages/product-zakey-aura-panel.html`, `pages/product-zakey-secure-kit.html`, `pages/product-zakey-smart-switch.html`, `pages/product-zakey-climate-hub.html`.
- **FR-021**: Every detail page MUST contain, in order: (1) Product Hero, (2) Overview, (3) Key Features, (4) Smart Scenarios, (5) Technical Specifications, (6) Compatibility, (7) Related Products, (8) Final CTA. Sections MUST be visible by default — no accordion-only reveal.
- **FR-022**: The Product Hero MUST include a main product image, the product name as the page's single `<h1>`, the category label, a one-line tagline, and two CTAs labelled "Request a Quote" (primary) and "Download Specs" (secondary).
- **FR-023**: The Overview section MUST describe what the product does and where it is used (1–2 short paragraphs).
- **FR-024**: The Key Features section MUST present ≥ 4 features as visual icon cards (icon + title + short description).
- **FR-025**: The Smart Scenarios section MUST present ≥ 3 realistic automation examples (e.g., "When motion is detected after midnight, hallway lights fade up to 25%").
- **FR-026**: The Technical Specifications section MUST render a definition-list / table with rows for Power, Connectivity, Compatibility, Installation Type, Material, Dimensions, and Supported Spaces — all populated with realistic values, no placeholders.
- **FR-027**: The Compatibility section MUST show five compatibility chips/cards: Mobile App, Voice Assistants, Scenes, Sensors, Central Hub — each with one-line context.
- **FR-028**: The Related Products section MUST show 3–4 product cards using the same card markup as the catalog grid.
- **FR-029**: The Final CTA section MUST present a strong call to action with a "Request a Quote" link to the homepage quote anchor and a "Talk to a Zakey Specialist" link to `pages/contact.html`.
- **FR-030**: Every detail page MUST provide ≥ 3 visual areas: a main product image, a use-case / lifestyle visual (in Smart Scenarios or Overview), and either related-product images or feature visuals.
- **FR-031**: Detail pages with a thumbnail strip MUST let the visitor switch the main image by clicking or by keyboard navigation; the active thumbnail MUST get `aria-selected="true"`.
- **FR-032**: The "Download Specs" CTA MUST link to a real target — either an in-page anchor (`#tech-specs`) or a static asset path — never a dead `#` or a "coming soon" stub.

### Functional Requirements — Shell, Design System, Integrity

- **FR-040**: The Phase 01 header and footer shells MUST be reused byte-for-byte (after path-prefix normalisation) on every Phase 02 page; the existing `scripts/check-shell-consistency.sh` gate MUST pass.
- **FR-041**: Every Phase 02 page MUST use the existing design tokens, button styles, card styles, and form field styles from `src/input.css`. Product cards in Phase 02 MUST reuse the same `.card-product` family as on the homepage (extended where strictly necessary).
- **FR-042**: New CSS additions for the catalog filter UI, detail-page sections, and any new visual treatments MUST live in `src/input.css` and be re-compiled into `css/styles.css` (no inline `<style>`, no new stylesheets).
- **FR-043**: JavaScript for category filtering, search, and gallery switching MUST live in `js/products.js` (loaded only on the catalog page) and `js/product-detail.js` (loaded only on detail pages) — both must use the same module pattern as Phase 01.
- **FR-044**: No JavaScript MUST inject primary product content. All product cards and detail-page sections MUST exist in HTML before any script runs.
- **FR-045**: Every page MUST satisfy the three Phase 01 integrity gates: `scripts/check-shell-consistency.sh`, `scripts/check-content-rules.sh`, `scripts/check-links.sh` — all exit 0.
- **FR-046**: No page MUST contain the strings "lorem ipsum", "lifesmart", "ilifesmart", "CoSS", "AI Builder", or "Fusion Link" (case-insensitive).
- **FR-047**: Every new page MUST have exactly one `<h1>`, a non-empty `<title>`, and a non-empty `<meta name="description">`.
- **FR-048**: Every product image MUST have descriptive `alt` text (decorative-background images MAY use empty alt).
- **FR-049**: Every page MUST resolve under the existing focus-ring / colour-contrast / reduced-motion rules established by Phase 01's CSS (no regressions in the constitution-compliance sweep).

### Functional Requirements — Navigation & Cross-Linking

- **FR-060**: The existing site header's Products mega-menu MUST link to `pages/products.html` from the "All products" CTA and from each category anchor; each category anchor MUST land at `pages/products.html#<category-slug>` and the catalog page MUST visually scroll the matching filter into view.
- **FR-061**: The catalog category anchors (`#central-control`, `#smart-switches`, `#security`, `#sensors`, `#lighting`, `#curtains-shading`, `#climate`, `#energy`, `#entertainment`, `#accessories`) MUST exist on `pages/products.html` and MUST also pre-activate the corresponding filter when the URL hash matches a known category on page load.
- **FR-062**: Internal Phase-01 placeholder products (homepage "Signature products" slider + "Featured Products" 8-card grid) MUST have their "Discover" / "View Details" CTAs updated where their product has a detail page in Phase 02; otherwise they continue to link to `pages/products.html`.

### Key Entities

- **Product** — represents a single Zakey device. Attributes: stable id (slug), display name, category id, image path, short description, three feature tags, list of key-feature entries, list of smart-scenario entries, specifications object, compatibility chips, ordered list of related-product ids.
- **Category** — represents one of the ten product categories. Attributes: id (slug), display name, count of products in this category, brief one-line definition (used in catalog anchors / mega-menu).
- **Specification** — the structured tech-specs row set on each detail page. Attributes: power, connectivity, compatibility, installation type, material, dimensions, supported spaces — all free-text strings.
- **SmartScenario** — a single example automation on a detail page. Attributes: trigger (what's sensed), action (what happens), context (room/time/condition).
- **CompatibilityChip** — a labelled card stating one of: Mobile App, Voice Assistants, Scenes, Sensors, Central Hub, each with a one-line context string.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A first-time visitor lands on `pages/products.html` and locates a product they're interested in within 30 seconds, measured via interaction trace at desktop and 375 px viewports.
- **SC-002**: 100 % of category filter clicks and search keystrokes produce a visible grid update within 200 ms (perceived latency), without a network round-trip.
- **SC-003**: All product cards (≥ 24) render before any JavaScript executes — verifiable by disabling JS and reloading.
- **SC-004**: At least 4 product detail pages (Aura Panel, Secure Kit, Smart Switch Series, Climate Hub) ship with every required section populated and zero placeholder copy.
- **SC-005**: 100 % of "Request a Quote" CTAs across the catalog and detail pages lead to the working Phase 01 quote form anchor on the homepage.
- **SC-006**: 0 broken links / missing images / shell-divergence errors as measured by `scripts/check-shell-consistency.sh`, `scripts/check-content-rules.sh`, and `scripts/check-links.sh` (all exit 0).
- **SC-007**: 0 console errors during a desktop interaction pass that includes hovering all cards, clicking each category pill, typing in the search input, opening every detail page, and clicking every CTA.
- **SC-008**: At 375 px width, the catalog grid renders as a single column with cards taking ≥ 92 % of the viewport width; filter pills remain reachable via either wrap or horizontal scroll; no element overflows the viewport.
- **SC-009**: Phase 01's constitution compliance sweep (Principles I–VII) continues to pass with Phase 02 added: no framework/CDN, no JS-injected primary content, every section has a visual, no forbidden brand names, no lorem ipsum, gates green, no half-finished sections.

## Assumptions

- The Phase 01 design system, shell, JS module pattern, and integrity gates are stable and reused — Phase 02 adds new components inside that system without reshaping the foundation.
- Product images may be SVG placeholders for any product that lacks a real asset, following the same naming/visual convention as the Phase 01 placeholders (gradient + label / iconography). Filename paths in spec text (`zakey-aura-panel.jpg` etc.) are illustrative; the actual files committed may be `.svg` and the HTML will reference whichever extension exists.
- "Download Specs" CTAs link to an in-page `#tech-specs` anchor (which Phase 02 already creates) rather than a generated PDF; producing real PDF assets is out of scope for Phase 02.
- The Quote form lives on `index.html#get-quote` (built in Phase 01); no new quote form is introduced in Phase 02.
- The catalog has 10 categories and ~32 products at MVP; if a product in the brief lacks a detail page in Phase 02, its "View Details" CTA links to that product's anchor on the catalog page (`pages/products.html#<slug>`) until a future phase ships its dedicated page.
- All copy and product attributes are realistic but fictional. No proprietary protocol or brand names from the reference site appear anywhere.
- The four "fully built" detail pages are: Aura Panel, Secure Kit, Smart Switch Series, Climate Hub. Other products MAY ship lightweight detail pages later; at MVP they link to catalog anchors.
- Phase 02 work is done on branch `002-products-catalog`; the Phase 01 branch (`master` after the eventual merge) remains the stable baseline.
- Tablet/mobile testing is via responsive resize at 360 / 480 / 768 / 1024 / 1280 / 1440 px — no separate native build.
