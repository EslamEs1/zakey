# Contract: Partner Application Form

## Purpose

The 13-field application on `pages/become-a-partner.html`. Captures partner-program intake with full client-side validation, accessible error messaging, and a styled success state. **No network request, no backend.**

## DOM contract

```html
<form id="partner-application" class="app-form" data-form-state="idle" novalidate>
  <div class="form-error-summary" role="alert" aria-live="polite" hidden>
    <!-- Populated by JS on failed submit -->
  </div>

  <div class="app-form__grid">
    <fieldset class="app-form__group" data-group="contact">
      <legend>Your contact</legend>
      <!-- Field: partnerType (select) -->
      <div class="form-field" data-field="partnerType">
        <label for="partnerType">Partner type <span class="form-field__req">*</span></label>
        <select id="partnerType" name="partnerType" required aria-describedby="partnerType-error">
          <option value="">Select a partner type</option>
          <option value="distributor">Distributor</option>
          <option value="system-integrator">System Integrator</option>
          <option value="developer">Real Estate Developer</option>
          <option value="installer">Installer</option>
          <option value="interior-designer">Interior Design Office</option>
          <option value="hotel-operator">Hotel & Hospitality Operator</option>
        </select>
        <p class="form-field__error" id="partnerType-error" role="alert" hidden></p>
      </div>
      <!-- Field: fullName, company, country, city, email, phone, website -->
    </fieldset>

    <fieldset class="app-form__group" data-group="business">
      <legend>Your business</legend>
      <!-- Field: businessType, projectVolume, interestedSolutions -->
    </fieldset>

    <fieldset class="app-form__group" data-group="project">
      <legend>Your project</legend>
      <!-- Field: message -->
      <div class="form-field form-field--consent" data-field="consent">
        <input type="checkbox" id="consent" name="consent" required>
        <label for="consent">I agree to be contacted by Zakey about my application and acknowledge the <a href="privacy.html">Privacy notice</a>.</label>
        <p class="form-field__error" id="consent-error" role="alert" hidden></p>
      </div>
    </fieldset>
  </div>

  <button type="submit" class="btn btn--primary">Submit Application</button>
</form>

<section class="app-success" data-form-success hidden aria-live="polite">
  <h2>Application Received</h2>
  <p>Thank you. The Zakey partner team will review your application within 3 business days. We'll reach out via the email or phone you provided.</p>
  <div class="app-success__cta">
    <a href="partners.html" class="btn btn--ghost">← Back to Partners</a>
    <button type="button" class="btn btn--ghost" data-edit-application>Edit & resubmit</button>
  </div>
</section>
```

## State contract

**Form state** (`data-form-state`): one of `idle | submitting | success`.

**Per-field state**: each `.form-field` carries `data-field-state` of `untouched | valid | invalid`. The `<input>` / `<select>` / `<textarea>` carries `aria-invalid="true"` iff state is `invalid`. The matching `.form-field__error` is unhidden iff state is `invalid`.

**State transitions** (see also `data-model.md` § 8):

- **idle → submitting**: triggered by submit. JS validates synchronously. If all valid, transition to `submitting`, set `pointer-events: none` and `opacity: 0.6` on the form (via CSS attr selector), wait 300–600 ms (real-feel artificial delay), then advance.
- **submitting → success**: hide the `<form>` (`hidden=""`), unhide the `<section data-form-success>`, set `window.location.hash = 'application-received'`, scroll the success section into view.
- **idle → has-errors (implied)**: on failed submit, the form stays in `idle` (no separate state) but at least one field has `data-field-state="invalid"`. Focus moves to the first invalid field. The `.form-error-summary` is populated with the count of errors and unhidden.
- **success → idle**: click on `[data-edit-application]`. Hide success section, unhide form, clear `window.location.hash`.

## Validation rules

Per field, summary (full table in `data-model.md` § 8):

- **Required fields**: any of `partnerType`, `fullName`, `company`, `country`, `city`, `email`, `phone`, `businessType`, `projectVolume`, `interestedSolutions`, `consent`. Empty → invalid with message **"This field is required"**.
- **`email`**: must match `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`. Otherwise message **"Please enter a valid email address"**.
- **`phone`**: after stripping `+`, spaces, hyphens, parentheses, must have ≥ 7 digits. Otherwise message **"Please enter a valid phone or WhatsApp number"**.
- **`website`** (optional): if non-empty, must start with `http://` or `https://` and contain a dot in the hostname. Otherwise **"Please enter a full URL starting with http:// or https://"**.
- **`message`** (optional): soft cap at 2000 characters. A live counter ("X / 2000") is shown next to the textarea; submission is NOT blocked at the cap, but typing beyond 2000 stops adding characters.
- **`interestedSolutions`**: at least one checkbox must be checked.

## Behavior contract

- **On focus into a field**: no state change.
- **On blur out of a touched required field that's empty**: state → `invalid`.
- **On blur out of a touched format-validated field with invalid content**: state → `invalid`.
- **On blur out of a touched field that's valid**: state → `valid` (success affordance — green check or accent color).
- **On submit**:
  1. Prevent default.
  2. Run synchronous validation on every field.
  3. If any invalid: populate `.form-error-summary` with `"Found <N> error(s). Please fix to continue."`, unhide the summary, focus the first invalid field's input, scroll the summary into view if needed. Do not advance state.
  4. If all valid: transition to `submitting`, wait, transition to `success`.
- **On `[data-edit-application]` click in success state**: transition back to `idle`, hide success section, unhide form, clear `window.location.hash`, return focus to the form's submit button (or the first field — implementer's choice).
- **Keyboard**: every form control reachable via Tab; Tab order matches DOM order; Enter on a non-textarea field submits the form (native behavior); Enter inside the textarea inserts a newline.
- **Screen reader**: `aria-invalid` on inputs, `role="alert"` on each `.form-field__error` and on the summary, `aria-live="polite"` on the summary so announcement isn't disruptive but is still read.
- **Reduced motion**: the artificial submitting delay is reduced to 100 ms; transitions on focus/error/success affordances are removed.

## Failure modes

- **No JS**: the form's default `action="#"` causes a non-functional submit; the page does not advance to success but renders fully. The visitor can still read every field. (Documented degradation.)
- **All required fields empty, submit pressed**: the form does not advance; every required field is marked invalid; the summary reads "Found 11 error(s)…"; focus moves to the first field.
- **Visitor pastes 5000 characters into message**: the textarea hard-caps at 2000 on `input` event; the live counter remains at "2000 / 2000".
