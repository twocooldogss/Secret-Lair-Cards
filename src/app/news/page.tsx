import * as fs from "fs";
import * as path from "path";
import Script from "next/script";
import NewsCard from "@/components/NewsCard";

import { generateSeoMeta } from "@/lib/seo";
import { generateNewsPageGraphSchema } from "@/lib/schema";

export const metadata = generateSeoMeta({
  title: "Secret Lair News - Latest MTG Updates & Announcements",
  description: "Stay updated with the latest news, announcements, and updates about Magic: The Gathering Secret Lair drops.",
  url: "/news"
});

export default async function NewsPage() {
  const dataPath = path.join(process.cwd(), "data", "mock.json");
  const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
  const news = data.news;

  // 生成 News 页面 @graph Schema
  const newsPageSchema = generateNewsPageGraphSchema();

  return (
    <>
      {/* News Page Graph Schema */}
      <Script
        id="news-page-graph-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(newsPageSchema),
        }}
      />
      <main className="min-h-screen bg-gradient-to-b from-[#18121E] via-[#221933] to-[#0D0A12] text-white">
      {/* NEWS GRID */}
      <section className="w-full bg-gradient-to-b from-[#221933] to-[#18121E] pt-20 pb-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="text-2xl font-semibold">Latest News & Updates</h2>
            <span className="text-sm text-purple-300">{news.length} articles available</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {news.map((n: any) => (
              <NewsCard key={n.slug} news={n} />
            ))}
          </div>
        </div>
      </section>
    </main>
    </>
  );
}
