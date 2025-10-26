import DropCard from "@/components/DropCard";
import { getDropsData, normalizeDrop } from "@/lib/data";

import { generateSeoMeta } from "@/lib/seo";

export const metadata = generateSeoMeta({
  title: "Secret Lair Drops - MTG Secret Lair Collections 2025",
  description: "Browse all Magic: The Gathering Secret Lair drops, collections, and limited edition cards. Find release dates, prices, and card lists.",
  url: "/drops"
});

export default async function DropsPage() {
  const dropsData = getDropsData();
  const drops = dropsData.map(normalizeDrop);

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#18121E] via-[#221933] to-[#0D0A12] text-white">
      {/* DROPS GRID */}
      <section className="w-full bg-gradient-to-b from-[#221933] to-[#18121E] pt-20 pb-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="text-2xl font-semibold">All Secret Lair Drops</h2>
            <span className="text-sm text-purple-300">{drops.length} drops available</span>
          </div>
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {drops.map((drop: any) => (
              <DropCard key={drop.slug} drop={drop} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}