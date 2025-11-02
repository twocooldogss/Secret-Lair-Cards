/**
 * supplementHistory.js
 * 补充历史价格数据（每7天一个点，共4个点覆盖过去30天）
 * 用于丰富价格趋势图数据
 */

import fs from "fs";
import path from "path";

const dropsFile = path.resolve("./data/drops.json");
const pricesFile = path.resolve("./data/drop_prices.json");
const historyFile = path.resolve("./data/price_history.json");

// Helper functions
const readJSON = (file, fallback = {}) => {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch {
    return fallback;
  }
};

const writeJSON = (file, data) => {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
};

// 从 Scryfall API 获取卡片价格（复用原有逻辑）
async function fetchCardPrice(cardName, cache = {}) {
  const cacheKey = cardName.toLowerCase().trim();
  if (cache[cacheKey] && Date.now() - cache[cacheKey].timestamp < 86400000) {
    return cache[cacheKey].price;
  }

  try {
    const searchQuery = encodeURIComponent(`!"${cardName}" (set:sld OR set:slu OR set:slc OR set:slp)`);
    let response = await fetch(`https://api.scryfall.com/cards/search?q=${searchQuery}`);
    
    if (!response.ok) {
      const fallbackQuery = encodeURIComponent(`!"${cardName}"`);
      response = await fetch(`https://api.scryfall.com/cards/search?q=${fallbackQuery}`);
    }

    if (response.ok) {
      const data = await response.json();
      if (data.data && data.data.length > 0) {
        const card = data.data[0];
        const price = parseFloat(card.prices?.usd_foil || card.prices?.usd || 0);
        if (price > 0) {
          cache[cacheKey] = { price, timestamp: Date.now() };
          await new Promise(r => setTimeout(r, 150)); // 防止速率限制
          return price;
        }
      }
    }
    cache[cacheKey] = { price: 0, timestamp: Date.now() };
    return 0;
  } catch (err) {
    console.error(`⚠️ Error fetching price for "${cardName}":`, err.message);
    return 0;
  }
}

// 生成历史日期（过去30天，每7天一个点）
function generateHistoryDates() {
  const dates = [];
  const today = new Date();
  
  // 从今天往前推，每7天一个点
  for (let i = 0; i < 4; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - (i * 7));
    dates.push(date.toISOString().slice(0, 10));
  }
  
  return dates.reverse(); // 从最旧的日期开始
}

// 基于当前价格生成模拟历史价格（用于过去日期的占位数据）
function generateSimulatedHistory(currentPrice, daysAgo) {
  // 模拟价格波动：±5% 范围内随机变化
  const variation = (Math.random() - 0.5) * 0.1; // -5% to +5%
  const simulatedPrice = currentPrice * (1 + variation);
  return Math.max(0.01, Number(simulatedPrice.toFixed(2)));
}

async function main() {
  console.log("🔄 补充历史价格数据说明\n");
  console.log("⚠️  重要：Scryfall API 不支持查询历史价格，只能获取当前价格。");
  console.log("📊 本脚本基于当前价格生成模拟的历史数据，仅用于图表展示。\n");
  console.log("💡 要获得真实历史数据，需要：");
  console.log("   1. 从今天开始，每7天运行一次 `npm run fetch-prices`");
  console.log("   2. 30天后将积累4个真实的历史价格点\n");

  const drops = readJSON(dropsFile, []);
  const prices = readJSON(pricesFile, {});
  const history = readJSON(historyFile, {});
  const cache = readJSON(path.resolve("./data/card_cache.json"), {});

  const historyDates = generateHistoryDates();
  console.log(`📅 将生成以下日期的模拟历史数据: ${historyDates.join(", ")}\n`);
  console.log("⚠️  注意：这些是模拟数据，仅用于趋势图展示\n");

  let updated = 0;
  let skipped = 0;

  for (const drop of drops) {
    if (!drop.cards || drop.cards.length === 0) {
      skipped++;
      continue;
    }

    const currentPriceData = prices[drop.slug];
    if (!currentPriceData || currentPriceData.total_price_usd === 0) {
      skipped++;
      continue;
    }

    // 初始化历史数据数组
    if (!history[drop.slug]) {
      history[drop.slug] = [];
    }

    // 为每个历史日期生成数据
    for (const date of historyDates) {
      // 检查是否已存在该日期的数据
      const exists = history[drop.slug].some(h => h.date === date);
      if (exists) {
        continue; // 跳过已存在的日期
      }

      // 获取当前价格作为参考
      const currentPrice = currentPriceData.total_price_usd;
      
      // 计算日期差异（天数）
      const dateObj = new Date(date);
      const today = new Date();
      const daysDiff = Math.floor((today - dateObj) / (1000 * 60 * 60 * 24));

      // 如果日期在过去，使用模拟价格；如果是今天，使用真实价格
      let historicalPrice;
      if (daysDiff > 0) {
        // 对于过去的日期，基于当前价格生成模拟数据
        // 使用一个简单的趋势：价格可能在过去较低（假设平均涨了5-10%）
        const trendFactor = 1 - (daysDiff / 30) * 0.1; // 最多10%的涨幅
        historicalPrice = currentPrice * Math.max(0.9, trendFactor);
        historicalPrice = generateSimulatedHistory(historicalPrice, daysDiff);
      } else {
        // 今天的日期，使用真实价格
        historicalPrice = currentPrice;
      }

      // 添加到历史记录
      history[drop.slug].push({
        date: date,
        total_price_usd: Number(historicalPrice.toFixed(2))
      });
    }

    // 按日期排序，去重（保留最新的），只保留最近30天的数据
    history[drop.slug].sort((a, b) => {
      const dateDiff = new Date(a.date) - new Date(b.date);
      if (dateDiff === 0) {
        // 同一天的数据，保留最新的（按添加顺序，后面的更新）
        return 1;
      }
      return dateDiff;
    });
    
    // 去重：只保留每个日期的最新一条记录
    const uniqueHistory = [];
    const seenDates = new Set();
    for (let i = history[drop.slug].length - 1; i >= 0; i--) {
      const entry = history[drop.slug][i];
      if (!seenDates.has(entry.date)) {
        uniqueHistory.unshift(entry);
        seenDates.add(entry.date);
      }
    }
    
    // 只保留最近30天的数据
    history[drop.slug] = uniqueHistory.slice(-30);

    updated++;
    
    if (updated % 20 === 0) {
      console.log(`✅ 已处理 ${updated}/${drops.length - skipped} drops...`);
    }
  }

  // 保存历史数据
  writeJSON(historyFile, history);

  console.log("\n✅ 历史数据补充完成！");
  console.log(`📊 更新了 ${updated} 个 drops 的历史数据`);
  console.log(`⏭️  跳过了 ${skipped} 个 drops（无价格数据或无卡片）`);
  console.log(`💾 历史数据已保存到: ${historyFile}`);
  
  // 统计信息
  const totalHistoryPoints = Object.values(history).reduce((sum, h) => sum + h.length, 0);
  console.log(`📈 总历史数据点数: ${totalHistoryPoints}`);
}

main().catch(console.error);

