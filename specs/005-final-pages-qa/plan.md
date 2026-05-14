# Implementation Plan: Phase 05 — Projects, Blog, About, Contact, Legal Pages, and Final Frontend QA

**Branch**: `005-final-pages-qa` | **Date**: 2026-05-14 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/005-final-pages-qa/spec.md`

## Summary

Complete the Zakey static frontend by adding the remaining 12–13 pages (Projects overview + 3 case-study details, Blog overview + 3 article details, About, Contact, Privacy, Terms, optional 404) and conclude with an explicit site-wide QA pass. The build extends the Phase 01–04 stack with no new tooling: static HTML, locally compiled Tailwind, vanilla-ES-module JS, the existing design tokens, the existing shell-consistency / content-rules / link-integrity gates, the existing `data-page` body attribute pattern, the existing `data-form-state` form state machine, and the existing FAQ component. Three new JS modules are introduced — `js/projects.js` (segment filter), `js/blog.js` (category filter), `js/contact.js` (main quote form) — and one new visual primitive (the floating WhatsApp button). All Phase 04 carryovers (forbidden-string sweep, image alt-text discipline, theme persistence, integrity gates) become hard pre-merge requirements, not nice-to-haves.

## Technical Context

**Language/Version**: HTML5, CSS3 with PostCSS + Tailwind CSS 3.4 (locally compiled, no CDN), vanilla JavaScript as ES2022 modules (`type="module"`).
**Primary Dependencies**: Tailwind CSS (build-time only, via `npm run build:css`), no runtime dependencies, no frameworks (React/Vue/Angular/Svelte/etc. all PROHIBITED per constitution Principle I).
**Storage**: None. The site is fully static. Forms simulate submission client-side; the contact-form success state is reached after an artificial delay. Theme preference is the only persisted state and uses `localStorage` (carried forward from Phases 01–04).
**Testing**: No browser test framework introduced. Verification is via the three bash integrity gates (`scripts/check-shell-consistency.sh`, `scripts/check-content-rules.sh`, `scripts/check-links.sh`) plus the documented manual viewport / keyboard / forbidden-string / console-error sweeps in `quickstart.md`. This matches Phases 01–04 explicitly and avoids the test-framework drag noted in the constitution Principle VII discipline.
**Target Platform**: Modern evergreen browsers (Chrome / Firefox / Safari / Edge, last two major versions). Mobile-first responsive design, verified at 360 / 414 / 768 / 1024 / 1280 / 1920 px viewport widths.
**Project Type**: Static multi-page website. Flat repo layout at root (`index.html`, `pages/`, `src/`, `css/`, `js/`, `assets/`, `scripts/`). No backend, no API, no service worker.
**Performance Goals**: First Contentful Paint ≤ 1.5 s on a 4G mobile connection for every Phase 05 page; CSS bundle ≤ 92.5 KB minified at end of Phase 05 (Phase 04 baseline — must not grow further without justification, ideally reduce toward the 72 KB constitution-implied target via dedup); JS payload per page ≤ 15 KB gzipped (each new module ≤ 5 KB).
**Constraints**: No frameworks, no Tailwind CDN, no backend, no inline `<script>` blocks for application logic (only the anti-flash theme script in `<head>` from Phase 01 stays), no `alert()` / `confirm()` / `prompt()` in JS, no console errors on initial load, no broken links, no broken images, no Lorem ipsum, no LifeSmart / iLifeSmart / Fusion Link / AI Builder / CoSS references. Every interactive element keyboard-operable. Every animation respects `prefers-reduced-motion: reduce`.
**Scale/Scope**: 13 new HTML pages plus 13 new SVG image assets (hero + section visuals for each new page) plus 3 new JS modules plus extensions to `src/input.css` for project-card, blog-card, article-body, about-section, contact-form-quote, legal-page, and floating-whatsapp component families. Site total after Phase 05: 37–38 HTML files (current 25 + 13 new) plus a possible 39th if the optional 404 page is included.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

The Zakey Frontend Constitution v1.0.0 binds every line of Phase 05. Each principle below maps directly to a concrete Phase 05 commitment:

- **I. Static-First, Framework-Free Stack** — ✅ PASS. No framework introduced. Tailwind continues to compile locally via `npm run build:css` to `css/styles.css`. No CDN reference will be added to any new page. New JS modules (`projects.js`, `blog.js`, `contact.js`) are vanilla ES modules with zero dependencies.
- **II. Content Lives in HTML, Behavior Lives in JS** — ✅ PASS. All Phase 05 page content (project copy, article body, about-page sections, contact-form fields, legal-page sections) ships in static HTML at file-load time. JS handles filter behavior, FAQ open/close, form validation state, and floating-WhatsApp behavior — no DOM-injected content. The blog "Coming Soon" indicator on unbuilt cards is a static HTML element, not a JS-rendered string.
- **III. Premium Visual Language (NON-NEGOTIABLE)** — ✅ PASS. Every Phase 05 page reuses the existing design tokens (`--color-*`, `--space-*`, `--radius-*`, `--shadow-*`), the existing hero pattern, the existing card patterns, and the existing FAQ component. Every section ships with a meaningful visual — Phase 05 introduces no text-only sections. New component families (project-card, blog-card, article-body, about-grid, contact-channel-card, legal-page, floating-whatsapp) ALL inherit from the Phase 02/03/04 base patterns rather than inventing parallel systems.
- **IV. Independent Zakey Brand Identity** — ✅ PASS. Every project case study, blog article, About section, and Contact card uses original Zakey-written copy. The forbidden-string grep is wired into the QA phase (FR-030) and explicitly checks for `lifesmart|ilifesmart|fusion link|ai builder|coss`. Zero new content will reference the source/inspiration site.
- **V. Realistic, Production-Ready Content** — ✅ PASS. Every project card carries image + segment + challenge + solution + results + CTA (FR-002). Every blog card carries image + category + title + excerpt + read-time + date + CTA (FR-004). Every form field has real placeholder/help text and validation messages. Legal pages have real plain-language sections, never "Lorem ipsum". Image placeholders are namespaced under `assets/images/{projects,blog,about,contact}/<slug>.svg` per the Phase 04 SVG-placeholder convention.
- **VI. Working UI Quality Bar** — ✅ PASS. The three integrity gates remain the merge gate. Every CTA on every new page resolves to a real file. The contact form's complete state machine (idle/focus/error/success/submitting) is mandated by FR-008 + FR-022. The floating WhatsApp button is keyboard-operable with `aria-label` (FR-024). Every interactive element is keyboard-reachable (FR-027). Zero console errors required at QA (FR-036, SC-007). Multi-viewport sweep mandatory (SC-009).
- **VII. Phased Implementation Discipline** — ✅ PASS. Phase 05 is itself the final delivery phase. It is scoped to the remaining content pages only; it does NOT refactor Phase 01–04 implementations. Each user story (US1–US6) is independently testable and ships separately. The "final QA pass" task (US6, FR-039) is the explicit phase-completion checkpoint.

**Carryover from Phase 04** (declared, not a violation): the CSS minified bundle is currently 92.5 KB vs. the 72 KB target implied by the constitution. Phase 05's component additions for projects/blog/about/contact MUST NOT worsen this overrun. The plan reserves a Phase 7 "Polish — CSS dedup" task (T520) which will look for duplication between Phase 04 component families (`.benefit-card`, `.partner-type-card`, `.package-card`) and the new Phase 05 component families (`.project-card`, `.blog-card`, `.about-card`, `.contact-channel-card`) and merge where the visual is identical. If the overrun cannot be remediated in Phase 05, it is documented as a known-issue follow-up — this is the same treatment Phase 04 applied. Logged in the Complexity Tracking table below.

**Re-evaluation after Phase 1 design**: ✅ PASS. The Phase 1 artifacts (data-model.md, contracts/*, research.md, quickstart.md) introduce zero new constitution violations:

- Principle I (no frameworks): every contract specifies vanilla HTML + class-name CSS + ES-module JS. No framework primitives leaked into any contract.
- Principle II (content in HTML): every entity in data-model.md ships its content as static HTML. The blog "Coming Soon" badge, the form fields, the article TOC, the Related Articles list, the Legal page TOC, the Floating WhatsApp button — all are HTML-authored, not JS-injected.
- Principle III (premium visual language): every contract reuses existing design tokens; the only new component families compose existing tokens (e.g., `.about-card` uses `--space-*`, `--radius-*`, `--shadow-*`).
- Principle IV (independent brand): zero references to LifeSmart, iLifeSmart, or reference-site protocol names in any contract; the forbidden-string grep is wired into the QA flow.
- Principle V (realistic content): every entity has explicit word-count ranges, image alt-text requirements, and content-completeness rules.
- Principle VI (working UI): every contract specifies keyboard behavior, focus management, reduced-motion handling, and theme-compatibility.
- Principle VII (phased discipline): Phase 05 is scoped to net-new content surfaces only. No Phase 01–04 file is modified except `js/main.js` (3-line conditional-import addition) and `src/input.css` (append-only new component layers).

The CSS-budget carryover (the only declared deviation) is logged in the Complexity Tracking table and is paired with explicit polish task T520 in the upcoming tasks.md. No new violations introduced.

## Project Structure

### Documentation (this feature)

```text
specs/005-final-pages-qa/
├── plan.md                          # this file
├── research.md                      # Phase 0 — research decisions
├── data-model.md                    # Phase 1 — content entities
├── quickstart.md                    # Phase 1 — local-dev + verification
├── contracts/
│   ├── project-card.contract.md     # Phase 1 — Projects overview card & detail-page UI contract
│   ├── blog-card.contract.md        # Phase 1 — Blog card UI contract
│   ├── article-body.contract.md     # Phase 1 — Article detail-page layout + TOC contract
│   ├── contact-form.contract.md     # Phase 1 — Main quote-form contract (fields, states, validators)
│   ├── floating-whatsapp.contract.md # Phase 1 — Floating WhatsApp button contract
│   ├── about-page.contract.md       # Phase 1 — About page section layout contract
│   └── legal-page.contract.md       # Phase 1 — Privacy/Terms page layout contract
├── checklists/
│   └── requirements.md              # Spec-quality checklist (already exists)
└── tasks.md                         # Phase 2 — generated by /speckit-tasks
```

### Source Code (repository root)

The Phase 01–04 flat layout continues. Phase 05 adds files only — no directory moves, no renames.

```text
zakey/                               # repo root
├── index.html                       # carries forward; no changes in Phase 05 except optional Projects/Blog teaser
├── pages/
│   ├── about.html                   # NEW (Phase 05)
│   ├── article-hotel-smart-room.html # NEW
│   ├── article-smart-home-guide.html # NEW
│   ├── article-villa-automation.html # NEW
│   ├── become-a-partner.html        # Phase 04 — carries forward
│   ├── blog.html                    # NEW
│   ├── contact.html                 # NEW (replaces any prior stub)
│   ├── partners.html                # Phase 04 — carries forward
│   ├── privacy.html                 # NEW
│   ├── project-luxury-villa.html    # NEW
│   ├── project-smart-hotel.html     # NEW
│   ├── project-smart-office.html    # NEW
│   ├── projects.html                # NEW (replaces any prior stub)
│   ├── software.html                # Phase 04 — carries forward
│   ├── solution-*.html              # Phase 03 (8 files) — carry forward
│   ├── solutions.html               # Phase 03 — carries forward
│   ├── technology.html              # Phase 04 — carries forward
│   ├── terms.html                   # NEW
│   ├── 404.html                     # NEW (optional)
│   └── ... (other Phase 01–02 pages: products.html, product-*.html, etc.)
├── src/
│   └── input.css                    # extended with Phase 05 component families (project-card, blog-card, article-body, about-grid, contact-channel-card, contact-form-quote, legal-page, floating-whatsapp)
├── css/
│   └── styles.css                   # rebuilt from src/input.css via npm run build:css
├── js/
│   ├── main.js                      # extended with conditional imports for projects.js / blog.js / contact.js / floating-whatsapp init
│   ├── projects.js                  # NEW — segment-filter for Projects overview
│   ├── blog.js                      # NEW — category-filter for Blog overview
│   ├── contact.js                   # NEW — main quote-form state machine (reuses Phase 04 form patterns)
│   ├── faq.js                       # Phase 04 — reused by Contact-page FAQ
│   ├── theme.js                     # Phase 01 — reused
│   ├── navigation.js                # Phase 01 — reused (no patch needed; data-page slugs already supported)
│   └── ... (other Phase 01–04 modules: forms.js, products.js, solutions.js, etc.)
├── assets/
│   └── images/
│       ├── projects/                # NEW directory + ~10 SVG visuals (project hero per detail page + per-card thumbnails)
│       ├── blog/                    # NEW directory + ~12 SVG visuals (article hero per detail page + per-card thumbnails)
│       ├── about/                   # NEW directory + ~6 SVG visuals (brand-story hero, mission/vision/values cards, team/expertise cards)
│       └── contact/                 # NEW directory + ~3 SVG visuals (hero, map placeholder, office visual)
└── scripts/
    └── check-*.sh                   # Phase 01–04 — all three remain dynamic, no count bump needed (already verified during Phase 04)
