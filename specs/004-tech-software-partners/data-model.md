# Phase 04 — Content Data Model

**Feature**: 004-tech-software-partners
**Date**: 2026-05-14

This document defines the **content shape** every Phase 04 entity must satisfy. It is not a database schema — there is no database — but it is the binding source of truth that the four new HTML pages must encode in static markup, and that the implementation phase will copy into HTML.

Each entity below specifies: fields, validation rules (minimum word counts, required visuals), relationships to other entities and to prior phases, and any state transitions where applicable.

---

## 1. TechnologyPillar

Represents one of the six named subsystems on `pages/technology.html`.

**Fields**:
- `id` (string, slug) — the in-page anchor; one of: `link-architecture`, `scene-intelligence`, `multi-protocol`, `secure-smart-living`, `energy-intelligence`, `scalable-deployment`. Required, unique.
- `displayName` (string) — the H2 heading. Required.
- `positioningSentence` (string, 12–25 words) — the one-line positioning under the heading. Required.
- `body` (string, 75–200 words) — body copy, 1–3 short paragraphs. Required.
- `capabilityBullets` (string[], 4–6 items, each 6–18 words) — the concrete capability list. Required.
- `visual` (object) — required.
  - `path` (string) — `assets/images/technology/<slug>.svg`. Required, must exist.
  - `alt` (string, 8–20 words) — meaningful alt text describing the diagram. Required.
- `subFeatures` (object[], optional, max 4) — optional named sub-features inside the pillar (e.g., "Room Templates" under Scalable Deployment).
  - `name` (string)
  - `oneLineDescription` (string, 8–18 words)

**The six instances** (exact display names — these are binding):

| id | displayName | positioningSentence (example tone) |
|---|---|---|
| `link-architecture` | Zakey Link Architecture | A hybrid wired-and-wireless smart-home fabric built for villas, apartments, hotels, offices, and compounds. |
| `scene-intelligence` | Zakey Scene Intelligence | Automation rules and AI-assisted scenes that turn intent into the right state across every room. |
| `multi-protocol` | Multi-Protocol Compatibility | Speaks Wi-Fi, Zigbee 3.0, Bluetooth LE, Matter-ready, IR, and wired control — natively. |
| `secure-smart-living` | Secure Smart Living | Encryption-ready messaging, privacy-first design, and role-based control for every project. |
| `energy-intelligence` | Energy Intelligence | Lighting, climate, plugs, and meters working together to deliver visible energy savings. |
| `scalable-deployment` | Scalable Project Deployment | Room templates, repeatable scenes, and central monitoring built for projects, not just homes. |

**Relationships**:
- Each pillar's CTA links either to `pages/partners.html` (for B2B audiences) or to a relevant Solutions detail page (for residential audiences). Mapping is at the implementer's discretion, but every pillar MUST have one outgoing CTA.

**Validation**:
- `displayName` MUST NOT contain any forbidden brand string (Gate 2).
- `positioningSentence` MUST NOT include certification language (e.g., "certified", "official compatible") for the multi-protocol pillar — see [research.md R-04, R-05](./research.md).
- `visual.alt` MUST NOT be empty and MUST NOT equal "image" or "diagram" alone — must describe what's depicted.

---

## 2. SoftwarePillar

Represents one of the seven named experiences on `pages/software.html`.

**Fields**:
- `id` (string, slug) — anchor. One of: `mobile-app`, `control-panels`, `scenes`, `voice`, `dashboard`, `insights`, `guest-experience`. Required, unique.
- `displayName` (string) — H2. Required.
- `positioningSentence` (string, 12–25 words) — Required.
- `body` (string, 75–150 words). Required.
- `capabilityBullets` (string[], 3–5 items). Required.
- `mockup` (object) — required.
  - `path` (string) — `assets/images/software/<slug-or-equivalent>.svg`. Required.
  - `alt` (string, 8–20 words). Required.
- `audienceTag` (enum) — one of: `resident`, `operator`, `guest`, `staff`, `admin`. Required (informs body copy tone).

**The seven instances** (binding display names):

| id | displayName | audienceTag |
|---|---|---|
| `mobile-app` | Zakey Mobile App | resident |
| `control-panels` | Zakey Control Panels | resident |
| `scenes` | Smart Scenes & Automation | resident |
| `voice` | Voice Assistant Integration | resident |
| `dashboard` | Business / Project Dashboard | operator |
| `insights` | Energy & Device Insights | operator |
| `guest-experience` | Guest / Hotel Room Experience | guest |

**Validation**:
- `voice` pillar copy MUST follow R-04 wording rules: "works with" / "compatible with", no certification claims, no third-party brand glyphs.

---

## 3. PartnerType

Represents one row in the "Who We Work With" section on `pages/partners.html`.

