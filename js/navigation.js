const BREAKPOINT = 1025;
const MEGA_OPEN_DELAY = 80;
const MEGA_CLOSE_GRACE = 200;

function openMegaPanel(trigger, panel) {
  document.querySelectorAll('.site-header__megabtn[aria-expanded="true"]').forEach(btn => {
    if (btn !== trigger) {
      const id = btn.getAttribute('aria-controls');
      const p = document.getElementById(id);
      if (p) { btn.setAttribute('aria-expanded', 'false'); p.hidden = true; }
    }
  });
  trigger.setAttribute('aria-expanded', 'true');
  panel.hidden = false;
}

function closeMegaPanel(trigger, panel) {
  trigger.setAttribute('aria-expanded', 'false');
  panel.hidden = true;
}

function closeAllMegaPanels() {
  document.querySelectorAll('.site-header__megabtn[aria-expanded="true"]').forEach(btn => {
    const id = btn.getAttribute('aria-controls');
    const p = document.getElementById(id);
    if (p) { btn.setAttribute('aria-expanded', 'false'); p.hidden = true; }
  });
}

export function initNavigation() {
  const megaItems = document.querySelectorAll('.has-mega');
  if (!megaItems.length) return;

  megaItems.forEach(item => {
    const trigger = item.querySelector('.site-header__megabtn');
    if (!trigger) return;
    const panel = document.getElementById(trigger.getAttribute('aria-controls'));
    if (!panel) return;

    let openTimer = null;
    let closeTimer = null;

    function scheduleOpen() {
      clearTimeout(closeTimer);
      openTimer = setTimeout(() => openMegaPanel(trigger, panel), MEGA_OPEN_DELAY);
    }

    function scheduleClose() {
      clearTimeout(openTimer);
      closeTimer = setTimeout(() => closeMegaPanel(trigger, panel), MEGA_CLOSE_GRACE);
    }

    item.addEventListener('pointerenter', () => {
      if (window.innerWidth < BREAKPOINT) return;
      scheduleOpen();
    });

    item.addEventListener('pointerleave', () => {
      if (window.innerWidth < BREAKPOINT) return;
      scheduleClose();
    });

    trigger.addEventListener('click', (e) => {
      if (window.innerWidth < BREAKPOINT) return;
      e.stopPropagation();
      const isOpen = trigger.getAttribute('aria-expanded') === 'true';
      if (isOpen) closeMegaPanel(trigger, panel);
      else openMegaPanel(trigger, panel);
    });

    trigger.addEventListener('focusin', () => {
      if (window.innerWidth < BREAKPOINT) return;
      clearTimeout(closeTimer);
      openMegaPanel(trigger, panel);
    });

    item.addEventListener('focusout', (e) => {
      if (window.innerWidth < BREAKPOINT) return;
      if (!item.contains(e.relatedTarget)) {
        closeMegaPanel(trigger, panel);
      }
    });

    trigger.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMegaPanel(trigger, panel);
    });

    panel.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeMegaPanel(trigger, panel);
        trigger.focus();
      }
    });
  });

  document.addEventListener('click', (e) => {
    const header = document.querySelector('.site-header');
    if (header && !header.contains(e.target)) closeAllMegaPanels();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth < BREAKPOINT) closeAllMegaPanels();
  }, { passive: true });
}

function getFocusableElements(container) {
  return Array.from(container.querySelectorAll(
    'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
  )).filter(el => !el.closest('[hidden]') && !el.closest('.mobile-drawer__accordion-panel[hidden]'));
}

export function initMobileDrawer() {
  const drawer = document.getElementById('mobile-drawer');
  const hamburger = document.querySelector('.site-header__hamburger');
  if (!drawer || !hamburger) return;

  const panel = drawer.querySelector('.mobile-drawer__panel');
  const closeBtn = drawer.querySelector('.mobile-drawer__close');
  const scrim = drawer.querySelector('.mobile-drawer__scrim');

  function openDrawer() {
    drawer.dataset.state = 'opening';
    drawer.setAttribute('aria-hidden', 'false');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.dataset.drawerOpen = 'true';
    setTimeout(() => {
      drawer.dataset.state = 'open';
      if (closeBtn) closeBtn.focus();
    }, 260);
  }

  function closeDrawer() {
    drawer.dataset.state = 'closing';
    drawer.setAttribute('aria-hidden', 'true');
    hamburger.setAttribute('aria-expanded', 'false');
    setTimeout(() => {
      drawer.dataset.state = 'closed';
      delete document.body.dataset.drawerOpen;
    }, 260);
    hamburger.focus();
  }

  if (panel) {
    panel.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab') return;
      const focusable = getFocusableElements(panel);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
  }

  hamburger.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (scrim) scrim.addEventListener('click', closeDrawer);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && (drawer.dataset.state === 'open' || drawer.dataset.state === 'opening')) {
      closeDrawer();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= BREAKPOINT && drawer.dataset.state !== 'closed') {
      drawer.dataset.state = 'closed';
      drawer.setAttribute('aria-hidden', 'true');
      hamburger.setAttribute('aria-expanded', 'false');
      delete document.body.dataset.drawerOpen;
    }
  }, { passive: true });

  // Accordion: Products / Solutions (mutually exclusive)
  const accordions = drawer.querySelectorAll('.mobile-drawer__accordion');
  accordions.forEach(accordion => {
    const trigger = accordion.querySelector('.mobile-drawer__accordion-trigger');
    if (!trigger) return;
    const accordionPanel = document.getElementById(trigger.getAttribute('aria-controls'));
    if (!accordionPanel) return;

    trigger.addEventListener('click', () => {
      const isOpen = trigger.getAttribute('aria-expanded') === 'true';
      accordions.forEach(acc => {
        const t = acc.querySelector('.mobile-drawer__accordion-trigger');
        if (!t) return;
        const p = document.getElementById(t.getAttribute('aria-controls'));
        t.setAttribute('aria-expanded', 'false');
        acc.dataset.state = 'closed';
        if (p) p.hidden = true;
      });
      if (!isOpen) {
        trigger.setAttribute('aria-expanded', 'true');
        accordion.dataset.state = 'open';
        accordionPanel.hidden = false;
      }
    });
  });

  // Close drawer on internal link click
  drawer.querySelectorAll('a[href]').forEach(link => {
    link.addEventListener('click', () => setTimeout(closeDrawer, 50));
  });
}
