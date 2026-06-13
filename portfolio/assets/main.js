document.addEventListener('DOMContentLoaded', () => {

  // =========================================================
  // Mobile nav toggle
  // =========================================================
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
    });
  }

  // =========================================================
  // Project filter (used on projects.html)
  // =========================================================
  const filterButtons = document.querySelectorAll('.filter-row button');
  const workItems = document.querySelectorAll('.work-item');

  if (filterButtons.length && workItems.length) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;

        workItems.forEach(item => {
          const tags = (item.dataset.tags || '').split(',');
          if (filter === 'all' || tags.includes(filter)) {
            item.style.display = '';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // =========================================================
  // Hero card deck: scroll-reveal + gentle parallax (desktop only)
  // =========================================================
  const cards = document.querySelectorAll('.card-canvas .card');
  if (!cards.length) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion) {
    cards.forEach(c => c.classList.add('in-view'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('in-view');
    });
  }, { threshold: 0.15 });

  cards.forEach(c => observer.observe(c));

  // Parallax only on wide screens, where cards are absolutely positioned
  const speeds = {
    terminal: 0.04,
    chart: 0.07,
    repo: 0.03,
    arch: 0.06,
    note: 0.05,
    code: 0.035
  };

  const mq = window.matchMedia('(min-width: 901px)');
  let parallaxActive = mq.matches;

  function onScroll() {
    if (!parallaxActive) return;
    const y = window.scrollY;
    cards.forEach(c => {
      const type = [...c.classList].find(cl => speeds[cl]);
      const speed = speeds[type] || 0.04;
      c.style.setProperty('--ty', (y * speed * -1) + 'px');
    });
  }

  function clearParallax() {
    cards.forEach(c => c.style.removeProperty('--ty'));
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  mq.addEventListener('change', (e) => {
    parallaxActive = e.matches;
    if (!parallaxActive) clearParallax();
  });
});
