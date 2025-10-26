/**
 * generateCardImages.js
 * 批量生成卡牌图片数据并保存到本地缓存
 * 避免在页面加载时进行大量API调用
 */

import fs from 'fs';
import path from 'path';

// 配置
const CONFIG = {
  DELAY_MS: 200,           // API调用间隔
  MAX_RETRIES: 3,          // 最大重试次数
  CACHE_FILE: './data/cardImages.json'
};

// 延迟函数
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// 带重试的API调用
async function fetchWithRetry(url, retries = CONFIG.MAX_RETRIES) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'SecretLairCards-ImageBot/1.0'
        }
      });
      
      if (response.ok) {
        return await response.json();
      } else if (response.status === 429) {
        console.log(`   ⏳ Rate limited, waiting ${(i + 1) * 2}s...`);
        await delay((i + 1) * 2000);
        continue;
      }
    } catch (err) {
      if (i === retries - 1) throw err;
      console.log(`   🔄 Retry ${i + 1}/${retries} for ${url}`);
      await delay(1000 * (i + 1));
    }
  }
  throw new Error(`Failed after ${retries} retries`);
}

// 获取单张卡牌信息
async function fetchCardData(cardName) {
  const query = encodeURIComponent(`"${cardName}"`);
  const url = `https://api.scryfall.com/cards/search?q=${query}`;
  
  try {
    const data = await fetchWithRetry(url);
    
    if (!data.data || data.data.length === 0) {
      // 尝试模糊搜索
      const fuzzyQuery = encodeURIComponent(cardName);
      const fuzzyUrl = `https://api.scryfall.com/cards/search?q=${fuzzyQuery}`;
      const fuzzyData = await fetchWithRetry(fuzzyUrl);
      
      if (fuzzyData.data && fuzzyData.data.length > 0) {
        const card = fuzzyData.data[0];
        return {
          name: cardName,
          image: card.image_uris?.art_crop || card.image_uris?.normal || card.image_uris?.large || '/images/placeholder.svg',
          description: card.oracle_text || '',
          rarity: card.rarity || '',
          type: card.type_line || '',
          mana_cost: card.mana_cost || '',
          power: card.power || '',
          toughness: card.toughness || ''
        };
      }
      return null;
    }

    const card = data.data[0];
    return {
      name: cardName,
      image: card.image_uris?.art_crop || card.image_uris?.normal || card.image_uris?.large || '/images/placeholder.svg',
      description: card.oracle_text || '',
      rarity: card.rarity || '',
      type: card.type_line || '',
      mana_cost: card.mana_cost || '',
      power: card.power || '',
      toughness: card.toughness || ''
    };
    
  } catch (err) {
    console.error(`❌ Error fetching data for ${cardName}:`, err.message);
    return null;
  }
}

// 主执行函数
async function generateCardImages() {
  console.log("🔄 Starting card image generation...\n");
  
  // 读取drops数据
  const dropsPath = path.resolve("./data/drops.json");
  const drops = JSON.parse(fs.readFileSync(dropsPath, "utf8"));
  
  // 收集所有唯一的卡牌名称
  const allCardNames = new Set();
  drops.forEach(drop => {
    if (drop.cards && Array.isArray(drop.cards)) {
      drop.cards.forEach(cardName => allCardNames.add(cardName));
    }
  });
  
  const uniqueCardNames = Array.from(allCardNames);
  console.log(`📊 Found ${uniqueCardNames.length} unique cards across ${drops.length} drops\n`);
  
  // 读取现有缓存
  let existingCache = {};
  if (fs.existsSync(CONFIG.CACHE_FILE)) {
    try {
      existingCache = JSON.parse(fs.readFileSync(CONFIG.CACHE_FILE, "utf8"));
      console.log(`📁 Loaded existing cache with ${Object.keys(existingCache).length} cards\n`);
    } catch (err) {
      console.log("⚠️ Could not load existing cache, starting fresh\n");
    }
  }
  
  const startTime = Date.now();
  const results = [];
  let processed = 0;
  
  // 处理每张卡牌
  for (const cardName of uniqueCardNames) {
    // 如果缓存中已有，跳过
    if (existingCache[cardName]) {
      console.log(`⏭️ ${cardName} - already cached`);
      processed++;
      continue;
    }
    
    console.log(`📦 ${cardName}`);
    const cardData = await fetchCardData(cardName);
    
    if (cardData) {
      existingCache[cardName] = cardData;
      results.push(cardData);
      console.log(`   ✅ Image: ${cardData.image}`);
    } else {
      console.log(`   ❌ No data found`);
      // 添加占位符数据
      existingCache[cardName] = {
        name: cardName,
        image: '/images/placeholder.svg',
        description: '',
        rarity: '',
        type: '',
        mana_cost: '',
        power: '',
        toughness: ''
      };
    }
    
    processed++;
    console.log(`   📊 Progress: ${processed}/${uniqueCardNames.length}\n`);
    
    // 延迟避免API限制
    await delay(CONFIG.DELAY_MS);
  }
  
  // 保存缓存
  fs.writeFileSync(CONFIG.CACHE_FILE, JSON.stringify(existingCache, null, 2));
  
  // 生成报告
  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000).toFixed(1);
  
  console.log("=".repeat(60));
  console.log("📊 CARD IMAGE GENERATION SUMMARY");
  console.log("=".repeat(60));
  console.log(`⏱️  Total time: ${duration}s`);
  console.log(`📦 Cards processed: ${processed}`);
  console.log(`✅ Cards with images: ${results.length}`);
  console.log(`📁 Cache file: ${CONFIG.CACHE_FILE}`);
  console.log(`🎯 Success rate: ${((results.length / processed) * 100).toFixed(1)}%`);
  
  console.log("\n🏆 TOP 5 CARDS WITH IMAGES:");
  results.slice(0, 5).forEach((card, i) => {
    console.log(`   ${i + 1}. ${card.name}: ${card.type}`);
  });
  
  console.log("\n✨ Card image generation complete!");
}

// 错误处理
process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// 启动执行
generateCardImages().catch(console.error);
