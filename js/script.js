/**
 * STARTUP SAAS — CORE JAVASCRIPT ENGINE
 * Pure Vanilla JavaScript (ES6+) | Zero External Dependencies
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileDrawer();
  initSearchModal();
  initPricingToggle();
  initTestimonialSlider();
  initFaqAccordion();
  initPasswordToggles();
  initFormValidation();
  initCharts();
  initDashboardDrawer();
  initCounterAnimations();
  initPeriodSwitchers();
  initHeroTabs();
  initHero3DTilt();
  initScrollAnimations();
  initLoginRoleSelector();
  initDashboardUserSession();
});

/* ==========================================================================
   1. STICKY HEADER
   ========================================================================== */
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ==========================================================================
   2. MOBILE NAVIGATION DRAWER
   ========================================================================== */
function initMobileDrawer() {
  const toggleBtns = document.querySelectorAll('.mobile-toggle-btn:not(.dashboard-menu-toggle)');
  const drawer = document.querySelector('.mobile-drawer');
  const overlay = document.querySelector('.mobile-drawer-overlay');
  const closeBtn = document.querySelector('.mobile-drawer-close');
  const navLinks = document.querySelectorAll('.mobile-nav-link');

  if (!drawer || !overlay) return;

  const openDrawer = () => {
    drawer.classList.add('active');
    overlay.classList.add('active');
    document.documentElement.classList.add('drawer-open');
    document.body.classList.add('drawer-open');
  };

  const closeDrawer = () => {
    drawer.classList.remove('active');
    overlay.classList.remove('active');
    document.documentElement.classList.remove('drawer-open');
    document.body.classList.remove('drawer-open');
  };

  toggleBtns.forEach(btn => btn.addEventListener('click', openDrawer));
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (overlay) {
    overlay.addEventListener('click', closeDrawer);
    overlay.addEventListener('touchmove', (e) => {
      e.preventDefault();
    }, { passive: false });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('active')) {
      closeDrawer();
    }
  });
}

/* ==========================================================================
   3. GLOBAL SEARCH MODAL & LIVE SEARCH
   ========================================================================== */
function initSearchModal() {
  const searchTriggers = document.querySelectorAll('.search-trigger-btn, [data-search-trigger]');
  const modalOverlay = document.querySelector('.search-modal-overlay');
  const closeBtn = document.querySelector('.search-modal-close');
  const searchInput = document.querySelector('.search-input-field');
  const searchResults = document.querySelector('.search-results-box');

  if (!modalOverlay || !searchInput || !searchResults) return;

  // Search catalog index
  const searchIndex = [
    { title: 'Workflow Automation', desc: 'Build zero-code triggers and conditional actions.', category: 'Features', url: 'features.html#automation' },
    { title: 'Real-time Team Collaboration', desc: 'Multiplayer editing, threads, and assigned tasks.', category: 'Features', url: 'features.html#collaboration' },
    { title: 'Predictive Analytics & Reports', desc: 'Cohort retention, MRR charts, and KPI trends.', category: 'Features', url: 'features.html#analytics' },
    { title: 'Enterprise Cloud Security', desc: 'SOC2 Type II, 256-bit encryption, SAML/SSO.', category: 'Product', url: 'product.html#security' },
    { title: 'Solutions for Startups', desc: 'Scale fast with pre-built workspace templates.', category: 'Solutions', url: 'solutions.html#startups' },
    { title: 'Solutions for Remote Teams', desc: 'Asynchronous communication & team tracking.', category: 'Solutions', url: 'solutions.html#remote' },
    { title: 'Solutions for Enterprise', desc: 'Custom SLAs, dedicated servers & VIP support.', category: 'Solutions', url: 'solutions.html#enterprise' },
    { title: 'Slack & Email Integrations', desc: 'Connect communication channels seamlessly.', category: 'Integrations', url: 'integrations.html' },
    { title: 'Pricing & Plans', desc: 'Explore Starter, Growth, Business, and Enterprise plans.', category: 'Pricing', url: 'pricing.html' },
    { title: 'API Documentation & SDKs', desc: 'Developer reference guides, webhooks, and REST API.', category: 'Resources', url: 'resources.html' },
    { title: 'User Dashboard Preview', desc: 'Experience live tasks, team metrics, and analytics.', category: 'Dashboard', url: 'user-dashboard.html' },
    { title: 'Admin Governance Console', desc: 'Manage subscriptions, team seats, and roles.', category: 'Dashboard', url: 'admin-dashboard.html' }
  ];

  const openSearch = () => {
    // Close mobile drawer if open
    const drawer = document.querySelector('.mobile-drawer');
    const drawerOverlay = document.querySelector('.mobile-drawer-overlay');
    if (drawer) drawer.classList.remove('active');
    if (drawerOverlay) drawerOverlay.classList.remove('active');

    modalOverlay.classList.add('active');
    document.documentElement.classList.add('drawer-open');
    document.body.classList.add('drawer-open');
    setTimeout(() => searchInput.focus(), 50);
    renderResults(searchIndex.slice(0, 5));
  };

  const closeSearch = () => {
    modalOverlay.classList.remove('active');
    document.documentElement.classList.remove('drawer-open');
    document.body.classList.remove('drawer-open');
    searchInput.value = '';
  };

  searchTriggers.forEach(btn => btn.addEventListener('click', openSearch));
  if (closeBtn) closeBtn.addEventListener('click', closeSearch);

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeSearch();
  });

  // Shortcut Ctrl+K / Cmd+K
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      modalOverlay.classList.contains('active') ? closeSearch() : openSearch();
    }
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeSearch();
    }
  });

  const renderResults = (items) => {
    if (items.length === 0) {
      searchResults.innerHTML = `
        <div style="padding: 2.5rem 1rem; text-align: center; color: var(--slate-500);">
          <svg style="width: 36px; height: 36px; margin: 0 auto 0.75rem auto; color: var(--slate-400);" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          <div style="font-weight: 600; font-size: 1.05rem; color: var(--slate-800); margin-bottom: 0.25rem;">No results found</div>
          <p style="font-size: 0.875rem;">Try searching for "analytics", "pricing", "startups", or "security".</p>
        </div>
      `;
      return;
    }

    searchResults.innerHTML = items.map(item => `
      <a href="${item.url}" class="search-item">
        <div>
          <div style="font-weight: 600; font-size: 0.95rem; margin-bottom: 0.15rem;">${escapeHtml(item.title)}</div>
          <div style="font-size: 0.825rem; color: var(--slate-500);">${escapeHtml(item.desc)}</div>
        </div>
        <div class="search-item-meta">
          <span class="search-item-tag">${escapeHtml(item.category)}</span>
          <svg class="icon icon-sm" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </div>
      </a>
    `).join('');
  };

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.trim().toLowerCase();
    if (!query) {
      renderResults(searchIndex.slice(0, 5));
      return;
    }

    const filtered = searchIndex.filter(item => 
      item.title.toLowerCase().includes(query) ||
      item.desc.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query)
    );

    renderResults(filtered);
  });
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/* ==========================================================================
   4. PRICING MONTHLY / YEARLY SWITCHER
   ========================================================================== */
