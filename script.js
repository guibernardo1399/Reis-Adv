/* =============================================
   Reis Advogados Associados — script.js
   Animations · Menu · Smooth scroll
   ============================================= */

(function () {
  'use strict';

  /* ---- Smooth scroll for anchor links ---- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (href === '#') return;
      var target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      var headerH = document.getElementById('header').offsetHeight;
      var top = target.getBoundingClientRect().top + window.scrollY - headerH - 8;
      window.scrollTo({ top: top, behavior: 'smooth' });
      closeMenu();
    });
  });

  /* ---- Header scroll state ---- */
  var header = document.getElementById('header');
  window.addEventListener('scroll', function () {
    header.classList.toggle('scrolled', window.scrollY > 24);
  }, { passive: true });

  /* ---- Hamburger menu ---- */
  var hamburger = document.getElementById('hamburger');
  var nav = document.getElementById('nav');

  function closeMenu() {
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    nav.classList.remove('open');
  }

  hamburger.addEventListener('click', function () {
    var isOpen = nav.classList.contains('open');
    if (isOpen) {
      closeMenu();
    } else {
      hamburger.classList.add('active');
      hamburger.setAttribute('aria-expanded', 'true');
      nav.classList.add('open');
    }
  });

  /* Close on outside click */
  document.addEventListener('click', function (e) {
    if (!header.contains(e.target)) closeMenu();
  });

  /* Close on Escape */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  /* ---- Intersection Observer: scroll animations ---- */
  var observed = document.querySelectorAll('.fade-in, .reveal');

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -36px 0px'
  });

  observed.forEach(function (el) {
    /* Hero elements animate immediately on page load, not on scroll */
    if (el.closest('.hero')) return;
    observer.observe(el);
  });

  /* Trigger hero elements in sequence */
  var heroEls = document.querySelectorAll('.hero .fade-in');
  heroEls.forEach(function (el, i) {
    setTimeout(function () {
      el.classList.add('visible');
    }, 120 + i * 160);
  });

  /* ---- Active nav link on scroll ---- */
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav__link');

  function updateActiveLink() {
    var scrollY = window.scrollY + 96;
    sections.forEach(function (section) {
      var top = section.offsetTop;
      var bottom = top + section.offsetHeight;
      if (scrollY >= top && scrollY < bottom) {
        navLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + section.id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });

})();
