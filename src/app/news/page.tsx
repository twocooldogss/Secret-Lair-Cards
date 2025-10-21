import fs from "fs";
import path from "path";
import NewsCard from "@/components/NewsCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";

import { generateSeoMeta } from "@/lib/seo";

export const metadata = generateSeoMeta({
  title: "Secret Lair News - Latest MTG Updates & Announcements",
  description: "Stay updated with the latest news, announcements, and updates about Magic: The Gathering Secret Lair drops.",
  url: "/news"
});

export default async function NewsPage() {
  const dataPath = path.join(process.cwd(), "data", "mock.json");
  const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
  const news = data.news;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-1 max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-8">Secret Lair News</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {news.map((n: any) => (
            <NewsCard key={n.slug} news={n} />
          ))}
        </div>
      </main>
    </div>
  );
}
