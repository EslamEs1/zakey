# Feature Specification: Technology, Software, and Partners Pages

**Feature Branch**: `004-tech-software-partners`
**Created**: 2026-05-14
**Status**: Draft
**Input**: User description: "Phase 04: Technology, Software, and Partners Pages — Build Zakey's credibility as a premium technology-driven smart home company and create strong B2B partner conversion pages."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Architect / Specifier Validates Zakey as a Credible Technology Partner (Priority: P1)

A specifying architect, system integrator, or developer's CTO landing on the Zakey site needs to verify that Zakey is technically credible before recommending it for a project. They open the **Technology** page expecting to see a clear, premium explanation of the architecture, supported protocols, security posture, energy intelligence, and how Zakey scales across projects. They scan for diagrams, named subsystems, and concrete capabilities — not slogans. Within two minutes they should feel confident enough to share the page with a colleague or move forward to a partner conversation.

**Why this priority**: Without technology credibility, no qualified B2B lead will continue down the funnel. The Technology page is the single most important trust-building artifact for the company, and Phase 04's entire B2B story depends on this page reading as authoritative.

**Independent Test**: Open `pages/technology.html` directly in a browser. Confirm the hero introduces Zakey's intelligence story, all six technology pillars (Link Architecture, Scene Intelligence, Multi-Protocol Compatibility, Secure Smart Living, Energy Intelligence, Scalable Project Deployment) are present with named subsystems, accompanying visuals/diagrams, and concrete capability bullets — no Lorem ipsum, no LifeSmart references, and all in-page anchors and outgoing CTAs resolve.

**Acceptance Scenarios**:

1. **Given** a first-time B2B visitor on the Technology page, **When** they read the hero and intro, **Then** they understand Zakey combines hardware, automation, secure connectivity, and project deployment in a single ecosystem.
2. **Given** a visitor scanning for technical depth, **When** they scroll through the six pillar sections, **Then** each pillar has its own named subsystem (e.g., "Zakey Link", "Zakey Scene Intelligence"), at least one visual/diagram, and three to six concrete capability bullets.
3. **Given** a visitor reaches the bottom of the page, **When** they click the primary CTA, **Then** they are taken to the Partners page or the Get a Quote form with no broken links.

---

### User Story 2 - Operator Explores the Zakey Software Ecosystem Before Recommending It (Priority: P1)

A hotel operations director or a property developer reviewing options for a new build needs to understand the **software experience** their staff, guests, and residents will live inside every day. They open the **Software** page and expect to see what the mobile app, wall panels, dashboards, voice integrations, and guest experience actually look and feel like. They expect realistic mockups — not abstract icons — and a clear demo CTA.

**Why this priority**: Buyers in hospitality and real estate evaluate software experience as heavily as hardware. A weak or vague software page makes Zakey look like a hardware vendor with bolted-on apps; a strong page positions Zakey as a platform.

**Independent Test**: Open `pages/software.html`. Confirm the seven software pillars (Mobile App, Control Panels, Scenes & Automation, Voice Integration, Business Dashboard, Energy & Device Insights, Guest/Hotel Experience) are all present, each pillar has at least one realistic mockup or device visual, and the page closes with a clear demo/quote CTA that links to a working destination.

**Acceptance Scenarios**:

1. **Given** a visitor on the Software page, **When** they read the hero, **Then** they understand Zakey unifies app, panels, dashboards, voice, and guest experience in one platform.
2. **Given** a visitor scrolls through software sections, **When** they reach the Voice Assistant section, **Then** they see realistic positioning for at least three voice ecosystems (e.g., Alexa, Google Assistant, Siri Shortcuts) with no certification claims that are not substantiated.
3. **Given** a visitor reaches the closing CTA, **When** they click "Request a Demo", **Then** they land on the existing Get a Quote form or the Become a Partner form depending on context.

---

### User Story 3 - Prospective Partner Self-Qualifies and Submits an Application (Priority: P1)

A distributor, system integrator, real estate developer, installer, interior design office, or hotel operator wants to understand whether becoming a Zakey partner is right for them, and — if yes — apply on the same visit. They open the **Partners** page, find their own profile in the "Who We Work With" section, scan benefits, understand the partner journey, see example use-case packages, and click through to the **Become a Partner** application form. They expect the form to be complete, professional, validated, and confidence-inspiring.

