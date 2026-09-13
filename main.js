/**
 * SAJAL POREY — PORTFOLIO ENGINE (main.js)
 * High-performance interactive animations, physics-based 3D tilt,
 * Canvas particle constellation network & responsive UI interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
  initCustomCursor();
  initHeroCanvas();
  initTypewriter();
  initCard3DTilt();
  initMagneticButtons();
  initScrollAnimations();
  initMetricCounters();
  initProjectFiltering();
  initProjectModal();
  initContactSystem();
  initClock();
  initMobileNavigation();
});

/* ==========================================================================
   1. CUSTOM GLOW CURSOR (SMOOTH LERP FOLLOWER)
   ========================================================================== */
function initCustomCursor() {
  const dot = document.getElementById('cursor-dot');
  const glow = document.getElementById('cursor-glow');

  if (!dot || !glow || window.matchMedia('(pointer: coarse)').matches) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let glowX = mouseX;
  let glowY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
  });

  function renderCursor() {
    glowX += (mouseX - glowX) * 0.15;
    glowY += (mouseY - glowY) * 0.15;
    glow.style.transform = `translate(${glowX}px, ${glowY}px) translate(-50%, -50%)`;
    requestAnimationFrame(renderCursor);
  }
  requestAnimationFrame(renderCursor);

  // Expand cursor on clickable elements
  const interactables = document.querySelectorAll('a, button, input, textarea, .tilt-card, .skill-pill, .filter-btn');
  interactables.forEach((el) => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
}

/* ==========================================================================
   2. INTERACTIVE CANVAS CONSTELLATION & GRAVITY NETWORK
   ========================================================================== */
function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  const particleCount = window.innerWidth < 768 ? 55 : 110;
  const maxDistance = 145;

  let mouse = {
    x: null,
    y: null,
    radius: 190
  };

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', () => {
    resize();
    initParticles();
  });
  resize();

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.baseRadius = Math.random() * 2 + 1.2;
      this.radius = this.baseRadius;
      this.vx = (Math.random() - 0.5) * 0.8;
      this.vy = (Math.random() - 0.5) * 0.8;
      this.alpha = Math.random() * 0.6 + 0.4;
      this.color = Math.random() > 0.4 ? 'rgba(0, 240, 255, ' : 'rgba(168, 85, 247, ';
    }

    draw() {
      ctx.save();
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `${this.color}${this.alpha})`;
      ctx.shadowColor = '#00f0ff';
      ctx.shadowBlur = 9;
      ctx.fill();
      ctx.restore();
    }

    update() {
      // Interactive cursor gravity & repulsion
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          const directionX = (dx / dist) * force * 2.0;
          const directionY = (dy / dist) * force * 2.0;
          this.x -= directionX;
          this.y -= directionY;
          this.radius = this.baseRadius * 1.5;
        } else {
          this.radius = this.baseRadius;
        }
      }

      this.x += this.vx;
      this.y += this.vy;

      // Wrap edges smoothly
      if (this.x < 0) this.x = width;
      if (this.x > width) this.x = 0;
      if (this.y < 0) this.y = height;
      if (this.y > height) this.y = 0;

      this.draw();
    }
  }

  function initParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }
  initParticles();

  // Dynamic connecting laser web
  function connectParticles() {
    for (let a = 0; a < particles.length; a++) {
      for (let b = a + 1; b < particles.length; b++) {
        const dx = particles[a].x - particles[b].x;
        const dy = particles[a].y - particles[b].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDistance) {
          const opacity = (1 - dist / maxDistance) * 0.25;
          ctx.strokeStyle = `rgba(0, 240, 255, ${opacity})`;
          ctx.lineWidth = 0.85;
          ctx.beginPath();
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
    }
    connectParticles();
    requestAnimationFrame(animate);
  }
  animate();
}

/* ==========================================================================
   3. TYPEWRITER EFFECT
   ========================================================================== */
function initTypewriter() {
  const target = document.getElementById('typewriter');
  if (!target) return;

  const roles = [
    "Full-Stack Developer",
    "3D WebGL Explorer",
    "Creator of SOLARIS",
    "Creative Problem Solver",
    "Open-Source Contributor"
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typeSpeed = 75;
  const deleteSpeed = 38;
  const pauseEnd = 2000;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      target.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
    } else {
      target.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? deleteSpeed : typeSpeed;

    if (!isDeleting && charIndex === currentRole.length) {
      delay = pauseEnd;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = 450;
    }

    setTimeout(type, delay);
  }
  type();
}

