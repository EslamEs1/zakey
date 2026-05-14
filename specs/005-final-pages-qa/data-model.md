# Phase 1 Data Model: Phase 05 — Projects, Blog, About, Contact, Legal Pages

**Feature**: `005-final-pages-qa`
**Date**: 2026-05-14

This is a content data model, not a runtime database schema. Each "entity" defines the canonical attribute set that an instance of that content type must carry in its HTML. The values are authored directly in the static HTML files; there is no JSON, no CMS, and no JS state container.

---

## 1. Project (Case Study) Entity

Six instances exist on `pages/projects.html`. Three of them link to dedicated detail pages; the remaining three link to Contact for now (placeholder CTA pattern — extendable in a follow-up phase).

### Attributes

| Attribute | Type | Required | Notes |
|---|---|---|---|
| `id` | slug | yes | Stable kebab-case ID used as DOM id and `data-project` value. |
| `title` | text (3–8 words) | yes | Display name. Example: "Luxury Smart Villa". |
| `segment` | enum | yes | One of: `villa`, `hotel`, `office`, `real-estate`, `commercial`. Drives the filter chip. |
| `locationLabel` | text (1–4 words) | yes | E.g., "Riyadh, KSA" — a market or city, never specific addresses. |
| `heroImage` | path | yes | `assets/images/projects/<slug>.svg`. |
| `challenge` | text (50–120 words) | yes | What the client needed solved. |
| `solution` | text (50–120 words) | yes | What Zakey did. |
| `devicesUsed` | string[] (4–10) | yes | Bullets — references existing product catalog naming where possible. |
| `automationScenes` | string[] (3–6) | yes | Named scenes (e.g., "Welcome Home", "Sleep Mode"). |
| `results` | string[] (3–5) | yes | Measurable outcomes (e.g., "23% reduction in energy use", "Single-app control of 142 devices"). |
| `gallery` | path[] (≥ 4) | conditional | Required on detail pages; optional on overview cards. Paths: `assets/images/projects/<slug>-gallery-N.svg`. |
| `ctaTarget` | path | yes | Either `project-<slug>.html` (if detail exists) or `contact.html`. |
| `ctaLabel` | text (2–4 words) | yes | E.g., "View Case Study" or "Request a Quote". |

### Six canonical instances

| id | title | segment | locationLabel | hasDetailPage |
|---|---|---|---|---|
| `luxury-smart-villa` | Luxury Smart Villa | villa | Riyadh, KSA | YES → `pages/project-luxury-villa.html` |
| `smart-hotel-room` | Smart Hotel Guest Room | hotel | Dubai, UAE | YES → `pages/project-smart-hotel.html` |
| `smart-office-energy` | Smart Office Energy Control | office | Cairo, EG | YES → `pages/project-smart-office.html` |
| `smart-apartment-tower` | Smart Apartment Tower | real-estate | Doha, QA | NO — CTA links to `pages/contact.html` |
| `smart-retail-showroom` | Smart Retail Showroom | commercial | Jeddah, KSA | NO — CTA links to `pages/contact.html` |
| `smart-gaming-suite` | Smart Gaming Suite | villa | Riyadh, KSA | NO — CTA links to `pages/contact.html` |

### Validation rules

- `segment` MUST be one of the five enum values (drives `data-segment` for filtering).
- `challenge` and `solution` MUST be in the 50–120 word range (enforced editorially).
- `devicesUsed` and `automationScenes` MUST be a list, not prose.
- `results` MUST quantify outcomes where possible (number, %, or count).
- `ctaTarget` MUST resolve to an existing file (verified by the link-integrity gate).

### Relationships

- Projects reference **Solutions** (Phase 03) by name in their `challenge`/`solution` copy (e.g., "deployed the Smart Villa solution") — but DO NOT link directly to solution pages from project cards; the CTA always goes to the detail page or Contact.
- Projects reference **Technology pillars** (Phase 04) by name in their `solution` copy (e.g., "leveraged Zakey Scene Intelligence").
- Detail pages link to `pages/contact.html` and `pages/become-a-partner.html` in their final CTA.

---

## 2. Article Entity

Nine instances exist on `pages/blog.html`. Three are fully implemented as detail pages; six are "Coming Soon" placeholder cards.

### Attributes

| Attribute | Type | Required | Notes |
|---|---|---|---|
| `id` | slug | yes | Stable kebab-case ID used as `data-article` value. |
| `title` | text (5–12 words) | yes | Article headline. |
| `category` | enum | yes | One of: `smart-home`, `security`, `energy-saving`, `hotels`, `product-guides`, `partner-insights`. |
| `heroImage` | path | yes | `assets/images/blog/<slug>.svg`. |
| `excerpt` | text (15–30 words) | yes | Card-level summary. |
| `readingTime` | number (1–20) | yes | Minutes. Shown as "N min read" on cards and detail pages. |
| `publishDate` | YYYY-MM-DD | yes | Editorial publish date. |
| `body` | structured HTML | conditional | Required for implemented articles only; consists of H2/H3/p/ul/ol/blockquote/figure. |
| `tocSections` | string[] (4+) | conditional | Required when body has 4+ H2 sections; drives the in-page anchor TOC. |
| `inlineImages` | path[] (1–3) | conditional | In-content figures for implemented articles. |
| `relatedSlugs` | slug[] (2–3) | conditional | Required for implemented articles; references other article slugs or `blog` overview. |
| `status` | enum | yes | `implemented` (article-detail exists) or `coming-soon` (placeholder card only). |

