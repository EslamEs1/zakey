# Phase 0 Research: Phase 05 — Projects, Blog, About, Contact, Legal Pages, and Final Frontend QA

**Feature**: `005-final-pages-qa`
**Date**: 2026-05-14
**Status**: Complete — zero unresolved NEEDS CLARIFICATION items.

All Technical Context items in `plan.md` are determined by carry-forward from Phases 01–04 (static HTML, locally compiled Tailwind, vanilla ES module JS, three bash integrity gates, theme via `localStorage`). The research below resolves the genuinely new questions Phase 05 introduces.

---

## R-01 — Filter pattern for Projects (segments) and Blog (categories)

**Decision**: Use the Phase 02 product-filter pattern (already in `js/products.js` and `js/solutions.js`): a small `data-*` attribute on each card + a button-group of filter chips that toggle a single `data-active-filter` value on the grid container. Hidden cards get `hidden` attribute set + `display:none` via attribute selector. Filter buttons carry `aria-pressed` for state.

**Rationale**: This pattern is already in production, already passes the integrity gates, and works without any framework. Reusing it means zero new CSS, zero new JS conventions, and a consistent UX across the four filterable surfaces (Products, Solutions, Projects, Blog). The implementation is < 40 LOC per module.

**Alternatives considered**: (a) Build a generic filterable-grid component shared between Products/Solutions/Projects/Blog — rejected: premature abstraction; the four lists have different card shapes; the duplication is < 40 LOC and is easier to maintain page-by-page. (b) URL-hash-driven filters (e.g., `#hotels`) — rejected: requires shareable-deep-link UX work that the spec does not request. The current pattern already supports URL-hash deep links in `solutions.js` if Phase 05 wants to extend it later.

---

## R-02 — Article detail-page table-of-contents implementation

**Decision**: Static HTML `<nav class="article-toc" aria-label="Table of contents">` with hardcoded `<a href="#section-id">` anchors, placed in the page markup directly after the article hero. On articles with `≥ 4` H2 sections, the TOC renders; on articles with `< 4` H2 sections, the TOC `<nav>` block is omitted from the page entirely. No JS scroll-spy (the optional Phase 04 scroll-spy already exists at `js/scroll-spy.js` but is bound to the technology pillar-nav — keep it scoped there). For Phase 05 articles, anchor clicks rely on native browser hash-scrolling.

**Rationale**: Articles are content pages — the TOC is a content concern, not a UI-state concern. Hardcoding the anchors keeps the JS surface minimal (no module needed for article pages at all) and means the TOC works with JavaScript fully disabled. The constitution Principle II ("content lives in HTML") explicitly favors this.

**Alternatives considered**: (a) Generate the TOC at page-load from a JS module that scans `<h2>` elements — rejected: violates Principle II for purely cosmetic reasons. (b) Implement a sticky-on-desktop TOC with scroll-spy highlighting — rejected: adds JS module, adds CSS state machine, adds reduced-motion considerations, and the spec's "static or sticky — implementer choice" gives us license to choose the lighter option. We pick static, top-of-article. Future enhancement work can graduate this to sticky if SEO/UX feedback requests it.

---

## R-03 — Contact-page main quote-form: reuse Phase 04 form patterns vs. new module

**Decision**: Build `js/contact.js` as a near-copy of `js/become-a-partner.js` (Phase 04) with: (1) different field list (FR-008's 12 fields vs. Phase 04's 13), (2) same `data-form-state` state machine, (3) same per-field blur validation via a `WeakSet` of touched controls, (4) same submit-error summary pattern, (5) same submitting → success transition (400 ms artificial delay, 100 ms under reduced-motion), (6) same edit-and-resubmit flow. Two helper functions (`validateField`, `setFieldState`) are inline copies — explicit duplication chosen over premature abstraction.

**Rationale**: Phase 04's become-a-partner form was the harder of the two forms (more fields, stricter business logic). Cloning it to contact.js gives us a known-good, tested form pattern at the cost of ~5 KB of literal duplication. The constitution Principle I (no framework) and Principle V (working forms) both prefer this duplication over a shared module that introduces indirection. If, in a future phase, a third form is added, we can promote the shared helpers to a `js/form-validation.js` module.

**Alternatives considered**: (a) Extract `validateField`, `setFieldState`, and the state-machine glue into `js/form-validation.js` and have both forms import — rejected: the abstraction is YAGNI today (only two forms), and the cost of extracting + re-testing both forms exceeds the cost of duplication. (b) Use HTML5 native validation (`required`, `pattern`, `type="email"`) without JS — rejected: Phase 04's form already uses a JS state machine for the error summary, focus-shift behavior, and idle/submitting/success transitions; the contact form must match this UX for consistency.

