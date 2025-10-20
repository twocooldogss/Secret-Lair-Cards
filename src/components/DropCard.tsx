import Link from "next/link";
import Image from "next/image";

export default function DropCard({ drop }: { drop: any }) {
  if (!drop) return null;
  
  return (
    <Link href={`/drops/${drop.slug}`} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
      <Image src={drop.image} alt={drop.title} width={400} height={192} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{drop.title}</h3>
        <p className="text-gray-600 text-sm">{drop.releaseDate}</p>
        <p className="text-purple-600 text-sm font-medium">{drop.theme}</p>
        <p className="text-gray-500 text-xs mt-2 line-clamp-2">{drop.description}</p>
      </div>
    </Link>
  );
}