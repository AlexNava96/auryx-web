/* =========================================================
   AURYX — Interacciones y animaciones
   ========================================================= */
(function () {
  'use strict';

  // Marca que hay JS antes de pintar, para ocultar lo que se revelará al hacer scroll
  document.documentElement.classList.add('js');

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var hasIO = 'IntersectionObserver' in window;

  document.addEventListener('DOMContentLoaded', init);

  function init() {
    setYear();
    initScrollUI();
    initReveal();
    initActiveLinks();
    initCounters();
    initHeroParallax();
    initParticles();
    initPointerGlow();
    initMagnetic();
    initChat();
    initTypewriter();
    initStatus();
  }

  /* ---------- Utilidades ---------- */

  // Ejecuta cb una sola vez cuando el elemento entra en pantalla
  function onEnter(el, cb, threshold) {
    if (!el) return;
    if (!hasIO) { cb(); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          io.disconnect();
          cb();
        }
      });
    }, { threshold: threshold || 0.35 });
    io.observe(el);
  }

  function wait(ms) {
    return new Promise(function (resolve) { setTimeout(resolve, ms); });
  }

  function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

  function setYear() {
    var el = document.querySelector('[data-year]');
    if (el) el.textContent = new Date().getFullYear();
  }

  /* ---------- Barra de progreso y navegación ---------- */
  function initScrollUI() {
    var nav = document.querySelector('[data-nav]');
    var bar = document.querySelector('.progress__bar');
    var ticking = false;

    function update() {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      var p = max > 0 ? window.scrollY / max : 0;
      if (bar) bar.style.setProperty('--progress', p.toFixed(4));
      if (nav) nav.classList.toggle('is-scrolled', window.scrollY > 8);
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
  }

  /* ---------- Revelado al hacer scroll ---------- */
  function initReveal() {
    var items = document.querySelectorAll('.reveal');
    if (!hasIO || reduceMotion) {
      items.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
    items.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Enlace activo en el menú ---------- */
  function initActiveLinks() {
    if (!hasIO) return;
    var links = Array.prototype.slice.call(document.querySelectorAll('.nav__links a'));
    var scroller = document.querySelector('.nav__scroller');
    var map = {};
    links.forEach(function (a) {
      var id = a.getAttribute('href').slice(1);
      var section = document.getElementById(id);
      if (section) map[id] = { link: a, section: section };
    });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (a) { a.classList.remove('is-active'); });
        var item = map[entry.target.id];
        if (!item) return;
        item.link.classList.add('is-active');
        // En celular, desliza el menú para que el enlace activo quede a la vista
        if (scroller && scroller.scrollWidth > scroller.clientWidth) {
          var lr = item.link.getBoundingClientRect();
          var sr = scroller.getBoundingClientRect();
          var left = scroller.scrollLeft + (lr.left - sr.left) - (sr.width - lr.width) / 2;
          scroller.scrollTo({ left: left, behavior: reduceMotion ? 'auto' : 'smooth' });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    Object.keys(map).forEach(function (id) { io.observe(map[id].section); });
  }

  /* ---------- Contadores del hero ---------- */
  function initCounters() {
    var wrap = document.querySelector('[data-stats]');
    if (!wrap || reduceMotion) return;
    var nums = wrap.querySelectorAll('[data-count]');
    nums.forEach(function (el) { el.textContent = '0' + (el.dataset.suffix || ''); });

    onEnter(wrap, function () {
      nums.forEach(function (el, i) {
        var target = parseFloat(el.dataset.count);
        var suffix = el.dataset.suffix || '';
        var duration = 1400 + i * 200;
        var start = null;
        function step(ts) {
          if (start === null) start = ts;
          var t = Math.min((ts - start) / duration, 1);
          el.textContent = Math.round(target * easeOutCubic(t)) + suffix;
          if (t < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      });
    }, 0.5);
  }

  /* ---------- Parallax del hero ---------- */
  function initHeroParallax() {
    if (reduceMotion) return;
    var hero = document.querySelector('.hero');
    var visual = document.querySelector('[data-hero-visual]');
    var copy = document.querySelector('[data-hero-copy]');
    if (!hero || !visual || !copy) return;
    var ticking = false;

    function update() {
      var y = window.scrollY;
      var h = hero.offsetHeight;
      if (y <= h) {
        visual.style.translate = '0 ' + (y * 0.22).toFixed(1) + 'px';
        visual.style.scale = (1 + y * 0.00018).toFixed(4);
        copy.style.translate = '0 ' + (y * 0.12).toFixed(1) + 'px';
        copy.style.opacity = Math.max(0, 1 - y / (h * 0.55)).toFixed(3);
      }
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    }, { passive: true });
  }

  /* ---------- Partículas de luz en el hero ---------- */
  function initParticles() {
    var canvas = document.querySelector('.hero__particles');
    if (!canvas || !canvas.getContext) return;
    var ctx = canvas.getContext('2d');
    var colors = ['185,168,255', '224,139,255', '92,225,255', '142,167,255'];
    var particles = [];
    var running = false;
    var raf = null;
    var w = 0;
    var h = 0;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      var rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var count = w < 600 ? 34 : 70;
      particles = [];
      for (var i = 0; i < count; i++) particles.push(makeParticle(true));
    }

    function makeParticle(anywhere) {
      return {
        x: Math.random() * w,
        y: anywhere ? Math.random() * h : h + 10,
        r: 0.6 + Math.random() * 1.8,
        vy: 0.12 + Math.random() * 0.35,
        vx: (Math.random() - 0.5) * 0.15,
        c: colors[(Math.random() * colors.length) | 0],
        phase: Math.random() * Math.PI * 2,
        speed: 0.01 + Math.random() * 0.025
      };
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter';
      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        if (running) {
          p.y -= p.vy;
          p.x += p.vx;
          p.phase += p.speed;
          if (p.y < -10) particles[i] = p = makeParticle(false);
        }
        var a = 0.25 + 0.55 * (0.5 + 0.5 * Math.sin(p.phase));
        var g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 5);
        g.addColorStop(0, 'rgba(' + p.c + ',' + a + ')');
        g.addColorStop(1, 'rgba(' + p.c + ',0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 5, 0, Math.PI * 2);
        ctx.fill();
      }
      if (running) raf = requestAnimationFrame(draw);
    }

    function start() {
      if (running || reduceMotion) return;
      running = true;
      raf = requestAnimationFrame(draw);
    }
    function stop() {
      running = false;
      if (raf) cancelAnimationFrame(raf);
    }

    resize();
    draw();
    window.addEventListener('resize', function () { resize(); if (!running) draw(); });

    if (hasIO) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) { entry.isIntersecting ? start() : stop(); });
      }).observe(canvas);
    } else {
      start();
    }
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) stop();
    });
  }

  /* ---------- Luz que sigue al cursor en mosaicos y tarjetas ---------- */
  function initPointerGlow() {
    if (!finePointer) return;
    document.querySelectorAll('[data-tile]').forEach(function (el) {
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        var x = e.clientX - r.left;
        var y = e.clientY - r.top;
        el.style.setProperty('--mx', x + 'px');
        el.style.setProperty('--my', y + 'px');
        if (!reduceMotion) {
          el.style.setProperty('--px', ((x / r.width) * 2 - 1).toFixed(3));
          el.style.setProperty('--py', ((y / r.height) * 2 - 1).toFixed(3));
        }
      });
      el.addEventListener('pointerleave', function () {
        el.style.setProperty('--px', 0);
        el.style.setProperty('--py', 0);
      });
    });
  }

  /* ---------- Botones magnéticos ---------- */
  function initMagnetic() {
    if (!finePointer || reduceMotion) return;
    document.querySelectorAll('[data-magnetic]').forEach(function (btn) {
      btn.addEventListener('pointermove', function (e) {
        var r = btn.getBoundingClientRect();
        var dx = (e.clientX - (r.left + r.width / 2)) * 0.25;
        var dy = (e.clientY - (r.top + r.height / 2)) * 0.35;
        btn.style.setProperty('--mx', Math.max(-10, Math.min(10, dx)).toFixed(1) + 'px');
        btn.style.setProperty('--my', Math.max(-8, Math.min(8, dy)).toFixed(1) + 'px');
      });
      btn.addEventListener('pointerleave', function () {
        btn.style.setProperty('--mx', '0px');
        btn.style.setProperty('--my', '0px');
      });
    });
  }

  /* ---------- Conversación del asistente de IA ---------- */
  function initChat() {
    var chat = document.querySelector('[data-chat]');
    if (!chat) return;
    if (reduceMotion) {
      chat.classList.add('step-1', 'step-3', 'step-4');
      return;
    }
    onEnter(chat, function () {
      wait(250)
        .then(function () { chat.classList.add('step-1'); return wait(800); })
        .then(function () { chat.classList.add('step-2'); return wait(1500); })
        .then(function () { chat.classList.add('step-3'); return wait(600); })
        .then(function () { chat.classList.add('step-4'); });
    }, 0.4);
  }

  /* ---------- Búsqueda que se escribe sola ---------- */
  function initTypewriter() {
    var el = document.querySelector('[data-typewriter]');
    if (!el) return;
    var ad = document.querySelector('.search__ad');
    var text = el.dataset.typewriter;
    if (reduceMotion) {
      if (ad) ad.classList.add('is-shown');
      return;
    }
    el.textContent = '';
    onEnter(el.closest('.tile') || el, function () {
      var i = 0;
      (function type() {
        el.textContent = text.slice(0, ++i);
        if (i < text.length) {
          setTimeout(type, 45 + Math.random() * 45);
        } else if (ad) {
          setTimeout(function () { ad.classList.add('is-shown'); }, 250);
        }
      })();
    }, 0.4);
  }

  /* ---------- Revisión del estado del sitio ---------- */
  function initStatus() {
    var box = document.querySelector('[data-status]');
    if (!box) return;
    var rows = Array.prototype.slice.call(box.querySelectorAll('em[data-done]'));
    if (reduceMotion) { box.classList.add('is-done'); return; }

    rows.forEach(function (em) {
      em.textContent = 'Revisando…';
      em.classList.add('is-checking');
    });

    onEnter(box, function () {
      var chain = wait(400);
      rows.forEach(function (em) {
        chain = chain.then(function () {
          em.classList.remove('is-checking');
          em.classList.add('is-ok');
          em.textContent = em.dataset.done;
          return wait(550);
        });
      });
      chain.then(function () { box.classList.add('is-done'); });
    }, 0.5);
  }
})();
