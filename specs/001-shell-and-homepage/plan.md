# Implementation Plan: Zakey Phase 01 — Design System, App Shell, Navigation & Homepage

**Branch**: `001-shell-and-homepage` | **Date**: 2026-05-13 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-shell-and-homepage/spec.md`

## Summary

Phase 01 establishes Zakey's premium static frontend: a complete design system (tokens, type scale, button/card/form variants, spacing/grid utilities), a shared dark-glass header with mega-menus on desktop and a hamburger drawer on mobile, a multi-column footer with newsletter and social, eleven homepage sections (hero → featured slider → why → ecosystem → solutions-by-space → technology preview → product grid → partner CTA → case studies → blog teaser → quote form), and minimal placeholder pages for every nav destination so links resolve. Stack is fixed by the constitution: HTML, locally compiled Tailwind CSS, and vanilla JavaScript — no framework, no CDN. All primary content lives in static HTML; JavaScript is restricted to behavior (sticky header, slider, mega-menu, mobile drawer, form state machine, newsletter state). The output is the foundation every later phase consumes.

## Technical Context

**Language/Version**: HTML5, CSS3, ECMAScript 2022 (vanilla, ES modules via native `<script type="module">`), Tailwind CSS 3.4.x compiled locally
**Primary Dependencies**: `tailwindcss@^3.4`, `@tailwindcss/forms`, `@tailwindcss/typography`, `postcss`, `autoprefixer` — installed as devDependencies and consumed by the Tailwind CLI. No runtime framework, no jQuery, no SPA router, no Tailwind CDN.
**Storage**: N/A — static site; no persistence. Form submissions are simulated in front-end JS only.
**Testing**: Manual viewport pass at 360/480/640/768/1024/1280/1440 px + automated shell-script gates: `scripts/check-shell-consistency.sh` (every page has identical `<header>`/`<footer>` markup), `scripts/check-content-rules.sh` (zero "lorem ipsum" / "lifesmart" / "ilifesmart"; single `<h1>` per page; meta title+description present), `scripts/check-links.sh` (every `href` resolves to a real file in this repo or starts with `#` or `https?://`). No browser test framework in Phase 01.
**Target Platform**: Latest two stable versions of Chromium-based browsers, Firefox, and Safari on desktop and mobile. IE / legacy Edge unsupported.
**Project Type**: Static multi-page web frontend (per Constitution Principle I — framework-free).
**Performance Goals**: First Contentful Paint < 1.5 s on cable; Largest Contentful Paint < 2.5 s; total homepage transfer < 1.5 MB including images; JS bundle (uncompiled, since no bundler) total < 25 KB across `main.js + navigation.js + homepage.js + forms.js`; compiled `css/styles.css` < 80 KB after Tailwind purge.
**Constraints**: No frontend framework. No Tailwind CDN. No JavaScript content injection. No broken links. No console errors. WCAG 2.1 AA for focus visibility, color contrast, and keyboard operability. Respect `prefers-reduced-motion: reduce`. Every section carries a visual.
**Scale/Scope**: 1 homepage (`index.html`) with 11 sections + 11 placeholder pages under `pages/` + shared design system + 4 vanilla JS modules + 30+ placeholder image filenames across 6 image namespaces.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Evaluated against `.specify/memory/constitution.md` v1.0.0:

| # | Principle | Verdict | Evidence |
|---|---|---|---|
| I | Static-First, Framework-Free Stack | ✅ PASS | Stack chosen: HTML/CSS/vanilla JS + Tailwind 3.4 compiled locally via CLI. `package.json` has `tailwindcss` as devDependency; no framework dependency planned. No `cdn.tailwindcss.com` reference anywhere. |
| II | Content Lives in HTML, Behavior Lives in JS | ✅ PASS | All 11 homepage sections, all card content, all form fields, and the entire footer are authored as static HTML in `index.html`. JS is scoped to: sticky-header class toggle, slider transitions, mega-menu open/close, mobile drawer, quote-form state machine, newsletter form state. No `innerHTML = …` for primary content; no hydration. |
| III | Premium Visual Language | ✅ PASS | Spec FR-022 mandates the design system; FR-017 mandates dark-glass header; FR-024 mandates a meaningful visual per section; spec emphasises deep dark + cyan accent + glassmorphism + premium type. Phase 02 will inherit the same tokens (Story 4). |
| IV | Independent Zakey Brand Identity | ✅ PASS | FR-007 forbids "CoSS"/"AI Builder"/"Fusion Link" or any LifeSmart-coined name. FR-026 forbids "lifesmart" / "ilifesmart" anywhere. Original product names (Aura Panel, Secure Kit, Smart Switch Series, Climate Hub) per FR-003. `scripts/check-content-rules.sh` enforces the grep. |
| V | Realistic, Production-Ready Content | ✅ PASS | FR-026 forbids lorem ipsum. Every card schema in FR-003/004/006/008/010/011 mandates image+title+description+CTA. Form has 7 explicit states (FR-013). |
| VI | Working UI Quality Bar | ✅ PASS | FR-029 link integrity, FR-031 no console errors, FR-032 responsive across 3 bands, FR-013 full form states. Three automated check scripts gate the build. |
| VII | Phased Implementation Discipline | ✅ PASS | This is explicitly Phase 01. Placeholder pages for non-home routes are documented (Assumptions §2) so links resolve without faking depth. No half-finished sections will ship: each section is either complete or excluded. |

