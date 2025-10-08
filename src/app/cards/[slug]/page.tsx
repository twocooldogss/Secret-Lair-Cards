import fs from "fs";
import path from "path";
import Image from "next/image";
import { generateSeoMeta } from "@/lib/seo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import Breadcrumb from "@/components/Breadcrumb";
import CanonicalUrl from "@/components/CanonicalUrl";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const dataPath = path.join(process.cwd(), "data", "mock.json");
  const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
  const card = data.cards.find((c: any) => c.slug === params.slug);

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
    pageType: "cards",
    keywords: ["Secret Lair", "MTG", "Magic The Gathering", card.name],
    image: card.image,
  });
}

export default async function CardDetail({ params }: { params: { slug: string } }) {
  const dataPath = path.join(process.cwd(), "data", "mock.json");
  const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
  const card = data.cards.find((c: any) => c.slug === params.slug);

  if (!card) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-600 mb-4">Card Not Found</h1>
            <p className="text-gray-500">The requested card could not be found.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const drop = data.drops.find((d: any) => d.slug === card.drop);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <CanonicalUrl url={`/cards/${params.slug}`} />
      <Navbar />
      <main className="flex-1 max-w-4xl mx-auto px-6 py-12">
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