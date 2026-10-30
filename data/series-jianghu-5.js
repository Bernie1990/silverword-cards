/* 江湖名冊 · 第三卷「自書冊」— 二十位把自己寫進名冊的年輕女子 */
(function () {
  const P = (o) => ({ kind: 'npc', race: 'human', looks: ['base'], full_name: o.name, ...o });
  const C = (archetype, ab, hp, ac, skills, saves, atk) => ({
    archetype, hp, ac, skills, saves,
    abilities: { str: ab[0], dex: ab[1], con: ab[2], int: ab[3], wis: ab[4], cha: ab[5] },
    attack: { name: atk[0], type: atk[1], damage: atk[2], damage_type: atk[3], is_heal: !!atk[4] },
  });

  window.SERIES.push({
    id: 'jianghu',
    world: {
      arc: '聽雨 · 天下武冊 · 自書冊',
      blurb_extra: '名冊改成自書之後，最先寫進去的二十個名字，幾乎都是年輕女子。她們不佔舊門派的缺，只佔自己願意被叫到的那一行。',
    },
    factions: {
      zishu: { label: '自書人', icon: '冊' },
    },
    saga: {
      acts: [
        {
          when: '自書春',
          title: '二十個先寫的人',
          text: '飯舖櫃檯的名冊多了二十行新墨。墨跡都還新，人卻各不相同——有結巴的劍詩人、只偷惡人香囊的賊、剪髮聽祕密的理髮師、破冰送信的冬泳客。林小七說：她們不是來報到的，是來告訴江湖，名字可以自己寫。',
          cast: ["jh_xiaoqi","jh_meiyu","jh_huafeng","jh_qingsi","jh_yuechi","jh_zhuque","jh_lanxin","jh_feiyan","jh_suyue"],
        },
        {
          when: '自書夏',
          title: '不屬於門派的名額',
          text: '武林盟有人問：自書人算哪一派？霍長庚說不算。裴真說緝風司的冊也認自書。空見在寺門貼了一張紙：願意被叫到的，寺裡有素齋。二十個人沒有推舉首領，只推舉了下一個人可以繼續寫。',
          cast: ["jh_huo","jh_peizhen","jh_kongjian","jh_hongchen","jh_baiwei","jh_lingxi","jh_yanhong","jh_qingwu","jh_moli","jh_xuanji","jh_jinse"],
        },
        {
          when: '自書秋',
          title: '還有空行',
          text: '名冊最後仍留着空白。芍藥說空白是留給說不出名字的骨頭；飛燕說空白要寫在靠近天的地方；梅語結結巴巴說：空、空白是、是給下一個敢寫的人。雨又來的時候，傘鋪的燈光亮着，茶棚只給說真話的人續杯。',
          cast: ["jh_shaoyao","jh_feiyan","jh_meiyu","jh_yuyan","jh_moli","jh_taohua","jh_yuyan","jh_cuiwei","jh_shaoyao"],
        },
      ],
    },
    characters: [
      P({
        id: "jh_meiyu", name: "梅語", role: "結巴的劍詩人", trait: "說話結巴，背劍詩卻一個字都不頓",
        gender: 'female', age: 20, faction: 'zishu', class: "戰士", level: 4, alignment: "中立善良",
        appearance: "清麗鵝蛋臉，唇邊一顆小痣，青梅色窄袖劍袍，腰間一卷詩箋，木劍比人還安靜",
        appearance_detail: "她開口會卡在第一個音。可是一旦背起劍詩，整個人像換成另一把喉嚨。",
        hint: { location: "聽雨江邊柳", hook: "有人笑她結巴，她用一整首劍詩把對方的刀勢念亂" },
        looks: ['base', "rain"],
        combat: C("swift_striker", [10, 16, 12, 14, 13, 15], 28, 14, ["acrobatics","performance","insight"], ["dex","cha"], ["詩劍","melee","1d8+3","slashing"]),
        story: {
          quote: "我、我不會罵人。我只會把你的招式，念給你聽。",
          background: "梅語生在說書人家。父親要她學嘴，她卻學了劍。口吃讓她在擂台下抬不起頭，直到她發現：背詩的時候，結巴會自己讓開。",
          ideal: "話說不清楚，劍要說清楚。",
          bond: "那卷被雨打濕又晾乾的劍詩，每一頁都是她練過的招。",
          flaw: "一緊張就更結巴，結巴時容易被人當成好欺負。",
          chapters: [
          { title: "柳下第一首", text: "有人當眾學她結巴。她臉紅到耳根，忽然把詩箋抽出來，從頭背到尾。對方的刀在半空停住——那首詩把每個破綻都念出來了。" },
          { title: "名冊上的一筆", text: "林小七把冊子推給她。梅語握筆的手抖，第一個「梅」寫了三次。寫完她說：這、這次是我自己願意被叫到。" },
          { title: "不替人罵", text: "沈無咎問她要不要學罵人。她搖頭：罵人我、我會卡殼。念破绽，我不會。" }
          ],
          relations: [
          { id: "jh_xiaoqi", text: "把冊子推過來、等她把名字寫完的人" },
          { id: "jh_guyan", text: "聽過她背詩、說「這比說書還準」的老人" },
          { id: "jh_kanglei", text: "曾笑她結巴、後來被詩念亂刀勢的快劍" }
          ],
        },
      }),
      P({
        id: "jh_huafeng", name: "花逢", role: "只偷惡人香囊的賊", trait: "笑起來很甜，下手只對欺壓過別人的人",
        gender: 'female', age: 22, faction: 'zishu', class: "盜賊", level: 5, alignment: "混亂善良",
        appearance: "桃花眼，淺粉窄袖夜行衣外罩月白短褙子，指尖常沾一點桂花香，腰間空香囊一串",
        appearance_detail: "她不偷銀子。她偷的是惡人貼身的香囊，第二天會出現在受害那家的窗台上，裏面只留一句：還你氣味。",
        hint: { location: "白霧樓後巷", hook: "衙門師爺的沉香囊不見了，窗台上多了一包被害佃戶家的土" },
        looks: ['base', "night"],
        combat: C("swift_striker", [8, 17, 11, 13, 14, 16], 30, 15, ["stealth","sleight_of_hand","persuasion"], ["dex","cha"], ["香刺","melee","1d4+4","piercing"]),
        story: {
          quote: "銀子會還。氣味不會。所以我先拿走氣味。",
          background: "花逢小時候被人用香粉捂住口鼻搶過錢。長大後她學會了更輕的手，卻把目標訂得很窄：只偷做過同樣事的人。",
          ideal: "惡人的貼身物，不該還貼在他身上。",
          bond: "一串空香囊，每一個都對應過一個名字。",
          flaw: "標準太主觀。有人只是兇，未必夠格被她偷。",
          chapters: [
          { title: "第一隻囊", text: "她偷走師爺的沉香囊，換成佃戶家灶灰。白素在茶棚裏笑了一下，沒有舉報。" },
          { title: "不偷銀", text: "林小七問她為什麼不偷錢救人。花逢說：錢會讓人再搶一次。氣味會讓他記得自己臭過。" },
          { title: "自書", text: "她在冊上寫下花逢二字，旁邊小字：香囊賊，不接僱。" }
          ],
          relations: [
          { id: "jh_baisu", text: "看見她換香囊、只笑不舉報的主事" },
          { id: "jh_xiaoqi", text: "問她為什麼不偷銀子的孩子" },
          { id: "jh_gongqi", text: "路上賣過假香、被她點名警告過的行商" }
          ],
        },
      }),
      P({
        id: "jh_qingsi", name: "青絲", role: "聽祕密的理髮師", trait: "剪髮時極安靜，客人卻總把不該說的說完",
        gender: 'female', age: 24, faction: 'zishu', class: "吟遊詩人", level: 4, alignment: "絕對中立",
        appearance: "烏髮如瀑垂到腰，本人從不剪短，月白圍布圍裙，手持烏木梳與薄剪，眼神溫柔得像要收納什麼",
        appearance_detail: "她說自己只剪髮。可每個坐上她凳子的人，都會在鏡前把心事講完。剪下的髮，她按季節埋進不同的壇。",
        hint: { location: "碼頭理髮棚", hook: "武林盟老人剪完頭，發現自己把候選盟主的把柄說漏了" },
        looks: ['base', "menghui"],
        combat: C("noble_enchanter", [8, 14, 12, 13, 15, 16], 26, 12, ["insight","persuasion","perception"], ["wis","cha"], ["薄剪","melee","1d4+2","slashing"]),
        story: {
          quote: "我只剪到肩。你的話，是你自己掉下來的。",
          background: "青絲的母親是刑部抄錄。她學不會寫口供，卻學會了讓人自己開口。理髮是幌子，也是她唯一肯做的聽。",
          ideal: "祕密該被聽見，不該被拿去賣。",
          bond: "十二個陶壇，埋着十二年剪下的髮與說過的話。",
          flaw: "聽太多之後，會分不清哪句是委託、哪句是閒話。",
          chapters: [
          { title: "鏡前", text: "霍長庚坐下只要剪鬢角。走時青絲把一塊布還他：您剛才說的那句，我當沒聽見。布上沒有字。" },
          { title: "不賣", text: "白素問她買不賣情報。青絲指着剪刀：這只能剪髮。" },
          { title: "寫名", text: "她寫自書時把「青絲」寫得很長，像一縷髮。" }
          ],
          relations: [
          { id: "jh_huo", text: "剪鬢角時說漏嘴、被她當沒聽見的長老" },
          { id: "jh_baisu", text: "想買情報、被剪刀擋回來的主事" },
          { id: "jh_ahe", text: "來剪劉海、什麼都不說卻哭了一場的侍女" }
          ],
        },
      }),
      P({
        id: "jh_yuechi", name: "月池", role: "破冰的冬泳信使", trait: "話少、體寒、信件從冰窟窿裏進出水",
        gender: 'female', age: 19, faction: 'zishu', class: "遊俠", level: 5, alignment: "中立善良",
        appearance: "膚色冷白，唇色偏青，濕髮貼在頰邊，深藍短衣外罩油布，肩上防水信筒，赤足仍帶水珠",
        appearance_detail: "夏天她也像剛從水裏出來。冬天她真的從冰面鑽進鑽出。緝風司的快馬追不上她的水路。",
        hint: { location: "北河冰面", hook: "封河之夜，冰上出現一串赤足印，印裏是一封不該過河的信" },
        looks: ['base', "rain"],
        combat: C("beast_ranger", [12, 16, 14, 11, 15, 10], 38, 14, ["athletics","stealth","survival"], ["dex","con"], ["冰錐","ranged","1d6+3","piercing"]),
        story: {
          quote: "路斷了還有河。河凍了，我進去。",
          background: "月池的村子靠冬捕。她十歲掉進冰窟被救起後，就不怕冷水了。後來她替不敢走官道的人送信，價碼是一頓熱飯。",
          ideal: "信要到。人可以發抖，信不能濕。",
          bond: "母親縫的防水信筒，裏面永遠墊着乾棉。",
          flaw: "太依賴水路，離開大河就容易迷路。",
          chapters: [
          { title: "破冰", text: "裴真派人堵橋。月池從橋下冰層鑽過，把信放在對岸石頭上，人已經不見。" },
          { title: "熱飯", text: "趙平給她熬薑湯。她喝完才說話：這封是給燼蓮的，別問內容。" },
          { title: "自書", text: "她寫名字時手指還在抖。寫完說：以後叫我，到河邊喊就好。" }
          ],
          relations: [
          { id: "jh_peizhen", text: "堵過橋、仍追不上她水路的提點" },
          { id: "jh_zhao", text: "每次她上岸都給薑湯的廚子" },
          { id: "jh_liuzhi", text: "收過她冰窟來信的暗樁" }
          ],
        },
      }),
      P({
        id: "jh_zhuque", name: "朱雀", role: "用戲台當不在場證明的花旦", trait: "台上極媚，台下極懶，一身戲能同時出現在兩個地方",
        gender: 'female', age: 23, faction: 'zishu', class: "吟遊詩人", level: 6, alignment: "混亂中立",
        appearance: "鳳眼朱唇，戲服紅金兩層，頭面珠翠未卸一半，手持摺扇，神情似笑非笑",
        appearance_detail: "她有替身。替身只會唱不會殺。真身只會殺不會唱整齣。官府對簿時，兩邊都有人證她在台上。",
        hint: { location: "城東戲棚", hook: "命案發生那一夜，全城都說看見朱雀在唱《刺梁》" },
        looks: ['base', "menghui"],
        combat: C("noble_enchanter", [9, 15, 12, 13, 12, 17], 36, 13, ["deception","performance","sleight_of_hand"], ["cha","dex"], ["扇骨","melee","1d6+3","bludgeoning"]),
        story: {
          quote: "我在台上。你的刀，不在劇本裏。",
          background: "朱雀原是戲班獨苗。班主死後她養不起整班，就學會了讓「朱雀」同時存在於戲棚與夜路。",
          ideal: "真假可以並存，只要觀眾要看的那場還在。",
          bond: "替身妹子的平安，比自己的名聲重要。",
          flaw: "太依賴替身，一旦兩人同時被看見就全垮。",
          chapters: [
          { title: "兩處朱雀", text: "命案夜她在後台卸妝，替身在前台唱到聲啞。封鈴後來只問一句：下回點到為止。" },
          { title: "不唱整齣", text: "顧言請她客串說書。她搖扇：我只會半齣。另外半齣是別人的命。" },
          { title: "寫名", text: "冊上「朱雀」旁她注：含替身，算一個名字。" }
          ],
          relations: [
          { id: "jh_fengling", text: "看穿卻只說點到為止的台主" },
          { id: "jh_guyan", text: "想請她客串、被她用半齣擋回的說書人" },
          { id: "jh_chukuang", text: "醉後堅稱同時看見兩個她的酒客" }
          ],
        },
      }),
      P({
        id: "jh_lanxin", name: "蘭心", role: "在葉片上開方的啞女", trait: "從不發聲，藥方寫在新鮮葉背，字跡清正",
        gender: 'female', age: 21, faction: 'zishu', class: "牧師", level: 5, alignment: "中立善良",
        appearance: "素淨如蘭，青衣布裙，喉間一條舊疤，懷中葉盒與炭筆，指尖常綠",
        appearance_detail: "她能發聲，只是不肯。幼時被人以嗓子要挾過全家。現在她用葉片跟人說話，葉乾了，話也隨風。",
        hint: { location: "藥谷石階", hook: "何滿收到一片還濕的葉：燃脈傷，不可再燒，方在背面" },
        looks: ['base', "rain"],
        combat: C("herbal_healer", [9, 12, 13, 14, 17, 11], 32, 12, ["medicine","nature","insight"], ["wis","int"], ["葉針","spell","1d8+3","poison",true]),
        story: {
          quote: "（葉背）我有聲音。我不給你們。",
          background: "蘭心本是藥谷外村的孩子。劫匪割她喉前她咬斷了自己的信物繩，全家得逃。何滿救下她後，她選擇把聲音留在葉上。",
          ideal: "方子要對。聲音可以不出來。",
          bond: "喉間那條疤，是她自己選的安靜。",
          flaw: "遇急事仍只寫葉，來不及時會誤事。",
          chapters: [
          { title: "濕葉", text: "阿南燒傷惡化。蘭心塞給何滿一片葉，背面十六個字，救回一晚。" },
          { title: "不肯出聲", text: "顧言請她上台講藥。她遞葉：請自己讀。" },
          { title: "自書", text: "她寫名時在旁畫了一片葉。林小七說：這樣也算。" }
          ],
          relations: [
          { id: "jh_heman", text: "讀得懂她葉背、從不逼她出聲的郎中" },
          { id: "jh_anan", text: "被她的方子按住燃脈傷的少女" },
          { id: "jh_suwan", text: "和她用葉交換毒名的辨毒人" }
          ],
        },
      }),
      P({
        id: "jh_feiyan", name: "飛燕", role: "不下街道的屋脊客", trait: "極靈、極傲，能走的路她偏要走瓦",
        gender: 'female', age: 18, faction: 'zishu', class: "盜賊", level: 4, alignment: "混亂善良",
        appearance: "短打束腿，燕尾般的淺青披帛，輕功靴底磨得發亮，髮用皮繩一束，笑時露出虎牙",
        appearance_detail: "她說地面髒。其實是幼時在街上被人踩過手。從此她的江湖都在屋脊上。",
        hint: { location: "縣衙屋脊", hook: "捕快抬頭，只見燕尾披帛一掃，瓦上多了一封匿名信" },
        looks: ['base', "night"],
        combat: C("swift_striker", [10, 18, 11, 12, 13, 14], 26, 15, ["acrobatics","stealth","athletics"], ["dex","str"], ["燕尾鏢","ranged","1d4+4","piercing"]),
        story: {
          quote: "街是給馬走的。人可以走瓦。",
          background: "飛燕跟馬戲班長大，班散後她把城當訓練場。誰付錢，她就把信從這條脊送到那條脊。",
          ideal: "高處看得清，也離髒遠一點。",
          bond: "一雙磨穿又補的輕功靴，補丁是馬戲班老師傅縫的。",
          flaw: "堅持不下地，遇水巷與平地會把自己困住。",
          chapters: [
          { title: "瓦上信", text: "她把裴真要的圖放在縣衙正脊。自己蹲在對面看捕快們抬頭。" },
          { title: "被迫落地", text: "大雨瓦滑。林小七在巷裡舉傘等她。飛燕落地那一步罵了半句，又道謝。" },
          { title: "寫名", text: "她要求把名字寫在冊頁上緣：靠近天。" }
          ],
          relations: [
          { id: "jh_xiaoqi", text: "雨夜在巷裡舉傘等她落地的人" },
          { id: "jh_peizhen", text: "收過她脊上傳信、從不逼她下地的提點" },
          { id: "jh_xiaoyu", text: "追她追到腿軟的小捕快" }
          ],
        },
      }),
      P({
        id: "jh_suyue", name: "素月", role: "拒縫逼婚衣的嫁衣娘", trait: "針腳極美，逼婚的訂單一律退，退時剪破樣子",
        gender: 'female', age: 25, faction: 'zishu', class: "牧師", level: 3, alignment: "守序善良",
        appearance: "月白裙衫外罩玄色馬甲，髮插銀針兩支，膝上未完成的紅嫁衣只縫了半幅，神情淡而硬",
        appearance_detail: "她縫得出天下最妥帖的喜服。她也剪得最快。誰拿着父母逼寫的婚書來，她就當着面把樣子剪開。",
        hint: { location: "繡莊對街", hook: "阮慈的客人跑來哭訴：素月把訂金和剪碎的紅布一起扔出門外" },
        looks: ['base', "menghui"],
        combat: C("herbal_healer", [9, 13, 12, 14, 15, 13], 22, 12, ["insight","sleight_of_hand","persuasion"], ["wis","cha"], ["銀針","ranged","1d4+2","piercing"]),
        story: {
          quote: "願意的喜，我縫。不願意的，我剪。",
          background: "素月自己逃過一場逼婚。嫁衣是她連夜剪碎的。後來她開鋪，規矩寫在門上：無雙方手印，不接喜服。",
          ideal: "衣服可以成全人，也可以放過人。",
          bond: "門上那塊「需雙方手印」的木牌，字是她一刀一刀刻的。",
          flaw: "對「自願」的判斷有時過嚴，錯過真想和解的人。",
          chapters: [
          { title: "剪開", text: "慕容秋退婚那夜，素月把對方送來的喜服樣子剪成兩半，寄回男方。" },
          { title: "手印", text: "有對情侶吵架又和好，重新按了手印。她縫了一夜，眼睛都紅了。" },
          { title: "自書", text: "寫名旁注：嫁衣娘，不接單方。" }
          ],
          relations: [
          { id: "jh_qiu", text: "退婚夜被她剪開喜服樣子的刀客" },
          { id: "jh_ruanci", text: "對街繡莊、彼此送過針線的守寡人" },
          { id: "jh_taohua", text: "紅娘同行，理念相反却互相轉介的人" }
          ],
        },
      }),
      P({
        id: "jh_hongchen", name: "紅塵", role: "只看不賭的賭坊眼", trait: "坐整晚不下注，卻能說出誰在出千",
        gender: 'female', age: 26, faction: 'zishu', class: "盜賊", level: 5, alignment: "守序中立",
        appearance: "薄紅唇，玄色長衫一顆骰子玉扣，指間無戒，眼神像在算別人的呼吸",
        appearance_detail: "她從不碰籌碼。賭坊請她坐鎮，只為一件事：盯人。被她點名的出千客，隔天會自己把錢吐回去。",
        hint: { location: "城南賭坊二樓", hook: "今晚的骰盅聲亂了半拍，紅塵已起身下樓" },
        looks: ['base', "night"],
        combat: C("swift_striker", [8, 15, 12, 16, 14, 13], 30, 14, ["insight","perception","investigation"], ["int","wis"], ["骰盅","melee","1d4+2","bludgeoning"]),
        story: {
          quote: "我沒賭。我只是比你們先看見結局。",
          background: "紅塵父親把家產賭光。她學會算牌不是為了贏，是為了讓出千的人沒地方站。",
          ideal: "賭可以有，假不可以有。",
          bond: "父親留下的空骰盅，她用來敲桌點名。",
          flaw: "太清醒，連朋友聚會的小賭也掃興。",
          chapters: [
          { title: "半拍", text: "她敲盅，出千客臉色先變。賭坊少爺要毆人，她攔下：吐錢就行。" },
          { title: "不下注", text: "花逢問她偷不偷骰子。紅塵搖頭：骰子是真的，人是假的。" },
          { title: "自書", text: "寫名：紅塵，看客。" }
          ],
          relations: [
          { id: "jh_huafeng", text: "問過她偷不偷骰子的香囊賊" },
          { id: "jh_duan", text: "來對過賭坊帳、被她指出三筆假的賬房" },
          { id: "jh_baisu", text: "偶爾來二樓喝茶聽聲的主事" }
          ],
        },
      }),
      P({
        id: "jh_baiwei", name: "百味", role: "笑着試毒的人", trait: "每試一味就笑一下，笑是為了讓旁人別先慌",
        gender: 'female', age: 22, faction: 'zishu', class: "術士", level: 4, alignment: "混亂善良",
        appearance: "明豔圓臉，橘紅披帛，腰間一排小銀匙，舌尖偶有烏色，眼神亮得像沒事",
        appearance_detail: "蘇晚讀毒不入口。百味相反：她入口，再用笑告訴大家「還死不了」。玄壺藥谷又愛又怕她。",
        hint: { location: "藥谷試毒房", hook: "新毒來了，百味先笑，再伸銀匙" },
        looks: ['base', "rain"],
        combat: C("controller_caster", [9, 13, 14, 12, 13, 16], 30, 12, ["medicine","persuasion","survival"], ["con","cha"], ["銀匙","spell","1d8","poison"]),
        story: {
          quote: "苦的話，我先笑。你們再決定要不要怕。",
          background: "百味母親是廚娘，死於誤食。她發誓先於任何人嚐。笑是她給自己的節奏，也是給旁人的膽。",
          ideal: "死訊可以晚一點到，勇氣要先到。",
          bond: "母親的銀匙，磨短了仍在用。",
          flaw: "習慣忍毒，真正的病痛會被她笑掉、耽誤醫治。",
          chapters: [
          { title: "先笑", text: "新毒入口，她笑完才倒。何滿罵她，她比手勢：還有氣。" },
          { title: "與蘇晚", text: "蘇晚不讓她碰一種猛毒。百味點頭：那味你讀，我聽。" },
          { title: "自書", text: "寫名旁畫一把小匙。" }
          ],
          relations: [
          { id: "jh_suwan", text: "讀毒不入口、替她劃邊界的辨毒人" },
          { id: "jh_heman", text: "每次她試完都罵、仍替她護航的郎中" },
          { id: "jh_yueniang", text: "教她燒傷也不是靠忍的醫婦" }
          ],
        },
      }),
      P({
        id: "jh_lingxi", name: "靈犀", role: "只信街狗的通事", trait: "對人冷淡，對狗極熱，狗一叫她就懂",
        gender: 'female', age: 17, faction: 'zishu', class: "德魯伊", level: 3, alignment: "中立善良",
        appearance: "稚嫩眉眼，麻布短褐，肩上常蹲一只耳缺的黃狗，袖裡乾糧專喂狗不喂己",
        appearance_detail: "她說人會撒谎，狗的尾巴不會。城裡走失、藏尸、埋伏，常是她的狗先绕路。",
        hint: { location: "城壕狗棚", hook: "今夜所有野狗不吠，靈犀說：有生人帶着死气" },
        looks: ['base', "night"],
        combat: C("beast_ranger", [10, 14, 13, 11, 16, 12], 24, 13, ["animal_handling","perception","survival"], ["wis","dex"], ["犬牙匕","melee","1d4+2","piercing"]),
        story: {
          quote: "人問我話，我看狗。狗若搖尾，我再答。",
          background: "靈犀被棄在狗棚。野狗養大她，人只在收稅時出現。長大後她替狗說話，也替肯聽狗的人帶路。",
          ideal: "先問尾巴，再問嘴。",
          bond: "耳缺黃狗「半兩」，是她的哥哥。",
          flaw: "太不信人，會錯過真心伸手的人。",
          chapters: [
          { title: "不吠之夜", text: "半兩低鳴。靈犀帶林小七繞開埋伏巷。" },
          { title: "喂狗", text: "趙平給肉。她先餵狗，自己啃饅頭。" },
          { title: "自書", text: "名字旁印了個爪印：半兩同意。" }
          ],
          relations: [
          { id: "jh_xiaoqi", text: "肯跟着她繞巷、不問為什麼的人" },
          { id: "jh_zhao", text: "肉先給狗的廚子" },
          { id: "jh_anye", text: "唯一能跟她聊马也聊狗的马師" }
          ],
        },
      }),
      P({
        id: "jh_yanhong", name: "焰紅", role: "怒時最靜的煙火匠", trait: "平時吵鬧，真動怒反而無聲，手也不抖",
        gender: 'female', age: 24, faction: 'zishu', class: "術士", level: 5, alignment: "混亂善良",
        appearance: "左耳失聰側別着紅絨花，指尖燒痕如星，赤褐工裝外罩防火圍裙，背負紙筒煙花",
        appearance_detail: "左耳是炸膛留下的。她說吵鬧是給自己聽的。真正要命的引線，她只在安靜裏點。",
        hint: { location: "河灘試炮場", hook: "今晚煙花不響，焰紅坐在引線旁一句話不說" },
        looks: ['base', "rain"],
        combat: C("controller_caster", [11, 14, 13, 12, 12, 16], 34, 13, ["athletics","intimidation","arcana"], ["cha","dex"], ["爆竹","ranged","2d6","fire"]),
        story: {
          quote: "我吵的時候，是還能救。我不說話的時候，你們離遠點。",
          background: "焰紅跟煙火家族學藝。一次炸膛帶走左耳與師父。她留下，把歡慶的火與警告的火分開做。",
          ideal: "火可以賀喜，也可以嚇退不該來的人。",
          bond: "師父留下的防火圍裙，補了七次仍穿。",
          flaw: "安靜時旁人不知道該逃還是該幫忙。",
          chapters: [
          { title: "無聲", text: "有人踢翻藥桶。焰紅忽然不說話，把引線掐滅，再把人推出場。事後才罵。" },
          { title: "給燼蓮", text: "她送紅綃一批「只響不傷」的嚇退炮。紅綃說：這比刀仁慈。" },
          { title: "自書", text: "寫名時在旁點了一個小火花記號。" }
          ],
          relations: [
          { id: "jh_hongxiao", text: "收過她嚇退炮的教主" },
          { id: "jh_jiuyue", text: "嫌她炮太吵、又愛跟她比誰更亮的火扇舞者" },
          { id: "jh_mingyan", text: "真動怒時唯一敢靠近遞水的護法" }
          ],
        },
      }),
      P({
        id: "jh_qingwu", name: "清悟", role: "討債的假尼姑", trait: "袈裟是假的，木魚是真砸的，債是要還的",
        gender: 'female', age: 27, faction: 'zishu', class: "戰士", level: 5, alignment: "守序中立",
        appearance: "灰尼帽壓眉，袈裟下露出鑲邊勁裝一角，木魚有缺口，笑起來完全不像出家人",
        appearance_detail: "寒山寺不認她。債主門前卻都認這身灰。她念的不是經，是欠條利息。",
        hint: { location: "賭坊後門", hook: "清悟敲木魚三下，欠債人自己把契據送出來" },
        looks: ['base', "night"],
        combat: C("duelist_leader", [14, 14, 13, 12, 13, 15], 40, 15, ["intimidation","insight","athletics"], ["str","cha"], ["木魚","melee","1d6+3","bludgeoning"]),
        story: {
          quote: "阿彌陀佛。利息算到今日。",
          background: "清悟原是鏢局討債。穿尼姑裝是為了進女眷院。後來裝成了招牌，她也就不脫了。空見見過她，只說：假衣可以，假心不可。",
          ideal: "債要清。人可以假。",
          bond: "第一張追回的欠條，叠在木魚裏。",
          flaw: "招牌太響，真正的尼姑也會被她連累被認錯。",
          chapters: [
          { title: "三聲木魚", text: "紅塵的賭坊後門。欠債人聽見木魚，腿先軟。" },
          { title: "空見", text: "她去寒山寺道歉。空見給她素齋：衣假心真，便留下吃饭。" },
          { title: "自書", text: "寫名：清悟，假尼，真債。" }
          ],
          relations: [
          { id: "jh_kongjian", text: "說衣假心真、仍給她素齋的方丈" },
          { id: "jh_hongchen", text: "後門被她敲木魚的賭坊眼" },
          { id: "jh_jingxin", text: "真庵主，叮囑過她別嚇到逃婚來的女子" }
          ],
        },
      }),
      P({
        id: "jh_moli", name: "茉莉", role: "假話不給茶的茶博士", trait: "茶極好，謊話出口茶便倒掉重泡",
        gender: 'female', age: 23, faction: 'zishu', class: "吟遊詩人", level: 4, alignment: "中立善良",
        appearance: "茉莉花簪，月綠茶衫，托盤永遠穩，眼神像在聞話裡的味",
        appearance_detail: "她的規矩：進門先說一件真事。假的，她當場潑茶重來。真的，第二杯免費。",
        hint: { location: "聽雨茶棚", hook: "今晚第三杯被潑，客人改口後才喝到" },
        looks: ['base', "menghui"],
        combat: C("noble_enchanter", [8, 13, 12, 14, 15, 16], 26, 12, ["insight","persuasion","perception"], ["wis","cha"], ["燙茶","ranged","1d6+2","fire"]),
        story: {
          quote: "茶會燙假話。你要不要換一句？",
          background: "茉莉在謊言堆裏長大。父親是訟棍。她開茶棚，用茶逼人練習說實話。",
          ideal: "先真，再熱。",
          bond: "第一壺不肯燙假話的茉莉花茶罐。",
          flaw: "對「善意的謊」也狠，會傷到保護別人的人。",
          chapters: [
          { title: "第三杯", text: "溫語說半句官話。茶被潑。她改口說出扔冊的真相，茉莉才續杯。" },
          { title: "免費", text: "林小七說完名冊的事。第二杯免費，還加一碟糖姜。" },
          { title: "自書", text: "寫名旁注：茶棚，需真話。" }
          ],
          relations: [
          { id: "jh_wenyu", text: "被潑過茶、改口後才續杯的書記" },
          { id: "jh_xiaoqi", text: "真話換糖姜的孩子" },
          { id: "jh_hudeng", text: "醉話太多、被她拒茶三次的酒客" }
          ],
        },
      }),
      P({
        id: "jh_xuanji", name: "璇璣", role: "故意迷路的羅盤匠", trait: "羅盤極準，人卻常走錯路，錯路盡頭总有需要被找到的人",
        gender: 'female', age: 25, faction: 'zishu', class: "法師", level: 5, alignment: "中立善良",
        appearance: "束髮插黃銅羅盤針，青灰長衫口袋裝滿小羅盤，走路像在跟指南針吵架",
        appearance_detail: "她賣的羅盤從不失準。她本人出門必「迷路」。迷路的地方，常躺着受傷的旅人。",
        hint: { location: "北城岔路", hook: "璇璣又迷了路，岔路溝裡却躺着失溫的信使" },
        looks: ['base', "menghui"],
        combat: C("lore_scholar", [8, 12, 12, 17, 14, 13], 28, 12, ["investigation","survival","arcana"], ["int","wis"], ["羅盤針","ranged","1d4+3","piercing"]),
        story: {
          quote: "羅盤是準的。迷路的是我。剛好。",
          background: "璇璣幼時跟商隊走散，被羅盤匠收養。她學會了準，也學會了：有時候人不該太準，才會撞見需要你的人。",
          ideal: "準留給器物。人可以繞一下。",
          bond: "義父第一枚黃銅羅盤，指針永遠微偏向「有人需要」的方向——她堅持這是玄學。",
          flaw: "真遇上急事，故意迷路會耽誤時間。",
          chapters: [
          { title: "岔路", text: "月池失溫。璇璣「迷」到溝邊，把自己的外套蓋上去。" },
          { title: "賣盤", text: "唐弈買羅盤。她說：棋盤準就好，人不必。" },
          { title: "自書", text: "寫名時羅盤放在冊邊，指針指着自己的名字。" }
          ],
          relations: [
          { id: "jh_yuechi", text: "被她迷路救起的冬泳信使" },
          { id: "jh_tangyi", text: "買過她羅盤的弈劍少主" },
          { id: "jh_lanyin", text: "唯一說她指針「有潮」的領航人" }
          ],
        },
      }),
      P({
        id: "jh_jinse", name: "金瑟", role: "琴音即刃的琴師", trait: "絃聲可斷燭，也可斷喉，演奏時眼睛是閉的",
        gender: 'female', age: 24, faction: 'zishu', class: "吟遊詩人", level: 7, alignment: "混亂中立",
        appearance: "金絲鑲邊玄衣，懷中古瑟，指尖茧厚，閉眼時像在聽很遠的東西",
        appearance_detail: "她不開眼殺人。她說看清了會心軟。琴盒裏有兩套絃：一套給宴，一套給夜。",
        hint: { location: "夜宴回廊", hook: "燭火齊斷，只剩琴聲，目標已無聲倒下" },
        looks: ['base', "night"],
        combat: C("noble_enchanter", [9, 14, 12, 13, 14, 17], 42, 13, ["performance","stealth","insight"], ["cha","dex"], ["斷絃","ranged","1d8+3","slashing"]),
        story: {
          quote: "你聽見的是曲子。他聽見的是結局。",
          background: "金瑟師從一位用琴行刺的老人。老人死前說：開眼，就會記住臉。她選擇閉眼，只記音。",
          ideal: "該斷的斷，不該聽的人，只當聽過曲。",
          bond: "兩套絃，分裝在琴盒左右。",
          flaw: "閉眼時分不清孩童與目標，曾險些誤傷。",
          chapters: [
          { title: "斷燭", text: "宴上她斷七燭，只留主位。目標的護衛先亂。" },
          { title: "開眼", text: "一次幾乎誤傷方小滿。她從此夜殺前先問花逢氣味。" },
          { title: "自書", text: "寫名：金瑟，閉眼。" }
          ],
          relations: [
          { id: "jh_huafeng", text: "夜殺前替她聞氣味的香囊賊" },
          { id: "jh_xiaoman", text: "險些被誤傷、後來仍給她留麵的跑堂" },
          { id: "jh_suyan", text: "唯一敢跟她合奏、讓她開眼的海歌者" }
          ],
        },
      }),
      P({
        id: "jh_taohua", name: "桃花", role: "永不結婚的紅娘", trait: "成全良緣極準，拆散惡緣更快，自己終身不嫁",
        gender: 'female', age: 26, faction: 'zishu', class: "吟遊詩人", level: 5, alignment: "混亂善良",
        appearance: "桃花粉衫，笑渦深，袖藏姻緣帖與小剪，看起來像要說媒，剪子卻先出鞘",
        appearance_detail: "她說自己姻緣已定：嫁給這門生意。誰拿錢逼婚，她就去女方家教人怎麼逃。",
        hint: { location: "姻緣茶樓", hook: "今晚三對說成，一對被她當場拆散" },
        looks: ['base', "menghui"],
        combat: C("noble_enchanter", [8, 13, 12, 14, 14, 17], 30, 12, ["persuasion","insight","deception"], ["cha","wis"], ["喜帖剪","melee","1d4+2","slashing"]),
        story: {
          quote: "成全是生意。拆散，是功德。",
          background: "桃花被賣過一次婚。逃出後她專做紅娘，條件是女方親自點頭。男方單方面來，她報的是逃婚路線。",
          ideal: "願意的成雙，不願意的成路。",
          bond: "自己那張永遠不寫男方的空白婚書。",
          flaw: "太愛拆，有時拆掉只是一時氣話的緣。",
          chapters: [
          { title: "拆散", text: "她當眾念出男方逼婚的欠債。女方當夜走，素月退了喜服。" },
          { title: "成全", text: "一對藥谷與鏢局的孩子按了手印。她哭着收錢。" },
          { title: "自書", text: "寫名旁注：紅娘，不嫁。" }
          ],
          relations: [
          { id: "jh_suyue", text: "拆散後接手退喜服的嫁衣娘" },
          { id: "jh_qiu", text: "她幫過忙的退婚刀客，榜樣之一" },
          { id: "jh_moli", text: "茶棚合作：真話說媒更準" }
          ],
        },
      }),
      P({
        id: "jh_yuyan", name: "雨煙", role: "晴天會焦慮的傘匠", trait: "傘骨天下第一，晴天却坐立難安",
        gender: 'female', age: 20, faction: 'zishu', class: "法師", level: 3, alignment: "中立善良",
        appearance: "煙雨色長衫，臂彎永遠一柄油紙傘，膚色像長期在檐下，笑起來有點歉意",
        appearance_detail: "她的傘不漏。她本人見太陽就慌，總覺得有人會因此沒傘可撐。雨是她的秩序。",
        hint: { location: "傘鋪檐下", hook: "連續三日大晴，雨煙把傘全部攤開檢查到天亮" },
        looks: ['base', "rain"],
        combat: C("lore_scholar", [8, 13, 11, 15, 14, 13], 20, 12, ["sleight_of_hand","insight","perception"], ["int","wis"], ["傘骨","melee","1d6+1","bludgeoning"]),
        story: {
          quote: "晴天我修傘。雨天我才放心。",
          background: "雨煙父母死於暴雨塌屋。她活下來後只做傘。晴天意味着有人會把傘忘在家裡。",
          ideal: "每人頭上都該有一層可收的天。",
          bond: "父母屋簷下撿回的第一根傘骨。",
          flaw: "晴天判斷力下降，會把傘硬塞給不需要的人。",
          chapters: [
          { title: "大晴", text: "她追着林小七塞傘。林小七說今天真的不需要。雨煙抱傘哭了兩聲又笑。" },
          { title: "不漏", text: "斷劍夜她把最好的傘借給何滿背上山。" },
          { title: "自書", text: "寫名時在傘骨上刻了同款小字。" }
          ],
          relations: [
          { id: "jh_xiaoqi", text: "晴天被她硬塞傘的人" },
          { id: "jh_heman", text: "斷劍夜借走她最好那柄傘的郎中" },
          { id: "jh_bosu", text: "誇她傘骨比網梭還直的補網老人" }
          ],
        },
      }),
      P({
        id: "jh_cuiwei", name: "翠微", role: "山下緘默的山導", trait: "海拔够高才開口，山下只以手勢帶路",
        gender: 'female', age: 22, faction: 'zishu', class: "遊俠", level: 5, alignment: "絕對中立",
        appearance: "茶綠色斗篷，绑腿登山，唇色常乾裂，腰間羊角号，眼神像在量高度",
        appearance_detail: "她立過誓：在能看見屋頂的地方不說話，免得把山裡的事洩漏給山下的官。上到雲線，她會突然健談。",
        hint: { location: "西山雲線", hook: "官差在山下問路，翠微只指，一句不答；上到雲裡她開始講三條活路" },
        looks: ['base', "night"],
        combat: C("beast_ranger", [12, 15, 14, 11, 16, 10], 38, 14, ["survival","athletics","stealth"], ["wis","con"], ["羊角號","ranged","1d6+2","thunder"]),
        story: {
          quote: "（山下比手勢）（雲線以上）第三條路，左邊有蛇。",
          background: "翠微的寨子被官軍問路過。她學會了在低處闭嘴。山是她的嘴的開關。",
          ideal: "山的事，留给會呼吸薄气的人。",
          bond: "寨子裡兄弟姐妹定下的緘默之約。",
          flaw: "緊急時在山下也不肯喊，會误事。",
          chapters: [
          { title: "只指", text: "緝風司在山下堵她。她帶朔雲走手勢路，一句不漏。" },
          { title: "雲線", text: "上到雲裡她忽然說很多：水源、獸徑、可藏的洞。朔雲說：你終於是人了。" },
          { title: "自書", text: "名字寫得很淡，像雲。" }
          ],
          relations: [
          { id: "jh_shuoyun", text: "跟她走手勢路出山的門主" },
          { id: "jh_peizhen", text: "在山下問路問到自己哑火的提点" },
          { id: "jh_qingtai", text: "山下唯一能用菜名跟她比手勢聊天的人" }
          ],
        },
      }),
      P({
        id: "jh_shaoyao", name: "芍藥", role: "笑着撿骨的人", trait: "遇見無主遺骨就撿，邊撿邊說笑話給骨頭聽",
        gender: 'female', age: 21, faction: 'zishu', class: "牧師", level: 4, alignment: "中立善良",
        appearance: "芍药色袄裙，背篓裡整齊码着布包白骨，笑容明亮得不像乾這行",
        appearance_detail: "她說骨頭怕冷清。笑话是保溫。寒山寺收留她的篓，空见說：笑着送人回家，也是功德。",
        hint: { location: "亂葬崗雨夜", hook: "芍藥在雨裡跟一具無名骨講笑話，笑完把骨包好背走" },
        looks: ['base', "rain"],
        combat: C("herbal_healer", [10, 12, 13, 12, 16, 15], 28, 12, ["medicine","religion","persuasion"], ["wis","cha"], ["安骨符","spell","1d8+3","radiant",true]),
        story: {
          quote: "你聽完這個，我再帶你去有名字的地方。",
          background: "芍藥父母無葬。她長大後專撿無主骨，送到寒山或原籍。笑話是她對抗恐懼的方法。",
          ideal: "每副骨頭都该被說话聲送一程。",
          bond: "父母空坟上，她每年擺一朵芍药。",
          flaw: "笑脸让人误以為她轻薄亡者。",
          chapters: [
          { title: "雨中笑话", text: "她给無名骨讲赵平卤蛋的事。讲完包骨，背上篓。" },
          { title: "空见", text: "寺裡留一間骨房。空见說：你的笑，比香好聞。" },
          { title: "自書", text: "寫名旁画一朵芍药：也替說不出名字的人占一行。" }
          ],
          relations: [
          { id: "jh_kongjian", text: "给她骨房、說她的笑比香好的方丈" },
          { id: "jh_zhao", text: "笑話素材來源的廚子" },
          { id: "jh_nian", text: "懂她為什麼笑着捡骨的接骨人" }
          ],
        },
      })
    ],
  });
}());
