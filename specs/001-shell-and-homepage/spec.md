# Feature Specification: Zakey Phase 01 — Design System, App Shell, Navigation & Homepage

**Feature Branch**: `001-shell-and-homepage`
**Created**: 2026-05-13
**Status**: Draft
**Input**: User description: "Phase 01: Design System, App Shell, Navigation, and Homepage for Zakey premium smart home / AIoT website. Inspired structurally (not visually or textually) by the iLifeSmart reference site, but Zakey must look more modern, more creative, more luxurious. Static-only stack (HTML, CSS, Tailwind compiled locally, vanilla JS). Eleven homepage sections including hero, featured-product slider, why-Zakey, ecosystem, solutions-by-space, technology preview, featured products grid, partner CTA, case studies, blog preview, and get-quote form. Premium dark-glass header with mega-menus on desktop and a hamburger drawer on mobile, plus a rich multi-column footer with newsletter and social links."

## User Scenarios & Testing *(mandatory)*

### User Story 1 — First-time visitor builds brand confidence in seconds (Priority: P1)

A first-time visitor lands on `index.html` and within seconds understands that Zakey is a premium smart-home / AIoT brand. They see a striking hero, perceive a clear value proposition, identify the two primary CTAs ("Get a Quote", "Explore Products"), and can scan the eleven homepage sections to grasp Zakey's product breadth, supported spaces, technology depth, partner program, projects, and editorial presence — all without leaving the page.

**Why this priority**: The homepage is the entire marketing funnel for Phase 01. If the brand does not register as premium and complete within the first viewport and the first scroll, no other story matters. This is the MVP.

**Independent Test**: Open `index.html` in a browser at 1440px. Within 10 seconds, the hero, header, and at least one section below the fold are visible and visually polished. Both hero CTAs resolve to a real destination (`#get-quote` and `pages/products.html`). The visitor can scroll the full page and see eleven distinct, fully populated sections with no empty cards, no missing images, no lorem ipsum, and no LifeSmart references.

**Acceptance Scenarios**:

1. **Given** the visitor opens `index.html` for the first time, **When** the hero finishes loading, **Then** the visitor sees the Zakey logo, the main headline, a supporting subheadline, two CTAs ("Get a Quote", "Explore Products"), the hero visual, and at least two supplemental floating elements (e.g., a device mockup card and an automation stat card).
2. **Given** the visitor scrolls the homepage end-to-end, **When** they pass each of the eleven sections, **Then** every section has a heading, at least one meaningful visual, complete copy (no placeholder text), and any CTA the section advertises resolves to a real link or anchor.
3. **Given** the visitor clicks any of the ten header navigation links, **When** the destination opens, **Then** the destination is a real file in the repo (a placeholder page for Phase 01 is acceptable, a 404 is not).
4. **Given** the visitor inspects the page source, **When** they search for "lifesmart", "ilifesmart", or "lorem ipsum", **Then** zero matches exist (case-insensitive).

---

### User Story 2 — Visitor uses the site on any device (Priority: P1)

The same visitor opens Zakey on a phone, a tablet, and a desktop browser. The homepage and shell adapt cleanly to every viewport: on mobile, the header collapses to a hamburger drawer; on tablet, the layout reflows to two- or three-column grids; on desktop, the header reveals mega-menus for Products and Solutions on hover or keyboard focus. No horizontal scroll, no clipped content, no overlapping elements at any breakpoint.

**Why this priority**: A site that breaks on mobile is broken, full stop. Constitution Principle VI makes responsive behaviour a non-negotiable quality gate. This story shares MVP weight with Story 1.

**Independent Test**: Resize the browser through 360px → 640px → 768px → 1024px → 1280px → 1440px. At each width: (a) the homepage renders with no horizontal scroll, (b) the header behaves correctly (hamburger ≤640px, full nav ≥1025px, mega-menu opens on hover/focus ≥1025px), (c) every section reflows into a layout appropriate for that band, (d) interactive elements remain reachable by mouse, touch, and keyboard.

**Acceptance Scenarios**:

1. **Given** the viewport is ≤640px, **When** the visitor taps the hamburger button, **Then** a full-height drawer opens listing all ten nav links plus a "Get a Quote" CTA, with a visible close affordance.
2. **Given** the viewport is ≥1025px, **When** the visitor hovers or keyboard-focuses the "Products" or "Solutions" nav item, **Then** a styled mega-menu opens within 200 ms and remains open while the pointer or focus is within it.
3. **Given** the visitor opens the mobile drawer at 480px, **When** they resize the window to 1280px, **Then** the drawer closes automatically and the desktop nav resumes without leaving a broken intermediate state.
4. **Given** the visitor uses only the keyboard, **When** they Tab through the header, hero, slider, sections, and form, **Then** every interactive element has a visible focus ring and reachable activation.

---

### User Story 3 — Prospect submits a lead via the quote form (Priority: P2)

A qualified prospect (end user, distributor, system integrator, real-estate developer, or installer) reaches the Get-Quote section, fills the form with their profile and project intent, and submits. The form validates inline as they fill it, blocks submission with clear messages if required fields are missing or malformed, shows a "submitting" state while the front-end simulates network delay, and ends in either a success state ("Thanks — we'll be in touch within one business day") or an error state with a retry affordance.

**Why this priority**: Lead capture is the primary conversion goal of the homepage but the brand-impression goal (Story 1) dominates first impression. The form must work, but the homepage is still valuable without the form being wired (P1 covers the rest).

**Independent Test**: Scroll to the Get-Quote section. (a) Click submit with the form empty → every required field shows an inline error and the form does not advance. (b) Enter a malformed email → the email field shows an "invalid email" message. (c) Fill all required fields validly and submit → button enters a "Submitting…" state, then a success card replaces the form. (d) Force an error path (e.g., trigger the error state via a debug hook or rapid double-submit) → an error card appears with a "Try again" button.

**Acceptance Scenarios**:

1. **Given** the prospect submits the form empty, **When** validation runs, **Then** every required field (I-am-a, Name, Email, Country, Interested-in, Message) shows an inline error and the submit button is not consumed.
2. **Given** the prospect enters "not-an-email" in the Email field and tabs away, **When** the field loses focus, **Then** an inline "Please enter a valid email address" message appears under the field.
3. **Given** all required fields are valid, **When** the prospect clicks submit, **Then** the button enters a disabled "Submitting…" state, and within 1500 ms a success state replaces the form with a confirmation message and a "Submit another request" link.
4. **Given** the form is in success state, **When** the prospect clicks "Submit another request", **Then** the form resets to idle state with all fields cleared.

---

### User Story 4 — Future-page author reuses the design system (Priority: P3)

When the team begins Phase 02 (e.g., the Products catalog page or a dedicated Solutions page), the next contributor can build that page entirely from the design tokens, component classes, header, and footer established in Phase 01 — without reinventing colors, type scales, button styles, card styles, form styles, header, or footer.

**Why this priority**: This is internal infrastructure value, not first-impression value. Phase 01 must lay the foundation, but the foundation's payoff is realized in Phase 02+. Lower priority than visible homepage quality.

**Independent Test**: A reviewer opens `css/styles.css` (or the compiled equivalent) and `tailwind.config.js` and confirms (a) all colors live in CSS custom properties under `:root`, (b) typography sizes/weights live in either Tailwind theme extensions or design-token variables, (c) `.btn`, `.card`, `.field`, header, and footer component classes exist and are documented in code, (d) a hypothetical new page can be built by composing existing classes without redefining colors, spacing, or component shapes.

**Acceptance Scenarios**:

1. **Given** a contributor creates a new page (e.g., `pages/products.html`), **When** they copy the existing `<header>` and `<footer>` markup and use existing `.btn`, `.card`, and section spacing utilities, **Then** the new page is visually consistent with the homepage with no additional CSS authoring.
2. **Given** the design team wants to adjust the accent color, **When** they update a single token (e.g., `--color-accent`), **Then** every button, focus ring, link hover, and accent surface across every page reflects the change.
3. **Given** a reviewer audits the homepage stylesheet, **When** they search for hard-coded hex colors outside the token block, **Then** none exist in component classes or layout sections.

---