function initPricingToggle() {
  const toggle = document.querySelector('.pricing-toggle-switch');
  if (!toggle) return;

  const starterPrice = document.querySelector('[data-price-starter]');
  const growthPrice = document.querySelector('[data-price-growth]');
  const businessPrice = document.querySelector('[data-price-business]');
  const enterprisePrice = document.querySelector('[data-price-enterprise]');
  const billingCycleTexts = document.querySelectorAll('.price-cycle-text');

  let isYearly = false;

  const updatePrices = () => {
    if (isYearly) {
      toggle.classList.add('active');
      if (starterPrice) starterPrice.textContent = '$23';
      if (growthPrice) growthPrice.textContent = '$63';
      if (businessPrice) businessPrice.textContent = '$159';
      if (enterprisePrice) enterprisePrice.textContent = '$399';
      billingCycleTexts.forEach(el => el.textContent = '/ user / mo, billed yearly');
    } else {
      toggle.classList.remove('active');
      if (starterPrice) starterPrice.textContent = '$29';
      if (growthPrice) growthPrice.textContent = '$79';
      if (businessPrice) businessPrice.textContent = '$199';
      if (enterprisePrice) enterprisePrice.textContent = '$499';
      billingCycleTexts.forEach(el => el.textContent = '/ user / mo, billed monthly');
    }
  };

  toggle.addEventListener('click', () => {
    isYearly = !isYearly;
    updatePrices();
  });
}

/* ==========================================================================
   5. TESTIMONIAL SLIDER
   ========================================================================== */
function initTestimonialSlider() {
  const track = document.querySelector('.testimonial-track');
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.slider-dot');
  const prevBtn = document.querySelector('.slider-btn-prev');
  const nextBtn = document.querySelector('.slider-btn-next');

  if (!track || slides.length === 0) return;

  let currentIndex = 0;
  let autoplayTimer = null;

  const goToSlide = (index) => {
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    currentIndex = index;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentIndex);
    });
  };

  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      goToSlide(idx);
      resetAutoplay();
    });
  });

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      goToSlide(currentIndex - 1);
      resetAutoplay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      goToSlide(currentIndex + 1);
      resetAutoplay();
    });
  }

  const startAutoplay = () => {
    autoplayTimer = setInterval(() => {
      goToSlide(currentIndex + 1);
    }, 6000);
  };

  const resetAutoplay = () => {
    clearInterval(autoplayTimer);
    startAutoplay();
  };

  startAutoplay();

  // Swipe support
  let touchStartX = 0;
  let touchEndX = 0;

  track.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchStartX - touchEndX > 50) {
      goToSlide(currentIndex + 1);
      resetAutoplay();
    } else if (touchEndX - touchStartX > 50) {
      goToSlide(currentIndex - 1);
      resetAutoplay();
    }
  }, { passive: true });
}

/* ==========================================================================
   6. FAQ ACCORDION
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (faqItems.length === 0) return;

  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question-btn');
    const panel = item.querySelector('.faq-answer-panel');

    if (!btn || !panel) return;

    btn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other panels for accordion effect
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherPanel = otherItem.querySelector('.faq-answer-panel');
          if (otherPanel) otherPanel.style.maxHeight = null;
        }
      });

      if (isActive) {
        item.classList.remove('active');
        panel.style.maxHeight = null;
      } else {
        item.classList.add('active');
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });
}

/* ==========================================================================
   7. PASSWORD SHOW / HIDE TOGGLE
   ========================================================================== */
