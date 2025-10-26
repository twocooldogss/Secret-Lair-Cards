/**
 * 🪄 SecretLairCards.com – generateDropContent.js
 * -----------------------------------------------
 * 自动为每个 Secret Lair Drop 生成 Markdown 内容文件
 * 结构兼容 Next.js getStaticProps / Contentlayer / MDX 解析器
 *
 * 功能：
 *  - 从 data/drops.json 读取所有 Drop
 *  - 为每个 Drop 生成标准 Markdown 模板
 *  - 若文件已存在则跳过（避免覆盖手动编辑）
 *  - 生成位置：/content/drops/{slug}.md
 *
 * 运行：
 *   node scripts/generateDropContent.js
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 读取drops数据
const dropsPath = path.join(__dirname, '../data/drops.json');
const drops = JSON.parse(fs.readFileSync(dropsPath, 'utf8'));

// 输出目录
const OUTPUT_DIR = path.join(__dirname, '../content/drops');

// 创建目录（若不存在）
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

console.log(`🚀 开始生成 ${drops.length} 个 Drop 的 Markdown 模板...`);

for (const drop of drops) {
  const filePath = path.join(OUTPUT_DIR, `${drop.slug}.md`);

  // 跳过已存在的文件
  if (fs.existsSync(filePath)) {
    console.log(`⏭️  跳过已存在: ${drop.slug}`);
    continue;
  }

  // 生成 Markdown 内容
  const markdown = `---
title: "${drop.name}"
slug: "${drop.slug}"
release_date: "${drop.release_date || ""}"
theme: "${drop.theme || "miscellaneous"}"
artist: "${drop.artist || "Various Artists"}"
image: "${drop.image || ""}"
cards: ${JSON.stringify(drop.cards || [])}
investment_score: ${drop.investment_score || "null"}
status: "${drop.status || "active"}"
---

## 💠 Drop 简介
本系列 Secret Lair 名为 **${drop.name}**，于 ${drop.release_date || "未知日期"} 发布。
它展现了 Magic: The Gathering 的独特艺术魅力与收藏价值。
（此处补充该 Drop 的艺术风格、主题、与其他版本区别等，建议 150+ 字）

## 🃏 卡牌清单
下列为本 Drop 含有的卡牌列表：

| 卡牌名称 | 稀有度 | 简介 |
|-----------|---------|------|
${(drop.cards || [])
  .map((c) => `| ${c} |  |  |`)
  .join("\n")}

👉 [查看全部卡牌详情](/cards?drop=${drop.slug})

## 📈 市场与投资
根据 [Investment 模块](/investment/${drop.slug}) 数据，截至 {{TODAY}}：
- 平均市场价：待更新
- 近 90 天价格趋势：待补充
- 收藏级回报预期：待补充

> 💬 建议简要说明该 Drop 的投资潜力或收藏亮点。

## 🎨 原画师与主题背景
原画师：${drop.artist || "待补充"}  
此部分可补充艺术风格描述、合作品牌（若为跨界）、
或设计理念等背景信息。

## 🔗 相关内容
- 📰 [Secret Lair 2025 完整指南](/news/secret-lair-2025-complete-guide)
- 💼 [投资分析：Secret Lair 的长期回报](/investment)
- 🎃 [最新 Halloween 特辑](/drops/secret-scare-superdrop-2025)
`;

  fs.writeFileSync(filePath, markdown, "utf8");
  console.log(`✅ 已生成: ${drop.slug}.md`);
}

console.log("\n✨ 所有 Markdown 内容模板已生成完毕！");

