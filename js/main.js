// DentWide - Basic Plan Website JavaScript
(function() {
  'use strict';

  // Routes
  const routes = {
    '': 'home',
    'home': 'home',
    'about': 'about',
    'gallery': 'gallery'
  };

  // DOM Elements
  const mainContent = document.getElementById('main-content');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileToggle = document.getElementById('mobile-toggle');
  const nav = document.getElementById('nav');

  // Mobile Menu Toggle
  mobileToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    mobileToggle.classList.toggle('active');
  });

  // Close mobile menu on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('active');
      mobileToggle.classList.remove('active');
    });
  });

  // Close mobile menu on outside click
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !mobileToggle.contains(e.target)) {
      nav.classList.remove('active');
      mobileToggle.classList.remove('active');
    }
  });

  // Load Page
  async function loadPage(page) {
    try {
      mainContent.style.opacity = '0.5';

      const response = await fetch(`pages/${page}.html`);
      if (!response.ok) throw new Error('Page not found');

      const html = await response.text();
      mainContent.innerHTML = html;
      mainContent.classList.add('fade-in');
      mainContent.style.opacity = '1';

      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // Update active nav link
      updateActiveNav();

    } catch (error) {
      console.error('Error loading page:', error);
      mainContent.innerHTML = '<div class="container section"><h1>페이지를 찾을 수 없습니다</h1></div>';
      mainContent.style.opacity = '1';
    }
  }

  // Update Active Navigation
  function updateActiveNav() {
    const hash = window.location.hash.slice(1) || 'home';

    navLinks.forEach(link => {
      const href = link.getAttribute('href').slice(1);
      if (href === hash) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // Handle Route
  function handleRoute() {
    const hash = window.location.hash.slice(1);
    const page = routes[hash] || 'home';
    loadPage(page);
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#' || href.startsWith('#home') || href.startsWith('#about') || href.startsWith('#gallery')) {
        e.preventDefault();
        const target = href.slice(1) || 'home';
        window.location.hash = target;
      }
    });
  });

  // Initialize
  window.addEventListener('hashchange', handleRoute);
  window.addEventListener('load', handleRoute);
})();
