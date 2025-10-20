/**
 * 🔮 SecretLairCards.com – fetchDrops.js v4 (平衡版)
 * ---------------------------------------------------
 * 融合v3的全面测试 + v4的核心改进：
 * 1. 多集合搜索 (sld|slu|slc|slp) 
 * 2. 名称映射表
 * 3. 适度数据保护（只跳过真正完整的）
 * 4. 保留封面去重逻辑
 */

import fs from "fs";
import fetch from "node-fetch";

const DROPS_FILE = "./data/drops.json";
const OUTPUT_FILE = "./data/drops.json";
const SCRYFALL_SEARCH = "https://api.scryfall.com/cards/search?q=";
const delay = (ms) => new Promise((r) => setTimeout(r, ms));

// 🧱 名称映射表（解决命名差异）
const NAME_MAP = {
  "jurassic world": "Jurassic World Collection",
  "the big score": "Big Score", 
  "phyrexian faves": "Phyrexian Favorites",
  "doctor who encore": "Doctor Who Encore",
  "the office: dwight's destiny": "The Office",
  "secret scare superdrop 2025": "Secret Scare Superdrop 2025",
  "dreaming darkly": "Dreaming Darkly"
};

function cleanName(name) {
  return String(name || "")
    .replace(/Secret Lair[:x]*/gi, "")
    .replace(/[&.]/g, " ")
    .replace(/[']/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

async function searchScryfall(query) {
  const url = `${SCRYFALL_SEARCH}${encodeURIComponent(query)}`;
  const res = await fetch(url);
  return res.json();
}

async function fetchCardImage(cardName) {
  try {
    const url = `https://api.scryfall.com/cards/named?fuzzy=${encodeURIComponent(cardName)}`;
    const res = await fetch(url);
    const data = await res.json();
    
    if (data?.image_uris?.art_crop) return data.image_uris.art_crop;
    if (data?.image_uris?.normal) return data.image_uris.normal;
    if (data?.image_uris?.large) return data.image_uris.large;
  } catch (e) {
    // 静默失败
  }
  return "";
}

async function fetchDropData(drop) {
  try {
    // 🧱 适度数据保护：只跳过真正完整的（有真实图片+多张卡）
    const hasRealImage = drop.image && !drop.image.includes('placeholder') && !drop.image.includes('svg');
    const hasMultipleCards = drop.cards && drop.cards.length >= 3;
    
    if (hasRealImage && hasMultipleCards) {
      console.log(`⏭️ 跳过已存在完整数据: ${drop.name}`);
      return drop;
    }

    const cleaned = cleanName(drop.name).toLowerCase();
    const mappedName = NAME_MAP[cleaned] || cleaned;
    
    // ① 多集合精确匹配
    let query = `"${mappedName}" (set:sld OR set:slu OR set:slc OR set:slp)`;
    let data = await searchScryfall(query);

    // ② 若没结果，用 artist 搜索
    if (!data.data || data.data.length === 0) {
      const artistQuery = `artist:"${mappedName}" (set:sld OR set:slu OR set:slc OR set:slp)`;
      console.log(`🔄 尝试使用 artist 搜索模式: ${mappedName}`);
      data = await searchScryfall(artistQuery);
    }

    // ③ 若仍没结果，用模糊模式
    if (!data.data || data.data.length === 0) {
      const fuzzyQuery = `${mappedName} (set:sld OR set:slu OR set:slc OR set:slp)`;
      console.log(`🔍 尝试使用模糊搜索模式: ${fuzzyQuery}`);
      data = await searchScryfall(fuzzyQuery);
    }

    // 若仍无数据 → 标记为pending
    if (!data.data || data.data.length === 0) {
      console.warn(`⚠️ 未找到：${drop.name}（标记为 pending）`);
      return { ...drop, fetch_status: "pending" };
    }

    // 提取卡牌与封面
    const validCards = data.data.filter((c) => c.image_uris);
    const cards = validCards.map((c) => c.name);
    
    // 图片级联回退
    const chooseImage = (card) =>
      card?.image_uris?.art_crop || card?.image_uris?.normal || card?.image_uris?.large || "";
    const firstImage = chooseImage(validCards[0]);

    const isPlaceholder = !drop.image || /placeholder/i.test(String(drop.image));

    console.log(`✅ ${drop.name}: ${cards.length} cards`);
    return {
      ...drop,
      cards: drop.cards?.length ? drop.cards : cards,
      image: isPlaceholder ? (firstImage || drop.image || "") : (drop.image || firstImage),
      fetch_status: "ok"
    };
  } catch (err) {
    console.error(`❌ 抓取失败 ${drop.name}:`, err.message);
    return { ...drop, fetch_status: "error" };
  }
}

async function main() {
  console.log("🚀 开始从 Scryfall 获取 Secret Lair 数据 (v4平衡版)...");
  const raw = fs.readFileSync(DROPS_FILE, "utf8");
  const drops = JSON.parse(raw);

  // 用于跟踪已使用的封面，避免重复
  const usedImages = new Set();
  
  const updated = [];
  for (let i = 0; i < drops.length; i++) {
    const drop = drops[i];
    const updatedDrop = await fetchDropData(drop);
    
    // 检查封面是否重复（保留我们现有的去重逻辑）
    if (updatedDrop.image && usedImages.has(updatedDrop.image)) {
      console.warn(`⚠️ 封面重复: ${drop.name} 使用已存在的图片`);
      // 如果重复，尝试使用卡表中的其他卡
      if (Array.isArray(updatedDrop.cards) && updatedDrop.cards.length > 1) {
        for (let j = 1; j < updatedDrop.cards.length; j++) {
          try {
            const altImage = await fetchCardImage(updatedDrop.cards[j]);
            if (altImage && !usedImages.has(altImage)) {
              updatedDrop.image = altImage;
              console.log(`✅ 使用备用卡图: ${updatedDrop.cards[j]}`);
              break;
            }
          } catch (e) {
            // 继续尝试下一张卡
          }
        }
      }
    }
    
    if (updatedDrop.image) {
      usedImages.add(updatedDrop.image);
    }
    
    updated.push(updatedDrop);
    await delay(200); // 避免 API 速率限制
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(updated, null, 2), "utf8");
  
  // 统计输出
  const summary = {
    total: updated.length,
    ok: updated.filter((d) => d.fetch_status === "ok").length,
    pending: updated.filter((d) => d.fetch_status === "pending").length,
    error: updated.filter((d) => d.fetch_status === "error").length,
    skipped: updated.filter((d) => {
      const hasRealImage = d.image && !d.image.includes('placeholder') && !d.image.includes('svg');
      const hasMultipleCards = d.cards && d.cards.length >= 3;
      return hasRealImage && hasMultipleCards;
    }).length
  };

  console.log("\n📊 运行摘要：");
  console.table(summary);
  console.log("\n✨ 数据更新完成！已写入:", OUTPUT_FILE);
}

main().catch((err) => console.error("脚本错误:", err));

