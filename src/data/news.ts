export interface NewsItem {
  slug: string;
  title: string;
  date: string;
  image: string;
  excerpt: string;
  content?: string;
}

export const newsItems: NewsItem[] = [
  {
    slug: "secret-scare-2023",
    title: "Secret Lair Secret Scare Announced",
    date: "2023-10-01",
    image: "/news/secret-scare.jpg",
    excerpt: "Wizards of the Coast announces a spooky Secret Lair drop just in time for Halloween.",
    content: "Wizards of the Coast has announced their annual Secret Scare Secret Lair drop, featuring horror-themed Magic: The Gathering cards. This year's collection includes classic horror movie references and spooky artwork that's perfect for the Halloween season."
  },
  {
    slug: "mtg-2026-lineup",
    title: "MTG 2026 Secret Lair Lineup Teased",
    date: "2023-09-25",
    image: "/news/mtg-2026.jpg",
    excerpt: "Early details revealed for upcoming Secret Lair drops in 2026 — players speculate on possible themes.",
    content: "Wizards of the Coast has teased some early details about their 2026 Secret Lair lineup. While specific themes haven't been revealed yet, players are already speculating about possible collaborations and artistic directions for the upcoming year."
  },
  {
    slug: "artist-series-expansion",
    title: "Artist Series Expansion Announced",
    date: "2023-09-15",
    image: "/news/artist-series.jpg",
    excerpt: "New artist series drops featuring renowned Magic artists and their signature styles.",
    content: "The popular Artist Series is getting a major expansion with new drops featuring some of Magic's most beloved artists. Each drop will showcase the unique artistic vision of these talented creators."
  },
  {
    slug: "crossover-collaborations",
    title: "Major Crossover Collaborations Coming",
    date: "2023-09-10",
    image: "/news/crossovers.jpg",
    excerpt: "Exciting new crossover partnerships announced for upcoming Secret Lair drops.",
    content: "Wizards of the Coast has announced several major crossover collaborations for upcoming Secret Lair drops. These partnerships will bring beloved characters and themes from popular franchises into the Magic universe."
  }
];

export const getLatestNews = (limit: number = 4) => {
  return newsItems
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
};

export const getNewsBySlug = (slug: string) => {
  return newsItems.find(news => news.slug === slug);
};