### Edge Cases

- **Slow image loads / failed images**: every `<img>` has descriptive `alt` text; failed images do not collapse layout because each image container has a placeholder background (gradient or muted surface) that preserves height.
- **Slider auto-advance interacts with user**: when the user hovers, focuses, or touches the slider, auto-advance pauses; it resumes 4 seconds after the last interaction ends.
- **Mobile drawer + viewport resize**: opening the drawer at 480px then resizing to ≥1025px closes the drawer and restores the desktop nav cleanly.
- **JS disabled**: per Constitution Principle II, all primary content remains visible without JavaScript. The slider degrades to the first slide statically visible; the mobile drawer degrades to a visible vertical nav list; the form still submits using native HTML validation (it cannot reach the success state without JS, which is acceptable — content visibility, not interactivity, is the constitutional requirement).
- **Keyboard-only navigation**: every interactive element (nav, mega-menu, slider controls, form fields, submit button, drawer close) is reachable and operable via Tab/Shift-Tab/Enter/Space/Escape with visible focus rings.
- **Long content (translated copy in future)**: headings and cards use min-heights and `text-balance` / line-clamp rules to remain visually composed if copy length doubles.
- **Form double-submit**: while the form is in "Submitting…" state, the submit button is disabled to prevent double posting.
- **Reduced-motion preference**: users with `prefers-reduced-motion: reduce` see static or minimally animated states instead of slider auto-advance, scroll-triggered animations, and parallax effects.

## Requirements *(mandatory)*

### Functional Requirements

**Homepage structure & content**

- **FR-001**: Homepage MUST present eleven distinct sections, in order: (1) Hero, (2) Featured Products Slider, (3) Why Zakey, (4) Smart Living Ecosystem, (5) Solutions by Space, (6) Technology Preview, (7) Featured Products Grid, (8) Partner CTA, (9) Case Studies, (10) Blog/News, (11) Get a Quote.
- **FR-002**: Hero section MUST display the Zakey logo, a primary headline naming the brand promise, a supporting subheadline covering smart homes, villas, hotels, offices, security, and automation, two CTAs labeled "Get a Quote" (anchors `#get-quote`) and "Explore Products" (links to `pages/products.html`), a hero visual, and at least two floating accent elements (e.g., a device mockup card and an automation/stat card).
- **FR-003**: Featured Products Slider MUST cycle through at least 4 product highlights — Zakey Aura Panel, Zakey Secure Kit, Zakey Smart Switch Series, Zakey Climate Hub — each slide carrying an image, title, tagline, short description (≤30 words), and a CTA. The slider MUST support previous/next controls, pagination dots, and auto-advance with pause-on-hover/focus.
- **FR-004**: Why-Zakey section MUST present six feature cards titled (or equivalent): Full Smart Ecosystem, Elegant Product Design, Secure Automation, Works with Voice Assistants, Energy Monitoring, Partner-Ready Business Support — each card carries an icon or visual, title, and short description.
- **FR-005**: Smart Living Ecosystem section MUST present a connected diagram or composed-card layout that visually links: hardware, mobile app, cloud/local control, scenes & automations, sensors, security, lighting, climate (HVAC), curtains/shades, and analytics.
- **FR-006**: Solutions-by-Space section MUST present six cards — Smart Villa, Smart Apartment, Smart Hotel, Smart Office, Smart Compound, Gaming Room — each with image, title, 2–3 benefit lines, and a CTA linking to a real (placeholder-acceptable) detail page under `pages/solutions/`.
- **FR-007**: Technology Preview section MUST present three cards using Zakey-original pillar names covering, respectively, multi-protocol device integration, AI-driven scene automation, and hybrid wired-plus-wireless architecture. Pillar names MUST NOT be "CoSS", "AI Builder", "Fusion Link", or any other LifeSmart-coined term.
- **FR-008**: Featured Products Grid section MUST display eight product cards spanning multiple categories, each with category label, product image, product title, short description, and CTA.
- **FR-009**: Partner CTA section MUST address distributors, system integrators, real-estate developers, and installers, present a single primary CTA to `pages/partners.html`, and include a meaningful supporting visual.
- **FR-010**: Case Studies section MUST present three case-study cards (luxury villa automation, smart hotel guest experience, smart office energy optimization), each with image, title, one-line outcome, and CTA.
- **FR-011**: Blog/News preview MUST present three article cards, each with image, realistic title, date, category tag, and CTA.
- **FR-012**: Get-a-Quote section MUST present a form with the following fields: "I am a" (radio or select, options: Distributor / System Integrator / Real Estate Developer / End User / Installer), Name (text), Company (text, optional for End User), Email (email), Phone (tel), Country/Region (select), Project Type (select), Home/Project Size (select), Interested-in (multi-select checkbox group, options: Smart Home, Smart Hotel, Smart Office, Security, Lighting, Climate, Full Solution), Message (textarea), a privacy note, and a primary submit button.

