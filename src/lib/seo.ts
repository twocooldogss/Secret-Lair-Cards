import { Metadata } from 'next';

interface SeoMetaParams {
  title: string;
  description: string;
  url: string;
  keywords?: string[];
  image?: string;
}

export function generateSeoMeta({ title, description, url, keywords = [], image }: SeoMetaParams): Metadata {
  return {
    title,
    description,
    keywords: keywords.join(', '),
    openGraph: {
      title,
      description,
      url,
      siteName: 'Secret Lair Cards',
      type: 'website',
      images: image ? [
        {
          url: image.startsWith('http') ? image : `https://www.secretlaircards.com${image}`,
          width: 1200,
          height: 630,
          alt: title,
        }
      ] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

// 结构化数据生成函数
export function generateDropSchema(drop: any) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: drop.title || drop.name,
    image: drop.image,
    description: drop.description || `MTG Secret Lair drop ${drop.title || drop.name}.`,
    brand: {
      "@type": "Brand",
      name: "Magic: The Gathering Secret Lair",
    },
    releaseDate: drop.date || drop.releaseDate,
    offers: {
      "@type": "Offer",
      availability: drop.status === 'available' ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      price: drop.price,
      priceCurrency: "USD",
      url: `https://www.secretlaircards.com/drops/${drop.slug}`,
    },
  };
}

export function generateCardSchema(card: any) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: card.name,
    image: card.image,
    description: card.description || `${card.name} from MTG Secret Lair.`,
    brand: {
      "@type": "Brand",
      name: "Magic: The Gathering",
    },
    category: "Trading Card",
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Rarity",
        value: card.rarity
      }
    ]
  };
}

export function generateNewsSchema(news: any) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: news.title,
    datePublished: news.date,
    author: {
      "@type": "Organization",
      name: "SecretLairCards.com",
    },
    url: `https://www.secretlaircards.com/news/${news.slug}`,
    description: news.excerpt,
    image: news.image,
  };
}

export function generateInvestmentSchema(investment: any) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: investment.title,
    datePublished: investment.date,
    author: {
      "@type": "Organization",
      name: "SecretLairCards.com",
    },
    url: `https://www.secretlaircards.com/investment/${investment.slug}`,
    description: investment.excerpt,
    image: investment.image,
  };
}