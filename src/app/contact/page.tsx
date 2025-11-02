import Script from "next/script";
import { generateSeoMeta } from "@/lib/seo";
import { generateContactPageSchema } from "@/lib/schema";

export const metadata = generateSeoMeta({
  title: "Contact Us | SecretLairCards.com",
  description: "Get in touch with SecretLairCards.com. We'd love to hear your feedback, collaboration ideas, or help with any issues.",
  url: "/contact",
  keywords: ["contact", "feedback", "Secret Lair Cards", "support"]
});

export default function ContactPage() {
  const contactSchema = generateContactPageSchema();

  return (
    <>
      {/* Contact Page Schema */}
      <Script
        id="contact-page-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(contactSchema),
        }}
      />
      <main className="min-h-screen bg-gradient-to-b from-[#18121E] via-[#221933] to-[#0D0A12] text-white">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-800/40 via-indigo-900/50 to-black" />
        <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-purple-500/25 rounded-full blur-[140px] -translate-x-1/2 -translate-y-1/2 opacity-50" />
        <div className="absolute inset-0 bg-[url('/images/stars-texture.png')] bg-cover bg-center opacity-10" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-200 via-white to-yellow-200 bg-clip-text text-transparent">
            Contact Us
          </h1>
          <p className="text-gray-300 text-lg">
            We&apos;d love to hear from you.
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Whether you have feedback, collaboration ideas, or spotted an issue — get in touch with us anytime.
          </p>
        </div>
      </section>

      {/* CONTENT SECTION */}
      <section className="relative py-16">
        <div className="max-w-4xl mx-auto px-6">
          <article className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
            <div className="prose prose-lg max-w-none prose-invert">
              
              {/* EMAIL SECTION */}
              <div className="bg-gradient-to-br from-purple-600/20 to-indigo-600/20 rounded-xl border border-purple-500/30 p-6 mb-8">
                <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                  <span className="text-2xl mr-3">📬</span>
                  Email
                </h2>
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <span className="text-gray-300 font-medium sm:w-48">General inquiries:</span>
                    <a href="mailto:secretlaircards@proton.me" className="text-purple-300 hover:text-purple-200 font-semibold">
                      secretlaircards@proton.me
                    </a>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <span className="text-gray-300 font-medium sm:w-48">Partnership & media:</span>
                    <a href="mailto:secretlaircards@proton.me" className="text-purple-300 hover:text-purple-200 font-semibold">
                      secretlaircards@proton.me
                    </a>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <span className="text-gray-300 font-medium sm:w-48">Legal concerns:</span>
                    <a href="mailto:secretlaircards@proton.me" className="text-purple-300 hover:text-purple-200 font-semibold">
                      secretlaircards@proton.me
                    </a>
                  </div>
                </div>
              </div>

              {/* COMMUNITY SECTION */}
              <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-xl border border-blue-500/30 p-6 mb-8">
                <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                  <span className="text-2xl mr-3">💬</span>
                  Community & Social
                </h2>
                <p className="text-gray-200 mb-4">
                  Follow us for updates, collector guides, and drop alerts:
                </p>
                <div className="flex items-center">
                  <a 
                    href="https://twitter.com/SecretLairCards" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-300 hover:text-blue-200 font-semibold flex items-center"
                  >
                    <span className="text-xl mr-2">🐦</span>
                    Twitter / X
                    <span className="text-sm ml-2">↗</span>
                  </a>
                </div>
              </div>

              {/* ABOUT SECTION */}
              <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 rounded-xl border border-green-500/30 p-6">
                <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                  <span className="text-2xl mr-3">🧙</span>
                  About
                </h2>
                <p className="text-gray-200">
                  <strong>SecretLairCards.com</strong> is an independent project created by fans, for fans —  
                  dedicated to tracking every MTG Secret Lair drop, card list, and investment insight from 2019 to 2025 and beyond.
                </p>
              </div>

              {/* RESPONSE TIME */}
              <div className="mt-8 text-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-4">
                  <p className="text-gray-300 text-sm">
                    <span className="text-purple-300 font-semibold">Response Time:</span> We typically respond within 24-48 hours
                  </p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>
    </main>
    </>
  );
}
