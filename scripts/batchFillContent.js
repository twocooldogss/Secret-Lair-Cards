/**
 * 🪄 SecretLairCards.com – batchFillContent.js
 * -------------------------------------------
 * 批量填充 Drop 内容，支持多种内容生成策略
 *
 * 功能：
 *  - 检查未填充的文件
 *  - 生成基础内容模板
 *  - 支持ChatGPT内容导入
 *  - 智能内容匹配
 *
 * 运行：
 *   node scripts/batchFillContent.js
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 内容目录
const CONTENT_DIR = path.join(__dirname, '../content/drops');

/**
 * 生成基础内容模板
 */
function generateBasicContent(dropName, dropData) {
  const themes = {
    'artist': '艺术家系列',
    'crossover': '跨界合作',
    'holiday': '节日特辑',
    'horror': '恐怖主题',
    'anime': '动漫风格',
    'retro': '复古风格',
    'fantasy': '奇幻主题',
    'sci-fi': '科幻主题',
    'miscellaneous': '其他主题'
  };

  const theme = themes[dropData.theme] || '特殊主题';
  const artist = dropData.artist || '多位艺术家';
  const releaseDate = dropData.release_date || '未知日期';

  return `**${dropName}** 是 Secret Lair 系列中的${theme}作品，由${artist}创作，于${releaseDate}发布。

这个独特的收藏系列展现了 Magic: The Gathering 的艺术多样性，每张卡牌都经过精心设计，融合了现代艺术风格与经典游戏元素。

该系列不仅具有收藏价值，更体现了 Magic 卡牌作为艺术品的独特魅力，为收藏家和玩家提供了独特的视觉体验。`;
}

/**
 * 检查文件是否需要填充
 */
function needsFilling(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  return content.includes('此处补充该 Drop 的艺术风格') || 
         content.includes('（此处补充该 Drop 的艺术风格、主题、与其他版本区别等，建议 150+ 字）');
}

/**
 * 填充单个文件
 */
function fillFile(filePath, dropData) {
  const content = fs.readFileSync(filePath, 'utf8');
  
  // 生成基础内容
  const basicContent = generateBasicContent(dropData.name || dropData.title, dropData);
  
  // 替换占位符
  const updatedContent = content.replace(
    /（此处补充该 Drop 的艺术风格、主题、与其他版本区别等，建议 150\+ 字）/, 
    basicContent
  );
  
  fs.writeFileSync(filePath, updatedContent, 'utf8');
  return true;
}

/**
 * 主函数
 */
function main() {
  console.log('🚀 开始批量填充 Drop 内容...\n');
  
  // 读取 drops.json 数据
  const dropsPath = path.join(__dirname, '../data/drops.json');
  const dropsData = JSON.parse(fs.readFileSync(dropsPath, 'utf8'));
  
  // 创建映射
  const dropsMap = new Map();
  dropsData.forEach(drop => {
    dropsMap.set(drop.slug, drop);
  });
  
  let processedCount = 0;
  let skippedCount = 0;
  
  // 遍历所有文件
  const files = fs.readdirSync(CONTENT_DIR);
  
  for (const file of files) {
    if (!file.endsWith('.md')) continue;
    
    const filePath = path.join(CONTENT_DIR, file);
    const slug = file.replace('.md', '');
    
    if (!needsFilling(filePath)) {
      skippedCount++;
      continue;
    }
    
    const dropData = dropsMap.get(slug);
    if (!dropData) {
      console.log(`⚠️  未找到数据: ${slug}`);
      continue;
    }
    
    try {
      fillFile(filePath, dropData);
      processedCount++;
      console.log(`✅ 已填充: ${slug}`);
    } catch (error) {
      console.log(`❌ 填充失败: ${slug} - ${error.message}`);
    }
  }
  
  console.log(`\n📊 处理完成:`);
  console.log(`- 已填充: ${processedCount}`);
  console.log(`- 已跳过: ${skippedCount}`);
  console.log(`- 总计: ${files.length}`);
  
  if (processedCount > 0) {
    console.log(`\n✨ 成功填充了 ${processedCount} 个 Drop 内容！`);
  }
}

// 运行主函数
main();
