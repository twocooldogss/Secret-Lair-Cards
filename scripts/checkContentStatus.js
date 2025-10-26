import fs from 'fs';
import path from 'path';

const CONTENT_DIR = './content/drops';

console.log('📊 检查内容填充状态...\n');

const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.md'));
console.log(`总Markdown文件数: ${files.length}`);

let filledCount = 0;
let unfilledCount = 0;
const unfilledFiles = [];

files.forEach(file => {
  const filePath = path.join(CONTENT_DIR, file);
  const content = fs.readFileSync(filePath, 'utf8');
  
  // 检查是否还是模板内容
  const isTemplate = content.includes('This unique Secret Lair collection showcases the creative diversity of Magic: The Gathering. Each card features distinctive artwork that reimagines classic cards through a fresh artistic lens, offering collectors and players a truly unique experience.');
  
  if (isTemplate) {
    unfilledCount++;
    unfilledFiles.push(file);
  } else {
    filledCount++;
  }
});

console.log(`✅ 已填充内容的文件数: ${filledCount}`);
console.log(`⏳ 未填充的文件数: ${unfilledCount}`);
console.log(`📈 填充进度: ${((filledCount / files.length) * 100).toFixed(1)}%`);

if (unfilledFiles.length > 0) {
  console.log('\n⏳ 未填充的文件列表:');
  unfilledFiles.slice(0, 10).forEach(file => console.log(`  - ${file}`));
  if (unfilledFiles.length > 10) {
    console.log(`  ... 还有 ${unfilledFiles.length - 10} 个文件`);
  }
}

console.log('\n✨ 检查完成！');
