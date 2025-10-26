import Image from "next/image";
import Link from "next/link";
import { generateSeoMeta } from "@/lib/seo";
import { getDropBySlugFromDrops, normalizeDrop } from "@/lib/data";
import { getDropContent, getRelatedDrops } from "@/lib/content";
import CardCarousel from "@/components/CardCarousel";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const dropData = getDropBySlugFromDrops(params.slug);
  
  if (!dropData) {
    return {
      title: "Drop Not Found | SecretLairCards.com",
      description: "The requested Secret Lair drop could not be found.",
    };
  }

  const drop = normalizeDrop(dropData);

  return generateSeoMeta({
    title: drop.title,
    description: drop.description,
    url: `/drops/${params.slug}`,
    image: drop.image,
    type: 'product',
    price: drop.price || '39.99'
  });
}

export default function DropDetail({ params }: { params: { slug: string } }) {
  const dropData = getDropBySlugFromDrops(params.slug);
  
  if (!dropData) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-600 mb-4">Drop Not Found</h1>
            <p className="text-gray-500">The requested Secret Lair drop could not be found.</p>
            <Link href="/drops" className="text-purple-600 hover:text-purple-800 mt-4 inline-block">
              ← Back to Drops
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const drop = normalizeDrop(dropData);
  const dropContent = getDropContent(params.slug);
  const relatedDrops = getRelatedDrops(params.slug, 3);

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#18121E] via-[#221933] to-[#0D0A12] text-white">
      {/* HERO SECTION - 与首页风格一致 */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-800/40 via-indigo-900/50 to-black" />
        <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-purple-500/25 rounded-full blur-[140px] -translate-x-1/2 -translate-y-1/2 opacity-50" />
        <div className="absolute inset-0 bg-[url('/images/stars-texture.png')] bg-cover bg-center opacity-10" />
        
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          {/* 面包屑导航 */}
          <nav className="mb-8">
            <Link href="/" className="text-purple-300 hover:text-purple-200 transition">Home</Link>
            <span className="mx-2 text-gray-400">/</span>
            <Link href="/drops" className="text-purple-300 hover:text-purple-200 transition">Drops</Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-300">{drop.title}</span>
          </nav>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* 左侧：标题和描述 */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-200 via-white to-yellow-200 bg-clip-text text-transparent">
                {drop.title}
              </h1>
              <p className="text-gray-300 text-lg mb-6">{drop.releaseDate}</p>
              <p className="text-gray-200 text-lg leading-relaxed mb-8">
                {drop.description || `Explore the ${drop.title} Secret Lair collection featuring unique artwork and premium Magic: The Gathering cards.`}
              </p>
              
              {/* 价格和状态信息 */}
              <div className="flex items-center gap-6 mb-8">
                <div className="bg-purple-600/20 border border-purple-500/30 rounded-lg px-4 py-2">
                  <span className="text-purple-200 text-sm">Price</span>
                  <div className="text-white font-semibold">${drop.price || '39.99'}</div>
                </div>
                <div className="bg-green-600/20 border border-green-500/30 rounded-lg px-4 py-2">
                  <span className="text-green-200 text-sm">Status</span>
                  <div className="text-white font-semibold">{drop.status || 'Available'}</div>
                </div>
              </div>
            </div>
            
            {/* 右侧：卡片轮播 */}
            <div className="relative">
              <CardCarousel 
                cards={drop.cards || []} 
                dropName={drop.title}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 内容区域 */}
      <section className="relative py-16">
        <div className="max-w-6xl mx-auto px-6">
          <article className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
            {/* Markdown内容 */}
            {dropContent && (
              <div className="prose prose-lg max-w-none mb-8 prose-invert">
                <div dangerouslySetInnerHTML={{ __html: dropContent.html }} />
              </div>
            )}
            
            {/* 卡牌信息卡片 */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-6 mb-8">
              <h3 className="text-xl font-semibold text-white mb-4">Collection Details</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-purple-600/20 to-indigo-600/20 rounded-lg p-4 border border-purple-500/30">
                  <h4 className="text-white font-semibold mb-2">Drop Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-gray-300">
                      <span>Theme:</span>
                      <span className="text-white">{drop.theme || 'Miscellaneous'}</span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>Artist:</span>
                      <span className="text-white">{drop.artist || 'Various Artists'}</span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>Investment Score:</span>
                      <span className="text-yellow-400 font-semibold">{drop.investmentScore || 'N/A'}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">Cards Overview</h4>
                  <div className="text-gray-300 mb-4">
                    This Secret Lair contains <span className="text-white font-semibold">{drop.cards?.length || 0}</span> unique cards
                  </div>
                  <div className="space-y-2">
                    {(drop.cards || []).slice(0, 5).map((card, index) => (
                      <div key={index} className="flex items-center text-gray-200">
                        <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                        {card}
                      </div>
                    ))}
                    {(drop.cards || []).length > 5 && (
                      <div className="text-purple-300 font-medium mt-2">
                        ... and {(drop.cards || []).length - 5} more cards
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* 相关推荐 */}
            {relatedDrops.length > 0 && (
              <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-6">
                <h3 className="text-xl font-semibold text-white mb-6">Related Drops</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {relatedDrops.map((relatedDrop: any) => (
                    <Link key={relatedDrop.slug} href={`/drops/${relatedDrop.slug}`} className="group">
                      <div className="bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-purple-500/50">
                        <div className="relative h-48">
                          <Image
                            src={relatedDrop.image}
                            alt={relatedDrop.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </div>
                        <div className="p-4">
                          <h4 className="font-semibold text-white group-hover:text-purple-300 transition-colors">{relatedDrop.title}</h4>
                          <p className="text-gray-300 text-sm">{relatedDrop.releaseDate}</p>
                          <p className="text-purple-400 text-sm font-medium">{relatedDrop.theme}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </article>
        </div>
      </section>
    </main>
  );
}