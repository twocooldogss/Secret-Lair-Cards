// 测试智能slug匹配逻辑
const mockSlug = "reaper-king-secret-scare";
const data = require('./data/mock.json');

console.log('测试URL:', mockSlug);
console.log('---');

// 精确匹配
let card = data.cards.find((c) => c.slug === mockSlug);
console.log('精确匹配:', card ? card.name : '❌ 未找到');

// 智能匹配
if (!card) {
  const slugParts = mockSlug.split('-');
  for (let i = slugParts.length - 1; i > 0; i--) {
    const possibleSlug = slugParts.slice(0, i).join('-');
    console.log(`尝试匹配: ${possibleSlug}`);
    card = data.cards.find((c) => c.slug === possibleSlug);
    if (card) {
      console.log('✅ 找到匹配:', card.name);
      break;
    }
  }
}

if (card) {
  console.log('\n卡片信息:');
  console.log('- 名称:', card.name);
  console.log('- Slug:', card.slug);
  console.log('- Drop ID:', card.dropId);
} else {
  console.log('\n❌ 未找到匹配的卡片');
}
