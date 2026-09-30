/* ═══════════════════════════════════════════════════════════════════
   theater.js — 立繪劇場（全螢幕角色檢視）
   ───────────────────────────────────────────────────────────────────
   Theater.init({ rank, percent, lookOf, setLook })
   Theater.open(list, index)     以目前篩選結果為翻閱範圍
   支援 ←/→/Esc、觸控左右滑、套裝切換、前後預抓
   ═══════════════════════════════════════════════════════════════════ */
(function (global) {
  'use strict';

  const L = global.LEX;
  const R = global.Rank;
  const C = global.Card;
  const FX = global.FX;
  const esc = C.esc;

  let el = null;
  let hooks = {};
  let list = [];
  let idx = -1;
  let step = 0;

  const $ = (sel) => el.querySelector(sel);

  let bound = false;

  /** 可重複呼叫（切換系列時只更新 hooks），事件只綁一次 */
  function init(h) {
    hooks = h;
    if (bound) return;
    bound = true;
    el = document.getElementById('theater');
    el.addEventListener('click', (e) => {
      if (e.target.closest('[data-close]')) close();
      const lk = e.target.closest('.th-looks button');
      if (lk) { hooks.setLook(list[idx], lk.dataset.look); paint(); }
      const rel = e.target.closest('.rel[data-id]');
      if (rel) jump(rel.dataset.id);
    });
    $('.th-nav.prev').onclick = () => move(-1);
    $('.th-nav.next').onclick = () => move(1);

    document.addEventListener('keydown', (e) => {
      if (el.hidden) return;
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') move(-1);
      else if (e.key === 'ArrowRight') move(1);
      else return;
      e.preventDefault();
    });

    // 觸控左右滑切換
    let sx = 0;
    let sy = 0;
    el.addEventListener('pointerdown', (e) => { sx = e.clientX; sy = e.clientY; }, { passive: true });
    el.addEventListener('pointerup', (e) => {
      const dx = e.clientX - sx;
      const dy = e.clientY - sy;
      if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.5) move(dx < 0 ? 1 : -1);
    }, { passive: true });
  }

  function open(items, i) {
    list = items;
    idx = i;
    step = 0;
    if (idx < 0 || idx >= list.length) return;
    el.hidden = false;
    document.body.classList.add('locked');
    paint();
    $('.th-close').focus();
  }

  function close() {
    el.hidden = true;
    document.body.classList.remove('locked');
    list = [];
    idx = -1;
  }

  function move(d) {
    const n = idx + d;
    if (n < 0 || n >= list.length) return;
    idx = n;
    step = d;
    paint();
  }

  /** 關係鏈：目標在目前翻閱範圍內就直接跳過去；否則單獨開啟 */
  function jump(id) {
    const i = list.findIndex((x) => x.id === id);
    if (i >= 0) { step = i > idx ? 1 : -1; idx = i; paint(); return; }
    const target = hooks.byId && hooks.byId(id);
    if (target) { list = [target]; idx = 0; step = 0; paint(); }
  }

  const sec = (k, v, extra = '') => (v ? `<div class="th-sec ${extra}"><div class="k">${k}</div><div class="v">${v}</div></div>` : '');

  /** D&D 系列的故事區塊：格言、背景、理想／羈絆／缺陷、章節時間線、關係鏈 */
  function storyHtml(ch, seq) {
    const s = ch.story;
    if (!s) return '';
    const triad = (s.ideal || s.bond || s.flaw) ? `<div class="triad">
        ${s.ideal ? `<div class="tri ideal"><b>理想</b><p>${esc(s.ideal)}</p></div>` : ''}
        ${s.bond ? `<div class="tri bond"><b>羈絆</b><p>${esc(s.bond)}</p></div>` : ''}
        ${s.flaw ? `<div class="tri flaw"><b>缺陷</b><p>${esc(s.flaw)}</p></div>` : ''}
      </div>` : '';
    const chapters = (s.chapters || []).length ? `<ol class="chapters">${s.chapters.map((c, i) => `
        <li><span class="ch-no">${String(i + 1).padStart(2, '0')}</span><div><h4>${esc(c.title)}</h4><p>${esc(c.text)}</p></div></li>`).join('')}</ol>` : '';
    const rels = (s.relations || []).length ? `<div class="rels">${s.relations.map((r) => {
      const t = hooks.byId && hooks.byId(r.id);
      const name = t ? t.name : r.id;
      const known = Boolean(t);
      return `<button type="button" class="rel${known ? '' : ' ghost'}" data-id="${esc(r.id)}" ${known ? '' : 'disabled'}>
          <span class="rel-ph" style="--fa:var(--fx-${esc((t && t.faction) || 'none')}-a);--fb:var(--fx-${esc((t && t.faction) || 'none')}-b)">${known ? `<img src="${C.src(t, 'base', true)}" alt="" loading="lazy" onerror="this.remove()" />` : ''}${esc(name.charAt(0))}</span>
          <span class="rel-body"><b>${esc(name)}</b><small>${esc(r.text)}</small></span></button>`;
    }).join('')}</div>` : '';
    return [
      seq(sec('格言', `<blockquote class="th-quote">${esc(s.quote)}</blockquote>`, 'quote')),
      seq(sec('背景', esc(s.background))),
      seq(sec('理想 · 羈絆 · 缺陷', triad)),
      seq(sec('故事', chapters, 'story')),
      seq(sec('關係', rels)),
    ].join('');
  }

  function bars(ch) {
    const a = (ch.combat && ch.combat.abilities) || {};
    return `<div class="bars">${L.ABIL.map((k) => {
      const v = a[k] || 0;
      return `<div class="bar"><span>${L.ABIL_CN[k]}</span><span class="track"><i style="--p:${Math.round((v / 20) * 100)}%"></i></span>
        <span class="num">${v} <small>${R.fmtMod(R.mod(v))}</small></span></div>`;
    }).join('')}</div>`;
  }

  function paint() {
    const ch = list[idx];
    if (!ch) return close();
    const rank = hooks.rank(ch);
    const look = hooks.lookOf(ch);
    const c = ch.combat || {};
    const panel = $('.th-panel');
    const rk = `rk${rank}`;
    panel.style.setProperty('--ra', `var(--${rk}-a)`);
    panel.style.setProperty('--rb', `var(--${rk}-b)`);
    panel.style.setProperty('--rt', `var(--${rk}-t)`);
    panel.dataset.faction = ch.faction || 'none';
    panel.dataset.theme = hooks.theme || 'default';
    const dnd = hooks.theme === 'dnd';

    const full = C.src(ch, look, false);
    const thumb = C.src(ch, look, true);
    const looks = (ch.looks || ['base']);
    const lookStrip = looks.length > 1
      ? `<div class="th-looks">${looks.map((lk) => `<button type="button" data-look="${lk}" class="${lk === look ? 'on' : ''}" title="${esc(C.label.look(lk))}">
            <img src="${C.src(ch, lk, true)}" alt="" loading="lazy" /><span>${esc(C.label.look(lk))}</span></button>`).join('')}</div>`
      : '';

    $('.th-figure').innerHTML = `
      <span class="card-ph" style="--fa:var(--fx-${esc(ch.faction || 'none')}-a);--fb:var(--fx-${esc(ch.faction || 'none')}-b)">${esc((ch.name || '?').charAt(0))}</span>
      <img class="th-bg" src="${thumb}" alt="" aria-hidden="true" onload="this.classList.add('loaded')" onerror="this.remove()" />
      <img class="th-img" src="${full}" alt="${esc(ch.name)}" onload="this.classList.add('loaded')" onerror="this.remove()" />
      ${lookStrip}`;
    FX.dust($('.th-figure'), 18);
    FX.syncLoaded($('.th-figure'));

    let s = 0;
    const seq = (html) => html.replace('class="th-sec ', `style="--s:${s++}" class="th-sec `);
    const hint = ch.hint || {};
    const tags = [
      C.plaque(rank, rank === 4 ? 'holo' : ''),
      ch.kind !== 'npc' ? `<span class="chip gold">${esc(C.label.kind(ch.kind))}</span>` : '',
      `<span class="chip">${C.label.crest(ch.faction)} ${esc(C.label.faction(ch.faction))}</span>`,
      ch.race ? `<span class="chip">${esc(C.label.race(ch.race))}</span>` : '',
      ch.gender ? `<span class="chip">${esc(C.label.gender(ch.gender))}</span>` : '',
      ch.age != null ? `<span class="chip">${esc(ch.age)} 歲</span>` : '',
      ch.class ? `<span class="chip gold">${esc(ch.class)}${ch.level ? ` · Lv.${esc(ch.level)}` : ''}</span>` : '',
      ch.alignment ? `<span class="chip">${esc(ch.alignment)}</span>` : '',
      ch.role ? `<span class="chip teal">${esc(ch.role)}</span>` : '',
      C.label.art(ch, look) ? `<span class="chip art">🎨 ${esc(C.label.art(ch, look))}</span>` : '',
      !dnd && c.archetype ? `<span class="chip">${esc(C.label.arch(c.archetype))}</span>` : '',
    ].filter(Boolean).join('');

    $('.th-info').innerHTML = `
      ${hooks.seriesTitle ? `<div class="th-kicker">${esc(hooks.seriesTitle)}</div>` : ''}
      ${C.stars(rank)}
      <h2 class="th-name">${esc(ch.name)}</h2>
      <div class="th-full">${esc(ch.full_name || '')}</div>
      <div class="th-tags">${tags}</div>
      ${storyHtml(ch, seq)}
      ${seq(sec('性格', esc(ch.trait)))}
      ${seq(sec('外貌', esc(ch.appearance)))}
      ${seq(sec('細節', esc(ch.appearance_detail)))}
      ${seq(sec('常見於', hint.location ? `<b>${esc(hint.location)}</b>` : ''))}
      ${seq(sec('登場情境', esc(hint.hook)))}
      ${seq(sec('戰鬥', `
        <div class="th-combat">${C.radar(c.abilities, { size: 200, full: true })}${bars(ch)}</div>
        <div class="th-stats">
          <div class="stat"><span class="k">HP</span><span class="v">${esc(c.hp ?? '—')}</span></div>
          <div class="stat"><span class="k">AC</span><span class="v">${esc(c.ac ?? '—')}</span></div>
          <div class="stat"><span class="k">戰力</span><span class="v">${hooks.percent(ch)}<small style="font-size:10px;color:var(--text-3)">%</small></span></div>
        </div>
        ${c.attack ? `<div class="back-attack" style="margin-top:10px">🗡 ${C.attackLine(c.attack)}</div>` : ''}
        ${(c.skills || []).length ? `<div class="back-tags" style="margin-top:10px">${c.skills.map((k) => `<span class="chip">${esc(C.label.skill(k))}</span>`).join('')}
          ${(c.saves || []).map((k) => `<span class="chip gold">${esc(L.ABIL_CN[k] || k)}豁免</span>`).join('')}</div>` : ''}`))}
      ${seq(sec('立繪', `<a href="${full}" target="_blank" rel="noopener">在新分頁開啟原圖 ↗</a>`))}`;

    $('.th-nav.prev').disabled = idx <= 0;
    $('.th-nav.next').disabled = idx >= list.length - 1;
    $('.th-pos').textContent = `${idx + 1} / ${list.length}`;
    $('.th-info').scrollTop = 0;

    // 預抓前後一張的縮圖；連續翻閱時順手抓下一張原圖
    for (const i of [idx - 1, idx + 1]) if (list[i]) new Image().src = C.src(list[i], hooks.lookOf(list[i]), true);
    const ahead = list[idx + step];
    if (step && ahead) new Image().src = C.src(ahead, hooks.lookOf(ahead), false);
  }

  global.Theater = { init, open, close, move, isOpen: () => el && !el.hidden };
}(window));
