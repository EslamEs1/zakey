# Phase 04 — Research & Design Decisions

**Feature**: 004-tech-software-partners
**Date**: 2026-05-14
**Status**: Complete (no unresolved `NEEDS CLARIFICATION` from spec)

This document records the binding decisions taken during Phase 0 planning. Each subsection follows the same shape: **Decision** / **Rationale** / **Alternatives considered**.

---

## R-01 — FAQ accordion: single-open vs. independent-open mode

**Decision**: Single-open mode is the default. Opening one FAQ item closes any other open item. The implementation MAY accept a `data-faq-mode="independent"` opt-out on the wrapper, but Phase 04 ships with single-open enabled.

**Rationale**:
- Most B2B prospects scan FAQs by reading one question, then deciding whether to read the next. Single-open mode keeps the page short, reduces scroll fatigue, and gives the visitor a clean "current focus" mental model.
- Single-open is also easier to implement accessibly (only one `aria-expanded="true"` at a time, predictable focus management).
- A `data-faq-mode` opt-out hook is included in case a future phase finds a content set where independent-open is genuinely better (e.g., long technical FAQs where users want to compare two answers side-by-side).

**Alternatives considered**:
- *Independent-open by default* — rejected because it makes the page longer-feeling and slightly worse for first-time scanners.
- *No accordion (all answers visible)* — rejected because the Partners FAQ ships 6+ items with 60–150-word answers; uncollapsed it would dominate the page below the use-case packages.

---

## R-02 — Technology page anchor navigation: scroll-spy vs. plain anchors

**Decision**: Plain anchor links by default. An optional, progressively-enhanced scroll-spy module (`js/scroll-spy.js`, ≤ 1.5 KB) MAY be added in the same phase to highlight the active section in a sticky-side or inline-pill nav. If skipped, the anchor nav still works — it just doesn't auto-highlight on scroll.

**Rationale**:
- A six-pillar long page benefits from a "you are here" cue on the desktop sidebar nav, but the cue is purely decorative — the core navigation works without it (each `<a href="#pillar">` jumps to the right section).
- Implementing scroll-spy via `IntersectionObserver` is small, idiomatic, and reuses the same pattern the reveal-on-scroll module already established in the homepage bug-fix pass.
- Marking it optional respects Principle VII: if the budget gets tight, scroll-spy is the first thing dropped.

**Alternatives considered**:
- *No anchor nav at all* — rejected because a single scroll-heavy page without internal jump links is unfriendly to architects who want to share a specific pillar.
- *JS-rendered TOC* — rejected by Principle II (content in HTML); the anchor links stay in static HTML.

---

## R-03 — Become a Partner form: client-side submission UX

**Decision**: On valid submit, the form (a) prevents default, (b) sets `data-form-state="submitting"` on the `<form>` for a brief disabled visual (300–600 ms artificial delay is acceptable to feel "real"), (c) swaps in a `hidden`-by-default success `<section data-form-success>` already present in the static HTML, (d) updates the page URL hash to `#application-received` so a successful submit is shareable/back-button-friendly, and (e) scrolls the success section into view. No network request is made.

**Rationale**:
- The constitution permits forms with no backend (Phase VI) as long as the UI behavior is complete. Treating "success" as a real, hash-addressed state mirrors real product UX and lets the back button take the visitor back to the editable form.
- The success markup lives in static HTML (`hidden` attribute is removed by JS), so a no-JS visitor sees nothing broken (the form simply submits to `#` via the default `<form action="#" method="get">` and the page reloads to the same content).
- A 300–600 ms artificial "submitting" state prevents the success view from snapping in instantaneously, which feels too fake.

**Alternatives considered**:
- *Real backend submission to a third-party (Formspree, Getform, Web3Forms)* — rejected by spec FR-043: "MUST NOT make any network request". Also adds tracking/privacy concerns we don't want on a marketing site.
- *`mailto:` submission* — rejected because it depends on the visitor's mail client being configured, which fails ~half the time on shared devices.
- *Redirect to a separate `become-a-partner-success.html` page* — rejected because it bloats the page count (we already have 28 after Phase 04) and breaks the back-button-to-edit flow.

---

## R-04 — Voice assistant integration copy: honesty boundary

**Decision**: All voice-assistant copy uses the phrase **"works with"** or **"compatible with"** when referring to Amazon Alexa, Google Assistant, and Apple Siri Shortcuts. The page MUST NOT use the phrases **"certified by"**, **"Works with Alexa™ certified"**, **"made for"**, or any other trademark/certification claim that requires partner enrollment to make legitimately. The page MAY use the partner's plain name as a visible label provided no trademark glyph or certification-tier wording accompanies it.

