/**
 * 卡牌图片获取工具
 * 为每张卡牌获取Scryfall图片URL
 */

interface CardImageData {
  name: string;
  image: string;
  description?: string;
  rarity?: string;
  type?: string;
  mana_cost?: string;
  power?: string;
  toughness?: string;
}

/**
 * 从Scryfall获取卡牌图片数据
 */
export async function fetchCardImage(cardName: string): Promise<string | null> {
  try {
    const query = encodeURIComponent(`"${cardName}"`);
    const response = await fetch(`https://api.scryfall.com/cards/search?q=${query}`, {
      headers: {
        'User-Agent': 'SecretLairCards/1.0'
      }
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    
    if (data.data && data.data.length > 0) {
      const card = data.data[0];
      // 优先使用art_crop，然后是normal，最后是large
      return card.image_uris?.art_crop || card.image_uris?.normal || card.image_uris?.large || null;
    }

    return null;
  } catch (error) {
    console.error(`Error fetching image for ${cardName}:`, error);
    return null;
  }
}

/**
 * 批量获取多张卡牌的图片
 */
export async function fetchCardImages(cardNames: string[]): Promise<Record<string, string>> {
  const imageMap: Record<string, string> = {};
  
  // 为了避免API限制，添加延迟
  for (const cardName of cardNames) {
    const imageUrl = await fetchCardImage(cardName);
    if (imageUrl) {
      imageMap[cardName] = imageUrl;
    }
    
    // 添加200ms延迟避免触发API限制
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  
  return imageMap;
}

/**
 * 从本地缓存获取卡牌信息
 */
export function getCardFromCache(cardName: string): CardImageData | null {
  try {
    const cachePath = './data/cardImages.json';
    if (!require('fs').existsSync(cachePath)) {
      return null;
    }
    
    const cache = JSON.parse(require('fs').readFileSync(cachePath, 'utf8'));
    return cache[cardName] || null;
  } catch (error) {
    console.error('Error reading card cache:', error);
    return null;
  }
}

/**
 * 获取卡牌的完整信息（优先从缓存，然后从API）
 */
export async function getCardWithImage(cardName: string): Promise<CardImageData> {
  // 首先尝试从缓存获取
  const cachedCard = getCardFromCache(cardName);
  if (cachedCard) {
    return cachedCard;
  }
  
  // 如果缓存中没有，从API获取
  try {
    const query = encodeURIComponent(`"${cardName}"`);
    const response = await fetch(`https://api.scryfall.com/cards/search?q=${query}`, {
      headers: {
        'User-Agent': 'SecretLairCards/1.0'
      }
    });

    if (!response.ok) {
      return {
        name: cardName,
        image: '/images/placeholder.svg'
      };
    }

    const data = await response.json();
    
    if (data.data && data.data.length > 0) {
      const card = data.data[0];
      return {
        name: cardName,
        image: card.image_uris?.art_crop || card.image_uris?.normal || card.image_uris?.large || '/images/placeholder.svg',
        description: card.oracle_text || '',
        rarity: card.rarity || '',
        type: card.type_line || '',
        mana_cost: card.mana_cost || '',
        power: card.power || '',
        toughness: card.toughness || ''
      };
    }

    return {
      name: cardName,
      image: '/images/placeholder.svg'
    };
  } catch (error) {
    console.error(`Error fetching card data for ${cardName}:`, error);
    return {
      name: cardName,
      image: '/images/placeholder.svg'
    };
  }
}

/**
 * 批量获取卡牌完整信息（优先使用缓存）
 */
export async function getCardsWithImages(cardNames: string[]): Promise<CardImageData[]> {
  const cards = [];
  
  for (const cardName of cardNames) {
    const card = await getCardWithImage(cardName);
    cards.push(card);
    
    // 如果从API获取，添加延迟避免API限制
    if (!getCardFromCache(cardName)) {
      await new Promise(resolve => setTimeout(resolve, 200));
    }
  }
  
  return cards;
}