**Result**: All seven principles pass with no justified violations. Complexity Tracking section remains empty.

**Post-design re-check (after Phase 1 artifacts written)**: The research, data-model, contracts, and quickstart introduce no new dependencies, no framework, no Tailwind CDN, no JS-driven content injection, and no broken-link risk. The image-placeholder contract reinforces Principle V (realistic content + readable file paths). The two state-machine contracts (quote-form, newsletter-form) keep all visible states reachable from static HTML, satisfying Principle II. All seven principles still pass — no Phase 1 design decision required carving an exception.

## Project Structure

### Documentation (this feature)

```text
specs/001-shell-and-homepage/
├── plan.md              # This file
├── research.md          # Phase 0 output — tooling & pattern decisions
├── data-model.md        # Phase 1 output — content entities & schemas
├── quickstart.md        # Phase 1 output — local dev / verify steps
├── contracts/           # Phase 1 output — UI contracts (header, footer, form, slider, menu, tokens)
│   ├── README.md
│   ├── design-tokens.contract.md
│   ├── header.contract.md
│   ├── footer.contract.md
│   ├── mega-menu.contract.md
│   ├── mobile-drawer.contract.md
│   ├── hero-slider.contract.md
│   ├── quote-form.contract.md
│   ├── newsletter-form.contract.md
│   └── image-placeholder.contract.md
└── tasks.md             # Phase 2 output (/speckit-tasks)
```

### Source Code (repository root)

```text
/
├── index.html                          # Homepage (eleven sections)
├── pages/                              # Placeholder pages so all nav links resolve
│   ├── products.html
│   ├── solutions.html
│   ├── technology.html
│   ├── software.html
│   ├── partners.html
│   ├── projects.html
│   ├── blog.html
│   ├── about.html
│   ├── contact.html
│   ├── privacy.html
│   └── terms.html
├── src/
│   └── input.css                       # Tailwind input: @tailwind base/components/utilities + @layer overrides
├── css/
│   └── styles.css                      # Compiled Tailwind output (purged); committed
├── js/
│   ├── main.js                         # Entry: sticky header, scroll observers, reduced-motion gate
│   ├── navigation.js                   # Mega-menu + mobile drawer state machines
│   ├── homepage.js                     # Hero slider + featured-product slider auto-advance + pagination
│   └── forms.js                        # Quote form + newsletter form state machines
├── assets/
│   ├── images/
│   │   ├── hero/                       # zakey-smart-home-hero.jpg, …
│   │   ├── products/                   # zakey-aura-panel.jpg, zakey-secure-kit.jpg, …
│   │   ├── solutions/                  # zakey-smart-villa.jpg, zakey-smart-hotel.jpg, …
│   │   ├── technology/                 # zakey-multi-protocol.jpg, zakey-ai-scene.jpg, …
│   │   ├── projects/                   # zakey-villa-case.jpg, zakey-hotel-case.jpg, …
│   │   └── blog/                       # zakey-article-01.jpg, …
│   └── icons/                          # SVG icon sprites (caret, menu, close, social, check, alert)
├── scripts/
│   ├── check-shell-consistency.sh      # Header/footer byte-identical across pages
│   ├── check-content-rules.sh          # No lorem ipsum / lifesmart / ilifesmart; single H1; title+meta present
│   └── check-links.sh                  # Every href resolves
├── tailwind.config.js                  # Theme extensions: colors, fontFamily, fontSize, boxShadow, backdropBlur
├── postcss.config.js                   # tailwindcss + autoprefixer
├── package.json                        # Scripts: build:css, watch:css, check
└── package-lock.json
```

**Structure Decision**: A single, flat, static multi-page site rooted at the repo root. The flat root layout (no `frontend/` or `apps/` subdirectory) is chosen because Phase 01 ships a static site that is served directly from the repo — opening `index.html` in a browser MUST work without a build server (per Constitution VI: "Every page MUST be directly openable in the browser"). Tailwind runs in `npm run watch:css` during development and is committed as `css/styles.css` so production hosting (or `open index.html`) needs no Node toolchain. The `pages/` directory holds placeholder pages for nav destinations; future phases will replace each placeholder with a full page.

## Complexity Tracking

*Empty — Constitution Check passes with no violations.*

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| — | — | — |
