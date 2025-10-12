interface Drop {
  id: string;
  name: string;
  description: string;
  releaseDate: string;
  slug: string;
  cards: any[];
}

interface Card {
  id: string;
  name: string;
  type: string;
  text: string;
  set: string;
  rarity: string;
  slug: string;
  image: string;
}

interface ArticleSchemaParams {
  title: string;
  description: string;
  url: string;
  image?: string;
  author?: string;
  datePublished?: string;
  dateModified?: string;
  keywords?: string[];
}

export function generateArticleSchema({ title, description, url, image, author, datePublished, dateModified, keywords = [] }: ArticleSchemaParams) {
  const baseUrl = 'https://www.secretlaircards.com';
  
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "url": `${baseUrl}${url}`,
    "author": {
      "@type": "Organization",
      "name": author || "Secret Lair Cards"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Secret Lair Cards",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/logo.png`
      }
    },
    "datePublished": datePublished || new Date().toISOString(),
    "dateModified": dateModified || new Date().toISOString(),
    ...(image && {
      "image": {
        "@type": "ImageObject",
        "url": image.startsWith('http') ? image : `${baseUrl}${image}`,
        "width": 1200,
        "height": 630
      }
    }),
    ...(keywords.length > 0 && {
      "keywords": keywords.join(', ')
    })
  };
}

export function getSchema(type: string, data: any) {
  const baseUrl = 'https://www.secretlaircards.com';
  
  switch (type) {
    case 'home':
      return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Secret Lair Cards",
        "description": "Browse MTG Secret Lair Drops, card lists, release dates, and prices.",
        "url": baseUrl,
        "potentialAction": {
          "@type": "SearchAction",
          "target": `${baseUrl}/search?q={search_term_string}`,
          "query-input": "required name=search_term_string"
        }
      };
      
    case 'drop':
      const drop = data as Drop;
      return {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": drop.name,
        "description": drop.description,
        "releaseDate": drop.releaseDate,
        "url": `${baseUrl}/drops/${drop.slug}`,
        "brand": {
          "@type": "Brand",
          "name": "Magic: The Gathering"
        },
        "category": "Trading Card Game",
        "offers": {
          "@type": "Offer",
          "availability": "https://schema.org/InStock",
          "priceCurrency": "USD"
        }
      };
      
    case 'card':
      const card = data as Card;
      return {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": card.name,
        "description": card.text,
        "image": card.image,
        "url": `${baseUrl}/cards/${card.slug}`,
        "brand": {
          "@type": "Brand",
          "name": "Magic: The Gathering"
        },
        "category": "Trading Card",
        "additionalProperty": [
          {
            "@type": "PropertyValue",
            "name": "Type",
            "value": card.type
          },
          {
            "@type": "PropertyValue",
            "name": "Set",
            "value": card.set
          },
          {
            "@type": "PropertyValue",
            "name": "Rarity",
            "value": card.rarity
          }
        ]
      };
      
    default:
      return {};
  }
}

