/* ─────────────────────────────────────────────
   script.js — Mandala Krishna Vamsi Portfolio
───────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {

  /* ── LOADING ─────────────────────────────── */
  const loadingScreen = document.getElementById('loading');
  const loadingBar    = document.getElementById('loading-bar');
  const loadingLabel  = document.getElementById('loading-label');

  const loadingSteps = [
    { pct: 20,  label: 'Loading assets...' },
    { pct: 50,  label: 'Initializing canvas...' },
    { pct: 75,  label: 'Preparing animations...' },
    { pct: 90,  label: 'Almost ready...' },
    { pct: 100, label: 'Welcome!' },
  ];

  let step = 0;
  function advanceLoader() {
    if (step >= loadingSteps.length) {
      setTimeout(() => {
        loadingScreen.style.opacity = '0';
        loadingScreen.style.transition = 'opacity 0.6s ease';
        setTimeout(() => {
          loadingScreen.style.display = 'none';
          initPage();
        }, 600);
      }, 300);
      return;
    }
    const { pct, label } = loadingSteps[step++];
    loadingBar.style.width = pct + '%';
    loadingLabel.textContent = label;
    setTimeout(advanceLoader, pct === 100 ? 400 : 250);
  }
  setTimeout(advanceLoader, 200);


  /* ── HERO CANVAS (matrix rain style) ──────── */
  function initCanvas() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, cols, drops;

    const CHARS = '01アイウエオカキクケコサシスセソタチツテト><{}[]#@!%&';
    const FONT_SIZE = 13;
    const COLOR = '#00f0c8';

    function resize() {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
      cols  = Math.floor(W / FONT_SIZE);
      drops = Array(cols).fill(1);
    }
    resize();
    window.addEventListener('resize', resize);

    function draw() {
      ctx.fillStyle = 'rgba(7,11,20,0.06)';
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = COLOR;
      ctx.font = FONT_SIZE + 'px "Space Mono", monospace';

      for (let i = 0; i < drops.length; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        ctx.globalAlpha = Math.random() * 0.3 + 0.1;
        ctx.fillText(char, i * FONT_SIZE, drops[i] * FONT_SIZE);
        if (drops[i] * FONT_SIZE > H && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
      ctx.globalAlpha = 1;
    }
    setInterval(draw, 55);
  }


  /* ── ROLE TYPEWRITER ─────────────────────── */
  function initRoles() {
    const el = document.getElementById('role-text');
    if (!el) return;
    const roles = [
      'Cybersecurity Student',
      'Ethical Hacker',
      'Network Security Enthusiast',
      'IoT Developer',
      'SOC Analyst (Aspiring)',
    ];
    let ri = 0, ci = 0, deleting = false;
    function type() {
      const current = roles[ri];
      if (deleting) {
        el.textContent = current.substring(0, ci--);
        if (ci < 0) { deleting = false; ri = (ri + 1) % roles.length; setTimeout(type, 500); return; }
        setTimeout(type, 45);
      } else {
        el.textContent = current.substring(0, ci++);
        if (ci > current.length) { deleting = true; setTimeout(type, 1800); return; }
        setTimeout(type, 80);
      }
    }
    type();
  }


  /* ── CUSTOM CURSOR ────────────────────────── */
  function initCursor() {
    const dot      = document.getElementById('cursor');
    const follower = document.getElementById('cursor-follower');
    if (!dot || !follower) return;

    let fx = 0, fy = 0, mx = 0, my = 0;

    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + 'px';
      dot.style.top  = my + 'px';
    });

    function animFollower() {
      fx += (mx - fx) * 0.12;
      fy += (my - fy) * 0.12;
      follower.style.left = fx + 'px';
      follower.style.top  = fy + 'px';
      requestAnimationFrame(animFollower);
    }
    animFollower();

    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', () => {
        dot.style.transform = 'translate(-50%,-50%) scale(2)';
        follower.style.transform = 'translate(-50%,-50%) scale(1.5)';
        follower.style.borderColor = 'rgba(0,240,200,0.6)';
      });
      el.addEventListener('mouseleave', () => {
        dot.style.transform = 'translate(-50%,-50%) scale(1)';
        follower.style.transform = 'translate(-50%,-50%) scale(1)';
        follower.style.borderColor = 'rgba(0,240,200,0.4)';
      });
    });
  }


  /* ── NAVBAR SCROLL ────────────────────────── */
  function initNavbar() {
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 40);
    });

    // Hamburger
    const ham   = document.getElementById('hamburger');
    const menu  = document.getElementById('mobile-menu');
    if (ham && menu) {
      ham.addEventListener('click', () => {
        ham.classList.toggle('open');
        menu.classList.toggle('open');
      });
      menu.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => {
          ham.classList.remove('open');
          menu.classList.remove('open');
        });
      });
    }

    // Active link on scroll
    const sections  = document.querySelectorAll('section[id]');
    const navLinks  = document.querySelectorAll('.nav-link');
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY + 120;
      sections.forEach(sec => {
        if (scrollY >= sec.offsetTop && scrollY < sec.offsetTop + sec.offsetHeight) {
          navLinks.forEach(l => l.classList.remove('active'));
          const link = document.querySelector(`.nav-link[href="#${sec.id}"]`);
          if (link) link.classList.add('active');
        }
      });
    });
  }


  /* ── SCROLL REVEAL ────────────────────────── */
  function initReveal() {
    const targets = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

    // Assign stagger index to grid children
    document.querySelectorAll('.skills-grid .skill-card, .cert-grid .cert-card').forEach((el, i) => {
      el.style.setProperty('--i', i % 6);
      el.classList.add('reveal');
    });

    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => obs.observe(el));
  }


  /* ── GSAP HERO ENTRANCE ─────────────────── */
  function initHeroAnimations() {
    if (typeof gsap === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    gsap.from('.hero-badge',   { opacity: 0, y: 20, duration: 0.7, delay: 0.2, ease: 'power3.out' });
    gsap.from('.hero-name .line', {
      opacity: 0, y: 40, duration: 0.8,
      stagger: 0.15, delay: 0.4, ease: 'power3.out'
    });
    gsap.from('.hero-roles',   { opacity: 0, y: 20, duration: 0.7, delay: 0.85, ease: 'power3.out' });
    gsap.from('.hero-desc',    { opacity: 0, y: 20, duration: 0.7, delay: 1.0,  ease: 'power3.out' });
    gsap.from('.hero-ctas',    { opacity: 0, y: 20, duration: 0.7, delay: 1.15, ease: 'power3.out' });
    gsap.from('.hero-stats',   { opacity: 0, y: 20, duration: 0.7, delay: 1.3,  ease: 'power3.out' });
    gsap.from('.hero-scroll',  { opacity: 0, y: 10, duration: 0.6, delay: 1.5,  ease: 'power3.out' });

    // Parallax hero on scroll
    gsap.to('.hero-content', {
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
      y: 120, opacity: 0.4
    });
  }


  /* ── SMOOTH ANCHOR SCROLL ─────────────────── */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 70;
        window.scrollTo({ top, behavior: 'smooth' });
      });
    });
  }


  /* ── CONTACT FORM ─────────────────────────── */
  function initForm() {
    const form = document.getElementById('contactForm');
    const note = document.getElementById('form-note');
    if (!form) return;

    form.addEventListener('submit', async e => {
      e.preventDefault();
      const btn = form.querySelector('.form-submit');
      btn.textContent = 'Sending...';
      btn.disabled = true;

      try {
        const res = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        });
        if (res.ok) {
          note.textContent = '✓ Message sent! I\'ll get back to you soon.';
          note.style.color = 'var(--accent)';
          form.reset();
        } else {
          throw new Error('Server error');
        }
      } catch {
        note.textContent = '✗ Something went wrong. Email me directly.';
        note.style.color = '#ff4e6a';
      }
      btn.textContent = 'Send Message ➜';
      btn.disabled = false;
    });
  }


  /* ── INIT SEQUENCE ────────────────────────── */
  function initPage() {
    initCanvas();
    initRoles();
    initCursor();
    initNavbar();
    initReveal();
    initHeroAnimations();
    initSmoothScroll();
    initForm();
  }

});
