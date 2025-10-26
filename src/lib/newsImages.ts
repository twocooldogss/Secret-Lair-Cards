import fs from 'fs';
import path from 'path';

// 图片映射缓存
let imageMapCache: any = null;

function getImageMap() {
  if (imageMapCache) {
    return imageMapCache;
  }
  
  try {
    const mapPath = path.join(process.cwd(), 'public', 'images', 'news', 'processed', 'image-map.json');
    if (fs.existsSync(mapPath)) {
      imageMapCache = JSON.parse(fs.readFileSync(mapPath, 'utf-8'));
      return imageMapCache;
    }
  } catch (error) {
    console.warn('Failed to load image map:', error);
  }
  
  return {};
}

/**
 * 获取新闻图片URL
 * @param newsItem 新闻项目
 * @param type 图片类型: 'og' | 'thumb' | 'detail'
 * @returns 图片URL
 */
export function getNewsImageUrl(newsItem: any, type: 'og' | 'thumb' | 'detail' = 'og'): string {
  if (!newsItem) {
    return '/images/placeholder.svg';
  }
  
  // 获取原始图片路径
  const originalImage = newsItem.coverImage || newsItem.image;
  if (!originalImage) {
    return '/images/placeholder.svg';
  }
  
  // 从图片映射中查找处理后的图片
  const imageMap = getImageMap();
  const baseName = path.basename(originalImage, path.extname(originalImage));
  
  if (imageMap[baseName]) {
    const mappedImage = imageMap[baseName][type];
    if (mappedImage) {
      return mappedImage;
    }
  }
  
  // 如果映射不存在，返回原始图片
  return originalImage;
}

/**
 * 获取新闻SEO图片URL（用于OpenGraph等）
 */
export function getNewsSeoImageUrl(newsItem: any): string {
  return getNewsImageUrl(newsItem, 'og');
}

/**
 * 获取新闻首页缩略图URL
 */
export function getNewsThumbImageUrl(newsItem: any): string {
  return getNewsImageUrl(newsItem, 'thumb');
}

/**
 * 获取新闻详情页图片URL
 */
export function getNewsDetailImageUrl(newsItem: any): string {
  return getNewsImageUrl(newsItem, 'detail');
}
