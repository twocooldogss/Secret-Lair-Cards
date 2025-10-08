import Link from "next/link";
import Image from "next/image";
import { generateSeoMeta } from "@/lib/seo";
import { getSchema } from "@/lib/schema";
import { getData } from "@/lib/data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import DropCard from "@/components/DropCard";
import NewsCard from "@/components/NewsCard";
import CardCard from "@/components/CardCard";

export async function generateMetadata() {
  return generateSeoMeta({
    title: "Secret Lair Cards - MTG Secret Lair Drops, Cards & Investment",
    description: "Explore all Magic: The Gathering Secret Lair drops – card lists, release dates, prices, and investment insights.",
    url: "/",
  });
}

export default async function HomePage() {
  const data = getData();
  
  const drops = data.drops.slice(0, 3); // Featured Drops
  const news = data.news.slice(0, 2);   // Latest News
  const cards = data.cards.slice(0, 3); // Popular Cards
  const investments = data.investment.slice(0, 2);

  const schema = getSchema('home', {});

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Navbar />
      <main className="flex-1 max-w-6xl mx-auto px-4 py-10 space-y-16">
      {/* Hero */}
      <section className="text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Secret Lair Cards
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
          Explore all Magic: The Gathering Secret Lair drops – card lists,
          release dates, prices, and investment insights.
        </p>
        <Link
          href="/drops"
          className="bg-purple-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-purple-700 transition"
        >
          Browse All Drops
        </Link>
      </section>

      {/* Featured Drops */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Featured Drops</h2>
          <Link href="/drops" className="text-purple-600 hover:underline">
            View all
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {drops.map((drop) => (
            <DropCard key={drop.slug} drop={drop} />
          ))}
        </div>
      </section>

      {/* Latest News */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Latest News</h2>
          <Link href="/news" className="text-purple-600 hover:underline">
            View all
          </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {news.map((item) => (
            <NewsCard key={item.slug} news={item} />
          ))}
        </div>
      </section>

      {/* Popular Cards */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Popular Cards</h2>
          <Link href="/cards" className="text-purple-600 hover:underline">
            View all
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((card) => (
            <CardCard key={card.slug} card={card} />
          ))}
        </div>
      </section>

      {/* Investment Insights */}
      <section className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Investment Insights</h2>
          <Link href="/investment" className="text-purple-600 hover:underline font-medium">
            View all
          </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {investments.slice(0, 2).map((post) => (
            <Link
              key={post.slug}
              href={`/investment/${post.slug}`}
              className="block bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-100 hover:border-purple-200"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-lg overflow-hidden">
                    <Image 
                      src={post.image} 
                      alt={post.title}
                      width={64}
                      height={64}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{post.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {post.excerpt || post.metaDescription || "Investment analysis and insights for Secret Lair collectors."}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{post.date}</span>
                    <span className="text-purple-600 hover:text-purple-800 font-medium transition-colors flex items-center gap-1">
                      Read more →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>


        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </main>
    </div>
  );
}