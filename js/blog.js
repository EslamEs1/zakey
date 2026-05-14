export function initBlogFilter() {
  const grid = document.querySelector('.blog-grid');
  const chips = document.querySelectorAll('.blog-filter .filter-chip');
  const empty = document.querySelector('.blog-grid__empty');
  if (!grid || !chips.length) return;

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const filter = chip.dataset.filter;
      chips.forEach(c => c.setAttribute('aria-pressed', c === chip ? 'true' : 'false'));
      grid.dataset.activeFilter = filter;
      let visible = 0;
      grid.querySelectorAll('.blog-card').forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.hidden = !match;
        if (match) visible++;
      });
      if (empty) empty.hidden = visible > 0;
    });
  });
}
