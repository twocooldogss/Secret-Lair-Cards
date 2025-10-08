import { getData } from "@/lib/data";
import { generateSeoMeta } from "@/lib/seo";
import { generateArticleSchema } from "@/lib/schema";
import CardCard from "@/components/CardCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import CanonicalUrl from "@/components/CanonicalUrl";

export async function generateMetadata() {
  return generateSeoMeta({
    title: "Secret Lair Cards - Browse All MTG Secret Lair Cards",
    description: "Explore all Magic: The Gathering cards from Secret Lair drops with detailed information, artwork, and rarity.",
    url: "/cards"
  });
}

export default function CardsPage() {
  const data = getData();
  const cards = data.cards;

  const schema = generateArticleSchema({
    title: "Browse All Secret Lair Cards",
    description: "Explore all Magic: The Gathering cards from Secret Lair drops with detailed information, artwork, and rarity.",
    url: "/cards",
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <CanonicalUrl url="/cards" />
      <Navbar />
      <main className="flex-1 max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-6">Browse All Secret Lair Cards</h1>
        <p className="text-gray-600 mb-10">
          Explore all Magic: The Gathering cards from Secret Lair drops with unique artwork and special treatments.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cards.map((card) => (
            <CardCard key={card.id} card={card} />
          ))}
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </main>
      <Footer />
    </div>
  );
}

