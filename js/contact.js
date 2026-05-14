export function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const touched = new WeakSet();
  const successSection = document.querySelector('[data-form-success]');
  const formSection = document.querySelector('.quote-form-section');
  const errorSummary = form.querySelector('.form-error-summary');
  const counter = document.getElementById('message-counter');
  const messageField = form.querySelector('[name="message"]');
  const editBtn = document.querySelector('[data-edit-application]');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Message character counter
  if (messageField && counter) {
    messageField.addEventListener('input', () => {
      const len = Math.min(messageField.value.length, 2000);
      if (messageField.value.length > 2000) messageField.value = messageField.value.slice(0, 2000);
      counter.textContent = `${len} / 2000`;
    });
  }

  // Validators
  const validators = {
    role: v => v ? '' : 'Please select your role.',
    fullName: v => v.trim().length >= 2 ? '' : 'Please enter your full name.',
    company: v => v.trim().length >= 2 ? '' : 'Please enter your company or project name.',
    email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? '' : 'Please enter a valid email address.',
    phone: v => v.trim().length >= 7 ? '' : 'Please enter a valid phone number.',
    country: v => v ? '' : 'Please select your country.',
    city: v => v.trim().length >= 2 ? '' : 'Please enter your city.',
    projectType: v => v ? '' : 'Please select a project type.',
    projectSize: v => v ? '' : 'Please select a project size.',
    timeline: v => v ? '' : 'Please select a timeline.',
    message: v => v.trim().length >= 10 ? '' : 'Please describe your project (at least 10 characters).',
    consent: (_v, el) => el.checked ? '' : 'Please accept the privacy policy to continue.',
  };

  function validateField(el) {
    const name = el.name;
    if (!validators[name]) return '';
    const error = validators[name](el.value, el);
    const errorEl = form.querySelector(`[data-error-for="${name}"]`) || form.querySelector(`#${name}-error`);
    if (errorEl) {
      errorEl.textContent = error;
      errorEl.hidden = !error;
    }
    el.setAttribute('aria-invalid', error ? 'true' : 'false');
    return error;
  }

  function validateSolutions() {
    const boxes = [...form.querySelectorAll('[name="interestedSolutions"]')];
    const checked = boxes.some(b => b.checked);
    const errorEl = form.querySelector('[data-error-for="interestedSolutions"]');
    const error = checked ? '' : 'Please select at least one solution.';
    if (errorEl) { errorEl.textContent = error; errorEl.hidden = !error; }
    boxes.forEach(b => b.setAttribute('aria-invalid', error ? 'true' : 'false'));
    return error;
  }

  // Blur tracking
  form.querySelectorAll('input, select, textarea').forEach(el => {
    el.addEventListener('blur', () => {
      touched.add(el);
      validateField(el);
    });
    el.addEventListener('change', () => {
      if (touched.has(el)) validateField(el);
    });
  });

  form.querySelectorAll('[name="interestedSolutions"]').forEach(cb => {
    cb.addEventListener('change', () => {
      if (touched.has(cb)) validateSolutions();
    });
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    let errors = [];

    form.querySelectorAll('input, select, textarea').forEach(el => {
      touched.add(el);
      const err = validateField(el);
      if (err) errors.push({ el, err });
    });

    const solutionErr = validateSolutions();
    if (solutionErr) {
      const firstBox = form.querySelector('[name="interestedSolutions"]');
      if (firstBox && !errors.some(e => e.el === firstBox)) errors.push({ el: firstBox, err: solutionErr });
    }

    if (errors.length) {
      if (errorSummary) {
        errorSummary.textContent = `Found ${errors.length} error${errors.length > 1 ? 's' : ''}. Please fix to continue.`;
        errorSummary.hidden = false;
        errorSummary.scrollIntoView({ behavior: 'smooth', block: 'center' });
        errorSummary.focus();
      } else {
        errors[0].el.focus();
      }
      return;
    }

    if (errorSummary) errorSummary.hidden = true;
    form.dataset.formState = 'submitting';

    const delay = reduced ? 100 : 400;
    setTimeout(() => {
      form.dataset.formState = 'success';
      if (formSection) formSection.hidden = true;
      if (successSection) {
        successSection.hidden = false;
        const h2 = successSection.querySelector('h2');
        if (h2) h2.focus();
      }
      window.location.hash = 'quote-received';
    }, delay);
  });

  if (editBtn) {
    editBtn.addEventListener('click', () => {
      form.dataset.formState = 'idle';
      if (formSection) formSection.hidden = false;
      if (successSection) successSection.hidden = true;
      history.replaceState({}, '', window.location.pathname);
      const submitBtn = form.querySelector('[type="submit"]');
      if (submitBtn) submitBtn.focus();
    });
  }
}
