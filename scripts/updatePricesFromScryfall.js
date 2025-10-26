/**
 * updatePricesFromScryfall.js
 * 自动从 Scryfall 拉取每个 Drop 的卡牌价格，计算平均市场价并更新 drops.json
 * 改进版：支持批量处理、错误重试、进度显示
 */

import fs from "fs";
import path from "path";
import fetch from "node-fetch";

// 配置参数
const CONFIG = {
  DELAY_MS: 200,           // API调用间隔
  MAX_RETRIES: 3,          // 最大重试次数
  BATCH_SIZE: 10,          // 批处理大小
  TIMEOUT_MS: 10000,       // 请求超时
};

// 1️⃣ 读取本地 drops.json
const dropsPath = path.resolve("./data/drops.json");
const drops = JSON.parse(fs.readFileSync(dropsPath, "utf8"));

// 2️⃣ 延迟函数（避免触发 Scryfall 限制）
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// 3️⃣ 带重试的API调用
async function fetchWithRetry(url, retries = CONFIG.MAX_RETRIES) {
  for (let i = 0; i < retries; i++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), CONFIG.TIMEOUT_MS);
      
      const res = await fetch(url, { 
        signal: controller.signal,
        headers: {
          'User-Agent': 'SecretLairCards-PriceBot/1.0'
        }
      });
      
      clearTimeout(timeoutId);
      
      if (res.ok) {
        return await res.json();
      } else if (res.status === 429) {
        // 速率限制，等待更长时间
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

// 4️⃣ 从 Scryfall 获取卡牌价格（改进版）
async function fetchCardPrice(cardName) {
  const query = encodeURIComponent(`"${cardName}"`); // 精确匹配
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
        const price = parseFloat(card.prices?.usd || card.prices?.usd_foil || 0);
        return price > 0 ? price : null;
      }
      return null;
    }

    const card = data.data[0];
    const price = parseFloat(card.prices?.usd || card.prices?.usd_foil || 0);
    return price > 0 ? price : null;
    
  } catch (err) {
    console.error(`❌ Error fetching price for ${cardName}:`, err.message);
    return null;
  }
}

// 5️⃣ 批量处理函数
async function processBatch(drops, startIndex, endIndex) {
  const batch = drops.slice(startIndex, endIndex);
  const results = [];
  
  for (const drop of batch) {
    if (!drop.cards || drop.cards.length === 0) {
      console.log(`⏭️ ${drop.name} - No cards to process`);
      continue;
    }

    console.log(`📦 ${drop.name} (${drop.cards.length} cards)`);
    
    let total = 0;
    let count = 0;
    const cardPrices = [];

    for (const cardName of drop.cards) {
      const price = await fetchCardPrice(cardName);
      if (price > 0) {
        total += price;
        count++;
        cardPrices.push({ name: cardName, price });
        console.log(`   💰 ${cardName}: $${price.toFixed(2)}`);
      } else {
        console.log(`   ⚠️ ${cardName}: price not found`);
        cardPrices.push({ name: cardName, price: null });
      }
      await delay(CONFIG.DELAY_MS);
    }

    const avg = count > 0 ? (total / count).toFixed(2) : "0.00";
    const marketPrice = parseFloat(avg);
    
    // 更新drop数据
    drop.market_price = marketPrice;
    drop.price_updated_at = new Date().toISOString();
    drop.card_prices = cardPrices; // 保存每张卡的详细价格
    
    // 如果原来没有price，设置一个合理的默认值
    if (!drop.price && marketPrice > 0) {
      drop.price = Math.max(29.99, marketPrice * 1.2).toFixed(2); // 官方价格通常比市场价高20%
    }

    console.log(`   ✅ Average market price: $${avg}`);
    console.log(`   📊 Official price: $${drop.price || 'N/A'}\n`);
    
    results.push({
      name: drop.name,
      marketPrice,
      officialPrice: drop.price,
      cardCount: count,
      totalCards: drop.cards.length
    });
  }
  
  return results;
}

// 6️⃣ 主执行函数
async function updatePrices() {
  console.log("🔄 Starting price update from Scryfall...\n");
  console.log(`📊 Processing ${drops.length} drops in batches of ${CONFIG.BATCH_SIZE}\n`);
  
  const startTime = Date.now();
  const results = [];
  
  // 分批处理
  for (let i = 0; i < drops.length; i += CONFIG.BATCH_SIZE) {
    const endIndex = Math.min(i + CONFIG.BATCH_SIZE, drops.length);
    console.log(`\n🔄 Processing batch ${Math.floor(i / CONFIG.BATCH_SIZE) + 1}/${Math.ceil(drops.length / CONFIG.BATCH_SIZE)}`);
    
    const batchResults = await processBatch(drops, i, endIndex);
    results.push(...batchResults);
    
    // 批次间延迟
    if (endIndex < drops.length) {
      console.log("⏳ Batch complete, waiting 2s before next batch...");
      await delay(2000);
    }
  }

  // 7️⃣ 写入文件
  fs.writeFileSync(dropsPath, JSON.stringify(drops, null, 2));
  
  // 8️⃣ 生成报告
  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000).toFixed(1);
  
  console.log("\n" + "=".repeat(60));
  console.log("📊 PRICE UPDATE SUMMARY");
  console.log("=".repeat(60));
  console.log(`⏱️  Total time: ${duration}s`);
  console.log(`📦 Drops processed: ${results.length}`);
  console.log(`💰 Drops with market prices: ${results.filter(r => r.marketPrice > 0).length}`);
  console.log(`📈 Average market price: $${(results.reduce((sum, r) => sum + r.marketPrice, 0) / results.length).toFixed(2)}`);
  console.log(`🎯 Success rate: ${((results.filter(r => r.marketPrice > 0).length / results.length) * 100).toFixed(1)}%`);
  
  console.log("\n🏆 TOP 5 MOST VALUABLE DROPS:");
  results
    .filter(r => r.marketPrice > 0)
    .sort((a, b) => b.marketPrice - a.marketPrice)
    .slice(0, 5)
    .forEach((r, i) => {
      console.log(`   ${i + 1}. ${r.name}: $${r.marketPrice.toFixed(2)} (${r.cardCount}/${r.totalCards} cards)`);
    });
  
  console.log("\n✨ Price update complete! Data saved to drops.json");
}

// 9️⃣ 错误处理
process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// 🔟 启动执行
updatePrices().catch(console.error);
