# Phase 04 — Local-Dev Quickstart

This is the loop while you're authoring `pages/technology.html`, `pages/software.html`, `pages/partners.html`, and `pages/become-a-partner.html`.

## One-time setup

```sh
# from repo root
npm install                 # installs Tailwind + autoprefixer (already pinned)
```

## The author loop

Run these two in two terminal windows (or use the `npm` script that combines them, if one exists):

```sh
# Terminal 1 — Tailwind watch
npm run dev:css             # watches src/input.css and rebuilds assets/css/site.css

# Terminal 2 — open the page directly
xdg-open pages/technology.html   # or whichever page you're working on
```

Refresh the browser tab manually after each edit. Both Firefox and Chromium pick up the rebuilt CSS without a hard reload.

## Authoring order (recommended)

1. **Start with `pages/become-a-partner.html`** — the simplest page (one section + a form). Author it first so the application form's CSS component family is settled before the Partners page references it.
2. **Then `pages/partners.html`** — the Partners page references the form's URL and reuses the design tokens.
3. **Then `pages/software.html`** — the seven-pillar structure is repetitive and easy to scaffold once the pillar-card component family is settled.
4. **Then `pages/technology.html`** — the most content-heavy page, including the ecosystem diagram (inline SVG, ≤ 25 KB).
5. **Finally, the site-wide header/footer mass-update + the integrity-gate file-count bump.** Run this in one atomic step across all 28 pages; otherwise Gate 1 will fail mid-way and you'll have a confusing partial state.

## Verifying

```sh
# Run the three integrity gates
npm run check                # = check-shell-consistency + check-content-rules + check-links

# Expected output after Phase 04:
#  - Shell consistency: PASS  (28/28 files)
#  - Content rules:     PASS  (28/28 files)
#  - Link integrity:    PASS  (28/28 files, 0 failures)
```

If Gate 1 fails on a single page, you almost certainly forgot to apply the nav mass-update to that file. Re-run the mass-update across all 28 pages atomically.

If Gate 2 fails on a Phase 04 page, you have a forbidden brand string (`lifesmart`, `ilifesmart`, `CoSS`, `AI Builder`, `Fusion Link`) somewhere in your copy — grep the page and fix.

If Gate 3 fails, an `href` or `src` doesn't resolve — most commonly an SVG placeholder you referenced but didn't create. Either create the placeholder under `assets/images/<area>/<file>.svg` or fix the reference.

## Forbidden-string sweep (manual)

Before declaring Phase 04 done, run this grep across the four new pages:

```sh
grep -rEi 'lifesmart|ilifesmart|lorem ipsum|certified|CoSS|AI Builder|Fusion Link' \
  pages/technology.html pages/software.html pages/partners.html pages/become-a-partner.html
```

It MUST return zero matches (case-insensitive). If `certified` appears (it sometimes sneaks into voice-assistant copy), rewrite to "works with" or "compatible with" per [research.md R-04](./research.md).

## Theme parity check (manual)

For each of the four pages:

1. Load the page.
2. Click the theme toggle. The page should re-render in light mode with no broken contrast, no dropped backgrounds, no invisible text.
3. Toggle back. The page should return to dark mode identically.
4. Navigate to another page and back. The theme should persist via `localStorage.zakey-theme`.

## Keyboard-only check (manual)

For `pages/become-a-partner.html`:

1. Tab from the top of the page through every form field, the consent checkbox, and the Submit button.
2. Tab order MUST match DOM order. Focus ring MUST be visible at every step under both themes.
3. With all required fields empty, press Enter on the Submit button. The form MUST NOT advance; the error summary MUST appear; focus MUST jump to the first invalid field.
4. Fill every required field with valid content. Press Enter on the Submit button. The form MUST advance through the artificial submitting state to the success state. The URL hash MUST become `#application-received`.
5. From the success state, Tab to the "Edit & resubmit" link and activate it. The form MUST return to its previous state with all entered values still present.

For `pages/partners.html`:

1. Tab to the first FAQ question.
2. Press Enter or Space. The item opens; `aria-expanded` flips to `true`; the panel becomes visible.
3. Press Enter or Space again. The item closes.
4. Open one item, Tab to another item, press Enter. The new item opens AND the previous one closes (single-open mode).

## Mobile / tablet / desktop sweep (manual)

For each Phase 04 page, in DevTools, walk through:

- 360 px (mobile small) — no horizontal overflow; hero stacks; pillar visuals stack above body.
- 414 px (mobile large) — same.
- 768 px (tablet portrait) — pillar layout 1-up or 2-up per page; form 2-column for short fields.
- 1024 px (laptop small) — pillar layout 2-up; form full layout.
- 1280 px (desktop) — pillar layout 2-up; optional scroll-spy visible on Technology.
- 1920 px (desktop large) — no excessive whitespace; container max-width holds.

## Done check

Phase 04 is done when, simultaneously:

- [ ] All four pages render correctly under both themes and at all six breakpoints.
- [ ] `npm run check` reports 28/28 PASS on all three gates.
- [ ] The keyboard-only walkthrough of `pages/become-a-partner.html` passes end-to-end.
- [ ] The FAQ accordion on `pages/partners.html` passes its keyboard test.
- [ ] The forbidden-string sweep returns zero matches.
- [ ] No console errors on any Phase 04 page.
- [ ] CSS file size (`assets/css/site.css`) is ≤ 72 KB.
- [ ] All Phase 04 image placeholders exist on disk (`find assets/images/technology assets/images/software assets/images/partners -name '*.svg' | wc -l` ≥ 25).
