import fs from 'fs';
import path from 'path';

const CONTENT_DIR = './content/drops';

console.log('🔍 检查未填充内容的文件...\n');

const files = fs.readdirSync(CONTENT_DIR);
let unfilledCount = 0;
const unfilledFiles = [];

files.forEach(file => {
  if (file.endsWith('.md')) {
    const filePath = path.join(CONTENT_DIR, file);
    const content = fs.readFileSync(filePath, 'utf8');
    
    // 检查是否包含模板内容
    if (content.includes('此处补充该 Drop 的艺术风格') || 
        content.includes('（此处补充该 Drop 的艺术风格、主题、与其他版本区别等，建议 150+ 字）')) {
      unfilledCount++;
      unfilledFiles.push(file.replace('.md', ''));
    }
  }
});

console.log(`📊 统计结果:`);
console.log(`- 总文件数: ${files.length}`);
console.log(`- 已填充: ${files.length - unfilledCount}`);
console.log(`- 待填充: ${unfilledCount}`);
console.log(`\n📝 待填充的文件列表:`);
unfilledFiles.forEach((file, index) => {
  console.log(`${index + 1}. ${file}`);
});

if (unfilledCount > 0) {
  console.log(`\n💡 建议: 可以批量生成更多ChatGPT内容来填充这些文件`);
}