function initPasswordToggles() {
  const toggleBtns = document.querySelectorAll('.password-toggle-btn');
  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const input = btn.closest('.input-with-icon').querySelector('input');
      if (!input) return;

      if (input.type === 'password') {
        input.type = 'text';
        btn.innerHTML = `<svg class="icon icon-sm" viewBox="0 0 24 24"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>`;
      } else {
        input.type = 'password';
        btn.innerHTML = `<svg class="icon icon-sm" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
      }
    });
  });
}

/* ==========================================================================
   8. CLIENT-SIDE FORM VALIDATION
/* ==========================================================================
   8. CLIENT-SIDE FORM VALIDATION & STRICT INPUT SANITIZATION
   ========================================================================== */
function initFormValidation() {
  // Real-time input sanitization: Block numbers in name fields
  const nameInputs = document.querySelectorAll('#fullName, #contactName, input[data-type="name"]');
  nameInputs.forEach(input => {
    // Prevent typing digits
    input.addEventListener('beforeinput', (e) => {
      if (e.data && /[0-9]/.test(e.data)) {
        e.preventDefault();
      }
    });
    // Sanitize on input and paste
    input.addEventListener('input', () => {
      const sanitized = input.value.replace(/[0-9]/g, '');
      if (input.value !== sanitized) {
        input.value = sanitized;
      }
    });
  });

  // Real-time input sanitization: Block letters in mobile/tel fields
  const mobileInputs = document.querySelectorAll('#regMobile, #contactMobile, input[type="tel"], input[data-type="tel"]');
  mobileInputs.forEach(input => {
    // Prevent typing letters
    input.addEventListener('beforeinput', (e) => {
      if (e.data && /[a-zA-Z]/.test(e.data)) {
        e.preventDefault();
      }
    });
    // Sanitize on input and paste
    input.addEventListener('input', () => {
      const sanitized = input.value.replace(/[a-zA-Z]/g, '');
      if (input.value !== sanitized) {
        input.value = sanitized;
      }
    });
  });

  const forms = document.querySelectorAll('.needs-validation');

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      const inputs = form.querySelectorAll('.form-control[required], input[type="checkbox"][required], select[required]');

      inputs.forEach(input => {
        const errorEl = input.closest('.form-group')?.querySelector('.form-error-msg');
        let fieldValid = true;
        let customErrorMsg = '';

        const val = input.value.trim();

        if (input.type === 'email') {
          const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailPattern.test(val)) {
            fieldValid = false;
            customErrorMsg = 'Please enter a valid work email address.';
          }
        } else if (input.id === 'fullName' || input.id === 'contactName' || input.getAttribute('data-type') === 'name') {
          // Strict name validation: letters, spaces, hyphens, apostrophes only (no numbers)
          if (val.length < 2) {
            fieldValid = false;
            customErrorMsg = 'Please enter your full name.';
          } else if (/[0-9]/.test(val)) {
            fieldValid = false;
            customErrorMsg = 'Name cannot contain numbers or digits.';
          } else if (!/^[A-Za-z\s.'-]+$/.test(val)) {
            fieldValid = false;
            customErrorMsg = 'Please enter letters only (no special characters or numbers).';
          }
        } else if (input.type === 'tel' || input.id === 'regMobile' || input.id === 'contactMobile') {
          // Strict mobile validation: digits, spaces, plus, hyphens, parentheses only (no letters)
          const digitsOnly = val.replace(/\D/g, '');
          if (/[a-zA-Z]/.test(val)) {
            fieldValid = false;
            customErrorMsg = 'Mobile number cannot contain letters or alphabets.';
          } else if (digitsOnly.length < 7 || val.length < 7) {
            fieldValid = false;
            customErrorMsg = 'Please enter a valid mobile number (min 7 digits).';
          } else if (!/^[\d\s+\-()]+$/.test(val)) {
            fieldValid = false;
            customErrorMsg = 'Mobile number contains invalid characters.';
          }
        } else if (input.type === 'password') {
          if (val.length < 6) {
            fieldValid = false;
            customErrorMsg = 'Password must be at least 6 characters.';
          }
        } else if (input.id === 'confirmPassword') {
          const pwd = form.querySelector('#password')?.value;
          if (input.value !== pwd || input.value.length === 0) {
            fieldValid = false;
            customErrorMsg = 'Passwords do not match.';
          }
        } else if (input.type === 'checkbox') {
          if (!input.checked) {
            fieldValid = false;
            customErrorMsg = 'You must accept the terms and conditions.';
          }
        } else {
          if (val === '') {
            fieldValid = false;
          }
        }

        if (!fieldValid) {
          input.classList.add('is-invalid');
          input.classList.remove('is-valid');
          if (errorEl) {
            if (customErrorMsg) errorEl.textContent = customErrorMsg;
            errorEl.style.display = 'block';
          }
          isValid = false;
        } else {
          input.classList.remove('is-invalid');
          input.classList.add('is-valid');
          if (errorEl) errorEl.style.display = 'none';
        }
      });

      if (isValid) {
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span style="display:inline-block; animation: spin 1s linear infinite;">⏳</span> Processing...`;

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
          
          if (form.id === 'loginForm') {
            const emailInput = form.querySelector('#email')?.value.trim() || 'kappalasuresh92@gmail.com';
            const role = form.querySelector('input[name="loginRole"]:checked')?.value || 'user';
            const rawName = emailInput.split('@')[0] || 'Kappalasuresh92';
            const displayName = rawName.charAt(0).toUpperCase() + rawName.slice(1);
            const userRoleTitle = role === 'admin' ? 'Super Admin' : 'Product Lead';
            const initials = displayName.slice(0, 2).toUpperCase();

            const sessionUser = {
              name: displayName,
              email: emailInput,
              role: userRoleTitle,
              roleKey: role,
              initials: initials
            };
            localStorage.setItem('stackly_user', JSON.stringify(sessionUser));

            window.location.href = role === 'admin' ? 'admin-dashboard.html' : 'user-dashboard.html';
          } else if (form.id === 'registerForm') {
            const fullName = form.querySelector('#fullName')?.value.trim() || 'Kappalasuresh92';
            const regEmail = form.querySelector('#regEmail')?.value.trim() || 'kappalasuresh92@gmail.com';
            const role = form.querySelector('#roleSelect')?.value || 'user';
            const userRoleTitle = role === 'admin' ? 'Super Admin' : 'Product Lead';
            const initials = fullName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'KS';

            const sessionUser = {
              name: fullName,
              email: regEmail,
              role: userRoleTitle,
              roleKey: role,
              initials: initials
            };
            localStorage.setItem('stackly_user', JSON.stringify(sessionUser));

            window.location.href = role === 'admin' ? 'admin-dashboard.html' : 'user-dashboard.html';
          } else if (form.id === 'contactForm') {
            showToast('Thank you! Your message has been received. Our team will contact you shortly.');
            form.reset();
            inputs.forEach(i => i.classList.remove('is-valid'));
          }
        }, 1200);
      }
    });

    // Real-time error removal
    form.querySelectorAll('.form-control, input[type="checkbox"]').forEach(input => {
      input.addEventListener('input', () => {
        input.classList.remove('is-invalid');
        const errorEl = input.closest('.form-group')?.querySelector('.form-error-msg');
        if (errorEl) errorEl.style.display = 'none';
      });
    });
  });
}

