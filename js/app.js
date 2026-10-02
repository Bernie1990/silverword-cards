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

  /* 同 id 的多個 push 合併為一個系列：第一個提供設定，後續追加角色（方便把大系列拆檔）。
     追加的角色若 id 已存在，則視為「覆蓋層」：只合併它帶來的欄位（例如替匯入的角色補 story）。
     也可帶 world（合併）與 saga（系列主線：{ prev, next, acts[] }）；
     多個檔案都帶 saga 時，acts 依載入順序接在後面（同一個故事分季寫在不同檔）。 */
  const SERIES = [];
  (window.SERIES || []).forEach((s) => {
    if (!s || !s.id) return;
    const host = SERIES.find((x) => x.id === s.id);
    if (!host) { SERIES.push({ ...s, characters: (s.characters || []).slice() }); return; }
    (s.characters || []).forEach((c) => {
      const i = host.characters.findIndex((x) => x.id === c.id);
      if (i < 0) host.characters.push(c);
      else host.characters[i] = { ...host.characters[i], ...c, story: { ...(host.characters[i].story || {}), ...(c.story || {}) } };
    });
    if (s.factions) host.factions = { ...(host.factions || {}), ...s.factions }; // 分檔也可補陣營
    if (s.world) host.world = { ...(host.world || {}), ...s.world };
    if (s.saga) {
      host.saga = host.saga
        ? { ...host.saga, ...s.saga, acts: [...(host.saga.acts || []), ...(s.saga.acts || [])] }
        : s.saga;
    }
    if (s.lead) host.lead = s.lead;
  });
  /* 有指名主角的系列：主角卡固定在最前，其餘依故事線首次登場的幕次排列（同幕保持原順序）。 */
  SERIES.forEach((series) => {
    if (!series.lead) return;
    const first = new Map();
    (series.saga && series.saga.acts || []).forEach((act, i) => {
      (act.cast || []).forEach((id) => { if (!first.has(id)) first.set(id, i); });
    });
    const indexed = series.characters.map((c, i) => ({ c, i }));
    indexed.sort((a, b) => {
      const rank = (x) => (x.c.id === series.lead ? -1 : (first.has(x.c.id) ? first.get(x.c.id) : 1000));
      return rank(a) - rank(b) || a.i - b.i;
    });
    series.characters = indexed.map((x) => x.c);
  });
  for (let i = SERIES.length - 1; i >= 0; i -= 1) if (!SERIES[i].characters.length) SERIES.splice(i, 1);

  /* 跨系列查詢：關係鏈可指向其他系列的角色（先找目前系列，再找全域） */
  const GLOBAL = new Map();
  SERIES.forEach((s) => s.characters.forEach((c) => { if (!GLOBAL.has(c.id)) GLOBAL.set(c.id, c); }));
  const ALL_FACTIONS = Object.assign({}, ...SERIES.map((s) => s.factions || {}));

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

  /* ── 系列主線（故事線）：series.saga = { prev, next, acts: [{ when, title, text, cast[] }] } ── */
  const sagaOpen = {}; // 每個系列的展開狀態（不持久化）
  const seriesTitle = (id) => { const s = SERIES.find((x) => x.id === id); return s ? s.title : id; };

  function castChip(cid) {
    const t = byId.get(cid) || GLOBAL.get(cid);
    if (!t) return '';
    const foreign = !byId.has(cid);
    return `<button type="button" class="cast${foreign ? ' foreign' : ''}" data-id="${esc(cid)}" title="${esc(t.full_name || t.name)}${foreign ? '（其他系列）' : ''}">
      <span class="cast-ph" style="--fa:var(--fx-${esc(t.faction || 'none')}-a);--fb:var(--fx-${esc(t.faction || 'none')}-b)">${t.portrait === false ? '' : `<img src="${C.src(t, 'base', true)}" alt="" loading="lazy" onerror="this.remove()" />`}${esc(t.name.charAt(0))}</span>
      <span>${esc(t.name)}</span></button>`;
  }

  function renderSaga() {
    const host = $('saga');
    if (!host) return;
    const g = series.saga;
    const acts = (g && g.acts) || [];
    if (!acts.length) { host.hidden = true; host.innerHTML = ''; return; }
    host.hidden = false;
    const open = Boolean(sagaOpen[series.id]);
    const w = series.world || {};
    const link = (id, label) => (id && SERIES.some((s) => s.id === id)
      ? `<button type="button" class="saga-link" data-series="${esc(id)}">${label} · ${esc(seriesTitle(id))} →</button>` : '');
    host.innerHTML = `
      <div class="saga-head">
        <div class="saga-title"><span class="saga-k">故事線</span><b>${esc(w.arc || series.title)}</b><span class="chip">${acts.length} 幕</span></div>
        <div class="saga-nav">${link(g.prev, '前傳')}${link(g.next, '續篇')}
          <button type="button" class="btn saga-toggle" aria-expanded="${open}">${open ? '收合' : '展開全部'}</button></div>
      </div>
      <ol class="acts${open ? '' : ' folded'}">${acts.map((a, i) => `
        <li class="act" style="--i:${i}">
          <div class="act-no">${String(i + 1).padStart(2, '0')}</div>
          <div class="act-body">
            <div class="act-meta">${a.when ? `<span class="act-when">${esc(a.when)}</span>` : ''}<h3>${esc(a.title)}</h3></div>
            <p>${esc(a.text)}</p>
            ${(a.cast || []).length ? `<div class="act-cast">${a.cast.map(castChip).join('')}</div>` : ''}
          </div>
        </li>`).join('')}</ol>
      ${open ? '' : `<button type="button" class="saga-more">閱讀全部 ${acts.length} 幕 ↓</button>`}`;
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
    const nxt = nextLookAll();
    $('lookAll').textContent = `👗 全部${nxt.label}`;
    $('lookAll').title = `目前：${C.label.look(ui.lookAll)}；點擊切換為 ${nxt.label}（沒有該套裝的角色維持原裝）`;
  }

  /* 「全部換裝」只在目前系列實際有的套裝間循環 */
  function seriesLooks() {
    const have = new Set(ALL.flatMap((c) => c.looks || ['base']));
    return L.LOOKS.filter((l) => have.has(l.id));
  }
  function nextLookAll() {
    const seq = seriesLooks();
    return seq[(seq.findIndex((l) => l.id === ui.lookAll) + 1) % seq.length] || L.LOOKS[0];
  }

  function syncSeg(id, val) {
    $(id).querySelectorAll('button').forEach((b) => b.classList.toggle('on', b.dataset.v === val));
  }

  function renderAll() {
    document.body.dataset.theme = theme();
    renderSeriesTabs();
    renderSaga();
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
    C.setFactions({ ...ALL_FACTIONS, ...(series.factions || {}) });
    applyPalette(series.palette);
    ranker = R.build(ALL.filter((c) => c.kind !== 'player'));
    Theater.init({
      rank: (ch) => ranker.rank(ch),
      percent: (ch) => ranker.percent(ch),
      lookOf, setLook,
      byId: (cid) => byId.get(cid) || GLOBAL.get(cid),
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
      ui.lookAll = nextLookAll().id;
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

    const saga = $('saga');
    if (saga) {
      saga.onclick = (e) => {
        const lk = e.target.closest('.saga-link');
        if (lk) { activate(lk.dataset.series); window.scrollTo({ top: 0, behavior: FX.reduced ? 'auto' : 'smooth' }); return; }
        if (e.target.closest('.saga-toggle, .saga-more')) {
          sagaOpen[series.id] = !sagaOpen[series.id];
          const top = saga.getBoundingClientRect().top + window.scrollY - 12;
          renderSaga();
          if (!sagaOpen[series.id]) window.scrollTo({ top, behavior: 'auto' });
          return;
        }
        const cast = e.target.closest('.cast[data-id]');
        if (cast) {
          // 以該幕的登場人物為翻閱範圍（可跨系列）
          const ids = [...cast.closest('.act-cast').querySelectorAll('.cast[data-id]')].map((b) => b.dataset.id);
          const list = ids.map((cid) => byId.get(cid) || GLOBAL.get(cid)).filter(Boolean);
          Theater.open(list, Math.max(0, list.findIndex((x) => x.id === cast.dataset.id)));
        }
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
  const linked = new URLSearchParams(location.search).get('series');
  activate(linked && SERIES.some((s) => s.id === linked) ? linked : ui.series, !linked);
}());
