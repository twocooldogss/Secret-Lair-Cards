import fs from "fs";
import path from "path";
import Image from "next/image";
import { generateSeoMeta } from "@/lib/seo";
import { getSchema } from "@/lib/schema";
import CardCard from "@/components/CardCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import Breadcrumb from "@/components/Breadcrumb";
import CanonicalUrl from "@/components/CanonicalUrl";
import DropProductSchema from "@/components/DropProductSchema";
import DropMerchantSchema from "@/components/DropMerchantSchema";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const dataPath = path.join(process.cwd(), "data", "mock.json");
  const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
  const drop = data.drops.find((d: any) => d.slug === params.slug);

  if (!drop) {
    return {
      title: "Drop Not Found | SecretLairCards.com",
      description: "The requested Secret Lair drop could not be found.",
    };
  }

  return generateSeoMeta({
    title: drop.title,
    description: drop.description || drop.metaDescription,
    url: `/drops/${params.slug}`,
  });
}

export default async function DropDetail({ params }: { params: { slug: string } }) {
  const dataPath = path.join(process.cwd(), "data", "mock.json");
  const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
  const drop = data.drops.find((d: any) => d.slug === params.slug);

  if (!drop) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-600 mb-4">Drop Not Found</h1>
            <p className="text-gray-500">The requested Secret Lair drop could not be found.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const cards = data.cards.filter((c: any) => c.drop === drop.slug);

  const schema = getSchema('drop', drop);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <DropProductSchema drop={drop} />
      <DropMerchantSchema drop={drop} />
      <CanonicalUrl url={`/drops/${params.slug}`} />
      <Navbar />
      <main className="flex-1 max-w-5xl mx-auto px-6 py-12">
        <Breadcrumb 
          items={[
            { label: "Drops", href: "/drops" },
            { label: drop.title }
          ]} 
        />
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{drop.title}</h1>
          <Image src={drop.image} alt={drop.title} width={800} height={400} className="rounded-xl mb-6 shadow-md w-full max-w-2xl" />
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-600 mb-2"><strong>Release Date:</strong> {drop.releaseDate}</p>
              <p className="text-gray-600 mb-2"><strong>Theme:</strong> {drop.theme}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                  {drop.theme}
                </span>
              </div>
            </div>
            <div>
              <p className="text-gray-700">{drop.description}</p>
            </div>
          </div>
        </div>
        
        <h2 className="text-2xl font-semibold mb-6">Included Cards ({cards.length})</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {cards.map((card: any) => (
            <CardCard key={card.slug} card={card} />
          ))}
        </div>
      </main>
    </div>
  );
}