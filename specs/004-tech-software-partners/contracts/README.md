# Phase 04 — UI Contracts

These contracts define the **observable shape** every Phase 04 component and page must satisfy. They are the testable interface between the spec and the implementation: any implementation that satisfies these contracts satisfies the spec.

Each contract is structured as:

- **Purpose** — what the component/page does
- **DOM contract** — required structure, attributes, roles
- **State contract** — what state changes are allowed and how they are exposed
- **Style contract** — which existing tokens and component families are used
- **Behavior contract** — keyboard, mouse, screen-reader, reduced-motion
- **Failure modes** — what MUST still work if JS fails

## Page contracts

- [technology-page.contract.md](./technology-page.contract.md)
- [software-page.contract.md](./software-page.contract.md)
- [partners-page.contract.md](./partners-page.contract.md)
- [become-a-partner-page.contract.md](./become-a-partner-page.contract.md)

## Component / system contracts

- [pillar-card.contract.md](./pillar-card.contract.md) — shared by Technology and Software pages
- [faq-accordion.contract.md](./faq-accordion.contract.md) — Partners page
- [partner-application-form.contract.md](./partner-application-form.contract.md) — Become a Partner page
- [nav-expansion.contract.md](./nav-expansion.contract.md) — site-wide header/footer mass update
