/* ═══════════════════════════════════════════════════════════════════
   rank.js — 階級推導（純函式）
   ───────────────────────────────────────────────────────────────────
   不新增任何後端欄位，全部由既有戰鬥數值推得：
     戰力 = 六維總和 + HP×0.9 + AC×1.8
     NPC  → 取整份名單的五分位（同一份名單結果固定，不隨篩選跳動）
     隊員 → 至少 SSR（劇情主力，不該因數值平庸掉到雜魚框）
     主角 → UR
   ═══════════════════════════════════════════════════════════════════ */
(function (global) {
  'use strict';

  const ABIL = ['str', 'dex', 'con', 'int', 'wis', 'cha'];
  const clamp = (r) => Math.max(0, Math.min(4, r | 0));

  function power(ch) {
    const c = ch && ch.combat;
    if (!c) return 0;
    const a = c.abilities || {};
    const sum = ABIL.reduce((t, k) => t + (a[k] || 0), 0);
    return sum + (c.hp || 0) * 0.9 + (c.ac || 0) * 1.8;
  }

  /** 六維平均，供雷達／預覽用 */
  function avgAbility(ch) {
    const a = (ch.combat && ch.combat.abilities) || {};
    return ABIL.reduce((t, k) => t + (a[k] || 0), 0) / 6;
  }

  /**
   * 建立一份名單的排名器。
   * 回傳 { rank(ch) → 0..4, percent(ch) → 0..100 }。
   */
  function build(list) {
    const scores = list.map(power).sort((a, b) => a - b);
    const n = scores.length;
    const cuts = n
      ? [0.2, 0.4, 0.6, 0.8].map((p) => scores[Math.min(n - 1, Math.floor(p * n))])
      : [0, 0, 0, 0];
    const lo = n ? scores[0] : 0;
    const hi = n ? scores[n - 1] : 1;

    const quintile = (ch) => {
      const s = power(ch);
      let r = 0;
      for (const c of cuts) if (s >= c) r += 1;
      return clamp(r);
    };

    return {
      rank(ch) {
        if (ch.kind === 'player') return 4;
        const r = quintile(ch);
        return ch.kind === 'team' ? Math.max(3, r) : r;
      },
      percent(ch) {
        if (hi === lo) return 50;
        return Math.round(((power(ch) - lo) / (hi - lo)) * 100);
      },
    };
  }

  const mod = (v) => Math.floor(((v || 10) - 10) / 2);
  const fmtMod = (m) => (m >= 0 ? '+' : '') + m;

  global.Rank = { power, avgAbility, build, mod, fmtMod, clamp };
}(window));
