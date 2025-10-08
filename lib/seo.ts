// /lib/seo.ts
// -------------------------------------------
// Dynamic SEO meta generator for SecretLairCards.com
// -------------------------------------------

import { Metadata } from "next";

export type SeoParams = {
  title?: string;
  description?: string;
  keywords?: string[];
  type?: "website" | "article" | "product";
  slug?: string;
  image?: string;
  url?: string;
};

/**
 * Generates meta information for each page.
 * Includes default values for global SEO optimization.
 */
export function generateSeo({
  title,
  description,
  keywords = [],
  type = "website",
  slug = "",
  image,
  url,
}: SeoParams): Metadata {
  const siteName = "Secret Lair Cards";
  const baseUrl = "https://secretlaircards.com";

  // Default SEO values (for homepage and fallback)
  const defaultTitle = "Secret Lair Cards – MTG Drops, Values & Collector Insights";
  const defaultDescription = "Explore every MTG Secret Lair drop — prices, release dates, card lists, and collector insights. Your complete 2025 guide to Magic's most exclusive cards.";
  const defaultKeywords = [
    "Secret Lair",
    "MTG Secret Lair",
    "Magic The Gathering",
    "MTG drops",
    "Secret Lair cards",
    "MTG investment",
    "Magic collector",
    "Secret Lair 2025",
    "Magic cards value",
    "Scryfall"
  ];

  const fullTitle = title ? `${title} | ${siteName}` : defaultTitle;
  const fullDescription = description || defaultDescription;
  const metaKeywords = [...defaultKeywords, ...keywords].join(", ");
  const finalUrl = url || `${baseUrl}${slug ? `/${slug}` : ""}`;

  return {
    title: fullTitle,
    description: fullDescription,
    keywords: metaKeywords,
    authors: [{ name: siteName }],
    creator: siteName,
    publisher: siteName,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: finalUrl,
    },
    openGraph: {
      title: fullTitle,
      description: fullDescription,
      type: type === "product" ? "website" : type,
      url: finalUrl,
      siteName: siteName,
      images: image ? [
        {
          url: image.startsWith('http') ? image : `${baseUrl}${image}`,
          width: 1200,
          height: 630,
          alt: fullTitle,
        }
      ] : [
        {
          url: `${baseUrl}/logo.png`,
          width: 1200,
          height: 630,
          alt: siteName,
        }
      ],
      locale: 'en_US',
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: fullDescription,
      site: "@SecretLairCards",
      creator: "@SecretLairCards",
      images: image ? [image] : [`${baseUrl}/logo.png`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

// 页面类型特定的描述模板
export const PAGE_DESCRIPTIONS = {
  home: "Explore every MTG Secret Lair drop — prices, release dates, card lists, and collector insights. Your complete 2025 guide to Magic's most exclusive cards.",
  drops: "Discover MTG Secret Lair drops with card lists, artwork highlights, and collector updates. Stay current with Magic's 2025 exclusive releases.",
  cards: "Browse all Magic: The Gathering cards from Secret Lair drops with detailed information, artwork, and rarity analysis.",
  news: "Latest news and updates about Magic: The Gathering Secret Lair drops, release announcements, and collector insights.",
  investment: "Analyze MTG Secret Lair values and market trends. Track ROI, limited drops, and the best Magic cards to invest in during 2025.",
  about: "Learn about SecretLairCards.com - your ultimate resource for Magic: The Gathering Secret Lair drops, values, and collector insights."
};

// 生成页面标题
export function generatePageTitle(pageTitle?: string, pageType?: keyof typeof PAGE_DESCRIPTIONS): string {
  const defaultTitle = "Secret Lair Cards – MTG Drops, Values & Collector Insights";
  
  if (pageTitle) {
    return `${pageTitle} | Secret Lair Cards`;
  }
  
  if (pageType && pageType !== 'home') {
    return `${defaultTitle} | Secret Lair Cards`;
  }
  
  return defaultTitle;
}

// 生成页面描述
export function generatePageDescription(customDescription?: string, pageType?: keyof typeof PAGE_DESCRIPTIONS): string {
  const defaultDescription = "Explore every MTG Secret Lair drop — prices, release dates, card lists, and collector insights. Your complete 2025 guide to Magic's most exclusive cards.";
  
  if (customDescription) {
    return customDescription;
  }
  
  if (pageType && PAGE_DESCRIPTIONS[pageType]) {
    return PAGE_DESCRIPTIONS[pageType];
  }
  
  return defaultDescription;
}

// 生成完整的SEO元数据（保持向后兼容）
export function generateSeoMeta({
  title,
  description,
  image,
  url,
  pageType,
  keywords = []
}: {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  pageType?: keyof typeof PAGE_DESCRIPTIONS;
  keywords?: string[];
}): Metadata {
  return generateSeo({
    title,
    description,
    keywords,
    type: pageType === 'news' || pageType === 'investment' ? 'article' : 'website',
    slug: url?.replace('/', ''),
    image,
    url,
  });
}