# Contract — Quote Form

**Scope**: The form inside the homepage `#get-quote` section. Fully
static HTML; `js/forms.js` drives the state machine via
`data-state="…"` attributes. No backend.

## Markup shape (abridged)

```html
<section id="get-quote" class="quote-section">
  <header class="section-head">
    <p class="eyebrow">Get in touch</p>
    <h2>Tell us about your project</h2>
    <p>We respond within one business day.</p>
  </header>

  <form id="quote-form"
        class="quote-form"
        data-state="idle"
        novalidate
        aria-describedby="quote-privacy">
    <fieldset class="field field--radio-group" data-required="true">
      <legend>I am a…</legend>
      <label><input type="radio" name="iAmA" value="distributor"> Distributor</label>
      <label><input type="radio" name="iAmA" value="integrator"> System Integrator</label>
      <label><input type="radio" name="iAmA" value="developer">  Real Estate Developer</label>
      <label><input type="radio" name="iAmA" value="end-user">   End User</label>
      <label><input type="radio" name="iAmA" value="installer">  Installer</label>
      <p class="field__error" data-error-for="iAmA">Please choose one option.</p>
    </fieldset>

    <div class="quote-form__row">
      <label class="field" data-required="true">
        <span class="field__label">Full name</span>
        <input type="text" name="name" autocomplete="name" minlength="2" required>
        <p class="field__error" data-error-for="name">Please enter your full name.</p>
      </label>

      <label class="field" data-required-conditionally="iAmA!=end-user">
        <span class="field__label">Company</span>
        <input type="text" name="company" autocomplete="organization">
        <p class="field__error" data-error-for="company">Please add your company.</p>
      </label>
    </div>

    <div class="quote-form__row">
      <label class="field" data-required="true">
        <span class="field__label">Work email</span>
        <input type="email" name="email" autocomplete="email" required>
        <p class="field__error" data-error-for="email">Please enter a valid email address.</p>
      </label>

      <label class="field" data-required="true">
        <span class="field__label">Phone</span>
        <input type="tel" name="phone" autocomplete="tel" minlength="6" required>
        <p class="field__error" data-error-for="phone">Please enter a phone we can reach you on.</p>
      </label>
    </div>

    <div class="quote-form__row">
      <label class="field field--select" data-required="true">
        <span class="field__label">Country / region</span>
        <select name="country" required>
          <option value="" disabled selected>Select country…</option>
          …populated by static option list…
        </select>
        <p class="field__error" data-error-for="country">Please pick your country.</p>
      </label>

      <label class="field field--select" data-required="true">
        <span class="field__label">Project type</span>
        <select name="projectType" required>
          <option value="" disabled selected>Choose project type…</option>
          <option value="new-build">New build</option>
          <option value="renovation">Renovation</option>
          <option value="multi-site">Multi-site rollout</option>
          <option value="hospitality">Hospitality / hotel</option>
          <option value="office">Office / commercial</option>
        </select>
        <p class="field__error" data-error-for="projectType">Please pick a project type.</p>
      </label>
    </div>

    <label class="field field--select" data-required="true">
      <span class="field__label">Home / project size</span>
      <select name="projectSize" required>
        <option value="" disabled selected>Estimated size…</option>
        <option value="under-200m2">Up to 200 m²</option>
        <option value="200-500m2">200–500 m²</option>
        <option value="500-1000m2">500–1,000 m²</option>
        <option value="over-1000m2">1,000 m²+</option>
        <option value="multi-unit">Multi-unit / development</option>
      </select>
      <p class="field__error" data-error-for="projectSize">Please pick a size.</p>
    </label>

    <fieldset class="field field--checkbox-group" data-required-min="1">
      <legend>I'm interested in…</legend>
      <label><input type="checkbox" name="interestedIn" value="smart-home">    Smart Home</label>
      <label><input type="checkbox" name="interestedIn" value="smart-hotel">   Smart Hotel</label>
      <label><input type="checkbox" name="interestedIn" value="smart-office">  Smart Office</label>
      <label><input type="checkbox" name="interestedIn" value="security">      Security</label>
      <label><input type="checkbox" name="interestedIn" value="lighting">      Lighting</label>
      <label><input type="checkbox" name="interestedIn" value="climate">       Climate</label>
      <label><input type="checkbox" name="interestedIn" value="full-solution"> Full solution</label>
      <p class="field__error" data-error-for="interestedIn">Pick at least one.</p>
    </fieldset>

    <label class="field field--textarea" data-required="true">
      <span class="field__label">Project brief</span>
      <textarea name="message" rows="4" minlength="20" required></textarea>
      <p class="field__error" data-error-for="message">Tell us a little about the project (20+ chars).</p>
    </label>

    <label class="field field--consent" data-required="true">
      <input type="checkbox" name="consent" required>
      <span>I agree to Zakey processing this enquiry per the <a href="./pages/privacy.html">privacy notice</a>.</span>
      <p class="field__error" data-error-for="consent">Please confirm before submitting.</p>
    </label>

    <p id="quote-privacy" class="quote-form__privacy">
      We never share your details. Read our <a href="./pages/privacy.html">privacy commitment</a>.
    </p>

    <button type="submit" class="btn btn--primary btn--lg quote-form__submit">
      <span data-when="idle">Send my request</span>
      <span data-when="submitting" hidden>Submitting…</span>
    </button>
  </form>

  <div class="quote-form__result" data-result="success" hidden>
    <svg …check… aria-hidden="true"></svg>
    <h3>Thanks — we'll be in touch within one business day.</h3>
    <p>A Zakey partnership manager will follow up at the email you provided.</p>
    <button type="button" class="btn btn--ghost" data-form-reset>Submit another request</button>
  </div>

  <div class="quote-form__result" data-result="error" hidden>
    <svg …alert… aria-hidden="true"></svg>
    <h3>Something interrupted your submission.</h3>
    <p>Please try again, or email <a href="mailto:hello@zakey.example">hello@zakey.example</a>.</p>
    <button type="button" class="btn btn--primary" data-form-retry>Try again</button>
  </div>
</section>
```

