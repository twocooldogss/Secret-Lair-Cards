import { getNewsBySlug } from '@/lib/markdown'
import { notFound } from 'next/navigation'
import Image from 'next/image'

interface NewsArticleProps {
  slug: string
}

export default function NewsArticle({ slug }: NewsArticleProps) {
  const article = getNewsBySlug(slug)

  if (!article) {
    notFound()
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
        <div className="flex items-center gap-4 text-gray-600 mb-6">
          <time dateTime={article.date}>
            {new Date(article.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          <span>•</span>
          <span>SecretLairCards.com</span>
        </div>
        
        {/* Cover Image */}
        <div className="relative w-full h-64 md:h-96 mb-8">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover rounded-lg"
            priority
          />
        </div>
      </header>

      {/* Content */}
      <div className="prose prose-lg max-w-none">
        <div 
          className="news-content"
          dangerouslySetInnerHTML={{ __html: article.htmlContent }}
        />
      </div>

      {/* Keywords */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="text-sm font-medium text-gray-500 mb-2">Keywords</h3>
        <div className="flex flex-wrap gap-2">
          {article.keywords.map((keyword) => (
            <span
              key={keyword}
              className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded"
            >
              {keyword}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}
