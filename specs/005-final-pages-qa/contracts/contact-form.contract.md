# UI Contract: Contact Page Main Quote Form

**Feature**: `005-final-pages-qa` | **Phase**: 1 (Design)

## Form skeleton

```html
<section id="quote-form" class="quote-form-section">
  <form id="contact-form" class="quote-form" data-form-state="idle" novalidate>
    <div class="form-error-summary" role="alert" aria-live="polite" hidden></div>

    <div class="quote-form__grid">
      <fieldset class="quote-form__group">
        <legend>About You</legend>
        <!-- fields: role, fullName, company, email, phone -->
      </fieldset>

      <fieldset class="quote-form__group">
        <legend>Location</legend>
        <!-- fields: country, city -->
      </fieldset>

      <fieldset class="quote-form__group">
        <legend>Your Project</legend>
        <!-- fields: projectType, projectSize, interestedSolutions, budgetRange, timeline, message -->
      </fieldset>

      <div class="quote-form__consent">
        <!-- field: consent -->
      </div>
    </div>

    <button type="submit" class="btn btn--primary quote-form__submit">Request a Quote</button>
  </form>
</section>

<section class="quote-success" data-form-success hidden aria-live="polite">
  <div class="quote-success__card">
    <h2 tabindex="-1">Quote Request Received</h2>
    <p>Thanks for reaching out — a Zakey specialist will respond within 3 business days via the email or phone number you provided. In the meantime, you can browse our case studies or partner program.</p>
    <div class="quote-success__cta">
      <a class="btn btn--ghost" href="../index.html">← Back to Home</a>
      <a class="btn btn--ghost" href="projects.html">Browse Projects</a>
      <button type="button" class="btn btn--ghost" data-edit-application>Edit & Resubmit</button>
    </div>
  </div>
</section>
```

## Field component pattern

Same `.form-field` wrapper as Phase 04, e.g.:

```html
<div class="form-field" data-field="email">
  <label class="form-field__label" for="email">Email <span class="form-field__req">*</span></label>
  <input id="email" name="email" type="email"
         autocomplete="email" required
         aria-describedby="email-error">
  <p class="form-field__error" id="email-error" role="alert" hidden></p>
</div>
```

## State machine

`<form data-form-state="...">` — values: `idle`, `submitting`, `success`.

- `idle` (initial): all fields editable, no per-field error displayed (unless a touched field has been revalidated on blur).
- `submitting`: form opacity 0.6, submit button disabled, pointer-events none. Reached when a valid submit fires; held for 400 ms (or 100 ms under `prefers-reduced-motion`).
- `success`: form section `hidden`, `[data-form-success]` unhidden, focus moves to success H2, `window.location.hash = 'quote-received'`.

## Validation behavior

Identical to Phase 04 Become-a-Partner:
- On each control's **first focus**, mark it as `touched` (in a `WeakSet`).
- On `blur`, if `touched`, run that field's validator chain; set `data-field-state="valid|invalid"` on the wrapping `.form-field`; toggle `aria-invalid` on the control; show/hide the matching `.form-field__error`.
- On **submit**: run every field's validator chain. If any fail, populate `.form-error-summary` with "Found N error(s). Please fix to continue." (singular when N=1), unhide it, move focus to the first invalid control, scroll the summary into view if not already visible. Stay on `idle`.
- If submit is valid: transition `idle → submitting`, await 400 ms (or 100 ms under reduced-motion), transition `submitting → success`.

## Per-field validator chains

| Field | Validators |
|---|---|
| role | required, select-default |
| fullName | required |
| company | required |
| email | required, email |
| phone | required, phone |
| country | required, select-default |
| city | required |
| projectType | required, select-default |
| projectSize | required, select-default |
| interestedSolutions | required (checkbox-group-min-1) |
| budgetRange | (none — optional) |
| timeline | required, select-default |
| message | required |
| consent | required (consent-checked) |

## Message textarea counter

```html
<div class="form-field" data-field="message">
  <label class="form-field__label" for="message">Tell us about your project <span class="form-field__req">*</span></label>
  <textarea id="message" name="message" rows="5" maxlength="2000" required
            aria-describedby="message-counter message-error"></textarea>
  <p class="form-field__counter" id="message-counter">0 / 2000</p>
  <p class="form-field__error" id="message-error" role="alert" hidden></p>
</div>
```

JS updates `#message-counter` on every `input` event. The soft cap is 2000 chars (clamped client-side).

## Edit & Resubmit

Same pattern as Phase 04: `[data-edit-application]` click → unhide form section, hide success section, reset hash via `history.replaceState({}, '', window.location.pathname)`, focus the submit button (or the first invalid field if one exists).

## Module size

`js/contact.js` ≤ 6 KB minified — slightly larger than `become-a-partner.js` (~5 KB) because of one extra validator and the message-textarea live counter.

## Accessibility checklist

- Every `<input>`/`<select>`/`<textarea>` has a label.
- Every required field carries `required` and visually shows `*`.
- Every error message is in a `<p role="alert">` that is `aria-describedby`-linked from the control.
- The error summary is `role="alert" aria-live="polite"`.
- Focus management on submit: focus shifts to first-invalid on failure, or to success H2 on success.
- Keyboard-only walkthrough works end-to-end.
