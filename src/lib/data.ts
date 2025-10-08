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
  image: string
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

