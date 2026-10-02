// merge scriptoakvale-roll-* 合併成單一 roster 系列。


'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const files = [...html.matchAll(/src="(data\/[^"]+)"/g)].map((m) => m[1])
  .filter((f) => fs.existsSync(path.join(ROOT, f)));

const ctx = { window: { SERIES: [] } };
vm.createContext(ctx);
for (const f of files) vm.runInContext(fs.readFileSync(path.join(ROOT, f), 'utf8'), ctx);

const silver = ctx.window.SERIES.filter((s) => s.id && s.id.startsWith('silver-roll-'));
const oakvale = ctx.window.SERIES.filter((s) => s.id && s.id.startsWith('oakvale-roll-'));

function merge(rolls, id, title, subtitle) {
  if (!rolls.length) return null;
  const chars = [];
  const seen = new Set();
  for (const r of rolls) {
    for (const c of r.characters || []) {
      if (seen.has(c.id)) continue;
      seen.add(c.id);
      chars.push(c);
    }
  }
  const factions = Object.assign({}, ...(rolls.map((r) => r.factions || {})));
  const world = Object.assign({}, ...(rolls.map((r) => r.world || {})));
  return {
    id: id,
    title: title,
    subtitle: subtitle || rolls.map((r) => r.subtitle).filter(Boolean).join(' · '),
    theme: rolls[0].theme,
    palette: rolls[0].palette,
    world: world,
    factions: factions,
    generated: new Date().toISOString().slice(0, 10),
    characters: chars,
  };
}

const silverMerged = merge(silver, 'silver-roster', '銀語名冊', '霍格華茲城堡崗位（70 人）');
const oakMerged = merge(oakvale, 'oakvale-roster', '橡木鎮名冊', '橡木鎮與鎮外崗位（257 人）');

function writeSeries(obj) {
  const file = path.join(ROOT, 'data', 'series-' + obj.id + '.js');
  fs.writeFileSync(file,
    '/* 由 scripts/merge-rosters.js 產生：合併同故事的角色，不再分冊。 */\n'
    + 'window.SERIES = window.SERIES || [];\nwindow.SERIES.push('
    + JSON.stringify(obj) + ');\n');
  console.log('written', obj.id, obj.characters.length);
}

if (silverMerged) writeSeries(silverMerged);
if (oakMerged) writeSeries(oakMerged);

// 清理舊的 roll 檔案
for (const f of fs.readdirSync(path.join(ROOT, 'data'))) {
  if (/^series-(silver|oakvale)-roll-\d+\.js$/.test(f)) {
    fs.unlinkSync(path.join(ROOT, 'data', f));
    console.log('removed', f);
  }
}

// 更新 index.html
let idx = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
idx = idx.replace(/\r?\n<script src="data\/series-(?:silver|oakvale)-roll-\d+\.js"><\/script>/g, '');
if (silverMerged) {
  idx = idx.replace(
    '<script src="data/series-silver.js"></script>',
    '<script src="data/series-silver.js"></script>\n<script src="data/series-silver-roster.js"></script>'
  );
}
if (oakMerged) {
  idx = idx.replace(
    '<script src="data/series-oakvale-player.js"></script>',
    '<script src="data/series-oakvale-player.js"></script>\n<script src="data/series-oakvale-roster.js"></script>'
  );
}
fs.writeFileSync(path.join(ROOT, 'index.html'), idx);
console.log('index.html updated');
