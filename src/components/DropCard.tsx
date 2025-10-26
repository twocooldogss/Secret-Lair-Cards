import Link from "next/link";
import Image from "next/image";

export default function DropCard({ drop }: { drop: any }) {
  if (!drop) return null;
  
  // 确保图片URL有效
  const imageUrl = drop.image && drop.image.trim() !== '' ? drop.image : '/images/placeholder.svg';
  
  return (
    <Link 
      href={`/drops/${drop.slug}`} 
      className="group bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-purple-400/50 overflow-hidden transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="relative h-56 overflow-hidden">
        <Image 
          src={imageUrl} 
          alt={drop.title || 'Drop Cover'} 
          width={400} 
          height={224} 
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" 
        />
      </div>
      <div className="p-5 space-y-2">
        <h3 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors">
          {drop.title}
        </h3>
        <p className="text-gray-300 text-sm line-clamp-2">{drop.description}</p>
        <div className="flex justify-between items-center pt-2">
          <span className="text-xs text-gray-400">{drop.releaseDate}</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/30">
            {drop.theme}
          </span>
        </div>
      </div>
    </Link>
  );
}