**Why this priority**: The B2B funnel ends here. If the Partners page does not feel premium and the application form does not feel trustworthy, qualified leads abandon and never return.

**Independent Test**: Open `pages/partners.html`. Confirm hero, "Who We Work With" cards (5+ partner types), benefits grid (7 benefits), partner journey timeline (6 steps), use-case packages (4 packages), and an FAQ accordion are all present and visually polished. Click through to `pages/become-a-partner.html` and confirm all 13 form fields are present with styled focus, error, and submit-success states. The accordion expands/collapses with vanilla JS; the form validates client-side and shows a success confirmation without making any network request.

**Acceptance Scenarios**:

1. **Given** a visitor on the Partners page, **When** they scroll through "Who We Work With", **Then** they see themselves in at least one card (distributor, system integrator, developer, installer, interior designer, or hotel operator).
2. **Given** a visitor on the Partners page, **When** they click an FAQ question, **Then** the answer expands smoothly and other open answers behave according to the chosen accordion mode (single-open or independent — documented in the spec).
3. **Given** a visitor on the Become a Partner page, **When** they submit the form with one or more required fields empty or invalid, **Then** the form blocks submission, scrolls to the first error, and shows an inline message on the failing field.
4. **Given** a visitor on the Become a Partner page, **When** they submit a fully valid form, **Then** they see a clearly-styled success state confirming the application was received and what happens next.

---

### User Story 4 - Returning Visitor Cross-Navigates Between Technology, Software, Partners, Products, and Solutions (Priority: P2)

A returning visitor — perhaps a partner doing a second-touch review with a colleague — moves between Technology, Software, Partners, Solutions, and Products multiple times in one session. They expect the global shell, theme toggle, mobile drawer, footer, and link integrity to behave identically to the rest of the site. They expect no broken links and no visual inconsistency.

**Why this priority**: The whole site must feel like one product. Inconsistency between Phase 04 pages and Phases 01–03 erodes trust.

**Independent Test**: Run `npm run check` (the three integrity gates: shell consistency, content rules, link integrity). All gates MUST pass with 28/28 files (the existing 24 + 4 new Phase 04 pages). Manually navigate via the header from every Phase 04 page to Home, Products, Solutions, Technology, Software, Partners, Projects, Blog, About, Contact — every link must resolve.

**Acceptance Scenarios**:

1. **Given** any Phase 04 page is loaded, **When** the user opens the mobile drawer, **Then** the drawer shows the identical navigation set as every other page on the site.
2. **Given** any Phase 04 page is loaded, **When** the user toggles light/dark theme, **Then** the new theme persists across navigation to and from other pages.
3. **Given** the `npm run check` gates are run after Phase 04 is implemented, **When** the run completes, **Then** all three gates pass and the file count is 28.

---

### Edge Cases

- **Visitor with JavaScript disabled** reads the Technology and Software pages — all primary content remains visible and readable; the FAQ accordion gracefully degrades to all-open static markup; the Become a Partner form does not block submission visually but the page must still render fully.
- **Visitor submits the Become a Partner form with valid required fields but invalid email/phone/URL format** — the form rejects with inline format hints, focuses the first failing field, and does not show the success state.
- **Visitor submits an extremely long message** (e.g., 5,000+ characters) — the textarea has a documented soft max (recommended 2,000 chars) and either truncates input or shows a counter; either approach is acceptable as long as it is explicit and styled.
- **Visitor on a small phone (≤360px wide)** scrolls each Phase 04 page — all heroes, diagrams, mockups, cards, timelines, and the form remain legible and tappable; no horizontal overflow.
- **Visitor with `prefers-reduced-motion: reduce`** — scroll-reveal, accordion expansion, and any decorative animation respect the preference and do not animate.
- **Partner application form's "Interested Solutions" field** receives input that conflicts with the "Partner Type" field (e.g., "Hotel Operator" type but only "Smart Villa" interest selected) — the form does not enforce cross-field business logic; it accepts the submission as the user described it.
- **All six Technology pillar diagrams fail to load** — alt text describes each diagram meaningfully and the surrounding text continues to convey the pillar's content.

## Requirements *(mandatory)*

### Functional Requirements

#### Global / Cross-Page

