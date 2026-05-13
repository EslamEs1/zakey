<!--
SYNC IMPACT REPORT
==================
Version change: (template, unratified) → 1.0.0
Bump rationale: MAJOR — initial ratification. The prior file was the unfilled
constitution template with placeholder tokens. This is the first concrete
version, so versioning starts at 1.0.0.

Modified principles (renamed/restructured from template placeholders):
- [PRINCIPLE_1_NAME] → I. Static-First, Framework-Free Stack
- [PRINCIPLE_2_NAME] → II. Content Lives in HTML, Behavior Lives in JS
- [PRINCIPLE_3_NAME] → III. Premium Visual Language (NON-NEGOTIABLE)
- [PRINCIPLE_4_NAME] → IV. Independent Zakey Brand Identity
- [PRINCIPLE_5_NAME] → V. Realistic, Production-Ready Content
Added principles (beyond the template's default five):
- VI. Working UI Quality Bar
- VII. Phased Implementation Discipline

Added sections:
- "Brand & Design System Standards" ([SECTION_2_NAME])
- "Project Structure, Scope & Quality Gates" ([SECTION_3_NAME])
- Governance (filled)

Removed sections: none.

Templates requiring updates:
- ✅ .specify/templates/plan-template.md — compatible; the "Constitution Check"
   placeholder is intentionally per-feature and will reference these principles
   when filled. No edit needed.
- ✅ .specify/templates/spec-template.md — compatible; technology-agnostic.
- ✅ .specify/templates/tasks-template.md — compatible; phase structure already
   matches Principle VII (phased delivery). Frontend-specific task taxonomy is
   applied per feature, not in the template.
- ✅ .specify/templates/checklist-template.md — compatible (no constitutional
   references).
- ✅ AGENTS.md / CLAUDE.md — both already delegate to the active plan; no edit
   needed.

Follow-up TODOs: none. Ratification date set to today (2026-05-13) because no
prior adoption date exists.
-->

# Zakey Frontend Constitution

Zakey is a premium smart-living brand. This constitution governs the
construction of the Zakey marketing & product website — a static, multi-page
frontend that must look more polished, more luxurious, and more creative than
any competing AIoT brand site. Every rule below is binding on every PR, every
page, and every section.

## Core Principles

### I. Static-First, Framework-Free Stack

The site MUST be built using only HTML, CSS, Tailwind CSS, and vanilla
JavaScript. The following are PROHIBITED, with no exceptions: React, Vue,
Angular, Svelte, Preact, Solid, Lit, Next.js, Nuxt, Remix, Astro, SvelteKit,
Vite, Webpack-based SPA bundlers, jQuery as an application layer, and any
runtime UI framework or SPA router. Tailwind MUST be installed locally and
compiled via the project's PostCSS/Tailwind CLI build; the Tailwind CDN
(`cdn.tailwindcss.com`) is forbidden in every environment, including drafts.

**Rationale**: Zakey is a static, SEO-critical marketing site. A framework
adds runtime cost, indirection, and build complexity that the product does not
need. A locally compiled Tailwind ensures predictable, purgeable styles and
keeps the site cacheable and fast.

### II. Content Lives in HTML, Behavior Lives in JS

All essential page content — headings, paragraphs, product names, product
descriptions, solution copy, pricing/quote calls-to-action, hero copy, footer
links, SEO-relevant text, and any text a crawler or screen reader must see —
MUST be present in the static HTML at file load time. JavaScript MUST be
restricted to UI behavior only: sliders/carousels, tabs, filters, dropdowns,
mobile menu, accordions, counters, scroll animations, modals, form UI
validation, and similar interactive affordances. JavaScript MUST NOT inject,
replace, or hydrate the primary content of a page.

**Rationale**: This is the non-negotiable contract that lets Zakey rank,
render with JS disabled, survive flaky networks, and remain accessible. It
also enforces a clean separation between the page (HTML+CSS) and the
interactions (JS).

### III. Premium Visual Language (NON-NEGOTIABLE)

Every page MUST express Zakey's luxury smart-home visual direction:
deep dark sections, soft gradients, glassmorphism, metallic surfaces, elegant
cards, large product visuals, generous whitespace, strong typographic
hierarchy, and large premium headings. Every major section MUST include a
meaningful visual — product render, device mockup, lifestyle photograph,
abstract smart-home graphic, icon group, or composed visual card. A section
MUST NOT be left text-only if a visual can improve it. The visual language
(colors, typography, spacing, button styles, card styles, header, footer)
MUST be identical across all pages; a new page MUST reuse the established
design tokens and component classes rather than invent a parallel system.

**Rationale**: Zakey's market position depends on looking unmistakably
premium. Inconsistent or under-illustrated pages immediately collapse that
positioning, regardless of how good the copy is.

### IV. Independent Zakey Brand Identity

The site MUST present Zakey as a fully independent brand. The reference site
(iLifeSmart / LifeSmart) MUST NOT be mentioned, alluded to, or recognizably
copied. Specifically: (a) the strings "LifeSmart" and "iLifeSmart" MUST NOT
appear anywhere in the codebase or content; (b) no text from the reference
site may be copied verbatim or near-verbatim; (c) no reference-site logos,
product names, model numbers, or proprietary protocol names may be reused;
(d) Zakey's own product names, taglines, and marketing copy MUST be original.
Inspiration from the reference's structure (which sections exist, what a
B2B AIoT brand site contains) is permitted; replication of its identity is
not.

