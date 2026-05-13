# Quickstart — Zakey Phase 01

**Audience**: anyone implementing or reviewing Phase 01.

**Goal**: stand the project up locally, run the Tailwind build, open
the homepage, and run the three integrity gates — in under 5 minutes.

---

## Prerequisites

| Tool | Version | Used for |
|---|---|---|
| Node.js | ≥ 20 LTS | Tailwind CLI + npm scripts |
| npm | ≥ 10 | Dependency install |
| Bash | any modern | Integrity gates |
| Modern browser | Chrome/Firefox/Safari latest | Visual verification |

No other runtime is required. The site itself runs in a browser
with zero JS dependencies at load — Tailwind is build-time only.

---

## 1. Install dev dependencies

```bash
cd /media/mekky/work/backend/zakey
npm install
```

This installs `tailwindcss`, `@tailwindcss/forms`, `@tailwindcss/typography`,
`postcss`, and `autoprefixer` — all `devDependencies`.

---

## 2. Build the CSS once

```bash
npm run build:css
```

Equivalent to:

```bash
npx tailwindcss \
  -i ./src/input.css \
  -o ./css/styles.css \
  --minify
```

Output: `css/styles.css` (committed). Open `index.html` in a browser
and Phase 01 styles are live.

---

## 3. Watch CSS during development

```bash
npm run watch:css
```

Runs Tailwind CLI in watch mode. Edit `src/input.css`, any `.html`
file, or `tailwind.config.js` and the rebuild is sub-second.

---

## 4. Open the homepage

```bash
xdg-open index.html        # Linux
open index.html            # macOS
start index.html           # Windows
```

Or serve via any static server (optional, not required):

```bash
npx serve .
```

---

## 5. Run the integrity gates

The three Phase 01 gates live under `scripts/`:

```bash
./scripts/check-shell-consistency.sh
./scripts/check-content-rules.sh
./scripts/check-links.sh
```

Or all three at once:

```bash
npm run check
```

Each script exits 0 on pass, non-zero on fail, with a clear summary.

### Gate 1 — Shell consistency

```bash
./scripts/check-shell-consistency.sh
```

Hashes the markup between `<!-- header:start -->` / `<!-- header:end -->`
and between `<!-- footer:start -->` / `<!-- footer:end -->` in every
`.html` file, normalising path prefixes (`./` vs `../`). Fails if any
page diverges from the homepage's shell.

### Gate 2 — Content rules

```bash
./scripts/check-content-rules.sh
```

Validates that every shipped `.html`:

- contains no occurrence of `lorem ipsum` (case-insensitive)
- contains no occurrence of `lifesmart` or `ilifesmart` (case-insensitive)
- has exactly one `<h1>`
- has a non-empty `<title>`
- has a `<meta name="description" content="…">` with non-empty content
- has no `alert(`, `confirm(`, or `prompt(` calls in inline JS

### Gate 3 — Link integrity

```bash
./scripts/check-links.sh
```

For every `href=` and `src=` in every `.html`:

- If it starts with `http://` or `https://`, skip.
- If it starts with `#`, ensure the corresponding `id` exists somewhere
  on the page.
- Otherwise, resolve relative to the file and ensure the target file
  exists.

Fails on the first missing target.

---

## 6. Verify visually

Open `index.html` and check, at minimum:

- **Desktop (≥ 1280 px)**: hero, slider, all 11 sections render with
  meaningful visuals. Header is transparent over hero; on scroll, it
  goes glass. Hovering "Products" or "Solutions" opens a mega-menu.
- **Tablet (768 px)**: grids reflow; no horizontal scroll; mega-menus
  remain accessible (header still shows nav on tablet — only ≤640px
  collapses to hamburger).
- **Mobile (375 px)**: header shows logo + hamburger only; tapping
  the hamburger opens the drawer; Products / Solutions accordions
  inside the drawer expand cleanly.
- **Slider**: prev/next/dots work, auto-advance cycles, hover pauses.
- **Quote form**: empty submit reveals all errors; valid submit shows
  Submitting → Success.
- **Newsletter form**: invalid email shows inline error; valid email
  shows the success status briefly then auto-resets.
- **Keyboard**: Tab through every interactive element. Every focus
  ring is visible.
- **Reduced motion**: in DevTools, simulate `prefers-reduced-motion:
  reduce` — slider auto-advance stops; scroll animations disabled.

---

## 7. Common operations

| Need | Command |
|---|---|
| Add a new colour token | Edit `:root` block in `src/input.css` AND `theme.extend.colors` in `tailwind.config.js`. |
| Swap a placeholder image | Replace the file at `assets/images/<cat>/zakey-<slug>.<ext>` — no markup change needed. |
| Add a new page | Copy `pages/about.html` as a starting shell, change `<title>` + `<meta>` + the H1; the header/footer block is identical to the rest. |
| Tweak slider timing | `js/homepage.js` → `AUTO_ADVANCE_MS` constant. |
| Force form error path | Append `?force=error` to URL and submit. |

---

## 8. Definition of done for Phase 01

Before declaring Phase 01 complete:

- [ ] `npm run build:css` exits 0; `css/styles.css` is committed.
- [ ] `npm run check` exits 0 (all three gates green).
- [ ] Eleven homepage sections render with no empty cards, no
      missing images, and no console errors.
- [ ] All ten header nav links + the CTA + footer columns resolve to
      real files in this repo.
- [ ] Mobile drawer opens, closes, traps focus, restores body scroll.
- [ ] Mega-menus open on hover and keyboard focus on desktop.
- [ ] Quote form transitions idle → submitting → success without
      backend.
- [ ] Newsletter form transitions idle → submitting → success.
- [ ] Visual pass complete at 360 / 480 / 768 / 1024 / 1280 / 1440 px.
- [ ] `prefers-reduced-motion: reduce` honoured.
- [ ] Constitution v1.0.0 — all seven principles still verified.
