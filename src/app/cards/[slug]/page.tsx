import * as fs from "fs";
import * as path from "path";
import Image from "next/image";
import { generateSeoMeta } from "@/lib/seo";
import Breadcrumb from "@/components/Breadcrumb";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const dataPath = path.join(process.cwd(), "data", "mock.json");
  const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
  
  // 尝试精确匹配
  let card = data.cards.find((c: any) => c.slug === params.slug);
  
  // 如果精确匹配失败，尝试模糊匹配（从URL中提取card name）
  if (!card) {
    // 例如: "reaper-king-secret-scare" -> "reaper-king"
    const slugParts = params.slug.split('-');
    for (let i = slugParts.length - 1; i > 0; i--) {
      const possibleSlug = slugParts.slice(0, i).join('-');
      card = data.cards.find((c: any) => c.slug === possibleSlug);
      if (card) break;
    }
  }

  if (!card) {
    return {
      title: "Card Not Found | SecretLairCards.com",
      description: "The requested card could not be found.",
    };
  }

  return generateSeoMeta({
    title: card.name,
    description: card.description || `${card.name} - Magic: The Gathering Secret Lair card`,
    url: `/cards/${params.slug}`,
    keywords: ["Secret Lair", "MTG", "Magic The Gathering", card.name],
    image: card.image,
    type: 'product'
  });
}

export default async function CardDetail({ params }: { params: { slug: string } }) {
  const dataPath = path.join(process.cwd(), "data", "mock.json");
  const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
  
  // 尝试精确匹配
  let card = data.cards.find((c: any) => c.slug === params.slug);
  
  // 如果精确匹配失败，尝试模糊匹配（从URL中提取card name）
  if (!card) {
    // 例如: "reaper-king-secret-scare" -> "reaper-king"
    const slugParts = params.slug.split('-');
    for (let i = slugParts.length - 1; i > 0; i--) {
      const possibleSlug = slugParts.slice(0, i).join('-');
      card = data.cards.find((c: any) => c.slug === possibleSlug);
      if (card) break;
    }
  }

  if (!card) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-600 mb-4">Card Not Found</h1>
            <p className="text-gray-500">The requested card could not be found.</p>
          </div>
        </div>
      </div>
    );
  }

  const drop = data.drops.find((d: any) => d.id === card.dropId || d.slug === card.drop);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-1 max-w-4xl mx-auto px-6 pt-20 pb-12">
        <Breadcrumb 
          items={[
            { label: "Cards", href: "/cards" },
            { label: card.name }
          ]} 
        />
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <Image src={card.image} alt={card.name} width={400} height={560} className="rounded-xl shadow-md w-full" />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-4">{card.name}</h1>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-700">From Drop:</h3>
                <p className="text-purple-600">{drop?.title || 'Unknown Drop'}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700">Rarity:</h3>
                <p className="text-gray-600">{card.rarity}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700">Description:</h3>
                <p className="text-gray-600">{card.description}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}