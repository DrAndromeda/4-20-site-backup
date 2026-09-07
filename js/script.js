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

  // Mobile dropdown toggle (click instead of hover)
  const isMobile = window.matchMedia('(max-width: 768px)');
  const dropdowns = document.querySelectorAll('.nav-dropdown');
  dropdowns.forEach(function(dd) {
    const trigger = dd.querySelector(':scope > a');
    if (trigger) {
      // Wrap arrow ▾ in a separate span, keep link clickable
      if (!trigger.querySelector('.arrow-toggle')) {
        trigger.innerHTML = trigger.innerHTML.replace('▾', '<span class="arrow-toggle">▾</span>');
      }
      const arrow = trigger.querySelector('.arrow-toggle');
      if (arrow) {
        arrow.addEventListener('click', function(e) {
          if (!isMobile.matches) return;
          e.preventDefault();
          e.stopPropagation();
          const wasOpen = dd.classList.contains('open');
          dropdowns.forEach(function(o) {
            if (o !== dd) o.classList.remove('open');
          });
          dd.classList.toggle('open', !wasOpen);
        });
      }
      // Link itself navigates normally on mobile
      trigger.addEventListener('click', function(e) {
        if (!isMobile.matches) return;
        // If the click was directly on the arrow, let arrow handler handle it
        if (e.target.classList.contains('arrow-toggle')) return;
        // If dropdown is open, navigate (second click)
        if (dd.classList.contains('open')) {
          return; // let default navigation happen
        }
        // If closed, open it and prevent navigation
        e.preventDefault();
        dropdowns.forEach(function(o) {
          if (o !== dd) o.classList.remove('open');
        });
        dd.classList.add('open');
      });
    }
  });
});