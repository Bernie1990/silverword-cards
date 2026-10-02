/**
 * 把尚未進站的 NPC 各分到一個世界，寫成名冊。同一個人只出現一次。
 *
 * 霍格華茲：崗位離不開城堡（圖書館、鐘樓、廚房、溫室、醫療翼、貓頭鷹棚、
 * 天文塔、魔藥教室、大禮堂、萬應室）。故事只用牆語者那段日子。
 * 橡木鎮：其餘全部。故事只用灰燼熔爐那個季節。
 *
 *   node scripts/import-roster.js
 *   python scripts/import-roster-art.py
 */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const SRC = process.env.GAME_SRC || 'S:/myagents/dnd_service_20260930';
const hog = require(path.join(SRC, 'game-server/src/campaigns/hogwarts/lore.js'));
const gen = require(path.join(SRC, 'game-server/src/campaigns/generic5e/lore.js'));

/** 這些 id 的工作離不開霍格華茲城堡，其餘進橡木鎮。 */
const HOG_IDS = new Set([
  'aster_littlewing', 'urga_starbraid', 'thimblewick_bottlemoon', 'zephyrine_gablerun',
  'benedikt', 'orin_gearwise', 'pella_clockkey', 'brass_bellhorn', 'brunna_bronzethroat',
  'meridian_coilhymn', 'tamsin_clockmoth', 'azuron_truepitch',
  'grixa_stagecall', 'roland_mirthmantle', 'opal_manyfaces', 'hark_finesew',
  'elysia_frostlace', 'cindra_kilnveil', 'ithanne_truceblade', 'celestia_hymnspire',
  'jules_roseward', 'lyria', 'mira_honeybell', 'morga_greenhand', 'oswin_hiveward',
  'corven_graymask', 'marzena_slumberward', 'oneira_lullwake', 'karruka_alembhold',
  'mabel', 'nib_sugarcap', 'ignatius', 'porcelain_sage', 'xil_moonpan',
  'balin_wickgold', 'sunniva_hearthfeast',
  'tobias', 'luna_moonquill', 'ivory_scale', 'eamon_palimpsest', 'ren_inkstitch',
  'rixa_goldmargin', 'boddyn_inkgear', 'fenna_presswick', 'grib_printblock',
  'leorian_ciphersage', 'ogden_kindchalk', 'darian_crownsunder',
  'tobin_bluescarf', 'faelor_whitewing', 'shaela_owlrest', 'miravel_windroost',
  'kalla_peakpost', 'nymessa_moonskein',
  'sable_violetvial', 'iris_scentscale', 'adaeze_faultline', 'zheris_nightcoil',
  'sahali_codexhush', 'therndel',
  'kippa_manykeys', 'davor_cinderkey', 'odessa_tumblerlock', 'prism_shutter',
  'gray_threadmaster', 'priya_sunthread', 'ysabeau_silkweb', 'ialvara_mauvedye',
  'vesper_mapthorn', 'halvora_quorumstone',
]);

const HOUSES = ['gryffindor', 'hufflepuff', 'ravenclaw', 'slytherin'];
const HOUSE_LABEL = { gryffindor: '葛萊芬多', hufflepuff: '赫夫帕夫', ravenclaw: '雷文克勞', slytherin: '史萊哲林' };
const GUILDS = ['silver_chalice', 'azure_spire', 'obsidian_pact', 'crimson_banner'];
const GUILD_LABEL = {
  silver_chalice: '銀杯醫者團', azure_spire: '蔚藍尖塔學會',
  obsidian_pact: '黑曜結社', crimson_banner: '赤旗傭兵團',
};
const ARCH_FACTION = {
  support_healer: 'silver_chalice', hearth_support: 'silver_chalice', field_medic: 'silver_chalice',
  herbal_healer: 'silver_chalice', diviner_support: 'azure_spire', controller_caster: 'azure_spire',
  lore_scholar: 'azure_spire', seer_mystic: 'azure_spire', alchemist_caster: 'azure_spire',
  bard_caster: 'azure_spire', dark_arts_scholar: 'obsidian_pact', noble_enchanter: 'obsidian_pact',
  commander_caster: 'obsidian_pact', precision_duelist: 'obsidian_pact',
  frontline_charger: 'crimson_banner', swift_striker: 'crimson_banner', duelist_leader: 'crimson_banner',
  guardian_caster: 'crimson_banner', beast_ranger: 'crimson_banner',
};
const VOL = ['壹', '貳', '參', '肆', '伍', '陸', '柒', '捌'];
const BAN = {
  hogwarts: /橡木|灰燼|熔爐|吉茲莫|鎮長|醉龍|晨光神殿/,
  oakvale: /霍格|牆語|魁地奇|葛萊芬|史萊哲|雷文克|赫夫帕|分院帽|麻瓜/,
};
const OAK_LOC = { guild_hall: '橡木鎮·公會會館' };

