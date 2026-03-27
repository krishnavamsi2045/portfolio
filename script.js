/* script.js — Mandala Krishna Vamsi Portfolio */

/* FAILSAFE: clears loader even if DOMContentLoaded never fires */
var _loaderKill = setTimeout(function() {
  var s = document.getElementById('loading');
  if (s) s.style.display = 'none';
}, 4000);

document.addEventListener('DOMContentLoaded', function() {

  /* ── LOADING SCREEN ── */
  var loadingScreen = document.getElementById('loading');
  var loadingBar    = document.getElementById('loading-bar');
  var loadingLabel  = document.getElementById('loading-label');
  var _dismissed    = false;

  function dismissLoader() {
    if (_dismissed) return;
    _dismissed = true;
    clearTimeout(_loaderKill);
    if (!loadingScreen) { initPage(); return; }
    try {
      if (loadingBar)   loadingBar.style.width      = '100%';
      if (loadingLabel) loadingLabel.textContent     = 'Welcome!';
    } catch(e) {}
    setTimeout(function() {
      loadingScreen.style.opacity    = '0';
      loadingScreen.style.transition = 'opacity 0.5s ease';
      setTimeout(function() {
        loadingScreen.style.display = 'none';
        initPage();
      }, 500);
    }, 200);
  }

  var steps = [25, 50, 75, 90];
  var labels = ['Loading assets...','Initializing canvas...','Preparing animations...','Almost ready...'];
  var si = 0;
  function tick() {
    if (si >= steps.length) { dismissLoader(); return; }
    try {
      if (loadingBar)   loadingBar.style.width      = steps[si] + '%';
      if (loadingLabel) loadingLabel.textContent     = labels[si];
    } catch(e) {}
    si++;
    setTimeout(tick, 280);
  }
  setTimeout(tick, 150);
  /* Hard ceiling — always dismiss after 3s no matter what */
  setTimeout(dismissLoader, 3000);


  /* ── HERO CANVAS — matrix rain ── */
  function initCanvas() {
    var canvas = document.getElementById('hero-canvas');
    if (!canvas) return;
    var ctx;
    try { ctx = canvas.getContext('2d'); } catch(e) { return; }
    var W, H, cols, drops;
    var CHARS = '01><{}[]#@!%&アイウエオカキ';
    var FS = 13;
    function resize() {
      W = canvas.width  = canvas.offsetWidth  || window.innerWidth;
      H = canvas.height = canvas.offsetHeight || window.innerHeight;
      cols  = Math.floor(W / FS);
      drops = Array(cols).fill(1);
    }
    resize();
    window.addEventListener('resize', resize);
    function draw() {
      ctx.fillStyle = 'rgba(7,11,20,0.07)';
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = '#00f0c8';
      ctx.font = FS + 'px monospace';
      for (var i = 0; i < drops.length; i++) {
        ctx.globalAlpha = Math.random() * 0.25 + 0.07;
        ctx.fillText(CHARS[Math.floor(Math.random() * CHARS.length)], i * FS, drops[i] * FS);
        if (drops[i] * FS > H && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
      ctx.globalAlpha = 1;
    }
    setInterval(draw, 60);
  }


  /* ── ROLE TYPEWRITER ── */
  function initRoles() {
    var el = document.getElementById('role-text');
    if (!el) return;
    var roles = ['Cybersecurity Student','Ethical Hacker','Network Security Enthusiast','IoT Developer','SOC Analyst (Aspiring)'];
    var ri = 0, ci = 0, del = false;
    function type() {
      var cur = roles[ri];
      if (del) {
        el.textContent = cur.substring(0, ci--);
        if (ci < 0) { del = false; ri = (ri + 1) % roles.length; setTimeout(type, 500); return; }
        setTimeout(type, 45);
      } else {
        el.textContent = cur.substring(0, ci++);
        if (ci > cur.length) { del = true; setTimeout(type, 1800); return; }
        setTimeout(type, 80);
      }
    }
    type();
  }


  /* ── CUSTOM CURSOR ── */
  function initCursor() {
    var dot = document.getElementById('cursor');
    var fol = document.getElementById('cursor-follower');
    if (!dot || !fol) return;
    var fx = 0, fy = 0, mx = 0, my = 0;
    document.addEventListener('mousemove', function(e) {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + 'px'; dot.style.top = my + 'px';
    });
    (function animF() {
      fx += (mx - fx) * 0.12; fy += (my - fy) * 0.12;
      fol.style.left = fx + 'px'; fol.style.top = fy + 'px';
      requestAnimationFrame(animF);
    })();
    document.querySelectorAll('a,button').forEach(function(el) {
      el.addEventListener('mouseenter', function() {
        dot.style.transform = 'translate(-50%,-50%) scale(2)';
        fol.style.transform = 'translate(-50%,-50%) scale(1.5)';
        fol.style.borderColor = 'rgba(0,240,200,0.6)';
      });
      el.addEventListener('mouseleave', function() {
        dot.style.transform = 'translate(-50%,-50%) scale(1)';
        fol.style.transform = 'translate(-50%,-50%) scale(1)';
        fol.style.borderColor = 'rgba(0,240,200,0.4)';
      });
    });
  }


  /* ── NAVBAR ── */
  function initNavbar() {
    var header = document.getElementById('header');
    if (header) window.addEventListener('scroll', function() {
      header.classList.toggle('scrolled', window.scrollY > 40);
    });
    var ham = document.getElementById('hamburger');
    var menu = document.getElementById('mobile-menu');
    if (ham && menu) {
      ham.addEventListener('click', function() { ham.classList.toggle('open'); menu.classList.toggle('open'); });
      menu.querySelectorAll('a').forEach(function(a) {
        a.addEventListener('click', function() { ham.classList.remove('open'); menu.classList.remove('open'); });
      });
    }
    var secs = document.querySelectorAll('section[id]');
    var links = document.querySelectorAll('.nav-link');
    window.addEventListener('scroll', function() {
      var sy = window.scrollY + 120;
      secs.forEach(function(s) {
        if (sy >= s.offsetTop && sy < s.offsetTop + s.offsetHeight) {
          links.forEach(function(l) { l.classList.remove('active'); });
          var lk = document.querySelector('.nav-link[href="#' + s.id + '"]');
          if (lk) lk.classList.add('active');
        }
      });
    });
  }


  /* ── SCROLL REVEAL ── */
  function initReveal() {
    document.querySelectorAll('.skills-grid .skill-card,.cert-grid .cert-card').forEach(function(el, i) {
      el.style.setProperty('--i', i % 6); el.classList.add('reveal');
    });
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(function(el) { el.classList.add('visible'); });
      return;
    }
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(function(el) { obs.observe(el); });
  }


  /* ── GSAP HERO ── */
  function initHeroAnimations() {
    if (typeof gsap === 'undefined') return;
    try {
      gsap.registerPlugin(ScrollTrigger);
      gsap.from('.hero-badge',      { opacity:0, y:20, duration:0.7, delay:0.2,  ease:'power3.out' });
      gsap.from('.hero-name .line', { opacity:0, y:40, duration:0.8, delay:0.4,  ease:'power3.out', stagger:0.15 });
      gsap.from('.hero-roles',      { opacity:0, y:20, duration:0.7, delay:0.85, ease:'power3.out' });
      gsap.from('.hero-desc',       { opacity:0, y:20, duration:0.7, delay:1.0,  ease:'power3.out' });
      gsap.from('.hero-ctas',       { opacity:0, y:20, duration:0.7, delay:1.15, ease:'power3.out' });
      gsap.from('.hero-stats',      { opacity:0, y:20, duration:0.7, delay:1.3,  ease:'power3.out' });
      gsap.from('.hero-scroll',     { opacity:0, y:10, duration:0.6, delay:1.5,  ease:'power3.out' });
      gsap.to('.hero-content', {
        scrollTrigger: { trigger:'.hero', start:'top top', end:'bottom top', scrub:true },
        y:120, opacity:0.4
      });
    } catch(e) {}
  }


  /* ── SMOOTH SCROLL ── */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function(a) {
      a.addEventListener('click', function(e) {
        var t = document.querySelector(a.getAttribute('href'));
        if (!t) return;
        e.preventDefault();
        window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 70, behavior: 'smooth' });
      });
    });
  }


  /* ── CONTACT FORM ── */
  function initForm() {
    var form = document.getElementById('contactForm');
    var note = document.getElementById('form-note');
    if (!form) return;
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var btn = form.querySelector('.form-submit');
      btn.textContent = 'Sending...'; btn.disabled = true;
      fetch(form.action, { method:'POST', body:new FormData(form), headers:{'Accept':'application/json'} })
        .then(function(r) {
          if (r.ok) { if(note){note.textContent='✓ Sent! I\'ll reply soon.';note.style.color='var(--accent)';} form.reset(); }
          else throw new Error();
        })
        .catch(function() { if(note){note.textContent='✗ Error. Email me directly.';note.style.color='#ff4e6a';} })
        .finally(function() { btn.textContent='Send Message ➜'; btn.disabled=false; });
    });
  }


  /* ── BOOT ── */
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

  /* initPage() is called ONLY by dismissLoader() above — do NOT call it here again */

}); /* end DOMContentLoaded */
