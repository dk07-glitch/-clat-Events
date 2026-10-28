/**
 * Éclat Events — Application JavaScript
 * =======================================
 * Celebration & Event Planner | PromptWars Challenge
 *
 * Modules:
 *  1.  Confetti / Canvas Particle Animation
 *  2.  Navbar Scroll Behaviour
 *  3.  Mobile Menu
 *  4.  Scroll-Triggered Animations (IntersectionObserver)
 *  5.  Animated Statistics Counters
 *  6.  Gallery Category Filter
 *  7.  Testimonials Carousel
 *  8.  Hero Parallax
 *  9.  Inquiry Form Validation
 * 10.  Smooth Anchor Scrolling
 * 11.  Newsletter Subscribe
 * 12.  Keyboard Accessibility Enhancements
 */

(function () {
  'use strict';

  /* ================================================================
     UTILITY HELPERS
     ================================================================ */

  /**
   * Returns a random float between [min, max).
   * @param {number} min
   * @param {number} max
   * @returns {number}
   */
  function randomBetween(min, max) {
    return min + Math.random() * (max - min);
  }

  /**
   * Validates an email address format.
   * @param {string} email
   * @returns {boolean}
   */
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  /**
   * Sanitises a user-supplied string by escaping HTML special characters.
   * Prevents XSS when inserting user input into the DOM.
   * @param {string} str
   * @returns {string}
   */
  function sanitise(str) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  /* ================================================================
     1. CONFETTI / CANVAS PARTICLE ANIMATION
     ================================================================ */
  (function initConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;

    // Respect user's motion preferences
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      canvas.style.display = 'none';
      return;
    }

    const ctx = canvas.getContext('2d');
    const COLORS = ['#D4AF37', '#6C3483', '#9B59B6', '#F0D060', '#FFFFFF', '#E91E8C'];
    const SHAPES = ['circle', 'star', 'rect'];
    let particles = [];
    let animFrameId;

    /** Resize canvas to match viewport */
    function resizeCanvas() {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });

    /** Create one particle object */
    function createParticle() {
      return {
        x:        randomBetween(0, canvas.width),
        y:        randomBetween(-canvas.height, 0),
        size:     randomBetween(4, 10),
        color:    COLORS[Math.floor(Math.random() * COLORS.length)],
        shape:    SHAPES[Math.floor(Math.random() * SHAPES.length)],
        speedX:   randomBetween(-1.2, 1.2),
        speedY:   randomBetween(0.8, 2.4),
        rotation: randomBetween(0, Math.PI * 2),
        rotSpeed: randomBetween(-0.04, 0.04),
        opacity:  randomBetween(0.4, 0.85),
      };
    }

    /** Draw a 5-pointed star */
    function drawStar(cx, cy, r, color) {
      ctx.fillStyle = color;
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
        if (i === 0) {
          ctx.moveTo(cx + r * Math.cos(angle), cy + r * Math.sin(angle));
        } else {
          ctx.lineTo(cx + r * Math.cos(angle), cy + r * Math.sin(angle));
        }
      }
      ctx.closePath();
      ctx.fill();
    }

    /** Seed initial particles across the full canvas height */
    for (let i = 0; i < 90; i++) {
      const p = createParticle();
      p.y = randomBetween(0, canvas.height);
      particles.push(p);
    }

    /** Main animation loop */
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(function (p, i) {
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotSpeed;

        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.color;

        switch (p.shape) {
          case 'circle':
            ctx.beginPath();
            ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
            ctx.fill();
            break;
          case 'rect':
            ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
            break;
          case 'star':
            drawStar(0, 0, p.size / 2, p.color);
            break;
        }

        ctx.restore();

        // Recycle particle when it exits the bottom
        if (p.y > canvas.height + 20) {
          particles[i] = createParticle();
        }
      });

      animFrameId = requestAnimationFrame(animate);
    }

    animate();

    // Pause animation when tab is hidden (Efficiency)
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) {
        cancelAnimationFrame(animFrameId);
      } else {
        animate();
      }
    });
  })();

  /* ================================================================
     2. NAVBAR SCROLL BEHAVIOUR
     ================================================================ */
  (function initNavbar() {
    const navbar     = document.getElementById('navbar');
    const scrollBtn  = document.getElementById('scroll-top');
    if (!navbar) return;

    /** Section IDs mapped to their nav link selectors */
    const sectionIds = ['services', 'gallery', 'pricing', 'contact'];

    function onScroll() {
      const y = window.scrollY;

      // Toggle glass effect on navbar
      navbar.classList.toggle('scrolled', y > 60);

      // Show/hide scroll-to-top button
      if (scrollBtn) scrollBtn.classList.toggle('show', y > 400);

      // Highlight active nav link
      sectionIds.forEach(function (id) {
        const section = document.getElementById(id);
        if (!section) return;
        const links = document.querySelectorAll(`#nav-links a[href="#${id}"]`);
        const rect  = section.getBoundingClientRect();
        const active = rect.top <= 80 && rect.bottom > 80;
        links.forEach(function (link) {
          link.classList.toggle('active', active);
          link.setAttribute('aria-current', active ? 'page' : 'false');
        });
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    if (scrollBtn) {
      scrollBtn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  })();

  /* ================================================================
     3. MOBILE MENU
     ================================================================ */
  (function initMobileMenu() {
    const hamburger   = document.getElementById('hamburger');
    const mobileMenu  = document.getElementById('mobile-menu');
    const mobileClose = document.getElementById('mobile-close');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    if (!hamburger || !mobileMenu) return;

    function openMenu() {
      mobileMenu.classList.add('open');
      hamburger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      // Move focus inside the menu for keyboard users
      if (mobileClose) mobileClose.focus();
    }

    function closeMenu() {
      mobileMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      hamburger.focus();
    }

    hamburger.addEventListener('click', openMenu);
    if (mobileClose) mobileClose.addEventListener('click', closeMenu);
    mobileLinks.forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        closeMenu();
      }
    });
  })();

  /* ================================================================
     4. SCROLL-TRIGGERED ANIMATIONS (IntersectionObserver)
     ================================================================ */
  (function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-up, .fade-in');
    if (!fadeElements.length) return;

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Stop observing once animated
          }
        });
      },
      { threshold: 0.12 }
    );

    fadeElements.forEach(function (el) {
      observer.observe(el);
    });
  })();

  /* ================================================================
     5. ANIMATED STATISTICS COUNTERS
     ================================================================ */
  (function initCounters() {
    const statsSection = document.getElementById('stats');
    if (!statsSection) return;

    let triggered = false;

    /**
     * Animates a counter from 0 to target using ease-out cubic easing.
     * @param {HTMLElement} el       - Element to update
     * @param {number}      target   - Target numeric value
     * @param {string}      suffix   - Suffix appended after number (e.g. '+', '%')
     * @param {number}      duration - Animation duration in ms
     */
    function animateCounter(el, target, suffix, duration) {
      const start = performance.now();

      function step(now) {
        const elapsed  = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased    = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        el.textContent = Math.round(eased * target) + suffix;
        if (progress < 1) requestAnimationFrame(step);
      }

      requestAnimationFrame(step);
    }

    const observer = new IntersectionObserver(
      function (entries) {
        if (entries[0].isIntersecting && !triggered) {
          triggered = true;
          observer.disconnect();

          document.querySelectorAll('.stat-number[data-target]').forEach(function (el) {
            const target = parseInt(el.dataset.target, 10);
            const suffix = el.dataset.suffix || '';
            animateCounter(el, target, suffix, 1800);
          });
        }
      },
      { threshold: 0.40 }
    );

    observer.observe(statsSection);
  })();

  /* ================================================================
     6. GALLERY CATEGORY FILTER
     ================================================================ */
  (function initGalleryFilter() {
    const filterBtns   = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (!filterBtns.length) return;

    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const filter = btn.dataset.filter;

        // Update button states + ARIA
        filterBtns.forEach(function (b) {
          b.classList.remove('active');
          b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');

        // Show/hide items
        galleryItems.forEach(function (item) {
          const match = filter === 'all' || item.dataset.cat === filter;
          if (match) {
            item.classList.remove('hidden');
            item.removeAttribute('aria-hidden');
          } else {
            item.classList.add('hidden');
            item.setAttribute('aria-hidden', 'true');
          }
        });
      });
    });
  })();

  /* ================================================================
     7. TESTIMONIALS CAROUSEL
     ================================================================ */
  (function initCarousel() {
    const track  = document.getElementById('testimonials-track');
    const prevBtn = document.getElementById('tctl-prev');
    const nextBtn = document.getElementById('tctl-next');
    const dots   = document.querySelectorAll('.tctl-dot');
    if (!track) return;

    const slides = track.querySelectorAll('.testimonial-slide');
    let current  = 0;
    let autoTimer;

    /**
     * Navigate to a specific slide index.
     * @param {number} idx
     */
    function goTo(idx) {
      current = ((idx % slides.length) + slides.length) % slides.length;
      track.style.transform = `translateX(-${current * 100}%)`;

      dots.forEach(function (dot, i) {
        const active = i === current;
        dot.classList.toggle('active', active);
        dot.setAttribute('aria-selected', String(active));
      });

      // Update live region for screen readers
      const liveRegion = document.getElementById('carousel-live');
      if (liveRegion) {
        liveRegion.textContent = `Testimonial ${current + 1} of ${slides.length}`;
      }
    }

    function resetAuto() {
      clearInterval(autoTimer);
      autoTimer = setInterval(function () { goTo(current + 1); }, 5000);
    }

    if (prevBtn) prevBtn.addEventListener('click', function () { goTo(current - 1); resetAuto(); });
    if (nextBtn) nextBtn.addEventListener('click', function () { goTo(current + 1); resetAuto(); });

    dots.forEach(function (dot) {
      dot.addEventListener('click', function () {
        goTo(parseInt(dot.dataset.idx, 10));
        resetAuto();
      });
    });

    // Keyboard navigation on the carousel
    track.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft')  { goTo(current - 1); resetAuto(); }
      if (e.key === 'ArrowRight') { goTo(current + 1); resetAuto(); }
    });

    resetAuto();
  })();

  /* ================================================================
     8. HERO PARALLAX
     ================================================================ */
  (function initParallax() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const heroContent = document.querySelector('.hero-content');
    if (!heroContent) return;

    window.addEventListener('scroll', function () {
      const y = window.scrollY;
      heroContent.style.transform = `translateY(${y * 0.25}px)`;
      heroContent.style.opacity   = String(Math.max(0, 1 - y / 600));
    }, { passive: true });
  })();

  /* ================================================================
     9. INQUIRY FORM VALIDATION
     ================================================================ */
  (function initForm() {
    const form       = document.getElementById('inquiry-form');
    const successMsg = document.getElementById('success-msg');
    if (!form) return;

    /**
     * Show a field-level error message.
     * @param {HTMLElement} field   - Input/select/textarea element
     * @param {string}      message - Error text to display
     */
    function showError(field, message) {
      field.setAttribute('aria-invalid', 'true');
      field.style.borderColor = 'var(--color-error)';
      const errorEl = document.getElementById(field.id + '-error');
      if (errorEl) {
        errorEl.textContent = message;
        errorEl.classList.add('visible');
      }
    }

    /**
     * Clear a field-level error.
     * @param {HTMLElement} field
     */
    function clearError(field) {
      field.removeAttribute('aria-invalid');
      field.style.borderColor = '';
      const errorEl = document.getElementById(field.id + '-error');
      if (errorEl) {
        errorEl.textContent = '';
        errorEl.classList.remove('visible');
      }
    }

    // Live validation — clear error as user types
    form.querySelectorAll('input, select, textarea').forEach(function (field) {
      field.addEventListener('input', function () { clearError(field); });
      field.addEventListener('change', function () { clearError(field); });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const nameField  = form.querySelector('#name');
      const emailField = form.querySelector('#email');
      const typeField  = form.querySelector('#event-type');
      const dateField  = form.querySelector('#event-date');

      // Clear previous errors
      [nameField, emailField, typeField, dateField].forEach(clearError);

      let firstInvalid = null;
      let valid = true;

      // Name — required, min 2 characters
      const nameVal = sanitise(nameField.value.trim());
      if (!nameVal || nameVal.length < 2) {
        showError(nameField, 'Please enter your full name (at least 2 characters).');
        if (!firstInvalid) firstInvalid = nameField;
        valid = false;
      }

      // Email — required, valid format
      if (!isValidEmail(emailField.value.trim())) {
        showError(emailField, 'Please enter a valid email address.');
        if (!firstInvalid) firstInvalid = emailField;
        valid = false;
      }

      // Event type — required
      if (!typeField.value) {
        showError(typeField, 'Please select your event type.');
        if (!firstInvalid) firstInvalid = typeField;
        valid = false;
      }

      // Event date — required and must be in the future
      if (!dateField.value) {
        showError(dateField, 'Please select your event date.');
        if (!firstInvalid) firstInvalid = dateField;
        valid = false;
      } else {
        const today    = new Date();
        today.setHours(0, 0, 0, 0);
        const selected = new Date(dateField.value);
        if (selected < today) {
          showError(dateField, 'Event date must be in the future.');
          if (!firstInvalid) firstInvalid = dateField;
          valid = false;
        }
      }

      if (!valid) {
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      // Simulate async submission
      const submitBtn = form.querySelector('.form-submit');
      const originalContent = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin" aria-hidden="true"></i> Sending…';
      submitBtn.disabled = true;
      submitBtn.setAttribute('aria-busy', 'true');

      setTimeout(function () {
        form.style.display = 'none';
        if (successMsg) {
          successMsg.classList.add('show');
          // Move focus to success message for screen readers
          const heading = successMsg.querySelector('h3');
          if (heading) {
            heading.setAttribute('tabindex', '-1');
            heading.focus();
          }
        }
      }, 1400);
    });
  })();

  /* ================================================================
     10. SMOOTH ANCHOR SCROLLING
     ================================================================ */
  (function initSmoothScroll() {
    const navbar = document.getElementById('navbar');

    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        const targetSelector = anchor.getAttribute('href');
        if (targetSelector === '#') return;
        const target = document.querySelector(targetSelector);
        if (!target) return;

        e.preventDefault();
        const navHeight = navbar ? navbar.offsetHeight : 0;
        const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
        window.scrollTo({ top: top, behavior: 'smooth' });
      });
    });
  })();

  /* ================================================================
     11. NEWSLETTER SUBSCRIBE
     ================================================================ */
  (function initNewsletter() {
    const btn   = document.querySelector('.newsletter-btn');
    const input = document.querySelector('.newsletter-input');
    if (!btn || !input) return;

    btn.addEventListener('click', function () {
      const val = input.value.trim();

      if (!isValidEmail(val)) {
        input.style.borderColor = 'var(--color-error)';
        input.setAttribute('aria-invalid', 'true');
        input.focus();
        return;
      }

      // Success state
      input.style.borderColor = 'var(--color-success)';
      input.removeAttribute('aria-invalid');
      input.value    = '✓ Subscribed!';
      input.readOnly = true;
      btn.disabled   = true;

      setTimeout(function () {
        input.style.borderColor = '';
        input.value    = '';
        input.readOnly = false;
        btn.disabled   = false;
      }, 3000);
    });

    // Allow submit via Enter key
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') btn.click();
    });
  })();

  /* ================================================================
     12. KEYBOARD ACCESSIBILITY — GALLERY ITEMS
     ================================================================ */
  (function initGalleryA11y() {
    // Make gallery items keyboard-focusable and trigger hover overlay on focus
    document.querySelectorAll('.gallery-item').forEach(function (item) {
      item.setAttribute('tabindex', '0');

      item.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const overlay = item.querySelector('.gallery-overlay');
          if (overlay) {
            // Toggle visibility — simple keyboard interaction
            const isVisible = overlay.style.opacity === '1';
            overlay.style.opacity = isVisible ? '' : '1';
          }
        }
      });
    });
  })();

})();