**Fields**:
- `id` (string, slug) — one of: `distributor`, `system-integrator`, `developer`, `installer`, `interior-designer`, `hotel-operator`. Required.
- `displayName` (string) — Required.
- `icon` (object) — Required.
  - `path` (string) — `assets/images/partners/<id>.svg`.
  - `alt` (string, 5–12 words).
- `oneSentenceDescription` (string, 12–25 words) — Required.
- `inlineCtaLabel` (string, 2–5 words) — e.g., "Apply as a Distributor". Required.
- `inlineCtaHref` (string) — always points to `pages/become-a-partner.html` (and MAY append a `?type=<id>` query string for prefill in a future phase). Required.

**The six instances** (binding; partner spec FR-031 requires at least five — we ship six):

| id | displayName |
|---|---|
| `distributor` | Distributor |
| `system-integrator` | System Integrator |
| `developer` | Real Estate Developer |
| `installer` | Installer |
| `interior-designer` | Interior Design Office |
| `hotel-operator` | Hotel & Hospitality Operator |

---

## 4. PartnerBenefit

Represents one card in the Partners benefits grid.

**Fields**:
- `id` (string, slug) — Required.
- `displayName` (string) — Required.
- `icon` (string) — inline SVG snippet or icon-path reference. Required.
- `oneSentenceDescription` (string, 10–20 words) — Required.

**The seven instances** (binding):

| id | displayName |
|---|---|
| `premium-portfolio` | Premium Product Portfolio |
| `project-ecosystem` | Project-Ready Smart Ecosystem |
| `marketing-support` | Sales & Marketing Support |
| `technical-docs` | Technical Documentation |
| `training-onboarding` | Training & Onboarding |
| `demo-showroom` | Demo & Showroom Support |
| `scalable-projects` | Scalable Solutions for Large Projects |

---

## 5. PartnerJourneyStep

Represents one numbered step in the Partner Journey timeline.

**Fields**:
- `stepNumber` (integer, 1–6) — Required, sequential.
- `displayName` (string) — Required.
- `oneLineDescription` (string, 10–20 words) — Required.
- `durationHint` (string, optional) — e.g., "Within 5 business days" — optional but encouraged.

**The six instances** (binding, exact order):

| stepNumber | displayName |
|---|---|
| 1 | Apply |
| 2 | Consultation |
| 3 | Product Training |
| 4 | Demo Setup |
| 5 | First Project |
| 6 | Ongoing Support |

---

## 6. PartnerUseCasePackage

Represents one pre-bundled solution offered to partners.

**Fields**:
- `id` (string, slug) — one of: `smart-villa`, `smart-apartment`, `hotel-room`, `office-automation`. Required.
- `displayName` (string) — Required.
- `visual` (object) — Required.
  - `path` (string) — `assets/images/partners/package-<id>.svg`.
  - `alt` (string, 8–18 words).
- `oneLineSummary` (string, 12–20 words) — Required.
- `linkedSolutionPage` (string) — full relative path to the corresponding Solutions detail page (from Phase 03). Required.

**The four instances** (binding):

| id | displayName | linkedSolutionPage |
|---|---|---|
| `smart-villa` | Smart Villa Package | `pages/solution-smart-villa.html` |
| `smart-apartment` | Smart Apartment Package | `pages/solution-smart-apartment.html` |
| `hotel-room` | Hotel Room Package | `pages/solution-smart-hotel.html` |
| `office-automation` | Office Automation Package | `pages/solution-smart-office.html` |

---

## 7. FaqItem

Represents one question/answer pair in the Partners FAQ accordion.

**Fields**:
- `id` (string, slug) — Required, unique per page.
- `question` (string, 6–18 words) — Required.
- `answer` (string, 30–150 words; may include `<a>`, `<strong>`, `<em>`, `<ul>`, `<li>` only) — Required.
- `openByDefault` (boolean) — default `false`. The first item MAY be `true`.
- `categoryTag` (string, optional) — e.g., `commercial`, `support`, `pricing`.