**Rationale**:
- The spec (FR-021d) explicitly bans unsubstantiated certification claims. Zakey is not (in this scaffolding context) enrolled in the Amazon, Google, or Apple smart-home partner programs.
- "Works with" is industry-standard descriptive language and is defensible; the certification programs object to misuse of trademark glyphs, not to descriptive compatibility claims.
- This also future-proofs us: when/if Zakey enrolls in the partner programs, the copy can be upgraded without a rewrite.

**Alternatives considered**:
- *Show only generic "voice control"* — rejected because the spec calls for at least three voice ecosystems named explicitly, and naming them is more useful to buyers than a hand-wave.
- *Add the partner logos* — rejected because reusing the Amazon/Google/Apple brand glyphs without enrollment is the exact thing the trademark policies forbid; we'll use a text label instead.

---

## R-05 — Multi-Protocol Compatibility wording: realistic protocol claims

**Decision**: The Multi-Protocol Compatibility section names exactly six protocols: **Wi-Fi**, **Zigbee 3.0**, **Bluetooth Low Energy**, **Matter-ready**, **Infrared (IR)**, and **wired control (e.g., dry-contact / RS-485 / 0–10 V dimming)**. "Matter-ready" is the only forward-looking phrase used; everything else is described in plain present tense. No section uses the words "certified", "official", or any specific certification tier name.

**Rationale**:
- "Matter-ready" is genuinely defensible for a product that uses Matter-bridge-capable hardware but hasn't yet completed Matter certification — buyers understand the convention.
- The spec (FR-012c) forbids unsupported certification claims. This decision is the explicit list of what each protocol section is allowed to say.
- Listing exactly six protocols (not "and more") avoids vague marketing inflation that erodes trust with system integrators.

**Alternatives considered**:
- *Include Thread* — rejected for now; Matter-ready already implies Thread-stack readiness on supporting hardware, and adding Thread as a separate bullet invites "is it certified?" questions Phase 04 can't honestly answer.
- *Include Z-Wave* — rejected unless the Zakey hardware roadmap actually targets Z-Wave; calling it out without product backing would mislead.

---

## R-06 — Technology ecosystem diagram: SVG complexity budget

**Decision**: The "ecosystem diagram" (the full-bleed visual the Technology page is required to include) is an inline SVG of ≤ 25 KB minified, ≤ 220 KB pre-minified. It depicts: a central Zakey hub node, four protocol-layer rings (Wi-Fi, Zigbee, BLE, Matter-ready), eight categorized device clusters (lighting, climate, security, sensors, blinds/curtains, voice, panels, app), and three out-going integrations (mobile app, business dashboard, voice assistants). All text is real SVG `<text>` (not paths), which keeps it editable and screen-readable.

**Rationale**:
- An inline SVG (vs. an `<img>` reference) lets the diagram inherit the page's theme variables — it changes color with the dark/light toggle without re-fetching.
- Real `<text>` (vs. converted-to-path) means the diagram is searchable, copyable, and screen-reader-accessible; it also keeps the file size down significantly.
- A 25 KB minified cap forces visual restraint — the diagram is informative, not decorative bloat.

**Alternatives considered**:
- *Raster diagram (PNG/WebP)* — rejected by the SVG-only convention from prior phases.
- *Diagram as a referenced external SVG* — rejected because it can't theme-shift with CSS variables across light/dark; inline can.
- *JS-rendered (e.g., D3) diagram* — rejected by Principle II; the diagram is content, not behavior.

---

## R-07 — Header/footer nav expansion: where do Technology, Software, Partners live?

**Decision**: The header primary nav grows from its current set (Home, Products, Solutions, Projects, Blog, About, Contact — verify count against the current shell) to add **Technology**, **Software**, **Partners** as top-level items. The final desktop order is:

```
Home → Products → Solutions → Technology → Software → Partners → Projects → Blog → About → Contact
```

The mobile drawer mirrors the same order. The footer's "Company" column (or equivalent) grows to add **Become a Partner** as a footer-only link (it does not appear in the primary nav — visitors arrive via the Partners-page CTA).

**Rationale**:
- The desktop layout has room for ten top-level items at typical container widths; Technology/Software/Partners are core to the B2B story and earn primary-nav slots.
- Become a Partner is a deep CTA target; putting it in the primary nav would clutter and confuse.
- Placing Technology/Software/Partners after Solutions follows the user funnel order (solutions inspire → technology validates → software demonstrates → partners converts).

**Alternatives considered**:
- *Group under a "Platform" dropdown* — rejected because Phase 04 deliberately avoids adding new JS-driven nav behavior; a single-level nav is simpler and more accessible.
- *Move Technology/Software under a "Resources" footer column only* — rejected because architects and integrators look for "Technology" in primary nav; burying it underweights the credibility funnel.

---

## R-08 — Integrity-gate file count bump: 24 → 28

