'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CardData {
  name: string;
  image: string;
  type?: string;
  rarity?: string;
}

interface CardCarouselProps {
  cards: string[];
  dropName: string;
  initialCardData?: Array<{
    name: string;
    image: string;
    type?: string;
    rarity?: string;
  }>;
}

export default function CardCarousel({ cards, dropName, initialCardData }: CardCarouselProps) {
  const [cardData, setCardData] = useState<CardData[]>(initialCardData || []);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(!initialCardData || initialCardData.length === 0);
  const [error, setError] = useState<string | null>(null);

  // 从Scryfall API获取卡牌数据（仅在客户端且没有初始数据时）
  useEffect(() => {
    // 如果已经有初始数据，跳过客户端获取
    if (initialCardData && initialCardData.length > 0) {
      setLoading(false);
      return;
    }

    const fetchCardData = async () => {
      if (!cards || cards.length === 0) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const cardPromises = cards.map(async (cardName) => {
          try {
            // 搜索卡牌，优先查找Secret Lair版本
            const searchQuery = encodeURIComponent(`!"${cardName}" (set:sld OR set:slu OR set:slc OR set:slp)`);
            const response = await fetch(`https://api.scryfall.com/cards/search?q=${searchQuery}`);
            
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (data.data && data.data.length > 0) {
              const card = data.data[0];
              return {
                name: card.name,
                image: card.image_uris?.art_crop || card.image_uris?.normal || card.image_uris?.large || '/images/placeholder.svg',
                type: card.type_line,
                rarity: card.rarity
              };
            } else {
              // 如果没找到Secret Lair版本，尝试查找普通版本
              const fallbackQuery = encodeURIComponent(`!"${cardName}"`);
              const fallbackResponse = await fetch(`https://api.scryfall.com/cards/search?q=${fallbackQuery}`);
              
              if (fallbackResponse.ok) {
                const fallbackData = await fallbackResponse.json();
                if (fallbackData.data && fallbackData.data.length > 0) {
                  const card = fallbackData.data[0];
                  return {
                    name: card.name,
                    image: card.image_uris?.art_crop || card.image_uris?.normal || card.image_uris?.large || '/images/placeholder.svg',
                    type: card.type_line,
                    rarity: card.rarity
                  };
                }
              }
              
              // 如果都没找到，返回占位符
              return {
                name: cardName,
                image: '/images/placeholder.svg',
                type: 'Unknown',
                rarity: 'Unknown'
              };
            }
          } catch (error) {
            console.warn(`Failed to fetch card data for ${cardName}:`, error);
            return {
              name: cardName,
              image: '/images/placeholder.svg',
              type: 'Unknown',
              rarity: 'Unknown'
            };
          }
        });

        const results = await Promise.all(cardPromises);
        setCardData(results);
      } catch (error) {
        console.error('Error fetching card data:', error);
        setError('Failed to load card images');
      } finally {
        setLoading(false);
      }
    };

    fetchCardData();
  }, [cards, initialCardData]);

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % cardData.length);
  };

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + cardData.length) % cardData.length);
  };

  const goToCard = (index: number) => {
    setCurrentIndex(index);
  };

  if (loading) {
    return (
      <div className="relative w-full h-[500px] overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-purple-900/20 to-indigo-900/20 border border-white/10 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto mb-4"></div>
          <p className="text-gray-300">Loading cards...</p>
        </div>
      </div>
    );
  }

  if (error || cardData.length === 0) {
    return (
      <div className="relative w-full h-[500px] overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-purple-900/20 to-indigo-900/20 border border-white/10 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-300 mb-4">Unable to load card images</p>
          <p className="text-gray-400 text-sm">{error || 'No cards available'}</p>
        </div>
      </div>
    );
  }

  const currentCard = cardData[currentIndex];

  return (
    <div className="relative w-full h-[500px] overflow-hidden rounded-2xl shadow-2xl bg-gradient-to-br from-purple-900/20 to-indigo-900/20 border border-white/10">
      {/* 主卡牌显示区域 */}
      <div className="relative w-full h-full">
        <Image 
          src={currentCard.image} 
          alt={currentCard.name} 
          fill
          className="object-contain p-4" 
          priority
        />
        
        {/* 卡牌信息覆盖层 */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
          <h3 className="text-white font-semibold text-lg mb-1">{currentCard.name}</h3>
          <p className="text-gray-300 text-sm mb-1">{currentCard.type}</p>
          <p className="text-purple-300 text-xs font-medium capitalize">{currentCard.rarity}</p>
        </div>
      </div>

      {/* 导航按钮 */}
      {cardData.length > 1 && (
        <>
          <button
            onClick={prevCard}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 hover:scale-110"
            aria-label="Previous card"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={nextCard}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 hover:scale-110"
            aria-label="Next card"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* 缩略图导航 */}
      {cardData.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {cardData.map((_, index) => (
            <button
              key={index}
              onClick={() => goToCard(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentIndex 
                  ? 'bg-purple-400 scale-125' 
                  : 'bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Go to card ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* 卡牌计数器 */}
      <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
        {currentIndex + 1} / {cardData.length}
      </div>

      {/* 装饰性光效 */}
      <div className="absolute -top-4 -right-4 w-24 h-24 bg-purple-500/30 rounded-full blur-xl"></div>
      <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-500/20 rounded-full blur-xl"></div>
    </div>
  );
}