- **FR-001**: All four new pages (`pages/technology.html`, `pages/software.html`, `pages/partners.html`, `pages/become-a-partner.html`) MUST share the identical header, mobile drawer, theme toggle, and footer structure used by every Phase 01–03 page, such that the existing Gate 1 (shell consistency) passes with the new files included.
- **FR-002**: All four pages MUST include the project's standard `<head>` boilerplate: charset, viewport, page-specific `<title>` and `<meta name="description">`, canonical link, Open Graph and Twitter card tags, theme-color, favicon links, preloaded fonts (matching prior phases), the inline anti-flash theme script, and the compiled Tailwind stylesheet `assets/css/site.css`.
- **FR-003**: All four pages MUST set a unique `data-page` attribute on `<body>` (e.g., `technology`, `software`, `partners`, `become-a-partner`) so that any page-specific JavaScript module can scope its initialization correctly.
- **FR-004**: All four pages MUST be linked from the main header navigation and from the footer's appropriate column. The existing navigation set MUST be expanded to include Technology, Software, and Partners as top-level navigation items, applied to every page on the site, with the active page indicated via the existing aria-current pattern.
- **FR-005**: All four pages MUST pass the existing three integrity gates (`shell consistency`, `content rules`, `link integrity`) without modification to those gates' enforcement logic; if the gates currently reference a file count, that count MUST be updated from 24 to 28.

#### Technology Page (`pages/technology.html`)

- **FR-010**: The Technology page MUST open with a hero titled "The Intelligence Behind Zakey Smart Living", a one- to two-sentence subtitle, a primary CTA (e.g., "Become a Partner" or "Explore Solutions"), a secondary CTA (e.g., "Get a Quote"), and a hero visual showing a connected-home network / device ecosystem / AI automation graphic. The visual MUST live at `assets/images/technology/zakey-intelligence-hero.svg` (or `.jpg`); a missing source is allowed during scaffolding only if a placeholder of the same path is committed.
- **FR-011**: An "Intro" section MUST follow the hero, explaining in 2–4 short paragraphs that Zakey combines elegant hardware, smart automation, secure connectivity, and scalable project deployment.
- **FR-012**: The page MUST contain exactly six pillar sections in this order, each with its own anchor ID, heading, descriptive body copy (75–200 words each), a dedicated visual/diagram, and 4–6 capability bullets:
  - **FR-012a**: "Zakey Link Architecture" — hybrid wired + wireless smart-home architecture suitable for villas, apartments, hotels, offices, and compounds. Must use only Zakey-original naming; MUST NOT reference proprietary protocol names from any competitor. Visual: `assets/images/technology/zakey-link-architecture.svg`.
  - **FR-012b**: "Zakey Scene Intelligence" — automation rules and AI-assisted scenes. Must include 5 example scenes: Wake Up, Away Mode, Good Night, Guest Mode, Meeting Mode. Visual: `assets/images/technology/scene-intelligence.svg`.
  - **FR-012c**: "Multi-Protocol Compatibility" — Wi-Fi, Zigbee 3.0, Bluetooth Low Energy, Matter-ready positioning, IR, and wired control. Wording MUST be realistic and MUST avoid unsupported certification claims. Visual: `assets/images/technology/multi-protocol.svg`.
  - **FR-012d**: "Secure Smart Living" — encryption-ready messaging, privacy-focused design, secure device pairing, and role-based project control concept. Visual: `assets/images/technology/secure-smart-living.svg`.
  - **FR-012e**: "Energy Intelligence" — lighting optimization, climate efficiency, smart plug/meter integration, and usage insights. Visual: `assets/images/technology/energy-intelligence.svg`.
  - **FR-012f**: "Scalable Project Deployment" — for developers, hotels, and system integrators, with room templates, repeatable scenes, and central monitoring. Visual: `assets/images/technology/scalable-deployment.svg`.
- **FR-013**: The page MUST include at least one full-bleed "ecosystem diagram" section showing how Zakey's devices, network, cloud, app, panels, and integrations connect. This MAY be the visual associated with FR-012a or a separate diagram.
- **FR-014**: The page MUST close with a final CTA section linking to `pages/partners.html` and `pages/contact.html` (or the existing Get a Quote anchor).
- **FR-015**: The Technology page MUST use a premium dark technical visual treatment (consistent with the rest of the site) and MUST NOT alter or duplicate global tokens; all colors, surfaces, and shadows MUST use the existing CSS custom properties.

