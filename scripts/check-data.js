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
  if (host) host.characters.push(...(s.characters || []));
  else merged.push({ ...s, characters: (s.characters || []).slice() });
});
const global = new Set(merged.flatMap((s) => s.characters.map((c) => c.id)));

let errors = 0;
const err = (m) => { errors += 1; console.log('  ✗ ' + m); };
const looks = new Set(LEX.LOOKS.map((l) => l.id));

merged.forEach((s) => {
  console.log(`${s.id}: ${s.characters.length} 位`);
  if (s.characters.length > 60) err(`超過 60 位上限`);
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
  });
});
console.log(errors ? `\n${errors} 個問題` : '\n全部通過');
process.exit(errors ? 1 : 0);
