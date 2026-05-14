export function initProjectsFilter() {
  const grid = document.querySelector('.projects-grid');
  const chips = document.querySelectorAll('.projects-filter .filter-chip');
  const status = document.querySelector('.projects-grid__status');
  if (!grid || !chips.length) return;

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const filter = chip.dataset.filter;
      chips.forEach(c => c.setAttribute('aria-pressed', c === chip ? 'true' : 'false'));
      grid.dataset.activeFilter = filter;
      let visible = 0;
      grid.querySelectorAll('.project-card').forEach(card => {
        const match = filter === 'all' || card.dataset.segment === filter;
        card.hidden = !match;
        if (match) visible++;
      });
      if (status) {
        status.textContent = filter === 'all'
          ? `Showing all ${visible} project${visible !== 1 ? 's' : ''}`
          : `Showing ${visible} project${visible !== 1 ? 's' : ''} in ${chip.textContent.trim()}`;
      }
    });
  });
}
