# 角色圖卡 · Character Cards

手遊風的角色圖卡展示站：3D 傾斜、全息箔、階級光框、六維雷達、多套立繪、立繪劇場。
**純靜態、零相依**——整個資料夾就是可部署的網站，不需要建置、不需要 Node 才能上線。

從 `dnd_service`（銀語守門人）的圖鑑抽出角色卡機制後重新設計而成；資料與立繪可用內附腳本從 game-server 重新匯出。

## 系列

| 系列 | 主題 | 角色 | 特點 |
|------|------|------|------|
| **銀語守門人** | 霍格華茲（`theme: arcane`） | 主角＋4 核心隊員＋39 常駐角色 | 多套立繪（原裝／變裝／清涼／水手服／泳裝）、劇場套裝列；44 人皆有完整故事（`series-silver-story-*.js` 覆蓋層），主線「牆語者」八幕與《哈利波特》正史同步而不觸碰正史 |
| **橡木鎮冒險者錄** | 龍與地下城 5e（`theme: dnd`，青銅調） | 60 位居民＋主角樂。葛拉迪亞（主角不計入 60 人上限） | 每人職業／等級／陣營縱軸，**完整角色故事**；樂是提夫林牧師，三章是市集、黃銅大門，以及第三層由卡絲止血；每位女性角色皆有 2 套以上全新裝扮＋姿態的立繪 |
| **橡木鎮名冊 · 壹～伍** | 龍與地下城 5e（`theme: dnd`，青銅調） | 257 位鎮上與鎮外的人 | 四個公會各自的崗位。三章只寫灰燼熔爐那個季節 |
| **荊薔誓約·遠征隊錄** | 龍與地下城 5e（`theme: dnd`，月銀×薔薇調） | 60 位女性冒險者（六個陣營） | 全部為全新原創立繪；六十人每位皆有 2～3 套「換裝＋換姿態」新圖；故事是橡木鎮主線的後續章節，並以「第二次下坡」擴成六十人 |
| **渡口城·萬界旅人錄** | 龍與地下城 5e 跨位面（`theme: dnd`，星紫×渡口青） | 60 位九個位面的旅人 | **九個位面＝九種畫風**：新藝術水彩、黑白墨繪一抹紅、裝飾藝術海報、賽璐璐動畫、浮世繪木刻、螢光水粉繪本、赭紅粉筆蝕刻、金底馬賽克聖像、迷幻孔版印刷；另有 Q版公仔／塔羅牌／像素／彩繪玻璃跨畫風套裝；每位女性角色皆有 2 套以上依所屬位面畫風繪製的全新裝扮＋姿態立繪 |

每個系列的非主角上限 60 位。同一個人只進一個世界：銀語守門人是返校小隊與核心 44 人；其餘角色已併入橡木鎮名冊，轉寫成橡木鎮的居民與崗位。橡木鎮的主角是玩家樂。葛拉迪亞。

### 故事線

每個系列在世界觀橫幅下方多了一塊「故事線」：把整個系列的主線拆成八幕（時間、標題、情節、登場角色），預設只露出前兩幕，點「展開全部」閱讀；每一幕底下的登場角色可直接點進劇場讀那個人的三章故事，跨系列的客串會以虛線＋↗ 標示。四條故事線首尾相接：

- **銀語守門人 · 牆語者**（1991-09-03 → 1992 春）：五位去年畢業的校友受召返校。畫像說謊、走廊消失、座標偏移、鳥避牆、火逆風、彩窗裂成一扇門……城堡的牆在「滲」出八百年的記憶。第五位建造者——一個不會魔法的工匠——設計了牆語者，守門人必須是「不聽魔法的人」，而小隊裡唯一不會施法的小風暴是八百年來第一個聽得見的人。冬至夜以羅曼家的鑰匙與布萊克伍德家的戒指開啟「設計層」，小隊選了第三種說法：「不打開，但有人聽。」正史裡那一年發生的事照常發生。
- **橡木鎮 · 灰燼熔爐甦醒**：八百年前的立約與封釘 → 湖冷了 → 四方湧入 → 契約第十三格 → 第一次下坡與穹頂坍塌（伊索德留在下面）→ 第二次下坡、核心室「問它」→ 封印之夜「回來」→ 餘燼與一封寄到渡口城的信。
- **荊薔誓約 · 熔爐遠征**：三年前「無人死亡」的勘查隊其實把名字借給了熔爐、唱了三年 → 十二個血印 → 穹頂坍塌 → 布蘭娜擴成六十格 → 黯河 → 找到燼燄詠團與活著的伊索德 → 「輪」：六十個名字一人借一天 → 每天早上。
- **渡口城 · 無名潮**：封印之夜樞紐鬆動，城每逢新月浮現 → 差值十七 → 渡口調查團 → 地獄法庭「不是他的字」與金穹「空白頁」同時展開 → 歪門市集走出第一個回來的人「回聲」→ 第一頁：城靠一個被遺忘的小亡魂當錨，無名潮是城在害怕 → 結案之夜的點名，三千七百個名字寫回。

