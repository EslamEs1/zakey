# Data Model — Zakey Phase 03

**Feature**: Solutions Overview & Solution Detail Pages
**Date**: 2026-05-14
**Status**: Authored content data model — no runtime data store (static HTML).

This document is the **content shape** for every solution Phase 03 ships. There is no database — every value below appears verbatim (or near-verbatim) as static HTML in the page that represents the solution. A future contributor adding a ninth solution would author another entry in this shape and produce one new HTML file.

---

## Entity: Solution

A single use-case-and-space combination Zakey markets a tailored smart-living deployment for.

| Field | Type | Constraint | Used in |
|---|---|---|---|
| `slug` | kebab-case string | 1 per file; matches the detail-page filename suffix | `pages/solution-<slug>.html`, overview card `id`, mega-menu hash |
| `title` | string | "Smart " + space type, ≤ 32 chars | detail-page `<h1>`, overview card `<h3>` |
| `category` | array of category slugs (1–2) | each value MUST be a canonical category slug from the taxonomy | overview card `data-category` (space-joined) |
| `audience` | sentence | "For:" line, 30–80 chars | overview card `__for` line |
| `positioning` | sentence | 40–100 chars; the one-line elevator pitch | overview card `__desc`, hero `__tagline` |
| `hero_image` | file path | `assets/images/solutions/<slug>.svg`, unique per solution | overview card image, detail hero image |
| `hero_alt` | descriptive sentence | 50–140 chars | overview card `<img alt>`, detail hero `<img alt>` |
| `subtitle` | sentence | 40–120 chars; detail-hero subtitle | detail hero |
| `lead` | 2–3 sentences | the positioning paragraph in the detail hero | detail hero |
| `benefits_summary` | array of 4 strings | each 12–40 chars; the chip labels on the overview card | overview card `__benefits` |
| `problems` | array of 3–5 `Problem` entities | tailored per solution | detail-page Problem section |
| `solution_narrative` | array of 2–3 paragraphs | each 60–140 words; must reference ≥ 3 Zakey subsystems by name | detail-page Zakey Solution section |
| `included_subsystems` | array of 6–8 `Subsystem` entities | curated for this solution from the canonical 8 | detail-page Included Systems grid |
| `scenarios` | array of 3–5 `Scenario` entities | each tailored to this solution | detail-page Automation Scenarios section |
| `recommended_products` | array of 3–4 `RecommendedProduct` entities | each must reference a product slug that exists in Phase 02 | detail-page Recommended Products section |
| `benefits` | array of 6 `Benefit` entities | each 30–80 char justification | detail-page Benefits section |
| `topology` | `Topology` entity | inline SVG node-and-edge graph for this solution | detail-page How It Connects section |
| `meta_title` | string | 40–70 chars; SEO title | `<title>` |
| `meta_desc` | sentence | 120–160 chars; SEO meta description | `<meta name="description">` |

**Validation rules** (enforced by integrity gates and manual review):
- Every `slug` appears exactly once across the eight solutions.
- `hero_image` MUST exist as a real file under `assets/images/solutions/` (Gate 3 link integrity).
- `recommended_products[*].slug` MUST reference an existing product slug; the `View Details` href resolves to either a flagship detail page or a Phase 02 catalog anchor (Phase 02 FR-062 fallback).
- `problems`, `scenarios`, `benefits`, `solution_narrative` arrays MUST be unique across solutions (no copy-paste — verified by manual diff during US2 QA).

---

## Entity: Problem

A single pain point for a solution's target buyer.

| Field | Type | Constraint |
|---|---|---|
| `heading` | string | 20–60 chars; the pain-point title (h3) |
| `detail` | 1–2 sentences | 80–200 chars; describes the pain in client-relatable terms |

Validation: every `Problem.heading` MUST be specific to the space (e.g., "Coordinating climate across 12 rooms" for Smart Villa, not "Smart-home automation is hard").

---

## Entity: Subsystem (canonical)

One of the eight Zakey hardware/software domains. The canonical set is fixed; each solution selects 6–8 from this set.

