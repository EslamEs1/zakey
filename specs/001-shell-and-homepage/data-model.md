# Data Model — Zakey Phase 01

**Feature**: Design System, App Shell, Navigation & Homepage
**Scope**: Static-site content model. No persistence — these entities
describe the *shape of HTML content* the homepage and shell must
produce.

> **Note**: "Data model" here is the content schema, not a database
> model. Each entity's fields below tell the markup author what
> attributes every instance MUST carry. Field-level validation is
> enforced in code review and via the `scripts/check-content-rules.sh`
> gate.

---

## E-01 — BrandIdentity (singleton)

The brand's design knobs. Lives in `src/input.css` `:root` block and
`tailwind.config.js`. Surfaces as CSS custom properties and Tailwind
theme keys.

| Field | Type | Required | Notes |
|---|---|---|---|
| `name` | string | yes | Literal `"Zakey"` |
| `wordmark.svg` | path | yes | `assets/icons/zakey-wordmark.svg` |
| `wordmark.lightInverse.svg` | path | yes | `assets/icons/zakey-wordmark-light.svg` |
| `colors[]` | TokenSet | yes | Per research D-07 |
| `typography[]` | TokenSet | yes | Per research D-08 |
| `spacing[]` | TokenSet | yes | 4/8/12/16/24/32/48/64/96/128 px |
| `radii[]` | TokenSet | yes | sm 6, md 10, lg 16, xl 22, pill 999 |
| `shadows[]` | TokenSet | yes | card, elevated, glass, glow-cyan |

---

## E-02 — NavigationEntry

Header / footer / drawer links.

| Field | Type | Required | Notes |
|---|---|---|---|
| `label` | string | yes | ≤14 chars |
| `href` | path | yes | Real file in repo, in-page anchor (`#…`), or absolute URL |
| `icon` | path? | optional | SVG icon for mega-menu and drawer |
| `mega.group` | enum? | optional | `"products"` \| `"solutions"` — when present, hovering the link opens a mega-menu |
| `mega.items` | NavigationEntry[]? | optional | Sub-entries shown inside the mega-menu |

**Top-level navigation** (in order): Home, Products, Solutions,
Technology, Software, Partners, Projects, Blog, About, Contact.

**Products mega-menu groups**: Control Panels, Smart Switches, Sensors,
Security, Lighting Control, Climate, Curtains & Shading, Energy.
**Solutions mega-menu groups**: Smart Villa, Smart Apartment, Smart
Hotel, Smart Office, Smart Compound, Gaming Room.

---

## E-03 — HeroBlock (1 per page; 1 on the homepage)

| Field | Type | Required | Notes |
|---|---|---|---|
| `eyebrow` | string | yes | Small label above the headline |
| `headline` | string | yes | Single `<h1>`, ≤80 chars |
| `subheadline` | string | yes | ≤200 chars |
| `primaryCta.label` | string | yes | "Get a Quote" |
| `primaryCta.href` | path | yes | `#get-quote` |
| `secondaryCta.label` | string | yes | "Explore Products" |
| `secondaryCta.href` | path | yes | `pages/products.html` |
| `heroVisual.src` | path | yes | `assets/images/hero/zakey-smart-home-hero.jpg` |
| `heroVisual.alt` | string | yes | Descriptive, ≤120 chars |
| `floatingCards[]` | FloatingCard | yes | At least 2 entries |
| `stats[]` | Stat? | optional | 3 small KPI numbers under the hero |

**FloatingCard**: `{ icon, title, subtitle }` — e.g., device-mockup
card, automation-stat card.

**Stat**: `{ value, label }` — e.g., "150+ device categories",
"99.9% uptime", "24/7 support".

---

## E-04 — FeaturedProductHighlight (slider; exactly 4)

| Field | Type | Required |
|---|---|---|
| `slug` | string | yes |
| `name` | string | yes |
| `tagline` | string | yes |
| `description` | string | yes |
| `image.src` | path | yes |
| `image.alt` | string | yes |
| `cta.label` | string | yes |
| `cta.href` | path | yes |
| `accent` | enum | optional | `"cyan"` (default) \| `"luxe"` |

**Required entries**: Zakey Aura Panel, Zakey Secure Kit, Zakey Smart
Switch Series, Zakey Climate Hub.

---

## E-05 — WhyZakeyFeature (exactly 6)

| Field | Type | Required |
|---|---|---|
| `icon.src` | path | yes |
| `title` | string | yes |
| `description` | string | yes | ≤140 chars |
| `accent` | enum? | optional | Tints the icon background |

**Required entries**: Full Smart Ecosystem, Elegant Product Design,
Secure Automation, Works with Voice Assistants, Energy Monitoring,
Partner-Ready Business Support.

---

## E-06 — EcosystemNode (exactly 10)

| Field | Type | Required |
|---|---|---|
| `key` | enum | yes | One of: `hardware`, `app`, `cloud-local`, `scenes`, `sensors`, `security`, `lighting`, `climate`, `curtains`, `analytics` |
| `label` | string | yes |
| `icon.src` | path | yes |
| `connectsTo` | enum[] | optional | Used by the diagram layout to draw connector lines |

Renders as either a connected ring with central "Zakey Brain" node or
a hex-grid of cards with hairline connectors — final visual decided
in Phase 2 tasks.

---

## E-07 — SolutionSpace (exactly 6)

| Field | Type | Required |
|---|---|---|
| `slug` | string | yes |
| `title` | string | yes |
| `image.src` | path | yes |
| `image.alt` | string | yes |
| `benefits[]` | string | yes | 2–3 short bullet lines |
| `cta.label` | string | yes |
| `cta.href` | path | yes | `pages/solutions.html` (anchor by slug in Phase 02) |

