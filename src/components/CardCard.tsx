import Link from "next/link";
import Image from "next/image";

export default function CardCard({ card }: { card: any }) {
  if (!card) return null;
  
  return (
    <Link href={`/cards/${card.slug}`} className="bg-white rounded-lg shadow p-3 hover:shadow-md transition">
      <div className="relative w-full h-40 rounded-md overflow-hidden">
        <Image 
          src={card.image} 
          alt={String(card.alt || card.name || 'Card')} 
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <h4 className="mt-2 font-medium">{String(card.name || 'Unknown Card')}</h4>
      <p className="text-gray-500 text-sm">{String(card.type || 'Unknown Type')}</p>
      <p className="text-purple-600 text-xs font-medium">{String(card.rarity || 'Unknown Rarity')}</p>
    </Link>
  );
}