function showToast(message) {
  const toast = document.createElement('div');
  toast.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    background: #0F172A;
    color: #FFFFFF;
    padding: 1rem 1.5rem;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    z-index: 9999;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    border-left: 4px solid #10B981;
    transform: translateY(100px);
    transition: transform 0.3s ease;
  `;
  toast.innerHTML = `<svg style="width:20px;height:20px;color:#10B981;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> ${escapeHtml(message)}`;
  document.body.appendChild(toast);

  setTimeout(() => toast.style.transform = 'translateY(0)', 50);
  setTimeout(() => {
    toast.style.transform = 'translateY(100px)';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

/* ==========================================================================
   9. INTERACTIVE CANVAS CHARTS (REVENUE, TASKS, ACTIVITY)
   ========================================================================== */
function initCharts() {
  drawAnalyticsChart('analyticsCanvas', 'monthly');
  drawUserDashboardChart('userActivityCanvas');
  drawAdminRevenueChart('adminRevenueCanvas');
  drawHeroSparkline('heroSparklineCanvas');
}

function drawHeroSparkline(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas || !canvas.parentElement) return;
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const w = canvas.parentElement.clientWidth || 300;
  const h = 140;

  canvas.width = w * dpr;
  canvas.height = h * dpr;
  ctx.scale(dpr, dpr);
  canvas.style.width = '100%';
  canvas.style.height = `${h}px`;

  const points = [20, 35, 28, 48, 42, 68, 62, 85, 95];
  const step = w / (points.length - 1);

  ctx.beginPath();
  ctx.moveTo(0, h - (points[0] / 100) * (h - 20));
  points.forEach((p, i) => {
    ctx.lineTo(i * step, h - (p / 100) * (h - 20) - 10);
  });

  // Gradient fill
  const grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, 'rgba(59, 130, 246, 0.45)');
  grad.addColorStop(1, 'rgba(59, 130, 246, 0.0)');

  ctx.strokeStyle = '#3B82F6';
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.lineTo(w, h);
  ctx.lineTo(0, h);
  ctx.fillStyle = grad;
  ctx.fill();
}

function drawAnalyticsChart(canvasId, period = 'monthly') {
  const canvas = document.getElementById(canvasId);
  if (!canvas || !canvas.parentElement) return;
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const w = canvas.parentElement.clientWidth || 300;
  const h = 260;

  canvas.width = w * dpr;
  canvas.height = h * dpr;
  ctx.scale(dpr, dpr);
  canvas.style.width = '100%';
  canvas.style.height = `${h}px`;

  let labels, dataset1, dataset2;
  if (period === 'weekly') {
    labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    dataset1 = [32, 45, 58, 51, 69, 78, 88];
    dataset2 = [20, 28, 35, 42, 50, 56, 64];
  } else if (period === 'yearly') {
    labels = ['2021', '2022', '2023', '2024', '2025', '2026'];
    dataset1 = [120, 240, 480, 890, 1450, 2300];
    dataset2 = [80, 160, 310, 620, 1100, 1750];
  } else {
    labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    dataset1 = [25, 38, 42, 55, 68, 62, 75, 89, 94, 112, 128, 145];
    dataset2 = [15, 22, 30, 38, 45, 52, 59, 68, 74, 85, 96, 110];
  }

  const maxVal = Math.max(...dataset1) * 1.2;
  const stepX = (w - 40) / (labels.length - 1);

  // Draw grid lines
  ctx.strokeStyle = '#F1F5F9';
  ctx.lineWidth = 1;
  for (let i = 0; i < 5; i++) {
    const y = 20 + (i * (h - 60)) / 4;
    ctx.beginPath();
    ctx.moveTo(30, y);
    ctx.lineTo(w - 10, y);
    ctx.stroke();
  }

  // Draw labels
  ctx.fillStyle = '#94A3B8';
  ctx.font = '10px Inter, sans-serif';
  labels.forEach((lbl, i) => {
    ctx.fillText(lbl, 30 + i * stepX - 8, h - 8);
  });

  // Function to draw line
  const drawLine = (data, color, fillGrad) => {
    ctx.beginPath();
    data.forEach((val, i) => {
      const x = 30 + i * stepX;
      const y = h - 35 - (val / maxVal) * (h - 60);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });

    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.stroke();

    if (fillGrad) {
      ctx.lineTo(30 + (data.length - 1) * stepX, h - 35);
      ctx.lineTo(30, h - 35);
      ctx.fillStyle = fillGrad;
      ctx.fill();
    }
  };

  const grad1 = ctx.createLinearGradient(0, 0, 0, h);
  grad1.addColorStop(0, 'rgba(37, 99, 235, 0.2)');
  grad1.addColorStop(1, 'rgba(37, 99, 235, 0.0)');

  drawLine(dataset1, '#2563EB', grad1);
  drawLine(dataset2, '#7C3AED', null);
}

function drawUserDashboardChart(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas || !canvas.parentElement) return;
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const w = canvas.parentElement.clientWidth || 300;
  const h = 240;

  canvas.width = w * dpr;
  canvas.height = h * dpr;
  ctx.scale(dpr, dpr);
  canvas.style.width = '100%';
  canvas.style.height = `${h}px`;

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const tasks = [12, 19, 15, 25, 22, 8, 14];
  const stepX = (w - 20) / days.length;
  const barW = Math.max(12, Math.min(26, stepX - 10));

  ctx.fillStyle = '#F8FAFC';
  ctx.fillRect(0, 0, w, h);

  days.forEach((day, i) => {
    const x = 10 + i * stepX + (stepX - barW) / 2;
    const barH = (tasks[i] / 30) * (h - 60);
    const y = h - 30 - barH;

    // Draw bar with gradient
    const grad = ctx.createLinearGradient(0, y, 0, y + barH);
    grad.addColorStop(0, '#3B82F6');
    grad.addColorStop(1, '#1D4ED8');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.roundRect(x, y, barW, barH, [4, 4, 0, 0]);
    ctx.fill();

    // Value text
    ctx.fillStyle = '#0F172A';
    ctx.font = 'bold 10px Inter, sans-serif';
    ctx.fillText(tasks[i], x + (barW > 20 ? 4 : 1), y - 5);

    // Day label
    ctx.fillStyle = '#64748B';
    ctx.font = '10px Inter, sans-serif';
    ctx.fillText(day, x + (barW > 20 ? 1 : -2), h - 10);
  });
}

