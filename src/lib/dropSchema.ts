/**
 * dropSchema.ts
 * 为 Drop 详情页生成增强的 Product Schema（包含 AggregateOffer）
 */

export interface Drop {
  title: string;
  slug: string;
  price?: string;
  description?: string;
  image?: string;
  releaseDate?: string;
}

export interface MarketPrice {
  total_price_usd: number;
  average_price_usd: number;
  change_pct: number;
  last_updated: string;
  card_count: number;
  valid_card_count?: number;
}

/**
 * 生成包含 AggregateOffer 的 Product Schema
 * 用于 Drop 详情页，支持多价格源（官方价格 + 市场价格）
 */
export function generateDropProductSchema(drop: Drop, marketPrice: MarketPrice | null) {
  const baseUrl = 'https://www.secretlaircards.com';
  
  // 构建 offers 数组
  const offers = [];
  
  // 官方价格（MSRP）- 始终存在
  offers.push({
    "@type": "Offer",
    "name": "Official MSRP",
    "price": drop.price || "39.99",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock",
    "url": `${baseUrl}/drops/${drop.slug}`,
    "priceValidUntil": "2025-12-31",
    "itemCondition": "https://schema.org/NewCondition",
    "seller": {
      "@type": "Organization",
      "name": "Wizards of the Coast",
      "url": "https://www.wizards.com"
    }
  });
  
  // 市场价格（如果可用）
  if (marketPrice && marketPrice.total_price_usd > 0) {
    offers.push({
      "@type": "Offer",
      "name": "Current Market Value",
      "price": marketPrice.total_price_usd.toFixed(2),
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "url": `${baseUrl}/drops/${drop.slug}`,
      "priceValidUntil": new Date(Date.now() + 86400000).toISOString().slice(0, 10), // 24小时后
      "itemCondition": "https://schema.org/NewCondition",
      "seller": {
        "@type": "Organization",
        "name": "Secondary Market",
        "url": "https://scryfall.com"
      }
    });
  }
  
  // Product Schema with AggregateOffer
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${baseUrl}/drops/${drop.slug}#product`,
    "name": drop.title,
    "description": drop.description || `${drop.title} Secret Lair drop`,
    "image": drop.image ? (drop.image.startsWith('http') ? drop.image : `${baseUrl}${drop.image}`) : undefined,
    "url": `${baseUrl}/drops/${drop.slug}`,
    "sku": drop.slug,
    "releaseDate": drop.releaseDate,
    "brand": {
      "@type": "Brand",
      "name": "Magic: The Gathering Secret Lair"
    },
    "category": "Trading Card Game",
    "offers": offers.length > 1 ? {
      "@type": "AggregateOffer",
      "priceCurrency": "USD",
      "lowPrice": Math.min(...offers.map(o => parseFloat(o.price))).toFixed(2),
      "highPrice": Math.max(...offers.map(o => parseFloat(o.price))).toFixed(2),
      "offerCount": offers.length,
      "offers": offers
    } : offers[0] // 如果只有一个价格，直接使用 Offer
  };
}

