import fs from "fs";
import path from "path";
import DropCard from "@/components/DropCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer";
import CanonicalUrl from "@/components/CanonicalUrl";

import { generateSeoMeta } from "@/lib/seo";

export const metadata = generateSeoMeta({
  title: "Secret Lair Drops - MTG Secret Lair Collections 2025",
  description: "Browse all Magic: The Gathering Secret Lair drops, collections, and limited edition cards. Find release dates, prices, and card lists.",
  url: "/drops"
});

export default async function DropsPage() {
  const dataPath = path.join(process.cwd(), "data", "mock.json");
  const data = JSON.parse(fs.readFileSync(dataPath, "utf-8"));
  const drops = data.drops;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <CanonicalUrl url="/drops" />
      <Navbar />
      <main className="flex-1 max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-8">Secret Lair Drops</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {drops.map((drop: any) => (
            <DropCard key={drop.slug} drop={drop} />
          ))}
        </div>
      </main>
    </div>
  );
}