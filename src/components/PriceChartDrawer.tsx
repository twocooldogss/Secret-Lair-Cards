"use client";

import { useEffect } from "react";
import PriceTrendChart from "./PriceTrendChart";

interface DropPrice {
  name: string;
  slug: string;
  total_price_usd: number;
  last_updated: string;
}

interface PriceHistoryItem {
  date: string;
  total_price_usd: number;
}

interface PriceChartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  drop: DropPrice | null;
  history: PriceHistoryItem[] | null;
}

export default function PriceChartDrawer({ isOpen, onClose, drop, history }: PriceChartDrawerProps) {
  // 防止背景滚动
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // ESC键关闭
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }
    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !drop || !history || history.length === 0) {
    return null;
  }

  return (
    <>
      {/* 背景遮罩 */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity"
        onClick={onClose}
      />

      {/* 抽屉 */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-[600px] lg:w-[700px] bg-gradient-to-b from-[#221933] to-[#18121E] shadow-2xl z-50 transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 头部 */}
        <div className="sticky top-0 bg-gradient-to-b from-[#221933] to-[#221933]/80 backdrop-blur-sm border-b border-white/10 p-6 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">{drop.name}</h2>
              <p className="text-sm text-gray-400">Price Trend Analysis</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
              aria-label="Close drawer"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* 内容区域 */}
        <div className="overflow-y-auto h-[calc(100vh-100px)] p-6">
          <div className="max-w-full">
            <PriceTrendChart
              data={history}
              dropName={drop.name}
              lastUpdated={drop.last_updated}
            />
            
            {/* 额外信息 */}
            <div className="mt-6 space-y-4">
              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <h3 className="text-lg font-semibold text-white mb-3">Quick Stats</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-400">Current Value</p>
                    <p className="text-xl font-bold text-purple-300">${drop.total_price_usd.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Data Points</p>
                    <p className="text-xl font-bold text-white">{history.length}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                <p className="text-sm text-gray-400 mb-2">📊 Tips</p>
                <ul className="text-sm text-gray-300 space-y-1 list-disc list-inside">
                  <li>Chart shows 30-day price history</li>
                  <li>Prices updated daily from Scryfall API</li>
                  <li>Hover over data points for exact values</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