渡口城是橡木鎮與荊薔誓約之後的第三章：灰燼熔爐重新封印後，樞紐鬆動，一座由位面碎片拼成的城市每逢新月浮現在黑湖上空，登記簿上的名字卻一個接一個消失——「無名潮」。六個初始位面之外，`series-planar-4/5/6.js` 再接上九層地獄的「契約法庭」、天界山的「金穹聖詠團」與遠域的「歪門市集」，三千七百個消失的名字在那裡匯合。種族與體型刻意打散：兔人、弗爾伯格、綠鬼婆、鴉人、幽魂小女孩、秩序構裝體、自律侏儒、牛頭人、原漿體、滑翔猿人、四臂蟲人、燈神、龜人、蕈人、熊地精……關係鏈可以跨系列跳到橡木鎮的吉茲莫、苔鬚長老與荊薔誓約的歐芮兒。劇場會以 🎨 標示每張立繪的畫風。可用 `?series=planar` 直接開啟指定系列。

橡木鎮 60 人共享同一條主線「灰燼熔爐甦醒」：矮人鐵匠索格的家族祖業、盜賊皮普的空白信、被吸血鬼咬過的酒館歌者、剛醒來的守衛構裝體吉茲莫、暗中資助的黑曜結社……`series-oakvale-2.js` 補完銀杯醫者團、蔚藍尖塔與黑曜結社，`series-oakvale-3.js` 加入赤旗傭兵團、新陣營「橡木鎮議會」與熔爐邊緣的「灰燼遺民」（鍛造人、幽魂、火元素裔孩子）。每張卡的故事互相補洞，在劇場的「關係」區點名字即可順著線索翻閱。

荊薔誓約是一支只收女性的遠征公司，受鎮議會之邀在黑曜結社之前深入古地城：隊長伊索德為了三年前失蹤的妹妹、矮人聖武士布蘭娜為了報完仇後的空洞、預言師薇莉絲為了一句「無人死亡」的誤讀、提夫林刺客妮莎拉帶著能讓半個鎮上絞架的帳冊、龍裔術士凱妲要在阿姨凱麗絲的傭兵隊之前抵達熔爐……十二條線在「穹頂坍塌」那一章交會。穹頂坍塌後布蘭娜把血印契約擴成六十格（`series-thornrose-2/3/4.js`）：月紗祭司團、鐵薔薇騎士、暮羽書院、荊野游俠各補九人，加上黯河上的「潮縛船姊會」與三年前「失蹤」卻一直在地底唱歌的「燼燄詠團」——團長正是伊索德的妹妹艾琳。

D&D 系列有專屬卡皮：四角紋飾、盾形階級徽、羊皮紙名牌、`Lv.N` 徽記、hover 顯示角色格言、背面顯示職業等級；每個系列可用 `palette` 換色（橡木鎮青銅、荊薔月銀），並以 `world.banner` 顯示寬幅世界觀橫幅。頂部分頁可切換系列，各系列獨立計算階級五分位。

## 特色

