/* ============================================================
   BLUE BRIDGE — Core Application JS
   Navigation, animations, i18n, scroll effects
   ============================================================ */

/* ── Navigation HTML ── */
function getNavHTML(opts = {}) {
  const { light = false, activePage = '' } = opts;
  const navClass = light ? 'nav--light' : '';
  const logoSrc = light ? '../logo-azul.png' : '../logo-blanco.png';
  const logoSrcRoot = light ? 'logo-azul.png' : 'logo-blanco.png';
  const isRoot = !opts.depth || opts.depth === 0;
  const logo = isRoot ? logoSrcRoot : logoSrc;
  const base = isRoot ? '' : '../';

  return `
<div id="scroll-progress"></div>
<nav id="nav" class="${navClass}">
  <div class="container">
    <div class="nav-inner">
      <a href="${base}index.html" class="nav-logo" aria-label="Blue Bridge Global Connection">
        <img src="${base}logo-blanco.png" alt="Blue Bridge" id="nav-logo-img">
        <span>Blue Bridge</span>
      </a>
      <div class="nav-links">
        <div class="nav-item">
          <a href="${base}solutions.html" class="nav-link ${activePage==='solutions'?'active':''}">
            <span data-i18n="nav_solutions">Solutions</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
          </a>
          <div class="nav-dropdown">
            <a href="${base}solutions/ai-workforce.html"><span class="nav-dropdown-icon"><i data-lucide="bot"></i></span><span data-i18n="sol_ai_workforce">AI Workforce</span></a>
            <a href="${base}solutions/ai-agents.html"><span class="nav-dropdown-icon"><i data-lucide="zap"></i></span><span data-i18n="sol_ai_agents">AI Agents</span></a>
            <a href="${base}solutions/customer-support.html"><span class="nav-dropdown-icon"><i data-lucide="message-square"></i></span><span data-i18n="sol_support">Customer Support AI</span></a>
            <a href="${base}solutions/voice-ai.html"><span class="nav-dropdown-icon"><i data-lucide="phone"></i></span><span data-i18n="sol_voice">Voice AI</span></a>
            <a href="${base}solutions/booking-ai.html"><span class="nav-dropdown-icon"><i data-lucide="calendar"></i></span><span data-i18n="sol_booking">Booking AI</span></a>
            <a href="${base}solutions/crm.html"><span class="nav-dropdown-icon"><i data-lucide="database"></i></span><span data-i18n="sol_crm">CRM</span></a>
            <a href="${base}solutions/automation.html"><span class="nav-dropdown-icon"><i data-lucide="settings-2"></i></span><span data-i18n="sol_automation">Automation</span></a>
            <a href="${base}solutions/software-development.html"><span class="nav-dropdown-icon"><i data-lucide="code-2"></i></span><span data-i18n="sol_software">Software Development</span></a>
            <a href="${base}solutions/web-development.html"><span class="nav-dropdown-icon"><i data-lucide="globe"></i></span><span data-i18n="sol_web">Web Development</span></a>
            <a href="${base}solutions/cloud-solutions.html"><span class="nav-dropdown-icon"><i data-lucide="cloud"></i></span><span data-i18n="sol_cloud">Cloud Solutions</span></a>
          </div>
        </div>
        <div class="nav-item">
          <a href="${base}about.html" class="nav-link ${activePage==='company'?'active':''}">
            <span data-i18n="nav_company">Company</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
          </a>
          <div class="nav-dropdown">
            <a href="${base}about.html"><span class="nav-dropdown-icon"><i data-lucide="building-2"></i></span><span data-i18n="nav_about">About Us</span></a>
            <a href="${base}offices.html"><span class="nav-dropdown-icon"><i data-lucide="map-pin"></i></span><span data-i18n="nav_offices">Global Offices</span></a>
            <a href="${base}leadership.html"><span class="nav-dropdown-icon"><i data-lucide="users"></i></span><span data-i18n="nav_leadership">Leadership</span></a>
            <a href="${base}careers.html"><span class="nav-dropdown-icon"><i data-lucide="briefcase"></i></span><span data-i18n="nav_careers">Careers</span></a>
            <a href="${base}partners.html"><span class="nav-dropdown-icon"><i data-lucide="handshake"></i></span><span data-i18n="nav_partners">Partners</span></a>
            <a href="${base}blog.html"><span class="nav-dropdown-icon"><i data-lucide="file-text"></i></span><span data-i18n="nav_blog">Blog</span></a>
          </div>
        </div>
        <a href="${base}cloud.html" class="nav-link ${activePage==='cloud'?'active':''}" style="color:var(--cyan);">Cloud™</a>
        <a href="${base}case-studies.html" class="nav-link ${activePage==='casestudies'?'active':''}"><span data-i18n="nav_casestudies">Case Studies</span></a>
        <a href="${base}pricing.html" class="nav-link ${activePage==='pricing'?'active':''}"><span data-i18n="nav_pricing">Pricing</span></a>
        <a href="${base}contact.html" class="nav-link ${activePage==='contact'?'active':''}"><span data-i18n="nav_contact">Contact</span></a>
      </div>
      <div class="nav-actions">
        <div class="lang-switcher">
          <button class="lang-btn" aria-label="Language">
            <span>🌐</span>
            <span class="lang-current">EN</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
          </button>
          <div class="lang-menu">
            <a href="#" data-lang="en">🇺🇸 English</a>
            <a href="#" data-lang="es">🇪🇸 Español</a>
            <a href="#" data-lang="fr">🇫🇷 Français</a>
            <a href="#" data-lang="nl">🇳🇱 Nederlands</a>
            <a href="#" data-lang="pt">🇧🇷 Português</a>
            <a href="#" data-lang="de">🇩🇪 Deutsch</a>
          </div>
        </div>
        <a href="${base}login.html" class="btn-login" data-i18n="nav_login">Client Login</a>
        <a href="${base}contact.html" class="btn btn--primary btn--sm" data-i18n="nav_demo">Request Demo</a>
      </div>
      <button class="nav-toggle" id="nav-toggle" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>
</nav>

<div id="mobile-menu">
  <div class="mobile-nav-links">
    <div class="mobile-nav-section" data-i18n="nav_solutions">Solutions</div>
    <a href="${base}solutions/ai-workforce.html" class="mobile-nav-link" data-i18n="sol_ai_workforce">AI Workforce</a>
    <a href="${base}solutions/ai-agents.html" class="mobile-nav-link" data-i18n="sol_ai_agents">AI Agents</a>
    <a href="${base}solutions/customer-support.html" class="mobile-nav-link" data-i18n="sol_support">Customer Support AI</a>
    <a href="${base}solutions/voice-ai.html" class="mobile-nav-link" data-i18n="sol_voice">Voice AI</a>
    <a href="${base}solutions/booking-ai.html" class="mobile-nav-link" data-i18n="sol_booking">Booking AI</a>
    <a href="${base}solutions/crm.html" class="mobile-nav-link" data-i18n="sol_crm">CRM</a>
    <a href="${base}solutions/automation.html" class="mobile-nav-link" data-i18n="sol_automation">Automation</a>
    <a href="${base}solutions/software-development.html" class="mobile-nav-link" data-i18n="sol_software">Software Development</a>
    <a href="${base}solutions/web-development.html" class="mobile-nav-link" data-i18n="sol_web">Web Development</a>
    <a href="${base}solutions/cloud-solutions.html" class="mobile-nav-link" data-i18n="sol_cloud">Cloud Solutions</a>
    <div class="mobile-nav-section" data-i18n="nav_company">Company</div>
    <a href="${base}about.html" class="mobile-nav-link" data-i18n="nav_about">About Us</a>
    <a href="${base}offices.html" class="mobile-nav-link" data-i18n="nav_offices">Global Offices</a>
    <a href="${base}leadership.html" class="mobile-nav-link" data-i18n="nav_leadership">Leadership</a>
    <a href="${base}careers.html" class="mobile-nav-link" data-i18n="nav_careers">Careers</a>
    <a href="${base}partners.html" class="mobile-nav-link" data-i18n="nav_partners">Partners</a>
    <a href="${base}blog.html" class="mobile-nav-link" data-i18n="nav_blog">Blog</a>
    <div class="mobile-nav-section">Platform</div>
    <a href="${base}cloud.html" class="mobile-nav-link" style="color:var(--cyan);">Cloud™ — Cloud Platform</a>
    <div class="mobile-nav-section" data-i18n="nav_resources">Resources</div>
    <a href="${base}case-studies.html" class="mobile-nav-link" data-i18n="nav_casestudies">Case Studies</a>
    <a href="${base}pricing.html" class="mobile-nav-link" data-i18n="nav_pricing">Pricing</a>
    <a href="${base}contact.html" class="mobile-nav-link" data-i18n="nav_contact">Contact</a>
    <div class="mobile-nav-actions">
      <a href="${base}login.html" class="btn btn--outline w-full" data-i18n="nav_login">Client Login</a>
      <a href="${base}contact.html" class="btn btn--primary w-full" data-i18n="nav_demo">Request Demo</a>
    </div>
  </div>
</div>

<button id="back-top" aria-label="Back to top">↑</button>
`;
}

