import Script from "next/script";
import { generateSeoMeta } from "@/lib/seo";
import { generateAboutPageSchema } from "@/lib/schema";

export const metadata = generateSeoMeta({
  title: "About | SecretLairCards.com",
  description: "SecretLairCards.com is an independent fan website dedicated to cataloging every Magic: The Gathering Secret Lair drop. We provide up-to-date drop lists, card information, market insights, and collector news.",
  url: "/about"
});

export default function AboutPage() {
  const aboutSchema = generateAboutPageSchema();

  return (
    <>
      {/* About Page Schema */}
      <Script
        id="about-page-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(aboutSchema),
        }}
      />
      <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-1 max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold mb-6">About SecretLairCards.com</h1>
        <div className="prose max-w-none">
          <p className="text-lg text-gray-700 mb-4">
            SecretLairCards.com is an independent fan website dedicated to cataloging every Magic: The Gathering Secret Lair drop.
            We provide up-to-date drop lists, card information, market insights, and collector news — all in one place.
          </p>
          <p className="text-gray-700 mb-4">
            Our mission is to help Magic: The Gathering players and collectors stay informed about the latest Secret Lair releases,
            track card values, and discover hidden gems in the ever-expanding world of Secret Lair drops.
          </p>
          <h2 className="text-2xl font-semibold mt-8 mb-4">What We Offer</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Complete database of all Secret Lair drops</li>
            <li>Detailed card information and artwork</li>
            <li>Latest news and announcements</li>
            <li>Investment insights and market analysis</li>
            <li>Release dates and pricing information</li>
          </ul>
          <h2 className="text-2xl font-semibold mt-8 mb-4">Disclaimer</h2>
          <p className="text-gray-600">
            This site is not affiliated with Wizards of the Coast or Hasbro. All trademarks belong to their respective owners.
            Magic: The Gathering is a trademark of Wizards of the Coast LLC, a subsidiary of Hasbro, Inc.
          </p>
        </div>
      </main>
    </div>
    </>
  );
}
