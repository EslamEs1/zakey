# Content Data Model — Zakey Phase 02

**Feature**: Product Catalog & Product Detail Pages
**Date**: 2026-05-14
**Note**: This is a *content* data model. The site has no runtime database. Each entity below maps to a static HTML pattern, encoded with semantic tags + `data-*` attributes, that authors fill in directly. JavaScript only **reads** this model (via `dataset.*` and `textContent`); it never writes it.

---

## Entity: `Product`

A single Zakey device that appears on the catalog and (for the four flagships) on its own detail page.

| Field | Type | Required | Where it lives | Validation |
|---|---|---|---|---|
| `slug` | string (kebab-case) | yes | `id="product-<slug>"` on the card; filename suffix on detail page | Lowercase, hyphen-separated, must match `^[a-z][a-z0-9-]+$` |
| `name` | string | yes | `.card-product__name` text on card; `<h1>` on detail page | Non-empty; ≤ 60 chars; starts with "Zakey" |
| `category` | enum (Category.slug) | yes | `.card-product__category` eyebrow text + `data-category="<slug>"` attribute | One of the 10 Category slugs |
| `image` | path | yes | `<img src>` on card hero and detail-page hero | Resolves to a real file under `assets/images/products/` |
| `description` | string | yes | `.card-product__desc` paragraph | 60–140 chars; complete sentences; no lorem ipsum |
| `tags` | string[3] | yes (catalog cards) | `data-tags="t1 t2 t3"` attribute + 3 visible `.card-product__tag` chips | Exactly 3 lowercase tokens; no spaces inside a tag; reasonable synonyms welcome |
| `viewDetailsHref` | path | yes | `<a class="card-product__cta--details" href>` | For flagship products: `./product-zakey-<slug>.html` (from catalog); for others: `#product-<slug>` (anchor on same page) |
| `requestQuoteHref` | path | yes | `<a class="card-product__cta--quote" href>` | Always `../index.html#get-quote` from `pages/`; or `./index.html#get-quote` from root |
| `hasDetailPage` | boolean | derived | encoded by `viewDetailsHref` shape | True for the 4 flagship products in Phase 02 |

### Display invariants

- Every product card MUST render: image, category, name, description, 3 visible tags, View Details link, Request Quote link. The card is hidden (via `.is-hidden`) only by the JS filter; otherwise it is always visible.
- Premium hover state is purely CSS; the card does not require JS to feel alive.
- The card's `data-product` flag attribute identifies it to `js/products.js`. Without that flag the filter ignores the element.

### Relationships

- **Product → Category**: many-to-one. Multiple products belong to one category. Category is the single source of truth for catalog grouping and for the filter pill.
- **Product → Product (related)**: many-to-many. A detail page declares 3–4 related products by referencing their slugs in `.product-related .card-product` blocks (the same `.card-product` markup is duplicated; no symbolic reference needed in HTML).

---

## Entity: `Category`

A single product category. Phase 02 ships exactly 10 categories. The list is closed for Phase 02 — adding a category requires a spec amendment.

| Field | Type | Required | Where it lives | Validation |
|---|---|---|---|---|
| `slug` | string (kebab-case) | yes | filter pill `data-category=""`; product card `data-category=""`; URL hash on `pages/products.html` | One of the 10 fixed slugs |
| `name` | string | yes | filter pill label; product card eyebrow; mega-menu label (Phase 01) | Title Case, ≤ 24 chars |
| `count` | integer | derived | live updated by JS; appears in catalog status line | Computed from visible `[data-category="<slug>"]` cards |
| `description` | string | no | category-section heading or mega-menu sub | Short single-line definition |

### The 10 categories (closed set for Phase 02)

