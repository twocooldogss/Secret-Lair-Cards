// /lib/schema.ts
// -------------------------------------------
// JSON-LD structured data generator for SecretLairCards.com
// -------------------------------------------

type SchemaParams = {
  type: "WebSite" | "Article" | "Product" | "NewsArticle" | "CollectionPage";
  title: string;
  description: string;
  url: string;
  image?: string;
  author?: string;
  datePublished?: string;
  dateModified?: string;
  price?: string;
  sku?: string;
  keywords?: string[];
};

/**
 * Generate Schema.org JSON-LD structured data
 * for SEO-rich content like drops, news, and investment pages.
 */
export function generateSchema({
  type,
  title,
  description,
  url,
  image,
  author = "SecretLairCards Editorial Team",
  datePublished,
  dateModified,
  price,
  sku,
  keywords = [],
}: SchemaParams) {
  const base = {
    "@context": "https://schema.org",
    "@type": type,
    name: title,
    description,
    url,
    image,
    keywords: keywords.join(", "),
    author: {
      "@type": "Organization",
      name: "Secret Lair Cards",
      url: "https://secretlaircards.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Secret Lair Cards",
      logo: {
        "@type": "ImageObject",
        url: "https://secretlaircards.com/logo.png",
      },
    },
  };

  if (type === "Product" && price) {
    return {
      ...base,
      "@type": "Product",
      sku,
      offers: {
        "@type": "Offer",
        priceCurrency: "USD",
        price,
        availability: "https://schema.org/InStock",
        url,
      },
    };
  }

  if (type === "Article" || type === "NewsArticle") {
    return {
      ...base,
      "@type": "NewsArticle",
      author: {
        "@type": "Person",
        name: author,
      },
      datePublished,
      dateModified: dateModified || datePublished,
    };
  }

  return base;
}

// 生成网站结构化数据
export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Secret Lair Cards",
    alternateName: "SecretLairCards.com",
    url: "https://secretlaircards.com",
    description: "Explore every MTG Secret Lair drop — prices, release dates, card lists, and collector insights. Your complete 2025 guide to Magic's most exclusive cards.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://secretlaircards.com/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    publisher: {
      "@type": "Organization",
      name: "Secret Lair Cards",
      url: "https://secretlaircards.com",
      logo: {
        "@type": "ImageObject",
        url: "https://secretlaircards.com/logo.png"
      }
    }
  };
}

// 生成文章结构化数据
export function generateArticleSchema({
  title,
  description,
  url,
  image,
  author = "SecretLairCards Editorial Team",
  datePublished,
  dateModified,
  keywords = []
}: {
  title: string;
  description: string;
  url: string;
  image?: string;
  author?: string;
  datePublished?: string;
  dateModified?: string;
  keywords?: string[];
}) {
  return generateSchema({
    type: "NewsArticle",
    title,
    description,
    url,
    image,
    author,
    datePublished,
    dateModified,
    keywords
  });
}

// 生成产品结构化数据
export function generateProductSchema({
  title,
  description,
  url,
  image,
  price,
  sku,
  keywords = []
}: {
  title: string;
  description: string;
  url: string;
  image?: string;
  price?: string;
  sku?: string;
  keywords?: string[];
}) {
  return generateSchema({
    type: "Product",
    title,
    description,
    url,
    image,
    price,
    sku,
    keywords
  });
}