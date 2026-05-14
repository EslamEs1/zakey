import { initNavigation, initMobileDrawer } from './navigation.js';
import { initQuoteForm, initNewsletterForm } from './forms.js';

export function boot() {
  document.querySelectorAll('[data-copyright-year]').forEach(el => {
    el.textContent = new Date().getFullYear();
  });
}

function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const hero = document.getElementById('hero');

  if (hero) {
    const headerH = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue('--header-h') || '72',
      10
    );
    const obs = new IntersectionObserver(
      ([entry]) => { header.dataset.scrolled = String(!entry.isIntersecting); },
      { threshold: 0, rootMargin: `-${headerH}px 0px 0px 0px` }
    );
    obs.observe(hero);

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      header.style.transition = 'none';
    }
  } else {
    function update() { header.dataset.scrolled = String(window.scrollY > 80); }
    window.addEventListener('scroll', update, { passive: true });
    update();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  boot();
  initNavigation();
  initMobileDrawer();
  initStickyHeader();

  initNewsletterForm();
  if (document.getElementById('quote-form')) initQuoteForm();
  if (document.querySelector('.featured-slider')) {
    import('./homepage.js').then(m => m.initFeaturedSlider());
  }

  if (document.getElementById('product-grid')) {
    import('./products.js').then(m => m.initCatalog());
  }

  if (document.body.dataset.page === 'product-detail') {
    import('./product-detail.js').then(m => m.initGallery());
  }

  if (document.getElementById('solutions-grid')) {
    import('./solutions.js').then(m => m.initFilter());
  }
});
