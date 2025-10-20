import fs from 'fs'
import path from 'path'

export interface Drop {
  id: string
  slug: string
  title: string
  releaseDate: string
  theme: string
  image: string
  alt: string
  price: string
  description: string
  tags: string[]
  // 透传字段（来自 data/drops.json），在详情页等处可用
  name?: string
  cards?: string[]
}

export interface Card {
  id: string
  slug: string
  name: string
  dropId: string
  image: string
  alt: string
  type: string
  rarity: string
  price: string
  description: string
}

export interface News {
  id: string
  slug: string
  title: string
  date: string
  coverImage: string
  alt: string
  metaTitle: string
  metaDescription: string
  keywords: string[]
  excerpt: string
  content: string
}

export interface Investment {
  id: string
  slug: string
  title: string
  date: string
  coverImage: string
  alt: string
  metaTitle: string
  metaDescription: string
  keywords: string[]
  excerpt: string
  content: string
}

export interface SiteMeta {
  siteTitle: string
  description: string
  keywords: string[]
}

export interface Data {
  meta: SiteMeta
  drops: Drop[]
  cards: Card[]
  news: News[]
  investment: Investment[]
}

let cachedData: Data | null = null

export function getData(): Data {
  if (cachedData) {
    return cachedData
  }

  const dataPath = path.join(process.cwd(), 'data', 'mock.json')
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'))
  
  cachedData = data
  return data
}

export function getDrops(): Drop[] {
  return getData().drops
}

export function getCards(): Card[] {
  return getData().cards
}

export function getNews(): News[] {
  return getData().news
}

export function getInvestment(): Investment[] {
  return getData().investment
}

export function getDropBySlug(slug: string): Drop | undefined {
  return getDrops().find(drop => drop.slug === slug)
}

export function getCardBySlug(slug: string): Card | undefined {
  return getCards().find(card => card.slug === slug)
}

export function getNewsBySlug(slug: string): News | undefined {
  return getNews().find(news => news.slug === slug)
}

export function getInvestmentBySlug(slug: string): Investment | undefined {
  return getInvestment().find(investment => investment.slug === slug)
}

// 读取大型 drops 源数据（data/drops.json）供首页等使用
export function getDropsData(): any[] {
  const dropsPath = path.join(process.cwd(), 'data', 'drops.json')
  try {
    const raw = fs.readFileSync(dropsPath, 'utf-8')
    const arr = JSON.parse(raw)
    return Array.isArray(arr) ? arr : []
  } catch (e) {
    return []
  }
}

// 规范化 drops.json 的条目到站点统一的 Drop 形状
export function normalizeDrop(input: any): Drop {
  return {
    id: String(input.id ?? input.slug ?? ''),
    slug: String(input.slug ?? ''),
    title: String(input.title || input.name || input.slug || ''),
    releaseDate: String(input.release_date || input.releaseDate || ''),
    theme: String(input.theme || ''),
    // 对空字符串做回退，避免 next/image 报错
    image: String((input.image && input.image.trim()) || (input.imageUrl && input.imageUrl.trim()) || '/images/placeholder.svg'),
    alt: String(input.alt || input.title || input.name || input.slug || 'Drop Cover'),
    price: String(
      input.price == null
        ? ''
        : typeof input.price === 'number'
          ? input.price.toFixed(2)
          : String(input.price)
    ),
    description: String(input.description || ''),
    tags: Array.isArray(input.tags) ? input.tags : [],
    name: input.name,
    cards: Array.isArray(input.cards) ? input.cards : undefined
  }
}

// 从 data/drops.json 中按 slug 查找原始条目
export function getDropBySlugFromDrops(slug: string): any | undefined {
  const drops = getDropsData()
  return drops.find((d: any) => d.slug === slug)
}

