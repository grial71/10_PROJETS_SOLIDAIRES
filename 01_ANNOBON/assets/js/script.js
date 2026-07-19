(function () {
  'use strict';

  const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  function initMobileMenu() {
    const toggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const nav = document.querySelector('.nav');

    if (!toggle || !navLinks) {
      return;
    }

    function closeMenu() {
      navLinks.classList.remove('is-open');
      if (nav) {
        nav.classList.remove('open');
      }
      toggle.setAttribute('aria-expanded', 'false');
    }

    toggle.addEventListener('click', function () {
      const isOpen = navLinks.classList.toggle('is-open');
      if (nav) {
        nav.classList.toggle('open', isOpen);
      }
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        closeMenu();
      });
    });
  }

  function initScrollToTop() {
    const button = document.querySelector('.scroll-top');

    if (!button) {
      return;
    }

    const toggleButton = function () {
      if (window.scrollY > 320) {
        button.classList.add('is-visible');
      } else {
        button.classList.remove('is-visible');
      }
    };

    toggleButton();
    window.addEventListener('scroll', toggleButton, { passive: true });

    button.addEventListener('click', function (event) {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: reducedMotionQuery.matches ? 'auto' : 'smooth' });
    });
  }

  function initSmoothAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (event) {
        const targetId = anchor.getAttribute('href');
        const target = document.querySelector(targetId);

        if (!target) {
          return;
        }

        event.preventDefault();
        target.scrollIntoView({ behavior: reducedMotionQuery.matches ? 'auto' : 'smooth' });
      });
    });
  }

  function initRevealOnScroll() {
    const items = document.querySelectorAll('.reveal');

    if (!items.length) {
      return;
    }

    const revealItems = function () {
      items.forEach(function (item) {
        const rect = item.getBoundingClientRect();
        if (rect.top < window.innerHeight - 90) {
          item.classList.add('is-visible');
        }
      });
    };

    revealItems();
    window.addEventListener('scroll', revealItems, { passive: true });
  }

  function initActiveNavLink() {
    const currentPath = window.location.pathname.split('/').pop();
    const currentPage = currentPath || 'index.html';

    document.querySelectorAll('.nav-links a').forEach(function (link) {
      const href = link.getAttribute('href');
      if (!href) {
        return;
      }

      const linkPage = href.split('/').pop();
      if (linkPage === currentPage) {
        link.classList.add('is-active');
      }
    });
  }

  function initProgressBars() {
    const bars = document.querySelectorAll('.progress-fill');

    if (!bars.length) {
      return;
    }

    bars.forEach(function (bar) {
      const width = bar.getAttribute('data-width') || '0';
      requestAnimationFrame(function () {
        bar.style.width = width + '%';
      });
    });
  }

  function init() {
    initMobileMenu();
    initScrollToTop();
    initSmoothAnchors();
    initRevealOnScroll();
    initActiveNavLink();
    initProgressBars();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
