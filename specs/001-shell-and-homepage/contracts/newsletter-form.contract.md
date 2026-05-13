# Contract — Newsletter Form

**Scope**: Single-field email subscription form inside the footer's
Connect column. Same `data-state` pattern as the quote form but
minimal.

## Markup shape

```html
<form class="newsletter-form" data-state="idle" novalidate>
  <label class="field field--inline" data-required="true">
    <span class="field__label sr-only">Email address</span>
    <input type="email"
           name="email"
           autocomplete="email"
           placeholder="you@brand.com"
           required>
    <p class="field__error" data-error-for="email">Please enter a valid email.</p>
  </label>

  <button type="submit" class="btn btn--primary">
    <span data-when="idle">Subscribe</span>
    <span data-when="submitting" hidden>…</span>
  </button>

  <p class="newsletter-form__status" data-status="success" hidden>
    Thanks — you're on the list.
  </p>
  <p class="newsletter-form__status" data-status="error" hidden>
    Something went wrong. Please try again.
  </p>

  <p class="newsletter-form__privacy">
    We send one update a month. Unsubscribe anytime.
  </p>
</form>
```

## State machine

```
idle → submitting → success → (auto-reset after 5 s) → idle
                  ↘ error → idle (on next interaction)
```

| State | Visual |
|---|---|
| `idle` | Field + button visible, both status `<p>` hidden. |
| `submitting` | Button "…" affordance; input disabled. |
| `success` | Field cleared; `[data-status="success"]` visible for 5 s. |
| `error` | `[data-status="error"]` visible; field re-enabled for retry. |

## Acceptance probe

1. Empty submit → email field shows error; form does not advance.
2. Invalid email → inline error on blur.
3. Valid email → button shows "…", success message appears within
   1000 ms, then the form auto-resets after 5 s.
4. Force error (`?force=newsletter-error`) → error message appears
   and persists until the field is edited again.
