# UI Contract: Privacy & Terms Pages

**Feature**: `005-final-pages-qa` | **Phase**: 1 (Design)

Both `pages/privacy.html` and `pages/terms.html` share a single component family `.legal-page`.

## Page-level requirements

- `<body data-page="privacy">` or `<body data-page="terms">`.
- `<title>Privacy Policy — Zakey Smart Living</title>` or `<title>Terms of Service — Zakey Smart Living</title>`.
- One `<h1>` per page (in `.legal-page__hero`).
- All section headings are H2 with `id="section-N"`.
- Body copy in plain language (no legalese, no Latin, no "the Party of the First Part").
- A "Last updated: 2026-05-14" line in the hero.
- A bottom CTA: "Questions about this policy? [Contact us](contact.html)."

## DOM shape

```html
<main id="content" class="legal-page">
  <section class="legal-page__hero">
    <p class="legal-page__eyebrow">Legal</p>
    <h1>Privacy Policy</h1>
    <p class="legal-page__updated">Last updated: 14 May 2026</p>
    <p class="legal-page__lead">This Privacy Policy explains what information Zakey collects through this website, how we use it, and your choices. We aim to keep this short, clear, and free of legalese.</p>
  </section>

  <aside class="legal-page__toc" aria-label="Sections">
    <h2 class="legal-page__toc-heading">In this policy</h2>
    <ol>
      <li><a href="#section-1">What we collect</a></li>
      <li><a href="#section-2">How we use it</a></li>
      <li><a href="#section-3">Cookies & tracking</a></li>
      <li><a href="#section-4">Sharing with third parties</a></li>
      <li><a href="#section-5">Your rights & choices</a></li>
      <li><a href="#section-6">Contact us about privacy</a></li>
    </ol>
  </aside>

  <article class="legal-page__body">
    <section id="section-1">
      <h2>1. What we collect</h2>
      <p>...</p>
    </section>
    <section id="section-2">
      <h2>2. How we use it</h2>
      <p>...</p>
    </section>
    <!-- ... -->
  </article>

  <section class="legal-page__cta">
    <h2>Questions about this policy?</h2>
    <p>Reach out to us at any time — we'll respond within 3 business days.</p>
    <a class="btn btn--primary" href="contact.html">Contact Zakey</a>
  </section>
</main>
```

## Privacy page sections (minimum 6)

1. **What we collect** — name, contact info, project info; mention what we collect via forms vs. via standard server logs.
2. **How we use it** — to respond to inquiries, to send requested information, to improve the site; explicitly not for selling.
3. **Cookies and tracking** — what we use (locally-stored theme preference, optional anonymous analytics if added later), how to opt out.
4. **Sharing with third parties** — only when needed to respond (e.g., authorized partners or integrators on a project); never sold.
5. **Your rights & choices** — request access, request deletion, opt out of communications; brief reference to GDPR/CCPA-style rights without claiming compliance.
6. **Contact us about privacy** — a dedicated email address (privacy@zakey.tech).

## Terms page sections (minimum 6)

1. **Acceptance of terms** — by using the site you accept these terms.
2. **Acceptable use** — no scraping, no abuse, no impersonation.
3. **Intellectual property** — Zakey brand, copy, images are owned by Zakey; references to third-party brands are nominal.
4. **Limitations of liability** — site information is provided "as is" without warranty; not legal/professional advice.
5. **Governing law and dispute resolution** — jurisdiction placeholder (e.g., "the country in which Zakey is established at the time of dispute"); informal-then-formal resolution path.
6. **Changes to these terms** — we may update; significant changes will be reflected in the "Last updated" date.
7. **Contacting us** — a dedicated email (legal@zakey.tech).

## CSS component family

- `.legal-page` — the `<main>` wrapper; provides the layout grid (TOC on left at `≥ 1024 px`, stacked below).
- `.legal-page__hero`, `.legal-page__eyebrow`, `.legal-page__updated`, `.legal-page__lead`.
- `.legal-page__toc`, `.legal-page__toc-heading`.
- `.legal-page__body` — reuses much of the `.article-body` typography but with tighter spacing.
- `.legal-page__cta`.

## Plain-language commitment

The text MUST be readable at a 4th-grade reading level. No "hereinafter referred to as", no "without limitation", no "notwithstanding the foregoing". Real, human, plain-English copy.

## No legal claim

A small footnote at the bottom of each legal page MUST read: "This page is provided for general information and does not constitute legal advice. For specific questions, please contact us or consult a qualified attorney." This is not boilerplate — it is the honest disclaimer matching the spec's "no need for legal perfection" stance.
