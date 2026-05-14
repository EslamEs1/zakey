# Feature Specification: Phase 05 — Projects, Blog, About, Contact, Legal Pages, and Final Frontend QA

**Feature Branch**: `005-final-pages-qa`
**Created**: 2026-05-14
**Status**: Draft
**Input**: User description: "Phase 05: complete the remaining company website pages (Projects/case studies, Blog/articles, About, Contact, Privacy, Terms, optional 404) and perform a full frontend QA pass so Zakey is ready to show to a client."

## User Scenarios & Testing *(mandatory)*

### User Story 1 — B2B Prospect Validates Zakey via Real Project Case Studies (Priority: P1) 🎯 MVP

A real-estate developer, hotel-group buyer, or system-integrator partner lands on the Projects page after browsing Technology and Solutions. They need to see that Zakey has actually shipped real installations — at scale, in the right segments, with measurable outcomes — before they commit to a discovery call. They scan the projects grid, filter to "Hotels" or "Villas", open one or two case-study detail pages to inspect devices used, automation scenes deployed, and results delivered, then proceed to Contact or Become-a-Partner.

**Why this priority**: Projects/case studies are the single highest-trust signal in B2B smart-home sales. Without them, the credibility funnel built in Phases 02/03/04 leaks at the bottom. This is the MVP of Phase 05.

**Independent Test**: Open `pages/projects.html` directly in a browser. Hero, intro, five filter tabs (All, Villas, Hotels, Offices, Real Estate, Commercial), six case-study cards (each with image, type, challenge, solution, results, CTA) render. Click any filter — the grid filters visibly. Click any card CTA — the matching detail page (`pages/project-luxury-villa.html`, `pages/project-smart-hotel.html`, or `pages/project-smart-office.html`) loads with the full nine-section detail layout (hero+image, summary, challenge, solution, devices, scenes, results, gallery, CTA). All gates pass.

**Acceptance Scenarios**:

1. **Given** a B2B prospect lands on `pages/projects.html`, **When** they click the "Hotels" filter tab, **Then** the grid filters to show only hotel-segment cards within one frame and the active tab carries an `aria-pressed="true"` indicator.
2. **Given** a prospect is on the Projects overview, **When** they click the "View Case Study" CTA on the Luxury Smart Villa card, **Then** `pages/project-luxury-villa.html` loads with a hero image, project summary, challenge, solution, devices-used list, automation scenes, results, gallery, and a final CTA to Contact or Become-a-Partner.
3. **Given** a prospect opens any case-study detail page, **When** they reach the bottom, **Then** they see a clear next-step CTA (request a quote / become a partner) — the page never dead-ends.

---

### User Story 2 — Lead Converts via the Contact / Get-Quote Page (Priority: P1)

A qualified lead — having validated technology, solutions, software, partners, and projects — is ready to talk. They open the Contact page, scan the four contact-channel cards (Sales, Partners, Support, Projects) to find the right department, then fill out the main quote form. The form captures their role, name, company, contact details, project type, project size, interested solutions, timeline, optional budget, and message. After submission they see a styled success state. A floating WhatsApp button is visible on every viewport. A small FAQ accordion answers their last-mile questions.

**Why this priority**: This is the primary conversion surface for the entire site. Every other page funnels here. Without a complete, polished Contact page, the site is not shippable.

**Independent Test**: Open `pages/contact.html`. Hero, four contact cards, main quote form, map/office visual, FAQ accordion, and floating WhatsApp button all render. Submit the form empty — error summary appears, first invalid field is focused. Fill all required fields validly and submit — form transitions through `submitting` to `success`. The WhatsApp button is visible on mobile and desktop. The FAQ accordion supports single-open mode. All gates pass.

**Acceptance Scenarios**:

1. **Given** a lead is on the Contact page, **When** they click any of the four contact-channel cards (Sales / Partners / Support / Projects), **Then** the card's CTA either scrolls to / pre-fills the matching form route (where applicable) or opens the appropriate email/phone link.
2. **Given** a lead submits the quote form with all required fields filled validly, **When** the request is processed (client-side simulation), **Then** the form transitions to a success state showing "Request Received" with response-SLA copy and a "Back to Home" CTA.
3. **Given** a lead is on the Contact page on mobile (≤ 640 px), **When** the page renders, **Then** the WhatsApp floating button is fixed to the bottom-right of the viewport, does not obscure the submit button when the form is in focus, and has an accessible label.
4. **Given** a lead opens the FAQ accordion, **When** they click an item, **Then** it opens and any previously open item closes (single-open mode).

