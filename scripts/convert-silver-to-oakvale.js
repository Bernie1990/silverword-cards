/**
 * 把 silver-roster 的 70 位角色轉換成橡木鎮版本
 * 使用字串替換方式，避免 JSON 解析問題
 */

const fs = require('fs');

function main() {
  console.log('讀取 silver-roster.js...');
  let content = fs.readFileSync('data/series-silver-roster.js', 'utf8');
  
  // 字串替換：地點
  const locationReplacements = [
    ['貓頭鷹棚', '鎮廣場·信鴉塔'],
    ['鐘塔', '灰燼熔爐·鐘樓'],
    ['大禮堂', '鎮廣場·議事廳'],
    ['萬應室', '鎮廣場·萬應室'],
    ['廚房', '鎮廣場·灶屋'],
    ['醫療翼', '鎮廣場·癒所'],
    ['溫室', '鎮外·藥園'],
    ['圖書館', '鎮廣場·書樓'],
    ['天文塔', '鎮外·觀星臺'],
    ['魔藥教室', '鎮廣場·藥坊'],
    ['獎盃室', '鎮廣場·功名堂'],
    ['雷文克勞塔', '鎮外·智者居'],
    ['史萊哲林地牢', '鎮外·影窖']
  ];
  
  locationReplacements.forEach(([from, to]) => {
    content = content.replace(new RegExp(from, 'g'), to);
  });
  
  // 字串替換：世界名稱
  content = content.replace(/霍格華茲/g, '橡木鎮');
  content = content.replace(/城堡/g, '鎮上');
  content = content.replace(/學生/g, '旅人');
  content = content.replace(/教師/g, '工匠');
  
  // faction 替換
  content = content.replace(/"faction":"gryffindor"/g, '"faction":"silver_chalice"');
  content = content.replace(/"faction":"hufflepuff"/g, '"faction":"silver_chalice"');
  content = content.replace(/"faction":"ravenclaw"/g, '"faction":"azure_spire"');
  content = content.replace(/"faction":"slytherin"/g, '"faction":"obsidian_pact"');
  
  // 讀取 oakvale-roster
  console.log('讀取 oakvale-roster.js...');
  const oakvaleContent = fs.readFileSync('data/series-oakvale-roster.js', 'utf8');
  
  // 提取 silver-roster 的 characters 陣列
  const silverCharsMatch = content.match(/"characters":\s*(\[[\s\S]*\])\s*\}\s*\}\s*\}\s*\}\s*\)/);
  
  if (!silverCharsMatch) {
    console.error('無法找到 silver-roster 的 characters 陣列');
    // 嘗試另一種方式
    const altMatch = content.match(/"characters":\s*(\[[\s\S]*)\]\s*\}\s*\}\s*\)/);
    if (altMatch) {
      console.log('找到替代匹配');
    }
    return;
  }
  
  console.log('找到 silver-roster characters');
  
  // 由於解析困難，直接用字串合併
  // 找到 oakvale-roster 的 characters 結束位置
  const oakvaleEnd = oakvaleContent.lastIndexOf(']});');
  const oakvalePrefix = oakvaleContent.substring(0, oakvaleEnd);
  
  // 從 silver-roster 提取 characters 部分（從 "characters":[ 開始到結束）
  const silverStart = content.indexOf('"characters":[');
  const silverEnd = content.lastIndexOf(']});');
  const silverCharsPart = content.substring(silverStart + 14, silverEnd); // 跳過 "characters":[
  
  // 合併
  const newContent = oakvalePrefix + ',' + silverCharsPart + ']});';
  
  fs.writeFileSync('data/series-oakvale-roster.js', newContent, 'utf8');
  console.log('✅ 合併完成');
  
  fs.unlinkSync('data/series-silver-roster.js');
  console.log('✅ 已刪除 data/series-silver-roster.js');
}

main();