| 區塊 | 內容 |
|------|------|
| 故事線 | 系列主線八幕的時間線：前兩幕預覽／展開全部、前傳／續篇切換系列、每幕登場角色頭像可點進劇場 |
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
│  ├─ series-silver-story-*.js  銀語守門人的故事覆蓋層（44 人 story ＋ 主線 saga）
│  ├─ series-oakvale.js    橡木鎮冒險者錄（手寫，含完整故事）
│  ├─ series-thornrose.js  荊薔誓約·遠征隊錄（手寫，全原創立繪＋戰裝／慶典套裝）
│  ├─ series-planar*.js    渡口城·萬界旅人錄（拆成 6 檔，同 id 自動合併）
│  └─ series-<id>-saga.js  各系列的故事線（八幕主線）
├─ assets/originals/<series>/                原圖（唯一來源）：<id>.jpg、<id>@<look>.jpg、_banner.jpg
├─ assets/banners/<series>.webp              世界觀橫幅（16:9，最長邊 1600）
├─ assets/portraits/<look>/<id>.webp         劇場用（最長邊 768）
├─ assets/portraits/<look>/<id>.thumb.webp   卡片用（最長邊 384）
├─ scripts/
│  ├─ import-from-game-server.js  從 dnd_service 匯出角色資料
│  ├─ convert-portraits.py        game-server PNG → WebP（需要 Pillow）
│  ├─ build-art.py                assets/originals → WebP 立繪／縮圖／橫幅（需要 Pillow）
│  └─ check-data.js               資料完整性檢查（id、立繪檔、關係鏈、詞彙表、故事完整度、故事線 cast）
└─ server.js               零相依本機伺服器
```

## 資料格式

每個 `data/series-*.js` 推入一個系列（`index.html` 的 `<script>` 順序即分頁順序）：

```js
window.SERIES = window.SERIES || [];
window.SERIES.push({
  id: 'oakvale', title: '橡木鎮冒險者錄', subtitle: '龍與地下城 5e · …',
  theme: 'dnd',                       // 'dnd' 啟用金屬卡皮與故事區塊；其他值為預設卡皮
  palette: { a: '#c9954a', b: '#f0d39a', c: '#4fa58f' },   // 選用：卡皮三色（主金屬／高光／輔色）
  world: { name: '橡木鎮', blurb: '…', arc: '灰燼熔爐', banner: 'assets/banners/oakvale.webp' },  // banner 選用
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
  "looks": ["base", "outfit", "outfit2"],  // 對應 assets/portraits/<look>/<id>.webp；可用 id 見 js/lexicon.js LOOKS（含 armor 戰裝、festival 慶典）

  // ── 以下為 D&D 系列選用欄位 ──
  "class": "戰士（鍛匠）", "level": 4, "alignment": "守序善良",
  "story": {
    "quote": "鐵不會說謎。你打它一千下，它就記住一千下。",
    "background": "…", "ideal": "…", "bond": "…", "flaw": "…",
    "chapters": [{ "title": "熔爐之子", "text": "…" }, /* 建議 3 章 */],
    "relations": [{ "id": "kaelith", "text": "隔壁的鄰居，也是他唯一會借錢的人" }]   // id 先找同系列，找不到再找其他系列
  },
  "art": "新藝術水彩"   // 選用：畫風標籤；省略時取 factions[<faction>].art
}
```

要換成自己的角色，只要照這個格式新增一個 `data/series-<name>.js`、在 `index.html` 加一行 `<script>`，並把立繪放到對應路徑即可；沒有圖的角色會顯示陣營色佔位大字。

**大系列拆檔與覆蓋層**：同一個 `id` 可以 push 多次，第一次提供系列設定，之後只寫 `{ id, characters: [...] }` 追加角色；每個系列上限 60 位。若追加的角色 `id` 已存在，則視為**覆蓋層**：欄位逐一合併、`story` 淺層合併（例如 `series-silver-story-*.js` 只替既有角色補 `story`），`world` 合併、`saga` 取代。

**故事線**：`series.saga = { prev?, next?, acts: [{ when, title, text, cast: [id, …] }] }`。`prev` / `next` 為前傳／續篇的系列 id，會變成故事線標頭上的切換按鈕；`cast` 的 id 先找同系列、再找其他系列（跨系列以虛線＋↗ 顯示）。`check-data.js` 會檢查每一幕的 cast、prev/next 是否存在，並列出沒在任何一幕登場的角色。

**新增立繪**：把原圖放進 `assets/originals/<series>/`（`<id>.jpg` 為原裝、`<id>@<look>.jpg` 為其他套裝、`_banner.jpg` 為橫幅），執行 `python scripts/build-art.py`，再用 `node scripts/check-data.js` 確認沒有缺圖或斷掉的關係。

## 從 game-server 重新匯出

```bash
node scripts/import-from-game-server.js --src S:/myagents/dnd_service_20260930   # 預設只匯出有額外套裝的 43 位＋主角
node scripts/import-from-game-server.js --all                                     # 整份約 390 位
python scripts/convert-portraits.py                                               # 需要 pip install pillow
```
