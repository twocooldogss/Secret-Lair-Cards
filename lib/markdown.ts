import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'

const contentDirectory = path.join(process.cwd(), 'content')

export interface NewsArticle {
  slug: string
  title: string
  date: string
  image: string
  description: string
  keywords: string[]
  content: string
  htmlContent: string
}

export function getAllNews(): NewsArticle[] {
  const newsDirectory = path.join(contentDirectory, 'news')
  
  if (!fs.existsSync(newsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(newsDirectory)
  const allNews = fileNames
    .filter((name) => name.endsWith('.md'))
    .map((name) => {
      const slug = name.replace(/\.md$/, '')
      const fullPath = path.join(newsDirectory, name)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      return {
        slug,
        title: data.title || '',
        date: data.date || '',
        image: data.image || '',
        description: data.description || '',
        keywords: data.keywords || [],
        content,
        htmlContent: marked(content),
      }
    })

  return allNews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getNewsBySlug(slug: string): NewsArticle | null {
  const allNews = getAllNews()
  return allNews.find((news) => news.slug === slug) || null
}
