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

// 生成首页 @graph 格式 Schema（WebPage + FAQPage + BreadcrumbList）
export function generateHomepageGraphSchema() {
  const baseUrl = 'https://www.secretlaircards.com';
  const dateModified = '2025-01-20';
  
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${baseUrl}/#webpage`,
        "url": `${baseUrl}/`,
        "name": "Secret Lair 2025 – Complete MTG Drop, Art & Investment Guide",
        "description": "Explore and track every Magic: The Gathering Secret Lair drop from 2019–2025 — discover art, compare prices, and follow collector trends to find the 2025 drops worth investing in.",
        "inLanguage": "en",
        "dateModified": dateModified,
        "isPartOf": {
          "@type": "WebSite",
          "@id": `${baseUrl}/#website`,
          "name": "SecretLairCards.com",
          "url": `${baseUrl}/`
        },
        "publisher": {
          "@type": "Organization",
          "name": "SecretLairCards.com",
          "logo": {
            "@type": "ImageObject",
            "url": `${baseUrl}/logo.png`
          }
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${baseUrl}/#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": `${baseUrl}/`
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "All Secret Lair Drops",
            "item": `${baseUrl}/drops`
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": `${baseUrl}/#faq`,
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What makes Secret Lair different from regular MTG sets?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Each Secret Lair drop is printed in limited quantities, featuring exclusive artworks, collaborations, and creative themes that make them unique from standard Magic: The Gathering sets."
            }
          },
          {
            "@type": "Question",
            "name": "Which Secret Lair drops are worth investing in for 2025?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "In 2025, drops featuring high-profile artists or unique crossover themes — such as the Secret Scare Superdrop or Artist Series — are the most promising for long-term collectors and investors."
            }
          }
        ]
      }
    ]
  };
}

// 生成 BreadcrumbList Schema
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>, basePath: string) {
  const baseUrl = 'https://www.secretlaircards.com';
  
  return {
    "@type": "BreadcrumbList",
    "@id": `${baseUrl}${basePath}#breadcrumb`,
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url.startsWith('http') ? item.url : `${baseUrl}${item.url}`
    }))
  };
}

// 生成 News 页面 @graph 格式 Schema
export function generateNewsPageGraphSchema() {
  const baseUrl = 'https://www.secretlaircards.com';
  const dateModified = '2025-01-20';
  
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${baseUrl}/news#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": `${baseUrl}/`
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "News",
            "item": `${baseUrl}/news`
          }
        ]
      },
      {
        "@type": "WebPage",
        "@id": `${baseUrl}/news#webpage`,
        "url": `${baseUrl}/news`,
        "name": "Secret Lair News – MTG Drops, Art & Collector Insights",
        "description": "Stay up to date with the latest Magic: The Gathering Secret Lair news, release info, art showcases, and collector stories.",
        "inLanguage": "en",
        "dateModified": dateModified,
        "isPartOf": {
          "@type": "WebSite",
          "@id": `${baseUrl}/#website`
        },
        "publisher": {
          "@type": "Organization",
          "name": "SecretLairCards.com",
          "logo": {
            "@type": "ImageObject",
            "url": `${baseUrl}/logo.png`
          }
        }
      }
    ]
  };
}

