/* Phase 04 — optional pillar-nav anchor highlight */
export function initScrollSpy() {
  const nav = document.querySelector('.pillar-nav');
  if (!nav) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const links = Array.from(nav.querySelectorAll('.pillar-nav__link[href^="#"]'));
  const sections = links.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);

  if (!sections.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        links.forEach(a => {
          const active = a.getAttribute('href') === `#${id}`;
          a.setAttribute('aria-current', active ? 'true' : 'false');
        });
      }
    });
  }, { threshold: 0.3, rootMargin: `-${parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h') || '72', 10) + 40}px 0px -50% 0px` });

  sections.forEach(s => obs.observe(s));
}