**Quote form behaviour**

- **FR-013**: Quote form MUST exhibit each of the following visible states: idle, focus (per field), error (per field and at form level), submitting (button disabled, label changes), submitted-success (form replaced with a confirmation card), submitted-error (form replaced with a retry card). No backend integration is required; "submission" is simulated in front-end JS with a delay between 600–1500 ms.
- **FR-014**: Quote form MUST block submission when required fields are missing or malformed (notably: I-am-a, Name, Email, Country, Interested-in, Message), and MUST show inline messages adjacent to each offending field.
- **FR-015**: Quote form MUST reset cleanly when the user clicks "Submit another request" from the success state.

**App shell — header**

- **FR-016**: Site header MUST contain ten top-level navigation links in this order — Home, Products, Solutions, Technology, Software, Partners, Projects, Blog, About, Contact — plus the Zakey wordmark/logo on the left and a "Get a Quote" CTA button on the right.
- **FR-017**: Header MUST be sticky to the top of the viewport on scroll, MUST appear transparent over the hero, and MUST transition to a dark-glass (semi-opaque, blurred) background once the viewport scrolls past the hero.
- **FR-018**: At viewports ≥1025px, the "Products" and "Solutions" nav items MUST open a styled mega-menu on hover and on keyboard focus. The mega-menu MUST list the product categories (Products) or solution spaces (Solutions) with short labels, icons, and links to the corresponding category/space pages.
- **FR-019**: At viewports ≤640px, the header MUST collapse to a Zakey logo + hamburger button. Activating the hamburger MUST open a full-height drawer containing all ten nav links and a "Get a Quote" CTA. The drawer MUST be dismissable via a close affordance, the Escape key, and an overlay tap.
- **FR-020**: Header MUST include focus styles meeting WCAG 2.1 AA contrast on every interactive control, and the mega-menu / drawer MUST support keyboard navigation (Arrow keys within a menu, Escape to close, Tab cycling).

**App shell — footer**

- **FR-021**: Site footer MUST contain: (a) Zakey brand summary paragraph with logo, (b) Product Categories link column, (c) Solutions link column, (d) Company link column (About, Partners, Projects, Blog, Contact), (e) Contact info block (email, phone, support hours), (f) Newsletter sign-up form (email field + subscribe button + privacy note), (g) social icon links (LinkedIn, Instagram, YouTube, X at minimum), and (h) copyright line.

**Design system & reusability**

- **FR-022**: Phase 01 MUST define a single shared design system at the CSS layer: color tokens (deep dark surface, light surface, muted/cool gray, glass-card overlay, electric-blue/cyan accent, optional sparing metallic/gold accent), typography scale (hero, section heading, card heading, body, caption), button variants (primary, secondary, ghost, dark-section), card variants (product, solution, feature, technology, blog/news), form-field styles, section-spacing utilities, and responsive grid utilities. Tokens MUST live in CSS custom properties on `:root` and/or Tailwind theme extensions; component classes MUST live in a documented `@layer components` block.
- **FR-023**: Every visual surface on the homepage MUST be composed from the design-system tokens and component classes. Ad-hoc hex colors, ad-hoc spacing values, and ad-hoc font sizes MUST NOT appear inside component classes or section markup. Layout fine-tuning utilities are permitted.

**Imagery & content quality**