const HOG_BEAT = {
  library: ['那一頁', (n, role) => `禁書區有一頁寫著牆會說話。${n}做的是${role}，就把那一頁收進自己的卷宗，沒有轉交給別人。`],
  astronomy_tower: ['一道縫', (n, role) => `塔上的星象多了一道每晚挪一點的縫。${n}在${role}的紀錄裡替這道縫留了一欄，只記位置。`],
  clock_tower: ['差了的秒', (n, role) => `那幾週鐘時快時慢。${n}照${role}的規矩，把差了的秒數記在鐘櫃內側，鐘還是照舊敲。`],
  hospital_wing: ['同一側', (n, role) => `醫療翼的傷患變多，傷都在同一側。${n}以${role}的方式一個一個處理，沒有問傷從哪面牆來。`],
  kitchens: ['最後才送', (n, role) => `西側那排座位上的熱食涼得特別快。${n}管的是${role}，於是把那一排改成最後才送出去。`],
  greenhouse: ['葉子', (n, role) => `有幾盆植物整夜把葉子轉向同一面牆。${n}做${role}，把花盆轉正；隔天葉子又轉了回去。`],
  owlery: ['繞開', (n, role) => `鳥不肯靠近東側。${n}把${role}的路線改成繞開那段牆，信還是送到了。`],
  potions_classroom: ['瓶底', (n, role) => `有幾味藥一經過某些走廊就變色。${n}在瓶底寫下走廊的名字。這是${role}用得上的紀錄。`],
  great_hall: ['西側的蠟燭', (n, role) => `宴席上西側的蠟燭斜著燒，沒有風。${n}負責${role}，把該做的事換到東側，沒有當眾說明原因。`],
  room_of_requirement: ['厚了一臂', (n, role) => `萬應室門外的牆比上週厚了一臂。${n}把新的尺寸記進${role}要用的東西裡。`],
  trophy_room: ['裂紋', (n, role) => `獎盃室有一面櫃的玻璃自己裂了，裂紋拼成一扇門。${n}先把裂紋描下來，再決定${role}要不要報上去。`],
  ravenclaw_tower: ['多問的一句', (n, role) => `塔門的謎題多問了一句平時不會問的話。${n}答完，把那句話抄進${role}的筆記。`],
  quidditch_pitch: ['球門柱', (n, role) => `球場東側的球門柱在夜裡會輕輕響。${n}照${role}的習慣去看過，柱子沒有鬆。`],
  hogsmeade: ['那一句', (n, role) => `村子裡開始有人說城堡的牆會挪。${n}做${role}，只把自己聽見的那一句記下來。`],
  charms_classroom_corridor: ['地磚', (n, role) => `走廊有一塊地磚每天回到不同的位置。${n}用${role}的方式量了三次，三次都不一樣。`],
};
const OAK_BEAT = {
  town_square: ['懸賞', (n, role) => `懸賞翻了倍，問黃銅螺旋的人圍在市集。${n}做${role}，只回答自己經手的那一部分。`],
  tavern: ['位子', (n, role) => `外來的隊伍把位子坐滿。${n}照${role}的習慣，把常客的位子留到最後。`],
  temple: ['面向', (n, role) => `夜裡的死者都面向地底。${n}做完${role}該做的，把面向記在名冊邊欄。`],
  mage_guild: ['鉛筆點', (n, role) => `星圖上多了一道螺旋。${n}在自己的圖上用鉛筆點了一點，沒有標名稱。`],
  apothecary: ['焦根', (n, role) => `藥草一夜枯了一半，枯的是根。${n}把還能用的揀出來；焦黑的那半沒有丟，另收一櫃。`],
  market_stall: ['攤前', (n, role) => `攤前多了一圈問螺旋徽記的人。${n}賣的還是${role}的東西，價錢沒有跟著懸賞改。`],
  training_yard: ['留下的人', (n, role) => `一半的人接了地城的約。${n}把留下的人重新分組，${role}的操練沒有停。`],
  town_gate: ['往南', (n, role) => `鎮外多了一整片營火。${n}守著${role}的崗位，只多問一句：往南，還是往地城。`],
  wilds: ['路標', (n, role) => `南邊林子的葉子還綠，根是焦的。${n}把那一段路標改了，叫走這條路的人繞開。`],
  old_dungeon: ['守護', (n, role) => `地城門口的黃銅構裝體醒來，胸口的字只剩「守護」。${n}沒有進去，把看見的時間記在${role}的紀錄裡。`],
  lakeside: ['水邊', (n, role) => `盛夏的湖結了冰。${n}照舊做${role}的事，手在水邊停得比平常久。`],
  watchtower: ['燈號', (n, role) => `西邊第三十七盞街燈變成藍色。${n}在值更簿上寫了燈號，沒有寫原因。`],
  library_hall: ['石板', (n, role) => `藏書閣有一塊石板寫著地底有一顆還在燒的心。${n}把石板編號抄進${role}的目錄，沒有聲張。`],
  stables: ['韁繩', (n, role) => `牲口不肯朝南邊的林子走。${n}改了韁繩的方向，沒有為了行程罵牠們。`],
  back_alley: ['沒有接', (n, role) => `後巷有人出高價收一種冷的灰。${n}聽完價格，沒有接。`],
  guild_hall: ['重新釘上', (n, role) => `委託板上地城那一欄被翻爛了。${n}把撕掉的那張重新釘上，價錢沒改。`],
};

