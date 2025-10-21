import { Metadata } from 'next';

interface SeoMetaParams {
  title: string;
  description: string;
  url: string;
  keywords?: string[];
  image?: string;
  type?: 'website' | 'product' | 'article';
  price?: string;
  author?: string;
  datePublished?: string;
  dateModified?: string;
}

export function generateSeoMeta({ 
  title, 
  description, 
  url, 
  keywords = [], 
  image,
  type = 'website',
  price,
  author,
  datePublished,
  dateModified
}: SeoMetaParams): Metadata {
  const baseUrl = 'https://www.secretlaircards.com';
  const canonicalUrl = url.startsWith('http') ? url : `${baseUrl}${url}`;
  const imageUrl = image ? (image.startsWith('http') ? image : `${baseUrl}${image}`) : undefined;

  // 生成JSON-LD结构化数据
  const jsonLd = generateJsonLd({
    title,
    description,
    url: canonicalUrl,
    image: imageUrl,
    type,
    price,
    author,
    datePublished,
    dateModified
  });

  return {
    title,
    description,
    keywords: keywords.join(', '),
    alternates: {
      canonical: canonicalUrl
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'SecretLairCards.com',
      type: 'website',
      images: imageUrl ? [
        {
          url: imageUrl,
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
      images: imageUrl ? [imageUrl] : undefined,
    },
    other: {
      'script:ld+json': JSON.stringify(jsonLd)
    }
  };
}

// 统一的JSON-LD生成函数
function generateJsonLd({
  title,
  description,
  url,
  image,
  type,
  price,
  author,
  datePublished,
  dateModified
}: {
  title: string;
  description: string;
  url: string;
  image?: string;
  type?: string;
  price?: string;
  author?: string;
  datePublished?: string;
  dateModified?: string;
}) {
  const baseSchema = {
    "@context": "https://schema.org",
    "name": title,
    "description": description,
    "url": url,
    ...(image && {
      "image": {
        "@type": "ImageObject",
        "url": image,
        "width": 1200,
        "height": 630
      }
    }),
    "publisher": {
      "@type": "Organization",
      "name": "SecretLairCards.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.secretlaircards.com/logo.png"
      }
    }
  };

  if (type === 'product') {
    return {
      ...baseSchema,
      "@type": "Product",
      "brand": {
        "@type": "Brand",
        "name": "Magic: The Gathering Secret Lair"
      },
      "category": "Trading Card Game",
      ...(price && {
        "offers": {
          "@type": "Offer",
          "price": price,
          "priceCurrency": "USD",
          "availability": "https://schema.org/InStock",
          "url": url
        }
      })
    };
  }

  if (type === 'article') {
    return {
      ...baseSchema,
      "@type": "Article",
      "headline": title,
      ...(author && {
        "author": {
          "@type": "Organization",
          "name": author
        }
      }),
      ...(datePublished && { "datePublished": datePublished }),
      ...(dateModified && { "dateModified": dateModified })
    };
  }

  return {
    ...baseSchema,
    "@type": "WebPage"
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