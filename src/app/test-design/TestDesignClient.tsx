'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface Stats {
  dropsCount: number;
  totalCards: number;
  dateRange: string;
}

interface TestDesignClientProps {
  stats: Stats;
}

export default function TestDesignClient({ stats }: TestDesignClientProps) {
  const fadeIn = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  // 使用动态统计数据
  const statsData = [
    { number: `${stats.dropsCount}+`, label: 'Drops Indexed' },
    { number: `${stats.totalCards}+`, label: 'Cards Tracked' },
    { number: stats.dateRange, label: 'Complete History' },
  ];

  // 使用静态数据避免服务端依赖
  const trending = [
    {
      title: 'Secret Scare Superdrop 2025',
      tag: 'Horror',
      href: '/drops/secret-scare-superdrop-2025',
      img: '/images/placeholder.svg',
    },
    {
      title: 'Artist Series: Adam Paquette',
      tag: 'Art Series',
      href: '/drops/adam-paquette',
      img: '/images/placeholder.svg',
    },
    {
      title: 'Trick or Treat',
      tag: 'Halloween',
      href: '/drops/trick-or-treat',
      img: '/images/placeholder.svg',
    },
  ];

  const popularCards = [
    {
      title: 'Reaper King',
      href: '/cards/reaper-king',
      img: '/images/placeholder.svg',
    },
    {
      title: 'Fleshbag Marauder',
      href: '/cards/fleshbag-marauder',
      img: '/images/placeholder.svg',
    },
    {
      title: 'Serra Angel',
      href: '/cards/serra-angel',
      img: '/images/placeholder.svg',
    },
  ];

  const insights = [
    {
      title: 'Secret Lair 2025 Value Report: Which Drops Are Worth Investing In?',
      href: '/investment/secret-lair-2025-value-report',
      desc: 'The Secret Lair 2025 lineup continues to blur the line between collectible art and playable Magic cards.',
      date: '2025-03-01',
    },
    {
      title: 'MTG Secret Lair Market Trends – Fall 2025 Analysis',
      href: '/investment/market-trends-2025',
      desc: 'Secret Lair has reached maturity as a collectible market segment, showing a stable buy-hold-resale pattern.',
      date: '2025-03-10',
    },
  ];

  const articles = [
    {
      title: 'Secret Lair Explained (2025) – Ultimate Guide',
      href: '/news/secret-lair-explained-2025',
      img: '/images/placeholder.svg',
      desc: 'Everything about Secret Lair from 2019 to 2025 — drops, cards, and collector insights.',
      date: '2025-01-20',
    },
    {
      title: 'Secret Lair 2025 Complete Guide: Every Drop Released So Far',
      href: '/news/secret-lair-2025-complete-guide',
      img: '/images/placeholder.svg',
      desc: 'A complete timeline of Magic: The Gathering\'s Secret Lair releases and how each impacted collector value.',
      date: '2025-02-01',
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#18121E] via-[#221933] to-[#0D0A12] text-white">
      {/* NAV */}
      <motion.nav initial="hidden" animate="visible" variants={fadeIn} className="sticky top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="/" className="flex items-center gap-3">
            <Image src="/logo.png" alt="SecretLairCards Logo" width={32} height={32} className="h-8 w-8 rounded-lg" />
            <span className="text-lg font-semibold tracking-tight">SecretLairCards</span>
          </a>
          <div className="hidden gap-6 text-sm text-gray-300 md:flex">
            {['Drops', 'Cards', 'News', 'Investment', 'About'].map((label) => (
              <a key={label} href={`/${label.toLowerCase()}`} className="hover:text-white transition-colors">
                {label}
              </a>
            ))}
          </div>
        </div>
      </motion.nav>

      {/* HERO */}
      <motion.section initial="hidden" animate="visible" variants={fadeIn} className="relative flex flex-col items-center justify-center overflow-hidden py-28 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-800/40 via-indigo-900/50 to-black" />
        <div className="absolute top-1/2 left-1/2 w-[900px] h-[900px] bg-purple-500/25 rounded-full blur-[160px] -translate-x-1/2 -translate-y-1/2 opacity-50" />
        <div className="absolute inset-0 bg-[url('/images/stars-texture.png')] bg-cover bg-center opacity-10" />

        <div className="relative z-10 px-6">
          <motion.h1 variants={fadeIn} className="mx-auto max-w-4xl bg-gradient-to-r from-purple-200 via-white to-yellow-200 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent md:text-6xl">
            Discover the Art of Secret Lair
          </motion.h1>
          <motion.p variants={fadeIn} className="mx-auto mt-6 max-w-2xl text-lg text-gray-200">
            Explore every <span className="text-white font-semibold">Magic: The Gathering Secret Lair</span> drop — art, prices, and collector insights.
          </motion.p>
          <motion.div variants={fadeIn} className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href="/drops" className="rounded-xl bg-purple-600 px-7 py-3 font-semibold shadow-lg transition hover:scale-[1.03] hover:bg-purple-500">
              Browse All Drops
            </a>
            <a href="/cards" className="rounded-xl border border-white/20 bg-white/5 px-7 py-3 font-semibold backdrop-blur-sm transition hover:bg-white/10">
              View Cards
            </a>
          </motion.div>
        </div>
      </motion.section>

      {/* STATS */}
      <motion.section initial="hidden" animate="visible" variants={fadeIn} className="relative py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {statsData.map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="flex flex-col items-center text-center"
              >
                <div className="text-4xl font-bold text-purple-400 md:text-5xl">
                  {stat.number}
                </div>
                <div className="mt-2 text-lg text-gray-300">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* FEATURED DROPS */}
      <motion.section initial="hidden" animate="visible" variants={fadeIn} className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-12 text-center text-3xl font-bold">Featured Drops</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {trending.map((drop, index) => (
              <motion.a
                key={index}
                href={drop.href}
                variants={fadeIn}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-900/20 to-indigo-900/20 p-8 backdrop-blur-sm transition hover:scale-[1.02] hover:from-purple-800/30 hover:to-indigo-800/30"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 transition group-hover:opacity-100" />
                <div className="relative z-10">
                  <div className="mb-4 h-48 w-full overflow-hidden rounded-xl relative">
                    <Image
                      src={drop.img}
                      alt={drop.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition group-hover:scale-110"
                    />
                  </div>
                  <div className="mb-2 flex items-center gap-2">
                    <span className="rounded-full bg-purple-600/20 px-3 py-1 text-xs font-medium text-purple-300">
                      {drop.tag}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-white group-hover:text-purple-200">
                    {drop.title}
                  </h3>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </motion.section>

      {/* POPULAR CARDS */}
      <motion.section initial="hidden" animate="visible" variants={fadeIn} className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-12 text-center text-3xl font-bold">Popular Cards</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {popularCards.map((card, index) => (
              <motion.a
                key={index}
                href={card.href}
                variants={fadeIn}
                className="group overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm transition hover:bg-white/10"
              >
                <div className="h-48 w-full overflow-hidden relative">
                  <Image
                    src={card.img}
                    alt={card.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition group-hover:scale-110"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-white group-hover:text-purple-200">
                    {card.title}
                  </h3>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </motion.section>

      {/* INVESTMENT INSIGHTS */}
      <motion.section initial="hidden" animate="visible" variants={fadeIn} className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-12 text-center text-3xl font-bold">Investment Insights</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {insights.map((insight, index) => (
              <motion.a
                key={index}
                href={insight.href}
                variants={fadeIn}
                className="group overflow-hidden rounded-2xl bg-gradient-to-br from-purple-900/20 to-indigo-900/20 p-8 backdrop-blur-sm transition hover:scale-[1.02] hover:from-purple-800/30 hover:to-indigo-800/30"
              >
                <div className="mb-4 flex items-center gap-2">
                  <span className="rounded-full bg-green-600/20 px-3 py-1 text-xs font-medium text-green-300">
                    Investment
                  </span>
                  <span className="text-sm text-gray-400">{insight.date}</span>
                </div>
                <h3 className="mb-3 text-xl font-semibold text-white group-hover:text-purple-200">
                  {insight.title}
                </h3>
                <p className="text-gray-300 group-hover:text-gray-200">
                  {insight.desc}
                </p>
              </motion.a>
            ))}
          </div>
        </div>
      </motion.section>

      {/* LATEST NEWS */}
      <motion.section initial="hidden" animate="visible" variants={fadeIn} className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-12 text-center text-3xl font-bold">Latest News</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {articles.map((article, index) => (
              <motion.a
                key={index}
                href={article.href}
                variants={fadeIn}
                className="group overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm transition hover:bg-white/10"
              >
                <div className="h-48 w-full overflow-hidden relative">
                  <Image
                    src={article.img}
                    alt={article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="rounded-full bg-blue-600/20 px-3 py-1 text-xs font-medium text-blue-300">
                      News
                    </span>
                    <span className="text-sm text-gray-400">{article.date}</span>
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-white group-hover:text-purple-200">
                    {article.title}
                  </h3>
                  <p className="text-gray-300 group-hover:text-gray-200">
                    {article.desc}
                  </p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </motion.section>

      {/* FOOTER */}
      <motion.footer initial="hidden" animate="visible" variants={fadeIn} className="border-t border-white/10 py-12">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <div className="mb-6 flex items-center justify-center gap-3">
            <Image src="/logo.png" alt="SecretLairCards Logo" width={32} height={32} className="h-8 w-8 rounded-lg" />
            <span className="text-lg font-semibold">SecretLairCards</span>
          </div>
          <p className="text-gray-400">
            The ultimate resource for Magic: The Gathering Secret Lair collectors.
          </p>
        </div>
      </motion.footer>
    </main>
  );
}