// 生成 News 详情页 @graph 格式 Schema
export function generateNewsDetailGraphSchema(params: {
  title: string;
  description: string;
  url: string;
  image?: string;
  author?: string;
  datePublished?: string;
  dateModified?: string;
}) {
  const baseUrl = 'https://www.secretlaircards.com';
  const { title, description, url, image, author = 'SecretLairCards Editorial', datePublished, dateModified } = params;
  
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${baseUrl}${url}#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": `${baseUrl}/`
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "News",
            "item": `${baseUrl}/news`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": title,
            "item": `${baseUrl}${url}`
          }
        ]
      },
      {
        "@type": "WebPage",
        "@id": `${baseUrl}${url}#webpage`,
        "url": `${baseUrl}${url}`,
        "name": title,
        "description": description,
        "inLanguage": "en",
        "dateModified": dateModified || datePublished || new Date().toISOString(),
        "isPartOf": {
          "@type": "WebSite",
          "@id": `${baseUrl}/#website`
        },
        "publisher": {
          "@type": "Organization",
          "name": "SecretLairCards.com",
          "logo": {
            "@type": "ImageObject",
            "url": `${baseUrl}/logo.png`
          }
        }
      },
      {
        "@type": "BlogPosting",
        "@id": `${baseUrl}${url}#article`,
        "headline": title,
        "description": description,
        ...(image && {
          "image": {
            "@type": "ImageObject",
            "url": image.startsWith('http') ? image : `${baseUrl}${image}`,
            "width": 1200,
            "height": 630
          }
        }),
        "author": {
          "@type": "Person",
          "name": author
        },
        "publisher": {
          "@type": "Organization",
          "name": "SecretLairCards.com",
          "logo": {
            "@type": "ImageObject",
            "url": `${baseUrl}/logo.png`
          }
        },
        "mainEntityOfPage": {
          "@id": `${baseUrl}${url}#webpage`
        },
        "datePublished": datePublished || new Date().toISOString(),
        "dateModified": dateModified || datePublished || new Date().toISOString(),
        "inLanguage": "en"
      }
    ]
  };
}

// 生成 Investment 页面 @graph 格式 Schema
export function generateInvestmentPageGraphSchema() {
  const baseUrl = 'https://www.secretlaircards.com';
  const dateModified = '2025-01-20';
  
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${baseUrl}/investment#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": `${baseUrl}/`
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Investment Insights",
            "item": `${baseUrl}/investment`
          }
        ]
      },
      {
        "@type": "WebPage",
        "@id": `${baseUrl}/investment#webpage`,
        "url": `${baseUrl}/investment`,
        "name": "Secret Lair Investment Insights – Value Reports & Market Trends",
        "description": "Track market performance, resale trends, and collector value of Magic: The Gathering Secret Lair drops from 2019–2025.",
        "inLanguage": "en",
        "dateModified": dateModified,
        "isPartOf": {
          "@type": "WebSite",
          "@id": `${baseUrl}/#website`
        },
        "publisher": {
          "@type": "Organization",
          "name": "SecretLairCards.com",
          "logo": {
            "@type": "ImageObject",
            "url": `${baseUrl}/logo.png`
          }
        }
      }
    ]
  };
}

// 生成 Investment 详情页 @graph 格式 Schema
export function generateInvestmentDetailGraphSchema(params: {
  title: string;
  description: string;
  url: string;
  image?: string;
  author?: string;
  datePublished?: string;
  dateModified?: string;
}) {
  const baseUrl = 'https://www.secretlaircards.com';
  const { title, description, url, image, author = 'SecretLairCards Investment Team', datePublished, dateModified } = params;
  
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${baseUrl}${url}#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": `${baseUrl}/`
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Investment Insights",
            "item": `${baseUrl}/investment`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": title,
            "item": `${baseUrl}${url}`
          }
        ]
      },
      {
        "@type": "WebPage",
        "@id": `${baseUrl}${url}#webpage`,
        "url": `${baseUrl}${url}`,
        "name": title,
        "description": description,
        "inLanguage": "en",
        "dateModified": dateModified || datePublished || new Date().toISOString(),
        "isPartOf": {
          "@type": "WebSite",
          "@id": `${baseUrl}/#website`
        },
        "publisher": {
          "@type": "Organization",
          "name": "SecretLairCards.com",
          "logo": {
            "@type": "ImageObject",
            "url": `${baseUrl}/logo.png`
          }
        }
      },
      {
        "@type": "Article",
        "@id": `${baseUrl}${url}#article`,
        "headline": title,
        "description": description,
        ...(image && {
          "image": {
            "@type": "ImageObject",
            "url": image.startsWith('http') ? image : `${baseUrl}${image}`,
            "width": 1200,
            "height": 630
          }
        }),
        "author": {
          "@type": "Person",
          "name": author
        },
        "publisher": {
          "@type": "Organization",
          "name": "SecretLairCards.com",
          "logo": {
            "@type": "ImageObject",
            "url": `${baseUrl}/logo.png`
          }
        },
        "datePublished": datePublished || new Date().toISOString(),
        "dateModified": dateModified || datePublished || new Date().toISOString(),
        "inLanguage": "en",
        "mainEntityOfPage": {
          "@id": `${baseUrl}${url}#webpage`
        }
      }
    ]
  };
}

