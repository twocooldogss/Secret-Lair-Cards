"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

// 格式化日期显示（与 PriceCardGrid 保持一致）
function formatPriceDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const dateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const todayOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const yesterdayOnly = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate());
    
    if (dateOnly.getTime() === todayOnly.getTime()) {
      return "today";
    } else if (dateOnly.getTime() === yesterdayOnly.getTime()) {
      return "yesterday";
    } else {
      const diffDays = Math.floor((todayOnly.getTime() - dateOnly.getTime()) / (1000 * 60 * 60 * 24));
      if (diffDays <= 7) {
        return `${diffDays} days ago`;
      } else {
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      }
    }
  } catch {
    return dateString;
  }
}

interface PriceHistoryItem {
  date: string;
  total_price_usd: number;
}

interface PriceTrendChartProps {
  data: PriceHistoryItem[];
  dropName: string;
  lastUpdated: string;
}

export default function PriceTrendChart({ data, dropName, lastUpdated }: PriceTrendChartProps) {
  // 格式化日期显示（只显示月-日）
  const formattedData = data.map((item) => ({
    ...item,
    dateFormatted: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }));

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-lg backdrop-blur-sm">
      <h2 className="text-2xl font-bold mb-4 text-purple-300">
        {dropName} – 30-Day Price Trend
      </h2>
      
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={formattedData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" opacity={0.3} />
            <XAxis 
              dataKey="dateFormatted" 
              stroke="#aaa" 
              tick={{ fill: '#aaa', fontSize: 12 }}
              tickLine={{ stroke: '#666' }}
            />
            <YAxis 
              stroke="#aaa"
              tick={{ fill: '#aaa', fontSize: 12 }}
              tickLine={{ stroke: '#666' }}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1e1630",
                border: "1px solid #4b2e83",
                borderRadius: "8px",
                color: "#fff",
                padding: "12px"
              }}
              labelStyle={{ color: "#a855f7", fontWeight: "bold" }}
              formatter={(value: number) => [`$${value.toFixed(2)}`, "Price"]}
            />
            <Line
              type="monotone"
              dataKey="total_price_usd"
              stroke="#a855f7"
              strokeWidth={3}
              dot={{ r: 4, fill: "#a855f7" }}
              activeDot={{ r: 6, fill: "#9333ea" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 flex items-center justify-between text-sm text-gray-400">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
          <span>Market Value (USD)</span>
        </div>
        <div>
          <span>Source: Scryfall · Price updated {formatPriceDate(lastUpdated)}</span>
        </div>
      </div>
    </div>
  );
}

