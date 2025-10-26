import { getDropBySlugFromDrops, normalizeDrop } from './data';
import { getDropContent, getRelatedDrops } from './content';
import { getCardsWithImages } from './cardImages';

/**
 * 统一的Drop数据获取函数
 * 整合了数据获取、内容解析和相关信息
 */
export async function getDropBySlug(slug: string) {
  const dropData = getDropBySlugFromDrops(slug);
  
  if (!dropData) {
    return null;
  }

  const drop = normalizeDrop(dropData);
  const content = getDropContent(slug);
  const relatedDrops = getRelatedDrops(slug, 3);

  // 获取卡牌图片信息
  let cardsWithImages: any[] = [];
  if (drop.cards && drop.cards.length > 0) {
    try {
      cardsWithImages = await getCardsWithImages(drop.cards);
    } catch (error) {
      console.error('Error fetching card images:', error);
      // 如果获取失败，使用原始卡牌名称
      cardsWithImages = drop.cards.map((name: string) => ({ name, image: '/images/placeholder.svg' }));
    }
  }

  return {
    ...drop,
    content,
    related: relatedDrops,
    cards: cardsWithImages
  };
}

/**
 * 获取Drop的基本信息（用于metadata生成）
 */
export function getDropBasicInfo(slug: string) {
  const dropData = getDropBySlugFromDrops(slug);
  return dropData ? normalizeDrop(dropData) : null;
}