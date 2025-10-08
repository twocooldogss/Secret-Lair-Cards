'use client'

import { useState, useEffect } from 'react'
import { ChevronRight, Star, Zap } from 'lucide-react'
import Link from 'next/link'

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  
  const slides = [
    {
      title: "Exclusive Secret Lair Drops",
      subtitle: "Limited Edition Magic: The Gathering Cards",
      description: "Discover unique artwork and premium collectibles from the most talented artists in the world.",
      image: "/cards/hero-1.jpg",
      cta: "Explore Drops",
      href: "/drops"
    },
    {
      title: "Artist Collaborations",
      subtitle: "Celebrating Creative Vision",
      description: "From Bob Ross to Stranger Things, experience Magic cards like never before with iconic collaborations.",
      image: "/cards/hero-2.jpg",
      cta: "View Artists",
      href: "/artists"
    },
    {
      title: "Premium Collectibles",
      subtitle: "Invest in Magic History",
      description: "Each Secret Lair drop is a carefully curated collection of premium cards with stunning alternate art.",
      image: "/cards/hero-3.jpg",
      cta: "Shop Now",
      href: "/shop"
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${slide.image})`
            }}
          />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            <div className="flex items-center space-x-2 mb-4">
              <Star className="h-6 w-6 text-yellow-400 fill-current" />
              <span className="text-yellow-400 font-semibold">Premium Collection</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              {slides[currentSlide].title}
            </h1>
            
            <h2 className="text-2xl md:text-3xl text-purple-300 mb-6">
              {slides[currentSlide].subtitle}
            </h2>
            
            <p className="text-xl text-gray-200 mb-8 max-w-2xl">
              {slides[currentSlide].description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={slides[currentSlide].href}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
              >
                {slides[currentSlide].cta}
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
              
              <button className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-gray-900 transition-all duration-300">
                <Zap className="mr-2 h-5 w-5" />
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 z-10">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