/* ── Footer HTML ── */
function getFooterHTML(opts = {}) {
  const base = opts.depth === 1 ? '../' : '';
  return `
<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <div class="footer-logo">
          <img src="${base}logo-blanco.png" alt="Blue Bridge">
          <span class="footer-logo-name">Blue Bridge</span>
        </div>
        <p class="footer-tagline" data-i18n="footer_tagline">Enterprise AI solutions for healthcare, hospitality, retail, and government sectors.</p>
        <div class="footer-legal">
          <div class="footer-legal-name">Legal Entity</div>
          <div class="footer-legal-detail">
            THE BLUE BRIDGE CONNECTION CO<br>
            SOCIEDAD DE RESPONSABILIDAD LIMITADA<br>
            Reg. No. 3-102-880-591 · Costa Rica
          </div>
        </div>
      </div>
      <div class="footer-col">
        <h4>Cloud™</h4>
        <ul>
          <li><a href="${base}cloud.html" style="color:var(--cyan);">Cloud Platform</a></li>
          <li><a href="${base}cloud.html#modules">Hosting &amp; Apps</a></li>
          <li><a href="${base}cloud.html#modules">Cloud Drive™</a></li>
          <li><a href="${base}cloud.html#modules">Cloud AI™</a></li>
          <li><a href="${base}cloud.html#pricing">Pricing</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4 data-i18n="footer_solutions">Solutions</h4>
        <ul>
          <li><a href="${base}solutions/ai-workforce.html" data-i18n="sol_ai_workforce">AI Workforce</a></li>
          <li><a href="${base}solutions/ai-agents.html" data-i18n="sol_ai_agents">AI Agents</a></li>
          <li><a href="${base}solutions/voice-ai.html" data-i18n="sol_voice">Voice AI</a></li>
          <li><a href="${base}solutions/booking-ai.html" data-i18n="sol_booking">Booking AI</a></li>
          <li><a href="${base}solutions/crm.html" data-i18n="sol_crm">CRM</a></li>
          <li><a href="${base}solutions/automation.html" data-i18n="sol_automation">Automation</a></li>
          <li><a href="${base}solutions/cloud-solutions.html" data-i18n="sol_cloud">Cloud Solutions</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4 data-i18n="footer_company">Company</h4>
        <ul>
          <li><a href="${base}about.html" data-i18n="nav_about">About Us</a></li>
          <li><a href="${base}offices.html" data-i18n="nav_offices">Global Offices</a></li>
          <li><a href="${base}leadership.html" data-i18n="nav_leadership">Leadership</a></li>
          <li><a href="${base}careers.html" data-i18n="nav_careers">Careers</a></li>
          <li><a href="${base}partners.html" data-i18n="nav_partners">Partners</a></li>
          <li><a href="${base}blog.html" data-i18n="nav_blog">Blog</a></li>
          <li><a href="${base}contact.html" data-i18n="nav_contact">Contact</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4 data-i18n="footer_legal">Legal</h4>
        <ul>
          <li><a href="${base}legal/trust-center.html" data-i18n="footer_trust">Trust Center</a></li>
          <li><a href="${base}legal/index.html" data-i18n="footer_legal_info">Legal Information</a></li>
          <li><a href="${base}legal/privacy-policy.html" data-i18n="footer_privacy">Privacy Policy</a></li>
          <li><a href="${base}legal/terms.html" data-i18n="footer_terms">Terms &amp; Conditions</a></li>
          <li><a href="${base}legal/cookies.html" data-i18n="footer_cookies">Cookie Policy</a></li>
          <li><a href="${base}legal/security.html" data-i18n="footer_security">Security</a></li>
          <li><a href="${base}legal/compliance.html" data-i18n="footer_compliance">Compliance</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4 data-i18n="footer_support">Support</h4>
        <ul>
          <li><a href="${base}case-studies.html" data-i18n="nav_casestudies">Case Studies</a></li>
          <li><a href="${base}pricing.html" data-i18n="nav_pricing">Pricing</a></li>
          <li><a href="mailto:support@bluebridge.es">support@bluebridge.es</a></li>
          <li><a href="mailto:sales@bluebridge.es">sales@bluebridge.es</a></li>
          <li><a href="${base}login.html" data-i18n="nav_login">Client Login</a></li>
        </ul>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="footer-bottom-left">
        <div data-i18n="footer_legal_entity">Blue Bridge Global Connection is the commercial brand of THE BLUE BRIDGE CONNECTION CO SOCIEDAD DE RESPONSABILIDAD LIMITADA.</div>
        <div class="footer-reg">
          <span data-i18n="footer_reg">Costa Rica Business Registration No. 3-102-880-591</span><br>
          Registered Office: Boulevard Dent, Barrio Dent, San Pedro, Montes de Oca, San José 11501, Costa Rica
        </div>
        <div class="footer-ops">
          <span class="footer-op-badge">Costa Rica</span>
          <span class="footer-op-badge">Colombia</span>
          <span class="footer-op-badge">Belgium</span>
          <span class="footer-op-badge">France</span>
        </div>
        <div style="margin-top:.75rem; font-size:.75rem; color:rgba(255,255,255,.2);">
          © <span id="footer-year"></span> <span data-i18n="footer_copyright">Blue Bridge Global Connection. All rights reserved.</span>
        </div>
      </div>
      <div class="footer-bottom-links">
        <a href="${base}legal/privacy-policy.html" data-i18n="footer_privacy">Privacy Policy</a>
        <a href="${base}legal/terms.html" data-i18n="footer_terms">Terms &amp; Conditions</a>
        <a href="${base}legal/cookies.html" data-i18n="footer_cookies">Cookie Policy</a>
        <a href="${base}legal/security.html" data-i18n="footer_security">Security</a>
        <a href="${base}legal/trust-center.html" data-i18n="footer_trust">Trust Center</a>
      </div>
    </div>
  </div>
</footer>

<div id="cookie-banner" style="display:none">
  <p>
    <span data-i18n="cookie_text">We use cookies to enhance your experience and analyze site usage. By continuing, you agree to our</span>
    <a href="${base}legal/cookies.html" data-i18n="cookie_policy"> Cookie Policy</a>.
  </p>
  <div class="cookie-actions">
    <button class="btn btn--outline btn--sm" id="cookie-decline" data-i18n="cookie_decline">Decline</button>
    <button class="btn btn--primary btn--sm" id="cookie-accept" data-i18n="cookie_accept">Accept All</button>
  </div>
</div>
`;
}

