import { generateSeoMeta } from "@/lib/seo";

export const metadata = generateSeoMeta({
  title: "Terms of Service | SecretLairCards.com",
  description: "Read our Terms of Service for SecretLairCards.com. Understand your rights and responsibilities when using our platform.",
  url: "/terms",
  keywords: ["terms of service", "legal", "Secret Lair Cards", "terms"]
});

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#18121E] via-[#221933] to-[#0D0A12] text-white">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-800/40 via-indigo-900/50 to-black" />
        <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-purple-500/25 rounded-full blur-[140px] -translate-x-1/2 -translate-y-1/2 opacity-50" />
        <div className="absolute inset-0 bg-[url('/images/stars-texture.png')] bg-cover bg-center opacity-10" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-200 via-white to-yellow-200 bg-clip-text text-transparent">
            Terms of Service
          </h1>
          <p className="text-gray-300 text-lg">
            Welcome to SecretLairCards.com — your independent resource for Magic: The Gathering Secret Lair information.
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
                By accessing this website, you agree to the following terms:
              </p>

              <h2 className="text-2xl font-semibold text-white mb-4 mt-8">1. Site Purpose</h2>
              <p className="text-gray-200 mb-8">
                SecretLairCards.com is a <strong>fan-created, non-commercial resource</strong> providing information, guides, and analysis about Magic: The Gathering&apos;s Secret Lair product line.  
                We are <strong>not affiliated with Wizards of the Coast</strong>, Hasbro, or any official entity.
              </p>

              <h2 className="text-2xl font-semibold text-white mb-4 mt-8">2. Content Accuracy</h2>
              <p className="text-gray-200 mb-4">We strive to maintain accurate, up-to-date information; however:</p>
              <ul className="text-gray-200 mb-6">
                <li>Content may contain typographical errors or outdated data.</li>
                <li>Prices, availability, and release details may change without notice.</li>
                <li>You are responsible for verifying information before making purchasing or investment decisions.</li>
              </ul>

              <h2 className="text-2xl font-semibold text-white mb-4 mt-8">3. Intellectual Property</h2>
              <p className="text-gray-200 mb-4">
                All Magic: The Gathering and Secret Lair names, logos, and artwork are © Wizards of the Coast.  
                All original commentary, analysis, and data on this site are © SecretLairCards.com.
              </p>
              <p className="text-gray-200 mb-8">
                If you believe any content infringes your rights, please contact us at <a href="mailto:secretlaircards@proton.me" className="text-purple-300 hover:text-purple-200 font-semibold">secretlaircards@proton.me</a> for prompt resolution.
              </p>

              <h2 className="text-2xl font-semibold text-white mb-4 mt-8">4. User Conduct</h2>
              <p className="text-gray-200 mb-4">You agree not to:</p>
              <ul className="text-gray-200 mb-6">
                <li>Use this site for unlawful or fraudulent activity.</li>
                <li>Copy or redistribute data from this site without attribution.</li>
                <li>Attempt to harm the site&apos;s operation or infrastructure.</li>
              </ul>

              <h2 className="text-2xl font-semibold text-white mb-4 mt-8">5. Disclaimer</h2>
              <p className="text-gray-200 mb-8">
                SecretLairCards.com is provided <strong>&quot;as is&quot;</strong> without warranties of any kind.  
                We make no guarantees about the accuracy, reliability, or availability of content.  
                Use this site at your own risk.
              </p>

              <h2 className="text-2xl font-semibold text-white mb-4 mt-8">6. Changes to Terms</h2>
              <p className="text-gray-200 mb-8">
                We may update these Terms periodically. The &quot;Last updated&quot; date reflects the latest revision.
              </p>

              <div className="bg-purple-600/20 border border-purple-500/30 rounded-lg p-6 mt-8">
                <p className="text-gray-200 text-center">
                  For any questions, contact us at <a href="mailto:secretlaircards@proton.me" className="text-purple-300 hover:text-purple-200 font-semibold">secretlaircards@proton.me</a>.
                </p>
              </div>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
