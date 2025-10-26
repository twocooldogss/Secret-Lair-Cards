"use client";

import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="w-full bg-white/80 backdrop-blur-md border-b border-purple-100/50 text-gray-900 px-8 py-5 flex justify-between items-center shadow-lg sticky top-0 z-50">
      <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition">
        <Image 
          src="/logo.png" 
          alt="Secret Lair Cards Logo" 
          width={40} 
          height={40}
          className="w-10 h-10"
        />
        <span className="text-2xl font-bold text-purple-700 tracking-tight">SecretLairCards</span>
      </Link>
      <div className="flex gap-6 text-base font-medium">
        <Link href="/drops" className="text-purple-700 hover:text-purple-900 transition-colors">Drops</Link>
        <Link href="/cards" className="text-purple-700 hover:text-purple-900 transition-colors">Cards</Link>
        <Link href="/news" className="text-purple-700 hover:text-purple-900 transition-colors">News</Link>
        <Link href="/investment" className="text-purple-700 hover:text-purple-900 transition-colors">Investment</Link>
        <Link href="/about" className="text-purple-700 hover:text-purple-900 transition-colors">About</Link>
      </div>
    </nav>
  );
}