**Rationale**: Visible imitation destroys brand credibility and creates legal
risk. The reference is a structural starting point, not a source of assets.

### V. Realistic, Production-Ready Content

The site MUST read like a complete, professional, client-ready company site.
"Lorem ipsum", obvious filler text, placeholder dates like "2025-01-01" used
as marketing dates, or empty cards are PROHIBITED in shipped pages. Every
product card MUST carry: product image, product name, category, short
description, and a working CTA. Every solution card MUST carry: visual image,
title, short description, key benefits, and a working CTA. Every form MUST
have realistic fields and styled validation states (idle / focus / error /
success / submitting / submitted-success / submitted-error). Every page MUST
have: an SEO-friendly `<title>`, a meta description, a single semantic
`<h1>`, proper heading hierarchy, and meaningful `alt` text on every image.
Images that have not yet been produced MUST use clearly named local
placeholders under `assets/images/...` (e.g.,
`assets/images/products/zakey-control-panel.jpg`); placeholder filenames
themselves MUST stay realistic and brand-appropriate.

**Rationale**: The site is judged by the worst section a visitor sees. An
empty card or a "lorem ipsum" block on one page erases the credibility of
every other page.

### VI. Working UI Quality Bar

Every interactive element on every shipped page MUST work: buttons, links,
tabs, sliders, filters, dropdowns, forms, modals, accordions, mobile menu,
language switcher (if present), scroll triggers, counters. Specifically: no
broken links (every `href` resolves to a real file in this repo or a real
external URL), no console errors or uncaught exceptions on page load or
during normal interaction, no `alert()` / `confirm()` / `prompt()` calls in
production code, no missing images (every `<img src>` resolves to a real
file under `assets/`), no empty `<section>` blocks. Forms do not need a
backend, but they MUST exhibit complete UI behavior (validation messages,
disabled-while-submitting state, success state, error state). The site MUST
render and behave correctly across mobile (≤640px), tablet (641–1024px), and
desktop (≥1025px) breakpoints.

**Rationale**: A premium look with broken interactions is not premium. This
is the gate that separates "demo" from "deliverable".

### VII. Phased Implementation Discipline

Work MUST proceed phase by phase, following the active `specs/<feature>/`
plan and tasks. A single PR / session MUST NOT attempt to "build the whole
site" in one undifferentiated pass. Completed and accepted sections MUST NOT
be removed or regressed unless they are being replaced by a strictly better
equivalent that preserves or improves the visual language and content
quality. Half-finished sections (e.g., a card grid with three real cards and
three blanks) MUST NOT be committed to a shipped page; either finish the
section or do not include it in this phase. Quality and completeness take
priority over scope expansion.

**Rationale**: This project's failure mode is breadth without depth — many
pages that all look 70% finished. The phased discipline forces each phase to
ship at 100% before the next begins.

## Brand & Design System Standards

**Brand name**: Zakey. Always written exactly as "Zakey" (capital Z, no
hyphen, no all-caps unless the surrounding type treatment demands it).

**Voice & tone**: premium, confident, futuristic, trustworthy, simple.
No marketing fluff, no exclamation-point-heavy copy, no jargon dump.

**Color system** (canonical tokens; exact hex values are defined in
`css/styles.css` `:root` and `tailwind.config.js`):
- Deep black / near-black — primary surface for hero, headers, dark
  sections.
- Soft white / off-white — primary text on dark, primary surface on light
  sections.
- Cool gray — secondary surfaces, dividers, muted text.
- Electric blue / cyan — single primary accent (CTAs, focus rings, active
  states, key highlights).