### Nine canonical instances

| id | title | category | status |
|---|---|---|---|
| `smart-home-guide` | Smart Home Beginner Guide: Your First 7 Days | smart-home | implemented → `pages/article-smart-home-guide.html` |
| `villa-automation` | 12 Villa Automation Ideas That Actually Get Used | smart-home | implemented → `pages/article-villa-automation.html` |
| `hotel-smart-room` | Inside a Smart Hotel Room: The Guest Experience | hotels | implemented → `pages/article-hotel-smart-room.html` |
| `security-camera-setup` | Designing a Discreet Smart Security System | security | coming-soon |
| `energy-saving-tips` | 8 Smart Energy Habits That Pay for Themselves | energy-saving | coming-soon |
| `lighting-scenes-guide` | The Art of Lighting Scenes: A Designer's Guide | smart-home | coming-soon |
| `panel-vs-app` | Wall Panel or App? When Each Wins | product-guides | coming-soon |
| `partner-program` | How Zakey's Partner Program Works | partner-insights | coming-soon |
| `hotel-back-office` | Why Hotel Operators Love the Dashboard | hotels | coming-soon |

### Validation rules

- `category` MUST be one of the six enum values (drives `data-category` for filtering).
- `excerpt` MUST be in the 15–30 word range.
- `readingTime` MUST be a reasonable integer (typically 4–12 for the three implemented articles).
- `publishDate` MUST be a real ISO date (no `1970-01-01` placeholders).
- `status="coming-soon"` cards MUST render a `<span class="blog-card__status">Coming Soon</span>` badge and a disabled-style CTA (no `<a>` linking to a missing page).
- `tocSections` MUST be present when `body` has ≥ 4 H2 sections.
- `inlineImages` MUST be referenced inside the article body, not appended at the end.

### Relationships

- Articles cite **Solutions**, **Technology pillars**, and **Products** by name (no hard-link required, but a contextual `<a href="...">` from prose to a Solutions/Product page is encouraged for SEO).
- The `relatedSlugs` array links to other implemented articles or to the blog overview if a thematically relevant article doesn't yet exist.

---

## 3. Contact Channel Card

Four instances on `pages/contact.html`, presented as a 2×2 (desktop) / 1×4 (mobile) card grid above the main quote form.

### Attributes

| Attribute | Type | Required | Notes |
|---|---|---|---|
| `id` | slug | yes | One of: `sales`, `partners`, `support`, `projects`. |
| `title` | text (1–2 words) | yes | Display label. |
| `description` | text (10–20 words) | yes | One-line "who should reach out here". |
| `primaryAction` | action object | yes | See below. |
| `icon` | inline SVG | yes | 24×24 px line-art icon. |

### Action object

```text
{
  "type": "anchor" | "mailto" | "tel" | "whatsapp",
  "target": "<href>",
  "label": "<button text>"
}
```

### Four canonical instances

| id | title | primaryAction.type | primaryAction.target | primaryAction.label |
|---|---|---|---|---|
| `sales` | Sales | `mailto` | `mailto:sales@zakey.tech` | Email Sales |
| `partners` | Partners | `anchor` | `become-a-partner.html` | Apply to Partner |
| `support` | Support | `mailto` | `mailto:support@zakey.tech` | Email Support |
| `projects` | Projects | `anchor` | `#quote-form` | Request a Quote |

### Validation rules

- All four cards MUST be present.
- `mailto`/`tel`/`whatsapp` targets MUST be syntactically valid (the link-integrity gate validates `mailto:` and `tel:` prefixes leniently — i.e., it does not 404 on them).
- The `projects` card's `#quote-form` anchor MUST resolve to the form's `id`.

---

## 4. Contact Form Field

The main quote form on `pages/contact.html`. Twelve fields total (one optional).

### Attributes per field

| Attribute | Type | Required | Notes |
|---|---|---|---|
| `name` | slug | yes | Field name + DOM id. |
| `label` | text (1–4 words) | yes | Display label. |
| `control` | enum | yes | `input` (text/email/tel/url) / `select` / `checkbox-group` / `textarea`. |
| `required` | bool | yes | Drives the `*` indicator + required validator. |
| `validators` | string[] | yes | Names of validators to apply (see § 5). |
| `options` | string[] | conditional | For `select` and `checkbox-group` controls. |
| `placeholder` | text | optional | Helper text inside the control. |
| `errorMsg` | text | yes | Single error message shown when ANY validator fails. |

### Twelve canonical fields (in render order)

