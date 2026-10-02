/* Silverword 角色關係鏈
 * 與《哈利波特》正史同步，1991-1992 畢業生世界觀
 * 關係類型：old_friend（舊識）、secret_ally（暗中合作）、rival（對立）、mentor（師徒）、kin（血緣）
 */

window.SILVER_RELATIONS = {
  // 主角與核心隊員
  "storm": {
    "old_friend": ["jessica", "alice", "ivanna", "rona"], // 去年畢業時的同窗
    "secret_ally": ["bianca", "seraphina"], // 純血家族暗中支持
    "rival": ["morgane", "tamsin"] // 黑魔法研究者與情報販子
  },
  
  // 核心隊員關係
  "jessica": {
    "old_friend": ["storm", "genevieve", "rosalind"],
    "secret_ally": ["freya", "valentina"],
    "rival": ["seraphina"]
  },
  "alice": {
    "old_friend": ["storm", "elke", "poppy", "hana"],
    "secret_ally": ["wilhelmina"],
    "mentor": ["elke"] // 醫療翼實習生指導
  },
  "ivanna": {
    "old_friend": ["storm", "iris", "liliane", "noor"],
    "secret_ally": ["celestine"],
    "rival": ["morgane"]
  },
  "rona": {
    "old_friend": ["storm", "delphine", "tamsin"],
    "secret_ally": ["rook_graycase"],
    "rival": ["camille"] // 記者 vs 情報員
  },
  
  // 葛萊芬多系
  "genevieve": {
    "old_friend": ["jessica", "rosalind", "freya"],
    "secret_ally": ["storm"],
    "rival": ["seraphina"]
  },
  "rosalind": {
    "old_friend": ["jessica", "genevieve", "valentina"],
    "secret_ally": ["soraya_redwing"],
    "rival": []
  },
  "freya": {
    "old_friend": ["genevieve", "jessica"],
    "secret_ally": ["storm"],
    "rival": ["morgane"]
  },
  "valentina": {
    "old_friend": ["rosalind", "jessica"],
    "secret_ally": ["zephyra"],
    "rival": []
  },
  "amara_dunewind": {
    "old_friend": ["nadia"],
    "secret_ally": ["storm"],
    "rival": []
  },
  "calico_bells": {
    "old_friend": ["zephyra", "marisol"],
    "secret_ally": [],
    "rival": []
  },
  "camille": {
    "old_friend": ["storm", "poppy"],
    "secret_ally": ["rook_graycase"],
    "rival": ["rona", "tamsin"]
  },
  "mireille": {
    "old_friend": ["hana", "poppy", "alice"],
    "secret_ally": [],
    "rival": []
  },
  "nadia": {
    "old_friend": ["amara_dunewind", "poppy"],
    "secret_ally": ["storm"],
    "rival": []
  },
  "soraya_redwing": {
    "old_friend": ["rosalind", "zephyra"],
    "secret_ally": [],
    "rival": []
  },
  "zephyra": {
    "old_friend": ["calico_bells", "soraya_redwing", "valentina"],
    "secret_ally": [],
    "rival": []
  },
  
  // 赫夫帕奇系
  "elke": {
    "old_friend": ["alice", "poppy", "wilhelmina"],
    "secret_ally": ["storm"],
    "mentor": ["poppy"]
  },
  "hana": {
    "old_friend": ["mireille", "poppy", "alice"],
    "secret_ally": [],
    "rival": []
  },
  "poppy": {
    "old_friend": ["elke", "hana", "mireille", "camille", "nadia"],
    "secret_ally": ["storm"],
    "mentor": ["elke"]
  },
  "wilhelmina": {
    "old_friend": ["elke", "alice"],
    "secret_ally": ["storm"],
    "rival": []
  },
  "agnes": {
    "old_friend": ["poppy", "elke"],
    "secret_ally": [],
    "rival": []
  },
  
  // 雷文克勞系
  "iris": {
    "old_friend": ["ivanna", "liliane", "noor"],
    "secret_ally": ["celestine"],
    "rival": ["morgane"]
  },
  "liliane": {
    "old_friend": ["ivanna", "iris", "noor"],
    "secret_ally": [],
    "rival": []
  },
  "noor": {
    "old_friend": ["ivanna", "iris", "liliane"],
    "secret_ally": ["celestine"],
    "rival": []
  },
  "celestine": {
    "old_friend": ["ivanna", "iris", "noor"],
    "secret_ally": ["storm"],
    "rival": []
  },
  "aurora_glasswing": {
    "old_friend": ["pyra_glassflame"],
    "secret_ally": [],
    "rival": []
  },
  "pyra_glassflame": {
    "old_friend": ["aurora_glasswing"],
    "secret_ally": [],
    "rival": []
  },
  "sylvie": {
    "old_friend": ["celestine"],
    "secret_ally": [],
    "rival": []
  },
  "wisteria": {
    "old_friend": [],
    "secret_ally": ["storm"],
    "rival": []
  },
  "yuki": {
    "old_friend": ["celestine"],
    "secret_ally": [],
    "rival": []
  },
  "zizi_sealpost": {
    "old_friend": [],
    "secret_ally": [],
    "rival": []
  },
  
  // 史萊哲林系
  "bianca": {
    "old_friend": ["seraphina", "delphine"],
    "secret_ally": ["storm", "jessica"],
    "rival": ["morgane", "tamsin"]
  },
  "seraphina": {
    "old_friend": ["bianca", "delphine"],
    "secret_ally": ["storm"],
    "rival": ["genevieve", "jessica"]
  },
  "delphine": {
    "old_friend": ["bianca", "seraphina", "rona"],
    "secret_ally": [],
    "rival": []
  },
  "morgane": {
    "old_friend": [],
    "secret_ally": [],
    "rival": ["storm", "ivanna", "iris", "freya", "bianca"]
  },
  "octavia": {
    "old_friend": ["tamsin"],
    "secret_ally": [],
    "rival": []
  },
  "tamsin": {
    "old_friend": ["octavia", "rona"],
    "secret_ally": [],
    "rival": ["storm", "camille", "bianca"]
  },
  "vesria": {
    "old_friend": [],
    "secret_ally": ["storm"],
    "rival": []
  },
  "rook_graycase": {
    "old_friend": ["camille"],
    "secret_ally": ["rona"],
    "rival": []
  },
  
  // 其他種族角色
  "alba_cloudpost": {
    "old_friend": ["zephyra"],
    "secret_ally": [],
    "rival": []
  },
  "marisol": {
    "old_friend": ["calico_bells", "delphine"],
    "secret_ally": [],
    "rival": []
  },
  "mina_deeppost": {
    "old_friend": [],
    "secret_ally": ["storm", "rona"],
    "rival": []
  },
  "mireya_emberdance": {
    "old_friend": [],
    "secret_ally": [],
    "rival": []
  },
  "amara_dunewind": {
    "old_friend": ["nadia"],
    "secret_ally": ["storm"],
    "rival": []
  }
};

/* 關係說明（用於 UI 顯示）
 * old_friend: 去年畢業時的同窗、舊識
 * secret_ally: 暗中合作、互相幫助但不公開
 * rival: 理念衝突、競爭關係
 * mentor: 師徒/指導關係
 * kin: 血緣關係（本系列暫無）
 */
