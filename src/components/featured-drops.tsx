import Link from 'next/link'
import Image from 'next/image'
import { Clock, DollarSign, Users, Star } from 'lucide-react'
import { featuredDrops } from '@/data/drops'
import { formatPrice, formatDate } from '@/lib/utils'

export function FeaturedDrops() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Featured Secret Lair Drops
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our most popular and exclusive collections featuring unique artwork 
            and limited edition Magic: The Gathering cards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredDrops.map((drop) => (
            <div
              key={drop.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden card-hover group"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={drop.imageUrl}
                  alt={drop.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {drop.soldOut && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Sold Out
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-purple-600 font-semibold">
                    {drop.artist}
                  </span>
                  <div className="flex items-center text-yellow-500">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="ml-1 text-sm font-medium">Featured</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                  {drop.title}
                </h3>

                <p className="text-gray-600 mb-4 line-clamp-2">
                  {drop.description}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    <span className="text-sm">
                      {formatDate(drop.endDate)}
                    </span>
                  </div>
                  <div className="flex items-center text-green-600 font-semibold">
                    <DollarSign className="h-4 w-4 mr-1" />
                    {formatPrice(drop.price)}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {drop.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-500">
                    <Users className="h-4 w-4 mr-1" />
                    <span className="text-sm">{drop.cards.length} cards</span>
                  </div>
                  
                  <Link
                    href={`/drops/${drop.id}`}
                    className="inline-flex items-center px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/drops"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
          >
            View All Drops
            <Clock className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}

