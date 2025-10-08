export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-gray-300 text-sm px-6 py-8 mt-12">
      <div className="max-w-6xl mx-auto flex justify-center">
        <p>© {new Date().getFullYear()} SecretLairCards.com - Fan Site for MTG Secret Lair</p>
      </div>
    </footer>
  );
}