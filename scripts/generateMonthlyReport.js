/**
 * generateMonthlyReport.js
 * 自动生成 Secret Lair 月度市场报告
 * 基于 drop_prices.json 和 price_history.json 数据
 */

import fs from "fs";
import path from "path";

const pricesFile = path.resolve("./data/drop_prices.json");
const historyFile = path.resolve("./data/price_history.json");
const mockFile = path.resolve("./data/mock.json");
const contentDir = path.resolve("./content/news");

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

// 获取涨跌幅榜单
function getTopMovers(prices) {
  const drops = Object.values(prices).filter(d => d.change_pct !== 0);
  const gainers = drops
    .filter(d => d.change_pct > 0)
    .sort((a, b) => b.change_pct - a.change_pct)
    .slice(0, 5);
  const losers = drops
    .filter(d => d.change_pct < 0)
    .sort((a, b) => a.change_pct - b.change_pct)
    .slice(0, 5);
  
  return { gainers, losers };
}

// 计算整体市场趋势
function calculateMarketTrend(prices) {
  const drops = Object.values(prices);
  if (drops.length === 0) return { avgChange: 0, totalDrops: 0, avgPrice: 0 };
  
  const avgChange = drops.reduce((sum, d) => sum + (d.change_pct || 0), 0) / drops.length;
  const avgPrice = drops.reduce((sum, d) => sum + d.total_price_usd, 0) / drops.length;
  
  return {
    avgChange: Number(avgChange.toFixed(2)),
    totalDrops: drops.length,
    avgPrice: Number(avgPrice.toFixed(2))
  };
}

