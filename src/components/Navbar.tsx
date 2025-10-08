"use client";

import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="w-full bg-purple-800 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <Link href="/" className="flex items-center gap-4">
        <Image 
          src="/logo.png" 
          alt="Secret Lair Cards Logo" 
          width={40} 
          height={40}
          className="w-10 h-10"
        />
        <span className="text-2xl font-bold">SecretLairCards</span>
      </Link>
      <div className="flex gap-6">
        <Link href="/drops" className="hover:text-purple-200 transition">Drops</Link>
        <Link href="/cards" className="hover:text-purple-200 transition">Cards</Link>
        <Link href="/news" className="hover:text-purple-200 transition">News</Link>
        <Link href="/investment" className="hover:text-purple-200 transition">Investment</Link>
        <Link href="/about" className="hover:text-purple-200 transition">About</Link>
      </div>
    </nav>
  );
}

