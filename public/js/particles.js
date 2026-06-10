/* ═══════════════════════════════════════════════════════════
   PARTICLE CANVAS — Hero Section Background
   60 floating particles with connections and mouse repulsion
   ═══════════════════════════════════════════════════════════ */

(function initParticles() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, particles = [], mouse = { x: -1000, y: -1000 };
  const PARTICLE_COUNT = window.innerWidth < 768 ? 30 : 60;
  const CONNECT_DIST = 120;
  const MOUSE_RADIUS = 150;

  const colors = [
    'rgba(0,229,255,', // cyan
    'rgba(206,147,216,', // purple
    'rgba(255,193,7,',  // amber
    'rgba(0,230,118,',  // green
  ];

  function resize() {
    w = canvas.width = canvas.parentElement.offsetWidth;
    h = canvas.height = canvas.parentElement.offsetHeight;
  }

  function createParticle() {
    const color = colors[Math.floor(Math.random() * colors.length)];
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 1,
      color: color,
      alpha: Math.random() * 0.5 + 0.2,
    };
  }

  function init() {
    resize();
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(createParticle());
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONNECT_DIST) {
          const opacity = (1 - dist / CONNECT_DIST) * 0.15;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0,229,255,${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    // Draw particles
    for (const p of particles) {
      // Mouse repulsion
      const dx = p.x - mouse.x;
      const dy = p.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < MOUSE_RADIUS && dist > 0) {
        const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS * 0.8;
        p.x += (dx / dist) * force;
        p.y += (dy / dist) * force;
      }

      // Move
      p.x += p.vx;
      p.y += p.vy;

      // Wrap around edges
      if (p.x < -10) p.x = w + 10;
      if (p.x > w + 10) p.x = -10;
      if (p.y < -10) p.y = h + 10;
      if (p.y > h + 10) p.y = -10;

      // Draw
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color + p.alpha + ')';
      ctx.fill();

      // Glow
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2);
      ctx.fillStyle = p.color + (p.alpha * 0.15) + ')';
      ctx.fill();
    }

    requestAnimationFrame(draw);
  }

  canvas.parentElement.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });
  canvas.parentElement.addEventListener('mouseleave', () => {
    mouse.x = -1000; mouse.y = -1000;
  });

  window.addEventListener('resize', () => { resize(); });

  // Pause when tab not visible
  let animating = true;
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { animating = false; }
    else { animating = true; draw(); }
  });

  init();
  draw();
})();
