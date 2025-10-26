"use client";

import Image from "next/image";
import Link from "next/link";
import DropCard from "@/components/DropCard";

interface HomePageClientProps {
  featuredDrops: any[];
  newsData: any[];
  investmentData: any[];
}

export default function HomePageClient({ featuredDrops, newsData, investmentData }: HomePageClientProps) {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/10 to-indigo-900/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Secret Lair Cards
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Discover every Magic: The Gathering Secret Lair drop with detailed card lists, 
              investment insights, and collector guides.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/drops"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Explore Drops
              </Link>
              <Link
                href="/investment"
                className="border border-purple-400 text-purple-300 hover:bg-purple-400/10 px-8 py-3 rounded-lg font-semibold transition-all duration-300"
              >
                Investment Guide
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Drops */}
      <section className="py-16 bg-gradient-to-b from-transparent to-purple-900/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Featured Drops
            </h2>
            <p className="text-gray-400 text-lg">
              Discover the most popular and valuable Secret Lair collections
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredDrops.map((drop, index) => (
              <div key={drop.slug}>
                <DropCard drop={drop} />
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/drops"
              className="inline-flex items-center text-purple-400 hover:text-purple-300 font-semibold transition-colors"
            >
              View All Drops
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Latest News
            </h2>
            <p className="text-gray-400 text-lg">
              Stay updated with the latest Secret Lair announcements and market insights
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsData.slice(0, 3).map((post, index) => (
              <article key={post.slug} className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 hover:border-purple-400/50 overflow-hidden transition-all duration-300">
                <Link href={`/news/${post.slug}`} className="block">
                  {/* Fixed aspect ratio: 1200x630 to prevent CLS */}
                  <div className="relative w-full aspect-[1200/630] overflow-hidden">
                    <Image
                      src={post.coverImage || '/images/placeholder.svg'}
                      alt={post.title || 'News Cover'}
                      fill
                      priority={index === 0}
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-white">{post.title}</h3>
                    <p className="text-gray-300 mb-4 line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">{post.date}</span>
                      <span className="text-sm text-purple-300">Read More →</span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Section */}
      <section className="py-16 bg-gradient-to-b from-purple-900/5 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Investment Insights
            </h2>
            <p className="text-gray-400 text-lg">
              Expert analysis on Secret Lair market trends and investment opportunities
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {investmentData.slice(0, 3).map((post, index) => (
              <article key={post.slug} className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 hover:border-purple-400/50 overflow-hidden transition-all duration-300">
                <Link href={`/investment/${post.slug}`} className="block">
                  {/* Fixed aspect ratio: 1200x630 to prevent CLS */}
                  <div className="relative w-full aspect-[1200/630] overflow-hidden">
                    <Image
                      src={post.coverImage || '/images/placeholder.svg'}
                      alt={post.title || 'Investment Cover'}
                      fill
                      priority={index === 0}
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-white">{post.title}</h3>
                    <p className="text-gray-300 mb-4 line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">{post.date}</span>
                      <span className="text-sm text-purple-300">Read Analysis →</span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}