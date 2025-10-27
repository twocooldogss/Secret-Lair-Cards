import fs from 'fs';
import path from 'path';

const imagePath = path.join(process.cwd(), 'public', 'og-top-10-secret-lair-artworks-2025.jpg');

console.log('检查封面图文件...\n');

if (!fs.existsSync(imagePath)) {
  console.log('❌ 文件不存在');
  process.exit(1);
}

const stats = fs.statSync(imagePath);
console.log('✅ 文件存在');
console.log(`📁 文件大小: ${stats.size} bytes`);
console.log(`📅 修改时间: ${stats.mtime}`);

// 检查文件头
const buffer = fs.readFileSync(imagePath, { encoding: 'binary', start: 0, end: 10 });
const hex = Buffer.from(buffer, 'binary').toString('hex');

console.log(`🔍 文件头: ${hex}`);

// 检查是否为有效的JPG
if (hex.startsWith('ffd8ff')) {
  console.log('✅ 这是有效的JPG文件');
} else {
  console.log('⚠️  这看起来不是有效的JPG文件');
  console.log('📝 文件内容：');
  const content = fs.readFileSync(imagePath, 'utf8');
  console.log(content.substring(0, 200));
}