/* ── App Init ── */
document.addEventListener('DOMContentLoaded', () => {

  // Inject nav + footer if placeholders exist
  const navRoot = document.getElementById('nav-root');
  if (navRoot) {
    const depth = parseInt(navRoot.dataset.depth || '0');
    const activePage = navRoot.dataset.page || '';
    const light = navRoot.dataset.light === 'true';
    navRoot.outerHTML = getNavHTML({ depth, activePage, light });
  }

  const footerRoot = document.getElementById('footer-root');
  if (footerRoot) {
    const depth = parseInt(footerRoot.dataset.depth || '0');
    footerRoot.outerHTML = getFooterHTML({ depth });
  }

  // Year in footer
  const yr = document.getElementById('footer-year');
  if (yr) yr.textContent = new Date().getFullYear();

  // Load Lucide icons (replaces all emojis with SVG icons)
  (function loadLucide() {
    const s = document.createElement('script');
    s.src = 'https://unpkg.com/lucide@latest/dist/umd/lucide.min.js';
    s.onload = function() { if (window.lucide) window.lucide.createIcons(); };
    document.head.appendChild(s);
  })();

  // i18n
  i18n.init();

  // Language switcher clicks
  document.querySelectorAll('.lang-menu a').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      i18n.set(a.dataset.lang);
    });
  });

  // Scroll: nav + progress + back-to-top
  const nav = document.getElementById('nav');
  const progress = document.getElementById('scroll-progress');
  const backTop = document.getElementById('back-top');

  const onScroll = () => {
    const y = window.scrollY;
    if (nav) nav.classList.toggle('scrolled', y > 20);
    if (progress) {
      const pct = (y / (document.body.scrollHeight - window.innerHeight)) * 100;
      progress.style.width = pct + '%';
    }
    if (backTop) backTop.classList.toggle('visible', y > 400);
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  if (backTop) {
    backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  // Mobile nav toggle
  document.addEventListener('click', e => {
    const toggle = e.target.closest('#nav-toggle');
    const menu = document.getElementById('mobile-menu');
    if (!toggle || !menu) return;
    menu.classList.toggle('open');
    const isOpen = menu.classList.contains('open');
    document.body.style.overflow = isOpen ? 'hidden' : '';
    const spans = toggle.querySelectorAll('span');
    if (isOpen) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });

  // Close mobile menu on link click
  document.querySelectorAll('.mobile-nav-link').forEach(a => {
    a.addEventListener('click', () => {
      const menu = document.getElementById('mobile-menu');
      if (menu) { menu.classList.remove('open'); document.body.style.overflow = ''; }
    });
  });

  // Scroll reveal
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(el => observer.observe(el));
  }

  // Counter animation
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    const countObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target = parseInt(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        const dur = 1800;
        const start = performance.now();
        const animate = (now) => {
          const pct = Math.min((now - start) / dur, 1);
          const ease = 1 - Math.pow(1 - pct, 3);
          el.textContent = Math.round(target * ease) + suffix;
          if (pct < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
        countObs.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach(el => countObs.observe(el));
  }

  // Cookie banner
  const banner = document.getElementById('cookie-banner');
  if (banner && !localStorage.getItem('bb_cookies')) {
    banner.style.display = 'flex';
    document.getElementById('cookie-accept')?.addEventListener('click', () => {
      localStorage.setItem('bb_cookies', 'accepted');
      banner.style.display = 'none';
    });
    document.getElementById('cookie-decline')?.addEventListener('click', () => {
      localStorage.setItem('bb_cookies', 'declined');
      banner.style.display = 'none';
    });
  }

  // Accordion
  document.querySelectorAll('.accordion-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.accordion-item');
      const wasOpen = item.classList.contains('open');
      btn.closest('.accordion-item')?.parentElement?.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });

  // Tabs
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const group = tab.dataset.group;
      const target = tab.dataset.tab;
      document.querySelectorAll(`.tab[data-group="${group}"]`).forEach(t => t.classList.remove('active'));
      document.querySelectorAll(`.tab-content[data-group="${group}"]`).forEach(c => c.classList.remove('active'));
      tab.classList.add('active');
      document.querySelector(`.tab-content[data-group="${group}"][data-tab="${target}"]`)?.classList.add('active');
    });
  });
});
