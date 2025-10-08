import Link from "next/link";
import Image from "next/image";

export default function DropCard({ drop }: { drop: any }) {
  if (!drop) return null;
  
  return (
    <Link href={`/drops/${drop.slug}`} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
      <div className="relative w-full h-48">
        <Image 
          src={drop.image} 
          alt={drop.alt || drop.title} 
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold">{drop.title}</h3>
        <p className="text-gray-600 text-sm">{drop.releaseDate}</p>
        <p className="text-purple-600 text-sm font-medium">{drop.theme}</p>
        <p className="text-gray-500 text-xs mt-2 line-clamp-2">{drop.description}</p>
      </div>
    </Link>
  );
}