---

## R-04 — Floating WhatsApp button: placement, dismissal, multi-page

**Decision**: A single component class `.floating-whatsapp` ships in `src/input.css` and is rendered inline as an `<a>` element at the bottom of `<body>` on:
- `pages/contact.html` (mandatory per FR-024)
- `pages/become-a-partner.html` (added as a Phase 05 polish enhancement)
- `pages/projects.html`, `pages/project-*.html`, `pages/blog.html`, `pages/article-*.html`, `pages/about.html` (added as a sitewide conversion-funnel enhancement)

The button is **not** on `index.html`, `pages/products.html`, `pages/solutions.html`, `pages/technology.html`, `pages/software.html`, `pages/partners.html` — these already have their own bottom-of-page CTAs and the WhatsApp button would be redundant. (This is a deliberate per-page-type decision; not every page needs a floating CTA.)

Position: `position: fixed; bottom: env(safe-area-inset-bottom, 1.25rem); right: 1.25rem; z-index: 50`. Size: 56×56 px circle on desktop, 52×52 px on mobile. Color: WhatsApp green (#25D366), white phosphor icon. `aria-label="Chat with Zakey on WhatsApp"`. No dismissal behavior — the button is always visible. `href="https://wa.me/0000000000"` with an inline HTML comment immediately above the element instructing the user to replace `0000000000` with the real Zakey WhatsApp number before client handoff.

**Rationale**: B2B smart-home sites typically include WhatsApp as a sales-channel CTA in EMEA/MENA markets. A persistent floating button is industry standard. Limiting it to conversion-funnel pages (post-product, pre-contact) prevents UI clutter on top-of-funnel pages. The placeholder phone number with an inline comment is the cleanest handoff pattern — no JS-templating, no env vars, no build step.

**Alternatives considered**: (a) Floating button on every page including the homepage — rejected: redundant on pages with a primary CTA in the hero. (b) JS-driven slide-up entrance after 5 s of scroll — rejected: adds JS, adds reduced-motion considerations, and degrades the keyboard-tab order unpredictably. (c) Dismiss-button on the floating CTA — rejected: B2B conversion funnels do not dismiss WhatsApp; the user is mid-research and the cost of one extra fixed element is lower than the cost of losing a contact. (d) Embed a WhatsApp Web widget — rejected: third-party iframe, performance cost, privacy implications, framework-adjacent.

---

## R-05 — Map embed on Contact page

**Decision**: Render a static SVG illustration as the "map" — a decorative regional outline (e.g., a stylized Middle East / North Africa map with a single pin glow at a placeholder office location) saved at `assets/images/contact/zakey-office-map.svg`. The element is wrapped in a `<figure class="contact-map">` with a `<figcaption>` reading the office address as static HTML. No iframe, no Google Maps API key, no JavaScript geolocation, no consent prompt.

**Rationale**: The spec (FR-007) says "map placeholder or office visual" — the static SVG satisfies that with zero third-party dependencies, zero consent/cookie surface, zero performance cost. The constitution forbids no specific external service, but the static-first principle favors avoiding embeds when the design intent is decorative + informational. The full address ships in text form so it remains crawlable + screen-reader-readable.

**Alternatives considered**: (a) Google Maps iframe embed — rejected: third-party loading cost, cookie consent burden, no functional benefit over a static visual for a B2B inquiry-flow page. (b) OpenStreetMap leaflet embed — rejected: same problem at a smaller scale; introduces a JS dependency. (c) High-res office photograph as an `<img>` — acceptable alternative if a real photograph is provided later; the SVG slot is named `zakey-office-map.svg` and can be swapped for a JPG without HTML changes.

---

## R-06 — Article body styling: extend Phase 04 `.tech-intro` or new `.article-body`?

**Decision**: Introduce a new dedicated component family `.article-body` that scopes long-form prose styles to article-detail pages only. It defines: `.article-body h2`, `.article-body h3`, `.article-body p`, `.article-body ul`, `.article-body ol`, `.article-body blockquote`, `.article-body figure`, `.article-body figure > figcaption`, `.article-body a` (in-content links), `.article-body img` (in-content images: max-width 100%, border-radius from `--radius-lg`, soft shadow). Spacing and line-height are tuned for reading (1.7 line-height, ~62ch max-width inside a centered column). The component lives in `@layer components`. No new tokens are introduced — only new selectors that compose the existing `--color-*`, `--space-*`, `--radius-*`, and `--font-*` tokens.

**Rationale**: The site has no long-form-prose styling today (Phase 04's `.tech-intro` is a 3-paragraph intro, not a 600+ word article). Without `.article-body`, in-content `<h2>` and `<p>` would inherit the page-default `<h2>` styling (hero-sized) and become unreadable inside a flowing article. A scoped class avoids polluting global heading styles. The ~62ch column width is the standard reading-comfort range cited in typographic literature.

**Alternatives considered**: (a) Use Tailwind's `@tailwindcss/typography` plugin (`.prose`) — rejected: adds a dependency to `package.json`, adds ~15 KB to the CSS bundle (worsening the already-overrun CSS budget), and the plugin's defaults need overriding to match the Zakey design tokens anyway. (b) Author article content inside a `.tech-intro` block — rejected: `.tech-intro` is centered, hero-adjacent, and tuned for short intros; reusing it for long-form content would either bloat its scope or break its current page. (c) Inline Tailwind utility classes on every `<h2>`, `<p>`, `<img>` inside articles — rejected: high noise-to-signal ratio in the HTML, fragile to maintain, and violates the "component classes" preference of the design system.

---

## R-07 — Related-Articles section on article pages: how to populate

**Decision**: Hardcode the related-articles list inside each article HTML file. Each article ships a `<section class="related-articles">` with 2–3 `<article class="related-card">` blocks. The related slugs are chosen at authoring time and reference any of the three implemented articles (`article-smart-home-guide.html`, `article-villa-automation.html`, `article-hotel-smart-room.html`) plus a fallback "Read All Articles" CTA to `pages/blog.html` if a desired related article isn't yet implemented. This avoids any JS module for article-recommendation logic and ensures the list ships in the HTML.

**Rationale**: With only three articles in scope, recommendation logic is overkill. Hardcoding keeps the related-articles section visible to crawlers (good SEO), screen readers, and JS-disabled visitors — exactly what constitution Principle II asks for.

**Alternatives considered**: (a) Build a JS module that picks two random unrelated articles at page load — rejected: violates Principle II (recommendations would be JS-injected). (b) Add a category-based JS picker — rejected: over-engineered for 3 articles; HTML-authored list is faster to write and ships in markup.

---

## R-08 — Project detail-page gallery: lightbox or static?

**Decision**: Static grid of 4–6 image thumbnails per gallery, each linking to the full-size image via the standard `<a href="<full-img>"><img src="<thumb>"></a>` pattern. **No lightbox modal in Phase 05.** Clicking a gallery image opens the full image in a new browser tab.

**Rationale**: A modal lightbox requires new CSS, new JS, new keyboard-trap logic, new reduced-motion handling, new ARIA dialog markup, and new focus-management — none of which the spec demands. The "open in new tab" pattern is universally understood, accessible, and zero-cost. If client feedback later asks for a modal lightbox, it can be added in a follow-up phase.

**Alternatives considered**: (a) Add a lightbox module (`js/lightbox.js`) — rejected: ~5 KB JS + ~3 KB CSS + accessibility work + reduced-motion CSS for no spec-asked-for benefit. (b) Use a native `<dialog>` element for the lightbox — better than (a) on accessibility but still ~2 KB of new code; rejected on YAGNI grounds. (c) Use CSS `:target` for a no-JS lightbox — rejected: fragile, breaks browser-back behavior, breaks keyboard escape.

---

## R-09 — Blog "Coming Soon" indicator: visual treatment

**Decision**: Cards whose target article is not implemented carry a `[data-article-status="coming-soon"]` attribute and a visible `<span class="blog-card__status">Coming Soon</span>` badge in the top-right corner of the card image. The card's CTA renders as a disabled-looking `<span class="btn btn--ghost btn--disabled">Coming Soon</span>` instead of an `<a>` link, with `aria-disabled="true"`. The card remains visually present in the grid for editorial pacing (so the grid feels complete) but is clearly marked.

**Rationale**: The spec (FR-021, US4) explicitly says unbuilt articles must indicate "Coming Soon" or link to the overview, never to a 404. The badge-plus-disabled-CTA pattern is the most graceful expression of "this is real content we're working on" vs. "this is a placeholder". It also keeps the card grid balanced (9+ cards) without shipping broken links.

**Alternatives considered**: (a) Link the unbuilt cards to `pages/blog.html#category` for the same category — rejected: the user reaches a page they're already on; confusing UX. (b) Hide unbuilt cards entirely — rejected: the grid would feel sparse and the spec asks for ≥ 9 cards. (c) Link to a generic "Coming Soon" placeholder page — rejected: adds an empty page to the site for no purpose.

---

## R-10 — SVG image asset inventory & sizing

**Decision**: All Phase 05 image placeholders are SVG, matching Phase 02/03/04 convention. Per-page sizes:

- **Hero SVGs** (one per overview page + one per detail page): viewBox 16:9 (e.g., `1600×900`), ≤ 30 KB minified each. Stylized illustrations using the Zakey palette tokens (deep navy / cyan accent / soft white). Premium-illustration style; no photographic content.
- **Card thumbnails** (per project card on `projects.html`, per blog card on `blog.html`): viewBox 4:3 (e.g., `800×600`), ≤ 8 KB minified each.
- **Section visuals** (per About-page section: brand-story, mission, vision, values, team-expertise; per Contact-page hero/map/office): viewBox per section need (typically 1:1 or 3:2), ≤ 10 KB minified each.

Total new image budget: ~30 SVG files, ~250 KB total — well within the 500 KB/page budget Phases 01–04 have operated under.

Inventory (file paths and brief contents):

- `assets/images/projects/projects-hero.svg` — Projects-overview hero.
- `assets/images/projects/luxury-smart-villa.svg` — project card + detail hero.
- `assets/images/projects/smart-hotel-room.svg` — project card + detail hero.
- `assets/images/projects/smart-office.svg` — project card + detail hero.
- `assets/images/projects/smart-apartment-tower.svg` — project card only.
- `assets/images/projects/smart-retail-showroom.svg` — project card only.
- `assets/images/projects/smart-gaming-suite.svg` — project card only.
- `assets/images/projects/villa-gallery-1.svg` … `-4.svg` — Villa detail-page gallery (4 thumbnails).
- `assets/images/projects/hotel-gallery-1.svg` … `-4.svg` — Hotel detail-page gallery (4 thumbnails).
- `assets/images/projects/office-gallery-1.svg` … `-4.svg` — Office detail-page gallery (4 thumbnails).
- `assets/images/blog/blog-hero.svg` — Blog-overview hero.
- `assets/images/blog/smart-home-guide.svg` — article card + detail hero.
- `assets/images/blog/villa-automation.svg` — article card + detail hero.
- `assets/images/blog/hotel-smart-room.svg` — article card + detail hero.
- `assets/images/blog/article-04.svg` … `article-09.svg` — 6 placeholder thumbnails for coming-soon cards.
- `assets/images/blog/article-inline-1.svg` & `article-inline-2.svg` — generic in-article figures (reused across articles where appropriate).
- `assets/images/about/zakey-smart-living.svg` — About hero / brand-story visual.
- `assets/images/about/mission.svg`, `vision.svg`, `values.svg` — three section cards.
- `assets/images/about/team-expertise.svg` — team / expertise card grid background.
- `assets/images/contact/zakey-contact-hero.svg` — Contact hero.
- `assets/images/contact/zakey-office-map.svg` — static "map" visual.
- `assets/images/contact/zakey-office.svg` — office-interior visual (optional).

**Rationale**: SVG placeholders are the established Phase 02/03/04 pattern. They theme-shift via CSS custom properties without re-export. The per-file budget keeps total transfer tight. JPGs can replace any of these later without HTML or alt-text changes.

**Alternatives considered**: (a) Use AI-generated photographic placeholders (e.g., dummy stock photos) — rejected: licensing risk, file-size cost, and the SVG style ships cleaner under both dark and light themes. (b) Use a single shared placeholder SVG everywhere — rejected: visually monotonous, breaks the per-card distinction.

---

## R-11 — Legal page structure & content

**Decision**: Privacy and Terms pages share a single component family `.legal-page`. Each page renders:
1. Hero with page title + "Last updated: 2026-05-14" subtitle.
2. In-page anchor list (TOC) with one `<a href="#section-N">` per H2 section.
3. Numbered H2 sections, each with H3 subsections where useful.
4. Bottom CTA: "Questions? Contact us" linking to `pages/contact.html`.

Privacy sections (6+): (1) What data we collect, (2) How we use it, (3) Cookies and tracking, (4) Sharing with third parties, (5) Your rights and choices, (6) Contacting us about privacy.

Terms sections (6+): (1) Acceptance of terms, (2) Acceptable use, (3) Intellectual property, (4) Limitations of liability, (5) Governing law and dispute resolution, (6) Changes to these terms, (7) Contacting us.

Body copy is short, plain-language (4th-grade-reading-level target), and clearly marked as "general information, not legal advice." The pages do not claim regulatory compliance with any specific framework (GDPR, CCPA, etc.); the spec explicitly accepts "clean, professional, and complete enough for a company website" without legal perfection.

**Rationale**: Static company sites require Privacy and Terms; clients expect them. Plain-language copy is more appropriate for a website than legalese boilerplate — and the user's spec says "no need for legal perfection". The TOC + numbered sections pattern is the universal legal-page convention.

**Alternatives considered**: (a) Use a templated legal-text generator (TermsFeed / Iubenda) — rejected: introduces a third-party brand mention, may inject tracking, and adds a maintenance dependency. (b) Single-page combined Privacy + Terms — rejected: the spec lists them as two pages, and SEO/legal convention separates them.

---

## R-12 — Contact form: success state pattern

**Decision**: Mirror the Phase 04 Become-a-Partner form's success state exactly:
- On valid submit, transition `data-form-state="idle" → "submitting"` (form opacity reduced, submit button disabled, ~400 ms artificial wait — 100 ms under reduced-motion).
- Then `data-form-state="success"`; hide the form section via `hidden` attribute; unhide the `<section data-form-success>` block.
- Set `window.location.hash = 'quote-received'` so the URL is shareable.
- Focus the success-section's H2 (with `tabindex="-1"` so it can receive focus).
- Provide an `<button data-edit-application>` "Edit & Resubmit" button that reverses the transition.

The success section content is: "Quote Request Received" H2 + 2-sentence next-steps paragraph mentioning the 3-business-day response SLA + two CTAs ("Back to Home" / "Continue browsing — Projects").

**Rationale**: Pattern parity with Phase 04 keeps the user-facing form UX consistent across the two conversion surfaces (Become-a-Partner and Contact). Reusing the state-machine code reduces maintenance surface.

**Alternatives considered**: (a) Different success-state copy entirely — rejected: gratuitous variation. (b) Submit form data via JS `fetch` to a placeholder endpoint — rejected: no backend exists, and a stubbed `fetch` adds complexity without value.

---

## R-13 — Final QA pass: what counts as "done"?

**Decision**: The US6 final-QA pass is a structured checklist embedded as the final phase of `tasks.md` (Phase 7 Polish). The checklist items are:

1. `npm run check` — all three gates PASS at final page count (~37–38 files).
2. Forbidden-string grep: `grep -rEi 'lorem ipsum|lifesmart|ilifesmart|fusion link|ai builder|coss' index.html pages/` returns zero matches.
3. Image-alt-text sweep: `grep -rE '<img[^>]*alt=""' index.html pages/` returns zero matches outside decorative contexts (decorative `<img>` must carry `aria-hidden="true"`).
4. Console-error sweep: open every page in Chrome DevTools (initial load + filter-click + form-submit + theme-toggle + FAQ-open + mobile-drawer-toggle); confirm zero errors, zero warnings beyond expected info, zero unhandled rejections.
5. Multi-viewport sweep at 360 / 414 / 768 / 1024 / 1280 / 1920 px on every Phase 05 page; verify no horizontal scroll, no broken layouts, all imagery loads.
6. Theme-persistence sweep: toggle theme on one Phase 05 page, navigate to every other Phase 05 page, verify theme persists.
7. Keyboard-only walkthrough: every interactive element on every Phase 05 page is reachable via Tab, operable via Enter/Space/Esc as appropriate, with a visible focus ring.
8. Reduced-motion walkthrough: in DevTools force `prefers-reduced-motion: reduce`; verify all filter, FAQ, form, hero animations snap to target state instantly.
9. Link-graph audit: every Phase 05 page is reachable from at least one other page within 2 clicks of the homepage (manual click-through audit).
10. CSS-budget delta check: rebuild `css/styles.css`; record minified size; if > 95 KB (Phase 04 baseline + 2 KB), run the CSS dedup pass to bring it under.

**Rationale**: A structured checklist gives the QA pass a clear definition-of-done that can be executed by a single contributor in a single session. Items 1–3 are automatable; items 4–9 are manual but reproducible.

**Alternatives considered**: (a) Add a Playwright / Puppeteer test suite for the QA pass — rejected: introduces a testing framework (Principle I friction), adds dependency-update overhead, and the manual sweep takes < 30 minutes of focused review. (b) Skip the QA pass and trust the gates alone — rejected: the gates verify structure but not visual / interactive correctness. The manual sweep is the difference between "passes gates" and "client-ready".