| slug | display name | description (mega-menu sub) | minimum product count |
|---|---|---|---|
| `central-control` | Central Control | Wall panels and hubs that orchestrate every device | 4 |
| `smart-switches` | Smart Switches | Tactile control with digital precision | 4 |
| `security` | Security | Cameras, locks, sensors, perimeter defence | 6+ |
| `sensors` | Sensors | Motion, environment, presence | 2 |
| `lighting` | Lighting | Scenes, dimming, ambient strips | 3 |
| `curtains-shading` | Curtains & Shading | Motorised curtains, blinds, silent tracks | 3 |
| `climate` | Climate / HVAC | Thermostats, gateways, climate hubs | 3 |
| `energy` | Energy Management | Smart plugs, meters, modules | 3 |
| `entertainment` | Entertainment | IR hubs, scene remotes | 2 |
| `accessories` | Accessories | Mounts, hardware, replacement parts | 2 |

Total minimum: 32 products. Some cards may live in multiple Phase-02 "Accessories" entries (e.g., spare keypads); the brief lists only what's required.

### Display invariants

- The catalog ships filter pills in this exact order (the order shown in the brief's category list).
- Every category MUST have at least the minimum count above. No empty categories.

---

## Entity: `KeyFeature` *(detail page only)*

A single icon + headline + sub on a detail page's Key Features grid.

| Field | Type | Required | Where it lives | Validation |
|---|---|---|---|---|
| `icon` | inline SVG | yes | inside `.product-features__card svg` | aria-hidden="true"; uses currentColor + stroke for tinting via `var(--color-accent)` |
| `title` | string | yes | `.product-features__title` | ≤ 36 chars |
| `description` | string | yes | `.product-features__desc` | 40–120 chars |

Each detail page MUST have ≥ 4 KeyFeature items. The grid is `.product-features__grid` (CSS grid, ~2 cols on tablet, ~3 on desktop).

---

## Entity: `SmartScenario` *(detail page only)*

A single example automation.

| Field | Type | Required | Where it lives | Validation |
|---|---|---|---|---|
| `trigger` | string | yes | inside `.product-scenarios__trigger` | Short condition phrase, e.g., "When motion is detected after midnight" |
| `action` | string | yes | inside `.product-scenarios__action` | Short action phrase, e.g., "Aura Panel fades hallway lights to 25% warm white" |
| `context` | string | no | `.product-scenarios__context` (eyebrow) | Time-of-day or room context tag |

Each detail page MUST present ≥ 3 SmartScenario items.

---

## Entity: `Specification` *(detail page only)*

The structured tech-spec rows on each detail page. Rendered as a `<dl>` (definition list) for semantic correctness; styled as a two-column table.

| Field | Type | Required | Where it lives | Validation |
|---|---|---|---|---|
| `power` | string | yes | `<dt>Power</dt><dd>…</dd>` | Realistic, e.g., "AC 100–240 V, 50/60 Hz, 8 W max" |
| `connectivity` | string | yes | `<dt>Connectivity</dt><dd>…</dd>` | E.g., "Wi-Fi 5 (2.4 GHz), Zigbee 3.0, Bluetooth LE 5.0, Matter-ready" |
| `compatibility` | string | yes | `<dt>Compatibility</dt><dd>…</dd>` | E.g., "Zakey Mesh Bridge, Zakey Sense Engine, third-party Matter hubs" |
| `installationType` | string | yes | `<dt>Installation</dt><dd>…</dd>` | E.g., "In-wall, US/EU back box; PoE optional" |
| `material` | string | yes | `<dt>Material</dt><dd>…</dd>` | E.g., "Aluminium frame with capacitive glass face" |
| `dimensions` | string | yes | `<dt>Dimensions</dt><dd>…</dd>` | E.g., "120 × 86 × 9 mm" |
| `supportedSpaces` | string | yes | `<dt>Supported spaces</dt><dd>…</dd>` | E.g., "Villas, hotels, offices, gaming rooms" |

All seven rows MUST be populated with realistic values. No "TBD", no empty `<dd>`.

The `<section id="tech-specs">` is the anchor target for the hero's "Download Specs" CTA (FR-032 in spec.md).

---

## Entity: `CompatibilityChip` *(detail page only)*

A single chip card in the Compatibility section.

| Field | Type | Required | Where it lives | Validation |
|---|---|---|---|---|
| `label` | enum | yes | `.product-compat__label` | One of: "Mobile App", "Voice Assistants", "Scenes", "Sensors", "Central Hub" |
| `context` | string | yes | `.product-compat__context` | One-line context, e.g., "Zakey App for iOS, Android, and web" |

Every detail page MUST present **exactly five** chips (one per enum label, in this order).

---

## Entity: `RelatedProductRef` *(detail page only)*

A reference from a detail page's Related Products section to another product. Implemented by **duplicating the `.card-product` markup** with the related product's content. The slug is encoded in the duplicated card's `id` attribute as usual.

| Field | Type | Required | Where it lives | Validation |
|---|---|---|---|---|
| `targetSlug` | Product.slug | yes | `id="related-product-<slug>"` and inside-link `href` | Must be a Product slug that exists in the catalog |

Each detail page MUST present 3 or 4 related products, chosen for cross-sell relevance (e.g., Aura Panel's relateds include Smart Switch Series and Climate Hub).

---

## Entity: `GalleryThumbnail` *(detail page only, US4 — P3 polish)*

A single thumbnail in the product-hero gallery strip.

| Field | Type | Required | Where it lives | Validation |
|---|---|---|---|---|
| `imageSrc` | path | yes | `data-thumb-src=""` attribute | Resolves to a real image under `assets/images/products/` |
| `imageAlt` | string | yes | `data-thumb-alt=""` attribute | Descriptive, ≤ 60 chars |
| `isActive` | boolean | one per gallery | `aria-selected="true"` on initial thumbnail | Exactly one thumbnail has `aria-selected="true"` at load |

Each detail page MUST have ≥ 2 thumbnails when a gallery is present. (At MVP, only the four flagship pages ship a gallery; a single-image hero is acceptable if no additional visuals exist.)

---

## Filtering & Search State (runtime, not persisted)

`js/products.js` maintains exactly three pieces of state in DOM attributes (not in JS variables):
- **Active category**: the filter pill with `aria-pressed="true"` (exactly one at any time). Default at load: `data-category="all"`.
- **Search query**: the `<input>`'s current value. Default at load: empty string.
- **Visible-count**: read from the DOM after each `applyFilters()`; mirrored into the `[data-visible-count]` span.

These three are derived state — they live in the DOM only. The JS does not own a duplicated copy. This is the same pattern Phase 01 used for the slider's `aria-selected` dots and the drawer's `aria-hidden`.

---

## Cross-cutting Invariants

The following invariants hold across all entity instances and are checked by the Phase 01 integrity gates extended to Phase 02 files:

- **Slug uniqueness**: every `Product.slug` is unique across the catalog.
- **Link integrity**: every `viewDetailsHref` / `requestQuoteHref` resolves to a real file (Gate 3).
- **Image integrity**: every `image` field resolves to a real file under `assets/images/products/` (Gate 3).
- **Content rules**: no card or section contains "lorem ipsum", "lifesmart", "ilifesmart", "CoSS", "AI Builder", or "Fusion Link" (Gate 2).
- **Heading rules**: every detail page has exactly one `<h1>` (Gate 2).
- **Shell rules**: every Phase-02 page's header + footer match the Phase 01 reference byte-for-byte after path normalisation (Gate 1).
- **Alt-text rules**: every `<img>` whose role conveys information has descriptive `alt`; purely decorative imagery (e.g., faint background SVGs) may use `alt=""`.

---

## Out of scope for Phase 02

The following are deliberately deferred:
- A real product database / CMS — Phase 02 stays static HTML.
- Detail pages for products beyond the four flagships — they keep catalog anchors only.
- A "compare products" feature — not in the spec.
- A "wishlist" / "save to project" feature — not in the spec.
- Real PDF spec sheets — "Download Specs" CTAs target the in-page `#tech-specs` anchor.
- Real product photography — SVG placeholders ship; replacement is a future phase task.
