import fs from 'fs';
import path from 'path';

// 读取drops数据
const dropsPath = path.join(process.cwd(), 'data', 'drops.json');
const drops = JSON.parse(fs.readFileSync(dropsPath, 'utf-8'));

// 计算统计数据
const totalDrops = drops.length;
const totalCards = drops.reduce((sum, drop) => sum + (drop.cards ? drop.cards.length : 0), 0);

// 获取年份范围
const years = drops
  .map(drop => drop.release_date)
  .filter(date => date)
  .map(date => new Date(date).getFullYear())
  .filter(year => !isNaN(year));

const minYear = Math.min(...years);
const maxYear = Math.max(...years);
const yearRange = `${minYear}-${maxYear}`;

console.log('📊 Secret Lair Statistics:');
console.log(`Total Drops: ${totalDrops}`);
console.log(`Total Cards: ${totalCards}`);
console.log(`Year Range: ${yearRange}`);

// 输出为JSON格式，方便在页面中使用
const stats = {
  totalDrops,
  totalCards,
  yearRange,
  minYear,
  maxYear
};

console.log('\n📋 JSON Stats:');
console.log(JSON.stringify(stats, null, 2));