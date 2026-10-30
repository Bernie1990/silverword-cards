/* 把橡木鎮名冊 327 人寫進十四條支線。
 * 不覆寫 series-oakvale-roster.js 的角色本體，只改副標，並輸出故事覆蓋層與故事線。
 *
 *   node scripts/build-oakvale-branches.js
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const a = require('./lib/oakvale-branches-a');
const b = require('./lib/oakvale-branches-b');
const KEYS = require('./lib/oakvale-key-stories');
const BRANCHES = [...a, ...b];

const EXTRA = {
  seventeen: {
    ideals: ['把不見的人留下來', '先數，再找', '替還沒回來的人留一個位子', '名字比消息重要'],
    flaws: ['等一個人等到不肯聽「別等了」', '把「不會吧」三個字記成債', '認得出名字，卻不願說出是哪一個', '點名時會停太久'],
  },
  capital: {
    ideals: ['紀錄要比權力活得久', '不美化任何一方', '原稿一個字都不改', '被抹掉的街要回到地圖上'],
    flaws: ['記得太準，準到讓人不敢把秘密告訴他', '在宴席上沉默得像在記帳', '對改過的年份零容忍，對改的人卻懶得給台階', '把座位表看得比口供重'],
  },
  roads: {
    ideals: ['每條路都要有回程', '邊民的損失不是代價', '走得慢的人留在最後，最後的人一定要到', '折返不是恥辱'],
    flaws: ['寧可折返也不肯把理由說完整', '對路標的執著會讓同行的人受凍', '找到以前不肯回家', '把「我記得路」說得像命令'],
  },
  harbor: {
    ideals: ['遺體安置完才叫打撈', '海不騙人，海圖會', '活人才配被帶出海', '還回來的名字要一個一個寫'],
    flaws: ['數字對不上就讓所有人停工', '拒絕得太快', '對三年前的風向耿耿於懷', '在碼頭上說謝謝說得太輕，輕到別人以為沒事'],
  },
  lake: {
    ideals: ['沒有影子的人也要有下船的地方', '說好一趟就一趟', '水太舊就讓它回去', '新月夜照載'],
    flaws: ['話少到像拒絕', '不肯把一趟走成兩趟，即使有人被留在霧裡', '對「對岸」這個詞零容忍', '扶著人的時候不看對方的眼睛'],
  },
  forest: {
    ideals: ['欠森林的用手還', '理由說得出來才許進林', '八百年的重量要有人接', '零件掛在入口，給下一個想架管子的人看'],
    flaws: ['對斧聲不留情', '把手放進土裡以後就不肯先走', '把樹的話聽得比人的話認真', '花期會先洩漏她還沒說的情緒'],
  },
  shadow: {
    ideals: ['死者若在等一句話，就該有人說完', '擋門的人必須活著', '不替亡者潤飾證詞', '結束了，就可以走'],
    flaws: ['記得太清楚，清楚到自己無法下班', '請人幫忙時話說得像命令', '對「沒有人來換」這件事無法輕輕帶過', '在門口坐到天亮，誤了自己的飯'],
  },
};

function loadRoster() {
  const ctx = { window: { SERIES: [] } };
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(path.join(ROOT, 'data/series-oakvale-roster.js'), 'utf8'), ctx);
  const series = ctx.window.SERIES.find((s) => s.id === 'oakvale-roster');
  if (!series) throw new Error('找不到橡木鎮名冊');
  return series;
}

function loadGlobalIds() {
  const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  const files = [...html.matchAll(/src="(data\/[^"]+)"/g)].map((m) => m[1])
    .filter((f) => !/series-oakvale-roster-(saga|story)/.test(f));
  const ctx = { window: { SERIES: [] } };
  vm.createContext(ctx);
  for (const f of files) vm.runInContext(fs.readFileSync(path.join(ROOT, f), 'utf8'), ctx, { filename: f });
  const ids = new Set();
  for (const s of ctx.window.SERIES) for (const c of s.characters || []) ids.add(c.id);
  return ids;
}

function person(c) {
  const p = c.gender === 'female' ? '她' : c.gender === 'male' ? '他' : c.name;
  return { n: c.name, p, role: c.role || '住客', where: (c.hint && c.hint.location) || '橡木鎮' };
}

function pick(pool, i, h) {
  if (!pool || !pool.length) throw new Error('空的句子池');
  const item = pool[i % pool.length];
  let text = typeof item === 'function' ? item(h) : item;
  if (i >= pool.length) text = `${text.replace(/。$/, '')}。${h.n}把這句話留在${h.where}。`;
  return text;
}

function buildStory(branch, c, i) {
  const h = person(c);
  const hand = KEYS[c.id];
  if (hand) return hand;
  const ideals = branch.ideals || (EXTRA[branch.id] && EXTRA[branch.id].ideals);
  const flaws = branch.flaws || (EXTRA[branch.id] && EXTRA[branch.id].flaws);
  const scene = branch.scene[i % branch.scene.length];
  const close = branch.close[(i + 2) % branch.close.length];
  const hook = (c.hint && c.hint.hook) || '';
  return {
    quote: pick(branch.quotes, i, h),
    ideal: pick(ideals, i + 1, h),
    bond: pick(branch.bond, i, h),
    flaw: pick(flaws, i + 2, h),
    chapters: [
      { title: branch.ch1, text: hook },
      { title: scene[0], text: scene[1](h) },
      { title: close[0], text: close[1](h) },
    ],
    relations: Object.entries(branch.rel).map(([id, fn]) => ({ id, text: fn(h) })),
  };
}

function validate(roster, globalIds) {
  const byId = new Map(roster.characters.map((c) => [c.id, c]));
  const seen = new Map();
  const keySet = new Set();
  for (const br of BRANCHES) {
    if (br.keys.length !== 2) throw new Error(`${br.id} 核心應為兩位`);
    for (const id of br.keys) {
      if (!br.members.includes(id)) throw new Error(`${br.id} 的核心 ${id} 不在成員裡`);
      keySet.add(id);
      if (!KEYS[id]) throw new Error(`缺手寫故事 ${id}`);
    }
    for (const id of br.members) {
      if (!byId.has(id)) throw new Error(`${br.id} 的成員不在名冊：${id}`);
      if (seen.has(id)) throw new Error(`${id} 同時在 ${seen.get(id)} 與 ${br.id}`);
      seen.set(id, br.id);
    }
    for (const act of br.acts) {
      for (const id of act.cast) {
        if (!globalIds.has(id) && !byId.has(id)) throw new Error(`${br.id}「${act.title}」的登場人物不存在：${id}`);
      }
    }
  }
  const missing = roster.characters.filter((c) => !seen.has(c.id)).map((c) => c.id);
  if (missing.length) throw new Error('還沒有支線：' + missing.join(', '));
  for (const id of Object.keys(KEYS)) {
    if (!keySet.has(id)) throw new Error(`手寫故事 ${id} 不是任何支線的核心`);
    for (const k of ['quote', 'background', 'ideal', 'bond', 'flaw']) {
      if (!KEYS[id][k]) throw new Error(`${id} 缺 ${k}`);
    }
    if (!KEYS[id].chapters || KEYS[id].chapters.length < 3) throw new Error(`${id} 章節不足`);
  }
}

function emit(file, payload, note) {
  const text = '/* ' + note + ' */\n'
    + 'window.SERIES = window.SERIES || [];\n'
    + 'window.SERIES.push(' + JSON.stringify(payload) + ');\n';
  fs.writeFileSync(path.join(ROOT, 'data', file), text);
  console.log(file, Buffer.byteLength(text));
}