/* ==========================================================================
   4. 3D CARD TILT WITH DYNAMIC GLARE LAYER
   ========================================================================== */
function initCard3DTilt() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const cards = document.querySelectorAll('.tilt-card, #hero-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -9;
      const rotateY = ((x - centerX) / centerX) * 9;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;

      // Dynamic light reflection across card surface
      const glowLayer = card.querySelector('.card-glass-glow');
      if (glowLayer) {
        glowLayer.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0, 240, 255, 0.22), transparent 70%)`;
      }
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
      const glowLayer = card.querySelector('.card-glass-glow');
      if (glowLayer) {
        glowLayer.style.background = 'transparent';
      }
    });
  });
}

/* ==========================================================================
   5. MAGNETIC BUTTONS (PHYSICS ATTRACTION)
   ========================================================================== */
function initMagneticButtons() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const magneticBtns = document.querySelectorAll('.magnetic-btn');

  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.32}px, ${y * 0.32}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0px, 0px)';
    });
  });
}

/* ==========================================================================
   6. SCROLL OBSERVER & NAVBAR SPY
   ========================================================================== */
function initScrollAnimations() {
  const reveals = document.querySelectorAll('.reveal-up');
  const header = document.getElementById('site-header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  reveals.forEach(el => revealObserver.observe(el));

  // Fallback safety timeout so nothing remains hidden
  setTimeout(() => {
    reveals.forEach(el => el.classList.add('revealed'));
  }, 1000);

  // Navbar blur & active scroll-spy
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    if (scrollY > 50) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
}

/* ==========================================================================
   7. METRIC NUMBER COUNTERS
   ========================================================================== */
function initMetricCounters() {
  const metricItems = document.querySelectorAll('.metric-number');
  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        metricItems.forEach(item => {
          const target = parseInt(item.getAttribute('data-target'), 10);
          let count = 0;
          const duration = 1500;
          const step = Math.ceil(target / (duration / 25));

          const timer = setInterval(() => {
            count += step;
            if (count >= target) {
              item.textContent = target;
              clearInterval(timer);
            } else {
              item.textContent = count;
            }
          }, 25);
        });
      }
    });
  }, { threshold: 0.4 });

  const metricsWrap = document.querySelector('.hero-metrics');
  if (metricsWrap) observer.observe(metricsWrap);
}

/* ==========================================================================
   8. PROJECT FILTERING ANIMATIONS
   ========================================================================== */
function initProjectFiltering() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px) scale(0.96)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

/* ==========================================================================
   9. PROJECT DETAILS MODAL
   ========================================================================== */
const projectData = {
  repo_doctor: {
    title: "RepoDoctor — GitHub Health & Upgrade Assistant",
    subtitle: "Automated repo diagnostics, security scanning, and CI/CD booster",
    description: "RepoDoctor is your ultimate GitHub repository upgrade assistant. It delivers instant health scores across codebases, identifies missing documentation, flags security vulnerabilities, and automates CI/CD pipeline setups.",
    tech: ["TypeScript", "Node.js", "GitHub Actions API", "Security Linters", "CLI Automation"],
    link: "https://github.com/sazzyrocks/repo-doctor"
  },
  voiceshield_ai: {
    title: "VoiceShield-AI — Deepfake Voice Detection & Audio Defense",
    subtitle: "Real-time acoustic analysis and neural spoofing defense architecture",
    description: "VoiceShield-AI is an intelligent audio security platform engineered to detect deepfake synthetic speech and voice impersonation in real-time. It leverages acoustic spectral analysis and neural classifiers to verify voiceprint authenticity.",
    tech: ["Python", "Machine Learning", "Audio DSP / Librosa", "FastAPI", "Neural Networks"],
    link: "https://github.com/sazzyrocks/VoiceShield-AI"
  }
};

function initProjectModal() {
  const modal = document.getElementById('project-modal');
  const modalBody = document.getElementById('modal-body');
  const modalClose = document.getElementById('modal-close');
  const triggers = document.querySelectorAll('.project-details-trigger');

  if (!modal || !modalBody) return;

  triggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const projKey = trigger.getAttribute('data-project');
      const data = projectData[projKey];
      if (!data) return;

      modalBody.innerHTML = `
        <span class="project-flag" style="display: inline-flex; align-items: center; gap: 6px; padding: 4px 10px; background: rgba(0, 240, 255, 0.12); border: 1px solid rgba(0, 240, 255, 0.3); border-radius: 20px; color: var(--accent-cyan); font-size: 0.75rem; text-transform: uppercase;">
          <i class="fa-solid fa-code"></i> Deep Dive Architecture
        </span>
        <h2 style="margin-top: 14px; font-size: 1.6rem; color: #fff;">${data.title}</h2>
        <p style="color: var(--accent-cyan); font-family: var(--font-code); font-size: 0.88rem; margin-bottom: 16px;">${data.subtitle}</p>
        <p style="color: var(--text-muted); line-height: 1.7; margin-bottom: 24px; font-size: 0.95rem;">${data.description}</p>
        <h4 style="font-size: 0.9rem; margin-bottom: 12px; color: #fff;">Core Technologies:</h4>
        <div class="project-tech-tags" style="margin-bottom: 28px; display: flex; flex-wrap: wrap; gap: 8px;">
          ${data.tech.map(t => `<span class="tech-tag" style="background: rgba(255, 255, 255, 0.05); border: 1px solid var(--border-subtle); padding: 5px 12px; border-radius: 6px; font-size: 0.8rem; font-family: var(--font-code); color: var(--text-main);">${t}</span>`).join('')}
        </div>
        <div style="display: flex; gap: 14px;">
          <a href="${data.link}" target="_blank" class="btn btn-primary" style="display: inline-flex; align-items: center; gap: 8px; text-decoration: none;">
            <i class="fa-brands fa-github"></i>
            <span>View Source on GitHub</span>
          </a>
        </div>
      `;

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   10. CONTACT FORM & EMAIL COPY
   ========================================================================== */
function initContactSystem() {
  const copyBtn = document.getElementById('copy-email-btn');
  const emailText = document.getElementById('email-text');

  if (copyBtn && emailText) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(emailText.textContent.trim()).then(() => {
        showToast("Email copied to clipboard!");
        copyBtn.innerHTML = '<i class="fa-solid fa-check" style="color: var(--accent-emerald);"></i>';
        setTimeout(() => {
          copyBtn.innerHTML = '<i class="fa-regular fa-clone"></i>';
        }, 2000);
      }).catch(() => {
        showToast("Unable to copy email automatically");
      });
    });
  }

  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');

  if (contactForm && submitBtn) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('form-name').value.trim();
      const email = document.getElementById('form-email').value.trim();
      const message = document.getElementById('form-message').value.trim();

      if (!name || !email || !message) {
        showToast("Please fill in all required fields.");
        return;
      }

      const originalHtml = submitBtn.innerHTML;
      submitBtn.innerHTML = '<span>Transmitting...</span> <i class="fa-solid fa-circle-notch fa-spin"></i>';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = '<span>Message Sent!</span> <i class="fa-solid fa-check"></i>';
        submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        showToast(`Thank you ${name}! Message received.`);
        contactForm.reset();

        setTimeout(() => {
          submitBtn.innerHTML = originalHtml;
          submitBtn.disabled = false;
          submitBtn.style.background = '';
        }, 3000);
      }, 1000);
    });
  }
}

function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fa-solid fa-sparkles" style="color: var(--accent-cyan);"></i> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

/* ==========================================================================
   11. LIVE IST CLOCK
   ========================================================================== */
function initClock() {
  const clockEl = document.getElementById('live-clock');
  if (!clockEl) return;

  function updateTime() {
    const now = new Date();
    const options = {
      timeZone: 'Asia/Kolkata',
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    };
    clockEl.textContent = `${now.toLocaleTimeString('en-US', options)} IST`;
  }

  updateTime();
  setInterval(updateTime, 1000);
}

/* ==========================================================================
   12. MOBILE NAVIGATION DRAWER
   ========================================================================== */
function initMobileNavigation() {
  const menuToggle = document.getElementById('menu-toggle');
  const drawer = document.getElementById('mobile-drawer');
  const closeDrawer = document.getElementById('close-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (!menuToggle || !drawer) return;

  menuToggle.addEventListener('click', () => drawer.classList.add('open'));
  closeDrawer?.addEventListener('click', () => drawer.classList.remove('open'));

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => drawer.classList.remove('open'));
  });
}