**Decision**: Phase 04 ships an explicit one-line change in each of the three gate scripts (`scripts/check-shell-consistency.sh`, `scripts/check-content-rules.sh`, `scripts/check-links.sh`) that increments the hard-coded expected-file-count from 24 to 28. This change is part of the Phase 04 polish phase and lands in the same PR as the four new pages.

**Rationale**:
- The gates currently enforce both "every page in the canonical set passes" and "exactly N pages are checked"; bumping N to 28 lets us catch accidental page drops in the future.
- Keeping the file-count assertion is more useful than removing it — it would otherwise be possible to delete a page and the gates would still pass.

**Alternatives considered**:
- *Remove the file-count assertion entirely* — rejected because it weakens the gate's ability to detect regressions.
- *Dynamically discover the file count* — rejected because hardcoding the expected number is a deliberate trip-wire when scope changes; an implicit count change should require an explicit ack.

---

## R-09 — Form field validation: when do errors appear?

**Decision**: The application form uses **submit-time validation as the primary gate**, plus **on-blur validation as a secondary cue**. A field is not marked `aria-invalid="true"` on first focus; it is marked invalid when (a) the visitor blurs out of a touched required field that's empty, (b) the visitor blurs out of a format-validated field with invalid content, or (c) the visitor presses Submit and any field fails. The submit-time pass also focuses the first failing field and announces the count of errors via `aria-live="polite"`.

**Rationale**:
- Showing red borders on every field on page load is hostile.
- On-blur after the field has been touched gives the visitor a clear "I just made an error" cue without nagging.
- Submit-time validation guarantees no invalid submission slips through and provides a screen-reader-friendly summary for assistive technology.

**Alternatives considered**:
- *Live (per-keystroke) validation* — rejected because email/phone/URL formats trigger false-positive errors while the visitor is mid-typing.
- *Submit-only validation (no on-blur)* — rejected because visitors miss errors until they hit Submit, which feels late.

---

## R-10 — Image placeholder strategy for Phase 04

**Decision**: Reuse the Phase 01–03 placeholder convention: lowercase, hyphenated, namespaced SVG filenames under `assets/images/<area>/`. New placeholders for Phase 04:

- `assets/images/technology/zakey-intelligence-hero.svg` — Technology page hero
- `assets/images/technology/zakey-link-architecture.svg` — Pillar 1
- `assets/images/technology/scene-intelligence.svg` — Pillar 2
- `assets/images/technology/multi-protocol.svg` — Pillar 3
- `assets/images/technology/secure-smart-living.svg` — Pillar 4
- `assets/images/technology/energy-intelligence.svg` — Pillar 5
- `assets/images/technology/scalable-deployment.svg` — Pillar 6
- `assets/images/technology/zakey-ecosystem-diagram.svg` — full-bleed diagram (inline in HTML, not file-referenced — but a file-referenced fallback at this path is acceptable)
- `assets/images/software/zakey-platform-hero.svg` — Software hero
- `assets/images/software/zakey-app-mockup.svg` — Mobile app
- `assets/images/software/zakey-control-panels.svg` — Control panels
- `assets/images/software/zakey-scenes.svg` — Scenes & automation
- `assets/images/software/zakey-voice.svg` — Voice integration
- `assets/images/software/zakey-dashboard.svg` — Business dashboard
- `assets/images/software/zakey-insights.svg` — Energy & device insights
- `assets/images/software/zakey-guest-experience.svg` — Guest/hotel
- `assets/images/partners/zakey-partners.svg` — Partners hero
- `assets/images/partners/distributor.svg` — Partner-type icon
- `assets/images/partners/system-integrator.svg` — Partner-type icon
- `assets/images/partners/developer.svg` — Partner-type icon
- `assets/images/partners/installer.svg` — Partner-type icon
- `assets/images/partners/interior-designer.svg` — Partner-type icon
- `assets/images/partners/hotel-operator.svg` — Partner-type icon
- `assets/images/partners/package-smart-villa.svg` — Use-case package
- `assets/images/partners/package-smart-apartment.svg` — Use-case package
- `assets/images/partners/package-hotel-room.svg` — Use-case package
- `assets/images/partners/package-office-automation.svg` — Use-case package

Each placeholder is a Phase 03-style premium-dark SVG with brand-color accents and meaningful content (not a flat colored rectangle). Each has descriptive `alt` text on its `<img>` consumer.

**Rationale**:
- Naming consistency across phases makes placeholder-to-final-render swaps mechanical.
- Pre-listing every path makes the implementation phase a flat checklist; nothing needs invention during the build.

**Alternatives considered**:
- *Use Unsplash / picsum as inline references* — rejected by Principle I (no CDN) and by the offline-openable requirement.
- *Use a single shared placeholder* — rejected because Gate 2 and the visual quality bar both demand per-section variety.

---

## Open questions deferred to Phase 2

None. All ten research questions are resolved. Phase 1 design proceeds from this baseline.