---

### User Story 3 — Brand Researcher Evaluates Zakey via About Page (Priority: P1)

A potential partner, journalist, or strategic buyer wants to understand who Zakey is before engaging. They open the About page and find a clear brand story, mission, vision, values, "Why Zakey" positioning, global-ready / local-support positioning, and team/expertise cards. Every section is paired with imagery. They leave with a clear sense of Zakey's market positioning and a path to Contact.

**Why this priority**: The About page is the second-most-visited page on most B2B sites after the homepage. It validates trust and brand maturity. Without it, the site feels incomplete.

**Independent Test**: Open `pages/about.html`. Hero with title "Designing Smarter Spaces with Zakey", brand-story section (2–4 paragraphs), Mission card, Vision card, three-to-five Values cards, "Why Zakey" section, global-ready / local-support positioning section, team/expertise cards, and a final CTA all render. No Lorem ipsum. All gates pass.

**Acceptance Scenarios**:

1. **Given** a researcher opens the About page, **When** the hero loads, **Then** the H1 reads "Designing Smarter Spaces with Zakey" and a hero image renders without layout shift.
2. **Given** a researcher scrolls the About page, **When** they reach the team/expertise section, **Then** at least four team-or-expertise cards render with image, role/expertise area, and short bio (or expertise-domain description).
3. **Given** a researcher reaches the bottom of the About page, **When** they look for a next step, **Then** a final CTA to Contact and/or Become-a-Partner is present.

---

### User Story 4 — Visitor Discovers Zakey Through Blog Content (Priority: P2)

A homeowner, hotel-operations director, or system integrator searches for smart-home best practices and lands on a Zakey article. They read the article (Smart Home Beginner Guide, Villa Automation Ideas, or Smart Hotel Room Experience), see related articles in the sidebar/footer, click through to a related article or the blog overview, browse by category (Smart Home, Security, Energy Saving, Hotels, Product Guides, Partner Insights), and ultimately convert via the article-level "Get a Quote" CTA.

**Why this priority**: Blog content is content marketing — important for SEO and authority, but the site is shippable without it. After the four conversion surfaces (Technology / Solutions / Projects / Contact), Blog rounds out the credibility story but does not block launch.

**Independent Test**: Open `pages/blog.html`. Hero, six category filter chips (Smart Home / Security / Energy Saving / Hotels / Product Guides / Partner Insights, plus an "All" chip), at least nine blog cards (each with image, category, title, excerpt, read-time, date, CTA), and a newsletter CTA all render. Click any category chip — the grid filters. Click any "Read Article" CTA on a card whose target is one of the three implemented articles — the article detail page loads with hero, title, reading time, category, table of contents, structured H2/H3 headings, in-content imagery, related-articles section, and a "Get a Quote" CTA. All gates pass.

**Acceptance Scenarios**:

1. **Given** a visitor lands on the Blog overview, **When** they click the "Hotels" category chip, **Then** the grid filters to show only hotel-tagged cards within one frame.
2. **Given** a visitor opens an article detail page, **When** they click any anchor in the table of contents, **Then** the page jumps to the matching H2 section.
3. **Given** a visitor reaches the bottom of an article, **When** they look for further reading, **Then** they see a "Related Articles" section with at least two related-article cards and a "Get a Quote" CTA.

---

### User Story 5 — Visitor Encounters Required Legal & Error Pages (Priority: P2)

A visitor clicks a Privacy or Terms link in the footer (or navigates to a deleted/mistyped URL and hits the optional 404). They land on a clean, professional legal page or 404 page that maintains the site's design system, contains real content (no Lorem ipsum), and offers a clear path back to the main site.

**Why this priority**: Legal pages are required for any company website (compliance, footer links, partner due diligence). The optional 404 page is a polish item. Both fall below conversion surfaces in priority.

**Independent Test**: Open `pages/privacy.html` and `pages/terms.html`. Each page has a hero with the page title, structured H2/H3 sections (at least 6 sections on Privacy, 6 sections on Terms), a "last updated" date, and a footer CTA back to Home. The optional `pages/404.html` (if implemented) renders the global shell with a clear "Page Not Found" message and links to Home / Contact / Projects. All gates pass.