#### Software Page (`pages/software.html`)

- **FR-020**: The Software page MUST open with a hero titled "Control Every Space from One Intelligent Experience", a one- to two-sentence subtitle positioning Zakey as one unified software platform across mobile, panels, dashboards, voice, and guest experience, a primary CTA "Request a Demo" (links to Get a Quote), and a hero mockup or composite visual.
- **FR-021**: The page MUST contain exactly seven sections in this order, each with anchor ID, heading, 75–150 words of body copy, at least one realistic image/mockup, and 3–5 capability bullets:
  - **FR-021a**: "Zakey Mobile App" — mockup at `assets/images/software/zakey-app-mockup.svg`.
  - **FR-021b**: "Zakey Control Panels" — visual at `assets/images/software/zakey-control-panels.svg`.
  - **FR-021c**: "Smart Scenes & Automation" — visual at `assets/images/software/zakey-scenes.svg`.
  - **FR-021d**: "Voice Assistant Integration" — visual at `assets/images/software/zakey-voice.svg`; copy MUST realistically position Alexa, Google Assistant, and Siri Shortcuts compatibility without making certification claims.
  - **FR-021e**: "Business / Project Dashboard" — mockup at `assets/images/software/zakey-dashboard.svg`.
  - **FR-021f**: "Energy & Device Insights" — visual at `assets/images/software/zakey-insights.svg`.
  - **FR-021g**: "Guest / Hotel Room Experience" — visual at `assets/images/software/zakey-guest-experience.svg`.
- **FR-022**: The page MUST close with a CTA section offering both "Request a Demo" → Get a Quote and "Become a Partner" → `pages/become-a-partner.html`.

#### Partners Page (`pages/partners.html`)

- **FR-030**: The Partners page MUST open with a hero titled "Grow with Zakey Smart Living", a positioning subtitle for B2B audiences, and a primary CTA "Become a Partner" linking to `pages/become-a-partner.html`.
- **FR-031**: The page MUST include a "Who We Work With" section with at least five partner-type cards: Distributor, System Integrator, Real Estate Developer, Installer, Interior Design Office, Hotel & Hospitality Operator. Each card MUST have an icon or small visual, a 1–2 sentence description, and an inline CTA.
- **FR-032**: The page MUST include a "Partner Benefits" grid showing 7 distinct benefits: Premium product portfolio, Project-ready smart ecosystem, Sales and marketing support, Technical documentation, Training and onboarding, Demo/showroom support concept, Scalable solutions for large projects. Each benefit MUST include an icon and a 1–2 sentence description.
- **FR-033**: The page MUST include a "Partner Journey" timeline with exactly 6 sequenced steps: Apply → Consultation → Product Training → Demo Setup → First Project → Ongoing Support. Each step MUST be visually numbered and have a short caption.
- **FR-034**: The page MUST include "Partner Use Cases" with 4 packaged solutions: Smart Villa Package, Smart Apartment Package, Hotel Room Package, Office Automation Package. Each card MUST include a visual, a 1-line summary, and a CTA linking to the relevant existing Solutions detail page.
- **FR-035**: The page MUST include an FAQ accordion with at least 6 questions covering: territory exclusivity policy, minimum order or project requirements, training availability, lead time and stock, marketing co-op support, project pricing/discounts. The accordion MUST be implemented with vanilla JS, MUST be keyboard-accessible (Enter/Space to toggle, focus visible), MUST animate expansion smoothly, MUST respect `prefers-reduced-motion`, and MUST gracefully degrade to all-open static markup if JS fails.
- **FR-036**: The page MUST close with a strong final CTA section linking to `pages/become-a-partner.html`.

#### Become a Partner Page (`pages/become-a-partner.html`)