- **FR-024**: Every homepage section MUST include at least one meaningful visual (image, icon group, diagram, mockup, or composed visual card). No section may be text-only.
- **FR-025**: All images MUST live under `assets/images/<category>/zakey-...` with lowercase hyphenated filenames, MUST be referenced via relative paths from the document, and MUST carry descriptive (non-empty, non-generic) `alt` text. Image containers MUST display a tasteful placeholder background (gradient or muted surface) so failed loads do not collapse layout.
- **FR-026**: Content MUST be realistic, brand-appropriate marketing copy. The strings "lorem ipsum", "lifesmart", and "ilifesmart" MUST NOT appear anywhere in the repository (case-insensitive).

**SEO & semantics**

- **FR-027**: Homepage MUST include a unique `<title>`, a meta description, the Open Graph minimum set (og:title, og:description, og:image, og:url, og:type), and a single semantic `<h1>` with proper heading hierarchy thereafter.
- **FR-028**: Header and footer MUST be wrapped in semantic `<header>`, `<nav>`, and `<footer>` landmarks; each homepage section MUST use `<section>` with an accessible heading.

**Cross-page link integrity**

- **FR-029**: Every navigation link in the header, mega-menus, drawer, footer, and section CTAs MUST resolve to a real file in this repository. Phase 01 MAY ship placeholder pages for Products, Solutions, Technology, Software, Partners, Projects, Blog, About, Contact, Privacy, and Terms — each placeholder MUST embed the shared header and footer and a brief "Coming in Phase 02" content block — but the file MUST exist; 404 results MUST NOT occur.

**Technical & quality gates**

- **FR-030**: All page content MUST be present in static HTML at file load. JavaScript MUST NOT inject, replace, or hydrate primary content (per Constitution Principle II).
- **FR-031**: The site MUST load without console errors or uncaught exceptions on initial load and during typical interaction (open mega-menu, open mobile drawer, navigate slider, submit form, click newsletter).
- **FR-032**: The site MUST render and remain usable across mobile (≤640px), tablet (641–1024px), and desktop (≥1025px) breakpoints. At each band, content order, readability, image sizing, button hit areas (≥44×44 px on touch), and interactivity MUST be preserved.
- **FR-033**: User-preference media queries MUST be honored: `prefers-reduced-motion: reduce` disables auto-advance, scroll animations, and parallax; focus rings remain visible regardless.

### Key Entities