**The six required instances** (minimum, binding topics — exact wording is the implementer's, only the topics are mandated):

| id | topic |
|---|---|
| `territory-exclusivity` | Territory exclusivity policy |
| `min-order` | Minimum order or project requirements |
| `training-availability` | Training availability and format |
| `lead-time-stock` | Lead time and stock availability |
| `marketing-coop` | Marketing co-op and brand support |
| `project-pricing` | Project pricing and discount structure |

**State** (per item, runtime only):
- `closed` (initial; `aria-expanded="false"`, content visually hidden but in DOM)
- `open` (`aria-expanded="true"`, content visually visible)

**Transitions**:
- `closed → open` on Enter/Space/click on the question's trigger button.
- `open → closed` on Enter/Space/click on the same trigger.
- In single-open mode (default per [research.md R-01](./research.md)), opening one item transitions every other open item to `closed`.

---

## 8. PartnerApplicationSubmission

Represents the transient client-side state of the Become a Partner form. **No persistence.**

**Form fields** (13, binding order):

| order | name | type | required | validation |
|---|---|---|---|---|
| 1 | `partnerType` | select | yes | one of the six PartnerType IDs |
| 2 | `fullName` | text | yes | 2–80 characters |
| 3 | `company` | text | yes | 2–120 characters |
| 4 | `country` | text or select | yes | non-empty |
| 5 | `city` | text | yes | non-empty |
| 6 | `email` | email | yes | RFC 5322 simplified pattern (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`) |
| 7 | `phone` | tel | yes | min 7 digits after stripping `+`, spaces, hyphens, parentheses |
| 8 | `website` | url | no | if present, must start with `http://` or `https://` and contain a domain |
| 9 | `businessType` | select or radio | yes | enum (e.g., Retail Store, Smart Home Reseller, AV/CI Integrator, Construction & Real Estate, Hospitality Group, Other) |
| 10 | `projectVolume` | select | yes | one of: `1-5`, `6-25`, `26-100`, `100+`, `recurring` |
| 11 | `interestedSolutions` | multi-select / checkbox group | yes | at least one selected from the eight existing Solutions slugs |
| 12 | `message` | textarea | no | 0–2000 characters; soft counter shown to user |
| 13 | `consent` | checkbox | yes | must be checked |

**Per-field validation state** (runtime):
- `untouched` (initial — no visual error)
- `valid` (touched and currently passes)
- `invalid` (touched + currently fails; `aria-invalid="true"`, error message in adjacent `[role="alert"]`)

**Form-level state machine**:

```
                  ┌────────────┐
                  │   idle     │  (initial; data-form-state="idle")
                  └─────┬──────┘
                        │ submit
                        ▼
                  ┌────────────┐
                  │ validating │  (synchronous; runs all field validators)
                  └─────┬──────┘
              ┌─────────┴────────┐
       all valid?            any invalid?
              │                  │
              ▼                  ▼
        ┌─────────┐         ┌────────────┐
        │submitting│         │ has-errors │  (focus first invalid; aria-live announce)
        │(300–600ms)│        └─────┬──────┘
        └────┬─────┘               │ user fixes + re-submits
             │                     └──→ back to "validating"
             ▼
        ┌─────────┐
        │ success │  (data-form-state="success"; URL hash = #application-received;
        │         │   success <section> revealed; form hidden but still in DOM)
        └─────────┘
```

**Edge transitions**:
- From `success`, clicking "Edit & resubmit" link returns the form to `idle` with all previous values intact.
- Browser back navigation from `success` (with the `#application-received` hash) returns to `idle`.

---

## 9. Site Navigation Set (cross-page, single source of truth)

Although the navigation set is a Phase 01 concern, Phase 04 expands it. The post-Phase-04 binding navigation set is:

**Primary nav (header + mobile drawer)**, in order:

1. Home → `index.html` (or `./` on home, `../index.html` on pages)
2. Products → `pages/products.html`
3. Solutions → `pages/solutions.html`
4. **Technology** → `pages/technology.html` *(Phase 04 — new in primary nav)*
5. **Software** → `pages/software.html` *(Phase 04 — new in primary nav)*
6. **Partners** → `pages/partners.html` *(Phase 04 — new in primary nav)*
7. Projects → `pages/projects.html`
8. Blog → `pages/blog.html`
9. About → `pages/about.html`
10. Contact → `pages/contact.html`

**Footer-only link** (not in primary nav):
- **Become a Partner** → `pages/become-a-partner.html`

**Active state**: each page's `<body data-page="...">` value drives the `aria-current="page"` attribute on the matching nav anchor. The existing pattern from Phase 01–03 is reused without modification.

**Gate 1 implication**: the header and footer markup MUST be byte-identical across all 28 pages (after path normalization). The mass-update step in implementation rewrites every page's nav block with the new 10-item set in one atomic pass.

---

## Relationships (visual summary)

```
TechnologyPillar ─── outgoing CTA ──→ pages/partners.html OR pages/solution-*.html
SoftwarePillar   ─── outgoing CTA ──→ pages/contact.html (Get a Quote) OR pages/become-a-partner.html
PartnerType      ─── inlineCta   ──→ pages/become-a-partner.html
PartnerUseCasePackage ─ linkedSolutionPage ──→ pages/solution-<slug>.html  (Phase 03 artifacts)
FaqItem          ─── (no outgoing links; intra-page only)
PartnerApplicationSubmission ─── on success ──→ pages/partners.html (Back to Partners link)
```

No entity in Phase 04 owns or modifies a Phase 01–03 entity; the relationships are all read-only cross-references to existing Solutions and Contact pages.
