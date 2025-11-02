/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import * as fs from "fs";
import * as path from "path";
import { generateSeoMeta } from "@/lib/seo";
import { generateInvestmentPageGraphSchema } from "@/lib/schema";
import PriceCardGrid from "@/components/PriceCardGrid";

export const metadata = generateSeoMeta({
  title: "Secret Lair Investment Insights - Value Reports & Market Trends",
  description: "Track market performance, resale trends, and collector value of Magic: The Gathering Secret Lair drops from 2019–2025.",
  url: "/investment"
});

// 读取价格数据
function getDropPrices() {
  try {
    const pricesPath = path.join(process.cwd(), "data", "drop_prices.json");
    const prices = JSON.parse(fs.readFileSync(pricesPath, "utf-8"));
    return prices;
  } catch {
    return {};
  }
}

// 读取价格历史数据
function getPriceHistory() {
  try {
    const historyPath = path.join(process.cwd(), "data", "price_history.json");
    const history = JSON.parse(fs.readFileSync(historyPath, "utf-8"));
    return history;
  } catch {
    return {};
  }
}

interface DropPrice {
  name: string;
  slug: string;
  card_count: number;
  valid_card_count?: number;
  total_price_usd: number;
  average_price_usd: number;
  change_pct: number;
  last_updated: string;
}

const investments = [
  {
    title: "Secret Lair 2025 Value Report: Which Drops Are Worth Investing In?",
    slug: "secret-lair-2025-value-report",
    date: "2025-03-01",
    excerpt: "The Secret Lair 2025 lineup continues to blur the line between collectible art and playable Magic cards. For investors, this year's drops reveal strong patterns in scarcity, cross-media collaboration, and art-driven demand.",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=630&fit=crop&crop=center"
  },
  {
    title: "MTG Secret Lair Market Trends – Fall 2025 Analysis",
    slug: "market-trends-2025",
    date: "2025-03-10",
    excerpt: "Secret Lair has reached maturity as a collectible market segment. Unlike early years dominated by speculation, 2025 shows a stabilized cycle of buy, hold, and resale.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=630&fit=crop&crop=center"
  },
  {
    title: "Why Secret Lair Is Transforming MTG's Collector Market",
    slug: "why-secret-lair-transforming-market",
    date: "2025-02-18",
    excerpt: "Secret Lair has become a case study in modern collectibles — combining limited print runs, digital marketing, and artistic branding to reshape how Magic fans engage with cards.",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1200&h=630&fit=crop&crop=center"
  }
];

export default function InvestmentPage() {
  // 生成 Investment 页面 @graph Schema
  const investmentPageSchema = generateInvestmentPageGraphSchema();
  
  // 获取价格数据
  const dropPrices = getDropPrices();
  const priceHistory = getPriceHistory();
  const pricesArray = Object.values(dropPrices) as DropPrice[];
  const hasPrices = pricesArray.length > 0;

  return (
    <>
      {/* Investment Page Graph Schema */}
      <Script
        id="investment-page-graph-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(investmentPageSchema),
        }}
      />
      <main className="min-h-screen bg-gradient-to-b from-[#18121E] via-[#221933] to-[#0D0A12] text-white">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-800/40 via-indigo-900/50 to-black" />
        <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-purple-500/25 rounded-full blur-[140px] -translate-x-1/2 -translate-y-1/2 opacity-50" />
        <div className="absolute inset-0 bg-[url('/images/stars-texture.png')] bg-cover bg-center opacity-10" />
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-200 via-white to-yellow-200 bg-clip-text text-transparent">
            Secret Lair Investment Insights
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Track real-time market value and trends across Magic: The Gathering Secret Lair drops.
            {hasPrices && (
              <span className="block mt-2 text-sm text-gray-400">
                Updated daily using live data from{" "}
                <a href="https://scryfall.com" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300 underline">
                  Scryfall
                </a>
                {(() => {
                  // 获取最新的价格更新日期
                  if (pricesArray.length === 0) return null;
                  const sorted = [...pricesArray].sort((a, b) => 
                    new Date(b.last_updated).getTime() - new Date(a.last_updated).getTime()
                  );
                  const latestUpdate = sorted[0]?.last_updated;
                  return latestUpdate ? (
                    <span className="block mt-1">
                      Latest price update: <span className="text-purple-300 font-medium">{latestUpdate}</span>
                    </span>
                  ) : null;
                })()}
              </span>
            )}
          </p>
        </div>
      </section>

      {/* MARKET PRICES SECTION */}
      {hasPrices ? (
        <section className="w-full bg-gradient-to-b from-[#221933] to-[#18121E] pt-12 pb-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-3">Market Prices & Trends</h2>
            </div>
            <PriceCardGrid prices={pricesArray} priceHistory={priceHistory} />
          </div>
        </section>
      ) : (
        <section className="w-full bg-gradient-to-b from-[#221933] to-[#18121E] pt-12 pb-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
              <p className="text-gray-300 mb-4">Market price data is being collected...</p>
              <p className="text-sm text-gray-400">
                Run <code className="bg-white/10 px-2 py-1 rounded">npm run fetch-prices</code> to start tracking prices.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* INVESTMENT REPORTS SECTION */}
      <section className="w-full bg-gradient-to-b from-[#18121E] to-[#221933] pt-12 pb-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="text-2xl font-semibold">Market Analysis & Reports</h2>
            <span className="text-sm text-purple-300">{investments.length} reports available</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {investments.map((item) => (
              <Link key={item.slug} href={`/investment/${item.slug}`} className="block">
                <article className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-0 backdrop-blur-sm transition hover:border-purple-400/50">
                  <div className="relative w-full aspect-[1200/630] overflow-hidden">
                    <Image 
                      src={item.image} 
                      alt={item.title} 
                      fill
                      sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                      className="object-cover" 
                    />
                    <div className="absolute top-3 right-3 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                      Analysis
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                    <p className="mt-2 line-clamp-3 text-sm text-gray-300">{item.excerpt}</p>
                    <div className="mt-3 flex items-center justify-between text-sm text-gray-400">
                      <span>{item.date}</span>
                      <span className="text-purple-300">Read Analysis →</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
    </>
  );
}
