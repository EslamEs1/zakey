# Implementation Plan: Zakey Phase 04 — Technology, Software & Partners Pages

**Branch**: `004-tech-software-partners` | **Date**: 2026-05-14 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/004-tech-software-partners/spec.md`

## Summary

Phase 04 delivers the **B2B credibility funnel** of the Zakey site: a `pages/technology.html` six-pillar architecture/AI/security/energy/deployment story, a `pages/software.html` seven-pillar platform tour, a `pages/partners.html` partner-program landing page with FAQ accordion, and a `pages/become-a-partner.html` 13-field application form with full client-side validation and a styled success state. All four pages share the existing global shell (Phase 01) and the existing component library (Phase 02 cards/filters, Phase 03 lifestyle treatments, theme toggle and reveal animations from the prior bug-fix pass) — Phase 04 ships **no new design system**, only new content composition, three small new JS modules (`js/faq.js`, `js/become-a-partner.js`, an optional `js/scroll-spy.js` for the Technology page anchor nav), and a focused set of new component classes scoped under `@layer components` (`.pillar-grid`, `.pillar-card`, `.diagram-frame`, `.benefit-grid`, `.journey-step`, `.faq-item`, `.form-field`, `.app-form`).

Three of the four target HTML files (`technology.html`, `software.html`, `partners.html`) already exist as Phase 01 navigation stubs — Phase 04 rewrites their bodies in place while keeping the shell byte-identical to the rest of the site. The fourth file (`become-a-partner.html`) is net-new. The header and footer on every page in the repo are mass-updated by Phase 04 to add three new top-level nav items (Technology / Software / Partners) so that Gate 1 (shell consistency) stays passing — this is the same atomic header/footer update pattern used in Phase 03.

**Technical approach**: static multi-page HTML; one new ~3 KB JS module for the FAQ accordion (single-open mode, `aria-expanded`, `prefers-reduced-motion` respected), one new ~5 KB JS module for the application form (per-field validation state machine + success view), and a tiny optional ~1.5 KB scroll-spy module for the Technology page anchor nav (degrades to plain anchor links). The Technology ecosystem diagram and all section visuals are **inline SVG or referenced SVG placeholders** under `assets/images/technology/`, `assets/images/software/`, and `assets/images/partners/` — no raster placeholders, no remote image services. CSS budget stays under a hard 72 KB cap (Phase 03 budget was 64 KB; the +8 KB headroom covers `.pillar-card`, `.journey-step`, `.faq-item`, and the application form components — see Complexity Tracking).

## Technical Context

**Language/Version**: HTML5 + ECMAScript 2020+ (native ES modules, optional chaining `?.`, nullish coalescing `??`, `??=` logical-assign — same evergreen-browser baseline as Phase 01–03)
**Primary Dependencies**: Tailwind CSS 3.4 locally compiled via PostCSS (already wired in Phase 01); autoprefixer (pinned via `.browserslistrc` from Phase 02); zero runtime libraries; no new npm dependencies in Phase 04
**Storage**: N/A. The Become a Partner form is intentionally frontend-only — submission state lives in DOM (`aria-invalid`, `data-form-state`), not in `localStorage`, `sessionStorage`, or any backing service. Theme preference persistence (`localStorage.zakey-theme`) is reused from the theme toggle bug-fix pass and is not Phase 04's concern.
**Testing**: Three bash integrity gates carried forward from Phase 01–03 — `scripts/check-shell-consistency.sh` (Gate 1), `scripts/check-content-rules.sh` (Gate 2), `scripts/check-links.sh` (Gate 3). The hard-coded `Files checked` ceilings in those scripts (currently 24 after Phase 03) MUST be incremented to 28 as part of Phase 04 polish. Browser test framework remains explicitly out of scope; verification is manual viewport passes plus the three gates plus a keyboard-only walkthrough of the application form.
**Target Platform**: Modern evergreen browsers (Chrome / Firefox / Safari / Edge — last 2 versions per `.browserslistrc`); pages MUST be directly openable from `file://` and from any static server; pages MUST render correctly without JavaScript (degraded: FAQ shows all answers, form submits to nowhere but page renders, scroll-spy is inert)
**Project Type**: Static multi-page marketing/product site (no backend, no SSR, no CMS) — same layout as Phase 01–03, extended in place
**Performance Goals**: First-paint hero image ≤ 30 KB (SVG); first-paint total ≤ 220 KB (relaxed from Phase 03's 200 KB to accommodate the larger Technology ecosystem diagram); total page transfer ≤ 1.5 MB on 3G-fast; Largest Contentful Paint < 2.5 s on the Technology and Software pages, < 2.0 s on the Partners and Become-a-Partner pages (less imagery); CSS file ≤ 72 KB minified; JS modules total ≤ 40 KB across all phases combined
**Constraints**: No framework, no CDN, no JS-injected primary content (Constitution Principles I + II); shell-consistency MUST pass byte-identically against the Phase 01 reference shell after Phase 04 expands the nav set; no forbidden brand strings (`lifesmart`, `ilifesmart`, `CoSS`, `AI Builder`, `Fusion Link`, and any reference-site protocol names) on any new page; no certification claims for protocols or voice assistants beyond honest "works with" / "compatible with" / "Matter-ready" phrasing
**Scale/Scope**: 4 net-new or net-rewritten HTML pages (Technology, Software, Partners, Become a Partner — three of these files exist as Phase 01 stubs and will be rewritten in place; the fourth is created); ~16 new SVG placeholders under `assets/images/technology/` (6 pillar diagrams + 1 hero + 1 ecosystem), `assets/images/software/` (7 mockups + 1 hero), and `assets/images/partners/` (1 hero + 5 partner-type icons + 7 benefit icons + 4 package visuals); 2 new JS modules (FAQ + form) and 1 small optional scroll-spy module; ~7 new CSS component families inside `@layer components`; site-wide header/footer mass-update to add 3 nav items applied across all 28 final pages

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Phase 04 compliance posture | Status |
|---|---|---|
| **I. Static-First, Framework-Free Stack** | Adds zero dependencies. Three small ES modules total ≤ 10 KB; Tailwind continues to compile locally; no CDN added; no SPA router. | ✓ PASS |
| **II. Content Lives in HTML, Behavior Lives in JS** | Every pillar heading, body paragraph, capability bullet, FAQ question + answer, form label, journey step, and use-case package summary lives in static HTML. JS scope is narrow: the FAQ toggles `aria-expanded` / `.is-open`; the application form toggles `data-form-state`, `aria-invalid`, and an inline success block whose markup is also in the static HTML (`hidden` until validated). The optional scroll-spy reads the DOM but does not generate it. | ✓ PASS |
| **III. Premium Visual Language (NON-NEGOTIABLE)** | Reuses Phase 01–03 design tokens (`:root` channel-token system), button family (`.btn`, `.btn--primary`, `.btn--ghost`), card patterns, spacing scale, and theme-toggle palette. New component classes (`.pillar-card`, `.diagram-frame`, `.journey-step`, `.faq-item`, `.form-field`, `.app-form`) follow the Phase 02/03 BEM-ish naming and use only existing `var(--*)` tokens — no parallel design system. Every section ships with a visual: pillar diagrams on Technology, mockups on Software, partner-type icons on Partners, success state visual on the form. The Technology page gets one full-bleed ecosystem diagram. | ✓ PASS |
| **IV. Independent Zakey Brand Identity** | All copy is original to Zakey. The `Zakey Link`, `Zakey Scene Intelligence`, `Zakey Hybrid Fabric`, `Zakey Sense Engine`, and similar subsystem names are Zakey-original. The forbidden-strings gate (Gate 2) runs against every Phase 04 page. Voice assistant copy uses "works with Alexa / Google Assistant / Siri Shortcuts" — no certification claims. Multi-Protocol Compatibility copy lists Wi-Fi, Zigbee 3.0, Bluetooth LE, Matter-ready, IR, wired control — no proprietary reference-site protocol names. | ✓ PASS |
| **V. Realistic, Production-Ready Content** | Every Technology pillar has 75–200 words + 4–6 capability bullets + a dedicated visual. Every Software pillar has 75–150 words + 3–5 bullets + a mockup. Partners ships 5+ partner-type cards, 7 benefits, 6 journey steps, 4 use-case packages, 6+ FAQ items. Become a Partner ships 13 labelled fields with realistic placeholders, the success state has concrete next-step copy and an SLA hint. No `lorem ipsum`, no empty cards, no "TBD". SVG placeholder filenames stay realistic and namespaced (`assets/images/technology/zakey-link-architecture.svg`, etc.). | ✓ PASS |
| **VI. Working UI Quality Bar** | Every CTA on every page resolves to a real file via Gate 3. The FAQ accordion is keyboard-operable (Enter/Space), respects `prefers-reduced-motion`, and degrades to all-open if JS fails. The application form blocks invalid submits, focuses the first failing field, announces errors via `aria-live="polite"`, and shows a styled success state on valid submit — no `alert()`, no `confirm()`, no `prompt()`. All four pages render at 360 / 768 / 1024 / 1440 px without layout breaks. Both themes are visually verified. No console errors. | ✓ PASS |
| **VII. Phased Implementation Discipline** | Phase 04 is scoped to exactly four pages plus the header/footer mass-update plus the integrity-gate file-count bump. No retroactive changes to Phase 01–03 page content beyond the mandatory nav update. The four pages ship together (they reference each other's CTAs); shipping three of four would leave dangling CTAs that break Gate 3. Each user story in the spec maps to one or two of these pages and is independently testable. Polish (gate-count bump, mobile/tablet/desktop sweep, theme parity check, keyboard walkthrough) is the final non-skip task. | ✓ PASS |

**No violations. Phase 0 may proceed.**

The one item worth justifying in `Complexity Tracking` is the **CSS budget relaxation from 64 KB (Phase 03) to 72 KB**. This is not a constitutional violation (the constitution does not pin a byte budget) but it is a phase-over-phase regression in a measurable discipline. See "Complexity Tracking" below.

## Project Structure

### Documentation (this feature)

```text
specs/004-tech-software-partners/
├── plan.md                              # This file
├── research.md                          # Phase 0 — design & tech decisions
├── data-model.md                        # Phase 1 — entities & content shape
├── quickstart.md                        # Phase 1 — local-dev quickstart
├── contracts/                           # Phase 1 — UI contracts
│   ├── README.md
│   ├── technology-page.contract.md
│   ├── software-page.contract.md
│   ├── partners-page.contract.md
│   ├── become-a-partner-page.contract.md
│   ├── pillar-card.contract.md
│   ├── faq-accordion.contract.md
│   ├── partner-application-form.contract.md
│   └── nav-expansion.contract.md
├── checklists/
│   └── requirements.md                  # already authored by /speckit-specify
└── tasks.md                             # Phase 2 — produced by /speckit-tasks (not this command)
```

### Source Code (repository root)

Flat static-site layout — same as Phase 01 / 02 / 03, extended in place. No new top-level directories.

```text
zakey/
├── index.html                           # PATCH — header nav adds Technology/Software/Partners; footer link-column updated; otherwise untouched
├── pages/
│   ├── about.html                       # PATCH — header/footer mass-update only
│   ├── blog.html                        # PATCH — header/footer mass-update only
│   ├── contact.html                     # PATCH — header/footer mass-update only
│   ├── privacy.html                     # PATCH — header/footer mass-update only
│   ├── projects.html                    # PATCH — header/footer mass-update only
│   ├── terms.html                       # PATCH — header/footer mass-update only
│   │
│   ├── products.html                    # PATCH — header/footer mass-update only
│   ├── product-zakey-aura-panel.html    # PATCH — header/footer mass-update only
│   ├── product-zakey-secure-kit.html    # PATCH — header/footer mass-update only
│   ├── product-zakey-smart-switch.html  # PATCH — header/footer mass-update only
│   ├── product-zakey-climate-hub.html   # PATCH — header/footer mass-update only
│   │
│   ├── solutions.html                   # PATCH — header/footer mass-update only
│   ├── solution-smart-villa.html        # PATCH — header/footer mass-update only
│   ├── solution-smart-apartment.html    # PATCH — header/footer mass-update only
│   ├── solution-smart-hotel.html        # PATCH — header/footer mass-update only
│   ├── solution-smart-office.html       # PATCH — header/footer mass-update only
│   ├── solution-smart-compound.html     # PATCH — header/footer mass-update only
│   ├── solution-gaming-room.html        # PATCH — header/footer mass-update only
│   ├── solution-elderly-care.html       # PATCH — header/footer mass-update only
│   ├── solution-smart-retail.html       # PATCH — header/footer mass-update only
│   │
│   ├── technology.html                  # REWRITE — full Phase 04 body (hero + 6 pillars + ecosystem diagram + final CTA)
│   ├── software.html                    # REWRITE — full Phase 04 body (hero + 7 pillars + final CTA)
│   ├── partners.html                    # REWRITE — full Phase 04 body (hero + who-we-work-with + benefits + journey + packages + FAQ + final CTA)
│   └── become-a-partner.html            # NEW — hero + 13-field form + success state + footer
│
├── src/
│   └── input.css                        # EXTEND — append Phase 04 component families inside @layer components
├── assets/
│   ├── css/
│   │   └── site.css                     # rebuilt by Tailwind CLI; budget ≤ 72 KB
│   ├── images/
│   │   ├── technology/                  # EXTEND — 6 pillar SVGs + 1 hero + 1 ecosystem diagram (some may already exist)
│   │   ├── software/                    # NEW DIR — 7 mockup SVGs + 1 hero
│   │   └── partners/                    # NEW DIR — 1 hero + 5 partner-type icons + 7 benefit icons + 4 package visuals
│   └── icons/                           # untouched (existing Zakey logos remain)
├── js/
│   ├── main.js                          # PATCH — conditionally import faq.js / become-a-partner.js / scroll-spy.js by data-page
│   ├── faq.js                           # NEW — ≤ 3 KB single-open accordion
│   ├── become-a-partner.js              # NEW — ≤ 5 KB per-field validation state machine + success view
│   ├── scroll-spy.js                    # NEW (optional) — ≤ 1.5 KB Technology-page anchor nav highlight
│   └── (existing modules untouched: navigation.js, theme.js, forms.js, homepage.js, products.js, product-detail.js, solutions.js)
├── scripts/
│   ├── check-shell-consistency.sh       # PATCH — bump expected file count from 24 to 28
│   ├── check-content-rules.sh           # PATCH — bump expected file count from 24 to 28
│   └── check-links.sh                   # PATCH — bump expected file count from 24 to 28
└── (tailwind.config.js, package.json, .browserslistrc — untouched)
```

**Structure Decision**: Reuse the existing flat static layout (no new top-level directories). All four new/rewritten HTML files live in `pages/`. All new visuals are namespaced into existing or new sub-folders under `assets/images/`. JS modules continue to be one-concern files in `js/`. The Tailwind input file `src/input.css` is **extended in place** (new component families appended to `@layer components`) rather than split — this is consistent with Phase 02 and Phase 03 and keeps the compiled `assets/css/site.css` cacheable as a single file.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| **CSS budget relaxed from 64 KB → 72 KB** | Phase 04 introduces seven new component families: `.pillar-card`, `.pillar-grid`, `.diagram-frame`, `.benefit-grid`, `.journey-step` (with a numbered timeline pseudo-element), `.faq-item` (with open/close transitions and chevron animation), `.form-field` (idle/focus/error/success states), and `.app-form` (multi-column responsive grid). The journey step alone needs counter-reset/counter-increment for the numbered timeline. The form-field state machine needs five visual states × two themes. | (a) Extracting these to a separate stylesheet was rejected because we'd lose the single-CSS-file caching benefit and Gate 1's identical-stylesheet-link assumption. (b) Inline `<style>` on the four pages was rejected because it would duplicate ~6 KB per page and break the design-token system. (c) Reusing existing `.card-product` and `.card-solution` was attempted in early sketches but the pillar/journey/FAQ patterns are sufficiently different (different padding scale, different focus model, different aspect ratios) that re-purposing produced uglier compromises than a clean new family. |

The relaxed budget is itself a discipline: future phases continue to track against it, and any phase that exceeds 72 KB MUST re-justify in its own plan.

## Phase 0 → Research

See `research.md` for resolved unknowns (FAQ single- vs. multi-open mode, scroll-spy vs. plain anchors, form submission UX, voice-assistant honesty boundary, ecosystem-diagram SVG complexity budget, hosting-friendly form-success URL routing).

## Phase 1 → Design & Contracts

See `data-model.md` for content entities and `contracts/` for the eight UI contracts (four page contracts + four component/system contracts). See `quickstart.md` for the local-dev loop used while authoring the four pages.

## Post-Design Constitution Re-Check

After Phase 1 design artifacts are written, re-evaluate:

| Principle | Post-design status | Notes |
|---|---|---|
| I. Static-First, Framework-Free Stack | ✓ PASS | No new dependencies in `data-model.md` or contracts. |
| II. Content Lives in HTML, Behavior Lives in JS | ✓ PASS | All content in `data-model.md` is delivered as static HTML; the success-state block is `hidden`-by-default static HTML, not JS-injected. |
| III. Premium Visual Language | ✓ PASS | Contracts reference only existing tokens and the new component families listed in Complexity Tracking. |
| IV. Independent Zakey Brand Identity | ✓ PASS | Contracts forbid any reference-site naming; `quickstart.md` includes a `grep` step for the forbidden strings. |
| V. Realistic, Production-Ready Content | ✓ PASS | `data-model.md` specifies minimum content depth (word counts, bullet counts) per entity. |
| VI. Working UI Quality Bar | ✓ PASS | Each contract defines focus/keyboard/error/success behavior explicitly. |
| VII. Phased Implementation Discipline | ✓ PASS | The four pages and the nav update are the entire scope; no other phases are touched. |

**Post-design: still no violations. Phase 2 (tasks) may proceed via `/speckit-tasks`.**