function patchSubtitle() {
  const file = path.join(ROOT, 'data/series-oakvale-roster.js');
  const raw = fs.readFileSync(file, 'utf8');
  const next = '灰燼之年 · 十四條支線（327 人）';
  const cur = raw.match(/"subtitle":"([^"]*)"/);
  if (!cur) throw new Error('名冊找不到副標');
  if (cur[1] === next) return;
  fs.writeFileSync(file, raw.replace(`"subtitle":"${cur[1]}"`, `"subtitle":"${next}"`));
  console.log('subtitle', cur[1], '->', next);
}

function main() {
  const roster = loadRoster();
  const globalIds = loadGlobalIds();
  validate(roster, globalIds);
  const byId = new Map(roster.characters.map((c) => [c.id, c]));

  const stories = [];
  for (const br of BRANCHES) {
    br.members.forEach((id, i) => {
      const story = buildStory(br, byId.get(id), i);
      for (const ch of story.chapters) {
        if (!ch.title || !ch.text) throw new Error(`${id} 有空章節`);
      }
      stories.push({ id, story });
    });
  }

  const actsOf = (list) => list.flatMap((br) => br.acts.map((act) => ({
    when: act.when, title: act.title, text: act.text, cast: act.cast,
  })));

  emit('series-oakvale-roster-saga.js', {
    id: 'oakvale-roster',
    world: {
      arc: '灰燼之年',
      blurb: '灰燼熔爐那個季節，名冊上的人不只留在橡木鎮。有人在王都對三十年的畫記，有人在北境把路標刻回「回程」，有人在鹽港數沉船，有人在湖心、橡木林和幽界那一側，把名字還給還在等的人。十四條支線，同一年。點開每一幕的人，能直接走回冒險者錄裡那座鎮。',
    },
    saga: { prev: 'oakvale', acts: actsOf(a) },
  }, '橡木鎮名冊 · 灰燼之年 支線一到七。由 scripts/build-oakvale-branches.js 產生。');

  emit('series-oakvale-roster-saga-2.js', {
    id: 'oakvale-roster',
    saga: { acts: actsOf(b) },
  }, '橡木鎮名冊 · 灰燼之年 支線八到十四。由 scripts/build-oakvale-branches.js 產生。');

  const size = Math.ceil(stories.length / 3);
  ['series-oakvale-roster-story.js', 'series-oakvale-roster-story-2.js', 'series-oakvale-roster-story-3.js']
    .forEach((file, n) => {
      emit(file, { id: 'oakvale-roster', characters: stories.slice(n * size, (n + 1) * size) },
        '橡木鎮名冊的故事覆蓋層。只帶 id 與 story，由 scripts/build-oakvale-branches.js 產生。');
    });

  patchSubtitle();
  console.log('stories', stories.length, 'acts', actsOf(BRANCHES).length);
}

main();
