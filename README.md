# 角色圖卡 · Character Cards

手遊風的角色圖卡展示站：3D 傾斜、全息箔、階級光框、六維雷達、多套立繪、立繪劇場。
**純靜態、零相依**——整個資料夾就是可部署的網站，不需要建置、不需要 Node 才能上線。

從 `dnd_service`（銀語守門人）的圖鑑抽出角色卡機制後重新設計而成；資料與立繪可用內附腳本從 game-server 重新匯出。

## 特色

| 區塊 | 內容 |
|------|------|
| 聚光燈 | 主角（或隨機一位）的電影感橫幅，光斑跟隨游標；可直接進劇場或翻面 |
| 卡片正面 | 全出血立繪、階級 conic 光框、UR 全息徽章、陣營徽記、星級、戰力條；hover 浮出性格與 HP/AC/ATK |
| 卡片背面 | ↻ 翻面：六維雷達、HP／AC／先攻、主攻擊、專精技能 |
| 多套立繪 | 👗 每張卡獨立切換（原裝／變裝／清涼／水手服／泳裝），也可全部一鍵切換；選擇存於 localStorage |
| 立繪劇場 | 全螢幕檢視：模糊背景＋主圖、飄浮微塵、套裝縮圖列、屬性長條＋雷達、←→ 翻閱、Esc 關閉、觸控左右滑 |
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
│  ├─ characters.js        window.CHARACTERS（頁面直接載入，file:// 也能開）
│  └─ characters.json      同內容的 JSON
├─ assets/portraits/<look>/<id>.webp         劇場用（最長邊 768）
├─ assets/portraits/<look>/<id>.thumb.webp   卡片用（最長邊 384）
├─ scripts/
│  ├─ import-from-game-server.js  從 dnd_service 匯出角色資料
│  └─ convert-portraits.py        PNG → WebP（需要 Pillow）
└─ server.js               零相依本機伺服器
```

## 資料格式

`data/characters.js` 內每位角色：

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
  "looks": ["base", "outfit", "outfit2"]   // 對應 assets/portraits/<look>/<id>.webp
}
```

要換成自己的角色，只要照這個格式寫 `data/characters.js`，並把立繪放到對應路徑即可；沒有圖的角色會顯示陣營色佔位大字。

## 從 game-server 重新匯出

```bash
node scripts/import-from-game-server.js --src S:/myagents/dnd_service_20260930   # 預設只匯出有額外套裝的 43 位＋主角
node scripts/import-from-game-server.js --all                                     # 整份約 390 位
python scripts/convert-portraits.py                                               # 需要 pip install pillow
```