function drawAdminRevenueChart(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas || !canvas.parentElement) return;
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const w = canvas.parentElement.clientWidth || 300;
  const h = 260;

  canvas.width = w * dpr;
  canvas.height = h * dpr;
  ctx.scale(dpr, dpr);
  canvas.style.width = '100%';
  canvas.style.height = `${h}px`;

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
  const mrr = [42, 54, 61, 78, 92, 105, 124, 148, 165];
  const stepX = (w - 40) / (months.length - 1);

  ctx.beginPath();
  mrr.forEach((val, i) => {
    const x = 20 + i * stepX;
    const y = h - 35 - (val / 200) * (h - 70);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });

  const grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, 'rgba(16, 185, 129, 0.35)');
  grad.addColorStop(1, 'rgba(16, 185, 129, 0.0)');

  ctx.strokeStyle = '#10B981';
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.lineTo(20 + (months.length - 1) * stepX, h - 35);
  ctx.lineTo(20, h - 35);
  ctx.fillStyle = grad;
  ctx.fill();

  // Dots
  mrr.forEach((val, i) => {
    const x = 20 + i * stepX;
    const y = h - 35 - (val / 200) * (h - 70);
    ctx.beginPath();
    ctx.arc(x, y, 3.5, 0, Math.PI * 2);
    ctx.fillStyle = '#10B981';
    ctx.fill();
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#64748B';
    ctx.font = '10px Inter, sans-serif';
    ctx.fillText(months[i], x - 10, h - 12);
  });
}

