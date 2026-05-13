const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function setFieldError(container, name, hasError) {
  const errorEl = container.querySelector(`[data-error-for="${name}"]`);
  if (!errorEl) return;
  const field = errorEl.closest('fieldset, .field');
  if (!field) return;
  if (hasError) {
    field.setAttribute('data-error', 'true');
    const input = field.querySelector('input:not([type="radio"]):not([type="checkbox"]), select, textarea');
    input?.setAttribute('aria-invalid', 'true');
  } else {
    field.removeAttribute('data-error');
    const input = field.querySelector('input:not([type="radio"]):not([type="checkbox"]), select, textarea');
    input?.removeAttribute('aria-invalid');
  }
}

export function initQuoteForm() {
  const form = document.getElementById('quote-form');
  if (!form) return;

  const successCard = document.querySelector('.quote-form__result[data-result="success"]');
  const errorCard   = document.querySelector('.quote-form__result[data-result="error"]');
  const resetBtn    = successCard?.querySelector('[data-form-reset]');
  const retryBtn    = errorCard?.querySelector('[data-form-retry]');
  const submitBtn   = form.querySelector('[type="submit"]');

  function validateField(name) {
    switch (name) {
      case 'role': {
        const ok = form.querySelectorAll('[name="role"]:checked').length > 0;
        setFieldError(form, 'role', !ok);
        return ok;
      }
      case 'name': {
        const ok = (form.querySelector('[name="name"]')?.value ?? '').trim().length >= 2;
        setFieldError(form, 'name', !ok);
        return ok;
      }
      case 'email': {
        const val = (form.querySelector('[name="email"]')?.value ?? '').trim();
        const ok = EMAIL_RE.test(val);
        setFieldError(form, 'email', !ok);
        return ok;
      }
      case 'country': {
        const ok = !!(form.querySelector('[name="country"]')?.value);
        setFieldError(form, 'country', !ok);
        return ok;
      }
      default:
        return true;
    }
  }

  function validateAll() {
    const allOk = ['role', 'name', 'email', 'country'].map(validateField).every(Boolean);
    const consent = form.querySelector('[name="consent"]');
    return allOk && (consent?.checked ?? false);
  }

  form.addEventListener('blur', e => {
    const { name } = e.target;
    if (name === 'name' || name === 'email') validateField(name);
  }, true);

  form.addEventListener('change', e => {
    const { name } = e.target;
    if (name === 'role' || name === 'country') validateField(name);
  });

  function showResult(which) {
    form.dataset.state = which;
    form.hidden = true;
    if (which === 'success' && successCard) {
      successCard.hidden = false;
      resetBtn?.focus();
    }
    if (which === 'error' && errorCard) {
      errorCard.hidden = false;
      retryBtn?.focus();
    }
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    if (form.dataset.state === 'submitting') return;

    form.dataset.state = 'validating';
    if (!validateAll()) {
      form.dataset.state = 'idle';
      form.querySelector('[data-error="true"] input, [data-error="true"] select, [data-error="true"] textarea')?.focus();
      return;
    }

    form.dataset.state = 'submitting';
    if (submitBtn) submitBtn.disabled = true;

    const forceError = new URLSearchParams(location.search).get('force') === 'error';
    setTimeout(() => {
      if (submitBtn) submitBtn.disabled = false;
      showResult(forceError ? 'error' : 'success');
    }, 600 + Math.random() * 900);
  });

  resetBtn?.addEventListener('click', () => {
    form.reset();
    form.querySelectorAll('[data-error]').forEach(el => el.removeAttribute('data-error'));
    form.dataset.state = 'idle';
    form.hidden = false;
    if (successCard) successCard.hidden = true;
    form.querySelector('input, select')?.focus();
  });

  retryBtn?.addEventListener('click', () => {
    form.dataset.state = 'idle';
    form.hidden = false;
    if (errorCard) errorCard.hidden = true;
    form.querySelector('input, select')?.focus();
  });
}

export function initNewsletterForm() {
  document.querySelectorAll('.newsletter-form').forEach(form => {
    const input      = form.querySelector('[name="email"]');
    const submitBtn  = form.querySelector('[type="submit"]');
    const successMsg = form.querySelector('[data-status="success"]');
    const errorMsg   = form.querySelector('[data-status="error"]');

    function validateEmail() {
      const ok = EMAIL_RE.test((input?.value ?? '').trim());
      setFieldError(form, 'email', !ok);
      return ok;
    }

    input?.addEventListener('blur', () => validateEmail());

    input?.addEventListener('input', () => {
      if (form.dataset.state === 'error') {
        setFieldError(form, 'email', false);
        form.dataset.state = 'idle';
        if (errorMsg) errorMsg.hidden = true;
      }
    });

    form.addEventListener('submit', e => {
      e.preventDefault();
      if (form.dataset.state === 'submitting') return;
      if (!validateEmail()) { input?.focus(); return; }

      form.dataset.state = 'submitting';
      if (submitBtn) submitBtn.disabled = true;
      if (input) input.disabled = true;

      const forceError = new URLSearchParams(location.search).get('force') === 'newsletter-error';
      setTimeout(() => {
        if (submitBtn) submitBtn.disabled = false;
        if (input) input.disabled = false;

        if (forceError) {
          form.dataset.state = 'error';
          if (errorMsg) errorMsg.hidden = false;
        } else {
          form.dataset.state = 'success';
          if (input) input.value = '';
          if (successMsg) successMsg.hidden = false;
          setTimeout(() => {
            form.dataset.state = 'idle';
            if (successMsg) successMsg.hidden = true;
          }, 5000);
        }
      }, 600 + Math.random() * 900);
    });
  });
}
