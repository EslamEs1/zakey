# Contract: Technology Page (`pages/technology.html`)

## Purpose

Establish Zakey's technical credibility for B2B audiences (architects, system integrators, developer CTOs) by presenting six named pillars plus a full-bleed ecosystem diagram. Must read as authoritative within 2 minutes of scanning.

## DOM contract

- `<body data-page="technology">` is required.
- The page MUST contain, in this DOM order:

  1. The site `<header>` (byte-identical to other pages — see `nav-expansion.contract.md`).
  2. `<main id="content">` containing:
     - `<section class="tech-hero">` with:
       - `<h1>` containing the exact text **"The Intelligence Behind Zakey Smart Living"**.
       - A subtitle paragraph (12–25 words).
       - A primary CTA `<a class="btn btn--primary">` and a secondary CTA `<a class="btn btn--ghost">`.
       - A hero visual: `<img src="../assets/images/technology/zakey-intelligence-hero.svg" alt="...">` or an inline `<svg aria-label="...">`.
     - `<section class="tech-intro">` with 2–4 paragraphs explaining Zakey's combined hardware + automation + connectivity + project story.
     - Optional anchor nav: `<nav class="pillar-nav" aria-label="Technology pillars">` with one `<a href="#<pillar-id>">` per pillar — see [research.md R-02](../research.md).
     - **Six pillar sections**, each `<section class="pillar" id="<pillar-id>" data-pillar="<pillar-id>">`, in the order defined in `data-model.md` § 1. Each pillar section MUST contain the structure defined in [pillar-card.contract.md](./pillar-card.contract.md).
     - `<section class="ecosystem-diagram">` containing the full-bleed ecosystem diagram (inline SVG, ≤ 25 KB minified — see R-06). MUST have `<h2>` and a 20–50-word caption paragraph.
     - `<section class="tech-final-cta">` with at least one `<a>` to `pages/partners.html` and one to `pages/contact.html`.
  3. The site `<footer>` (byte-identical to other pages).

- The single `<h1>` requirement (Gate 2) is satisfied by the hero's `<h1>`. Each pillar uses `<h2>`. Sub-features inside a pillar use `<h3>`.

## State contract

- No JS-managed state on the page itself.
- If the optional scroll-spy module is enabled, it MAY toggle `aria-current="true"` on the pillar-nav anchor matching the most-visible pillar. The scroll-spy MUST NOT alter the URL hash on scroll.

## Style contract

- Uses existing tokens (`--color-bg-deep`, `--color-bg-elevated`, `--color-text-primary`, `--color-text-muted`, `--color-accent-cyan`, etc.).
- Pillar visuals sit inside `.diagram-frame` (a new component family — premium dark or soft-light card with subtle inner border and corner glow).
- The pillar grid is two columns on desktop (`md:grid-cols-2`), single column on mobile.
- The ecosystem diagram section is full-bleed (escapes the container) with a max-height of 720px on desktop.

## Behavior contract

- Anchor links jump to pillars; the browser handles smooth scroll if the user's preferences allow it (and if `scroll-behavior: smooth` is on the root, which is a Phase 01 concern).
- All CTAs are real `<a href="...">` links resolving to existing files (Gate 3).
- Theme toggle continues to work as on every other page; the page MUST render correctly under both themes.
- Under `prefers-reduced-motion: reduce`, the optional scroll-spy still works (it only updates an attribute; no animation).

## Failure modes

- **No JS**: scroll-spy is inert; anchor links still navigate. All content visible.
- **Image fetch fails**: alt text is meaningful enough to convey the pillar content.
- **Inline ecosystem SVG fails to parse**: section still has its `<h2>` and caption — the page is degraded but readable.
