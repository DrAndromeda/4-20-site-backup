document.addEventListener('DOMContentLoaded', function() {
  // Hamburger toggle
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');
  if (hamburger && nav) {
    hamburger.addEventListener('click', function() {
      nav.classList.toggle('open');
      hamburger.classList.toggle('open');
    });
  }

  // Mobile dropdown toggle (click instead of hover)
  const isMobile = window.matchMedia('(max-width: 768px)');
  const dropdowns = document.querySelectorAll('.nav-dropdown');
  dropdowns.forEach(function(dd) {
    const trigger = dd.querySelector('> a');
    if (trigger) {
      trigger.addEventListener('click', function(e) {
        if (isMobile.matches) {
          e.preventDefault();
          dd.classList.toggle('open');
        }
      });
    }
  });
});