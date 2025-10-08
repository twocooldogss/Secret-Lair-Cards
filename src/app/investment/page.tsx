import fs from "fs";
import path from "path";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import CanonicalUrl from "@/components/CanonicalUrl";

import { generateSeoMeta } from "@/lib/seo";

export const metadata = generateSeoMeta({
  title: "MTG Investment Insights - Secret Lair Values & Analysis",
  description: "Get expert analysis and investment insights for Magic: The Gathering Secret Lair cards and collections.",
  url: "/investment"
});

export default async function InvestmentPage() {
  const dataPath = path.join(process.cwd(), "data", "mock.json");
  const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
  const investments = data.investment;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <CanonicalUrl url="/investment" />
      <Navbar />
      <main className="flex-1 max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-8">Investment Insights</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {investments.map((item: any) => (
            <Link key={item.slug} href={`/investment/${item.slug}`} className="block">
              <div className="bg-gradient-to-br from-white to-purple-50 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-purple-100 cursor-pointer">
                <div className="relative overflow-hidden rounded-lg mb-4">
                  <Image src={item.image} alt={item.title} width={400} height={192} className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300" />
                  <div className="absolute top-2 right-2 bg-purple-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                    Analysis
                  </div>
                </div>
                <h2 className="text-xl font-semibold mb-3 text-gray-800">{item.title}</h2>
                <p className="text-gray-600 mb-4 line-clamp-3">{item.excerpt}</p>
                <div className="flex justify-between items-center">
                  <p className="text-gray-500 text-sm">{item.date}</p>
                  <span className="text-purple-600 font-medium hover:text-purple-800 transition-colors flex items-center gap-1">
                    Read More →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
