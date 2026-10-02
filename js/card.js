/* ═══════════════════════════════════════════════════════════════════
   card.js — 角色圖卡的 HTML 產生器（純函式，不碰 DOM 狀態）
   ───────────────────────────────────────────────────────────────────
   Card.html(ch, ctx)   完整卡片（正面＋背面）
   Card.radar(...)      六維雷達 SVG
   Card.art(...)        立繪堆疊（多套裝、佔位、箔、反光、粒子）
   ctx = { rank, percent, look, live }
   ═══════════════════════════════════════════════════════════════════ */
(function (global) {
  'use strict';

  const L = global.LEX;
  const R = global.Rank;

  const esc = (s) => String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  const ASSET = 'assets/portraits/';
  const src = (ch, look, thumb) => `${ASSET}${look}/${ch.id}${thumb ? '.thumb' : ''}.webp`;

  /* 目前系列的陣營表（可由 Card.setFactions 覆寫；找不到時退回 LEX.FACTION） */
  let FACTIONS = {};
  const factionOf = (id) => FACTIONS[id] || L.FACTION[id];
  const setFactions = (map) => { FACTIONS = map || {}; };

  const label = {
    faction: (id) => (factionOf(id) ? factionOf(id).label : id || '無陣營'),
    crest: (id) => (factionOf(id) ? factionOf(id).icon : '✦'),
    align: (s) => L.ALIGN_SHORT[s] || s || '',
    race: (id) => L.RACE[id] || id || '',
    arch: (id) => L.ARCH[id] || id || '',
    gender: (id) => L.GENDER[id] || id || '',
    skill: (id) => L.SKILL[id] || id,
    dmg: (id) => L.DAMAGE[id] || id || '',
    atkType: (id) => L.ATTACK_TYPE[id] || id || '',
    kind: (id) => L.KIND[id] || '',
    look: (id) => (L.LOOKS.find((l) => l.id === id) || {}).label || id,
    /* 畫風：非原裝套裝以套裝名為準；原裝取角色自訂 art，再退回陣營的 art */
    art: (ch, look) => (look && look !== 'base' ? label.look(look)
      : ch.art || (factionOf(ch.faction) || {}).art || ''),
  };

  /* ── 小片段 ─────────────────────────────────────────────── */
  function stars(rank) {
    let out = '';
    for (let i = 0; i < 5; i += 1) out += i <= rank ? '★' : '<span class="off">★</span>';
    return `<span class="stars" aria-label="${rank + 1} 星">${out}</span>`;
  }

  function plaque(rank, extra = '') {
    const r = L.RANKS[R.clamp(rank)];
    return `<span class="plaque ${extra}" title="${r.cn}階 · ${r.desc}">${r.tag}</span>`;
  }

  function sparks() { return '<span class="card-sparks">' + '<i></i>'.repeat(6) + '</span>'; }

  /**
   * 立繪堆疊。每套服裝各一層 <img>；目前套裝 .on 且有 src，其餘延遲載入（data-src）。
   * onload 加 .loaded 才淡入，避免閃白。portrait: false 的角色尚無立繪，只出佔位字。
   */
  function art(ch, look, opts = {}) {
    const initial = esc((ch.name || '?').charAt(0));
    const layers = ch.portrait === false ? '' : (ch.looks || ['base']).map((lk) => {
      const on = lk === look;
      const s = src(ch, lk, opts.thumb !== false);
      return `<img class="look${on ? ' on' : ''}" data-look="${lk}"${on ? ` src="${s}"` : ` data-src="${s}"`}
        alt="${esc(ch.name)}${lk === 'base' ? '' : '・' + esc(label.look(lk))}" loading="lazy" decoding="async"
        onload="this.classList.add('loaded')" onerror="this.remove()" />`;
    }).join('');
    return `<span class="card-ph">${initial}</span>${layers}
      <span class="card-scrim"></span><span class="card-foil"></span><span class="card-glare"></span>${sparks()}`;
  }

  /* ── 六維雷達 ───────────────────────────────────────────── */
  function radar(abilities, opts = {}) {
    const a = abilities || {};
    const size = opts.size || 200;
    const cx = size / 2;
    const cy = size / 2;
    const rad = size * 0.32;
    const off = size * 0.1; // 標籤離頂點的距離
    const max = 20;
    const n = L.ABIL.length;
    const pt = (i, r) => {
      const ang = (Math.PI * 2 * i) / n - Math.PI / 2;
      return [cx + Math.cos(ang) * r, cy + Math.sin(ang) * r];
    };
    const ring = (f) => L.ABIL.map((_, i) => pt(i, rad * f).map((v) => v.toFixed(1)).join(',')).join(' ');
    const shape = L.ABIL.map((k, i) => pt(i, rad * Math.max(0.08, Math.min(1, (a[k] || 0) / max))));
    const dots = shape.map(([x, y]) => `<circle class="dot" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2.4"/>`).join('');
    const axes = L.ABIL.map((_, i) => { const [x, y] = pt(i, rad); return `<line class="axis" x1="${cx}" y1="${cy}" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}"/>`; }).join('');
    const labels = L.ABIL.map((k, i) => {
      const [x, y] = pt(i, rad + off);
      return `<text class="lbl" x="${x.toFixed(1)}" y="${(y - 2).toFixed(1)}" text-anchor="middle">${opts.full ? L.ABIL_CN[k] : L.ABIL_SHORT[k]}</text>
        <text class="val" x="${x.toFixed(1)}" y="${(y + 9).toFixed(1)}" text-anchor="middle">${a[k] || 0}</text>`;
    }).join('');
    return `<svg class="radar" viewBox="0 0 ${size} ${size}" role="img" aria-label="六維屬性雷達">
      <polygon class="grid" points="${ring(1)}"/><polygon class="grid" points="${ring(0.66)}"/><polygon class="grid" points="${ring(0.33)}"/>
      ${axes}
      <polygon class="shape" points="${shape.map((p) => p.map((v) => v.toFixed(1)).join(',')).join(' ')}"/>
      ${dots}${labels}
    </svg>`;
  }

  /* ── 攻擊描述 ───────────────────────────────────────────── */
  function attackLine(atk) {
    if (!atk) return '';
    const type = label.atkType(atk.type);
    const dmg = `${esc(atk.damage || '')} ${esc(label.dmg(atk.damage_type))}`.trim();
    return `<b>${esc(atk.name)}</b>${type ? `（${type}）` : ''} · ${dmg}${atk.is_heal ? ' · <span class="heal">治療</span>' : ''}`;
  }

  function statBoxes(ch) {
    const c = ch.combat || {};
    const a = c.abilities || {};
    const dex = R.fmtMod(R.mod(a.dex));
    return `<div class="back-stats">
      <div class="stat"><span class="k">HP</span><span class="v">${esc(c.hp ?? '—')}</span></div>
      <div class="stat"><span class="k">AC</span><span class="v">${esc(c.ac ?? '—')}</span></div>
      <div class="stat"><span class="k">先攻</span><span class="v">${dex}</span></div>
    </div>`;
  }

  /* ── 整張卡 ─────────────────────────────────────────────── */
  function html(ch, ctx) {
    const rank = R.clamp(ctx.rank);
    const look = ctx.look || 'base';
    const c = ch.combat || {};
    const atk = c.attack;
    const theme = ctx.theme || 'default';
    const dnd = theme === 'dnd';
    // D&D 系列：職業 · 等級 · 陣營縱軸；其他系列：種族 · 職務
    const roleLine = dnd
      ? [label.race(ch.race), ch.class, ch.alignment ? label.align(ch.alignment) : ''].filter(Boolean).map(esc).join(' · ')
      : [label.race(ch.race), ch.role].filter(Boolean).map(esc).join(' · ');
    const hasLooks = (ch.looks || []).length > 1;
    const kindChip = ch.kind === 'player'
      ? '<span class="chip gold">主角</span>'
      : ch.kind === 'team' ? '<span class="chip teal">核心</span>'
        : dnd && ch.level ? `<span class="chip lvl" title="角色等級">Lv.${esc(ch.level)}</span>` : '';
    const skills = (c.skills || []).slice(0, 4).map((s) => `<span class="chip">${esc(label.skill(s))}</span>`).join('');
    const peek = (dnd && ch.story && ch.story.quote) ? ch.story.quote : (ch.trait || ch.appearance || '');
    const backSub = dnd ? [ch.class, ch.level ? `Lv.${ch.level}` : ''].filter(Boolean).join(' ') : label.arch(c.archetype);

    return `<article class="card${ctx.live ? ' live' : ''}" data-id="${esc(ch.id)}" data-rank="${rank}" data-theme="${esc(theme)}"
        data-faction="${esc(ch.faction || 'none')}" data-look="${esc(look)}" data-kind="${esc(ch.kind)}"
        tabindex="0" role="button" aria-label="${esc(ch.name)} 角色卡"
        style="--power:${Math.max(4, ctx.percent || 0)}%">
      <span class="card-aura"></span>
      <div class="card-3d">
        <div class="card-flip">
          <div class="card-face card-front">
            <div class="card-art">${art(ch, look)}</div>
            <div class="card-frame"></div>
            <div class="card-head">
              ${plaque(rank)}${kindChip}
              <span class="crest" title="${esc(label.faction(ch.faction))}">${label.crest(ch.faction)}</span>
            </div>
            <div class="card-meta">
              ${stars(rank)}
              <h3 class="name">${esc(ch.name)}</h3>
              <p class="role">${roleLine}</p>
              <span class="power"><i></i></span>
            </div>
            <div class="card-peek">
              <p class="peek-trait">${esc(peek)}</p>
              <div class="peek-stats">
                <span><b>HP</b>${esc(c.hp ?? '—')}</span>
                <span><b>AC</b>${esc(c.ac ?? '—')}</span>
                ${atk ? `<span><b>ATK</b>${esc(atk.damage || '')}</span>` : ''}
              </div>
            </div>
            <div class="card-tools">
              ${hasLooks ? `<button class="tool tool-look" type="button" title="切換立繪（${esc(label.look(look))}）" aria-label="切換立繪">👗</button>` : ''}
              <button class="tool tool-flip" type="button" title="翻到背面看數值" aria-label="翻面">↻</button>
            </div>
          </div>
          <div class="card-face card-back" aria-hidden="true">
            <div class="card-frame"></div>
            <div class="back-head">${plaque(rank)}<h3 class="name">${esc(ch.name)}</h3><span class="sub">${esc(backSub)}</span></div>
            ${radar(c.abilities)}
            ${statBoxes(ch)}
            ${atk ? `<div class="back-attack">🗡 ${attackLine(atk)}</div>` : ''}
            ${skills ? `<div class="back-tags">${skills}</div>` : ''}
            <button class="tool tool-flip" type="button" title="翻回正面" aria-label="翻回正面">↩</button>
          </div>
        </div>
      </div>
    </article>`;
  }

  global.Card = { html, art, radar, stars, plaque, attackLine, statBoxes, src, label, esc, setFactions };
}(window));
