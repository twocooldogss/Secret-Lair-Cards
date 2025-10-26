import fs from 'fs';
import path from 'path';
import TestDesignClient from './TestDesignClient';

// 服务端组件：获取统计数据
function getStats() {
  try {
    const dropsPath = path.join(process.cwd(), 'data', 'drops.json');
    const dropsData = JSON.parse(fs.readFileSync(dropsPath, 'utf8'));
    
    // 计算统计数据
    const dropsCount = dropsData.length;
    
    const totalCards = dropsData.reduce((sum: number, drop: any) => {
      return sum + (drop.cards ? drop.cards.length : 0);
    }, 0);
    
    // 时间范围
    const releaseDates = dropsData
      .map((drop: any) => drop.release_date)
      .filter((date: any) => date && date !== '')
      .map((date: any) => new Date(date))
      .filter((date: any) => !isNaN(date.getTime()));
    
    let dateRange = '2019–2025';
    if (releaseDates.length > 0) {
      const earliestYear = Math.min(...releaseDates.map((d: Date) => d.getFullYear()));
      const latestYear = Math.max(...releaseDates.map((d: Date) => d.getFullYear()));
      dateRange = `${earliestYear}–${latestYear}`;
    }
    
    return {
      dropsCount,
      totalCards,
      dateRange
    };
  } catch (error) {
    console.error('Error reading drops data:', error);
    // 返回默认值
    return {
      dropsCount: 187,
      totalCards: 1171,
      dateRange: '2019–2025'
    };
  }
}

export default function TestDesignPage() {
  const stats = getStats();
  
  return <TestDesignClient stats={stats} />;
}