function initPeriodSwitchers() {
  const btns = document.querySelectorAll('.period-btn');
  btns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const parent = btn.closest('.period-pill-toggle');
      if (parent) {
        parent.querySelectorAll('.period-btn').forEach(b => b.classList.remove('active'));
      }
      btn.classList.add('active');
      const period = btn.getAttribute('data-period') || 'monthly';
      drawAnalyticsChart('analyticsCanvas', period);
    });
  });
}

/* ==========================================================================
   10. DASHBOARD DRAWER (MOBILE)
   ========================================================================== */
function initDashboardDrawer() {
  const toggleBtns = document.querySelectorAll('.dashboard-menu-toggle');
  const sidebar = document.querySelector('.dashboard-sidebar');
  const overlay = document.querySelector('.dashboard-drawer-overlay');
  const closeBtn = document.querySelector('.dashboard-sidebar-close');
  const navLinks = document.querySelectorAll('.dashboard-sidebar .sidebar-nav-link');

  if (!sidebar) return;

  const openSidebar = () => {
    sidebar.classList.add('active');
    if (overlay) overlay.classList.add('active');
    document.documentElement.classList.add('drawer-open');
    document.body.classList.add('drawer-open');
  };

  const closeSidebar = () => {
    sidebar.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    document.documentElement.classList.remove('drawer-open');
    document.body.classList.remove('drawer-open');
  };

  toggleBtns.forEach(btn => btn.addEventListener('click', openSidebar));
  if (closeBtn) closeBtn.addEventListener('click', closeSidebar);

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 1024) {
        closeSidebar();
      }
    });
  });

  if (overlay) {
    overlay.addEventListener('click', closeSidebar);
    overlay.addEventListener('touchmove', (e) => {
      e.preventDefault();
    }, { passive: false });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar.classList.contains('active')) {
      closeSidebar();
    }
  });

  // Responsive chart auto-resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (typeof initCharts === 'function') {
        initCharts();
      }
    }, 150);
  });
}

/* ==========================================================================
   11. NUMBER COUNTER ANIMATIONS
   ========================================================================== */
function initCounterAnimations() {
  const counters = document.querySelectorAll('[data-counter]');
  if (counters.length === 0) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const targetVal = parseFloat(target.getAttribute('data-counter'));
        const prefix = target.getAttribute('data-prefix') || '';
        const suffix = target.getAttribute('data-suffix') || '';
        const duration = 1500;
        const startTime = performance.now();

        const updateCount = (currentTime) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease out expo
          const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
          const currentVal = Math.floor(easeProgress * targetVal);

          target.textContent = `${prefix}${currentVal.toLocaleString()}${suffix}`;

          if (progress < 1) {
            requestAnimationFrame(updateCount);
          } else {
            target.textContent = `${prefix}${targetVal.toLocaleString()}${suffix}`;
          }
        };

        requestAnimationFrame(updateCount);
        obs.unobserve(target);
      }
    });
  }, { threshold: 0.2 });

  counters.forEach(c => observer.observe(c));
}

/* ==========================================================================
   12. HERO INTERACTIVE SHOWCASE TABS
   ========================================================================== */
function initHeroTabs() {
  const tabButtons = document.querySelectorAll('.hero-tab-btn');
  const previewImg = document.querySelector('.hero-preview-img-container img');
  if (!tabButtons.length || !previewImg) return;

  const tabImages = [
    'assets/images/founder-growth-laptop.webp',
    'assets/images/dashboard-perspective-laptop.webp',
    'assets/images/saas-cloud-gears.webp',
    'assets/images/dashboard-dark-overview.webp'
  ];

  tabButtons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (tabImages[index]) {
        previewImg.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
        previewImg.style.opacity = '0.3';
        previewImg.style.transform = 'scale(0.98)';
        setTimeout(() => {
          previewImg.src = tabImages[index];
          previewImg.style.opacity = '1';
          previewImg.style.transform = 'scale(1)';
        }, 150);
      }
    });
  });
}

/* ==========================================================================
   13. LOGIN ROLE SELECTOR SWITCH
   ========================================================================== */
function initLoginRoleSelector() {
  const roleRadios = document.querySelectorAll('input[name="loginRole"]');
  const userCard = document.querySelector('.role-user-card');
  const adminCard = document.querySelector('.role-admin-card');
  const emailInput = document.querySelector('#loginForm #email');
  const submitBtn = document.querySelector('#loginForm button[type="submit"] span');

  if (!roleRadios.length || !userCard || !adminCard) return;

  const updateRoleUI = (selectedRole) => {
    if (selectedRole === 'admin') {
      adminCard.classList.add('active');
      adminCard.style.border = '2px solid var(--blue-500)';
      adminCard.style.background = 'var(--lavender-50)';
      const adminTitle = adminCard.querySelector('div:first-child');
      if (adminTitle) adminTitle.style.color = 'var(--blue-600)';

      userCard.classList.remove('active');
      userCard.style.border = '1.5px solid #64748B';
      userCard.style.background = 'var(--white)';
      const userTitle = userCard.querySelector('div:first-child');
      if (userTitle) userTitle.style.color = 'var(--slate-700)';

      if (emailInput && (emailInput.value === '' || emailInput.value === 'alex.member@stackly.io' || emailInput.value === 'alex.admin@stackly.io')) {
        emailInput.value = 'kappalasuresh92@gmail.com';
      }
      if (submitBtn) submitBtn.textContent = 'Sign In as Administrator';
    } else {
      userCard.classList.add('active');
      userCard.style.border = '2px solid var(--blue-500)';
      userCard.style.background = 'var(--lavender-50)';
      const userTitle = userCard.querySelector('div:first-child');
      if (userTitle) userTitle.style.color = 'var(--blue-600)';

      adminCard.classList.remove('active');
      adminCard.style.border = '1.5px solid #64748B';
      adminCard.style.background = 'var(--white)';
      const adminTitle = adminCard.querySelector('div:first-child');
      if (adminTitle) adminTitle.style.color = 'var(--slate-700)';

      if (emailInput && (emailInput.value === '' || emailInput.value === 'alex.admin@stackly.io' || emailInput.value === 'alex.member@stackly.io')) {
        emailInput.value = 'kappalasuresh92@gmail.com';
      }
      if (submitBtn) submitBtn.textContent = 'Sign In to Dashboard';
    }
  };

  roleRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      updateRoleUI(radio.value);
    });
  });
}

