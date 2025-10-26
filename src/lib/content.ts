import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';

export interface DropContent {
  title: string;
  slug: string;
  release_date: string;
  theme: string;
  artist: string;
  image: string;
  cards: string[];
  investment_score: number | null;
  status: string;
  content: string;
  html: string;
}

/**
 * 读取单个 Drop 的 Markdown 内容
 */
export function getDropContent(slug: string): DropContent | null {
  try {
    const filePath = path.join(process.cwd(), 'content', 'drops', `${slug}.md`);
    
    if (!fs.existsSync(filePath)) {
      return null;
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);
    
    return {
      ...data,
      content,
      html: marked(content)
    } as DropContent;
  } catch (error) {
    console.error(`Error reading drop content for ${slug}:`, error);
    return null;
  }
}

/**
 * 获取所有 Drop 内容
 */
export function getAllDropContents(): DropContent[] {
  try {
    const contentDir = path.join(process.cwd(), 'content', 'drops');
    
    if (!fs.existsSync(contentDir)) {
      return [];
    }

    const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.md'));
    const contents: DropContent[] = [];

    for (const file of files) {
      const slug = file.replace('.md', '');
      const content = getDropContent(slug);
      if (content) {
        contents.push(content);
      }
    }

    return contents;
  } catch (error) {
    console.error('Error reading all drop contents:', error);
    return [];
  }
}

/**
 * 获取相关 Drop 推荐
 */
export function getRelatedDrops(currentSlug: string, limit: number = 3): DropContent[] {
  const allContents = getAllDropContents();
  const currentContent = allContents.find(c => c.slug === currentSlug);
  
  if (!currentContent) {
    return allContents.slice(0, limit);
  }

  // 简单的相关性算法：基于主题和艺术家
  const related = allContents
    .filter(c => c.slug !== currentSlug)
    .filter(c => c.theme === currentContent.theme || c.artist === currentContent.artist)
    .slice(0, limit);

  // 如果相关的不够，补充其他内容
  if (related.length < limit) {
    const remaining = allContents
      .filter(c => c.slug !== currentSlug && !related.some(r => r.slug === c.slug))
      .slice(0, limit - related.length);
    related.push(...remaining);
  }

  return related;
}

