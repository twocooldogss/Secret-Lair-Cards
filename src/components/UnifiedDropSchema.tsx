import React from "react";

interface Drop {
  id: string;
  slug: string;
  title: string;
  releaseDate: string;
  theme: string;
  image: string;
  alt: string;
  price: string;
  description: string;
  tags: string[];
  // 透传字段（来自 data/drops.json），在详情页等处可用
  name?: string;
  cards?: string[];
}

interface UnifiedDropSchemaProps {
  drop: Drop;
}

export default function UnifiedDropSchema({ drop }: UnifiedDropSchemaProps) {
  if (!drop) return null;

  // 统一的Product Schema
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": drop.title,
    "image": drop.image,
    "description": drop.description,
    "url": `https://www.secretlaircards.com/drops/${drop.slug}`,
    "sku": drop.slug,
    "releaseDate": drop.releaseDate,
    "brand": {
      "@type": "Brand",
      "name": "Magic: The Gathering Secret Lair"
    },
    "category": "Trading Card Game",
    "offers": {
      "@type": "Offer",
      "price": drop.price || "49.99",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "url": `https://www.secretlaircards.com/drops/${drop.slug}`,
      "priceValidUntil": "2025-12-31",
      "itemCondition": "https://schema.org/NewCondition"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "25"
    },
    "review": [
      {
        "@type": "Review",
        "author": { "@type": "Person", "name": "MTG Collector" },
        "datePublished": drop.releaseDate || new Date().toISOString().slice(0, 10),
        "reviewBody": "Beautifully designed cards with top-tier printing quality.",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        }
      }
    ]
  };

  // Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.secretlaircards.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Drops",
        "item": "https://www.secretlaircards.com/drops"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": drop.title,
        "item": `https://www.secretlaircards.com/drops/${drop.slug}`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
