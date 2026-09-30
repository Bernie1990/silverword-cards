/* ═══════════════════════════════════════════════════════════════════
   fx.js — 動態層：3D 傾斜、游標視差、進場錯開、飄浮微塵
   ───────────────────────────────────────────────────────────────────
   全部用事件委派掛在容器上，重畫 innerHTML 不需要重新綁定。
   JS 只寫 CSS 變數（--mx --my --rx --ry --lift），其餘交給 CSS。
   ═══════════════════════════════════════════════════════════════════ */
(function (global) {
  'use strict';

  const reduced = global.matchMedia && global.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const coarse = global.matchMedia && global.matchMedia('(hover: none)').matches;
  const TILT = 11;

  function reset(card) {
    if (!card) return;
    card.style.setProperty('--lift', '0');
    card.style.setProperty('--mx', '50%');
    card.style.setProperty('--my', '50%');
    const t = card.querySelector('.card-3d');
    if (t) { t.style.setProperty('--rx', '0deg'); t.style.setProperty('--ry', '0deg'); }
  }

  /** 對容器內所有 .card 掛傾斜／視差 */
  function tilt(root) {
    if (!root || reduced || coarse || root.__fx) return;
    root.__fx = true;
    let cur = null;
    let px = 0;
    let py = 0;
    let raf = 0;

    const apply = () => {
      raf = 0;
      if (!cur || !cur.isConnected) { cur = null; return; }
      const r = cur.getBoundingClientRect();
      if (!r.width || !r.height) return;
      const x = (px - r.left) / r.width;
      const y = (py - r.top) / r.height;
      cur.style.setProperty('--mx', (x * 100).toFixed(1) + '%');
      cur.style.setProperty('--my', (y * 100).toFixed(1) + '%');
      const t = cur.querySelector('.card-3d');
      if (t) {
        // 翻到背面時左右鏡射，讓傾斜方向仍跟著游標
        const flipped = cur.classList.contains('flipped') ? -1 : 1;
        t.style.setProperty('--ry', ((x - 0.5) * TILT * flipped).toFixed(2) + 'deg');
        t.style.setProperty('--rx', ((0.5 - y) * TILT).toFixed(2) + 'deg');
      }
    };

    root.addEventListener('pointermove', (e) => {
      if (e.pointerType === 'touch') return;
      const card = e.target.closest('.card');
      if (!card) { if (cur) { reset(cur); cur = null; } return; }
      if (card !== cur) { reset(cur); cur = card; card.style.setProperty('--lift', '1'); }
      px = e.clientX;
      py = e.clientY;
      if (!raf) raf = requestAnimationFrame(apply);
    }, { passive: true });

    root.addEventListener('pointerleave', () => { reset(cur); cur = null; }, { passive: true });
  }

  /** 讓容器背景光斑跟著游標（聚光燈用） */
  function glow(el) {
    if (!el || reduced || coarse || el.__glow) return;
    el.__glow = true;
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', (((e.clientX - r.left) / r.width) * 100).toFixed(1) + '%');
      el.style.setProperty('--my', (((e.clientY - r.top) / r.height) * 100).toFixed(1) + '%');
    }, { passive: true });
  }

  /** 進場錯開；上限 20 張，一頁很多卡時不會等太久 */
  function stagger(root) {
    if (!root) return;
    const cards = root.querySelectorAll('.card');
    for (let i = 0; i < cards.length; i += 1) cards[i].style.setProperty('--i', String(Math.min(i, 20)));
  }

  /** 劇場的飄浮微塵 */
  function dust(host, count = 16) {
    if (!host || reduced) return;
    let html = '<div class="dust">';
    for (let i = 0; i < count; i += 1) {
      const left = (Math.random() * 100).toFixed(1);
      const dur = (9 + Math.random() * 11).toFixed(1);
      const delay = (-Math.random() * 14).toFixed(1);
      const size = (2 + Math.random() * 2.4).toFixed(1);
      html += `<i style="left:${left}%;width:${size}px;height:${size}px;animation-duration:${dur}s;animation-delay:${delay}s"></i>`;
    }
    host.insertAdjacentHTML('beforeend', html + '</div>');
  }

  /** 圖片來自快取時 onload 可能已錯過，手動補 .loaded */
  function syncLoaded(root) {
    root.querySelectorAll('img').forEach((img) => {
      if (!img.getAttribute('src')) return;
      if (img.complete && img.naturalWidth > 0) img.classList.add('loaded');
    });
  }

  global.FX = { tilt, glow, stagger, dust, syncLoaded, reset, reduced, coarse };
}(window));
