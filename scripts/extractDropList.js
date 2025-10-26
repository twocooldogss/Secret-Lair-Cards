import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 读取drops数据
const dropsPath = path.join(__dirname, '../data/drops.json');
const drops = JSON.parse(fs.readFileSync(dropsPath, 'utf8'));

console.log('📋 Secret Lair Drops 列表:');
console.log('='.repeat(50));

drops.forEach((drop, index) => {
  console.log(`${index + 1}. ${drop.name}`);
});

console.log('='.repeat(50));
console.log(`总计: ${drops.length} 个 Drops`);

