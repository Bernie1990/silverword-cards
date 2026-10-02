/* 資料完整性檢查：node scripts/check-data.js
   依 index.html 的載入順序執行所有 data/series-*.js，檢查 id、立繪檔、關係鏈、詞彙表 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const scripts = [...html.matchAll(/<script src="([^"]+)"/g)].map((m) => m[1]).filter((s) => s.startsWith('data/') || s === 'js/lexicon.js');

const ctx = { window: {} };
vm.createContext(ctx);
scripts.forEach((s) => vm.runInContext(fs.readFileSync(path.join(ROOT, s), 'utf8'), ctx, { filename: s }));
const LEX = ctx.window.LEX;

const merged = [];
ctx.window.SERIES.forEach((s) => {
  const host = merged.find((x) => x.id === s.id);
  if (!host) { merged.push({ ...s, characters: (s.characters || []).slice() }); return; }
  (s.characters || []).forEach((c) => {
    const i = host.characters.findIndex((x) => x.id === c.id);
    if (i < 0) host.characters.push(c);
    else {
      // 覆蓋層：必須補的是已存在的角色，且只帶 id 以外的欄位
      host.characters[i] = { ...host.characters[i], ...c, story: { ...(host.characters[i].story || {}), ...(c.story || {}) } };
    }
  });
  if (s.saga) host.saga = s.saga;
  if (s.world) host.world = { ...(host.world || {}), ...s.world };
  if (s.factions) host.factions = { ...(host.factions || {}), ...s.factions };
});
const global = new Set(merged.flatMap((s) => s.characters.map((c) => c.id)));

let errors = 0;
const err = (m) => { errors += 1; console.log('  ✗ ' + m); };
const looks = new Set(LEX.LOOKS.map((l) => l.id));

merged.forEach((s) => {
  console.log(`${s.id}: ${s.characters.length} 位`);
  const nonPlayer = s.characters.filter((c) => c.kind !== 'player').length;
  if (nonPlayer > 60) err(`超過 60 位上限（主角不計）`);
  if (s.world && s.world.banner && !fs.existsSync(path.join(ROOT, s.world.banner))) err(`缺橫幅 ${s.world.banner}`);
  const ids = new Set();
  s.characters.forEach((c) => {
    if (ids.has(c.id)) err(`重複 id ${c.id}`);
    ids.add(c.id);
    (c.looks || ['base']).forEach((lk) => {
      if (!looks.has(lk)) err(`${c.id}: 未知套裝 ${lk}`);
      for (const f of [`${c.id}.webp`, `${c.id}.thumb.webp`]) {
        if (!fs.existsSync(path.join(ROOT, 'assets/portraits', lk, f))) err(`${c.id}: 缺 ${lk}/${f}`);
      }
    });
    if (c.race && !LEX.RACE[c.race]) err(`${c.id}: 未知種族 ${c.race}`);
    if (s.factions && c.faction && !s.factions[c.faction]) err(`${c.id}: 未知陣營 ${c.faction}`);
    const cb = c.combat || {};
    if (cb.archetype && !LEX.ARCH[cb.archetype]) err(`${c.id}: 未知架構 ${cb.archetype}`);
    (cb.skills || []).forEach((k) => { if (!LEX.SKILL[k]) err(`${c.id}: 未知技能 ${k}`); });
    if (cb.attack && cb.attack.damage_type && !LEX.DAMAGE[cb.attack.damage_type]) err(`${c.id}: 未知傷害 ${cb.attack.damage_type}`);
    ((c.story && c.story.relations) || []).forEach((r) => { if (!global.has(r.id)) err(`${c.id}: 關係指向不存在的 ${r.id}`); });
    const st = c.story;
    if (st) {
      ['quote', 'background', 'ideal', 'bond', 'flaw'].forEach((k) => { if (!st[k]) err(`${c.id}: 故事缺 ${k}`); });
      if (!Array.isArray(st.chapters) || st.chapters.length < 3) err(`${c.id}: 故事章節不足 3 章`);
      (st.chapters || []).forEach((ch, i) => { if (!ch.title || !ch.text) err(`${c.id}: 第 ${i + 1} 章缺標題或內文`); });
    }
  });
  const stories = s.characters.filter((c) => c.story && c.story.chapters).length;
  if (stories && stories < s.characters.length) err(`${s.characters.length - stories} 位角色沒有故事`);
  if (s.saga) {
    const acts = s.saga.acts || [];
    if (!acts.length) err('saga 沒有任何一幕');
    acts.forEach((a, i) => {
      if (!a.title || !a.text) err(`saga 第 ${i + 1} 幕缺標題或內文`);
      (a.cast || []).forEach((cid) => { if (!global.has(cid)) err(`saga 第 ${i + 1} 幕登場人物不存在：${cid}`); });
    });
    ['prev', 'next'].forEach((k) => { if (s.saga[k] && !merged.some((x) => x.id === s.saga[k])) err(`saga.${k} 指向不存在的系列 ${s.saga[k]}`); });
    const onStage = new Set(acts.flatMap((a) => a.cast || []));
    const missing = s.characters.filter((c) => !onStage.has(c.id)).map((c) => c.id);
    if (missing.length) console.log(`  · 未在故事線登場：${missing.join(', ')}`);
    console.log(`  · 故事線 ${acts.length} 幕，登場 ${s.characters.filter((c) => onStage.has(c.id)).length}/${s.characters.length} 位`);
  }
});
console.log(errors ? `\n${errors} 個問題` : '\n全部通過');
process.exit(errors ? 1 : 0);
