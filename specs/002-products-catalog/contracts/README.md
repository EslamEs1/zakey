# Phase 02 Contracts

UI contracts for the Phase 02 product catalog and product detail pages. Each file specifies the **markup shape**, **behaviour**, **accessibility requirements**, and **acceptance probe** for one reusable component. These contracts extend the Phase 01 contract set under `specs/001-shell-and-homepage/contracts/` — the header, footer, mega-menu, mobile drawer, design tokens, quote form, and image placeholder contracts continue to apply unchanged.

Files in this directory:

| File | Component | Where it lives |
|---|---|---|
| `catalog-page.contract.md` | Overall structure of `pages/products.html` | One page |
| `product-card.contract.md` | `.card-product` shared between catalog and "Related Products" | Multiple pages |
| `filter-pill.contract.md` | `.filter-pill` toolbar of category toggles | Catalog page only |
| `product-search.contract.md` | `.catalog-search` input + live count + empty state | Catalog page only |
| `product-detail-page.contract.md` | Overall structure of every product detail page | 4+ pages |
| `gallery-thumbnails.contract.md` | `.product-hero__thumbs` (optional, US4 P3) | Detail pages |

Phase 01 contracts that remain authoritative for Phase 02:
- `header.contract.md`, `footer.contract.md`, `mega-menu.contract.md`, `mobile-drawer.contract.md` — the shell is unchanged.
- `design-tokens.contract.md` — every new Phase-02 component class is built on these tokens.
- `quote-form.contract.md` — Phase 02 only links to it via the hash anchor; does not duplicate it.
- `image-placeholder.contract.md` — new product SVGs follow the same convention.