```

**Structure Decision**: Phase 04's flat layout is preserved. The only structural additions are four new `assets/images/<page-type>/` subdirectories and three new top-level JS modules under `js/`. No directory restructure, no migration to a `apps/` or `packages/` layout, no Tailwind config changes (no new colors, no new spacing tokens — only new component classes within `@layer components`).

## Complexity Tracking

> Fill ONLY if Constitution Check has violations that must be justified.

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| CSS bundle remains above the 72 KB target implied by the constitution (Phase 04 carried this forward at 92.5 KB) | Phase 04 added 7 new component families (pillar-card, diagram-frame, partner-type-card, benefit-card, journey-step, package-card, faq-item, app-form, hero variants) without a dedup pass, and Phase 05 must add at least 7 more (project-card, blog-card, article-body, about-grid, contact-channel-card, contact-form-quote, legal-page, floating-whatsapp). A hard 72 KB cap would either require deleting Phase 04 components (regression-risky) or refusing to ship Phase 05 (blocks delivery). | A simpler dedup pass that scans all `@layer components` declarations for duplication between Phase 04 and Phase 05 families is reserved as Phase 7 Polish task T520. If T520 brings the bundle under 72 KB, the violation is closed. If it does not, the carry-forward is logged as a known issue with a follow-up note in MEMORY.md — exactly matching Phase 04's treatment, which the user explicitly accepted. No simpler alternative ships Phase 05 within reasonable scope. |