| Slug | Display name | Description (example) |
|---|---|---|
| `central-control` | Central Control | Wall-mounted Aura Panel + Mesh Bridge for whole-deployment command |
| `lighting` | Lighting Control | Dimmable scenes, multi-circuit control, colour-temperature tuning |
| `curtains-shading` | Curtains & Shading | Motorised curtains, blinds, and silent tracks |
| `climate` | Climate / HVAC | HVAC integration, air-quality sensing, multi-zone temperature |
| `security` | Security | Cameras, smart locks, perimeter sensors, encrypted recordings |
| `sensors` | Sensors | Motion, door/window, water-leak, smoke, environmental |
| `energy` | Energy | Per-circuit metering, smart plugs, optimisation algorithms |
| `voice-app` | App & Voice | Zakey App on iOS/Android/web + Alexa / Google / Siri integration |

Per-solution subsystem instances carry a **tailored description** (1–2 sentences specific to the solution), shown on the Included Systems card.

| Field | Type | Constraint |
|---|---|---|
| `slug` | enum from canonical set | matches one of the eight slugs above |
| `display_name` | string | matches canonical display name |
| `description` | 1–2 sentences | tailored to the solution; 60–140 chars |
| `icon_svg_paths` | inline SVG `<path>` data | a 24×24 viewBox inline icon, ≤ 200 chars of path data |

---

## Entity: Scenario

A When/Then automation vignette.

| Field | Type | Constraint |
|---|---|---|
| `context_label` | string | 8–24 chars; the eyebrow (e.g., "Welcome home", "Cinema mode") |
| `trigger` | sentence starting with "When" | 40–120 chars |
| `action` | sentence starting with "Zakey" or naming a subsystem | 40–140 chars |

Validation: every Scenario MUST be solution-tailored (no copy-paste between detail pages).

Reuses Phase 02 `.product-scenarios__item` markup verbatim.

---

## Entity: RecommendedProduct

A product card surfaced on a solution detail page.

| Field | Type | Constraint |
|---|---|---|
| `slug` | product slug | MUST reference a product authored in Phase 02 (e.g., `aura-panel`, `secure-kit`, `smart-switch-series`, `climate-hub`, `motion-sensor`, `door-shield`, `lighting-controller`, `curtain-driver`, plus any of the 26 Phase 02 additions) |
| `display_name` | string | the product's canonical name (e.g., "Zakey Aura Panel") |
| `category` | string | one of the Phase 02 product category slugs |
| `tags` | space-separated lowercase tokens | reused from Phase 02 `data-tags` |
| `description` | sentence | 60–140 chars; may be solution-context-aware ("ideal for villa entryways", etc.) |
| `image_path` | file path | `../assets/images/products/zakey-<slug>.svg` |
| `details_href` | URL | flagship detail page (`./product-zakey-<slug>.html`) for the four Phase 02 flagships; otherwise catalog anchor `./products.html#product-zakey-<slug>` |
| `quote_href` | URL | always `../index.html#get-quote` |

Reuses Phase 02 `.card-product` markup verbatim.

---

## Entity: Benefit

A client-facing outcome chip on a detail page.

| Field | Type | Constraint |
|---|---|---|
| `heading` | string | 12–32 chars; the benefit name (e.g., "Comfort", "Energy Efficiency") |
| `justification` | sentence | 30–100 chars; one-line "because Zakey…" payoff |
| `icon_svg_paths` | inline SVG `<path>` data | 24×24 viewBox, ≤ 200 chars |

Canonical benefit pool (per FR-027); each solution selects 6 from this pool or substitutes solution-specific variants:
- Comfort
- Security
- Energy Efficiency
- Premium UX
- Centralized Management
- Scalability
- Safety (Elderly Care variant)
- Guest Experience (Smart Hotel variant)
- Brand Polish (Smart Retail variant)
- Cost Reduction (Smart Office / Smart Compound variant)

---

## Entity: Topology

The inline SVG topology diagram for one detail page.

