import "./globals.css";
import { Inter } from "next/font/google";
import Script from "next/script";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SecretLairCards.com",
  description: "The ultimate resource for Magic: The Gathering Secret Lair collectors.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-900 text-white`}>
        <Nav />
        {children}
        <Footer />
        
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-D54X1NZ1HJ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-D54X1NZ1HJ');
          `}
        </Script>

        {/* WebSite Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Secret Lair Cards",
              "description": "SecretLairCards.com is the ultimate resource for Magic: The Gathering Secret Lair collectors — explore every drop, card, and investment trend from 2019 to 2025.",
              "url": "https://www.secretlaircards.com",
              "inLanguage": "en",
              "keywords": "Secret Lair, MTG Secret Lair, Secret Lair Drops, Magic The Gathering Secret Lair, Secret Lair Cards, Secret Lair 2025",
              "dateModified": "2025-01-20",
              "publisher": {
                "@type": "Organization",
                "name": "SecretLairCards.com",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://www.secretlaircards.com/logo.png"
                }
              },
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://www.secretlaircards.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            }),
          }}
        />

        {/* WebPage Schema for Homepage */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Secret Lair Cards Home",
              "description": "Explore every Magic: The Gathering Secret Lair drop from 2019 to 2025 — full card lists, artworks, prices, and collector insights.",
              "url": "https://www.secretlaircards.com",
              "inLanguage": "en",
              "keywords": "Secret Lair, MTG Secret Lair, Secret Lair Drops, Magic The Gathering Secret Lair, Secret Lair Cards, Secret Lair 2025",
              "dateModified": "2025-01-20",
              "isPartOf": {
                "@type": "WebSite",
                "name": "Secret Lair Cards",
                "url": "https://www.secretlaircards.com"
              }
            }),
          }}
        />
      </body>
    </html>
  );
}