function loadLex() {
  const ctx = { window: {} };
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(path.join(ROOT, 'js/lexicon.js'), 'utf8'), ctx);
  return ctx.window.LEX;
}

function takenIds() {
  const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  const files = [...html.matchAll(/src="(data\/[^"]+)"/g)].map((m) => m[1])
    .filter((f) => fs.existsSync(path.join(ROOT, f)) && !/-(silver|oakvale)-roll-/.test(f));
  const ctx = { window: { SERIES: [] } };
  vm.createContext(ctx);
  for (const f of files) vm.runInContext(fs.readFileSync(path.join(ROOT, f), 'utf8'), ctx);
  const taken = new Set();
  const names = new Map();
  for (const s of ctx.window.SERIES) {
    for (const c of s.characters || []) {
      if (!c.name) continue;
      taken.add(c.id);
      if (!names.has(c.name)) names.set(c.name, s.id);
    }
  }
  return { taken, names };
}

function clip(s, n) {
  const t = String(s || '').replace(/\s+/g, '');
  return t.length > n ? t.slice(0, n - 1) + '…' : t;
}

function whereOf(world, loc) {
  const lore = world === 'hogwarts' ? hog : gen;
  let name = '';
  try { name = lore.getLocationName(loc) || ''; } catch { name = ''; }
  if (!name || name === loc) name = OAK_LOC[loc] || '';
  return name;
}

function factionOf(world, npc) {
  if (world === 'hogwarts') {
    if (HOUSES.includes(npc.house)) return npc.house;
    throw new Error('沒有學院 ' + npc.id + ' ' + npc.house);
  }
  if (GUILDS.includes(npc.house)) return npc.house;
  const arch = npc.combat && npc.combat.archetype;
  if (ARCH_FACTION[arch]) return ARCH_FACTION[arch];
  throw new Error('沒有公會 ' + npc.id + ' ' + npc.house);
}

function beat(world, loc, name, role) {
  const table = world === 'hogwarts' ? HOG_BEAT : OAK_BEAT;
  const row = table[loc];
  if (row) return { title: row[0], text: row[1](name, role) };
  const where = whereOf(world, loc) || (world === 'hogwarts' ? '城堡' : '橡木鎮');
  if (world === 'hogwarts') {
    return { title: '留在崗位', text: `${name}在${where}做${role}。牆開始不對勁的那些天，${name}沒有離開自己的崗位。` };
  }
  return { title: '留在崗位', text: `${name}在${where}做${role}。湖變冷、地城開門的那個季節，${name}沒有跟著下地城。` };
}

