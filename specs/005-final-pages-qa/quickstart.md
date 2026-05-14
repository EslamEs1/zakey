# Quickstart: Phase 05 — Local Development & Verification

**Feature**: `005-final-pages-qa`
**Audience**: Contributors implementing Phase 05 tasks; QA reviewers.

This quickstart assumes the Phase 01–04 toolchain is in place. If anything below is unfamiliar, refer to `specs/001-shell-and-homepage/quickstart.md` for the original setup walkthrough.

## Prerequisites

- Node.js ≥ 18 (for the local Tailwind build).
- A POSIX shell (bash or zsh).
- A modern browser with DevTools (Chrome, Firefox, Safari, or Edge).
- Branch `005-final-pages-qa` checked out.

## One-time setup

```bash
npm install              # installs Tailwind CLI + PostCSS (no runtime deps)
```

This is identical to Phases 01–04 — no new dependencies in Phase 05.

## Local development loop

### Build CSS

```bash
npm run build:css        # rebuilds css/styles.css from src/input.css (PostCSS + Tailwind)
```

Output: `css/styles.css` (minified). Target: ≤ 95 KB minified at the end of Phase 05 (Phase 04 baseline is 92.5 KB; Phase 05 component additions must be paired with the Phase 7 dedup pass — task T520).

### Watch mode (optional, if implemented in package.json)

```bash
npm run build:css -- --watch     # rebuilds on src/input.css change
```

### Open a page locally

Static files can be opened directly via `file://` in any browser, e.g.:

```text
file:///<path-to-repo>/pages/projects.html
```

For path-prefix correctness (when paths use `../`), prefer a tiny local HTTP server:

```bash
python3 -m http.server 8000      # serve repo root at http://localhost:8000
# then visit http://localhost:8000/index.html or http://localhost:8000/pages/projects.html
```

## Running the integrity gates

```bash
npm run check
```

Equivalent to:

```bash
bash scripts/check-shell-consistency.sh \
  && bash scripts/check-content-rules.sh \
  && bash scripts/check-links.sh
```

All three gates MUST report PASS on the final page count (~37–38 files after Phase 05) before merging. Each script uses dynamic `find` over `*.html` — no hard-coded counts to bump in Phase 05.

### Interpreting failures

- **Shell consistency FAIL**: header or footer block (between `<!-- header:start -->` / `<!-- header:end -->` / `<!-- footer:start -->` / `<!-- footer:end -->` markers) is not byte-identical (after path normalization) to the reference (`index.html`). Diff the offending file's block against `pages/about.html` (a known-passing file in pages/) to find the whitespace or path delta.
- **Content rules FAIL**: a Phase 05 page is missing a required artifact (e.g., no `<h1>`, no `<title>`, no meta description, multiple `<h1>` elements). The script prints the offending file + the failing rule.
- **Link integrity FAIL**: an `href` or `src` points to a non-existent file. Fix the link or create the file.

## Phase 5 page-by-page verification flow

After implementing each user story, run the matching verification flow:

### After US1 (Projects)

```bash
npm run check
grep -E '<h1>' pages/projects.html pages/project-luxury-villa.html pages/project-smart-hotel.html pages/project-smart-office.html | wc -l   # expect 4
grep -rEi 'lorem ipsum|lifesmart|ilifesmart|fusion link|ai builder|coss' pages/projects.html pages/project-*.html   # expect zero matches
```

In the browser:
- Open `pages/projects.html`. Click each filter chip — confirm grid filters within one frame, active chip carries `aria-pressed="true"`.
- Open each `pages/project-*.html`. Confirm all 9 detail-page sections render under both themes.
- Confirm the final CTA on each detail page resolves to a real file.

### After US2 (Contact)

```bash
npm run check
grep -E '<h1>' pages/contact.html | wc -l   # expect 1
grep -E 'name="(role|fullName|company|email|phone|country|city|projectType|projectSize|interestedSolutions|budgetRange|timeline|message|consent)"' pages/contact.html | wc -l   # expect 14
```

In the browser:
- Open `pages/contact.html`. Confirm hero, four contact channel cards, quote form, map visual, FAQ accordion, floating WhatsApp button.
- Submit the form empty — confirm error summary appears with count and first-invalid is focused.
- Fill all required fields validly — confirm `submitting → success` transition, URL hash becomes `quote-received`, focus moves to success H2.
- Click Edit & Resubmit — confirm the form returns and the hash clears.
- Open FAQ items — confirm single-open mode.
- Tab through every interactive element — confirm focus rings on each.

### After US3 (About)

```bash
npm run check
grep -E '<h1>' pages/about.html | wc -l   # expect 1
```

