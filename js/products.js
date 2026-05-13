export function initCatalog() {
  const filterRow      = document.querySelector('.catalog-toolbar__filters');
  const searchInput    = document.querySelector('[data-product-search]');
  const cards          = Array.from(document.querySelectorAll('[data-product]'));
  const emptyState     = document.querySelector('.catalog-empty');
  const clearSearchBtn = document.querySelector('[data-clear-search]');
  const visibleCountEl = document.querySelector('[data-visible-count]');
  const totalCountEl   = document.querySelector('[data-total-count]');

  if (!filterRow || !cards.length) return;

  // Phase-01 mega-menu links use different hash slugs than the filter pill slugs
  const hashAlias = {
    'control-panels':   'central-control',
    'lighting-control': 'lighting',
  };

  function applyFilters() {
    const activeBtn = filterRow.querySelector('[aria-pressed="true"]');
    const activeCat = activeBtn ? activeBtn.dataset.category : 'all';
    const query     = searchInput ? (searchInput.value || '').trim().toLowerCase() : '';

    let visibleCount = 0;
    for (const card of cards) {
      const matchesCat = activeCat === 'all' || card.dataset.category === activeCat;
      const matchesQry = !query || cardSearchable(card).includes(query);
      const visible    = matchesCat && matchesQry;
      card.classList.toggle('is-hidden', !visible);
      if (visible) visibleCount++;
    }

    if (visibleCountEl) visibleCountEl.textContent = String(visibleCount);
    if (emptyState)     emptyState.hidden = visibleCount > 0;
  }

  // Cached per-card searchable text (name + desc + synonym tags joined lowercase)
  function cardSearchable(card) {
    return (card._searchable ??= [
      card.querySelector('.card-product__name')?.textContent ?? '',
      card.querySelector('.card-product__desc')?.textContent ?? '',
      card.dataset.tags ?? '',
    ].join(' ').toLowerCase());
  }

  // Initialise total count once
  if (totalCountEl) totalCountEl.textContent = String(cards.length);

  // Click delegate on the filter pill toolbar
  filterRow.addEventListener('click', (e) => {
    const pill = e.target.closest('[data-category]');
    if (!pill) return;
    filterRow.querySelectorAll('.filter-pill').forEach((btn) => {
      btn.setAttribute('aria-pressed', String(btn === pill));
    });
    applyFilters();
  });

  // Search input with 80 ms debounce (T060)
  if (searchInput) {
    let debounceTimer;
    searchInput.addEventListener('input', () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(applyFilters, 80);
    });
  }

  // Clear-search button resets the input but keeps the active category (T063)
  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      applyFilters();
      if (searchInput) searchInput.focus();
    });
  }

  // URL hash deep-link pre-activation (handles mega-menu links from Phase 01)
  const rawHash = window.location.hash.slice(1);
  if (rawHash) {
    const slug = hashAlias[rawHash] ?? rawHash;
    const pill = filterRow.querySelector(`[data-category="${CSS.escape(slug)}"]`);
    if (pill) {
      filterRow.querySelectorAll('.filter-pill').forEach((btn) => {
        btn.setAttribute('aria-pressed', String(btn === pill));
      });
    }
  }

  // Initial render — respects any pre-activated pill from hash
  applyFilters();
}