function buildCharacter(id, world, LEX, replaced) {
  const pool = world === 'hogwarts'
    ? { ...hog.TEAM_NPCS, ...hog.SIDE_NPCS }
    : gen.SIDE_NPCS;
  const n = pool[id];
  if (!n) throw new Error('名單裡沒有 ' + id + ' @ ' + world);
  const hint = n.encounter_hint || {};
  const loc = hint.location || '';
  const where = whereOf(world, loc) || (world === 'hogwarts' ? '霍格華茲' : '橡木鎮');
  let hook = (hint.hook || '').trim();
  if (!hook || BAN[world].test(hook)) {
    replaced.push(id + ' ' + world + ' hook');
    hook = `${n.name}在${where}。有人找上門時，${n.name}先把${n.role || '手上的事'}做完。`;
  }
  const detail = (n.appearance_detail && n.appearance_detail !== n.appearance)
    ? n.appearance_detail : (n.appearance || '');
  const trait = n.trait || '';
  const bits = trait.split(/[、，]/).map((s) => s.trim()).filter(Boolean);
  const role = n.role || '住客';
  const c = n.combat || {};
  const atk = c.primary_attack || null;
  const skills = (c.skill_proficiencies || []).filter((k) => LEX.SKILL[k]);
  const attack = atk && LEX.DAMAGE[atk.damage_type]
    ? { name: atk.name, type: atk.type || 'spell', damage: atk.damage, damage_type: atk.damage_type, is_heal: Boolean(atk.is_heal) }
    : null;
  const race = n.race;
  if (race && !LEX.RACE[race]) throw new Error('未知種族 ' + id + ' ' + race);
  const third = beat(world, loc, n.name, role);
  const firstLine = String(detail).split('。')[0];
  const png = path.join(SRC, 'web/public/assets/npc', `${id}.png`);
  if (!fs.existsSync(png)) throw new Error('缺圖 ' + id);
  const story = {
    quote: clip(trait || role, 42),
    background: detail || n.appearance || `${n.name}在${where}做${role}。`,
    ideal: bits[0] || trait || '把自己的崗位守好。',
    bond: `${where}的崗位：${role}。`,
    flaw: bits[2] || bits[bits.length - 1] || '太把眼前這件事當真。',
    chapters: [
      { title: '崗位', text: `${n.name}在${where}做${role}。${firstLine ? firstLine + '。' : ''}` },
      { title: '遇上', text: hook },
      third,
    ],
  };
  for (const ch of story.chapters) {
    if (BAN[world].test(ch.text)) throw new Error('故事串到另一個世界 ' + id + ' ' + ch.title);
  }
  return {
    job: { id, src: png, series: world === 'hogwarts' ? 'silver-roll' : 'oakvale-roll' },
    character: {
      id,
      kind: 'npc',
      name: n.name,
      full_name: n.full_name || null,
      role,
      trait: trait || null,
      gender: n.gender || null,
      age: n.age ?? null,
      race: race || null,
      faction: factionOf(world, n),
      appearance: n.appearance || null,
      appearance_detail: detail && detail !== n.appearance ? detail : null,
      hint: { location: where, hook },
      combat: {
        archetype: LEX.ARCH[c.archetype] ? c.archetype : null,
        abilities: c.abilities,
        hp: c.hp,
        ac: c.ac,
        skills,
        saves: (c.save_proficiencies || []).filter((k) => LEX.ABIL.includes(k)),
        attack,
      },
      looks: ['base'],
      story,
    },
  };
}

