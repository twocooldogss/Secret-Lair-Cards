'use client'

import { useState } from 'react'
import { Mail, Send, CheckCircle } from 'lucide-react'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsSubscribed(true)
    setIsLoading(false)
    setEmail('')
  }

  if (isSubscribed) {
    return (
      <section className="py-20 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-6">
            <CheckCircle className="h-8 w-8 text-white" />
          </div>
          
          <h2 className="text-3xl font-bold text-white mb-4">
            Welcome to the Secret Lair Community!
          </h2>
          
          <p className="text-xl text-gray-300 mb-8">
            You&apos;re now subscribed to our newsletter. Get ready for exclusive updates, 
            early access to new drops, and special collector insights.
          </p>
          
          <button
            onClick={() => setIsSubscribed(false)}
            className="text-purple-400 hover:text-purple-300 transition-colors"
          >
            Subscribe another email
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600 rounded-full mb-6">
          <Mail className="h-8 w-8 text-white" />
        </div>
        
        <h2 className="text-3xl font-bold text-white mb-4">
          Stay Updated with Secret Lair Drops
        </h2>
        
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Be the first to know about new Secret Lair releases, exclusive artist collaborations, 
          and special collector events. Join thousands of Magic fans who never miss a drop.
        </p>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="w-full px-4 py-3 bg-white rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Subscribe
                  <Send className="ml-2 h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </form>

        <p className="text-sm text-gray-400 mt-4">
          We respect your privacy. Unsubscribe at any time.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-2xl font-bold text-white mb-2">Exclusive Access</div>
            <p className="text-gray-400">Early notifications for new drops</p>
          </div>
          <div>
            <div className="text-2xl font-bold text-white mb-2">Artist Insights</div>
            <p className="text-gray-400">Behind-the-scenes content from creators</p>
          </div>
          <div>
            <div className="text-2xl font-bold text-white mb-2">Collector Tips</div>
            <p className="text-gray-400">Expert advice for building your collection</p>
          </div>
        </div>
      </div>
    </section>
  )
}