In the browser:
- Open `pages/about.html`. Confirm hero, story, mission/vision cards, values cards, why-zakey, global/local, team/expertise, final CTA all render.
- Toggle theme — confirm both themes look polished.

### After US4 (Blog)

```bash
npm run check
grep -E '<article class="blog-card"' pages/blog.html | wc -l   # expect 9+
grep -E '<h1>' pages/article-smart-home-guide.html pages/article-villa-automation.html pages/article-hotel-smart-room.html | wc -l   # expect 3
```

In the browser:
- Open `pages/blog.html`. Click each category chip — confirm grid filters.
- Click each "Coming Soon" card — confirm the CTA is non-interactive (no navigation).
- Click an implemented card's "Read Article" — confirm article detail loads.
- On an article detail page with ≥ 4 H2 sections, click each TOC anchor — confirm page jumps to the matching H2.
- Confirm the Related Articles section renders 2–3 cards.

### After US5 (Legal + optional 404)

```bash
npm run check
grep -rE 'lorem ipsum' pages/privacy.html pages/terms.html   # expect zero matches
```

In the browser:
- Open `pages/privacy.html` and `pages/terms.html`. Confirm 6+ sections each with the TOC at the top, and the bottom CTA.
- If `pages/404.html` is implemented, confirm it renders the global shell with 3+ navigation CTAs.

### After US6 (Final QA pass)

This is the longest verification flow. See `research.md` R-13 for the full 10-item checklist.

Highlights:

```bash
# Item 1: gates
npm run check

# Item 2: forbidden-string sweep
grep -rEi 'lorem ipsum|lifesmart|ilifesmart|fusion link|ai builder|coss' index.html pages/

# Item 3: alt-text sweep
grep -rE '<img[^>]*alt=""' index.html pages/

# Item 10: CSS budget delta
wc -c css/styles.css
```

Items 4–9 are manual browser walks — track them as completed in the tasks.md checklist.

## Common pitfalls (carried forward from Phases 02/03/04)

1. **Path prefixes**: pages in `pages/` reference `../css/styles.css` and `../assets/...`; `index.html` references `./css/styles.css` and `./assets/...`. The shell-consistency check normalizes these so they should not bite, but watch new links carefully.
2. **`data-page` slug**: every new page MUST set `<body data-page="...">` with the page slug. Forgetting this breaks JS module loading (no filter behavior, no form behavior).
3. **Theme anti-flash script**: the small inline `<script>` at the top of `<head>` (from Phase 01) MUST be copied verbatim onto every new page. Without it, the page renders with a flash of the wrong theme.
4. **Footer "Become a Partner" link**: every new page's footer block MUST include the Phase 04 "Become a Partner" link added in T051. Use `pages/about.html` as the template — it has the correct footer.
5. **Image alt text**: every `<img>` MUST have descriptive alt text. Decorative images use `alt=""` AND `aria-hidden="true"`. Never `alt="image"`.
6. **No JS-injected content**: the constitution Principle II forbids JS injection of essential content. The blog "Coming Soon" badge, the form fields, the article TOC — all must ship in the HTML.

## Reduced-motion testing

In Chrome DevTools → ⋮ → More tools → Rendering → "Emulate CSS media feature `prefers-reduced-motion`" → set to "reduce".

Verify on every Phase 05 page:
- Filter clicks snap to result (no fade animation).
- FAQ open/close is instant.
- Form submitting state is 100 ms (not 400 ms).
- Hero parallax (if any) is disabled.
- Floating WhatsApp hover is static (no transform).

## Theme persistence testing

1. Open `pages/projects.html`.
2. Toggle the theme (via the header theme button).
3. Click any internal link.
4. Confirm the new page loads with the same theme — no flash, no reset.
5. Hard-refresh the page. Confirm the theme persists across reload.
6. Open DevTools → Application → Local Storage → confirm `zakey-theme` is set.

## Final acceptance checklist

Phase 05 is done when all of the following are true:

- [ ] `npm run check` reports PASS at the final page count.
- [ ] All 13 (or 12 without optional 404) new pages exist.
- [ ] All 6 user stories' verification flows above complete cleanly.
- [ ] CSS bundle ≤ 95 KB minified (or known-issue documented in MEMORY.md).
- [ ] Forbidden-string grep returns zero matches.
- [ ] Empty-alt sweep returns zero matches on non-decorative images.
- [ ] Console error sweep clean.
- [ ] Theme persists across all new pages.
- [ ] Keyboard-only walkthrough complete on every new page.
- [ ] Reduced-motion walkthrough complete on every new page.
- [ ] Multi-viewport sweep complete (360 / 414 / 768 / 1024 / 1280 / 1920 px).
- [ ] MEMORY.md updated to reflect Phase 05 completion.