- **FR-040**: The Become a Partner page MUST open with a short hero explaining what happens after the application is submitted (e.g., review SLA, contact channel, next steps), so applicants set expectations correctly.
- **FR-041**: The application form MUST include exactly these 13 fields, in a sensible order, each with a label, placeholder, accessible name, and where applicable validation rule:
  - **Partner Type** (required, select) — options match FR-031 partner types.
  - **Full Name** (required, text).
  - **Company / Organization** (required, text).
  - **Country / Region** (required, select or text).
  - **City** (required, text).
  - **Email** (required, email format).
  - **Phone / WhatsApp** (required, tel format).
  - **Website** (optional, URL format).
  - **Business Type** (required, select or radio).
  - **Estimated Project Volume** (required, select — e.g., 1–5 units, 6–25, 26–100, 100+, Multiple Projects/Year).
  - **Interested Solutions** (required, multi-select or checkbox group sourced from existing Solutions: Smart Villa, Smart Apartment, Smart Hotel, Smart Office, Smart Compound, Gaming Room, Elderly Care, Smart Retail).
  - **Message / Project Description** (optional, textarea with a soft character limit).
  - **Consent checkbox** (required) — applicant agrees to be contacted and acknowledges the Privacy notice with a link to `pages/privacy.html`.
- **FR-042**: The form MUST validate client-side: required fields blocked, format checks for email/phone/URL, the first failing field receives focus and is scrolled into view, errors are announced via `aria-live="polite"`, and the submit button is visibly disabled until basic completion or shows a "Please fix errors" state on failed submission.
- **FR-043**: On a fully valid submission the form MUST NOT make any network request; instead it MUST display a styled success confirmation in-place (or via route to a confirmation section) describing what happens next, with a "Back to Partners" link.
- **FR-044**: The form MUST be fully responsive: single-column on mobile (≤640px), two-column on tablet (641–1023px) for short fields, and an optimized layout on desktop (≥1024px).
- **FR-045**: The form MUST be keyboard-navigable with a logical tab order; focus rings MUST be clearly visible against both light and dark themes.

#### Assets, Content, and Quality

- **FR-050**: All images referenced by Phase 04 pages MUST exist at the specified paths. Placeholder SVGs (consistent with prior phases — premium dark or light backgrounds with brand-color accents and meaningful product/scene content) are acceptable; raster placeholders MUST NOT be used. Each image MUST have descriptive alt text.
- **FR-051**: No copy on any Phase 04 page MUST contain the string "lifesmart" (case-insensitive), "lorem ipsum", or "placeholder" in user-visible text. The existing Gate 2 (content rules) MUST be extended or remain compatible to enforce this on the new pages.
- **FR-052**: All in-page anchors, header/footer links, internal page links, and CTA buttons on Phase 04 pages MUST resolve to existing files. The existing Gate 3 (link integrity) MUST pass on the new pages.
- **FR-053**: The Partners FAQ accordion JS module MUST live in `js/partners.js` (or equivalent), be conditionally imported from `js/main.js` based on the presence of `[data-faq]` or `body[data-page="partners"]`, and MUST NOT execute on other pages.
- **FR-054**: The Become a Partner form's validation module MUST live in `js/become-a-partner.js` (or be added to `js/forms.js` if it reuses the existing newsletter/quote-form patterns), and MUST be conditionally imported only when the page is loaded.
- **FR-055**: Every interactive control on Phase 04 pages MUST meet the existing site accessibility baseline: visible focus, `aria-*` attributes where needed, sufficient contrast under both light and dark themes, and operability via keyboard alone.

### Key Entities *(include if feature involves data)*

