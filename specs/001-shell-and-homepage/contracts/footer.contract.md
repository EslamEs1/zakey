# Contract — Site Footer

**Scope**: Duplicated byte-identically across every page.
`scripts/check-shell-consistency.sh` enforces.

## Markup shape

```html
<!-- footer:start -->
<footer class="site-footer">
  <div class="site-footer__inner">

    <div class="site-footer__brand">
      <img src="./assets/icons/zakey-wordmark.svg" alt="" width="140" height="34">
      <p class="site-footer__summary">
        Zakey crafts the premium smart-living layer for villas, hotels,
        offices, and signature homes — hardware, app, scenes, and
        analytics under one elegant ecosystem.
      </p>
      <div class="site-footer__contact">
        <p><a href="mailto:hello@zakey.example">hello@zakey.example</a></p>
        <p><a href="tel:+10000000000">+1 (000) 000-0000</a></p>
        <p>Mon–Sun · 24/7 partner desk</p>
      </div>
    </div>

    <nav class="site-footer__col" aria-label="Products">
      <h2 class="site-footer__heading">Products</h2>
      <ul>
        <li><a href="./pages/products.html">Control Panels</a></li>
        <li><a href="./pages/products.html">Smart Switches</a></li>
        <li><a href="./pages/products.html">Sensors</a></li>
        <li><a href="./pages/products.html">Security</a></li>
        <li><a href="./pages/products.html">Lighting Control</a></li>
        <li><a href="./pages/products.html">Climate</a></li>
        <li><a href="./pages/products.html">Curtains & Shading</a></li>
        <li><a href="./pages/products.html">Energy</a></li>
      </ul>
    </nav>

    <nav class="site-footer__col" aria-label="Solutions">
      <h2 class="site-footer__heading">Solutions</h2>
      <ul>
        <li><a href="./pages/solutions.html">Smart Villa</a></li>
        <li><a href="./pages/solutions.html">Smart Apartment</a></li>
        <li><a href="./pages/solutions.html">Smart Hotel</a></li>
        <li><a href="./pages/solutions.html">Smart Office</a></li>
        <li><a href="./pages/solutions.html">Smart Compound</a></li>
        <li><a href="./pages/solutions.html">Gaming Room</a></li>
      </ul>
    </nav>

    <nav class="site-footer__col" aria-label="Company">
      <h2 class="site-footer__heading">Company</h2>
      <ul>
        <li><a href="./pages/about.html">About</a></li>
        <li><a href="./pages/partners.html">Partners</a></li>
        <li><a href="./pages/projects.html">Projects</a></li>
        <li><a href="./pages/blog.html">Blog</a></li>
        <li><a href="./pages/contact.html">Contact</a></li>
        <li><a href="./pages/privacy.html">Privacy</a></li>
        <li><a href="./pages/terms.html">Terms</a></li>
      </ul>
    </nav>

    <div class="site-footer__col site-footer__connect">
      <h2 class="site-footer__heading">Stay in the loop</h2>
      <form class="newsletter-form" data-state="idle" novalidate>
        …per newsletter-form contract…
      </form>
      <ul class="site-footer__social" aria-label="Social">
        <li><a href="https://www.linkedin.com" aria-label="Zakey on LinkedIn"><svg …linkedin… aria-hidden="true"></svg></a></li>
        <li><a href="https://www.instagram.com" aria-label="Zakey on Instagram"><svg …instagram… aria-hidden="true"></svg></a></li>
        <li><a href="https://www.youtube.com" aria-label="Zakey on YouTube"><svg …youtube… aria-hidden="true"></svg></a></li>
        <li><a href="https://www.x.com" aria-label="Zakey on X"><svg …x… aria-hidden="true"></svg></a></li>
      </ul>
    </div>

  </div>

  <div class="site-footer__base">
    <p class="site-footer__copy">© 2026 Zakey Smart Living. All rights reserved.</p>
    <p class="site-footer__legal">
      <a href="./pages/privacy.html">Privacy</a> ·
      <a href="./pages/terms.html">Terms</a>
    </p>
  </div>
</footer>
<!-- footer:end -->
```

## Layout

- Desktop (≥1025px): 5-column grid — Brand spans 2 cols; Products,
  Solutions, Company, Connect each span 1.
- Tablet (641–1024px): 2-column grid stacked.
- Mobile (≤640px): single column.

## Keyboard / a11y

- Each link column is a `<nav>` with `aria-label`.
- Social icons are `<a>` with `aria-label` and decorative `<svg
  aria-hidden="true">`.

## Acceptance probe

1. `scripts/check-shell-consistency.sh` exits 0 for the footer block
   across `index.html` and the eleven placeholder pages.
2. Footer reflows cleanly at 360 / 768 / 1280 px.
3. Newsletter form submits and shows success state per its own
   contract.
