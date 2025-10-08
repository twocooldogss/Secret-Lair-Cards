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
  });
}

export default async function InvestmentDetail({ params }: { params: { slug: string } }) {
  const dataPath = path.join(process.cwd(), "data", "mock.json");
  const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
  const item = data.investment.find((i: any) => i.slug === params.slug);

  if (!item) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-600 mb-4">Analysis Not Found</h1>
            <p className="text-gray-500">The requested investment analysis could not be found.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const schema = generateArticleSchema({
    title: item.title,
    description: item.metaDescription || item.excerpt,
    url: `/investment/${params.slug}`,
    image: item.image,
    author: "SecretLairCards Investment Team",
    datePublished: item.date,
    dateModified: item.date,
    keywords: item.keywords || []
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <CanonicalUrl url={`/investment/${params.slug}`} />
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto px-6 py-12">
        <article>
          <h1 className="text-3xl font-bold mb-4">{item.title}</h1>
          <p className="text-gray-500 text-sm mb-6">{item.date}</p>
          <Image 
            src={item.image} 
            alt={item.title} 
            width={800}
            height={256}
            className="rounded-xl shadow-md mb-6 w-full h-64 object-cover" 
          />
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-700 mb-6">{item.excerpt}</p>
            <div 
              className="text-gray-600 text-lg leading-relaxed"
              dangerouslySetInnerHTML={{ __html: marked(item.content) }}
            />
          </div>
        </article>
      </main>
    </div>
  );
}