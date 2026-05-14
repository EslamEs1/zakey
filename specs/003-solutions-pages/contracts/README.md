# Phase 03 — UI Contracts

This directory specifies the contract each Phase 03 component and page MUST satisfy. The contracts are the source of truth for:

- HTML class names, attribute names, and ARIA roles
- Required markup structure (nesting and order)
- JS module entry points and behaviour
- Acceptance probes (the "did I implement this right?" checklist)

Every contract describes a single artefact. A contributor implementing a Phase 03 task reads one contract, writes the matching code, and runs the acceptance probe.

## Contract inventory

| Contract | Artefact | Used by |
|---|---|---|
| [solutions-overview-page.contract.md](./solutions-overview-page.contract.md) | The `pages/solutions.html` page shape and behaviour | US1, US4 |
| [solution-detail-page.contract.md](./solution-detail-page.contract.md) | The nine-section detail-page template | US2, US3, US5 |
| [solution-card.contract.md](./solution-card.contract.md) | The overview-page card component | US1 |
| [category-filter.contract.md](./category-filter.contract.md) | The category-pill toolbar + filter JS | US1, US4 |
| [topology-diagram.contract.md](./topology-diagram.contract.md) | The "How It Connects" inline SVG | US3 |

## Conventions

- All contracts assume the Phase 01 header/footer shell is pasted byte-identically. Shell consistency is enforced by `scripts/check-shell-consistency.sh` and is non-negotiable.
- All contracts assume the Phase 01 design tokens (`--color-*`, `--space-*`, etc.) and Phase 02 component classes (`.btn`, `.card-product`, `.filter-pill`, `.product-scenarios`, `.product-features__card`) are available — Phase 03 extends rather than replaces.
- Markup snippets are illustrative; real authoring may add small amounts of whitespace or attribute order for readability. The acceptance probe is the binding test.
- Every page's `<body>` carries `data-page="solutions"` (overview) or `data-page="solution-detail"` (detail pages) so future scripts and analytics can identify the page type.
