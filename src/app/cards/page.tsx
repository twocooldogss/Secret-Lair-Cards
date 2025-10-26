import { getCardsData } from "@/lib/data";
import { generateSeoMeta } from "@/lib/seo";
import CardCard from "@/components/CardCard";

export async function generateMetadata() {
  return generateSeoMeta({
    title: "Secret Lair Cards - Browse All MTG Secret Lair Cards",
    description: "Explore all Magic: The Gathering cards from Secret Lair drops with detailed information, artwork, and rarity.",
    url: "/cards"
  });
}

export default function CardsPage() {
  const cards = getCardsData();

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#18121E] via-[#221933] to-[#0D0A12] text-white">
      {/* CARDS GRID */}
      <section className="w-full bg-gradient-to-b from-[#221933] to-[#18121E] pt-20 pb-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="text-2xl font-semibold">All Secret Lair Cards</h2>
            <span className="text-sm text-purple-300">{cards.length} cards available</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {cards.map((card: any, index: number) => (
              <CardCard key={card.slug || card.name || index} card={card} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

