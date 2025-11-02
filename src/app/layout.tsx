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

        {/* WebSite Schema - Global (保留，首页 @graph 会引用此 @id) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": "https://www.secretlaircards.com/#website",
              "name": "SecretLairCards.com",
              "description": "SecretLairCards.com is the ultimate resource for Magic: The Gathering Secret Lair collectors — explore every drop, card, and investment trend from 2019 to 2025.",
              "url": "https://www.secretlaircards.com",
              "inLanguage": "en",
              "keywords": "Secret Lair, MTG Secret Lair, Secret Lair Drops, Magic The Gathering Secret Lair, Secret Lair Cards, Secret Lair 2025",
              "dateModified": new Date().toISOString().slice(0, 10),
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
      </body>
    </html>
  );
}