| Field | Type | Constraint |
|---|---|---|
| `hub_label` | string | always "Zakey Mesh Bridge" or "Zakey Aura Panel + Mesh Bridge" |
| `cloud_label` | string | always "Zakey Cloud + App + Voice" |
| `nodes` | array of 5–8 `TopologyNode` | each maps to a Subsystem included in this solution |
| `title_text` | sentence | the `<title>` element content; 40–120 chars; describes the topology in one breath |
| `viewbox` | string | always `"0 0 600 360"` |

### TopologyNode

| Field | Type | Constraint |
|---|---|---|
| `subsystem_slug` | enum from canonical subsystems | matches Subsystem.slug |
| `label` | string | display name shown next to the node |
| `position` | `{ x, y }` | within the 600 × 360 viewbox; positioned by the page author for visual balance |
| `accent_role` | enum | `primary` (highlighted in this solution) / `secondary` (present but not emphasised) |

---

## Entity: Category (canonical, exhaustive)

Five canonical filter categories. The category set is fixed in Phase 03 and verified by the overview-page filter contract.

| Slug | Display name | Solutions |
|---|---|---|
| `residential` | Residential | Smart Villa, Smart Apartment, Elderly Care (dual) |
| `hospitality` | Hospitality | Smart Hotel |
| `commercial` | Commercial | Smart Office, Smart Retail (optional) |
| `real-estate` | Real Estate | Smart Compound |
| `lifestyle` | Lifestyle | Gaming Room, Elderly Care (dual) |

Plus the synthetic "All" pseudo-category which shows every solution.

---

## Filter State (overview page DOM state, not persisted)

| Field | Type | Persisted as |
|---|---|---|
| `active_category` | enum (canonical category slugs + `all`) | `aria-pressed="true"` on the matching `.filter-pill` button |
| `visible_count` | integer | text content of `[data-visible-count]` span |
| `total_count` | integer (constant per page load) | text content of `[data-total-count]` span; set once on init |

State transitions:
- **Initial load**: `active_category = 'all'`, `visible_count = total_count`.
- **Tab click**: `active_category = clickedTab.dataset.category`, `visible_count = applyFilters().count`.
- **Hash deep-link**: resolved through D-03 promotion table → `active_category` set, `applyFilters()` runs.
- **JS disabled**: state is unreachable; all cards remain visible by default (no `.is-hidden` applied).

---

## Solution Roster (the 6 required + 2 optional MVP set)

| # | Slug | Title | Category | Status |
|---|---|---|---|---|
| 1 | `smart-villa` | Smart Villa | `residential` | required (MVP) |
| 2 | `smart-apartment` | Smart Apartment | `residential` | required (MVP) |
| 3 | `smart-hotel` | Smart Hotel | `hospitality` | required (MVP) |
| 4 | `smart-office` | Smart Office | `commercial` | required (MVP) |
| 5 | `smart-compound` | Smart Compound | `real-estate` | required (MVP) |
| 6 | `gaming-room` | Gaming Room | `lifestyle` | required (MVP) |
| 7 | `elderly-care` | Elderly Care | `lifestyle residential` | optional (P3) |
| 8 | `smart-retail` | Smart Retail | `commercial` | optional (P3) |

If optional pages are not shipped this phase, the overview-page grid contains only the 6 required cards; no card for an unshipped optional solution is added.

---

## Filtering & State Notes

- All filtering is by category only (no free-text search). Phase 03 deliberately omits a search input — the catalog has 6–8 cards, well under the threshold where search adds value.
- The filter combines with browser hash anchoring: deep-link to `#smart-villa` activates the Residential tab AND scrolls to the Smart Villa card.
- Multi-category cards (Elderly Care) appear under both Residential and Lifestyle tabs.
- The "All" pseudo-category is the default and the safe fallback for unknown hashes.

---

## Out-of-scope for Phase 03

- Solution-to-solution comparison ("Compare Smart Villa vs Smart Apartment").
- Per-solution lead capture (all CTAs go to the single Phase 01 quote form).
- Localisation, RTL, currency, or regional pricing.
- Server-side rendering, CMS, or any backend persistence.
- A "Recently viewed solutions" history (no localStorage in Phase 03).
- Per-solution video reels or interactive 3D scenes.
