/**
 * 從 dnd_service 的 game-server 匯出角色資料 → data/characters.json + data/characters.js
 * 並產生 scripts/.portrait-jobs.json 供 convert-portraits.py 轉圖。
 *
 *   node scripts/import-from-game-server.js [--src S:/myagents/dnd_service_20260930] [--all]
 *
 *   預設只匯出「有額外套裝立繪」的角色＋主角（示範集合）。
 *   --all 匯出整份 NPC 名單（約 390 位，圖檔會大很多）。
 */
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const argv = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
const SRC = argv('--src', process.env.GAME_SRC || 'S:/myagents/dnd_service_20260930');
const ALL = args.includes('--all');
const OUT = path.join(__dirname, '..');

const lore = require(path.join(SRC, 'game-server/src/campaigns/hogwarts/lore.js'));
const window = {};
eval(fs.readFileSync(path.join(SRC, 'web/public/assets/npc/looks-available.js'), 'utf8')); // eslint-disable-line no-eval
const EXTRA = window.NPC_EXTRA_LOOKS || {};
const LOOK_DIR = { base: 'npc', outfit: 'npc/outfit', outfit2: 'npc/outfit2', sailor: 'npc/sailor', swim: 'npc/swim' };

function pick(n, kind, looks) {
  const c = n.combat || {};
  const atk = c.primary_attack || null;
  const hint = n.encounter_hint || n.spotlight;
  return {
    id: n.id,
    kind,
    name: n.name,
    full_name: n.full_name || null,
    role: n.role || null,
    trait: n.trait || null,
    gender: n.gender || null,
    age: n.age ?? null,
    race: n.race || 'human',
    faction: n.house || null,
    appearance: n.appearance || null,
    appearance_detail: n.appearance_detail && n.appearance_detail !== n.appearance ? n.appearance_detail : null,
    hint: hint ? { location: lore.getLocationName(hint.location) || null, hook: hint.hook || null } : null,
    combat: {
      archetype: c.archetype || null,
      abilities: c.abilities,
      hp: c.hp,
      ac: c.ac,
      skills: c.skill_proficiencies || [],
      saves: c.save_proficiencies || [],
      attack: atk ? { name: atk.name, type: atk.type, damage: atk.damage, damage_type: atk.damage_type, is_heal: Boolean(atk.is_heal) } : null,
    },
    looks,
  };
}

const ids = ALL
  ? [...Object.keys(lore.TEAM_NPCS), ...Object.keys(lore.SIDE_NPCS)]
  : Object.keys(EXTRA).sort();

const chars = [];
for (const id of ids) {
  const n = lore.TEAM_NPCS[id] || lore.SIDE_NPCS[id];
  if (!n) { console.warn('skip (not in lore):', id); continue; }
  chars.push(pick(n, lore.TEAM_NPCS[id] ? 'team' : 'npc', ['base', ...(EXTRA[id] || [])]));
}

chars.unshift({
  id: 'storm',
  kind: 'player',
  name: '小風暴·史東',
  full_name: '小風暴·史東（Storm Stone）',
  role: '主角',
  trait: '機智、體能好、口才佳；天生無法施法',
  gender: 'male',
  age: 18,
  race: 'human',
  faction: 'gryffindor',
  appearance: '一頭被風吹亂也不在意的深色短髮，眼神明亮而直接，總是一副準備隨時起跑的姿態',
  appearance_detail: '無法施法的霍格華茲校友（罕例），因牆語者異象受召返校。靠機智、體能、道具、隊友與口才解決問題。',
  hint: { location: '霍格華茲', hook: '牆語者異象出現後，被召回校園的畢業校友' },
  combat: {
    archetype: 'swift_striker',
    abilities: { str: 10, dex: 14, con: 12, int: 13, wis: 14, cha: 11 },
    hp: 11,
    ac: 12,
    skills: ['investigation', 'insight', 'persuasion', 'perception', 'athletics'],
    saves: ['dex', 'wis'],
    attack: { name: '匕首', type: 'melee', damage: '1d4+2', damage_type: 'piercing', is_heal: false },
  },
  looks: ['base'],
});

const jobs = [];
for (const ch of chars) {
  ch.looks = ch.looks.filter((look) => {
    const src = path.join(SRC, 'web/public/assets', LOOK_DIR[look], `${ch.id}.png`);
    if (!fs.existsSync(src)) return look === 'base'; // 原裝缺圖仍保留（前端顯示佔位）
    jobs.push({ src, id: ch.id, look });
    return true;
  });
}

const payload = { generated: new Date().toISOString().slice(0, 10), characters: chars };
fs.mkdirSync(path.join(OUT, 'data'), { recursive: true });
fs.writeFileSync(path.join(OUT, 'data/characters.json'), JSON.stringify(payload, null, 2));
fs.writeFileSync(path.join(OUT, 'data/characters.js'), '// 由 scripts/import-from-game-server.js 產生，勿手動編輯\nwindow.CHARACTERS = ' + JSON.stringify(payload) + ';\n');
fs.writeFileSync(path.join(__dirname, '.portrait-jobs.json'), JSON.stringify(jobs));
console.log(`characters: ${chars.length}, portraits to convert: ${jobs.length}`);
console.log('next → python scripts/convert-portraits.py');
