# Secret Lair Drops 数据升级指南

## 概述

这个升级将 Secret Lair 数据从单一的 `mock.json` 文件迁移到更灵活的 `drops.json` 系统，支持自动从 Scryfall API 获取卡牌数据。

## 文件结构

```
data/
├── mock.json          # 原始数据（已备份）
├── mock_backup.json   # 备份文件
└── drops.json         # 新的 drops 数据文件

scripts/
└── fetchDrops.js      # 自动补全脚本
```

## 新数据结构

### drops.json 格式

```json
[
  {
    "slug": "halloween-2025",
    "name": "Secret Lair: Halloween 2025 – Spooky Edition",
    "release_date": "2025-10-01",
    "theme": "Spooky / Horror",
    "price": "39.99",
    "status": "upcoming",
    "image": "",
    "cards": [],
    "description": "A haunting collection celebrating Magic's darkest legends with gothic horror art."
  }
]
```

## 使用方法

### 1. 安装依赖

```bash
npm install
```

### 2. 运行自动补全脚本

```bash
npm run fetch-drops
```

这个脚本会：
- 读取 `data/drops.json` 中的所有 drops
- 调用 Scryfall API 搜索每个 drop 名称
- 自动填充 `image` 和 `cards` 字段
- 更新原文件

### 3. 添加新的 Drop

只需在 `data/drops.json` 中添加新的条目：

```json
{
  "slug": "new-drop-slug",
  "name": "Secret Lair: New Drop Name",
  "release_date": "2025-12-01",
  "theme": "Theme Category",
  "price": "39.99",
  "status": "upcoming",
  "image": "",
  "cards": [],
  "description": "Drop description here."
}
```

然后运行 `npm run fetch-drops` 来自动补全数据。

## 状态说明

- `upcoming`: 即将发布
- `available`: 可购买
- `sold_out`: 售罄

## 向后兼容性

系统保持向后兼容：
- 如果 `drops.json` 不存在，会自动回退到 `mock.json`
- 组件会自动处理新旧数据格式的差异
- 现有的 SEO 和元数据功能保持不变

## 技术细节

### 数据加载函数

- `getDropsData()`: 从 `drops.json` 加载数据
- `getDropBySlugFromDrops(slug)`: 根据 slug 获取特定 drop
- `normalizeDrop(drop)`: 标准化 drop 数据格式

### 组件更新

- `src/app/drops/page.tsx`: 使用新的数据源
- `src/app/drops/[slug]/page.tsx`: 支持新的数据结构
- `src/app/page.tsx`: 主页也使用新数据

## 故障排除

### 脚本运行失败

1. 确保 `node-fetch` 已安装
2. 检查网络连接
3. 查看控制台错误信息

### 数据不显示

1. 检查 `drops.json` 文件格式是否正确
2. 运行 `npm run fetch-drops` 补全数据
3. 重启开发服务器

### API 限制

Scryfall API 有速率限制（每秒 10 次请求），脚本已内置 150ms 延迟来避免限制。

## 未来扩展

这个系统为未来扩展奠定了基础：

1. **多数据源支持**: 可以轻松添加其他 API 数据源
2. **缓存机制**: 可以添加本地缓存来减少 API 调用
3. **增量更新**: 可以只更新有变化的 drops
4. **数据验证**: 可以添加数据验证和错误处理

## 安全考虑

- 原始 `mock.json` 已备份为 `mock_backup.json`
- 新系统不会覆盖现有数据
- 脚本有错误处理，不会破坏现有功能