1. **`role`** — "I am a" — `select` (Distributor, System Integrator, Real Estate Developer, Installer, Interior Designer, Hotel Operator, End User, Other) — required.
2. **`fullName`** — "Full Name" — `input` text — required.
3. **`company`** — "Company / Organization" — `input` text — required.
4. **`email`** — "Email" — `input` email — required.
5. **`phone`** — "Phone / WhatsApp" — `input` tel — required.
6. **`country`** — "Country / Region" — `select` (curated list of ~30 markets) — required.
7. **`city`** — "City" — `input` text — required.
8. **`projectType`** — "Project Type" — `select` (Smart Villa, Smart Apartment, Smart Hotel, Smart Office, Smart Compound, Gaming Room, Elderly Care, Smart Retail, Other) — required.
9. **`projectSize`** — "Project Size" — `select` (1 unit, 2–5 units, 6–25 units, 26–100 units, 100+ units, recurring) — required.
10. **`interestedSolutions`** — "Interested Solutions" — `checkbox-group` (Smart Villa, Smart Apartment, Smart Hotel, Smart Office, Smart Compound, Gaming Room, Elderly Care, Smart Retail) — required (at least one).
11. **`budgetRange`** — "Budget Range (optional)" — `select` (Prefer not to say, $5k–$25k, $25k–$100k, $100k–$500k, $500k+) — **optional**.
12. **`timeline`** — "Timeline" — `select` (Immediate (<1 month), Short (1–3 months), Mid (3–6 months), Long (6–12 months), Not sure) — required.
13. **`message`** — "Tell us about your project" — `textarea` (2000-char soft cap with live counter) — required.
14. **`consent`** — "I agree to be contacted by Zakey about my project and acknowledge the [Privacy notice](privacy.html)." — `checkbox` — required.

*(Note: 14 fields total, of which 13 are required and 1 (`budgetRange`) is optional. The spec said "12+"; this exceeds it.)*

### Form-level state

`<form data-form-state="...">` — values: `idle`, `submitting`, `success`.

---

## 5. Contact Form Validators (catalog)

The same validator catalog from Phase 04 Become-a-Partner, plus one new validator for the role select.

| Validator name | Applies to | Rule |
|---|---|---|
| `required` | every required field | Trimmed value non-empty (for inputs/textarea/select); at least one selected (for checkbox-group); checked (for consent checkbox). |
| `email` | `email` field | `/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)`. |
| `phone` | `phone` field | After stripping non-digits, `length >= 7`. |
| `select-default` | every `select` | Value MUST NOT be the empty placeholder option. |
| `consent-checked` | `consent` field | `element.checked === true`. |
| `checkbox-group-min-1` | `interestedSolutions` field | At least one `<input type="checkbox" name="interestedSolutions">` is checked. |

---

## 6. About-page Section

Seven section types on `pages/about.html`. Each is a distinct DOM section with its own component class.

| Section type | Component class | Attributes |
|---|---|---|
| Hero | `.about-hero` | h1 title, subtitle, hero image. |
| Brand Story | `.about-story` | 2–4 paragraphs of prose; lifestyle image. |
| Mission | `.about-card` (`data-card="mission"`) | h2 + 30–60 word body + icon SVG. |
| Vision | `.about-card` (`data-card="vision"`) | h2 + 30–60 word body + icon SVG. |
| Values | `.about-values` | 3–5 value cards, each with icon + value name + 15–25 word body. |
| Why Zakey | `.about-why` | h2 + 3–5 bullet differentiators with icon + label + 1-sentence body each. |
| Global / Local | `.about-global` | h2 + body + simple "regions served" visual (SVG). |
| Team / Expertise | `.about-team` | h2 + 4 cards, each with portrait/avatar SVG + name or expertise area + role + 1-sentence bio or expertise statement. |
| Final CTA | `.about-cta` | h2 + body + 2 CTAs (Contact, Become a Partner). |

---

## 7. Legal Section

A Privacy or Terms page is a flat list of numbered sections. Each section has:

| Attribute | Required | Notes |
|---|---|---|
| `number` | yes | 1, 2, 3, … |
| `title` | yes | H2 text. |
| `bodyHTML` | yes | Plain-language prose; may include `<h3>`, `<p>`, `<ul>`, `<a>`. |
| `anchorId` | yes | `section-N`. |

Privacy page: 6 sections (data collected, how used, cookies, third parties, rights, contact).
Terms page: 6 sections (acceptance, acceptable use, IP, limitations, governing law, modifications, contact — at minimum).

---

## 8. Floating WhatsApp Button

A single rendered instance per applicable page.

| Attribute | Required | Notes |
|---|---|---|
| `href` | yes | `https://wa.me/<phone-number>`. Phase 05 ships with `0000000000` placeholder + inline comment. |
| `aria-label` | yes | "Chat with Zakey on WhatsApp". |
| `position` | yes | Fixed, bottom-right, above safe-area-inset-bottom. |
| `visibility` | yes | Always visible on applicable pages — no scroll triggers, no dismissal. |
| `applicablePages` | enum-list | `contact`, `become-a-partner`, `projects`, `project-*`, `blog`, `article-*`, `about`. (Excluded: `index`, `products`, `product-*`, `solutions`, `solution-*`, `technology`, `software`, `partners`.) |