// 生成 About 页面 Schema
export function generateAboutPageSchema() {
  const baseUrl = 'https://www.secretlaircards.com';
  const dateModified = '2025-01-20';
  
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${baseUrl}/about#webpage`,
    "url": `${baseUrl}/about`,
    "name": "About SecretLairCards.com",
    "description": "SecretLairCards.com is an independent fan website dedicated to cataloging every Magic: The Gathering Secret Lair drop. We provide up-to-date drop lists, card information, market insights, and collector news.",
    "inLanguage": "en",
    "dateModified": dateModified,
    "isPartOf": {
      "@type": "WebSite",
      "@id": `${baseUrl}/#website`
    },
    "publisher": {
      "@type": "Organization",
      "name": "SecretLairCards.com",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/logo.png`
      }
    }
  };
}

// 生成 Contact 页面 Schema
export function generateContactPageSchema() {
  const baseUrl = 'https://www.secretlaircards.com';
  const dateModified = '2025-01-20';
  
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${baseUrl}/contact#webpage`,
    "url": `${baseUrl}/contact`,
    "name": "Contact Us | SecretLairCards.com",
    "description": "Get in touch with SecretLairCards.com. We'd love to hear your feedback, collaboration ideas, or help with any issues.",
    "inLanguage": "en",
    "dateModified": dateModified,
    "isPartOf": {
      "@type": "WebSite",
      "@id": `${baseUrl}/#website`
    },
    "publisher": {
      "@type": "Organization",
      "name": "SecretLairCards.com",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/logo.png`
      }
    },
    "mainEntity": {
      "@type": "Organization",
      "name": "SecretLairCards.com",
      "email": "secretlaircards@proton.me",
      "contactPoint": {
        "@type": "ContactPoint",
        "email": "secretlaircards@proton.me",
        "contactType": "customer service"
      }
    }
  };
}

// 生成 Terms 页面 Schema
export function generateTermsPageSchema() {
  const baseUrl = 'https://www.secretlaircards.com';
  const dateModified = '2025-01-20';
  
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${baseUrl}/terms#webpage`,
    "url": `${baseUrl}/terms`,
    "name": "Terms of Service | SecretLairCards.com",
    "description": "Read our Terms of Service for SecretLairCards.com. Understand your rights and responsibilities when using our platform.",
    "inLanguage": "en",
    "dateModified": dateModified,
    "isPartOf": {
      "@type": "WebSite",
      "@id": `${baseUrl}/#website`
    },
    "publisher": {
      "@type": "Organization",
      "name": "SecretLairCards.com",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/logo.png`
      }
    },
    "about": {
      "@type": "Thing",
      "name": "Terms of Service"
    }
  };
}

// 生成 Privacy 页面 Schema
export function generatePrivacyPageSchema() {
  const baseUrl = 'https://www.secretlaircards.com';
  const dateModified = '2025-01-20';
  
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${baseUrl}/privacy#webpage`,
    "url": `${baseUrl}/privacy`,
    "name": "Privacy Policy | SecretLairCards.com",
    "description": "Learn how SecretLairCards.com protects your privacy and handles your data. Our commitment to transparency and data protection.",
    "inLanguage": "en",
    "dateModified": dateModified,
    "isPartOf": {
      "@type": "WebSite",
      "@id": `${baseUrl}/#website`
    },
    "publisher": {
      "@type": "Organization",
      "name": "SecretLairCards.com",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/logo.png`
      }
    },
    "about": {
      "@type": "Thing",
      "name": "Privacy Policy"
    }
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