- **Technology Pillar**: A named subsystem under Zakey's technology umbrella. Attributes: pillar ID (anchor), display name, short positioning sentence, body copy, capability bullets (4–6), supporting visual path and alt text, optional sub-features list.
- **Software Pillar**: A named software experience under the Zakey platform. Attributes: pillar ID, display name, positioning sentence, body copy, capability bullets (3–5), visual/mockup path and alt text, target audience tag (resident/operator/guest/staff/admin).
- **Partner Type**: A B2B audience Zakey supports. Attributes: type ID, display name, icon/visual, short description, default landing CTA destination.
- **Partner Benefit**: A reason a partner should join Zakey. Attributes: benefit ID, display name, icon, short description.
- **Partner Journey Step**: One step of the onboarding timeline. Attributes: step number, display name, short description, optional duration/SLA hint.
- **Partner Use-Case Package**: A pre-bundled solution Zakey offers as a partner-ready package. Attributes: package ID, display name, target solution (links to existing solution detail page), short summary, visual path, alt text, top capabilities (3–5).
- **FAQ Item**: One question/answer pair in the Partners FAQ. Attributes: question ID, question text, answer text (HTML-safe), open-by-default flag (default: false), category tag (optional).
- **Partner Application Submission**: The transient client-side state of the Become a Partner form. Attributes: all 13 fields from FR-041, plus per-field validation state (untouched / valid / invalid + message) and overall form state (idle / submitting / success / error). No persistence is required.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A first-time B2B visitor can identify Zakey's six core technology pillars in under 2 minutes of scanning the Technology page (validated by a 5-second test or moderated review on the desktop layout).
- **SC-002**: All four new pages render with no console errors, no broken images (except documented placeholders), and no horizontal scroll on screens from 320px to 1920px wide.
- **SC-003**: The three existing integrity gates (`npm run check`) pass with 28/28 files after Phase 04 is implemented.
- **SC-004**: The Partners FAQ accordion expands and collapses within 300ms (or instantly under `prefers-reduced-motion`) and remains operable with keyboard-only input on 100% of items.
- **SC-005**: The Become a Partner form blocks submission on 100% of attempts where any required field is missing or any format-validated field is invalid, and accepts submission on 100% of attempts where all required fields are valid.
- **SC-006**: A keyboard-only user can complete the entire Become a Partner form, submit it, and reach the success state without using a pointing device.
- **SC-007**: The Technology, Software, and Partners pages each include the documented minimum number of visuals (Technology: 6+ pillar visuals + 1 ecosystem diagram; Software: 7 pillar mockups + 1 hero visual; Partners: 1 hero + 5 partner-type icons + 7 benefit icons + 6 timeline numbers + 4 package visuals).
- **SC-008**: 100% of Phase 04 page CTAs resolve to an existing file in the site (verified by the link integrity gate).
- **SC-009**: All Phase 04 pages render correctly under both light and dark theme without manual adjustments, using the existing CSS custom-property system.
- **SC-010**: No user-visible content on any Phase 04 page contains the strings "lifesmart", "lorem ipsum", or "placeholder" (case-insensitive).

## Assumptions

- The existing site shell (header, mobile drawer, footer, theme toggle, anti-flash script, font preload, compiled `assets/css/site.css`) is the authoritative shell and will be reused verbatim on all four new pages so that Gate 1 (shell consistency) passes.
- The site's content rules (Gate 2) and link integrity rules (Gate 3) already encode the rules in FR-051 and FR-052; if the gate scripts need their file count incremented from 24 to 28, that is an acceptable mechanical update during implementation.
- The existing Get a Quote form (built in an earlier phase) remains the canonical destination for "Request a Demo" CTAs from the Software page. A separate demo route is out of scope for Phase 04.
- The Become a Partner form is intentionally **frontend-only**. No backend, no email handler, no third-party form service, and no analytics events are required. The success state is purely client-side.
- Tailwind v3 with a local build is the styling system (no CDN), per the existing constitution; Phase 04 introduces no new utility classes that require config changes beyond what existing tokens cover.
- All image placeholders for Phase 04 follow the SVG-only convention established in earlier phases — no raster placeholders, no external image services, no `<image href>` to remote URLs.
- Voice assistant integrations are positioned as **compatibility / works with** language (Alexa, Google Assistant, Siri Shortcuts) and do NOT claim certification.
- Multi-protocol naming in FR-012c uses generic protocol names (Wi-Fi, Zigbee 3.0, Bluetooth LE, Matter, IR, wired) and does not claim certification beyond what is realistically defensible at scaffolding time.
- The Partners FAQ uses single-open accordion behavior (only one item open at a time) by default; implementation MAY choose independent-open mode if a clear UX rationale is documented in the implementation plan.
- Country/Region in the application form is implemented as a free-text input with an optional datalist of common markets, or as a select; either is acceptable for v1.
- The "Estimated Project Volume" and "Interested Solutions" fields are coarse-grained intake signals, not contractual commitments; they do not need cross-field validation.
- The active-nav indicator pattern (e.g., `aria-current="page"` plus a styled state) already exists in the shell and will be applied automatically to the Phase 04 pages.
- Adding Technology, Software, and Partners to the main navigation will increase the nav item count; the existing mobile drawer is presumed to scroll if necessary. If layout pressure on the desktop nav requires consolidation (e.g., a dropdown), that decision is deferred to the implementation plan.
