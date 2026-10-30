/* 橡木鎮 · 灰燼之年 — 支線設計（甲：一到七）
 * 每條支線：三幕（起／轉／合）、成員名單、兩位核心人物（故事在 oakvale-key-stories.js 手寫）、
 * 以及其餘成員三章故事所用的「場景」與「收束」段落。
 * 段落函式的參數 h = { n: 名字, p: 他／她（非二元則為名字）, role: 崗位, where: 常見地點 }。
 */
'use strict';

module.exports = [
  /* ───────────────────────── 1 十七個名字 ───────────────────────── */
  {
    id: 'seventeen',
    title: '十七個名字',
    subtitle: '鎮上三年來失蹤的十七個人，和等他們的人',
    place: '橡木鎮 · 晨光神殿到信鴉塔',
    blurb: '失蹤名單上十七個名字。鎮長艾達用鉛筆寫在契約第十三格旁邊，封印之夜問「十七個呢」，沒有人答。這條線寫的是答不出來以後，鎮上的人怎麼把名字一個一個寫回來。',
    keys: ['gretchen_tithehammer', 'mara_epitaph'],
    members: ['gretchen_tithehammer', 'mara_epitaph', 'imani_ghostbloom', 'maevra_bonecipher', 'halvora_bannerthaw', 'raen_duskarchive', 'calliope_chalkriot', 'kalla_peakpost', 'tobin_bluescarf', 'miravel_windroost', 'ummara_stoneparry', 'orrik_flintward', 'elowen_mirrorfox', 'aislinn_mummerveil', 'garrett_wolfsign', 'nomiki_steeproot', 'winnora_dreamferry', 'ogden_kindchalk', 'sunniva_hearthfeast', 'maudra_pepperbanner', 'halvora_quorumstone', 'mei_lanternwake', 'agatha', 'zibella_opalgrin', 'prism_shutter'],
    acts: [
      {
        when: '秋 · 湖冷了之後',
        title: '刻著名字的金幣',
        text: '神殿司庫葛蕾琴清點地庫，多出一筆沒有人捐過的錢：十七枚金幣，每一枚刻著一個失蹤者的名字，摸上去是體溫。同一週，墓園的幽靈花長滿整片墓地；碑上的名字被人重刻過；信鴉塔收到一疊寄往不存在的房間的信；巨旗上多繡了幾張臉，都是今年不見的人。鎮上第一次把這些事放在同一張桌上——是在孤兒院院長阿嘉莎的廚房。桌子太小，十一個人站著。',
        cast: ['gretchen_tithehammer', 'mara_epitaph', 'imani_ghostbloom', 'miravel_windroost', 'halvora_bannerthaw', 'agatha', 'kalla_peakpost', 'tobin_bluescarf'],
      },
      {
        when: '下坡期間',
        title: '活著的那一邊',
        text: '他們去找。後巷的幻術塗鴉重播三年前沒人報案的那一夜，缺的只有加害者的臉；旅店老肖像裡多出的人影像三個失蹤的旅客；夢渡的引路人少了一個乘客，那人的夢泊在岸邊，身體在鎮上照常走了三天。他們發現十七個人不是一次不見的，是三年裡每一次有人說「不會吧」的時候少一個。老師奧格登說：那孩子看見了那條巷子，可是沒人相信他。這一次有人相信了。',
        cast: ['calliope_chalkriot', 'elowen_mirrorfox', 'winnora_dreamferry', 'ogden_kindchalk', 'garrett_wolfsign', 'raen_duskarchive', 'maevra_bonecipher', 'nomiki_steeproot', 'zibella_opalgrin', 'prism_shutter', 'aislinn_mummerveil'],
      },
      {
        when: '封印之夜之後 · 冬',
        title: '點名',
        text: '鎮長問「十七個呢」，沒有人答。三天後，灶屋替「還在等開飯的那一桌」留了位，百人鍋還是只有九十九份。阿嘉莎說：那就點名。冬至前夜，晨光神殿前庭，司庫把十七枚金幣排成一列，碑語史家唸一個名字，就有一個記得那個人的人站出來答「在」——替他答。第十七個名字唸完，山上那第二盞燈亮了一下。神父把這份名單寫進第一百五十七封信，寄到新月夜才浮現的城。這條線在這裡交給另一本冊子。',
        cast: ['edda', 'le_gladia', 'gretchen_tithehammer', 'mara_epitaph', 'agatha', 'sunniva_hearthfeast', 'maudra_pepperbanner', 'ambrose', 'ummara_stoneparry', 'orrik_flintward', 'mei_lanternwake', 'echo'],
      },
    ],
    ch1: '多出來的那一個',
    intro: [
      (h) => `${h.n}認得十七個名字裡的一個。不是親人，是每天會點頭的那種人。那個人不見的那天，${h.n}說了一句「不會吧」，之後三年都在為這三個字還債。`,
      (h) => `失蹤名單貼在議事廳門外三年，紙黃了三次。${h.n}每次經過都會看一眼，看的永遠是同一行。`,
      (h) => `${h.n}做的是${h.role}。這份工作教${h.p}一件事：東西不見了，先數，再找。人也是。`,
    ],
    bond: [
      () => '十七個名字裡的一個。不說是誰。',
      () => '阿嘉莎的廚房桌——第一次把所有怪事放在同一張桌上的地方。',
      () => '那枚刻著名字、摸上去還有體溫的金幣。',
    ],
    quotes: [
      '「不見了」和「死了」是兩件事。前者還欠人一個答案。',
      '數到十六的時候我停了很久。第十七個是我認識的。',
      '我不替誰哭。我替誰點名。',
      '等一個人最難的不是等，是別人叫你別等了。',
      '名字被磨掉的碑，底下的石頭還記得筆畫。人也一樣。',
      '「不會吧」——我說過這三個字。從那天起我不再說。',
    ],
    scene: [
      ['同一張桌', (h) => `阿嘉莎的廚房只有一張桌，那晚擠了十一個人。${h.n}把自己手上那件怪事放上去——做${h.role}才看得出來的那種——然後聽別人的。十一件事拼起來，是同一條巷子。`],
      ['第三年', (h) => `${h.n}翻出三年前的紀錄。那時${h.p}在${h.where}，有人說少了一個人，${h.n}說「不會吧」。這次${h.n}把那一頁撕下來，釘在名單旁邊。`],
      ['相信', (h) => `那個孩子說他看見了那條巷子。三年來沒人信。${h.n}蹲下來，用${h.role}的方式問了三個只有真的看見過的人才答得出的問題。孩子全答對了。${h.n}站起來說：帶我去。`],
      ['泊在岸邊', (h) => `有一個人的夢泊在岸邊，身體在鎮上照常過日子。${h.n}去看了那個「身體」：買菜、點頭、付錢，就是不叫任何人的名字。${h.n}叫了${h.p}的名字三次。第三次，那人哭了，自己不知道為什麼。`],
    ],
    close: [
      ['在', (h) => `冬至前夜，碑語史家唸到那個名字。${h.n}站出來，說「在」。替${h.p}答的。神殿前庭很冷，沒有人動。回到${h.where}之後，${h.n}把那個名字寫在自己每天最先看見的地方。`],
      ['一百五十七', (h) => `神父寫第一百五十七封信的時候，${h.n}在旁邊，替那個名字補了一句別人不知道的事：左撇子、怕狗、欠${h.n}一頓飯。神父一字不改地寫了進去。`],
      ['第二盞燈', (h) => `點名到第十七個，山上那第二盞燈亮了一下。${h.n}看見了。${h.n}沒有說「他回來了」，也沒有說「他走了」，只是把${h.role}的事做完，然後三年來第一次睡了整夜。`],
      ['留著', (h) => `鎮慢慢學會沒有熔爐的日子。${h.n}的${h.where}留著一個位子、一只碗、一行名字。有人問為什麼不收起來。${h.n}說：不見了和死了是兩件事。`],
    ],
    rel: {
      gretchen_tithehammer: (h) => `十七枚刻名的金幣在她手上。${h.n}認得其中一枚上的名字`,
      mara_epitaph: (h) => `碑上被磨掉的名字，她一筆一筆拓回來。${h.n}給了她其中一個筆畫`,
    },
  },

  /* ───────────────────────── 2 王都的另一半 ───────────────────────── */
  {
    id: 'capital',
    title: '王都的另一半',
    subtitle: '伯爵要一支不會死的軍團；王都裡有人要一份不會改的紀錄',
    place: '王都 · 宮廷、歌劇院、檔案館、法庭',
    blurb: '橡木鎮的錢是從王都來的。伯爵透過一位樂師把金幣遞進醉龍旅店，想要一支構裝軍團。這條線寫王都那一端：畫記裡年年變年輕的貴族、用印早於國王抵達的詔書、被官方銷毀的劇本、從地圖上抹掉的一整條工匠街——以及那些拒絕把紀錄改掉的人。',
    keys: ['theodora_edictbearer', 'calanthe_peacockquill'],
    members: ['theodora_edictbearer', 'calanthe_peacockquill', 'feodora_sablecrown', 'canto_vaultwarden', 'seraphine_cobblequill', 'darian_crownsunder', 'vittoria_goldenaria', 'theren_quillmask', 'pellonia_featherwrit', 'aelric_verdechef', 'wrenna_cupbearer', 'ondine_courtmirror', 'elian_greenbow', 'belisent_glassminuet', 'sylphra_ribbonvault', 'hark_finesew', 'opal_manyfaces', 'grixa_stagecall', 'roland_mirthmantle', 'samira_goldvoice', 'pax_quietwhisker', 'lucrecia_velvetaccord', 'kirrena_truceweave', 'rosalind_dowerseal', 'elysia_frostlace', 'cindra_kilnveil', 'ithanne_truceblade', 'verda_redbrief'],
    acts: [
      {
        when: '兩個月前 · 四方湧入',
        title: '年輕一歲的伯爵',
        text: '宮廷畫記官卡蘭希比對三十年的授勳畫記：同一位伯爵在每一幅裡都年輕一歲，最新那幅裡，他還沒有出生。同一個月，詔函官希奧朵菈拒絕宣讀一份王詔——印是真的，用印時間卻比國王抵達首都早了兩天。歌劇院的首席拿到一份被銷毀的劇本；諷刺劇作家寫的暴君每晚從劇本裡刪掉一個角色，被刪掉的那位議員今晨失蹤。王都的另一半開始發現：有人在改紀錄，改得很熟練，而且改了很久。',
        cast: ['calanthe_peacockquill', 'theodora_edictbearer', 'vittoria_goldenaria', 'theren_quillmask', 'feodora_sablecrown', 'canto_vaultwarden', 'aveline'],
      },
      {
        when: '一個月前 · 第十三格',
        title: '被抹掉的工匠街',
        text: '編年史家瑟拉芬找到十二位老居民，他們都記得一條被官方地圖徹底抹去的工匠街——八百年前替鐵顎氏造封釘的匠人住的地方。檔案守衛坎托打開一只自己敲門的封存箱，裡面每一份檔案都記著同一場被全城遺忘的政變。宴席上，試毒官試出一種說謊時才發作的毒；禮儀鏡官發現兩位外邦使節自稱同一人；大使薩米菈把兩個派系的條件都攤給橡木鎮來的人看。伯爵的錢、結社的密約、構裝軍團——拼起來只有一句話：有人想讓熔爐再開一次，而且不想留下紀錄。',
        cast: ['seraphine_cobblequill', 'canto_vaultwarden', 'darian_crownsunder', 'wrenna_cupbearer', 'ondine_courtmirror', 'samira_goldvoice', 'pax_quietwhisker', 'lucrecia_velvetaccord', 'kirrena_truceweave', 'elian_greenbow', 'belisent_glassminuet', 'sylphra_ribbonvault'],
      },
      {
        when: '封印之夜 · 王都同一晚',
        title: '照原稿演出',
        text: '橡木鎮封印那一夜，王都的歌劇院照原稿演出。維多莉雅唱的是被銷毀的那一版，觀眾席的「贊助人」臉白了；樂師艾芙琳彈了一整首用密約譜成的曲子。幕間，詔函官站上台階，宣讀的不是詔書，是三十年畫記的年份對照表。彩窗在整場演出裡愈變愈黑——那片玻璃只在有人說謊時變深。第二天，伯爵的名字沒有從任何紀錄裡消失，這是王都三十年來第一次。工匠街回到了地圖上，一條虛線，旁邊註明：待考。',
        cast: ['vittoria_goldenaria', 'aveline', 'theodora_edictbearer', 'calanthe_peacockquill', 'cindra_kilnveil', 'elysia_frostlace', 'grixa_stagecall', 'roland_mirthmantle', 'opal_manyfaces', 'hark_finesew', 'ithanne_truceblade', 'verda_redbrief', 'rosalind_dowerseal', 'pellonia_featherwrit', 'aelric_verdechef'],
      },
    ],
    ch1: '不對的那一處',
    intro: [
      (h) => `${h.n}在王都做${h.role}。王都教人兩件事：紀錄比人活得久，和改紀錄的人比寫紀錄的人多。${h.n}選了寫的那邊。`,
      (h) => `${h.n}是跟著伯爵的錢一路來到橡木鎮的——不是為了錢，是為了看清那筆錢想買什麼。`,
      (h) => `在王都，${h.role}是一份不會被記住的工作。${h.n}做了很多年，記住了很多本來會被忘掉的事。`,
    ],
    bond: [
      () => '一份沒有被改過的原稿。不管那是劇本、畫記、帳冊還是詔書。',
      () => '被地圖抹掉的工匠街。十二個老人還記得它的路面是什麼顏色。',
      () => '伯爵的晚宴那一夜，所有沒有說謊的人。',
    ],
    quotes: [
      '紀錄不會說謊。改紀錄的人才會。',
      '在王都，最危險的不是知道太多，是記得太準。',
      '我不美化任何一方。這是我唯一的美德，也是我唯一的罪名。',
      '權力改得了年份，改不了灰塵落下的厚度。',
      '照原稿。一個字都不改。這就是我的反抗。',
      '他們抹掉一條街的時候，忘了街上住的人會老，老人會說話。',
    ],
    scene: [
      ['對照表', (h) => `${h.n}拿到了卡蘭希的畫記年份對照表，把${h.role}這些年經手的紀錄一行一行對上去。對不上的地方有七處。七處都跟伯爵有關。${h.n}把七處抄成一張紙，貼身放著。`],
      ['晚宴', (h) => `伯爵的晚宴，${h.n}在場——做${h.role}的人在那種場合通常沒有人看。${h.n}看見樂師彈了什麼、試毒官的臉色、彩窗變成什麼顏色。${h.n}什麼都沒說，只是記住了座位表。`],
      ['十二個老人', (h) => `瑟拉芬找老居民作證的時候，${h.n}負責其中三位。三個人分別描述工匠街的路面：灰石、灰石、灰石，中間有一道黃銅的排水槽。沒有串供的可能，他們互不相識。${h.n}寫下來，簽了自己的名字。`],
      ['封存箱', (h) => `坎托打開那只自己敲門的箱子時，${h.n}在旁邊。檔案記的是一場沒有人記得的政變，日期在八百年前封釘之後第三年。${h.n}讀到一個名字，跟現在的伯爵同姓。`],
    ],
    close: [
      ['一條虛線', (h) => `工匠街回到地圖上，一條虛線，註明「待考」。${h.n}知道那條虛線是誰畫的——是${h.n}作證的三個老人之一，用他的手杖頭量出來的。${h.n}回到${h.where}，把自己經手的那份紀錄也加了一條虛線。`],
      ['沒有消失', (h) => `第二天早上，伯爵的名字還在所有紀錄裡。三十年來第一次。${h.n}做${h.role}做了那麼久，第一次覺得這份工作有重量。重量不大，像一枚金幣。`],
      ['座位表', (h) => `事後有人問起那一夜，${h.n}只交出一張座位表。誰坐在哪裡、誰在第幾幕離席、誰的酒杯沒有動。${h.n}說：我不下結論，我只記座位。`],
      ['原稿', (h) => `維多莉雅照原稿演完，後台沒有人說話。${h.n}把自己那份——${h.role}的那份原稿——交給了她：「妳下次演這個。」然後回了橡木鎮。王都的事沒有結束，但這一次有了底稿。`],
    ],
    rel: {
      theodora_edictbearer: (h) => `拒絕宣讀偽詔的詔函官。${h.n}的紀錄是她台階上那份對照表的一行`,
      calanthe_peacockquill: (h) => `三十年畫記裡抓出年份的畫記官。${h.n}替她對過其中幾幅`,
    },
  },

  /* ───────────────────────── 3 只有去程的路 ───────────────────────── */
  {
    id: 'roads',
    title: '只有去程的路',
    subtitle: '北境雪山、南方鹽道、邊境三村——所有從橡木鎮走出去的路',
    place: '北境雪線 · 南方赤地鹽道 · 邊境三村',
    blurb: '官道中央一夜之間插了一塊路標，指向一條只有去程、沒有回程的路。北方的山口連崩九次，每次埋掉同一支商隊的補給；南方的鹽道商隊全員平安，卻都記得有一輛不存在的第七車；三座邊境村莊按時繳稅，巡騎兩年沒能在地圖上找到它們。這條線寫走出去的人，和把路修回來的人。',
    keys: ['cressida_marchwarden', 'kora_ironmane'],
    members: ['cressida_marchwarden', 'kora_ironmane', 'haru_frostmap', 'durik_snowpath', 'revna_slowfrost', 'hravna_slidehorn', 'wenna_icefathom', 'ekaterin_snowtribute', 'maris_thornford', 'torvenna_rampartvow', 'nyra_dustwhisker', 'oru_woolcloak', 'astrid_griffonhand', 'nadira_amberroute', 'okoya_longstride', 'sabriya_saltroute', 'sahra_duneward', 'ebriel_springdowse', 'ghoran_redmesa', 'krix', 'fionnula_wingfurrow', 'zephrine_highsignal', 'maeve_roadsteel', 'ithra_trackthorn', 'asterion_sunroad'],
    acts: [
      {
        when: '秋 · 湖冷了',
        title: '牲口不肯往北',
        text: '最先知道的是牲口。羊群不肯往北，飛獸不肯往北飛，馱獸在三里外停下，說那裡有琥珀香卻沒有樹。雪原製圖師量了三次，北面的山脊線和舊圖差了半里。邊境遊騎隊長克蕾希妲拿出名冊：三座村子按時繳稅，她的巡騎兩年沒找到它們。南邊，鹽道商隊全員平安抵達，每個人都記得旅途中有第七輛車，車轍還在，車不在。驛道巡守寇菈帶回一塊路標——昨夜插在官道中央，指向一條只有去程的路。',
        cast: ['oru_woolcloak', 'astrid_griffonhand', 'nadira_amberroute', 'haru_frostmap', 'cressida_marchwarden', 'sabriya_saltroute', 'kora_ironmane', 'okoya_longstride'],
      },
      {
        when: '下坡期間',
        title: '走那條路的人',
        text: '有人得走那條路。北境這一組：高山嚮導說今天山路不能走，所以他帶路；雪崩預警守說這條路今年崩了九次，所以她先上；緩時凍原巡守走進飄雪懸停的區域去帶一個孩子出來，裡面每過一息，外面是一天。南方那一組跟著水脈走，水脈的終點在沙漠深處一座敵對邊塞下方；賞金獵人克里克斯沿路數「我們」少了幾個。他們在三村的位置找到了三村——村子在，人在，只是他們的「回程」被人拿走了：每個人都記得出發，沒有人記得為什麼要回來。',
        cast: ['durik_snowpath', 'hravna_slidehorn', 'revna_slowfrost', 'wenna_icefathom', 'ebriel_springdowse', 'sahra_duneward', 'krix', 'nyra_dustwhisker', 'ghoran_redmesa', 'maris_thornford', 'ekaterin_snowtribute', 'asterion_sunroad', 'ithra_trackthorn'],
      },
      {
        when: '封印之夜之後 · 冬',
        title: '把回程修回來',
        text: '封印之夜，路標自己倒了。寇菈把它扛回鎮上，在背面刻了「回程」兩個字，重新插回官道中央，方向朝著橡木鎮。北境山口在第十次崩塌前被赤旗的號角聲喊停——那個五年來不存在的音也傳到了這裡。三村的人一個一個想起來為什麼要回來：有人家裡的狗老了，有人欠麵包店的錢，有人只是想看一眼湖。克蕾希妲在名冊上把三村的名字描深，旁邊寫：找到了。邊民的損失從來不是可接受的代價。北方的盾女尤倫把一枚雪熊牙寄回了她的山。',
        cast: ['kora_ironmane', 'cressida_marchwarden', 'jorunn', 'sunniva', 'torvenna_rampartvow', 'maeve_roadsteel', 'zephrine_highsignal', 'fionnula_wingfurrow', 'gra'],
      },
    ],
    ch1: '路上少了的',
    intro: [
      (h) => `${h.n}在路上過日子。做${h.role}的人知道一件事：路不會迷路，是人把回程弄丟了。`,
      (h) => `橡木鎮往外有三條路：北邊上雪線，南邊下鹽道，東邊到三村。${h.n}走的是其中一條，走了很多年，今年第一次覺得路在看${h.p}。`,
      (h) => `${h.n}是外地人。這件事在橡木鎮不重要——那年秋天以後，所有的路都通向這裡，所有人都是外地人。`,
    ],
    bond: [
      () => '官道中央那塊路標。背面後來刻了「回程」兩個字。',
      () => '一支把慢的人留在最後、而最後那個人一定會到的隊伍。',
      () => '三村名冊上被描深的三個名字，旁邊寫：找到了。',
    ],
    quotes: [
      '路只有去程的時候，你就是回程。',
      '我寧可折返。折返的人才有下一次。',
      '邊民的損失，從來不是「可接受的代價」。',
      '雪會記得每一個走過的人。問題是人不記得雪。',
      '走得慢的人在最後。但最後那個人，一定會到。',
      '出發很容易。要記得為什麼回來，才難。',
    ],
    scene: [
      ['第七輛車', (h) => `${h.n}替商隊數車。六輛。所有人都說七輛。${h.n}照${h.role}的規矩重數一遍，六輛。然後${h.n}看見第七道車轍——很新，上面沒有雪。${h.n}跟著它走了半里，車轍在一塊路標前停住。`],
      ['懸停的雪', (h) => `緩時區外面，${h.n}負責計時。裡面每過一息，外面是一天。${h.n}等了九天，用${h.role}的方式替裡面的人留下記號：每天在雪線上插一根棍子。第九根插下去的時候，有人牽著一個孩子走出來，問：今天幾號。`],
      ['三村', (h) => `他們在地圖上找不到三村，${h.n}換了個辦法：不找村，找路。路上有馬糞、有車轍、有小孩掉的手套。${h.n}沿著手套走到一座村子門口，門口的人說：你們終於來了。我們一直不知道怎麼回去。`],
      ['數「我們」', (h) => `南邊那一組，${h.n}每天晚上數人。十二、十二、十二、十一。${h.n}沒有慌，照${h.role}的訓練先確認不是數錯，然後倒著走了半天，在水脈邊找到第十二個人——${h.p}坐在那裡，說不記得自己要去哪裡。${h.n}說：跟我走，我記得。`],
    ],
    close: [
      ['回程', (h) => `路標重新插回官道中央，背面刻著「回程」。${h.n}經過的時候摸了一下那兩個字。回到${h.where}之後，${h.n}把${h.role}的路線圖重畫了一遍——這一次每條路都畫了兩個箭頭。`],
      ['想起來', (h) => `三村的人一個一個想起來為什麼要回來。${h.n}記下他們說的理由：狗老了、欠錢、想看湖。沒有一個理由是大的。${h.n}想起自己的理由，也不大。於是${h.n}也回來了。`],
      ['第十次', (h) => `山口第十次崩塌之前，號角響了。${h.n}在山腳下聽見，那是五年來不存在的音。雪停在半空一息，然後落回去。${h.n}把這件事寫進${h.role}的紀錄，寫得很短：「第十次，沒有崩。」`],
      ['兩個箭頭', (h) => `冬天，${h.n}替新來的人指路。指完去程，${h.n}總會多說一句回程怎麼走。沒有人問為什麼。${h.n}也不解釋，只是覺得做${h.role}的人應該把路講完整。`],
    ],
    rel: {
      cressida_marchwarden: (h) => `兩年找不到三村的遊騎隊長。${h.n}走的那條路，是她名冊上的一行`,
      kora_ironmane: (h) => `把路標扛回來、刻上「回程」的驛道巡守。${h.n}是第一批走回程的人`,
    },
  },

  /* ───────────────────────── 4 鹽港與沉船 ───────────────────────── */
  {
    id: 'harbor',
    title: '鹽港與沉船',
    subtitle: '黯河流到海的地方；三年前失蹤的船隊，和比名冊多出來的十一具遺體',
    place: '黯河下游 · 鹽港',
    blurb: '黑湖的水順著黯河流到鹽港入海。三年前一支船隊在那裡失蹤，珊瑚全朝同一個方向倒伏；今年，船照著一顆不存在的導航星準時抵達不存在的港口，沉船裡的遺體比乘客名冊多了十一具，繩結是死者才會打的樣式。這條線寫海留下了什麼，和它願意還回來的那一部分。',
    keys: ['bellamira_brinehalt', 'nualith_hullshadow'],
    members: ['bellamira_brinehalt', 'nualith_hullshadow', 'aelor_saltsail', 'koru_wreckwhisper', 'lyris_reefblade', 'syrentha_coralpike', 'helga_deepcurrent', 'halvenne_leadline', 'varkesh_beaconcrest', 'neris_wavecompass', 'sinaia_sextantveil', 'saoirse_coralvow', 'quenaria_tidepavilion', 'tamsyn_wavecairn', 'pelagia_deepcurrent', 'halvar', 'tide_cerulean', 'brakka_keelhand', 'odessa_tumblerlock', 'ssarik_rivercoin'],
    acts: [
      {
        when: '秋 · 湖冷了',
        title: '不存在的港口',
        text: '黑湖結冰那週，鹽港的燈塔收到來自陸地方向的海難燈號，用的是一艘沉沒五十年的船才知道的密碼。領航員的海圖自己滲水，新畫出一條穿過陸地、直達廢棄礦坑的洋流；天文導航師的星圖多出一顆導航星，所有依它航行的船都準時抵達了不存在的港口。打撈潛者努雅莉絲在一艘沉船裡數到的遺體，比乘客名冊多了整整十一具。她拒絕繼續作業：「還有遺體沒有安置。」',
        cast: ['varkesh_beaconcrest', 'neris_wavecompass', 'sinaia_sextantveil', 'nualith_hullshadow', 'koru_wreckwhisper', 'halvenne_leadline', 'maren'],
      },
      {
        when: '一個月前 · 第十三格',
        title: '死者打的結',
        text: '帆索長貝拉米菈拒絕了一趟高價航程，委託船上的繩結全是死者才會打的樣式。她去看了那艘船。船上沒有人，艙底有一扇刻著古地城徽記的石門，縫裡吹出乾燥的冷風。海盜船長哈瓦把黃銅義肢往桌上一放：「三年前那支船隊，是我送出港的。」珊瑚礁復育醫者帶他們潛入禁區礁盤——珊瑚倒伏的方向，正是黯河上游。船隊沒有沉在海裡。它逆著河，被什麼拉進了湖底。',
        cast: ['bellamira_brinehalt', 'lyris_reefblade', 'halvar', 'saoirse_coralvow', 'syrentha_coralpike', 'helga_deepcurrent', 'aelor_saltsail', 'odessa_tumblerlock', 'halla'],
      },
      {
        when: '封印之夜之後 · 冬',
        title: '撐桿碰到底',
        text: '封印之夜，渡船夫的撐桿第一次碰到湖底。同一刻，鹽港外海的巨獸全部回到千年航線上，燈塔的光重新照到對岸。船隊回來了——不是船，是十一具遺體順著黯河漂到鹽港，每一具都繫著一個活人才打得出的結。努雅莉絲一具一具安置，名冊終於對上。黑水族的使節團從水下浮起，說要一位「陸上的中立見證人」：見證海還回來的，和海留下的。貝拉米菈接了那一趟航程，船上十二個人，她喊的節奏比平常慢一拍，給那十一個名字留的。',
        cast: ['garrick', 'helga_deepcurrent', 'varkesh_beaconcrest', 'nualith_hullshadow', 'quenaria_tidepavilion', 'bellamira_brinehalt', 'tamsyn_wavecairn', 'pelagia_deepcurrent', 'tide_cerulean', 'brakka_keelhand', 'ssarik_rivercoin', 'seren'],
      },
    ],
    ch1: '水說的話',
    intro: [
      (h) => `${h.n}是順著黯河上來的——鹽港的人在湖變冷之前就知道有事，因為海先變了。`,
      (h) => `在鹽港做${h.role}，等於替海記帳。海借走什麼、還回什麼，${h.n}都記著。三年前那筆帳一直沒平。`,
      (h) => `${h.n}不信預兆，信海流。那年秋天海流說的話，${h.n}聽懂了，所以往上游走。`,
    ],
    bond: [
      () => '三年前從鹽港出發、再沒有回來的那支船隊。',
      () => '黯河。它把湖裡的事帶到海，也把海裡的事帶回湖。',
      () => '一個活人才打得出的結。',
    ],
    quotes: [
      '海不會騙人。騙人的是海圖。',
      '還有遺體沒有安置，就不叫打撈，叫打擾。',
      '繩結會說話。死者打的結，和活人打的不一樣。',
      '我信海流，不信羅盤。羅盤是人做的。',
      '船隊沒有回來。但海把名字一個一個還了。',
      '燈塔不是給看得見的人點的。',
    ],
    scene: [
      ['名冊', (h) => `努雅莉絲說遺體比名冊多十一具，${h.n}第一個信。做${h.role}的人數東西從不數錯。${h.n}替她把十一具的特徵一一記下：左手缺指、頸上有鹽痂、懷裡抱著一塊黑湖的石頭。`],
      ['逆流', (h) => `他們沿著黯河逆流而上，${h.n}在船上。每過一道河灣，${h.n}用${h.role}的辦法量一次水——愈往上愈冷，愈冷愈像海。到了湖口，${h.n}說：這不是河水。這是三年前的海水，一直沒有走。`],
      ['禁區礁盤', (h) => `莎綺絲帶他們潛進禁區，${h.n}負責在水面計時。珊瑚全朝一個方向倒，${h.n}在船上拿${h.role}的工具對了一下方位：黯河上游。${h.n}把這個方位寫在手背上，怕自己上岸以後不信。`],
      ['哈瓦的義肢', (h) => `哈瓦說三年前的船隊是他送出港的，${h.n}當時在場——${h.n}記得那天的風向。${h.n}把風向告訴哈瓦，哈瓦沉默很久，說：那風不對。那天不該出港。`],
    ],
    close: [
      ['對上了', (h) => `十一具遺體順著黯河漂回鹽港，名冊終於對上。${h.n}在碼頭上，替其中一具認了身分——用${h.role}才知道的細節。認完，${h.n}走到水邊，第一次對海說了一句話。`],
      ['慢一拍', (h) => `貝拉米菈的船出港時喊的節奏慢一拍。${h.n}在船上，跟著那個節奏做自己的事。慢的那一拍沒有人划，${h.n}知道那是給誰留的。`],
      ['見證', (h) => `水下的使節團要一位陸上的中立見證人。${h.n}去了，用${h.role}的身分。見證的內容只有兩行：海還回來的，和海留下的。${h.n}簽了名，覺得這兩行比一輩子的工作都重。`],
      ['照到對岸', (h) => `燈塔的光重新照到對岸那一夜，${h.n}在${h.where}。${h.n}沒有歡呼，只是把${h.role}的東西收好，然後想起三年前那天的風向。這一次風是對的。`],
    ],
    rel: {
      bellamira_brinehalt: (h) => `拒絕了死者打結的那艘船、後來自己開船送十一個名字回海的帆索長。${h.n}在她的船上`,
      nualith_hullshadow: (h) => `數到遺體比名冊多十一具就停手的打撈潛者。${h.n}替她記下其中幾具的特徵`,
    },
  },

  /* ───────────────────────── 5 黑湖之下 ───────────────────────── */
  {
    id: 'lake',
    title: '黑湖之下',
    subtitle: '湖沒有對岸；擺渡人拒載沒有影子的乘客',
    place: '黑湖 · 霧渡口 · 水閘',
    blurb: '盛夏的黑湖結了冰，湖底比湖面低十七度，湖心有一處撐桿碰不到底、水卻是暖的。這條線寫湖邊的人：拒載沒有影子乘客的擺渡人、只走一趟的魂流領航員、把水閘全關了水位還在降的運河水工、祭了三天也淨不乾淨的河川祭司。湖沒有對岸——但對岸那盞燈三夜都在同一個位置亮。',
    keys: ['neralis_mistgate', 'vaska_soulcurrent'],
    members: ['neralis_mistgate', 'vaska_soulcurrent', 'ulvana_fenpole', 'naliska_sluicemark', 'delmara_locktide', 'mosshell_caliper', 'naia_tidewhisper', 'lyria_riverprayer', 'solenne_beacongear', 'marlow_beacon', 'nerissa_pearlnet', 'kessik_mirepath', 'coralia_gardentide', 'nell_riverhelm', 'tobin_reedrudder', 'emberleaf_verse'],
    acts: [
      {
        when: '秋 · 湖冷了',
        title: '沒有對岸',
        text: '濃霧裡，擺渡人奈菈里斯拒載一群沒有影子的乘客，他們說來自湖對岸——這座湖沒有對岸。河船船長把望遠鏡遞過來：對岸那盞燈三夜都在同一個位置亮。運河水工把所有水閘關了，水位還在降，像被地下某張嘴吞飲；運河工程師算了三遍，少了一成的水沒有流去該去的地方。採珠人浮上來，掌心一顆帶黑紋的珠，只說了三個字：湖底有事。河川祭司祭了三天，水淨不乾淨——不是髒，是太舊。',
        cast: ['neralis_mistgate', 'nell_riverhelm', 'delmara_locktide', 'mosshell_caliper', 'nerissa_pearlnet', 'lyria_riverprayer', 'garrick', 'maren'],
      },
      {
        when: '下坡期間',
        title: '只走一趟',
        text: '魂流領航員瓦絲卡指著逆流而上的魂流：亡者正被人押著往回送。她願意載人去攔，但只走一趟。船上有擺渡人、沼澤引路人、燈塔工程師和一個拿著蘆葦稈的詩人。湖心那處暖水下面是一扇門，門後是熔爐的「樞紐」——八百年來第一次有人從上面看見它。沒有影子的乘客就排在門前，他們不是鬼，是被熔爐借走影子的活人，三年來一直想回岸上。瓦絲卡只走一趟：來的一趟載人，回的一趟載影子。',
        cast: ['vaska_soulcurrent', 'neralis_mistgate', 'kessik_mirepath', 'ulvana_fenpole', 'solenne_beacongear', 'emberleaf_verse', 'naia_tidewhisper', 'naliska_sluicemark', 'coralia_gardentide'],
      },
      {
        when: '封印之夜 · 湖邊',
        title: '撐桿碰到底',
        text: '那一夜湖底的水從零下三度一度一度暖回來，渡船夫的撐桿第一次碰到底：「門關了。」沒有影子的人在岸邊一個一個接回自己的影子，接回來的時候會打一個冷顫。燈塔的光重新照到對岸——對岸還是沒有，但光有地方落了。只有一件事沒有結束：樞紐鬆動了。從此每逢新月，黑湖上空會浮現一座城。擺渡人奈菈里斯在霧渡口掛了一塊新木牌，上面寫：新月夜，照載。',
        cast: ['garrick', 'neralis_mistgate', 'vaska_soulcurrent', 'solenne_beacongear', 'marlow_beacon', 'lyria_riverprayer', 'tobin_reedrudder', 'nell_riverhelm', 'corvin'],
      },
    ],
    ch1: '湖說的話',
    intro: [
      (h) => `${h.n}靠湖吃飯。湖冷下來的那天，${h.n}比鎮上任何人都早知道——做${h.role}的，手在水邊停得比平常久。`,
      (h) => `黑湖沒有對岸。${h.n}知道，鎮上每個人都知道。所以當對岸亮起一盞燈，${h.n}沒有說「不可能」，只是去看。`,
      (h) => `${h.n}的${h.role}是跟水打交道的工作。水不說謊，水只是太舊——那年秋天，湖裡的水舊了八百年。`,
    ],
    bond: [
      () => '霧渡口那塊木牌。先寫「停航」，後來改成「新月夜，照載」。',
      () => '湖心那一處撐桿碰不到底、水卻是暖的地方。',
      () => '一個接回自己影子時打的冷顫。',
    ],
    quotes: [
      '湖沒有對岸。對岸有燈，是另一回事。',
      '沒有影子的不一定是鬼。有時候只是影子被借走了。',
      '我只走一趟。去的時候載人，回來載他們丟掉的東西。',
      '水不髒。水只是太舊。',
      '撐桿碰到底的那一刻，我才知道自己撐了多少年。',
      '新月夜，照載。',
    ],
    scene: [
      ['排在門前', (h) => `湖心的門前排著沒有影子的人。${h.n}在船上認出其中一個——三年前常來${h.where}的。${h.n}叫了他的名字，他轉過來，說：我一直想回去，可是沒有影子的人上不了岸。${h.n}說：我帶你上。`],
      ['少的那一成', (h) => `水少了一成，沒有流去該去的地方。${h.n}用${h.role}的辦法追了三天，追到湖心暖水那一處。水是從那裡往下走的——下面有東西在喝。${h.n}把這件事告訴渡船夫，渡船夫說：我知道。我撐桿碰不到底。`],
      ['一趟', (h) => `瓦絲卡說只走一趟，${h.n}上了船。船上沒有人說話，${h.role}的工具放在膝上。到了門前，${h.n}負責把岸上的名字一個一個唸出來——唸到的，就從隊伍裡走出來上船。唸完，船滿了。`],
      ['太舊', (h) => `祭司說水不髒，只是太舊。${h.n}舀了一碗，用${h.role}的方式看了很久。水裡有八百年前的灰。${h.n}把那碗水倒回湖裡，說：那就讓它回去。`],
    ],
    close: [
      ['冷顫', (h) => `沒有影子的人在岸邊接回影子，接回來會打一個冷顫。${h.n}扶著其中一個。那人顫完，低頭看自己的影子，看了很久，然後問${h.n}：現在幾年了。${h.n}說了。那人說：我欠了三年的帳。`],
      ['有地方落', (h) => `燈塔的光重新照到對岸——對岸還是沒有，但光有地方落了。${h.n}在${h.where}看見那道光，第一次覺得做${h.role}這件事有盡頭，而且盡頭是好的。`],
      ['照載', (h) => `霧渡口的木牌換成「新月夜，照載」。${h.n}看見的時候笑了一下。樞紐鬆了，城會浮上來，湖邊的人沒有一個打算搬走。${h.n}也不搬。`],
      ['碰到底', (h) => `撐桿碰到底那一刻，${h.n}在岸上。渡船夫沒有歡呼，只說「門關了」。${h.n}把${h.role}的東西收進袋子，坐在水邊坐到天亮。水暖回來的速度很慢，一度一度的，像有人在數。`],
    ],
    rel: {
      neralis_mistgate: (h) => `拒載沒有影子乘客的擺渡人。${h.n}後來跟他一起把影子載回來`,
      vaska_soulcurrent: (h) => `只走一趟的魂流領航員。${h.n}在那一趟船上`,
    },
  },

  /* ───────────────────────── 6 樹靈的根 ───────────────────────── */
  {
    id: 'forest',
    title: '樹靈的根',
    subtitle: '莫雯撐了八百年；森林的人說「我們來換妳」',
    place: '橡木林深處 · 妖精岔路 · 地脈搖籃',
    blurb: '八百年前樹靈莫雯把根扎進封不住的縫裡，本來只打算撐到矮人想出辦法。矮人都死了，她就一直撐。這條線寫森林這一邊：樹心規律敲擊像有人求救的老橡樹、被人架上抽取裝置的地脈搖籃、整夜閃著「別過來」的螢群、撕毀妖精契約後循著足跡追來的四季——以及最後把手放在根上說「我們來換妳」的那些人。',
    keys: ['elowyn_fernward', 'thessaly_briarcrown'],
    members: ['elowyn_fernward', 'thessaly_briarcrown', 'caelan_oakstride', 'sivienne_leycradle', 'evanthe_starseed', 'thalia_mossstep', 'brunna_rootmantle', 'rhoswen_deepglyph', 'sylwen', 'orena_grasscrown', 'josselyn_fireflypageant', 'faelith_rainbough', 'petrichor_drop', 'adalind_firebreak', 'nimue_frostfern', 'lyria', 'kaela_grimtrail', 'vexa_snarebright', 'rinna_moonfang', 'jules_roseward', 'mira_honeybell', 'oswin_hiveward', 'vondrelle_barkbasket'],
    acts: [
      {
        when: '秋 · 湖冷了',
        title: '樹心在敲',
        text: '伐木工頭鋸開一棵橡樹，鋸口滲出冷的灰。德魯伊艾洛茵請人把手貼上龜裂的老橡樹，樹心傳來規律的敲擊，像有人被封在根系下方求救。地脈搖籃被架上了抽取裝置，工法屬於一個滅絕的古代學派，昨天才裝上。螢群整夜懸在原地閃同一段訊號——螢語裡的「別過來」。獸群沿著一條枯黃的筆直草帶向北狂奔。石根結社的斗篷結滿黑果，凶兆指向北方被焚毀的林場。苔鬚長老把根探進土裡，說了八百年來第一句短話：「它醒了。」森林的人聽見的是另一句：「她撐不住了。」',
        cast: ['brynn', 'elowyn_fernward', 'sivienne_leycradle', 'josselyn_fireflypageant', 'orena_grasscrown', 'brunna_rootmantle', 'mossbeard', 'morwen', 'caelan_oakstride', 'sylwen'],
      },
      {
        when: '一個月前到下坡',
        title: '四季追來',
        text: '林間空地一夜走過四季。暮春使節瑟薩莉站在中央：有人撕毀了古老的妖精契約——矮人借地底建爐、森林換得庇護的那一份——季節正循著違約者的足跡追來。違約的不是矮人，矮人都死了；是把抽取裝置架上地脈搖籃的人。森林守望者凱蘭封了林子，說今年不許外人進，除非說得出理由。藥園照料者妮莎說出了理由：「我們去換她。」野火防線管理員帶他們走到逆風燒了十里的火源，那裡的草還是綠的——是莫雯的根在底下撐著。',
        cast: ['thessaly_briarcrown', 'caelan_oakstride', 'nissa', 'adalind_firebreak', 'faelith_rainbough', 'petrichor_drop', 'kaela_grimtrail', 'vexa_snarebright', 'rinna_moonfang', 'evanthe_starseed', 'thalia_mossstep', 'nimue_frostfern'],
      },
      {
        when: '第二次下坡 · 核心室之後',
        title: '我們來換妳',
        text: '核心室裡，藤蔓德魯伊把手放在樹靈的根上：「我們來換妳。」地面上，森林的人同時把手放進土裡——德魯伊、守林人、採集官、養蜂人、園丁、一個巴掌大的小妖精。八百年的重量分到幾十雙手上，每雙手都覺得重得不像話。苔鬚長老鬆開撐了整座地城的根，森林底下靜靜合上，像一道癒合的傷口。莫雯第一次站起來，膝蓋發出樹枝的聲音。春天，園子裡第一株迷迭香冒出新芽；地脈搖籃的抽取裝置被拆成零件，一件一件掛在林子入口，給下一個想架的人看。',
        cast: ['nissa', 'morwen', 'mossbeard', 'elowyn_fernward', 'sylwen', 'vondrelle_barkbasket', 'mira_honeybell', 'oswin_hiveward', 'jules_roseward', 'lyria', 'rhoswen_deepglyph', 'brunna_rootmantle', 'elowen', 'rhoswen'],
      },
    ],
    ch1: '林子裡不對的',
    intro: [
      (h) => `${h.n}在林子裡過日子，做${h.role}。森林的人都知道苔鬚長老，很少人知道他有個妹妹——那年秋天以後，大家都知道了。`,
      (h) => `${h.n}聽得懂一點樹的話。不多，夠知道那年秋天橡木林在說什麼：不是「它醒了」，是「她撐不住了」。`,
      (h) => `妖精契約上沒有${h.n}的名字，${h.n}的祖先也沒有簽過。但${h.n}在這片林子裡吃了一輩子的果子，覺得欠它一份。`,
    ],
    bond: [
      () => '橡木林。欠它一份，一輩子的。',
      () => '核心室裡那句話：「我們來換妳。」地面上幾十雙同時放進土裡的手，其中一雙是自己的。',
      () => '林子入口掛著的那些零件——拆下來的抽取裝置，給下一個想架的人看。',
    ],
    quotes: [
      '樹不會求救。會求救的是樹底下的人。',
      '八百年。她本來只打算撐到有人想出辦法。',
      '我們來換妳。這句話說出口以後，手就不能抽回來了。',
      '季節追人是有道理的。你欠它一個春天。',
      '林子今年不許外人進——除非你說得出理由。',
      '根在底下撐著，所以草是綠的。沒人謝過根。',
    ],
    scene: [
      ['貼上去', (h) => `艾洛茵請${h.n}把手貼上老橡樹。樹心在敲，三下、停、三下。${h.n}做${h.role}這麼多年，第一次聽見樹在數。${h.n}問她在數什麼。艾洛茵說：數還撐得住幾天。`],
      ['說理由', (h) => `凱蘭封了林子，要理由。${h.n}站在岔口想了很久。${h.role}不是理由，吃過的果子不是理由。最後${h.n}說：她撐了八百年，我想去看她一眼。凱蘭側身讓路。`],
      ['綠的草', (h) => `火源那一片草是綠的。${h.n}蹲下來摸，草根底下有東西在發熱——不是火，是撐著的力氣。${h.n}把${h.role}的工具放下，用手挖了一下。挖到一截根，粗得像手臂，溫的。`],
      ['零件', (h) => `拆地脈搖籃上的抽取裝置時，${h.n}負責一個部件。工法是滅絕學派的，${h.n}不懂，照${h.role}的方式一點一點卸。卸下來的那一刻，搖籃裡的地脈跳了一下，像心。`],
    ],
    close: [
      ['放進土裡', (h) => `那一刻，${h.n}把手放進土裡。重量來了——八百年分到幾十雙手，${h.n}這一份還是重得站不穩。${h.n}沒有抽手。旁邊的人也沒有。`],
      ['樹枝的聲音', (h) => `莫雯站起來的時候，膝蓋發出樹枝的聲音。${h.n}在地面上聽見了——隔著整座林子。${h.n}回到${h.where}，第一次覺得做${h.role}是在替誰分擔。`],
      ['迷迭香', (h) => `春天，園子裡第一株迷迭香冒出新芽。${h.n}去看了。很小，一點都不像八百年。${h.n}把這株芽的位置記進${h.role}的本子，旁邊畫了一隻手。`],
      ['掛在入口', (h) => `抽取裝置的零件掛在林子入口。${h.n}經過的時候會看一眼，像看一張告示。沒有字。${h.n}覺得不需要字——這片林子已經說過一次「不許」了。`],
    ],
    rel: {
      elowyn_fernward: (h) => `請人把手貼上老橡樹、聽見樹心在數日子的德魯伊。${h.n}貼過那棵樹`,
      thessaly_briarcrown: (h) => `站在一夜四季的空地中央、說契約被撕毀的暮春使節。${h.n}是她的證人之一`,
    },
  },

  /* ───────────────────────── 7 幽界那一側 ───────────────────────── */
  {
    id: 'shadow',
    title: '幽界那一側',
    subtitle: '死者都往地底看；一個守了千年的士兵幽魂只想知道戰爭結束了沒有',
    place: '幽界關口 · 墓園 · 夢',
    blurb: '夜班的祭司發現死者都往地底看。幽界的關口被人從那一側撐開，爐火的溫度被借去另一邊，墓穴安魂歌喚醒一個並不憤怒的古代士兵，它只想知道自己守了千年的戰爭是否已經結束。這條線寫活人欠死者的那一部分，和死者願意等的那一部分。',
    keys: ['korra_gravesong', 'morvenna_hollowveil'],
    members: ['korra_gravesong', 'morvenna_hollowveil', 'iskra_greyhearth', 'savra_mothmantle', 'selene_ashveil', 'xiomara_nightmasque', 'zorya_ashhalo', 'caldra_embercrypt', 'saelith_echofern', 'bexley_dreamtithe', 'serein_dreamglass', 'yumei_paperlantern', 'gray_threadmaster', 'perenne_thinveil', 'ashka_wispgather', 'seraphine_daybreak', 'sunniva_nightloom', 'ravok', 'brom_hushhorn'],
    acts: [
      {
        when: '秋 · 湖冷了',
        title: '往地底看',
        text: '死者都往地底看。城門旁的灶棚裡，幽爐守灶人的鍋子連續三天煮不熟，她說有東西把爐火的溫度借去了幽界那一側。界幕測繪員的圖上，塔外那片田野屬於幽界，農夫今早照常出門耕作。鎮上十一個人做了同一個夢。火葬台的聖火指向地下——一批本該安息的靈魂被同一條鎖鏈拖往北方。墓園裡，安魂歌者寇菈的歌喚醒了一個古代士兵的幽魂。它不憤怒。它只問：我守的那場戰爭，結束了嗎。',
        cast: ['ilse', 'iskra_greyhearth', 'perenne_thinveil', 'serein_dreamglass', 'caldra_embercrypt', 'korra_gravesong', 'zorya_ashhalo', 'brom_hushhorn'],
      },
      {
        when: '下坡期間',
        title: '擋門的人要活著',
        text: '幽界的關口被人從那一側撐開。關口守莫薇娜需要護衛陪她深入，因為擋門的人必須是活著的。進去的有夢魘守望者、亡衣保存師、影戲師、紙燈師和一個薩滿。那一側排著隊：被熔爐借走餘火的亡者、三年來往地底看的死者、一隻只剩影子的渡鴉。守了千年的士兵幽魂走在最前面——它說它認得這條路，八百年前它就是從這裡被派下去守的。守什麼？「守一座爐。叫我守到有人來換。」沒有人來換過。',
        cast: ['morvenna_hollowveil', 'selene_ashveil', 'savra_mothmantle', 'gray_threadmaster', 'yumei_paperlantern', 'ravok', 'korra_gravesong', 'xiomara_nightmasque', 'bexley_dreamtithe', 'saelith_echofern', 'ashka_wispgather', 'sable'],
      },
      {
        when: '封印之夜',
        title: '結束了',
        text: '死神信徒賽博握住吸血鬼的手腕，把被偷走的亡者餘火送回去安息——核心冷了下來。幽界那一側，排隊的亡者一個一個轉身，不再往地底看。夜燭替十七個往地底看的死者指了相反的路。士兵幽魂最後一個走。寇菈唱完安魂曲，對它說：結束了。你守的那場戰爭，八百年前就結束了。沒有人來換你，是因為沒有人記得——現在我記得了。它點了一下頭，像個下了班的人。灶棚的鍋子那一夜煮熟了，守灶人多盛了一碗，放在門口。',
        cast: ['sable', 'seraphine_v', 'ilse', 'korra_gravesong', 'morvenna_hollowveil', 'iskra_greyhearth', 'seraphine_daybreak', 'sunniva_nightloom', 'caldra_embercrypt', 'grave'],
      },
    ],
    ch1: '另一側的動靜',
    intro: [
      (h) => `${h.n}跟死者打交道，做${h.role}。這份工作最難的不是不怕，是記得他們也曾經怕過。`,
      (h) => `${h.n}分得出亡者和被借走影子的活人。那年秋天這個本事變得很重要——鎮上兩種人都愈來愈多。`,
      (h) => `幽界那一側不黑，只是舊。${h.n}去過邊緣幾次，從來沒有進去。那年冬天，${h.n}進去了。`,
    ],
    bond: [
      () => '那個守了千年、只問戰爭結束了沒有的士兵幽魂。',
      () => '門口那一碗多盛的湯。',
      () => '「擋門的人必須是活著的。」自己是其中一個。',
    ],
    quotes: [
      '死者不可怕。可怕的是沒人記得他們在等什麼。',
      '我不替亡者潤飾證詞。他們已經沒有別的了。',
      '擋門的人必須活著。所以我活著。',
      '它問戰爭結束了沒有。我說結束了。這是我這輩子最重要的一句話。',
      '爐火被借走的溫度，會在另一側暖著誰。',
      '結束了，可以走了。這句話應該有人早八百年說。',
    ],
    scene: [
      ['排隊', (h) => `那一側排著隊，${h.n}走在隊伍旁邊。${h.n}認得其中幾個——${h.where}的老面孔，三年前走的。他們不說話，只是往地底看。${h.n}用${h.role}的方式一個一個叫名字。被叫到的，抬起頭。`],
      ['守什麼', (h) => `士兵幽魂說它守一座爐，守到有人來換。${h.n}問：有人來過嗎。它說沒有。${h.n}做${h.role}這麼久，第一次覺得「沒有人來」這四個字比任何亡者都重。`],
      ['借走的', (h) => `灶棚的火被借走溫度，${h.n}跟著那條溫度走。走到關口邊，溫度在那一側暖著一群蹲著的人——亡者，被熔爐借走餘火、冷了八百年的。${h.n}把${h.role}的東西放下，蹲下來陪他們一會。`],
      ['活著', (h) => `莫薇娜說擋門的人必須活著，點了${h.n}。${h.n}沒有問為什麼是自己，只是把手放在門框上。門框是冷的，另一側有人在推。${h.n}推回去，用${h.role}這些年攢下來的全部力氣。`],
    ],
    close: [
      ['轉身', (h) => `核心冷下來那一刻，排隊的亡者一個一個轉身。${h.n}看見其中一個轉過來看了${h.p}一眼——${h.where}的老面孔。沒有說話。${h.n}點了一下頭。對方也點了一下，走了。`],
      ['下了班', (h) => `寇菈說「結束了」，士兵幽魂點頭，像個下了班的人。${h.n}在旁邊，忽然很想哭，沒有哭。${h.n}回到${h.where}，把${h.role}的工具擦了一遍，擦得很慢。`],
      ['一碗', (h) => `灶棚的鍋子煮熟了，守灶人多盛一碗放門口。${h.n}每晚經過都看一眼。碗第二天早上是空的。${h.n}不問是誰喝的，只是從此也在${h.where}留一份。`],
      ['相反的路', (h) => `夜燭替十七個死者指了相反的路。${h.n}跟在後面，替其中一個提燈。走到岔口，那人回頭對${h.n}說了一句話，${h.n}沒有告訴過任何人。做${h.role}的，有些話要帶走。`],
    ],
    rel: {
      korra_gravesong: (h) => `對士兵幽魂說「結束了」的安魂歌者。${h.n}在那一夜聽見了這句話`,
      morvenna_hollowveil: (h) => `說「擋門的人必須活著」的關口守。${h.n}是擋門的人之一`,
    },
  },
];
