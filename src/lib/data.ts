import fs from 'fs';
import path from 'path';

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
  image?: string  // 添加可选的image字段
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

// 从 drops.json 读取数据
export function getDropsData() {
  try {
    const dataPath = path.join(process.cwd(), 'data', 'drops.json');
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    return data;
  } catch (error) {
    console.error('Error reading drops data:', error);
    return [];
  }
}

// 将 drops.json 数据转换为 Drop 接口
export function normalizeDrop(input: any): Drop {
  // 确保图片URL有效
  const imageUrl = input.image && input.image.trim() !== '' ? input.image : '/images/placeholder.svg';
  
  return {
    id: input.id || input.slug || '',
    slug: input.slug || '',
    title: input.name || input.title || '',
    description: input.description || '',
    image: imageUrl,
    releaseDate: input.release_date || '',
    theme: input.theme || 'miscellaneous',
    alt: input.alt || input.name || input.title || 'Drop Cover',
    price: input.price || '39.99',
    tags: input.tags || [],
    name: input.name,
    cards: input.cards || []
  };
}

// 从 drops.json 获取特定 drop
export function getDropBySlugFromDrops(slug: string) {
  try {
    const dataPath = path.join(process.cwd(), 'data', 'drops.json');
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    return data.find((drop: any) => drop.slug === slug);
  } catch (error) {
    console.error('Error reading drop data:', error);
    return null;
  }
}

// 从 mock.json 读取新闻数据
export function getNewsData() {
  try {
    const dataPath = path.join(process.cwd(), 'data', 'mock.json');
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    return data.news || [];
  } catch (error) {
    console.error('Error reading news data:', error);
    return [];
  }
}

// 从 mock.json 读取投资数据
export function getInvestmentData() {
  try {
    const dataPath = path.join(process.cwd(), 'data', 'mock.json');
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    return data.investment || [];
  } catch (error) {
    console.error('Error reading investment data:', error);
    return [];
  }
}

// 从 mock.json 读取卡牌数据
export function getCardsData() {
  try {
    const dataPath = path.join(process.cwd(), 'data', 'mock.json');
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    return data.cards || [];
  } catch (error) {
    console.error('Error reading cards data:', error);
    return [];
  }
}