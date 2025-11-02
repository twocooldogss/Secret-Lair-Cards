# 📊 月度报告功能测试指南

## ✅ 已生成的月度报告

**文件名：** `content/news/secret-lair-market-report-2025-11.md`  
**Slug：** `secret-lair-market-report-2025-11`  
**日期：** 2025-11-02

## 🧪 测试步骤

### 1. 访问新闻列表页面
```
http://localhost:3000/news
```

**预期结果：**
- 月度报告应显示在新闻列表的第一位（最新）
- 标题：**"Secret Lair November 2025 Market Report – Price Trends & Collector Insights"**
- 封面图：`/og-secret-lair-market-report-2025-11.jpg`（需要创建）

### 2. 访问月度报告详情
```
http://localhost:3000/news/secret-lair-market-report-2025-11
```

**预期显示内容：**
- ✅ 标题和日期
- ✅ Market Summary（平均价格、趋势、数据来源）
- ✅ Top 5 Gainers 表格
- ✅ Top 5 Decliners 表格
- ✅ Key Insights（最佳表现者、最大跌幅）
- ✅ Collector Recommendations
- ✅ 内部链接（到 /drops 和 /investment）

### 3. 验证数据准确性

**检查报告中的数据：**
- [ ] 市场趋势：+0.30%（基于 3 个 drops）
- [ ] Top Gainer：Secret Lair: Adam Paquette (+2.15%)
- [ ] Top Decliner：Secret Scare Superdrop 2025 (-1.25%)
- [ ] 平均 Drop 价值：$48.85
- [ ] 总 Drops 数量：3

### 4. 验证 SEO 元数据

检查页面源代码中的：
- [ ] `<title>` 标签包含 "Market Report"
- [ ] `<meta description>` 包含 "Price Trends"
- [ ] JSON-LD Schema 包含 `BlogPosting` 类型

## 📝 报告内容示例

报告应包含以下章节：

1. **📊 Market Summary**
   - Average Drop Value
   - Total Drops Tracked
   - Market Trend (Positive/Negative/Neutral)
   - Data Source (Scryfall API)

2. **🚀 Top 5 Gainers** (表格格式)
   - Rank, Drop Name, Change %, Total Price, Cards

3. **📉 Top 5 Decliners** (表格格式)
   - Rank, Drop Name, Change %, Total Price, Cards

4. **🧠 Key Insights**
   - Top Performer 分析
   - Biggest Decline 分析
   - Collector Recommendations

## 🔗 内部链接检查

报告应包含链接到：
- [ ] `/drops/adam-paquette` (Top Gainer)
- [ ] `/drops/secret-scare-superdrop-2025` (Top Decliner)
- [ ] `/investment` (市场趋势页面)
- [ ] `/drops` (所有 Drops 列表)

## 🖼️ OG 图片

**需要创建：**
- `/public/og-secret-lair-market-report-2025-11.jpg`
- 尺寸建议：1200x630px
- 内容：市场报告主题，包含图表元素

## ⚙️ 自动化测试

### 脚本测试
```bash
# 重新生成报告（会更新现有报告）
npm run generate-report
```

**预期输出：**
```
📊 Generating monthly market report...
✅ Markdown report generated: .../secret-lair-market-report-2025-11.md
📝 Updated existing entry in mock.json
✅ Monthly report generation complete!
```

## 📊 当前报告数据

基于 `data/drop_prices.json`：
- **3 drops** 有价格数据
- **整体趋势：** +0.30%（轻微上涨）
- **最佳表现：** Adam Paquette (+2.15%)
- **最大跌幅：** Secret Scare (-1.25%)

## 🎯 测试检查清单

- [ ] 新闻列表显示月度报告
- [ ] 报告详情页正常加载
- [ ] Markdown 内容正确渲染（表格、链接）
- [ ] 数据统计准确
- [ ] SEO 元数据正确
- [ ] 内部链接可点击
- [ ] 响应式设计正常（移动端）

## 📌 注意事项

1. **OG 图片**：报告引用了 `/og-secret-lair-market-report-2025-11.jpg`，如果图片不存在，会在页面显示占位符或错误

2. **数据更新**：报告是基于当前 `drop_prices.json` 的数据生成的，如果价格数据更新，需要重新运行 `npm run generate-report`

3. **GitHub Action**：每月 1 日会自动生成新报告，无需手动操作

