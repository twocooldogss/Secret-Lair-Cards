import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "MTG Investment Insights - Secret Lair Values & Analysis",
  description: "Get expert analysis and investment insights for Magic: The Gathering Secret Lair cards and collections."
};

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
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#18121E] via-[#221933] to-[#0D0A12] text-white">
      {/* INVESTMENT GRID */}
      <section className="w-full bg-gradient-to-b from-[#221933] to-[#18121E] pt-20 pb-20">
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
  );
}