**Acceptance Scenarios**:

1. **Given** a visitor clicks the "Privacy Policy" link in the footer, **When** the Privacy page loads, **Then** they see at least 6 numbered/labeled sections (data collected, how it is used, cookies, third parties, rights, contact) with real plain-language content, not placeholder text.
2. **Given** a visitor clicks the "Terms of Service" link in the footer, **When** the Terms page loads, **Then** they see at least 6 sections covering acceptable use, intellectual property, limitations, governing law, modifications, and contact, with real plain-language content.
3. **Given** the optional 404 page is implemented, **When** a visitor navigates to `pages/404.html` directly, **Then** the global header and footer render, a "Page Not Found" message appears, and at least three navigation CTAs (Home, Contact, Projects) are present.

---

### User Story 6 — Final Frontend QA Confirms Client-Ready Polish (Priority: P2)

A QA reviewer (or the user themselves) walks the entire site end-to-end after Phase 05 implementation. They verify every navigation link, every footer link, every product/solution/project/article CTA, every form, the mobile drawer, every filter and accordion, responsive behavior at 360/414/768/1024/1280/1920 px, theme persistence across navigation, image alt-text presence, absence of console errors, absence of placeholder text ("lorem ipsum", "LifeSmart", reference-site protocol names), and overall premium visual consistency. Any weak section is improved.

**Why this priority**: The site is technically shippable after US1–US3 (Projects, Contact, About). US6 is the polish that makes it client-ready. It is the last step before declaring the project complete.

**Independent Test**: Run `npm run check` — all three integrity gates pass at the final page count. Walk every page in a browser under both themes at the six target viewport widths. Confirm zero console errors, zero unhandled promise rejections, zero broken images, zero broken links, zero "lorem ipsum" / "lifesmart" / "ilifesmart" / "AI Builder" / "Fusion Link" / "CoSS" occurrences across the entire `pages/` and `index.html` tree.

**Acceptance Scenarios**:

1. **Given** the QA reviewer runs `npm run check`, **When** the script completes, **Then** all three gates report PASS at the final page count (current 25 plus the new Phase 05 pages).
2. **Given** the QA reviewer greps for forbidden strings, **When** they run `grep -rEi 'lorem ipsum|lifesmart|ilifesmart|fusion link|ai builder|coss' index.html pages/`, **Then** zero matches return.
3. **Given** the QA reviewer opens DevTools on every page in a desktop browser, **When** they reload, **Then** zero console errors and zero unhandled promise rejections are reported on initial load.
4. **Given** the QA reviewer toggles the theme on one page and navigates to any other page, **When** the next page loads, **Then** the theme preference persists.

---

### Edge Cases

- **Filter with zero results**: If a project or blog filter is selected and zero cards match, an empty-state message must render (not a blank grid). For Phase 05, this only occurs if the user filters before any filter-relevant card is loaded; the implementation should still account for it.
- **Form submission while offline**: The contact form does not depend on a network backend; client-side validation runs and the "success" state is reached after a short artificial delay. Offline does not break the flow.
- **WhatsApp button overlap**: On narrow viewports with the form submit button focused, the floating WhatsApp button must not visually overlap the submit button or the form's error summary. Either it lifts above the keyboard via `viewport-fit` / `env(safe-area-inset-bottom)` or it pins to a position above the form footer when the form is in focus.
- **Article missing target**: A blog card whose target article is not implemented (only 3 of 9+ are) must visibly indicate "Coming Soon" or link to the blog overview, never to a 404.
- **Long article without table of contents**: An article page with fewer than 4 H2 sections may omit the table of contents; only articles with 4+ H2 sections render the TOC component.
- **Reduced-motion users**: All filter animations, hero parallax (if any), gallery transitions, and FAQ animations must respect `prefers-reduced-motion: reduce`.
- **Privacy page accessed via direct URL**: The Privacy page must be navigable via direct URL even if not yet linked from the footer in some pages — the footer-link mass-update from Phase 04 already includes Privacy and Terms links, so this is satisfied.

## Requirements *(mandatory)*

### Functional Requirements

**Page inventory (FR-001 — FR-013)**

