# Phase 0 Research — Zakey Phase 01

**Feature**: Design System, App Shell, Navigation & Homepage
**Date**: 2026-05-13
**Status**: All `NEEDS CLARIFICATION` resolved; ready for Phase 1.

The Technical Context in `plan.md` is fully concrete because the constitution
fixes the stack. The remaining decisions are best-practice choices for *how*
to build with that stack. Each decision below is independently verifiable in
Phase 1.

---

## D-01 — Tailwind major version

**Decision**: Tailwind CSS **3.4.x** with `@tailwindcss/forms` and
`@tailwindcss/typography`. Build runs through the Tailwind CLI via
`npx tailwindcss` (PostCSS pipeline configured in `postcss.config.js`).

**Rationale**:
- Tailwind 3.4 is the most-deployed stable line — broadest plugin
  compatibility, broadest example/recipe coverage, no API churn.
- The two plugins are core to this project: `forms` gives us a sane
  reset for the quote form; `typography` gives us premium prose
  defaults for the blog page (Phase 02+).
- Tailwind 4 is too young for a "looks like a finished premium site"
  brand launch; the JIT/CSS-only build of v4 changes the input format
  and is still settling.

**Alternatives considered**:
- *Tailwind v4 with `@tailwindcss/cli`* — rejected because the API for
  `@layer components` and theme tokens is still moving, and we want
  predictable plugin behaviour over six months.
- *Hand-rolled CSS without Tailwind* — rejected because the design
  system (Principle III) needs a consistent token & utility layer
  across 12+ HTML files, and Tailwind's purge keeps the final CSS tiny.

---

## D-02 — JS module strategy (no bundler)

**Decision**: Plain ES Modules served directly. Each `*.html` page loads
`js/main.js` via `<script type="module" src="./js/main.js" defer></script>`,
and `main.js` `import`s `navigation.js`, `homepage.js` (only on the
homepage), and `forms.js`. No Webpack, Vite, esbuild, Rollup, or Parcel.

**Rationale**:
- Native module support is universal in the target browsers.
- Skipping a bundler keeps "open `index.html` and it works" true (a
  Constitution VI gate).
- Total JS budget for Phase 01 is ~25 KB — bundling buys no real win.

**Alternatives considered**:
- *Concatenate to a single `js/site.js`* — rejected; separate files keep
  diff blast-radius low and make it obvious which module owns which
  behavior.
- *esbuild watcher* — rejected to honour Principle I and avoid a
  Node-dependent dev loop.

---

## D-03 — Slider implementation pattern

**Decision**: Hand-rolled vanilla JS slider for the featured-product
section, using CSS scroll-snap as the layout primitive and JS for
pagination dots, prev/next controls, auto-advance, hover-pause, and
`prefers-reduced-motion` opt-out.

**Rationale**:
- Avoids a third-party library (Swiper/Glide), keeps JS budget tiny.
- CSS scroll-snap means the slider is usable with **no JS** (graceful
  degradation per Constitution Principle II), and touch-swipe is free.
- Full keyboard support and ARIA (`aria-roledescription="carousel"`,
  `aria-live="polite"` on the visible slide region) are
  straightforward in ~120 lines of JS.

**Alternatives considered**:
- *Swiper.js* — adds ~25 KB minified + a CSS file; overkill for one
  slider; conflicts with Principle I "framework-free" spirit.
- *Pure-CSS slider via `:target`* — rejected because auto-advance,
  hover-pause, and pagination-dot syncing all need JS anyway.

---

## D-04 — Mega-menu & mobile-drawer ARIA pattern

**Decision**: Follow the **WAI-ARIA Authoring Practices "Disclosure
Navigation Menu"** pattern. Each mega-menu trigger is a `<button>` with
`aria-expanded="false|true"` and `aria-controls="<panel-id>"`. The
panel is a regular `<div>` with `role="region"` containing semantic
`<ul>`/`<li>` link lists. The mobile drawer follows the same disclosure
pattern with an added focus trap and Escape-to-close.

**Rationale**:
- Avoids the more restrictive `role="menu"` pattern, which forces
  arrow-key-only navigation and breaks expectations for a nav menu.
- Disclosure pattern keeps Tab the natural traversal, which matches
  every premium AIoT site we surveyed.
