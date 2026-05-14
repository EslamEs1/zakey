export function initFilter() {
  const filterRow    = document.querySelector('.catalog-toolbar__filters');
  const cards        = Array.from(document.querySelectorAll('[data-solution]'));
  const visibleCountEl = document.querySelector('[data-visible-count]');
  const totalCountEl   = document.querySelector('[data-total-count]');

  if (!filterRow || cards.length === 0) return;

  const solutionToCategory = {
    'smart-villa':      'residential',
    'smart-apartment':  'residential',
    'smart-hotel':      'hospitality',
    'smart-office':     'commercial',
    'smart-compound':   'real-estate',
    'gaming-room':      'lifestyle',
    'elderly-care':     'lifestyle',
    'smart-retail':     'commercial',
  };

  if (totalCountEl) totalCountEl.textContent = String(cards.length);

  function applyFilters() {
    const activeBtn  = filterRow.querySelector('[aria-pressed="true"]');
    const activeCat  = activeBtn ? activeBtn.dataset.category : 'all';
    let visibleCount = 0;

    for (const card of cards) {
      const cardCats = (card.dataset.category || '').split(/\s+/).filter(Boolean);
      const visible  = activeCat === 'all' || cardCats.includes(activeCat);
      card.classList.toggle('is-hidden', !visible);
      if (visible) visibleCount++;
    }

    if (visibleCountEl) visibleCountEl.textContent = String(visibleCount);
  }

  function activatePill(targetCategory) {
    for (const btn of filterRow.querySelectorAll('[data-category]')) {
      const isActive = btn.dataset.category === targetCategory;
      btn.setAttribute('aria-pressed', String(isActive));
    }
    applyFilters();
  }

  filterRow.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-category]');
    if (!btn) return;
    activatePill(btn.dataset.category);
  });

  function resolveHash() {
    const hash = window.location.hash.slice(1);
    if (!hash) return false;

    const pills = Array.from(filterRow.querySelectorAll('[data-category]'));
    const categories = pills.map(b => b.dataset.category);

    if (categories.includes(hash)) {
      activatePill(hash);
      return true;
    }

    const promotedCat = solutionToCategory[hash];
    if (promotedCat && categories.includes(promotedCat)) {
      activatePill(promotedCat);
      const target = document.getElementById(hash);
      if (target) {
        requestAnimationFrame(() => target.scrollIntoView({ behavior: 'smooth', block: 'center' }));
      }
      return true;
    }

    return false;
  }

  if (!resolveHash()) {
    applyFilters();
  }
}
