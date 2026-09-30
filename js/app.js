/* ═══════════════════════════════════════════════════════════════════
   app.js — 頁面組裝：系列切換、資料載入、狀態、篩選排序、聚光燈、事件委派
   ───────────────────────────────────────────────────────────────────
   資料來源：data/series-*.js 各自 push 一個系列到 window.SERIES
   series = { id, title, subtitle, theme, world, factions, generated, characters[] }
   ═══════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  const L = window.LEX;
  const R = window.Rank;
  const C = window.Card;
  const FX = window.FX;
  const esc = C.esc;
  const $ = (id) => document.getElementById(id);

  const SERIES = (window.SERIES || []).filter((s) => s && Array.isArray(s.characters) && s.characters.length);

  /* ── 狀態（持久化到 localStorage） ─────────────────────── */
  const KEY = 'character-cards:ui';
  const DEFAULT = {
    series: '', q: '', faction: '', rank: '', kind: 'all', sort: 'default', size: 'm',
    lookAll: 'base', looks: {}, featured: {},
  };
  const ui = load();

  function load() {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) || '{}');
      if (typeof saved.featured === 'string') saved.featured = {}; // 舊版格式
      return { ...DEFAULT, ...saved };
    } catch { return { ...DEFAULT }; }
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(ui)); } catch { /* 私密模式 */ } }

  let series = null;      // 目前系列
  let ALL = [];
  let ranker = R.build([]);
  const byId = new Map();
  const theme = () => (series && series.theme) || 'default';
  const isDnd = () => theme() === 'dnd';

  /* ── 套裝 ─────────────────────────────────────────────── */
  const lookOf = (ch) => {
    const want = Object.prototype.hasOwnProperty.call(ui.looks, ch.id) ? ui.looks[ch.id] : ui.lookAll;
    return (ch.looks || ['base']).includes(want) ? want : 'base';
  };
  const nextLook = (ch) => {
    const seq = ch.looks || ['base'];
    return seq[(seq.indexOf(lookOf(ch)) + 1) % seq.length];
  };
  function setLook(ch, look) {
    ui.looks[ch.id] = look;
    save();
    document.querySelectorAll(`.card[data-id="${ch.id}"]`).forEach((card) => applyLook(card, look));
  }
  function applyLook(card, look) {
    card.dataset.look = look;
    card.querySelectorAll('.card-art .look').forEach((img) => {
      const on = img.dataset.look === look;
      img.classList.toggle('on', on);
      if (on && !img.getAttribute('src') && img.dataset.src) img.src = img.dataset.src;
    });
    const btn = card.querySelector('.tool-look');
    if (btn) btn.title = `切換立繪（${C.label.look(look)}）`;
  }

  /* ── 篩選排序 ─────────────────────────────────────────── */
  function haystack(ch) {
    const s = ch.story || {};
    return [
      ch.name, ch.full_name, ch.role, ch.trait, ch.appearance, ch.appearance_detail, ch.class, ch.alignment,
      C.label.race(ch.race), C.label.faction(ch.faction), C.label.arch(ch.combat && ch.combat.archetype),
      ch.hint && ch.hint.location, ch.hint && ch.hint.hook, L.RANKS[ranker.rank(ch)].tag,
      s.quote, s.background, s.ideal, s.bond, s.flaw,
      ...(s.chapters || []).map((c) => `${c.title} ${c.text}`),
    ].filter(Boolean).join(' ').toLowerCase();
  }

  function filtered() {
    const q = ui.q.trim().toLowerCase();
    const list = ALL.filter((ch) => {
      if (ui.faction && ch.faction !== ui.faction) return false;
      if (ui.rank !== '' && String(ranker.rank(ch)) !== String(ui.rank)) return false;
      if (ui.kind === 'party' && ch.kind === 'npc') return false;
      if (ui.kind === 'npc' && ch.kind !== 'npc') return false;
      return !q || haystack(ch).includes(q);
    });
    const byName = (a, b) => String(a.name).localeCompare(String(b.name), 'zh-Hant');
    if (ui.sort === 'name') list.sort(byName);
    else if (ui.sort === 'power') list.sort((a, b) => R.power(b) - R.power(a) || byName(a, b));
    else if (ui.sort === 'rank') list.sort((a, b) => ranker.rank(b) - ranker.rank(a) || R.power(b) - R.power(a));
    else if (ui.sort === 'age') list.sort((a, b) => (a.age || 0) - (b.age || 0) || byName(a, b));
    else if (ui.sort === 'level') list.sort((a, b) => (b.level || 0) - (a.level || 0) || R.power(b) - R.power(a));
    return list;
  }

  let current = [];

  /* ── 渲染 ─────────────────────────────────────────────── */
  const cardHtml = (ch, live) => C.html(ch, {
    rank: ranker.rank(ch), percent: ranker.percent(ch), look: lookOf(ch), live, theme: theme(),
  });

  function renderSeriesTabs() {
    const host = $('seriesTabs');
    if (!host) return;
    if (SERIES.length < 2) { host.hidden = true; return; }
    host.hidden = false;
    host.innerHTML = SERIES.map((s) => `
      <button class="stab${s.id === series.id ? ' on' : ''}" data-series="${esc(s.id)}" data-theme="${esc(s.theme || 'default')}" type="button"
        ${s.palette ? `style="--acc:${esc(s.palette.a)};--acc2:${esc(s.palette.c)}"` : ''}>
        <span class="stab-title">${esc(s.title)}</span>
        <span class="stab-sub">${esc(s.subtitle || '')}</span>
        <span class="stab-n">${s.characters.length} 位</span>
      </button>`).join('');
    const w = series.world || {};
    const world = $('world');
    world.innerHTML = w.blurb
      ? `<div class="w-body"><span class="w-name">${esc(w.name || series.title)}</span>${w.arc ? `<span class="chip gold">章節 · ${esc(w.arc)}</span>` : ''}<p>${esc(w.blurb)}</p></div>`
      : '';
    world.hidden = !w.blurb;
    world.classList.toggle('has-banner', Boolean(w.banner));
    // url() 放進自訂屬性時，Chrome 會相對於使用它的樣式表（css/）解析，故先轉成絕對網址
    world.style.setProperty('--banner', w.banner ? `url("${new URL(w.banner, document.baseURI).href}")` : 'none');
  }

  /* 系列調色：D&D 卡皮的青銅三色可由 series.palette 覆寫（月銀、薔薇…） */
  const PALETTE_DEFAULT = { a: '#c9954a', b: '#f0d39a', c: '#4fa58f' };
  function applyPalette(p) {
    const root = document.documentElement.style;
    const pal = { ...PALETTE_DEFAULT, ...(p || {}) };
    root.setProperty('--bronze', pal.a);
    root.setProperty('--bronze-2', pal.b);
    root.setProperty('--verdigris', pal.c);
  }

  function renderDeck() {
    current = filtered();
    const deck = $('deck');
    deck.dataset.size = ui.size;
    deck.dataset.theme = theme();
    deck.innerHTML = current.length
      ? current.map((ch) => cardHtml(ch, false)).join('')
      : '<div class="empty" style="grid-column:1/-1">找不到符合條件的角色，試試清除篩選。</div>';
    FX.stagger(deck);
    FX.syncLoaded(deck);
    $('count').textContent = `${current.length} / ${ALL.length} 位`;
    $('sectionSub').textContent = describeFilter();
  }

  function describeFilter() {
    const parts = [];
    if (ui.kind === 'party') parts.push('主角與核心隊員');
    if (ui.kind === 'npc') parts.push('常駐角色');
    if (ui.faction) parts.push(C.label.faction(ui.faction));
    if (ui.rank !== '') parts.push(L.RANKS[ui.rank].tag + ' 階');
    if (ui.q.trim()) parts.push(`「${ui.q.trim()}」`);
    return parts.length ? parts.join(' · ') : '點卡片進入立繪劇場；↻ 翻面看六維，👗 換立繪';
  }

  function featuredOf() {
    const id = ui.featured[series.id];
    return byId.get(id) || ALL.find((c) => c.kind === 'player') || ALL[0];
  }

  function renderSpotlight() {
    const ch = featuredOf();
    if (!ch) return;
    const rank = ranker.rank(ch);
    const host = $('spotlight');
    host.dataset.theme = theme();
    host.style.setProperty('--sp-a', `var(--rk${rank}-a)`);
    host.style.setProperty('--sp-t', `var(--rk${rank}-t)`);
    const c = ch.combat || {};
    const hint = ch.hint || {};
    const s = ch.story || {};
    const dnd = isDnd();
    const desc = dnd && s.background ? s.background : (ch.appearance_detail || ch.appearance || '');
    const quote = dnd && s.quote
      ? `<blockquote class="sp-quote sp-say">${esc(s.quote)}<small>— ${esc(ch.name)}${hint.location ? ` · 📍 ${esc(hint.location)}` : ''}</small></blockquote>`
      : hint.hook ? `<blockquote class="sp-quote">${esc(hint.hook)}${hint.location ? `<small>📍 ${esc(hint.location)}</small>` : ''}</blockquote>` : '';
    host.innerHTML = `
      ${cardHtml(ch, true)}
      <div class="sp-body">
        <div class="sp-kicker">${esc(series.title)} · ${esc(C.label.kind(ch.kind))} · ${L.RANKS[rank].tag} ${L.RANKS[rank].cn}階</div>
        <h1 class="sp-name">${esc(ch.name)}</h1>
        <div class="sp-full">${esc(ch.full_name || '')}</div>
        <div class="sp-tags">
          <span class="chip">${C.label.crest(ch.faction)} ${esc(C.label.faction(ch.faction))}</span>
          ${ch.race ? `<span class="chip">${esc(C.label.race(ch.race))}</span>` : ''}
          ${ch.class ? `<span class="chip gold">${esc(ch.class)}${ch.level ? ` · Lv.${esc(ch.level)}` : ''}</span>` : ''}
          ${ch.alignment ? `<span class="chip">${esc(ch.alignment)}</span>` : ''}
          ${ch.role ? `<span class="chip teal">${esc(ch.role)}</span>` : ''}
          ${!dnd && c.archetype ? `<span class="chip">${esc(C.label.arch(c.archetype))}</span>` : ''}
          ${ch.age != null ? `<span class="chip">${esc(ch.age)} 歲</span>` : ''}
        </div>
        <p class="sp-desc">${esc(desc)}</p>
        ${quote}
        <div class="sp-actions">
          <button class="btn primary" id="spOpen">✦ 進入立繪劇場${s.chapters ? '・讀故事' : ''}</button>
          <button class="btn" id="spRandom">🎲 隨機聚焦</button>
          <button class="btn" id="spFlip">↻ 看六維</button>
        </div>
      </div>`;
    FX.syncLoaded(host);
    $('spOpen').onclick = () => Theater.open([ch], 0);
    $('spRandom').onclick = () => {
      const pool = ALL.filter((x) => x.id !== ch.id);
      ui.featured[series.id] = pool[Math.floor(Math.random() * pool.length)].id;
      save();
      renderSpotlight();
    };
    $('spFlip').onclick = () => host.querySelector('.card').classList.toggle('flipped');
  }

  function renderLegend() {
    const counts = [0, 0, 0, 0, 0];
    ALL.forEach((ch) => { counts[ranker.rank(ch)] += 1; });
    $('legend').innerHTML = L.RANKS.map((r, i) =>
      `<button class="lg${String(ui.rank) === String(i) ? ' on' : ''}" data-rank="${i}" title="${r.desc}">
        ${C.plaque(i)}<span>${r.cn}階</span><span class="n">×${counts[i]}</span></button>`).join('');
  }

  function renderToolbar() {
    const opt = (items, cur, any) => `<option value="">${any}</option>` +
      items.map(([v, l]) => `<option value="${esc(v)}"${String(cur) === String(v) ? ' selected' : ''}>${esc(l)}</option>`).join('');
    const factions = [...new Set(ALL.map((c) => c.faction).filter(Boolean))].map((f) => [f, `${C.label.crest(f)} ${C.label.faction(f)}`]);
    $('fFaction').innerHTML = opt(factions, ui.faction, '全部陣營');
    $('fRank').innerHTML = opt(L.RANKS.map((r, i) => [i, `${r.tag} · ${r.cn}階`]).reverse(), ui.rank, '全部階級');
    const lvlOpt = $('fSort').querySelector('option[value="level"]');
    if (lvlOpt) lvlOpt.hidden = !isDnd();
    if (ui.sort === 'level' && !isDnd()) ui.sort = 'default';
    $('fSort').value = ui.sort;
    $('fQ').value = ui.q;
    syncSeg('segKind', ui.kind);
    syncSeg('segSize', ui.size);
    // 沒有多套裝的系列，隱藏「全部換裝」
    const multi = ALL.some((c) => (c.looks || []).length > 1);
    $('lookAll').hidden = !multi;
    $('segKind').hidden = !ALL.some((c) => c.kind !== 'npc');
    const nxt = L.LOOKS[(L.LOOKS.findIndex((l) => l.id === ui.lookAll) + 1) % L.LOOKS.length];
    $('lookAll').textContent = `👗 全部${nxt.label}`;
    $('lookAll').title = `目前：${C.label.look(ui.lookAll)}；點擊切換為 ${nxt.label}（沒有該套裝的角色維持原裝）`;
  }

  function syncSeg(id, val) {
    $(id).querySelectorAll('button').forEach((b) => b.classList.toggle('on', b.dataset.v === val));
  }

  function renderAll() {
    document.body.dataset.theme = theme();
    renderSeriesTabs();
    renderToolbar();
    renderLegend();
    renderSpotlight();
    renderDeck();
    $('statCount').textContent = ALL.length;
    $('statLooks').textContent = ALL.reduce((t, c) => t + (c.looks || []).length, 0);
    $('statStories').textContent = ALL.filter((c) => c.story && c.story.chapters).length;
    if (series.generated) $('generated').textContent = series.generated;
  }

  /* ── 系列切換 ─────────────────────────────────────────── */
  function activate(id, keepFilters) {
    series = SERIES.find((s) => s.id === id) || SERIES[0];
    ui.series = series.id;
    if (!keepFilters) Object.assign(ui, { q: '', faction: '', rank: '', kind: 'all' });
    save();
    ALL = series.characters.slice();
    byId.clear();
    ALL.forEach((c) => byId.set(c.id, c));
    C.setFactions(series.factions || {});
    applyPalette(series.palette);
    ranker = R.build(ALL.filter((c) => c.kind !== 'player'));
    Theater.init({
      rank: (ch) => ranker.rank(ch),
      percent: (ch) => ranker.percent(ch),
      lookOf, setLook,
      byId: (cid) => byId.get(cid),
      theme: theme(),
      seriesTitle: series.title,
    });
    renderAll();
  }

  /* ── 事件 ─────────────────────────────────────────────── */
  function apply(patch) {
    Object.assign(ui, patch);
    save();
    renderDeck();
    renderLegend();
  }

  function bind() {
    let typing = 0;
    $('fQ').oninput = (e) => { clearTimeout(typing); typing = setTimeout(() => apply({ q: e.target.value }), 140); };
    $('fFaction').onchange = (e) => apply({ faction: e.target.value });
    $('fRank').onchange = (e) => apply({ rank: e.target.value });
    $('fSort').onchange = (e) => apply({ sort: e.target.value });
    $('segKind').onclick = (e) => { const b = e.target.closest('button'); if (b) { apply({ kind: b.dataset.v }); syncSeg('segKind', ui.kind); } };
    $('segSize').onclick = (e) => { const b = e.target.closest('button'); if (b) { apply({ size: b.dataset.v }); syncSeg('segSize', ui.size); } };
    $('legend').onclick = (e) => {
      const b = e.target.closest('.lg');
      if (!b) return;
      apply({ rank: String(ui.rank) === b.dataset.rank ? '' : b.dataset.rank });
      $('fRank').value = ui.rank;
    };
    $('reset').onclick = () => {
      Object.assign(ui, { q: '', faction: '', rank: '', kind: 'all', sort: 'default' });
      save();
      renderToolbar();
      renderLegend();
      renderDeck();
    };
    $('lookAll').onclick = () => {
      const i = L.LOOKS.findIndex((l) => l.id === ui.lookAll);
      ui.lookAll = L.LOOKS[(i + 1) % L.LOOKS.length].id;
      ui.looks = {}; // 全部切換＝回到一致狀態，清掉個別覆寫
      save();
      renderToolbar();
      document.querySelectorAll('.card').forEach((card) => {
        const ch = byId.get(card.dataset.id);
        if (ch) applyLook(card, lookOf(ch));
      });
    };
    const tabs = $('seriesTabs');
    if (tabs) {
      tabs.onclick = (e) => {
        const b = e.target.closest('.stab');
        if (!b || b.dataset.series === series.id) return;
        activate(b.dataset.series);
        window.scrollTo({ top: 0, behavior: FX.reduced ? 'auto' : 'smooth' });
      };
    }

    // 卡片互動：委派到整個 main，聚光燈與卡池共用
    const main = $('main');
    main.addEventListener('click', (e) => {
      const card = e.target.closest('.card');
      if (!card) return;
      const ch = byId.get(card.dataset.id);
      if (!ch) return;
      if (e.target.closest('.tool-flip')) { card.classList.toggle('flipped'); return; }
      if (e.target.closest('.tool-look')) { setLook(ch, nextLook(ch)); return; }
      if (card.classList.contains('flipped')) { card.classList.remove('flipped'); return; }
      openTheater(ch, card);
    });

    main.addEventListener('keydown', (e) => {
      const card = e.target.closest('.card');
      if (!card || e.target !== card) return;
      const ch = byId.get(card.dataset.id);
      if (!ch) return;
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openTheater(ch, card); }
      else if (e.key.toLowerCase() === 'f') { e.preventDefault(); card.classList.toggle('flipped'); }
      else if (e.key.toLowerCase() === 'l' && (ch.looks || []).length > 1) { e.preventDefault(); setLook(ch, nextLook(ch)); }
    });

    FX.tilt(main);
    FX.glow($('spotlight'));
  }

  function openTheater(ch, card) {
    // 聚光燈卡片單獨檢視；卡池則以目前篩選結果為翻閱範圍
    const inDeck = card.closest('#deck');
    const list = inDeck ? current : [ch];
    Theater.open(list, Math.max(0, list.findIndex((x) => x.id === ch.id)));
  }

  /* ── 啟動 ─────────────────────────────────────────────── */
  if (!SERIES.length) {
    $('deck').innerHTML = '<div class="empty" style="grid-column:1/-1">⚠ 找不到任何系列資料。<br><small>請確認 <code>data/series-*.js</code> 已在 index.html 載入。</small></div>';
    return;
  }
  bind();
  activate(ui.series, true);
}());
