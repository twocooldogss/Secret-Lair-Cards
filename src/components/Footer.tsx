import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Image src="/logo.png" alt="SecretLairCards" width={32} height={32} className="rounded-lg" />
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                SecretLairCards
              </span>
            </Link>
            <p className="text-gray-400 text-sm max-w-md">
              The ultimate resource for Magic: The Gathering Secret Lair collectors. 
              Discover every drop, track prices, and make informed investment decisions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/drops" className="text-gray-400 hover:text-white transition-colors text-sm">
                  All Drops
                </Link>
              </li>
              <li>
                <Link href="/cards" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Card Database
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Latest News
                </Link>
              </li>
              <li>
                <Link href="/investment" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Investment Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://scryfall.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Scryfall API
                </a>
              </li>
              <li>
                <a href="https://magic.wizards.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Official MTG
                </a>
              </li>
              <li>
                <a href="https://secretlair.wizards.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Secret Lair Official
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 SecretLairCards.com. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="/terms" className="text-gray-400 hover:text-white transition-colors text-sm">
                Terms of Service
              </a>
              <a href="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}