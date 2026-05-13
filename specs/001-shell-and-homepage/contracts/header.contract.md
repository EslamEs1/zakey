# Contract — Site Header

**Scope**: The header is duplicated byte-identically across every
`.html` page. `scripts/check-shell-consistency.sh` hashes the block
between the markers and fails on divergence.

## Markup shape

```html
<!-- header:start -->
<header class="site-header" data-scrolled="false">
  <div class="site-header__inner">
    <a class="site-header__brand" href="./index.html" aria-label="Zakey — Home">
      <img class="site-header__wordmark"
           src="./assets/icons/zakey-wordmark.svg"
           alt=""
           width="120" height="28" />
    </a>

    <nav class="site-header__nav" aria-label="Primary">
      <ul class="site-header__list">
        <li><a href="./index.html">Home</a></li>
        <li class="has-mega">
          <button type="button"
                  class="site-header__megabtn"
                  aria-expanded="false"
                  aria-controls="mega-products">
            Products <svg …caret-icon… aria-hidden="true"></svg>
          </button>
          <div id="mega-products" class="mega-panel" role="region" aria-label="Products" hidden>
            …mega-menu content per mega-menu contract…
          </div>
        </li>
        <li class="has-mega">
          <button type="button"
                  class="site-header__megabtn"
                  aria-expanded="false"
                  aria-controls="mega-solutions">
            Solutions <svg …caret-icon… aria-hidden="true"></svg>
          </button>
          <div id="mega-solutions" class="mega-panel" role="region" aria-label="Solutions" hidden>
            …mega-menu content per mega-menu contract…
          </div>
        </li>
        <li><a href="./pages/technology.html">Technology</a></li>
        <li><a href="./pages/software.html">Software</a></li>
        <li><a href="./pages/partners.html">Partners</a></li>
        <li><a href="./pages/projects.html">Projects</a></li>
        <li><a href="./pages/blog.html">Blog</a></li>
        <li><a href="./pages/about.html">About</a></li>
        <li><a href="./pages/contact.html">Contact</a></li>
      </ul>
    </nav>

    <a class="btn btn--primary site-header__cta" href="./index.html#get-quote">
      Get a Quote
    </a>

    <button type="button"
            class="site-header__hamburger"
            aria-expanded="false"
            aria-controls="mobile-drawer"
            aria-label="Open menu">
      <svg …menu-icon… aria-hidden="true"></svg>
    </button>
  </div>
</header>

<aside id="mobile-drawer" class="mobile-drawer" data-state="closed" aria-hidden="true">
  …mobile-drawer content per mobile-drawer contract…
</aside>
<!-- header:end -->
```

> **Page-relative paths**: The example above shows the homepage form.
> On pages under `pages/`, paths become `../index.html`,
> `../assets/icons/zakey-wordmark.svg`, `./contact.html`, etc.
> `scripts/check-shell-consistency.sh` normalises path prefixes
> before hashing so the marker block can differ only in path depth.

## State

| `data-scrolled` on `.site-header` | Background | Trigger |
|---|---|---|
| `"false"` | transparent | `window.scrollY < hero.bottom` |
| `"true"` | glass (`bg-bg-deep/65` + `backdrop-blur-xl`) | scrolled past hero |

The state is toggled by `js/main.js` via an `IntersectionObserver` on
the hero element (or `scrollY > 80` on non-homepage pages).

## Keyboard contract

- Tab order: brand → each top-level link/button in order → CTA →
  hamburger.
- `Enter` / `Space` on a `.site-header__megabtn` toggles its mega
  panel.
- `Escape` closes any open mega panel and returns focus to the
  triggering button.
- `Tab` from inside an open mega panel cycles within the panel; once
  past the last item, focus exits the panel back to the next nav
  item.
- All visible focus rings use `box-shadow: 0 0 0 3px var(--color-accent-soft)`.

## Acceptance probe

1. Open `index.html`, `pages/products.html`, and `pages/about.html`.
   `scripts/check-shell-consistency.sh` exits 0.
2. Scroll past the hero — header background transitions to glass
   within 200 ms.
3. Tab through the header — every interactive element has a visible
   focus ring; Tab order matches the markup order.
