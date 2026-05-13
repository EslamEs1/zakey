const SLIDE_COUNT = 4;
const AUTO_ADVANCE_MS = 6000;
const INTERACTION_GRACE_MS = 4000;

export function initFeaturedSlider() {
  const section = document.querySelector('.featured-slider');
  if (!section) return;

  const viewport = section.querySelector('.featured-slider__viewport');
  const track = section.querySelector('.featured-slider__track');
  if (!viewport || !track) return;

  const prevBtn = section.querySelector('[data-slider-prev]');
  const nextBtn = section.querySelector('[data-slider-next]');
  const dots = Array.from(section.querySelectorAll('[data-slide-index]'));

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let activeIndex = 0;
  let autoTimer = null;
  let interactionTimer = null;

  function getSlides() {
    return Array.from(track.querySelectorAll('.featured-slide'));
  }

  function scrollTo(index, animate) {
    const slides = getSlides();
    const slide = slides[index];
    if (!slide) return;
    viewport.scrollTo({
      left: slide.offsetLeft,
      behavior: (animate && !prefersReducedMotion) ? 'smooth' : 'auto'
    });
  }

  function go(index) {
    activeIndex = ((index % SLIDE_COUNT) + SLIDE_COUNT) % SLIDE_COUNT;
    section.dataset.activeIndex = String(activeIndex);
    dots.forEach((dot, i) => {
      dot.setAttribute('aria-selected', i === activeIndex ? 'true' : 'false');
    });
    scrollTo(activeIndex, true);
  }

  function markInteracting() {
    section.dataset.state = 'interacting';
    clearTimeout(interactionTimer);
    interactionTimer = setTimeout(() => { section.dataset.state = 'idle'; }, INTERACTION_GRACE_MS);
  }

  function startAutoAdvance() {
    if (prefersReducedMotion) return;
    clearInterval(autoTimer);
    autoTimer = setInterval(() => {
      if (section.dataset.state !== 'interacting') go(activeIndex + 1);
    }, AUTO_ADVANCE_MS);
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => { markInteracting(); go(activeIndex - 1); });
    prevBtn.addEventListener('keydown', e => {
      if (e.key === 'ArrowLeft')  { e.preventDefault(); markInteracting(); go(activeIndex - 1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); markInteracting(); go(activeIndex + 1); }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => { markInteracting(); go(activeIndex + 1); });
    nextBtn.addEventListener('keydown', e => {
      if (e.key === 'ArrowLeft')  { e.preventDefault(); markInteracting(); go(activeIndex - 1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); markInteracting(); go(activeIndex + 1); }
    });
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => { markInteracting(); go(i); });
    dot.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight') { e.preventDefault(); markInteracting(); go(activeIndex + 1); }
      if (e.key === 'ArrowLeft')  { e.preventDefault(); markInteracting(); go(activeIndex - 1); }
      if (e.key === 'Home')       { e.preventDefault(); markInteracting(); go(0); }
      if (e.key === 'End')        { e.preventDefault(); markInteracting(); go(SLIDE_COUNT - 1); }
    });
  });

  viewport.addEventListener('pointerenter', markInteracting);
  viewport.addEventListener('focusin', markInteracting);

  // Track swipe via IntersectionObserver so dots stay in sync with scroll-snap
  const slides = getSlides();
  if (slides.length && 'IntersectionObserver' in window) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          const idx = slides.indexOf(entry.target);
          if (idx !== -1 && idx !== activeIndex) {
            activeIndex = idx;
            section.dataset.activeIndex = String(activeIndex);
            dots.forEach((dot, i) => {
              dot.setAttribute('aria-selected', i === activeIndex ? 'true' : 'false');
            });
          }
        }
      });
    }, { root: viewport, threshold: 0.5 });
    slides.forEach(slide => obs.observe(slide));
  }

  startAutoAdvance();
}