- Subtle gold or silver — permitted only as a sparing luxury accent (e.g.,
  thin metallic borders, premium tier indicators); MUST NOT compete with
  the cyan accent.

**Typography**: a modern, premium sans-serif as the primary face, with a
distinct display weight/size for hero and section headlines. Body copy
MUST stay highly readable. Heading hierarchy MUST be visually obvious:
hero ≫ section heading ≫ subsection ≫ body.

**Spacing & layout**: generous section padding, consistent container
widths, consistent card paddings, consistent button heights, consistent
form field heights. New components MUST reuse the existing spacing scale
and component classes — they MUST NOT invent ad-hoc spacing values.

**Imagery**: every major section gets a meaningful visual. Image filenames
under `assets/images/` MUST be lowercase, hyphenated, and namespaced by
folder (`products/`, `solutions/`, `technology/`, `blog/`, `lifestyle/`,
etc.). Every `<img>` MUST have descriptive `alt` text — never `alt=""` on
content images, never `alt="image"`.

**Responsiveness**: design and verify at the three breakpoint bands
defined in Principle VI. The mobile experience is not a fallback; it MUST
be deliberately laid out.

## Project Structure, Scope & Quality Gates

**Canonical file structure** (the live repo MAY use the equivalent
`css/`, `js/`, `assets/` flat layout already in place; the principle is
that the structure is static, predictable, and free of framework
artifacts):

```
index.html
pages/                  # all non-home pages, one HTML file per route
assets/
  images/
    products/
    solutions/
    technology/
    blog/
    lifestyle/
  icons/                # SVG sprites and standalone icons
css/                    # compiled Tailwind output + hand-authored layers
js/                     # vanilla JS modules, one concern per file
src/input.css           # Tailwind input (or equivalent)
tailwind.config.js
package.json
```

Header and footer MAY be duplicated across static HTML pages. If they are
duplicated, they MUST stay byte-consistent — a shell-consistency check
(such as the existing `scripts/check-shell-consistency.sh`) MUST pass
before a feature is considered done.

**Required site scope** (the site MUST include, at minimum, all of these
pages, each at the quality bar of Principle VI):

1. Home page
2. Product catalog page
3. Product detail pages (or representative detail pages covering each
   major category)
4. Solutions overview page
5. Individual solution pages (smart villa, smart hotel, smart office,
   smart security, lighting, climate, etc.)
6. Technology / ecosystem page
7. Software / app page
8. Partners / become-a-distributor page
9. Projects / case studies page
10. Blog / news page
11. About page
12. Contact / get-quote page
13. Privacy & Terms pages (legal completeness)

**Quality gates** (a feature is NOT done until every applicable gate
passes):
- Every page is directly openable in a browser via a real file path.
- Every navigation link resolves to a real file; the link-check gate is
  zero broken links.
- No `alert()` / `confirm()` / `prompt()` anywhere in production JS.
- No "lorem ipsum" string anywhere in shipped HTML.
- No "lifesmart" / "ilifesmart" string anywhere in the repository
  (case-insensitive).
- Every page has a unique `<title>`, a meta description, and exactly one
  `<h1>`.
- Every shipped page has been mentally (and where possible visually)
  verified at mobile / tablet / desktop widths.
- The Tailwind build runs cleanly; no CDN references remain.

## Governance

This constitution supersedes all other style preferences, ad-hoc
decisions, and per-PR shortcuts. Where any other document, comment, or
informal preference conflicts with a rule above, the constitution wins.

**Amendments**: any change to this file MUST (a) update the version per
the policy below, (b) update `Last Amended` to the date of the change,
(c) prepend an updated Sync Impact Report comment at the top, and
(d) propagate consequent edits into the affected templates under
`.specify/templates/` in the same PR.

**Versioning policy**:
- MAJOR — a principle is removed, redefined in a backward-incompatible
  way, or replaced; or governance itself is restructured.
- MINOR — a new principle or a new mandatory section is added, or an
  existing principle is materially expanded with new binding rules.
- PATCH — wording, typo, clarification, or non-binding refinement that
  does not change what is required of contributors.

**Compliance reviews**: every PR description MUST state which principles
the change touches and how it complies. The Constitution Check section of
`plan-template.md` MUST be filled in (not skipped) for each new feature
plan; unjustified violations block the plan from advancing to
implementation. For runtime guidance during a feature, contributors MUST
defer to the active `specs/<feature>/plan.md` and `tasks.md` and, when in
conflict, to this constitution.

**Version**: 1.0.0 | **Ratified**: 2026-05-13 | **Last Amended**: 2026-05-13
