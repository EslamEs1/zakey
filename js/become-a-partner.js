/* Phase 04 — partner application form state machine */

const touched = new WeakSet();

const validators = {
  partnerType: v => v ? null : 'This field is required',
  fullName: v => v.trim() ? null : 'This field is required',
  company: v => v.trim() ? null : 'This field is required',
  country: v => v ? null : 'This field is required',
  city: v => v.trim() ? null : 'This field is required',
  email: v => {
    if (!v.trim()) return 'This field is required';
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? null : 'Please enter a valid email address';
  },
  phone: v => {
    if (!v.trim()) return 'This field is required';
    const digits = v.replace(/[\s\-\+\(\)]/g, '');
    return digits.length >= 7 ? null : 'Please enter a valid phone or WhatsApp number';
  },
  website: v => {
    if (!v.trim()) return null; // optional
    if (/^https?:\/\/[^.]+\.[^.]+/.test(v)) return null;
    return 'Please enter a full URL starting with http:// or https://';
  },
  businessType: v => v ? null : 'This field is required',
  projectVolume: v => v ? null : 'This field is required',
  interestedSolutions: () => null, // validated separately
  message: () => null, // optional
  consent: () => null, // validated separately
};

function getFieldEl(form, name) {
  return form.querySelector(`[data-field="${name}"]`);
}

function getControl(form, name) {
  return form.querySelector(`#${name}, [name="${name}"]`);
}

function setFieldState(fieldEl, state, msg) {
  if (!fieldEl) return;
  fieldEl.dataset.fieldState = state;
  const errorEl = fieldEl.querySelector('.form-field__error');
  const control = fieldEl.querySelector('input:not([type=checkbox]), select, textarea');
  if (errorEl) {
    if (state === 'invalid') {
      errorEl.textContent = msg || '';
      errorEl.hidden = false;
    } else {
      errorEl.hidden = true;
    }
  }
  if (control) control.setAttribute('aria-invalid', state === 'invalid' ? 'true' : 'false');
}

function validateField(form, name) {
  if (name === 'interestedSolutions') {
    const checked = form.querySelectorAll('input[name="interestedSolutions"]:checked');
    const fieldEl = getFieldEl(form, 'interestedSolutions');
    if (checked.length === 0) {
      setFieldState(fieldEl, 'invalid', 'Please select at least one solution');
      return false;
    }
    setFieldState(fieldEl, 'valid', '');
    return true;
  }
  if (name === 'consent') {
    const cb = form.querySelector('#consent');
    const fieldEl = getFieldEl(form, 'consent');
    if (!cb || !cb.checked) {
      setFieldState(fieldEl, 'invalid', 'Please acknowledge the privacy notice to continue');
      return false;
    }
    setFieldState(fieldEl, 'valid', '');
    return true;
  }
  const control = getControl(form, name);
  const fieldEl = getFieldEl(form, name);
  if (!control || !fieldEl) return true;
  const fn = validators[name];
  if (!fn) return true;
  const error = fn(control.value);
  if (error) {
    setFieldState(fieldEl, 'invalid', error);
    return false;
  }
  setFieldState(fieldEl, 'valid', '');
  return true;
}

export function initApplicationForm() {
  const form = document.getElementById('partner-application');
  if (!form) return;

  const formSection = form.closest('section') || form.parentElement;
  const successSection = document.querySelector('[data-form-success]');
  const errorSummary = form.querySelector('.form-error-summary') || document.querySelector('.form-error-summary');

  // Blur-based validation for touched fields
  const allFieldNames = ['partnerType','fullName','company','country','city','email','phone','website','businessType','projectVolume','message'];
  allFieldNames.forEach(name => {
    const control = getControl(form, name);
    if (!control) return;
    control.addEventListener('focus', () => touched.add(control));
    control.addEventListener('blur', () => {
      if (touched.has(control)) validateField(form, name);
    });
  });

  // interestedSolutions checkboxes
  form.querySelectorAll('input[name="interestedSolutions"]').forEach(cb => {
    cb.addEventListener('change', () => validateField(form, 'interestedSolutions'));
  });

  // consent
  const consentCb = form.querySelector('#consent');
  if (consentCb) {
    consentCb.addEventListener('change', () => validateField(form, 'consent'));
  }

  // Message counter
  const messageEl = form.querySelector('#message');
  const counterEl = form.querySelector('#message-counter');
  if (messageEl && counterEl) {
    messageEl.addEventListener('input', () => {
      const len = Math.min(messageEl.value.length, 2000);
      if (messageEl.value.length > 2000) messageEl.value = messageEl.value.slice(0, 2000);
      counterEl.textContent = `${len} / 2000`;
    });
  }

  // Submit
  form.addEventListener('submit', async e => {
    e.preventDefault();

    const fieldsToValidate = ['partnerType','fullName','company','country','city','email','phone','website','businessType','projectVolume','interestedSolutions','consent'];
    let errors = 0;
    let firstInvalid = null;

    fieldsToValidate.forEach(name => {
      const ok = validateField(form, name);
      if (!ok) {
        errors++;
        if (!firstInvalid) {
          const control = name === 'interestedSolutions'
            ? form.querySelector('input[name="interestedSolutions"]')
            : name === 'consent' ? form.querySelector('#consent')
            : getControl(form, name);
          firstInvalid = control;
        }
      }
    });

    if (errors > 0) {
      if (errorSummary) {
        errorSummary.textContent = `Found ${errors} error${errors > 1 ? 's' : ''}. Please fix to continue.`;
        errorSummary.hidden = false;
        errorSummary.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    if (errorSummary) errorSummary.hidden = true;

    // Transition to submitting
    form.dataset.formState = 'submitting';
    const delay = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 100 : 400;
    await new Promise(r => setTimeout(r, delay));

    // Transition to success
    form.dataset.formState = 'success';
    if (formSection) formSection.hidden = true;
    if (successSection) {
      successSection.hidden = false;
      window.location.hash = 'application-received';
      successSection.scrollIntoView({ behavior: 'smooth' });
      const h2 = successSection.querySelector('h2');
      if (h2) h2.focus();
    }
  });

  // Edit & resubmit
  const editBtn = document.querySelector('[data-edit-application]');
  if (editBtn) {
    editBtn.addEventListener('click', () => {
      if (successSection) successSection.hidden = true;
      if (formSection) formSection.hidden = false;
      form.dataset.formState = 'idle';
      history.replaceState({}, '', window.location.pathname);
      const submitBtn = form.querySelector('[type="submit"]');
      if (submitBtn) submitBtn.focus();
    });
  }
}