/* ==========================================================================
   14. DYNAMIC DASHBOARD USER SESSION & CREDENTIALS HYDRATION
   ========================================================================== */
function initDashboardUserSession() {
  const isDashboardPage = document.querySelector('.dashboard-layout');
  if (!isDashboardPage) return;

  const storedUser = localStorage.getItem('stackly_user');
  let user;
  if (storedUser) {
    try {
      user = JSON.parse(storedUser);
    } catch (e) {
      user = null;
    }
  }

  const isAdminContext = document.title.toLowerCase().includes('admin') || window.location.pathname.includes('admin-');

  // If not logged in yet or no stored user, default to user's real credentials
  if (!user) {
    user = {
      name: 'Kappalasuresh92',
      email: 'kappalasuresh92@gmail.com',
      role: isAdminContext ? 'Super Admin' : 'Product Lead',
      roleKey: isAdminContext ? 'admin' : 'user',
      initials: 'KS'
    };
  }

  const displayName = user.name || 'Kappalasuresh92';
  const displayEmail = user.email || 'kappalasuresh92@gmail.com';
  const displayRole = isAdminContext ? (user.role || 'Super Admin') : (user.role || 'Product Lead');
  const displayInitials = user.initials || displayName.slice(0, 2).toUpperCase();

  // 1. Update Topbar Greetings
  const topbarGreetings = document.querySelectorAll('.dashboard-topbar h2');
  topbarGreetings.forEach(el => {
    if (el.textContent.includes('Welcome Back') || el.textContent.includes('Welcome back') || el.textContent.includes('Alex')) {
      const emoji = isAdminContext ? '👑' : '👏';
      el.innerHTML = `Welcome Back, ${escapeHtml(displayName)}! ${emoji}`;
    }
  });

  // 2. Update Topbar User Widget
  const topbarUserGreetings = document.querySelectorAll('.dashboard-user-greeting');
  topbarUserGreetings.forEach(el => {
    el.innerHTML = `Welcome back, <strong>${escapeHtml(displayName)}</strong> 👋`;
  });

  const topbarUserAvatars = document.querySelectorAll('.dashboard-user-avatar span:first-child');
  topbarUserAvatars.forEach(el => {
    el.textContent = displayInitials;
  });

  const topbarUserRoles = document.querySelectorAll('.dashboard-user-role');
  topbarUserRoles.forEach(el => {
    if (isAdminContext) {
      el.textContent = `${displayRole} • Stackly HQ`;
    } else {
      el.textContent = `${displayRole} • Acme Labs`;
    }
  });

  // 3. Update Dark Hero Welcome Banner
  const welcomeBannerTitle = document.querySelector('.dashboard-welcome-title');
  if (welcomeBannerTitle) {
    const emoji = isAdminContext ? '👑' : '👏';
    welcomeBannerTitle.innerHTML = `Welcome back, ${escapeHtml(displayName)} ${emoji}`;
  }

  const welcomeBannerTags = document.querySelectorAll('.dashboard-welcome-tag');
  welcomeBannerTags.forEach(tag => {
    const text = tag.textContent;
    if (text.includes('Name:') || tag.innerHTML.includes('Alex Morgan') || tag.innerHTML.includes('Alexandre')) {
      tag.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
        <span>Name: <strong>${escapeHtml(displayName)}</strong></span>
      `;
    } else if (text.includes('Email:') || tag.innerHTML.includes('@acmelabs.com') || tag.innerHTML.includes('@stackly.io')) {
      tag.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
        <span>Email: <strong>${escapeHtml(displayEmail)}</strong></span>
      `;
    } else if (text.includes('Role:')) {
      tag.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
        <span>Role: <strong>${escapeHtml(displayRole)}</strong></span>
      `;
    }
  });

  // 4. Update Sidebar User Card
  const sidebarNames = document.querySelectorAll('.sidebar-user-name');
  sidebarNames.forEach(el => {
    el.textContent = displayName;
  });

  const sidebarAvatars = document.querySelectorAll('.sidebar-user-avatar');
  sidebarAvatars.forEach(el => {
    el.textContent = displayInitials;
  });

  const sidebarRoles = document.querySelectorAll('.sidebar-user-sub');
  sidebarRoles.forEach(el => {
    el.textContent = displayRole;
  });

  // 5. Update Profile page inputs if on user-profile.html
  const profileNameInput = document.getElementById('profileName');
  if (profileNameInput) {
    profileNameInput.value = displayName;
  }
  const profileEmailInput = document.getElementById('profileEmail');
  if (profileEmailInput) {
    profileEmailInput.value = displayEmail;
  }

  // 6. Profile Form Save handler
  const profileSaveBtn = document.querySelector('button[onclick*="Profile changes saved"]');
  if (profileSaveBtn && profileNameInput && profileEmailInput) {
    profileSaveBtn.onclick = function (e) {
      e.preventDefault();
      const updatedUser = {
        name: profileNameInput.value.trim() || displayName,
        email: profileEmailInput.value.trim() || displayEmail,
        role: displayRole,
        roleKey: isAdminContext ? 'admin' : 'user',
        initials: (profileNameInput.value.trim() || displayName).slice(0, 2).toUpperCase()
      };
      localStorage.setItem('stackly_user', JSON.stringify(updatedUser));
      initDashboardUserSession();
      showToast('Profile credentials updated and saved successfully!');
    };
  }
}

/* ==========================================================================
   16. HERO 3D PARALLAX & MOUSE TILT INTERACTION
   ========================================================================== */
function initHero3DTilt() {
  const container = document.querySelector('.hero-dashboard-container');
  const section = document.querySelector('.hero-section');
  if (!container || !section) return;

  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    let ticking = false;

    section.addEventListener('mousemove', (e) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const rect = container.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const mouseX = e.clientX - centerX;
          const mouseY = e.clientY - centerY;

          const rotateX = Math.max(-8, Math.min(8, (mouseY / (rect.height / 2)) * -5));
          const rotateY = Math.max(-8, Math.min(8, (mouseX / (rect.width / 2)) * 5));

          container.style.transform = `perspective(1200px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
          ticking = false;
        });
        ticking = true;
      }
    });

    section.addEventListener('mouseleave', () => {
      container.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg)';
      container.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
      setTimeout(() => {
        container.style.transition = '';
      }, 500);
    });
  }
}