- Trigger pattern works identically on hover (desktop) and click
  (mobile) — we add hover handlers but the button still works without
  hover.

**Alternatives considered**:
- *`role="menubar" / role="menu"`* — rejected; over-engineered and
  breaks for screen-reader users who expect link semantics.
- *CSS-only `:hover` mega-menu* — rejected because keyboard users
  cannot open it.

---

## D-05 — Image placeholder strategy

**Decision**: All Phase-01 images use lowercase-hyphenated filenames
under `assets/images/<category>/zakey-<slug>.jpg`. Until real
photography arrives, each filename resolves to a checked-in
placeholder asset (gradient SVG with the product/space name labelled),
served at the documented path. Containers carry a CSS background
(linear gradient using design tokens) so even if a file is missing
during dev, layout does not collapse.

**Rationale**:
- Markup never changes when real photos land — only the file at the
  path changes.
- Gradient backgrounds keep section rhythm intact during the photo
  swap window.
- Naming convention is the same one referenced in the constitution
  Brand & Design System Standards section.

**Alternatives considered**:
- *External placeholder services (`picsum.photos`, `placehold.co`)* —
  rejected; requires network, leaks unbranded imagery, violates the
  "looks like a finished site" gate.
- *Inline base64 placeholders* — rejected; bloats HTML and is harder
  to swap.

---

## D-06 — Quote-form state machine

**Decision**: A single plain-object state machine inside
`js/forms.js` with five states — `idle`, `validating`, `submitting`,
`success`, `error` — and a per-field validation map. Transitions are
driven by `submit`, `input`, `blur`, and `reset` events. The
"submission" is simulated with a `setTimeout` between 600–1500 ms.
DOM updates are performed by toggling `data-state` attributes on the
form element; CSS handles every visual transition.

**Rationale**:
- A data-attribute state machine + CSS `[data-state="…"]` selectors
  keeps JS minimal and aligns Behavior (JS) ↔ Visuals (CSS) cleanly.
- Per-field error messages live in static HTML (Constitution II) and
  are revealed by toggling a class — never injected by JS.
- The same pattern is reused for the newsletter form (idle / submitting
  / success / error), which keeps `js/forms.js` cohesive.

**Alternatives considered**:
- *A library like XState* — rejected; massive overkill for two forms.
- *Inline event handlers in HTML* — rejected; violates clean
  separation and is hard to test.

---

## D-07 — Color tokens & dark-glass header

**Decision**: Color tokens live as CSS custom properties on `:root`
in `src/input.css` (so they are emitted into compiled
`css/styles.css`), and are also surfaced as Tailwind `theme.extend.colors`
keys so they are usable from class names. Canonical token set:

| Token | Hex | Use |
|---|---|---|
| `--color-bg-deep` | `#05070d` | Page background, dark sections |
| `--color-bg-elevated` | `#0c0f17` | Elevated dark surfaces |
| `--color-bg-light` | `#f5f7fb` | Light-mode surfaces |
| `--color-surface-muted` | `#e7ebf3` | Dividers, muted cards on light |
| `--color-glass` | `rgba(255,255,255,0.06)` | Glass card overlay |
| `--color-glass-strong` | `rgba(255,255,255,0.1)` | Glass header on scroll |
| `--color-text-primary` | `#f5f7fb` | Body text on dark |
| `--color-text-muted` | `#9aa3b2` | Secondary text |
| `--color-text-ink` | `#0c0f17` | Body text on light |
| `--color-accent` | `#22d3ee` | Electric cyan accent (primary CTA, focus ring) |
| `--color-accent-strong` | `#06b6d4` | Hover / pressed cyan |
| `--color-accent-soft` | `rgba(34,211,238,0.16)` | Tinted accent surfaces |
| `--color-luxe` | `#c9a45c` | Sparing gold luxe accent (optional) |
| `--color-border` | `rgba(255,255,255,0.08)` | Glass borders |
| `--color-success` | `#34d399` | Form success state |
| `--color-error` | `#f87171` | Form error state |

**Rationale**:
- Constitution III mandates deep dark + cyan accent + optional gold.
- Glass header (FR-017) uses `backdrop-filter: blur(20px)` over
  `--color-bg-deep` at 0.65 opacity; cleanly handled with a single
  `[data-scrolled="true"]` attribute on `<body>`.
