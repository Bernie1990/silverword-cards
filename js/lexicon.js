/* ═══════════════════════════════════════════════════════════════════
   lexicon.js — 顯示用詞彙表：陣營、種族、架構、屬性、技能、套裝
   純資料，不含邏輯；換世界觀只要改這裡。
   ═══════════════════════════════════════════════════════════════════ */
(function (global) {
  'use strict';

  const FACTION = {
    gryffindor: { label: '葛萊芬多', icon: '🦁' },
    slytherin:  { label: '史萊哲林', icon: '🐍' },
    ravenclaw:  { label: '雷文克勞', icon: '🦅' },
    hufflepuff: { label: '赫夫帕夫', icon: '🦡' },
    // D&D 5e 通用戰役：橡木鎮四公會
    silver_chalice: { label: '銀杯醫者團', icon: '⚕' },
    azure_spire:    { label: '蔚藍尖塔學會', icon: '🔮' },
    obsidian_pact:  { label: '黑曜結社', icon: '🌑' },
    crimson_banner: { label: '赤旗傭兵團', icon: '⚔' },
    oak_council:    { label: '橡木鎮議會', icon: '🌳' },
    ashen_forge:    { label: '灰燼遺民', icon: '🔥' },
  };

  const ALIGN_SHORT = {
    守序善良: 'LG', 中立善良: 'NG', 混亂善良: 'CG',
    守序中立: 'LN', 絕對中立: 'N', 混亂中立: 'CN',
    守序邪惡: 'LE', 中立邪惡: 'NE', 混亂邪惡: 'CE',
  };

  const RACE = {
    human: '人類', elf: '精靈', 'half-elf': '半精靈', dwarf: '矮人', dragonborn: '龍裔', tiefling: '提夫林',
    'half-orc': '半獸人', orc: '獸人', halfling: '半身人', gnome: '地精', goblin: '哥布林', kobold: '狗頭人',
    aasimar: '神裔', goliath: '巨人族', 'half-giant': '半巨人', changeling: '易形者', triton: '崔頓海族',
    warforged: '鍛造人', 'treant-kin': '樹靈', aarakocra: '鳥人', 'fire-genasi': '火元素裔', 'water-genasi': '水元素裔',
    'earth-genasi': '土元素裔', 'air-genasi': '風元素裔', 'spirit-touched': '通靈者', fairy: '妖精', 'shadar-kai': '暗影界',
    lizardfolk: '蜥蜴人', 'vampire-spawn': '吸血鬼', tabaxi: '貓人', 'thri-kreen': '蟲人', 'dryad-kin': '樹妖', ratfolk: '鼠人',
    drow: '卓爾', satyr: '羊人', centaur: '人馬', kenku: '鴉人', minotaur: '牛頭人', eladrin: '精類精靈', tortle: '龜人',
    firbolg: '弗爾伯格', 'astral-elf': '星界精靈', 'wood-elf': '木精靈', 'sea-elf': '海精靈', duergar: '灰矮人',
    svirfneblin: '深地侏儒', githyanki: '吉斯洋基', githzerai: '吉斯澤萊', kalashtar: '卡拉斯塔', plasmoid: '原漿體',
    giff: '河馬人', shifter: '化獸者', 'yuan-ti': '蛇人',
    harengon: '兔人', 'green-hag': '綠鬼婆', vampire: '吸血鬼貴族', ghost: '幽魂', modron: '秩序構裝體',
    autognome: '自律侏儒', hadozee: '滑翔猿人', djinni: '風燈神', myconid: '蕈人', bugbear: '熊地精',
    devil: '魔鬼', imp: '小惡魔', cambion: '半魔', hellhound: '地獄犬', fiend: '邪魔',
    angel: '天使', archon: '天界守衛', flumph: '飄浮怪', 'aberrant-kin': '異界裔', 'kuo-toa': '魚人', illithid: '靈吸怪',
  };

  const ARCH = {
    support_healer: '輔助治療', controller_caster: '控場施法', precision_duelist: '精準決鬥',
    frontline_charger: '前線衝鋒', guardian_caster: '守護施法', herbal_healer: '草藥治療',
    diviner_support: '預視輔助', beast_ranger: '野獸巡林', swift_striker: '迅捷打擊',
    lore_scholar: '知識學者', alchemist_caster: '鍊金施法', dark_arts_scholar: '禁術學者',
    seer_mystic: '先知秘術', bard_caster: '吟遊施法', noble_enchanter: '貴族惑控',
    commander_caster: '指揮施法', hearth_support: '爐火輔助', field_medic: '戰地醫者',
    duelist_leader: '決鬥領袖',
  };

  const GENDER = { female: '女', male: '男', nonbinary: '非二元' };

  const KIND = { player: '主角', team: '核心隊員', npc: '常駐角色' };

  const ABIL = ['str', 'dex', 'con', 'int', 'wis', 'cha'];
  const ABIL_CN = { str: '力量', dex: '敏捷', con: '體質', int: '智力', wis: '感知', cha: '魅力' };
  const ABIL_SHORT = { str: '力', dex: '敏', con: '體', int: '智', wis: '感', cha: '魅' };

  const SKILL = {
    athletics: '運動', acrobatics: '體操', sleight_of_hand: '手上功夫', stealth: '隱匿',
    arcana: '奧秘', history: '歷史', investigation: '調查', nature: '自然', religion: '宗教',
    animal_handling: '馴獸', insight: '洞察', medicine: '醫藥', perception: '察覺', survival: '生存',
    deception: '欺瞞', intimidation: '威嚇', performance: '表演', persuasion: '說服',
  };

  const DAMAGE = {
    bludgeoning: '鈍擊', piercing: '穿刺', slashing: '揮砍', fire: '火焰', cold: '寒冰', lightning: '閃電',
    thunder: '雷鳴', acid: '酸蝕', poison: '毒素', radiant: '光耀', necrotic: '死靈', force: '力場', psychic: '心靈',
  };

  const ATTACK_TYPE = { melee: '近戰', ranged: '遠程', spell: '法術' };

  /* 立繪套裝：順序就是「全部切換」的循環順序 */
  const LOOKS = [
    { id: 'base',    label: '原裝',   short: '原' },
    { id: 'outfit',  label: '變裝',   short: '變' },
    { id: 'outfit2', label: '清涼',   short: '涼' },
    { id: 'sailor',  label: '水手服', short: '水' },
    { id: 'swim',    label: '泳裝',   short: '泳' },
    // D&D 系列專用
    { id: 'armor',    label: '戰裝', short: '戰' },
    { id: 'festival', label: '慶典', short: '慶' },
    // 生活／情境套裝（全新構圖與姿態）
    { id: 'casual',   label: '便裝',   short: '便' },
    { id: 'travel',   label: '旅裝',   short: '旅' },
    { id: 'gown',     label: '禮服',   short: '禮' },
    { id: 'work',     label: '工作裝', short: '工' },
    { id: 'training', label: '練功服', short: '練' },
    { id: 'summer',   label: '夏日',   short: '夏' },
    { id: 'winter',   label: '冬裝',   short: '冬' },
    { id: 'rain',     label: '雨夜',   short: '雨' },
    { id: 'night',    label: '夜行',   short: '夜' },
    { id: 'ritual',   label: '儀式',   short: '儀' },
    { id: 'dance',    label: '起舞',   short: '舞' },
    // 跨畫風套裝
    { id: 'chibi',   label: 'Q版公仔', short: 'Q' },
    { id: 'tarot',   label: '塔羅牌',  short: '塔' },
    { id: 'pixel',   label: '像素',    short: '像' },
    { id: 'stained', label: '彩繪玻璃', short: '窗' },
  ];

  const RANKS = [
    { tag: 'N',   cn: '凡', desc: '尋常之輩' },
    { tag: 'R',   cn: '稀', desc: '小有名氣' },
    { tag: 'SR',  cn: '銳', desc: '嶄露鋒芒' },
    { tag: 'SSR', cn: '極', desc: '一方翹楚' },
    { tag: 'UR',  cn: '絕', desc: '傳說之人' },
  ];

  global.LEX = { FACTION, ALIGN_SHORT, RACE, ARCH, GENDER, KIND, ABIL, ABIL_CN, ABIL_SHORT, SKILL, DAMAGE, ATTACK_TYPE, LOOKS, RANKS };
}(window));
