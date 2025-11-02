import * as fs from "fs";
import * as path from "path";
import { marked } from "marked";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { generateSeoMeta } from "@/lib/seo";
import { generateInvestmentDetailGraphSchema } from "@/lib/schema";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const dataPath = path.join(process.cwd(), "data", "mock.json");
  const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
  const item = data.investment.find((i: any) => i.slug === params.slug);

  if (!item) {
    return {
      title: "Analysis Not Found | SecretLairCards.com",
      description: "The requested investment analysis could not be found.",
    };
  }

  return generateSeoMeta({
    title: item.title,
    description: item.metaDescription || item.excerpt,
    url: `/investment/${params.slug}`,
    image: item.image,
    type: 'article',
    author: 'SecretLairCards Investment Team',
    datePublished: item.date,
    dateModified: item.date
  });
}

export default async function InvestmentDetail({ params }: { params: { slug: string } }) {
  const dataPath = path.join(process.cwd(), "data", "mock.json");
  const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
  const item = data.investment.find((i: any) => i.slug === params.slug);

  if (!item) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-600 mb-4">Analysis Not Found</h1>
            <p className="text-gray-500">The requested investment analysis could not be found.</p>
          </div>
        </div>
      </div>
    );
  }

  // 生成 Investment 详情页 @graph Schema (Article + BreadcrumbList + WebPage)
  const investmentDetailSchema = generateInvestmentDetailGraphSchema({
    title: item.title,
    description: item.metaDescription || item.excerpt,
    url: `/investment/${params.slug}`,
    image: item.image || item.coverImage,
    author: "SecretLairCards Investment Team",
    datePublished: item.date,
    dateModified: item.date
  });

  return (
    <>
      {/* Investment Detail Graph Schema */}
      <Script
        id="investment-detail-graph-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(investmentDetailSchema),
        }}
      />
      <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-1 max-w-4xl mx-auto px-6 pt-20 pb-12">
        {/* 面包屑导航 */}
        <nav className="mb-8">
          <Link href="/" className="text-purple-600 hover:text-purple-800">Home</Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link href="/investment" className="text-purple-600 hover:text-purple-800">Investment</Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-600">{item.title}</span>
        </nav>
        
        <article>
          <header className="mb-8">
            <h1 className="text-3xl font-bold mb-4">{item.title}</h1>
            <p className="text-gray-500 text-sm mb-6">{item.date}</p>
            
            {/* 主图 - 使用统一的图片显示方式 */}
            <div className="relative w-full max-h-[500px] overflow-hidden rounded-xl shadow-md mb-6">
              <Image 
                src={item.image} 
                alt={item.title} 
                width={1200}
                height={630}
                className="object-contain w-full h-auto" 
                priority
              />
            </div>
            
            {/* 分析摘要卡片 */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Analysis Summary</h3>
              <p className="text-xl text-gray-700 leading-relaxed">{item.excerpt}</p>
              
              {/* 标签 */}
              <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-gray-200">
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  Investment Analysis
                </span>
                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                  Secret Lair
                </span>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                  Market Research
                </span>
              </div>
            </div>
          </header>

          {/* 分析内容 */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <div className="prose prose-lg max-w-none">
              <div 
                className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto"
                dangerouslySetInnerHTML={{ __html: marked(item.content) }}
              />
            </div>
          </div>

          {/* 返回按钮 */}
          <div className="text-center">
            <Link 
              href="/investment" 
              className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors shadow-md hover:shadow-lg"
            >
              ← Back to All Analysis
            </Link>
          </div>
        </article>
      </main>
    </div>
    </>
  );
}