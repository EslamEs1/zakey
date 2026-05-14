/* Phase 04 — single-open FAQ accordion */
export function initFaq() {
  document.querySelectorAll('[data-faq]').forEach(container => {
    const items = Array.from(container.querySelectorAll('details.faq-item'));
    const singleOpen = container.dataset.faqMode === 'single';

    items.forEach(item => {
      item.addEventListener('toggle', () => {
        const trigger = item.querySelector('.faq-item__trigger');
        if (trigger) trigger.setAttribute('aria-expanded', String(item.open));

        if (item.open && singleOpen) {
          items.forEach(other => {
            if (other !== item && other.open) {
              other.open = false;
              const otherTrigger = other.querySelector('.faq-item__trigger');
              if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
            }
          });
        }
      });
    });
  });
}
