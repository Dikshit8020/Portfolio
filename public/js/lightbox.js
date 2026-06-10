/* ═══════════════════════════════════════════════════════════
   LIGHTBOX — Full-screen image/video viewer
   Supports keyboard nav, touch swipe, captions
   ═══════════════════════════════════════════════════════════ */

(function initLightbox() {
  // Create lightbox DOM
  const lb = document.createElement('div');
  lb.className = 'lightbox';
  lb.innerHTML = `
    <div class="lightbox-content">
      <button class="lightbox-close" aria-label="Close">✕</button>
      <button class="lightbox-nav lightbox-prev" aria-label="Previous">‹</button>
      <button class="lightbox-nav lightbox-next" aria-label="Next">›</button>
      <div class="lightbox-media"></div>
      <div class="lightbox-counter"></div>
      <div class="lightbox-caption"></div>
    </div>
  `;
  document.body.appendChild(lb);

  const mediaEl = lb.querySelector('.lightbox-media');
  const counterEl = lb.querySelector('.lightbox-counter');
  const captionEl = lb.querySelector('.lightbox-caption');
  let items = [], currentIndex = 0;

  function open(galleryItems, index) {
    items = galleryItems;
    currentIndex = index;
    show();
    lb.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lb.classList.remove('active');
    document.body.style.overflow = '';
    mediaEl.innerHTML = '';
  }

  function show() {
    const item = items[currentIndex];
    mediaEl.innerHTML = '';
    if (item.type === 'video') {
      const v = document.createElement('video');
      v.src = item.src; v.controls = true; v.autoplay = true;
      v.style.maxWidth = '90vw'; v.style.maxHeight = '80vh';
      v.style.borderRadius = 'var(--r)';
      mediaEl.appendChild(v);
    } else {
      const img = document.createElement('img');
      img.src = item.src; img.alt = item.caption || '';
      mediaEl.appendChild(img);
    }
    counterEl.textContent = `${currentIndex + 1} / ${items.length}`;
    captionEl.textContent = item.caption || '';
  }

  function next() { currentIndex = (currentIndex + 1) % items.length; show(); }
  function prev() { currentIndex = (currentIndex - 1 + items.length) % items.length; show(); }

  // Event listeners
  lb.querySelector('.lightbox-close').addEventListener('click', close);
  lb.querySelector('.lightbox-prev').addEventListener('click', prev);
  lb.querySelector('.lightbox-next').addEventListener('click', next);
  lb.addEventListener('click', e => { if (e.target === lb) close(); });

  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('active')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  });

  // Touch swipe
  let touchStartX = 0;
  lb.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
  lb.addEventListener('touchend', e => {
    const diff = e.changedTouches[0].screenX - touchStartX;
    if (Math.abs(diff) > 50) { diff > 0 ? prev() : next(); }
  }, { passive: true });

  // Auto-bind gallery items
  function bindGalleries() {
    const galleries = {};
    document.querySelectorAll('[data-lightbox]').forEach(el => {
      const group = el.dataset.lightbox;
      if (!galleries[group]) galleries[group] = [];
      const img = el.querySelector('img');
      const video = el.querySelector('video');
      const caption = el.querySelector('.media-caption')?.textContent || el.dataset.caption || '';
      const src = img ? img.src : (video ? video.src : '');
      const type = video ? 'video' : 'image';
      const index = galleries[group].length;
      galleries[group].push({ src, caption, type });
      el.addEventListener('click', e => {
        e.preventDefault();
        open(galleries[group], index);
      });
    });
  }

  document.addEventListener('DOMContentLoaded', bindGalleries);
  window._rebindLightbox = bindGalleries;
})();
