# 角色圖卡 · Character Cards

手遊風的角色圖卡展示站：3D 傾斜、全息箔、階級光框、六維雷達、多套立繪、立繪劇場。
**純靜態、零相依**——整個資料夾就是可部署的網站，不需要建置、不需要 Node 才能上線。

從 `dnd_service`（銀語守門人）的圖鑑抽出角色卡機制後重新設計而成；資料與立繪可用內附腳本從 game-server 重新匯出。

## 兩個系列

| 系列 | 主題 | 角色 | 特點 |
|------|------|------|------|
| **銀語守門人** | 霍格華茲（`theme: arcane`） | 主角＋4 核心隊員＋39 常駐角色 | 多套立繪（原裝／變裝／清涼／水手服／泳裝）、劇場套裝列 |
| **橡木鎮冒險者錄** | 龍與地下城 5e（`theme: dnd`） | 20 位邊境小鎮居民 | 每人職業／等級／陣營縱軸，**完整角色故事**：格言、背景、理想／羈絆／缺陷、三章故事、關係鏈（可點擊跳到對方） |

橡木鎮 20 人共享同一條主線「灰燼熔爐甦醒」：矮人鐵匠索格的家族祖業、盜賊皮普的空白信、被吸血鬼咬過的酒館歌者、剛醒來的守衛構裝體吉茲莫、暗中資助的黑曜結社……每張卡的故事互相補洞，在劇場的「關係」區點名字即可順著線索翻閱。

D&D 系列另有專屬卡皮：青銅四角紋飾、盾形階級徽、羊皮紙名牌、`Lv.N` 徽記、hover 顯示角色格言、背面顯示職業等級。頂部分頁可切換系列，各系列獨立計算階級五分位。

## 特色

| 區塊 | 內容 |
|------|------|
| 聚光燈 | 主角（或隨機一位）的電影感橫幅，光斑跟隨游標；可直接進劇場或翻面 |
| 卡片正面 | 全出血立繪、階級 conic 光框、UR 全息徽章、陣營徽記、星級、戰力條；hover 浮出性格與 HP/AC/ATK |
| 卡片背面 | ↻ 翻面：六維雷達、HP／AC／先攻、主攻擊、專精技能 |
| 多套立繪 | 👗 每張卡獨立切換（原裝／變裝／清涼／水手服／泳裝），也可全部一鍵切換；選擇存於 localStorage |
| 立繪劇場 | 全螢幕檢視：模糊背景＋主圖、飄浮微塵、套裝縮圖列、屬性長條＋雷達、←→ 翻閱、Esc 關閉、觸控左右滑；有 `story` 的角色會多出格言／背景／理想羈絆缺陷／章節時間線／關係鏈 |
| 篩選 | 搜尋、陣營、階級（含可點擊的階級圖例）、範圍、排序、卡片尺寸 S/M/L |
| 無障礙 | 鍵盤：Enter 開劇場、F 翻面、L 換立繪；尊重 `prefers-reduced-motion`；手機關閉粒子與傾斜 |

### 階級如何決定

不需要任何後端新欄位，全由既有戰鬥數值推得（`js/rank.js`）：

```
戰力 = 六維總和 + HP × 0.9 + AC × 1.8
常駐角色 → 取整份名單的五分位 → N / R / SR / SSR / UR
核心隊員 → 至少 SSR
主角     → UR
```

## 本機預覽

```bash
node server.js          # http://localhost:8787
PORT=3000 node server.js
```

`server.js` 只用 Node 內建模組，任何 Node 18+ 都能跑，不需要安裝套件。
沒有 Node 也行：任何靜態伺服器（VS Code Live Server、`python -m http.server`）皆可。

## 上線部署

這是純靜態站，把整個資料夾丟到任何靜態主機即可。

### GitHub Pages（已附 workflow）

1. 建立 GitHub repo 並推上去：
   ```bash
   git init && git add -A && git commit -m "init"
   git remote add origin https://github.com/<you>/character-cards.git
   git push -u origin main
   ```
2. GitHub → **Settings → Pages → Source** 選 **GitHub Actions**。
3. 推送後 `.github/workflows/pages.yml` 會自動部署；網址為 `https://<you>.github.io/character-cards/`。

所有路徑皆為相對路徑，放在子路徑下也能正常運作。

### 其他主機（拖放即可）

- **Netlify**：https://app.netlify.com/drop → 把資料夾拖進去。
- **Vercel**：`npx vercel`（或在網頁 Import 專案，Framework 選 Other）。
- **Cloudflare Pages**：Direct Upload → 選這個資料夾。

