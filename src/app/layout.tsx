import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Footer from '@/components/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'SecretLairCards.com – The Ultimate MTG Secret Lair Hub (2025 Edition)',
    template: '%s | SecretLairCards.com'
  },
  description: 'Explore every Magic: The Gathering Secret Lair drop – release info, card lists, investment insights, and collector guides. Updated for 2025.',
  keywords: [
    'Secret Lair',
    'MTG Secret Lair',
    'Magic The Gathering',
    'Secret Lair cards',
    'Scryfall',
    'MTG investment',
    'Secret Lair 2025',
    'Magic cards value',
    'MTG drops',
    'Secret Lair collector'
  ],
  authors: [{ name: 'SecretLairCards.com' }],
  creator: 'SecretLairCards.com',
  publisher: 'SecretLairCards.com',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://secretlaircards.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'SecretLairCards.com – The Ultimate MTG Secret Lair Hub',
    description: 'Explore every Magic: The Gathering Secret Lair drop – release info, card lists, investment insights, and collector guides.',
    url: 'https://secretlaircards.com',
    siteName: 'SecretLairCards.com',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'SecretLairCards.com - MTG Secret Lair Hub',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SecretLairCards.com – The Ultimate MTG Secret Lair Hub',
    description: 'Explore every Magic: The Gathering Secret Lair drop – release info, card lists, investment insights, and collector guides.',
    images: ['/logo.png'],
    creator: '@secretlaircards',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://secretlaircards.com/" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <meta name="theme-color" content="#7c3aed" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="SecretLairCards" />
        <meta name="msapplication-TileColor" content="#7c3aed" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* Global Website Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Secret Lair Cards",
              "url": "https://secretlaircards.com",
              "description": "Secret Lair Cards – explore every MTG Secret Lair drop, prices, art, and collector insights. Your complete 2025 guide to Magic's most exclusive cards.",
              "publisher": {
                "@type": "Organization",
                "name": "Secret Lair Cards",
                "url": "https://secretlaircards.com",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://secretlaircards.com/logo.png",
                },
              },
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://secretlaircards.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
              "sameAs": [
                "https://twitter.com/SecretLairCards",
                "https://www.instagram.com/SecretLairCards",
                "https://www.facebook.com/SecretLairCards"
              ],
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}

