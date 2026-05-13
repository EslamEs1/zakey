export function initGallery() {
  const tablist  = document.querySelector('[role="tablist"][aria-label="Product views"]');
  const mainImg  = document.getElementById('product-main-image');

  if (!tablist || !mainImg) return;

  const tabs = () => Array.from(tablist.querySelectorAll('[role="tab"]'));

  function activateThumb(thumb) {
    tabs().forEach((t) => {
      const active = t === thumb;
      t.setAttribute('aria-selected', String(active));
      t.setAttribute('tabindex', active ? '0' : '-1');
    });
    mainImg.src = thumb.dataset.thumbSrc;
    mainImg.alt = thumb.dataset.thumbAlt;
    thumb.focus();
  }

  // Click delegate on the tablist
  tablist.addEventListener('click', (e) => {
    const tab = e.target.closest('[role="tab"]');
    if (tab) activateThumb(tab);
  });

  // Arrow-key, Home, and End navigation
  tablist.addEventListener('keydown', (e) => {
    const all    = tabs();
    const active = all.find((t) => t.getAttribute('aria-selected') === 'true');
    const idx    = all.indexOf(active);
    let next;

    if (e.key === 'ArrowRight') next = all[(idx + 1) % all.length];
    else if (e.key === 'ArrowLeft') next = all[(idx - 1 + all.length) % all.length];
    else if (e.key === 'Home') next = all[0];
    else if (e.key === 'End')  next = all[all.length - 1];

    if (next) {
      e.preventDefault();
      activateThumb(next);
    }
  });
}