- **FR-001**: The site MUST include a Projects overview page at `pages/projects.html` with hero ("Zakey Smart Living in Real Spaces"), intro paragraph, filter tabs (All, Villas, Hotels, Offices, Real Estate, Commercial), and six project cards covering Luxury Smart Villa, Smart Hotel Guest Room, Smart Office Energy Control, Smart Apartment Tower, Smart Retail Showroom, and Smart Gaming Suite.
- **FR-002**: Each project card MUST include an image, project type or location tag, challenge summary, Zakey solution summary, results/benefits summary, and a CTA to either a case-study detail page (where one exists) or to Contact.
- **FR-003**: The site MUST include at least three case-study detail pages: `pages/project-luxury-villa.html`, `pages/project-smart-hotel.html`, `pages/project-smart-office.html`. Each MUST contain a large hero image, project summary, challenge, solution, devices-used list, automation-scenes list, results/metrics, a gallery section, and a closing CTA.
- **FR-004**: The site MUST include a Blog overview page at `pages/blog.html` with hero, six category filter chips (Smart Home, Security, Energy Saving, Hotels, Product Guides, Partner Insights) plus an "All" chip, at least nine blog cards (each with image, category, title, excerpt, read-time, date, CTA), and a newsletter CTA section.
- **FR-005**: The site MUST include at least three article detail pages: `pages/article-smart-home-guide.html`, `pages/article-villa-automation.html`, `pages/article-hotel-smart-room.html`. Each MUST contain a hero image, article title, reading time, category badge, table of contents (when 4+ H2 sections exist), structured H2/H3 headings with in-content imagery, a Related Articles section, and a "Get a Quote" CTA.
- **FR-006**: The site MUST include an About page at `pages/about.html` with hero ("Designing Smarter Spaces with Zakey"), brand story section, Mission, Vision, Values (3–5 cards), Why Zakey, Global-Ready / Local Project Support positioning, Team / Expertise cards (≥ 4), and a closing CTA.
- **FR-007**: The site MUST include a Contact page at `pages/contact.html` with hero, four contact-channel cards (Sales, Partners, Support, Projects), the main quote form (12+ fields), a map or office visual placeholder, a floating WhatsApp button, and an FAQ accordion.
- **FR-008**: The main quote form on Contact MUST include fields for I-am-a role, Name, Company, Email, Phone/WhatsApp, Country, City, Project Type, Project Size, Interested Solutions (multi-select), Timeline, optional Budget Range, and a free-form Message. Required fields MUST validate on blur (after first focus) and on submit; the form MUST progress through `idle → submitting → success` states.
- **FR-009**: The site MUST include a Privacy page at `pages/privacy.html` with at least six structured sections (data collected, how it is used, cookies, third parties, user rights, contact) and a last-updated date.
- **FR-010**: The site MUST include a Terms page at `pages/terms.html` with at least six structured sections (acceptable use, intellectual property, limitations of liability, governing law, modifications, contact) and a last-updated date.
- **FR-011**: The site MAY include an optional 404 page at `pages/404.html` with the global shell, a "Page Not Found" message, and at least three return CTAs (Home, Contact, Projects).
- **FR-012**: Every new page MUST display the global header and footer that are byte-identical (after path normalization) to every other page on the site, per the Phase 01–04 shell-consistency contract.
- **FR-013**: Every new page MUST set `<body data-page="...">` with the page slug so JS module loaders can conditionally enhance the page.

**Behavior & interaction (FR-020 — FR-029)**

- **FR-020**: The Projects overview filter tabs MUST filter the grid in-place without a page reload; only cards whose `data-segment` matches the active filter remain visible. The active tab MUST carry `aria-pressed="true"` and the matching visual state. An "All" tab MUST reset the filter.
- **FR-021**: The Blog overview category filter chips MUST filter the card grid by `data-category` in the same way as FR-020. Cards whose target article is not yet implemented MUST visibly indicate "Coming Soon" or link to the blog overview rather than 404.
- **FR-022**: The Contact-page quote form MUST present an error summary on failed submit with the count of errors and a focus shift to the first invalid field. On successful submit it MUST transition to a success state via the same `data-form-state` state-machine pattern established in Phase 04.
- **FR-023**: The Contact-page FAQ accordion MUST reuse the Phase 04 FAQ component (`<details>`-based, single-open mode supported via `data-faq-mode="single"`) and require no new CSS.
- **FR-024**: The floating WhatsApp button MUST be present on the Contact page (at minimum), be accessible via keyboard, carry an `aria-label`, render at a position that does not obscure form controls on any supported viewport, and link to `https://wa.me/<PLACEHOLDER>` (a content-replaceable placeholder, e.g., `https://wa.me/0000000000` with an inline comment noting how to update it).
- **FR-025**: Article detail pages with 4+ H2 sections MUST render a sticky-or-static table of contents (implementer choice) that scrolls/jumps to the matching section via in-page anchors.
- **FR-026**: Every page MUST provide an alt attribute on every `<img>` element, with descriptive text (no empty alts except on purely decorative imagery, which MUST then carry `aria-hidden="true"`).
- **FR-027**: Every form, filter, tab, accordion, gallery, modal, and floating button MUST be operable via keyboard alone (Tab/Shift+Tab/Enter/Space/Esc as appropriate), and visible focus rings MUST appear on every focused interactive element.
- **FR-028**: All filter, accordion, and form-state animations MUST respect `prefers-reduced-motion: reduce` and snap to their target state without animation for users who request it.
- **FR-029**: The site-wide theme toggle MUST continue to work and persist across navigation to every new Phase 05 page (no per-page regressions).

