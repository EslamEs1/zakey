# Contract: Software Page (`pages/software.html`)

## Purpose

Position Zakey as a unified software platform across mobile, panels, dashboards, voice, and guest experience. Must convince a hotel ops director or developer that the day-to-day software experience is credible and ready.

## DOM contract

- `<body data-page="software">` is required.
- Required DOM order inside `<main id="content">`:

  1. `<section class="sw-hero">` with:
     - `<h1>` containing exactly **"Control Every Space from One Intelligent Experience"**.
     - Subtitle (12–25 words) positioning Zakey as one platform across all surfaces.
     - Primary CTA `<a class="btn btn--primary">` labelled "Request a Demo" — links to `pages/contact.html` (the existing Get a Quote form).
     - Secondary CTA `<a class="btn btn--ghost">` linked to `pages/become-a-partner.html`.
     - A hero visual (composite mockup) at `assets/images/software/zakey-platform-hero.svg`.
  2. **Seven pillar sections** matching `data-model.md` § 2 in this order: mobile-app, control-panels, scenes, voice, dashboard, insights, guest-experience. Each follows [pillar-card.contract.md](./pillar-card.contract.md), with the variation:
     - `data-audience="<resident|operator|guest|staff|admin>"` is set on each pillar `<section>` for future theming (initially decorative).
     - The Voice Assistant pillar's body copy MUST follow [research.md R-04](../research.md): "works with" / "compatible with" only.
  3. `<section class="sw-final-cta">` with both "Request a Demo" → `pages/contact.html` and "Become a Partner" → `pages/become-a-partner.html`.

## State contract

- No JS-managed state on the page (no scroll-spy required on Software; the seven-pillar list is short enough).

## Style contract

- Same token system as Technology page.
- Pillar cards alternate visual orientation: even-indexed pillars place the mockup on the left, odd-indexed on the right (achieved via `nth-child` selector on the pillar-grid container or `data-flip` attribute).

## Behavior contract

- All CTAs resolve. Gate 3 enforced.
- Both themes verified.

## Failure modes

- **No JS**: all content visible; mockups render as static images. No interactive feature is JS-dependent on this page.
