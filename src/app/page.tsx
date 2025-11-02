import Image from "next/image";
import Script from "next/script";
import { generateSeoMeta } from '@/lib/seo';
import { getDropsData, normalizeDrop, Drop, News, Investment } from '@/lib/data';
import { getNewsThumbImageUrl } from '@/lib/newsImages';
import * as fs from 'fs';
import * as path from 'path';

export async function generateMetadata() {
  return generateSeoMeta({
    title: 'Secret Lair 2025 – Complete MTG Drop, Art & Investment Guide | SecretLairCards.com',
    description: 'Explore every Magic: The Gathering Secret Lair drop from 2019–2025 — card lists, stunning artworks, and collector insights. Discover which 2025 Secret Lair drops are truly worth investing in.',
    url: '/',
    keywords: ['Secret Lair', 'MTG Secret Lair', 'Secret Lair Drops', 'Magic The Gathering Secret Lair', 'Secret Lair Cards', 'Secret Lair 2025', 'MTG Collector Guide', 'Secret Lair Art', 'Secret Lair Value', 'Secret Lair Investment'],
    image: '/og-secret-lair-2025.jpg',
    ogTitle: 'Secret Lair 2025 – The Art & Value of MTG Drops | SecretLairCards.com',
    ogDescription: 'Discover every Secret Lair drop, card, and artwork from 2019–2025. A complete MTG guide for collectors and investors.',
    twitterTitle: 'Secret Lair 2025 – Art, Drops & Collector Insights',
    twitterDescription: 'Your ultimate 2025 MTG Secret Lair resource: drops, artworks, prices, and collector insights.'
  });
}

