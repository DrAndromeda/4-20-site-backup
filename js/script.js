document.addEventListener('DOMContentLoaded', function() {
  // Hamburger toggle
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');
  if (hamburger && nav) {
    hamburger.addEventListener('click', function(e) {
      e.stopPropagation();
      nav.classList.toggle('open');
      hamburger.classList.toggle('open');
    });

    // Close menu on outside click
    document.addEventListener('click', function(e) {
      if (nav.classList.contains('open') &&
          !nav.contains(e.target) &&
          !hamburger.contains(e.target)) {
        nav.classList.remove('open');
        hamburger.classList.remove('open');
      }
    });

    // Close menu on Escape
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        nav.classList.remove('open');
        hamburger.classList.remove('open');
      }
    });
  }

  // Mobile dropdown — first click opens, second click navigates to page
  const isMobile = window.matchMedia('(max-width: 768px)');
  const dropdowns = document.querySelectorAll('.nav-dropdown');
  dropdowns.forEach(function(dd) {
    const trigger = dd.querySelector(':scope > a');
    if (!trigger) return;
    trigger.addEventListener('click', function(e) {
      if (!isMobile.matches) return;
      if (dd.classList.contains('open')) {
        return; // allow default navigation
      }
      e.preventDefault();
      dropdowns.forEach(function(o) { if (o !== dd) o.classList.remove('open'); });
      dd.classList.add('open');
    });
  });
});