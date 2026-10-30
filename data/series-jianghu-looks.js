/* 江湖名冊 · 換裝覆蓋層：為尚未掛 looks 的角色補上雨夜／夜行／盟會 */
(function () {
  const L = (id, look) => ({ id, looks: ['base', look] });
  window.SERIES = window.SERIES || [];
  window.SERIES.push({
    id: 'jianghu',
    characters: [
      /* rain */
      L('jh_shen', 'rain'), L('jh_xiaoman', 'rain'), L('jh_zhao', 'rain'), L('jh_qiao', 'rain'),
      L('jh_niu', 'rain'), L('jh_suwan', 'rain'), L('jh_nian', 'rain'), L('jh_ruanci', 'rain'),
      L('jh_anan', 'rain'), L('jh_mingyan', 'rain'), L('jh_shuisheng', 'rain'), L('jh_tiepo', 'rain'),
      L('jh_yueniang', 'rain'), L('jh_laogeng', 'rain'), L('jh_huier', 'rain'), L('jh_chenshu', 'rain'),
      L('jh_jiuyue', 'rain'), L('jh_kanglei', 'rain'), L('jh_taomi', 'rain'), L('jh_ayu', 'rain'),
      L('jh_zhuniang', 'rain'), L('jh_bosu', 'rain'),
      /* night */
      L('jh_gongqi', 'night'), L('jh_hudeng', 'night'), L('jh_chukuang', 'night'), L('jh_peizhen', 'night'),
      L('jh_gaoyuan', 'night'), L('jh_xuning', 'night'), L('jh_cuiwu', 'night'), L('jh_xiaoyu', 'night'),
      L('jh_hanbo', 'night'), L('jh_luoyi', 'night'), L('jh_weichang', 'night'), L('jh_ahe', 'night'),
      L('jh_luhan', 'night'), L('jh_yanmo', 'night'), L('jh_shiyan', 'night'), L('jh_moshan', 'night'),
      L('jh_bailang', 'night'), L('jh_anye', 'night'), L('jh_yinghua', 'night'), L('jh_moyu', 'night'),
      L('jh_jiaolang', 'night'), L('jh_zhiyuan', 'night'), L('jh_wuchen', 'night'),
      /* menghui */
      L('jh_huo', 'menghui'), L('jh_tangyi', 'menghui'), L('jh_shaochuan', 'menghui'), L('jh_dujuan', 'menghui'),
      L('jh_guyan', 'menghui'), L('jh_duan', 'menghui'), L('jh_kongjian', 'menghui'), L('jh_huiming', 'menghui'),
      L('jh_jingxin', 'menghui'), L('jh_liaoshi', 'menghui'), L('jh_yuanzhao', 'menghui'), L('jh_qingtai', 'menghui'),
      L('jh_menggu', 'menghui'), L('jh_kuchan', 'menghui'), L('jh_xuelan', 'menghui'), L('jh_zhongjiu', 'menghui'),
      L('jh_huyan', 'menghui'), L('jh_guduo', 'menghui'), L('jh_shazhou', 'menghui'), L('jh_lanyin', 'menghui'),
      L('jh_suyan', 'menghui'), L('jh_lingbo', 'menghui'), L('jh_caiduo', 'menghui'),
    ],
  });
}());
