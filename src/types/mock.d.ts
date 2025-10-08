export interface Card {
  id: string;
  name: string;
  type: string;
  rarity: string;
  text: string;
  set: string;
  image: string;
}

export interface Drop {
  id: string;
  name: string;
  releaseDate: string;
  description: string;
  image: string;
  cards: Card[];
}

export interface News {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  image: string;
}

export interface MockData {
  drops: Drop[];
  news: News[];
}

declare module "../../data/mock.json" {
  const data: MockData;
  export default data;
}

