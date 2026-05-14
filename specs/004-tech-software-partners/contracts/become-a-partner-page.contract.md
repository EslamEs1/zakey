# Contract: Become a Partner Page (`pages/become-a-partner.html`)

## Purpose

Capture qualified partner-program applications via a 13-field static-frontend form with full client-side validation and a styled success state. No backend; no network request.

## DOM contract

- `<body data-page="become-a-partner">` is required.
- Required DOM order inside `<main id="content">`:

  1. `<section class="app-hero">`:
     - `<h1>` (e.g., "Apply to Partner with Zakey").
     - 2–3 short paragraphs explaining what happens after submission, the response SLA, and the contact channel.
     - No CTA buttons in the hero (the primary action is the form itself).
  2. `<section class="app-form-section">` containing:
     - `<form id="partner-application" class="app-form" data-form-state="idle" novalidate>`.
     - The form's 13 fields per [partner-application-form.contract.md](./partner-application-form.contract.md), in the exact order from `data-model.md` § 8.
     - A `<button type="submit" class="btn btn--primary">` labelled "Submit Application".
     - An inline help link to `pages/privacy.html` adjacent to the consent checkbox.
  3. `<section class="app-success" data-form-success hidden aria-live="polite">`:
     - Styled success heading (e.g., "Application Received").
     - 1–2 short paragraphs describing next steps and SLA.
     - "Edit & resubmit" link that returns the form to `idle` and unhides the form section.
     - "Back to Partners" link → `pages/partners.html`.

## State contract

The `<form>` carries `data-form-state` with one of: `idle | submitting | success`. The "has-errors" state is **not** a separate `data-form-state` value — it is implied by the presence of `aria-invalid="true"` on any field. See [partner-application-form.contract.md](./partner-application-form.contract.md) for full state details.

## Style contract

- Uses the existing form-control styles from the Phase 01 quote form as the baseline; Phase 04 introduces additional patterns: `.form-field` (idle/focus/error/success), `.app-form__grid` (responsive 2-column layout), `.form-error-summary` (top-of-form summary), `.app-success` (styled success card with subtle gradient).
- Single-column on mobile (≤ 640 px); 2-column on tablet (641–1023 px) for short fields like Name/Company, Email/Phone; optimized layout on desktop (≥ 1024 px) with logical groupings (Contact / Business / Project) as visual sub-headings.

## Behavior contract

See [partner-application-form.contract.md](./partner-application-form.contract.md). Summary:

- Submit-time + on-blur (post-touch) validation per [research.md R-09](../research.md).
- First invalid field is focused on failed submit; an `aria-live="polite"` summary announces "<N> errors. Please fix to continue."
- On valid submit, the form transitions through `submitting` (300–600 ms) into `success`. The URL hash becomes `#application-received`. The form section is hidden (`hidden` attribute). The success section's `hidden` attribute is removed.
- "Edit & resubmit" reverses the transition and removes the URL hash.

## Failure modes

- **No JS**: the form's default `action="#"` causes a no-op submit; the form does not advance to the success state, but the page renders fully and the visitor can still read every field. (We document this as a known degradation. A future phase MAY add a `<noscript>` notice with an email contact link.)
- **All fields filled with invalid content**: every invalid field is marked, focus moves to the first one, no submission happens.
- **Visitor closes the tab on the success state, opens it again**: the URL hash `#application-received` survives; on reload, the page detects the hash and skips to the success state. (Optional — the implementation MAY choose to always start at `idle`; the contract does not require hash-resume.)