**Content & integrity (FR-030 — FR-039)**

- **FR-030**: No Phase 05 page MAY contain the strings (case-insensitive): "lorem ipsum", "LifeSmart", "iLifeSmart", "Fusion Link", "AI Builder", "CoSS". This will be enforced via a forbidden-string grep in QA.
- **FR-031**: Every project card, project detail page, blog card, article, About-page section, and Contact-page card MUST contain real, Zakey-original marketing copy — no placeholder text, no copy-paste from the reference site.
- **FR-032**: Every page MUST include meaningful imagery (at minimum a hero image and a section image). Image files MUST exist at the documented local asset paths (`assets/images/projects/<slug>.jpg|.svg`, `assets/images/blog/<slug>.jpg|.svg`, `assets/images/about/<slug>.jpg|.svg`, `assets/images/contact/<slug>.jpg|.svg`). SVG is acceptable in lieu of JPG to match Phases 01–04 conventions.
- **FR-033**: Every page MUST include unique SEO metadata: `<title>`, `<meta name="description">`, canonical URL, Open Graph tags (og:title, og:description, og:image), and Twitter Card tags.
- **FR-034**: All three integrity gates (`scripts/check-shell-consistency.sh`, `scripts/check-content-rules.sh`, `scripts/check-links.sh`) MUST pass at the new total page count after Phase 05.
- **FR-035**: Every internal link on every page MUST resolve to an existing file. No 404s sitewide (excluding the optional 404 page itself, which is a destination, not a broken link).
- **FR-036**: After Phase 05, the entire site MUST be free of console errors and unhandled promise rejections on initial page load and during the documented interaction flows (filter clicks, form submits, theme toggles, FAQ opens, mobile-drawer toggles).
- **FR-037**: The CSS budget exception introduced in Phase 04 (CSS over 72 KB) MUST be documented and either remediated in Phase 05 (via dedup pass) or explicitly carried as a known-issue with a follow-up ticket. No new CSS in Phase 05 may worsen the overrun without justification.
- **FR-038**: Every new Phase 05 page MUST be linked from at least one other page (typically the header nav, the footer, an in-content CTA, or a related-content card). No orphan pages.
- **FR-039**: Phase 05 MUST conclude with an explicit "final QA pass" task that audits the entire site (all 37+ pages) for navigation completeness, image alt text, console errors, design-system consistency, and premium polish. Any deficiency found is fixed before phase completion.

### Key Entities

