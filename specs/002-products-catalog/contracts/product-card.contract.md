# Contract — Product Card

**Scope**: The `.card-product` component. Shared between the catalog grid (`pages/products.html`), the homepage "Featured Products" section (Phase 01), and the "Related Products" sections on detail pages.

## Markup shape

```html
<article class="card-product" id="product-zakey-aura-panel"
         data-product
         data-category="central-control"
         data-tags="panel touch wall hub aura premium">
  <div class="card-product__visual">
    <img src="../assets/images/products/zakey-aura-panel.svg"
         alt="Zakey Aura Panel — premium wall-mounted control panel"
         width="400" height="300"
         loading="lazy" decoding="async">
  </div>
  <div class="card-product__body">
    <p class="card-product__category eyebrow">Central Control</p>
    <h3 class="card-product__name">Zakey Aura Panel</h3>
    <p class="card-product__desc">
      A capacitive-touch wall panel with ambient light sensing and haptic
      feedback — your home's central command, in a glass surface.
    </p>
    <ul class="card-product__tags" aria-label="Key features">
      <li class="card-product__tag">Touch glass</li>
      <li class="card-product__tag">Voice ready</li>
      <li class="card-product__tag">PoE / AC</li>
    </ul>
    <div class="card-product__ctas">
      <a class="card-product__cta--details btn btn--ghost"
         href="./product-zakey-aura-panel.html">
        View Details &rarr;
      </a>
      <a class="card-product__cta--quote btn btn--primary"
         href="../index.html#get-quote">
        Request Quote
      </a>
    </div>
  </div>
</article>
```

## Required attributes

| Attribute | Required | Purpose |
|---|---|---|
| `id="product-<slug>"` | yes | Anchor target for deep links from anywhere on the site |
| `data-product` | yes | Identifies the element to `js/products.js`'s filter |
| `data-category="<slug>"` | yes | Filter logic input; must be one of the 10 closed-set Category slugs |
| `data-tags="t1 t2 t3 …"` | yes | Search synonym pool; space-separated lowercase tokens |

## Required visible content

| Element | Required | Constraint |
|---|---|---|
| `<img>` in `.card-product__visual` | yes | `src` resolves; `alt` is descriptive; `loading="lazy"` for cards 7+ on catalog page; `width`/`height` set to avoid CLS |
| `.card-product__category` eyebrow | yes | Category display name (Title Case) |
| `.card-product__name` (`<h3>`) | yes | Product name; starts with "Zakey" |
| `.card-product__desc` | yes | 60–140 chars; complete sentences |
| `.card-product__tags > li` | yes, **exactly 3** | Each ≤ 20 chars |
| `.card-product__cta--details` | yes | Resolves to detail page (flagship) or anchor (`#product-<slug>`) for the same page |
| `.card-product__cta--quote` | yes | Always resolves to the homepage quote anchor |

## Behaviour

- The card is **passive HTML**. JS does not bind any event listeners directly to `.card-product`. JS only toggles `.is-hidden` on the root.
- `.is-hidden` is defined as `display: none` in `src/input.css` and is the single side-effect of catalog filtering.
- Hover state is CSS-only: `transform: translateY(-4px)` + accent border + elevated shadow. No JS.

## Accessibility

- The card root is an `<article>` so screen readers announce it as a discrete piece of content.
- `aria-label="Key features"` on the tags list improves screen-reader summary.
- Two distinct CTAs with distinct visible labels — the "Details" CTA uses `→` to signal navigation; the "Quote" CTA uses no arrow to signal action.
- The image always has descriptive `alt`; never `alt=""` on a product card.

## Acceptance probe

- [ ] Hover any card → elevation transitions in ≤ 200 ms; pointer cursor on both CTAs.
- [ ] Inspect any card → `data-product`, `data-category`, `data-tags` are all present.
- [ ] Inspect any card → exactly 3 `.card-product__tag` children.
- [ ] Click "View Details" on a card with a detail page → navigates to that page.
- [ ] Click "View Details" on a card *without* a Phase-02 detail page → scrolls to that card's anchor on the catalog (or stays in place if already on the catalog).
- [ ] Click "Request Quote" → navigates to `../index.html#get-quote`.
