require('./styles.scss');

const header = document.querySelector('[data-header]');
const menuButton = document.querySelector('[data-menu-button]');
const menu = document.querySelector('[data-menu]');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const setMenu = (open) => {
  if (!menuButton || !menu) return;
  menuButton.setAttribute('aria-expanded', String(open));
  menu.classList.toggle('is-open', open);
  document.body.classList.toggle('menu-open', open);
};

menuButton?.addEventListener('click', () => {
  setMenu(menuButton.getAttribute('aria-expanded') !== 'true');
});

menu?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => setMenu(false));
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setMenu(false);
});

const updateHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 24);
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

const revealItems = document.querySelectorAll('.reveal');
if (reduceMotion || !('IntersectionObserver' in window)) {
  revealItems.forEach((item) => item.classList.add('is-visible'));
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });

  revealItems.forEach((item) => revealObserver.observe(item));
}

const year = document.querySelector('[data-year]');
if (year) year.textContent = new Date().getFullYear();
