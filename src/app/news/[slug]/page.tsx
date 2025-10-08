import fs from "fs";
import path from "path";
import { marked } from "marked";
import Image from "next/image";
import { generateSeoMeta } from "@/lib/seo";
import { generateArticleSchema } from "@/lib/schema";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import CanonicalUrl from "@/components/CanonicalUrl";

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
  });
}

export default async function NewsDetail({ params }: { params: { slug: string } }) {
  const dataPath = path.join(process.cwd(), "data", "mock.json");
  const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
  const news = data.news.find((n: any) => n.slug === params.slug);

  if (!news) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-600 mb-4">News Not Found</h1>
            <p className="text-gray-500">The requested news article could not be found.</p>
          </div>
        </div>
        <Footer />
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
      <CanonicalUrl url={`/news/${params.slug}`} />
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto px-6 py-12">
        <article>
          <h1 className="text-3xl font-bold mb-4">{news.title}</h1>
          <p className="text-gray-500 text-sm mb-6">{news.date}</p>
          <Image 
            src={news.coverImage || news.image} 
            alt={news.title} 
            width={800}
            height={256}
            className="rounded-xl shadow-md mb-6 w-full h-64 object-cover" 
          />
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-700 mb-6">{news.excerpt}</p>
            <div 
              className="text-gray-600 text-lg leading-relaxed"
              dangerouslySetInnerHTML={{ __html: marked(news.content) }}
            />
          </div>
        </article>
      </main>
    </div>
  );
}