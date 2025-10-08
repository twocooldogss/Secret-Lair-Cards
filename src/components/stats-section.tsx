import { Users, Package, Star, Award } from 'lucide-react'

const stats = [
  {
    icon: Users,
    value: '50K+',
    label: 'Happy Collectors',
    description: 'Join thousands of Magic fans who trust us for premium cards'
  },
  {
    icon: Package,
    value: '200+',
    label: 'Secret Lair Drops',
    description: 'Exclusive collections from the most talented artists'
  },
  {
    icon: Star,
    value: '4.9/5',
    label: 'Customer Rating',
    description: 'Rated excellent by our community of collectors'
  },
  {
    icon: Award,
    value: '100%',
    label: 'Authentic Cards',
    description: 'Every card is guaranteed authentic and in perfect condition'
  }
]

export function StatsSection() {
  return (
    <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Trusted by Collectors Worldwide
          </h2>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto">
            Join our community of passionate Magic: The Gathering collectors who choose 
            Secret Lair Cards for their premium card needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center group"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-4 group-hover:bg-white/20 transition-colors duration-300">
                <stat.icon className="h-8 w-8 text-white" />
              </div>
              
              <div className="text-4xl font-bold text-white mb-2">
                {stat.value}
              </div>
              
              <div className="text-xl font-semibold text-white mb-2">
                {stat.label}
              </div>
              
              <p className="text-purple-100 text-sm">
                {stat.description}
              </p>
            </div>
          ))}
        </div>

        {/* Additional Trust Indicators */}
        <div className="mt-16 text-center">
          <p className="text-purple-100 mb-8">
            Trusted by collectors from over 50 countries
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-75">
            <div className="text-white font-semibold">Wizards of the Coast</div>
            <div className="text-white font-semibold">•</div>
            <div className="text-white font-semibold">Official Partner</div>
            <div className="text-white font-semibold">•</div>
            <div className="text-white font-semibold">Secure Shipping</div>
            <div className="text-white font-semibold">•</div>
            <div className="text-white font-semibold">24/7 Support</div>
          </div>
        </div>
      </div>
    </section>
  )
}

