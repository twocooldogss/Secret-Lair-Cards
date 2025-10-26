import * as fs from "fs";
import * as path from "path";
import { marked } from "marked";
import Image from "next/image";
import Link from "next/link";
import { generateSeoMeta } from "@/lib/seo";
import { generateArticleSchema } from "@/lib/schema";
import { getNewsSeoImageUrl, getNewsDetailImageUrl } from "@/lib/newsImages";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const dataPath = path.join(process.cwd(), "data", "mock.json");
  const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
  const news = data.news.find((n: any) => n.slug === params.slug);

  if (!news) {
    return {
      title: "News Not Found | SecretLairCards.com",
      description: "The requested news article could not be found.",
    };
  }

  return generateSeoMeta({
    title: news.title,
    description: news.metaDescription || news.excerpt,
    url: `/news/${params.slug}`,
    image: getNewsSeoImageUrl(news),
    type: 'article',
    author: 'SecretLairCards Editorial Team',
    datePublished: news.date,
    dateModified: news.date
  });
}

export default async function NewsDetail({ params }: { params: { slug: string } }) {
  const dataPath = path.join(process.cwd(), "data", "mock.json");
  const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
  const news = data.news.find((n: any) => n.slug === params.slug);

  if (!news) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-600 mb-4">News Not Found</h1>
            <p className="text-gray-500">The requested news article could not be found.</p>
          </div>
        </div>
      </div>
    );
  }

  const schema = generateArticleSchema({
    title: news.title,
    description: news.metaDescription || news.excerpt,
    url: `/news/${params.slug}`,
    image: news.coverImage || news.image,
    author: "SecretLairCards Editorial Team",
    datePublished: news.date,
    dateModified: news.date,
    keywords: news.keywords || []
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <main className="flex-1 max-w-4xl mx-auto px-6 pt-20 pb-12">
        {/* 面包屑导航 */}
        <nav className="mb-8">
          <Link href="/" className="text-purple-600 hover:text-purple-800">Home</Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link href="/news" className="text-purple-600 hover:text-purple-800">News</Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-600">{news.title}</span>
        </nav>
        
        <article>
          <header className="mb-8">
            <h1 className="text-3xl font-bold mb-4">{news.title}</h1>
            <p className="text-gray-500 text-sm mb-6">{news.date}</p>
            
            {/* 主图 - 使用统一的图片显示方式 */}
            <div className="relative w-full max-h-[500px] overflow-hidden rounded-xl shadow-md mb-6">
              <Image 
                src={getNewsDetailImageUrl(news)} 
                alt={news.title} 
                width={1200}
                height={630}
                className="object-contain w-full h-auto" 
                priority
              />
            </div>
            
            {/* 文章摘要卡片 */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Article Summary</h3>
              <p className="text-xl text-gray-700 leading-relaxed">{news.excerpt}</p>
              
              {/* 标签 */}
              <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-gray-200">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  News
                </span>
                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                  Secret Lair
                </span>
                {news.keywords && news.keywords.map((keyword: string, index: number) => (
                  <span key={index} className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </header>

          {/* 文章内容 */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <div className="prose prose-lg max-w-none">
              <div 
                className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto"
                dangerouslySetInnerHTML={{ __html: marked(news.content) }}
              />
            </div>
          </div>

          {/* 返回按钮 */}
          <div className="text-center">
            <Link 
              href="/news" 
              className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors shadow-md hover:shadow-lg"
            >
              ← Back to All News
            </Link>
          </div>
        </article>
      </main>
    </div>
  );
}