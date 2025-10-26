import { generateSeoMeta } from "@/lib/seo";

export const metadata = generateSeoMeta({
  title: "Privacy Policy | SecretLairCards.com",
  description: "Learn how SecretLairCards.com protects your privacy and handles your data. Our commitment to transparency and data protection.",
  url: "/privacy",
  keywords: ["privacy policy", "data protection", "Secret Lair Cards", "privacy"]
});

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#18121E] via-[#221933] to-[#0D0A12] text-white">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-800/40 via-indigo-900/50 to-black" />
        <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-purple-500/25 rounded-full blur-[140px] -translate-x-1/2 -translate-y-1/2 opacity-50" />
        <div className="absolute inset-0 bg-[url('/images/stars-texture.png')] bg-cover bg-center opacity-10" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-200 via-white to-yellow-200 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <p className="text-gray-300 text-lg">
            Your privacy is important to us. Learn how we protect and handle your data.
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Last updated: January 2025
          </p>
        </div>
      </section>

      {/* CONTENT SECTION */}
      <section className="relative py-16">
        <div className="max-w-4xl mx-auto px-6">
          <article className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
            <div className="prose prose-lg max-w-none prose-invert">
              <p className="text-xl text-gray-200 mb-8">
                At <strong>SecretLairCards.com</strong>, your privacy is important to us.  
                This Privacy Policy explains what information we collect, how we use it, and your rights regarding that data.
              </p>

              <h2 className="text-2xl font-semibold text-white mb-4 mt-8">1. Information We Collect</h2>
              <p className="text-gray-200 mb-4">We may collect the following types of information:</p>
              <ul className="text-gray-200 mb-6">
                <li><strong>Analytics data</strong> (via Google Analytics) such as page views, device type, and browser information.</li>
                <li><strong>Cookies</strong> that help remember your preferences and improve browsing experience.</li>
                <li><strong>Voluntary submissions</strong>, such as messages sent through contact forms or email.</li>
              </ul>
              <p className="text-gray-200 mb-8">
                We <strong>do not collect</strong> payment data, passwords, or any personally identifiable information beyond what you voluntarily provide.
              </p>

              <h2 className="text-2xl font-semibold text-white mb-4 mt-8">2. How We Use Information</h2>
              <p className="text-gray-200 mb-4">Your data is used to:</p>
              <ul className="text-gray-200 mb-6">
                <li>Improve site performance and content relevance.</li>
                <li>Analyze traffic trends and engagement.</li>
                <li>Respond to user inquiries or feedback.</li>
              </ul>
              <p className="text-gray-200 mb-8">
                We do <strong>not sell, trade, or share</strong> user data with third parties for marketing purposes.
              </p>

              <h2 className="text-2xl font-semibold text-white mb-4 mt-8">3. Cookies</h2>
              <p className="text-gray-200 mb-4">SecretLairCards.com uses cookies to:</p>
              <ul className="text-gray-200 mb-6">
                <li>Enable essential site functionality.</li>
                <li>Measure anonymous traffic via Google Analytics.</li>
              </ul>
              <p className="text-gray-200 mb-8">
                You may disable cookies in your browser settings at any time.
              </p>

              <h2 className="text-2xl font-semibold text-white mb-4 mt-8">4. External Links</h2>
              <p className="text-gray-200 mb-8">
                Our site includes links to third-party sites such as <a href="https://magic.wizards.com" className="text-purple-300 hover:text-purple-200">Wizards of the Coast</a> and <a href="https://scryfall.com" className="text-purple-300 hover:text-purple-200">Scryfall</a>.  
                We are <strong>not responsible</strong> for the privacy practices of those websites.
              </p>

              <h2 className="text-2xl font-semibold text-white mb-4 mt-8">5. Data Retention</h2>
              <p className="text-gray-200 mb-8">
                Analytics data is stored anonymously and automatically deleted after 26 months.
              </p>

              <h2 className="text-2xl font-semibold text-white mb-4 mt-8">6. Contact</h2>
              <p className="text-gray-200 mb-8">
                If you have privacy-related questions, please contact us at:  
                <br />
                <a href="mailto:secretlaircards@proton.me" className="text-purple-300 hover:text-purple-200 font-semibold">
                  secretlaircards@proton.me
                </a>
              </p>

              <div className="bg-purple-600/20 border border-purple-500/30 rounded-lg p-6 mt-8">
                <p className="text-gray-200 text-center">
                  By using SecretLairCards.com, you agree to this Privacy Policy.
                </p>
              </div>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