- **Brand Identity**: name (Zakey), wordmark, color palette, typography stack, voice. Owns design tokens.
- **Navigation Entry**: label, destination path, optional mega-menu group, optional icon. The header surfaces ten of these.
- **Hero Block**: headline, subheadline, primary CTA, secondary CTA, hero visual, supplemental floating cards.
- **Featured Product Highlight**: image, title, tagline, short description, CTA path. Four entries on the slider.
- **Why-Zakey Feature**: icon, title, short description. Six entries.
- **Ecosystem Node**: label, icon, role (hardware / app / cloud / scene / sensor / lighting / climate / curtain / security / analytics). Ten nodes.
- **Solution Space**: image, title, benefit lines, CTA path. Six entries.
- **Technology Pillar**: icon, Zakey-original name, short description. Three entries.
- **Featured Product (grid)**: image, category, title, description, CTA path. Eight entries.
- **Case Study**: image, title, one-line outcome, CTA path. Three entries.
- **Blog Article (teaser)**: image, title, date, category, CTA path. Three entries.
- **Quote Lead**: I-am-a, name, company, email, phone, country, project type, project size, interested-in (multi), message. Front-end only — no persistence.
- **Newsletter Subscription**: email. Front-end only — no persistence.
- **Footer Column**: section title, link list.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A first-time visitor identifies Zakey as a premium smart-home / AIoT brand within the first 10 seconds on the homepage (validated via informal usability check — a non-technical reviewer correctly summarises the brand and its primary offering in one sentence).
- **SC-002**: 100% of homepage navigation links, hero CTAs, section CTAs, mega-menu links, drawer links, and footer links resolve to a real file or in-page anchor. Zero broken-link reports from an automated link-check pass.
- **SC-003**: Quote-form submission produces a visible success state in under 1.5 seconds for a happy path, and a clear inline error state for each invalid field within 200 ms of the field losing focus.
- **SC-004**: Homepage renders legibly with no horizontal scroll, no overlapping elements, and no clipped CTAs at viewport widths 360, 480, 640, 768, 1024, 1280, and 1440 pixels.
- **SC-005**: All eleven homepage sections include at least one meaningful visual element; zero sections are text-only.
- **SC-006**: A future contributor can ship a new Zakey page (e.g., a Phase 02 product detail page) in under one working day using only the established design tokens, component classes, header, and footer — with no new section-level CSS authored for shared patterns. (Measured during Phase 02.)
- **SC-007**: Zero console errors and zero uncaught JavaScript exceptions during page load and during a full interaction pass (open mega-menu, open and close mobile drawer, navigate slider forward/back, submit form happy path, submit form error path, subscribe to newsletter).
- **SC-008**: Zero occurrences of "lifesmart", "ilifesmart", or "lorem ipsum" anywhere in the repository (case-insensitive grep).
- **SC-009**: Homepage `<title>` is unique and specific to Zakey, exactly one `<h1>` exists, meta description is present and ≤160 characters, and Open Graph minimum tags are present.
- **SC-010**: Every interactive element on the homepage is reachable and operable via keyboard alone, with a visible focus indicator (WCAG 2.1 AA visual focus). The mobile drawer, mega-menus, slider, and form all support keyboard activation and Escape-to-close where applicable.
- **SC-011**: Reduced-motion users (UA reports `prefers-reduced-motion: reduce`) see no auto-advancing slider, no scroll-triggered transforms, and no parallax — but still see all content and can manually navigate the slider.
- **SC-012**: A reviewer searching `css/styles.css` finds all color, spacing, and typography literals consolidated in the design-token layer; no hard-coded hex values appear inside component class bodies.

## Assumptions

- **Technology stack is fixed by the constitution**: HTML, CSS, locally compiled Tailwind CSS, and vanilla JavaScript. No frameworks. No Tailwind CDN. This is a non-negotiable input, not a decision.
- **Placeholder pages are acceptable for non-home routes in Phase 01**: Products, Solutions, Technology, Software, Partners, Projects, Blog, About, Contact, Privacy, and Terms exist as minimal `pages/<name>.html` files embedding the shared header and footer and a brief "Coming in Phase 02" message — sufficient to make every link resolve.
- **Real product photography does not yet exist**: image references use clearly named local placeholder paths under `assets/images/<category>/zakey-...`. Placeholders may be gradient-with-label SVGs or low-resolution stand-ins, swappable later without changing markup.
- **Phase 01 ships front-end only**: no backend, no analytics, no CMS, no authentication, no internationalisation. Quote form and newsletter form simulate submission in vanilla JS and never make network calls.
- **Brand naming is owned by the project**: Zakey, Aura Panel, Secure Kit, Smart Switch Series, Climate Hub, and the three technology pillar names invented in this phase are Zakey-original and may be renamed in a future phase.
- **Breakpoint bands**: mobile ≤640px, tablet 641–1024px, desktop ≥1025px. Design and verification target widths are 360, 480, 640, 768, 1024, 1280, 1440px.
- **Accessibility baseline**: WCAG 2.1 AA for color contrast, focus visibility, and keyboard operability. Full WCAG audit is out of scope for Phase 01; the AA visible-focus + contrast + keyboard requirement is the binding subset.
- **Browser support**: latest two stable versions of Chromium-based browsers, Firefox, and Safari (desktop and mobile). IE / legacy Edge are not supported.
- **Out of scope for Phase 01**: dark/light mode toggle, multi-language switcher, live chat widget, e-commerce / shopping cart, real CMS, real form backend, analytics integration, third-party tracking, animation libraries beyond what is necessary for the slider and basic transitions, dedicated product-detail pages (the eight grid cards link to either the catalogue placeholder or `#` until Phase 03).
- **Visual reference is structural only**: the iLifeSmart site is studied for which sections a premium AIoT brand site contains, not for visual treatment, copy, product naming, or logos. Constitution Principle IV applies in full.