export default async function HomePage() {
  // 获取真实的drops数据
  const allDrops = getDropsData().map(normalizeDrop);
  const featuredDrops = allDrops.slice(0, 3);
  
  // 获取investment和news数据
  const dataPath = path.join(process.cwd(), 'data', 'mock.json');
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  const featuredInvestment = data.investment.slice(0, 3);
  
  // 获取指定的3篇精选新闻文章
  const featuredNewsSlugs = [
    'secret-lair-explained-2025',
    'top-10-secret-lair-artworks-2025',
    'evolution-of-secret-lair-2019-2025'
  ];
  
  const featuredNews = data.news.filter((n: News) => featuredNewsSlugs.includes(n.slug));

  // 生成 ItemList 结构化数据
  const baseUrl = 'https://www.secretlaircards.com';
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Secret Lair 2025 Drops",
    "itemListElement": featuredDrops.map((drop: Drop, index: number) => ({
      "@type": "Product",
      "position": index + 1,
      "name": drop.title,
      "image": drop.image.startsWith('http') ? drop.image : `${baseUrl}${drop.image}`,
      "description": drop.description || `MTG Secret Lair drop: ${drop.title}`,
      "url": `${baseUrl}/drops/${drop.slug}`
    }))
  };

  return (
    <>
      {/* ItemList Structured Data */}
      <Script
        id="itemlist-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(itemListSchema),
        }}
      />
      <main className="min-h-screen bg-gradient-to-b from-[#18121E] via-[#221933] to-[#0D0A12] text-white">
      {/* HERO */}
      <section className="relative flex flex-col items-center justify-center overflow-hidden py-28 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-800/40 via-indigo-900/50 to-black" />
        <div className="absolute top-1/2 left-1/2 w-[900px] h-[900px] bg-purple-500/25 rounded-full blur-[160px] -translate-x-1/2 -translate-y-1/2 opacity-50" />
        <div className="absolute inset-0 bg-[url('/images/stars-texture.png')] bg-cover bg-center opacity-10" />

        <div className="relative z-10 px-6">
          <h1 className="mx-auto max-w-4xl bg-gradient-to-r from-purple-200 via-white to-yellow-200 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent md:text-6xl">
            Discover the Art of Secret Lair
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-200">
            Explore every <span className="text-white font-semibold">Magic: The Gathering Secret Lair</span> drop — art, prices, and collector insights.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href="/drops" className="rounded-xl bg-purple-600 px-7 py-3 font-semibold shadow-lg transition hover:scale-[1.03] hover:bg-purple-500">
              Browse All Drops
            </a>
            <a href="/investment" className="rounded-xl border border-white/20 px-7 py-3 font-semibold text-gray-200 transition hover:border-purple-500 hover:bg-white/5">
              Investment Insights
            </a>
          </div>

          {/* STATISTICS */}
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="text-center">
              <div className="bg-gradient-to-r from-purple-400 via-white to-purple-400 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
                187+
              </div>
              <div className="mt-2 text-sm text-gray-300">Drops Indexed</div>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-r from-purple-400 via-white to-purple-400 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
                1171+
              </div>
              <div className="mt-2 text-sm text-gray-300">Cards Tracked</div>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-r from-purple-400 via-white to-purple-400 bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
                2019-2025
              </div>
              <div className="mt-2 text-sm text-gray-300">Complete History</div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED DROPS */}
      <section className="w-full bg-gradient-to-b from-[#221933] to-[#18121E] py-20">
        <div className="mx-auto max-w-5xl px-6">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-2xl font-semibold">Featured Drops</h2>
          <a href="/drops" className="text-sm text-purple-300 hover:text-white">
            View all →
          </a>
        </div>
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {featuredDrops.map((drop: Drop, i: number) => (
            <a
              key={drop.slug}
              href={`/drops/${drop.slug}`}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white text-gray-900 shadow-sm transition hover:shadow-lg"
            >
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src={drop.image}
                  alt={drop.title}
                  fill
                  sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold leading-snug transition group-hover:text-purple-700">
                  {drop.title}
                </h3>
                <p className="mt-1 text-sm text-gray-600 line-clamp-2">{drop.description}</p>
                <div className="mt-3 flex items-center justify-between text-xs">
                  <span className="text-gray-500">{drop.releaseDate}</span>
                  <span className="rounded-full bg-purple-100 px-2 py-0.5 text-purple-700">{drop.theme}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
        </div>
      </section>

      {/* LATEST NEWS */}
      <section className="w-full bg-gradient-to-b from-[#18121E] to-[#221933] py-20">
        <div className="mx-auto max-w-5xl px-6">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-2xl font-semibold">Latest News</h2>
          <a href="/news" className="text-sm text-purple-300 hover:text-white">
            View all →
          </a>
        </div>
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {featuredNews.map((news: News, idx: number) => (
            <article
              key={news.slug}
              className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-0 backdrop-blur-sm transition hover:border-purple-400/50"
            >
              <a href={`/news/${news.slug}`} className="block">
                <div className="relative w-full aspect-[1200/800] overflow-hidden">
                  <Image
                    src={getNewsThumbImageUrl(news)}
                    alt={news.title}
                    fill
                    priority={idx === 0}
                    sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white">{news.title}</h3>
                  <p className="mt-2 line-clamp-3 text-sm text-gray-300">{news.excerpt}</p>
                  <div className="mt-3 flex items-center justify-between text-sm text-gray-400">
                    <span>{news.date}</span>
                    <span className="text-purple-300">Read More →</span>
                  </div>
                </div>
              </a>
            </article>
          ))}
        </div>
        </div>
      </section>

      {/* INVESTMENT INSIGHTS */}
      <section className="w-full bg-gradient-to-b from-[#221933] to-[#0D0A12] py-20">
        <div className="mx-auto max-w-5xl px-6">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-2xl font-semibold">Investment Insights</h2>
          <a href="/investment" className="text-sm text-purple-300 hover:text-white">
            View all →
          </a>
        </div>
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {featuredInvestment.map((item: Investment, idx: number) => (
            <article
              key={item.slug}
              className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-0 backdrop-blur-sm transition hover:border-purple-400/50"
            >
              <a href={`/investment/${item.slug}`} className="block">
                <div className="relative w-full aspect-[1200/630] overflow-hidden">
                  <Image
                    src={item.image || item.coverImage || '/images/placeholder.svg'}
                    alt={item.title}
                    fill
                    priority={idx === 0}
                    sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 line-clamp-3 text-sm text-gray-300">{item.excerpt}</p>
                  <div className="mt-3 flex items-center justify-between text-sm text-gray-400">
                    <span>{item.date}</span>
                    <span className="text-purple-300">Read Analysis →</span>
                  </div>
                </div>
              </a>
            </article>
          ))}
        </div>
        </div>
      </section>
    </main>
    </>
  );
}