"use client";

import Image from "next/image";
import { useState } from "react";

interface Card {
  name: string;
  image?: string;
  description?: string;
  rarity?: string;
  type?: string;
}

interface EnhancedCardDisplayProps {
  cards: Card[];
  dropName: string;
}

export default function EnhancedCardDisplay({ cards, dropName }: EnhancedCardDisplayProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  if (!cards || cards.length === 0) {
    return (
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">🃏 Included Cards</h2>
        <div className="text-center py-8 text-gray-500">
          <p>Card information will be available after running the fetch script.</p>
          <p className="text-sm mt-2">
            Run: <code className="bg-gray-100 px-2 py-1 rounded">npm run fetch-drops</code>
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="mb-12" aria-labelledby="cards-heading">
      <h2 id="cards-heading" className="text-2xl font-semibold mb-6">
        🃏 Included Cards ({cards.length})
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <div
            key={card.name || index}
            className={`bg-white rounded-lg shadow-md transition-all duration-300 overflow-hidden flex flex-col group ${
              hoveredCard === card.name ? 'shadow-2xl scale-105' : 'hover:shadow-xl'
            }`}
            onMouseEnter={() => setHoveredCard(card.name)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {/* 卡牌图片 - 添加模糊占位和优化加载 */}
            <div className="relative h-64 overflow-hidden">
              <Image
                src={card.image || '/images/placeholder.svg'}
                alt={card.name}
                fill
                className={`object-cover transition-transform duration-300 ${
                  hoveredCard === card.name ? 'scale-110' : 'scale-100'
                }`}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                loading="lazy"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
              />
              {/* 悬停时的放大镜效果 */}
              <div className={`absolute inset-0 bg-black bg-opacity-0 transition-opacity duration-300 ${
                hoveredCard === card.name ? 'bg-opacity-10' : ''
              }`} />
            </div>
            
            {/* 卡牌信息 */}
            <div className="p-4 flex-1 flex flex-col justify-between text-center">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-purple-700 transition-colors">
                  {card.name}
                </h3>
                {card.description && (
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">{card.description}</p>
                )}
                <div className="flex flex-wrap gap-1 justify-center">
                  {card.type && (
                    <span className="text-xs text-purple-600 font-medium bg-purple-50 px-2 py-1 rounded">
                      {card.type}
                    </span>
                  )}
                  {card.rarity && (
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {card.rarity}
                    </span>
                  )}
                </div>
              </div>
              
              <p className="text-xs text-purple-700 mt-3 opacity-70 group-hover:opacity-100 transition-opacity">
                Card from <span className="font-medium">{dropName}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
