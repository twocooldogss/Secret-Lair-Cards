/**
 * fetchDropPricesPro.js
 * 高级版：带缓存、趋势追踪、价格历史文件
 * 适配版本：使用卡名（非 Scryfall ID）搜索
 */

import fs from "fs";
import path from "path";

const dropsFile = path.resolve("./data/drops.json");
const pricesFile = path.resolve("./data/drop_prices.json");
const historyFile = path.resolve("./data/price_history.json");
const cacheFile = path.resolve("./data/card_cache.json");

// =====================
// Helper Functions
// =====================
const delay = (ms) => new Promise((r) => setTimeout(r, ms));
const today = new Date().toISOString().slice(0, 10);

// Load JSON safely
const readJSON = (file, fallback = {}) => {
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch {
    return fallback;
  }
};

// Save JSON
const writeJSON = (file, data) => {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
};

// =====================
// Fetch Card Price by Name
// =====================
async function fetchCardPriceByName(cardName, cache) {
  // 检查缓存（24小时内有效）
  const cacheKey = cardName.toLowerCase().trim();
  if (cache[cacheKey] && Date.now() - cache[cacheKey].timestamp < 86400000) {
    return cache[cacheKey].price;
  }

  try {
    // 优先查找 Secret Lair 版本
    const searchQuery = encodeURIComponent(`!"${cardName}" (set:sld OR set:slu OR set:slc OR set:slp)`);
    let response = await fetch(`https://api.scryfall.com/cards/search?q=${searchQuery}`);
    
    if (!response.ok) {
      // 如果没找到 Secret Lair 版本，尝试普通版本
      const fallbackQuery = encodeURIComponent(`!"${cardName}"`);
      response = await fetch(`https://api.scryfall.com/cards/search?q=${fallbackQuery}`);
    }

    if (response.ok) {
      const data = await response.json();
      
      if (data.data && data.data.length > 0) {
        const card = data.data[0];
        // 优先使用 usd_foil（Secret Lair 通常是闪卡），其次是 usd
        const price = parseFloat(card.prices?.usd_foil || card.prices?.usd || 0);
        
        if (price > 0) {
          cache[cacheKey] = { price, timestamp: Date.now() };
          await delay(150); // 防止 Scryfall 速率限制
          return price;
        }
      }
    }
    
    // 如果都没找到，返回 0 并缓存
    cache[cacheKey] = { price: 0, timestamp: Date.now() };
    return 0;
  } catch (err) {
    console.error(`⚠️ Fetch error for card "${cardName}":`, err.message);
    cache[cacheKey] = { price: 0, timestamp: Date.now() };
    return 0;
  }
}

// =====================
// Main Process
// =====================
async function main() {
  console.log(`🚀 Fetching updated Secret Lair prices — ${today}`);

  const drops = readJSON(dropsFile, []);
  const cache = readJSON(cacheFile, {});
  const oldPrices = readJSON(pricesFile, {});
  const history = readJSON(historyFile, {});

  const newPrices = {};
  let processed = 0;
  let total = drops.length;

  for (const drop of drops) {
    if (!drop.cards || drop.cards.length === 0) {
      console.log(`⏭️  Skipping ${drop.name || drop.slug} (no cards)`);
      continue;
    }

    processed++;
    console.log(`🔹 [${processed}/${total}] Processing ${drop.name || drop.slug} (${drop.cards.length} cards)...`);

    let totalPrice = 0;
    let validCards = 0;

    for (const cardName of drop.cards) {
      const price = await fetchCardPriceByName(cardName, cache);
      if (price > 0) {
        totalPrice += price;
        validCards++;
      }
    }

    if (validCards === 0) {
      console.log(`⚠️  No valid prices found for ${drop.name || drop.slug}`);
      continue;
    }

    const avgPrice = totalPrice / validCards;
    const oldPrice = oldPrices[drop.slug]?.total_price_usd || 0;
    const diff = totalPrice - oldPrice;
    const changePct = oldPrice > 0 ? ((diff / oldPrice) * 100).toFixed(2) : "0.00";

    newPrices[drop.slug] = {
      name: drop.name || drop.slug,
      slug: drop.slug,
      card_count: drop.cards.length,
      valid_card_count: validCards,
      total_price_usd: Number(totalPrice.toFixed(2)),
      average_price_usd: Number(avgPrice.toFixed(2)),
      change_pct: Number(changePct),
      last_updated: today
    };

    // Update history (keep last 30 days)
    if (!history[drop.slug]) {
      history[drop.slug] = [];
    }
    history[drop.slug].push({ 
      date: today, 
      total_price_usd: Number(totalPrice.toFixed(2)) 
    });
    
    // Keep only last 30 days
    if (history[drop.slug].length > 30) {
      history[drop.slug] = history[drop.slug].slice(-30);
    }
  }

  // Save results
  writeJSON(pricesFile, newPrices);
  writeJSON(historyFile, history);
  writeJSON(cacheFile, cache);

  console.log("\n✅ Price update complete!");
  console.log(`📊 Updated ${Object.keys(newPrices).length} drops.`);
  console.log(`💾 Saved to: ${pricesFile}`);
  console.log(`📈 History saved to: ${historyFile}`);
}

main().catch(console.error);