**Required entries**: Smart Villa, Smart Apartment, Smart Hotel, Smart
Office, Smart Compound, Gaming Room.

---

## E-08 — TechnologyPillar (exactly 3)

| Field | Type | Required |
|---|---|---|
| `slug` | string | yes |
| `name` | string | yes | Zakey-original; MUST NOT be CoSS / AI Builder / Fusion Link |
| `subtitle` | string | yes | One-line concept tag |
| `description` | string | yes | ≤220 chars |
| `icon.src` | path | yes |
| `visual.src` | path | yes | Abstract graphic |

**Required concepts** (with proposed Zakey-original names):
1. Multi-Protocol Integration — **"Zakey Mesh Bridge"**
2. AI Scene Automation — **"Zakey Sense Engine"**
3. Hybrid Wired & Wireless Architecture — **"Zakey Hybrid Fabric"**

---

## E-09 — FeaturedProduct (grid; exactly 8)

| Field | Type | Required |
|---|---|---|
| `slug` | string | yes |
| `category` | string | yes |
| `name` | string | yes |
| `image.src` | path | yes |
| `image.alt` | string | yes |
| `description` | string | yes | ≤120 chars |
| `cta.label` | string | yes |
| `cta.href` | path | yes |

Categories span at least four of: Control Panels, Smart Switches,
Sensors, Security, Lighting, Climate, Curtains, Energy.

---

## E-10 — CaseStudy (exactly 3)

| Field | Type | Required |
|---|---|---|
| `slug` | string | yes |
| `title` | string | yes |
| `image.src` | path | yes |
| `image.alt` | string | yes |
| `outcome` | string | yes | One-line outcome with a metric where possible |
| `tags[]` | string | optional | e.g., "Villa", "Lighting", "Climate" |
| `cta.label` | string | yes |
| `cta.href` | path | yes |

**Required entries**: Luxury villa automation, Smart hotel guest
experience, Smart office energy optimization.

---

## E-11 — BlogArticleTeaser (exactly 3)

| Field | Type | Required |
|---|---|---|
| `slug` | string | yes |
| `title` | string | yes |
| `image.src` | path | yes |
| `image.alt` | string | yes |
| `date` | ISO date | yes |
| `category` | string | yes |
| `excerpt` | string | yes | ≤140 chars |
| `cta.label` | string | yes |
| `cta.href` | path | yes |

---

## E-12 — QuoteLead

Front-end only. Never leaves the browser. Captured into a JS object
when the form is submitted, used to render the success state, then
discarded.

| Field | Type | Required | Validation |
|---|---|---|---|
| `iAmA` | enum | yes | One of: `distributor`, `integrator`, `developer`, `end-user`, `installer` |
| `name` | string | yes | ≥2 chars |
| `company` | string | conditional | Required unless `iAmA = end-user` |
| `email` | string | yes | RFC 5322 simplified — must contain `@` and `.` after the `@` |
| `phone` | string | yes | ≥6 digits |
| `country` | string | yes | Select; non-empty |
| `projectType` | enum | yes | One of: `new-build`, `renovation`, `multi-site`, `hospitality`, `office` |
| `projectSize` | enum | yes | One of: `under-200m2`, `200-500m2`, `500-1000m2`, `over-1000m2`, `multi-unit` |
| `interestedIn[]` | enum[] | yes | ≥1; subset of: `smart-home`, `smart-hotel`, `smart-office`, `security`, `lighting`, `climate`, `full-solution` |
| `message` | string | yes | ≥20 chars |
| `consent` | boolean | yes | Must be `true` |

### State machine

```
            ┌─────── reset / submit-another ───────┐
            ▼                                       │
   ┌──────────────┐    submit    ┌────────────┐   ┌─┴────────┐
   │     idle     │─────────────▶│ validating │   │ success  │
   │              │   (synchronous)            │   └──────────┘
   └──────────────┘              └──────┬─────┘
            ▲                          │ all valid
            │ invalid (per-field)      ▼
            │                   ┌────────────┐  (success ~85% of time, error ~15%)
            └───────────────────│ submitting │──┐
                                └────────────┘  ▼
                                          ┌─────────┐
                                          │  error  │
                                          └────┬────┘
                                               │ try-again
                                               ▼
                                            (idle)
```

Front-end "submission" simulates a 600–1500 ms delay then resolves to
`success` with high probability; an `error` path is exposed for
testing the retry affordance.

---

## E-13 — NewsletterSubscription

Front-end only. Same lifecycle pattern as Quote Lead but minimal.

| Field | Type | Required | Validation |
|---|---|---|---|
| `email` | string | yes | Same email pattern as E-12 |
| `consent` | boolean | yes | Implicit via the privacy note adjacent to the field |

### State machine

`idle → submitting → (success | error) → idle` (auto-reset after 5 s
on success).

---

## E-14 — FooterColumn

| Field | Type | Required |
|---|---|---|
| `title` | string | yes |
| `links[]` | NavigationEntry | yes | ≥3 entries |

**Required columns**: Brand-summary (no link list, paragraph + logo),
Products, Solutions, Company, Connect (newsletter form + socials +
contact info).

---

## Constraints summary

- Every entity that includes an image MUST carry a non-empty `alt`
  string.
- Every entity that includes a CTA MUST point its `href` at a real
  file or anchor in this repo.
- No content field MAY contain the strings `lorem ipsum`, `lifesmart`,
  or `ilifesmart` (case-insensitive).
- Required-count entities (Slider=4, Why=6, Ecosystem=10, Spaces=6,
  Tech=3, Products=8, Cases=3, Blog=3) MUST hit the exact count;
  fewer or more is a spec violation.

These constraints are enforced by code review and by the three bash
gates documented in research D-09.