/* ==========================================================================
   17. GLOBAL SCROLL REVEAL & STAGGER OBSERVER (ALL PAGES)
   ========================================================================== */
function initScrollAnimations() {
  const targets = document.querySelectorAll(`
    .reveal-on-scroll,
    .reveal-fade-in,
    .reveal-scale-up,
    .reveal-slide-left,
    .reveal-slide-right,
    .product-showcase-grid > *,
    .features-mixed-grid > *,
    .features-detailed-grid > *,
    .pricing-cards-grid > *,
    .pricing-plans-grid > *,
    .how-it-works-grid > *,
    .solutions-main-grid > *,
    .integrations-grid > *,
    .about-stats-grid > *,
    .about-values-grid > *,
    .about-team-grid > *,
    .about-culture-grid > *,
    .about-impact-grid > *,
    .about-careers-grid > *,
    .resources-articles-grid > *,
    .resources-docs-grid > *,
    .contact-inquiry-grid > *,
    .testimonials-slider,
    .faq-item,
    .card,
    .feature-card,
    .pricing-card,
    .stat-card,
    .dashboard-stat-card,
    .dashboard-card,
    .table-card,
    .settings-section,
    .auth-card
  `);

  if (!targets.length) return;

  // Add reveal-on-scroll class if not explicitly tagged
  targets.forEach((el) => {
    if (!el.classList.contains('reveal-on-scroll') &&
        !el.classList.contains('reveal-fade-in') &&
        !el.classList.contains('reveal-scale-up') &&
        !el.classList.contains('reveal-slide-left') &&
        !el.classList.contains('reveal-slide-right')) {
      el.classList.add('reveal-on-scroll');
    }
  });

  // Stagger cascading delays for grid cards
  const gridContainers = document.querySelectorAll(`
    .features-mixed-grid,
    .features-detailed-grid,
    .pricing-cards-grid,
    .pricing-plans-grid,
    .how-it-works-grid,
    .solutions-main-grid,
    .integrations-grid,
    .about-stats-grid,
    .about-values-grid,
    .about-team-grid,
    .about-culture-grid,
    .about-impact-grid,
    .about-careers-grid,
    .resources-articles-grid,
    .resources-docs-grid,
    .contact-inquiry-grid,
    .dashboard-stats-grid,
    .dashboard-grid
  `);

  gridContainers.forEach(grid => {
    const children = Array.from(grid.children);
    children.forEach((child, idx) => {
      if (!child.classList.contains('delay-1') &&
          !child.classList.contains('delay-2') &&
          !child.classList.contains('delay-3') &&
          !child.classList.contains('delay-4') &&
          !child.classList.contains('delay-5') &&
          !child.classList.contains('delay-6')) {
        const delayIdx = (idx % 4) + 1;
        child.classList.add(`delay-${delayIdx}`);
      }
    });
  });

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.08
  });

  targets.forEach(target => observer.observe(target));
}