## State machine

The form's `data-state` attribute carries one of:

```
idle → validating → submitting → success
                ↘             ↘
                  idle           error
                                  ↘
                                    idle (try-again)
```

| State | Visual signal |
|---|---|
| `idle` | Form visible, button enabled, no error spans visible. |
| `validating` | Synchronous, transient. Per-field `data-error="true"` toggled where invalid. |
| `submitting` | Button shows "Submitting…" + spinner; all inputs `disabled`. |
| `success` | Form hidden; `.quote-form__result[data-result="success"]` revealed. |
| `error` | Form hidden; `.quote-form__result[data-result="error"]` revealed. |

Per-field error reveal: each `.field__error` becomes visible **only**
when its parent `.field` (or `<fieldset>`) has `data-error="true"`.
Setting / clearing `data-error` is the only DOM mutation JS performs
for errors — the message text itself is static HTML.

## Validation rules (per data-model E-12)

- `iAmA`: one radio MUST be selected.
- `name`: ≥ 2 chars.
- `company`: required unless `iAmA = end-user`.
- `email`: matches `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`.
- `phone`: ≥ 6 chars after stripping spaces/dashes.
- `country`, `projectType`, `projectSize`: non-empty value.
- `interestedIn`: at least one checkbox checked.
- `message`: ≥ 20 chars.
- `consent`: must be checked.

Inline validation fires on `blur` for text inputs and on `change` for
selects/radios/checkboxes. Submit re-validates the whole form.

## Submission simulation

```js
// pseudocode inside js/forms.js
form.dataset.state = 'submitting';
setTimeout(() => {
  const failed = Math.random() < 0.0; // success-only path by default
  form.dataset.state = failed ? 'error' : 'success';
}, 600 + Math.random() * 900);
```

A `?force=error` query-string flag (or a hidden debug button) flips
the next submission to the `error` path for QA.

## Reset / retry

- "Submit another request" button (`[data-form-reset]`) clears every
  field, sets `data-state="idle"`, hides the success result, and
  re-shows the form.
- "Try again" button (`[data-form-retry]`) hides the error result and
  sets `data-state="idle"` without clearing fields.

## Acceptance probe

1. Click Submit with everything empty — every required `.field`
   shows its inline error; form does not advance.
2. Enter `not-an-email` in email, blur — email field shows the
   "valid email" error within 200 ms.
3. Fill all required fields validly, submit — button shows
   "Submitting…", inputs disable, success card replaces form within
   1500 ms.
4. From success: click "Submit another request" — form resets to
   idle, all fields blank, ready for a new entry.
5. Force `?force=error`, submit valid form — error card appears with
   "Try again"; clicking it returns to filled-but-idle form.
6. With JS disabled, native browser validation still blocks invalid
   submissions on the `required` attributes.