## 專案結構

```
character-cards/
├─ index.html              頁面骨架
├─ css/
│  ├─ tokens.css           設計變數（階級色、陣營色、字體）
│  ├─ card.css             卡片元件（正面／背面／特效／尺寸）
│  └─ app.css              版面（頂列、聚光燈、工具列、劇場）
├─ js/
│  ├─ lexicon.js           顯示詞彙（陣營、種族、屬性、套裝…）
│  ├─ rank.js              階級推導（純函式）
│  ├─ card.js              卡片 HTML 產生器、雷達 SVG
│  ├─ fx.js                3D 傾斜、視差、進場錯開、微塵
│  ├─ theater.js           立繪劇場
│  └─ app.js               狀態、篩選、事件委派、啟動
├─ data/
│  ├─ series-silver.js     銀語守門人（由匯出腳本產生）→ window.SERIES.push({...})
│  ├─ series-silver.json   同內容的 JSON
│  └─ series-oakvale.js    橡木鎮冒險者錄（手寫，含完整故事）
├─ assets/portraits/<look>/<id>.webp         劇場用（最長邊 768）
├─ assets/portraits/<look>/<id>.thumb.webp   卡片用（最長邊 384）
├─ scripts/
│  ├─ import-from-game-server.js  從 dnd_service 匯出角色資料
│  └─ convert-portraits.py        PNG → WebP（需要 Pillow）
└─ server.js               零相依本機伺服器
```

## 資料格式

每個 `data/series-*.js` 推入一個系列（`index.html` 的 `<script>` 順序即分頁順序）：

```js
window.SERIES = window.SERIES || [];
window.SERIES.push({
  id: 'oakvale', title: '橡木鎮冒險者錄', subtitle: '龍與地下城 5e · …',
  theme: 'dnd',                       // 'dnd' 啟用青銅卡皮與故事區塊；其他值為預設卡皮
  world: { name: '橡木鎮', blurb: '…', arc: '灰燼熔爐' },
  factions: { silver_chalice: { label: '銀杯醫者團', icon: '⚕' }, /* … */ },  // 陣營顯示名（顏色在 css/tokens.css 的 --fx-<id>-a/-b）
  generated: '2026-09-30',
  characters: [ /* 見下 */ ],
});
```

每位角色：

```jsonc
{
  "id": "alba_cloudpost",
  "kind": "npc",                 // player | team | npc
  "name": "阿爾芭·雲郵",
  "full_name": "阿爾芭·雲郵（Alba Cloudpost）",
  "role": "雲路信差", "trait": "開朗爽快…",
  "gender": "female", "age": 25, "race": "air-genasi", "faction": "gryffindor",
  "appearance": "…", "appearance_detail": "…",
  "hint": { "location": "貓頭鷹棚", "hook": "…" },
  "combat": {
    "archetype": "swift_striker",
    "abilities": { "str": 10, "dex": 18, "con": 12, "int": 12, "wis": 14, "cha": 14 },
    "hp": 13, "ac": 15,
    "skills": ["acrobatics", "perception", "survival"], "saves": ["dex", "wis"],
    "attack": { "name": "空中飛踢", "type": "melee", "damage": "1d6+4", "damage_type": "bludgeoning", "is_heal": false }
  },
  "looks": ["base", "outfit", "outfit2"],  // 對應 assets/portraits/<look>/<id>.webp

  // ── 以下為 D&D 系列選用欄位 ──
  "class": "戰士（鍛匠）", "level": 4, "alignment": "守序善良",
  "story": {
    "quote": "鐵不會說謎。你打它一千下，它就記住一千下。",
    "background": "…", "ideal": "…", "bond": "…", "flaw": "…",
    "chapters": [{ "title": "熔爐之子", "text": "…" }, /* 建議 3 章 */],
    "relations": [{ "id": "kaelith", "text": "隔壁的鄰居，也是他唯一會借錢的人" }]   // id 指向同系列角色
  }
}
```

要換成自己的角色，只要照這個格式新增一個 `data/series-<name>.js`、在 `index.html` 加一行 `<script>`，並把立繪放到對應路徑即可；沒有圖的角色會顯示陣營色佔位大字。

## 從 game-server 重新匯出

```bash
node scripts/import-from-game-server.js --src S:/myagents/dnd_service_20260930   # 預設只匯出有額外套裝的 43 位＋主角
node scripts/import-from-game-server.js --all                                     # 整份約 390 位
python scripts/convert-portraits.py                                               # 需要 pip install pillow
```
