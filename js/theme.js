// Applies saved theme on load — also mirrored inline in <head> to prevent flash
(function () {
  const saved = localStorage.getItem('zakey-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
})();

export function initTheme() {
  const btn = document.querySelector('[data-theme-toggle]');
  if (!btn) return;

  function syncLabel() {
    const theme = document.documentElement.getAttribute('data-theme') || 'dark';
    btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
  }

  syncLabel();

  btn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('zakey-theme', next);
    syncLabel();
  });
}
