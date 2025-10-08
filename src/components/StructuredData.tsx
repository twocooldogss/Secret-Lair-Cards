interface StructuredDataProps {
  type: 'website' | 'article' | 'product' | 'organization';
  data: any;
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const getStructuredData = () => {
    const baseUrl = 'https://secretlaircards.com';
    
    switch (type) {
      case 'website':
        return {
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "SecretLairCards.com",
          "alternateName": "Secret Lair Cards",
          "url": baseUrl,
          "description": "Explore every Magic: The Gathering Secret Lair drop – release info, card lists, investment insights, and collector guides.",
          "potentialAction": {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": `${baseUrl}/search?q={search_term_string}`
            },
            "query-input": "required name=search_term_string"
          },
          "publisher": {
            "@type": "Organization",
            "name": "SecretLairCards.com",
            "url": baseUrl,
            "logo": {
              "@type": "ImageObject",
              "url": `${baseUrl}/logo.png`
            }
          }
        };

      case 'article':
        return {
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": data.title,
          "description": data.excerpt || data.metaDescription,
          "image": data.coverImage || data.image,
          "datePublished": data.date,
          "dateModified": data.date,
          "author": {
            "@type": "Organization",
            "name": "SecretLairCards.com",
            "url": baseUrl
          },
          "publisher": {
            "@type": "Organization",
            "name": "SecretLairCards.com",
            "url": baseUrl,
            "logo": {
              "@type": "ImageObject",
              "url": `${baseUrl}/logo.png`
            }
          },
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `${baseUrl}/${data.slug}`
          }
        };

      case 'product':
        return {
          "@context": "https://schema.org",
          "@type": "Product",
          "name": data.title,
          "description": data.description,
          "image": data.image,
          "brand": {
            "@type": "Brand",
            "name": "Secret Lair"
          },
          "offers": {
            "@type": "Offer",
            "price": data.price,
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock"
          }
        };

      case 'organization':
        return {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "SecretLairCards.com",
          "url": baseUrl,
          "logo": `${baseUrl}/logo.png`,
          "description": "The ultimate resource for Magic: The Gathering Secret Lair drops, featuring release information, card lists, investment insights, and collector guides.",
          "sameAs": [
            "https://twitter.com/secretlaircards"
          ]
        };

      default:
        return {};
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(getStructuredData(), null, 2)
      }}
    />
  );
}