- Cyan (`#22d3ee`) over deep navy passes WCAG AA contrast for
  large text and focus rings; precise contrast checked in Phase 2 tasks.

**Alternatives considered**:
- *Pure Tailwind defaults (sky/cyan-500)* — rejected; tokens give
  the design team one knob to retune the brand palette.

---

## D-08 — Typography scale

**Decision**: Two-family stack — display serif/sans for hero & section
headings, neutral sans for body. Default to system + Inter for body
and a premium display sans (Manrope or Sora) for headings, both loaded
via `<link rel="preconnect">` + `<link rel="preload">` for the two
weights used (display 600/700 and body 400/500). Type scale tokens:

| Token | clamp(min, fluid, max) | Use |
|---|---|---|
| `--font-hero` | `clamp(2.5rem, 6vw + 1rem, 5.25rem)` | Hero H1 |
| `--font-section` | `clamp(2rem, 3vw + 1rem, 3.25rem)` | Section H2 |
| `--font-eyebrow` | `0.875rem` | Section eyebrow label |
| `--font-card-title` | `clamp(1.125rem, 0.5vw + 1rem, 1.375rem)` | Card H3 |
| `--font-body` | `1rem` / `1.125rem` (lg+) | Body |
| `--font-caption` | `0.8125rem` | Captions, metadata |

**Rationale**:
- `clamp()` fluid sizing removes the need for per-breakpoint type
  overrides and keeps hero presence on every screen.
- Two families is the sweet spot — single family reads flat; three+
  is busy.

**Alternatives considered**:
- *Single variable font (Inter Variable)* — viable fallback; rejected
  as the default because the hero needs more visual presence than
  Inter offers.

---

## D-09 — Static-site link integrity & shell consistency

**Decision**: Three bash gates committed under `scripts/`:

- `check-shell-consistency.sh` — extracts the markup between
  `<!-- header:start -->` and `<!-- header:end -->` markers (and the
  same for footer) from every `.html` file and hashes it. Fails if
  any page disagrees.
- `check-content-rules.sh` — greps the repo for `lorem ipsum`,
  `lifesmart`, `ilifesmart` (case-insensitive), checks every page has
  exactly one `<h1>` and a non-empty `<title>` + `<meta name="description">`.
- `check-links.sh` — extracts every `href` from every shipped
  `.html`, drops the ones starting with `#` or `https?://`, and
  verifies each remaining path resolves to a file in the repo.

**Rationale**:
- These three are the operational expression of constitution
  Principles V, VI, and VII.
- Bash is portable, requires no Node toolchain, and runs in CI
  identically to local.

**Alternatives considered**:
- *htmlhint + linkinator* — viable; postponed to Phase 02 once the
  toolchain stabilises. For Phase 01 we want zero npx dependencies
  for the gates.

---

## D-10 — Reduced-motion handling

**Decision**: A single CSS block under `@layer base`:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }
}
```

Plus a JS guard in `main.js` that reads
`window.matchMedia('(prefers-reduced-motion: reduce)').matches` and:
(a) skips slider auto-advance, (b) skips scroll-triggered animation
observers, (c) disables any optional parallax.

**Rationale**: Constitution III implicitly requires accessible
animation; spec FR-033 and SC-011 make it explicit.

---

## Decisions Index

| ID | Topic | Section |
|---|---|---|
| D-01 | Tailwind version & plugins | Tailwind 3.4 + forms + typography |
| D-02 | JS module strategy | Native ESM, no bundler |
| D-03 | Slider implementation | Vanilla JS + CSS scroll-snap |
| D-04 | Menu ARIA pattern | Disclosure Navigation Menu |
| D-05 | Image placeholders | Gradient SVG at canonical paths |
| D-06 | Form state machine | Plain object + `data-state` attrs |
| D-07 | Color tokens | CSS custom properties on `:root` + Tailwind theme |
| D-08 | Typography scale | Two-family + clamp() fluid sizing |
| D-09 | Static-site gates | Three bash scripts |
| D-10 | Reduced-motion | Single CSS block + JS guard |

All ten decisions are independently revisitable; none are blocking
prerequisites for any other. Phase 1 artifacts (data-model, contracts,
quickstart) consume these decisions directly.
