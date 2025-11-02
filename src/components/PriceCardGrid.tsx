"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import PriceChartDrawer from "./PriceChartDrawer";

// 格式化日期显示
function formatPriceDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    // 重置时间部分以便比较日期
    const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const yesterdayOnly = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate());
    
    if (dateOnly.getTime() === todayOnly.getTime()) {
      return "Today";
    } else if (dateOnly.getTime() === yesterdayOnly.getTime()) {
      return "Yesterday";
    } else {
      // 计算天数差
      const diffDays = Math.floor((todayOnly.getTime() - dateOnly.getTime()) / (1000 * 60 * 60 * 24));
      if (diffDays <= 7) {
        return `${diffDays} days ago`;
      } else {
        // 超过7天显示具体日期
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      }
    }
  } catch {
    return dateString;
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

interface PriceHistory {
  [slug: string]: Array<{
    date: string;
    total_price_usd: number;
  }>;
}

interface PriceCardGridProps {
  prices: DropPrice[];
  priceHistory: PriceHistory;
}

type SortOption = "price" | "change" | "name" | "card_count";

export default function PriceCardGrid({ prices, priceHistory }: PriceCardGridProps) {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>("price");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [displayCount, setDisplayCount] = useState<number>(6); // 初始显示6个
  const [searchQuery, setSearchQuery] = useState<string>("");

  // 搜索过滤
  const filteredPrices = useMemo(() => {
    if (!searchQuery.trim()) {
      return prices;
    }
    const query = searchQuery.toLowerCase().trim();
    return prices.filter(drop => 
      drop.name.toLowerCase().includes(query) ||
      drop.slug.toLowerCase().includes(query)
    );
  }, [prices, searchQuery]);

  const sortedPrices = useMemo(() => {
    const sorted = [...filteredPrices].sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case "price":
          comparison = a.total_price_usd - b.total_price_usd;
          break;
        case "change":
          comparison = a.change_pct - b.change_pct;
          break;
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
        case "card_count":
          comparison = a.card_count - b.card_count;
          break;
      }
      
      return sortOrder === "asc" ? comparison : -comparison;
    });
    
    return sorted;
  }, [filteredPrices, sortBy, sortOrder]);

  // 确保类型正确：DropPrice | null，不包含 undefined
  const selectedDrop: DropPrice | null = selectedSlug 
    ? (prices.find(p => p.slug === selectedSlug) ?? null) as DropPrice | null
    : null;
  const selectedHistory = selectedSlug && priceHistory[selectedSlug] ? priceHistory[selectedSlug] : null;

  // 打开抽屉
  const handleOpenChart = (slug: string) => {
    setSelectedSlug(slug);
    setIsDrawerOpen(true);
  };

  // 关闭抽屉
  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    // 延迟清除选中，让动画完成
    setTimeout(() => setSelectedSlug(null), 300);
  };
  
  // 分页显示的价格
  const displayedPrices = sortedPrices.slice(0, displayCount);
  const hasMore = sortedPrices.length > displayCount;

  return (
    <>
      {/* 价格图表抽屉 */}
      <PriceChartDrawer
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        drop={selectedDrop}
        history={selectedHistory}
      />

      <div className="space-y-8">
        {/* 排序控件 */}
        <div className="flex flex-wrap items-center gap-4 bg-white/5 border border-white/10 rounded-xl p-4">
          <span className="text-gray-300 text-sm font-medium">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-purple-500"
          >
            <option value="price">Total Value</option>
            <option value="change">Price Change</option>
            <option value="name">Name</option>
            <option value="card_count">Card Count</option>
          </select>
          <button
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg px-3 py-2 text-white text-sm transition-colors"
          >
            {sortOrder === "asc" ? "↑ Ascending" : "↓ Descending"}
          </button>
          <div className="ml-auto text-sm text-gray-400 flex items-center gap-4">
            <span>
              {searchQuery ? (
                <>
                  Found {sortedPrices.length} result{sortedPrices.length !== 1 ? 's' : ''}
                  {sortedPrices.length > 0 && ` (showing ${Math.min(displayedPrices.length, sortedPrices.length)})`}
                </>
              ) : (
                <>Showing {displayedPrices.length} of {sortedPrices.length} drops</>
              )}
            </span>
            {/* 搜索框 - 放在右侧 */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setDisplayCount(6); // 搜索时重置显示数量
                }}
                placeholder="Search..."
                className="w-40 pl-8 pr-8 py-1.5 bg-white/10 border border-white/20 rounded-lg text-white text-sm placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/50 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 pr-2 flex items-center text-gray-400 hover:text-white transition-colors"
                  aria-label="Clear search"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>

      {/* 搜索结果为空提示 */}
      {searchQuery && sortedPrices.length === 0 && (
        <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center">
          <svg className="w-16 h-16 text-gray-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <p className="text-gray-300 text-lg mb-2">No drops found</p>
          <p className="text-gray-400 text-sm">Try a different search term or clear the search to see all drops.</p>
        </div>
      )}

      {/* 价格卡片网格 */}
      {sortedPrices.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedPrices.map((drop) => {
          const isSelected = selectedSlug === drop.slug;
          const hasHistory = priceHistory[drop.slug] && priceHistory[drop.slug].length > 0;
          
          return (
            <div
              key={drop.slug}
              onClick={() => {
                if (hasHistory) {
                  handleOpenChart(drop.slug);
                }
              }}
              className={`group relative rounded-2xl border-2 transition-all duration-300 ${
                isDrawerOpen && isSelected
                  ? "border-purple-500 bg-purple-500/10 shadow-xl ring-4 ring-purple-500/20 scale-[1.02]" 
                  : "border-white/10 bg-white/5 hover:border-purple-400/50 hover:shadow-lg hover:scale-[1.01]"
              } p-5 cursor-pointer`}
            >
              {/* 选中指示器 */}
              {isDrawerOpen && isSelected && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                  📊 Chart Open
                </div>
              )}
              
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-white line-clamp-2 flex-1 group-hover:text-purple-200 transition-colors">
                  {drop.name}
                </h3>
                {drop.change_pct !== 0 && (
                  <span
                    className={`ml-2 text-sm font-semibold whitespace-nowrap ${
                      drop.change_pct > 0 ? "text-green-400" : 
                      drop.change_pct < 0 ? "text-red-400" : 
                      "text-gray-400"
                    }`}
                  >
                    {drop.change_pct > 0 ? "+" : ""}
                    {drop.change_pct.toFixed(2)}%
                  </span>
                )}
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Total Value:</span>
                  <span className="text-purple-300 font-bold text-lg">${drop.total_price_usd.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Avg per card:</span>
                  <span className="text-gray-300">${drop.average_price_usd.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>{drop.valid_card_count || drop.card_count} cards</span>
                  <span title={drop.last_updated}>Updated: {formatPriceDate(drop.last_updated)}</span>
                </div>
              </div>
              
              {/* 明显的交互提示 - 统一布局 */}
              <div className={`mt-3 pt-3 border-t transition-all ${
                isDrawerOpen && isSelected ? "border-purple-500/50" : "border-white/10"
              }`}>
                <div className="flex items-center justify-between gap-2 flex-nowrap">
                  <Link 
                    href={`/drops/${drop.slug}`}
                    onClick={(e) => e.stopPropagation()}
                    className="text-purple-300 hover:text-purple-200 text-sm font-medium transition-colors whitespace-nowrap flex-shrink-0"
                  >
                    View Details →
                  </Link>
                  
                  {/* 始终显示按钮区域，保持布局一致 */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (hasHistory) {
                        handleOpenChart(drop.slug);
                      }
                    }}
                    disabled={!hasHistory}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap flex-shrink-0 ${
                      !hasHistory
                        ? "opacity-40 cursor-not-allowed bg-gray-600/20 text-gray-500 border border-gray-500/20"
                        : isDrawerOpen && isSelected
                        ? "bg-purple-600 text-white shadow-md hover:bg-purple-500"
                        : "bg-purple-600/20 text-purple-300 hover:bg-purple-600/30 hover:text-purple-200 border border-purple-500/30"
                    }`}
                    title={!hasHistory ? "Price history not available yet" : ""}
                  >
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <span className="hidden sm:inline">{!hasHistory ? "No Data" : isDrawerOpen && isSelected ? "Open" : "Chart"}</span>
                  </button>
                </div>
              </div>
              
              {/* 悬浮提示 */}
              {!isDrawerOpen && hasHistory && (
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600/0 via-purple-600/0 to-purple-600/0 group-hover:from-purple-600/5 group-hover:via-purple-600/10 group-hover:to-purple-600/5 transition-all pointer-events-none flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity text-purple-300 text-xs font-medium bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-purple-500/30">
                    📊 Click to view chart
                  </div>
                </div>
              )}
            </div>
          );
        })}
        </div>
      )}

      {/* 加载更多按钮 */}
      {hasMore && sortedPrices.length > 0 && (
        <div className="text-center pt-4">
          <button
            onClick={() => setDisplayCount(prev => Math.min(prev + 6, sortedPrices.length))}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors shadow-lg hover:shadow-xl"
          >
            Load More ({sortedPrices.length - displayCount} remaining)
          </button>
        </div>
      )}
      </div>
    </>
  );
}