// 生成 Markdown 内容
function generateMarkdownContent({ month, year, slug, gainers, losers, marketTrend }) {
  const now = new Date();
  const dateStr = `${year}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  
  return `---
title: "Secret Lair ${month} ${year} Market Report – Price Trends & Collector Insights"
date: "${dateStr}"
image: "/og-secret-lair-2025.jpg"
description: "An in-depth look at how Magic: The Gathering Secret Lair drops performed in ${month} ${year}. See which drops surged in value and which dipped, based on live Scryfall market data."
keywords: ["Secret Lair Market Report", "${month} ${year}", "MTG prices", "Secret Lair trends", "Magic investment"]
---

# 📊 Secret Lair ${month} ${year} Market Report

The MTG Secret Lair market showed a **${marketTrend.avgChange > 0 ? "rise" : marketTrend.avgChange < 0 ? "decline" : "stability"} of ${Math.abs(marketTrend.avgChange).toFixed(2)}% overall** in ${month} ${year}, reflecting ongoing collector demand and artwork-driven scarcity trends across ${marketTrend.totalDrops} tracked drops.

## 🚀 Top 5 Gainers

| Rank | Drop | Change (%) | Total Price (USD) | Cards |
|------|------|------------|-------------------|-------|
${gainers
  .map(
    (d, i) =>
      `| ${i + 1} | [${d.name}](/drops/${d.slug}) | **+${d.change_pct.toFixed(2)}%** | $${d.total_price_usd.toFixed(2)} | ${d.card_count} |`
  )
  .join("\n")}

## 📉 Top 5 Decliners

| Rank | Drop | Change (%) | Total Price (USD) | Cards |
|------|------|------------|-------------------|-------|
${losers
  .map(
    (d, i) =>
      `| ${i + 1} | [${d.name}](/drops/${d.slug}) | **${d.change_pct.toFixed(2)}%** | $${d.total_price_usd.toFixed(2)} | ${d.card_count} |`
  )
  .join("\n")}

## 📊 Market Summary

- **Average Drop Value:** $${marketTrend.avgPrice.toFixed(2)}
- **Total Drops Tracked:** ${marketTrend.totalDrops}
- **Market Trend:** ${marketTrend.avgChange > 0 ? "Positive" : marketTrend.avgChange < 0 ? "Negative" : "Neutral"} (${marketTrend.avgChange > 0 ? "+" : ""}${marketTrend.avgChange.toFixed(2)}%)
- **Data Source:** [Scryfall API](https://scryfall.com) (live market data)
- **Analysis Period:** ${month} ${year}

## 🧠 Key Insights

${gainers.length > 0 ? `**Top Performer:** [${gainers[0].name}](/drops/${gainers[0].slug}) led the market with a ${gainers[0].change_pct.toFixed(2)}% increase, reaching a total market value of $${gainers[0].total_price_usd.toFixed(2)}.` : "Limited price movement data available for this period."}

${losers.length > 0 ? `**Biggest Decline:** [${losers[0].name}](/drops/${losers[0].slug}) saw the largest drop at ${losers[0].change_pct.toFixed(2)}%, bringing its total value to $${losers[0].total_price_usd.toFixed(2)}.` : ""}

### 💡 Collector Recommendations

- **Best Value Buys:** Focus on drops with stable or rising prices that haven't peaked yet.
- **Investment Caution:** Drops showing rapid decline may indicate market correction or oversupply.
- **Long-Term Hold:** Artist series and limited-run collaborations tend to appreciate over time.

## 🔗 Explore More

- [View All Market Trends](/investment)
- [Browse All Secret Lair Drops](/drops)
- [Investment Insights & Analysis](/investment)

---

Stay tuned for next month's **Secret Lair Market Insights**, including upcoming 2025 Superdrops and long-term collector performance tracking.

> 🧠 *This report is automatically generated by SecretLairCards.com Market Engine using live Scryfall data.*
`;
}

// 生成 JSON 格式（用于 mock.json）
function generateJSONEntry({ month, year, slug, gainers, losers, marketTrend }) {
  const now = new Date();
  const dateStr = `${year}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  const topGainer = gainers[0];
  const topLoser = losers[0];
  
  return {
    title: `Secret Lair ${month} ${year} Market Report – Price Trends & Collector Insights`,
    slug: `secret-lair-market-report-${slug}`,
    coverImage: `/og-secret-lair-2025.jpg`, // 使用现有 OG 图片作为占位符
    metaTitle: `Secret Lair ${month} ${year} Market Report – MTG Price Trends & Analysis`,
    metaDescription: `See which Secret Lair drops gained or lost value in ${month} ${year}. Based on live Scryfall market data tracking ${marketTrend.totalDrops} drops with ${marketTrend.avgChange > 0 ? "positive" : marketTrend.avgChange < 0 ? "negative" : "neutral"} overall market trend.`,
    keywords: ["Secret Lair Market Report", `${month} ${year}`, "MTG prices", "Secret Lair trends", "Magic investment", "Scryfall data"],
    date: dateStr,
    excerpt: `The MTG Secret Lair market ${marketTrend.avgChange > 0 ? "rose" : marketTrend.avgChange < 0 ? "declined" : "remained stable"} by ${Math.abs(marketTrend.avgChange).toFixed(2)}% in ${month} ${year}. ${topGainer ? `${topGainer.name} led with a +${topGainer.change_pct.toFixed(2)}% gain.` : "Track all price movements and trends for ${marketTrend.totalDrops} Secret Lair drops."}`,
    content: `## 📊 Market Overview\n\nThe Secret Lair market in ${month} ${year} showed ${marketTrend.avgChange > 0 ? "positive momentum" : marketTrend.avgChange < 0 ? "some decline" : "stability"} with an overall ${marketTrend.avgChange > 0 ? "increase" : marketTrend.avgChange < 0 ? "decrease" : "change"} of ${Math.abs(marketTrend.avgChange).toFixed(2)}% across ${marketTrend.totalDrops} tracked drops.\n\n### Top Gainers\n\n${gainers.slice(0, 3).map((d, i) => `${i + 1}. **[${d.name}](/drops/${d.slug})** – +${d.change_pct.toFixed(2)}% ($${d.total_price_usd.toFixed(2)})`).join("\n")}\n\n### Top Decliners\n\n${losers.slice(0, 3).map((d, i) => `${i + 1}. **[${d.name}](/drops/${d.slug})** – ${d.change_pct.toFixed(2)}% ($${d.total_price_usd.toFixed(2)})`).join("\n")}\n\n### Market Analysis\n\n- **Average Drop Value:** $${marketTrend.avgPrice.toFixed(2)}\n- **Total Drops:** ${marketTrend.totalDrops}\n- **Data Source:** Scryfall API\n\nFor detailed charts and 30-day price trends, visit our [Investment Insights](/investment) page.\n\n> *This report is automatically generated using live market data from Scryfall.*`
  };
}

// 主函数
function main() {
  console.log("📊 Generating monthly market report...");
  
  const prices = readJSON(pricesFile, {});
  const now = new Date();
  const monthNames = ["January", "February", "March", "April", "May", "June", 
                       "July", "August", "September", "October", "November", "December"];
  const month = monthNames[now.getMonth()];
  const year = now.getFullYear();
  const slug = `${year}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  
  if (Object.keys(prices).length === 0) {
    console.log("⚠️ No price data available. Run fetch-prices first.");
    return;
  }
  
  const { gainers, losers } = getTopMovers(prices);
  const marketTrend = calculateMarketTrend(prices);
  
  // 生成 Markdown 文件
  const markdown = generateMarkdownContent({ month, year, slug, gainers, losers, marketTrend });
  const markdownFile = path.join(contentDir, `secret-lair-market-report-${slug}.md`);
  
  // 确保目录存在
  if (!fs.existsSync(contentDir)) {
    fs.mkdirSync(contentDir, { recursive: true });
  }
  
  fs.writeFileSync(markdownFile, markdown);
  console.log(`✅ Markdown report generated: ${markdownFile}`);
  
  // 更新 mock.json
  const mockData = readJSON(mockFile, { news: [] });
  const jsonEntry = generateJSONEntry({ month, year, slug, gainers, losers, marketTrend });
  
  // 检查是否已存在（避免重复）
  const existingIndex = mockData.news.findIndex(n => n.slug === jsonEntry.slug);
  if (existingIndex >= 0) {
    mockData.news[existingIndex] = jsonEntry;
    console.log(`📝 Updated existing entry in mock.json`);
  } else {
    mockData.news.unshift(jsonEntry); // 添加到开头
    console.log(`📝 Added new entry to mock.json`);
  }
  
  writeJSON(mockFile, mockData);
  
  console.log("\n✅ Monthly report generation complete!");
  console.log(`📄 Markdown: ${markdownFile}`);
  console.log(`📊 JSON entry added to mock.json`);
  console.log(`\n💡 Remember to create the OG image: /og-secret-lair-market-report-${slug}.jpg`);
}

main();

