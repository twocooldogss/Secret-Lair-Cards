import Link from "next/link";
import Image from "next/image";
import { getNewsThumbImageUrl } from "@/lib/newsImages";

export default function NewsCard({ news }: { news: any }) {
  if (!news) return null;
  
  return (
    <Link href={`/news/${news.slug}`} className="bg-white rounded-lg shadow p-4 hover:shadow-md transition block">
      <div className="relative w-full h-48 rounded-md overflow-hidden mb-3">
        <Image 
          src={getNewsThumbImageUrl(news)} 
          alt={news.alt || news.title} 
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <h3 className="font-semibold text-lg mb-2">{news.title}</h3>
      <p className="text-gray-600 text-sm">{news.excerpt}</p>
      <p className="text-gray-400 text-xs mt-2">{news.date}</p>
    </Link>
  );
}