/* ═══════════════════════════════════════════════════════════
   DIKSHIT MALOO PORTFOLIO — Core JS v4.0
   Shared across all pages
   ═══════════════════════════════════════════════════════════ */

/* ── LOADING SCREEN ─────────────────────────────────────── */
window.addEventListener('load', () => {
  const loader = document.getElementById('loading-screen');
  if (loader) setTimeout(() => loader.classList.add('hidden'), 600);
});

/* ── CUSTOM CURSOR ──────────────────────────────────────── */
(function initCursor() {
  const cur = document.getElementById('cur');
  const curT = document.getElementById('cur-t');
  if (!cur || !curT) return;
  let mx = 0, my = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cur.style.left = mx + 'px'; cur.style.top = my + 'px';
    setTimeout(() => { curT.style.left = mx + 'px'; curT.style.top = my + 'px'; }, 90);
  });
  function bindHover() {
    document.querySelectorAll('a, button, .skc, .pjc, .plc, .media-item, .clink, .plat-c, .tc, .ec, .lc, .cco').forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
    });
  }
  bindHover();
  window._rebindCursorHover = bindHover;
})();

/* ── SCROLL PROGRESS BAR ───────────────────────────────── */
(function initScrollProgress() {
  const p = document.getElementById('prog');
  if (!p) return;
  window.addEventListener('scroll', () => {
    const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
    p.style.width = Math.min(pct, 100) + '%';
  }, { passive: true });
})();

/* ── SCROLL REVEAL ──────────────────────────────────────── */
const rvObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); rvObs.unobserve(e.target); }
  });
}, { threshold: 0.1 });
function initReveal() {
  document.querySelectorAll('.rv').forEach(el => rvObs.observe(el));
}

/* ── COUNTER ANIMATION ──────────────────────────────────── */
function animCount(el, target, dur = 1800) {
  const start = performance.now();
  const update = now => {
    const p = Math.min((now - start) / dur, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(ease * target) + (el.dataset.suffix || '');
    if (p < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}
const countObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { animCount(e.target, +e.target.dataset.target); countObs.unobserve(e.target); }
  });
}, { threshold: 0.5 });
function initCounters() {
  document.querySelectorAll('[data-target]').forEach(el => countObs.observe(el));
}

/* ── SKILL BAR ANIMATION ───────────────────────────────── */
const barObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.skc-fill, .sk-gf').forEach(b => {
        b.style.width = b.dataset.width + '%';
      });
      barObs.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
function initBars() {
  document.querySelectorAll('.skill-bars-container, .sk-gauge-wrap').forEach(el => barObs.observe(el));
}

/* ── 3D TILT EFFECT ─────────────────────────────────────── */
function initTilt(sel) {
  document.querySelectorAll(sel).forEach(c => {
    c.addEventListener('mousemove', e => {
      const r = c.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width - .5) * 7;
      const y = ((e.clientY - r.top) / r.height - .5) * 7;
      c.style.transform = `translateY(-6px) rotateX(${-y}deg) rotateY(${x}deg)`;
    });
    c.addEventListener('mouseleave', () => c.style.transform = '');
  });
}

/* ── HAMBURGER MENU ─────────────────────────────────────── */
(function initHamburger() {
  const btn = document.querySelector('.hamburger');
  const menu = document.querySelector('.mobile-menu');
  if (!btn || !menu) return;

  function toggleMenu() {
    btn.classList.toggle('active');
    menu.classList.toggle('active');
    document.body.style.overflow = menu.classList.contains('active') ? 'hidden' : '';
  }
  btn.addEventListener('click', toggleMenu);
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    btn.classList.remove('active');
    menu.classList.remove('active');
    document.body.style.overflow = '';
  }));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && menu.classList.contains('active')) toggleMenu();
  });
})();

/* ── SCROLL TO TOP ──────────────────────────────────────── */
(function initScrollTop() {
  const btn = document.getElementById('scroll-top');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > window.innerHeight * 0.8);
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();

/* ── CONTACT FORM ───────────────────────────────────────── */
async function submitForm(e) {
  e.preventDefault();
  const btn = document.getElementById('f-btn');
  const fs = document.getElementById('fs');
  const data = {
    name: document.getElementById('f-name').value,
    email: document.getElementById('f-email').value,
    company: document.getElementById('f-co').value,
    message: document.getElementById('f-msg').value
  };
  btn.disabled = true; btn.textContent = 'Sending...';
  fs.style.color = 'var(--cyan)'; fs.textContent = '// Transmitting...';
  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error();
    fs.style.color = 'var(--green)'; fs.textContent = '✓ Message sent!';
    e.target.reset();
  } catch {
    const s = `mailto:dixitjain9455@gmail.com?subject=${encodeURIComponent('Portfolio: ' + data.name)}&body=${encodeURIComponent(data.message)}`;
    window.location.href = s;
    fs.style.color = 'var(--amber)'; fs.textContent = '→ Opening email client';
  } finally {
    btn.disabled = false; btn.textContent = 'Send ↗';
  }
}

/* ── SMOOTH SCROLL FOR ANCHORS ──────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});

/* ── INIT ───────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initReveal();
  initBars();
  initCounters();
  initTilt('.skc');
  initTilt('.pjc');
});
