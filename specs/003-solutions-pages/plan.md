# Implementation Plan: Zakey Phase 03 — Solutions Overview & Solution Detail Pages

**Branch**: `003-solutions-pages` | **Date**: 2026-05-14 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/003-solutions-pages/spec.md`

## Summary

Phase 03 delivers the **client-facing storytelling layer** of the Zakey site: a `pages/solutions.html` overview page plus six required (and two optional) `pages/solution-<slug>.html` long-form detail pages. Each detail page tells a nine-section narrative (Hero → Problem → Zakey Solution → Included Systems → Automation Scenarios → Recommended Products → Benefits → How It Connects → Final CTA) that turns a use-case-curious visitor into a quote request. The overview page is a filterable card grid across five categories (Residential, Hospitality, Commercial, Real Estate, Lifestyle). All work reuses the Phase 01 shell (header / footer / quote form anchor) and the Phase 02 component library (`.card-product`, `.filter-pill`, `.product-scenarios`, `.product-features`, `.btn`, `:root` channel tokens) — Phase 03 ships no new design system, only new content composition and a handful of new component classes (`.solution-card`, `.solution-card__benefits`, `.problem-list`, `.subsystem-card`, `.topology-diagram`, `.benefit-grid`).

**Technical approach**: static multi-page HTML with one new ~3 KB JS module (`js/solutions.js`) that ports the Phase 02 `applyFilters()` shape to a category-only toolbar; multi-category cards are supported via space-separated `data-category` tokens. The "How It Connects" visual diagram is an inline SVG per page (not a shared component) — this keeps content in HTML, makes the diagram solution-specific, and avoids an additional image-loading roundtrip. CSS budget relaxes from Phase 02's 60 KB cap to a hard 64 KB cap to accommodate the new component families. Total page weight stays under 1.5 MB per page on a 3G-fast simulated network.

## Technical Context

**Language/Version**: HTML5 + ECMAScript 2020+ (native ES modules, optional chaining `?.`, nullish coalescing `??`, `??=` logical-assign — all evergreen-browser baseline, same as Phase 01/02)
**Primary Dependencies**: Tailwind CSS 3.4 (locally compiled via PostCSS — already wired in Phase 01); autoprefixer (pinned to evergreen targets via `.browserslistrc` added in Phase 02 Polish); zero runtime libraries
**Storage**: N/A (purely static frontend; no client-side persistence in Phase 03; the filter state lives in DOM via `aria-pressed` and `.is-hidden`, not localStorage)
**Testing**: Three bash integrity gates carried forward unchanged from Phase 01/02 — `scripts/check-shell-consistency.sh` (Gate 1: byte-identical header/footer across all pages), `scripts/check-content-rules.sh` (Gate 2: one `<h1>`, non-empty title + meta, no forbidden strings), `scripts/check-links.sh` (Gate 3: every `href`/`src` resolves). Browser test framework remains explicitly out of scope; verification is manual viewport passes plus the three gates.
**Target Platform**: Modern evergreen browsers (Chrome / Firefox / Safari / Edge — last 2 versions per the `.browserslistrc` added in Phase 02); pages MUST be directly openable from the filesystem (`file://`) and from any static server
**Project Type**: Static multi-page marketing/product site (no backend, no SSR, no CMS) — same layout as Phase 01/02, extended (not restructured)
**Performance Goals**: First-paint hero image ≤ 30 KB (SVG); first-paint total ≤ 200 KB; total page transfer ≤ 1.5 MB on 3G-fast; Largest Contentful Paint < 2.5 s; CSS file ≤ 64 KB minified (relaxed from Phase 02's 60 KB); JS modules total ≤ 30 KB across all phases
**Constraints**: No framework, no CDN, no JS-injected primary content (Constitution Principles I + II); shell-consistency MUST pass byte-identically against Phase 01 reference; no forbidden brand strings (`lifesmart`, `ilifesmart`, `CoSS`, `AI Builder`, `Fusion Link`)
**Scale/Scope**: 1 overview page + 6 required + 2 optional detail pages = 7–9 net-new HTML pages; ~8 new SVG placeholders under `assets/images/solutions/`; ~2 new SVG lifestyle visuals reused from Phase 02 where possible; 1 new JS module; ~5–7 new CSS component families inside `@layer components`

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Phase 03 compliance posture | Status |
|---|---|---|
| **I. Static-First, Framework-Free Stack** | Adds zero dependencies. `js/solutions.js` is a single ES module ≤ 4 KB; Tailwind continues to compile locally; no CDN added. | ✓ PASS |
| **II. Content Lives in HTML, Behavior Lives in JS** | All nine sections on every detail page are static HTML. The overview-page filter only toggles `.is-hidden` and `aria-pressed` — no content injection. Topology diagrams are inline SVG (HTML), not JS-rendered. | ✓ PASS |
| **III. Premium Visual Language (NON-NEGOTIABLE)** | Reuses Phase 01/02 design tokens, button family, card patterns, spacing scale, and `:root` channel-token system. New component classes (`.solution-card`, `.subsystem-card`, `.topology-diagram`, etc.) follow the BEM-like Phase 01/02 naming and use only existing `var(--*)` tokens — no parallel design system. Every section includes a visual (hero image, system icons, recommended-product images, topology SVG). | ✓ PASS |
| **IV. Independent Zakey Brand Identity** | All copy is original to Zakey. No reference-site brand names, product names, or marketing taglines appear in any new page. The forbidden-strings gate runs against every Phase 03 page. | ✓ PASS |
| **V. Realistic, Production-Ready Content** | Every section on every detail page is fully populated: 3–5 unique pain points per Problem section, 3+ When/Then scenarios per Scenarios section, 6+ unique subsystem cards, 6+ unique benefit chips, 3+ Recommended Products with real images. No lorem ipsum, no empty cards. SVG placeholder filenames stay realistic (`smart-villa.svg`, `smart-hotel.svg`). | ✓ PASS |
| **VI. Working UI Quality Bar** | Every CTA on every page is a real `href` validated by Gate 3. The overview-page filter, hash pre-activation, and live count all work with `aria-pressed` / `aria-live="polite"` for accessibility. Pages render at 360 / 768 / 1024 / 1440 px without layout breaks. No console errors on JS-disabled visitors (filter becomes inert, full grid shows). | ✓ PASS |
| **VII. Phased Implementation Discipline** | Six detail pages ship as MVP; two optional pages (Elderly Care, Smart Retail) are non-blocking and only shipped if their full nine-section content is authored — half-finished optional pages are NOT committed. Each phase (Foundational → US1 → US2 → US3 → US4 → optional → Polish) completes before the next begins. | ✓ PASS |

**No violations. Phase 0 may proceed.**

The one item worth justifying in `Complexity Tracking` is the **CSS budget relaxation from 60 KB to 64 KB**. This is not a constitutional violation (the constitution does not pin a byte budget) but it is a phase-over-phase regression in a measurable artefact that we adopted as a quality discipline in Phase 02. See "Complexity Tracking" below.

## Project Structure

### Documentation (this feature)

```text
specs/003-solutions-pages/
├── plan.md                           # This file
├── research.md                       # Phase 0 — design & tech decisions
├── data-model.md                     # Phase 1 — entities & content shape
├── quickstart.md                     # Phase 1 — local-dev quickstart
├── contracts/                        # Phase 1 — UI contracts
│   ├── README.md
│   ├── solutions-overview-page.contract.md
│   ├── solution-detail-page.contract.md
│   ├── solution-card.contract.md
│   ├── category-filter.contract.md
│   └── topology-diagram.contract.md
├── checklists/
│   └── requirements.md               # already authored by /speckit-specify
└── tasks.md                          # Phase 2 — produced by /speckit-tasks (not this command)
```

### Source Code (repository root)

Flat static-site layout — same as Phase 01 / Phase 02, extended in place. No new top-level directories.

```text
zakey/
├── index.html                        # Phase 01 homepage — Phase 03 only patches the "Solutions" preview hrefs (FR-042)
├── pages/
│   ├── about.html                    # Phase 01 — untouched
│   ├── blog.html                     # Phase 01 — untouched
│   ├── contact.html                  # Phase 01 — untouched (Phase 03 CTAs land here)
│   ├── partners.html                 # Phase 01 — untouched
│   ├── privacy.html                  # Phase 01 — untouched
│   ├── products.html                 # Phase 02 — untouched
│   ├── projects.html                 # Phase 01 — untouched
│   ├── software.html                 # Phase 01 — untouched
│   ├── technology.html               # Phase 01 — untouched
│   ├── terms.html                    # Phase 01 — untouched
│   ├── product-zakey-aura-panel.html # Phase 02 — recommended-product target
│   ├── product-zakey-secure-kit.html # Phase 02 — recommended-product target
│   ├── product-zakey-smart-switch.html
│   ├── product-zakey-climate-hub.html
│   │
│   ├── solutions.html                # NEW — rewritten from Phase 01 placeholder (overview grid + filter)
│   ├── solution-smart-villa.html     # NEW — 9-section detail page
│   ├── solution-smart-apartment.html # NEW — 9-section detail page
│   ├── solution-smart-hotel.html     # NEW — 9-section detail page
│   ├── solution-smart-office.html    # NEW — 9-section detail page
│   ├── solution-smart-compound.html  # NEW — 9-section detail page
│   ├── solution-gaming-room.html     # NEW — 9-section detail page
│   ├── solution-elderly-care.html    # OPTIONAL (P3) — same shape if shipped
│   └── solution-smart-retail.html    # OPTIONAL (P3) — same shape if shipped
│
├── src/
│   └── input.css                     # EXTEND — append new component families
├── css/
│   └── styles.css                    # rebuilt by Tailwind CLI (committed; budget ≤ 64 KB)
│
├── js/
│   ├── main.js                       # PATCH — add one conditional import for solutions.js
│   ├── homepage.js                   # Phase 01 — untouched
│   ├── navigation.js                 # Phase 01 — untouched
│   ├── forms.js                      # Phase 01 — untouched
│   ├── products.js                   # Phase 02 — untouched
│   ├── product-detail.js             # Phase 02 — untouched
│   └── solutions.js                  # NEW — initFilter() — ~3 KB minified
│
├── assets/
│   ├── images/
│   │   ├── solutions/                # EXTEND — eight new SVG placeholders
│   │   │   ├── smart-villa.svg                NEW
│   │   │   ├── smart-apartment.svg            NEW
│   │   │   ├── smart-hotel.svg                NEW
│   │   │   ├── smart-office.svg               NEW
│   │   │   ├── smart-compound.svg             NEW
│   │   │   ├── gaming-room.svg                NEW
│   │   │   ├── elderly-care.svg               NEW (only if optional page ships)
│   │   │   └── smart-retail.svg               NEW (only if optional page ships)
│   │   ├── lifestyle/                # REUSE — Phase 02 lifestyles still apply for some sections
│   │   │   ├── zakey-aura-living.svg          REUSE
│   │   │   ├── zakey-secure-entrance.svg      REUSE
│   │   │   ├── zakey-switch-bedroom.svg       REUSE
│   │   │   └── zakey-climate-office.svg       REUSE
│   │   ├── og/
│   │   │   └── zakey-og-cover.svg             REUSE
│   │   └── products/                 # untouched — referenced by Recommended Products cards
│   └── icons/                        # untouched — subsystem icons are inline SVG, not file refs
│
├── scripts/
│   ├── check-shell-consistency.sh    # Phase 01 — runs unchanged
│   ├── check-content-rules.sh        # Phase 01 — runs unchanged
│   └── check-links.sh                # Phase 01 — runs unchanged
│
├── package.json                      # untouched
├── tailwind.config.js                # untouched
├── postcss.config.js                 # untouched
├── .browserslistrc                   # added in Phase 02 — untouched
├── AGENTS.md                         # PATCH — point to specs/003-solutions-pages/plan.md
├── CLAUDE.md                         # PATCH — point to specs/003-solutions-pages/plan.md
└── README.md                         # untouched
```

**Structure Decision**: extend the Phase 01/02 flat static-site layout. Phase 03 adds **7–9 net-new HTML pages**, **8 SVG placeholders**, **1 JS module**, and **~5 new CSS component families inside the existing `src/input.css` `@layer components`**. No new top-level directories, no new build steps, no new toolchain dependencies. The structure decision is "do not restructure" — every Phase 03 artefact slots into a path Phase 01/02 already established. This keeps the shell-consistency gate trivial to keep green and inherits all Phase 02 wiring (mega-menu deep links, homepage solution preview slots) without rework.

## Complexity Tracking

| Variance | Why Needed | Simpler Alternative Rejected Because |
|---|---|---|
| **CSS budget relaxed from 60 KB → 64 KB** | Phase 03 introduces six new component families (`.solution-hero`, `.solution-card`, `.problem-list`, `.subsystem-card`, `.topology-diagram`, `.benefit-grid`, `.solution-final-cta`). At Phase 02 the file is at 60,015 / 61,440 bytes (98% of budget). Even aggressive consolidation cannot fit six component families in the remaining 1,425 bytes without sacrificing component clarity. Empirical estimate: ~3–4 KB of new minified CSS at the same density as Phase 02 additions. A 64 KB cap gives ~4 KB headroom and keeps the file well under any browser cache-line concern. | (a) **Inline per-page CSS for solution-specific components** — rejected; violates Principle III (consistent design system across all pages). (b) **Drop the topology-diagram styles** — rejected; the diagram is the credibility-making artefact of US3 and demands its own component family. (c) **Compress to a 60 KB cap by removing Phase 02 components** — rejected; Phase 02 is shipped and stable; modifying it risks regression in `pages/products.html` and 4 detail pages. (d) **Move to Tailwind utility composition inline in each HTML page** — rejected; the components are reused across 1 overview page + 8 detail pages, so utility-class repetition would balloon HTML weight more than it saves on CSS. The 4 KB CSS bump is the cheapest defensible option. |
| **Inline SVG topology diagram per detail page (not a shared component)** | The diagram is solution-specific (Smart Villa shows all seven subsystems; Gaming Room emphasises entertainment / lighting / climate and de-emphasises perimeter / curtains). Sharing a single SVG and toggling visibility classes would (a) require JS to swap node states (violating Principle II if used for content), or (b) ship every solution's full topology inline on every page (≈ +1 KB × 6 pages = +6 KB total HTML weight). | (a) **External SVG file per solution under `assets/icons/topology-<slug>.svg`** — rejected; adds 6–8 HTTP requests and 6–8 PNG fallback considerations; harder to author and keep accessibility-correct. (b) **Single shared `<svg>` with CSS-toggled nodes per page** — rejected; the topology is content (which subsystems are deployed), not decoration, so CSS-hiding nodes is fragile and confusing for screen readers. Inline per-page SVG is the cleanest mapping of "this content is unique per page" to "this markup is unique per page". |

These are the only two complexity items. Neither rises to a constitutional violation; both are documented here so the next reviewer can sanity-check the trade-off rather than rediscover it.
