/* ==========================================================================
   MAIN APPLICATION CONTROLLER
   Riya Singh - Creative Animated Portfolio
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Navigation & Scrollspy
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const progressBar = document.querySelector('.scroll-progress-bar');
  const scrollTopBtn = document.querySelector('.scroll-top-btn');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    // Navbar compact on scroll
    if (scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scroll progress bar
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollY / totalHeight) * 100;
    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }

    // Scroll to top button visibility
    if (scrollTopBtn) {
      if (scrollY > 500) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }

    // Active link spy
    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (window.soundEngine) window.soundEngine.playClick();
    });
  }

  // 2. Mobile Menu Toggle
  const hamburger = document.querySelector('.hamburger-btn');
  const navMenu = document.querySelector('.nav-menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      hamburger.classList.toggle('active');
      if (window.soundEngine) window.soundEngine.playClick();
    });

    document.querySelectorAll('.nav-link').forEach((item) => {
      item.addEventListener('click', () => {
        navMenu.classList.remove('open');
        hamburger.classList.remove('active');
      });
    });
  }

  // 3. Sound Toggle Button
  const soundToggleBtn = document.getElementById('sound-toggle-btn');
  if (soundToggleBtn) {
    // Check initial state
    const isMuted = localStorage.getItem('sound_muted') === 'true';
    updateSoundIcon(isMuted);

    soundToggleBtn.addEventListener('click', () => {
      const active = window.soundEngine.toggleMute();
      updateSoundIcon(!active);
      showToast(active ? '🔊 Ambient Sound FX Enabled' : '🔇 Audio Muted', 'info');
    });
  }

  function updateSoundIcon(isMuted) {
    if (!soundToggleBtn) return;
    if (isMuted) {
      soundToggleBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M11 5L6 9H2v6h4l5 4V5z"></path>
          <line x1="23" y1="9" x2="17" y2="15"></line>
          <line x1="17" y1="9" x2="23" y2="15"></line>
        </svg>
      `;
      soundToggleBtn.setAttribute('title', 'Sound Muted (Click to enable)');
    } else {
      soundToggleBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
        </svg>
      `;
      soundToggleBtn.setAttribute('title', 'Sound Enabled (Click to mute)');
    }
  }

  // 4. Theme Switcher
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const savedTheme = localStorage.getItem('portfolio_theme') || 'cyber';
  if (savedTheme !== 'cyber') {
    document.body.setAttribute('data-theme', savedTheme);
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const current = document.body.getAttribute('data-theme');
      let nextTheme = 'oled';
      if (current === 'oled') nextTheme = 'gold';
      else if (current === 'gold') nextTheme = 'cyber';

      document.body.setAttribute('data-theme', nextTheme === 'cyber' ? '' : nextTheme);
      localStorage.setItem('portfolio_theme', nextTheme);
      if (window.soundEngine) window.soundEngine.playClick();
      showToast(`🎨 Theme: ${nextTheme.toUpperCase()}`, 'info');
    });
  }

  // 5. Project Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');

      if (window.soundEngine) window.soundEngine.playClick();

      projectCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category.includes(filter)) {
          card.style.display = 'flex';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0) scale(1)';
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px) scale(0.95)';
          setTimeout(() => {
            if (card.style.opacity === '0') card.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  // 6. Project Architecture Deep-Dive Modal Data & Handler
  const projectDetailsData = {
    sentinel: {
      title: 'Sentinel: AI-Powered Security & Code Auditor',
      tag: 'AI System & Security Engineering | Sep 2026',
      image: 'assets/images/sentinel.jpg',
      overview: 'Sentinel is an intelligent automated cybersecurity and source-code auditor designed to inspect live production web applications and GitHub repositories concurrently.',
      features: [
        '<b>Dual Context Ingestion:</b> Captures runtime DOM snapshots with Playwright and inspects git commit history for security anti-patterns.',
        '<b>Gemini-Powered AI Engine:</b> Generates 3–5 targeted automated test specifications, executes simulated HTTP attacks, and calculates Root Cause Analysis (RCA).',
        '<b>WebSocket Node.js Agent:</b> Runs background diagnostics with 4 security layers protecting sensitive API secrets and sandbox integrity.',
        '<b>3-Horizon Risk Analysis:</b> Evaluates architectural vulnerability exposure over 6 months, 1 year, and 5 years.'
      ],
      tech: ['React.js', 'Next.js', 'Node.js', 'Express.js', 'Playwright', 'WebSocket', 'Gemini AI', 'Groq', 'Prisma', 'SQLite', 'Git'],
      github: 'https://github.com/RiyaSingh-13',
      live: '#'
    },
    pickgive: {
      title: 'Pick&Give: NGO-Connect Donation & Volunteering Platform',
      tag: 'Full-Stack MERN & Geolocation | Jun 2026',
      image: 'assets/images/pickgive.jpg',
      overview: 'A community-driven digital relief platform connecting donors, certified NGOs, and active field volunteers to streamline real-time donation pickups and track transparent logistics.',
      features: [
        '<b>Role-Based Access Architecture:</b> 3 isolated user interfaces (Admin, NGO, and Member) with role-guarded middleware.',
        '<b>OTP Handover Verification:</b> Built-in Nodemailer OTP workflow to verify 100% of donation drop-offs and prevent counterfeit claims.',
        '<b>Interactive Geolocation:</b> Integrated Leaflet.js with OpenStreetMap APIs for dynamic route visualization and live volunteer coordination.',
        '<b>Admin Governance:</b> Module to review and verify 100% of NGO onboarding applications and monitor tamper-proof security audit logs.',
        '<b>Normalized Mongoose Schemas:</b> Carefully structured database models eliminating data redundancy.'
      ],
      tech: ['React.js', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB', 'Nodemailer', 'Leaflet.js', 'OpenStreetMap', 'Lucide React'],
      github: 'https://github.com/RiyaSingh-13',
      live: '#'
    },
    chatnova: {
      title: 'ChatNova: Full Stack Real-Time Chat Platform',
      tag: 'Real-Time WebSockets & Media Engine | Oct 2025',
      image: 'assets/images/chatnova.jpg',
      overview: 'A high-throughput real-time messaging application engineered with WebSockets, delivering instantaneous communication with sub-100ms message delivery.',
      features: [
        '<b>Bi-Directional WebSocket Protocol:</b> Replaced wasteful HTTP polling with Socket.io event buses, drastically cutting server overhead and connection latency.',
        '<b>Live Engagement Features:</b> Instant real-time typing indicators, read status receipts, and live user presence tracking.',
        '<b>Stateless Security:</b> Protected 100% of socket handshakes and REST API endpoints using stateless JSON Web Tokens (JWT).',
        '<b>Scalable Cloudinary Media Engine:</b> Cloud-based image upload pipeline with automatic edge optimization, reducing image load times.'
      ],
      tech: ['React.js', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB', 'Socket.io', 'JWT', 'Cloudinary'],
      github: 'https://github.com/RiyaSingh-13',
      live: '#'
    }
  };

  const modalOverlay = document.getElementById('project-modal');
  const modalBody = document.getElementById('modal-body-content');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  window.openProjectModal = function (projectId) {
    const data = projectDetailsData[projectId];
    if (!data || !modalBody) return;

    modalBody.innerHTML = `
      <div style="margin-bottom: 1.5rem;">
        <span class="project-badge" style="margin-bottom: 0.5rem; display: inline-block;">${data.tag}</span>
        <h2 style="font-family: var(--font-display); font-size: 1.8rem; font-weight: 800; color: #fff; margin-bottom: 0.8rem;">
          ${data.title}
        </h2>
        <p style="color: var(--text-secondary); font-size: 1rem; line-height: 1.6;">${data.overview}</p>
      </div>

      <div style="border-radius: var(--radius-md); overflow: hidden; margin-bottom: 1.8rem; border: 1px solid var(--border-subtle);">
        <img src="${data.image}" alt="${data.title}" style="width: 100%; max-height: 380px; object-fit: cover;">
      </div>

      <div style="margin-bottom: 1.8rem;">
        <h3 style="font-family: var(--font-display); font-size: 1.25rem; font-weight: 700; color: var(--accent-cyan); margin-bottom: 0.85rem;">
          Key Engineering Highlights & System Architecture
        </h3>
        <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.75rem;">
          ${data.features
            .map(
              (f) => `
            <li style="display: flex; gap: 0.75rem; color: var(--text-secondary); font-size: 0.95rem; line-height: 1.6;">
              <span style="color: var(--accent-emerald); font-weight: bold;">✔</span>
              <div>${f}</div>
            </li>
          `
            )
            .join('')}
        </ul>
      </div>

      <div style="margin-bottom: 1.8rem;">
        <h3 style="font-family: var(--font-display); font-size: 1.1rem; font-weight: 700; color: #fff; margin-bottom: 0.75rem;">
          Technologies & Tools Used
        </h3>
        <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
          ${data.tech
            .map((t) => `<span class="tech-tag" style="background: rgba(6, 182, 212, 0.1); border-color: rgba(6, 182, 212, 0.3); color: var(--accent-cyan);">${t}</span>`)
            .join('')}
        </div>
      </div>

      <div style="display: flex; gap: 1rem; padding-top: 1rem; border-top: 1px solid var(--border-subtle);">
        <a href="${data.github}" target="_blank" class="btn-primary" style="padding: 0.6rem 1.4rem;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
          </svg>
          View on GitHub
        </a>
      </div>
    `;

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (window.soundEngine) window.soundEngine.playClick();
  };

  if (modalCloseBtn && modalOverlay) {
    modalCloseBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        closeModal();
      }
    });
  }

  function closeModal() {
    if (modalOverlay) {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = '';
      if (window.soundEngine) window.soundEngine.playClick();
    }
  }

  // 7. 3D Tilt Card Interaction
  const tiltCards = document.querySelectorAll('.project-card, .avatar-card, .exp-card');
  tiltCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });

  // 8. LeetCode Circular Counter & Skill Progress Animation on Scroll
  const arenaSection = document.getElementById('achievements');
  let animatedStats = false;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !animatedStats) {
          animatedStats = true;
          animateNumbers();
        }
      });
    },
    { threshold: 0.3 }
  );

  if (arenaSection) {
    observer.observe(arenaSection);
  }

  function animateNumbers() {
    const counterEl = document.getElementById('leetcode-count-val');
    if (counterEl) {
      let current = 0;
      const target = 500;
      const duration = 1600;
      const step = Math.ceil(target / (duration / 25));

      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          counterEl.innerText = `${current}+`;
          clearInterval(timer);
        } else {
          counterEl.innerText = current;
        }
      }, 25);
    }
  }

  // 9. Toast Notification Engine
  window.showToast = function (message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <span style="color: var(--accent-cyan); font-weight: bold;">✔</span>
      <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('toast-exit');
      setTimeout(() => toast.remove(), 400);
    }, 3200);
  };

  // 10. Copy to Clipboard Utility
  window.copyText = function (text, label) {
    navigator.clipboard.writeText(text).then(() => {
      if (window.soundEngine) window.soundEngine.playSuccess();
      showToast(`${label} copied to clipboard!`);
    }).catch(() => {
      showToast(`Copy failed, please copy manually: ${text}`);
    });
  };

  // 11. Contact Form Dispatcher
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const msgInput = document.getElementById('contact-message');
      const submitBtn = contactForm.querySelector('button[type="submit"]');

      if (!nameInput.value.trim() || !emailInput.value.trim() || !msgInput.value.trim()) {
        showToast('Please fill out all required fields.', 'error');
        return;
      }

      // Simulate sending with nice button spinner
      const origText = submitBtn.innerHTML;
      submitBtn.innerHTML = `
        <svg class="spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
          <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"></path>
        </svg>
        Sending Dispatch...
      `;
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = origText;
        submitBtn.disabled = false;
        contactForm.reset();

        if (window.soundEngine) window.soundEngine.playSuccess();
        triggerCelebration();
        showToast(`Thank you ${nameInput.value}! Message received. Riya will reply shortly.`, 'success');
      }, 1200);
    });
  }

  // 12. Interactive Confetti Celebration Animation
  window.triggerCelebration = function () {
    const count = 60;
    for (let i = 0; i < count; i++) {
      createConfettiPiece();
    }
  };

  function createConfettiPiece() {
    const piece = document.createElement('div');
    const colors = ['#06b6d4', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b', '#fff'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const size = Math.random() * 8 + 5;

    piece.style.position = 'fixed';
    piece.style.top = '-20px';
    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.width = `${size}px`;
    piece.style.height = `${size * 1.4}px`;
    piece.style.backgroundColor = randomColor;
    piece.style.borderRadius = '3px';
    piece.style.zIndex = '99999';
    piece.style.pointerEvents = 'none';
    piece.style.transform = `rotate(${Math.random() * 360}deg)`;

    document.body.appendChild(piece);

    const fallDuration = Math.random() * 2.5 + 1.8;
    const horizontalDrift = (Math.random() - 0.5) * 200;

    piece.animate(
      [
        { transform: `translate(0, 0) rotate(0deg)`, opacity: 1 },
        { transform: `translate(${horizontalDrift}px, 105vh) rotate(${Math.random() * 720}deg)`, opacity: 0 }
      ],
      {
        duration: fallDuration * 1000,
        easing: 'cubic-bezier(0.25, 1, 0.5, 1)'
      }
    ).onfinish = () => piece.remove();
  }

  // 13. General Scroll Reveal (for browsers without native scroll-driven animations)
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  const scrollRevealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    },
    { threshold: 0.15 }
  );

  revealElements.forEach((el) => scrollRevealObserver.observe(el));
});