function writeVolumes(world, people, names) {
  const order = world === 'hogwarts' ? HOUSES : GUILDS;
  const label = world === 'hogwarts' ? HOUSE_LABEL : GUILD_LABEL;
  people.sort((a, b) => order.indexOf(a.faction) - order.indexOf(b.faction)
    || a.name.localeCompare(b.name, 'zh-Hant'));
  const volumes = [];
  for (let i = 0; i < people.length; i += 60) volumes.push(people.slice(i, i + 60));
  if (volumes.length > VOL.length) throw new Error('超過冊數 ' + world + ' ' + people.length);
  const written = [];
  volumes.forEach((group, vi) => {
    const counts = {};
    group.forEach((c) => { counts[c.faction] = (counts[c.faction] || 0) + 1; });
    const mix = order.filter((k) => counts[k]).map((k) => `${label[k]} ${counts[k]}`).join(' · ');
    const n = vi + 1;
    const id = world === 'hogwarts' ? `silver-roll-${n}` : `oakvale-roll-${n}`;
    const fileName = `series-${id}.js`;
    const payload = world === 'hogwarts'
      ? {
        id, title: `銀語名冊 · ${VOL[vi]}`, subtitle: mix, theme: 'arcane',
        world: {
          name: '霍格華茲',
          blurb: `牆語者異象那段日子，留在城堡裡做自己崗位的人。第${VOL[vi]}冊（${mix}）。這本名冊只記霍格華茲。`,
        },
        factions: {
          gryffindor: { label: '葛萊芬多', icon: '🦁' },
          slytherin: { label: '史萊哲林', icon: '🐍' },
          ravenclaw: { label: '雷文克勞', icon: '🦅' },
          hufflepuff: { label: '赫夫帕夫', icon: '🦡' },
        },
        generated: '2026-10-02',
        characters: group,
      }
      : {
        id, title: `橡木鎮名冊 · ${VOL[vi]}`, subtitle: mix, theme: 'dnd',
        palette: { a: '#c9954a', b: '#f0d39a', c: '#4fa58f' },
        world: {
          name: '橡木鎮',
          banner: 'assets/banners/oakvale.webp',
          blurb: `灰燼熔爐甦醒那個季節，留在鎮上與鎮外做自己崗位的人。第${VOL[vi]}冊（${mix}）。這本名冊只記橡木鎮。`,
        },
        factions: {
          silver_chalice: { label: '銀杯醫者團', icon: '⚕' },
          azure_spire: { label: '蔚藍尖塔學會', icon: '🔮' },
          obsidian_pact: { label: '黑曜結社', icon: '🌑' },
          crimson_banner: { label: '赤旗傭兵團', icon: '⚔' },
        },
        generated: '2026-10-02',
        characters: group,
      };
    const dup = group.find((c) => names.has(c.name));
    if (dup) console.log('同名', dup.name, '已在', names.get(dup.name));
    const file = path.join(ROOT, 'data', fileName);
    fs.writeFileSync(file,
      '/* 由 scripts/import-roster.js 產生。一人一個世界，故事不互通。 */\n'
      + 'window.SERIES = window.SERIES || [];\nwindow.SERIES.push('
      + JSON.stringify(payload) + ');\n');
    written.push(fileName);
    console.log(id, group.length, mix);
  });
  return written;
}

function patchIndex(silverFiles, oakFiles) {
  const index = path.join(ROOT, 'index.html');
  let html = fs.readFileSync(index, 'utf8');
  html = html.replace(/\r?\n<script src="data\/series-(?:silver|oakvale)-roll-\d+\.js"><\/script>/g, '');
  const tags = (files) => files.map((f) => `<script src="data/${f}"></script>`).join('\n');
  html = html.replace(
    '<script src="data/series-silver.js"></script>',
    '<script src="data/series-silver.js"></script>\n' + tags(silverFiles)
  );
  html = html.replace(
    '<script src="data/series-oakvale-player.js"></script>',
    '<script src="data/series-oakvale-player.js"></script>\n' + tags(oakFiles)
  );
  fs.writeFileSync(index, html);
}

function main() {
  const LEX = loadLex();
  const { taken, names } = takenIds();
  const all = { ...hog.TEAM_NPCS, ...hog.SIDE_NPCS };
  const fresh = Object.keys(all).filter((id) => !taken.has(id));
  for (const id of HOG_IDS) {
    if (!fresh.includes(id)) throw new Error('霍格華茲名單不在待進站裡：' + id);
  }
  const replaced = [];
  const jobs = [];
  const hogPeople = [];
  const oakPeople = [];
  for (const id of fresh) {
    const world = HOG_IDS.has(id) ? 'hogwarts' : 'oakvale';
    const built = buildCharacter(id, world, LEX, replaced);
    jobs.push(built.job);
    (world === 'hogwarts' ? hogPeople : oakPeople).push(built.character);
  }
  const silverFiles = writeVolumes('hogwarts', hogPeople, names);
  const oakFiles = writeVolumes('oakvale', oakPeople, names);
  // 清掉多餘的舊冊，避免 index 不再引用、檔案還留著
  for (const f of fs.readdirSync(path.join(ROOT, 'data'))) {
    if (!/^series-(silver|oakvale)-roll-\d+\.js$/.test(f)) continue;
    if (!silverFiles.includes(f) && !oakFiles.includes(f)) fs.unlinkSync(path.join(ROOT, 'data', f));
  }
  patchIndex(silverFiles, oakFiles);
  const leSrc = path.join(SRC, 'web/public/assets/player/Le.png');
  if (!fs.existsSync(leSrc)) throw new Error('缺 Le.png');
  jobs.push({ id: 'le_gladia', src: leSrc, series: 'oakvale' });
  fs.writeFileSync(path.join(__dirname, '.roster-jobs.json'), JSON.stringify(jobs));
  console.log('hogwarts', hogPeople.length, 'oakvale', oakPeople.length, 'replaced hooks', replaced.length);
  if (replaced.length) console.log(replaced.join('\n'));
}

main();
