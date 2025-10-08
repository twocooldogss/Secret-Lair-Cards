import { secretLairDrops } from '../data/drops';
import { cards } from '../data/cards';
import { getLatestNews, newsItems } from '../data/news';
import { getLatestInvestment, investmentArticles } from '../data/investment';

// 类型定义
interface Drop {
  slug: string;
  title: string;
  date: string;
  price: number;
  description: string;
  image: string;
  status: string;
  tags: string[];
  featured: boolean;
}

interface Card {
  slug: string;
  name: string;
  rarity: string;
  dropSlug: string;
  description: string;
  image: string;
}

interface News {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  image: string;
}

interface Investment {
  slug: string;
  title: string;
  date: string;
  content: string;
  image: string;
  excerpt: string;
}

export function getDrops() {
  return secretLairDrops;
}

export function getDropBySlug(slug: string) {
  return secretLairDrops.find((drop) => drop.slug === slug);
}

export function getCards() {
  return cards;
}

export function getCardBySlug(slug: string) {
  return cards.find((card) => card.slug === slug);
}

export function getFeaturedDrops() {
  return secretLairDrops.filter(drop => drop.featured);
}

export function getAvailableDrops() {
  return secretLairDrops.filter(drop => !drop.soldOut);
}

export function getSoldOutDrops() {
  return secretLairDrops.filter(drop => drop.soldOut);
}

// 统一的 API 函数（使用 TypeScript 数据）
export function getMockDrops() {
  return secretLairDrops;
}

export function getMockDropBySlug(slug: string) {
  return secretLairDrops.find((d) => d.slug === slug);
}

export function getMockCards() {
  return cards;
}

export function getMockCardBySlug(slug: string) {
  return cards.find((c) => c.slug === slug);
}

export function getCardsByDrop(dropId: string) {
  return cards.filter((c) => c.dropId === dropId);
}

export function getNews(limit?: number): News[] {
  const news = limit ? getLatestNews(limit) : newsItems;
  return news.map(item => ({
    ...item,
    content: item.content || item.excerpt
  }));
}

export function getNewsBySlug(slug: string): News | undefined {
  const item = newsItems.find((n) => n.slug === slug);
  if (!item) return undefined;
  return {
    ...item,
    content: item.content || item.excerpt
  };
}

export function getInvestment(): Investment[] {
  return investmentArticles.map(item => ({
    ...item,
    content: item.content
  }));
}

export function getInvestmentBySlug(slug: string): Investment | undefined {
  const item = investmentArticles.find((i) => i.slug === slug);
  if (!item) return undefined;
  return {
    ...item,
    content: item.content
  };
}