- **Project (Case Study)**: A documented Zakey installation. Attributes: id/slug, title, segment (villa / hotel / office / real-estate / commercial), location label, hero image, challenge summary (50–100 words), solution summary (50–100 words), devices-used list (4–10 items), automation-scenes list (3–6 items), results/metrics (3–5 items), gallery (≥ 4 images), CTA target. Relationships: linked to Solutions (Phase 03), Technology (Phase 04 pillars), and Become-a-Partner / Contact CTAs.
- **Article**: A blog post. Attributes: id/slug, title, category (one of: Smart Home / Security / Energy Saving / Hotels / Product Guides / Partner Insights), hero image, excerpt (15–30 words), reading time (minutes), publish date, body (structured H2/H3 with in-content images), related-article slugs (2–3). Relationships: linked to Solutions, Products, Projects, and a Get-a-Quote CTA.
- **Contact Channel Card**: A department-targeted entry point on the Contact page. Attributes: department (Sales / Partners / Support / Projects), short description, primary action (mailto, tel, or in-page anchor), icon. Relationships: routes to the main quote form (where applicable) or external mailto/tel links.
- **About-page Section**: Story / Mission / Vision / Values / Why-Zakey / Global-Local / Team-Expertise. Each carries a title, body copy, imagery, and (where applicable) a card list.
- **Legal Section**: A heading + plain-language body on Privacy or Terms. Attributes: section number, title, body. Relationships: navigated via an in-page anchor list at the top of each legal page.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A B2B prospect can navigate from the homepage to a relevant case-study detail page in **3 clicks or fewer** (homepage → Projects → segment filter → detail card).
- **SC-002**: A lead can complete the Contact-page quote form on desktop in **under 90 seconds** with realistic field-filling speed.
- **SC-003**: The Contact-page form's failed-submit error summary correctly identifies and counts every invalid field, and focus moves to the first invalid field within **one frame** of the submit attempt.
- **SC-004**: At least **9 blog cards** render on the Blog overview, with at least **3 article detail pages** fully implemented; the remaining cards link to "Coming Soon" copy or the overview, never to a 404.
- **SC-005**: All three integrity gates pass at **100%** of the final page count (current 25 plus all new Phase 05 pages — projected 37–38) with zero failures.
- **SC-006**: A forbidden-string grep (`grep -rEi 'lorem ipsum|lifesmart|ilifesmart|fusion link|ai builder|coss'`) across `index.html` and `pages/` returns **zero matches**.
- **SC-007**: A console-error sweep across every page (initial load + documented interaction flows) returns **zero errors** and **zero unhandled promise rejections**.
- **SC-008**: Every interactive element (filter, tab, accordion, gallery, form control, theme toggle, mobile drawer, WhatsApp button) is operable via **keyboard only**, with a visible focus ring.
- **SC-009**: At every supported viewport width (360 / 414 / 768 / 1024 / 1280 / 1920 px), every Phase 05 page renders **without horizontal scroll**, all imagery loads, and the global shell remains intact.
- **SC-010**: The theme toggle persists across navigation to **every** Phase 05 page (verified manually on at least one page per Phase-05 page-type).
- **SC-011**: Every Phase 05 page passes the existing constitution gates V (realistic content), VI (working UI), and VII (phased discipline).
- **SC-012**: The final site contains a complete navigation graph: every Phase 05 page is reachable from at least one other page within **2 clicks of the homepage**.

## Assumptions

- The Phase 01–04 design system, header/footer shell, integrity gates, theme system, and JS module loader pattern are all in place and stable. Phase 05 extends them; it does not refactor them.
- The site remains a static HTML / CSS (Tailwind, locally compiled) / vanilla ES-module-JS frontend. No frameworks, no Tailwind CDN, no backend (forms simulate submission client-side).
- Project images and blog images can be SVG placeholders (consistent with Phases 02/03/04) using the documented local paths. Real JPGs may replace them later without re-spec; the alt text and structure stay the same.
- The 72 KB CSS budget exception introduced in Phase 04 is acknowledged as a known issue. Phase 05 will either dedup (preferred) or carry it forward as a documented follow-up — it is not a hard blocker for Phase 05 completion.
- The optional 404 page is in scope as a polish item; if time-constrained, Phase 05 can ship without it and add it as a follow-up.
- The WhatsApp button uses a placeholder phone number (e.g., `0000000000`) with an inline comment for the user to replace with the real Zakey WhatsApp number before client handoff.
- "Final QA pass" (US6) is performed as part of Phase 05; no separate Phase 06 is planned. After Phase 05 the project is complete as a static frontend deliverable.
- Map embed on the Contact page can be a static SVG/image placeholder; real Google-Maps / OpenStreetMap embed is out of scope for the frontend-only deliverable.
- The contact form's "Interested Solutions" multi-select uses the eight existing Solutions slugs from Phase 03 (Smart Villa, Smart Apartment, Smart Hotel, Smart Office, Smart Compound, Gaming Room, Elderly Care, Smart Retail).
- The contact form's success state mirrors the Phase 04 Become-a-Partner success state (URL hash, success card, edit-and-resubmit flow optional but recommended).
- The "Related Articles" section on each article page may link to any of the three implemented articles plus blog-overview fallback links for unbuilt slots, so no broken links result.
