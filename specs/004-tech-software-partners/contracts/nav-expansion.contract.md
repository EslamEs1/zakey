# Contract: Navigation Expansion (site-wide header & footer mass-update)

## Purpose

Add Technology, Software, and Partners to the primary navigation of every page on the site, and add Become a Partner to the footer's link column. The mass-update applies to every existing HTML file (currently 24) plus the four Phase 04 files (final total: 28). After the update, Gate 1 (shell consistency) MUST still pass.

## Scope

- **All 28 final pages** receive the same header (byte-identical after path normalization) and the same footer.
- The path-normalization rules from Phase 03 still apply: `./`, `../`, and `pages/` prefixes are stripped before md5 comparison.

## DOM contract — primary nav

The primary nav `<ul>` inside the header (`<nav class="site-header__nav">` or equivalent) MUST contain exactly these 10 list items, in order:

```html
<ul class="site-nav">
  <li><a href="<root>index.html">Home</a></li>
  <li><a href="<pages>products.html">Products</a></li>
  <li><a href="<pages>solutions.html">Solutions</a></li>
  <li><a href="<pages>technology.html">Technology</a></li>
  <li><a href="<pages>software.html">Software</a></li>
  <li><a href="<pages>partners.html">Partners</a></li>
  <li><a href="<pages>projects.html">Projects</a></li>
  <li><a href="<pages>blog.html">Blog</a></li>
  <li><a href="<pages>about.html">About</a></li>
  <li><a href="<pages>contact.html">Contact</a></li>
</ul>
```

(`<root>` and `<pages>` are the per-page relative prefixes — `./` and `./pages/` on `index.html`, `../` and `./` on `pages/*.html`. Gate 1's normalization removes both.)

## DOM contract — mobile drawer

The mobile drawer's nav `<ul>` mirrors the same 10 items in the same order. The drawer's existing close-on-link-click behavior continues to apply.

## DOM contract — active state

Each page's `<body data-page="<slug>">` value drives the active-nav `aria-current="page"` attribute on the corresponding anchor. The script that wires this is the existing Phase 01 navigation module (`js/navigation.js`); no new wiring is needed.

The mapping:

| `data-page` slug | Active nav item |
|---|---|
| `home` | Home |
| `products` | Products |
| `product-detail` | Products (sub-page) |
| `solutions` | Solutions |
| `solution-detail` | Solutions (sub-page) |
| `technology` | Technology |
| `software` | Software |
| `partners` | Partners |
| `become-a-partner` | Partners (sub-page) — `aria-current="page"` is set on Partners |
| `projects` | Projects |
| `blog` | Blog |
| `about` | About |
| `contact` | Contact |
| `privacy`, `terms` | (no active item) |

## DOM contract — footer

The footer's primary link column MUST contain Become a Partner in addition to its existing links. The exact column and ordering are at the implementer's discretion provided:

- The link `<a href="<pages>become-a-partner.html">Become a Partner</a>` appears somewhere in the footer.
- The same footer markup is byte-identical (after path normalization) across all 28 pages.

## State contract

- No JS state at this level. Active-nav state is set declaratively by `data-page` + the existing `js/navigation.js` module.

## Style contract

- Uses existing nav tokens.
- The 10-item desktop nav fits within the existing header container at ≥ 1024 px. If layout pressure requires it, the implementation MAY introduce a small horizontal scroll on tablet (641–1023 px) OR collapse the nav to the mobile drawer earlier — at the implementer's discretion. The desktop nav MUST NOT introduce a JS-driven dropdown.

## Behavior contract

- Every link in the primary nav resolves (Gate 3).
- Active-nav state is visible (existing styling from Phase 01).
- Mobile drawer continues to open/close via the existing toggle button.

## Failure modes

- **Gate 1 fails after the mass-update**: this is a build-time error, not a runtime issue. The implementation MUST re-run the mass-update with the exact same template across all 28 pages.
- **An existing page is missing the `<body data-page="...">` attribute**: active-nav state for that page is "none"; the page still renders and navigates correctly. Adding the attribute is a non-blocking polish item.
