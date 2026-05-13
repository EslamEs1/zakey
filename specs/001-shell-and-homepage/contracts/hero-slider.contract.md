# Contract — Featured Product Slider

**Scope**: The "Featured Products Slider" section directly below the
hero. Cycles four `FeaturedProductHighlight` entries (E-04).

## Markup shape

```html
<section class="featured-slider"
         data-state="idle"
         data-active-index="0"
         aria-roledescription="carousel"
         aria-label="Featured Zakey products">
  <header class="section-head">
    <p class="eyebrow">Featured</p>
    <h2>Designed for the home of tomorrow</h2>
  </header>

  <div class="featured-slider__viewport" data-slider-viewport>
    <ol class="featured-slider__track" aria-live="polite">
      <li class="featured-slide"
          role="group"
          aria-roledescription="slide"
          aria-label="1 of 4: Zakey Aura Panel"
          data-slide-index="0">
        <article class="featured-slide__card">
          <div class="featured-slide__visual">
            <img src="./assets/images/products/zakey-aura-panel.jpg"
                 alt="Zakey Aura Panel mounted on a textured wall, glowing softly"
                 width="1280" height="720">
          </div>
          <div class="featured-slide__body">
            <p class="eyebrow">Control Panels</p>
            <h3>Zakey Aura Panel</h3>
            <p class="featured-slide__tagline">Glass-finish wall command for every room.</p>
            <p class="featured-slide__desc">…≤30 words…</p>
            <a class="btn btn--primary" href="./pages/products.html#aura-panel">Explore Aura Panel</a>
          </div>
        </article>
      </li>
      …three more slides…
    </ol>
  </div>

  <div class="featured-slider__controls">
    <button type="button"
            class="featured-slider__prev"
            data-slider-prev
            aria-label="Previous featured product">
      <svg …chevron-left… aria-hidden="true"></svg>
    </button>

    <ol class="featured-slider__dots" role="tablist" aria-label="Choose featured product">
      <li><button type="button" role="tab" aria-selected="true"  aria-controls="featured-slide-0" data-slider-dot="0">1</button></li>
      <li><button type="button" role="tab" aria-selected="false" aria-controls="featured-slide-1" data-slider-dot="1">2</button></li>
      <li><button type="button" role="tab" aria-selected="false" aria-controls="featured-slide-2" data-slider-dot="2">3</button></li>
      <li><button type="button" role="tab" aria-selected="false" aria-controls="featured-slide-3" data-slider-dot="3">4</button></li>
    </ol>

    <button type="button"
            class="featured-slider__next"
            data-slider-next
            aria-label="Next featured product">
      <svg …chevron-right… aria-hidden="true"></svg>
    </button>
  </div>
</section>
```

> All four slide markup blocks ship in static HTML at file load.
> JavaScript only manipulates `data-active-index` and `aria-selected`
> / scroll position — never `innerHTML`.

## State

| `data-state` | Meaning |
|---|---|
| `"idle"` | Default. Auto-advance running (unless reduced motion). |
| `"interacting"` | User hovered/focused/touched in the last 4 s. Auto-advance paused. |

`data-active-index` ∈ `{0, 1, 2, 3}` tracks the active slide.
`aria-selected` on the dot buttons mirrors active index.

## Behaviour

| Event | Result |
|---|---|
| Click `[data-slider-next]` | active index → `(i + 1) mod 4` |
| Click `[data-slider-prev]` | active index → `(i - 1 + 4) mod 4` |
| Click `[data-slider-dot="N"]` | active index → N |
| `ArrowRight` / `ArrowLeft` while focus is on dot or control | as next / prev |
| `Home` / `End` while focus is on dot | go to first / last |
| Mouse hover on viewport | `data-state="interacting"` for 4 s |
| Pointer/focus leaves viewport | revert to `"idle"` after 4 s |
| Touch swipe (native scroll-snap) | active index follows visible slide |
| Auto-advance (`idle` only, no reduced motion) | step forward every 6 s |
| `prefers-reduced-motion: reduce` | auto-advance disabled; scroll behaviour set to `auto` |

## Visual transitions

The viewport uses `scroll-snap-type: x mandatory` and the track is
`display: flex`. JS sets `viewport.scrollLeft = slide.offsetLeft` —
CSS smooth-scroll handles the transition.

## Acceptance probe

1. With JS disabled: first slide is visible; user can scroll
   horizontally with touch to see all 4. (Graceful degradation per
   Constitution Principle II.)
2. With JS enabled and motion allowed: auto-advance cycles through
   all 4 slides every 6 s; pause on hover; resume after 4 s of no
   interaction.
3. Keyboard: Tab into prev/dot/next; arrow keys cycle slides; visible
   focus ring on every control.
4. Reduced motion: auto-advance off; user can still navigate via
   buttons and dots; visual transitions are near-instant.
5. `aria-label` on each slide reads "N of 4: <name>" for screen
   readers.
