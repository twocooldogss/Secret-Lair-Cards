import React from "react";

export default function DropProductSchema({ drop }: { drop: any }) {
  if (!drop) return null;

  const productData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": drop.title,
    "image": drop.image,
    "description": drop.description,
    "brand": {
      "@type": "Brand",
      "name": "Magic: The Gathering"
    },
    "sku": drop.id,
    "offers": {
      "@type": "Offer",
      "url": `https://www.secretlaircards.com/drops/${drop.slug}`,
      "priceCurrency": "USD",
      "price": drop.price,
      "priceValidUntil": "2025-12-31",
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "17"
    },
    "review": [
      {
        "@type": "Review",
        "author": { "@type": "Person", "name": "MTG Collector" },
        "datePublished": "2025-02-01",
        "reviewBody": "Beautifully designed cards with top-tier printing quality.",
        "name": `${drop.title} Review`,
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(productData) }}
    />
  );
}
