# Contract: Pillar Card (shared by Technology & Software pages)

## Purpose

A single, reusable presentation unit for one TechnologyPillar or SoftwarePillar. Same DOM shape, different content per page.

## DOM contract

```html
<section class="pillar" id="<pillar-id>" data-pillar="<pillar-id>">
  <div class="pillar-card">
    <div class="pillar-card__visual">
      <img src="<path>" alt="<descriptive alt>" loading="lazy">
      <!-- OR an inline <svg> with aria-label -->
    </div>
    <div class="pillar-card__body">
      <p class="pillar-card__eyebrow">Pillar <N></p>  <!-- optional -->
      <h2 class="pillar-card__title"><displayName></h2>
      <p class="pillar-card__positioning"><positioningSentence></p>
      <div class="pillar-card__copy"><p>...</p><p>...</p></div>
      <ul class="pillar-card__bullets">
        <li>capability bullet 1</li>
        <li>capability bullet 2</li>
        <!-- 4–6 for Technology, 3–5 for Software -->
      </ul>
      <a class="btn btn--ghost pillar-card__cta" href="...">Outgoing CTA</a>
    </div>
  </div>
</section>
```

## State contract

- No JS state on this component. The container `<section>` is statically rendered.
- An optional `[aria-current="true"]` MAY be set by the scroll-spy module on the matching anchor in the page's `pillar-nav`; the section itself does not change.

## Style contract

- Uses the new `.pillar-card` family (Phase 04 addition).
- The visual sits inside `.pillar-card__visual` which has the `.diagram-frame` premium-dark surface treatment.
- On Software page, alternating pillars flip the visual to the right via the `:nth-child(even) .pillar-card { direction: rtl; }` pattern OR a `data-flip="true"` attribute — implementation chooses; the contract only requires that the alternation is visible on desktop and degrades gracefully on mobile.
- On mobile (< 768 px), the visual stacks above the body for every pillar.

## Behavior contract

- Pure presentation. Keyboard focus enters the section via tab order on the inner CTA only (visual and copy are not focusable).
- Reduced-motion: no hover or scroll animations on this component (the optional reveal-on-scroll opt-in from the homepage bug-fix pass MAY apply, but only on the visual, not on text).

## Failure modes

- **Image fails to load**: alt text conveys the diagram's content.
- **Body copy is short**: section still renders cleanly with no broken padding.
