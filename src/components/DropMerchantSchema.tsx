"use client";
import React from "react";

export default function DropMerchantSchema({ drop }: { drop: any }) {
  if (!drop) return null;

  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": drop.title,
    "image": [drop.image],
    "description": drop.description,
    "sku": drop.id,
    "brand": {
      "@type": "Brand",
      "name": "Magic: The Gathering"
    },
    "offers": {
      "@type": "Offer",
      "url": `https://www.secretlaircards.com/drops/${drop.slug}`,
      "priceCurrency": "USD",
      "price": drop.price || "49.99",
      "priceValidUntil": "2025-12-31",
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition",
      "shippingDetails": {
        "@type": "OfferShippingDetails",
        "shippingRate": {
          "@type": "MonetaryAmount",
          "value": "0.00",
          "currency": "USD"
        },
        "deliveryTime": {
          "@type": "ShippingDeliveryTime",
          "handlingTime": {
            "@type": "QuantitativeValue",
            "minValue": 1,
            "maxValue": 3,
            "unitCode": "d"
          },
          "transitTime": {
            "@type": "QuantitativeValue",
            "minValue": 3,
            "maxValue": 7,
            "unitCode": "d"
          }
        },
        "shippingDestination": {
          "@type": "DefinedRegion",
          "addressCountry": ["US", "CA", "GB"]
        }
      },
      "hasMerchantReturnPolicy": {
        "@type": "MerchantReturnPolicy",
        "applicableCountry": "US",
        "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
        "merchantReturnDays": 30,
        "returnMethod": "https://schema.org/ReturnByMail",
        "returnFees": "https://schema.org/FreeReturn"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "25"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
