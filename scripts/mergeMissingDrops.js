/**
 * 🔮 SecretLairCards.com – 合并漏项数据脚本
 * ----------------------------------------------
 * 功能：
 *  1. 读取现有的 /data/drops.json
 *  2. 读取漏项数据 /data/missing_drops.json
 *  3. 将漏项数据转换为现有格式并合并
 *  4. 写回 /data/drops.json
 *
 * 运行方式：
 *    node scripts/mergeMissingDrops.js
 */

import fs from "fs";

const DROPS_FILE = "./data/drops.json";
const MISSING_DROPS_FILE = "./data/missing_drops.json";

function convertMissingDropToFormat(missingDrop) {
  // 将漏项数据转换为现有drops.json的格式
  return {
    slug: missingDrop.slug,
    name: missingDrop.name,
    release_date: missingDrop.releaseDate,
    cards: missingDrop.cards || [],
    image: missingDrop.imageUrl || "",
    card_count: missingDrop.cards ? missingDrop.cards.length : 0,
    price: missingDrop.price,
    status: missingDrop.soldOut ? "sold_out" : "active",
    theme: missingDrop.theme,
    description: missingDrop.description,
    is_artist_series: missingDrop.artist !== "Various Artists",
    is_crossover: missingDrop.tags.includes("crossover"),
    quality_score: 85, // 给漏项数据一个较高的质量分数
    release_year: missingDrop.release_year,
    featured: missingDrop.featured,
    tags: missingDrop.tags
  };
}

async function main() {
  console.log("🚀 开始合并漏项数据...");
  
  try {
    // 读取现有数据
    const existingDropsRaw = fs.readFileSync(DROPS_FILE, "utf8");
    const existingDrops = JSON.parse(existingDropsRaw);
    console.log(`📊 现有 drops 数量: ${existingDrops.length}`);
    
    // 读取漏项数据
    const missingDropsRaw = fs.readFileSync(MISSING_DROPS_FILE, "utf8");
    const missingDrops = JSON.parse(missingDropsRaw);
    console.log(`📊 漏项 drops 数量: ${missingDrops.length}`);
    
    // 检查是否已存在相同的slug
    const existingSlugs = new Set(existingDrops.map(drop => drop.slug));
    const newDrops = [];
    const skippedDrops = [];
    
    for (const missingDrop of missingDrops) {
      if (existingSlugs.has(missingDrop.slug)) {
        skippedDrops.push(missingDrop.slug);
        console.log(`⚠️ 跳过已存在的 drop: ${missingDrop.slug}`);
      } else {
        const convertedDrop = convertMissingDropToFormat(missingDrop);
        newDrops.push(convertedDrop);
        console.log(`✅ 添加新 drop: ${missingDrop.slug}`);
      }
    }
    
    // 合并数据
    const mergedDrops = [...existingDrops, ...newDrops];
    
    // 按发布日期排序（最新的在前）
    mergedDrops.sort((a, b) => {
      const dateA = new Date(a.release_date);
      const dateB = new Date(b.release_date);
      return dateB - dateA;
    });
    
    // 写回文件
    fs.writeFileSync(DROPS_FILE, JSON.stringify(mergedDrops, null, 2), "utf8");
    
    console.log("\n✨ 合并完成！");
    console.log(`📊 总 drops 数量: ${mergedDrops.length}`);
    console.log(`✅ 新增 drops: ${newDrops.length}`);
    console.log(`⚠️ 跳过 drops: ${skippedDrops.length}`);
    console.log(`📁 已写入: ${DROPS_FILE}`);
    
    if (skippedDrops.length > 0) {
      console.log("\n跳过的 drops:");
      skippedDrops.forEach(slug => console.log(`  - ${slug}`));
    }
    
  } catch (error) {
    console.error("❌ 合并失败:", error.message);
    process.exit(1);
  }
}

main().catch((err) => console.error("脚本错误:", err));



